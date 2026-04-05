Endale.registerPage('rules/level-context', {
  title: 'Level Context',
  subtitle: 'Daggerheart tier system \u00b7 player growth milestones \u00b7 encounter calibration \u00b7 level-up pacing',
  groups: [

    /* ── Tier Overview ────────────────────────────────────────────────────── */
    {
      type: 'reference',
      title: 'Tier Overview',
      role: 'Four tiers of play \u00b7 each tier defines the feel, scale, and stakes of the campaign',
      headerClass: 'h-guard',
      sections: [
        {
          heading: 'The Four Tiers',
          kind: 'table',
          columns: ['Tier', 'Levels', 'Proficiency', 'Narrative Scale', 'Typical Stakes'],
          rows: [
            ['Tier 1', 'Level 1',     '+1', 'Novice adventurers',   'Local \u2014 a village, a dungeon, a single villain. Survival is a real concern.'],
            ['Tier 2', 'Levels 2\u20134', '+2', 'Seasoned heroes',     'Regional \u2014 a city, a faction war, a growing threat. Reputation starts to form.'],
            ['Tier 3', 'Levels 5\u20137', '+3', 'Powerful champions',  'National \u2014 kingdoms, ancient evils, world-shaping events. PCs are notable figures.'],
            ['Tier 4', 'Levels 8\u201310', '+4', 'Legendary figures',  'Planar / mythic \u2014 cosmic threats, godlike power, legacies that outlast the campaign.'],
          ]
        },
        {
          heading: 'What Proficiency Covers',
          kind: 'pairs',
          rows: [
            { label: 'Proficiency bonus',   value: 'Added to all action rolls, damage rolls, and checks where the character has relevant training or background. Proficiency equals the current Tier number.' },
            { label: 'Rest healing (1d4 + Tier)', value: 'Tend to Wounds, Clear Stress, and Repair Armor all use 1d4 + Tier as their healing value on short rests. Higher-tier characters recover more efficiently.' },
            { label: 'Tier transitions',    value: 'Proficiency jumps at levels 2, 5, and 8 \u2014 the start of each new tier. These are the most mechanically significant level-ups.' },
          ]
        }
      ]
    },

    /* ── Level-by-Level Milestones ────────────────────────────────────────── */
    {
      type: 'reference',
      title: 'Level-by-Level Milestones',
      role: 'What players gain at each level \u00b7 key mechanical jumps \u00b7 domain card access',
      headerClass: 'h-neutral',
      sections: [
        {
          heading: 'Character Growth per Level',
          kind: 'table',
          columns: ['Level', 'Tier', 'Key Gains', 'Feel of the Level'],
          rows: [
            ['1',  'T1', 'Foundation class feature \u00b7 Subclass chosen \u00b7 2 domain cards in loadout (5 slots available) \u00b7 background Experiences set', 'Establishing who the character is. Abilities feel distinct but limited.'],
            ['2',  'T2', 'New class feature \u00b7 +1 trait score (class-dependent) \u00b7 access to Tier 2 domain cards \u00b7 proficiency jumps to +2', 'First real power spike. The proficiency jump changes how rolls feel.'],
            ['3',  'T2', 'Specialization feature unlocked \u00b7 new domain card \u00b7 Experiences may be updated', 'Characters begin to feel truly competent. Niche becomes clear.'],
            ['4',  'T2', 'New class feature or trait bump \u00b7 new domain card slot (loadout 5 \u2192 check class table)', 'Peak Tier 2. Characters are capable and reliable. Good time to challenge their worldview.'],
            ['5',  'T3', 'Major class feature (Mastery path) \u00b7 access to Tier 3 domain cards \u00b7 proficiency jumps to +3', 'Second big spike. High-tier cards come online. Encounters need to keep up.'],
            ['6',  'T3', 'New feature \u00b7 trait improvement \u00b7 domain card vault likely expanding', 'Power consolidation. Characters start to feel heroic in a full sense.'],
            ['7',  'T3', 'Advanced class feature \u00b7 new domain card', 'Peak Tier 3. Characters should be reshaping the world around them.'],
            ['8',  'T4', 'Near-capstone feature \u00b7 access to Tier 4 domain cards \u00b7 proficiency jumps to +4', 'Final tier begins. Legendary-scale play. Encounters require careful calibration.'],
            ['9',  'T4', 'New class feature \u00b7 advanced domain options', 'Characters are forces of nature. Story should match the scale.'],
            ['10', 'T4', 'Capstone class ability \u00b7 final trait option \u00b7 full domain mastery', 'End of the progression arc. Reserve for campaign conclusions or major story beats.'],
          ]
        },
        {
          heading: 'Domain Card Loadout Reference',
          kind: 'pairs',
          rows: [
            { label: 'What a domain card level means', value: 'Domain cards have a minimum level printed on them. A level 3 domain card cannot be added to a loadout until the PC reaches level 3. Vault cards can be held earlier but not used.' },
            { label: 'Loadout limit',  value: 'All PCs have a 5-card loadout limit regardless of level. The number of cards they own grows, but only 5 are active at once. Vault swapping (via Recall or rest) is how they adapt.' },
            { label: 'Effect of levelling', value: 'Higher-level domain cards are mechanically stronger, not just narratively. A party that levels up gains access to significantly more powerful card options \u2014 treat each tier transition as a balance reset.' },
          ]
        }
      ]
    },

    /* ── Encounter Calibration ────────────────────────────────────────────── */
    {
      type: 'reference',
      title: 'Encounter & Adversary Calibration',
      role: 'Matching adversary tiers to PC tiers \u00b7 encounter composition \u00b7 solo bosses',
      headerClass: 'h-hostile',
      sections: [
        {
          heading: 'Adversary Tier vs. PC Tier',
          kind: 'table',
          columns: ['Adversary Tier vs. PCs', 'Encounter Feel', 'Notes'],
          rows: [
            ['Same tier (T = T)',     'Standard \u2014 challenging, winnable',           'The baseline. Standard, Bruiser, Ranged, Skulk adversaries at the same tier are fair fights.'],
            ['One tier above (T+1)',  'Hard \u2014 resource-draining, possibly decisive', 'Use sparingly. Good for climactic scenes or punishing overconfidence. Not every session.'],
            ['Two tiers above (T+2)', 'Near-impossible \u2014 meant to be fled or negotiated', 'Never a "fair fight." Use to establish that something is beyond the party\'s reach right now.'],
            ['One tier below (T\u22121)', 'Easy \u2014 low resource cost, good for narrative scenes', 'Use for guards, minor obstacles, or scenes where failure isn\'t supposed to be on the table.'],
            ['Two tiers below (T\u22122)', 'Trivial \u2014 no meaningful threat',          'Only useful as flavour (townsfolk, mooks, crowd scenes). Don\'t build encounters around these.'],
          ]
        },
        {
          heading: 'Standard Encounter Composition by PC Tier',
          kind: 'table',
          columns: ['PC Tier', 'Light Encounter', 'Standard Encounter', 'Hard Encounter'],
          rows: [
            ['T1 (Lv.1)',   '2\u20133 Minions \u00b7 1 Standard',                  '1 Standard \u00b7 2\u20134 Minions \u00b7 or 2 Standards',     '1 Bruiser or Solo \u00b7 2 Standards'],
            ['T2 (Lv.2\u20134)', '3\u20134 Minions \u00b7 1 Standard',              '1 Leader/Support \u00b7 2 Standards \u00b7 2 Minions',        '1 Solo \u00b7 1 Support \u00b7 2 Minions'],
            ['T3 (Lv.5\u20137)', '1\u20132 Standards \u00b7 1 Support',             '1 Solo \u00b7 2 Standards \u00b7 1 Support',                  '1 Solo (T+1) \u00b7 2 Standards \u00b7 1 Leader'],
            ['T4 (Lv.8\u201310)', '2 Standards \u00b7 1 Bruiser',                  '1 Solo \u00b7 2 Bruisers \u00b7 1 Support',                   '1 Solo (T+1) \u00b7 multi-phase \u00b7 hazards'],
          ]
        },
        {
          heading: 'Solo Boss Guidelines',
          kind: 'pairs',
          rows: [
            { label: 'Same-tier Solo',       value: 'A Solo at the same tier as the PCs is a punishing encounter. Run it with 1\u20132 support adversaries (Minions or a Support type) to prevent the party from trivially focusing the boss.' },
            { label: 'One-tier-above Solo',   value: 'Climactic. Reserve for major story moments \u2014 end of arc, villain reveal, dungeon capstone. Expect PCs to use every resource they have.' },
            { label: 'Multi-phase Solos',     value: 'When a Solo hits ~50% HP, consider transitioning to a second phase: new move set, changed environment, or reinforcements arrive. Signals narrative weight.' },
            { label: 'Named NPCs as Solos',   value: 'Named villain NPCs should usually be Solos or Leaders at the party\'s tier. Building them as a Standard undersells them and they die anticlimactically.' },
          ]
        },
        {
          heading: 'Encounter Texture (beyond just difficulty)',
          kind: 'pairs',
          rows: [
            { label: 'Environment hazards',  value: 'Add hazards (burning floor, collapsing ceiling, rushing water) at any tier to create complexity without inflating adversary power. Hazards are effective action-tax even for high-tier PCs.' },
            { label: 'Mixed-tier groups',     value: 'A T2 Leader commanding T1 Minions is narratively satisfying and mechanically sound. The Leader is the real threat; Minions are pressure.' },
            { label: 'Social adversaries',    value: 'Social adversaries (type: Social) are appropriate at any tier when the PCs\u2019 relationships and reputation are on the line. Don\u2019t reserve them for non-combat scenes only.' },
            { label: 'Fear economy check',   value: 'After a hard encounter, note how much Fear you had left and how many tokens were unspent. If you had a surplus, the encounter was lighter than planned. Adjust next time.' },
          ]
        }
      ]
    },

    /* ── Experience & Level-Up Pacing ─────────────────────────────────────── */
    {
      type: 'reference',
      title: 'Experience & Level-Up Pacing',
      role: 'When to award XP \u00b7 sessions-per-level guidelines \u00b7 signs of levelling too fast or slow',
      headerClass: 'h-amber',
      sections: [
        {
          heading: 'Experience Award Conditions (end of session)',
          kind: 'table',
          columns: ['Condition', 'XP', 'Notes'],
          rows: [
            ['Survived a significant encounter or scene',   '1', 'The party faced real danger or meaningful adversity \u2014 not just a trivial fight.'],
            ['Made progress on a campaign story thread',     '1', 'A named story thread (active, mid-term, or slow-burn) moved forward in a meaningful way.'],
            ['A PC confronted their backstory or fear',      '1', 'The moment was character-driven and had emotional weight. Award to the group, not just one player.'],
            ['A meaningful failure with lasting consequence', '1', 'The party failed something that changed the world around them. Failure should be rewarded if it was engaged with.'],
            ['End of a major arc or session milestone',      '1 bonus', 'Use this for arc conclusions, major revelations, or sessions that were narratively complete. Not every session.'],
          ]
        },
        {
          heading: 'XP Thresholds to Level Up',
          kind: 'table',
          columns: ['Current Level', 'XP Needed', 'Typical Sessions at ~2 XP/session'],
          rows: [
            ['1 \u2192 2',  '3 XP',  '1\u20132 sessions'],
            ['2 \u2192 3',  '4 XP',  '2 sessions'],
            ['3 \u2192 4',  '5 XP',  '2\u20133 sessions'],
            ['4 \u2192 5',  '6 XP',  '3 sessions'],
            ['5 \u2192 6',  '8 XP',  '3\u20134 sessions'],
            ['6 \u2192 7',  '10 XP', '4\u20135 sessions'],
            ['7 \u2192 8',  '12 XP', '5\u20136 sessions'],
            ['8 \u2192 9',  '15 XP', '6\u20137 sessions'],
            ['9 \u2192 10', '20 XP', '8\u201310 sessions'],
          ]
        },
        {
          heading: 'Pacing Guidance — By Tier',
          kind: 'pairs',
          rows: [
            { label: 'Tier 1 (Level 1)',    value: 'Move through this quickly \u2014 1\u20132 sessions. Level 1 is a prologue state. Players want to feel competent fast, and T2 is where the real character identity forms.' },
            { label: 'Tier 2 (Levels 2\u20134)', value: 'The sweet spot for sustained play. Budget 6\u20138 sessions across this tier. Players are capable but not invincible, and the stakes feel real. Slow down here intentionally.' },
            { label: 'Tier 3 (Levels 5\u20137)', value: 'Power increases rapidly. Budget 8\u201312 sessions to give story arcs time to breathe before the final tier. Characters are reshaping the world \u2014 let that unfold.' },
            { label: 'Tier 4 (Levels 8\u201310)', value: 'Reserve for the endgame. These levels should accompany the campaign\u2019s climax. Don\u2019t rush here unless the campaign is wrapping up.' },
          ]
        },
        {
          heading: 'Signs of Levelling Too Fast',
          kind: 'pairs',
          rows: [
            { label: 'Encounters feel irrelevant',  value: 'If the party is routinely burning through encounters without resource pressure, they\'re probably a tier ahead of the content. Hold a level until the story catches up.' },
            { label: 'Player arcs feel rushed',      value: 'Personal backstory moments are some of the best XP triggers \u2014 if you\'re awarding that XP every session, the arcs don\'t have time to breathe.' },
            { label: 'No tension at story climaxes', value: 'If a major villain dies in round 1, they were under-tiered. Consider whether a level-up let the party leapfrog the threat you built.' },
            { label: 'The fix',                     value: 'Be conservative with the \u201cstory milestone\u201d bonus XP. The four standard conditions are enough for most sessions. Reserve the bonus for genuinely exceptional moments.' },
          ]
        },
        {
          heading: 'Signs of Levelling Too Slow',
          kind: 'pairs',
          rows: [
            { label: 'Players feel stagnant',        value: 'If players are asking "when do we level up?" more than once per arc, the pacing has drifted too slow. Check whether story threads are actually resolving.' },
            { label: 'Enemies feel unfair',          value: 'If the party hits a wall of difficulty but the story logic says they should be stronger, award a level. Daggerheart is built for momentum, not attrition.' },
            { label: 'Same-tier content is trivial', value: 'If matching-tier adversaries feel effortless, the party has effectively outgrown the tier through experience. Consider a level bump rather than inflation of adversary numbers.' },
          ]
        }
      ]
    },

    /* ── Campaign Context: Endale ─────────────────────────────────────────── */
    {
      type: 'reference',
      title: 'Campaign Context \u2014 Endale',
      role: 'Current party tier \u00b7 level-up criteria for this campaign \u00b7 GM notes',
      headerClass: 'h-feather',
      sections: [
        {
          heading: 'Current Party Status',
          kind: 'pairs',
          rows: [
            { label: 'Current level',   value: 'Update as campaign progresses.' },
            { label: 'Current tier',    value: 'Update as campaign progresses.' },
            { label: 'XP this level',   value: 'Track here between sessions.' },
            { label: 'Next level at',   value: 'See XP threshold table above.' },
            { label: 'Sessions played', value: 'Update as campaign progresses.' },
          ]
        },
        {
          heading: 'Level-Up Criteria for This Campaign',
          kind: 'note',
          body: 'Use this section to set your personal pacing expectations. For Endale, consider: the campaign is rooted in Fonn and its immediate surroundings \u2014 a Tier 2 to early Tier 3 story. Reaching Tier 4 should feel like an earned conclusion, not a mid-campaign power plateau. Aim for roughly 2\u20133 sessions per level during Tier 2, and 3\u20134 sessions per level entering Tier 3. Hold Tier 4 for the final arc.'
        }
      ]
    },

  ]
});
