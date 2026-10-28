import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 16 — responsive design myths. Myth or fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Responsive: myth or fact?',
  summary: 'Clinton has been telling his cousin how to make her bakery site work on phones. Some of his advice is spot on. Some would wreck it. Sort the myths from the facts.',
  minutes: 11,
  outcomes: ['Separate responsive design myths from facts', 'Explain why media queries target widths, not devices', 'Know what phone users really want'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'You need a separate website for phones.', isFact: false, explain: 'One site with a flexible layout and media queries works on every screen, and you only update it once.' },
        { text: 'Media queries detect which phone someone has.', isFact: false, explain: 'They check things like the width of the screen, not the brand or model. That\'s why breakpoints should follow the content.' },
        { text: 'People on phones want less content.', isFact: false, explain: 'They want the same things: the menu, the prices, how to book. Make it easy to reach, don\'t remove it.' },
        { text: 'Without the viewport tag, phones show a shrunk-down page.', isFact: true, explain: 'They draw it at about 980px wide and zoom out. The tag tells them to use their real width.' },
        { text: 'Responsive design is only about making things smaller.', isFact: false, explain: 'It\'s about using the space well on every screen: stacking on phones, and adding columns when there\'s room.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Width, not brand',
      caption: 'The media query only knows the width. Any screen 700px or wider gets the two columns, whatever brand it is.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .menu { display: grid; gap: 8px; }\n  .menu article { background-color: #1F2E52; border-radius: 8px; padding: 12px; }\n  @media (min-width: 700px) {\n    .menu { grid-template-columns: 1fr 1fr; }\n  }\n</style>\n<section class="menu">\n  <article>Meat pie, GHS 15</article>\n  <article>Sugar bread, GHS 10</article>\n  <article>Chin chin, GHS 8</article>\n</section>\n',
      challenge: 'Change 700px to 500px. Smaller screens now get two columns too.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s bakery advice.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Phones need a separate site', group: 0 },
          { text: 'No viewport tag = shrunk page', group: 1 },
          { text: 'Media queries know the phone brand', group: 0 },
          { text: 'One page can serve every screen', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What do width media queries actually check?',
        options: [
          { text: 'The phone\'s brand', why: 'They don\'t know brands.' },
          { text: 'How wide the screen (viewport) is' },
          { text: 'How fast the internet is', why: 'Width queries check width.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Phones-first menu: .menu is a grid by default, and from 700px gets two columns (1fr 1fr)',
        starter: '<style>\n\n</style>\n<section class="menu"><article>Meat pie</article><article>Sugar bread</article></section>\n',
        solution: '<style>\n  .menu { display: grid; }\n  @media (min-width: 700px) {\n    .menu { grid-template-columns: 1fr 1fr; }\n  }\n</style>\n<section class="menu"><article>Meat pie</article><article>Sugar bread</article></section>\n',
        hint: '.menu { display: grid; } then @media (min-width: 700px) { .menu { grid-template-columns: 1fr 1fr; } }',
        checks: [
          { message: 'A grid', dom: { selector: '.menu', style: 'display', styleValue: 'grid' } },
          { message: 'A min-width query', codeIncludes: 'min-width' },
          { message: 'Two columns on wider screens', codeIncludes: '1fr 1fr' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Separate phone site"', 'One flexible site'],
          ['"Less content on phones"', 'Same content, easy to reach'],
          ['"Only about smaller"', 'Using the space well everywhere'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My cousin wants to hide the prices on phones to keep it short.',
        options: [
          { text: 'Prices are what phone customers most want. Keep them, and put them near the top.' },
          { text: 'Good idea, shorter is better.', why: 'Customers want the prices.' },
          { text: 'Hide everything but the logo.', why: 'Then nobody can order.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap Clinton\'s myth.',
        lines: ['A min-width query adds layout for wider screens.', 'You should write a media query for every phone model.', 'Test on real phones as well as device mode.'],
        bug: 1,
        explanation: 'There are thousands of models. Put breakpoints where the content needs them.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A tablet 750px wide, of any brand. How many menu columns?',
        code: '.menu { display: grid; }\n@media (min-width: 700px) { .menu { grid-template-columns: 1fr 1fr; } }',
        language: 'css',
        options: [
          { text: 'One', why: '750px is over 700px.' },
          { text: 'Two' },
          { text: 'It depends on the brand', why: 'Only the width matters.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the facts.',
        template: 'Media queries check the [[1]], not the [[2]].',
        blanks: [['width', 'screen width'], ['brand', 'device', 'model']],
        distractors: ['colour', 'owner', 'price'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is "people on phones want less content" a myth or a fact? (one word)',
        answers: ['myth'],
        placeholder: 'Myth or fact',
      },
      {
        kind: 'mcq',
        prompt: 'What is responsive design really about?',
        options: [
          { text: 'Making everything smaller', why: 'Wider screens get more columns too.' },
          { text: 'Building one site per device', why: 'One site, every screen.' },
          { text: 'Using the space well on every screen, from phones to big monitors' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths did you believe?',
    starters: ['I thought...', 'Now I know...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN responsive design" and read the section on media queries and flexible layouts.',
  },
  notes: 'Media queries test media features (width, orientation, etc.), not device identity. GHS prices are illustrative for a fictional bakery.',
};

export default lesson;
