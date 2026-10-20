import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 18 — the learner's own page: a gallery grid and a two-area layout. Steps. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your page gets a grid',
  summary: 'Your turn. Four steps to give your own page a gallery that counts its own columns and a layout drawn from your own sketch.',
  minutes: 12,
  outcomes: ['Sketch your page as a grid', 'Build a gallery grid on your page', 'Lay out your page\'s main areas'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps for your page',
      steps: [
        { title: '1. Sketch it', body: 'On paper, draw your page on a laptop as boxes: what goes across the top, what sits side by side, what goes at the bottom. Give each box a one-word name.' },
        { title: '2. A gallery', body: 'Pick a group of pictures or projects and make them a grid that counts its own columns.', code: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n  gap: 16px;\n}', language: 'css' },
        { title: '3. The page areas', body: 'Name your main parts with grid-area, and type your sketch into grid-template-areas.', code: 'body {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  grid-template-areas: "head head" "main side";\n}', language: 'css' },
        { title: '4. Check the order', body: 'Read your HTML from top to bottom. Is it the same order you see on screen? If not, move things in the HTML.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A page like yours',
      caption: 'A header, a main gallery and a side note. Change it to match your own sketch.',
      code: '<style>\n  body {\n    background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; margin: 0; padding: 16px;\n    display: grid; grid-template-columns: 2fr 1fr; gap: 16px;\n    grid-template-areas: "head head" "main side";\n  }\n  header { grid-area: head; }\n  .gallery { grid-area: main; display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; }\n  .gallery img { width: 100%; border-radius: 6px; }\n  aside { grid-area: side; background-color: #1F2E52; border-radius: 12px; padding: 16px; }\n</style>\n<header><h1>Your Name</h1></header>\n<section class="gallery">\n  <img src="cover-1.png" alt="A sunrise over the sea"><img src="cover-2.png" alt="A colourful pattern"><img src="cover-3.png" alt="A bus at night">\n</section>\n<aside>A short note about you.</aside>\n',
      challenge: 'Change the areas so the side note is on the left: "side main".',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Sketch first, then type the sketch. Keep the HTML in the order you want people to read it.',
    },
  ],
  apply: {
    scenario: 'Your own page.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Sketch the page as named boxes', 'Build a gallery grid', 'Lay out the page areas', 'Check the HTML order matches the screen'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make your gallery count its own columns: display grid and grid-template-columns repeat(auto-fill, minmax(150px, 1fr))',
        starter: '<style>\n\n</style>\n<section class="gallery"><img src="cover-1.png" alt="A sunrise over the sea"><img src="cover-2.png" alt="A colourful pattern"></section>\n',
        solution: '<style>\n  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }\n</style>\n<section class="gallery"><img src="cover-1.png" alt="A sunrise over the sea"><img src="cover-2.png" alt="A colourful pattern"></section>\n',
        hint: '.gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }',
        checks: [
          { message: 'A grid', dom: { selector: '.gallery', style: 'display', styleValue: 'grid' } },
          { message: 'Columns set', dom: { selector: '.gallery', style: 'grid-template-columns' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is Grid the right tool for it?',
        groups: ['Grid', 'Not Grid'],
        items: [
          { text: 'Your photo gallery', group: 0 },
          { text: 'Your nav links in a row', group: 1 },
          { text: 'Main content beside a side note', group: 0 },
          { text: 'A timetable of your football matches', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Your sketch has your name across the top and two boxes below. Which area map fits?',
        options: [
          { text: '"head head" "main side"' },
          { text: '"head main side"', why: 'That\'s one row of three.' },
          { text: '"head" "main side"', why: 'Rows need the same number of cells.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the part of the HTML in the wrong reading order.',
        language: 'html',
        lines: ['<header>Your Name</header>', '<footer>Thanks for visiting</footer>', '<section class="gallery">...</section>'],
        bug: 1,
        explanation: 'The footer comes before the main content in the HTML. Move it to the end, rather than fixing it with grid placement.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'What will your gallery show?',
        options: [
          { text: 'Photos I took myself, each with alt text that says what\'s in it.' },
          { text: 'Pictures I found online.', why: 'Use your own, or ones you have the right to use.' },
          { text: 'Blank boxes for now.', why: 'Real content shows if the layout works.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of your page to its CSS.',
        pairs: [
          ['The gallery', 'repeat(auto-fill, minmax(...))'],
          ['The page areas', 'grid-template-areas'],
          ['The header\'s spot', 'grid-area: head'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Where does the aside appear?',
        code: 'body { display: grid; grid-template-columns: 2fr 1fr; grid-template-areas: "head head" "main side"; }\naside { grid-area: side; }',
        language: 'css',
        options: [
          { text: 'Right of the main content, in the second row' },
          { text: 'Across the top', why: 'head is across the top.' },
          { text: 'Left of the main content', why: 'side is the second word in the row: right.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Put your side note in its area.',
        language: 'css',
        template: 'aside { [[1]]: [[2]]; }',
        blanks: [['grid-area'], ['side']],
        distractors: ['grid-column', 'main', 'area'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do you draw on paper before typing grid-template-areas? (one word: a ___)',
        answers: ['sketch', 'drawing', 'plan'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Draw your own page sketch. How many areas does it have?',
    starters: ['My sketch has...', 'The areas are...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Build your sketch on your own site with a gallery grid and named areas, check the HTML order, and upload it.',
  },
  notes: 'Learner project step for Chapter 4. aside used for a side note (tangential content), appropriate here.',
};

export default lesson;
