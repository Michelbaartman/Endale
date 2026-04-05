Endale.registerPage('characters/key-individuals', {
  title: 'Key Individuals',
  subtitle: 'Named characters outside the main factions.',
  groups: [
    {
      type: 'cards',
      headerClass: 'h-faction',
      entries: [
        {
          name: 'Ossian',
          role: 'Orange tabby catfolk \u00b7 Elder Shaman of Fonn',
          rank: ['Key Individual', 'Antagonist'],
          fields: [
            { label: 'Appearance',   value: 'Fur faded near-white at muzzle and around eyes. Tabby stripes softened by age. Looks like someone\u2019s grandfather. That is the most dangerous thing about him.' },
            { label: 'Motivation',   value: 'Believes magic\u2019s return will unmake the world unless someone steers it. Fonn is an acceptable cost. Not the top of the chain \u2014 an outside party (connected to the mage council and the mad king) presses him through Biggus.' },
            { label: 'Magic',        value: 'Prophetic \u2014 sees threads of fate and manipulates them.' },
            { label: 'Stats',        value: 'Spell DC 16. Do not run as a combat encounter.' },
            { label: 'Abilities',    value: 'Thread-Reading (passive \u2014 never surprised, often describes what a PC will do before they do it). Binding Word (Presence 16 or cannot speak on specific topic for the scene). Weight of What You\u2019ll Do (2 Fear \u2014 describes one true future consequence, all PCs mark 1 Stress). Walk Away (passive \u2014 cannot be physically detained; repeated attempts cost 1 Stress each).' },
          ],
          gmNote: 'Every scene with Ossian ends on his terms, not the party\u2019s. He should leave, not be defeated. Save Weight of What You\u2019ll Do for pivotal player moments \u2014 most impactful in the campaign.',
          quote: '\u201cI am not your enemy. I am simply further along the same road.\u201d',
          tags: [
            { label: 'Elder Shaman',        cls: 'tag-purple' },
            { label: 'Curse of Tongues',    cls: 'tag-dark' },
            { label: 'Not top of chain',    cls: 'tag-mid' },
          ]
        },
      ]
    },
    {
      type: 'cards',
      headerClass: 'h-amber',
      entries: [
        {
          name: 'Fenlow Applecrumb',
          role: 'Mousekin \u00b7 Tactician \u00b7 Sable\u2019s Father',
          rank: ['Key Individual', 'Ally (limited)'],
          fields: [
            { label: 'Appearance',    value: 'Compact and still. Greying at ears. Moves with purpose, no urgency.' },
            { label: 'Stats',         value: 'HP 10 \u00b7 Stress 8 \u00b7 Armor 2 \u00b7 Attack +2 \u00b7 Evasion 12' },
            { label: 'Curse State',   value: 'Cannot speak about Ossian\u2019s binding, compact terms, Lolo\u2019s whereabouts, or anything that directly exposes Ossian\u2019s operation. Stops mid-sentence, changes subject, gets nosebleeds under pressure. Can write around it, point, or say \u201cI can\u2019t\u201d rather than deflecting.' },
            { label: 'The Letter',    value: 'Written the night of the compact. Passed via Jhon to Sable. Key contents: \u201cWhat I agreed to \u2014 it isn\u2019t what he said it was.\u201d / \u201cYou can do what the rest of us can\u2019t. I called it useless because I was afraid.\u201d / \u201cFind the pink feathers in the forest. North of the mill.\u201d' },
            { label: 'Combat',        value: 'Read and React (reaction, redirect attacks). Controlled Strike (1d6+2, chooses hit location on 14+). Cover Ground (1 Fear, free ally repositioning once/scene).' },
          ],
          gmNote: 'At max Stress \u2014 goes completely silent for the scene. The curse and the man become indistinguishable. Won\u2019t hurt Sable under any circumstances.',
          quote: '\u201cFind the pink feathers in the forest. North of the mill. Don\u2019t ask anyone in Fonn where they lead.\u201d',
          tags: [
            { label: 'Curse of Tongues (full)', cls: 'tag-dark' },
            { label: 'Ally (limited)',           cls: 'tag-mid' },
            { label: 'Letter sent',              cls: 'tag-gold' },
          ]
        },
        {
          name: 'Jhon Applecrumb',
          role: 'Mousekin \u00b7 Knight / Bodyguard',
          rank: ['Key Individual', 'Neutral Ally'],
          fields: [
            { label: 'Appearance',  value: 'Solid, unhurried. Worn but well-kept plate at shoulders and chest.' },
            { label: 'Personality', value: 'Loyal through duty, not ideology. Aloof until he decides you\u2019re worth it, then steady and direct.' },
            { label: 'Stats',       value: 'HP 13 \u00b7 Stress 5 \u00b7 Armor 4 \u00b7 Attack +3 \u00b7 Evasion 11' },
            { label: 'Combat',      value: 'Shield Advance (1d8+3, moves freely into Close). Interpose (reaction, takes half damage for any Close ally). Soldier\u2019s Reprimand (1d6+3, disarms or destabilises).' },
            { label: 'Traits',      value: 'Trained Soldier (reduce all incoming damage by 1 extra). Immune to Fear-based Stress. Won\u2019t strike Sable.' },
          ],
          gmNote: 'Passed Fenlow\u2019s letter to Sable. Suspects Fenlow is in trouble. Was at the Crow\u2019s Nest roundtable meeting in Session 7.',
          tags: [
            { label: 'Letter carrier',    cls: 'tag-gold' },
            { label: 'Fenlow connection', cls: 'tag-mid' },
          ]
        },
      ]
    },
    {
      type: 'cards',
      headerClass: 'h-neutral',
      entries: [
        {
          name: 'Tooth',
          role: 'Pantherman \u00b7 Antagonist',
          rank: ['Key Individual', 'Whereabouts Unknown'],
          fields: [
            { label: 'History', value: 'Known to Mortimer. Killed Mortimer for tower access. Used the child PCs to navigate tower puzzles. Present at the pinnacle when the beacon lit. Supported beacon activation. The Endless One \u201cdealt with\u201d him \u2014 he survived.' },
            { label: 'Status',  value: 'Alive. Not yet reintroduced. Hold until the village arc resolves.' },
          ],
          tags: [
            { label: 'Mortimer\u2019s killer', cls: 'tag-red' },
            { label: 'Tower survivor',      cls: 'tag-mid' },
            { label: 'Hold \u2014 later arc', cls: 'tag-dark' },
          ]
        },
        {
          name: 'Mortimer',
          role: 'White owlman \u00b7 Deceased Mentor',
          rank: ['Key Individual', 'Deceased'],
          fields: [
            { label: 'Description', value: 'Absent-minded wizard-scholar. Lived near the tower base.' },
            { label: 'History',     value: 'Mentor to the PCs in childhood. Killed by Tooth for tower access. His death is the inciting act of the campaign\u2019s origin.' },
          ],
          tags: [
            { label: 'Deceased',      cls: 'tag-dark' },
            { label: 'Party mentor',  cls: 'tag-light' },
          ]
        },
        {
          name: 'The Endless One',
          role: 'Unknown Entity \u00b7 Tower Pinnacle',
          rank: ['Key Individual', 'Unknown'],
          fields: [
            { label: 'Description',   value: 'Floating giant stone eyeball covered by a stone eyelid. Encountered at the tower pinnacle when the beacon was lit.' },
            { label: 'Known Actions', value: '\u201cDealt with\u201d Tooth at the pinnacle \u2014 incompletely. He survived.' },
            { label: 'Status',        value: 'Nature and allegiances unknown. Has not been encountered since the beacon lighting.' },
          ],
          tags: [
            { label: 'Unknown alignment', cls: 'tag-purple' },
            { label: 'Tower entity',      cls: 'tag-mid' },
          ]
        },
      ]
    }
  ]
});
