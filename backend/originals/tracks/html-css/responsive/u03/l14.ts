import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 14 — building the full navigation bar step by step. Steps. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Build the nav bar',
  summary: 'Time to put it all together. Miracle walks Kofi through the header every visitor sees first, in four steps, from plain HTML to a bar that looks professional.',
  minutes: 12,
  outcomes: ['Build a header with a name and a navigation list', 'Remove list defaults and line the links up', 'Make the links comfortable tap targets'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to the nav bar',
      steps: [
        { title: '1. The HTML', body: 'A header holding the name and a nav. Inside the nav, a ul of links.', code: '<header class="site-header">\n  <a class="logo" href="#top">Mensah Beats</a>\n  <nav>\n    <ul class="nav-links">\n      <li><a href="#beats">Beats</a></li>\n      <li><a href="#gigs">Gigs</a></li>\n    </ul>\n  </nav>\n</header>', language: 'html' },
        { title: '2. The bar', body: 'Name left, nav right, middles lined up.', code: '.site-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 16px;\n}', language: 'css' },
        { title: '3. The links in a row', body: 'Remove the bullets and default spacing, then line them up.', code: '.nav-links {\n  display: flex;\n  gap: 8px;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}', language: 'css' },
        { title: '4. Thumb-sized links', body: 'Padding makes each link a bigger target, as in Chapter 1.', code: '.nav-links a {\n  display: inline-block;\n  padding: 12px;\n}', language: 'css' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The nav bar',
      caption: 'All four steps together.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; margin: 0; }\n  .site-header { display: flex; justify-content: space-between; align-items: center; padding: 8px 16px; background-color: #1F2E52; }\n  .logo { color: #FFF6E5; font-weight: bold; }\n  .nav-links { display: flex; gap: 8px; list-style: none; margin: 0; padding: 0; }\n  .nav-links a { display: inline-block; padding: 12px; color: #FF9600; }\n</style>\n<header class="site-header">\n  <a class="logo" href="#top">Mensah Beats</a>\n  <nav>\n    <ul class="nav-links">\n      <li><a href="#beats">Beats</a></li>\n      <li><a href="#gigs">Gigs</a></li>\n      <li><a href="#book">Book me</a></li>\n    </ul>\n  </nav>\n</header>\n',
      challenge: 'Change gap to 0 and padding on the links to 4px. Feel how much harder they\'d be to tap.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Header: flex, space-between, align-items center. Links: flex, gap, no bullets, padding for thumbs.',
    },
  ],
  apply: {
    scenario: 'Building the nav bar.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Write the header, nav and ul', 'Make the header a flex bar', 'Line up the links and remove list defaults', 'Give the links tap-sized padding'],
      },
      {
        kind: 'writeCode',
        prompt: 'Build the bar: .site-header gets display flex, justify-content space-between and align-items center',
        starter: '<style>\n\n</style>\n<header class="site-header">\n  <a class="logo" href="#top">Mensah Beats</a>\n  <nav><ul class="nav-links"><li><a href="#gigs">Gigs</a></li></ul></nav>\n</header>\n',
        solution: '<style>\n  .site-header { display: flex; justify-content: space-between; align-items: center; }\n</style>\n<header class="site-header">\n  <a class="logo" href="#top">Mensah Beats</a>\n  <nav><ul class="nav-links"><li><a href="#gigs">Gigs</a></li></ul></nav>\n</header>\n',
        hint: 'Three properties on .site-header.',
        checks: [
          { message: 'A flex bar', dom: { selector: '.site-header', style: 'display', styleValue: 'flex' } },
          { message: 'Opposite ends', dom: { selector: '.site-header', style: 'justify-content', styleValue: 'space-between' } },
          { message: 'Middles lined up', dom: { selector: '.site-header', style: 'align-items', styleValue: 'center' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Goes on .site-header, or on .nav-links?',
        groups: ['.site-header', '.nav-links'],
        items: [
          { text: 'justify-content: space-between', group: 0 },
          { text: 'list-style: none', group: 1 },
          { text: 'align-items: center (name and nav)', group: 0 },
          { text: 'gap between links', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the name a link to #top?',
        options: [
          { text: 'Clicking a site\'s name to get back to the top or home is what visitors expect' },
          { text: 'Flexbox needs links', why: 'It works with any element. It\'s a convention.' },
          { text: 'To make it orange', why: 'It\'s about what visitors expect.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'The links stack with bullets. Tap the rule that should fix it but targets the wrong element.',
        language: 'css',
        lines: ['.site-header { display: flex; }', 'nav { display: flex; list-style: none; }', '.nav-links a { padding: 12px; }'],
        bug: 1,
        explanation: 'The li elements are children of the ul, not the nav. Put this on .nav-links.',
        fix: '.nav-links { display: flex; list-style: none; padding: 0; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'I keep tapping Beats when I want Gigs.',
        options: [
          { text: 'Tap more carefully.', why: 'Fix the targets.' },
          { text: 'I\'ll give each link more padding so it\'s a bigger target, and keep a gap between them.' },
          { text: 'I\'ll remove the gap.', why: 'That makes it worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          ['list-style: none', 'No bullets'],
          ['margin: 0; padding: 0;', 'No default list spacing'],
          ['padding: 12px on links', 'Bigger tap targets'],
          ['align-items: center', 'Name and links lined up'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the visitor see at the top?',
        code: '.site-header { display: flex; justify-content: space-between; }\n\n<header class="site-header">\n  <a class="logo">Mensah Beats</a>\n  <nav>...</nav>\n</header>',
        language: 'html',
        options: [
          { text: 'Both on the left', why: 'space-between sends them to opposite ends.' },
          { text: 'The name above the nav', why: 'They\'re in a flex row.' },
          { text: 'The name on the left, the nav on the right' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the links row.',
        language: 'css',
        template: '.nav-links { display: flex; gap: 8px; [[1]]: none; margin: 0; [[2]]: 0; }',
        blanks: [['list-style'], ['padding']],
        distractors: ['bullets', 'border', 'gap'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element wraps the site\'s main navigation links? (tag name)',
        answers: ['nav', '<nav>'],
        placeholder: 'A tag',
      },
    ],
  },
  reflect: {
    prompt: 'Which links would go in your own nav bar?',
    starters: ['I\'d link to...', 'The name would...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Build the four-step nav bar on your own page, with your name and your own links.',
  },
  notes: 'Logo linking to the homepage/top is a widely followed web convention. font-weight was introduced in Course 1 Chapter 4.',
};

export default lesson;
