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
      ensureTokenButton(box);
    } else {
      const btn = box.querySelector('.picture-upload-btn');
      if (btn) btn.remove();
      box.innerHTML = `<img class="card-image" src="${src}" alt="Illustration">`;
      ensureLinkButton(box);
      ensureTokenButton(box);
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

  /* ── Token button on picture-box ── */

  function ensureTokenButton(box) {
    if (box.querySelector('.picture-token-btn')) return;
    const btn = Object.assign(document.createElement('button'), {
      className:   'picture-token-btn',
      title:       'Export VTT token',
      textContent: 'Token',
    });
    box.appendChild(btn);
    btn.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      generateToken(box);
    });
  }

  /* ════════════════════════════════════════════
     TOKEN GENERATOR
  ════════════════════════════════════════════ */

  /* Convert RGB to HSL (all values 0–1) */
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h;
    if      (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else                h = ((r - g) / d + 4) / 6;
    return [h, s, l];
  }

  function hslToRgb(h, s, l) {
    if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hue2rgb = (t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    return [hue2rgb(h + 1/3), hue2rgb(h), hue2rgb(h - 1/3)].map(v => Math.round(v * 255));
  }

  /* Saturation-weighted dominant color from an already-drawn canvas context */
  function extractDominantColor(ctx, size) {
    const data = ctx.getImageData(0, 0, size, size).data;
    let rSum = 0, gSum = 0, bSum = 0, wSum = 0;
    for (let i = 0; i < data.length; i += 16) {         /* sample every 4th pixel */
      const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
      if (a < 128) continue;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      const sat = max === 0 ? 0 : (max - min) / max;
      const w = sat * sat + 0.05;                        /* base weight so desaturated images still work */
      rSum += r * w; gSum += g * w; bSum += b * w; wSum += w;
    }
    if (wSum === 0) return '#888888';
    let [h, s, l] = rgbToHsl(rSum / wSum, gSum / wSum, bSum / wSum);
    s = Math.min(1, s * 1.5 + 0.2);                     /* boost saturation for a vivid border */
    l = Math.max(0.2, Math.min(0.55, l));                /* keep border mid-range brightness */
    const [r2, g2, b2] = hslToRgb(h, s, l);
    return `rgb(${r2},${g2},${b2})`;
  }

  /* ── Load image without tainting canvas ──────────────────────────────────
     On http(s)://  → XHR blob → object URL (same-origin, never taints).
     On file://     → XHR is blocked by Chrome entirely; use a <input type=file>
                      + FileReader instead. FileReader data URLs are always
                      treated as same-origin and never taint canvas.           */

  function _loadViaXHR(src) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', src, true);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 0) {
          const blobUrl = URL.createObjectURL(xhr.response);
          const i = new Image();
          i.onload  = () => resolve({ img: i, cleanup: () => URL.revokeObjectURL(blobUrl) });
          i.onerror = () => { URL.revokeObjectURL(blobUrl); reject(new Error('img decode failed')); };
          i.src = blobUrl;
        } else {
          reject(new Error('XHR ' + xhr.status));
        }
      };
      xhr.onerror = () => reject(new Error('XHR blocked'));
      xhr.send();
    });
  }

  function _loadViaFilePicker(expectedFilename) {
    return new Promise((resolve, reject) => {
      const input = Object.assign(document.createElement('input'), {
        type: 'file', accept: 'image/*',
      });
      input.style.cssText = 'position:fixed;top:-9999px';
      document.body.appendChild(input);

      input.addEventListener('change', () => {
        const file = input.files[0];
        document.body.removeChild(input);
        if (!file) { reject(new Error('cancelled')); return; }
        const reader = new FileReader();
        reader.onload  = e => {
          const i = new Image();
          i.onload  = () => resolve({ img: i, cleanup: () => {} });
          i.onerror = () => reject(new Error('decode failed'));
          i.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('FileReader error'));
        reader.readAsDataURL(file);
      });

      /* If the picker is dismissed without a selection */
      window.addEventListener('focus', function onFocus() {
        window.removeEventListener('focus', onFocus);
        setTimeout(() => {
          if (!input.files || !input.files.length) {
            document.body.removeChild(input);
            reject(new Error('cancelled'));
          }
        }, 300);
      }, { once: true });

      const name = expectedFilename ? `"${expectedFilename}"` : 'the image file';
      toast(`Select ${name} from your art folder`);
      input.click();
    });
  }

  function generateToken(box) {
    const img = box.querySelector('.card-image');
    if (!img || !img.naturalWidth) { toast('No image loaded'); return; }

    const isFileProtocol = window.location.protocol === 'file:';
    const filename = img.src.split('/').pop().split('?')[0];

    const loader = isFileProtocol
      ? _loadViaFilePicker(filename)
      : _loadViaXHR(img.src);

    loader.then(({ img: clean, cleanup }) => {
      _renderToken(box, clean);
      cleanup();
    }).catch(err => {
      if (err.message !== 'cancelled') {
        console.error('Token:', err.message);
        toast('Could not load image for tokenization');
      }
    });
  }

  function _renderToken(box, img) {
    const TOKEN_SIZE  = 512;
    const BORDER_FRAC = 0.07;
    const borderPx    = Math.round(TOKEN_SIZE * BORDER_FRAC);
    const innerR      = TOKEN_SIZE / 2 - borderPx;
    const cx          = TOKEN_SIZE / 2;
    const cy          = TOKEN_SIZE / 2;

    /* Compute source rect replicating object-fit:cover; object-position:top at 10:7 ratio */
    const THUMB_ASPECT = 10 / 7;
    const natW = img.naturalWidth, natH = img.naturalHeight;
    const imgAspect = natW / natH;
    let sx, sy, sw, sh;
    if (imgAspect >= THUMB_ASPECT) {
      sh = natH; sw = natH * THUMB_ASPECT;
      sx = (natW - sw) / 2; sy = 0;
    } else {
      sw = natW; sh = natW / THUMB_ASPECT;
      sx = 0; sy = 0;
    }

    /* Extract border colour — safe now that image came from a blob URL */
    const scratch = document.createElement('canvas');
    scratch.width = scratch.height = 128;
    const sCtx = scratch.getContext('2d');
    sCtx.drawImage(img, sx, sy, sw, sh, 0, 0, 128, 128);
    const borderColor = extractDominantColor(sCtx, 128);

    /* Build token canvas */
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = TOKEN_SIZE;
    const ctx = canvas.getContext('2d');

    /* Outer border disc */
    ctx.beginPath();
    ctx.arc(cx, cy, TOKEN_SIZE / 2, 0, Math.PI * 2);
    ctx.fillStyle = borderColor;
    ctx.fill();

    /* Subtle highlight ring on inner border edge */
    ctx.beginPath();
    ctx.arc(cx, cy, innerR + borderPx * 0.15, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = borderPx * 0.18;
    ctx.stroke();

    /* Clip to inner circle and draw image.
       Scale source rect to COVER the TOKEN_SIZE square while preserving
       aspect ratio — excess is clipped by the circle, nothing is squished. */
    const srcAspect = sw / sh;
    let dstW, dstH, dstX, dstY;
    if (srcAspect >= 1) {
      /* wider than square: fit height, overflow width — center horizontally */
      dstH = TOKEN_SIZE;
      dstW = TOKEN_SIZE * srcAspect;
      dstX = (TOKEN_SIZE - dstW) / 2;
      dstY = 0;
    } else {
      /* taller than square: fit width, overflow height — center vertically */
      dstW = TOKEN_SIZE;
      dstH = TOKEN_SIZE / srcAspect;
      dstX = 0;
      dstY = (TOKEN_SIZE - dstH) / 2;
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, sx, sy, sw, sh, dstX, dstY, dstW, dstH);
    ctx.restore();

    /* Download — anchor must be in DOM for Firefox */
    const name = (box.dataset.cardName || 'token').replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
    canvas.toBlob(blob => {
      if (!blob) { toast('Token generation failed'); return; }
      const url = URL.createObjectURL(blob);
      const a   = Object.assign(document.createElement('a'), { href: url, download: name + '_token.png' });
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast('Token exported');
    }, 'image/png');
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
