# BIGGUS MANSION — WATCHTOWER
## ASCII Map · Spec v1.0

```map
###########
#.........#
#....1....#
#.........#
#%...s...%#
#.........#
#....@....#
#.........#
###########
```

MAP: Biggus Mansion — Watchtower
SIZE: 11x9
TYPE: interior
LIGHTING: bright
SCALE: 1 tile = 5ft
FLOORS: 1

LEGEND:
  .  = stone — guard post floor
  #  = autowall — tower walls
  %  = cave — arrow slit embrasures (thick stone, impassable, narrow window)
  s  = stairsdown — ladder hatch down to War Room (First Floor)
  @  = container — guard's post (cup, stool, crossbow bolts)
  1  = enemy spawn — watchtower guard

WALLS:
  0,0,N = thin
  0,1,N = thin
  0,2,N = thin
  0,3,N = thin
  0,4,N = thin
  0,5,N = thin
  0,6,N = thin
  0,7,N = thin
  0,8,N = thin
  0,9,N = thin
  0,10,N = thin

ENEMIES:
  1 = Mousekin Rogue (guard post) · HP 5 / Armor 1 / Atk +2 — Was called down in a hurry. Post is empty when party arrives (cup still warm). If the alarm has been raised before the party reaches this floor, he has returned and is waiting. Crossbow — ranged attack 1d6+2, Far range. Has sightlines over courtyard and north treeline.

PLAYERS:
  A = Enters via s tile (ladder from War Room below)
  B = Same
  C = Same — exposed while climbing, one at a time

HAZARDS:
  ! = None placed on grid

FEAR MOVES:
  1 = Guard fires crossbow down the ladder hatch — whoever is climbing takes 1d6+2 ranged attack with no cover. They must either retreat or push through.
  2 = Guard signals from arrow slit — a lit torch waved through the embrasure. Visible from parts of Fonn. Any loyalists or patrol in the village begin moving toward the mansion. Arrive in 4 rounds.
  3 = Guard overturns the post furniture (@) onto the hatch — hatch is now barricaded. Strength 13 to force open from below. He is buying time.

NOTES:
  SIZE:
  The watchtower is deliberately small — a single guard post, not a
  full room. 11x9 tiles at 5ft scale puts it at roughly 55x45 feet
  which is generous; feel free to reduce to 7x7 if the renderer
  prefers a tighter tower feel.

  ARROW SLITS (% tiles, row 4):
  The two % tiles represent thick stone embrasures with narrow windows.
  They are impassable and block LOS through them except for the guard
  who is positioned at them. A PC at an arrow slit can fire out but
  is in full cover against return fire from outside.
  Sightlines from the slits cover:
    West slit: courtyard below, Fonn's northern approach
    East slit: the north treeline — where the grey cloak woman has
    been spotted. If a PC looks out the east slit during the scene,
    they may spot a still figure in the treeline (Perception 13).
    If they look twice, she is gone.

  THE GUARD'S CUP:
  The @ tile represents the guard's abandoned post.
  A half-drunk cup still sitting on the ledge — still faintly warm.
  The guard was called down in a hurry.
  This means someone inside the manor gave the order before the
  party was fully detected — implying the party was expected,
  or someone inside panicked early.
  This is a clue, not a combat element.

  OLD CARVING (GM flourish, no tile):
  Scratched into the stone of the east arrow slit, faint and old:
  the three-line circle symbol.
  Same as Biggus's signet ring. Same as Scratchen's brand.
  This building has been used by these people before Biggus moved in.
  Longer than anyone has told the party.

  LADDER HATCH (s tile, row 4 col 5):
  Drops straight down to the War Room on First Floor.
  Single-file access — one character per round.
  The hatch can be barricaded from above (see Fear Move 3)
  or from below (War Room side — Intelligence 11 to find the latch).

  VISIBILITY:
  The watchtower is the highest point of the manor.
  On a clear night the tower beacon of Fonn is visible from here
  to the northwest — silver-gold column of light.
  A PC who takes a moment to look sees it and may feel something
  (GM discretion — Nora especially).
  This is a quiet character beat available if the encounter allows it.
```
