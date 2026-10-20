import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 8 — spanning cells: grid-column: span 2, grid-row: span 2. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'One big cover',
  summary: 'The newest beat deserves a bigger spot in the gallery: two cells wide, two cells tall, like a poster in a shop window. Tey shows how an item can take more than one cell.',
  minutes: 11,
  outcomes: ['Make an item span columns with grid-column: span', 'Make an item span rows with grid-row: span', 'Predict how other items flow around a big one'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Items can take more than one cell.</strong> grid-column: span 2 makes an item two columns wide. grid-row: span 2 makes it two rows tall. Use both for a big square feature.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>The others flow around it.</strong> The grid places each item in the next free cells, in order. A big item takes its space, and the rest fill the gaps after it.</p>',
    },
    {
      kind: 'check',
      question: 'A four-column grid. The first cover has grid-column: span 2. How many more covers fit in the first row?',
      options: ['One', 'Two', 'Three'],
      answer: 1,
      explanation: 'The big cover takes two of the four columns, so two more covers fit beside it.',
    },
    {
      kind: 'text',
      html: '<p><strong>Use a class.</strong> Put the span on a class like .feature, so you can move "biggest" to a new beat by moving one word in the HTML.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The feature cover',
      caption: 'The first cover spans two columns and two rows. The others fill in around it.',
      code: '<style>\n  body { background-color: #14213D; font-family: Verdana, sans-serif; }\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }\n  .gallery img { width: 100%; border-radius: 6px; }\n  .feature { grid-column: span 2; grid-row: span 2; }\n</style>\n<section class="gallery">\n  <img class="feature" src="cover-3.png" alt="Night Bus to Kumasi cover, the newest beat">\n  <img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Jollof Bounce cover">\n  <img src="cover-1.png" alt="Accra Sunrise Mix cover"><img src="cover-2.png" alt="Harmattan Morning cover">\n  <img src="cover-3.png" alt="Kente Code cover"><img src="cover-1.png" alt="Labadi Waves cover">\n</section>\n',
      challenge: 'Move class="feature" to the Kente Code cover.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'grid-column: span 2 = two columns wide. grid-row: span 2 = two rows tall. The others flow around it.',
    },
  ],
  apply: {
    scenario: 'One big cover.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does grid-column: span 2 do?',
        options: [
          { text: 'Makes the item two columns wide' },
          { text: 'Moves it to column 2', why: 'span means "stretch across", not "go to".' },
          { text: 'Adds two columns to the grid', why: 'It changes one item\'s size.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the .feature cover two columns wide: grid-column span 2',
        starter: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); }\n\n</style>\n<section class="gallery"><img class="feature" src="cover-3.png" alt="Night Bus to Kumasi cover"></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); }\n  .feature { grid-column: span 2; }\n</style>\n<section class="gallery"><img class="feature" src="cover-3.png" alt="Night Bus to Kumasi cover"></section>\n',
        hint: '.feature { grid-column: span 2; }',
        checks: [
          { message: 'Spans columns', dom: { selector: '.feature', style: 'grid-column' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to the shape it makes.',
        pairs: [
          ['grid-column: span 2', 'Wide'],
          ['grid-row: span 2', 'Tall'],
          ['both, span 2', 'A big square'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Changes one item, or the whole grid?',
        groups: ['One item', 'Whole grid'],
        items: [
          { text: 'grid-column: span 2', group: 0 },
          { text: 'grid-template-columns', group: 1 },
          { text: 'grid-row: span 2', group: 0 },
          { text: 'gap', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Next Friday a new beat comes out. How do I make IT the big one?',
        options: [
          { text: 'Move class="feature" to its img. The CSS stays the same.' },
          { text: 'Rewrite the grid.', why: 'The span lives on a class you can move.' },
          { text: 'Make its image file bigger.', why: 'Grid decides its size, not the file.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t make the cover wider.',
        language: 'css',
        lines: ['.feature { grid-column: span 2; }', '.feature { grid-column: 2; }', '.feature { grid-row: span 2; grid-column: span 2; }'],
        bug: 1,
        explanation: 'grid-column: 2 moves it to column 2, still one column wide. You need span 2.',
        fix: '.feature { grid-column: span 2; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A 3-column grid. The first cover spans 2 columns and 2 rows. Where does the second cover go?',
        code: '.gallery { grid-template-columns: repeat(3, 1fr); }\n.feature { grid-column: span 2; grid-row: span 2; }',
        language: 'css',
        options: [
          { text: 'Column 3, first row, next to the feature' },
          { text: 'Under the feature', why: 'There\'s a free cell beside it first.' },
          { text: 'It disappears', why: 'It fills the next free cell.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make a big square feature.',
        language: 'css',
        template: '.feature { grid-column: [[1]] 2; [[2]]: span 2; }',
        blanks: [['span'], ['grid-row']],
        distractors: ['size', 'grid-height', 'stretch'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word makes an item stretch across more than one cell? (one word)',
        answers: ['span'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Make the feature two rows tall too: add grid-row span 2',
        starter: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); }\n  .feature { grid-column: span 2; }\n</style>\n<section class="gallery"><img class="feature" src="cover-3.png" alt="Night Bus to Kumasi cover"></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); }\n  .feature { grid-column: span 2; grid-row: span 2; }\n</style>\n<section class="gallery"><img class="feature" src="cover-3.png" alt="Night Bus to Kumasi cover"></section>\n',
        hint: 'grid-row: span 2;',
        checks: [
          { message: 'Spans rows', dom: { selector: '.feature', style: 'grid-row' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What on your page deserves the biggest spot? Why?',
    starters: ['The biggest would be...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In your own grid, give one item a .feature class that spans two columns and two rows.',
  },
  notes: 'span keyword for grid line placement (CSS Grid §8.3). Auto-placement fills the next available cells in order (sparse packing by default).',
};

export default lesson;
