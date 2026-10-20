import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 1 — opens the chapter: a cover gallery that lines up; display: grid and columns. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Twelve covers in neat rows',
  summary: 'Kofi now has twelve beats, and Efua has made a cover for each. He wants a gallery: neat rows and neat columns, like a record shop wall. With Flexbox the last row stretches oddly and the columns never quite line up.',
  minutes: 11,
  outcomes: ['Explain when Grid fits better than Flexbox', 'Make a grid with display: grid', 'Set columns with grid-template-columns and space them with gap'],
  learn: [
    {
      kind: 'story',
      title: 'Four weeks to uni',
      beats: [
        { speaker: 'narrator', text: 'Four weeks to uni. Twelve beats, twelve covers. Kofi tries a wrapping flex row: three rows of four, then he deletes one beat and the last row stretches into three huge covers.' },
        { speaker: 'efua', text: 'A gallery should look like a record shop wall. Every cover the same size, rows and columns lined up.' },
        { speaker: 'miracle', text: 'Flexbox thinks in one line at a time. You want rows AND columns. That\'s CSS Grid.' },
      ],
      choice: {
        prompt: 'How should Kofi build the gallery?',
        options: [
          {
            text: 'Use Grid: display: grid with a set of equal columns, so every cover sits in a column and a row.',
            outcome: 'Twelve covers or eleven, the columns stay lined up and every cover stays the same size.',
            best: true,
          },
          {
            text: 'Keep Flexbox and give every cover a fixed width in px.',
            outcome: 'The columns line up on his laptop, but there\'s an odd gap on the right, and on Ama\'s phone the covers stick out.',
          },
          {
            text: 'Put the covers in a table, four per row.',
            outcome: 'It lines up, but the covers aren\'t data, so screen readers announce a table, and it won\'t bend for phones.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Grid is for rows and columns at once.</strong> On the parent, write display: grid, then say what columns you want with grid-template-columns. 1fr 1fr 1fr means three equal columns. The children fill the cells in order: left to right, then the next row.</p>',
    },
    {
      kind: 'tryIt',
      title: 'A record shop wall',
      caption: 'Three equal columns and a 16px gap. The covers fill the grid in order.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .gallery { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }\n  .gallery img { max-width: 100%; border-radius: 8px; }\n</style>\n<section class="gallery">\n  <img src="cover-1.png" alt="Album cover for Sunrise in Osu">\n  <img src="cover-2.png" alt="Album cover for Jollof Bounce">\n  <img src="cover-3.png" alt="Album cover for Night Bus to Kumasi">\n  <img src="cover-1.png" alt="Album cover for Accra Sunrise Mix">\n  <img src="cover-2.png" alt="Album cover for Harmattan Morning">\n</section>\n',
      challenge: 'Change it to 1fr 1fr. Now there are two columns, and the fifth cover starts a third row on its own, the same size as the rest.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Flexbox: one direction. Grid: rows and columns together. display: grid and grid-template-columns go on the parent.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> columns and rows, the fr unit, covers that span two cells, galleries that pick their own number of columns, named page areas, and a real table for the gig list. The climax: a beat gallery that rearranges itself neatly on any screen.</p>',
    },
  ],
  apply: {
    scenario: 'The record shop wall.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is Grid a better fit than Flexbox for the gallery?',
        options: [
          { text: 'It lines things up in rows and columns at the same time' },
          { text: 'Flexbox can\'t show pictures', why: 'It can. It just thinks one line at a time.' },
          { text: 'Grid is newer, so always better', why: 'Each has its job. Grid suits two directions.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the gallery a grid with three equal columns (1fr 1fr 1fr) and a 16px gap',
        starter: '<style>\n\n</style>\n<section class="gallery">\n  <img src="cover-1.png" alt="Album cover for Sunrise in Osu">\n  <img src="cover-2.png" alt="Album cover for Jollof Bounce">\n</section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }\n</style>\n<section class="gallery">\n  <img src="cover-1.png" alt="Album cover for Sunrise in Osu">\n  <img src="cover-2.png" alt="Album cover for Jollof Bounce">\n</section>\n',
        hint: '.gallery { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }',
        checks: [
          { message: 'A grid', dom: { selector: '.gallery', style: 'display', styleValue: 'grid' } },
          { message: 'With columns set', dom: { selector: '.gallery', style: 'grid-template-columns' } },
          { message: '16px gaps', dom: { selector: '.gallery', style: 'gap', styleValue: '16px' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Grid with equal columns', 'Always lined up'],
          ['Flexbox with fixed widths', 'Odd gaps, sticks out on phones'],
          ['A table', 'Announced as data'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Grid or Flexbox?',
        groups: ['Grid', 'Flexbox'],
        items: [
          { text: 'A wall of covers in rows and columns', group: 0 },
          { text: 'Name left, links right', group: 1 },
          { text: 'A gig calendar layout with lined-up columns', group: 0 },
          { text: 'A row of three buttons', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'So Grid replaces Flexbox?',
        options: [
          { text: 'No, they work together: Flexbox for one row or column, Grid for rows and columns. The header stays Flexbox.' },
          { text: 'Yes, delete all the Flexbox.', why: 'The header is a one-direction job: Flexbox.' },
          { text: 'Grid only works for photos.', why: 'It works for any layout in rows and columns.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t make a grid.',
        language: 'css',
        lines: ['.gallery { display: grid; }', '.gallery { grid-columns: 1fr 1fr 1fr; }', '.gallery { gap: 16px; }'],
        bug: 1,
        explanation: 'The property is grid-template-columns.',
        fix: '.gallery { grid-template-columns: 1fr 1fr 1fr; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Seven covers in this grid. How many rows?',
        code: '.gallery { display: grid; grid-template-columns: 1fr 1fr 1fr; }',
        language: 'css',
        options: [
          { text: 'Three: 3, 3, then 1' },
          { text: 'Two', why: 'Three per row, so seven needs three rows.' },
          { text: 'Seven', why: 'Three columns per row.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make a two-column grid.',
        language: 'css',
        template: '.gallery { display: [[1]]; [[2]]: 1fr 1fr; }',
        blanks: [['grid'], ['grid-template-columns']],
        distractors: ['flex', 'columns', 'grid-columns'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Grid lines things up in rows and ___ at once. (one word)',
        answers: ['columns'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Change the gallery to two equal columns',
        starter: '<style>\n  .gallery { display: grid; gap: 16px; }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Album cover for Sunrise in Osu"><img src="cover-2.png" alt="Album cover for Jollof Bounce"></section>\n',
        solution: '<style>\n  .gallery { display: grid; gap: 16px; grid-template-columns: 1fr 1fr; }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="Album cover for Sunrise in Osu"><img src="cover-2.png" alt="Album cover for Jollof Bounce"></section>\n',
        hint: 'grid-template-columns: 1fr 1fr;',
        checks: [
          { message: 'Columns set', dom: { selector: '.gallery', style: 'grid-template-columns' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What on your page would look good as a grid: photos, projects, a timetable?',
    starters: ['My...', 'in a grid of...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Put a few pictures on your page in a grid with three equal columns and a gap.',
  },
  notes: 'Opens Course 2, Chapter 4 (The beat grid). Grid is two-dimensional; Flexbox one-dimensional (MDN). Page checks confirm grid-template-columns is set rather than an exact value, because engines keep the typed text (1fr 1fr 1fr vs repeat(3, 1fr)). Covers reuse cover-1/2/3.png with different titles.',
};

export default lesson;
