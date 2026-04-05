/* ═══════════════════════════════════════════════
   ENDALE — App shell
   Handles page registry, routing, and nav.
   ═══════════════════════════════════════════════ */

const Endale = (() => {

  const NAV_KEY          = 'endale-nav';
  const ADDITIONS_KEY    = 'endale-additions';
  const HIDDEN_KEY       = 'endale-hidden';
  const CUSTOM_CARDS_KEY = 'endale-custom-cards';
  const ACTIVE_PAGE   = 'sessions/board';
  const MAP_PAGE      = 'map-builder';
  const CATALOGUE_PAGE = 'catalogue';
  const DEFAULT_PAGE  = 'characters/player-characters';

  /* ── Core nav — tools (locked) ── */
  const CORE_NAV = [
    { id: ACTIVE_PAGE,   icon: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="display:inline-block;vertical-align:middle"><circle cx="6" cy="3.5" r="2.4" fill="currentColor"/><path d="M1 11.5c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>', label: 'Active Manager' },
    { id: MAP_PAGE,      icon: '⊞', label: 'Map Builder' },
  ];

  /* ── Reference nav — quick-access pages (locked) ── */
  const REF_NAV = [
    { id: 'rules/dm-cheatsheet', label: 'DM Cheatsheet'   },
    { id: 'sessions/recap',      label: 'Session Recap'   },
    { id: 'story/threads',       label: 'Story Threads'   },
    { id: CATALOGUE_PAGE,        label: 'Full Catalogue'  },
  ];

  /* ── Page registry ── */

  const _pages = {};

  function registerPage(id, data) {
    _pages[id] = data;
  }

  /* ── Card Groups nav — user-editable page links ── */

  const NAV_DEFAULT = [
    { id: 'characters', label: 'Characters', _open: true, children: [
      { id: 'characters/player-characters',  label: 'Player Characters' },
      { id: 'characters/key-individuals',    label: 'Key Individuals' },
      { id: 'characters/lionguard',          label: 'Lionguard' },
      { id: 'characters/applecrumb-faction', label: 'Applecrumb Faction' },
      { id: 'characters/ratkin',             label: 'Ratkin Crew' },
      { id: 'characters/fonn-civilians',     label: 'Fonn Civilians' },
    ]},
    { id: 'world', label: 'World', children: [
      { id: 'locations/fonn',  label: 'Fonn' },
      { id: 'world/overview',  label: 'World Overview' },
      { id: 'lore/items',      label: 'Items of Note' },
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

  /* ── Custom card store — cards created via Active Manager wizard ── */

  function loadCustomCards() {
    try { return JSON.parse(localStorage.getItem(CUSTOM_CARDS_KEY)) || []; }
    catch { return []; }
  }

  function saveCustomCard(cardData) {
    const cards = loadCustomCards();
    const idx   = cards.findIndex(c => c._customId === cardData._customId);
    if (idx >= 0) cards[idx] = cardData;
    else          cards.push(cardData);
    localStorage.setItem(CUSTOM_CARDS_KEY, JSON.stringify(cards));
  }

  function deleteCustomCard(customId) {
    /* Remove from custom card store */
    const cards = loadCustomCards().filter(c => c._customId !== customId);
    localStorage.setItem(CUSTOM_CARDS_KEY, JSON.stringify(cards));

    /* Remove all addition refs that originated from this custom card */
    const additions = loadAdditions();
    let changed = false;
    for (const [pageId, arr] of Object.entries(additions)) {
      const filtered = arr.filter(a => a._customId !== customId);
      if (filtered.length !== arr.length) { additions[pageId] = filtered; changed = true; }
    }
    if (changed) saveAdditions(additions);

    /* Remove matching pins from endale-board */
    try {
      const board = JSON.parse(localStorage.getItem('endale-board') || '{}');
      if (board.pins) {
        board.pins = board.pins.filter(p => p._customId !== customId);
        localStorage.setItem('endale-board', JSON.stringify(board));
      }
    } catch { /* ignore */ }
  }

  function deleteWikiCard(pageId, gi, ei) {
    /* Hide the original entry */
    const hidden = loadHidden();
    hidden[`${pageId}|${gi}|${ei}`] = true;
    saveHidden(hidden);

    /* Remove any addition refs pointing at this exact entry */
    const additions = loadAdditions();
    let changed = false;
    for (const [pid, arr] of Object.entries(additions)) {
      const filtered = arr.filter(
        a => !(a._ref && a._refPageId === pageId && a._refGi === gi && a._refEi === ei)
      );
      if (filtered.length !== arr.length) { additions[pid] = filtered; changed = true; }
    }
    if (changed) saveAdditions(additions);
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  /* ════════════════════════════════════════════
     CARD CREATION WIZARD — shared across all pages
  ════════════════════════════════════════════ */

  const CARD_TYPES = [
    {
      id: 'character', label: 'Character', desc: 'Individual NPC or player character',
      header: 'h-neutral', rank: 'Character',
      typeFields: [
        { id: 'race',         label: 'Race / Class',   type: 'text',     ph: 'e.g. Human Rogue, Foxkin Mage' },
        { id: 'motivation',   label: 'Motivation',     type: 'text',     ph: 'What drives them' },
        { id: 'relationship', label: 'Relationship',   type: 'text',     ph: 'Relation to the party' },
      ],
    },
    {
      id: 'roster', label: 'Multiple Characters', desc: 'A named group of people',
      header: 'h-guard', rank: 'Roster',
      typeFields: [],
    },
    {
      id: 'location', label: 'Location', desc: 'A place, building, or region',
      header: 'h-town', rank: 'Location',
      typeFields: [
        { id: 'atmosphere', label: 'Atmosphere',         type: 'textarea', ph: 'Mood, sights, smells…', rows: 2 },
        { id: 'npcs',       label: 'NPCs Present',       type: 'text',     ph: 'Who is here' },
        { id: 'poi',        label: 'Points of Interest', type: 'textarea', ph: 'Notable features, exits…', rows: 2 },
      ],
    },
    {
      id: 'lore', label: 'Lore / Story', desc: 'World detail, faction, or story note',
      header: 'h-faction', rank: 'Lore',
      typeFields: [
        { id: 'category', label: 'Category', type: 'select',
          options: ['World Lore', 'Faction', 'History', 'Story Thread', 'Misc'] },
        { id: 'summary',  label: 'Summary',  type: 'textarea', ph: 'Key facts…', rows: 3 },
      ],
    },
    {
      id: 'poi', label: 'Point of Interest', desc: 'Puzzle, encounter, trap, or secret',
      header: 'h-hostile', rank: 'POI',
      typeFields: [
        { id: 'poi-type',  label: 'Type',      type: 'select',
          options: ['Puzzle', 'Encounter', 'Trap', 'Secret', 'Treasure', 'Other'] },
        { id: 'setup',     label: 'Setup',     type: 'textarea', ph: 'What the players see…', rows: 2 },
        { id: 'mechanics', label: 'Mechanics', type: 'textarea', ph: 'How it works…', rows: 2 },
      ],
    },
    {
      id: 'item', label: 'Item', desc: 'Weapon, artifact, or notable object',
      header: 'h-amber', rank: 'Item',
      typeFields: [
        { id: 'item-type',  label: 'Type',       type: 'text',     ph: 'e.g. Weapon, Artifact, Key' },
        { id: 'properties', label: 'Properties', type: 'textarea', ph: 'Description, appearance…', rows: 2 },
        { id: 'effect',     label: 'Effect',     type: 'text',     ph: 'Mechanical effect or ability' },
        { id: 'origin',     label: 'Origin',     type: 'text',     ph: 'Where it came from' },
      ],
    },
  ];

  const HEADER_CLASSES = ['h-feather','h-apple','h-hostile','h-town','h-guard','h-faction','h-neutral','h-amber'];

  let _wizType     = null;
  let _wizHeader   = null;
  let _wizOnCreated = null; /* callback(cardData) */

  function _wizEsc(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function _buildFieldRowHTML(f) {
    if (f.type === 'select') {
      return `<div class="wiz-row">
        <label class="wiz-field-label">${_wizEsc(f.label)}</label>
        <select id="wiz-field-${_wizEsc(f.id)}" class="wiz-select">
          ${f.options.map(o => `<option value="${_wizEsc(o)}">${_wizEsc(o)}</option>`).join('')}
        </select></div>`;
    }
    if (f.type === 'textarea') {
      return `<div class="wiz-row">
        <label class="wiz-field-label">${_wizEsc(f.label)}</label>
        <textarea id="wiz-field-${_wizEsc(f.id)}" class="wiz-textarea"
                  rows="${f.rows || 2}" placeholder="${_wizEsc(f.ph || '')}"></textarea></div>`;
    }
    return `<div class="wiz-row">
      <label class="wiz-field-label">${_wizEsc(f.label)}</label>
      <input id="wiz-field-${_wizEsc(f.id)}" class="wiz-input" type="text"
             placeholder="${_wizEsc(f.ph || '')}"></div>`;
  }

  function _addMemberRow(container) {
    const row = document.createElement('div');
    row.className = 'wiz-member-row';
    row.innerHTML =
      `<input class="wiz-input wiz-member-name"  type="text" placeholder="Name" autocomplete="off">` +
      `<input class="wiz-input wiz-member-notes" type="text" placeholder="Role or notes">` +
      `<button class="wiz-member-remove" title="Remove">✕</button>`;
    row.querySelector('.wiz-member-remove').addEventListener('click', () => {
      if (container.children.length > 1) row.remove();
    });
    container.appendChild(row);
  }

  function _setWizardStep(step) {
    document.getElementById('wiz-step-1').classList.toggle('active', step === 1);
    document.getElementById('wiz-step-2').classList.toggle('active', step === 2);
  }

  function _showWizardStep1() {
    _setWizardStep(1);
    const body = document.getElementById('card-wizard-body');
    body.innerHTML = `
      <p class="wiz-label">What kind of card?</p>
      <div class="wiz-type-grid">
        ${CARD_TYPES.map(t => `
          <button class="wiz-type-btn" data-type="${_wizEsc(t.id)}">
            <span class="wiz-type-name">${_wizEsc(t.label)}</span>
            <span class="wiz-type-desc">${_wizEsc(t.desc)}</span>
          </button>`).join('')}
      </div>
      <div class="wiz-footer">
        <span class="wiz-hint-small">Double-click anywhere on the page · Escape to cancel</span>
      </div>`;
    body.querySelectorAll('.wiz-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        _wizType   = CARD_TYPES.find(t => t.id === btn.dataset.type);
        _wizHeader = _wizType.header;
        _showWizardStep2();
      });
    });
  }

  function _showWizardStep2() {
    _setWizardStep(2);
    const body = document.getElementById('card-wizard-body');
    const t    = _wizType;

    const namePh = t.id === 'roster' ? 'Group name' : 'Card name';
    const rolePh = {
      character: 'e.g. Guard Captain, Elder',
      roster:    'e.g. City Guard, Merchant Guild',
      location:  'e.g. Tavern, Market, Forest',
      lore:      'e.g. The Compact, Applecrumb Faction',
      poi:       'e.g. Room 4, The Iron Door',
      item:      'e.g. Cursed Blade, Quest Item',
    }[t.id] || 'Role or subtitle';

    const typeRowsHTML = t.id === 'roster'
      ? `<div class="wiz-row">
           <label class="wiz-field-label">Members</label>
           <div id="wiz-members" class="wiz-member-list"></div>
           <button type="button" id="wiz-add-member" class="wiz-add-member-btn">+ Add Member</button>
         </div>`
      : t.typeFields.map(_buildFieldRowHTML).join('');

    body.innerHTML = `
      <div class="wiz-form">
        <div class="wiz-row">
          <label class="wiz-field-label">Name <span class="wiz-required">*</span></label>
          <input id="wiz-name" class="wiz-input" type="text"
                 placeholder="${_wizEsc(namePh)}" autocomplete="off">
        </div>
        <div class="wiz-row">
          <label class="wiz-field-label">Role <span class="wiz-hint-small">— appears under the name</span></label>
          <input id="wiz-role" class="wiz-input" type="text" placeholder="${_wizEsc(rolePh)}">
        </div>
        ${typeRowsHTML}
        <div class="wiz-row">
          <label class="wiz-field-label">GM Note <span class="wiz-hint-small">— hidden context</span></label>
          <textarea id="wiz-gmnote" class="wiz-textarea" rows="2" placeholder="Secret info…"></textarea>
        </div>
        <div class="wiz-row">
          <label class="wiz-field-label">Tags <span class="wiz-hint-small">— comma separated</span></label>
          <input id="wiz-tags" class="wiz-input" type="text"
                 placeholder="e.g. hostile, important, unresolved">
        </div>
        <div class="wiz-row">
          <label class="wiz-field-label">Header Colour</label>
          <div class="wiz-colors">
            ${HEADER_CLASSES.map(cls => `
              <button class="wiz-color ${cls}${cls === _wizHeader ? ' selected' : ''}"
                      data-cls="${cls}" title="${cls}"></button>`).join('')}
          </div>
        </div>
      </div>
      <div class="wiz-footer">
        <button id="wiz-back"   class="board-btn">← Back</button>
        <button id="wiz-create" class="board-btn board-btn-add">Create Card</button>
      </div>`;

    setTimeout(() => document.getElementById('wiz-name').focus(), 50);

    if (t.id === 'roster') {
      const membersEl = document.getElementById('wiz-members');
      _addMemberRow(membersEl);
      document.getElementById('wiz-add-member').addEventListener('click', () => _addMemberRow(membersEl));
    }

    body.querySelectorAll('.wiz-color').forEach(btn => {
      btn.addEventListener('click', () => {
        body.querySelectorAll('.wiz-color').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        _wizHeader = btn.dataset.cls;
      });
    });

    document.getElementById('wiz-back').addEventListener('click', _showWizardStep1);
    document.getElementById('wiz-create').addEventListener('click', _finishCreate);
    body.addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT')
        _finishCreate();
    });
  }

  function _finishCreate() {
    const nameEl = document.getElementById('wiz-name');
    const name   = nameEl.value.trim();
    if (!name) { nameEl.focus(); nameEl.classList.add('wiz-input-error'); return; }

    const t      = _wizType;
    const role   = document.getElementById('wiz-role').value.trim();
    const gmNote = document.getElementById('wiz-gmnote').value.trim();
    const tagRaw = document.getElementById('wiz-tags').value.trim();
    const tags   = tagRaw
      ? tagRaw.split(',').map(s => s.trim()).filter(Boolean).map(s => ({ label: s, cls: 'tag-light' }))
      : [];

    let fields = [];
    if (t.id === 'roster') {
      document.querySelectorAll('#wiz-members .wiz-member-row').forEach(row => {
        const mName  = row.querySelector('.wiz-member-name').value.trim();
        const mNotes = row.querySelector('.wiz-member-notes').value.trim();
        if (mName) fields.push({ label: mName, value: mNotes });
      });
      if (!fields.length) fields = [{ label: 'Members', value: '' }];
    } else {
      t.typeFields.forEach(f => {
        const el  = document.getElementById(`wiz-field-${f.id}`);
        fields.push({ label: f.label, value: el ? el.value.trim() : '' });
      });
    }

    const customId = uid();
    const cardData = {
      cardType:    t.id,
      name, role,
      rank:        t.rank,
      headerClass: _wizHeader || t.header,
      fields, gmNote,
      quote:       '',
      tags,
      _customId:   customId,
    };

    saveCustomCard(cardData);
    closeCardWizard();
    if (_wizOnCreated) _wizOnCreated(cardData);
  }

  function openCardWizard(onCreated) {
    _wizType      = null;
    _wizHeader    = null;
    _wizOnCreated = onCreated || null;
    document.getElementById('card-wizard').classList.remove('hidden');
    _showWizardStep1();
  }

  function closeCardWizard() {
    document.getElementById('card-wizard').classList.add('hidden');
  }

  function _initWizardGlobal() {
    const el = document.getElementById('card-wizard');
    document.getElementById('card-wizard-close').addEventListener('click', closeCardWizard);
    el.addEventListener('click', e => { if (e.target === el) closeCardWizard(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !el.classList.contains('hidden')) closeCardWizard();
    });
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
     CORE NAV — locked tool links (includes Active Manager)
  ════════════════════════════════════════════ */

  function buildCoreNav() {
    const el = document.getElementById('core-nav');
    if (!el) return;
    el.innerHTML = CORE_NAV.map(item =>
      `<div class="core-nav-item" data-page="${item.id}">
         <span class="core-nav-icon">${item.icon}</span>
         <span class="core-nav-item-label">${item.label}</span>
       </div>`
    ).join('');
    el.querySelectorAll('.core-nav-item').forEach(item => {
      item.addEventListener('click', () => navigate(item.dataset.page));
    });
  }

  function buildRefNav() {
    const el = document.getElementById('ref-nav');
    if (!el) return;
    el.innerHTML = REF_NAV.map(item =>
      `<div class="ref-nav-item" data-page="${item.id}">${item.label}</div>`
    ).join('');
    el.querySelectorAll('.ref-nav-item').forEach(item => {
      item.addEventListener('click', () => navigate(item.dataset.page));
    });
  }

  function updateLockedNavActive(pageId) {
    document.querySelectorAll('#core-nav .core-nav-item, #ref-nav .ref-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === pageId);
    });
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

  function startSectionDrag(sectionEl) {
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

  function exportState() {
    const KEYS = [
      'endale-nav',
      'endale-custom-cards',
      'endale-additions',
      'endale-hidden',
      'endale-overrides',
      'endale-maps',
      'endale-board',
    ];
    const state = {};
    for (const k of KEYS) {
      try {
        const raw = localStorage.getItem(k);
        if (raw) state[k] = JSON.parse(raw);
      } catch {}
    }
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), {
      href: url, download: 'endale-state.json',
    });
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  function buildNavFooter() {
    document.getElementById('nav-add-section-btn').addEventListener('click', () => {
      const label = prompt('New group name:');
      if (!label || !label.trim()) return;
      _nav.push({ id: 'custom-' + uid(), label: label.trim(), children: [], _open: true });
      saveNav();
      buildNav();
    });

    document.getElementById('nav-export-state-btn').addEventListener('click', exportState);

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
    /* Custom cards: store only a reference to the single source of truth */
    const entry = cardData._customId
      ? { _customId: cardData._customId, _additionId: uid() }
      : { ...cardData, _additionId: uid() };
    additions[pageId].push(entry);
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
    updateLockedNavActive(pageId);

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

    /* ── Built-in tool pages ── */
    if (pageId === MAP_PAGE) {
      pageTitle.textContent = 'Map Builder';
      pageSub.textContent   = 'Floor planner';
      pageBody.classList.remove('board-page');
      pageBody.classList.add('mb-page');
      MapBuilder.render(pageBody);
      return;
    }

    if (pageId === CATALOGUE_PAGE) {
      pageTitle.textContent = 'Full Catalogue';
      pageSub.textContent   = 'Every card across all groups';
      pageBody.classList.remove('board-page', 'mb-page');
      renderCatalogue(pageBody);
      return;
    }

    pageBody.classList.remove('mb-page');

    const data = _pages[pageId];

    if (!data) {
      pageBody.classList.remove('board-page');
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
      MapBuilder.attach(pageBody);
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
      /* Roster / reference — hide the whole group or stamp _deleteInfo */
      if (group.type !== 'cards') {
        if (hidden[`${pageId}|${gi}`]) return null;
        return { ...group, _deleteInfo: { type: 'original', key: `${pageId}|${gi}` } };
      }

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
    }).filter(Boolean);

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

        /* Custom card addition — resolve from the single store by _customId */
        if (a._customId) {
          const card = loadCustomCards().find(c => c._customId === a._customId);
          if (!card) return null;
          return {
            name:        card.name   || 'Unnamed',
            role:        card.role   || '',
            rank:        [card.rank  || 'Custom', ''],
            fields:      card.fields || [],
            gmNote:      card.gmNote || '',
            quote:       card.quote  || '',
            tags:        card.tags   || [],
            _imgKey:     `custom|${card._customId}`,
            _imgName:    card.name,
            _deleteInfo: { type: 'addition', targetPageId: pageId, additionId: a._additionId },
          };
        }

        /* Legacy full-copy addition (pre-migration) — render as-is */
        return {
          name:        a.name   || 'Unnamed',
          role:        a.role   || '',
          rank:        [a.rank  || 'Custom', ''],
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

  function showDeleteConfirm(cardName, extraMsg, onYes) {
    /* Support old 2-arg call-sites: showDeleteConfirm(name, onYes) */
    if (typeof extraMsg === 'function') { onYes = extraMsg; extraMsg = null; }

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

    inner.appendChild(msg);

    if (extraMsg) {
      const sub = document.createElement('p');
      sub.className = 'card-delete-modal-sub';
      sub.textContent = extraMsg;
      inner.appendChild(sub);
    }

    const btns = document.createElement('div');
    btns.className = 'card-delete-modal-btns';
    btns.innerHTML =
      `<button class="cdm-btn cdm-no">No</button>
       <button class="cdm-btn cdm-yes">Yes, delete</button>`;

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
     CATALOGUE — aggregates all cards-type entries
  ════════════════════════════════════════════ */

  function renderCatalogue(container) {
    container.innerHTML = '';

    const hidden    = loadHidden();
    let   overrides = {};
    try { overrides = JSON.parse(localStorage.getItem('endale-overrides')) || {}; } catch {}

    /* ── Collect card entries with full data ── */
    const cardItems  = []; /* { entry, headerClass, pageId, pageLabel, gi, ei, isCustom, dragPayload } */
    const groupItems = []; /* { group, pageId, pageLabel, gi } — rosters and reference blocks */

    for (const [pageId, pageData] of Object.entries(_pages)) {
      if (!pageData.groups) continue;
      pageData.groups.forEach((group, gi) => {
        if (group.type === 'cards' && group.entries?.length) {
          group.entries.forEach((entry, ei) => {
            if (hidden[`${pageId}|${gi}|${ei}`]) return;
            const key = `${pageId}|${gi}|${ei}`;
            const ov  = overrides[key];
            cardItems.push({
              entry: {
                ...entry,
                /* Apply any overrides so catalogue always shows the latest edited values */
                fields:  ov?.fields ?? entry.fields  ?? [],
                gmNote:  ov?.gmNote ?? entry.gmNote  ?? '',
                quote:   ov?.quote  ?? entry.quote   ?? '',
                rank:    Array.isArray(entry.rank) ? entry.rank : [entry.rank || '', ''],
                tags:    entry.tags || [],
                _imgKey:  key,
                _imgName: entry.name,
              },
              headerClass: group.headerClass || 'h-neutral',
              pageId, pageLabel: pageData.title, gi, ei,
              isCustom: false,
              dragPayload: { _ref: true, _refPageId: pageId, _refGi: gi, _refEi: ei },
            });
          });
        } else if (group.type === 'roster' || group.type === 'reference') {
          if (!hidden[`${pageId}|${gi}`])
            groupItems.push({ group, pageId, pageLabel: pageData.title, gi });
        }
      });
    }

    /* ── Custom cards — read directly from the single store ── */
    loadCustomCards().forEach(card => {
      cardItems.push({
        entry: {
          ...card,
          rank:    Array.isArray(card.rank) ? card.rank : [card.rank || 'Custom', ''],
          fields:  card.fields || [],
          tags:    card.tags   || [],
          _imgKey:  `custom|${card._customId}`,
          _imgName: card.name,
        },
        headerClass: card.headerClass || 'h-neutral',
        pageId: null, pageLabel: 'Custom',
        isCustom: true,
        dragPayload: { _customId: card._customId },
      });
    });

    const total = cardItems.length + groupItems.length;
    if (!total) {
      container.innerHTML = '<p class="stub-message">No cards yet — create one in Active Manager.</p>';
      return;
    }

    cardItems.sort((a, b) => (a.entry.name || '').localeCompare(b.entry.name || ''));
    groupItems.sort((a, b) => (a.group.title || '').localeCompare(b.group.title || ''));

    /* ── Search bar ── */
    const searchWrap = document.createElement('div');
    searchWrap.className = 'catalogue-search-wrap';
    searchWrap.innerHTML =
      `<input type="search" class="catalogue-search" placeholder="Search by name, role, or source…" autocomplete="off">`;
    container.appendChild(searchWrap);
    const searchInput = searchWrap.querySelector('.catalogue-search');

    const info = document.createElement('p');
    info.className = 'catalogue-info';
    container.appendChild(info);

    /* ── Card grid ── */
    const grid = document.createElement('div');
    grid.className = 'card-grid';

    /* Individual cards */
    cardItems.forEach(item => {
      const wrap = document.createElement('div');
      wrap.innerHTML = Cards.renderCardHTML(item.entry, item.headerClass);
      const cardEl = wrap.firstElementChild;

      /* Search data */
      cardEl.dataset.searchText =
        `${item.entry.name || ''} ${item.entry.role || ''} ${item.pageLabel}`.toLowerCase();

      /* Delete button on the header */
      const header = cardEl.querySelector('.card-header');
      if (header) {
        const delBtn = document.createElement('button');
        delBtn.className = 'catalogue-card-delete';
        delBtn.title = 'Delete card';
        delBtn.textContent = '×';
        delBtn.addEventListener('click', e => {
          e.stopPropagation();
          const name = item.entry.name || 'this card';
          const extraMsg = item.isCustom
            ? 'This is a custom card — it will be removed from the catalogue and any groups it was added to.'
            : 'This will hide the card everywhere in the app, including any groups it was added to.';
          showDeleteConfirm(name, extraMsg, () => {
            if (item.isCustom) deleteCustomCard(item.dragPayload._customId);
            else               deleteWikiCard(item.pageId, item.gi, item.ei);
            renderCatalogue(container);
          });
        });
        header.appendChild(delBtn);
      }

      grid.appendChild(cardEl);
    });

    /* Roster / reference group cards */
    groupItems.forEach(item => {
      const wrap = document.createElement('div');
      wrap.innerHTML = item.group.type === 'roster'
        ? Cards.renderRosterHTML(item.group)
        : Cards.renderReferenceHTML(item.group);
      const groupEl = wrap.firstElementChild;
      groupEl.dataset.searchText =
        `${item.group.title || ''} ${item.group.role || ''} ${item.pageLabel}`.toLowerCase();

      const header = groupEl.querySelector('.card-header');
      if (header) {
        const delBtn = document.createElement('button');
        delBtn.className = 'catalogue-card-delete';
        delBtn.title = 'Delete block';
        delBtn.textContent = '×';
        delBtn.addEventListener('click', e => {
          e.stopPropagation();
          showDeleteConfirm(
            item.group.title || 'this block',
            'This will hide the block everywhere in the app.',
            () => {
              const h = loadHidden();
              h[`${item.pageId}|${item.gi}`] = true;
              saveHidden(h);
              renderCatalogue(container);
            }
          );
        });
        header.appendChild(delBtn);
      }

      grid.appendChild(groupEl);
    });

    container.appendChild(grid);
    Cards.attachToggle(grid);
    Images.attach(grid);

    /* ── Filter logic ── */
    function applyFilter() {
      const q = searchInput.value.trim().toLowerCase();
      let visible = 0;
      grid.querySelectorAll('.card').forEach(el => {
        const match = !q || (el.dataset.searchText || '').includes(q);
        el.hidden = !match;
        if (match) visible++;
      });
      info.textContent = q
        ? `${visible} of ${total} shown`
        : `${total} entries · click a card to expand · drag to a group in the sidebar`;
    }

    searchInput.addEventListener('input', applyFilter);
    applyFilter();
  }

  /* ════════════════════════════════════════════
     BOOT
  ════════════════════════════════════════════ */

  /* ── Double-click on any card page → open wizard ── */
  function _attachPageDblClick() {
    pageBody.addEventListener('dblclick', e => {
      /* Ignore: board (has its own handler), map builder, card expand/edit interactions */
      if (pageBody.classList.contains('board-page')) return;
      if (pageBody.classList.contains('mb-page')) return;
      if (e.target.closest('.card')) return;
      openCardWizard(() => render(currentHash()));
    });
  }

  function init() {
    _nav = loadNav();
    buildCoreNav();
    buildRefNav();
    buildNav();
    buildNavFooter();
    _initWizardGlobal();
    _attachPageDblClick();
    render(currentHash());
    window.addEventListener('hashchange', () => render(currentHash()));
  }

  return {
    registerPage,
    init,
    getPages:       () => ({ ..._pages }),
    saveCustomCard,
    openCardWizard,
    CARD_TYPES,
    /* Board ↔ Nav bridge */
    enterNavDrop,
    exitNavDrop,
    resolveNavDrop,
    addCardToPage,
  };

})();

document.addEventListener('DOMContentLoaded', () => Endale.init());
