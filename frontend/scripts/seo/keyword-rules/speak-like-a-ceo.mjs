// Page map rules for Speak Like a CEO. First matching rule wins.
export default [
  ['skip', 'Books, PDFs, apps, social accounts, kids and other languages', /pdf|book|youtube|instagram|app\b|kids|hindi|insead|english|course/],
  ['/blog/what-is-executive-presence', null, /executive presence|ceo|storytelling/],
  ['/blog/public-speaking-tips-for-beginners', null, /public speaking|anxiety|students|beginners|skills/],
  ['/blog/how-to-speak-confidently', null, /./],
];
