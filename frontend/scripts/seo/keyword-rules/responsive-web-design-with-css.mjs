// Page map rules for Responsive Web Design with CSS. First matching rule wins.
export default [
  ['skip', 'Figma, apps, React, jobs, Dubai, freeCodeCamp comparisons, PDFs and books',
    /figma|app\b|app development|react|jobs?\b|dubai|freecodecamp|pdf|book|hindi|bootstrap|tester|interview|template|inspiration|class\b|youtube/],
  ['/blog/css-tutorial-for-beginners', null, /css tutorial|css course|flexbox|grid/],
  ['/blog/what-is-responsive-web-design', null, /./],
];
