/* ═══════════════════════════════════════════════
   ENDALE — Images
   Manages card illustrations:
   · Stores blobs in IndexedDB so they survive reloads
   · Adds a + upload button to every picture-box
     that carries a data-img-key attribute
   ═══════════════════════════════════════════════ */

const Images = (() => {

  /* ── IndexedDB helpers ── */

  function openDB(name, version, upgrade) {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(name, version);
      req.onupgradeneeded = e => upgrade(e.target.result);
      req.onsuccess       = e => resolve(e.target.result);
      req.onerror         = () => reject(req.error);
    });
  }

  let _db = null;
  async function db() {
    if (!_db) _db = await openDB('endale-images', 1, d => {
      if (!d.objectStoreNames.contains('blobs')) d.createObjectStore('blobs');
    });
    return _db;
  }

  async function blobGet(key) {
    const d = await db();
    return new Promise((resolve, reject) => {
      const req = d.transaction('blobs', 'readonly').objectStore('blobs').get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror   = () => reject(req.error);
    });
  }

  async function blobPut(key, value) {
    const d = await db();
    return new Promise((resolve, reject) => {
      const tx = d.transaction('blobs', 'readwrite');
      tx.objectStore('blobs').put(value, key);
      tx.oncomplete = resolve;
      tx.onerror    = () => reject(tx.error);
    });
  }

  /* ── Toast notification ── */

  function toast(msg) {
    const el = Object.assign(document.createElement('div'), { className: 'img-toast', textContent: msg });
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('img-toast-show'));
    setTimeout(() => { el.classList.remove('img-toast-show'); setTimeout(() => el.remove(), 400); }, 3000);
  }

  /* ── DOM helpers ── */

  function renderImage(box, src) {
    const existing = box.querySelector('.card-image');
    if (existing) {
      existing.src = src;
    } else {
      box.innerHTML = `<img class="card-image" src="${src}" alt="Illustration">`;
    }
    ensureUploadButton(box);
  }

  function ensureUploadButton(box) {
    if (!box.dataset.imgKey) return;
    if (box.querySelector('.picture-upload-btn')) return;

    const btn = Object.assign(document.createElement('button'), {
      className:   'picture-upload-btn',
      title:       'Upload illustration',
      textContent: '＋',
    });
    box.appendChild(btn);

    btn.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      openFilePicker(box);
    });
  }

  function openFilePicker(box) {
    const input = Object.assign(document.createElement('input'), {
      type: 'file', accept: 'image/*',
    });
    input.style.display = 'none';
    document.body.appendChild(input);

    input.addEventListener('change', async () => {
      const file = input.files[0];
      input.remove();
      if (file) await handleUpload(box, box.dataset.imgKey, file);
    });

    input.click();
    setTimeout(() => { if (input.parentNode) input.remove(); }, 60000);
  }

  /* ════════════════════════════════════════════
     UPLOAD HANDLER
  ════════════════════════════════════════════ */

  async function handleUpload(box, key, file) {
    /* Show immediately */
    const url = URL.createObjectURL(file);
    renderImage(box, url);

    /* Persist blob in IndexedDB */
    await blobPut(key, { blob: file });
    toast('Illustration saved');
  }

  /* ════════════════════════════════════════════
     PUBLIC — attach to a rendered container
  ════════════════════════════════════════════ */

  async function attach(container) {
    const boxes = container.querySelectorAll('.picture-box[data-img-key]');
    for (const box of boxes) {
      const stored = await blobGet(box.dataset.imgKey);
      if (stored && stored.blob) {
        renderImage(box, URL.createObjectURL(stored.blob));
      }
      ensureUploadButton(box);
    }
  }

  return { attach };

})();
