// Page map rules for How to Motivate a Team. First matching rule wins.
export default [
  ['skip', 'Quotes, PDFs, retail-specific and sports phrasing', /quotes?|pdf|retail|win\b|what to say/],
  ['/blog/motivate-a-team-interview-answer', null, /interview/],
  ['/blog/team-motivation-ideas', null, /ideas|energi[sz]e/],
  ['/blog/how-to-motivate-employees', null, /./],
];
