import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (rows, minmax, Grid history, spanning, auto-fill). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Grandma\'s gallery',
  summary: 'Grandma scrolls the gallery on her phone: two covers per row, each big enough to see properly, and the newest beat wide across the top. "This one is my favourite," she says, pointing at Night Bus to Kumasi. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Let a grid choose its columns', 'Make one item span cells', 'Control row heights'],
  learn: [
    {
      kind: 'story',
      title: 'Big enough to see',
      beats: [
        { speaker: 'narrator', text: 'Two covers per row on Grandma\'s phone. The feature cover stretches across the top.' },
        { speaker: 'kofi', text: 'Same CSS that gives my laptop six columns.' },
        { speaker: 'tey', text: 'One line doing a lot of work. Check you\'ve got it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: a gallery for every screen.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make the gallery count its own columns: repeat(auto-fill, minmax(150px, 1fr)) with an 8px gap',
        starter: '<style>\n  .gallery { display: grid; }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Jollof Bounce cover"></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Jollof Bounce cover"></section>\n',
        hint: 'grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px;',
        checks: [
          { message: 'Columns that fit', dom: { selector: '.gallery', style: 'grid-template-columns' } },
          { message: '8px gap', dom: { selector: '.gallery', style: 'gap', styleValue: '8px' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A 4-column grid. The feature spans 2 columns. How many covers fit beside it in the first row?',
        code: '.gallery { grid-template-columns: repeat(4, 1fr); }\n.feature { grid-column: span 2; }',
        language: 'css',
        options: [
          { text: 'Three', why: 'The feature takes two of four columns.' },
          { text: 'None', why: 'Two columns are still free.' },
          { text: 'Two' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job.',
        pairs: [
          ['grid-column: span 2', 'Two columns wide'],
          ['grid-auto-rows: minmax(140px, auto)', 'Rows at least 140px'],
          ['repeat(auto-fill, minmax(150px, 1fr))', 'As many columns as fit'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe for long text, or might spill?',
        groups: ['Safe', 'Might spill'],
        items: [
          { text: 'grid-auto-rows: minmax(140px, auto)', group: 0 },
          { text: 'grid-auto-rows: 50px', group: 1 },
          { text: 'Rows sized by content (nothing set)', group: 0 },
          { text: 'A fixed 30px row with a two-line title', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that moves the feature instead of making it bigger.',
        language: 'css',
        lines: ['.feature { grid-row: span 2; }', '.feature { grid-column: 3; }', '.gallery { gap: 8px; }'],
        bug: 1,
        explanation: 'grid-column: 3 puts it in column 3, one column wide. Use span 2.',
        fix: '.feature { grid-column: span 2; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'When did browsers get Grid again? My uncle says it\'s brand new.',
        options: [
          { text: 'Last month.', why: 'It shipped in 2017.' },
          { text: '2017: Chrome, Firefox and Safari within weeks of each other, Edge later that year.' },
          { text: 'It was in the first web browser.', why: 'The web had no grid tool until 2017.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'With only columns set, what decides each row\'s height?',
        options: [
          { text: 'The first item', why: 'The tallest item decides.' },
          { text: 'Always 100px', why: 'Rows fit their content.' },
          { text: 'The tallest item in that row' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make a big square feature.',
        language: 'css',
        template: '.feature { grid-column: span [[1]]; grid-row: [[2]] 2; }',
        blanks: [['2'], ['span']],
        distractors: ['1', 'to', 'size'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which keyword in repeat() makes as many columns as fit? (hyphenated)',
        answers: ['auto-fill', 'auto-fit'],
        placeholder: 'A keyword',
      },
      {
        kind: 'writeCode',
        prompt: 'Make the .feature cover a big square: span 2 columns and 2 rows',
        starter: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); }\n\n</style>\n<section class="gallery"><img class="feature" src="cover-3.png" alt="Night Bus to Kumasi cover"></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); }\n  .feature { grid-column: span 2; grid-row: span 2; }\n</style>\n<section class="gallery"><img class="feature" src="cover-3.png" alt="Night Bus to Kumasi cover"></section>\n',
        hint: '.feature { grid-column: span 2; grid-row: span 2; }',
        checks: [
          { message: 'Wide', dom: { selector: '.feature', style: 'grid-column' } },
          { message: 'Tall', dom: { selector: '.feature', style: 'grid-row' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Show your grid to the oldest person you know, on their phone. What did they say?',
    starters: ['They said...', 'I\'ll change...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your gallery auto-fill columns and a feature item, and test it on the smallest phone you can.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
