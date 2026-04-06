Endale.registerPage('characters/player-families', {
  title: 'Player Families',
  subtitle: 'Lumigold · Lagraze (Eweram\'s adoptive family) · Goatfolk Ranger Families of Fonn',
  groups: [

    /* ════════════════════════════════════════════
       LUMIGOLD FAMILY — NORA'S KIN
       Seers and secretkeepers of Fonn.
       Catfolk. Use catscratch braille internally.
    ════════════════════════════════════════════ */
    {
      type: 'cards',
      headerClass: 'h-guard',
      entries: [

        /* ── Kashbal Lumigold ───────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Kashbal Lumigold',
          role: 'Catfolk \u00b7 Father \u00b7 Lumigold Patriarch',
          rank: ['Lumigold Family', 'Ally \u00b7 Power 4'],
          fields: [
            { label: 'Appearance',
              value: 'Tall and still, greying at the muzzle. Blind like Nora \u2014 the Lumigold sight runs in the line. Moves through familiar spaces with complete confidence; in unfamiliar ones, with deliberate, unhurried care.' },
            { label: 'Traits',
              value: 'AGI +1 \u00b7 STR +1 \u00b7 FIN +1 \u00b7 INS +4 \u00b7 PRE +3 \u00b7 KNO +4' },
            { label: 'Role in Fonn',
              value: 'Keeper of the Lumigold archive \u2014 the family\u2019s collected observations on Fonn\u2019s custodian families, the compact, and the tower. The archive is in catscratch braille. No one outside the family has read it.' },
            { label: 'Personality',
              value: 'Firm, fair, and precise. Does not waste words. His approval is not given easily, which means it means something when it is. Not cold \u2014 the warmth is just expressed through standards rather than softness.' },
            { label: 'On Nora',
              value: 'Sent her to learn what the archive cannot contain: what people do when they think no one is watching. Concerned but will not say so. The dream message worries him more than he has told her.' },
          ],
          gmNote: 'The Lumigold archive may contain references to Ossian\u2019s earlier presence in Fonn, the original compact terms, or earlier appearances of the Endless One. Kashbal will not share it casually \u2014 but if Nora brings him something that matches a gap he knows exists, he will fill it.',
          tags: [
            { label: 'Archive keeper',   cls: 'tag-blue' },
            { label: 'Knows about dream?', cls: 'tag-purple' },
          ]
        },

        /* ── Noele Lumigold ─────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Noele Lumigold',
          role: 'Catfolk \u00b7 Mother \u00b7 Lumigold Family',
          rank: ['Lumigold Family', 'Ally \u00b7 Power 3'],
          fields: [
            { label: 'Appearance',
              value: 'Sighted, unlike Kashbal and Nora \u2014 the Lumigold blindness is patrilineal. Warmer in expression than her husband. Grey streaks in dark fur. Moves with the quiet efficiency of someone who has managed a household full of blind people for twenty years.' },
            { label: 'Personality',
              value: 'The one who translates Kashbal\u2019s standards into something the children could actually understand growing up. Genuinely proud of Nora in a way Kashbal is too careful to express directly. Will say so.' },
            { label: 'Hook',
              value: 'Has been having her own dreams \u2014 not the same as Nora\u2019s, but adjacent. She has not told Kashbal. She is not sure if they are meaningful or if she is simply a mother who worries.' },
          ],
          tags: [
            { label: 'Own dreams?', cls: 'tag-purple' },
            { label: 'Ally', cls: 'tag-green' },
          ]
        },

        /* ── Mika Lumigold ──────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Mika Lumigold',
          role: 'Catfolk \u00b7 Younger Brother \u00b7 Nora\u2019s sibling',
          rank: ['Lumigold Family', 'Ally \u00b7 Power 2'],
          fields: [
            { label: 'Appearance',
              value: 'Sighted, energetic, perpetually doing something with his hands. Still learning catscratch. Has Noele\u2019s warmth rather than Kashbal\u2019s precision.' },
            { label: 'Personality',
              value: 'Admires Nora in the specific way of a younger sibling who has watched someone do something hard and made it look natural. Eager to be useful. Not yet tested in any real way.' },
            { label: 'Hook',
              value: 'Has been practising navigating blind \u2014 closing his eyes and moving through the house by memory \u2014 because he wants to understand what Nora experiences. This is both sweet and slightly alarming to Kashbal.' },
          ],
          tags: [{ label: 'Uncomplicated ally', cls: 'tag-green' }]
        },

        /* ── ? Lumigold (The Missing Sister) ───────────────────── */
        {
          cardType: 'character',
          name: '\u2014 Lumigold',
          role: 'Catfolk \u00b7 Sister \u00b7 Whereabouts unknown',
          rank: ['Lumigold Family', 'Unknown \u00b7 Power \u2014'],
          fields: [
            { label: 'What is known',
              value: 'Sighted. Fell in love with someone Kashbal did not approve of. Left the Lumigold line deliberately and completely \u2014 no contact since. The family does not speak her name in Kashbal\u2019s presence.' },
            { label: 'What is not known',
              value: 'Where she went. Who she married. Whether she had children. Whether she is alive. Whether she took any Lumigold knowledge with her when she left.' },
            { label: 'Hook',
              value: 'Noele knows more than she has said. The missing sister\u2019s departure is connected, in Noele\u2019s mind, to her own undisclosed dreams. This is a thread that goes somewhere.' },
          ],
          gmNote: 'The unnamed sister is a slow-burn mystery. She may have left because she knew something. She may be encountered obliquely \u2014 a child, a name on a door, a style of catscratch in an unexpected place. Do not resolve quickly.',
          tags: [
            { label: 'Missing',          cls: 'tag-dark' },
            { label: 'Deliberate break', cls: 'tag-mid' },
            { label: 'Noele knows more', cls: 'tag-purple' },
          ]
        },

      ]
    },

    /* ════════════════════════════════════════════
       LAGRAZE FAMILY — EWERAM'S ADOPTIVE FAMILY
       Goatfolk druids. Warden line.
       Eweram kept the Ewegard name but is family.
    ════════════════════════════════════════════ */
    {
      type: 'cards',
      headerClass: 'h-feather',
      entries: [

        /* ── Renhart Lagraze ────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Renhart Lagraze',
          role: 'Goatfolk \u00b7 Spellaxe Druid \u00b7 Adoptive Father',
          rank: ['Lagraze Family', 'Ally \u00b7 Power 6'],
          fields: [
            { label: 'Appearance',
              value: 'Broad-shouldered, greying horns worn down to stubs from years of use. Carries a spellaxe with the casual ease of a tool, not a weapon. Looks like someone who has been responsible for difficult things for a long time and accepted it.' },
            { label: 'Traits',
              value: 'AGI +1 \u00b7 STR +3 \u00b7 FIN +1 \u00b7 INS +3 \u00b7 PRE +3 \u00b7 KNO +3' },
            { label: 'Defenses',
              value: 'HP 18 \u00b7 Thresholds 7 / 12 \u00b7 Stress 7 \u00b7 Evasion 11 \u00b7 Armor 3 \u00b7 Power 6' },
            { label: 'Personality',
              value: 'Firm but genuinely fair \u2014 the distinction matters to him. Has high standards and says exactly what they are, which means Eweram always knew where he stood. Not given to sentiment, but his actions have been consistently kind for twenty years.' },
            { label: 'Warden Role',
              value: 'Long-standing guardian of the forest boundary. Has noticed the Veiled Forest shifting for longer than Corvel has. Has not publicised his observations because he is still determining what they mean. Will share with Eweram if directly asked.' },
            { label: 'On Gardener leaving',
              value: 'Has not discussed the reasons. The subject closes something in his expression that does not usually close. He will say Gardener made a choice and leave it there.' },
          ],
          gmNote: 'Renhart\u2019s observations on the Veiled Forest may predate Corvel\u2019s by years. He is also the most likely family member to know something relevant about the Guardian Stag \u2014 he has encountered tracks, signs, or precedents that the younger rangers haven\u2019t. His firmness is a wall only for strangers; Eweram can get through it.',
          tags: [
            { label: 'Warden',           cls: 'tag-green' },
            { label: 'Forest intel',     cls: 'tag-blue' },
            { label: 'Gardener mystery', cls: 'tag-mid' },
          ]
        },

        /* ── Ovissa Lagraze ─────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Ovissa Lagraze',
          role: 'Goatfolk \u00b7 Spellbow Druid \u00b7 Sister',
          rank: ['Lagraze Family', 'Ally \u00b7 Power 5'],
          fields: [
            { label: 'Appearance',
              value: 'Lighter build than Renhart, quick on her feet. Keeps her bow strung even indoors out of habit. Short horns, practical clothing, perpetual look of mild amusement.' },
            { label: 'Traits',
              value: 'AGI +3 \u00b7 STR +1 \u00b7 FIN +3 \u00b7 INS +2 \u00b7 PRE +2 \u00b7 KNO +2' },
            { label: 'Defenses',
              value: 'HP 12 \u00b7 Thresholds 5 / 8 \u00b7 Stress 6 \u00b7 Evasion 13 \u00b7 Armor 2 \u00b7 Power 5' },
            { label: 'Personality',
              value: 'Good-natured and a friendly teaser \u2014 slow to anger and quick to laugh, which makes the moments she is actually serious land harder than expected. Has been Eweram\u2019s most consistent defender in the family and doesn\u2019t consider it a favour.' },
            { label: 'On Gardener',
              value: 'Misses him. Doesn\u2019t think he did whatever he\u2019s being assumed to have done. Hasn\u2019t said this to Renhart. Would say it to Eweram.' },
          ],
          tags: [
            { label: 'Eweram\u2019s defender',  cls: 'tag-green' },
            { label: 'Gardener thread',     cls: 'tag-mid' },
          ]
        },

        /* ── Gardener Lagraze ───────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Gardener Lagraze',
          role: 'Goatfolk \u00b7 Spellsword Druid \u00b7 Brother \u00b7 Absent',
          rank: ['Lagraze Family', 'Unknown \u00b7 Power 6'],
          fields: [
            { label: 'Appearance',
              value: 'Strong build, Renhart\u2019s shoulders. Hot-headed in a way that doesn\u2019t show until it does \u2014 went from composed to certain very fast, without much middle.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR +3 \u00b7 FIN +3 \u00b7 INS +2 \u00b7 PRE +2 \u00b7 KNO +1' },
            { label: 'Defenses',
              value: 'HP 16 \u00b7 Thresholds 6 / 11 \u00b7 Stress 5 \u00b7 Evasion 12 \u00b7 Armor 3 \u00b7 Power 6 \u00b7 Current location: unknown' },
            { label: 'Why he left',
              value: 'Reasons unknown to Eweram. Renhart will not say. Ovissa suspects it involved something Gardener found in the forest, or something Renhart asked him to do that he refused \u2014 or did, and couldn\u2019t live with. Both versions have evidence.' },
            { label: 'The bully thread',
              value: 'Was hard on Eweram growing up \u2014 the kind of hard that came from measuring someone against himself and finding the comparison unsatisfying. Not malicious. Just relentless. Eweram may not have fully processed this.' },
          ],
          gmNote: 'Gardener\u2019s departure is a slow-burn mystery. He has significant combat ability and druidic training. He may be encountered in the Veiled Forest, in a distant settlement, or as an adversary. His relationship with Eweram is unresolved in both directions \u2014 let it stay unresolved until it can land properly.',
          tags: [
            { label: 'Left Fonn',        cls: 'tag-dark' },
            { label: 'Forest connection?', cls: 'tag-purple' },
            { label: 'Eweram \u2014 unresolved', cls: 'tag-mid' },
          ]
        },

      ]
    },

    /* ════════════════════════════════════════════
       GOATFOLK RANGER FAMILIES OF FONN
       Smaller families in the ranger community.
       Goatfolk tradition: patrol routes are inherited.
    ════════════════════════════════════════════ */
    {
      type: 'cards',
      headerClass: 'h-town',
      entries: [

        /* ── The Bramblecroft Family ────────────────────────────── */
        {
          cardType: 'character',
          name: 'Bramblecroft Family',
          role: 'Goatfolk \u00b7 Ranger Family \u00b7 Western Treeline',
          rank: ['Fonn Rangers', 'Civilian \u00b7 Power 2\u20133'],
          fields: [
            { label: 'Family Overview',
              value: 'A small family of three \u2014 Erren (father), Sola (mother), and their teenage daughter Wren. Run the western treeline patrol that borders the lower Veiled Forest edge. Older routes; they have been doing this longer than the Featherhides have been at the inn.' },
            { label: 'Erren Bramblecroft',
              value: 'Father. Methodical, thorough, deeply uncomfortable with the current forest anomalies because his methodology has no category for them. Has been re-walking the same routes to check his own observations. Power 3.' },
            { label: 'Sola Bramblecroft',
              value: 'Mother. The practical one. Has already started quietly stockpiling supplies at the patrol waypoints \u201cjust in case.\u201d Has not told Erren the full extent. Power 2.' },
            { label: 'Wren Bramblecroft',
              value: 'Daughter, teenager. Has the family patrol memorised and wants to run it solo before she is officially cleared to do so. Has already done it twice. Power 2.' },
            { label: 'Hook',
              value: 'Erren found something on his last route that he took a rubbing of and has been staring at for three days. He has not reported it because he cannot explain what it means. The rubbing is of a mark that looks like accelerated root growth forming a deliberate shape.' },
          ],
          gmNote: 'The Bramblecrофts are reliable, understated, and genuinely competent. Erren\u2019s rubbing could open a Veiled Forest investigation thread. Wren is the kind of teenager who will get herself into something serious while trying to prove a point \u2014 plan accordingly.',
          tags: [
            { label: 'Western patrol',   cls: 'tag-green' },
            { label: 'Erren\u2019s rubbing',  cls: 'tag-purple' },
          ]
        },

        /* ── The Greyvale Family ────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Greyvale Family',
          role: 'Goatfolk \u00b7 Ranger Family \u00b7 Northern Routes',
          rank: ['Fonn Rangers', 'Civilian \u00b7 Power 2\u20133'],
          fields: [
            { label: 'Family Overview',
              value: 'Two brothers \u2014 Tomas and Fen \u2014 who inherited the northern patrol from their parents and have run it together for fifteen years. No wives, no children; the patrol is the family. Respected and slightly eccentric.' },
            { label: 'Tomas Greyvale',
              value: 'Older brother. More cautious, reads signs carefully, speaks in short sentences. Gets along well with Renhart Lagraze \u2014 they share an old-school methodological rigour. Power 3.' },
            { label: 'Fen Greyvale',
              value: 'Younger brother. More talkative, more instinctive. Has been pushing north further than the patrol technically covers because something has been pulling his attention that direction. Power 3.' },
            { label: 'Hook',
              value: 'Fen has made contact with something at the edge of the northern forest boundary \u2014 not hostile, not clearly present, but responsive. He has been leaving small offerings for two weeks. Tomas thinks he has lost his mind. Fen is more certain than he has been about anything in years.' },
          ],
          gmNote: 'The Greyv ales\u2019 northern contact is intentionally open \u2014 it could be the Guardian Stag, a spirit, a trapped entity, or something from before the magic returned. Fen is not wrong. Whatever is responding to him is aware of Eweram\u2019s existence through proximity to the family.',
          tags: [
            { label: 'Northern patrol',        cls: 'tag-green' },
            { label: 'Fen\u2019s northern contact', cls: 'tag-purple' },
          ]
        },

      ]
    },

    /* ════════════════════════════════════════════
       QUICK REFERENCE
    ════════════════════════════════════════════ */
    {
      type: 'roster',
      title: 'Player Families \u2014 Quick Reference',
      role: 'At-a-glance for all three PC families and the ranger community',
      rank: ['Roster', 'Family connections'],
      headerClass: 'h-town',
      sections: [
        {
          heading: 'Lumigold family',
          columns: ['Name', 'Relation to Nora', 'Key detail'],
          rows: [
            { name: 'Kashbal', badge: { label: 'ally', cls: 'badge-friendly' }, cells: ['Father', 'Archive keeper. Firm and fair. Knows something about the dream.'] },
            { name: 'Noele',   badge: { label: 'ally', cls: 'badge-friendly' }, cells: ['Mother', 'Sighted. Having her own dreams. Hasn\u2019t told Kashbal.'] },
            { name: 'Mika',    badge: { label: 'ally', cls: 'badge-friendly' }, cells: ['Younger brother', 'Sighted. Practising blind navigation to understand Nora.'] },
            { name: '\u2014',  badge: { label: 'unknown', cls: 'badge-unknown' }, cells: ['Sister (missing)', 'Left the family deliberately. Noele knows more than she\u2019s said.'] },
          ]
        },
        {
          heading: 'Lagraze family (Eweram\u2019s adoptive)',
          columns: ['Name', 'Relation to Eweram', 'Key detail'],
          rows: [
            { name: 'Renhart',  badge: { label: 'ally',    cls: 'badge-friendly' }, cells: ['Adoptive father', 'Spellaxe druid. Warden. Forest observations predate Corvel\u2019s.'] },
            { name: 'Ovissa',   badge: { label: 'ally',    cls: 'badge-friendly' }, cells: ['Sister',          'Spellbow druid. Eweram\u2019s defender. Misses Gardener.'] },
            { name: 'Gardener', badge: { label: 'unknown', cls: 'badge-unknown'  }, cells: ['Brother (absent)', 'Spellsword druid. Hot-headed. Left Fonn for unknown reasons.'] },
          ]
        },
        {
          heading: 'Goatfolk ranger families',
          columns: ['Family', 'Patrol', 'Active thread'],
          rows: [
            { name: 'Bramblecrофt', badge: { label: 'civilian', cls: 'badge-neutral' }, cells: ['Western treeline', 'Erren found a root-growth mark and hasn\u2019t reported it.'] },
            { name: 'Greyvale',     badge: { label: 'civilian', cls: 'badge-neutral' }, cells: ['Northern routes',  'Fen is making contact with something at the boundary.'] },
          ]
        }
      ]
    }

  ]
});
