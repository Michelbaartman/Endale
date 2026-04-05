Endale.registerPage('characters/player-characters', {
  title: 'Player Characters',
  subtitle: 'The party \u00b7 Level 2 \u00b7 Currently in Fonn.',
  groups: [
    {
      type: 'cards',
      headerClass: 'h-guard',
      entries: [
        {
          name: 'Nora Lumigold',
          role: 'Albino catfolk \u00b7 Mage \u00b7 Lumigold family',
          rank: ['Player Character', 'Level 2'],
          fields: [
            { label: 'Appearance',    value: 'Albino blind catman (effeminate). The Lumigold family are Seers and secretkeepers of Fonn \u2014 they use catscratch braille.' },
            { label: 'Family',        value: 'Father: Kashbal. Mother: Noele. Brother: Mika (younger). Unknown sister who fled the Lumigold line, fell in love, and ran \u2014 whereabouts unknown.' },
            { label: 'Key Trait',     value: 'Blind. Mage abilities compensate and extend through it.' },
            { label: 'Active Hook',   value: 'Received a dream message: \u201cSyd Go Als\u201d \u2014 an anagram of \u201cSlay Gods.\u201d Meaning and sender unknown to Nora.' },
            { label: 'Campaign Role', value: 'Most magically sensitive. Can detect Curse of Tongues (Presence 18, direct contact). Gets Tower visions. Best positioned to read staff residue.' },
          ],
          gmNote: 'Aldous will not leave Nora alone once he learns she is a mage. The dream message sits dormant until magic research opens the right door.',
          tags: [
            { label: 'Mage',             cls: 'tag-blue' },
            { label: 'Curse-sensitive',  cls: 'tag-purple' },
            { label: 'Tower visions',    cls: 'tag-mid' },
            { label: 'Slay Gods (hook)', cls: 'tag-gold' },
          ]
        },
        {
          name: 'Eweram Ewegard',
          role: 'Goatfolk \u00b7 Ranger / Scout \u00b7 Ewegard family',
          rank: ['Player Character', 'Level 2'],
          fields: [
            { label: 'Style',         value: 'Brawler variant \u2014 shuns weapons, prefers fists.' },
            { label: 'Family',        value: 'Ewegard family \u2014 rangers and scouts among Fonn\u2019s custodian families. More respected in the family since magic returned.' },
            { label: 'Personality',   value: 'Stubborn.' },
            { label: 'Active Hook',   value: 'Three months ago found tracks suggesting the Guardian Stag. It did not answer. What changed when magic returned?' },
            { label: 'Connections',   value: 'Close friends with Corvel Featherhide. Best forest intelligence source in the party through Corvel \u2014 get them alone together.' },
          ],
          tags: [
            { label: 'Ranger',              cls: 'tag-green' },
            { label: 'Ewegard custodian',   cls: 'tag-light' },
            { label: 'Guardian Stag thread', cls: 'tag-mid' },
          ]
        },
        {
          name: 'Sable Applecrumb',
          role: 'Mousekin \u00b7 Fighter / Rogue \u00b7 Applecrumb family',
          rank: ['Player Character', 'Level 2'],
          fields: [
            { label: 'Family',        value: 'Father: Fenlow (tactician, cursed). Mother: Lolo (possibly in cellar). Large Applecrumb family \u2014 siblings and cousins on the Fonn Civilians page.' },
            { label: 'Key Trait',     value: 'Cannot use magic at all. The only person in Fonn without ability after the beacon. This is NOT a deficiency \u2014 it is resistance. Possibly deliberate. Possibly Rook\u2019s doing.' },
            { label: 'Active Hooks',  value: 'Has Fenlow\u2019s letter (private, not shared with party). Letter points to pink feathers north of the mill. Fenlow sent him because Ossian cannot touch Sable.' },
            { label: 'Campaign Role', value: 'The one person Ossian cannot bind. Key to breaking the compact\u2019s hold. Fenlow called his immunity \u201cuseless\u201d for years \u2014 out of fear, not contempt.' },
          ],
          gmNote: 'Sable is Fenlow\u2019s weapon against Ossian. His immunity is both his greatest asset and the reason Ossian has never directly engaged with him. That changes once Ossian realises Sable is actively working against the compact.',
          tags: [
            { label: 'Magic immune',            cls: 'tag-red' },
            { label: 'Fenlow\u2019s letter (private)', cls: 'tag-gold' },
            { label: 'Ossian cannot bind',       cls: 'tag-purple' },
          ]
        },
      ]
    }
  ]
});
