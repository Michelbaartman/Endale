/* ═══════════════════════════════════════════════
   ENDALE — Card renderer
   Converts page data objects into HTML strings.
   ═══════════════════════════════════════════════ */

const Cards = (() => {

  /* ── Shared helpers ── */

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function personIcon() {
    return `<svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="14" r="9" stroke="#aaa" stroke-width="1.5"/>
      <path d="M6 38c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#aaa" stroke-width="1.5"/>
    </svg>`;
  }

  /* ── Individual collapsible card ── */

  function renderCard(entry, headerClass) {
    const fields = entry.fields.map(f =>
      `<div class="field">
        <div class="field-label">${esc(f.label)}</div>
        <div class="field-value">${esc(f.value)}</div>
      </div>`
    ).join('');

    const gmNote = entry.gmNote
      ? `<div class="gm-note">
          <div class="gm-note-label">GM Note</div>
          <span class="gm-note-text">${esc(entry.gmNote)}</span>
        </div>`
      : '';

    const quote = entry.quote
      ? `<div class="quote">${esc(entry.quote)}</div>`
      : '';

    const tags = (entry.tags && entry.tags.length)
      ? `<div class="tags">${entry.tags.map(t =>
          `<span class="tag ${esc(t.cls)}">${esc(t.label)}</span>`
        ).join('')}</div>`
      : '';

    const rank = entry.rank.map(esc).join('<br>');

    /* Build data-delete-* attributes so app.js can attach the delete button */
    let delAttrs = '';
    if (entry._deleteInfo) {
      const d = entry._deleteInfo;
      if (d.type === 'original') {
        delAttrs = ` data-delete-type="original" data-delete-key="${esc(d.key)}"`;
      } else {
        delAttrs = ` data-delete-type="addition" data-delete-tid="${esc(d.targetPageId)}" data-delete-aid="${esc(d.additionId)}"`;
      }
    }

    return `
      <div class="card medium collapsible"${delAttrs}>
        <div class="card-header ${esc(headerClass)}">
          <div>
            <div class="card-name">${esc(entry.name)}</div>
            <div class="card-role">${esc(entry.role)}</div>
          </div>
          <div class="card-rank">${rank}</div>
        </div>
        <div class="picture-box"${entry._imgKey ? ` data-img-key="${esc(entry._imgKey)}" data-card-name="${esc(entry._imgName || entry.name)}"` : ''}>
          ${personIcon()}
          <span class="picture-label">Illustration</span>
        </div>
        <div class="card-body">
          ${fields}
          ${gmNote}
          ${quote}
          ${tags}
        </div>
      </div>`;
  }

  /* ── Roster table card ── */

  function renderRoster(group) {
    const sections = group.sections.map(section => {
      const cols = section.columns;

      const headerRow = cols.map(c => `<th>${esc(c)}</th>`).join('');

      const bodyRows = section.rows.map(row => {
        const badge = row.badge
          ? `<span class="side-badge ${esc(row.badge.cls)}">${esc(row.badge.label)}</span>`
          : '';

        // First cell is always name + badge, rest mapped to col classes
        const colClasses = ['col-species', 'col-text', 'col-hook'];
        const extraCells = row.cells.map((cell, i) =>
          `<td class="${colClasses[i] || 'col-text'}">${esc(cell)}</td>`
        ).join('');

        return `<tr>
          <td class="col-name">${esc(row.name)}${badge}</td>
          ${extraCells}
        </tr>`;
      }).join('');

      return `
        <div class="roster-section">
          <div class="section-head">${esc(section.heading)}</div>
          <table class="roster">
            <thead><tr><th>${esc(cols[0])}</th>${cols.slice(1).map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>
            <tbody>${bodyRows}</tbody>
          </table>
        </div>`;
    }).join('');

    const rank = group.rank.map(esc).join('<br>');

    return `
      <div class="card wide roster-card">
        <div class="card-header ${esc(group.headerClass)}">
          <div>
            <div class="card-name">${esc(group.title)}</div>
            <div class="card-role">${esc(group.role)}</div>
          </div>
          <div class="card-rank">${rank}</div>
        </div>
        <div class="card-body">
          ${sections}
        </div>
      </div>`;
  }

  /* ── Reference card (cheatsheet tables) ── */

  function renderReference(group) {
    const sections = group.sections.map(section => {
      let content = '';

      if (section.kind === 'table') {
        const bodyRows = section.rows.map(row =>
          `<tr>${row.map((cell, i) =>
            `<td class="${i === 0 ? 'ref-key' : 'ref-val'}">${esc(cell)}</td>`
          ).join('')}</tr>`
        ).join('');
        const headCells = section.columns.map(c => `<th>${esc(c)}</th>`).join('');
        content = `<table class="ref-table"><thead><tr>${headCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
      } else if (section.kind === 'pairs') {
        content = `<div class="ref-pairs">${section.rows.map(r =>
          `<div class="ref-pair">
            <span class="ref-pair-label">${esc(r.label)}</span>
            <span class="ref-pair-value">${esc(r.value)}</span>
          </div>`
        ).join('')}</div>`;
      } else if (section.kind === 'note') {
        content = `<p class="ref-note">${esc(section.body)}</p>`;
      }

      return `<div class="ref-section">
        <div class="section-head">${esc(section.heading)}</div>
        ${content}
      </div>`;
    }).join('');

    return `
      <div class="card wide ref-card">
        <div class="card-header ${esc(group.headerClass)}">
          <div>
            <div class="card-name">${esc(group.title)}</div>
            <div class="card-role">${esc(group.role || '')}</div>
          </div>
        </div>
        <div class="card-body">
          ${sections}
        </div>
      </div>`;
  }

  /* ── Page renderer ── */

  function renderPage(pageData, container) {
    let html = '<div class="card-grid">';

    for (const group of pageData.groups) {
      if (group.type === 'cards') {
        for (const entry of group.entries) {
          if (entry._hidden) continue;
          html += renderCard(entry, group.headerClass);
        }
      } else if (group.type === 'roster') {
        html += renderRoster(group);
      } else if (group.type === 'reference') {
        html += renderReference(group);
      }
    }

    html += '</div>';
    container.innerHTML = html;
    attachToggle(container);
  }

  /* ── Expand / collapse ── */

  function attachToggle(root) {
    root.querySelectorAll('.card.collapsible').forEach(card => {
      const clickTargets = card.querySelectorAll('.card-header, .picture-box');
      clickTargets.forEach(el => {
        el.addEventListener('click', e => {
          e.stopPropagation();
          card.classList.toggle('open');
        });
      });
    });
  }

  return { renderPage, renderCardHTML: renderCard, renderRosterHTML: renderRoster, renderReferenceHTML: renderReference };

})();
