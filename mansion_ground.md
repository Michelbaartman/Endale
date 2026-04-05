# BIGGUS MANSION — GROUND FLOOR
## ASCII Map · Spec v1.0

```map
#############################################
#...........#..........#....................#
#..kitchen..+..pantry..#....great.hall.....#
#...........#..........#...................+#
#.o.o.......#..........#...................#
#...........############...................#
#...........X...........###################
#...........#..storeroom#.....barracks.....#
#...........#...........#.....1111.........#
#..chute.rm.#...o.o.o...#.....1111.........#
#...........#...........+.....1111.........#
#...........#...........#..................#
#############.............................##
#...........................................#
#.........back.exit........................#
##..####################################.##
....####################################....
....#.......................................#
....#.......................................#
....#...........courtyard...................#
....#.......................................#
....#.......................................#
....####################################....
```

MAP: Biggus Mansion — Ground Floor
SIZE: 45x23
TYPE: mixed
LIGHTING: dim
SCALE: 1 tile = 5ft
FLOORS: 1

LEGEND:
  .  = stone — interior floor
  ,  = grass — courtyard ground (rows 17–22 inside courtyard walls)
  #  = autowall — structural walls
  +  = door closed — connects rooms
  X  = hatch — chute room trapdoor, connects DOWN to Cellar
  o  = small object — kitchen pots, storeroom crates
  1  = enemy spawn — Biggus's rogues (barracks)

WALLS:
  5,11,S = thin
  5,12,S = thin
  5,13,S = thin
  5,14,S = thin
  5,15,S = thin
  5,16,S = thin
  5,17,S = thin
  5,18,S = thin
  5,19,S = thin
  5,20,S = thin
  5,21,S = thin
  6,11,N = thin
  2,23,W = thin
  2,24,W = thin
  2,25,W = thin
  2,26,W = thin
  2,27,W = thin
  2,28,W = thin
  10,29,E = thin
  11,29,E = thin

ENEMIES:
  1 = Mousekin Rogue (x4) · HP 5 / Armor 1 / Atk +2 — Barracks. Off-duty when encounter starts. Half are sleeping (prone, lose first action). Quick Blade + Dirty Trick. Know the village — advantage on pursuit through Fonn streets.

PLAYERS:
  A = Enters from courtyard (south, row 22) or via chute (X tile, row 6 col 11)
  B = Same entry options
  C = Same — last up the chute, most exposed

HAZARDS:
  ! = None placed on grid — see Fear Moves

FEAR MOVES:
  1 = A rogue shouts from the barracks window — audible from the courtyard. Any Lionguard or Biggus loyalists outside begin moving toward the mansion. Arrive in 3 rounds.
  2 = Kitchen fire — a rogue kicks over a pot on the hearth (o tile, kitchen). Adjacent tiles become difficult terrain. Smoke begins filling the kitchen within 2 rounds — disadvantage on all actions in the room.
  3 = Rogue sprints for the back exit (row 14, left edge) — escapes into Fonn's streets. If not caught, Biggus is warned before the party reaches the first floor. Biggus activates escape route (private stair from war room).

NOTES:
  ROOMS:

  KITCHEN (top-left, cols 1–10, rows 1–5):
  Warm, a pot still on the fire — someone left in a hurry.
  Two bowls set out (someone small eats here regularly — see GM notes).
  Behind a loose stone near the hearth: a folded letter signed only with
  the three-line circle brand. Same symbol as Biggus's signet ring and
  Scratchen's brand. Loot item — not a tile.

  PANTRY (cols 12–21, rows 1–5):
  Storage. Nothing suspicious on the surface. One shelf has a false
  back — behind it, extra sedative herb supply (Hasharim Port packaging,
  matching the cellar ledger).

  GREAT HALL (cols 23–43, rows 1–11):
  The "cover" room. Fresh flowers in a vase (slightly wilted).
  Guest book near the door with legitimate merchant signatures —
  all from the past six months. Biggus has been cultivating a
  normal-looking front carefully and recently.
  Behind a painting on the west wall (facing backward, leaned against
  the wall as if undecided): the Applecrumb family portrait.
  Painted ~15 years ago. Biggus is in it. Fenlow is in it.
  Young Sable is at the edge, half-hidden behind a sibling.
  Fenlow's face has been crossed out in charcoal. Partially rubbed out.

  CHUTE ROOM (cols 1–10, rows 6–11):
  The trapdoor (X) drops to the Cellar.
  Muddy pawprints on the floor around it — ratkin boots and micekin feet.
  Traffic here has been regular. A discarded scarf near the hatch:
  belongs to a Fonn ranger who went missing three weeks ago.
  Cover story if anyone wanders in: "root cellar for food storage."

  STOREROOM (cols 12–27, rows 7–11):
  Crates, kegs. Nothing suspicious on the surface.
  One crate has a false bottom — empty now, recently used.

  BARRACKS (cols 29–43, rows 7–11):
  Sleeping quarters for rogues and hired muscle.
  Most bunks sparse and impersonal.
  One bunk in the corner has a carved wooden lighthouse figurine
  on the shelf — a local rogue who grew up in Fonn.
  A duty roster on the wall in shorthand code.
  One name added later in different ink, circled: "D. Applecrumb."
  Drew was supposed to take a shift here. He hasn't shown up.

  COURTYARD (rows 17–22, interior):
  Open, patrolled. Main approach to the mansion from the south.
  Render interior courtyard as grass/dirt tiles.
  Courtyard walls are autowall, no roof.
  Main gate is at the south end — double width, currently unguarded
  (guards pulled inside when alarm was raised).

  BACK EXIT (row 14, left side):
  An unmarked servants' door on the northwest wall.
  Appears as a door tile (+) set into the west wall.
  Leads directly to Fonn's back streets.
  This is the rogues' escape route and the party's best quiet exit.

  STAIR TO FIRST FLOOR:
  Main stair is in the northeast corner of the Great Hall (row 2, col 43).
  Render as S tile. Connects UP to First Floor war room corridor.

  DOORS:
  + at (row 3, col 11): Kitchen to Pantry — wooden, unlocked
  + at (row 3, col 43): Great Hall to exterior (east face) — heavy, bolted from inside
  + at (row 10, col 28): Storeroom to Barracks — ajar
  Back exit + at (row 14, col 1): Servants' door — unlocked
```
