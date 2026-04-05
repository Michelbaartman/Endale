Endale.registerPage('characters/ratkin', {
  title: 'Ratkin Crew',
  subtitle: 'Hired operatives \u00b7 Based out of Biggus\u2019s mansion \u00b7 Want to finish and leave.',
  groups: [
    {
      type: 'cards',
      headerClass: 'h-neutral',
      entries: [
        {
          name: 'Scratchen',
          role: 'Ratkin \u00b7 Crew Leader',
          rank: ['Ratkin Crew', 'Hostile'],
          fields: [
            { label: 'Appearance',  value: 'Lean, long-faced, notched left ear. Oilskin coat.' },
            { label: 'Motivation',  value: 'Finish the job and leave Fonn. Dislikes the village. Dislikes Biggus.' },
            { label: 'Brand',       value: 'Three-line circle, inside left wrist. Won\u2019t explain it. Matches Biggus\u2019s signet ring \u2014 connection older than this job.' },
            { label: 'Stats',       value: 'HP 8 \u00b7 Stress 6 \u00b7 Armor 2 \u00b7 Attack +3 \u00b7 Evasion 14' },
            { label: 'Combat',      value: 'Paired Blades (1d8+3, double hit on 16+). Smoke Vial (1 Fear, zone disadvantage). Throat Cut (1d10+3, requires Vulnerable/flanked target, adds 1 Stress on hit).' },
            { label: 'Traits',      value: 'Vanish (once/scene \u2014 reposition on taking damage). Professional Floor (flees below 2 HP).' },
          ],
          quote: '\u201cI wasn\u2019t told there\u2019d be children involved. That changes the rate.\u201d',
          tags: [
            { label: 'Crew leader',         cls: 'tag-dark' },
            { label: 'Signet ring match',   cls: 'tag-mid' },
            { label: 'Professional \u2014 flees', cls: 'tag-light' },
          ]
        },
        {
          name: 'Voss',
          role: 'Ratkin \u00b7 Veteran Grunt',
          rank: ['Ratkin Crew', 'Hostile'],
          fields: [
            { label: 'Appearance', value: 'Stocky. Two fingers missing from right hand. Smells of sedative herb.' },
            { label: 'Stats',      value: 'HP 11 \u00b7 Stress 4 \u00b7 Armor 3 \u00b7 Attack +2 \u00b7 Evasion 10' },
            { label: 'Combat',     value: 'Heavy Cudgel (1d8+2, Prone on 16+). Sedative Dart (1d4+1 Far, Slowed on failed Instinct 12). Bull Rush (1 Fear, hits all in a straight line).' },
            { label: 'Traits',     value: 'Thick Hide (reduce damage by 2 the first time each round). Knows the Cellar (advantage in underground/low-light spaces).' },
          ],
          gmNote: 'Knows which villagers are in the cellar. Knows Lolo by name.',
          tags: [
            { label: 'Knows the cellar',  cls: 'tag-blue' },
            { label: 'Knows Lolo\u2019s name', cls: 'tag-gold' },
          ]
        },
        {
          name: 'Netch',
          role: 'Ratkin \u00b7 Rookie',
          rank: ['Ratkin Crew', 'Hostile / Breakable'],
          fields: [
            { label: 'Appearance',      value: 'Young, wiry, nervous. Gear too big. Fidgets with brand on wrist.' },
            { label: 'Stats',           value: 'HP 5 \u00b7 Stress 5 \u00b7 Armor 1 \u00b7 Attack +1 \u00b7 Evasion 12' },
            { label: 'Combat',          value: 'Rusty Blade (1d4+1). Desperate Throw (1d4, once/scene).' },
            { label: 'Breaking Point',  value: 'Below 2 HP: Presence 10 or drops weapon and can be talked to.' },
            { label: 'Lolo Hook',       value: 'Presence 12 while speaking directly \u2014 reveals he was on cellar duty when Lolo was brought in. It\u2019s been bothering him.' },
            { label: 'Fear (2)',         value: 'Bolts for the chute \u2014 may lead a PC down into the cellar after him.' },
          ],
          tags: [
            { label: 'Breakable',            cls: 'tag-mid' },
            { label: 'Cellar duty \u2014 Lolo', cls: 'tag-gold' },
          ]
        },
      ]
    },
    {
      type: 'roster',
      title: 'Ratkin Skirmishers',
      role: 'Ratkin \u00b7 Goon Block \u00b7 Deploy in groups of 2\u20133',
      rank: ['Roster', 'HP 3 \u00b7 Armor 1 \u00b7 Atk +1 \u00b7 Eva 12'],
      headerClass: 'h-neutral',
      sections: [
        {
          heading: 'Attacks',
          columns: ['Attack', 'Range', 'Effect'],
          rows: [
            { name: 'Quick Slash',    badge: null, cells: ['Close', '1d4+1'] },
            { name: 'Dart & Back',    badge: null, cells: ['Close', 'Attack then retreat Far'] },
            { name: 'Throwing Blade', badge: null, cells: ['Far',   '1d4'] },
          ]
        },
        {
          heading: 'Special Rules',
          columns: ['Rule', 'Type', 'Effect'],
          rows: [
            { name: 'Pack Flankers',   badge: null, cells: ['Passive',  'Two attacking the same target in the same round = +1d4 each.'] },
            { name: 'Minion Rule',     badge: null, cells: ['Passive',  'Any hit exceeding armor = down. No death saves.'] },
            { name: 'Retreat Trigger', badge: null, cells: ['Trigger',  'Half skirmishers down + Scratchen below 4 HP \u2192 crew scatters.'] },
            { name: 'Lights Out',      badge: null, cells: ['Fear (3)', 'Smashes lantern. All PC attacks at disadvantage. Ratkin unaffected.'] },
          ]
        }
      ]
    }
  ]
});
