/* ═══════════════════════════════════════════════
   ENDALE — Theme system
   Applies a data-theme attribute on <html> and
   persists the choice to localStorage.
   ═══════════════════════════════════════════════ */

const Themes = (() => {

  const STORAGE_KEY = 'endale-theme';

  const THEMES = [
    {
      id:      'original',
      name:    'Original',
      desc:    'Warm parchment & midnight',
      sidebar: '#0e0e0e', content: '#f0ebe3', accent: '#c8924a'
    },
    {
      id:      'hearthside',
      name:    'Hearthside',
      desc:    'Candlelit tavern warmth',
      sidebar: '#160f07', content: '#f5eedf', accent: '#d4944a'
    },
    {
      id:      'daggerheart',
      name:    'Daggerheart',
      desc:    'Arcane purple & gold',
      sidebar: '#0e0818', content: '#f2edfb', accent: '#b080f0'
    },
    {
      id:      'midnight-ink',
      name:    'Midnight Ink',
      desc:    'Full dark — inky depths',
      sidebar: '#0a0a12', content: '#12121e', accent: '#9090d8'
    },
    {
      id:      'verdant',
      name:    'Verdant Grimoire',
      desc:    'Deep forest & mossy stone',
      sidebar: '#060f05', content: '#eef5e8', accent: '#58a038'
    },
    {
      id:      'crimson-court',
      name:    'Crimson Court',
      desc:    'Gothic red & ivory',
      sidebar: '#0e0505', content: '#f8f0ee', accent: '#b83030'
    },
    {
      id:      'brass-steam',
      name:    'Brass & Steam',
      desc:    'Burnished gold & sepia',
      sidebar: '#0e0c06', content: '#f4ede0', accent: '#d4a020'
    },
  ];

  /* ── Apply theme immediately (called before DOMContentLoaded) ── */

  function apply(id) {
    document.documentElement.dataset.theme = id || 'original';
    localStorage.setItem(STORAGE_KEY, id || 'original');
  }

  function init() {
    apply(localStorage.getItem(STORAGE_KEY) || 'original');
  }

  /* ── Modal ── */

  function buildSwatch(theme, activeId) {
    const active = theme.id === activeId;
    return `
      <button class="theme-swatch${active ? ' theme-swatch-active' : ''}" data-tid="${theme.id}">
        <div class="theme-swatch-preview">
          <div class="ts-sidebar"  style="background:${theme.sidebar}"></div>
          <div class="ts-content"  style="background:${theme.content}">
            <div class="ts-accent" style="background:${theme.accent}"></div>
          </div>
        </div>
        <div class="theme-swatch-name">${theme.name}</div>
        <div class="theme-swatch-desc">${theme.desc}</div>
        ${active ? '<div class="theme-swatch-check">✓</div>' : ''}
      </button>`;
  }

  function openModal() {
    /* Remove any existing instance */
    const prev = document.getElementById('theme-modal');
    if (prev) { prev.remove(); return; }

    const activeId = document.documentElement.dataset.theme || 'original';

    const modal = document.createElement('div');
    modal.id = 'theme-modal';
    modal.className = 'theme-modal';
    modal.innerHTML = `
      <div class="theme-modal-inner">
        <div class="theme-modal-header">
          <span class="theme-modal-title">Appearance</span>
          <button class="theme-modal-close">✕</button>
        </div>
        <div class="theme-grid">
          ${THEMES.map(t => buildSwatch(t, activeId)).join('')}
        </div>
      </div>`;

    /* Close on backdrop or ✕ button */
    modal.querySelector('.theme-modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

    /* Swatch selection */
    modal.querySelectorAll('.theme-swatch').forEach(btn => {
      btn.addEventListener('click', () => {
        const newId = btn.dataset.tid;
        apply(newId);

        /* Refresh active states */
        modal.querySelectorAll('.theme-swatch').forEach(s => {
          const isActive = s.dataset.tid === newId;
          s.classList.toggle('theme-swatch-active', isActive);
          const chk = s.querySelector('.theme-swatch-check');
          if (isActive && !chk) {
            const el = document.createElement('div');
            el.className = 'theme-swatch-check';
            el.textContent = '✓';
            s.appendChild(el);
          } else if (!isActive && chk) {
            chk.remove();
          }
        });
      });
    });

    document.body.appendChild(modal);
  }

  /* ── Boot ── */

  /* Apply immediately so the page renders with the saved theme */
  init();

  /* Attach button after DOM is ready */
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('nav-styles-btn');
    if (btn) btn.addEventListener('click', openModal);
  });

  return { init, openModal };

})();
