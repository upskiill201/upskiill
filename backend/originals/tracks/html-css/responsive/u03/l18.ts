import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 18 — the learner's own page: header bar and a self-arranging card row. Steps. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your page lines up',
  summary: 'Your turn. Four steps to give your own page a real header and a row of cards that arranges itself, using everything from this chapter.',
  minutes: 12,
  outcomes: ['Build a header bar for your own page', 'Lay out your own cards in a wrapping row', 'Check the layout on a phone and a laptop'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps for your page',
      steps: [
        { title: '1. A header bar', body: 'Your name on the left, your links on the right, both able to wrap.', code: '.site-header {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  align-items: center;\n}', language: 'css' },
        { title: '2. A row of links', body: 'Your links in a ul, laid down with gap and no bullets.', code: '.nav-links { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 0; padding: 0; }', language: 'css' },
        { title: '3. A card row', body: 'Wrap your cards in a section, then let them choose their own row.', code: '.card-list { display: flex; flex-wrap: wrap; gap: 16px; }\n.card-list .card { flex: 1 1 220px; }', language: 'css' },
        { title: '4. Test both screens', body: 'Phone: does everything fit, with nothing off the edge? Laptop: do the cards fill each row?' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A page like yours',
      caption: 'A header and three cards. Change the names and links to your own.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; margin: 0; }\n  .site-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; padding: 8px 16px; background-color: #1F2E52; }\n  .nav-links { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 0; padding: 0; }\n  .nav-links a { display: inline-block; padding: 12px; color: #FF9600; }\n  .card-list { display: flex; flex-wrap: wrap; gap: 16px; padding: 16px; }\n  .card-list .card { flex: 1 1 220px; background-color: #1F2E52; border: 2px solid #FF9600; border-radius: 12px; padding: 16px; }\n</style>\n<header class="site-header">\n  <strong>Your Name</strong>\n  <nav><ul class="nav-links"><li><a href="#projects">Projects</a></li><li><a href="#about">About</a></li></ul></nav>\n</header>\n<section class="card-list">\n  <article class="card">Football</article>\n  <article class="card">Drawing</article>\n  <article class="card">Cooking</article>\n</section>\n',
      challenge: 'Put your own name, links and three of your interests in.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Header bar, links row, card row: three flex containers make a whole page layout.',
    },
  ],
  apply: {
    scenario: 'Your own page.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Build the header bar', 'Lay the links down in a row', 'Make the cards a wrapping row', 'Test on a phone and a laptop'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make your card list a wrapping row with a 16px gap',
        starter: '<style>\n\n</style>\n<section class="card-list"><article class="card">Football</article><article class="card">Drawing</article></section>\n',
        solution: '<style>\n  .card-list { display: flex; flex-wrap: wrap; gap: 16px; }\n</style>\n<section class="card-list"><article class="card">Football</article><article class="card">Drawing</article></section>\n',
        hint: '.card-list { display: flex; flex-wrap: wrap; gap: 16px; }',
        checks: [
          { message: 'A flex row', dom: { selector: '.card-list', style: 'display', styleValue: 'flex' } },
          { message: 'That wraps', dom: { selector: '.card-list', style: 'flex-wrap', styleValue: 'wrap' } },
          { message: 'With gaps', dom: { selector: '.card-list', style: 'gap', styleValue: '16px' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'How many flex containers? Which elements are they?',
        groups: ['Flex container', 'Not a container'],
        items: [
          { text: '.site-header', group: 0 },
          { text: '.nav-links', group: 0 },
          { text: '.card-list', group: 0 },
          { text: 'Each .card', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'On a laptop, your three cards leave a big gap at the end of the row. What\'s missing?',
        options: [
          { text: 'flex-grow, for example flex: 1 1 220px on the cards' },
          { text: 'flex-wrap', why: 'Wrap moves cards down. Grow fills the row.' },
          { text: 'A bigger gap', why: 'That just spreads them a little. Grow fills the row.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the reason your header runs off a phone screen.',
        language: 'css',
        lines: ['.site-header { display: flex; justify-content: space-between; }', '.nav-links { display: flex; gap: 8px; }', '.nav-links a { padding: 12px; }'],
        bug: 0,
        explanation: 'No flex-wrap on the header (or the links), so everything is forced into one line.',
        fix: '.site-header { display: flex; flex-wrap: wrap; justify-content: space-between; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'What will you put in your three cards?',
        options: [
          { text: 'Three things I\'m into, each with a short line and a picture I took myself.' },
          { text: 'Lorem ipsum for now.', why: 'Real content shows whether the layout works.' },
          { text: 'Nothing, empty cards look clean.', why: 'Cards are for content.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each test to what you\'re checking.',
        pairs: [
          ['Phone', 'Nothing off the edge'],
          ['Laptop', 'Cards fill each row'],
          ['Your thumb', 'Links easy to tap'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'On a 360px phone, how many cards sit in each row?',
        code: '.card-list { display: flex; flex-wrap: wrap; gap: 16px; }\n.card-list .card { flex: 1 1 220px; }',
        language: 'css',
        options: [
          { text: 'One, full width' },
          { text: 'Two', why: 'Two need at least 456px.' },
          { text: 'Three, squashed', why: 'They wrap instead of squashing.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Let your cards pick their own row.',
        language: 'css',
        template: '.card-list .card { [[1]]: 1 1 220px; }',
        blanks: [['flex']],
        distractors: ['width', 'grow', 'display'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many flex containers does this page use? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What does your page look like on a phone now, compared with the start of this chapter?',
    starters: ['Before...', 'Now...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Build the header and card row on your own site, upload it, and test it on a phone and a laptop.',
  },
  notes: 'Learner project step for Chapter 3. 360px phone: 220px basis means at most one card per row (two need 456px with a 16px gap).',
};

export default lesson;
