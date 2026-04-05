/* ═══════════════════════════════════════════════
   ENDALE — Images
   Links card illustrations to files in art/.
   · Paths stored in localStorage (survive reloads,
     work identically on file:// and GitHub Pages)
   · Picker modal reads from js/art-manifest.js
   · + button on every picture-box opens the picker
   ═══════════════════════════════════════════════ */

const Images = (() => {

  const PREFIX = 'img-link:';

  function getLink(key)        { return localStorage.getItem(PREFIX + key); }
  function saveLink(key, path) { localStorage.setItem(PREFIX + key, path); }
  function clearLink(key)      { localStorage.removeItem(PREFIX + key); }

  /* ── Toast ── */

  function toast(msg) {
    const el = Object.assign(document.createElement('div'), { className: 'img-toast', textContent: msg });
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('img-toast-show'));
    setTimeout(() => { el.classList.remove('img-toast-show'); setTimeout(() => el.remove(), 400); }, 3000);
  }

  /* ── Render image into a picture-box ── */

  function renderImage(box, src) {
    const existing = box.querySelector('.card-image');
    if (existing) {
      existing.src = src;
    } else {
      const btn = box.querySelector('.picture-upload-btn');
      if (btn) btn.remove();
      box.innerHTML = `<img class="card-image" src="${src}" alt="Illustration">`;
      ensureLinkButton(box);
    }
  }

  function clearImage(box) {
    box.innerHTML = `
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="14" r="9" stroke="#aaa" stroke-width="1.5"/>
        <path d="M6 38c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#aaa" stroke-width="1.5"/>
      </svg>
      <span class="picture-label">Illustration</span>`;
    ensureLinkButton(box);
  }

  /* ── + button on picture-box ── */

  function ensureLinkButton(box) {
    if (!box.dataset.imgKey) return;
    if (box.querySelector('.picture-upload-btn')) return;

    const btn = Object.assign(document.createElement('button'), {
      className:   'picture-upload-btn',
      title:       'Link illustration',
      textContent: '＋',
    });
    box.appendChild(btn);
    btn.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      openPicker(box);
    });
  }

  /* ── Picker modal ── */

  function labelFromPath(path) {
    return path.split('/').pop().replace(/\.[^.]+$/, '');
  }

  function openPicker(box) {
    const prev = document.getElementById('img-picker-modal');
    if (prev) { prev.remove(); return; }

    const manifest = (typeof ArtManifest !== 'undefined') ? ArtManifest : [];
    const hasLink  = !!getLink(box.dataset.imgKey);

    const modal = document.createElement('div');
    modal.id        = 'img-picker-modal';
    modal.className = 'img-picker-modal';

    const itemsHtml = manifest.length === 0
      ? `<div class="img-picker-empty">No art files found.<br>Add paths to js/art-manifest.js.</div>`
      : manifest.map(path =>
          `<button class="img-picker-item" data-path="${path}">
            <img class="img-picker-thumb" src="${path}" alt="">
            <span class="img-picker-label">${labelFromPath(path)}</span>
          </button>`
        ).join('');

    const footerHtml = hasLink
      ? `<div class="img-picker-footer">
           <button class="img-picker-unlink">Remove illustration</button>
         </div>`
      : '';

    modal.innerHTML = `
      <div class="img-picker-inner">
        <div class="img-picker-header">
          <span class="img-picker-title">Select Illustration</span>
          <button class="img-picker-close">✕</button>
        </div>
        <input class="img-picker-search" type="text" placeholder="Filter…">
        <div class="img-picker-grid">${itemsHtml}</div>
        ${footerHtml}
      </div>`;

    /* Close */
    modal.querySelector('.img-picker-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

    /* Search */
    const search = modal.querySelector('.img-picker-search');
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      modal.querySelectorAll('.img-picker-item').forEach(item => {
        item.style.display = item.dataset.path.toLowerCase().includes(q) ? '' : 'none';
      });
    });

    /* Select */
    modal.querySelectorAll('.img-picker-item').forEach(item => {
      item.addEventListener('click', () => {
        saveLink(box.dataset.imgKey, item.dataset.path);
        renderImage(box, item.dataset.path);
        modal.remove();
        toast('Illustration linked');
      });
    });

    /* Unlink */
    const unlinkBtn = modal.querySelector('.img-picker-unlink');
    if (unlinkBtn) {
      unlinkBtn.addEventListener('click', () => {
        clearLink(box.dataset.imgKey);
        clearImage(box);
        modal.remove();
        toast('Illustration removed');
      });
    }

    document.body.appendChild(modal);
    search.focus();
  }

  /* ════════════════════════════════════════════
     PUBLIC — attach to a rendered container
  ════════════════════════════════════════════ */

  function attach(container) {
    container.querySelectorAll('.picture-box[data-img-key]').forEach(box => {
      const path = getLink(box.dataset.imgKey);
      if (path) renderImage(box, path);
      ensureLinkButton(box);
    });
  }

  return { attach };

})();
