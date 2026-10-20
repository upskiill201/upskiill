import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 9 — a squashed row of cards vs flex-wrap: wrap. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Squashed vs wrapped',
  summary: 'Kofi puts all six beat cards in one flex row. On his laptop: lovely. On Ama\'s phone: six skinny strips, each word on its own line. Here\'s the same row with one extra line.',
  minutes: 11,
  outcomes: ['Explain why flex items squash by default', 'Let items move onto new lines with flex-wrap: wrap', 'Give wrapped items a sensible width'],
  learn: [
    {
      kind: 'compare',
      title: 'One line vs wrapping',
      before: { label: 'Squashed', text: '.beat-list {\n  display: flex;\n  gap: 16px;\n}\n.card { width: 200px; }\n\nFlex items stay on one line by default, so they shrink to fit. On a 360px phone, six 200px cards become six skinny strips, each far narrower than 200px.' },
      after: { label: 'Wrapped', text: '.beat-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.card { width: 200px; }\n\nWhen there\'s no room, the next card moves to a new line. Three in a row on a laptop, one or two on a phone. gap spaces the lines too.' },
      notes: [
        'By default, flex items all stay on one line and shrink.',
        'flex-wrap: wrap lets them move onto new lines.',
        'gap works between rows as well as between items.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Let them wrap',
      caption: 'Switch the preview to phone size, then add flex-wrap: wrap.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .beat-list { display: flex; gap: 16px; }\n  .card { width: 200px; background-color: #1F2E52; border: 2px solid #FF9600; border-radius: 12px; padding: 16px; }\n</style>\n<section class="beat-list">\n  <article class="card">Sunrise in Osu</article>\n  <article class="card">Jollof Bounce</article>\n  <article class="card">Night Bus to Kumasi</article>\n  <article class="card">Accra Sunrise Mix</article>\n</section>\n',
      challenge: 'Add flex-wrap: wrap; to .beat-list. The cards keep their width and wrap.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A row of cards almost always wants flex-wrap: wrap.',
    },
  ],
  apply: {
    scenario: 'Six skinny strips.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the cards turn into skinny strips?',
        options: [
          { text: 'Flex items stay on one line by default and shrink to fit' },
          { text: 'width: 200px is broken', why: 'It\'s fine. The items shrink to stay on one line.' },
          { text: 'Phones can\'t show cards', why: 'They can, once the cards wrap.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Let the cards wrap: add flex-wrap wrap to .beat-list',
        starter: '<style>\n  .beat-list { display: flex; gap: 16px; }\n  .card { width: 200px; }\n</style>\n<section class="beat-list"><article class="card">A</article><article class="card">B</article></section>\n',
        solution: '<style>\n  .beat-list { display: flex; gap: 16px; flex-wrap: wrap; }\n  .card { width: 200px; }\n</style>\n<section class="beat-list"><article class="card">A</article><article class="card">B</article></section>\n',
        hint: 'flex-wrap: wrap;',
        checks: [
          { message: 'Cards can wrap', dom: { selector: '.beat-list', style: 'flex-wrap', styleValue: 'wrap' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'With flex-wrap: wrap, what happens to six 200px cards?',
        groups: ['Laptop (1000px)', 'Phone (360px)'],
        items: [
          { text: 'Four in a row', group: 0 },
          { text: 'One per line', group: 1 },
          { text: 'Two short rows', group: 0 },
          { text: 'Six lines of cards', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its effect.',
        pairs: [
          ['flex-wrap: nowrap', 'One line, items shrink (the default)'],
          ['flex-wrap: wrap', 'Items move to new lines'],
          ['gap: 16px', 'Space between items and rows'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Every word is on its own line in the cards. It looks like a list of spaghetti.',
        options: [
          { text: 'The cards are squashed into one row. flex-wrap: wrap lets them move down instead.' },
          { text: 'Make the text smaller.', why: 'The cards are the problem: they need to wrap.' },
          { text: 'Rotate your phone.', why: 'Fix the page, not the reader.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t let the cards wrap.',
        language: 'css',
        lines: ['.beat-list { display: flex; flex-wrap: wrap; }', '.beat-list { display: flex; wrap: yes; }', '.beat-list { display: flex; flex-wrap: wrap; gap: 16px; }'],
        bug: 1,
        explanation: 'Not a real property or value. It\'s flex-wrap: wrap.',
        fix: '.beat-list { display: flex; flex-wrap: wrap; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The row is 500px wide. How many 200px cards fit on the first line (gap 16px)?',
        code: '.beat-list { display: flex; flex-wrap: wrap; gap: 16px; }\n.card { width: 200px; }',
        language: 'css',
        options: [
          { text: 'Two: 200 + 16 + 200 = 416px, and a third would need 632px' },
          { text: 'Three', why: '200 + 16 + 200 + 16 + 200 = 632px, too wide.' },
          { text: 'One', why: 'Two fit in 416px.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the beat list wrap.',
        language: 'css',
        template: '.beat-list { display: flex; [[1]]: [[2]]; gap: 16px; }',
        blanks: [['flex-wrap'], ['wrap']],
        distractors: ['nowrap', 'overflow', 'break'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the default value of flex-wrap? (one word)',
        answers: ['nowrap', 'no-wrap', 'no wrap'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Does gap also space out the rows after wrapping?',
        options: [
          { text: 'Yes, gap works between rows too' },
          { text: 'No, only between items in a row', why: 'gap spaces both.' },
          { text: 'Only with Grid', why: 'Flexbox gap works between rows too.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What on your page would look better as wrapping cards: photos, projects, songs?',
    starters: ['My...', 'would wrap into...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Put the cards on your page in a flex container with flex-wrap: wrap and a gap. Try it at phone and laptop size.',
  },
  notes: 'flex-wrap initial value nowrap; flex-shrink 1 by default, so items shrink below their width to fit (down to their min-content size). gap applies to both row and column gaps in a wrapping flex container.',
};

export default lesson;
