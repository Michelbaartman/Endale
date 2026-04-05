# ENDALE BATTLE MAP — ASCII SPEC
## Cross-Communication Buffer · Claude Web ↔ Claude Code
### Version 1.0

---

## PURPOSE

This document defines the shared language between:
- **Claude Web** (claude.ai) — thinks up encounters, generates ASCII map layouts
- **Claude Code** — receives those layouts and renders them in the tile-based map builder

Claude Web follows this spec when generating maps.
Claude Code follows this spec when parsing and rendering them.
Neither end improvises. The spec is the contract.

---

## CORE PRINCIPLES

1. **One character = one tile.** Every character maps to exactly one tile. No exceptions.
2. **Fixed-width grid.** The ASCII is monospaced. Every row must be the same width. Pad short rows with `.` (stone floor) on the right.
3. **Top-left origin.** Row 0 is the top. Column 0 is the left edge.
4. **Map data is fenced.** The grid always lives inside a ` ```map ` block. Metadata lives outside it.
5. **Thin walls are separate.** Because the app distinguishes between full-tile walls and edge lines (thinwall), wall edges are declared in a WALLS block — not embedded in the grid. See section on thin walls below.
6. **Unknown symbol = stone floor.** If Claude Code encounters an unrecognised symbol it renders `.` and logs a warning. It never crashes.

---

## SYMBOL TABLE

Symbols map directly to the tool names visible in the mapbuilder CSS (`data-tool` attributes). Claude Code should use these tool names to look up the renderer's own tile drawing function.

### Floor tiles (passable)

| Symbol | Tool name | Visual | Notes |
|--------|-----------|--------|-------|
| `.` | `stone` | Warm stone `#c8bda8` | Default interior floor |
| `v` | `cave` | Dark stone `#7a7060` | Rough cave ground |
| `,` | `grass` | Green `#3a6030` | Default exterior ground |
| `d` | `dirt` | Brown `#9a7250` | Path, earthen floor |
| `_` | `sand` | Tan `#c8a860` | Beach, desert, pit floor |
| `w` | `wood` | Warm brown `#a87040` | Wooden floor, dock planks |
| `c` | `carpet` | Deep purple-red `#6a3858` | Interior luxury, throne room |

### Walls & impassable (full tile)

| Symbol | Tool name | Visual | Notes |
|--------|-----------|--------|-------|
| `#` | `autowall` | Dark stone `#3c3830` | Standard wall. Auto-connects to adjacent `#` tiles. |
| `%` | `cave` + impassable flag | Rock `#7a7060` | Natural boulder/rock face. Use for caves and outdoors. |
| `^` | POI marker (tree) | See POI section | Single tree. Blocks LOS. Partial cover. |
| `T` | POI marker (dense tree) | See POI section | Dense canopy. Full cover. Impassable. |
| `M` | `autowall` + cliff flag | Dark `#3a3028` | Cliff face / mountain wall. Same render as wall, different metadata. |

### Thin walls (edge lines between tiles)

Thin walls (`thinwall` / `autothinwall`) are **not placed in the grid**. They sit on the *edge* between two tiles. They are declared in a separate `WALLS` block after the metadata.

Format:
```
WALLS:
  [row],[col],[edge] = [wall-type]
```

Where `[edge]` is one of: `N` (north), `S` (south), `E` (east), `W` (west).
`[wall-type]` is either `thin` or `auto` (auto-connects to adjacent thin walls).

Example:
```
WALLS:
  2,3,S = thin       ← thin wall on the south edge of tile at row 2, col 3
  2,4,S = thin
  2,5,S = thin
```

This draws a horizontal line of thin wall beneath a row of tiles — like a low interior partition, fence line, or chute edge.

Claude Web uses this for:
- Interior room dividers that don't block LOS fully
- Fences and low walls outdoors
- Chute edges, counter tops, bar fronts

### Doors & passages

| Symbol | Tile behaviour | Notes |
|--------|---------------|-------|
| `+` | Door, closed | Placed on a wall tile or thin wall edge. Blocks LOS. |
| `/` | Door, open | Passable. Does not block LOS. |
| `X` | Hatch / trapdoor | Rendered as floor tile with hatch marker overlay. |
| `S` | `stairsdown` | Staircase tile. Elevation change marker. |
| `s` | Stairs up | Same tile, opposite direction arrow. |

### Furniture & objects

| Symbol | Tool name | Notes |
|--------|-----------|-------|
| `O` | `table` | Large object. Blocks movement. Can be vaulted. |
| `o` | Small object | Barrel, crate. Difficult terrain. Partial cover. |
| `\|` | Column/pillar | Renders as narrow wall tile. Partial cover. |
| `@` | Container | Chest or interactable. Highlight border. |
| `&` | Altar/shrine | Special interactable. Purple tint from `poi4`. |
| `$` | Light source | Campfire, torch sconce. Glow radius 2 tiles optional. |

