// Page map rules for Leadership for Beginners. First matching rule wins, so order matters.
export default [
  ['skip', 'Not about work leadership (games, church, school, family, other fields, one-off phrases)',
    /\bciv\b|civilization|optcg|beginning with|start with|church|bible|christian|\bgod\b|army|military|sport|dog|relationship|marriage|scout|youth|choir|odysseus|zhou enlai|meme|drawing|tie a leader|best wishes|message to|when a good leader|rules the people|speech|quotes?\b|\bk-?12\b|\bteens?\b|\bkids?\b|children|student|class leader|in school|at school|in class|nursing|nurse|healthcare|education|teacher|athlete/],
  ['backlog', 'Other languages and places (need translated pages or real local facts first)',
    /hindi|urdu|tagalog|tamil|spanish|french|malay|near me|india|zurich|london|atlanta|kenya|nigeria|synonym/],
  ['backlog', 'Books, PDFs and videos (needs a reviewed list; next batch)', /\bbooks?\b|pdf|dummies|reddit|youtube|\bted\b|audiobook|podcast|notes/],
  ['/blog/leadership-skills-for-resume', null, /resume|\bcv\b|interview|performance review|linkedin|\bjobs?\b|salary|career|entry level|phrases/],
  ['/blog/leadership-skills-vs-management-skills', null, /\bvs\b|versus|difference|traits|behaviou?rs|can leadership|can management|management skills|born|learned/],
  ['/blog/leadership-styles-for-beginners', null, /styles?\b|quiz|assessment|types of|transformational|servant|autocratic|democratic|situational/],
  ['/blog/new-manager-tips', null, /new manager|first.?time manager|first day|managers? getting|manager tips|new supervisor|supervisor|team lead|team leader|line manager|promoted|manager guide|manager role|good manager/],
  ['/blog/leadership-training-for-beginners', null, /course|training|certificat|class\b|classes|program|workshop|degree|coach|development|apps?\b|online|template|free/],
  ['/blog/leadership-skills-list-and-examples', null, /skills?\b|qualit|characteristics|competenc|examples?|definition|meaning|what is|list\b|\bexample\b/],
  ['/blog/how-to-be-a-good-leader', null, /./],
];
