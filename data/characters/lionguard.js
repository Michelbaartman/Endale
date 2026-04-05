Endale.registerPage('characters/lionguard', {
  title: 'The Lionguard',
  subtitle: 'Pipkin\u2019s guard detail \u00b7 Currently at the Crow\u2019s Nest inn.',
  groups: [
    {
      type: 'cards',
      headerClass: 'h-apple',
      entries: [

        /* ── Pipkin Pipermane ─────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Pipkin Pipermane',
          role: 'Lionkin \u00b7 Exiled Prince',
          rank: ['Lionguard', 'Protected Asset'],
          fields: [
            { label: 'Appearance',
              value: 'Young lion with a large gold mane he keeps slightly too well-groomed for the situation. Stands too straight when he remembers to. Court-trained hands that have now actually thrown a punch.' },
            { label: 'Traits',
              value: 'AGI +1 \u00b7 STR +2 \u00b7 FIN +3 \u00b7 INS +1 \u00b7 PRE +3 \u00b7 KNO +0' },
            { label: 'Defenses',
              value: 'HP 12 \u00b7 Thresholds 5 / 8 \u00b7 Stress 6 \u00b7 Evasion 12 \u00b7 Armor 2 \u00b7 Power 5' },
            { label: 'Combat',
              value: 'Court Blade \u2014 Finesse +3, 1d8+3 physical, Melee.\nBarfight Gambit \u2014 Finesse or Strength +3/+2, 1d6+2 physical; uses the environment (bottle, table edge, door frame). On hit, target has disadvantage on their next roll.\nUnarmed Strike \u2014 Strength +2, 1d4+2; usable when disarmed or for a surprise headbutt.' },
            { label: 'Abilities',
              value: 'Royal Bearing \u2014 Presence DC 13; enemies within Close hesitate and lose their next action. Works once per enemy per scene \u2014 after that, they\u2019ve seen it.\nPrince\u2019s Resolve \u2014 Once per session, when something threatens his people, clear 2 Stress and gain +2 to all rolls until the threat is resolved or 3 actions pass.' },
            { label: 'Personality',
              value: 'Default: easy, warm, self-deprecating, asks questions he actually wants answered. Court mode activates in two seconds \u2014 posture shifts, register shifts, the room goes formal. Uses it deliberately. Even his guards aren\u2019t fully used to it.' },
            { label: 'Motivation',
              value: 'Wants to understand what happened to his father. Not reclaim the throne yet \u2014 just know if the man he loved is still there.' },
            { label: 'Lost Item',
              value: 'Magic heirloom cane \u2014 missing, taken before or during exile. Required to unlock dormant abilities. Last known location: somewhere in Fonn.' },
          ],
          quote: '\u201cI am not asking you to bow. I am asking you to step aside.\u201d',
          tags: [
            { label: 'Exiled prince',   cls: 'tag-gold' },
            { label: 'Cane missing',    cls: 'tag-mid' },
            { label: 'Mad king thread', cls: 'tag-blue' },
          ]
        },

        /* ── Greymane ─────────────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Greymane',
          role: 'Lionkin \u00b7 Advisor / Protector',
          rank: ['Lionguard', 'Commander'],
          fields: [
            { label: 'Appearance',
              value: 'Iron-grey mane, broad shoulders. Battle-scarred jaw. Looks like he used to be the muscle before he became the mind \u2014 he was both, and still is.' },
            { label: 'Traits',
              value: 'AGI +1 \u00b7 STR +4 \u00b7 FIN +2 \u00b7 INS +3 \u00b7 PRE +2 \u00b7 KNO +2' },
            { label: 'Defenses',
              value: 'HP 18 \u00b7 Thresholds 7 / 12 \u00b7 Stress 6 \u00b7 Evasion 13 \u00b7 Armor 4 \u00b7 Power 6' },
            { label: 'Combat',
              value: 'Veteran\u2019s Sword \u2014 Strength +4, 1d10+4 physical, Melee. On total 16+, target is Vulnerable.\nLight Ward \u2014 Knowledge +2, 1d6+2 radiant, Far range. On hit, target is Blinded for one action.\nSeal the Room \u2014 Cost: 1 Fear. Greymane anchors a threshold; anyone attempting to pass makes Strength DC 15 or is Restrained.' },
            { label: 'Abilities',
              value: 'Cover \u2014 Reaction. Intercepts any hit targeting Pipkin within Melee range; Greymane takes the full damage instead.\nRestraint Broken \u2014 If Pipkin is downed and the party is losing: Greymane stops holding back. Radiant burst \u2014 2d8+2 to all Close enemies; all Close allies clear 2 HP. Usable once per scene. He does not discuss it afterwards.' },
            { label: 'Personality',
              value: 'Warm with Pipkin, measured with everyone else. Treats Pipkin like a younger brother he has to keep alive despite himself. Maps every room. Never sits with his back to a door.' },
          ],
          gmNote: 'Greymane\u2019s name appears on Biggus\u2019s war board with a separate colour string connecting to an outside location. Has pre-exile knowledge of the mage council. The light magic is not something he learned recently \u2014 origin unresolved even for the GM.',
          quote: '\u201cStay behind me. I didn\u2019t keep you alive this long to lose you in a village.\u201d',
          tags: [
            { label: 'Light mage',           cls: 'tag-gold' },
            { label: 'War board mystery',    cls: 'tag-purple' },
            { label: 'Pipkin\u2019s protector',   cls: 'tag-green' },
          ]
        },

        /* ── Kip ──────────────────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Kip',
          role: 'Lionkin \u00b7 Guard',
          rank: ['Lionguard', 'Greymane\u2019s Ward'],
          fields: [
            { label: 'Appearance',
              value: 'Younger lion, lean and dense. Short mane tied back. Armour fitted by Greymane \u2014 too well-fitted for a guard of his rank.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR +3 \u00b7 FIN +1 \u00b7 INS +3 \u00b7 PRE +0 \u00b7 KNO +1' },
            { label: 'Defenses',
              value: 'HP 13 \u00b7 Thresholds 5 / 8 \u00b7 Stress 5 \u00b7 Evasion 13 \u00b7 Armor 3 \u00b7 Power 5' },
            { label: 'Combat',
              value: 'Short Spear \u2014 Strength +3, 1d8+3 physical, Melee\u2013Far range.\nShield Brace \u2014 When Kip takes a defensive stance, all allies in Melee range gain +2 Evasion until he moves.\nWatch Your Left \u2014 Reaction. One ally gains +2 Evasion against one incoming hit. Once per round.' },
            { label: 'Abilities',
              value: 'Outcast\u2019s Read \u2014 Advantage on all Instinct rolls to detect deception, social tension, or unspoken threat. He says what he notices once. He does not repeat it if ignored.' },
            { label: 'Personality',
              value: 'Structural stammer \u2014 not nerves. Strips language to essentials. Short direct phrases. Rarely wrong. First to say what everyone else is dancing around.' },
            { label: 'Background',
              value: 'Outcast taken in by Greymane. Loyalty is absolute and unsentimental \u2014 not because he was told to give it, but because Greymane earned it.' },
          ],
          quote: '\u201cTold you.\u201d',
          tags: [
            { label: 'Greymane\u2019s ward', cls: 'tag-mid' },
            { label: 'High Instinct',   cls: 'tag-blue' },
          ]
        },

        /* ── Aldous ───────────────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Aldous',
          role: 'Lionkin \u00b7 Guard / Amateur Alchemist',
          rank: ['Lionguard', 'Guard'],
          fields: [
            { label: 'Appearance',
              value: 'Medium build, perpetually distracted expression, faint smell of sulphur and something floral. Leather satchel on his belt that clinks when he walks.' },
            { label: 'Traits',
              value: 'AGI +1 \u00b7 STR +1 \u00b7 FIN +2 \u00b7 INS +2 \u00b7 PRE +2 \u00b7 KNO +3' },
            { label: 'Defenses',
              value: 'HP 9 \u00b7 Thresholds 4 / 6 \u00b7 Stress 7 \u00b7 Evasion 11 \u00b7 Armor 2 \u00b7 Power 4' },
            { label: 'Combat',
              value: 'Standard Blade \u2014 Finesse +2, 1d6+2 physical, Melee.\nField Vial \u2014 Action, Far range. Roll d4: 1 = Flash blind (target has disadvantage on next action); 2 = Smoke screen (Close area becomes obscured, lasts one round); 3 = Adhesive (target Restrained, Strength DC 12 to break); 4 = Accidental healing potion (nearest ally clears 1d4+2 HP \u2014 Aldous apologises).' },
            { label: 'Abilities',
              value: 'Field Medic \u2014 Once per short rest. Stabilise a downed ally to 1 HP. Full action, Melee range.\nCamp Herbalism \u2014 During any rest with access to materials, Knowledge DC 11 to identify and prepare one useful compound. Effect and availability at GM discretion.' },
            { label: 'Personality',
              value: 'Good soldier who is always also thinking about potions. Since magic returned: quietly ecstatic. Collecting samples around Fonn. Senne Featherhide now brings him herbs from the market.' },
          ],
          gmNote: 'Will not leave Nora alone once he learns she is a mage \u2014 genuinely fascinated, not threatening. The Senne herb connection gives him a reason to be anywhere useful.',
          tags: [
            { label: 'Alchemist',  cls: 'tag-blue' },
            { label: 'Nora hook',  cls: 'tag-purple' },
            { label: 'Senne ally', cls: 'tag-green' },
          ]
        },

        /* ── Varro ────────────────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Varro',
          role: 'Lionkin \u00b7 Senior Guard',
          rank: ['Lionguard', 'Senior Guard'],
          fields: [
            { label: 'Appearance',
              value: 'Golden lion, weathered. The kind of face that has seen enough postings to stop being surprised by anything. Armour well-maintained out of professionalism, not pride.' },
            { label: 'Traits',
              value: 'AGI +1 \u00b7 STR +2 \u00b7 FIN +2 \u00b7 INS +3 \u00b7 PRE +1 \u00b7 KNO +2' },
            { label: 'Defenses',
              value: 'HP 9 \u00b7 Thresholds 4 / 6 \u00b7 Stress 5 \u00b7 Evasion 11 \u00b7 Armor 2 \u00b7 Power 4' },
            { label: 'Combat',
              value: 'Guard\u2019s Blade \u2014 Strength +2, 1d6+2 physical, Melee.\nVeteran\u2019s Scan \u2014 Advantage on Instinct to detect ambushes, unusual behaviour, or incoming threat.\nSteady Formation \u2014 Passive. While adjacent to at least one ally, Varro and that ally both gain +1 to attack rolls.' },
            { label: 'Hook',
              value: 'Hasn\u2019t eaten in two days. Not illness, not grief \u2014 something else is wrong, and it has nothing to do with the mission.' },
          ],
          tags: [
            { label: 'Senior guard',    cls: 'tag-mid' },
            { label: 'Something wrong', cls: 'tag-gold' },
          ]
        },

        /* ── Maret ────────────────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Maret',
          role: 'Lionkin \u00b7 Guard',
          rank: ['Lionguard', 'Guard'],
          fields: [
            { label: 'Appearance',
              value: 'Dark-maned lioness. Watchful bearing, economical movement. Never touches anything unnecessarily.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR +2 \u00b7 FIN +3 \u00b7 INS +2 \u00b7 PRE +1 \u00b7 KNO +1' },
            { label: 'Defenses',
              value: 'HP 8 \u00b7 Thresholds 3 / 5 \u00b7 Stress 5 \u00b7 Evasion 12 \u00b7 Armor 2 \u00b7 Power 4' },
            { label: 'Combat',
              value: 'Guard\u2019s Blade \u2014 Finesse +3, 1d6+3 physical, Melee.\nWatchful \u2014 Advantage on Instinct against being surprised or caught off-guard.\nSkeptic\u2019s Guard \u2014 Passive. Presence rolls made against Maret have disadvantage. She has heard it before.' },
            { label: 'Hook',
              value: 'Knows why the guard is split into two silent factions. She\u2019s part of one side. She and Dura used to be close.' },
          ],
          tags: [
            { label: 'Faction tension',    cls: 'tag-mid' },
            { label: 'Skeptical of party', cls: 'tag-light' },
          ]
        },

        /* ── Solen ────────────────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Solen',
          role: 'Lionkin \u00b7 Guard',
          rank: ['Lionguard', 'Guard (youngest)'],
          fields: [
            { label: 'Appearance',
              value: 'Pale-maned young lion. Armour newer than everyone else\u2019s. Still moves like someone who was sized for a parade ground, not a brawl.' },
            { label: 'Traits',
              value: 'AGI +3 \u00b7 STR +1 \u00b7 FIN +2 \u00b7 INS +1 \u00b7 PRE +2 \u00b7 KNO +1' },
            { label: 'Defenses',
              value: 'HP 7 \u00b7 Thresholds 3 / 5 \u00b7 Stress 6 \u00b7 Evasion 13 \u00b7 Armor 1 \u00b7 Power 3' },
            { label: 'Combat',
              value: 'Guard\u2019s Blade \u2014 Finesse +2, 1d6+2 physical, Melee.\nQuick Charge \u2014 Once per scene, move to Far range as a free action before attacking. Does not use his action.\nOverreach \u2014 Once per scene, push harder than he should: +3 to one roll. Immediately mark 1 Stress.' },
            { label: 'Hook',
              value: 'First posting this far from the capital. Hides overwhelm behind enthusiasm. Asks too many questions. Fascinated by everywhere.' },
          ],
          tags: [
            { label: 'First posting', cls: 'tag-green' },
            { label: 'Eager',         cls: 'tag-light' },
          ]
        },

        /* ── Dura ─────────────────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Dura',
          role: 'Lionkin \u00b7 Guard',
          rank: ['Lionguard', 'Guard'],
          fields: [
            { label: 'Appearance',
              value: 'Scarred lioness. Former city guard before the Lionguard posting. Moves like someone who counts exits, because she does.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR +3 \u00b7 FIN +1 \u00b7 INS +3 \u00b7 PRE +1 \u00b7 KNO +1' },
            { label: 'Defenses',
              value: 'HP 9 \u00b7 Thresholds 4 / 6 \u00b7 Stress 5 \u00b7 Evasion 11 \u00b7 Armor 2 \u00b7 Power 4' },
            { label: 'Combat',
              value: 'Guard\u2019s Blade \u2014 Strength +3, 1d6+3 physical, Melee.\nExit Strategy \u2014 Advantage on Agility to disengage, escape, or create space in a crowd.\nCrowd Control \u2014 Trained in restraining without harming. Can Restrain a non-resisting target as a non-attack action (Strength DC 10 for a resisting one).' },
            { label: 'Hook',
              value: 'The other side of the faction split from Maret. She and Maret used to be close. Whatever happened between them, Dura does not discuss it.' },
          ],
          tags: [
            { label: 'Faction tension', cls: 'tag-mid' },
            { label: 'Ex-city guard',   cls: 'tag-light' },
          ]
        },

        /* ── Ran ──────────────────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Ran',
          role: 'Lionkin \u00b7 Guard',
          rank: ['Lionguard', 'Guard'],
          fields: [
            { label: 'Appearance',
              value: 'Red-maned lion. Broad smile. First to volunteer, always has a story, always at the front of a round of drinks he probably can\u2019t afford.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR +2 \u00b7 FIN +2 \u00b7 INS +1 \u00b7 PRE +3 \u00b7 KNO +1' },
            { label: 'Defenses',
              value: 'HP 8 \u00b7 Thresholds 3 / 5 \u00b7 Stress 6 \u00b7 Evasion 11 \u00b7 Armor 2 \u00b7 Power 4' },
            { label: 'Combat',
              value: 'Guard\u2019s Blade \u2014 Finesse +2, 1d6+2 physical, Melee.\nFirst In \u2014 +2 to attack and damage on the first roll of any encounter, if Ran acts without hesitation.\nCover the Story \u2014 Presence +3. Improvise a convincing explanation on the spot; Presence DC 11 to avoid a social confrontation escalating.' },
            { label: 'Hook',
              value: 'Was there the night of Pipkin\u2019s exile. Knows something he hasn\u2019t shared. Hides anxiety behind helpfulness and volume.' },
          ],
          tags: [
            { label: 'Night of the exile', cls: 'tag-purple' },
            { label: 'Hiding something',   cls: 'tag-gold' },
          ]
        },

        /* ── Thessaly ─────────────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Thessaly',
          role: 'Lionkin \u00b7 Guard',
          rank: ['Lionguard', 'Guard'],
          fields: [
            { label: 'Appearance',
              value: 'Grey lioness. Steady, unhurried. Always seems to have food somewhere about her person \u2014 real food, not trail rations.' },
            { label: 'Traits',
              value: 'AGI +1 \u00b7 STR +2 \u00b7 FIN +2 \u00b7 INS +2 \u00b7 PRE +3 \u00b7 KNO +2' },
            { label: 'Defenses',
              value: 'HP 8 \u00b7 Thresholds 3 / 5 \u00b7 Stress 5 \u00b7 Evasion 11 \u00b7 Armor 2 \u00b7 Power 4' },
            { label: 'Combat',
              value: 'Guard\u2019s Blade \u2014 Finesse or Strength +2, 1d6+2 physical, Melee.\nCamp Provisions \u2014 When Thessaly prepares a short rest, each PC and ally clears +1 additional Stress on top of any downtime move result.\nMorale Hold \u2014 Presence +3, DC 11. As a full action, clear 1 Stress from an ally who is at last Stress or Vulnerable from it.' },
            { label: 'Hook',
              value: 'Managing the Maret/Dura tension. Running out of patience for it. The dry humour is starting to have an edge.' },
          ],
          tags: [
            { label: 'Morale officer',   cls: 'tag-green' },
            { label: 'Faction mediator', cls: 'tag-mid' },
          ]
        },

      ]
    },

    /* ── Quick-reference roster ──────────────────────────────────── */
    {
      type: 'roster',
      title: 'Guard Roster — Quick Reference',
      role: 'Lionkin guards \u00b7 shared base stat block',
      rank: ['Roster', 'HP 7\u20139 \u00b7 Eva 11\u201313 \u00b7 Armor 1\u20132 \u00b7 Power 3\u20134'],
      headerClass: 'h-apple',
      sections: [
        {
          heading: 'Shared Abilities (all guards)',
          columns: ['Ability', 'Type', 'Effect'],
          rows: [
            { name: 'Guard\u2019s Blade',  badge: null, cells: ['Active',   '1d6+2 physical damage \u00b7 Melee'] },
            { name: 'Shield Wall',      badge: null, cells: ['Passive',  '2+ guards adjacent to same ally \u2192 that ally gains +1 Armor'] },
            { name: 'Lay Down',         badge: null, cells: ['Reaction', 'Once per scene \u2014 guard takes a hit meant for Pipkin at half damage'] },
          ]
        },
        {
          heading: 'Guards',
          columns: ['Name', 'Traits (abbreviated)', 'Signature Ability', 'Hook'],
          rows: [
            { name: 'Varro',    badge: { label: 'senior',   cls: 'badge-neutral'  }, cells: ['STR +2 INS +3 KNO +2 \u00b7 HP 9 Eva 11', 'Veteran\u2019s Scan \u2014 advantage vs ambush/surprise',            'Hasn\u2019t eaten in two days. Something is wrong.'] },
            { name: 'Maret',    badge: { label: 'watchful', cls: 'badge-neutral'  }, cells: ['FIN +3 AGI +2 INS +2 \u00b7 HP 8 Eva 12', 'Skeptic\u2019s Guard \u2014 PRE rolls vs her have disadv.',          'Knows the reason for the guard faction split.'] },
            { name: 'Solen',    badge: { label: 'young',    cls: 'badge-friendly' }, cells: ['AGI +3 FIN +2 PRE +2 \u00b7 HP 7 Eva 13', 'Quick Charge \u2014 free Far move before attacking once/scene',  'First posting. Hides overwhelm behind enthusiasm.'] },
            { name: 'Dura',     badge: { label: 'watchful', cls: 'badge-neutral'  }, cells: ['STR +3 AGI +2 INS +3 \u00b7 HP 9 Eva 11', 'Exit Strategy \u2014 advantage on Agility to disengage',          'Other side of faction split. She and Maret were close.'] },
            { name: 'Ran',      badge: { label: 'secret',   cls: 'badge-unknown'  }, cells: ['PRE +3 AGI +2 FIN +2 \u00b7 HP 8 Eva 11', 'First In \u2014 +2 atk/dmg on first roll if acts immediately',   'Was there the night of Pipkin\u2019s exile.'] },
            { name: 'Thessaly', badge: { label: 'steady',   cls: 'badge-friendly' }, cells: ['PRE +3 KNO +2 INS +2 \u00b7 HP 8 Eva 11', 'Camp Provisions \u2014 short rest: allies clear +1 extra Stress', 'Managing Maret/Dura tension. Running low on patience.'] },
          ]
        }
      ]
    }
  ]
});
