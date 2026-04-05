Endale.registerPage('characters/lionguard', {
  title: 'The Lionguard',
  subtitle: 'Pipkin\u2019s guard detail \u00b7 Currently at the Crow\u2019s Nest inn.',
  groups: [
    {
      type: 'cards',
      headerClass: 'h-apple',
      entries: [
        {
          name: 'Pipkin Pipermane',
          role: 'Lionkin \u00b7 Exiled Prince',
          rank: ['Lionguard', 'Protected Asset'],
          fields: [
            { label: 'Appearance',   value: 'Young, tawny-maned. Stands slightly too straight when he remembers to.' },
            { label: 'Personality',  value: 'Default: easy, warm, self-deprecating, asks questions he actually wants answered. Court mode activates in two seconds \u2014 posture shifts, register shifts, the room goes formal. Uses it deliberately. Even his guards aren\u2019t fully used to it.' },
            { label: 'Stats',        value: 'HP 8 \u00b7 Stress 7 \u00b7 Armor 1 \u00b7 Attack +1 \u00b7 Evasion 12' },
            { label: 'Motivation',   value: 'Wants to understand what happened to his father. Not reclaim the throne yet \u2014 just know if the man he loved is still there.' },
            { label: 'Combat',       value: 'Court Blade (1d6+1). Royal Bearing (once/scene, Presence 13 or enemies hesitate one action \u2014 works once, then they\u2019ve seen it).' },
            { label: 'Liability',    value: 'If Pipkin takes damage, every guard within Far range beats Presence 11 or breaks off their current action to protect him. Even if tactically terrible.' },
            { label: 'Lost Item',    value: 'Magic heirloom cane \u2014 missing, taken before/during exile. Needed to unlock dormant abilities. Somewhere in Fonn.' },
          ],
          tags: [
            { label: 'Exiled prince',    cls: 'tag-gold' },
            { label: 'Cane missing',     cls: 'tag-mid' },
            { label: 'Mad king thread',  cls: 'tag-blue' },
          ]
        },
        {
          name: 'Greymane',
          role: 'Lionkin \u00b7 Advisor / Protector',
          rank: ['Lionguard', 'Commander'],
          fields: [
            { label: 'Appearance',       value: 'Iron grey, broad. Battle-scarred jaw. Looks like he used to be the muscle before he became the mind.' },
            { label: 'Personality',      value: 'Warm with Pipkin, measured with everyone else. Treats Pipkin like a younger brother. Maps every room. Never sits with his back to a door.' },
            { label: 'Stats',            value: 'HP 14 \u00b7 Stress 6 \u00b7 Armor 3 \u00b7 Attack +3 \u00b7 Evasion 12' },
            { label: 'Magic',            value: 'Light magic \u2014 uses sparingly. Doesn\u2019t like drawing attention to it.' },
            { label: 'Combat',           value: 'Veteran\u2019s Sword (1d10+3, Vulnerable on 16+). Light Ward (1d6 radiant Far, Blinds on hit). Cover (reaction, takes Pipkin\u2019s damage). Seal the Room (1 Fear, holds threshold, Strength 15 to pass).' },
            { label: 'Restraint Broken', value: 'If Pipkin is down and party is losing \u2014 stops holding back. Full radiant burst: 2d8 all Close enemies, 2 HP all Close allies.' },
          ],
          gmNote: 'Greymane\u2019s name appears on Biggus\u2019s war board with a separate colour string connecting to an outside location. Has knowledge of the mage council predating Pipkin\u2019s exile. Not yet resolved \u2014 even for the GM.',
          quote: '\u201cStay behind me. I didn\u2019t keep you alive this long to lose you in a village.\u201d',
          tags: [
            { label: 'Light mage',        cls: 'tag-gold' },
            { label: 'War board mystery', cls: 'tag-purple' },
            { label: 'Pipkin\u2019s protector', cls: 'tag-green' },
          ]
        },
        {
          name: 'Kip',
          role: 'Lionkin \u00b7 Guard / Greymane\u2019s Ward',
          rank: ['Lionguard', 'Guard'],
          fields: [
            { label: 'Appearance',  value: 'Younger, lean, short mane tied back. Armour fitted by Greymane.' },
            { label: 'Personality', value: 'Structural stammer \u2014 not nerves. Strips language to essentials. Speaks in short direct phrases. Rarely wrong. First to say what everyone else is dancing around.' },
            { label: 'Background',  value: 'Outcast taken in by Greymane. Loyalty is absolute and unsentimental.' },
            { label: 'Stats',       value: 'HP 9 \u00b7 Stress 5 \u00b7 Armor 2 \u00b7 Attack +2 \u00b7 Evasion 13' },
            { label: 'Combat',      value: 'Short Spear (1d6+2, Close\u2013Far). Watch Your Left (reaction, ally gains +2 defense once/round).' },
            { label: 'Trait',       value: 'Outcast\u2019s Read (advantage on Instinct vs deception/social tension). Says it once \u2014 never repeats ignored advice.' },
          ],
          quote: '\u201cTold you.\u201d',
          tags: [
            { label: 'Greymane\u2019s ward', cls: 'tag-mid' },
            { label: 'High Instinct',   cls: 'tag-blue' },
          ]
        },
        {
          name: 'Aldous',
          role: 'Lionkin \u00b7 Guard / Amateur Alchemist',
          rank: ['Lionguard', 'Guard'],
          fields: [
            { label: 'Appearance',   value: 'Medium build, distracted expression, faint sulfur smell. Leather satchel on belt that clinks when he walks.' },
            { label: 'Personality',  value: 'Good soldier who is always also thinking about potions. Since magic returned: quietly ecstatic. Collecting samples in Fonn. Senne Featherhide now brings him herbs from the market.' },
            { label: 'Stats',        value: 'HP 9 \u00b7 Stress 5 \u00b7 Armor 2 \u00b7 Attack +2 \u00b7 Evasion 11' },
            { label: 'Combat',       value: 'Standard blade (1d6+2). Field Vial (random d4: 1=flash blind, 2=smoke, 3=adhesive slow, 4=accidentally healing potion for nearest ally \u2014 he apologises).' },
            { label: 'Field Medic',  value: 'Once/short rest: stabilise a downed ally to 1 HP. Full action.' },
          ],
          gmNote: 'Will not leave Nora alone once he learns she is a mage. The Senne herb-connection gives him a reason to be anywhere useful.',
          tags: [
            { label: 'Alchemist',      cls: 'tag-blue' },
            { label: 'Nora hook',      cls: 'tag-purple' },
            { label: 'Senne ally',     cls: 'tag-green' },
          ]
        },
        {
          name: 'Varro',
          role: 'Lionkin \u00b7 Senior Guard',
          rank: ['Lionguard', 'Senior Guard'],
          fields: [
            { label: 'Appearance',  value: 'Golden lion. Senior guard \u2014 the one who has seen enough postings to stop being surprised by anything.' },
            { label: 'Personality', value: 'Says little, sighs often. Has seen too many postings go sideways. Treats silence as the professional default.' },
            { label: 'Stats',       value: 'HP 7 \u00b7 Armor 2 \u00b7 Atk +2 \u00b7 Eva 11' },
            { label: 'Hook',        value: 'Hasn\u2019t eaten in two days. Something is wrong with him unrelated to the mission.' },
          ],
          tags: [
            { label: 'Senior guard',    cls: 'tag-mid' },
            { label: 'Something wrong', cls: 'tag-gold' },
          ]
        },
        {
          name: 'Maret',
          role: 'Lionkin \u00b7 Guard',
          rank: ['Lionguard', 'Guard'],
          fields: [
            { label: 'Appearance',  value: 'Dark-maned lioness. Watchful bearing.' },
            { label: 'Personality', value: 'Sharp, skeptical of the party. Comes around slowly, never admits it.' },
            { label: 'Stats',       value: 'HP 7 \u00b7 Armor 2 \u00b7 Atk +2 \u00b7 Eva 11' },
            { label: 'Hook',        value: 'Knows why the guard is split into two silent factions. Part of one side.' },
          ],
          tags: [
            { label: 'Faction tension', cls: 'tag-mid' },
            { label: 'Skeptical of party', cls: 'tag-light' },
          ]
        },
        {
          name: 'Solen',
          role: 'Lionkin \u00b7 Guard (young)',
          rank: ['Lionguard', 'Guard'],
          fields: [
            { label: 'Appearance',  value: 'Pale-maned lion, young. Armour newer than everyone else\u2019s.' },
            { label: 'Personality', value: 'Eager, asks too many questions, fascinated by everywhere outside the capital.' },
            { label: 'Stats',       value: 'HP 7 \u00b7 Armor 2 \u00b7 Atk +2 \u00b7 Eva 11' },
            { label: 'Hook',        value: 'First time this far from home. Hides overwhelm behind enthusiasm.' },
          ],
          tags: [
            { label: 'First posting', cls: 'tag-green' },
            { label: 'Eager', cls: 'tag-light' },
          ]
        },
        {
          name: 'Dura',
          role: 'Lionkin \u00b7 Guard',
          rank: ['Lionguard', 'Guard'],
          fields: [
            { label: 'Appearance',  value: 'Scarred lioness. Former city guard before the Lionguard posting. Moves like someone who counts exits.' },
            { label: 'Personality', value: 'Quiet, methodical, counts exits in every room.' },
            { label: 'Stats',       value: 'HP 7 \u00b7 Armor 2 \u00b7 Atk +2 \u00b7 Eva 11' },
            { label: 'Hook',        value: 'Part of the other faction side from Maret. She and Maret used to be close.' },
          ],
          tags: [
            { label: 'Faction tension', cls: 'tag-mid' },
            { label: 'Ex-city guard',   cls: 'tag-light' },
          ]
        },
        {
          name: 'Ran',
          role: 'Lionkin \u00b7 Guard',
          rank: ['Lionguard', 'Guard'],
          fields: [
            { label: 'Appearance',  value: 'Red-maned lion. First to volunteer, always has a story.' },
            { label: 'Personality', value: 'Friendly, loud, first to volunteer for watch. Hides anxiety behind helpfulness.' },
            { label: 'Stats',       value: 'HP 7 \u00b7 Armor 2 \u00b7 Atk +2 \u00b7 Eva 11' },
            { label: 'Hook',        value: 'Was there the night of Pipkin\u2019s exile. Knows something he hasn\u2019t shared.' },
          ],
          tags: [
            { label: 'Night of the exile', cls: 'tag-purple' },
            { label: 'Hiding something',   cls: 'tag-gold' },
          ]
        },
        {
          name: 'Thessaly',
          role: 'Lionkin \u00b7 Guard',
          rank: ['Lionguard', 'Guard'],
          fields: [
            { label: 'Appearance',  value: 'Grey lioness. Steady, unhurried. Always seems to have food somewhere about her person.' },
            { label: 'Personality', value: 'Dry humour, deeply practical, always has food. Unofficial morale officer.' },
            { label: 'Stats',       value: 'HP 7 \u00b7 Armor 2 \u00b7 Atk +2 \u00b7 Eva 11' },
            { label: 'Hook',        value: 'Managing the Maret/Dura tension. Running out of patience for it.' },
          ],
          tags: [
            { label: 'Morale officer', cls: 'tag-green' },
            { label: 'Faction mediator', cls: 'tag-mid' },
          ]
        },
      ]
    },
    {
      type: 'roster',
      title: 'Guard Roster',
      role: 'Lionkin \u00b7 Remaining six guards',
      rank: ['Roster', 'HP 7 \u00b7 Armor 2 \u00b7 Atk +2 \u00b7 Eva 11'],
      headerClass: 'h-apple',
      sections: [
        {
          heading: 'Shared Abilities',
          columns: ['Ability', 'Effect'],
          rows: [
            { name: 'Guard\u2019s Blade',  badge: null, cells: ['Active',   '1d6+2 damage'] },
            { name: 'Shield Wall',      badge: null, cells: ['Passive',  '2+ guards adjacent to same ally = +1 Armor to that ally'] },
            { name: 'Lay Down',         badge: null, cells: ['Reaction', 'Once/scene \u2014 guard takes Pipkin\u2019s hit at half damage'] },
          ]
        },
        {
          heading: 'Guards',
          columns: ['Name', 'Appearance', 'Personality', 'Hook'],
          rows: [
            { name: 'Varro',    badge: { label: 'senior',   cls: 'badge-neutral'  }, cells: ['Golden lion, senior guard',     'Says little, sighs often. Has seen too many postings go sideways.',           'Hasn\u2019t eaten in two days. Something is wrong with him unrelated to the mission.'] },
            { name: 'Maret',    badge: { label: 'watchful', cls: 'badge-neutral'  }, cells: ['Dark-maned lioness',            'Sharp, skeptical of the party. Comes around slowly, never admits it.',         'Knows why the guard is split into two silent factions. Part of one side.'] },
            { name: 'Solen',    badge: { label: 'young',    cls: 'badge-friendly' }, cells: ['Pale-maned lion, young',        'Eager, asks too many questions, fascinated by everywhere outside the capital.', 'First time this far from home. Hides overwhelm behind enthusiasm.'] },
            { name: 'Dura',     badge: { label: 'watchful', cls: 'badge-neutral'  }, cells: ['Scarred lioness, former guard', 'Quiet, methodical, counts exits in every room.',                               'Part of the other faction side. She and Maret used to be close.'] },
            { name: 'Ran',      badge: { label: 'secret',   cls: 'badge-unknown'  }, cells: ['Red-maned lion',               'Friendly, loud, first to volunteer for watch. Hides anxiety behind helpfulness.', 'Was there the night of Pipkin\u2019s exile. Knows something he hasn\u2019t shared.'] },
            { name: 'Thessaly', badge: { label: 'steady',   cls: 'badge-friendly' }, cells: ['Grey lioness',                 'Dry humour, deeply practical, always has food. Unofficial morale officer.',    'Managing the Maret/Dura tension. Running out of patience for it.'] },
          ]
        }
      ]
    }
  ]
});
