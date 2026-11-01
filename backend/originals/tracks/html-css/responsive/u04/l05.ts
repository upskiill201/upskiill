import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4 (display: grid, columns, fr, repeat, gaps). */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the wall is up',
  summary: 'Twelve covers, four columns, three tidy rows. Kofi deletes one beat to test it: the last row just has an empty cell. Efua: "Record shop wall. Finally." Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Build a grid with display: grid', 'Size columns with fr and repeat()', 'Space a grid with gaps'],
  learn: [
    {
      kind: 'story',
      title: 'Record shop wall',
      beats: [
        { speaker: 'narrator', text: 'Kofi deletes a beat. Eleven covers. Nothing stretches; one cell sits empty.' },
        { speaker: 'efua', text: 'Record shop wall. Finally.' },
        { speaker: 'tey', text: 'Lock it in, and then we\'ll make one cover bigger than the rest.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the cover wall.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build the wall: .gallery as a grid of four equal columns (repeat(4, 1fr)) with a 16px gap',
        starter: '<style>\n\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Jollof Bounce cover"></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Jollof Bounce cover"></section>\n',
        hint: '.gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }',
        checks: [
          { message: 'A grid', dom: { selector: '.gallery', style: 'display', styleValue: 'grid' } },
          { message: 'Columns set', dom: { selector: '.gallery', style: 'grid-template-columns' } },
          { message: '16px gap', dom: { selector: '.gallery', style: 'gap', styleValue: '16px' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Free space is 900px. How wide is the first column?',
        code: 'grid-template-columns: 1fr 2fr;',
        language: 'css',
        options: [
          { text: '450px', why: '1fr of 3 shares: 300px.' },
          { text: '300px' },
          { text: '600px', why: 'That\'s the second column.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each value to the same thing written another way.',
        pairs: [
          ['repeat(3, 1fr)', '1fr 1fr 1fr'],
          ['repeat(2, 2fr)', '2fr 2fr'],
          ['gap: 16px', 'row-gap and column-gap 16px'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Grid job or Flexbox job?',
        groups: ['Grid', 'Flexbox'],
        items: [
          { text: 'Twelve covers lined up both ways', group: 0 },
          { text: 'A Book me button pushed right', group: 1 },
          { text: 'A two-column page: main and side', group: 0 },
          { text: 'Links in a nav bar', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken line.',
        language: 'css',
        lines: ['.gallery { display: grid; }', '.gallery { grid-template-columns: repeat(4 1fr); }', '.gallery { gap: 16px; }'],
        bug: 1,
        explanation: 'repeat() needs a comma: repeat(4, 1fr).',
        fix: '.gallery { grid-template-columns: repeat(4, 1fr); }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Eleven covers and four columns leaves a hole. Should Kofi make another cover just to fill it?',
        options: [
          { text: 'Yes, grids must be full.', why: 'Grids can end with empty cells.' },
          { text: 'Switch to Flexbox.', why: 'Then the last row stretches.' },
          { text: 'No need: an empty cell at the end is normal in a grid, and nothing else changes size.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What does 200px 1fr give you?',
        options: [
          { text: 'Two 200px columns', why: '1fr takes whatever is left.' },
          { text: 'A fixed 200px column, then one that takes the rest' },
          { text: 'An error: you can\'t mix units', why: 'Mixing px and fr is normal.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Three equal columns, the short way.',
        language: 'css',
        template: 'grid-template-columns: repeat([[1]], [[2]]);',
        blanks: [['3'], ['1fr']],
        distractors: ['33%', 'fr', '1'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property sets a grid\'s columns? (hyphenated)',
        answers: ['grid-template-columns'],
        placeholder: 'A property',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the grid steps in order.',
        lines: ['Wrap the covers in one container', 'Give it display: grid', 'Set the columns', 'Add a gap'],
      },
    ],
  },
  reflect: {
    prompt: 'Test your own grid by removing one item. Does it still look right?',
    starters: ['When I removed one...', 'It looked...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Turn the pictures on your page into a four-column grid with repeat(4, 1fr) and a gap.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
