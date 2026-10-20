import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 12 — auto-fill vs auto-fit, and reading minmax() closely. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'auto-fill or auto-fit?',
  summary: 'Kofi\'s "Coming soon" section has only two covers. With auto-fill on a wide laptop they sit small on the left, with empty space beside them. Miracle swaps one word and they stretch across. Tap each part.',
  minutes: 11,
  outcomes: ['Read repeat(auto-fill, minmax()) piece by piece', 'Tell auto-fill and auto-fit apart', 'Choose which one a section needs'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '.gallery { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }\n.coming-soon { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }',
      hotspots: [
        { phrase: 'auto-fill', note: 'Makes as many columns as fit, even if there aren\'t enough items to fill them. Empty columns keep their space, so two covers stay small.' },
        { phrase: 'minmax(150px, 1fr)', note: 'Each column is at least 150px, and at most one share of the free space.' },
        { phrase: 'auto-fit', note: 'Also makes as many columns as fit, but then folds away the empty ones. The items stretch to share the whole row.' },
        { phrase: '.coming-soon', note: 'With only two covers, auto-fit makes them fill the row. With twelve covers, auto-fill and auto-fit look the same.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two covers, two ways',
      caption: 'View at laptop size. The top row uses auto-fill, the bottom auto-fit.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .fill { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 8px; margin-bottom: 24px; }\n  .fit { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; }\n  img { width: 100%; border-radius: 6px; }\n</style>\n<p>auto-fill</p>\n<section class="fill"><img src="cover-1.png" alt="Rain on Zinc cover, coming soon"><img src="cover-2.png" alt="Kumasi Express cover, coming soon"></section>\n<p>auto-fit</p>\n<section class="fit"><img src="cover-1.png" alt="Rain on Zinc cover, coming soon"><img src="cover-2.png" alt="Kumasi Express cover, coming soon"></section>\n',
      challenge: 'Add four more images to each section. Once the row is full, they look the same.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Lots of items? Either works. A few items that should fill the row? auto-fit.',
    },
  ],
  apply: {
    scenario: 'The coming soon section.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each keyword to what it does with spare space.',
        pairs: [
          ['auto-fill', 'Keeps empty columns'],
          ['auto-fit', 'Folds empty columns away'],
          ['minmax(150px, 1fr)', 'Column size: 150px to one share'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the two coming-soon covers fill the row: grid-template-columns repeat(auto-fit, minmax(150px, 1fr))',
        starter: '<style>\n  .coming-soon { display: grid; gap: 8px; }\n</style>\n<section class="coming-soon"><img src="cover-1.png" alt="Rain on Zinc cover"><img src="cover-2.png" alt="Kumasi Express cover"></section>\n',
        solution: '<style>\n  .coming-soon { display: grid; gap: 8px; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }\n</style>\n<section class="coming-soon"><img src="cover-1.png" alt="Rain on Zinc cover"><img src="cover-2.png" alt="Kumasi Express cover"></section>\n',
        hint: 'grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));',
        checks: [
          { message: 'Columns set', dom: { selector: '.coming-soon', style: 'grid-template-columns' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A 1000px laptop, two covers, auto-fill with minmax(150px, 1fr). What do you see?',
        code: 'grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));',
        language: 'css',
        options: [
          { text: 'Two small covers on the left, empty columns beside them' },
          { text: 'Two covers stretched across the row', why: 'That\'s auto-fit.' },
          { text: 'One huge cover', why: 'Both show, at column width.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'auto-fill or auto-fit?',
        groups: ['auto-fill', 'auto-fit'],
        items: [
          { text: 'Keep covers the same size however few there are', group: 0 },
          { text: 'Two covers should fill the row', group: 1 },
          { text: 'Empty columns hold their space', group: 0 },
          { text: 'Empty columns collapse', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'My full gallery looks identical with auto-fill and auto-fit. Did I break something?',
        options: [
          { text: 'No: with enough items to fill the row there are no empty columns, so they behave the same.' },
          { text: 'Yes, one of them is broken.', why: 'They only differ when there\'s spare room.' },
          { text: 'Use both at once.', why: 'Pick one; here either works.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t work.',
        language: 'css',
        lines: ['grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));', 'grid-template-columns: repeat(auto-fit, minmax(150px));', 'grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));'],
        bug: 1,
        explanation: 'minmax() needs two values: a minimum and a maximum.',
        fix: 'grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));',
      },
      {
        kind: 'mcq',
        prompt: 'With twelve covers on a laptop, which looks different?',
        options: [
          { text: 'Neither: the row is full, so auto-fill and auto-fit match' },
          { text: 'auto-fill', why: 'With no empty columns they\'re the same.' },
          { text: 'auto-fit', why: 'With no empty columns they\'re the same.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two coming-soon covers that fill the row.',
        language: 'css',
        template: 'grid-template-columns: repeat([[1]], minmax(150px, [[2]]));',
        blanks: [['auto-fit'], ['1fr']],
        distractors: ['auto-fill', '150px', 'auto'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which keyword folds away empty columns? (hyphenated)',
        answers: ['auto-fit'],
        placeholder: 'A keyword',
      },
      {
        kind: 'mcq',
        prompt: 'What does the 1fr in minmax(150px, 1fr) do?',
        options: [
          { text: 'Lets each column grow up to one share of the free space' },
          { text: 'Makes every column exactly 1px', why: 'fr is a share, not a pixel.' },
          { text: 'Sets the minimum', why: '150px is the minimum.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Does any section of your page have only a few items? Which keyword would it need?',
    starters: ['My...', 'needs auto-...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make a small section on your page with two or three items, and try auto-fill and auto-fit on it at laptop size.',
  },
  notes: 'auto-fit collapses empty repeated tracks; auto-fill keeps them (CSS Grid §7.2.3.2). "Rain on Zinc" and "Kumasi Express" are upcoming beats in the story.',
};

export default lesson;
