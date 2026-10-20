import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 6 — rows: automatic rows, grid-auto-rows, grid-template-rows. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'What about rows?',
  summary: 'Some covers have a one-line title and some have two lines, so the rows end up slightly different heights. Kofi asks Tey whether he can control rows too.',
  minutes: 11,
  outcomes: ['Explain how Grid makes rows automatically', 'Give every automatic row the same height with grid-auto-rows', 'Set specific rows with grid-template-rows'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'When you only set columns, Grid makes rows for you, as many as you need. Each row is as tall as the tallest thing in it. That\'s why a two-line title makes its whole row taller.',
          replies: ['Can I make them all the same height?'],
        },
        {
          tey: 'Yes: grid-auto-rows sets the height of every automatic row. grid-auto-rows: 260px makes every row 260px, however many there are.',
          replies: ['What if a title doesn\'t fit?'],
        },
        {
          tey: 'Then it spills out of its cell. A safer choice is minmax(260px, auto): at least 260px, but allowed to grow if the content needs more.',
          replies: ['And grid-template-rows?'],
        },
        {
          tey: 'That sets specific rows by position, like grid-template-rows: auto 1fr auto for a header, a stretchy middle and a footer. You\'ll use it for whole-page layouts.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Even rows',
      caption: 'Every automatic row is at least 140px, and grows if a card needs more room.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .gig-wall { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: minmax(140px, auto); gap: 16px; }\n  .gig-wall article { background-color: #1F2E52; border-radius: 12px; padding: 16px; }\n</style>\n<section class="gig-wall">\n  <article><h3>Sound Up Saturdays</h3></article>\n  <article><h3>Labadi Beach Session</h3><p>Sunset set, bring water.</p></article>\n  <article><h3>Kumasi Campus Night</h3></article>\n  <article><h3>Osu Open Mic</h3></article>\n</section>\n',
      challenge: 'Change minmax(140px, auto) to 60px. Watch the longer card spill.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Rows are automatic. grid-auto-rows sets their height; minmax(size, auto) lets them grow. grid-template-rows sets specific rows.',
    },
  ],
  apply: {
    scenario: 'What about rows?',
    items: [
      {
        kind: 'mcq',
        prompt: 'With only columns set, how tall is each row?',
        options: [
          { text: 'As tall as the tallest item in it' },
          { text: 'Always 100px', why: 'Rows fit their content by default.' },
          { text: 'Zero', why: 'They fit their content.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Give every row at least 140px, growing if needed: grid-auto-rows minmax(140px, auto)',
        starter: '<style>\n  .gig-wall { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }\n</style>\n<section class="gig-wall"><article>Sound Up Saturdays</article></section>\n',
        solution: '<style>\n  .gig-wall { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; grid-auto-rows: minmax(140px, auto); }\n</style>\n<section class="gig-wall"><article>Sound Up Saturdays</article></section>\n',
        hint: 'grid-auto-rows: minmax(140px, auto);',
        checks: [
          { message: 'Row heights set', dom: { selector: '.gig-wall', style: 'grid-auto-rows' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each property to what it controls.',
        pairs: [
          ['grid-template-columns', 'The columns'],
          ['grid-auto-rows', 'Height of automatic rows'],
          ['grid-template-rows', 'Specific rows, by position'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Can the content still fit if it\'s long?',
        groups: ['Grows to fit', 'Might spill out'],
        items: [
          { text: 'grid-auto-rows: minmax(140px, auto)', group: 0 },
          { text: 'grid-auto-rows: 60px', group: 1 },
          { text: 'No row height set (fits content)', group: 0 },
          { text: 'grid-auto-rows: 40px with a long title', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I set grid-auto-rows: 100px and one gig\'s text is hanging out of its card.',
        options: [
          { text: 'Use minmax(100px, auto): at least 100px, but taller when the text needs it.' },
          { text: 'Make the text smaller.', why: 'Let the row grow instead.' },
          { text: 'Delete the long text.', why: 'The details matter. Let the row grow.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that can make text spill out.',
        language: 'css',
        lines: ['.gig-wall { grid-auto-rows: minmax(140px, auto); }', '.gig-wall { grid-auto-rows: 40px; }', '.gig-wall { gap: 16px; }'],
        bug: 1,
        explanation: 'A fixed 40px row can\'t grow. Long content spills out.',
        fix: '.gig-wall { grid-auto-rows: minmax(40px, auto); }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A page grid. How tall is the middle row?',
        code: 'body { display: grid; grid-template-rows: auto 1fr auto; height: 600px; }\n\n<header>...</header><main>...</main><footer>...</footer>',
        language: 'html',
        options: [
          { text: 'Whatever is left after the header and footer' },
          { text: 'Exactly 1px', why: '1fr takes the leftover space.' },
          { text: 'The same as the header', why: 'The header is auto: its content height.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'At least 140px, but allowed to grow.',
        language: 'css',
        template: 'grid-auto-rows: [[1]](140px, [[2]]);',
        blanks: [['minmax'], ['auto']],
        distractors: ['repeat', 'max', '100%'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property sets the height of rows Grid makes automatically? (hyphenated)',
        answers: ['grid-auto-rows'],
        placeholder: 'A property',
      },
      {
        kind: 'mcq',
        prompt: 'What does minmax(140px, auto) mean?',
        options: [
          { text: 'At least 140px, and as big as the content needs' },
          { text: 'Exactly 140px', why: 'auto lets it grow.' },
          { text: 'At most 140px', why: '140px is the minimum.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Would your own grid look better with even rows, or rows that fit their content?',
    starters: ['Even rows, because...', 'Fitted rows, because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your grid grid-auto-rows: minmax(150px, auto) and add a longer caption to one item.',
  },
  notes: 'Implicit row sizing via grid-auto-rows; minmax() track sizing (CSS Grid §7.2). h3 headings in the gig wall continue the page outline under the Gigs h2.',
};

export default lesson;
