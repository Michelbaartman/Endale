Endale.registerPage('lore/items', {
  title: 'Items of Note',
  subtitle: 'Significant artifacts, documents, and objects in play.',
  groups: [

    {
      type: 'reference',
      title: 'Items of Note',
      role: 'Status as of Session 8',
      headerClass: 'h-amber',
      sections: [
        {
          heading: 'Current Items',
          kind: 'table',
          columns: ['Item', 'Location', 'Significance'],
          rows: [
            ['The Staff',              'With Biggus',              'Old artifact, not evil. Diplomatic gift from Pipkin, intercepted by Biggus via Drew and Rina. Ward spell cast from it \u2014 marks targets, disrupted the Veil. Biggus intends to test it on cellar villagers tonight.'],
            ['Fenlow\u2019s Letter',         'With Sable (private)',      'Written the night of the compact. Passed via Jhon. Points to pink feathers north of the mill. Not yet shared with the party. Key contents: the compact isn\u2019t what Ossian said; Sable\u2019s immunity is real; find the pink feathers.'],
            ['Pipkin\u2019s Heirloom Cane',  'Missing \u2014 somewhere in Fonn', 'Magic artifact. Taken before/during Pipkin\u2019s exile. Needed to unlock his dormant abilities.'],
            ['Small Key with Pink Feather', 'Biggus\u2019s war room drawer', 'Too small for any door in the manor. Connects Biggus to whatever Fenlow\u2019s letter points toward. Neither party knows the other has a lead to the same place.'],
            ['Biggus\u2019s Unfinished Letter', 'War room desk',          '\u201cThe staff is here. Will test on the lower stock tonight.\u201d Addressed to no one yet.'],
            ['Biggus\u2019s Signet Ring',    'On Biggus',               'Three-line circle brand. Matches Scratchen\u2019s wrist brand. Connection predates this operation.'],
            ['Motte\u2019s Sailcloth Map',   'Under the dock counter',   'Maps light sightings forming a territorial perimeter at the forest edge. Not yet found by the party.'],
            ['\u201cLOLO WAS HERE\u201d scratch',  'Cellar wall',              'Scratched into stone. She was conscious at some point while held in the cellar.'],
            ['Escalibur',              'Location unknown',         'Sacred blade used by Mikello the Brave to strike down the Ancient One 283 years ago. Whereabouts untracked. Long-term lore hook.'],
          ]
        },
        {
          heading: 'GM Notes',
          kind: 'pairs',
          rows: [
            { label: 'Pink feather connection', value: 'Both Fenlow\u2019s letter (pointing north of the mill) and the small key in Biggus\u2019s war room (with a pink feather attached) point toward the same unknown destination. Neither the party nor Biggus has connected these yet.' },
            { label: 'Staff ward marks',         value: 'The ward spell cast from the staff marked all three PCs (they saved vs it). Someone now knows where the party is. This has not yet been addressed in play.' },
          ]
        }
      ]
    },

  ]
});
