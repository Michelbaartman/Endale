# BIGGUS MANSION — CELLAR
## ASCII Map · Spec v1.0

```map
#############################################
#.......................................o...#
#..1........................................#
#...................................o.......#
#.......................................X...#
#..................#######..................#
#..................#.....#..................#
#...2222...........#.....#...3333..........#
#...2222...........#.....#...3333..........#
#...2222...........#.....#...3333..........#
#..................#.....#..................#
#..................#######..................#
#.......................................o...#
#...o.......................................#
#############################################
```

MAP: Biggus Mansion — Cellar
SIZE: 45x15
TYPE: interior
LIGHTING: dark
SCALE: 1 tile = 5ft
FLOORS: 1

LEGEND:
  .  = stone — default cellar floor
  #  = autowall — cellar stone walls
  o  = small object — supply barrels and crates
  X  = hatch — chute upward to Chute Room on Ground Floor
  2  = enemy spawn — Ratkin Skirmisher group A (Trance Chamber A side)
  3  = enemy spawn — Ratkin Skirmisher group B (Trance Chamber B side)
  1  = enemy spawn — Netch (rookie, near tunnel entrance)
  ###### = interior dividing wall separating the two trance chambers

WALLS:
  5,3,N = thin
  5,4,N = thin
  5,5,N = thin
  5,6,N = thin
  5,7,N = thin
  5,8,N = thin
  5,9,N = thin
  11,3,S = thin
  11,4,S = thin
  11,5,S = thin
  11,6,S = thin
  11,7,S = thin
  11,8,S = thin
  11,9,S = thin
  5,32,N = thin
  5,33,N = thin
  5,34,N = thin
  5,35,N = thin
  5,36,N = thin
  5,37,N = thin
  11,32,S = thin
  11,33,S = thin
  11,34,S = thin
  11,35,S = thin
  11,36,S = thin
  11,37,S = thin

ENEMIES:
  1 = Netch · HP 5 / Armor 1 / Atk +1 — Near tunnel entrance. Breaking Point at 2 HP. Knows about Lolo. Will bolt for hatch (X) on Fear 2.
  2 = Ratkin Skirmisher (x3) · HP 3 / Armor 1 / Atk +1 — Guarding Trance Chamber A. Pack Flankers. Dart & Back every round.
  3 = Ratkin Skirmisher (x3) · HP 3 / Armor 1 / Atk +1 — Guarding Trance Chamber B. Same tactics. Coordinate with group 2 on Fear 2.

PLAYERS:
  A = Enters via X hatch (top-right) — surfaces first
  B = Enters via X hatch — surfaces second
  C = Enters via X hatch — surfaces third, possibly still carrying the freed goatfolk

HAZARDS:
  ! = None placed — see Fear Moves for environmental hazards

FEAR MOVES:
  1 = A skirmisher smashes a crate (o tile) — difficult terrain spreads to all adjacent tiles. Costs movement to pass.
  2 = Lights out — Netch or a skirmisher tips the single hanging lantern (centre of map). Full darkness. All PC attacks at disadvantage until a light source is produced. Ratkin unaffected.
  3 = Netch bolts for the hatch (X) — escapes to Ground Floor, alerts Voss and Scratchen above. Encounter difficulty increases next round as reinforcements descend.

NOTES:
  TRANCE CHAMBER A (left room, cols 3–9, rows 5–11):
  Three villagers slumped against the west wall in a sedative trance.
  One of them is a goatfolk — the one the party already freed and is
  carrying. The others remain. Place as non-combat tokens if desired.

  TRANCE CHAMBER B (right room, cols 32–38, rows 5–11):
  Three more villagers. LOLO APPLECRUMB is here — leftmost position,
  row 8. She is not a combat token but is the emotional core of the
  scene for Sable. "LOLO WAS HERE" is scratched into the south wall
  of this chamber at floor level.
  Render Lolo as a distinct non-combat token (different colour to
  enemy/player POIs — suggest grey or amber).

  SUPPLY STORE (right side, cols 38–43):
  The o tiles along the right wall are the supply store.
  Contains: sedative herb (imported, Hasharim Port packaging),
  a ledger of names (some checkmarked, some dated, some "released"),
  rope, restraints. These are loot/info items — not rendered as tiles,
  noted here for GM reference.

  TUNNEL (left edge, row 4):
  The outside chute entrance (hidden in the bushes on the mansion's
  north side) feeds into the left end of the cellar via a low tunnel.
  If Claude Code supports a corridor extending off the left edge,
  add 4–6 tiles of dirt-floored tunnel terminating in a hatch symbol.
  Otherwise note in GM panel that the tunnel runs off the left edge.

  CHUTE (X tile, row 4 col 43):
  Connects upward to the Chute Room on Ground Floor (same col position).
  One character can ascend per round. Characters are visible and
  vulnerable while climbing.

  LIGHTING:
  One hanging lantern approximately at centre of map (row 7, col 22).
  Renders as $ tile if desired — not placed in grid above to keep
  the map clean, add manually or note as GM flourish.
```
