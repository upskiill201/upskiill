import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 2 — a page of meaningless boxes (div) vs landmarks (header, nav, main, footer). Before / After. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Boxes vs landmarks',
  summary: 'Clinton\'s football team page is built entirely from div, a box that means nothing. It looks fine. To a screen reader, it\'s one long blur. Here it is, and the same page built from landmarks.',
  minutes: 11,
  outcomes: ['Explain what div is, and why it means nothing', 'Use header, nav, main and footer as landmarks', 'Choose meaningful elements before generic ones'],
  learn: [
    {
      kind: 'compare',
      title: 'Meaningless boxes vs landmarks',
      before: { label: 'All div', text: '<div class="top">\n  <div class="links">...</div>\n</div>\n<div class="content">...</div>\n<div class="bottom">...</div>\n\ndiv is a box with no meaning. It\'s useful for styling, but a screen reader can\'t tell the menu from the content from the footer. Kwesi hears one long page.' },
      after: { label: 'Landmarks', text: '<header>\n  <nav>...</nav>\n</header>\n<main>...</main>\n<footer>...</footer>\n\nSame boxes, same CSS, but each one says what it is. Screen readers list them as landmarks, so Kwesi can jump straight to the navigation, the main content or the footer.' },
      notes: [
        'div is a generic box. Use it only when no meaningful element fits.',
        'header, nav, main and footer are landmarks people can jump between.',
        'They look exactly the same as divs until you style them.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'The landmark skeleton',
      caption: 'Every part of the page is a landmark. Style them like any other box.',
      code: '<style>\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  header, main, footer { padding: 16px; }\n  header, footer { background-color: #1F2E52; }\n  nav a { color: #FF9600; margin-right: 12px; }\n</style>\n<header>\n  <strong>Mensah Beats</strong>\n  <nav><a href="#beats">Beats</a> <a href="#gigs">Gigs</a> <a href="#book">Book me</a></nav>\n</header>\n<main>\n  <h1>Beats from Accra</h1>\n</main>\n<footer><small>Mensah Beats v1.8</small></footer>\n',
      challenge: 'Change footer to div. Does it look any different? (It doesn\'t. That\'s the trap.)',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Reach for header, nav, main, footer, section and article first. div is the last resort.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s div page.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does div tell a screen reader?',
        options: [
          { text: 'Nothing: it\'s a generic box with no meaning' },
          { text: 'That it\'s the menu', why: 'div means nothing on its own.' },
          { text: 'That it\'s important', why: 'It carries no meaning.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Turn the boxes into landmarks: the top div becomes header, the middle main, the bottom footer',
        starter: '<div class="top">Mensah Beats</div>\n<div class="content"><h1>Beats from Accra</h1></div>\n<div class="bottom">v1.8</div>\n',
        solution: '<header class="top">Mensah Beats</header>\n<main class="content"><h1>Beats from Accra</h1></main>\n<footer class="bottom">v1.8</footer>\n',
        hint: 'Replace each div (opening and closing tags) with header, main and footer.',
        checks: [
          { message: 'A header', dom: { selector: 'header', count: 1 } },
          { message: 'A main', dom: { selector: 'main h1', count: 1 } },
          { message: 'A footer', dom: { selector: 'footer', count: 1 } },
          { message: 'No divs left', dom: { selector: 'div', count: 0 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each landmark to what it holds.',
        pairs: [
          ['header', 'The top: name and usually the nav'],
          ['nav', 'The main links'],
          ['main', 'The main content'],
          ['footer', 'The bottom: small print, contact'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Landmark, or generic box?',
        groups: ['Landmark', 'Generic'],
        items: [
          { text: 'nav', group: 0 },
          { text: 'div', group: 1 },
          { text: 'main', group: 0 },
          { text: 'span', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But divs look exactly the same!',
        options: [
          { text: 'They look the same, but they don\'t mean the same. Landmarks let screen reader users jump around.' },
          { text: 'Then keep the divs.', why: 'Kwesi can\'t navigate them.' },
          { text: 'Landmarks are only for big sites.', why: 'Every site benefits.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the box that should be a landmark.',
        language: 'html',
        lines: ['<header>Mensah Beats</header>', '<div class="menu"><a href="#beats">Beats</a> <a href="#gigs">Gigs</a></div>', '<main>...</main>'],
        bug: 1,
        explanation: 'A set of main links is navigation. Use nav.',
        fix: '<nav class="menu"><a href="#beats">Beats</a> <a href="#gigs">Gigs</a></nav>',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does a screen reader list as landmarks here?',
        code: '<header>...</header>\n<div class="content">...</div>\n<footer>...</footer>',
        language: 'html',
        options: [
          { text: 'Banner (header) and content info (footer), but no main' },
          { text: 'Header, main and footer', why: 'The div isn\'t a main.' },
          { text: 'Nothing', why: 'header and footer are landmarks.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the skeleton.',
        language: 'html',
        template: '<header>\n  <[[1]]>...</nav>\n</header>\n<main>...</main>\n<[[2]]>...</footer>',
        blanks: [['nav'], ['footer']],
        distractors: ['div', 'menu', 'bottom'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element is a generic box with no meaning? (tag name)',
        answers: ['div', '<div>'],
        placeholder: 'A tag',
      },
      {
        kind: 'mcq',
        prompt: 'When is div the right choice?',
        options: [
          { text: 'When you need a box just for styling and no meaningful element fits' },
          { text: 'Always', why: 'Meaningful elements come first.' },
          { text: 'Never', why: 'It\'s fine as a last resort.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your own page\'s HTML. How many boxes could be landmarks instead?',
    starters: ['I could change...', 'into...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your page a header (with a nav inside), one main and a footer. Replace any divs that have a meaningful element.',
  },
  notes: 'div and span are generic containers (HTML spec). Landmark roles: header (banner, when top-level), nav (navigation), main, footer (contentinfo, when top-level). First time div is named in the track.',
};

export default lesson;
