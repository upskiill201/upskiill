// Page map rules for Money Habits That Build Long-Term Wealth. First matching rule wins.
export default [
  ['skip', 'Books, PDFs, kids, celebrity names and Reddit threads', /book|pdf|kids|glock|reddit|richest person|woman|vs poor/],
  ['/blog/money-habits-that-build-wealth', null, /habit/],
  ['/blog/how-to-build-wealth-from-nothing', null, /./],
];
