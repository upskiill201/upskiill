import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 12 — the flex shorthand and flex-basis: a card row that adapts with no media queries. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Cards that pick their own row',
  summary: 'Miracle shows Kofi her favourite line of Flexbox. With it, his beat cards decide for themselves how many fit in a row, on any screen, and always fill it. Tap each part.',
  minutes: 11,
  outcomes: ['Set an item\'s starting size with flex-basis', 'Read the flex shorthand: grow, shrink, basis', 'Build a card row that adapts to any screen'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '.beat-list { display: flex; flex-wrap: wrap; gap: 16px; }\n.beat-list .card { flex: 1 1 220px; }\n\nflex-grow: 1;\nflex-shrink: 1;\nflex-basis: 220px;',
      hotspots: [
        { phrase: 'flex-wrap: wrap;', note: 'Cards that don\'t fit move to a new line.' },
        { phrase: 'flex: 1 1 220px;', note: 'The shorthand for three properties at once: grow, shrink, basis. Read it as "start at 220px, then grow or shrink to fill the row".' },
        { phrase: 'flex-grow: 1;', note: 'The first number: share any leftover space, so each row is filled edge to edge.' },
        { phrase: 'flex-shrink: 1;', note: 'The second number: allowed to shrink if the screen is narrower than 220px, so it never sticks out.' },
        { phrase: 'flex-basis: 220px;', note: 'The third: the starting size before growing or shrinking. It decides how many cards fit in a row: about four on a laptop, one on a phone.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The self-arranging row',
      caption: 'Change the preview between phone and laptop. The cards choose how many fit, and every row is full.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .beat-list { display: flex; flex-wrap: wrap; gap: 16px; }\n  .beat-list .card { flex: 1 1 220px; background-color: #1F2E52; border: 2px solid #FF9600; border-radius: 12px; padding: 16px; }\n</style>\n<section class="beat-list">\n  <article class="card">Sunrise in Osu</article>\n  <article class="card">Jollof Bounce</article>\n  <article class="card">Night Bus to Kumasi</article>\n  <article class="card">Accra Sunrise Mix</article>\n  <article class="card">Harmattan Morning</article>\n</section>\n',
      challenge: 'Change 220px to 300px. Fewer cards fit in each row.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'flex: 1 1 220px with flex-wrap: wrap: a row of cards that adapts to any screen.',
    },
  ],
  apply: {
    scenario: 'The self-arranging row.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each number in flex: 1 1 220px to its property.',
        pairs: [
          ['The first 1', 'flex-grow'],
          ['The second 1', 'flex-shrink'],
          ['220px', 'flex-basis'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Give the cards a 220px starting size that can grow: flex-basis 220px and flex-grow 1',
        starter: '<style>\n  .beat-list { display: flex; flex-wrap: wrap; gap: 16px; }\n\n</style>\n<section class="beat-list"><article class="card">A</article><article class="card">B</article></section>\n',
        solution: '<style>\n  .beat-list { display: flex; flex-wrap: wrap; gap: 16px; }\n  .beat-list .card { flex-grow: 1; flex-basis: 220px; }\n</style>\n<section class="beat-list"><article class="card">A</article><article class="card">B</article></section>\n',
        hint: '.beat-list .card { flex-grow: 1; flex-basis: 220px; } or flex: 1 1 220px;',
        checks: [
          { message: 'Starts at 220px', dom: { selector: '.card', style: 'flex-basis', styleValue: '220px' } },
          { message: 'Can grow', dom: { selector: '.card', style: 'flex-grow', styleValue: '1' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does flex-basis decide in a wrapping row?',
        options: [
          { text: 'The starting size, and so how many cards fit in a row' },
          { text: 'The gap between cards', why: 'That\'s gap.' },
          { text: 'The card\'s height', why: 'In a row, it\'s the starting width.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'With flex: 1 1 220px and wrapping, about how many cards per row?',
        groups: ['About 4', 'About 1'],
        items: [
          { text: 'A 1000px laptop', group: 0 },
          { text: 'A 360px phone', group: 1 },
          { text: 'A wide desktop window, about 960px', group: 0 },
          { text: 'Grandma\'s small phone', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The cards should fill each row. Tap the line that stops them.',
        language: 'css',
        lines: ['.beat-list { display: flex; flex-wrap: wrap; }', '.beat-list .card { flex: 0 1 220px; }', '.beat-list { gap: 16px; }'],
        bug: 1,
        explanation: 'Grow is 0, so cards stay 220px and leave a gap at the end of the row. Use flex: 1 1 220px.',
        fix: '.beat-list .card { flex: 1 1 220px; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'So I don\'t need different CSS for phones and laptops?',
        options: [
          { text: 'You never need anything else.', why: 'Some layouts change more than this. That\'s Chapter 5.' },
          { text: 'For a card row like this, no: the cards work out how many fit. For bigger changes, Chapter 5 has media queries.' },
          { text: 'You need a separate phone site.', why: 'One flexible layout does it.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Five cards wrap as 4 on the first row and 1 on the second. How wide is the last card?',
        code: '.beat-list .card { flex: 1 1 220px; }',
        language: 'css',
        options: [
          { text: 'Exactly 220px', why: 'Grow 1 lets it fill the row.' },
          { text: 'The same width as the others', why: 'It\'s alone, so it takes all the leftover space.' },
          { text: 'It grows to fill its whole row' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Write the shorthand: grow 1, shrink 1, start at 220px.',
        language: 'css',
        template: '.beat-list .card { flex: [[1]] [[2]] 220px; }',
        blanks: [['1'], ['1']],
        distractors: ['0', '220px', 'auto'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property sets a flex item\'s starting size? (hyphenated)',
        answers: ['flex-basis'],
        placeholder: 'A property',
      },
      {
        kind: 'mcq',
        prompt: 'Why allow shrinking (the second 1)?',
        options: [
          { text: 'So cards can shrink to nothing', why: 'They only shrink as needed to fit.' },
          { text: 'So a card can get narrower than 220px on a tiny screen instead of sticking out' },
          { text: 'It doesn\'t matter', why: 'Without it, a 220px card could stick out on a very small screen.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What starting size would suit the cards on your page? Why?',
    starters: ['I\'d start at...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your card list flex-wrap: wrap and your cards flex: 1 1 220px. Try a few basis sizes on a phone and a laptop.',
  },
  notes: 'flex shorthand <grow> <shrink> <basis> (CSS Flexbox §7.1). Last-row stretch is a known trait of this pattern; Grid (Chapter 4) keeps columns even. "Harmattan Morning" is a new title in Kofi\'s catalogue.',
};

export default lesson;
