Endale.registerPage('characters/applecrumb-faction', {
  title: 'Applecrumb Faction',
  subtitle: 'Biggus\u2019s operation \u00b7 Hostile branch of the Applecrumb family.',
  groups: [
    {
      type: 'cards',
      headerClass: 'h-hostile',
      entries: [
        {
          name: 'Biggus Applecrumb',
          role: 'Mousekin \u00b7 Faction Commander',
          rank: ['Applecrumb Faction', 'Hostile'],
          fields: [
            { label: 'Appearance',  value: 'Large for a mousekin, broad, scarred jaw. Worn signet ring \u2014 never removes it. Three-line circle brand matches Scratchen\u2019s wrist brand. Connection older than this job.' },
            { label: 'Motivation',  value: 'Started as a genuine believer in Fonn\u2019s expansion. Now mostly just wants to win. The ideology is in his mouth but no longer in his eyes.' },
            { label: 'Stats',       value: 'HP 16 \u00b7 Stress 8 \u00b7 Armor 3 \u00b7 Attack +4 \u00b7 Evasion 12' },
            { label: 'Combat',      value: 'Veteran\u2019s Blade (1d10+4, pushes Far on 17+). Command Strike (1d8+4, directs one ally free attack). Weight of Authority (1 Fear, Presence 14 or mark Stress and lose action).' },
            { label: 'Traits',      value: 'Scar Tissue (once/scene \u2014 0 HP becomes 1 HP instead). Reads the Room (always acts in first round). Professional Floor (flees \u2014 doesn\u2019t die for Biggus\u2019s cause).' },
          ],
          gmNote: 'Unfinished letter on war room desk: \u201cThe staff is here. Will test on the lower stock tonight. If it works the way the old man says we won\u2019t need the herb shipments anymore.\u201d Also: small key with a pink feather in the war room drawer \u2014 too small for any door in the manor.',
          tags: [
            { label: 'Faction commander',    cls: 'tag-dark' },
            { label: 'Staff \u2014 test tonight', cls: 'tag-red' },
            { label: 'Signet ring mystery',  cls: 'tag-mid' },
          ]
        },
        {
          name: 'Rina Applecrumb',
          role: 'Mousekin \u00b7 Enforcer \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Faction', 'Hostile'],
          fields: [
            { label: 'Appearance',  value: 'Sharp-eyed, economical. Two short blades worn low, not displayed.' },
            { label: 'Personality', value: 'Cold, committed, efficient. Biggus\u2019s vision is the only one she has ever believed in and she stopped questioning it.' },
            { label: 'On Sable',    value: 'Contempt, not hatred. He\u2019s soft. Not personal \u2014 just means he\u2019s in the wrong place.' },
            { label: 'Stats',       value: 'HP 9 \u00b7 Stress 5 \u00b7 Armor 2 \u00b7 Attack +3 \u00b7 Evasion 13' },
            { label: 'Combat',      value: 'Double Cross (1d6+3, both blades on 15+). Feint (setup move, Vulnerable on failed Instinct 13). Cover Drew (automatic reaction, intercepts half damage to Drew).' },
            { label: 'Traits',      value: 'Cannot be Frightened or made to hesitate. Will not surrender or break.' },
          ],
          tags: [
            { label: 'True believer',  cls: 'tag-dark' },
            { label: 'Protects Drew',  cls: 'tag-mid' },
          ]
        },
        {
          name: 'Drew Applecrumb',
          role: 'Mousekin \u00b7 Reluctant Operative \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Faction', 'On the fence'],
          fields: [
            { label: 'Appearance',      value: 'Looks like Sable around the eyes. Hasn\u2019t slept well in weeks.' },
            { label: 'Personality',     value: 'Quiet, avoidant. Loyal to Rina more than to Biggus. Terrified he has gone too far to be forgiven. Secretly wants out.' },
            { label: 'On Sable',        value: 'Genuine guilt. Sable is the one person whose opinion of him he actually cares about.' },
            { label: 'Stats',           value: 'HP 7 \u00b7 Stress 6 \u00b7 Armor 1 \u00b7 Attack +2 \u00b7 Evasion 13' },
            { label: 'Combat',          value: 'Short Blade (1d6+2, pulls strikes vs Sable). Smoke & Run (escape, once/scene).' },
            { label: 'Breaking Point',  value: 'Sable speaks directly \u2014 Presence 11 or hesitates (loses action). Crit fail: drops weapon. Below 3 HP with Rina occupied \u2014 surrenders to Sable only.' },
            { label: 'Knows',           value: 'Staff location and Biggus\u2019s intentions for it. Fear (2): throws the staff or its location \u2014 just away from himself. Done carrying it.' },
          ],
          tags: [
            { label: 'Wants out',           cls: 'tag-mid' },
            { label: 'Knows staff location', cls: 'tag-gold' },
            { label: 'Sable pressure point', cls: 'tag-blue' },
          ]
        },
        {
          name: 'Nessa Applecrumb',
          role: 'Mousekin \u00b7 Cousin \u00b7 Tactical Organiser',
          rank: ['Applecrumb Faction', 'Hostile'],
          fields: [
            { label: 'Personality', value: 'Sharp, ambitious, contemptuous. Believes Fonn\u2019s custodian families have been wasting their position for generations.' },
            { label: 'On Sable',    value: 'Specifically and vocally resents that Sable still has Fenlow\u2019s protection when she considers him useless. Personal enough to cloud her judgement about him.' },
            { label: 'Role',        value: 'Organisational and tactical, not frontline. Strategically invested in seeing the old order replaced.' },
            { label: 'Stats',       value: 'HP 7 \u00b7 Armor 1 \u00b7 Attack +2 \u00b7 Evasion 13' },
          ],
          tags: [
            { label: 'Hostile',              cls: 'tag-red' },
            { label: 'Tactical coordinator', cls: 'tag-mid' },
          ]
        },
      ]
    },
    {
      type: 'roster',
      title: 'Berry, Berry & Clide',
      role: 'Mousekin \u00b7 Apple Cider attackers \u00b7 Lying low after failure',
      rank: ['Roster', 'Post Apple Cider'],
      headerClass: 'h-hostile',
      sections: [
        {
          heading: 'Apple Cider Attackers',
          columns: ['Name', 'Relation', 'Stats', 'Status & Hook'],
          rows: [
            { name: 'Berry (loud)',  badge: { label: 'hostile', cls: 'badge-hostile' }, cells: ['Cousin', 'HP 5 \u00b7 Armor 1 \u00b7 Atk +1', 'Was at Apple Cider. Failed. All bravado, follows Nessa\u2019s lead without independent thought.'] },
            { name: 'Berry (quiet)', badge: { label: 'hostile', cls: 'badge-hostile' }, cells: ['Cousin', 'HP 5 \u00b7 Armor 1 \u00b7 Atk +1', 'Was at Apple Cider. Failed. Privately unsure it\u2019s worth it anymore but has no idea how to say that.'] },
            { name: 'Clide',         badge: { label: 'hostile', cls: 'badge-hostile' }, cells: ['Uncle',  'HP 8 \u00b7 Armor 2 \u00b7 Atk +2', 'Was at Apple Cider. Failed. Early Biggus loyalist. Failure stings him most \u2014 he knew better.'] },
          ]
        }
      ]
    }
  ]
});
