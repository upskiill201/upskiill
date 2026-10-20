import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 16 — Grid myths. Myth or fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Grid: myth or fact?',
  summary: 'Clinton watched one video about CSS Grid and now has opinions. Some are right. Sort his claims before Kofi rebuilds anything because of them.',
  minutes: 11,
  outcomes: ['Separate Grid myths from facts', 'Explain what fr really measures', 'Know when Grid and Flexbox each fit'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Grid replaces Flexbox, so you should stop using Flexbox.', isFact: false, explain: 'They\'re partners. Grid for two-direction layouts, Flexbox for one-direction ones, often inside grid items.' },
        { text: '1fr is the same as 100%.', isFact: false, explain: '1fr is one share of the free space after gaps and fixed columns. Three 1fr columns each get a third, not 100%.' },
        { text: 'You have to set the number of rows.', isFact: false, explain: 'Grid makes rows automatically for as many items as you have.' },
        { text: 'Grid is only for whole-page layouts.', isFact: false, explain: 'It\'s great for small things too: a gallery, a form, the inside of a card.' },
        { text: 'A grid item can span more than one cell.', isFact: true, explain: 'grid-column: span 2 and grid-row: span 2, like Kofi\'s feature cover.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Grid for a small thing',
      caption: 'Grid isn\'t just for pages. Here it lines up a beat\'s stats in two neat columns.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .stats { display: grid; grid-template-columns: auto 1fr; gap: 4px 16px; max-width: 280px; }\n  .stats strong { color: #FF9600; }\n</style>\n<section class="stats">\n  <strong>Tempo</strong><span>92 BPM</span>\n  <strong>Length</strong><span>2:48</span>\n  <strong>Made on</strong><span>A phone, at 5am</span>\n</section>\n',
      challenge: 'Change auto 1fr to 1fr 1fr. The labels column gets wider.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s Grid opinions.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Grid replaces Flexbox', group: 0 },
          { text: 'Items can span cells', group: 1 },
          { text: '1fr means 100%', group: 0 },
          { text: 'Rows are made automatically', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Free space is 900px. How wide is each column?',
        code: 'grid-template-columns: 1fr 1fr 1fr;',
        language: 'css',
        options: [
          { text: '300px' },
          { text: '900px', why: '1fr is one share, not all of it.' },
          { text: '1px', why: 'fr is a share of the space.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Use Grid for a small thing: make .stats a grid with columns auto 1fr',
        starter: '<style>\n\n</style>\n<section class="stats"><strong>Tempo</strong><span>92 BPM</span></section>\n',
        solution: '<style>\n  .stats { display: grid; grid-template-columns: auto 1fr; }\n</style>\n<section class="stats"><strong>Tempo</strong><span>92 BPM</span></section>\n',
        hint: '.stats { display: grid; grid-template-columns: auto 1fr; }',
        checks: [
          { message: 'A grid', dom: { selector: '.stats', style: 'display', styleValue: 'grid' } },
          { message: 'Columns set', dom: { selector: '.stats', style: 'grid-template-columns' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Grid replaces Flexbox"', 'They work together'],
          ['"1fr = 100%"', 'One share of free space'],
          ['"Grid is only for pages"', 'Small things too'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'So should Kofi rebuild his nav bar in Grid?',
        options: [
          { text: 'No need: a nav bar is one row, which is exactly Flexbox\'s job. It\'s working.' },
          { text: 'Yes, Grid is always better.', why: 'One direction is Flexbox\'s job.' },
          { text: 'Use a table.', why: 'Navigation isn\'t data.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap Clinton\'s myth.',
        lines: ['Grid makes rows automatically.', 'Grid can\'t be used inside a card.', 'Flexbox and Grid work well together.'],
        bug: 1,
        explanation: 'Grid works anywhere, including inside a card.',
      },
      {
        kind: 'mcq',
        prompt: 'What does auto mean in grid-template-columns: auto 1fr?',
        options: [
          { text: 'The first column is as wide as its content; the second takes the rest' },
          { text: 'Both columns are equal', why: 'auto fits the content; 1fr takes the rest.' },
          { text: 'The browser picks randomly', why: 'auto sizes to the content.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the facts.',
        template: 'Grid handles [[1]] directions. Flexbox handles [[2]].',
        blanks: [['two', '2'], ['one', '1']],
        distractors: ['three', 'none', 'all'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is "a grid item can span more than one cell" a myth or a fact? (one word)',
        answers: ['fact'],
        placeholder: 'Myth or fact',
      },
      {
        kind: 'mcq',
        prompt: 'What two-value gap does gap: 4px 16px set?',
        options: [
          { text: '4px between rows, 16px between columns' },
          { text: '4px between columns, 16px between rows', why: 'Row gap comes first.' },
          { text: '4px on top, 16px on the sides', why: 'gap is between cells, not around them.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these did you believe?',
    starters: ['I thought...', 'Now I know...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN relationship of grid layout to other layout methods" and read how Grid and Flexbox compare.',
  },
  notes: 'gap shorthand: row-gap then column-gap. auto track sizing fits content. "92 BPM" and "2:48" are story details for Sunrise in Osu.',
};

export default lesson;
