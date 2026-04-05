/* ═══════════════════════════════════════════════
   ENDALE — Session Board
   Infinite zoomable/pannable pin board.
   Zoom: scroll wheel. Pan: drag background.
   Double-click canvas: create a new card.
   Double-click card body: edit inline.
   State persists in localStorage.
   ═══════════════════════════════════════════════ */

const Board = (() => {

  const STORAGE_KEY   = 'endale-board';
  const OVERRIDES_KEY = 'endale-overrides';
  const CANVAS_W      = 4000;
  const CANVAS_H      = 3000;
  const SCALE_MIN     = 0.15;
  const SCALE_MAX     = 2.0;

  /* ── View + DOM state ── */
  let _canvas          = null;
  let _viewport        = null;
  let _state           = null;
  let _overridesCache  = null;
  let _zTop            = 10;
  let _tx              = 0;
  let _ty              = 0;
  let _scale           = 1;

  /* ── Wizard drop position (board-only: where to place the new pin) ── */
  let _wizPos = null;

  /* ════════════════════════════════════════════
     PERSISTENCE
  ════════════════════════════════════════════ */

  /* Local read of the custom card store (avoids tight coupling to app.js) */
  function loadCustomCardById(customId) {
    try {
      const cards = JSON.parse(localStorage.getItem('endale-custom-cards')) || [];
      return cards.find(c => c._customId === customId) || null;
    } catch { return null; }
  }

  function loadState() {
    try {
      const state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { pins: [] };
      return migrateState(state);
    }
    catch { return { pins: [] }; }
  }

  /* One-time migration: old custom pins embedded full cardData — strip it, ensure store has the card */
  function migrateState(state) {
    let dirty = false;
    state.pins = state.pins.map(p => {
      if (p.isCustom && p.cardData && !p._customId) {
        const customId = p.id;
        if (!loadCustomCardById(customId)) {
          Endale.saveCustomCard({ ...p.cardData, _customId: customId });
        }
        dirty = true;
        return { id: p.id, isCustom: true, _customId: customId, x: p.x, y: p.y };
      }
      /* Also handle pins that have both cardData AND _customId (partial old format) */
      if (p.isCustom && p.cardData && p._customId) {
        dirty = true;
        const { cardData, ...rest } = p; // eslint-disable-line no-unused-vars
        if (!loadCustomCardById(p._customId)) Endale.saveCustomCard({ ...cardData, _customId: p._customId });
        return rest;
      }
      return p;
    });
    if (dirty) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return state;
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_state));
  }

  function loadOverrides() {
    if (_overridesCache) return _overridesCache;
    try   { _overridesCache = JSON.parse(localStorage.getItem(OVERRIDES_KEY)) || {}; }
    catch { _overridesCache = {}; }
    return _overridesCache;
  }

  function saveOverrides(overrides) {
    _overridesCache = overrides;
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
  }

  /* Key that uniquely identifies a wiki card entry */
  function wikiKey(pin) { return `${pin.pageId}|${pin.gi}|${pin.ei}`; }

  /* Merge stored overrides into an entry before rendering */
  function applyOverrides(pin, entry) {
    const ov = loadOverrides()[wikiKey(pin)];
    if (!ov) return entry;
    return {
      ...entry,
      fields: ov.fields !== undefined ? ov.fields : entry.fields,
      gmNote: ov.gmNote !== undefined ? ov.gmNote : entry.gmNote,
      quote:  ov.quote  !== undefined ? ov.quote  : entry.quote,
    };
  }

  /* ════════════════════════════════════════════
     TRANSFORM
  ════════════════════════════════════════════ */

  function applyTransform() {
    _canvas.style.transform = `translate(${_tx}px,${_ty}px) scale(${_scale})`;
    const pct = document.getElementById('board-zoom-pct');
    if (pct) pct.textContent = Math.round(_scale * 100) + '%';
  }

  function viewportToCanvas(vx, vy) {
    return { x: (vx - _tx) / _scale, y: (vy - _ty) / _scale };
  }

  /* ════════════════════════════════════════════
     CARD CATALOGUE
  ════════════════════════════════════════════ */

  function getAllCardEntries() {
    const pages = Endale.getPages();
    let hidden = {};
    try { hidden = JSON.parse(localStorage.getItem('endale-hidden')) || {}; } catch {}
    const result = [];
    for (const [pageId, pageData] of Object.entries(pages)) {
      if (!pageData.groups) continue;
      pageData.groups.forEach((group, gi) => {
        if (group.type === 'cards') {
          group.entries.forEach((entry, ei) => {
            if (hidden[`${pageId}|${gi}|${ei}`]) return;
            result.push({ pageId, gi, ei, groupType: 'cards',
              name: entry.name, role: entry.role || '' });
          });
        } else if (group.type === 'roster' || group.type === 'reference') {
          result.push({ pageId, gi, ei: null, groupType: group.type,
            name: group.title, role: group.role || '' });
        }
      });
    }
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }

  /* ════════════════════════════════════════════
     RESOLVE PIN
  ════════════════════════════════════════════ */

  function resolvePin(pin) {
    if (pin.isCustom) {
      const card = loadCustomCardById(pin._customId);
      return card ? { isCustom: true, card } : null;
    }
    const pages = Endale.getPages();
    const pageData = pages[pin.pageId];
    if (!pageData || !pageData.groups) return null;
    const group = pageData.groups[pin.gi];
    if (!group) return null;
    const groupType = pin.groupType || group.type;
    if (groupType === 'cards') {
      const entry = group.entries[pin.ei];
      if (!entry) return null;
      return { groupType, entry, group };
    }
    return { groupType, group };
  }

  /* ════════════════════════════════════════════
     HELPERS
  ════════════════════════════════════════════ */

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function pageLabel(pageId) {
    return pageId.split('/').pop()
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  /* ════════════════════════════════════════════
     RENDER — main entry point
  ════════════════════════════════════════════ */

  function render(container) {
    _state          = loadState();
    _overridesCache = null;
    _zTop           = 10;
    _tx = 0; _ty = 0; _scale = 1;

    container.classList.add('board-page');

    container.innerHTML = `
      <div class="board-toolbar">
        <button id="board-add-btn" class="board-btn board-btn-add">＋ Add Card</button>
        <span class="board-hint">Scroll to zoom · drag background to pan · double-click canvas to create · double-click card body to edit in place</span>
        <div class="board-zoom-controls">
          <button id="board-zoom-out"   class="board-zoom-btn" title="Zoom out">−</button>
          <span   id="board-zoom-pct"   class="board-zoom-pct">100%</span>
          <button id="board-zoom-in"    class="board-zoom-btn" title="Zoom in">＋</button>
          <button id="board-zoom-reset" class="board-zoom-reset" title="Reset view">Reset</button>
        </div>
        <button id="board-clear-btn" class="board-btn board-btn-clear">Clear Board</button>
      </div>

      <div id="board-viewport" class="board-viewport">
        <div id="board-canvas" class="board-canvas"
             style="width:${CANVAS_W}px;height:${CANVAS_H}px;"></div>
      </div>

      <!-- Add-card modal -->
      <div id="board-modal" class="board-modal hidden">
        <div class="board-modal-inner">
          <div class="board-modal-header">
            <span class="board-modal-title">Pin a Card</span>
            <button id="board-modal-close" class="board-modal-close-btn">✕</button>
          </div>
          <input id="board-search" class="board-modal-search"
                 type="search" placeholder="Search by name or role…" autocomplete="off">
          <div id="board-modal-list" class="board-modal-list"></div>
        </div>
      </div>

      `;

    _canvas   = document.getElementById('board-canvas');
    _viewport = document.getElementById('board-viewport');

    _state.pins.forEach(renderPin);

    /* Toolbar */
    document.getElementById('board-add-btn').addEventListener('click', openModal);
    document.getElementById('board-clear-btn').addEventListener('click', () => {
      if (confirm('Remove all cards from the session board?')) {
        _state.pins = [];
        saveState();
        _canvas.innerHTML = '';
      }
    });
    document.getElementById('board-zoom-in').addEventListener('click', () =>
      zoomTo(_scale * 1.2, _viewport.clientWidth / 2, _viewport.clientHeight / 2));
    document.getElementById('board-zoom-out').addEventListener('click', () =>
      zoomTo(_scale / 1.2, _viewport.clientWidth / 2, _viewport.clientHeight / 2));
    document.getElementById('board-zoom-reset').addEventListener('click', () => {
      _tx = 0; _ty = 0; _scale = 1; applyTransform();
    });

    /* Add-card modal */
    document.getElementById('board-modal-close').addEventListener('click', closeModal);
    document.getElementById('board-modal').addEventListener('click', e => {
      if (e.target.id === 'board-modal') closeModal();
    });
    document.getElementById('board-search').addEventListener('input', e =>
      populateModalList(e.target.value.trim().toLowerCase()));

    initZoomPan();
  }

  /* ════════════════════════════════════════════
     ZOOM + PAN
  ════════════════════════════════════════════ */

  function zoomTo(newScale, originX, originY) {
    newScale = Math.min(SCALE_MAX, Math.max(SCALE_MIN, newScale));
    _tx = originX - (originX - _tx) * (newScale / _scale);
    _ty = originY - (originY - _ty) * (newScale / _scale);
    _scale = newScale;
    applyTransform();
  }

  function initZoomPan() {
    _viewport.addEventListener('wheel', e => {
      e.preventDefault();
      const rect  = _viewport.getBoundingClientRect();
      const delta = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      zoomTo(_scale * delta, e.clientX - rect.left, e.clientY - rect.top);
    }, { passive: false });

    /* Double-click on background → creation wizard */
    _viewport.addEventListener('dblclick', e => {
      if (e.target.closest('.board-pin')) return;
      const rect = _viewport.getBoundingClientRect();
      const pos  = viewportToCanvas(e.clientX - rect.left, e.clientY - rect.top);
      openWizard(pos.x, pos.y);
    });

    /* Mousedown on background → pan */
    _viewport.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      if (e.target.closest('.board-pin')) return;
      e.preventDefault();

      const startX = e.clientX - _tx;
      const startY = e.clientY - _ty;
      _viewport.style.cursor = 'grabbing';

      function onMove(ev) {
        _tx = ev.clientX - startX;
        _ty = ev.clientY - startY;
        applyTransform();
      }
      function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        _viewport.style.cursor = '';
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  }

  /* ════════════════════════════════════════════
     PIN — render a single pinned card
  ════════════════════════════════════════════ */

  function renderPin(pin) {
    let cardHTML;

    if (pin.isCustom) {
      const resolved = resolvePin(pin);
      if (!resolved) return; /* card was deleted from store */
      const d = resolved.card;
      cardHTML = Cards.renderCardHTML({
        name:    d.name,
        role:    d.role   || '',
        rank:    [d.rank  || 'Custom', ''],
        fields:  d.fields || [],
        gmNote:  d.gmNote || '',
        quote:   d.quote  || '',
        tags:    d.tags   || [],
        _imgKey:  `custom|${pin._customId}`,
        _imgName: d.name,
      }, d.headerClass || 'h-neutral');
    } else {
      const resolved = resolvePin(pin);
      if (!resolved) return;
      if (resolved.groupType === 'cards') {
        const entry = applyOverrides(pin, resolved.entry);
        cardHTML = Cards.renderCardHTML({
          ...entry,
          _imgKey:  wikiKey(pin),
          _imgName: resolved.entry.name,
        }, resolved.group.headerClass);
      } else if (resolved.groupType === 'roster') {
        cardHTML = Cards.renderRosterHTML(resolved.group);
      } else {
        cardHTML = Cards.renderReferenceHTML(resolved.group);
      }
    }

    const el = document.createElement('div');
    el.className = 'board-pin';
    el.dataset.pinId = pin.id;
    el.style.cssText = `left:${pin.x}px;top:${pin.y}px;z-index:${++_zTop};`;
    el.innerHTML =
      `<button class="board-pin-remove" title="Remove from board">✕</button>` +
      cardHTML;

    _canvas.appendChild(el);

    el.querySelector('.board-pin-remove').addEventListener('click', e => {
      e.stopPropagation();
      _state.pins = _state.pins.filter(p => p.id !== pin.id);
      saveState();
      el.remove();
    });

    const pic = el.querySelector('.picture-box');
    if (pic) {
      pic.addEventListener('click', e => {
        e.stopPropagation();
        el.querySelector('.card').classList.toggle('open');
      });
    }

    initDrag(el, pin);
    initEdit(el, pin);
    Images.attach(el);
  }

  /* ════════════════════════════════════════════
     DRAG — header: short click = expand toggle,
             drag = move (delta ÷ scale).
             Dragging into the sidebar triggers
             nav drop mode.
  ════════════════════════════════════════════ */

  /* Extract card identity for drag-to-nav.
     Wiki cards store a reference so all instances share the same
     image key and override key — edits and art stay in sync.
     Custom cards store a data copy (they have no stable identity). */
  function extractCardData(pin) {
    if (pin.isCustom) return { _customId: pin._customId };

    if (pin.groupType === 'cards') {
      /* Reference: resolved live in enrichPage using original key */
      return {
        _ref:       true,
        _refPageId: pin.pageId,
        _refGi:     pin.gi,
        _refEi:     pin.ei,
      };
    }

    /* Roster / reference group — minimal copy (no edit/image linkage needed) */
    const resolved = resolvePin(pin);
    if (!resolved) return null;
    return {
      name:        resolved.group.title || pin.pageId,
      role:        resolved.group.role  || '',
      rank:        '',
      fields:      [],
      gmNote:      '',
      quote:       '',
      tags:        [],
      headerClass: resolved.group.headerClass || 'h-neutral',
    };
  }

  function initDrag(pinEl, pin) {
    const header = pinEl.querySelector('.card-header');
    if (!header) return;

    header.style.cursor = 'grab';

    header.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      e.preventDefault();

      const startMouseX = e.clientX;
      const startMouseY = e.clientY;
      const startPinX   = pin.x;
      const startPinY   = pin.y;

      /* Capture grab offset relative to the pin's viewport rect at mousedown.
         Used to anchor the ghost so the cursor stays at the same spot on the card. */
      const pinRect     = pinEl.getBoundingClientRect();
      const grabOffsetX = startMouseX - pinRect.left;
      const grabOffsetY = startMouseY - pinRect.top;

      let dragged   = false;
      let inNavZone = false;
      let ghost     = null;

      pinEl.style.zIndex = ++_zTop;

      function sidebarRight() {
        const sb = document.getElementById('sidebar');
        return sb ? sb.getBoundingClientRect().right : 0;
      }

      function onMove(ev) {
        const dx = ev.clientX - startMouseX;
        const dy = ev.clientY - startMouseY;

        if (!dragged && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
          dragged = true;
          pinEl.classList.add('dragging');
          header.style.cursor = 'grabbing';

          /* Create a fixed-position ghost that escapes overflow:hidden */
          ghost = document.createElement('div');
          ghost.className = 'board-pin-ghost';
          ghost.style.cssText =
            `position:fixed;pointer-events:none;z-index:99999;` +
            `left:${startMouseX - grabOffsetX}px;top:${startMouseY - grabOffsetY}px;` +
            `transform-origin:${grabOffsetX}px ${grabOffsetY}px;` +
            `transition:transform 0.15s ease;`;
          ghost.appendChild(pinEl.querySelector('.card').cloneNode(true));
          document.body.appendChild(ghost);

          /* Dim the original pin on the canvas */
          pinEl.style.opacity = '0.2';
        }

        if (!dragged) return;

        /* Ghost follows cursor */
        ghost.style.left = (ev.clientX - grabOffsetX) + 'px';
        ghost.style.top  = (ev.clientY - grabOffsetY) + 'px';

        const overSidebar = ev.clientX <= sidebarRight();

        if (overSidebar && !inNavZone) {
          inNavZone = true;
          Endale.enterNavDrop(pageId => {
            Endale.addCardToPage(pageId, extractCardData(pin));
          });
        } else if (!overSidebar && inNavZone) {
          inNavZone = false;
          Endale.exitNavDrop();
        }

        /* Scale ghost down over sidebar, normal size over canvas */
        ghost.style.transform = inNavZone ? 'scale(0.45)' : '';

        /* Only update the canvas pin position while on the canvas */
        if (!inNavZone) {
          pin.x = Math.max(0, startPinX + dx / _scale);
          pin.y = Math.max(0, startPinY + dy / _scale);
          pinEl.style.left = pin.x + 'px';
          pinEl.style.top  = pin.y + 'px';
        }
      }

      function onUp(ev) {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        pinEl.classList.remove('dragging');
        pinEl.style.opacity = '';
        header.style.cursor = 'grab';

        if (ghost) { ghost.remove(); ghost = null; }

        if (inNavZone) {
          Endale.resolveNavDrop(ev.clientX, ev.clientY);
          inNavZone = false;
        } else if (!dragged) {
          pinEl.querySelector('.card').classList.toggle('open');
        } else {
          saveState();
        }
      }

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  }

  /* ════════════════════════════════════════════
     INLINE EDITING
     Only available on expanded cards (type: 'cards').
     Double-click the card body to enter edit mode.
  ════════════════════════════════════════════ */

  function initEdit(pinEl, pin) {
    /* Roster and reference cards have no editable field structure */
    if (!pin.isCustom && pin.groupType !== 'cards') return;

    const body = pinEl.querySelector('.card-body');
    if (!body) return;

    body.addEventListener('dblclick', e => {
      if (pinEl.classList.contains('editing')) return;
      e.stopPropagation();
      e.preventDefault();
      enterEditMode(pinEl, pin);
    });
  }

  function enterEditMode(pinEl, pin) {
    pinEl.classList.add('editing');

    /* Make sure the card is expanded */
    pinEl.querySelector('.card').classList.add('open');

    const body = pinEl.querySelector('.card-body');

    /* Snapshot originals for cancel */
    const snap = {};
    body.querySelectorAll('.field-value').forEach((el, i) => { snap[`fv${i}`] = el.textContent; });
    const quoteEl   = body.querySelector('.quote');
    const gmNoteEl  = body.querySelector('.gm-note-text');
    if (quoteEl)  snap.quote  = quoteEl.textContent;
    if (gmNoteEl) snap.gmNote = gmNoteEl.textContent;

    /* Make elements contenteditable */
    const editables = [];
    body.querySelectorAll('.field-value').forEach(el => {
      el.contentEditable = 'true';
      el.spellcheck = false;
      editables.push(el);
    });
    if (quoteEl)  { quoteEl.contentEditable  = 'true'; quoteEl.spellcheck  = false; editables.push(quoteEl); }
    if (gmNoteEl) { gmNoteEl.contentEditable = 'true'; gmNoteEl.spellcheck = false; editables.push(gmNoteEl); }

    /* Edit toolbar */
    const toolbar = document.createElement('div');
    toolbar.className = 'card-edit-toolbar';
    toolbar.innerHTML =
      `<span class="card-edit-label">Editing</span>
       <button class="card-edit-cancel">Cancel</button>
       <button class="card-edit-save">✓ Save</button>`;
    body.appendChild(toolbar);

    /* Focus first editable, cursor at end */
    if (editables[0]) {
      editables[0].focus();
      const range = document.createRange();
      range.selectNodeContents(editables[0]);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }

    /* Escape → cancel */
    function onKey(e) {
      if (e.key === 'Escape') { e.stopPropagation(); cancel(); }
    }
    pinEl.addEventListener('keydown', onKey);

    function cancel() {
      /* Restore snapshots */
      body.querySelectorAll('.field-value').forEach((el, i) => {
        if (snap[`fv${i}`] !== undefined) el.textContent = snap[`fv${i}`];
      });
      if (quoteEl  && snap.quote  !== undefined) quoteEl.textContent  = snap.quote;
      if (gmNoteEl && snap.gmNote !== undefined) gmNoteEl.textContent = snap.gmNote;
      exitEditMode(pinEl);
      pinEl.removeEventListener('keydown', onKey);
    }

    toolbar.querySelector('.card-edit-cancel').addEventListener('click', e => {
      e.stopPropagation(); cancel();
    });
    toolbar.querySelector('.card-edit-save').addEventListener('click', e => {
      e.stopPropagation();
      commitEdit(pinEl, pin);
      pinEl.removeEventListener('keydown', onKey);
    });
  }

  function exitEditMode(pinEl) {
    pinEl.classList.remove('editing');
    pinEl.querySelectorAll('[contenteditable]').forEach(el => {
      el.removeAttribute('contenteditable');
      el.removeAttribute('spellcheck');
    });
    const toolbar = pinEl.querySelector('.card-edit-toolbar');
    if (toolbar) toolbar.remove();
  }

  function commitEdit(pinEl, pin) {
    const body = pinEl.querySelector('.card-body');

    /* Read edited values */
    const fieldValues = [...body.querySelectorAll('.field-value')]
      .map(el => el.textContent.trim());
    const quoteEl   = body.querySelector('.quote');
    const gmNoteEl  = body.querySelector('.gm-note-text');
    const quoteText  = quoteEl  ? quoteEl.textContent.trim()  : null;
    const gmNoteText = gmNoteEl ? gmNoteEl.textContent.trim() : null;

    if (pin.isCustom) {
      /* Write edits directly to the single custom card store */
      const card = loadCustomCardById(pin._customId);
      if (!card) { exitEditMode(pinEl); return; }
      card.fields.forEach((f, i) => {
        if (fieldValues[i] !== undefined) f.value = fieldValues[i];
      });
      if (quoteText  !== null) card.quote  = quoteText;
      if (gmNoteText !== null) card.gmNote = gmNoteText;
      Endale.saveCustomCard(card);
      syncCustomPins(pin._customId, card, pinEl);
    } else {
      /* Build override from original entry + edits */
      const resolved = resolvePin(pin);
      const origFields = (resolved && resolved.entry) ? resolved.entry.fields : [];

      const override = loadOverrides()[wikiKey(pin)] || {};
      override.fields = origFields.map((f, i) => ({
        label: f.label,
        value: fieldValues[i] !== undefined ? fieldValues[i] : f.value,
      }));
      if (quoteText  !== null) override.quote  = quoteText;
      if (gmNoteText !== null) override.gmNote = gmNoteText;

      const overrides = loadOverrides();
      overrides[wikiKey(pin)] = override;
      saveOverrides(overrides);

      /* Sync DOM of all other pinned instances of the same entry */
      syncWikiPins(pin.pageId, pin.gi, pin.ei, override, pinEl);
    }

    exitEditMode(pinEl);
  }

  /* Sync all board pins referencing the same custom card after a store write */
  function syncCustomPins(customId, card, skipEl) {
    _canvas.querySelectorAll('.board-pin').forEach(el => {
      if (el === skipEl || el.classList.contains('editing')) return;
      const pin = _state.pins.find(p => p.id === el.dataset.pinId);
      if (!pin || !pin.isCustom || pin._customId !== customId) return;
      el.querySelectorAll('.field-value').forEach((fv, i) => {
        if (card.fields[i] !== undefined) fv.textContent = card.fields[i].value;
      });
      const q   = el.querySelector('.quote');
      const gnt = el.querySelector('.gm-note-text');
      if (q   && card.quote  !== undefined) q.textContent   = card.quote;
      if (gnt && card.gmNote !== undefined) gnt.textContent = card.gmNote;
    });
  }

  /* Update sibling pins of the same wiki entry without a full re-render */
  function syncWikiPins(pageId, gi, ei, override, skipEl) {
    _canvas.querySelectorAll('.board-pin').forEach(el => {
      if (el === skipEl || el.classList.contains('editing')) return;
      const pin = _state.pins.find(p => p.id === el.dataset.pinId);
      if (!pin || pin.isCustom || pin.pageId !== pageId || pin.gi !== gi || pin.ei !== ei) return;

      el.querySelectorAll('.field-value').forEach((fv, i) => {
        if (override.fields && override.fields[i] !== undefined)
          fv.textContent = override.fields[i].value;
      });
      const q   = el.querySelector('.quote');
      const gnt = el.querySelector('.gm-note-text');
      if (q   && override.quote  !== undefined) q.textContent   = override.quote;
      if (gnt && override.gmNote !== undefined) gnt.textContent = override.gmNote;
    });
  }

  /* ════════════════════════════════════════════
     ADD-CARD MODAL
  ════════════════════════════════════════════ */

  let _catalogue = null;

  function openModal() {
    _catalogue = getAllCardEntries();
    document.getElementById('board-search').value = '';
    populateModalList('');
    document.getElementById('board-modal').classList.remove('hidden');
    setTimeout(() => document.getElementById('board-search').focus(), 50);
  }

  function closeModal() {
    document.getElementById('board-modal').classList.add('hidden');
  }

  function populateModalList(filter) {
    const list  = document.getElementById('board-modal-list');
    const items = filter
      ? _catalogue.filter(c =>
          c.name.toLowerCase().includes(filter) ||
          c.role.toLowerCase().includes(filter) ||
          pageLabel(c.pageId).toLowerCase().includes(filter))
      : _catalogue;

    if (!items.length) {
      list.innerHTML = `<div class="board-modal-empty">No cards match "${esc(filter)}".</div>`;
      return;
    }

    list.innerHTML = items.map(c => `
      <div class="board-modal-item"
           data-page="${esc(c.pageId)}"
           data-gi="${c.gi}"
           data-ei="${c.ei == null ? '' : c.ei}"
           data-group-type="${esc(c.groupType)}">
        <span class="bmi-name">${esc(c.name)}</span>
        <span class="bmi-meta">${esc(c.role)}${c.role ? ' · ' : ''}${esc(pageLabel(c.pageId))}</span>
      </div>`).join('');

    list.querySelectorAll('.board-modal-item').forEach(item => {
      item.addEventListener('click', () => {
        const ei = item.dataset.ei === '' ? null : +item.dataset.ei;
        addPin(item.dataset.page, +item.dataset.gi, ei, item.dataset.groupType);
        closeModal();
      });
    });
  }

  function addPin(pageId, gi, ei, groupType) {
    const vw = _viewport ? _viewport.clientWidth  : 800;
    const vh = _viewport ? _viewport.clientHeight : 600;
    const cx = (vw / 2 - _tx) / _scale;
    const cy = (vh / 2 - _ty) / _scale;
    const offset = (_state.pins.length % 8) * 24;
    const pin = {
      id: uid(), pageId, gi, ei, groupType,
      x: Math.max(0, cx - 170 + offset),
      y: Math.max(0, cy - 80  + offset),
    };
    _state.pins.push(pin);
    saveState();
    renderPin(pin);
  }

  /* ════════════════════════════════════════════
     CREATION WIZARD — delegated to Endale.openCardWizard
  ════════════════════════════════════════════ */

  function openWizard(canvasX, canvasY) {
    _wizPos = { x: canvasX, y: canvasY };
    Endale.openCardWizard(cardData => {
      const pinId = cardData._customId;
      const pin = {
        id:        pinId,
        isCustom:  true,
        _customId: pinId,
        x:         Math.max(0, _wizPos.x - 170),
        y:         Math.max(0, _wizPos.y - 40),
      };
      _state.pins.push(pin);
      saveState();
      renderPin(pin);
    });
  }

  /* ════════════════════════════════════════════
     CLEANUP
  ════════════════════════════════════════════ */

  function cleanup(container) {
    container.classList.remove('board-page');
  }

  return { render, cleanup };

})();