### POI markers (points of interest)

The app has POI tools: `poi2` (red), `poi3` (green), `poi4` (blue). Use these for enemies, players, and hazards.

| Symbol | POI colour | Use for |
|--------|-----------|---------|
| `1`–`9` | `poi2` red `#702020` | Enemy spawn positions |
| `A`–`F` | `poi4` blue `#1a3a6a` | Player / PC start positions |
| `!` | `poi3` green `#1e5028` | Hazard or environmental trigger |
| `?` | No POI — fog tile | Hidden or unrevealed area |

Numbers and letters render as the POI colour tile with the character as a label overlay (using the `label` tool).

### Direction overlays

| Symbol | Behaviour |
|--------|-----------|
| `>` | Arrow overlay pointing right. Rendered on top of the floor tile below it. |
| `<` | Arrow overlay pointing left. |
| `∧` | Arrow overlay pointing up. (Use capital V if ASCII limited: `V` pointing down) |

---

## FULL MAP BLOCK FORMAT

Claude Web always delivers a map in this structure, in this order:

~~~
```map
[ASCII GRID]
```

MAP: [Descriptive name]
SIZE: [cols]x[rows]
TYPE: [interior | exterior | mixed]
LIGHTING: [bright | dim | dark | mixed]
SCALE: [1 tile = 5ft]
FLOORS: [1 | 2 | 3] — number of elevation levels if multi-floor

LEGEND:
  [symbol] = [name] — [extra notes if needed]

WALLS:
  [row],[col],[edge] = [thin | auto]

ENEMIES:
  1 = [Name] · [HP] / [Armor] / [Atk] — [role or tactic note]
  2 = [Name] · [HP] / [Armor] / [Atk] — [role or tactic note]

PLAYERS:
  A = [PC name or "any"]
  B = [PC name or "any"]
  C = [PC name or "any"]

HAZARDS:
  ! = [Name] — [effect on entry or trigger condition]

FEAR MOVES:
  [cost] = [what happens, tied to map geometry]

NOTES:
  [Free text for the GM. Encounter flavour, terrain interactions,
   things Claude Code does not need to parse but the GM should know
   before running this scene.]
~~~

Only include sections that apply. A simple outdoor skirmish with no hazards, no thin walls and no multi-floor skips those sections entirely.

---

## MULTI-FLOOR MAPS

