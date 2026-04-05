Endale.registerPage('story/threads', {
  title: 'Story Threads',
  subtitle: 'Active threads by urgency \u00b7 Last updated: Session 8.',
  groups: [

    {
      type: 'reference',
      title: 'Right Now \u2014 Immediate Pressure',
      role: 'Needs resolution this session or the next',
      headerClass: 'h-hostile',
      sections: [
        {
          heading: 'Active',
          kind: 'table',
          columns: ['Thread', 'Status', 'Notes'],
          rows: [
            ['CLIFFHANGER \u2014 Nora surrounded at chute top', 'URGENT', 'Ratkin uncloaked. Party climbing blind below. Session ended here.'],
            ['Villagers in the cellar', 'URGENT', 'Party broke cover for them. They will not leave without them. Lolo may be inside.'],
            ['The staff is with Biggus', 'URGENT', 'Biggus intends to test it on cellar villagers tonight. Unfinished letter confirms this.'],
            ['Stealth blown', 'URGENT', 'Biggus\u2019s rogues know someone was inside. The window to return is closing.'],
          ]
        }
      ]
    },

    {
      type: 'reference',
      title: 'This Arc \u2014 Next 2\u20133 Sessions',
      role: 'Will become urgent if left unaddressed',
      headerClass: 'h-guard',
      sections: [
        {
          heading: 'Threads',
          kind: 'table',
          columns: ['Thread', 'Key Question', 'Trigger'],
          rows: [
            ['Fenlow\u2019s letter (Sable, private)', 'Pink feathers north of the mill \u2014 person, place, creature, or all three?', 'Sable chooses to share it or follow the lead alone.'],
            ['Staff routing reveals a split', 'Was Ossian redirecting the staff, or is Biggus operating outside his authority?', 'Party examines war room evidence or confronts Drew.'],
            ['Lolo in the cellar', 'Is she there? The \u201cLOLO WAS HERE\u201d scratch says she was conscious at some point.', 'Party searches the cellar.'],
            ['Inside Fonn informant', 'Someone let the ratkin into the village. Still present.', 'Party investigates village movement. Wren\u2019s missing-persons list is key.'],
            ['Ossian and the letter', 'If Ossian learns Jhon gave Sable something, Fenlow\u2019s binding tightens immediately.', 'Ossian observes the party or questions Jhon.'],
            ['Varro the fasting guard', 'Hasn\u2019t eaten in two days. Something wrong unrelated to the mission.', 'Anyone takes the time to notice and ask.'],
            ['Greymane\u2019s separate string', 'His name on Biggus\u2019s war board, different-colour string, outside location. Unexplained.', 'Party examines the war board closely.'],
          ]
        }
      ]
    },

    {
      type: 'reference',
      title: 'Slow Burn \u2014 Mid to Late Campaign',
      role: 'Planted seeds \u00b7 Do not force \u00b7 Pay off when the moment is right',
      headerClass: 'h-neutral',
      sections: [
        {
          heading: 'Threads',
          kind: 'table',
          columns: ['Thread', 'What\u2019s Known', 'Pays Off When'],
          rows: [
            ['Pink feathers north of the mill', 'Fenlow\u2019s lead. Contents unknown.', 'Sable shares the letter and the party follows up.'],
            ['The woman in the grey cloak', 'Watching from the north treeline. Knew Rook Applecrumb. Knows what the compact actually says.', 'Party investigates the forest perimeter. Find her before Ossian does.'],
            ['Rook Applecrumb\u2019s past', 'Knew the grey cloak woman. Possibly the original Curse of Tongues target. Ossian\u2019s operation may root in Rook\u2019s generation.', 'Party investigates Rook directly, or grey cloak woman reveals it.'],
            ['Sable\u2019s magic immunity origin', 'Connected to Rook. Fenlow called it \u201cuseless\u201d out of fear, not contempt.', 'Latest payoff. Rook\u2019s history unlocks it.'],
            ['Ossian\u2019s external correspondent', 'Outside party connected to mage council pressing Ossian through Biggus. Same plot line as Pipkin\u2019s story and the mad king.', 'Pipkin arc and village arc converge.'],
            ['The compact\u2019s true purpose', 'Fenlow wrote \u201cit was never about the village.\u201d Ossian\u2019s real goal connects to something larger.', 'Party learns the compact\u2019s actual terms.'],
            ['The Guardian Stag', 'Eweram found tracks 3 months ago. Did not answer. Possibly connected to Forest anomaly or magic return.', 'Forest arc deepens or Eweram follows the lead.'],
            ['Tooth\u2019s return', 'Alive. Survived the Endless One. Current goals unknown.', 'Hold until village arc resolves.'],
            ['The other three lighthouses', 'One of four. The others are dark and unaccounted for.', 'Long-horizon hook.'],
            ['\u201cSlay Gods\u201d (Nora\u2019s dream)', 'Anagram of \u201cSyd Go Als.\u201d Sender and meaning unknown to Nora.', 'Magic research or another Tower vision.'],
            ['Nora\u2019s unknown sister', 'Fled the Lumigold line, fell in love, ran away. Whereabouts unknown.', 'Future arc when Nora investigates her family\u2019s past.'],
          ]
        }
      ]
    },

  ]
});
