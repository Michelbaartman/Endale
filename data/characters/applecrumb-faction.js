Endale.registerPage('characters/applecrumb-faction', {
  title: 'Applecrumb Faction',
  subtitle: 'Biggus\u2019s operation \u00b7 Fenlow\u2019s circle \u00b7 The broader family \u00b7 Mousekin: STR \u22121 from small stature \u00b7 size advantage on hiding & squeezing through tight spaces',
  groups: [

    /* ════════════════════════════════════════════
       FACTION LEADERSHIP — HOSTILE BRANCH
    ════════════════════════════════════════════ */
    {
      type: 'cards',
      headerClass: 'h-hostile',
      entries: [

        /* ── Biggus Applecrumb ──────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Biggus Applecrumb',
          role: 'Mousekin \u00b7 Faction Commander',
          rank: ['Applecrumb Faction', 'Hostile \u00b7 Power 5'],
          fields: [
            { label: 'Appearance',
              value: 'Large for a mousekin \u2014 not tall, but broad and dense. Scarred jaw. A worn signet ring he never removes. Three-line circle brand on his wrist matches Scratchen\u2019s. The connection is older than this operation.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR +1 \u00b7 FIN +3 \u00b7 INS +3 \u00b7 PRE +4 \u00b7 KNO +2\nMousekin: STR one below standard \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 16 \u00b7 Thresholds 6 / 11 \u00b7 Stress 8 \u00b7 Evasion 12 \u00b7 Armor 3 \u00b7 Power 5' },
            { label: 'Combat',
              value: 'Veteran\u2019s Blade \u2014 Finesse +3, 1d10+3 physical, Melee. On total 17+, target is pushed Far and cannot close distance next action.\nCommand Strike \u2014 Finesse +3, 1d8+3 physical. On hit, one visible ally immediately makes a free attack with advantage.\nWeight of Authority \u2014 Cost: 1 Fear. Presence DC 14; on failure, target marks 1 Stress and loses their next action.' },
            { label: 'Abilities',
              value: 'Scar Tissue \u2014 Once per scene: when reduced to 0 HP, drop to 1 HP instead.\nReads the Room \u2014 Passive. Always acts first in the first round of combat. Cannot be surprised.\nProfessional Floor \u2014 Will disengage and flee if an encounter is decisively lost. Does not die for ideology.' },
            { label: 'Personality',
              value: 'Started as a genuine believer in Fonn\u2019s expansion. Now mostly just wants to win. The ideology is still in his mouth, but no longer in his eyes. Treats incompetence with contempt and competence with cold respect.' },
            { label: 'Motivation',
              value: 'Control of Fonn\u2019s future. The staff gives him a way to make the herb shipments irrelevant. He has not fully processed what that means.' },
          ],
          gmNote: 'Unfinished letter on war room desk: \u201cThe staff is here. Will test on the lower stock tonight. If it works the way the old man says we won\u2019t need the herb shipments anymore.\u201d \u00b7 Small key with a pink feather in the war room drawer \u2014 too small for any door in the mansion. \u00b7 Signet ring and Scratchen\u2019s brand \u2014 origin of their shared mark is unresolved.',
          tags: [
            { label: 'Faction commander',    cls: 'tag-dark' },
            { label: 'Staff \u2014 test tonight', cls: 'tag-red' },
            { label: 'Signet ring mystery',  cls: 'tag-mid' },
          ]
        },

        /* ── Rina Applecrumb ────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Rina Applecrumb',
          role: 'Mousekin \u00b7 Enforcer \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Faction', 'Hostile \u00b7 Power 4'],
          fields: [
            { label: 'Appearance',
              value: 'Sharp-eyed, economical in all movement. Two short blades worn low, not displayed. Doesn\u2019t telegraph anything.' },
            { label: 'Traits',
              value: 'AGI +3 \u00b7 STR +0 \u00b7 FIN +4 \u00b7 INS +2 \u00b7 PRE +1 \u00b7 KNO +1\nMousekin: STR one below standard \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 10 \u00b7 Thresholds 4 / 7 \u00b7 Stress 5 \u00b7 Evasion 13 \u00b7 Armor 2 \u00b7 Power 4' },
            { label: 'Combat',
              value: 'Double Cross \u2014 Finesse +4, 1d6+4 physical, Melee. On total 15+, both blades connect \u2014 deal the damage roll twice.\nFeint \u2014 Setup move, no damage. Finesse DC 13 vs target\u2019s Instinct; on success, target is Vulnerable to Rina\u2019s next attack this scene.\nCover Drew \u2014 Reaction, automatic. Intercepts any hit targeting Drew within Close range; Rina takes half the incoming damage. No roll needed.' },
            { label: 'Abilities',
              value: 'Unbreakable Conviction \u2014 Cannot be Frightened or made Vulnerable through fear. Will not surrender, break, or hesitate under any social pressure. This is not willpower \u2014 she simply has no doubt left.' },
            { label: 'Personality',
              value: 'Cold, committed, efficient. Biggus\u2019s vision is the only one she has ever believed in, and she stopped questioning it. Her care for Drew is real and fierce, but expressed purely through physical protection.' },
            { label: 'On Sable',
              value: 'Contempt, not hatred. He\u2019s soft. Not personal \u2014 it just means he\u2019s in the wrong place.' },
          ],
          tags: [
            { label: 'True believer', cls: 'tag-dark' },
            { label: 'Protects Drew', cls: 'tag-mid' },
          ]
        },

        /* ── Nessa Applecrumb ───────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Nessa Applecrumb',
          role: 'Mousekin \u00b7 Cousin \u00b7 Tactical Organiser',
          rank: ['Applecrumb Faction', 'Hostile \u00b7 Power 4'],
          fields: [
            { label: 'Appearance',
              value: 'Precise, composed, always slightly overdressed for the situation \u2014 a deliberate choice. Contempt worn as composure.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR +0 \u00b7 FIN +2 \u00b7 INS +4 \u00b7 PRE +3 \u00b7 KNO +3\nMousekin: STR one below standard \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 8 \u00b7 Thresholds 3 / 5 \u00b7 Stress 6 \u00b7 Evasion 13 \u00b7 Armor 1 \u00b7 Power 4' },
            { label: 'Combat',
              value: 'Concealed Blade \u2014 Finesse +2, 1d6+2 physical, Melee. Not her first choice.\nTactical Brief \u2014 Support action. Once per encounter, grants all allies within Close +2 to their next attack roll if they can hear her.\nRead the Weakness \u2014 Instinct DC 12 to identify a target\u2019s vulnerability. On success, the next ally to attack that target deals +1d4 damage.\nContingency \u2014 Passive. Always knows where the exits are and has a plan to use them. She cannot be prevented from leaving unless physically restrained.' },
            { label: 'Personality',
              value: 'Sharp, ambitious, contemptuous. Believes Fonn\u2019s custodian families have been wasting their position for generations. Not reckless \u2014 strategic. Never moves without a reason, never wastes words.' },
            { label: 'On Sable',
              value: 'Specifically and vocally resents that Sable still has Fenlow\u2019s protection when she considers him measurably useless. Personal enough to cloud her judgement about him when he is actually in front of her.' },
          ],
          tags: [
            { label: 'Hostile',              cls: 'tag-red' },
            { label: 'Tactical coordinator', cls: 'tag-mid' },
          ]
        },

      ]
    },

    /* ════════════════════════════════════════════
       FENLOW'S CIRCLE — ALLIED / CURSED
    ════════════════════════════════════════════ */
    {
      type: 'cards',
      headerClass: 'h-amber',
      entries: [

        /* ── Fenlow Applecrumb ──────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Fenlow Applecrumb',
          role: 'Mousekin \u00b7 Tactician \u00b7 Sable\u2019s Father',
          rank: ['Applecrumb Family', 'Ally (limited) \u00b7 Power 5'],
          fields: [
            { label: 'Appearance',
              value: 'Compact and still. Greying at the ears. Moves with purpose and no urgency, which is increasingly at odds with the state he\u2019s in.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR +0 \u00b7 FIN +2 \u00b7 INS +4 \u00b7 PRE +3 \u00b7 KNO +3\nMousekin: STR one below standard \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 12 \u00b7 Thresholds 5 / 8 \u00b7 Stress 8 \u00b7 Evasion 13 \u00b7 Armor 2 \u00b7 Power 5' },
            { label: 'Combat',
              value: 'Controlled Strike \u2014 Finesse +2, 1d6+2 physical, Melee. On total 14+, choose the exact hit location: disarm, destabilise, or set up an ally\u2019s next attack.\nRead and React \u2014 Reaction. Before any attack resolves against a Close ally, Fenlow redirects it to an adjacent valid target. Instinct DC 13.\nCover Ground \u2014 Cost: 1 Fear. One ally within Far range repositions for free, not using their action. Once per scene.' },
            { label: 'Curse of Tongues',
              value: 'Cannot speak about: Ossian\u2019s binding, the compact\u2019s terms, Lolo\u2019s whereabouts, or anything that directly exposes Ossian\u2019s operation. He stops mid-sentence, changes subject, or gets nosebleeds under sustained pressure. He can write around the curse, point at things, or say \u201cI can\u2019t\u201d rather than deflect.' },
            { label: 'Abilities',
              value: 'Tactical Memory \u2014 Advantage on all Instinct rolls in familiar terrain or against tactics he has seen before. Disadvantage on Presence rolls when his Stress is at 6+.' },
            { label: 'The Letter',
              value: 'Written the night of the compact. Passed via Jhon to Sable. Key contents: \u201cWhat I agreed to \u2014 it isn\u2019t what he said it was.\u201d \u00b7 \u201cYou can do what the rest of us can\u2019t. I called it useless because I was afraid.\u201d \u00b7 \u201cFind the pink feathers in the forest. North of the mill.\u201d' },
          ],
          gmNote: 'At maximum Stress: goes completely silent for the scene. The curse and the man become indistinguishable. Will not hurt Sable under any circumstances. The letter points somewhere near Rook. What Rook knows and what Fenlow is protecting by staying silent may be the same secret.',
          quote: '\u201cFind the pink feathers in the forest. North of the mill. Don\u2019t ask anyone in Fonn where they lead.\u201d',
          tags: [
            { label: 'Curse of Tongues (full)', cls: 'tag-dark' },
            { label: 'Ally (limited)',           cls: 'tag-mid' },
            { label: 'Letter sent',              cls: 'tag-gold' },
          ]
        },

        /* ── Jhon Applecrumb ────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Jhon Applecrumb',
          role: 'Mousekin \u00b7 Knight \u00b7 Fenlow\u2019s Bodyguard',
          rank: ['Applecrumb Family', 'Neutral Ally \u00b7 Power 5'],
          fields: [
            { label: 'Appearance',
              value: 'Solid, unhurried. Worn but well-maintained plate at shoulders and chest. Moves in armour like it\u2019s been part of him long enough to forget it\u2019s there.' },
            { label: 'Traits',
              value: 'AGI +1 \u00b7 STR +1 \u00b7 FIN +2 \u00b7 INS +2 \u00b7 PRE +2 \u00b7 KNO +1\nMousekin: STR one below standard, compensated by training \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 14 \u00b7 Thresholds 5 / 9 \u00b7 Stress 5 \u00b7 Evasion 11 \u00b7 Armor 4 \u00b7 Power 5' },
            { label: 'Combat',
              value: 'Shield Advance \u2014 Strength +1, 1d8+3 physical, Melee. Jhon moves freely to Close range before attacking as part of the same action.\nSoldier\u2019s Reprimand \u2014 Finesse +2, 1d6+3 physical, Melee. On hit, target is Disarmed or Destabilised (GM\u2019s choice based on context).\nInterpose \u2014 Reaction. Jhon steps in front of any Close ally taking a hit, absorbing half the incoming damage himself.' },
            { label: 'Abilities',
              value: 'Trained Soldier \u2014 Passive. Reduce all incoming damage by 1 (effective Armor +1 against all attacks).\nFear Immunity \u2014 Cannot mark Stress from Fear-based effects or be made to hesitate.\nOath \u2014 Absolute. Will not strike Sable under any circumstances.' },
            { label: 'Personality',
              value: 'Loyal through duty, not ideology. Aloof until he decides you\u2019re worth it \u2014 then steady and direct. Suspects Fenlow is in worse trouble than he\u2019s being told, but won\u2019t press.' },
          ],
          gmNote: 'Passed Fenlow\u2019s letter to Sable. Attended the Crow\u2019s Nest roundtable in Session 7. Knows more about Fenlow\u2019s situation than he says, and will not use it unless pushed. The right question, asked directly, will get a direct answer.',
          tags: [
            { label: 'Letter carrier',    cls: 'tag-gold' },
            { label: 'Fenlow\u2019s guard',   cls: 'tag-mid' },
          ]
        },

      ]
    },

    /* ════════════════════════════════════════════
       OPERATIVES — ACTIVE IN THE OPERATION
    ════════════════════════════════════════════ */
    {
      type: 'cards',
      headerClass: 'h-hostile',
      entries: [

        /* ── Drew Applecrumb ────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Drew Applecrumb',
          role: 'Mousekin \u00b7 Reluctant Operative \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Faction', 'On the fence \u00b7 Power 3'],
          fields: [
            { label: 'Appearance',
              value: 'Looks like Sable around the eyes. Hasn\u2019t slept well in weeks and it shows.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR \u22121 \u00b7 FIN +2 \u00b7 INS +1 \u00b7 PRE +2 \u00b7 KNO +1\nMousekin: STR \u22121 \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 7 \u00b7 Thresholds 3 / 5 \u00b7 Stress 6 \u00b7 Evasion 13 \u00b7 Armor 1 \u00b7 Power 3' },
            { label: 'Combat',
              value: 'Short Blade \u2014 Finesse +2, 1d6+2 physical, Melee. Visibly pulls his strikes when Sable is his target \u2014 DC 10 Instinct for anyone watching to notice.\nSmoke & Run \u2014 Once per scene. Drew breaks a vial \u2014 everything within Close is Blinded for one action. He immediately disengages without provoking.' },
            { label: 'Breaking Point',
              value: 'If Sable addresses him directly: Presence DC 11 or Drew hesitates and loses his action. Critical fail: drops his weapon. At 3 HP or below with Rina occupied elsewhere, Drew surrenders \u2014 to Sable only, not to the rest of the party.' },
            { label: 'Knows',
              value: 'Staff location and Biggus\u2019s intentions for it. At Fear 2: Drew throws the staff or its location note away from himself \u2014 he just wants to be done carrying it.' },
            { label: 'Personality',
              value: 'Quiet, avoidant. Loyal to Rina more than to Biggus. Terrified he has gone too far to be forgiven. Secretly wants out but has no idea how to say that.' },
            { label: 'On Sable',
              value: 'Genuine guilt. Sable is the one person whose opinion of him he actually cares about, which is exactly why he can\u2019t look at him.' },
          ],
          tags: [
            { label: 'Wants out',            cls: 'tag-mid' },
            { label: 'Knows staff location', cls: 'tag-gold' },
            { label: 'Sable pressure point', cls: 'tag-blue' },
          ]
        },

        /* ── Nib Applecrumb ─────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Nib Applecrumb',
          role: 'Mousekin \u00b7 Younger Brother \u00b7 Junior Operative',
          rank: ['Applecrumb Faction', 'Hostile \u00b7 Power 3'],
          fields: [
            { label: 'Appearance',
              value: 'Brash energy in a too-small frame. Moves like someone trying to look bigger than he is, which is not very effective for a mousekin.' },
            { label: 'Traits',
              value: 'AGI +3 \u00b7 STR \u22121 \u00b7 FIN +2 \u00b7 INS +1 \u00b7 PRE +2 \u00b7 KNO +0\nMousekin: STR \u22121 \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 6 \u00b7 Thresholds 2 / 4 \u00b7 Stress 5 \u00b7 Evasion 13 \u00b7 Armor 1 \u00b7 Power 3' },
            { label: 'Combat',
              value: 'Short Blade \u2014 Finesse +2, 1d6+2 physical, Melee.\nRun Interference \u2014 Agility DC 11. Nib weaves through enemies, causing disadvantage on one enemy\u2019s attack this round. Uses his action.' },
            { label: 'Abilities',
              value: 'True Believer \u2014 Cannot be talked out of the cause through persuasion or moral argument alone. Requires Presence DC 15 or a direct demonstration of Biggus\u2019s actual cruelty to shake him. Not cruel himself \u2014 just young and committed.' },
            { label: 'Role',
              value: 'Runs messages, keeps watch, picks up errands. Low-level but enthusiastic. Thinks Sable is an embarrassment and says so clearly and often.' },
          ],
          tags: [
            { label: 'True believer',    cls: 'tag-dark' },
            { label: 'Active operative', cls: 'tag-mid' },
          ]
        },

        /* ── Clide Applecrumb ───────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Clide Applecrumb',
          role: 'Mousekin \u00b7 Uncle \u00b7 Early Loyalist',
          rank: ['Applecrumb Faction', 'Hostile \u00b7 Power 4'],
          fields: [
            { label: 'Appearance',
              value: 'Older, harder. Short and compact even for a mousekin. The kind of face that has stopped being readable.' },
            { label: 'Traits',
              value: 'AGI +1 \u00b7 STR +1 \u00b7 FIN +2 \u00b7 INS +2 \u00b7 PRE +2 \u00b7 KNO +1\nMousekin: STR one below standard \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 9 \u00b7 Thresholds 4 / 6 \u00b7 Stress 5 \u00b7 Evasion 11 \u00b7 Armor 2 \u00b7 Power 4' },
            { label: 'Combat',
              value: 'Guard\u2019s Blade \u2014 Finesse +2, 1d6+2 physical, Melee.\nHold Position \u2014 Once per scene, Clide braces: he cannot be moved, knocked back, or Restrained for one round and gains +1 Armor.' },
            { label: 'Abilities',
              value: 'Old Loyalist \u2014 Advantage on Presence rolls asserting authority within the faction. Cannot be moved by moral argument \u2014 only by direct physical threat or an explicit order from Biggus.' },
            { label: 'Status',
              value: 'Was at Apple Cider. Failed. The most experienced of the three who attacked; his failure stings more than the others\u2019 because he knew better. Has not discussed it.' },
          ],
          tags: [
            { label: 'Apple Cider failure', cls: 'tag-mid' },
            { label: 'Old guard loyalist',  cls: 'tag-dark' },
          ]
        },

        /* ── Berry (loud) ───────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Berry Applecrumb',
          role: 'Mousekin \u00b7 Cousin \u00b7 The loud one',
          rank: ['Applecrumb Faction', 'Hostile \u00b7 Power 2'],
          fields: [
            { label: 'Appearance',
              value: 'Louder than she is dangerous. Carries herself like she\u2019s already won whatever she\u2019s walked into.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR \u22121 \u00b7 FIN +1 \u00b7 INS +0 \u00b7 PRE +2 \u00b7 KNO +0\nMousekin: STR \u22121 \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 5 \u00b7 Thresholds 2 / 3 \u00b7 Stress 4 \u00b7 Evasion 12 \u00b7 Armor 1 \u00b7 Power 2' },
            { label: 'Combat',
              value: 'Crude Blade \u2014 Finesse +1, 1d4+1 physical, Melee.\nAll Bark \u2014 At full HP, her bluster makes enemies underestimate her: attacks against her have disadvantage. At half HP or below, this evaporates immediately.\nRuns Without Orders \u2014 If the encounter turns decisively against her side, she flees without waiting to be told.' },
            { label: 'Status',
              value: 'Was at Apple Cider. Failed. Lying low at Biggus\u2019s command. All bravado, follows Nessa\u2019s lead without much independent thought.' },
          ],
          tags: [
            { label: 'Apple Cider failure', cls: 'tag-mid' },
            { label: 'Nessa\u2019s follower',    cls: 'tag-dark' },
          ]
        },

        /* ── Berry (quiet) ──────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Berry Applecrumb',
          role: 'Mousekin \u00b7 Cousin \u00b7 The quiet one',
          rank: ['Applecrumb Faction', 'Hostile / Wavering \u00b7 Power 2'],
          fields: [
            { label: 'Appearance',
              value: 'Quieter energy than the other Berry. Watches more than she says. Hasn\u2019t been sleeping well either.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR \u22121 \u00b7 FIN +2 \u00b7 INS +1 \u00b7 PRE +1 \u00b7 KNO +0\nMousekin: STR \u22121 \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 5 \u00b7 Thresholds 2 / 3 \u00b7 Stress 5 \u00b7 Evasion 12 \u00b7 Armor 1 \u00b7 Power 2' },
            { label: 'Combat',
              value: 'Crude Blade \u2014 Finesse +2, 1d4+2 physical, Melee.\nSecond Thoughts \u2014 The first time she takes damage in an encounter, she makes Presence DC 12 or uses her next action to disengage and flee. This is not cowardice. It is the first honest thing she has done in months.' },
            { label: 'Status',
              value: 'Was at Apple Cider. Failed. Privately not sure this is worth it anymore, but has no idea how to say that or to who.' },
          ],
          tags: [
            { label: 'Apple Cider failure', cls: 'tag-mid' },
            { label: 'Wavering',            cls: 'tag-gold' },
          ]
        },

      ]
    },

    /* ════════════════════════════════════════════
       THE FAMILY — MIXED ALLEGIANCE
    ════════════════════════════════════════════ */
    {
      type: 'cards',
      headerClass: 'h-apple',
      entries: [

        /* ── Arite Applecrumb ───────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Arite Applecrumb',
          role: 'Mousekin \u00b7 Older Brother \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Family', 'Allegiance unclear \u00b7 Power 3'],
          fields: [
            { label: 'Appearance',
              value: 'The eldest sibling look: slightly tired, always measuring. Carries responsibility in his posture and doesn\u2019t seem to notice.' },
            { label: 'Traits',
              value: 'AGI +1 \u00b7 STR +0 \u00b7 FIN +1 \u00b7 INS +2 \u00b7 PRE +2 \u00b7 KNO +1\nMousekin: STR one below standard \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 7 \u00b7 Evasion 11 \u00b7 Armor 1 \u00b7 Power 3' },
            { label: 'Combat',
              value: 'Knife \u2014 Finesse +1, 1d4+1 physical, Melee. Not a fighter. Steady under pressure where others aren\u2019t.' },
            { label: 'Hook',
              value: 'Knows more about the night of the compact than he has told anyone. Has been protecting someone \u2014 unclear who \u2014 by staying quiet. Has always been between Fenlow and the rest of the family without explicitly choosing a side.' },
          ],
          tags: [
            { label: 'Knows about the compact', cls: 'tag-purple' },
            { label: 'Protecting someone',      cls: 'tag-mid' },
          ]
        },

        /* ── Lumi Applecrumb ────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Lumi Applecrumb',
          role: 'Mousekin \u00b7 Older Sister \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Family', 'Friendly \u00b7 Power 3'],
          fields: [
            { label: 'Appearance',
              value: 'Bright-eyed, sharp-tongued. The one who would argue with you and then pass you something to eat halfway through.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR \u22121 \u00b7 FIN +2 \u00b7 INS +2 \u00b7 PRE +2 \u00b7 KNO +1\nMousekin: STR \u22121 \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 6 \u00b7 Evasion 12 \u00b7 Armor 0 \u00b7 Power 3' },
            { label: 'Combat',
              value: 'Improvised weapon \u2014 Finesse +2, 1d4 physical. Not trained. Will absolutely fight to protect Sable if it comes to it.' },
            { label: 'Hook',
              value: 'The first sibling likely to approach Sable with questions. Has noticed Fenlow\u2019s strange behaviour and it is frightening her in a way she can\u2019t articulate yet. Instinctively protective of Sable even when she\u2019s frustrated with him.' },
          ],
          tags: [
            { label: 'Protects Sable', cls: 'tag-green' },
            { label: 'Fenlow concern', cls: 'tag-gold' },
          ]
        },

        /* ── Mira Applecrumb ────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Mira Applecrumb',
          role: 'Mousekin \u00b7 Middle Sibling \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Family', 'Neutral \u00b7 Power 2'],
          fields: [
            { label: 'Appearance',
              value: 'Calm surface, tired underneath. The expression of someone who has been smoothing things over for a very long time.' },
            { label: 'Traits',
              value: 'AGI +1 \u00b7 STR \u22121 \u00b7 FIN +1 \u00b7 INS +1 \u00b7 PRE +3 \u00b7 KNO +1\nMousekin: STR \u22121 \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 5 \u00b7 Evasion 11 \u00b7 Armor 0 \u00b7 Power 2' },
            { label: 'Combat',
              value: 'Non-combatant. High Presence \u2014 used for de-escalation.\nDe-escalate \u2014 Presence DC 11, calm a tense non-combat situation before it becomes physical. Has done this more times than she can count.' },
            { label: 'Hook',
              value: 'Peacekeeper by nature, exhausted by the feud, tries to keep family dinners civil. Has mostly succeeded by refusing to know things. If she is forced to know something, she will have to pick a side, and she knows that. She is avoiding it.' },
          ],
          tags: [
            { label: 'Wilful ignorance',  cls: 'tag-mid' },
            { label: 'Forced choice ahead', cls: 'tag-light' },
          ]
        },

        /* ── Tilla Applecrumb ───────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Tilla Applecrumb',
          role: 'Mousekin \u00b7 Middle Sibling \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Family', 'Neutral \u00b7 Power 2'],
          fields: [
            { label: 'Appearance',
              value: 'Quieter than the rest. Watches everything. Has the stillness of someone who has been filing things away for a long time.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR \u22121 \u00b7 FIN +1 \u00b7 INS +3 \u00b7 PRE +1 \u00b7 KNO +1\nMousekin: STR \u22121 \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 5 \u00b7 Evasion 12 \u00b7 Armor 0 \u00b7 Power 2' },
            { label: 'Combat',
              value: 'Non-combatant. High Instinct.\nUnnoticed \u2014 Advantage on Agility rolls to go unobserved, blend into a crowd, or slip away without being followed.' },
            { label: 'Hook',
              value: 'Has seen things going in and out of the mansion she has not reported to anyone. Fear, not loyalty, is keeping her quiet. The list of what she has witnessed is longer than anyone suspects.' },
          ],
          tags: [
            { label: 'Has seen things',  cls: 'tag-gold' },
            { label: 'Silent from fear', cls: 'tag-mid' },
          ]
        },

        /* ── Lolo Applecrumb ────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Lolo Applecrumb',
          role: 'Mousekin \u00b7 Fenlow\u2019s sibling \u00b7 Missing',
          rank: ['Applecrumb Family', 'Whereabouts unknown \u00b7 Power 2'],
          fields: [
            { label: 'Appearance',
              value: 'Young adult. Small even by mousekin standards. The family says little about them now \u2014 a collective flinch whenever the name comes up.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR \u22121 \u00b7 FIN +1 \u00b7 INS +2 \u00b7 PRE +2 \u00b7 KNO +2\nMousekin: STR \u22121 \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 6 \u00b7 Evasion 12 \u00b7 Armor 0 \u00b7 Power 2 \u00b7 Status: missing' },
            { label: 'Status',
              value: 'Disappeared around the time of the compact. Fenlow\u2019s curse explicitly covers Lolo\u2019s whereabouts \u2014 he cannot speak about them. The family has been told different things by different people. The stories do not match.' },
            { label: 'What is known',
              value: 'Was close to Fenlow. Was in Fonn when the compact was signed. Was not seen leaving. No body was found. This is either very good or very bad.' },
          ],
          gmNote: 'Ossian used Lolo\u2019s fate as leverage to bind Fenlow. Whether Lolo is alive, imprisoned, or transformed is up to the GM \u2014 but the pink feathers Fenlow\u2019s letter references and the path north of the mill are connected to them. The connection between Rook\u2019s grey cloak woman and Lolo\u2019s disappearance is intentional and worth developing.',
          tags: [
            { label: 'Missing',              cls: 'tag-dark' },
            { label: 'Fenlow\u2019s binding',     cls: 'tag-purple' },
            { label: 'Pink feather thread',   cls: 'tag-gold' },
          ]
        },

        /* ── Rook Applecrumb ────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Rook Applecrumb',
          role: 'Mousekin \u00b7 Grandfather',
          rank: ['Applecrumb Family', 'Unknown \u00b7 Power 3'],
          fields: [
            { label: 'Appearance',
              value: 'Very old. Moves slowly. Sparse with words. Sits by the window most days. Seems unremarkable to everyone except the letter, which points somewhere near him.' },
            { label: 'Traits',
              value: 'AGI +0 \u00b7 STR \u22121 \u00b7 FIN +0 \u00b7 INS +3 \u00b7 PRE +2 \u00b7 KNO +4\nMousekin: STR \u22121 \u00b7 size advantage on hiding' },
            { label: 'Defenses',
              value: 'HP 5 \u00b7 Evasion 10 \u00b7 Armor 0 \u00b7 Power 3 \u00b7 Non-combatant' },
            { label: 'What he carries',
              value: 'Knew the woman in the grey cloak. May have been the original target of an earlier version of the Curse of Tongues. The connection between his knowledge and Sable\u2019s magic immunity is one of the campaign\u2019s slow-burn mysteries. Whether he still knows what he once knew is unclear \u2014 age and possibly a curse of his own may have taken it.' },
          ],
          gmNote: 'Fenlow\u2019s letter points somewhere near Rook. Sable\u2019s magic immunity may trace back to him \u2014 either through bloodline or through something Rook did or agreed to long before the current compact. Do not resolve this quickly. The grey cloak woman should be introduced well before Rook\u2019s knowledge becomes relevant.',
          tags: [
            { label: 'Grey cloak connection',            cls: 'tag-purple' },
            { label: 'Sable\u2019s immunity \u2014 possible origin', cls: 'tag-gold' },
            { label: 'Slow-burn mystery',                cls: 'tag-mid' },
          ]
        },

        /* ── Pip Applecrumb ─────────────────────────────────────── */
        {
          cardType: 'character',
          name: 'Pip Applecrumb',
          role: 'Mousekin \u00b7 Youngest \u00b7 Sable\u2019s sibling',
          rank: ['Applecrumb Family', 'Innocent \u00b7 Power 1'],
          fields: [
            { label: 'Appearance',
              value: 'A child. Very small even by mousekin standards. Follows Sable around whenever he\u2019s home. Cheerful in the way that only works when you genuinely don\u2019t know what\u2019s happening.' },
            { label: 'Traits',
              value: 'AGI +2 \u00b7 STR \u22122 \u00b7 FIN +1 \u00b7 INS +1 \u00b7 PRE +2 \u00b7 KNO +0\nMousekin: STR \u22122 (child) \u00b7 very small stature' },
            { label: 'Defenses',
              value: 'HP 3 \u00b7 Power 1 \u00b7 Child \u2014 non-combatant \u00b7 Do not put this character in danger' },
            { label: 'Hook',
              value: 'Has no idea what any of this is about. The one person in the family that everyone \u2014 Nib, Nessa, Rina, even Biggus through Nessa \u2014 has agreed must be kept out of it entirely.' },
          ],
          tags: [
            { label: 'Child',       cls: 'tag-green' },
            { label: 'Untouchable', cls: 'tag-light' },
          ]
        },

      ]
    },

    /* ════════════════════════════════════════════
       QUICK REFERENCE ROSTER
    ════════════════════════════════════════════ */
    {
      type: 'roster',
      title: 'Applecrumb Roster \u2014 Quick Reference',
      role: 'All Applecrumb characters \u00b7 Mousekin: STR \u22121 baseline \u00b7 size advantage on hiding',
      rank: ['Roster', 'Mixed allegiance'],
      headerClass: 'h-apple',
      sections: [
        {
          heading: 'Faction (hostile branch)',
          columns: ['Name', 'Role', 'Key Traits', 'Signature Ability', 'Status'],
          rows: [
            { name: 'Biggus',      badge: { label: 'hostile',  cls: 'badge-hostile'  }, cells: ['Commander',          'PRE +4 \u00b7 FIN +3 \u00b7 HP 16',    'Command Strike \u2014 ally gets free attack on hit',     'In the mansion. Running the operation.'] },
            { name: 'Rina',        badge: { label: 'hostile',  cls: 'badge-hostile'  }, cells: ['Enforcer',           'FIN +4 \u00b7 AGI +3 \u00b7 HP 10',    'Cover Drew \u2014 auto-intercept any hit on Drew',       'Active. Never backs down.'] },
            { name: 'Nessa',       badge: { label: 'hostile',  cls: 'badge-hostile'  }, cells: ['Tactical organiser', 'INS +4 \u00b7 PRE +3 \u00b7 HP 8',     'Tactical Brief \u2014 +2 to all ally attacks once/enc',  'Active. Never without an exit.'] },
            { name: 'Drew',        badge: { label: 'wavering', cls: 'badge-unknown'  }, cells: ['Reluctant operative','FIN +2 \u00b7 AGI +2 \u00b7 HP 7',     'Smoke & Run \u2014 blind + disengage once/scene',       'Active. Wants out. Knows staff location.'] },
            { name: 'Nib',         badge: { label: 'hostile',  cls: 'badge-hostile'  }, cells: ['Junior operative',   'AGI +3 \u00b7 FIN +2 \u00b7 HP 6',     'Run Interference \u2014 one enemy disadv. this round',  'Active. Message runner & lookout.'] },
            { name: 'Clide',       badge: { label: 'hostile',  cls: 'badge-hostile'  }, cells: ['Uncle \u00b7 loyalist', 'FIN +2 \u00b7 INS +2 \u00b7 HP 9',   'Hold Position \u2014 brace: immovable + +1 Armor',      'Lying low after Apple Cider.'] },
            { name: 'Berry (loud)',  badge: { label: 'hostile',  cls: 'badge-hostile'  }, cells: ['Cousin',             'AGI +2 \u00b7 PRE +2 \u00b7 HP 5',     'All Bark \u2014 disadv. vs her at full HP only',        'Lying low after Apple Cider.'] },
            { name: 'Berry (quiet)', badge: { label: 'wavering', cls: 'badge-unknown'  }, cells: ['Cousin',             'AGI +2 \u00b7 FIN +2 \u00b7 HP 5',     'Second Thoughts \u2014 first damage: flee check',       'Lying low. Privately done with it.'] },
          ]
        },
        {
          heading: 'Fenlow\u2019s circle',
          columns: ['Name', 'Role', 'Key Traits', 'Signature Ability', 'Status'],
          rows: [
            { name: 'Fenlow', badge: { label: 'cursed', cls: 'badge-neutral' }, cells: ['Tactician \u00b7 Sable\u2019s father', 'INS +4 \u00b7 PRE +3 \u00b7 HP 12', 'Read and React \u2014 redirect attack on Close ally', 'Cursed. Fenlow\u2019s letter sent to Sable via Jhon.'] },
            { name: 'Jhon',   badge: { label: 'ally',   cls: 'badge-friendly'}, cells: ['Knight \u00b7 Fenlow\u2019s guard', 'Armor 4 \u00b7 HP 14',              'Interpose \u2014 half damage for any Close ally',     'At the Crow\u2019s Nest. Suspects Fenlow is in trouble.'] },
          ]
        },
        {
          heading: 'The family',
          columns: ['Name', 'Relation', 'Power', 'Hook'],
          rows: [
            { name: 'Arite',  badge: { label: 'unclear',  cls: 'badge-unknown'  }, cells: ['Older brother',  '3', 'Knows about the night of the compact. Has been protecting someone by staying quiet.'] },
            { name: 'Lumi',   badge: { label: 'friendly', cls: 'badge-friendly' }, cells: ['Older sister',   '3', 'Protective of Sable. Frightened by Fenlow\u2019s behaviour. Most likely to approach Sable first.'] },
            { name: 'Mira',   badge: { label: 'neutral',  cls: 'badge-neutral'  }, cells: ['Middle sibling', '2', 'Wilfully uninformed. If she learns something, she must pick a side.'] },
            { name: 'Tilla',  badge: { label: 'neutral',  cls: 'badge-neutral'  }, cells: ['Middle sibling', '2', 'Has witnessed things at the mansion she has not reported. Fear, not loyalty.'] },
            { name: 'Lolo',   badge: { label: 'missing',  cls: 'badge-unknown'  }, cells: ['Fenlow\u2019s sibling', '2', 'Missing since the night of the compact. Fenlow\u2019s curse covers their whereabouts.'] },
            { name: 'Rook',   badge: { label: 'unknown',  cls: 'badge-unknown'  }, cells: ['Grandfather',    '3', 'Knew the woman in the grey cloak. May hold the origin of Sable\u2019s immunity.'] },
            { name: 'Pip',    badge: { label: 'innocent', cls: 'badge-friendly' }, cells: ['Youngest \u00b7 child', '1', 'Everyone has agreed, without meeting, to keep Pip out of it.'] },
          ]
        }
      ]
    }

  ]
});
