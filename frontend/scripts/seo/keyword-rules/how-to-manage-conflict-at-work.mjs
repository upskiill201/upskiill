// Page map rules for How to Manage Conflict at Work. First matching rule wins.
export default [
  ['skip', 'Relationships, marriage, games, quotes and PDFs',
    /relationship|marriage|biblical|midnight suns|quotes?|pdf|reddit|dummies|stress/],
  ['/blog/conflict-at-work-interview-question', null, /interview|answer|question/],
  ['/blog/how-to-deal-with-difficult-coworkers', null, /coworker|colleague|difficult|challenging/],
  ['/blog/how-to-handle-conflict-at-work', null, /./],
];
