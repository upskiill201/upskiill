// Page map rules for How to Stop Impulse Buying. First matching rule wins.
export default [
  ['skip', 'Business-studies definitions, marketing theory, other languages and Reddit',
    /business|marketing|consumer behaviour|tagalog|malay|hindi|reddit|in a sentence|meaning/],
  ['/blog/why-do-i-impulse-buy', null, /why|keep|so much|adhd/],
  ['/blog/how-to-stop-impulse-buying', null, /./],
];
