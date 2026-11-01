// Page map rules for TypeScript for Beginners. First matching rule wins.
export default [
  ['skip', 'Other languages, Playwright, React variants, interview questions and PDFs',
    /tamil|hindi|playwright|react|interview|pdf|y minutes/],
  ['/blog/typescript-vs-javascript', null, /\bvs\b|versus|difference|better|popularity|syntax/],
  ['/blog/typescript-tutorial-for-beginners', null, /./],
];
