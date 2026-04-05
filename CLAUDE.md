# Endale — Claude Context

Campaign wiki for **Endale**, a Daggerheart TTRPG campaign.
Pure HTML/CSS/JS — no build tools, no framework. Works as a local file or on GitHub Pages.

## File structure

```
index.html                        ← app shell (nav + content area)
css/
  main.css                        ← layout, sidebar, nav
  cards.css                       ← card component styles
js/
  app.js                          ← routing, nav, page registry
  cards.js                        ← card/roster/reference renderer
data/
  characters/
    player-characters.js          ← Nora, Eweram, Sable
    key-individuals.js            ← Ossian, Fenlow, Jhon, Tooth, Mortimer, Endless One
    lionguard.js                  ← Pipkin, Greymane, Kip, Aldous + guard roster
    applecrumb-faction.js         ← Biggus, Rina, Drew, Nessa + Berry/Clide roster
    ratkin.js                     ← Scratchen, Voss, Netch + skirmisher roster
    fonn-civilians.js             ← Featherhides, Applecrumb family, Fonn townsfolk
  locations/
    fonn.js                       ← Fonn, Tower, Veiled Forest, Crow's Nest, Mansion
  story/
    threads.js                    ← Active/mid-term/slow-burn story threads
  sessions/
    log.js                        ← Session 1–8 recap
  world/
    overview.js                   ← Continents, history, lore, staff, compact, curse
  lore/
    items.js                      ← Items of note (staff, letter, cane, key, etc.)
  rules/
    dm-cheatsheet.js              ← Daggerheart combat reference
```

**IMPORTANT: Data scripts must be loaded AFTER js/app.js in index.html.**
Scripts are executed in order; data files call `Endale.registerPage()` which requires
`Endale` to be defined first.

## How pages work

Each data file calls `Endale.registerPage(id, data)`. The id is also the URL hash
(e.g. `characters/fonn-civilians` → `index.html#characters/fonn-civilians`).

To add a new page:
1. Create `data/<section>/<name>.js` with the data object
2. Add a `<script src="...">` tag in index.html
3. Add the page to the NAV array in `js/app.js`

## Data schema

Three group types per page:

**cards** — individual collapsible cards (characters with full detail):
```js
{ type: 'cards', headerClass: 'h-feather', entries: [
  { name, role, rank: [line1, line2], fields: [{label, value}],
    gmNote, quote, tags: [{label, cls}] }
]}
```

**roster** — wide table card (family groups, commoner lists):
```js
{ type: 'roster', title, role, rank: [line1, line2], headerClass,
  sections: [{ heading, columns: [], rows: [
    { name, badge: {label, cls}, cells: [] }
  ]}]
}
```

**reference** — wide card with always-visible sections; for cheatsheets and rule tables:
```js
{ type: 'reference', title, role, headerClass,
  sections: [
    // Table section
    { heading, kind: 'table', columns: [], rows: [['cell', 'cell'], ...] },
    // Key-value pairs section
    { heading, kind: 'pairs', rows: [{ label, value }, ...] },
    // Plain text section
    { heading, kind: 'note', body: '' }
  ]
}
```

## Header colour classes
h-feather, h-apple, h-hostile, h-town, h-guard, h-faction, h-neutral

## Tag colour classes
tag-green, tag-blue, tag-red, tag-gold, tag-purple, tag-mid, tag-light, tag-dark

## Badge classes
badge-friendly, badge-hostile, badge-neutral, badge-unknown

## To preview locally
Open index.html directly in a browser — no server needed.

## To publish
Push to GitHub, enable GitHub Pages on the repo root.
