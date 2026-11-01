// Page map rules for HTML & CSS for Beginners. First matching rule wins.
export default [
  ['skip', 'Other-language videos and brand-name tutorials we cannot honestly answer', /urdu|tamil|hindi|telugu|bangla|amharic|marathi|w3schools|tutorialspoint|geeks|javatpoint|scrimba|youtube|video|fees|book|pdf|download/],
  ['/blog/html-tutorial-for-beginners', null, /html tutorial|html course|what is html|difference between|certificate|tutorial/],
  ['/blog/how-to-learn-html-and-css', null, /./],
];
