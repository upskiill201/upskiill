// Page map rules for Machine Learning for Beginners. First matching rule wins.
export default [
  ['skip', 'Other languages, cities, brand courses and repos, books, PDFs, R and docs sites',
    /tamil|hindi|pune|bangladesh|github|microsoft|chris sebastian|tutorialspoint|geeksforgeeks|pdf|book| r$|in r\b|coursera|near me/],
  ['/blog/is-machine-learning-easy-to-learn', null, /easy|hard|teach myself|self|difficult|on my own|how long/],
  ['/blog/learn-machine-learning-from-scratch', null, /./],
];
