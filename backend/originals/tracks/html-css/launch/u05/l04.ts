import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 4 — the v2.0 home page, every part from the whole track. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The v2.0 home page',
  summary: 'The checks are done and the fixes are in. Kofi scrolls the final home page and realises every part of it came from a different chapter. Tap each part.',
  minutes: 11,
  outcomes: ['Read a complete, finished home page', 'Say which chapter each part came from', 'Spot what holds the page together'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '<body>\n  <a class="skip-link" href="#main">Skip to main content</a>\n  <header class="site-header">\n    <nav aria-label="Main">\n      <a href="index.html" aria-current="page">Home</a>\n      <a href="beats.html">Beats</a>\n      <a href="book.html">Book Kofi</a>\n    </nav>\n  </header>\n  <main id="main">\n    <h1>Mensah Beats: beat producer in Accra</h1>\n    <section class="gallery">\n      <img src="covers/rain-on-zinc.webp" alt="Rain on Zinc cover" width="600" height="600">\n    </section>\n    <a class="button" href="book.html">Book Kofi for your event</a>\n  </main>\n  <footer>&copy; 2026 Mensah Beats</footer>\n</body>',
      hotspots: [
        { phrase: 'class="skip-link"', note: 'Chapter 3 of this course: keyboard users can jump past the menu.' },
        { phrase: 'aria-current="page"', note: 'Chapter 3: tells screen readers which page you\'re on.' },
        { phrase: '<h1>Mensah Beats: beat producer in Accra</h1>', note: 'Course 1 gave you headings; Chapter 4 here made it say what the site is.' },
        { phrase: 'class="gallery"', note: 'Course 2: a Grid that fits any screen.' },
        { phrase: 'width="600" height="600"', note: 'Chapter 4: the page doesn\'t jump while images load.' },
        { phrase: 'class="button"', note: 'Chapter 2: a button with a kind, quick hover.' },
        { phrase: '&copy;', note: 'Writes the copyright sign. Course 1 taught you entities like this.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mensah Beats v2.0 (home)',
      caption: 'A short version of the finished home page. Make it narrow and wide.',
      code: '<style>\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; }\n  a { color: #FFC83D; }\n  .skip-link { position: absolute; left: -999px; }\n  .skip-link:focus { left: 16px; top: 16px; }\n  .site-header { padding: 16px; background-color: #1F2E52; }\n  nav { display: flex; gap: 16px; flex-wrap: wrap; }\n  main { padding: 16px; }\n  .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px; }\n  .gallery img { width: 100%; height: auto; border-radius: 12px; }\n  .button { display: inline-block; margin-top: 16px; padding: 12px 24px; background-color: #FF9600; color: #14213D; border-radius: 999px; text-decoration: none; font-weight: bold; }\n  footer { padding: 16px; }\n</style>\n<a class="skip-link" href="#main">Skip to main content</a>\n<header class="site-header">\n  <nav aria-label="Main">\n    <a href="index.html" aria-current="page">Home</a>\n    <a href="beats.html">Beats</a>\n    <a href="book.html">Book Kofi</a>\n  </nav>\n</header>\n<main id="main">\n  <h1>Mensah Beats: beat producer in Accra</h1>\n  <section class="gallery">\n    <img src="cover-1.png" alt="Rain on Zinc cover" width="400" height="400">\n    <img src="cover-2.png" alt="Kente Code cover" width="400" height="400" loading="lazy">\n    <img src="cover-3.png" alt="Labadi Waves cover" width="400" height="400" loading="lazy">\n  </section>\n  <a class="button" href="book.html">Book Kofi for your event</a>\n</main>\n<footer>&copy; 2026 Mensah Beats</footer>\n',
      challenge: 'Press Tab once in the preview. What appears first?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A finished page is every small lesson, stacked. Nothing in it is new.',
    },
  ],
  apply: {
    scenario: 'The v2.0 home page.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part to what it does.',
        pairs: [
          ['Skip link', 'Jump past the menu'],
          ['aria-current', 'Marks the page you\'re on'],
          ['Grid gallery', 'Fits any screen'],
          ['width and height', 'Stops the page jumping'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the footer: "&copy; 2026 Mensah Beats" inside a footer element',
        starter: '<main id="main">\n  <h1>Mensah Beats</h1>\n</main>\n\n',
        solution: '<main id="main">\n  <h1>Mensah Beats</h1>\n</main>\n<footer>&copy; 2026 Mensah Beats</footer>\n',
        hint: '<footer>&copy; 2026 Mensah Beats</footer>',
        checks: [
          { message: 'A footer', dom: { selector: 'footer', count: 1 } },
          { message: 'With the year and name', dom: { selector: 'footer', text: '2026 Mensah Beats' } },
          { message: 'Using the entity', codeIncludes: '&copy;' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the skip link come first in the body?',
        options: [
          { text: 'So it\'s the first thing a keyboard user reaches with Tab' },
          { text: 'So it looks nice at the top', why: 'It\'s hidden until focused.' },
          { text: 'Search engines need it first', why: 'It\'s for keyboard users.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which course gave Kofi this part?',
        groups: ['Course 2', 'Course 3'],
        items: [
          { text: 'The Grid gallery', group: 0 },
          { text: 'The skip link', group: 1 },
          { text: 'The Flexbox nav', group: 0 },
          { text: 'Image width and height for speed', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks the skip link.',
        language: 'html',
        lines: ['<a class="skip-link" href="#main">Skip to main content</a>', '<nav aria-label="Main">...</nav>', '<main id="content">'],
        bug: 2,
        explanation: 'The skip link points to #main, so main needs id="main".',
        fix: '<main id="main">',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Where\'s the skip link? I can\'t see it.',
        options: [
          { text: 'It\'s hidden until you press Tab. Then it appears for keyboard users.' },
          { text: 'There isn\'t one.', why: 'It\'s there, just hidden.' },
          { text: 'It only works on phones.', why: 'It\'s for keyboards.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show on the page?',
        code: '<footer>&copy; 2026 Mensah Beats</footer>',
        language: 'html',
        options: [
          { text: 'The copyright sign, then "2026 Mensah Beats"' },
          { text: 'The letters "&copy;"', why: 'It\'s an entity; it becomes the sign.' },
          { text: 'Nothing', why: 'Footers are visible.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the nav link for the current page.',
        language: 'html',
        template: '<a href="index.html" aria-[[1]]="[[2]]">Home</a>',
        blanks: [['current'], ['page']],
        distractors: ['label', 'hidden', 'true'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the body in order, top to bottom.',
        language: 'html',
        lines: ['<a class="skip-link" href="#main">Skip to main content</a>', '<header class="site-header">...</header>', '<main id="main">...</main>', '<footer>&copy; 2026 Mensah Beats</footer>'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The skip link points to which id? (one word)',
        answers: ['main', '#main'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Look at your own home page. Which part came from which lesson?',
    starters: ['My nav came from...', 'I still need...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Read your own home page top to bottom and label each part with the chapter it came from. Anything without a label, ask yourself if it belongs.',
  },
  notes: '&copy; is written as an entity (no literal copyright sign in content). Gallery uses cover images in a Grid.',
};

export default lesson;