When a map has multiple floors (like Biggus's mansion), Claude Web produces one grid per floor, each in its own ` ```map ` fence, labelled clearly:

~~~
FLOOR: 1 — Ground floor
```map
[grid]
```

FLOOR: 2 — First floor
```map
[grid]
```
~~~

Staircase connections between floors are noted in NOTES as:
```
NOTES:
  S at (row 4, col 7) on Floor 1 connects to s at (row 4, col 7) on Floor 2.
```

---

## PARSING RULES (for Claude Code)

```
1.  Find the ```map fence.
2.  Extract everything between opening and closing fence as a raw string.
3.  Split by newline → rows array.
4.  Find the longest row → this is gridWidth.
5.  Pad all shorter rows with '.' on the right to match gridWidth.
6.  Build a 2D array: grid[row][col] = symbol.
7.  For each cell:
      a. Look up symbol in the symbol table above.
      b. Get the tool name.
      c. Call the renderer's tile draw function for that tool at (col, row).
8.  After grid is drawn, parse the WALLS block:
      a. For each line: extract row, col, edge, type.
      b. Call the renderer's thinwall draw function at that tile edge.
9.  After walls, parse POI markers (1–9, A–F, !):
      a. Draw the base floor tile first.
      b. Overlay the POI colour.
      c. Overlay the label character using the label tool.
10. Unknown symbol → draw '.' stone tile, log: WARN unknown symbol '[x]' at (row,col).
11. Parse ENEMIES, PLAYERS, HAZARDS into a sidebar data object
    (not rendered on canvas — displayed as encounter panel alongside map).
12. Parse FEAR MOVES and NOTES into GM notes panel.
```

---

## ENCOUNTER PANEL (sidebar data)

Claude Code should render a collapsible sidebar panel alongside the map canvas that displays:

- **Map name + type + lighting**
- **Enemies list** — name, stats, tactic note
- **Players list** — PC positions
- **Hazards** — trigger and effect
- **Fear Moves** — cost and description
- **GM Notes** — free text, styled like the wiki's `.gm-note` block

This panel uses the same visual style as the rest of the Endale app (Georgia serif, parchment tones, `var(--bg-card)` background, `var(--border-card)` borders).

---

## EXAMPLE MAP — Biggus's Cellar

This is a worked example showing how Claude Web would produce a map for the current campaign encounter.

~~~
```map
#########################################
#...o............................o...X..#
#.......................................#
#...[TC-A]......#####...[TC-B]..........#
#...1111........#...#...2222............#
#...1111........#...#...2222............#
#...............#...#...................#
#.......................................#
#..o....................................#
#########################################
```

MAP: Biggus's Cellar — Trance Chambers
SIZE: 41x10
TYPE: interior
LIGHTING: dim
SCALE: 1 tile = 5ft
FLOORS: 1

LEGEND:
  [TC-A] = Trance Chamber A — label only, not a tile symbol
  [TC-B] = Trance Chamber B — label only, not a tile symbol
  X      = Hatch / chute upward — connects to Chute Room on Ground Floor
  o      = Barrel / supply crate
  #####  = Interior dividing wall (autowall)

WALLS:
  3,3,N = thin
  3,3,S = thin
  3,3,E = thin
  3,3,W = thin

ENEMIES:
  1 = Ratkin Skirmisher · HP 3 / Armor 1 / Atk +1 — Dart & Back, never stands still
  2 = Ratkin Skirmisher · HP 3 / Armor 1 / Atk +1 — Pack Flankers with group 1

PLAYERS:
  A = Any PC (enters via X hatch from above)
  B = Any PC
  C = Any PC

HAZARDS:
  ! = None this floor

FEAR MOVES:
  1 = Skirmisher smashes a crate — difficult terrain spreads 2 tiles from o marker
  2 = Lights go out — one skirmisher tips a lamp. All PC attacks at disadvantage until light restored.
  3 = Skirmisher bolts up the hatch (X) — escapes to ground floor, warns Voss

NOTES:
  The trance chamber labels [TC-A] and [TC-B] should be rendered as floating
  text labels using the label tool, centred in the relevant room sections.
  The dividing wall (##### row 3) separates the two chambers — it is a full
  autowall, not a thin wall.
  Lolo Applecrumb is in TC-B, leftmost position. She is not a combat token
  but should be noted in the GM panel.
  The hatch (X) at top-right connects upward to the Chute Room on Ground Floor.
  The tunnel leading to the outside chute entrance runs off the left edge of
  this map — extend with a corridor if needed.
~~~

---

## STYLE REFERENCE (for Claude Code rendering)

Pull tile colours from the mapbuilder CSS `::before` backgrounds:

| Tool | Hex |
|------|-----|
| `stone` | `#c8bda8` |
| `cave` | `#7a7060` |
| `grass` | `#3a6030` |
| `dirt` | `#9a7250` |
| `sand` | `#c8a860` |
| `wood` | `#a87040` |
| `carpet` | `#6a3858` |
| `autowall` | `#3c3830` |
| `autothinwall` | `#1e1c18` |
| `thinwall` (edge line) | `#1e1c18` |
| `stairsdown` | `#6a5a40` |
| `table` | `#7a5228` |
| `poi2` (enemy) | `#702020` |
| `poi3` (hazard) | `#1e5028` |
| `poi4` (player) | `#1a3a6a` |
| `label` text | `var(--text-secondary)` |

Viewport background (the space outside the map canvas) matches the app:
`background: #6b6560` — as defined in `.mb-viewport` in mapbuilder.css.

---

## HOW CLAUDE WEB USES THIS

When Michel asks for a battle map or encounter layout in Claude Web, the response will:

1. Describe the encounter in plain text first (what's happening, who is here, what the stakes are)
2. Produce the ASCII grid in a ` ```map ` block following this spec
3. Provide the full metadata block below it
4. Note any ambiguities or layout decisions made

Claude Web will not render the map visually — it only produces the ASCII + metadata.
Claude Code handles all rendering.

When Michel copies the ASCII block and metadata and hands it to Claude Code, Claude Code should:
1. Parse the grid
2. Render it in the map builder at the current floor
3. Populate the encounter panel sidebar with enemy/player/hazard data
4. Display GM notes in the notes panel
5. Confirm: "Map rendered — [name], [cols]x[rows], [n] enemies, [n] players."

---

## VERSIONING

This is **Version 1.0** of the spec.

If the map builder gains new tile types, new POI colours, or new tool names, update this document and bump the version number. Both ends should always reference the same version.

Current tool vocabulary sourced from: `mapbuilder.css` as provided by Michel.
Last updated: Session 7 arc, Biggus's mansion encounter.
