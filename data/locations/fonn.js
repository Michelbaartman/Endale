Endale.registerPage('locations/fonn', {
  title: 'Fonn & Surroundings',
  subtitle: 'Key locations in and around the village.',
  groups: [

    {
      type: 'reference',
      title: 'Fonn',
      role: 'Hidden mountain settlement \u00b7 Lost Peaks',
      headerClass: 'h-feather',
      sections: [
        {
          heading: 'Overview',
          kind: 'pairs',
          rows: [
            { label: 'Location',       value: 'Hidden mountain settlement in the Lost Peaks. Home of warrior adept custodian families.' },
            { label: 'The Veil',       value: 'Strong arcane concealment historically kept Fonn secret. Since the beacon activation 5 years ago, the tower\u2019s silver-gold light column is visible for hundreds of miles. The village is no longer fully secret.' },
            { label: 'Current Status', value: 'Elders now act as reluctant advisors to the wider continent. Pilgrims, scholars, and desperate people seek out Fonn. The Lionguard\u2019s presence (10 guards + Pipkin) is straining the Crow\u2019s Nest and testing the village\u2019s patience.' },
          ]
        }
      ]
    },

    {
      type: 'reference',
      title: 'The Tower (Lighthouse)',
      role: 'One of four ancient lighthouses \u00b7 Activated 5 years ago',
      headerClass: 'h-faction',
      sections: [
        {
          heading: 'Overview',
          kind: 'pairs',
          rows: [
            { label: 'Status',         value: 'Beacon lit permanently. Silver-gold column visible for hundreds of miles.' },
            { label: 'Magic Return',   value: 'Activation flooded magic back into the world. Everyone in Fonn gained magical ability \u2014 except Sable.' },
            { label: 'Visions',        value: 'On certain nights, magically sensitive individuals receive visions or hear voices from it. Nora is most susceptible.' },
            { label: 'The Endless One', value: 'Stone eyeball entity that resides near the pinnacle. Nature and allegiances unknown.' },
            { label: 'The Other Three', value: 'Three other ancient lighthouses exist. Their locations are unknown. All are dark. Long-term hook.' },
          ]
        }
      ]
    },

    {
      type: 'reference',
      title: 'The Veiled Forest',
      role: 'Dense magical forest \u00b7 Conceals Fonn \u00b7 Currently anomalous',
      headerClass: 'h-feather',
      sections: [
        {
          heading: 'Anomalies',
          kind: 'pairs',
          rows: [
            { label: 'Path Shifting',   value: 'Paths change and change back. Twice, according to Corvel Featherhide. \u201cLike something is deciding.\u201d Reported by rangers, merchants Aldra and Wiscon, and Corvel.' },
            { label: 'Light Sightings', value: 'Strange lights in the treeline at night for two weeks. Finn the fisher thinks it\u2019s marsh gas. His daughter Motte has mapped the sightings \u2014 they form a territorial perimeter at the southern docks edge.' },
            { label: 'Cause',           value: 'Linked to the staff\u2019s ward spell. The ward disrupted the Veil\u2019s magic when cast. Something is now marking territory inside the forest boundary.' },
          ]
        },
        {
          heading: 'Key Intel Sources',
          kind: 'pairs',
          rows: [
            { label: 'Corvel Featherhide', value: 'Has been back to the forest twice since first report. Anomaly is worse. Won\u2019t tell his parents the full extent. Will tell Eweram everything if they get time alone.' },
            { label: 'Motte (Finn\u2019s daughter)', value: 'Has a rough perimeter map on sailcloth under the dock counter. The lights form a boundary. Not random.' },
          ]
        }
      ]
    },

    {
      type: 'reference',
      title: 'The Crow\u2019s Nest Inn',
      role: 'Run by Aldric & Senne Featherhide \u00b7 Party base of operations',
      headerClass: 'h-town',
      sections: [
        {
          heading: 'Status',
          kind: 'pairs',
          rows: [
            { label: 'Occupants',     value: 'All 10 Lionguard, Pipkin, and the party. Extended stay is straining the inn and its owners.' },
            { label: 'Aldric\u2019s Limit', value: 'Trusted Eweram\u2019s family and opened the inn without questions. That trust has a limit and it\u2019s approaching. He will ask, once, for an honest answer about what is going on under his roof.' },
            { label: 'Senne\u2019s Role',  value: 'Knows more about Fonn\u2019s social undercurrents than anyone the party has met. Notices everything. Has a mental map of who is behaving strangely \u2014 it overlaps with Biggus\u2019s operation.' },
          ]
        }
      ]
    },

    {
      type: 'reference',
      title: 'Biggus\u2019s Mansion',
      role: 'Command post \u00b7 Disguised as a manor \u00b7 Active cliffhanger location',
      headerClass: 'h-hostile',
      sections: [
        {
          heading: 'Layout',
          kind: 'pairs',
          rows: [
            { label: 'Exterior',      value: 'Sprawling 2\u20133 storey structure. Large courtyard. Hidden side entrance in bushes (used by ratkin crew).' },
            { label: 'Ground Floor',  value: 'War room (Biggus, first floor). Kitchen (cover, near chute room). Great Hall (presentable front). Barracks.' },
            { label: 'Other Rooms',   value: 'Meeting room (maps, letters, correspondence). Watchtower.' },
            { label: 'The Chute',     value: 'Hidden connection between ground floor and cellar. Active cliffhanger \u2014 Nora at the top, party climbing blind below.' },
            { label: 'The Cellar',    value: 'Fonn villagers in a trance-like stupor. \u201cLOLO WAS HERE\u201d scratched into the stone wall \u2014 she was conscious at some point. Voss knows which villagers are here. Lolo may be among them.' },
          ]
        },
        {
          heading: 'War Room Items',
          kind: 'pairs',
          rows: [
            { label: 'Unfinished letter', value: '\u201cThe staff is here. Will test on the lower stock tonight. If it works the way the old man says we won\u2019t need the herb shipments anymore.\u201d' },
            { label: 'War board',         value: 'Strings connecting names and locations. Greymane\u2019s name appears with a separate colour string to an outside location \u2014 not yet explained.' },
            { label: 'Small key',          value: 'Pink feather attached. Too small for any door in the manor. Connects Biggus to whatever Fenlow\u2019s letter points toward.' },
          ]
        }
      ]
    },

    {
      type: 'reference',
      title: 'Other Locations',
      role: 'Supporting locations in and around Fonn',
      headerClass: 'h-town',
      sections: [
        {
          heading: 'Fonn Village',
          kind: 'table',
          columns: ['Location', 'Owner / Occupant', 'Notes'],
          rows: [
            ['Apple Cider Tavern', 'Civilian', 'Site of the assassination attempt on Pipkin (Session 6). Berry x2, Clide, Drew, and Rina struck here.'],
            ['The Docks', 'Finn family', 'Southern edge of the Veiled Forest boundary. Motte\u2019s perimeter map is stored here.'],
            ['Butcher', 'Halder (Boarfolk)', 'Noticed ratkin buying unusual quantities of smoked meat for a month.'],
            ['Tailor', 'Wren (Sparrowfolk)', 'Has a mental list of villagers missing from routines \u2014 overlaps with the cellar.'],
          ]
        },
        {
          heading: 'Region',
          kind: 'pairs',
          rows: [
            { label: 'Skel & Gaupne', value: 'River villages south of the Lost Peaks. Trade hubs and cultural crossroads. First to feel strain of regional conflict. Less isolated than Fonn.' },
          ]
        }
      ]
    },

  ]
});
