Endale.registerPage('world/overview', {
  title: 'The World of Endale',
  subtitle: 'Setting overview \u00b7 Continents \u00b7 History \u00b7 Lore.',
  groups: [

    {
      type: 'reference',
      title: 'The World',
      role: 'A flat plane floating in The Nothing \u00b7 All races are anthropomorphic animalfolk',
      headerClass: 'h-neutral',
      sections: [
        {
          heading: 'Overview',
          kind: 'pairs',
          rows: [
            { label: 'Form',         value: 'A flat plane floating in The Nothing. No humans \u2014 all races are anthropomorphic animals (animalfolk). Four continents plus island chains.' },
            { label: 'The Moon',     value: 'One singular, featureless moon.' },
            { label: 'The Edge',     value: 'Where the flat world ends and water falls endlessly into The Nothing. Kozushima borders it. Scholars and sorcerers once studied it before the borders closed.' },
            { label: 'Bermuda Sluice', value: 'Wellspring of new oceanic water at the world\u2019s centre. No ship has survived it.' },
            { label: 'Magic',        value: 'Absent for generations before the party activated the Fonn lighthouse 5 years ago, flooding magic back into the world.' },
            { label: 'Visual tone',  value: 'Blacksad (comic) \u00b7 Tunic (game) \u00b7 Brand New Animal (anime)' },
          ]
        }
      ]
    },

    {
      type: 'reference',
      title: 'Continents',
      role: 'Four continents plus island chains',
      headerClass: 'h-neutral',
      sections: [
        {
          heading: 'Continents',
          kind: 'table',
          columns: ['Continent', 'Location', 'Character', 'Key Races'],
          rows: [
            ['Fuensueg',  'Northwest', 'Harsh, sandy, wind-cut. No capital. Commerce via fishing and a mercantile trade fleet. Key city: Hasharim Port (growing, accepts outsiders). Legendary hidden city of Shaddop \u2014 no one can find it.', 'Devils (Tasmanian), Birdfolk, Snakefolk, Fishfolk'],
            ['Kozushima', 'Northeast', 'Small, far northeast, closest to The Edge. Borders closed since gods disappeared. Highly spiritual. Port city: Sabisaki (rare access, no inland allowed).', 'Katari, Galapa, Raccoonkin, Simiah'],
            ['Keszyclaw', 'Southwest', 'Heavy snowfall, tundra, shifting borders. War-fanatic culture. Eastern half occupied by the Stagfolk Throdian Empire attempting to redirect the culture toward peaceful growth.', 'Bearfolk, Stagfolk, Dogkin'],
            ['Yavin',     'Southeast (campaign location)', 'Split into Northern Yavin, Southern Yavin, and Balenos. Most resource-abundant continent. Dense central forest. Coveted by many. Uneasy 4-year peace after the 32-year Battle of the Brave war.', 'Lionkin, Stagfolk, Katari, Mousekin'],
            ['Isles of Apes', 'Archipelago', 'Uninhabited archipelago. Savage Simiah tribes. Deadly lush forests.', 'Simiah'],
          ]
        }
      ]
    },

    {
      type: 'reference',
      title: 'History & Lore',
      role: 'Major historical events shaping the current world',
      headerClass: 'h-faction',
      sections: [
        {
          heading: 'The Divine Culling (283 years ago)',
          kind: 'pairs',
          rows: [
            { label: 'Event',       value: 'An ancient being called the Ancient One demanded worship. Mikello the Brave struck it down with the sacred blade Escalibur. The gods went silent after this.' },
            { label: 'Present Day', value: 'Religion exists but the divine no longer answers as they once did.' },
          ]
        },
        {
          heading: 'Battle of the Brave & 32-Year War',
          kind: 'pairs',
          rows: [
            { label: 'Cause',       value: 'The total rule of the royal Lionkin bloodline was put into question. A young Lionkin prince struck down his father in forced succession.' },
            { label: 'War',         value: '32-year conflict between North and South Yavin.' },
            { label: 'Present Day', value: 'Peace treaty came 4 years ago. Still uneasy. Lionkin inner turmoil ongoing. Pipkin\u2019s exile is connected to the current succession politics.' },
          ]
        },
        {
          heading: 'The Beacon Lighting (5 years ago)',
          kind: 'pairs',
          rows: [
            { label: 'Event',       value: 'Party (as children) climbed the Fonn tower with mentor Mortimer. Tooth killed Mortimer for tower access. PCs navigated puzzles, met the Endless One, and lit the beacon at the pinnacle.' },
            { label: 'Consequences', value: 'Magic flooded back into the world. Fonn lost its secrecy. The tower\u2019s light is visible for hundreds of miles. Ossian bound Fenlow the same night.' },
          ]
        },
        {
          heading: 'The Curse of Tongues',
          kind: 'pairs',
          rows: [
            { label: 'Nature',       value: 'A ritual curse rooted in old custodian magic. Surgical \u2014 affects only specific topics, not all speech. The cursed cannot speak on warded topics: the throat closes, words dissolve without the speaker noticing they\u2019ve changed subject. Does not affect writing (the loophole Fenlow used).' },
            { label: 'Confirmed on', value: 'Fenlow (full). Possibly: one Fonn ranger (partial), Corvel Featherhide (light \u2014 compliance only).' },
            { label: 'How to break', value: 'Ossian\u2019s willing removal \u00b7 his death \u00b7 Tower countercurse \u00b7 Presence 18 by Nora in direct contact with the cursed person.' },
            { label: 'Applied by',   value: 'Ossian, selectively, as \u201cprotective custodianship\u201d \u2014 loosening or tightening as reward and quiet punishment.' },
          ]
        },
        {
          heading: 'The Compact',
          kind: 'pairs',
          rows: [
            { label: 'What it is',   value: 'The night the beacon lit, Ossian approached Fenlow and bound him to an agreement. Fenlow agreed knowing it was wrong.' },
            { label: 'Key fact',     value: 'The compact is not about the village \u2014 it never was. Fenlow\u2019s letter says: \u201cit isn\u2019t what he said it was.\u201d' },
            { label: 'Chain',        value: 'An outside party (connected to the mage council and the mad king) is pressuring Ossian through Biggus. Ossian is not the top of the chain.' },
          ]
        },
        {
          heading: 'The Staff',
          kind: 'pairs',
          rows: [
            { label: 'Origin',      value: 'An old artifact \u2014 originally sent as a diplomatic gift from Pipkin (before his exile) to Fonn, routed through Fenlow as family contact.' },
            { label: 'Nature',      value: 'Not evil. Genuinely old and powerful.' },
            { label: 'Current',     value: 'Biggus intercepted the delivery via Drew and Rina. Now in Biggus\u2019s possession. A ward spell was cast from it \u2014 all three PCs saved against it. The spell marks targets and has interfered with the Veil\u2019s magic, contributing to the forest path anomaly.' },
          ]
        },
      ]
    },

  ]
});
