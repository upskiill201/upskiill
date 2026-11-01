import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 4 — a grid rule line by line: columns, gaps, rows filling in order. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Inside a grid rule',
  summary: 'Kofi\'s gallery CSS is four lines long, but each line is doing a lot. Tap each part to see what it does, and what happens to the covers.',
  minutes: 11,
  outcomes: ['Read a grid rule', 'Set different row and column gaps', 'Predict how items fill the cells'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  column-gap: 16px;\n  row-gap: 24px;\n}',
      hotspots: [
        { phrase: 'display: grid;', note: 'The section becomes a grid container. Its direct children become grid items, just like flex items.' },
        { phrase: 'repeat(4, 1fr)', note: 'Four equal columns. You only set columns: rows are made automatically, as many as the items need.' },
        { phrase: 'column-gap: 16px;', note: 'Space between the columns.' },
        { phrase: 'row-gap: 24px;', note: 'Space between the rows. gap sets both at once; these let you set them separately, so cover titles have room below them.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Filling in order',
      caption: 'Items fill the first row left to right, then wrap to the next row. Rows appear as they\'re needed.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); column-gap: 16px; row-gap: 24px; }\n  .gallery figure { margin: 0; }\n  .gallery img { max-width: 100%; border-radius: 6px; }\n  .gallery figcaption { font-size: 0.875rem; }\n</style>\n<section class="gallery">\n  <figure><img src="cover-1.png" alt="Sunrise in Osu cover"><figcaption>Sunrise in Osu</figcaption></figure>\n  <figure><img src="cover-2.png" alt="Jollof Bounce cover"><figcaption>Jollof Bounce</figcaption></figure>\n  <figure><img src="cover-3.png" alt="Night Bus to Kumasi cover"><figcaption>Night Bus to Kumasi</figcaption></figure>\n  <figure><img src="cover-1.png" alt="Accra Sunrise Mix cover"><figcaption>Accra Sunrise Mix</figcaption></figure>\n  <figure><img src="cover-2.png" alt="Harmattan Morning cover"><figcaption>Harmattan Morning</figcaption></figure>\n</section>\n',
      challenge: 'Change row-gap to 48px. Only the space between rows changes.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Set the columns; rows take care of themselves. gap for both, or column-gap and row-gap separately.',
    },
  ],
  apply: {
    scenario: 'Reading the gallery rule.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          ['display: grid', 'Makes a grid container'],
          ['repeat(4, 1fr)', 'Four equal columns'],
          ['column-gap', 'Space between columns'],
          ['row-gap', 'Space between rows'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Give the gallery 16px between columns and 24px between rows',
        starter: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); }\n</style>\n<section class="gallery"><figure>A</figure><figure>B</figure></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); column-gap: 16px; row-gap: 24px; }\n</style>\n<section class="gallery"><figure>A</figure><figure>B</figure></section>\n',
        hint: 'column-gap: 16px; row-gap: 24px;',
        checks: [
          { message: '16px between columns', dom: { selector: '.gallery', style: 'column-gap', styleValue: '16px' } },
          { message: '24px between rows', dom: { selector: '.gallery', style: 'row-gap', styleValue: '24px' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Where does the fifth cover go?',
        code: '.gallery { display: grid; grid-template-columns: repeat(4, 1fr); }',
        language: 'css',
        options: [
          { text: 'A fifth column', why: 'There are four columns. It starts a new row.' },
          { text: 'Nowhere, the grid is full', why: 'Rows are added as needed.' },
          { text: 'The first cell of the second row' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Do you set it, or does Grid make it for you?',
        groups: ['You set it', 'Made automatically'],
        items: [
          { text: 'The number of columns', group: 0 },
          { text: 'Extra rows for more covers', group: 1 },
          { text: 'The gap size', group: 0 },
          { text: 'Which cell each cover lands in, by default', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Do I need to say how many rows there are?',
        options: [
          { text: 'Yes, or the covers disappear.', why: 'Rows are created automatically.' },
          { text: 'No: set the columns, and Grid adds rows as the covers need them.' },
          { text: 'Only for an even number of covers.', why: 'Rows are always automatic unless you set them.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that does nothing to the gallery.',
        language: 'css',
        lines: ['.gallery { display: grid; }', '.gallery img { grid-template-columns: repeat(4, 1fr); }', '.gallery { gap: 16px; }'],
        bug: 1,
        explanation: 'grid-template-columns goes on the container, not the items.',
        fix: '.gallery { grid-template-columns: repeat(4, 1fr); }',
      },
      {
        kind: 'mcq',
        prompt: 'Which elements become grid items?',
        options: [
          { text: 'The container\'s direct children' },
          { text: 'Every element inside, however deep', why: 'Like Flexbox, only direct children.' },
          { text: 'Only images', why: 'Any direct child.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Space the rows and columns separately.',
        language: 'css',
        template: '.gallery { [[1]]: 16px; [[2]]: 24px; }',
        blanks: [['column-gap'], ['row-gap']],
        distractors: ['margin', 'padding', 'gap-row'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which single property sets both row and column gaps? (one word)',
        answers: ['gap'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Remove the figures\' default margin inside the gallery: .gallery figure gets margin 0',
        starter: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }\n\n</style>\n<section class="gallery"><figure><figcaption>Sunrise in Osu</figcaption></figure></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }\n  .gallery figure { margin: 0; }\n</style>\n<section class="gallery"><figure><figcaption>Sunrise in Osu</figcaption></figure></section>\n',
        hint: '.gallery figure { margin: 0; }',
        checks: [
          { message: 'No figure margin', dom: { selector: 'figure', style: 'margin-left', styleValue: '0px' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'How much space would your own gallery need between rows, if each picture had a caption?',
    starters: ['I\'d use...', 'Because the captions...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your grid different column and row gaps, and add a figcaption under each picture.',
  },
  notes: 'Implicit rows are created for auto-placed items beyond the explicit grid (CSS Grid §7.5). figure has default margins (40px sides in most browsers), removed here; figure/figcaption were taught in Course 1 Chapter 3.',
};

export default lesson;
