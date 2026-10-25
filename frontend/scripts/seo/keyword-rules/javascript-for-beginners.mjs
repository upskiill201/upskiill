// Page map rules for JavaScript for Beginners. First matching rule wins.
export default [
  ['skip', 'Other languages, cities, brand tutorials, PDFs, books and videos',
    /tamil|telugu|hindi|amharic|bangladesh|chennai|tutorialspoint|w3schools|pdf|book|youtube|y minutes/],
  ['/blog/javascript-course-free-with-certificate', null, /course|certificate/],
  ['/blog/javascript-for-beginners-guide', null, /./],
];
