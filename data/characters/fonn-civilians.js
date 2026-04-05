Endale.registerPage('characters/fonn-civilians', {
  title: 'Fonn \u2014 Civilians',
  subtitle: 'Click any character card to expand.',
  groups: [

    /* ── Individual collapsible cards ───────────────────────────────── */
    {
      type: 'cards',
      headerClass: 'h-feather',
      entries: [
        {
          name: 'Aldric Featherhide',
          role: 'Crowfolk \u00b7 Innkeeper \u00b7 Crow\'s Nest',
          rank: ['Civilian', 'Ally'],
          fields: [
            { label: 'Appearance', value: 'Broad-chested black crow with flecks of white at the temples. Keeps his feathers neat out of habit. Perpetually has a cloth in his hand \u2014 wiping the bar, cleaning a glass, doing something useful.' },
            { label: 'Personality', value: 'Warm without being soft. Genuinely cares about the people who walk into his inn. Slow to worry and fast to help. The current situation \u2014 a full Lionguard, a secret prince, and now whatever is happening at Biggus\'s mansion \u2014 is testing his composure and he is managing it with remarkable dignity.' },
            { label: 'Hook', value: 'Trusted Eweram\'s family enough to open the inn without asking questions. That trust has a limit and it\'s approaching. He will ask, politely and only once, for an honest answer about what is going on under his roof.' }
          ],
          quote: '\u201cI don\'t need all of it. Just enough to know whether I should send Senne to her sister\'s.\u201d',
          tags: [
            { label: 'Ally', cls: 'tag-green' },
            { label: 'Eweram connection', cls: 'tag-light' },
            { label: 'Patience wearing thin', cls: 'tag-mid' }
          ]
        },
        {
          name: 'Senne Featherhide',
          role: 'Crowfolk \u00b7 Innkeeper \u00b7 Crow\'s Nest',
          rank: ['Civilian', 'Ally'],
          fields: [
            { label: 'Appearance', value: 'Smaller than Aldric, dark grey feathers with an iridescent sheen in good light. Quick eyes that miss nothing. Always moving, always noting.' },
            { label: 'Personality', value: 'Warmer on the surface than Aldric but sharper underneath. She has been running this inn long enough to read people in the time it takes them to sit down. Notices the fasting guard. Notices the tension between the Lionguard factions. Notices everything and files it quietly away.' },
            { label: 'Hook', value: 'Has been bringing Aldous herbs from the market \u2014 she finds his enthusiasm charming and his questions about magic ingredients oddly hopeful. She also knows more about Fonn\'s social undercurrents than anyone the party has met. She will share it if she trusts someone enough, and she is a good judge of trustworthiness.' }
          ],
          quote: '\u201cThe big one hasn\'t eaten in two days. I don\'t think it\'s the food.\u201d',
          tags: [
            { label: 'Ally', cls: 'tag-green' },
            { label: 'Information source', cls: 'tag-blue' },
            { label: 'Aldous connection', cls: 'tag-light' }
          ]
        },
        {
          name: 'Corvel Featherhide',
          role: 'Crowfolk \u00b7 Ranger \u00b7 Eweram\'s Friend',
          rank: ['Civilian', 'Ally'],
          fields: [
            { label: 'Appearance', value: 'Leaner than his father, with a traveller\'s restlessness about him even when standing still. Wears a ranger\'s coat repaired in three places. A single black tail feather always tucked behind one ear \u2014 habit, not decoration.' },
            { label: 'Personality', value: 'Easygoing with people he knows, reserved with strangers. Comfortable in the forest in a way he isn\'t entirely comfortable in the inn. Loyal to Eweram in the uncomplicated way of someone who has shared enough cold mornings in the woods to stop needing to explain it.' },
            { label: 'Hook', value: 'One of the rangers who reported the Veiled Forest paths shifting. He has been back twice since and the wrongness has gotten worse each time. He hasn\'t told his parents the full extent of it because he doesn\'t want to frighten them. He will tell Eweram everything.' }
          ],
          gmNote: 'Corvel is the party\'s best source of current intelligence on the Veiled Forest anomaly. He has been closer to it than anyone and he trusts Eweram. Get them alone together and let it come out naturally.',
          quote: '\u201cIt\'s not that the paths changed. It\'s that they changed back. Twice. Like something is deciding.\u201d',
          tags: [
            { label: 'Ally', cls: 'tag-green' },
            { label: 'Eweram\'s friend', cls: 'tag-mid' },
            { label: 'Forest intel', cls: 'tag-blue' }
          ]
        }
      ]
    },

    /* ── Applecrumb family — individual cards ───────────────────────── */
    {
      type: 'cards',
      headerClass: 'h-apple',
      entries: [
        {
          name: 'Arite Applecrumb',
          role: 'Mousekin \u00b7 Older brother \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Family', 'Allegiance unclear'],
          fields: [
            { label: 'Personality', value: 'The eldest. Steady, serious, says little. Has always been between Fenlow and the rest of the family without explicitly choosing a side.' },
            { label: 'Hook',        value: 'Knows more about the night of the compact than he has told anyone. Has been protecting someone \u2014 unclear who \u2014 by staying quiet.' },
          ],
          tags: [
            { label: 'Knows about the compact', cls: 'tag-purple' },
            { label: 'Protecting someone',      cls: 'tag-mid' },
          ]
        },
        {
          name: 'Lumi Applecrumb',
          role: 'Mousekin \u00b7 Older sister \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Family', 'Friendly'],
          fields: [
            { label: 'Personality', value: 'Instinctively protective of Sable even when she\u2019s frustrated with him. Sharp tongue, warm underneath it. Biggus\u2019s operation makes her uncomfortable in a way she can\u2019t articulate.' },
            { label: 'Hook',        value: 'The first sibling likely to approach Sable with questions. Has noticed Fenlow\u2019s odd behaviour and it is frightening her.' },
          ],
          tags: [
            { label: 'Protects Sable', cls: 'tag-green' },
            { label: 'Fenlow concern', cls: 'tag-gold' },
          ]
        },
        {
          name: 'Mira Applecrumb',
          role: 'Mousekin \u00b7 Middle sibling \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Family', 'Neutral'],
          fields: [
            { label: 'Personality', value: 'Peacekeeper by nature, exhausted by the feud, tries to keep family dinners civil. Has mostly succeeded by refusing to know things.' },
            { label: 'Hook',        value: 'Deliberately keeps herself uninformed. If she is forced to know something, she will have to pick a side \u2014 and she knows it.' },
          ],
          tags: [
            { label: 'Wilful ignorance', cls: 'tag-mid' },
            { label: 'Forced choice ahead', cls: 'tag-light' },
          ]
        },
        {
          name: 'Tilla Applecrumb',
          role: 'Mousekin \u00b7 Middle sibling \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Family', 'Neutral'],
          fields: [
            { label: 'Personality', value: 'Quieter than the others. Watches more than she speaks. Has been watching Biggus\u2019s operation with something between concern and fascination for months.' },
            { label: 'Hook',        value: 'Has seen things going in and out of the mansion she has not reported. Fear, not loyalty, is keeping her quiet.' },
          ],
          tags: [
            { label: 'Has seen things', cls: 'tag-gold' },
            { label: 'Silent from fear', cls: 'tag-mid' },
          ]
        },
        {
          name: 'Nib Applecrumb',
          role: 'Mousekin \u00b7 Younger brother \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Family', 'Hostile'],
          fields: [
            { label: 'Personality', value: 'Brash, quick to anger, fully bought into Biggus\u2019s vision of an expanded Fonn. Thinks Sable is an embarrassment and says so.' },
            { label: 'Hook',        value: 'Active in Biggus\u2019s operation at a low level \u2014 runs messages, keeps watch. Genuinely believes in the cause. Not cruel, just committed and young.' },
          ],
          tags: [
            { label: 'True believer', cls: 'tag-dark' },
            { label: 'Active operative', cls: 'tag-mid' },
          ]
        },
        {
          name: 'Pip Applecrumb',
          role: 'Mousekin \u00b7 Youngest \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Family', 'Innocent'],
          fields: [
            { label: 'Personality', value: 'A child. Cheerful, oblivious, follows Sable around when he\u2019s home. Has no idea what any of this is about.' },
            { label: 'Hook',        value: 'The one person in the family everyone agrees must be kept out of it. Even Nib. Even Nessa.' },
          ],
          tags: [
            { label: 'Child', cls: 'tag-green' },
            { label: 'Untouchable', cls: 'tag-light' },
          ]
        },
        {
          name: 'Rook Applecrumb',
          role: 'Mousekin \u00b7 Grandfather',
          rank: ['Applecrumb Family', 'Unknown'],
          fields: [
            { label: 'Appearance',  value: 'Old, sparse with words, moves slowly. Sits by the window most days. Seems unremarkable to everyone.' },
            { label: 'Hook',        value: 'Knew the woman in the grey cloak. May have been the original target of an earlier version of the Curse of Tongues. What he knows \u2014 and whether he still knows it \u2014 is one of the campaign\u2019s slow-burn mysteries.' },
          ],
          gmNote: 'Fenlow\u2019s letter points somewhere near Rook. Sable\u2019s magic immunity may trace back to him.',
          tags: [
            { label: 'Grey cloak connection',  cls: 'tag-purple' },
            { label: 'Slow-burn mystery',      cls: 'tag-mid' },
            { label: 'Sable\u2019s immunity \u2014 possible origin', cls: 'tag-gold' },
          ]
        },
      ]
    },

    /* ── Fonn townsfolk — individual cards ──────────────────────────── */
    {
      type: 'cards',
      headerClass: 'h-town',
      entries: [
        {
          name: 'Halder',
          role: 'Boarfolk \u00b7 Butcher',
          rank: ['Fonn Civilian', 'Neutral'],
          fields: [
            { label: 'Personality', value: 'Big, gruff, fair to everyone equally. Charges what things cost, no more. Dislikes the Lionguard\u2019s presence purely on principle \u2014 too many mouths, not enough coin upfront.' },
            { label: 'Hook',        value: 'Has noticed the ratmen buying unusual quantities of smoked meat over the past month. Didn\u2019t think much of it. Would mention it if asked the right question.' },
          ],
          tags: [
            { label: 'Ratmen buying meat', cls: 'tag-gold' },
            { label: 'Neutral',            cls: 'tag-light' },
          ]
        },
        {
          name: 'Wren',
          role: 'Sparrowfolk \u00b7 Tailor',
          rank: ['Fonn Civilian', 'Information source'],
          fields: [
            { label: 'Personality', value: 'Small, quick, talks constantly and remembers everything. The village\u2019s unofficial social registry. Knows who is sleeping badly, who has been arguing, who received a visitor.' },
            { label: 'Hook',        value: 'Has noticed which villagers have gone missing from their routines. Has a mental list she hasn\u2019t shared with anyone because nobody has asked. The list overlaps significantly with the cellar.' },
          ],
          tags: [
            { label: 'Key info source', cls: 'tag-blue' },
            { label: 'Missing persons list', cls: 'tag-red' },
          ]
        },
        {
          name: 'Gorin',
          role: 'Badgerfolk \u00b7 Retired soldier',
          rank: ['Fonn Civilian', 'Ally'],
          fields: [
            { label: 'Personality', value: 'Settled, deliberate, hard to rattle. Grows vegetables. Has the particular calm of someone who has seen the worst of things and decided the best response is a good harvest.' },
            { label: 'Hook',        value: 'Recognised the ratmen\u2019s movement patterns as military the moment he saw them. Has been watching quietly. Would tell the party everything if approached respectfully and without wasting his time.' },
          ],
          tags: [
            { label: 'Military intel', cls: 'tag-blue' },
            { label: 'Ally', cls: 'tag-green' },
          ]
        },
        {
          name: 'Finn',
          role: 'Otterfolk \u00b7 Fisher \u00b7 Dock patriarch',
          rank: ['Fonn Civilian', 'Ally'],
          fields: [
            { label: 'Personality', value: 'Cheerful, weathered, smells permanently of the river. Patriarch of the Finn family at the docks. Treats strangers like old friends until they give him a reason not to.' },
            { label: 'Hook',        value: 'The docks sit at the edge of the Veiled Forest\u2019s southern boundary. His family have been seeing strange lights in the tree line at night for two weeks. He thinks it\u2019s marsh gas.' },
          ],
          tags: [
            { label: 'Strange lights', cls: 'tag-gold' },
            { label: 'Ally',           cls: 'tag-green' },
          ]
        },
        {
          name: 'Motte',
          role: 'Otterfolk \u00b7 Fisher \u00b7 Finn\u2019s eldest daughter',
          rank: ['Fonn Civilian', 'Ally'],
          fields: [
            { label: 'Personality', value: 'Serious where her father is cheerful. Takes the river and its moods as a personal responsibility. Doesn\u2019t like things she can\u2019t explain.' },
            { label: 'Hook',        value: 'Has been mapping the light sightings. Has a rough sketch on sailcloth under the dock counter. The pattern of the lights forms a rough perimeter \u2014 something is marking territory.' },
          ],
          gmNote: 'The sailcloth map is a concrete handout opportunity. The perimeter it shows overlaps with where the Veiled Forest paths have been shifting.',
          tags: [
            { label: 'Has the map', cls: 'tag-blue' },
            { label: 'Forest perimeter', cls: 'tag-purple' },
          ]
        },
        {
          name: 'Aldra',
          role: 'Dovefolk \u00b7 Merchant',
          rank: ['Fonn Civilian', 'Neutral'],
          fields: [
            { label: 'Personality', value: 'Precise, businesslike, perpetually in a low-grade argument with Wiscon about routes and margins. Not unkind, just focused.' },
            { label: 'Hook',        value: 'Was at the Apple Cider arguing over a map when the attack happened. The map showed a forest route that no longer works \u2014 the paths have shifted. She wants to know why because it is costing her money.' },
          ],
          tags: [
            { label: 'Forest route problem', cls: 'tag-gold' },
            { label: 'Apple Cider witness',  cls: 'tag-mid' },
          ]
        },
        {
          name: 'Wiscon',
          role: 'Dovefolk \u00b7 Merchant',
          rank: ['Fonn Civilian', 'Neutral'],
          fields: [
            { label: 'Personality', value: 'More relaxed than Aldra, which infuriates her. Believes the forest path issue is temporary. Has been wrong about this for three weeks.' },
            { label: 'Hook',        value: 'Quietly suspects the path changes are connected to the tower beacon but hasn\u2019t said so because Aldra will turn it into a two-hour argument about magic being bad for trade.' },
          ],
          tags: [
            { label: 'Suspects the beacon', cls: 'tag-purple' },
            { label: 'Wisely keeps quiet',  cls: 'tag-light' },
          ]
        },
      ]
    },

    /* ── Applecrumb Siblings roster ─────────────────────────────────── */
    {
      type: 'roster',
      title: 'Applecrumb Siblings',
      role: 'Mousekin \u00b7 Sable\'s family',
      rank: ['Roster', 'Mixed allegiance'],
      headerClass: 'h-apple',
      sections: [
        {
          heading: 'Siblings',
          columns: ['Name', 'Species / Age', 'Personality', 'Hook / Allegiance'],
          rows: [
            { name: 'Arite',  badge: { label: 'unclear',  cls: 'badge-unknown'  }, cells: ['Mousekin \u00b7 Older brother', 'The eldest. Steady, serious, says little. Has always been between Fenlow and the rest of the family without choosing a side explicitly.', 'Knows more about the night of the compact than he has told anyone. Has been protecting someone \u2014 unclear who \u2014 by staying quiet.'] },
            { name: 'Lumi',   badge: { label: 'friendly', cls: 'badge-friendly' }, cells: ['Mousekin \u00b7 Older sister',  'Instinctively protective of Sable even when she\'s frustrated with him. Sharp tongue, warm underneath it. Biggus\'s operation makes her uncomfortable in a way she can\'t articulate.', 'The first sibling likely to approach Sable with questions. Has noticed Fenlow\'s odd behaviour and it is frightening her.'] },
            { name: 'Mira',   badge: { label: 'neutral',  cls: 'badge-neutral'  }, cells: ['Mousekin \u00b7 Middle sibling', 'Peacekeeper by nature, exhausted by the feud, tries to keep family dinners civil. Has mostly succeeded by refusing to know things.', 'Deliberately keeps herself uninformed. If she is forced to know something, she will have to pick a side and she knows it.'] },
            { name: 'Tilla',  badge: { label: 'neutral',  cls: 'badge-neutral'  }, cells: ['Mousekin \u00b7 Middle sibling', 'Quieter than the others. Watches more than she speaks. Has been watching Biggus\'s operation with something between concern and fascination for months.', 'Has seen things going in and out of the mansion she has not reported. Fear, not loyalty, is keeping her quiet.'] },
            { name: 'Nib',    badge: { label: 'hostile',  cls: 'badge-hostile'  }, cells: ['Mousekin \u00b7 Younger brother', 'Brash, quick to anger, fully bought into Biggus\'s vision of an expanded Fonn. Thinks Sable is an embarrassment and says so.', 'Active in Biggus\'s operation at a low level \u2014 runs messages, keeps watch. Genuinely believes in the cause. Not cruel, just committed and young.'] },
            { name: 'Pip',    badge: { label: 'innocent', cls: 'badge-friendly' }, cells: ['Mousekin \u00b7 Youngest', 'A child. Cheerful, oblivious, follows Sable around when he\'s home. Has no idea what any of this is about.', 'The one person in the family everyone agrees must be kept out of it. Even Nib. Even Nessa.'] }
          ]
        },
        {
          heading: 'Cousins of note',
          columns: ['Name', 'Species / Relation', 'Personality', 'Hook / Allegiance'],
          rows: [
            { name: 'Nessa', badge: { label: 'hostile', cls: 'badge-hostile' }, cells: ['Mousekin \u00b7 Cousin', 'Sharp, ambitious, contemptuous. Believes Fonn\'s custodian families have been wasting their position for generations. Specifically and vocally resents that Sable still has Fenlow\'s protection when she considers him useless in every measurable way.', 'In league with Biggus. Not muscle \u2014 she is organisational, tactical, and deeply invested in seeing the old order replaced. Her resentment of Sable is personal enough to cloud her judgement about him.'] },
            { name: 'Berry', badge: { label: 'hostile', cls: 'badge-hostile' }, cells: ['Mousekin \u00b7 Cousin', 'One of two Berrys. The louder one \u2014 all bravado, follows Nessa\'s lead without much independent thought.', 'Was at the Apple Cider attack. Failed. Has not been seen publicly since and is presumably lying low at Biggus\'s command.'] },
            { name: 'Berry', badge: { label: 'hostile', cls: 'badge-hostile' }, cells: ['Mousekin \u00b7 Cousin', 'The quieter Berry. More careful than the first. Goes along with the loud one out of habit more than conviction.', 'Also at the Apple Cider. Also failed. Privately not sure this is worth it anymore but has no idea how to say that.'] },
            { name: 'Clide', badge: { label: 'hostile', cls: 'badge-hostile' }, cells: ['Mousekin \u00b7 Uncle', 'Older, harder, genuinely loyal to Biggus from the early days. Not a fanatic \u2014 just someone who made a choice a long time ago and has stopped questioning it.', 'Was at the Apple Cider. The most experienced of the three. His failure stings him more than the others because he knew better.'] },
            { name: 'Rook',  badge: { label: 'unknown', cls: 'badge-unknown' }, cells: ['Mousekin \u00b7 Grandfather', 'Old, sparse with words, moves slowly. Sits by the window most days. Seems unremarkable to everyone except Fenlow\'s letter, which points somewhere near him.', 'Knew the woman in the grey cloak. May have been the original target of an earlier version of the Curse of Tongues. What he knows \u2014 and whether he still knows it \u2014 is one of the campaign\'s slow-burn mysteries.'] }
          ]
        }
      ]
    },

    /* ── Fonn Townsfolk roster ───────────────────────────────────────── */
    {
      type: 'roster',
      title: 'Fonn Townsfolk',
      role: 'Misc Civilians \u00b7 Village of Fonn',
      rank: ['Roster', 'Commoners'],
      headerClass: 'h-town',
      sections: [
        {
          heading: 'Named civilians',
          columns: ['Name', 'Species / Role', 'Personality', 'Hook'],
          rows: [
            { name: 'Halder', badge: null, cells: ['Boarfolk \u00b7 Butcher',             'Big, gruff, fair to everyone equally. Charges what things cost, no more. Dislikes the Lionguard\'s presence purely on principle \u2014 too many mouths, not enough coin upfront.', 'Has noticed the ratmen buying unusual quantities of smoked meat over the past month. Didn\'t think much of it. Would mention it if asked the right question.'] },
            { name: 'Wren',   badge: null, cells: ['Sparrowfolk \u00b7 Tailor',           'Small, quick, talks constantly and remembers everything. The village\'s unofficial social registry. Knows who is sleeping badly, who has been arguing, who received a visitor.', 'Has noticed which villagers have gone missing from their routines in the past few weeks. Has a mental list she hasn\'t shared with anyone because nobody has asked. The list overlaps significantly with the cellar.'] },
            { name: 'Gorin',  badge: null, cells: ['Badgerfolk \u00b7 Retired soldier',   'Settled, deliberate, hard to rattle. Grows vegetables. Has the particular calm of someone who has seen the worst of things and decided the best response is a good harvest.', 'Recognised the ratmen\'s movement patterns as military the moment he saw them. Has been watching quietly. Would tell the party everything if they approach him respectfully and don\'t waste his time.'] },
            { name: 'Finn',   badge: null, cells: ['Otterfolk \u00b7 Fisher',             'Cheerful, weathered, smells permanently of the river. Patriarch of the Finn family at the docks. Treats strangers like old friends until they give him a reason not to.', 'The docks sit at the edge of the Veiled Forest\'s southern boundary. His family have been seeing strange lights in the tree line at night for two weeks. He thinks it\'s marsh gas.'] },
            { name: 'Motte',  badge: null, cells: ['Otterfolk \u00b7 Finn\'s eldest daughter', 'Serious where her father is cheerful. Takes the river and its moods as a personal responsibility. Doesn\'t like things she can\'t explain.', 'Has been mapping the light sightings. Has a rough sketch on a piece of sailcloth under the dock counter. The pattern of the lights is not random \u2014 it forms a rough perimeter. Something is marking territory.'] },
            { name: 'Aldra',  badge: null, cells: ['Dovefolk \u00b7 Merchant',            'Precise, businesslike, perpetually in a low-grade argument with Wiscon about routes and margins. Not unkind, just focused.', 'Was at the Apple Cider arguing over a map when the attack happened. The map showed a forest route that no longer works \u2014 the paths have shifted. She wants to know why because it is costing her money.'] },
            { name: 'Wiscon', badge: null, cells: ['Dovefolk \u00b7 Merchant',            'More relaxed than Aldra, which infuriates her. Believes the forest path issue is temporary. Has been wrong about this for three weeks.', 'Quietly suspects the path changes are connected to the tower beacon but hasn\'t said so because Aldra will turn it into a two-hour argument about magic being bad for trade.'] }
          ]
        }
      ]
    }

  ]
});
