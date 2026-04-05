# BIGGUS MANSION — FIRST FLOOR
## ASCII Map · Spec v1.0

```map
#############################################
#.....................#.......................#
#.....war.room........#....meeting.room.....#
#...........@.........#.......@.............#
#...O.O.O.............#.....................#
#.....................##.....................#
#.....................S#.....................#
###########+##########.....................##
#.officer.qtr.1.......#...officer.qtr.2....#
#.....................1#.....................#
#..........@..........#..........@..........#
#.....................#2....................#
#############################################
===========================================
```

MAP: Biggus Mansion — First Floor
SIZE: 45x14
TYPE: interior
LIGHTING: dim
SCALE: 1 tile = 5ft
FLOORS: 1

LEGEND:
  .  = stone — interior floor
  #  = autowall — structural walls
  +  = door closed — upper corridor to quarters
  S  = stairsdown — private stair down to Ground Floor (war room exit)
  O  = table — war room desk and furniture
  @  = container — interactable objects (chest, desk drawer, war board)
  =  = fence — open balcony railing overlooking courtyard (row 13)
  1  = enemy spawn — officer in quarters 1
  2  = enemy spawn — officer in quarters 2

WALLS:
  7,0,S = thin
  7,1,S = thin
  7,2,S = thin
  7,3,S = thin
  7,4,S = thin
  7,5,S = thin
  7,6,S = thin
  7,7,S = thin
  7,8,S = thin
  7,9,S = thin
  7,10,S = thin
  7,32,S = thin
  7,33,S = thin
  7,34,S = thin
  7,35,S = thin
  7,36,S = thin
  7,37,S = thin
  7,38,S = thin
  7,39,S = thin
  7,40,S = thin
  7,41,S = thin
  7,42,S = thin
  7,43,S = thin
  7,44,S = thin

ENEMIES:
  1 = Mousekin Rogue (senior officer) · HP 5 / Armor 1 / Atk +2 — Officer quarters 1. Has a wanted poster from Hasharim Port rolled up by his bunk (personal item, loot). Fights professionally. Retreats to war room to warn Biggus if losing.
  2 = Ratkin Skirmisher · HP 3 / Armor 1 / Atk +1 — Officer quarters 2. Scratchen's second. Dart & Back. Will attempt to barricade the door before fighting.

PLAYERS:
  A = Enters from main stair (northeast Great Hall, Ground Floor) — emerges top-right area
  B = Same
  C = Same

HAZARDS:
  ! = None placed on grid

FEAR MOVES:
  1 = Officer 1 retreats and barricades the war room door — party must beat Strength 14 to force it or find the private stair (S tile).
  2 = War board string pulled — Biggus has a tripwire on the board that collapses it if disturbed. Papers, string and pins scatter across the floor. Difficult terrain in war room. Takes 1 round to reassemble enough to read.
  3 = Biggus activates private stair (S tile) — if he is in the war room and the party is winning, he descends. He is no longer on this floor. He surfaces somewhere on Ground Floor with a head start.

NOTES:
  WAR ROOM (cols 1–20, rows 1–6):
  Biggus's command centre. The most important room in the building.

  The war board (@ tile, north wall, row 2 col 14):
  A large board covered in pinned notes and string.
  Names, locations, dates — a web.
  Key findings if the party examines it:
    - Fenlow: "contained — reliable until spring"
    - Pipkin: question mark, "liability"
    - Greymane: separate colour string connecting to an outside
      location the party doesn't recognise yet
    - Several Fonn elder names with dates beside them
  Reading it fully takes 1 full action (Action to study).

  Biggus's desk (O tile, row 4):
  Unfinished letter in Biggus's own handwriting — blunt, unpolished.
  Reads: "The staff is here. Will test on the lower stock tonight.
  If it works the way the old man says it does we won't need the
  herb shipments anymore."
  Letter is addressed to no one yet. He hadn't decided who to send it to.

  Desk drawer (@ tile, row 3 col 14 — treat as interactable object
  on or near the desk):
  A small key on a chain, wrapped in cloth.
  Too small for any door in the mansion.
  Engraved on the bow: a tiny pink feather.
  This connects to Fenlow's letter (pink feathers north of the mill).
  Biggus knows about the pink feather location. The party just got here first.

  Private stair (S tile, row 6 col 21):
  Descends directly to Ground Floor via a hidden panel in the kitchen
  area — emerges behind the loose-stone hearth.
  Biggus uses this to escape if cornered.
  Party may not know it exists until they see him use it or search (Instinct 13).

  MEETING ROOM (cols 22–43, rows 1–6):
  Where deals are made and correspondence stored.

  Meeting table (O tile, row 4):
  A half-eaten meal at the head of the table — still fresh.
  Biggus was here very recently. He left fast.

  Correspondence drawer (@ tile, row 3 col 36):
  Three letters, locked drawer (cheap lock — easily broken).
  All in the same hand, no signature, no location.
  Letter 1: discusses "the delivery arriving on schedule"
  Letter 2: discusses "subjects responding well to extended exposure"
  Letter 3 (most recent, different tone):
  "If the beacon can be re-keyed, everything changes.
  Don't let the shaman stall any further."
  Someone is pressuring Ossian through Biggus.
  Ossian is not the top of this chain.

  Map of Fonn (@ tile, row 2 col 30 — pinned to wall):
  More detailed than any map the party has seen.
  The Veiled Forest is marked accurately — including paths that
  shouldn't be known to outsiders.
  Someone with real knowledge of the village's hidden geography
  gave this to Biggus.

  OFFICER QUARTERS 1 (cols 1–20, rows 8–11):
  Senior rogue's room. Sparse but professional.
  One personal item: rolled-up wanted poster (Hasharim Port).
  A younger version of the officer's face. A bounty for theft.
  He has been running from something for a long time.

  OFFICER QUARTERS 2 (cols 22–43, rows 8–11):
  Biggus's sleeping room. Bed made with surprising neatness.
  Small shelf holds three items:
    - A dried flower
    - A child's tooth in a small jar
    - A folded piece of paper reading only: "you were right."
      Old paper, worn at the folds — he has opened it many times.
  These items humanise him just enough to be uncomfortable.

  BALCONY (row 13, full width):
  Open walkway with low railing (= tiles).
  Overlooks the courtyard below.
  A PC on the balcony can see anyone in the courtyard.
  Can be leapt from to courtyard — Athletics 12, 1d6 fall damage on failure.

  STAIR UP TO WATCHTOWER:
  In the northwest corner of the war room (row 1, col 2).
  A ladder hatch rather than full stairs — render as X tile with upward arrow label.
  Connects UP to Watchtower floor.

  MAIN STAIR UP FROM GROUND:
  Enters at top-right (row 1, col 43).
  Render as s tile (stairs from below).
```
