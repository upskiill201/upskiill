import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 2 — a wrapped flex gallery vs a grid gallery. Before / After. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Wrapped row vs real grid',
  summary: 'Same eleven covers, two layouts. The flex version looks fine until the last row. The grid version looks the same every time. Compare them.',
  minutes: 11,
  outcomes: ['Spot the "stretched last row" problem with wrapping Flexbox', 'Explain how Grid keeps columns lined up', 'Choose between them for a gallery'],
  learn: [
    {
      kind: 'compare',
      title: 'Flexbox gallery vs Grid gallery',
      before: { label: 'Wrapping Flexbox', text: '.gallery { display: flex; flex-wrap: wrap; gap: 16px; }\n.gallery img { flex: 1 1 200px; }\n\nEleven covers: rows of four, four, then three. The last three grow to fill their row, so they\'re bigger than the rest. Each row is worked out on its own, so nothing lines up from one row to the next.' },
      after: { label: 'Grid', text: '.gallery {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n  gap: 16px;\n}\n\nFour columns, shared by every row. The last row has three covers and one empty cell, and every cover is the same size. Columns line up all the way down.' },
      notes: [
        'Flexbox sizes each row separately; Grid sizes columns for the whole layout.',
        'In a grid, an unfilled last row leaves empty cells instead of stretching.',
        'Use Grid when things should line up in both directions.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Eleven covers, one grid',
      caption: 'Four columns. The last row has an empty cell, and nothing stretches.',
      code: '<style>\n  body { background-color: #14213D; font-family: Verdana, sans-serif; }\n  .gallery { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; }\n  .gallery img { max-width: 100%; border-radius: 6px; }\n</style>\n<section class="gallery">\n  <img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Jollof Bounce cover"><img src="cover-3.png" alt="Night Bus to Kumasi cover"><img src="cover-1.png" alt="Accra Sunrise Mix cover">\n  <img src="cover-2.png" alt="Harmattan Morning cover"><img src="cover-3.png" alt="Kente Code cover"><img src="cover-1.png" alt="Labadi Waves cover"><img src="cover-2.png" alt="Tro-tro Talk cover">\n  <img src="cover-3.png" alt="Midnight Makola cover"><img src="cover-1.png" alt="Rain on Zinc cover"><img src="cover-2.png" alt="Last Light Jamestown cover">\n</section>\n',
      challenge: 'Swap the gallery rule for display: flex; flex-wrap: wrap; and give the images flex: 1 1 100px. Watch the last row.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'If things should line up across rows as well as along them, reach for Grid.',
    },
  ],
  apply: {
    scenario: 'Wrapped row vs real grid.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why are the last three covers bigger in the flex gallery?',
        options: [
          { text: 'They grow to fill their own row, which has fewer items' },
          { text: 'They\'re bigger image files', why: 'Same images. flex-grow fills their row.' },
          { text: 'Flexbox is broken', why: 'It\'s doing what grow says, one row at a time.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Switch the gallery from Flexbox to Grid: display grid with four equal columns',
        starter: '<style>\n  .gallery { display: flex; flex-wrap: wrap; gap: 8px; }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Jollof Bounce cover"></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Sunrise in Osu cover"><img src="cover-2.png" alt="Jollof Bounce cover"></section>\n',
        hint: 'display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;',
        checks: [
          { message: 'A grid', dom: { selector: '.gallery', style: 'display', styleValue: 'grid' } },
          { message: 'Columns set', dom: { selector: '.gallery', style: 'grid-template-columns' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Flexbox gallery or Grid gallery?',
        groups: ['Flexbox', 'Grid'],
        items: [
          { text: 'Each row sized on its own', group: 0 },
          { text: 'Columns shared by every row', group: 1 },
          { text: 'Last row stretches', group: 0 },
          { text: 'Last row leaves empty cells', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each layout to the right tool.',
        pairs: [
          ['Cover wall', 'Grid'],
          ['Nav links in a row', 'Flexbox'],
          ['Card contents stacked', 'Flexbox column'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Can the empty cell at the end be a problem?',
        options: [
          { text: 'Not really: it looks like a record shop wall with a gap waiting for the next release.' },
          { text: 'Yes, Grid can\'t have empty cells.', why: 'It can. That\'s why it keeps sizes even.' },
          { text: 'Fill it with a blank image.', why: 'Empty is fine, and a blank image needs alt text.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that makes it a Flexbox gallery, not a grid.',
        language: 'css',
        lines: ['.gallery { display: flex; flex-wrap: wrap; }', '.gallery { gap: 8px; }', '.gallery img { max-width: 100%; }'],
        bug: 0,
        explanation: 'For lined-up rows and columns, use display: grid with grid-template-columns.',
        fix: '.gallery { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Ten covers, four columns. How many empty cells in the last row?',
        code: '.gallery { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; }',
        language: 'css',
        options: [
          { text: 'Two: rows of 4, 4, then 2' },
          { text: 'None', why: 'The last row has 2 covers and 2 empty cells.' },
          { text: 'Six', why: 'Only the last row has gaps.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the grid gallery.',
        language: 'css',
        template: '.gallery { display: [[1]]; grid-template-columns: 1fr 1fr 1fr 1fr; [[2]]: 8px; }',
        blanks: [['grid'], ['gap']],
        distractors: ['flex', 'margin', 'wrap'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which layout tool sizes each row separately when wrapping? (one word)',
        answers: ['flexbox', 'flex'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'When should you choose Grid over Flexbox?',
        options: [
          { text: 'When items should line up in rows and columns together' },
          { text: 'Always', why: 'Flexbox is still best for one-direction layouts.' },
          { text: 'Never on phones', why: 'Grid works on phones.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at a photo app or online shop. Does it use a grid or wrapping rows?',
    starters: ['It looks like...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Build the same set of pictures twice, once with wrapping Flexbox and once with Grid, and remove one picture. Which holds up?',
  },
  notes: 'Wrapping flex lines are sized independently (CSS Flexbox §9.3); grid tracks span all rows. The three cover images repeat with different beat titles.',
};

export default lesson;
