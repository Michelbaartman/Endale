/* ═══════════════════════════════════════════════
   ENDALE — Map Builder
   Canvas-based TTRPG floor planner.
   · Multiple named maps, each with multiple floors
   · Draw modes: Single (brush) | Select (add or move)
   · Tools: Wall, Floor, Auto-Wall, Door, Stairs, Water, POI, Erase, Label
   · Per-map configurable grid size
   · Pan (right-drag or middle-drag), zoom (scroll)
   · Export/import JSON, link maps to location cards
   · Auto-saves to localStorage on every change
   ═══════════════════════════════════════════════ */

const MapBuilder = (() => {

  const STORAGE_KEY    = 'endale-maps';
  const BASE_CELL      = 28;
  const DEFAULT_GRID_W = 160;
  const DEFAULT_GRID_H = 120;
  const MIN_ZOOM       = 0.06;
  const MAX_ZOOM       = 5.0;

  /* ── Tile palette ── */
  const TILES = {
    wall:       { label: 'Wall',         color: '#3c3830', stroke: '#1e1c18', dark: true  },
    stone:      { label: 'Stone',        color: '#c8bda8', stroke: '#a89880', dark: false },
    cave:       { label: 'Cave',         color: '#7a7060', stroke: '#5a5040', dark: false },
    grass:      { label: 'Grass',        color: '#3a6030', stroke: '#264018', dark: false },
    dirt:       { label: 'Dirt',         color: '#9a7250', stroke: '#6a4a2a', dark: false },
    sand:       { label: 'Sand',         color: '#c8a860', stroke: '#a87828', dark: false },
    wood:       { label: 'Wood Floor',   color: '#a87040', stroke: '#6a4018', dark: false },
    carpet:     { label: 'Carpet',       color: '#6a3858', stroke: '#481828', dark: false },
    door:       { label: 'Door',         color: '#7a5020', stroke: '#5a3810', dark: false },
    stairs:     { label: 'Stairs ↑',     color: '#6a5a40', stroke: '#4a3a20', dark: false },
    stairsdown: { label: 'Stairs ↓',     color: '#6a5a40', stroke: '#4a3a20', dark: false },
    table:      { label: 'Table',        color: '#7a5228', stroke: '#4a3010', dark: false },
    barrel:     { label: 'Crate',         color: '#b07838', stroke: '#6a3a08', dark: false },
    water:      { label: 'Water',        color: '#244a7a', stroke: '#183060', dark: false },
    special:    { label: 'POI',          color: '#502870', stroke: '#381858', dark: false },
    poi2:       { label: 'POI Red',      color: '#702020', stroke: '#4a1010', dark: true  },
    poi3:       { label: 'POI Green',    color: '#1e5028', stroke: '#0e3018', dark: false },
    poi4:       { label: 'POI Blue',     color: '#1a3a6a', stroke: '#0e2448', dark: false },
    autothinwall: { label: 'Auto Thin',  color: '#3c3830', stroke: '#1e1c18', dark: true },
    /* thinwall is handled separately via fl.thinwalls — not a cell fill */
  };

  /* Floor-type tiles — all treated as passable/open ground */
  const FLOOR_TILES = new Set(['stone','cave','grass','dirt','sand','wood','carpet']);

  /* ── Map state ── */
  let _maps   = {};
  let _active = null;

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function newFloor(name = 'Ground Floor') {
    return { name, cells: {}, labels: {}, thinwalls: {} };
  }

  function newMap(name = 'New Map') {
    const id = uid();
    return { id, name, floors: [newFloor()], linkedKey: null,
             gridW: DEFAULT_GRID_W, gridH: DEFAULT_GRID_H };
  }

  /* ── Grid size helpers (per-map, falls back to defaults) ── */
  function gW() { return activeMap()?.gridW || DEFAULT_GRID_W; }
  function gH() { return activeMap()?.gridH || DEFAULT_GRID_H; }

  /* ── Persistence ── */

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (raw && raw.maps && Object.keys(raw.maps).length) {
        _maps   = raw.maps;
        _active = raw.active && _maps[raw.active] ? raw.active : Object.keys(_maps)[0];
        return;
      }
    } catch {}
    const m = newMap('Session Map');
    _maps[m.id] = m;
    _active = m.id;
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ maps: _maps, active: _active }));
  }

  /* ── Canvas / viewport runtime ── */
  let _canvas    = null;
  let _ctx       = null;
  let _container = null;
  let _ro        = null;
  let _dpr       = 1;
  let _keyHandler = null;

  let _zoom  = 1.0;
  let _panX  = 0;
  let _panY  = 0;
  let _floor = 0;

  /* ── Tool / draw-mode state ── */
  let _tool      = 'wall';
  let _drawMode  = 'single';  /* 'single' | 'select' */
  let _brushSize = 1;         /* 1,3,5,7,9 — symmetric square brush */
  let _selMode   = 'add';     /* 'add' | 'move' — only used in select drawMode */
  let _shadows   = true;      /* wall → floor shadow pass toggle */

  /* ── Interaction state ── */
  let _drawing  = false;
  let _panning  = false;
  let _panStart = null;
  let _lastCell = null;
  let _twIntent = null;   /* thin-wall stroke intent: true=add, false=remove, null=undecided */

  /* ── Selection state ── */
  let _selection    = null;  /* { x0,y0,x1,y1 } un-normalised grid coords */
  let _selStart     = null;  /* anchor while rubber-banding */
  let _selDragging  = false;
  let _selDragStart = null;  /* { x,y } grid cell where move drag began */
  let _selCells     = null;  /* snapshot: { 'x,y': { tile, label } } for move */
  let _selOffset    = null;  /* { dx,dy } current move displacement in cells */

  function activeMap()   { return _maps[_active]; }
  function activeFloor() { return activeMap()?.floors[_floor] || activeMap()?.floors[0]; }
  function cs()          { return BASE_CELL * _zoom; }

  function screenToCell(sx, sy) {
    const rect = _canvas.getBoundingClientRect();
    return {
      x: Math.floor((sx - rect.left - _panX) / cs()),
      y: Math.floor((sy - rect.top  - _panY) / cs()),
    };
  }

  function getCursor() {
    if (_tool === 'label')    return 'text';
    if (_tool === 'thinwall') return 'cell';
    if (_drawMode === 'select') return 'default';
    return 'crosshair';
  }

  /* ════════════════════════════════════════════
     RENDERING
  ════════════════════════════════════════════ */

  function draw() {
    if (!_canvas || !_ctx) return;
    const fl = activeFloor();
    if (!fl) return;

    const GW  = gW(), GH = gH();
    const W   = _canvas.width  / _dpr;
    const H   = _canvas.height / _dpr;
    const csz = cs();

    _ctx.save();
    _ctx.scale(_dpr, _dpr);

    _ctx.fillStyle = '#6b6560';
    _ctx.fillRect(0, 0, W, H);

    const x0 = Math.floor(-_panX / csz) - 1;
    const y0 = Math.floor(-_panY / csz) - 1;
    const x1 = Math.ceil((W - _panX) / csz) + 1;
    const y1 = Math.ceil((H - _panY) / csz) + 1;

    _ctx.save();
    _ctx.translate(_panX, _panY);

    /* Grid extent outline */
    _ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    _ctx.lineWidth   = 1;
    _ctx.strokeRect(0, 0, GW * csz, GH * csz);

    /* Corner dots — drawn before tiles so painted cells hide them naturally */
    if (csz >= 4) {
      const dotAlpha = csz < 10 ? 0.18 : 0.22;
      _ctx.fillStyle = `rgba(0,0,0,${dotAlpha})`;
      const dotSize  = csz >= 12 ? 1.5 : 1;
      for (let x = Math.max(0, x0); x <= Math.min(GW, x1); x++) {
        for (let y = Math.max(0, y0); y <= Math.min(GH, y1); y++) {
          _ctx.fillRect(x * csz - dotSize * 0.5, y * csz - dotSize * 0.5, dotSize, dotSize);
        }
      }
    }

    /* Tiles — skip cells being moved (they're in _selCells) */
    const movedKeys = _selDragging && _selCells ? new Set(Object.keys(_selCells)) : null;

    for (let gx = Math.max(0, x0); gx < Math.min(GW, x1); gx++) {
      for (let gy = Math.max(0, y0); gy < Math.min(GH, y1); gy++) {
        const key  = `${gx},${gy}`;
        if (movedKeys?.has(key)) continue;
        const tile = fl.cells[key];
        if (!tile) continue;
        const def = TILES[tile];
        if (!def) continue;
        drawTile(_ctx, gx, gy, tile, def, csz, fl);
      }
    }

    /* Ghost tiles during move drag */
    if (_selDragging && _selCells && _selOffset) {
      _ctx.globalAlpha = 0.72;
      for (const [key, { tile }] of Object.entries(_selCells)) {
        const [cx, cy] = key.split(',').map(Number);
        const tx = cx + _selOffset.dx, ty = cy + _selOffset.dy;
        if (tx < 0 || tx >= GW || ty < 0 || ty >= GH) continue;
        const def = TILES[tile];
        if (def) drawTile(_ctx, tx, ty, tile, def, csz, fl);
      }
      _ctx.globalAlpha = 1;
    }

    /* Wall → floor shadow pass */
    if (_shadows) drawShadowPass(_ctx, fl, x0, y0, x1, y1, csz);

    /* Thin wall edge lines */
    drawThinWallPass(_ctx, fl, x0, y0, x1, y1, csz);

    /* No post-tile grid lines — dots before tiles handle grid visibility */

    /* Labels */
    if (fl.labels && csz >= 10) {
      const fontSize = Math.min(Math.max(8, csz * 0.28), 14);
      _ctx.font = `${fontSize}px Georgia, serif`;
      _ctx.textAlign    = 'center';
      _ctx.textBaseline = 'middle';
      for (const [key, text] of Object.entries(fl.labels)) {
        const [lx, ly] = key.split(',').map(Number);
        if (lx < x0 || lx > x1 || ly < y0 || ly > y1) continue;
        if (movedKeys?.has(key)) continue;
        const px = lx * csz + csz / 2, py = ly * csz + csz / 2;
        _ctx.fillStyle = 'rgba(0,0,0,0.7)';
        _ctx.fillText(text, px + 0.5, py + 0.5);
        _ctx.fillStyle = (fl.cells[key] && TILES[fl.cells[key]]?.dark) ? '#d0c8b8' : '#f0ebe3';
        _ctx.fillText(text, px, py);
      }
    }

    /* Selection overlay */
    if (_selection) {
      const s  = normSel(_selection);
      let sx, sy, sw, sh;
      if (_selDragging && _selOffset) {
        sx = (s.x0 + _selOffset.dx) * csz;
        sy = (s.y0 + _selOffset.dy) * csz;
      } else {
        sx = s.x0 * csz;
        sy = s.y0 * csz;
      }
      sw = (s.x1 - s.x0 + 1) * csz;
      sh = (s.y1 - s.y0 + 1) * csz;

      _ctx.fillStyle = 'rgba(200,178,80,0.10)';
      _ctx.fillRect(sx, sy, sw, sh);
      _ctx.setLineDash([4, 3]);
      _ctx.strokeStyle = 'rgba(220,196,80,0.9)';
      _ctx.lineWidth   = 1.5;
      _ctx.strokeRect(sx + 0.5, sy + 0.5, sw - 1, sh - 1);
      _ctx.setLineDash([]);
    }

    _ctx.restore();
    _ctx.restore();
  }

  /* ── Deterministic per-cell hash → 0..1, consistent across redraws ── */
  function cellHash(x, y) {
    let h = ((x * 374761393) ^ (y * 1103515245)) >>> 0;
    h = (h ^ (h >>> 15)) * 2246822519 >>> 0;
    h = (h ^ (h >>> 13)) * 3266489917 >>> 0;
    return ((h ^ (h >>> 16)) >>> 0) / 0xffffffff;
  }

  /* ── Per-tile rendering ── */
  function drawTile(ctx, gx, gy, tile, def, csz, fl) {
    /* Neighbour helper — same tile type? */
    const nbr = (dx, dy) => fl && fl.cells[`${gx+dx},${gy+dy}`] === tile;
    const px = gx * csz, py = gy * csz;
    const h  = cellHash(gx, gy);
    const h2 = cellHash(gx * 7 + 3, gy * 13 + 5);

    /* Clip to this cell so textures don't bleed */
    ctx.save();
    ctx.beginPath(); ctx.rect(px, py, csz, csz); ctx.clip();

    /* Base fill */
    ctx.fillStyle = def.color;
    ctx.fillRect(px, py, csz, csz);

    if (tile === 'wall') {
      /* Cross-hatch — primary diagonal */
      const spacing = Math.max(2.5, csz * 0.22);
      const angle   = Math.PI * (0.22 + h * 0.05);
      const n       = Math.ceil(csz * 2 / spacing) + 2;
      ctx.save();
      ctx.translate(px + csz / 2, py + csz / 2);
      ctx.rotate(angle);
      ctx.strokeStyle = `rgba(0,0,0,${0.20 + h * 0.12})`;
      ctx.lineWidth   = Math.max(0.4, csz * 0.04);
      for (let i = -n; i <= n; i++) {
        /* Slight wobble per line using h2 */
        const slant = (h2 - 0.5) * spacing * 0.25;
        ctx.beginPath();
        ctx.moveTo(i * spacing - slant, -csz * 1.6);
        ctx.lineTo(i * spacing + slant,  csz * 1.6);
        ctx.stroke();
      }
      /* Cross-hatch — lighter perpendicular pass */
      ctx.rotate(Math.PI / 2 + (h2 - 0.5) * 0.07);
      ctx.strokeStyle = `rgba(0,0,0,${0.07 + h2 * 0.05})`;
      ctx.lineWidth   = Math.max(0.3, csz * 0.025);
      for (let i = -n; i <= n; i++) {
        ctx.beginPath();
        ctx.moveTo(i * spacing, -csz * 1.6);
        ctx.lineTo(i * spacing,  csz * 1.6);
        ctx.stroke();
      }
      ctx.restore();

      /* Vignette — darker at cell edges, lighter at centre */
      const vg = ctx.createRadialGradient(
        px + csz / 2, py + csz / 2, csz * 0.10,
        px + csz / 2, py + csz / 2, csz * 0.90
      );
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.28)');
      ctx.fillStyle = vg;
      ctx.fillRect(px, py, csz, csz);

    } else if (tile === 'stone') {
      /* Subtle per-cell brightness variation */
      const v = (h - 0.5) * 0.09;
      ctx.fillStyle = v > 0 ? `rgba(255,255,255,${v})` : `rgba(0,0,0,${-v})`;
      ctx.fillRect(px, py, csz, csz);

      /* Single faint stone-grain crack */
      if (csz >= 10) {
        ctx.strokeStyle = `rgba(0,0,0,${0.04 + h2 * 0.04})`;
        ctx.lineWidth   = Math.max(0.3, csz * 0.022);
        ctx.beginPath();
        ctx.moveTo(px + h  * csz * 0.75,         py + h2 * csz * 0.35);
        ctx.lineTo(px + (0.25 + h2 * 0.5) * csz, py + (0.55 + h * 0.38) * csz);
        ctx.stroke();
      }

    } else if (tile === 'cave') {
      /* Darker stone — rougher texture, multiple crack lines, pebble shadows */
      const v2 = (h - 0.5) * 0.12;
      ctx.fillStyle = v2 > 0 ? `rgba(255,255,255,${v2})` : `rgba(0,0,0,${-v2})`;
      ctx.fillRect(px, py, csz, csz);
      if (csz >= 8) {
        /* Two rough crack strokes */
        const h3 = cellHash(gx * 5 + 1, gy * 11 + 2);
        const h4 = cellHash(gx * 3 + 7, gy * 7  + 9);
        ctx.lineWidth = Math.max(0.3, csz * 0.025);
        [[h,  h2, h3, h4],
         [h3, h4, h2, h ]].forEach(([a, b, c, d]) => {
          ctx.strokeStyle = `rgba(0,0,0,${0.07 + a * 0.06})`;
          ctx.beginPath();
          ctx.moveTo(px + a * csz * 0.85,  py + b * csz * 0.55);
          /* jagged mid-point */
          ctx.lineTo(px + (0.3 + c * 0.4) * csz, py + (0.2 + d * 0.6) * csz);
          ctx.lineTo(px + (0.1 + b * 0.8) * csz, py + (0.4 + a * 0.5) * csz);
          ctx.stroke();
        });
        /* Small pebble dots */
        const h5 = cellHash(gx * 9 + 4, gy * 4 + 6);
        ctx.fillStyle = `rgba(0,0,0,${0.10 + h5 * 0.08})`;
        ctx.beginPath();
        ctx.arc(px + (0.2 + h3 * 0.6) * csz, py + (0.15 + h4 * 0.7) * csz, csz * 0.05, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (tile === 'grass') {
      /* Green — clusters of short blade strokes */
      if (csz >= 8) {
        const h3 = cellHash(gx * 4 + 2, gy * 6 + 1);
        const h4 = cellHash(gx * 8 + 5, gy * 3 + 7);
        const h5 = cellHash(gx * 2 + 9, gy * 9 + 3);
        const clusters = [
          { bx: 0.18 + h  * 0.12, by: 0.20 + h2 * 0.15 },
          { bx: 0.55 + h3 * 0.15, by: 0.15 + h4 * 0.12 },
          { bx: 0.25 + h4 * 0.10, by: 0.58 + h5 * 0.18 },
          { bx: 0.62 + h2 * 0.12, by: 0.55 + h3 * 0.20 },
        ];
        clusters.forEach(({ bx, by }) => {
          for (let b = 0; b < 3; b++) {
            const bh  = cellHash(gx * 13 + b, gy * 7 + b);
            const bh2 = cellHash(gx * 3 + b,  gy * 11 + b);
            const ox = (bh  - 0.5) * csz * 0.22;
            const lean = (bh2 - 0.5) * csz * 0.18;
            const bl = csz * (0.14 + bh * 0.10);
            const baseX = px + bx * csz + ox;
            const baseY = py + by * csz;
            ctx.strokeStyle = `rgba(20,80,15,${0.30 + bh * 0.22})`;
            ctx.lineWidth   = Math.max(0.4, csz * 0.035);
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(baseX, baseY);
            ctx.lineTo(baseX + lean, baseY - bl);
            ctx.stroke();
          }
        });
        ctx.lineCap = 'butt';
      }

    } else if (tile === 'dirt') {
      /* Warm brown — pebble dots and subtle surface variation */
      const v3 = (h - 0.5) * 0.11;
      ctx.fillStyle = v3 > 0 ? `rgba(255,200,150,${v3})` : `rgba(0,0,0,${-v3 * 0.6})`;
      ctx.fillRect(px, py, csz, csz);
      if (csz >= 8) {
        /* Small pebbles — 2-3 dots at hash-determined positions */
        const h3 = cellHash(gx * 6 + 3, gy * 5 + 1);
        const h4 = cellHash(gx * 2 + 8, gy * 8 + 4);
        const h5 = cellHash(gx * 7 + 1, gy * 2 + 9);
        [
          { x: 0.22 + h  * 0.18, y: 0.30 + h2 * 0.22, r: 0.040 + h3 * 0.025 },
          { x: 0.58 + h3 * 0.20, y: 0.18 + h4 * 0.20, r: 0.032 + h4 * 0.020 },
          { x: 0.38 + h4 * 0.15, y: 0.62 + h5 * 0.22, r: 0.036 + h5 * 0.022 },
        ].forEach(({ x: dx2, y: dy2, r }) => {
          ctx.fillStyle   = `rgba(80,45,15,${0.22 + h3 * 0.14})`;
          ctx.strokeStyle = `rgba(60,30,5,${0.18 + h4 * 0.10})`;
          ctx.lineWidth   = Math.max(0.2, csz * 0.018);
          ctx.beginPath();
          ctx.ellipse(px + dx2 * csz, py + dy2 * csz, csz * r, csz * r * 0.75, h * Math.PI, 0, Math.PI * 2);
          ctx.fill(); ctx.stroke();
        });
      }

    } else if (tile === 'sand') {
      /* Pale yellow — fine horizontal ripple lines */
      const v4 = (h - 0.5) * 0.07;
      ctx.fillStyle = v4 > 0 ? `rgba(255,235,180,${v4})` : `rgba(0,0,0,${-v4 * 0.5})`;
      ctx.fillRect(px, py, csz, csz);
      if (csz >= 8) {
        const ripples = Math.max(2, Math.floor(csz / 10));
        for (let r = 0; r < ripples; r++) {
          const rh  = cellHash(gx * 3 + r, gy * 7 + r);
          const rh2 = cellHash(gx * 7 + r, gy * 2 + r);
          const ry  = py + ((r + 0.4 + rh * 0.3) / ripples) * csz;
          const amp = csz * 0.04;
          ctx.strokeStyle = `rgba(150,110,20,${0.10 + rh * 0.08})`;
          ctx.lineWidth   = Math.max(0.3, csz * 0.022);
          ctx.beginPath();
          const steps = Math.max(3, Math.floor(csz / 5));
          for (let s = 0; s <= steps; s++) {
            const wx = px + (s / steps) * csz;
            const wy = ry + Math.sin((s / steps + rh2) * Math.PI * 2.2) * amp;
            s === 0 ? ctx.moveTo(wx, wy) : ctx.lineTo(wx, wy);
          }
          ctx.stroke();
        }
      }

    } else if (tile === 'wood') {
      /* Plank floor — horizontal planks with grain lines, seam offsets per row */
      const v5 = (h - 0.5) * 0.08;
      ctx.fillStyle = v5 > 0 ? `rgba(255,200,140,${v5})` : `rgba(0,0,0,${-v5 * 0.7})`;
      ctx.fillRect(px, py, csz, csz);
      if (csz >= 7) {
        /* Horizontal plank divider — offset by row parity so seams stagger */
        const seam = py + (0.48 + h * 0.07) * csz;
        ctx.strokeStyle = `rgba(80,40,8,${0.28 + h2 * 0.14})`;
        ctx.lineWidth   = Math.max(0.5, csz * 0.04);
        ctx.beginPath(); ctx.moveTo(px, seam); ctx.lineTo(px + csz, seam); ctx.stroke();
        /* Vertical joint — offset based on grid parity so adjacent planks don't align */
        const jx = px + ((gx % 2 === 0 ? 0.22 : 0.62) + h2 * 0.10) * csz;
        ctx.strokeStyle = `rgba(80,40,8,${0.20 + h * 0.12})`;
        ctx.lineWidth   = Math.max(0.4, csz * 0.03);
        ctx.beginPath(); ctx.moveTo(jx, py); ctx.lineTo(jx, py + csz); ctx.stroke();
        /* Fine grain lines within each plank half */
        ctx.strokeStyle = `rgba(80,40,8,0.10)`;
        ctx.lineWidth   = Math.max(0.2, csz * 0.018);
        const h3 = cellHash(gx * 5 + 2, gy * 4 + 7);
        [[py + csz * 0.15, seam - csz * 0.04],
         [seam + csz * 0.04, py + csz * 0.92]].forEach(([y1, y2]) => {
          ctx.beginPath();
          ctx.moveTo(px + csz * (0.1 + h3 * 0.3), y1);
          ctx.lineTo(px + csz * (0.2 + h3 * 0.3), y2);
          ctx.stroke();
        });
      }

    } else if (tile === 'carpet') {
      /* Woven carpet — tight crosshatch grid + soft inner highlight */
      const v6 = (h - 0.5) * 0.08;
      ctx.fillStyle = v6 > 0 ? `rgba(255,200,220,${v6})` : `rgba(0,0,0,${-v6})`;
      ctx.fillRect(px, py, csz, csz);
      if (csz >= 8) {
        /* Crosshatch weave — lines every ~6px or csz/5 */
        const spacing = Math.max(3, csz / 5);
        ctx.strokeStyle = `rgba(255,255,255,0.07)`;
        ctx.lineWidth   = Math.max(0.3, csz * 0.022);
        for (let i = spacing; i < csz; i += spacing) {
          ctx.beginPath(); ctx.moveTo(px + i, py); ctx.lineTo(px + i, py + csz); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(px, py + i); ctx.lineTo(px + csz, py + i); ctx.stroke();
        }
        /* Darker cross weave */
        ctx.strokeStyle = `rgba(0,0,0,0.08)`;
        const spacing2 = spacing * 0.5;
        for (let i = spacing2; i < csz; i += spacing) {
          ctx.beginPath(); ctx.moveTo(px + i, py); ctx.lineTo(px + i, py + csz); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(px, py + i); ctx.lineTo(px + csz, py + i); ctx.stroke();
        }
        /* Soft inner pile highlight — slightly lighter centre */
        const pad = csz * 0.12;
        const grad = ctx.createRadialGradient(
          px + csz * 0.5, py + csz * 0.5, 0,
          px + csz * 0.5, py + csz * 0.5, csz * 0.55
        );
        grad.addColorStop(0,   'rgba(255,255,255,0.08)');
        grad.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(px + pad, py + pad, csz - pad * 2, csz - pad * 2);
      }

    } else if (tile === 'door') {
      /* Modular door — connects to adjacent doors by merging borders */
      const nN = nbr(0,-1), nS = nbr(0,1), nW = nbr(-1,0), nE = nbr(1,0);
      const dm = csz * 0.06;
      /* Edge extents: flush with neighbour edge if connected, else inset */
      const x0d = px + (nW ? 0 : dm),  y0d = py + (nN ? 0 : dm);
      const x1d = px + csz - (nE ? 0 : dm), y1d = py + csz - (nS ? 0 : dm);
      const dw = x1d - x0d, dh = y1d - y0d;
      /* Face fill — no rounded rect because we clip anyway */
      ctx.fillStyle = 'rgba(210,155,70,0.62)';
      ctx.fillRect(x0d, y0d, dw, dh);
      /* Outer border — only on open edges */
      ctx.strokeStyle = 'rgba(130,70,15,0.82)';
      ctx.lineWidth   = Math.max(0.8, csz * 0.05);
      ctx.beginPath();
      if (!nN) { ctx.moveTo(x0d, y0d); ctx.lineTo(x1d, y0d); }
      if (!nS) { ctx.moveTo(x0d, y1d); ctx.lineTo(x1d, y1d); }
      if (!nW) { ctx.moveTo(x0d, y0d); ctx.lineTo(x0d, y1d); }
      if (!nE) { ctx.moveTo(x1d, y0d); ctx.lineTo(x1d, y1d); }
      ctx.stroke();
      /* Raised panel inset lines — only when cell is tall enough to split */
      if (dh >= csz * 0.5) {
        const pi = csz * 0.10;
        const pw = dw - pi * 2;
        const ph = (dh - pi * 3) / 2;
        if (pw > csz * 0.1 && ph > csz * 0.08) {
          ctx.strokeStyle = 'rgba(130,70,15,0.38)';
          ctx.lineWidth   = Math.max(0.4, csz * 0.03);
          ctx.strokeRect(x0d + pi, y0d + pi,          pw, ph);
          ctx.strokeRect(x0d + pi, y0d + pi * 2 + ph, pw, ph);
          /* Grain per panel */
          ctx.strokeStyle = 'rgba(130,70,15,0.16)';
          ctx.lineWidth   = Math.max(0.3, csz * 0.022);
          [y0d + pi + ph * 0.5, y0d + pi * 2 + ph * 1.5].forEach(gy2 => {
            ctx.beginPath();
            ctx.moveTo(x0d + pi + pw * 0.15, gy2);
            ctx.lineTo(x0d + pi + pw * 0.85, gy2);
            ctx.stroke();
          });
        }
      }
      /* Knob — only when not connected on the right */
      if (!nE) {
        ctx.fillStyle = 'rgba(255,220,100,0.90)';
        ctx.beginPath();
        ctx.arc(x1d - csz * 0.09, y0d + dh * 0.50, csz * 0.058, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(160,100,20,0.70)';
        ctx.lineWidth   = Math.max(0.4, csz * 0.03);
        ctx.stroke();
      }

    } else if (tile === 'stairs' || tile === 'stairsdown') {
      const up    = tile === 'stairs';
      const steps = Math.max(3, Math.floor(csz / 7));
      for (let s = 1; s <= steps; s++) {
        const t    = s / (steps + 1);
        const sy2  = py + t * csz;
        /* Fade towards the "bottom" step regardless of direction */
        const fade = up ? (0.22 + (1 - t) * 0.28) : (0.22 + t * 0.28);
        ctx.strokeStyle = `rgba(255,240,200,${fade})`;
        ctx.lineWidth   = Math.max(0.5, csz * 0.045);
        ctx.beginPath(); ctx.moveTo(px + csz*0.12, sy2); ctx.lineTo(px + csz*0.88, sy2); ctx.stroke();
      }
      /* Arrow */
      const arrowTip  = up ? py + csz*0.18 : py + csz*0.82;
      const arrowBase = up ? py + csz*0.82  : py + csz*0.18;
      const arrowL1y  = up ? py + csz*0.38  : py + csz*0.62;
      ctx.strokeStyle = 'rgba(255,240,200,0.55)';
      ctx.lineWidth   = Math.max(0.8, csz * 0.065);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(px + csz*0.5, arrowBase); ctx.lineTo(px + csz*0.5, arrowTip);
      ctx.moveTo(px + csz*0.5, arrowTip);  ctx.lineTo(px + csz*0.33, arrowL1y);
      ctx.moveTo(px + csz*0.5, arrowTip);  ctx.lineTo(px + csz*0.67, arrowL1y);
      ctx.stroke();
      ctx.lineCap = 'butt'; ctx.lineJoin = 'miter';

    } else if (tile === 'water') {
      /* Base shimmer overlay */
      ctx.fillStyle = 'rgba(80,160,255,0.14)';
      ctx.fillRect(px, py, csz, csz);
      /* Wavy lines */
      const waveCount = Math.max(2, Math.floor(csz / 9));
      for (let w = 0; w < waveCount; w++) {
        const baseY = py + ((w + 0.5 + h * 0.4) / waveCount) * csz;
        const amp   = csz * 0.07;
        ctx.strokeStyle = `rgba(140,210,255,${0.28 + h2 * 0.18})`;
        ctx.lineWidth   = Math.max(0.4, csz * 0.035);
        const steps = Math.max(4, Math.floor(csz / 3));
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const wx = px + (s / steps) * csz;
          const wy = baseY + Math.sin((s / steps + h + w * 0.37) * Math.PI * 2.5) * amp;
          s === 0 ? ctx.moveTo(wx, wy) : ctx.lineTo(wx, wy);
        }
        ctx.stroke();
      }

    } else if (tile === 'table') {
      /* Modular tabletop — merges with adjacent tables */
      const nN = nbr(0,-1), nS = nbr(0,1), nW = nbr(-1,0), nE = nbr(1,0);
      const tm = csz * 0.07;
      /* Edge extents: flush with neighbour edge if connected, else inset */
      const x0t = px + (nW ? 0 : tm),  y0t = py + (nN ? 0 : tm);
      const x1t = px + csz - (nE ? 0 : tm), y1t = py + csz - (nS ? 0 : tm);
      const tfw = x1t - x0t, tfh = y1t - y0t;
      /* Face */
      ctx.fillStyle = 'rgba(200,145,68,0.70)';
      ctx.fillRect(x0t, y0t, tfw, tfh);
      /* Outer border — only on open edges */
      ctx.strokeStyle = 'rgba(105,55,10,0.80)';
      ctx.lineWidth   = Math.max(0.7, csz * 0.05);
      ctx.beginPath();
      if (!nN) { ctx.moveTo(x0t, y0t); ctx.lineTo(x1t, y0t); }
      if (!nS) { ctx.moveTo(x0t, y1t); ctx.lineTo(x1t, y1t); }
      if (!nW) { ctx.moveTo(x0t, y0t); ctx.lineTo(x0t, y1t); }
      if (!nE) { ctx.moveTo(x1t, y0t); ctx.lineTo(x1t, y1t); }
      ctx.stroke();
      /* Wood grain — vertical lines spanning full merged width */
      const grains = Math.max(2, Math.floor(tfw / (csz * 0.28)));
      ctx.strokeStyle = 'rgba(105,55,10,0.18)';
      ctx.lineWidth   = Math.max(0.3, csz * 0.022);
      for (let g = 1; g <= grains; g++) {
        const gx2 = x0t + (g / (grains + 1)) * tfw;
        ctx.beginPath();
        ctx.moveTo(gx2, y0t + tfh * 0.05);
        ctx.lineTo(gx2, y0t + tfh * 0.95);
        ctx.stroke();
      }
      /* Inner edge highlight */
      ctx.strokeStyle = 'rgba(230,185,110,0.28)';
      ctx.lineWidth   = Math.max(0.4, csz * 0.026);
      const hi = csz * 0.10;
      ctx.beginPath();
      if (!nN) { ctx.moveTo(x0t + (nW?0:hi), y0t + hi); ctx.lineTo(x1t - (nE?0:hi), y0t + hi); }
      if (!nS) { ctx.moveTo(x0t + (nW?0:hi), y1t - hi); ctx.lineTo(x1t - (nE?0:hi), y1t - hi); }
      if (!nW) { ctx.moveTo(x0t + hi, y0t + (nN?0:hi)); ctx.lineTo(x0t + hi, y1t - (nS?0:hi)); }
      if (!nE) { ctx.moveTo(x1t - hi, y0t + (nN?0:hi)); ctx.lineTo(x1t - hi, y1t - (nS?0:hi)); }
      ctx.stroke();

    } else if (tile === 'barrel') {
      /* Top-down crate — tile-filling wooden box with plank lines, X brace, corner brackets */
      const cm = csz * 0.06;                          /* inset margin */
      const cx0 = px + cm, cy0 = py + cm;
      const cw  = csz - cm * 2, ch = csz - cm * 2;
      const cx1 = cx0 + cw,     cy1 = cy0 + ch;

      /* Face fill */
      ctx.fillStyle = 'rgba(185,128,58,0.82)';
      ctx.fillRect(cx0, cy0, cw, ch);

      /* Plank lines — three horizontal divisions */
      ctx.strokeStyle = 'rgba(90,45,8,0.30)';
      ctx.lineWidth = Math.max(0.4, csz * 0.028);
      [0.33, 0.67].forEach(t => {
        const ly = cy0 + ch * t;
        ctx.beginPath(); ctx.moveTo(cx0, ly); ctx.lineTo(cx1, ly); ctx.stroke();
      });

      /* X brace — diagonal straps corner to corner */
      ctx.strokeStyle = 'rgba(70,32,5,0.55)';
      ctx.lineWidth = Math.max(0.6, csz * 0.042);
      ctx.beginPath(); ctx.moveTo(cx0, cy0); ctx.lineTo(cx1, cy1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx1, cy0); ctx.lineTo(cx0, cy1); ctx.stroke();

      /* Outer border */
      ctx.strokeStyle = 'rgba(70,32,5,0.82)';
      ctx.lineWidth = Math.max(0.8, csz * 0.055);
      ctx.strokeRect(cx0, cy0, cw, ch);

      /* Corner brackets — small L-shapes at each corner */
      const bl = csz * 0.14;                          /* bracket arm length */
      ctx.strokeStyle = 'rgba(40,16,2,0.75)';
      ctx.lineWidth = Math.max(0.8, csz * 0.055);
      ctx.lineCap = 'square';
      [
        [cx0, cy0,  1,  1],
        [cx1, cy0, -1,  1],
        [cx0, cy1,  1, -1],
        [cx1, cy1, -1, -1],
      ].forEach(([bx, by, dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(bx + dx * bl, by);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx, by + dy * bl);
        ctx.stroke();
      });
      ctx.lineCap = 'butt';

      /* Face highlight — faint top-left sheen */
      ctx.fillStyle = 'rgba(255,220,140,0.10)';
      ctx.fillRect(cx0, cy0, cw * 0.55, ch * 0.55);

    } else if (tile === 'special' || tile === 'poi2' || tile === 'poi3' || tile === 'poi4') {
      /* POI — stone base so it blends with floor context; minimal centred ring marker */
      const MARKS = {
        special: { ring: 'rgba(160,110,220,0.42)', dot: 'rgba(160,110,220,0.55)' },
        poi2:    { ring: 'rgba(180,70,55,0.38)',   dot: 'rgba(190,80,60,0.52)'   },
        poi3:    { ring: 'rgba(50,130,65,0.38)',   dot: 'rgba(55,145,70,0.52)'   },
        poi4:    { ring: 'rgba(50,100,190,0.38)',  dot: 'rgba(55,110,205,0.52)'  },
      };
      const mk = MARKS[tile] || MARKS.special;

      /* Floor base — stone tone so the tile reads as floor, not a coloured block */
      ctx.fillStyle = '#c8bda8';
      ctx.fillRect(px, py, csz, csz);

      /* Centred ring — thin stroke, low opacity */
      const cr  = csz * 0.34;
      const cx2 = px + csz * 0.5, cy2 = py + csz * 0.5;
      ctx.strokeStyle = mk.ring;
      ctx.lineWidth   = Math.max(0.8, csz * 0.055);
      ctx.beginPath(); ctx.arc(cx2, cy2, cr, 0, Math.PI * 2); ctx.stroke();

      /* Tiny filled centre dot */
      const dr = Math.max(1, csz * 0.09);
      ctx.fillStyle = mk.dot;
      ctx.beginPath(); ctx.arc(cx2, cy2, dr, 0, Math.PI * 2); ctx.fill();
    }

    ctx.restore(); /* end clip */

    /* Softened border — very faint, just enough to suggest cell edges */
    ctx.save();
    ctx.globalAlpha = 0.12 + h * 0.10;
    ctx.strokeStyle = def.stroke;
    ctx.lineWidth   = Math.max(0.3, csz * 0.022);
    ctx.strokeRect(px + 0.5, py + 0.5, csz - 1, csz - 1);
    ctx.restore();
  }

  /* ── Shadow pass — top-left light source; shadows fall to the right and below walls ── */
  function drawShadowPass(ctx, fl, x0, y0, x1, y1, csz) {
    const GW_ = gW(), GH_ = gH();
    const STR  = 0.44;   /* peak opacity for primary faces */
    const STRD = 0.26;   /* peak opacity for diagonal corner */
    const SPR  = 0.72;   /* fraction of neighbour cell the shadow covers */

    for (let gx = Math.max(0, x0); gx < Math.min(GW_, x1); gx++) {
      for (let gy = Math.max(0, y0); gy < Math.min(GH_, y1); gy++) {
        if (fl.cells[`${gx},${gy}`] !== 'wall') continue;

        /* Right neighbour — wall blocks light from the left */
        const rx = gx + 1, ry = gy;
        if (rx >= 0 && rx < GW_ && ry >= 0 && ry < GH_ && fl.cells[`${rx},${ry}`] !== 'wall') {
          const npx = rx * csz, npy = ry * csz;
          const g = ctx.createLinearGradient(npx, npy, npx + csz * SPR, npy);
          g.addColorStop(0,    `rgba(0,0,0,${STR})`);
          g.addColorStop(0.45, `rgba(0,0,0,${STR * 0.25})`);
          g.addColorStop(1,    'rgba(0,0,0,0)');
          ctx.fillStyle = g; ctx.fillRect(npx, npy, csz, csz);
        }

        /* Bottom neighbour — wall blocks light from above */
        const bx = gx, by = gy + 1;
        if (bx >= 0 && bx < GW_ && by >= 0 && by < GH_ && fl.cells[`${bx},${by}`] !== 'wall') {
          const npx = bx * csz, npy = by * csz;
          const g = ctx.createLinearGradient(npx, npy, npx, npy + csz * SPR);
          g.addColorStop(0,    `rgba(0,0,0,${STR})`);
          g.addColorStop(0.45, `rgba(0,0,0,${STR * 0.25})`);
          g.addColorStop(1,    'rgba(0,0,0,0)');
          ctx.fillStyle = g; ctx.fillRect(npx, npy, csz, csz);
        }

        /* Bottom-right diagonal — additive corner darkening */
        const dx = gx + 1, dy = gy + 1;
        if (dx >= 0 && dx < GW_ && dy >= 0 && dy < GH_ && fl.cells[`${dx},${dy}`] !== 'wall') {
          const npx = dx * csz, npy = dy * csz;
          const g = ctx.createRadialGradient(npx, npy, 0, npx, npy, csz * SPR);
          g.addColorStop(0,   `rgba(0,0,0,${STRD})`);
          g.addColorStop(0.5, `rgba(0,0,0,${STRD * 0.3})`);
          g.addColorStop(1,   'rgba(0,0,0,0)');
          ctx.fillStyle = g; ctx.fillRect(npx, npy, csz, csz);
        }
      }
    }
  }

  /* ── Thin wall pass — draws edge lines stored in fl.thinwalls ── */
  function drawThinWallPass(ctx, fl, x0, y0, x1, y1, csz) {
    if (!fl.thinwalls) return;
    const lw = Math.max(2, csz * 0.10);
    ctx.lineCap = 'square';

    for (const key of Object.keys(fl.thinwalls)) {
      const parts = key.split(',');
      const cx = +parts[0], cy = +parts[1], edge = parts[2];
      if (cx < x0 - 1 || cx > x1 + 1 || cy < y0 - 1 || cy > y1 + 1) continue;
      const px = cx * csz, py = cy * csz;

      /* Dark base stroke */
      ctx.strokeStyle = '#1e1c18';
      ctx.lineWidth   = lw;
      ctx.beginPath();
      if      (edge === 'N') { ctx.moveTo(px,        py);        ctx.lineTo(px + csz, py);        }
      else if (edge === 'S') { ctx.moveTo(px,        py + csz);  ctx.lineTo(px + csz, py + csz);  }
      else if (edge === 'W') { ctx.moveTo(px,        py);        ctx.lineTo(px,       py + csz);  }
      else                   { ctx.moveTo(px + csz,  py);        ctx.lineTo(px + csz, py + csz);  }
      ctx.stroke();

      /* Light specular highlight — offset 1 px toward the light (top-left) */
      const offX = (edge === 'E') ? -1 : (edge === 'W') ? 0 : 0;
      const offY = (edge === 'S') ? -1 : (edge === 'N') ? 0 : 0;
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth   = Math.max(0.5, lw * 0.35);
      ctx.beginPath();
      if      (edge === 'N') { ctx.moveTo(px + offX,       py + offY);       ctx.lineTo(px + csz + offX, py + offY);       }
      else if (edge === 'S') { ctx.moveTo(px + offX,       py + csz + offY); ctx.lineTo(px + csz + offX, py + csz + offY); }
      else if (edge === 'W') { ctx.moveTo(px + offX,       py + offY);       ctx.lineTo(px + offX,       py + csz + offY); }
      else                   { ctx.moveTo(px + csz + offX, py + offY);       ctx.lineTo(px + csz + offX, py + csz + offY); }
      ctx.stroke();
    }
    ctx.lineCap = 'butt';
  }

  /* ════════════════════════════════════════════
     PAINTING — single cell primitives
  ════════════════════════════════════════════ */

  /* Determine which edge of a cell the cursor is nearest to (fractional 0..1 within cell) */
  function nearestEdge(fx, fy) {
    const distN = fy, distS = 1 - fy, distW = fx, distE = 1 - fx;
    const m = Math.min(distN, distS, distW, distE);
    if (m === distN) return 'N';
    if (m === distS) return 'S';
    if (m === distW) return 'W';
    return 'E';
  }

  /* Paint a thin wall edge based on raw screen coords (bypasses brush, toggles edge) */
  function paintThinWall(clientX, clientY) {
    const rect = _canvas.getBoundingClientRect();
    const rawX = (clientX - rect.left - _panX) / cs();
    const rawY = (clientY - rect.top  - _panY) / cs();
    const cx   = Math.floor(rawX), cy = Math.floor(rawY);
    if (cx < 0 || cx >= gW() || cy < 0 || cy >= gH()) return;
    const fx   = rawX - cx, fy = rawY - cy;
    const edge = nearestEdge(fx, fy);
    const key  = `${cx},${cy},${edge}`;
    const fl   = activeFloor();
    if (!fl) return;
    if (!fl.thinwalls) fl.thinwalls = {};
    /* On first contact in this stroke, record the intent (add vs remove) */
    if (_twIntent === null) _twIntent = !fl.thinwalls[key];
    if (_twIntent) fl.thinwalls[key] = true;
    else           delete fl.thinwalls[key];
    save(); draw();
  }

  /* Apply one tile to the floor (no save/draw — caller handles that) */
  function paintOneCell(x, y, fl) {
    if (x < 0 || x >= gW() || y < 0 || y >= gH()) return;
    const key = `${x},${y}`;
    if (_tool === 'erase') {
      delete fl.cells[key];
      if (fl.labels) delete fl.labels[key];
      if (fl.thinwalls) {
        ['N','S','E','W'].forEach(e => delete fl.thinwalls[`${x},${y},${e}`]);
      }
    } else if (_tool === 'eraselabel') {
      if (fl.labels) delete fl.labels[key];
    } else if (_tool === 'erasewall') {
      if (fl.cells[key] === 'wall') delete fl.cells[key];
      if (fl.thinwalls) {
        ['N','S','E','W'].forEach(e => delete fl.thinwalls[`${x},${y},${e}`]);
      }
    } else if (_tool === 'autowall') {
      fl.cells[key] = 'stone';
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && nx < gW() && ny >= 0 && ny < gH()) {
            const nk = `${nx},${ny}`;
            if (!fl.cells[nk]) fl.cells[nk] = 'wall';
          }
        }
      }
    } else if (_tool === 'autothinwall') {
      /* Place floor on target.
         - Face borders empty/non-floor → add thin wall on that face.
         - Face borders a floor tile   → remove thin wall on both this face
                                         and the neighbour's opposite face. */
      fl.cells[key] = 'stone';
      if (!fl.thinwalls) fl.thinwalls = {};
      const OPPOSITE = { N: 'S', S: 'N', W: 'E', E: 'W' };
      const EDGE_OFFSETS = [
        { dx:  0, dy: -1, edge: 'N' },
        { dx:  0, dy:  1, edge: 'S' },
        { dx: -1, dy:  0, edge: 'W' },
        { dx:  1, dy:  0, edge: 'E' },
      ];
      for (const { dx, dy, edge } of EDGE_OFFSETS) {
        const nx = x + dx, ny = y + dy;
        const inBounds      = nx >= 0 && nx < gW() && ny >= 0 && ny < gH();
        const neighbourFloor = inBounds && FLOOR_TILES.has(fl.cells[`${nx},${ny}`]);
        if (neighbourFloor) {
          /* Shared interior edge — clear both sides */
          delete fl.thinwalls[`${x},${y},${edge}`];
          delete fl.thinwalls[`${nx},${ny},${OPPOSITE[edge]}`];
        } else if (!inBounds || !fl.cells[`${nx},${ny}`]) {
          /* Exterior face — add thin wall */
          fl.thinwalls[`${x},${y},${edge}`] = true;
        }
      }
    } else {
      fl.cells[key] = _tool;
    }
  }

  /* Paint a brush-sized square centred on (cx,cy), then save+draw */
  function paintBrush(cx, cy) {
    const key = `${cx},${cy}`;
    if (_lastCell === key) return;
    _lastCell = key;
    const fl   = activeFloor();
    if (!fl) return;
    const half = (_brushSize - 1) / 2;
    for (let dx = -half; dx <= half; dx++) {
      for (let dy = -half; dy <= half; dy++) {
        paintOneCell(cx + dx, cy + dy, fl);
      }
    }
    save(); draw();
  }

  /* ════════════════════════════════════════════
     SELECTION HELPERS
  ════════════════════════════════════════════ */

  function normSel(s) {
    return {
      x0: Math.min(s.x0, s.x1), y0: Math.min(s.y0, s.y1),
      x1: Math.max(s.x0, s.x1), y1: Math.max(s.y0, s.y1),
    };
  }

  function cellInSelection(x, y) {
    if (!_selection) return false;
    const s = normSel(_selection);
    return x >= s.x0 && x <= s.x1 && y >= s.y0 && y <= s.y1;
  }

  /* Fill selection rectangle with current tool (Add mode) */
  function applySelectionAdd(fl) {
    if (!_selection) return;
    const s = normSel(_selection);

    if (_tool === 'thinwall') {
      /* Paint thin walls along the outer perimeter of the selection rectangle */
      if (!fl.thinwalls) fl.thinwalls = {};
      for (let x = s.x0; x <= s.x1; x++) {
        fl.thinwalls[`${x},${s.y0},N`] = true;   /* top edge */
        fl.thinwalls[`${x},${s.y1},S`] = true;   /* bottom edge */
      }
      for (let y = s.y0; y <= s.y1; y++) {
        fl.thinwalls[`${s.x0},${y},W`] = true;   /* left edge */
        fl.thinwalls[`${s.x1},${y},E`] = true;   /* right edge */
      }
    } else {
      for (let x = s.x0; x <= s.x1; x++) {
        for (let y = s.y0; y <= s.y1; y++) {
          paintOneCell(x, y, fl);
        }
      }
    }

    _selection = null;
    save(); draw();
  }

  /* Lift selected cells off the floor into _selCells, begin drag */
  function startSelectionMove(fl) {
    if (!_selection) return;
    const s = normSel(_selection);
    _selCells = {};
    for (let x = s.x0; x <= s.x1; x++) {
      for (let y = s.y0; y <= s.y1; y++) {
        const key = `${x},${y}`;
        const tile  = fl.cells[key];
        const label = fl.labels?.[key];
        if (tile || label) {
          _selCells[key] = { tile: tile || null, label: label || null };
        }
        delete fl.cells[key];
        if (fl.labels) delete fl.labels[key];
      }
    }
    _selDragging = true;
    _selOffset   = { dx: 0, dy: 0 };
    draw();
  }

  /* Commit moved cells at final offset position */
  function commitSelectionMove(fl) {
    if (!_selCells || !_selOffset) return;
    for (const [key, { tile, label }] of Object.entries(_selCells)) {
      const [cx, cy] = key.split(',').map(Number);
      const tx = cx + _selOffset.dx, ty = cy + _selOffset.dy;
      if (tx < 0 || tx >= gW() || ty < 0 || ty >= gH()) continue;
      const nk = `${tx},${ty}`;
      if (tile)  fl.cells[nk] = tile;
      if (label) { if (!fl.labels) fl.labels = {}; fl.labels[nk] = label; }
    }
    /* Translate the selection box to its new position */
    _selection = {
      x0: _selection.x0 + _selOffset.dx, y0: _selection.y0 + _selOffset.dy,
      x1: _selection.x1 + _selOffset.dx, y1: _selection.y1 + _selOffset.dy,
    };
    _selDragging = false;
    _selCells    = null;
    _selOffset   = null;
    save(); draw();
  }

  /* Cancel an in-progress move drag (Escape) */
  function cancelSelectionMove(fl) {
    if (!_selDragging || !_selCells) return;
    /* Restore cells to their original positions */
    for (const [key, { tile, label }] of Object.entries(_selCells)) {
      if (tile)  fl.cells[key] = tile;
      if (label) { if (!fl.labels) fl.labels = {}; fl.labels[key] = label; }
    }
    _selDragging = false;
    _selCells    = null;
    _selOffset   = null;
    draw();
  }

  /* ════════════════════════════════════════════
     LABEL INPUT
  ════════════════════════════════════════════ */

  function showLabelInput(x, y) {
    _canvas.parentElement.querySelectorAll('.mb-label-input').forEach(el => el.remove());
    const csz = cs();
    const fl  = activeFloor();
    if (!fl) return;
    const key = `${x},${y}`;

    const input = document.createElement('input');
    input.type        = 'text';
    input.value       = fl.labels?.[key] || '';
    input.className   = 'mb-label-input';
    input.placeholder = 'Label…';
    input.style.left  = (_panX + x * csz + csz * 0.05) + 'px';
    input.style.top   = (_panY + y * csz + csz * 0.15) + 'px';
    input.style.width = Math.max(70, csz * 0.9) + 'px';

    _canvas.parentElement.appendChild(input);
    input.focus(); input.select();

    function commit() {
      const val = input.value.trim();
      if (!fl.labels) fl.labels = {};
      if (val) fl.labels[key] = val;
      else     delete fl.labels[key];
      input.remove(); save(); draw();
    }

    input.addEventListener('blur',    commit);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter')  { e.preventDefault(); input.blur(); }
      if (e.key === 'Escape') { input.remove(); draw(); }
    });
  }

  /* ════════════════════════════════════════════
     INPUT HANDLERS
  ════════════════════════════════════════════ */

  function initInput() {
    _canvas.addEventListener('mousedown',   onDown);
    _canvas.addEventListener('mousemove',   onMove);
    window .addEventListener('mouseup',     onUp);
    _canvas.addEventListener('wheel',       onWheel, { passive: false });
    _canvas.addEventListener('contextmenu', e => e.preventDefault());
  }

  function onDown(e) {
    e.preventDefault();
    if (e.button === 1 || e.button === 2) {
      _panning  = true;
      _panStart = { x: e.clientX - _panX, y: e.clientY - _panY };
      _canvas.style.cursor = 'grabbing';
      return;
    }
    if (e.button !== 0) return;

    const { x, y } = screenToCell(e.clientX, e.clientY);

    if (_tool === 'label') {
      showLabelInput(x, y);
      return;
    }

    if (_tool === 'thinwall') {
      _twIntent = null;
      paintThinWall(e.clientX, e.clientY);
      return;
    }

    if (_drawMode === 'select') {
      const fl = activeFloor();
      if (_selMode === 'move' && !_selDragging && _selection && cellInSelection(x, y)) {
        /* Begin dragging existing selection */
        _selDragStart = { x, y };
        startSelectionMove(fl);
      } else {
        /* Begin new rubber-band (abandons any existing selection) */
        if (_selDragging) cancelSelectionMove(fl);
        _selection    = { x0: x, y0: y, x1: x, y1: y };
        _selStart     = { x, y };
        _selDragging  = false;
        _selCells     = null;
        _selOffset    = null;
      }
    } else {
      _drawing  = true;
      _lastCell = null;
      paintBrush(x, y);
    }
  }

  function onMove(e) {
    if (_panning && _panStart) {
      _panX = e.clientX - _panStart.x;
      _panY = e.clientY - _panStart.y;
      draw();
      return;
    }

    if (_drawMode === 'select' && (e.buttons & 1)) {
      const { x, y } = screenToCell(e.clientX, e.clientY);
      if (_selDragging && _selDragStart) {
        _selOffset = { dx: x - _selDragStart.x, dy: y - _selDragStart.y };
        draw();
      } else if (_selStart) {
        _selection = { x0: _selStart.x, y0: _selStart.y, x1: x, y1: y };
        draw();
      }
      return;
    }

    if (_tool === 'thinwall' && (e.buttons & 1)) {
      paintThinWall(e.clientX, e.clientY);
      return;
    }

    if (_drawing && (e.buttons & 1)) {
      const { x, y } = screenToCell(e.clientX, e.clientY);
      paintBrush(x, y);
    }

    /* Cursor hint when hovering over selection in move mode */
    if (_drawMode === 'select' && _selMode === 'move' && _selection && !_selDragging) {
      const { x, y } = screenToCell(e.clientX, e.clientY);
      _canvas.style.cursor = cellInSelection(x, y) ? 'move' : 'default';
    }
  }

  function onUp(e) {
    if (_drawMode === 'select') {
      const fl = activeFloor();
      if (_selDragging) {
        commitSelectionMove(fl);
      } else if (_selStart) {
        if (_selMode === 'add') {
          applySelectionAdd(fl);
        }
        /* In move mode: keep selection for user to then drag */
        _selStart = null;
      }
    }

    _drawing  = false;
    _lastCell = null;
    _twIntent = null;

    if (_panning) {
      _panning  = false;
      _panStart = null;
      _canvas.style.cursor = getCursor();
    }
  }

  function onWheel(e) {
    e.preventDefault();
    const rect   = _canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const old    = _zoom;
    _zoom  = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, _zoom * (e.deltaY > 0 ? 0.88 : 1.14)));
    _panX  = mouseX - (_zoom / old) * (mouseX - _panX);
    _panY  = mouseY - (_zoom / old) * (mouseY - _panY);
    draw();
    updateZoomLabel();
  }

  /* ════════════════════════════════════════════
     HELPERS
  ════════════════════════════════════════════ */

  function resizeCanvas() {
    if (!_canvas) return;
    _dpr = window.devicePixelRatio || 1;
    const p = _canvas.parentElement;
    const w = p.clientWidth, h = p.clientHeight;
    _canvas.width  = w * _dpr;  _canvas.height = h * _dpr;
    _canvas.style.width  = w + 'px';
    _canvas.style.height = h + 'px';
    draw();
  }

  function fitToView() {
    if (!_canvas) return;
    const GW = gW(), GH = gH();
    const W  = _canvas.width / _dpr, H = _canvas.height / _dpr;
    _zoom = Math.max(MIN_ZOOM, Math.min((W - 60) / (GW * BASE_CELL), (H - 60) / (GH * BASE_CELL), MAX_ZOOM));
    _panX = (W - GW * cs()) / 2;
    _panY = (H - GH * cs()) / 2;
    draw();
    updateZoomLabel();
  }

  function updateZoomLabel() {
    const el = document.getElementById('mb-zoom-pct');
    if (el) el.textContent = Math.round(_zoom * 100) + '%';
  }

  function setTool(tool) {
    _tool = tool;
    if (_canvas) _canvas.style.cursor = getCursor();
    document.querySelectorAll('.mb-tool-btn').forEach(btn => {
      btn.classList.toggle('mb-tool-active', btn.dataset.tool === tool);
    });
  }

  /* ════════════════════════════════════════════
     MAP / FLOOR MANAGEMENT
  ════════════════════════════════════════════ */

  function selectMap(id) {
    if (!_maps[id]) return;
    _active = id; _floor = 0;
    save(); rebuildAll();
  }

  function selectFloor(idx) {
    const m = activeMap();
    if (!m || idx < 0 || idx >= m.floors.length) return;
    _floor = idx;
    rebuildFloorBar(); draw();
  }

  function setActiveMap(id) {
    if (_maps[id]) { _active = id; _floor = 0; save(); }
  }

  /* ════════════════════════════════════════════
     EXPORT / IMPORT
  ════════════════════════════════════════════ */

  function exportMap() {
    const m = activeMap();
    if (!m) return;
    const blob = new Blob([JSON.stringify(m, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), {
      href: url, download: m.name.replace(/[^a-z0-9]/gi, '_') + '.json',
    });
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  function importMap() {
    const input = Object.assign(document.createElement('input'), {
      type: 'file', accept: '.json,application/json', style: 'display:none',
    });
    document.body.appendChild(input);
    input.addEventListener('change', () => {
      const file = input.files[0];
      input.remove();
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          if (!data.name || !Array.isArray(data.floors)) { alert('Invalid map file.'); return; }
          const id = uid();
          _maps[id] = { ...data, id };
          _active   = id; _floor = 0;
          save(); rebuildAll();
        } catch { alert('Could not parse map file.'); }
      };
      reader.readAsText(file);
    });
    input.click();
    setTimeout(() => { if (input.parentNode) input.remove(); }, 60000);
  }

  /* ════════════════════════════════════════════
     ASCII MAP IMPORT
     Parses the endale_ascii_map_spec format and writes tiles to the active floor.
  ════════════════════════════════════════════ */

  /* Symbol → stored tile name + optional label overlay */
  const ASCII_SYMBOLS = {
    /* Floor tiles */
    '.': { tile: 'stone'  },
    'v': { tile: 'cave'   },
    ',': { tile: 'grass'  },
    'd': { tile: 'dirt'   },
    '_': { tile: 'sand'   },
    'w': { tile: 'wood'   },
    'c': { tile: 'carpet' },
    /* Walls / impassable */
    '#': { tile: 'wall'   },
    '%': { tile: 'cave'   },
    'M': { tile: 'wall'   },
    /* Doors & passages */
    '+': { tile: 'door'   },
    '/': { tile: 'stone'  },
    'X': { tile: 'stone', label: 'X' },
    'S': { tile: 'stairsdown' },
    's': { tile: 'stairsdown' },
    /* Furniture & objects */
    'O': { tile: 'table'  },
    'o': { tile: 'barrel' },
    '|': { tile: 'wall'   },
    '@': { tile: 'stone', label: '@' },
    '&': { tile: 'special' },
    '$': { tile: 'stone', label: '$' },
    /* POI — enemies */
    '1': { tile: 'poi2', label: '1' },
    '2': { tile: 'poi2', label: '2' },
    '3': { tile: 'poi2', label: '3' },
    '4': { tile: 'poi2', label: '4' },
    '5': { tile: 'poi2', label: '5' },
    '6': { tile: 'poi2', label: '6' },
    '7': { tile: 'poi2', label: '7' },
    '8': { tile: 'poi2', label: '8' },
    '9': { tile: 'poi2', label: '9' },
    /* POI — players */
    'A': { tile: 'poi4', label: 'A' },
    'B': { tile: 'poi4', label: 'B' },
    'C': { tile: 'poi4', label: 'C' },
    'D': { tile: 'poi4', label: 'D' },
    'E': { tile: 'poi4', label: 'E' },
    'F': { tile: 'poi4', label: 'F' },
    /* POI — hazard */
    '!': { tile: 'poi3', label: '!' },
    /* Hidden / fog */
    '?': { tile: 'stone' },
    /* Tree markers */
    '^': { tile: 'poi3', label: '^' },
    'T': { tile: 'poi3', label: 'T' },
    /* Direction overlays */
    '>': { tile: 'stone', label: '>' },
    '<': { tile: 'stone', label: '<' },
    'V': { tile: 'stone', label: 'v' },
    /* Structural markers */
    '=': { tile: 'autothinwall' },  /* balcony railing / fence line */
    /* Fallback for unrecognised — handled below */
  };

  /* Parse the full ASCII map spec text. Returns { grid, meta, encounter } or null on failure. */
  function parseASCIIMap(text) {
    /* 1. Extract map grid from ```map fence */
    const fenceMatch = text.match(/```map\s*\n([\s\S]*?)```/);
    if (!fenceMatch) return null;

    const rawGrid = fenceMatch[1];
    const rows    = rawGrid.split('\n');
    /* Remove trailing empty lines */
    while (rows.length && rows[rows.length - 1].trim() === '') rows.pop();
    if (!rows.length) return null;

    /* 2. Pre-normalise rows: runs of 2+ consecutive lowercase letters are inline text
          labels (room names like "kitchen", "war.room"). Convert them to [bracket]
          format so the bracket parser below handles them as label overlays.
          Single-char floor tiles (s, c, d, w, v …) are never affected. */
    const normaliseRow = (row) => {
      /* Replace runs of 2+ lowercase alpha chars with [run] */
      return row.replace(/[a-z]{2,}/g, m => `[${m}]`);
    };

    /* 3. Parse each row character by character, handling [bracket label] sequences */
    const parsedRows = rows.map(rawRow => {
      const row  = normaliseRow(rawRow);
      const cols = [];
      let i = 0;
      while (i < row.length) {
        if (row[i] === '[') {
          /* Bracket label: read until ] */
          const end   = row.indexOf(']', i);
          const label = end === -1 ? row.slice(i + 1) : row.slice(i + 1, end);
          /* First col of bracket → stone + label, rest → stone */
          cols.push({ ch: '.', bracketLabel: label });
          const len = end === -1 ? row.length - i : end - i + 1;
          for (let k = 1; k < len; k++) cols.push({ ch: '.' });
          i = end === -1 ? row.length : end + 1;
        } else {
          cols.push({ ch: row[i] });
          i++;
        }
      }
      return cols;
    });

    const gridW = Math.max(...parsedRows.map(r => r.length));
    /* Pad short rows with stone */
    parsedRows.forEach(r => { while (r.length < gridW) r.push({ ch: '.' }); });

    /* 3. Parse metadata block (everything outside the fence) */
    const meta = {};
    const after = text.replace(/```map[\s\S]*?```/, '').trim();

    const lineVal = (key) => {
      const m = after.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
      return m ? m[1].trim() : null;
    };
    meta.name     = lineVal('MAP')      || 'Imported Map';
    meta.size     = lineVal('SIZE');
    meta.type     = lineVal('TYPE');
    meta.lighting = lineVal('LIGHTING');
    meta.scale    = lineVal('SCALE');
    meta.floors   = lineVal('FLOORS');

    /* Encounter blocks */
    const blockRe = (section) => {
      const m = after.match(new RegExp(`${section}:\\s*\n((?:[ \\t]+[^\\n]+\\n?)*)`));
      return m ? m[1] : null;
    };

    meta.enemies   = blockRe('ENEMIES');
    meta.players   = blockRe('PLAYERS');
    meta.hazards   = blockRe('HAZARDS');
    meta.fearMoves = blockRe('FEAR MOVES');
    meta.notes     = blockRe('NOTES');

    /* WALLS block */
    const wallsRaw = blockRe('WALLS');
    const thinwalls = {};
    if (wallsRaw) {
      for (const line of wallsRaw.split('\n')) {
        const m2 = line.match(/(\d+)\s*,\s*(\d+)\s*,\s*([NSEW])\s*=\s*(thin|auto)/i);
        if (m2) {
          const row = parseInt(m2[1]), col = parseInt(m2[2]), edge = m2[3].toUpperCase();
          thinwalls[`${col},${row},${edge}`] = true;
        }
      }
    }

    return { parsedRows, gridW, gridH: parsedRows.length, meta, thinwalls };
  }

  /* Apply parsed ASCII result to the active floor */
  function applyASCIIToFloor(parsed, fl, map, targetW, targetH) {
    const { parsedRows, thinwalls } = parsed;

    /* Apply grid dimensions (caller already computed targetW/H based on resize checkbox) */
    map.gridW = targetW;
    map.gridH = targetH;

    /* Write tiles and labels */
    for (let gy = 0; gy < parsedRows.length; gy++) {
      const row = parsedRows[gy];
      for (let gx = 0; gx < row.length; gx++) {
        const { ch, bracketLabel } = row[gx];
        const key = `${gx},${gy}`;

        if (bracketLabel !== undefined) {
          /* Bracket label: floor tile + label */
          fl.cells[key]  = 'stone';
          fl.labels[key] = bracketLabel;
          continue;
        }

        const sym = ASCII_SYMBOLS[ch];
        if (sym) {
          fl.cells[key] = sym.tile;
          if (sym.label) fl.labels[key] = sym.label;
        } else {
          /* Unknown symbol → stone, log warning */
          fl.cells[key] = 'stone';
          console.warn(`[ASCII Import] Unknown symbol '${ch}' at (row ${gy}, col ${gx}) — using stone.`);
        }
      }
    }

    /* Write thin walls */
    if (!fl.thinwalls) fl.thinwalls = {};
    Object.assign(fl.thinwalls, thinwalls);
  }

  /* Build and show the encounter panel */
  let _encounterData = null;

  function showEncounterPanel(meta) {
    _encounterData = meta;
    let panel = document.getElementById('mb-encounter-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'mb-encounter-panel';
      panel.className = 'mb-encounter-panel';
      /* Insert into viewport wrapper */
      const vp = _container?.querySelector('.mb-viewport-wrap');
      if (vp) vp.appendChild(panel);
      else _container?.appendChild(panel);
    }

    const fmtBlock = (title, raw) => {
      if (!raw?.trim()) return '';
      const lines = raw.trim().split('\n').map(l => l.trim()).filter(Boolean);
      return `<div class="mb-enc-section">
        <div class="mb-enc-heading">${title}</div>
        ${lines.map(l => `<div class="mb-enc-line">${l}</div>`).join('')}
      </div>`;
    };

    panel.innerHTML = `
      <div class="mb-enc-header">
        <div class="mb-enc-title">${meta.name || 'Encounter'}</div>
        <button class="mb-enc-close" id="mb-enc-close-btn">✕</button>
      </div>
      <div class="mb-enc-meta">
        ${meta.type     ? `<span>${meta.type}</span>`     : ''}
        ${meta.lighting ? `<span>${meta.lighting}</span>` : ''}
        ${meta.scale    ? `<span>${meta.scale}</span>`    : ''}
      </div>
      <div class="mb-enc-body">
        ${fmtBlock('Enemies',     meta.enemies)}
        ${fmtBlock('Players',     meta.players)}
        ${fmtBlock('Hazards',     meta.hazards)}
        ${fmtBlock('Fear Moves',  meta.fearMoves)}
        ${fmtBlock('GM Notes',    meta.notes)}
      </div>`;

    panel.querySelector('#mb-enc-close-btn').addEventListener('click', () => {
      panel.remove();
      _encounterData = null;
    });
  }

  /* Open the ASCII import modal */
  function importASCII() {
    /* Remove any existing modal */
    document.getElementById('mb-ascii-modal')?.remove();

    const overlay = document.createElement('div');
    overlay.id        = 'mb-ascii-modal';
    overlay.className = 'mb-link-modal';

    overlay.innerHTML = `
      <div class="mb-link-inner mb-ascii-inner">
        <div class="mb-link-header">
          <span class="mb-link-title">Import ASCII Map</span>
          <button class="mb-link-close" id="mb-ascii-close">✕</button>
        </div>
        <div class="mb-ascii-body">
          <p class="mb-ascii-hint">Paste a map block from Claude Web. Include the \`\`\`map\`\`\` fence and all metadata sections below it.</p>
          <textarea id="mb-ascii-input" class="mb-ascii-textarea" placeholder="Paste map here…" spellcheck="false"></textarea>
          <div class="mb-ascii-options">
            <label class="mb-ascii-label">
              <input type="radio" name="mb-ascii-target" value="current" checked> Write to current floor
            </label>
            <label class="mb-ascii-label">
              <input type="radio" name="mb-ascii-target" value="new"> Create new floor
            </label>
            <label class="mb-ascii-label">
              <input type="checkbox" id="mb-ascii-resize"> Auto-resize grid to fit
            </label>
          </div>
          <div id="mb-ascii-error" class="mb-ascii-error"></div>
        </div>
        <div class="mb-link-footer">
          <button class="mb-btn" id="mb-ascii-cancel">Cancel</button>
          <button class="mb-btn mb-btn-ascii-ok" id="mb-ascii-ok">Import Map</button>
        </div>
      </div>`;

    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.querySelector('#mb-ascii-close').addEventListener('click', close);
    overlay.querySelector('#mb-ascii-cancel').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    overlay.querySelector('#mb-ascii-ok').addEventListener('click', () => {
      const text    = overlay.querySelector('#mb-ascii-input').value;
      const target  = overlay.querySelector('input[name="mb-ascii-target"]:checked').value;
      const resize  = overlay.querySelector('#mb-ascii-resize').checked;
      const errEl   = overlay.querySelector('#mb-ascii-error');
      errEl.textContent = '';

      const parsed = parseASCIIMap(text);
      if (!parsed) {
        errEl.textContent = 'Could not find a ```map block. Check that the fence is included.';
        return;
      }

      const map = activeMap();
      if (!map) { errEl.textContent = 'No active map.'; return; }

      let fl;
      if (target === 'new') {
        const flName = parsed.meta.name || 'Imported Floor';
        fl = newFloor(flName);
        map.floors.push(fl);
        _floor = map.floors.length - 1;
      } else {
        fl = activeFloor();
        if (!fl) { errEl.textContent = 'No active floor.'; return; }
      }

      const curW = map.gridW || DEFAULT_GRID_W;
      const curH = map.gridH || DEFAULT_GRID_H;
      const targetW = resize ? Math.max(parsed.gridW + 2, curW) : curW;
      const targetH = resize ? Math.max(parsed.gridH + 2, curH) : curH;

      applyASCIIToFloor(parsed, fl, map, targetW, targetH);
      save();

      /* Rebuild UI and show encounter panel */
      rebuildAll();
      showEncounterPanel(parsed.meta);

      const { gridW, gridH, meta } = parsed;
      const eCount = (meta.enemies || '').trim().split('\n').filter(l => l.trim() && !l.includes('None')).length;
      const pCount = (meta.players || '').trim().split('\n').filter(l => l.trim() && !l.includes('none')).length;

      close();
      /* Brief status in the hint bar — query after rebuild */
      requestAnimationFrame(() => {
        const hint = _container?.querySelector('.mb-hint');
        if (hint) {
          const orig = hint.textContent;
          hint.textContent = `Map rendered — ${meta.name}, ${gridW}×${gridH}, ${eCount} enemies, ${pCount} players.`;
          setTimeout(() => { if (hint.isConnected) hint.textContent = orig; }, 6000);
        }
      });
    });

    /* Focus the textarea */
    setTimeout(() => overlay.querySelector('#mb-ascii-input')?.focus(), 50);
  }

  /* ════════════════════════════════════════════
     JPEG EXPORT
     Renders the active floor to an offscreen canvas and downloads as JPEG.
     Crops to the bounding box of painted cells with a small padding.
  ════════════════════════════════════════════ */

  function exportJPEG() {
    const m  = activeMap();
    const fl = activeFloor();
    if (!m || !fl) return;

    const cells = fl.cells || {};
    const keys  = Object.keys(cells);

    /* Find bounding box of painted content */
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const key of keys) {
      const [x, y] = key.split(',').map(Number);
      minX = Math.min(minX, x); minY = Math.min(minY, y);
      maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
    }

    /* Fall back to full grid if map is empty */
    if (!isFinite(minX)) {
      minX = 0; minY = 0; maxX = gW() - 1; maxY = gH() - 1;
    }

    const PAD    = 2;                /* cells of padding around content */
    const CSZ    = 32;               /* export cell size in px */
    const ox     = Math.max(0, minX - PAD);
    const oy     = Math.max(0, minY - PAD);
    const ex     = Math.min(gW() - 1, maxX + PAD);
    const ey     = Math.min(gH() - 1, maxY + PAD);
    const width  = (ex - ox + 1) * CSZ;
    const height = (ey - oy + 1) * CSZ;

    const canvas = document.createElement('canvas');
    canvas.width  = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    /* Background */
    ctx.fillStyle = '#6b6560';
    ctx.fillRect(0, 0, width, height);

    /* Dot grid */
    ctx.fillStyle = 'rgba(0,0,0,0.16)';
    for (let x = ox; x <= ex + 1; x++) {
      for (let y = oy; y <= ey + 1; y++) {
        ctx.fillRect((x - ox) * CSZ, (y - oy) * CSZ, 1, 1);
      }
    }

    /* Tiles */
    ctx.save();
    ctx.translate(-ox * CSZ, -oy * CSZ);

    for (const [key, tile] of Object.entries(cells)) {
      const [cx, cy] = key.split(',').map(Number);
      if (cx < ox || cx > ex || cy < oy || cy > ey) continue;
      const def = TILES[tile];
      if (!def) continue;
      drawTile(ctx, cx, cy, tile, def, CSZ, fl);
    }

    /* Wall → floor shadow pass */
    if (_shadows) drawShadowPass(ctx, fl, ox - 1, oy - 1, ex + 2, ey + 2, CSZ);

    /* Thin wall edge lines */
    drawThinWallPass(ctx, fl, ox - 1, oy - 1, ex + 2, ey + 2, CSZ);

    /* Labels */
    if (fl.labels && CSZ >= 10) {
      const fontSize = Math.min(Math.max(8, CSZ * 0.28), 14);
      ctx.font          = `${fontSize}px Georgia, serif`;
      ctx.textAlign     = 'center';
      ctx.textBaseline  = 'middle';
      for (const [key, text] of Object.entries(fl.labels)) {
        const [lx, ly] = key.split(',').map(Number);
        if (lx < ox || lx > ex || ly < oy || ly > ey) continue;
        const px = lx * CSZ + CSZ / 2, py = ly * CSZ + CSZ / 2;
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillText(text, px + 0.5, py + 0.5);
        const tile = cells[key];
        ctx.fillStyle = (tile && TILES[tile]?.dark) ? '#d0c8b8' : '#f0ebe3';
        ctx.fillText(text, px, py);
      }
    }

    ctx.restore();

    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a   = Object.assign(document.createElement('a'), {
        href:     url,
        download: `${m.name.replace(/[^a-z0-9]/gi, '_')}_${fl.name.replace(/[^a-z0-9]/gi, '_')}.jpg`,
      });
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }, 'image/jpeg', 0.92);
  }

  /* ════════════════════════════════════════════
     FOUNDRY VTT EXPORT
     Produces a Scene JSON compatible with Foundry v11/v12.
     Import via: right-click scene in Scenes directory → Import Data.
  ════════════════════════════════════════════ */

  function exportFoundry() {
    const m  = activeMap();
    const fl = activeFloor();
    if (!m || !fl) return;

    const GS = 100; /* Foundry grid cell size in pixels */
    const GW = gW(), GH = gH();
    const cells = fl.cells;

    /* ── Helpers ── */

    function isWall(x, y) { return cells[`${x},${y}`] === 'wall'; }

    /* Collect horizontal / vertical wall edge segments, keyed for merging */
    const hEdges = new Map(); /* fixed-y → [{x0,x1}] */
    const vEdges = new Map(); /* fixed-x → [{y0,y1}] */

    function addH(x0, x1, y) {
      if (!hEdges.has(y)) hEdges.set(y, []);
      hEdges.get(y).push({ x0, x1 });
    }
    function addV(y0, y1, x) {
      if (!vEdges.has(x)) vEdges.set(x, []);
      vEdges.get(x).push({ y0, y1 });
    }

    /* For each wall tile, emit an edge for every face that borders a non-wall cell */
    for (const [key, tile] of Object.entries(cells)) {
      if (tile !== 'wall') continue;
      const [cx, cy] = key.split(',').map(Number);
      if (!isWall(cx,     cy - 1)) addH(cx,     cx + 1, cy);       /* top    */
      if (!isWall(cx,     cy + 1)) addH(cx,     cx + 1, cy + 1);   /* bottom */
      if (!isWall(cx - 1, cy    )) addV(cy,     cy + 1, cx);       /* left   */
      if (!isWall(cx + 1, cy    )) addV(cy,     cy + 1, cx + 1);   /* right  */
    }

    /* Merge collinear adjacent segments (reduces wall count) */
    function mergeH(segs) {
      segs.sort((a, b) => a.x0 - b.x0);
      const out = []; let cur = null;
      for (const s of segs) {
        if (!cur) { cur = { ...s }; continue; }
        if (s.x0 <= cur.x1) { cur.x1 = Math.max(cur.x1, s.x1); }
        else { out.push(cur); cur = { ...s }; }
      }
      if (cur) out.push(cur);
      return out;
    }
    function mergeV(segs) {
      segs.sort((a, b) => a.y0 - b.y0);
      const out = []; let cur = null;
      for (const s of segs) {
        if (!cur) { cur = { ...s }; continue; }
        if (s.y0 <= cur.y1) { cur.y1 = Math.max(cur.y1, s.y1); }
        else { out.push(cur); cur = { ...s }; }
      }
      if (cur) out.push(cur);
      return out;
    }

    function mkWall(x0, y0, x1, y1, door = 0) {
      return {
        c:     [x0 * GS, y0 * GS, x1 * GS, y1 * GS],
        door,
        ds:    0,      /* closed */
        sight: 1,      /* 1 = NORMAL — blocks */
        light: 1,
        sound: 1,
        move:  1,
        dir:   0,
        flags: {},
      };
    }

    const walls = [];

    for (const [y, segs] of hEdges)
      for (const s of mergeH(segs))
        walls.push(mkWall(s.x0, y, s.x1, y));

    for (const [x, segs] of vEdges)
      for (const s of mergeV(segs))
        walls.push(mkWall(x, s.y0, x, s.y1));

    /* Door tiles → door wall across the opening.
       Orientation: if left/right neighbours are passable → vertical slot; else horizontal. */
    const PASSABLE = new Set([...FLOOR_TILES, 'stairs','water','special']);
    for (const [key, tile] of Object.entries(cells)) {
      if (tile !== 'door') continue;
      const [cx, cy] = key.split(',').map(Number);
      const lp = PASSABLE.has(cells[`${cx-1},${cy}`]);
      const rp = PASSABLE.has(cells[`${cx+1},${cy}`]);
      const tp = PASSABLE.has(cells[`${cx},${cy-1}`]);
      const bp = PASSABLE.has(cells[`${cx},${cy+1}`]);
      if ((lp || rp) && !(tp || bp)) {
        /* Passage runs left↔right — door wall is vertical, mid-cell */
        walls.push({
          c:     [cx * GS + GS/2, cy * GS, cx * GS + GS/2, (cy+1) * GS],
          door: 1, ds: 0, sight: 1, light: 1, sound: 1, move: 1, dir: 0, flags: {},
        });
      } else {
        /* Passage runs up↔down — door wall is horizontal, mid-cell */
        walls.push({
          c:     [cx * GS, cy * GS + GS/2, (cx+1) * GS, cy * GS + GS/2],
          door: 1, ds: 0, sight: 1, light: 1, sound: 1, move: 1, dir: 0, flags: {},
        });
      }
    }

    /* Notes — POI tiles and labelled cells */
    const notes = [];
    const usedByPoi = new Set();

    for (const [key, tile] of Object.entries(cells)) {
      if (tile !== 'special') continue;
      const [cx, cy] = key.split(',').map(Number);
      usedByPoi.add(key);
      notes.push({
        x: cx * GS + GS/2, y: cy * GS + GS/2,
        text: fl.labels?.[key] || 'POI',
        iconSize: 40, fontSize: 32,
        textAnchor: 2, textColor: '#FFFFFF',
        flags: {},
      });
    }
    for (const [key, text] of Object.entries(fl.labels || {})) {
      if (usedByPoi.has(key)) continue;
      const [cx, cy] = key.split(',').map(Number);
      notes.push({
        x: cx * GS + GS/2, y: cy * GS + GS/2,
        text, iconSize: 32, fontSize: 24,
        textAnchor: 2, textColor: '#FFFFFF',
        flags: {},
      });
    }

    /* ── Scene object ── */
    const scene = {
      name:            `${m.name} — ${fl.name}`,
      width:           GW * GS,
      height:          GH * GS,
      padding:         0,
      backgroundColor: '#1a1a1a',
      grid: {
        type:     1,        /* 1 = SQUARE */
        size:     GS,
        color:    '#000000',
        alpha:    0.2,
        distance: 5,
        units:    'ft',
      },
      tokenVision:    true,
      fogExploration: true,
      globalLight:    false,
      darkness:       0,
      walls,
      notes,
      drawings:   [],
      tokens:     [],
      lights:     [],
      sounds:     [],
      tiles:      [],
      templates:  [],
      flags:      {},
    };

    const blob = new Blob([JSON.stringify(scene, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), {
      href:     url,
      download: m.name.replace(/[^a-z0-9]/gi, '_') + '_foundry.json',
    });
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  /* ════════════════════════════════════════════
     LOCATION LINKING
  ════════════════════════════════════════════ */

  function openLinkModal() {
    const prev = document.getElementById('mb-link-modal');
    if (prev) { prev.remove(); return; }

    const m = activeMap();
    if (!m) return;

    /* ── Collect location cards only ── */
    const entries = [];
    const pages = (typeof Endale !== 'undefined') ? Endale.getPages() : {};
    for (const [pageId, pageData] of Object.entries(pages)) {
      if (!pageData.groups) continue;
      pageData.groups.forEach((group, gi) => {
        if (group.type !== 'cards') return;
        group.entries.forEach((entry, ei) => {
          if (entry.cardType !== 'location') return;
          entries.push({
            key:      `${pageId}|${gi}|${ei}`,
            name:     entry.name,
            subtitle: entry.role || pageData.title || pageId,
          });
        });
      });
    }
    /* Custom location cards */
    try {
      const customs = JSON.parse(localStorage.getItem('endale-custom-cards')) || [];
      customs.filter(c => c.cardType === 'location').forEach(c => {
        entries.push({
          key:      `custom|${c._customId}`,
          name:     c.name,
          subtitle: c.role || 'Custom location',
        });
      });
    } catch {}

    const modal = document.createElement('div');
    modal.id        = 'mb-link-modal';
    modal.className = 'mb-link-modal';

    const itemsHtml = entries.length === 0
      ? '<div class="mb-link-empty">No location cards found.</div>'
      : entries.map(e =>
          `<button class="mb-link-item${m.linkedKey === e.key ? ' mb-link-active' : ''}" data-key="${e.key}">
             <span class="mb-link-name">${e.name}</span>
             <span class="mb-link-meta">${e.subtitle}</span>
           </button>`
        ).join('');

    modal.innerHTML = `
      <div class="mb-link-inner">
        <div class="mb-link-header">
          <span class="mb-link-title">Link to Location</span>
          <button class="mb-link-close">✕</button>
        </div>
        <input class="mb-link-search" type="text" placeholder="Filter locations…">
        <div class="mb-link-list">${itemsHtml}</div>
        <div class="mb-link-footer">
          <div class="mb-link-new-row">
            <input id="mb-link-new-name" class="mb-link-new-input" type="text" placeholder="New location name…">
            <button class="mb-btn mb-link-create-btn" id="mb-link-create-btn">+ Create &amp; Link</button>
          </div>
          ${m.linkedKey ? `<button class="mb-link-unlink">Remove link</button>` : ''}
        </div>
      </div>`;

    modal.querySelector('.mb-link-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

    const search = modal.querySelector('.mb-link-search');
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      modal.querySelectorAll('.mb-link-item').forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });

    modal.querySelectorAll('.mb-link-item').forEach(btn => {
      btn.addEventListener('click', () => {
        m.linkedKey = btn.dataset.key;
        save(); modal.remove(); updateLinkBtn();
      });
    });

    /* Create & Link new location */
    modal.querySelector('#mb-link-create-btn').addEventListener('click', () => {
      const nameInput = modal.querySelector('#mb-link-new-name');
      const name = nameInput.value.trim();
      if (!name) { nameInput.focus(); return; }

      /* Build a minimal location card and persist it */
      const customId = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      const card = {
        _customId:  customId,
        cardType:   'location',
        name,
        role:       'Location',
        rank:       [''],
        fields:     [
          { label: 'Atmosphere', value: '' },
          { label: 'NPCs present', value: '' },
          { label: 'Points of interest', value: '' },
        ],
        gmNote: '',
        quote:  '',
        tags:   [],
      };
      try {
        const existing = JSON.parse(localStorage.getItem('endale-custom-cards')) || [];
        existing.push(card);
        localStorage.setItem('endale-custom-cards', JSON.stringify(existing));
      } catch {}

      m.linkedKey = `custom|${customId}`;
      save(); modal.remove(); updateLinkBtn();
    });

    const unlinkBtn = modal.querySelector('.mb-link-unlink');
    if (unlinkBtn) {
      unlinkBtn.addEventListener('click', () => {
        m.linkedKey = null;
        save(); modal.remove(); updateLinkBtn();
      });
    }

    document.body.appendChild(modal);
    search.focus();
  }

  function resolveLinkedName(m) {
    if (!m?.linkedKey) return null;
    if (m.linkedKey.startsWith('custom|')) {
      const id = m.linkedKey.slice(7);
      try {
        const customs = JSON.parse(localStorage.getItem('endale-custom-cards')) || [];
        return customs.find(c => c._customId === id)?.name || null;
      } catch { return null; }
    }
    const pages = (typeof Endale !== 'undefined') ? Endale.getPages() : {};
    const [pageId, gi, ei] = m.linkedKey.split('|');
    return pages[pageId]?.groups?.[+gi]?.entries?.[+ei]?.name || null;
  }

  function updateLinkBtn() {
    const btn = document.getElementById('mb-link-btn');
    if (!btn) return;
    const name = resolveLinkedName(activeMap());
    btn.textContent = name ? `🔗 ${name}` : 'Link Location';
    btn.title       = name ? `Linked to: ${name}. Click to change.` : 'Link this map to a location card';
  }

  /* ════════════════════════════════════════════
     CARD PREVIEW — called from app.js after rendering pages
  ════════════════════════════════════════════ */

  function findMapByKey(key) {
    return Object.values(_maps).find(m => m.linkedKey === key) || null;
  }

  function renderPreviewCanvas(canvas, floor, mapName, dpr) {
    const ctx = canvas.getContext('2d');
    const W   = canvas.width  / dpr;
    const H   = canvas.height / dpr;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#6b6560';
    ctx.fillRect(0, 0, W, H);

    const cells = floor?.cells || {};

    if (Object.keys(cells).length === 0) {
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.font = '10px Georgia, serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('No map data yet', W / 2, H / 2);
      ctx.restore();
      return;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const key of Object.keys(cells)) {
      const [x, y] = key.split(',').map(Number);
      minX = Math.min(minX, x); minY = Math.min(minY, y);
      maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
    }

    const PAD  = 1.5;
    const gw   = maxX - minX + 1 + PAD * 2;
    const gh   = maxY - minY + 1 + PAD * 2;
    const csz  = Math.min((W - 4) / gw, (H - 20) / gh);
    const offX = (W - gw * csz) / 2 + PAD * csz - minX * csz;
    const offY = (H - 20 - gh * csz) / 2 + PAD * csz - minY * csz;

    if (csz >= 3) {
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      for (let x = minX - 1; x <= maxX + 1; x++) {
        for (let y = minY - 1; y <= maxY + 1; y++) {
          ctx.fillRect(offX + x * csz, offY + y * csz, 1, 1);
        }
      }
    }

    for (const [key, tile] of Object.entries(cells)) {
      const [cx, cy] = key.split(',').map(Number);
      const def = TILES[tile];
      if (!def) continue;
      ctx.fillStyle = def.color;
      ctx.fillRect(offX + cx * csz, offY + cy * csz, csz + 0.5, csz + 0.5);
    }

    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(0, H - 18, W, 18);
    ctx.font = '9px Georgia, serif';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle    = '#d0c8b8';
    ctx.textAlign    = 'left';
    ctx.fillText(mapName || '', 6, H - 3);
    ctx.fillStyle = 'rgba(200,190,175,0.6)';
    ctx.textAlign = 'right';
    ctx.fillText(floor.name || '', W - 6, H - 3);

    ctx.restore();
  }

  function attach(container) {
    requestAnimationFrame(() => {
      container.querySelectorAll('.map-preview-container[data-map-key]').forEach(el => {
        const key = el.dataset.mapKey;
        const map = findMapByKey(key);
        if (!map || el.querySelector('canvas')) return;

        const dpr  = window.devicePixelRatio || 1;
        const w    = el.offsetWidth || 312;
        const h    = 130;

        const canvas = document.createElement('canvas');
        canvas.width  = w * dpr;  canvas.height = h * dpr;
        canvas.style.width  = w + 'px';
        canvas.style.height = h + 'px';
        canvas.style.cursor = 'pointer';
        canvas.title        = `Open in Map Builder: ${map.name}`;

        const floor = map.floors.reduce((best, fl) =>
          Object.keys(fl.cells).length > Object.keys(best.cells).length ? fl : best,
          map.floors[0]
        );

        renderPreviewCanvas(canvas, floor, map.name, dpr);
        el.appendChild(canvas);

        canvas.addEventListener('click', e => {
          e.stopPropagation();
          setActiveMap(map.id);
          window.location.hash = 'map-builder';
        });
      });
    });
  }

  /* ════════════════════════════════════════════
     UI — BUILD
  ════════════════════════════════════════════ */

  function render(container) {
    _container = container;
    if (_ro) { _ro.disconnect(); _ro = null; }
    load();
    _zoom = 1.0; _panX = 40; _panY = 40; _floor = 0;
    buildUI(container);
    requestAnimationFrame(() => { resizeCanvas(); fitToView(); });
  }

  function rebuildAll() {
    if (!_container) return;
    if (_ro) { _ro.disconnect(); _ro = null; }
    buildUI(_container);
    requestAnimationFrame(() => { resizeCanvas(); fitToView(); });
  }

  function buildUI(container) {
    container.innerHTML = '';
    const m = activeMap();

    /* ── Toolbar ── */
    const toolbar = document.createElement('div');
    toolbar.className = 'mb-toolbar';

    /* ─ Group: Map select ─ */
    const mapGroup = document.createElement('div');
    mapGroup.className = 'mb-group';

    const sel = document.createElement('select');
    sel.className = 'mb-select'; sel.title = 'Active map';
    Object.values(_maps).forEach(mp => {
      const opt = document.createElement('option');
      opt.value = mp.id; opt.selected = mp.id === _active; opt.textContent = mp.name;
      sel.appendChild(opt);
    });

    const btnNew    = mkBtn('+ Map',  'mb-btn');
    const btnRename = mkBtn('Rename', 'mb-btn');
    mapGroup.append(sel, btnNew, btnRename);
    toolbar.append(mapGroup, mkDivider());

    /* ─ Group: Draw mode + context controls ─ */
    const drawModeGroup = document.createElement('div');
    drawModeGroup.className = 'mb-group';
    const btnSingle = mkBtn('⬜ Single', `mb-btn mb-drawmode-btn${_drawMode === 'single' ? ' mb-tool-active' : ''}`);
    btnSingle.dataset.mode = 'single';
    const btnSelect = mkBtn('⬔ Select', `mb-btn mb-drawmode-btn${_drawMode === 'select' ? ' mb-tool-active' : ''}`);
    btnSelect.dataset.mode = 'select';
    drawModeGroup.append(btnSingle, btnSelect);

    /* Brush size — only shown in single mode */
    const brushGroup = document.createElement('div');
    brushGroup.id        = 'mb-brush-group';
    brushGroup.className = 'mb-group';
    brushGroup.style.display = _drawMode === 'single' ? '' : 'none';
    const btnBrushDec = mkBtn('−', 'mb-zoom-btn');
    const brushLabel  = Object.assign(document.createElement('span'), {
      className: 'mb-zoom-pct', id: 'mb-brush-size',
      textContent: _brushSize + '×',
    });
    const btnBrushInc = mkBtn('+', 'mb-zoom-btn');
    brushGroup.append(btnBrushDec, brushLabel, btnBrushInc);

    /* Add / Move toggle — only shown in select mode */
    const selModeGroup = document.createElement('div');
    selModeGroup.id        = 'mb-selmode-group';
    selModeGroup.className = 'mb-group';
    selModeGroup.style.display = _drawMode === 'select' ? '' : 'none';
    const btnAdd  = mkBtn('Add',  `mb-btn mb-selmode-btn${_selMode === 'add'  ? ' mb-tool-active' : ''}`);
    btnAdd.dataset.selmode = 'add';
    const btnMove = mkBtn('Move', `mb-btn mb-selmode-btn${_selMode === 'move' ? ' mb-tool-active' : ''}`);
    btnMove.dataset.selmode = 'move';
    selModeGroup.append(btnAdd, btnMove);

    toolbar.append(drawModeGroup, brushGroup, selModeGroup, mkDivider());

    /* ── Helper: build a labelled tool sub-group ── */
    const mkToolGroup = (catLabel, tools) => {
      const grp = document.createElement('div');
      grp.className = 'mb-group';
      const lbl = Object.assign(document.createElement('span'), {
        className: 'mb-cat-label', textContent: catLabel,
      });
      grp.appendChild(lbl);
      tools.forEach(({ tool, label }) => {
        const btn = mkBtn(label, `mb-btn mb-tool-btn${_tool === tool ? ' mb-tool-active' : ''}`);
        btn.dataset.tool = tool;
        if (TILES[tool]) btn.style.setProperty('--tile-color', TILES[tool].color);
        grp.appendChild(btn);
      });
      return grp;
    };

    /* ─ Row 1: Tile tools in semantic groups ─ */
    toolbar.append(
      mkToolGroup('Walls', [
        { tool: 'wall',         label: 'Wall'      },
        { tool: 'autowall',     label: 'Auto'      },
        { tool: 'thinwall',     label: 'Thin'      },
        { tool: 'autothinwall', label: 'Auto Thin' },
      ]),
      mkDivider(),
      mkToolGroup('Floors', [
        { tool: 'stone',  label: 'Stone'  },
        { tool: 'cave',   label: 'Cave'   },
        { tool: 'grass',  label: 'Grass'  },
        { tool: 'dirt',   label: 'Dirt'   },
        { tool: 'sand',   label: 'Sand'   },
        { tool: 'wood',   label: 'Wood'   },
        { tool: 'carpet', label: 'Carpet' },
      ]),
      mkDivider(),
      mkToolGroup('Objects', [
        { tool: 'door',       label: 'Door'    },
        { tool: 'stairs',     label: 'Stairs ↑'},
        { tool: 'stairsdown', label: 'Stairs ↓'},
        { tool: 'table',      label: 'Table'   },
        { tool: 'barrel',     label: 'Barrel'  },
        { tool: 'water',      label: 'Water'   },
      ]),
      mkDivider(),
      mkToolGroup('Markers', [
        { tool: 'poi2',    label: 'Enemy'   },
        { tool: 'poi4',    label: 'Player'  },
        { tool: 'poi3',    label: 'Hazard'  },
        { tool: 'special', label: 'Special' },
        { tool: 'label',   label: 'Label'   },
      ]),
      mkDivider(),
      mkToolGroup('Erase', [
        { tool: 'erase',      label: 'All'    },
        { tool: 'erasewall',  label: 'Walls'  },
        { tool: 'eraselabel', label: 'Labels' },
      ]),
    );

    /* ── Forced row break ── */
    const rowBreak = document.createElement('div');
    rowBreak.className = 'mb-toolbar-break';
    toolbar.appendChild(rowBreak);

    /* ─ Row 2: File / Export / Canvas / Grid / Zoom ─ */

    /* File I/O */
    const fileGroup = document.createElement('div');
    fileGroup.className = 'mb-group';
    const btnExport = mkBtn('Export JSON', 'mb-btn');
    const btnImport = mkBtn('Import JSON', 'mb-btn');
    const btnAscii  = mkBtn('Import ASCII', 'mb-btn mb-btn-ascii');
    fileGroup.append(btnExport, btnImport, btnAscii);
    toolbar.append(fileGroup, mkDivider());

    /* Export formats */
    const exportGroup = document.createElement('div');
    exportGroup.className = 'mb-group';
    const btnJPEG    = mkBtn('Save JPEG',  'mb-btn mb-btn-jpeg');
    const btnFoundry = mkBtn('→ Foundry',  'mb-btn mb-btn-foundry');
    const btnLink    = mkBtn('', 'mb-btn');
    btnLink.id = 'mb-link-btn';
    updateLinkBtnEl(btnLink, m);
    exportGroup.append(btnJPEG, btnFoundry, btnLink);
    toolbar.append(exportGroup, mkDivider());

    /* Canvas ops */
    const canvasGroup = document.createElement('div');
    canvasGroup.className = 'mb-group';
    const btnClear   = mkBtn('Clear Floor', 'mb-btn mb-btn-danger');
    const btnShadows = mkBtn('Shadows', 'mb-btn mb-btn-toggle' + (_shadows ? ' active' : ''));
    btnShadows.title = 'Toggle wall drop-shadows';
    canvasGroup.append(btnClear, btnShadows);
    toolbar.append(canvasGroup, mkDivider());

    /* Grid size */
    const gridGroup = document.createElement('div');
    gridGroup.className = 'mb-group';
    const gridLabel  = Object.assign(document.createElement('span'), { className: 'mb-grid-label', textContent: 'Grid' });
    const gridWInput = Object.assign(document.createElement('input'), {
      type: 'number', className: 'mb-grid-input', id: 'mb-grid-w',
      value: gW(), min: '10', max: '500', title: 'Grid width',
    });
    const gridXSpan  = Object.assign(document.createElement('span'), { className: 'mb-grid-label', textContent: '×' });
    const gridHInput = Object.assign(document.createElement('input'), {
      type: 'number', className: 'mb-grid-input', id: 'mb-grid-h',
      value: gH(), min: '10', max: '500', title: 'Grid height',
    });
    const btnApplyGrid = mkBtn('Apply', 'mb-btn');
    gridGroup.append(gridLabel, gridWInput, gridXSpan, gridHInput, btnApplyGrid);
    toolbar.append(gridGroup, mkDivider());

    /* Zoom */
    const zoomGroup  = document.createElement('div');
    zoomGroup.className = 'mb-group';
    const btnZoomOut = mkBtn('−', 'mb-zoom-btn');
    const zoomLabel  = Object.assign(document.createElement('span'), {
      className: 'mb-zoom-pct', id: 'mb-zoom-pct',
      textContent: Math.round(_zoom * 100) + '%',
    });
    const btnZoomIn  = mkBtn('+', 'mb-zoom-btn');
    const btnFit     = mkBtn('Fit', 'mb-btn');
    const hint       = Object.assign(document.createElement('span'), {
      className:   'mb-hint',
      textContent: 'Right-drag pan · Scroll zoom · Esc clear selection · Dbl-click floor to rename',
    });
    zoomGroup.append(btnZoomOut, zoomLabel, btnZoomIn, btnFit);
    toolbar.append(zoomGroup, hint);
    container.appendChild(toolbar);

    /* ── Floor bar ── */
    const floorBar = document.createElement('div');
    floorBar.id = 'mb-floor-bar'; floorBar.className = 'mb-floor-bar';
    container.appendChild(floorBar);

    /* ── Viewport + canvas ── */
    const vpWrap = document.createElement('div');
    vpWrap.className = 'mb-viewport-wrap';
    const viewport = document.createElement('div');
    viewport.className = 'mb-viewport';
    _canvas = document.createElement('canvas');
    _canvas.className    = 'mb-canvas';
    _canvas.style.cursor = getCursor();
    viewport.appendChild(_canvas);
    vpWrap.appendChild(viewport);
    container.appendChild(vpWrap);

    _ctx = _canvas.getContext('2d');
    initInput();
    rebuildFloorBar();

    _ro = new ResizeObserver(resizeCanvas);
    _ro.observe(viewport);

    /* ── Keyboard handler (Escape) ── */
    if (_keyHandler) document.removeEventListener('keydown', _keyHandler);
    _keyHandler = e => {
      if (e.key !== 'Escape') return;
      const fl = activeFloor();
      if (_selDragging) cancelSelectionMove(fl);
      _selection = null; _selStart = null;
      draw();
    };
    document.addEventListener('keydown', _keyHandler);

    /* ── Wire up events ── */
    sel.addEventListener('change', () => selectMap(sel.value));

    btnNew.addEventListener('click', () => {
      const name = prompt('Map name:', 'New Map');
      if (!name?.trim()) return;
      const m2 = newMap(name.trim());
      _maps[m2.id] = m2; _active = m2.id; _floor = 0;
      save(); rebuildAll();
    });

    btnRename.addEventListener('click', () => {
      const m2   = activeMap();
      const name = prompt('Rename map:', m2.name);
      if (!name?.trim() || name.trim() === m2.name) return;
      m2.name = name.trim(); save();
      sel.querySelector(`[value="${m2.id}"]`).textContent = m2.name;
    });

    /* Draw mode */
    [btnSingle, btnSelect].forEach(btn => {
      btn.addEventListener('click', () => {
        _drawMode = btn.dataset.mode;
        document.querySelectorAll('.mb-drawmode-btn').forEach(b =>
          b.classList.toggle('mb-tool-active', b.dataset.mode === _drawMode)
        );
        document.getElementById('mb-brush-group').style.display   = _drawMode === 'single' ? '' : 'none';
        document.getElementById('mb-selmode-group').style.display  = _drawMode === 'select' ? '' : 'none';
        if (_drawMode !== 'select') { _selection = null; }
        if (_canvas) _canvas.style.cursor = getCursor();
        draw();
      });
    });

    /* Brush size */
    btnBrushDec.addEventListener('click', () => {
      _brushSize = Math.max(1, _brushSize - 2);
      document.getElementById('mb-brush-size').textContent = _brushSize + '×';
    });
    btnBrushInc.addEventListener('click', () => {
      _brushSize = Math.min(9, _brushSize + 2);
      document.getElementById('mb-brush-size').textContent = _brushSize + '×';
    });

    /* Select sub-mode */
    [btnAdd, btnMove].forEach(btn => {
      btn.addEventListener('click', () => {
        _selMode = btn.dataset.selmode;
        document.querySelectorAll('.mb-selmode-btn').forEach(b =>
          b.classList.toggle('mb-tool-active', b.dataset.selmode === _selMode)
        );
        /* Switching to Add clears any pending selection */
        if (_selMode === 'add') { _selection = null; draw(); }
      });
    });

    /* Tools */
    toolbar.querySelectorAll('.mb-tool-btn').forEach(btn => {
      btn.addEventListener('click', () => setTool(btn.dataset.tool));
    });


    /* File */
    btnExport  .addEventListener('click', exportMap);
    btnImport  .addEventListener('click', importMap);
    btnAscii   .addEventListener('click', importASCII);
    btnJPEG    .addEventListener('click', exportJPEG);
    btnFoundry .addEventListener('click', exportFoundry);
    btnLink    .addEventListener('click', openLinkModal);

    btnClear.addEventListener('click', () => {
      const fl = activeFloor();
      if (!fl || !confirm('Clear all tiles on this floor?')) return;
      fl.cells = {}; fl.labels = {};
      save(); draw();
    });

    btnShadows.addEventListener('click', () => {
      _shadows = !_shadows;
      btnShadows.classList.toggle('active', _shadows);
      draw();
    });

    /* Grid size */
    btnApplyGrid.addEventListener('click', () => {
      const m2 = activeMap();
      const w  = Math.max(10, Math.min(500, parseInt(gridWInput.value) || DEFAULT_GRID_W));
      const h  = Math.max(10, Math.min(500, parseInt(gridHInput.value) || DEFAULT_GRID_H));
      m2.gridW = w; m2.gridH = h;
      save(); draw();
    });

    /* Zoom */
    btnZoomOut.addEventListener('click', () => { _zoom = Math.max(MIN_ZOOM, _zoom * 0.8);  draw(); updateZoomLabel(); });
    btnZoomIn .addEventListener('click', () => { _zoom = Math.min(MAX_ZOOM, _zoom * 1.25); draw(); updateZoomLabel(); });
    btnFit    .addEventListener('click', fitToView);
  }

  function updateLinkBtnEl(btn, m) {
    const name = resolveLinkedName(m);
    btn.textContent = name ? `🔗 ${name}` : 'Link Location';
    btn.title       = name ? `Linked to: ${name}. Click to change.` : 'Link this map to a location card';
  }

  function rebuildFloorBar() {
    const bar = document.getElementById('mb-floor-bar');
    if (!bar) return;
    const m = activeMap();
    if (!m) return;
    bar.innerHTML = '';

    m.floors.forEach((fl, i) => {
      const btn = document.createElement('button');
      btn.className   = `mb-floor-tab${i === _floor ? ' active' : ''}`;
      btn.textContent = fl.name;
      btn.addEventListener('click',    () => selectFloor(i));
      btn.addEventListener('dblclick', e => {
        e.preventDefault();
        const name = prompt('Floor name:', fl.name);
        if (!name?.trim() || name.trim() === fl.name) return;
        fl.name = name.trim(); save(); rebuildFloorBar();
      });
      bar.appendChild(btn);
    });

    const addBtn = document.createElement('button');
    addBtn.className   = 'mb-floor-add';
    addBtn.textContent = '+ Floor';
    addBtn.addEventListener('click', () => {
      const m2   = activeMap();
      const name = prompt('New floor name:', `Floor ${m2.floors.length + 1}`);
      if (!name?.trim()) return;
      m2.floors.push(newFloor(name.trim()));
      _floor = m2.floors.length - 1;
      save(); rebuildFloorBar(); draw();
    });
    bar.appendChild(addBtn);
  }

  /* ── DOM helpers ── */
  function mkBtn(text, cls) {
    return Object.assign(document.createElement('button'), { className: cls, textContent: text });
  }

  function mkDivider() {
    return Object.assign(document.createElement('div'), { className: 'mb-divider' });
  }

  return { render, attach, setActiveMap };

})();
