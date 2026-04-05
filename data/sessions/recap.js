Endale.registerPage('sessions/recap', {
  title: 'Session Recap',
  subtitle: 'Quick notes per session · Add new entries from Active Manager',
  groups: [

    {
      type: 'reference',
      title: 'Session 9 — TBD',
      role: 'Upcoming · Notes from session start',
      headerClass: 'h-faction',
      sections: [
        {
          heading: 'Events',
          kind: 'pairs',
          rows: [
            { label: 'Summary',     value: '' },
            { label: 'Key beats',   value: '' },
            { label: 'Cliffhanger', value: '' },
          ]
        },
        {
          heading: 'Notes',
          kind: 'note',
          body: ''
        }
      ]
    },

  ]
});
