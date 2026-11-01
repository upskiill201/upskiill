// Page map rules for React Native for Beginners. First matching rule wins.
export default [
  ['skip', 'Other languages, cities, brand tutorials and PDFs we cannot honestly answer',
    /hindi|tamil|telugu|bangladesh|noida|rawalpindi|kerala|near me|w3schools|tutorialspoint|coursera|udemy|pdf|book/],
  ['/blog/is-react-native-easy-to-learn', null, /easy|hard|week|scratch|difficult|how long/],
  ['/blog/react-native-tutorial-for-beginners', null, /./],
];
