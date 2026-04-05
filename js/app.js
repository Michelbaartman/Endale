/* ═══════════════════════════════════════════════
   ENDALE — App shell
   Handles page registry, routing, and nav.
   ═══════════════════════════════════════════════ */

const Endale = (() => {

  const NAV_KEY       = 'endale-nav';
  const ADDITIONS_KEY = 'endale-additions';
  const HIDDEN_KEY    = 'endale-hidden';
  const ACTIVE_PAGE   = 'sessions/board';
  const DEFAULT_PAGE  = 'characters/player-characters';

  /* ── Page registry ── */

  const _pages = {};

  function registerPage(id, data) {
    _pages[id] = data;
  }

  /* ── Default nav structure
     sessions/board lives in Active Manager — not listed here. ── */

  const NAV_DEFAULT = [
    { id: 'characters', label: 'Characters', children: [
      { id: 'characters/player-characters',  label: 'Player Characters' },
      { id: 'characters/key-individuals',    label: 'Key Individuals' },
      { id: 'characters/lionguard',          label: 'Lionguard' },
      { id: 'characters/applecrumb-faction', label: 'Applecrumb Faction' },
      { id: 'characters/ratkin',             label: 'Ratkin Crew' },
      { id: 'characters/fonn-civilians',     label: 'Fonn Civilians' },
    ]},
    { id: 'locations', label: 'Locations', children: [
      { id: 'locations/fonn', label: 'Fonn' },
    ]},
    { id: 'factions',  label: 'Factions',  children: [] },
    { id: 'story',     label: 'Story',     children: [
      { id: 'story/threads', label: 'Story Threads' },
    ]},
    { id: 'sessions',  label: 'Sessions',  children: [
      { id: 'sessions/log', label: 'Session Log' },
    ]},
    { id: 'world',     label: 'World',     children: [
      { id: 'world/overview', label: 'World Overview' },
    ]},
    { id: 'lore',      label: 'Lore',      children: [
      { id: 'lore/items', label: 'Items of Note' },
    ]},
    { id: 'rules',     label: 'Rules',     children: [
      { id: 'rules/dm-cheatsheet', label: 'DM Cheatsheet' },
    ]},
  ];

  /* ── Nav persistence ── */

  let _nav = [];

  function loadNav() {
    try {
      const stored = JSON.parse(localStorage.getItem(NAV_KEY));
      if (Array.isArray(stored) && stored.length) return stored;
    } catch {}
    return JSON.parse(JSON.stringify(NAV_DEFAULT));
  }

  function saveNav() {
    localStorage.setItem(NAV_KEY, JSON.stringify(_nav));
  }

  /* ── Additions persistence ── */

  function loadAdditions() {
    try { return JSON.parse(localStorage.getItem(ADDITIONS_KEY)) || {}; }
    catch { return {}; }
  }

  function saveAdditions(additions) {
    localStorage.setItem(ADDITIONS_KEY, JSON.stringify(additions));
  }

  /* ── Hidden entries (original cards removed from a page) ── */

  function loadHidden() {
    try { return JSON.parse(localStorage.getItem(HIDDEN_KEY)) || {}; }
    catch { return {}; }
  }

  function saveHidden(hidden) {
    localStorage.setItem(HIDDEN_KEY, JSON.stringify(hidden));
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  /* ── DOM refs ── */

  const sidebar   = document.getElementById('sidebar');
  const navTree   = document.getElementById('nav-tree');
  const pageTitle = document.getElementById('page-title');
  const pageSub   = document.getElementById('page-subtitle');
  const pageBody  = document.getElementById('page-body');

  /* ── Delete / edit mode ── */

  let _deleteMode = false;

  /* ════════════════════════════════════════════
     ACTIVE MANAGER — pinned, locked link
  ════════════════════════════════════════════ */

  function buildActiveManager() {
    const el = document.getElementById('active-manager');
    if (!el) return;
    el.innerHTML =
      `<div class="am-label">Active Session</div>
       <div id="am-link" class="am-link">Active Manager</div>`;
    document.getElementById('am-link').addEventListener('click', () => navigate(ACTIVE_PAGE));
  }

  /* ════════════════════════════════════════════
     NAV BUILDER
  ════════════════════════════════════════════ */

  function buildNav() {
    /* Clean up any orphaned ghost elements from interrupted drags */
    document.body.querySelectorAll('.nav-section-ghost').forEach(g => g.remove());

    navTree.innerHTML = _nav.map((section, si) => {
      const hasChildren = section.children.length > 0;

      const childrenHTML = section.children.map((child, ci) => {
        const isStub = !_pages[child.id];
        return `<div class="nav-item${isStub ? ' stub' : ''}"
                     data-page="${child.id}"
                     data-si="${si}" data-ci="${ci}">
                  <span class="nav-item-label">${child.label}</span>
                  <button class="nav-delete-btn" data-ds="${si}" data-dc="${ci}" title="Remove from nav">✕</button>
                </div>`;
      }).join('');

      return `
        <div class="nav-section${section._open ? ' open' : ''}"
             data-section-idx="${si}"
             data-section="${section.id}">
          <div class="nav-section-header${hasChildren ? ' has-children' : ''}">
            <span class="nav-drag-handle" title="Drag to reorder">⠿</span>
            <span class="nav-section-label">${section.label}</span>
            ${hasChildren ? `<span class="nav-arrow">&#9658;</span>` : ''}
            <button class="nav-delete-btn" data-ds="${si}" title="Remove section">✕</button>
          </div>
          ${hasChildren ? `<div class="nav-children">${childrenHTML}</div>` : ''}
        </div>`;
    }).join('');

    navTree.classList.toggle('delete-mode', _deleteMode);

    attachNavEvents();
    initSectionDrag();
  }

  function attachNavEvents() {
    /* Section expand / collapse */
    navTree.querySelectorAll('.nav-section-header.has-children').forEach(header => {
      header.addEventListener('click', e => {
        if (e.target.closest('.nav-drag-handle') || e.target.closest('.nav-delete-btn')) return;
        const sectionEl = header.closest('.nav-section');
        const si = +sectionEl.dataset.sectionIdx;
        _nav[si]._open = !_nav[si]._open;
        sectionEl.classList.toggle('open', _nav[si]._open);
        saveNav();
      });
    });

    /* Page navigation clicks */
    navTree.querySelectorAll('.nav-item:not(.stub)').forEach(item => {
      item.addEventListener('click', e => {
        if (e.target.closest('.nav-delete-btn')) return;
        navigate(item.dataset.page);
      });
    });

    /* Delete buttons — only fire when _deleteMode is active */
    navTree.querySelectorAll('.nav-delete-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (!_deleteMode) return;

        const si = btn.dataset.ds !== undefined ? +btn.dataset.ds : null;
        const ci = btn.dataset.dc !== undefined ? +btn.dataset.dc : null;

        if (ci !== null && !isNaN(ci)) {
          /* Remove a single page item from the section */
          _nav[si].children.splice(ci, 1);
          saveNav();
          buildNav();
        } else if (si !== null && !isNaN(si)) {
          /* Remove entire section — requires confirmation */
          if (!confirm(`Remove section "${_nav[si].label}"?\n(Pages are not deleted, only hidden from the nav.)`)) return;
          _nav.splice(si, 1);
          saveNav();
          buildNav();
        }
      });
    });
  }

  /* ════════════════════════════════════════════
     SECTION DRAG-TO-REORDER
  ════════════════════════════════════════════ */

  function initSectionDrag() {
    navTree.querySelectorAll('.nav-drag-handle').forEach(handle => {
      handle.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
        e.preventDefault();
        e.stopPropagation();
        startSectionDrag(handle.closest('.nav-section'), e);
      });
    });
  }

  function startSectionDrag(sectionEl, startEvent) {
    const si   = +sectionEl.dataset.sectionIdx;
    const rect = sectionEl.getBoundingClientRect();

    /* Ghost follows the cursor */
    const ghost = sectionEl.cloneNode(true);
    ghost.className += ' nav-section-ghost';
    ghost.style.cssText =
      `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;` +
      `pointer-events:none;z-index:9999;opacity:0.75;`;
    document.body.appendChild(ghost);

    /* Placeholder holds the original space */
    const ph = document.createElement('div');
    ph.className = 'nav-section-placeholder';
    ph.style.height = rect.height + 'px';
    sectionEl.parentNode.insertBefore(ph, sectionEl);
    sectionEl.classList.add('dragging-section');

    function onMove(ev) {
      ghost.style.top  = (ev.clientY - 14) + 'px';
      ghost.style.left = rect.left + 'px';

      /* Slide placeholder to show insertion point */
      const others = [...navTree.querySelectorAll('.nav-section:not(.dragging-section)')];
      let insertBefore = null;
      for (const s of others) {
        const r = s.getBoundingClientRect();
        if (ev.clientY < r.top + r.height / 2) { insertBefore = s; break; }
      }
      if (insertBefore) navTree.insertBefore(ph, insertBefore);
      else              navTree.appendChild(ph);
    }

    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      ghost.remove();

      /* Count real sections before the placeholder to find insertion index */
      let insertPos = 0;
      for (const child of navTree.children) {
        if (child === ph) break;
        if (child.classList.contains('nav-section') && !child.classList.contains('dragging-section'))
          insertPos++;
      }

      ph.remove();
      sectionEl.classList.remove('dragging-section');

      const [moved] = _nav.splice(si, 1);
      _nav.splice(insertPos, 0, moved);
      saveNav();
      buildNav();
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  /* ════════════════════════════════════════════
     SIDEBAR FOOTER — + Section and Edit buttons
  ════════════════════════════════════════════ */

  function buildNavFooter() {
    document.getElementById('nav-add-section-btn').addEventListener('click', () => {
      const label = prompt('New section name:');
      if (!label || !label.trim()) return;
      _nav.push({ id: 'custom-' + uid(), label: label.trim(), children: [], _open: true });
      saveNav();
      buildNav();
    });

    const editBtn = document.getElementById('nav-edit-btn');
    editBtn.addEventListener('click', () => {
      _deleteMode = !_deleteMode;
      navTree.classList.toggle('delete-mode', _deleteMode);
      editBtn.textContent = _deleteMode ? 'Done' : 'Edit';
      editBtn.classList.toggle('edit-active', _deleteMode);
    });
  }

  /* ════════════════════════════════════════════
     NAV DROP MODE — called by board.js during drag-to-nav
  ════════════════════════════════════════════ */

  let _navDropCb = null;

  function enterNavDrop(callback) {
    if (_navDropCb) return; /* already active */
    _navDropCb = callback;

    sidebar.classList.add('nav-drop-active');
    navTree.classList.add('nav-drop-mode');

    /* Open all sections so every page item is reachable */
    navTree.querySelectorAll('.nav-section').forEach(s => s.classList.add('open'));

    navTree.querySelectorAll('.nav-item:not(.stub)').forEach(item => {
      item.addEventListener('mouseenter', _navItemEnter);
      item.addEventListener('mouseleave', _navItemLeave);
    });
  }

  function _navItemEnter() { this.classList.add('nav-drop-target'); }
  function _navItemLeave() { this.classList.remove('nav-drop-target'); }

  function exitNavDrop() {
    const cb = _navDropCb;
    _navDropCb = null;

    sidebar.classList.remove('nav-drop-active');
    navTree.classList.remove('nav-drop-mode');

    /* Restore each section's saved open state */
    _nav.forEach((sec, si) => {
      const el = navTree.querySelector(`[data-section-idx="${si}"]`);
      if (el) el.classList.toggle('open', !!sec._open);
    });

    navTree.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('nav-drop-target');
      item.removeEventListener('mouseenter', _navItemEnter);
      item.removeEventListener('mouseleave', _navItemLeave);
    });

    return cb; /* caller may invoke it */
  }

  function resolveNavDrop(clientX, clientY) {
    const el   = document.elementFromPoint(clientX, clientY);
    const item = el && el.closest('.nav-item:not(.stub)');
    const cb   = exitNavDrop();
    if (item && cb) cb(item.dataset.page);
  }

  /* ── Add a card entry to a wiki page ── */

  function addCardToPage(pageId, cardData) {
    if (!cardData || pageId === ACTIVE_PAGE) return;
    const additions = loadAdditions();
    if (!additions[pageId]) additions[pageId] = [];
    additions[pageId].push({ ...cardData, _additionId: uid() });
    saveAdditions(additions);
    /* Refresh immediately if the user is already on that page */
    if (currentHash() === pageId) render(pageId);
  }

  /* ════════════════════════════════════════════
     ROUTING
  ════════════════════════════════════════════ */

  function currentHash() {
    return window.location.hash.replace(/^#/, '') || DEFAULT_PAGE;
  }

  function navigate(pageId) {
    window.location.hash = pageId;
  }

  function render(pageId) {
    /* Active Manager highlight */
    const amLink = document.getElementById('am-link');
    if (amLink) amLink.classList.toggle('active', pageId === ACTIVE_PAGE);

    /* Active nav item */
    navTree.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === pageId);
    });

    /* Open the parent section */
    _nav.forEach(section => {
      const isParent = section.children.some(c => c.id === pageId);
      if (isParent) {
        const sectionEl = navTree.querySelector(`[data-section="${section.id}"]`);
        if (sectionEl) { sectionEl.classList.add('open'); section._open = true; }
      }
    });

    const data = _pages[pageId];

    if (!data) {
      pageTitle.textContent = pageId;
      pageSub.textContent   = '';
      pageBody.innerHTML    = '<p class="stub-message">Nothing here yet.</p>';
      return;
    }

    pageTitle.textContent = data.title;
    pageSub.textContent   = data.subtitle || '';

    if (data.type === 'board') {
      pageBody.classList.add('board-page');
      Board.render(pageBody);
    } else {
      pageBody.classList.remove('board-page');
      Cards.renderPage(enrichPage(pageId, data), pageBody);
      Images.attach(pageBody);
      attachDeleteButtons(pageBody);
    }
  }

  /* ════════════════════════════════════════════
     ENRICH PAGE — merges overrides + drag-dropped additions
  ════════════════════════════════════════════ */

  function enrichPage(pageId, data) {
    if (!data.groups) return data;

    let overrides;
    try { overrides = JSON.parse(localStorage.getItem('endale-overrides')) || {}; }
    catch { overrides = {}; }

    const additions     = loadAdditions();
    const pageAdditions = additions[pageId] || [];
    const hidden        = loadHidden();

    /* Apply field overrides to every cards-type group */
    let groups = data.groups.map((group, gi) => {
      if (group.type !== 'cards') return group;
      return {
        ...group,
        entries: group.entries.map((entry, ei) => {
          const key      = `${pageId}|${gi}|${ei}`;
          const ov       = overrides[key];
          const isHidden = !!hidden[key];
          return {
            ...entry,
            _imgKey:     key,
            _imgName:    entry.name,
            _hidden:     isHidden || undefined,
            _deleteInfo: isHidden ? undefined : { type: 'original', key },
            ...(ov && {
              fields: ov.fields !== undefined ? ov.fields : entry.fields,
              gmNote: ov.gmNote !== undefined ? ov.gmNote : entry.gmNote,
              quote:  ov.quote  !== undefined ? ov.quote  : entry.quote,
            }),
          };
        }),
      };
    });

    /* Append drag-dropped additions to the first cards group */
    if (pageAdditions.length) {
      const addEntries = pageAdditions.map(a => {
        if (a._ref) {
          /* Reference to an existing wiki card — resolve it live so
             images and overrides share the same key as the original. */
          const origPage  = _pages[a._refPageId];
          if (!origPage || !origPage.groups) return null;
          const origGroup = origPage.groups[a._refGi];
          if (!origGroup || !origGroup.entries) return null;
          const origEntry = origGroup.entries[a._refEi];
          if (!origEntry) return null;

          const key = `${a._refPageId}|${a._refGi}|${a._refEi}`;
          const ov  = overrides[key];
          return {
            ...origEntry,
            _imgKey:     key,
            _imgName:    origEntry.name,
            _deleteInfo: { type: 'addition', targetPageId: pageId, additionId: a._additionId },
            ...(ov && {
              fields: ov.fields !== undefined ? ov.fields : origEntry.fields,
              gmNote: ov.gmNote !== undefined ? ov.gmNote : origEntry.gmNote,
              quote:  ov.quote  !== undefined ? ov.quote  : origEntry.quote,
            }),
          };
        }

        /* Custom card addition — standalone copy */
        return {
          name:        a.name   || 'Unnamed',
          role:        a.role   || '',
          rank:        [a.rank  || 'Session Card', ''],
          fields:      a.fields || [],
          gmNote:      a.gmNote || '',
          quote:       a.quote  || '',
          tags:        a.tags   || [],
          _imgKey:     `addition|${pageId}|${a._additionId}`,
          _imgName:    a.name,
          _deleteInfo: { type: 'addition', targetPageId: pageId, additionId: a._additionId },
        };
      }).filter(Boolean);

      const idx = groups.findIndex(g => g.type === 'cards');
      if (idx >= 0) {
        groups = groups.map((g, i) =>
          i === idx ? { ...g, entries: [...g.entries, ...addEntries] } : g
        );
      } else {
        groups = [...groups, { type: 'cards', headerClass: 'h-neutral', entries: addEntries }];
      }
    }

    return { ...data, groups };
  }

  /* ════════════════════════════════════════════
     CARD DELETION — wiki pages only, not the board
  ════════════════════════════════════════════ */

  function attachDeleteButtons(container) {
    container.querySelectorAll('.card[data-delete-type]').forEach(card => {
      const body = card.querySelector('.card-body');
      if (!body) return;

      const divider = document.createElement('div');
      divider.className = 'divider';

      const btn = document.createElement('button');
      btn.className   = 'card-remove-btn';
      btn.textContent = 'Remove from this group';

      body.appendChild(divider);
      body.appendChild(btn);

      btn.addEventListener('click', e => {
        e.stopPropagation();
        const type = card.dataset.deleteType;
        const info = type === 'original'
          ? { type: 'original', key: card.dataset.deleteKey }
          : { type: 'addition', targetPageId: card.dataset.deleteTid, additionId: card.dataset.deleteAid };
        const name = card.querySelector('.card-name')?.textContent || 'this card';
        showDeleteConfirm(name, () => deleteCardFromGroup(info));
      });
    });
  }

  function showDeleteConfirm(cardName, onYes) {
    const overlay = document.createElement('div');
    overlay.className = 'card-delete-modal';

    const inner = document.createElement('div');
    inner.className = 'card-delete-modal-inner';

    const msg = document.createElement('p');
    msg.className = 'card-delete-modal-msg';
    msg.appendChild(document.createTextNode('Do you really want to delete '));
    const strong = document.createElement('strong');
    strong.textContent = cardName;
    msg.appendChild(strong);
    msg.appendChild(document.createTextNode('?'));

    const btns = document.createElement('div');
    btns.className = 'card-delete-modal-btns';
    btns.innerHTML =
      `<button class="cdm-btn cdm-no">No</button>
       <button class="cdm-btn cdm-yes">Yes</button>`;

    inner.appendChild(msg);
    inner.appendChild(btns);
    overlay.appendChild(inner);
    document.body.appendChild(overlay);

    inner.querySelector('.cdm-no').addEventListener('click',  () => overlay.remove());
    inner.querySelector('.cdm-yes').addEventListener('click', () => { overlay.remove(); onYes(); });
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  }

  function deleteCardFromGroup(info) {
    if (info.type === 'original') {
      const hidden = loadHidden();
      hidden[info.key] = true;
      saveHidden(hidden);
    } else {
      const additions = loadAdditions();
      if (additions[info.targetPageId]) {
        additions[info.targetPageId] = additions[info.targetPageId]
          .filter(a => a._additionId !== info.additionId);
        saveAdditions(additions);
      }
    }
    render(currentHash());
  }

  /* ════════════════════════════════════════════
     BOOT
  ════════════════════════════════════════════ */

  function init() {
    _nav = loadNav();
    buildActiveManager();
    buildNav();
    buildNavFooter();
    render(currentHash());
    window.addEventListener('hashchange', () => render(currentHash()));
  }

  return {
    registerPage,
    init,
    getPages:       () => ({ ..._pages }),
    /* Board ↔ Nav bridge */
    enterNavDrop,
    exitNavDrop,
    resolveNavDrop,
    addCardToPage,
  };

})();

document.addEventListener('DOMContentLoaded', () => Endale.init());
