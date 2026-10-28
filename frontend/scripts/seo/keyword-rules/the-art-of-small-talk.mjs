// Page map rules for The Art of Small Talk. First matching rule wins.
export default [
  ['skip', 'Dating, other languages, kids, ESL lists and books',
    /girl|guy|dating|spanish|french|kids|esl|book|reddit|video|weather|chat\b/],
  ['/blog/small-talk-topics', null, /topics|questions|list|examples?|avoid/],
  ['/blog/how-to-make-small-talk', null, /./],
];
