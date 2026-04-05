Endale.registerPage('rules/dm-cheatsheet', {
  title: 'DM Combat Cheatsheet',
  subtitle: 'Daggerheart quick reference \u2014 core rules + Void content \u00b7 Sources: daggerheart.com/srd \u00b7 daggerheartsrd.com',
  groups: [

    /* ── The Duality Dice ──────────────────────────────────────────────── */
    {
      type: 'reference',
      title: 'The Duality Dice',
      role: 'Roll 2d12 (Hope die + Fear die) \u00b7 add modifiers \u00b7 compare total to DC',
      headerClass: 'h-neutral',
      sections: [
        {
          heading: 'Roll Outcomes',
          kind: 'table',
          columns: ['Outcome', 'Condition', 'Effect'],
          rows: [
            ['Success with Hope',  'Total \u2265 DC \u00b7 Hope die \u2265 Fear die',  'Succeed \u00b7 player gains 1 Hope \u00b7 spotlight stays with players'],
            ['Success with Fear',  'Total \u2265 DC \u00b7 Fear die > Hope die',  'Succeed \u00b7 GM gains 1 Fear \u00b7 spotlight stays (but GM may spend Fear to act)'],
            ['Failure with Hope',  'Total < DC \u00b7 Hope die \u2265 Fear die',  'Fail \u00b7 player gains 1 Hope \u00b7 spotlight passes to GM'],
            ['Failure with Fear',  'Total < DC \u00b7 Fear die > Hope die',  'Fail \u00b7 GM gains 1 Fear \u00b7 spotlight passes to GM'],
            ['Critical Success',   'Both dice show the same number',        'Auto-succeed with bonus \u00b7 gain 1 Hope \u00b7 clear 1 Stress \u00b7 no action token added'],
          ]
        },
        {
          heading: 'Resource Caps',
          kind: 'pairs',
          rows: [
            { label: 'Hope (players)',  value: 'Max 6 Hope. Start with 2. Gained on Hope rolls, Crits, and Prepare downtime.' },
            { label: 'Fear (GM)',        value: 'Max 12 Fear. Start with 1 per PC. Gained on Fear rolls and from certain abilities.' },
          ]
        },
        {
          heading: 'Spending Hope (Player)',
          kind: 'table',
          columns: ['Spend', 'Cost', 'Effect'],
          rows: [
            ['Help an Ally',    '1 Hope',  'Roll 1d6 \u2014 add result to an ally\u2019s action roll. Multiple allies can each spend 1 Hope; the highest 1d6 result is added (not all of them). Does NOT count as your action.'],
            ['Activate feature', 'Varies', 'Class abilities and domain card features that list a Hope cost.'],
            ['Tag Team',        '3 Hope',  'See Player Actions section below. Once per session per pair of PCs.'],
            ['Boost ability',   'Varies',  'Some domain cards list Hope costs for bonus effects.'],
          ]
        },
        {
          heading: 'Spending Fear (GM)',
          kind: 'table',
          columns: ['Spend', 'Cost', 'Effect'],
          rows: [
            ['Make a GM move',           '1 Fear',  'Introduce a complication, a consequence, or a new pressure.'],
            ['Extend GM turn',           '1 Fear',  'After completing a move, spend to make one additional GM move this same turn.'],
            ['Add Action Tokens',        '1 Fear',  'Place 2 Action Tokens on the tracker. Tokens are then spent to activate adversaries.'],
            ['Activate powerful ability', 'Varies', 'Trigger a named adversary\u2019s Fear-cost ability (see stat block).'],
          ]
        }
      ]
    },

    /* ── Combat Flow & Action Economy ─────────────────────────────────── */
    {
      type: 'reference',
      title: 'Combat Flow & Action Economy',
      role: 'No initiative \u00b7 The Spotlight is the turn system \u00b7 Action Tokens fuel the GM\u2019s turn',
      headerClass: 'h-guard',
      sections: [
        {
          heading: 'The Spotlight',
          kind: 'pairs',
          rows: [
            { label: 'What it is',         value: 'The Spotlight is the narrative turn system. There is no fixed initiative order. The spotlight moves organically \u2014 or is forced to move by mechanical triggers.' },
            { label: 'Who goes first',      value: 'Any player can claim the spotlight and describe their PC\u2019s action. The GM facilitates, not dictates, the order.' },
            { label: 'Success with Hope',   value: 'Spotlight stays with the players. The next player can act immediately.' },
            { label: 'Success with Fear',   value: 'Spotlight stays with players. GM gains 1 Fear. The GM may spend that Fear to react, but does not take the spotlight automatically.' },
            { label: 'Any Failure',         value: 'Spotlight passes to the GM immediately \u2014 regardless of whether the failure was with Hope or with Fear.' },
            { label: 'After GM\u2019s turn',     value: 'Once the GM has made their moves, the spotlight returns to the players.' },
            { label: 'No hard limit',       value: 'There is no mechanical cap on how many times the spotlight can return to the same PC. GM manages rotation through narrative and mechanical triggers.' },
          ]
        },
        {
          heading: 'Action Tokens',
          kind: 'pairs',
          rows: [
            { label: 'What they are',      value: 'A physical/visual tracker for the GM\u2019s action budget. Separate from Fear.' },
            { label: 'How GM gains them',  value: 'Every time a player makes an action roll, one character token is added to the action tracker. The GM receives these tokens.' },
            { label: 'How GM spends them', value: 'Spend 1 Action Token = activate 1 adversary for an action (attack, move, special). Spend 2 Tokens = convert to 1 Fear.' },
            { label: 'Adding more',         value: 'Spend 1 Fear = place 2 Action Tokens on the tracker.' },
            { label: 'Practical limit',    value: 'A GM should not activate the same adversary twice in a row between PC moves. One adversary per token, not multiple actions for the same adversary.' },
          ]
        },
        {
          heading: 'The GM\u2019s Turn (When Spotlight Passes)',
          kind: 'table',
          columns: ['Step', 'What Happens'],
          rows: [
            ['1. Spend tokens',       'Spend Action Tokens from the tracker. Each token activates one adversary (they attack, move, or use a special).'],
            ['2. Resolve adversaries', 'Describe what each activated adversary does. Resolve damage and effects.'],
            ['3. Optionally extend',  'Spend 1 Fear to make one additional GM move beyond the token-funded actions.'],
            ['4. Return spotlight',   'Pass the spotlight back to the players. Any player can go next.'],
          ]
        },
        {
          heading: 'Movement',
          kind: 'pairs',
          rows: [
            { label: 'Within Close range',  value: 'Free \u2014 move anywhere within Close range as part of any action. No roll, no cost.' },
            { label: 'Beyond Close range',  value: 'Costs your action. Make an Agility roll (DC set by context). On success, reach the target range band.' },
            { label: 'Range bands',          value: 'Melee \u00b7 Close \u00b7 Far (approximate distances \u2014 not precise grid squares).' },
          ]
        },
        {
          heading: 'Reactions',
          kind: 'pairs',
          rows: [
            { label: 'What they are',        value: 'Action rolls triggered by an incoming attack or hazard, rather than on your own initiative.' },
            { label: 'Key differences',      value: 'Reaction rolls do NOT generate Hope or Fear. They do NOT trigger additional GM moves. Allies cannot use Help an Ally on a reaction roll.' },
            { label: 'Critical on reaction', value: 'On a Critical, you do not clear Stress or gain Hope \u2014 instead, you fully ignore the triggering effect (no damage, no Stress).' },
            { label: 'Group reaction',       value: 'One PC leads an action roll. Other PCs supporting make reaction rolls. Lead gains +1 per ally success, \u22121 per ally failure. One outcome applies to all.' },
          ]
        },
        {
          heading: 'Countdown',
          kind: 'pairs',
          rows: [
            { label: 'What it is',  value: 'A visual scene timer tracking an approaching event (reinforcements, collapse, ritual completion, etc.).' },
            { label: 'How it moves', value: 'Advances by 1 each time a PC makes an action roll \u2014 successes and failures both advance it.' },
            { label: 'Resolution',  value: 'When it hits 0, the tracked event triggers. The GM decides the count at the start of the scene.' },
          ]
        },
        {
          heading: 'Optional: Structured Token System',
          kind: 'pairs',
          rows: [
            { label: 'Setup',       value: 'Each player starts the scene with 3 tokens (recommended). Remove 1 token each time that PC takes an action.' },
            { label: 'Spotlight',   value: 'The spotlight cannot move to a PC with no tokens remaining \u2014 it must go elsewhere.' },
            { label: 'When to use', value: 'Groups that want a more structured turn feel, or when players are struggling with organic spotlight rotation.' },
          ]
        }
      ]
    },

    /* ── Player Actions ────────────────────────────────────────────────── */
    {
      type: 'reference',
      title: 'Player Actions',
      role: 'Common actions on a PC\u2019s turn \u00b7 Not an exhaustive list \u2014 any narrative action is valid',
      headerClass: 'h-faction',
      sections: [
        {
          heading: 'Combat Actions (each costs your spotlight)',
          kind: 'table',
          columns: ['Action', 'Trait', 'Notes'],
          rows: [
            ['Attack (melee)',     'Finesse or Strength',  'Roll vs. target Evasion. On a hit, roll weapon damage die.'],
            ['Attack (ranged)',    'Finesse or Agility',   'Roll vs. target Evasion. On a hit, roll weapon damage die.'],
            ['Spellcast',          'Instinct or Presence', 'Roll vs. target Evasion. Damage type and die on the spell card.'],
            ['Unarmed Strike',     'Strength',             'Roll vs. target Evasion. On a hit, deal d4 damage.'],
            ['Sprint',             'Agility',              'Move beyond Close range. Uses your action \u2014 no attack this spotlight.'],
            ['Use Item',           '\u2014',               'Consume a potion, throw an alchemical, interact with an object.'],
            ['Use Domain Ability', 'Varies',               'Activate a loadout card feature. Some cost Hope, Stress, or have rest limits.'],
          ]
        },
        {
          heading: 'Collaborative Actions',
          kind: 'table',
          columns: ['Action', 'Cost', 'How It Works'],
          rows: [
            ['Help an Ally',    '1 Hope per helper',  'Spend 1 Hope and roll 1d6. Add that d6 to an ally\u2019s roll. Multiple PCs can each spend 1 Hope \u2014 the highest single d6 result is added (not summed). Does NOT cost your action.'],
            ['Tag Team',        '3 Hope (one-time)',  'Once per session per pair of PCs. Both roll separately, then CHOOSE which result applies to both characters. On a hit, BOTH roll damage and combine the totals. If Fear: GM gains 1 Fear per PC. Spend 3 Hope before rolling to activate.'],
            ['Group Action',    'No resource cost',   'One PC leads with an action roll. Others support with reaction rolls. Lead gets +1 per ally success, \u22121 per ally failure. One shared outcome. Allies\u2019 reactions do not generate Hope or Fear.'],
            ['Protect Ally',    'None',               'Interpose between an ally and an incoming hit. You take the damage instead. Can be used as a reaction to an ally being targeted.'],
          ]
        }
      ]
    },

    /* ── Adversary Types ───────────────────────────────────────────────── */
    {
      type: 'reference',
      title: 'Adversary Types',
      role: 'Ten types \u2014 each stat block lists HP, Evasion, attack damage, and any special moves',
      headerClass: 'h-hostile',
      sections: [
        {
          heading: 'Types',
          kind: 'table',
          columns: ['Type', 'Combat Role', 'Special Notes'],
          rows: [
            ['Minion',   'Weak alone, dangerous in groups',            'Any hit exceeding armor = down. No death saves. Use in swarms.'],
            ['Standard', 'Baseline threat',                            'Well-rounded. The default adversary.'],
            ['Bruiser',  'Tough, heavy-hitting',                       'High HP. Hits hard.'],
            ['Horde',    'Many enemies acting as one unit',            'At \u226550% HP marked, reduce standard attack damage (see stat block).'],
            ['Ranged',   'High damage from Far range',                 'Fragile up close. Penalised in melee.'],
            ['Skulk',    'Ambusher, mobile, exploits positioning',     'Moves frequently. Can gain Hidden. Punishes isolated PCs.'],
            ['Support',  'Buffs allies and debuffs PCs',               'Activate last so buffs are in place. Priority kill target.'],
            ['Leader',   'Commands \u2014 boosts others when active',  'Activates on its own spotlight turn. Allies perform better while Leader lives.'],
            ['Solo',     'Boss \u2014 fights the whole party alone',   'High HP. May have multiple phases or multi-actions per GM turn.'],
            ['Social',   'Non-combat challenge',                       'Uses Presence/Instinct rolls. Hostile conversation, not combat.'],
          ]
        }
      ]
    },

    /* ── Conditions ────────────────────────────────────────────────────── */
    {
      type: 'reference',
      title: 'Conditions & Status',
      role: 'Three core conditions \u00b7 other effects come from specific abilities',
      headerClass: 'h-neutral',
      sections: [
        {
          heading: 'Core Conditions',
          kind: 'table',
          columns: ['Condition', 'Effect', 'How to Clear'],
          rows: [
            ['Hidden',     'All rolls made against you have disadvantage.',     'Move into an enemy\u2019s line of sight \u00b7 make an attack \u00b7 enter their space.'],
            ['Vulnerable', 'All rolls targeting you have advantage.',            'Succeed on an Action Roll to shed it \u00b7 or clear the Stress that triggered it.'],
            ['Restrained', 'Cannot move from current position. Can still act.', 'Succeed on a Strength or Agility Action Roll to break free.'],
          ]
        },
        {
          heading: 'Stress States',
          kind: 'pairs',
          rows: [
            { label: 'Last Stress marked', value: 'Immediately become Vulnerable. Lasts until you clear \u22651 Stress slot.' },
            { label: 'Stress overflow',    value: 'If forced to mark Stress when all slots are full, mark 1 HP instead.' },
          ]
        },
        {
          heading: 'Void Condition (Age of Umbra)',
          kind: 'pairs',
          rows: [
            { label: 'Umbra-Touched', value: 'Applied by Void adversaries and Witch spells. Specific effect on the ability; typically imposes disadvantage on Hope rolls or causes ongoing magic damage.' },
          ]
        }
      ]
    },

    /* ── Hit Points & Damage ───────────────────────────────────────────── */
    {
      type: 'reference',
      title: 'Hit Points & Damage',
      role: 'Damage Thresholds \u00b7 Armor \u00b7 Death Moves',
      headerClass: 'h-neutral',
      sections: [
        {
          heading: 'Damage Thresholds',
          kind: 'table',
          columns: ['Final Damage', 'HP Marked'],
          rows: [
            ['Below Major threshold',   '1 HP'],
            ['\u2265 Major threshold',   '2 HP'],
            ['\u2265 Severe threshold',  '3 HP'],
          ]
        },
        {
          heading: 'Armor',
          kind: 'pairs',
          rows: [
            { label: 'Using armor',     value: 'Mark 1 Armor Slot to reduce HP marked by 1. Armor Slots fully restore on a short rest.' },
            { label: 'Max Armor Score', value: '12 (cannot exceed this regardless of equipment).' },
          ]
        },
        {
          heading: 'Death Moves \u2014 choose one when the last HP slot is marked',
          kind: 'table',
          columns: ['Option', 'Effect'],
          rows: [
            ['Blaze of Glory', 'Describe one final action \u2014 it automatically Critically Succeeds. Then the character dies.'],
            ['Avoid Death',    'Drop unconscious. Cannot move or act. Cannot be targeted. Return to consciousness when an ally clears \u22651 of your HP, or after a long rest.'],
            ['Risk It All',    'Roll Duality Dice. Hope higher \u2192 stay on your feet + clear HP/Stress equal to Hope die value (split however you like). Fear higher \u2192 die. Tied \u2192 stay, clear nothing.'],
          ]
        }
      ]
    },

    /* ── Spells, Abilities & Rests ─────────────────────────────────────── */
    {
      type: 'reference',
      title: 'Spells, Abilities & Rests',
      role: 'Domain cards \u00b7 Loadout vs Vault \u00b7 Short rest \u00b7 Long rest \u00b7 Recall Costs',
      headerClass: 'h-guard',
      sections: [
        {
          heading: 'Domain Cards: Loadout & Vault',
          kind: 'pairs',
          rows: [
            { label: 'What they are',   value: 'Domain cards are class abilities, spells, and features. Each card belongs to a domain (Blade, Bone, Codex, Splendor, Midnight, Grace, etc.) and has a level requirement and a Recall Cost (\u26a1 symbol, top right).' },
            { label: 'Loadout (active)', value: 'Max 5 domain cards active at any time. Only loadout cards can be used in play.' },
            { label: 'Vault (inactive)', value: 'All domain cards you own but haven\u2019t loaded. Accessible via Recall.' },
            { label: 'Free swap',        value: 'During any rest (short or long), move cards freely between loadout and vault at no cost.' },
            { label: 'Recall (mid-scene)', value: 'Outside a rest: mark Stress equal to the card\u2019s Recall Cost (\u26a1 value) to swap a vault card into your loadout immediately. You must remove a loadout card to make room if full.' },
            { label: 'Level-up',         value: 'When levelling up with a full loadout, move one active card to vault and add the new card at no cost.' },
          ]
        },
        {
          heading: 'Ability Frequency',
          kind: 'table',
          columns: ['Label on Card', 'Refreshes When'],
          rows: [
            ['Once per rest',       'After either a short rest or a long rest.'],
            ['Once per long rest',  'Only after a long rest. More powerful effects.'],
            ['Once per session',    'At the start of each session (Tag Team is an example).'],
            ['At will / no limit',  'Can be used any number of times with no rest requirement.'],
            ['Costs Hope/Stress',   'Can be used whenever you have the resource. Not rest-gated.'],
          ]
        },
        {
          heading: 'Short Rest (approx. 1 hour in-world)',
          kind: 'pairs',
          rows: [
            { label: 'Downtime moves', value: 'Each player picks TWO from the list below. The same move can be chosen twice.' },
            { label: 'Tend to Wounds', value: 'Clear 1d4 + Tier Hit Points (yourself or an ally).' },
            { label: 'Clear Stress',   value: 'Clear 1d4 + Tier Stress.' },
            { label: 'Repair Armor',   value: 'Clear 1d4 + Tier Armor Slots (yours or an ally\u2019s).' },
            { label: 'Prepare',        value: 'Describe how you prepare. Gain 1 Hope. If preparing with one or more party members, gain 2 Hope instead.' },
            { label: 'Features',       value: 'All \u201conce per rest\u201d features refresh. Effects labelled \u201clasts until next rest\u201d expire.' },
            { label: 'Swap cards',     value: 'Freely swap domain cards between loadout and vault.' },
            { label: 'Limit',          value: 'After 3 short rests in a row, the next rest must be a long rest.' },
          ]
        },
        {
          heading: 'Long Rest (several hours \u2014 sleep/camp)',
          kind: 'pairs',
          rows: [
            { label: 'Downtime moves', value: 'Each player picks TWO from the expanded list below. The same move can be chosen twice.' },
            { label: 'Tend to All Wounds', value: 'Clear ALL Hit Points (yourself or an ally).' },
            { label: 'Clear All Stress',   value: 'Clear ALL Stress.' },
            { label: 'Repair All Armor',   value: 'Clear ALL Armor Slots (yours or an ally\u2019s).' },
            { label: 'Prepare',            value: 'Gain 1 Hope (or 2 with party members). Same as short rest.' },
            { label: 'Work on a Project',  value: 'Progress long-term crafting, research, or downtime tasks.' },
            { label: 'Features',           value: 'All \u201conce per rest\u201d AND \u201conce per long rest\u201d features refresh. All rest-limited effects expire.' },
            { label: 'Swap cards',         value: 'Freely swap domain cards between loadout and vault.' },
          ]
        },
        {
          heading: 'Tier Reference (affects rest healing)',
          kind: 'table',
          columns: ['Tier', 'Levels', 'Healing from rests (1d4 + Tier)'],
          rows: [
            ['Tier 1', 'Level 1 only', '1d4 + 1'],
            ['Tier 2', 'Levels 2\u20134',  '1d4 + 2'],
            ['Tier 3', 'Levels 5\u20137',  '1d4 + 3'],
            ['Tier 4', 'Levels 8\u201310', '1d4 + 4'],
          ]
        }
      ]
    },

    /* ── Void Content (Age of Umbra) ───────────────────────────────────── */
    {
      type: 'reference',
      title: 'Void / Age of Umbra',
      role: 'Playtest content \u2014 16 new adversaries \u00b7 Witch class \u00b7 Void-sourced mechanics',
      headerClass: 'h-faction',
      sections: [
        {
          heading: 'Witch Class Spells (sample)',
          kind: 'table',
          columns: ['Spell', 'Range', 'Effect'],
          rows: [
            ['Withering Affliction', 'Far',   'Spellcast roll. Hit \u2192 d6+1 magic damage (d10+1 if rolled with Fear). Next time target damages an ally, halve that damage.'],
            ['Shared Trauma',        'Melee', '1/rest. Mark any number of HP on a willing creature to clear equal HP on another willing creature. Can use yourself for either role.'],
            ['Summon Horror',        'Far',   'Spellcast roll. Hit \u2192 spend 1 Hope to call an otherworldly creature dealing d10 magic damage.'],
          ]
        },
        {
          heading: 'Void Adversary Notes',
          kind: 'pairs',
          rows: [
            { label: 'Void Wraith',   value: 'Skulk type. Immune to non-magic damage. Applies Vulnerable on hit. Retreats into shadows to regain Hidden.' },
            { label: 'Umbral Horde',  value: 'Horde type. Deal magic damage. Reduced damage at \u226550% HP. Disperse on Leader\u2019s death.' },
            { label: 'Void Conduit',  value: 'Support type. Channels power to adjacent Void adversaries (+1 damage die). Priority target.' },
            { label: 'The Devourer',  value: 'Solo type. Multi-phase boss. Phase 2 at 50% HP \u2014 gains new move set and increased damage.' },
            { label: 'General rule',  value: 'Void adversaries deal magic damage. Armor thresholds still apply. Check the stat block for Void-specific features.' },
          ]
        },
        {
          heading: 'New Transformations (Playtest)',
          kind: 'pairs',
          rows: [
            { label: 'Available forms', value: 'Vampire \u00b7 Werewolf \u00b7 Reanimated \u00b7 Shapeshifter \u00b7 Ghost \u00b7 Demigod. Each grants new abilities and modifies existing ones. Applied via GM narrative event or character arc.' },
          ]
        }
      ]
    },

  ]
});
