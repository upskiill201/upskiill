import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 6 — align-items across the row; centring in both directions. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Centring, finally',
  summary: 'The name is a bit lower than the links, and Kofi wants a big "New beat Friday" banner with the words exactly in the middle. Developers joked about CSS centring for years. Tey shows him how easy it is now.',
  minutes: 11,
  outcomes: ['Line items up across the row with align-items', 'Centre something both ways with Flexbox', 'Tell justify-content and align-items apart'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'justify-content works along the row, left to right. align-items works across it, top to bottom. Two directions, two properties.',
          replies: ['Why is my name lower than my links?'],
        },
        {
          tey: 'Your items have different heights, and by default they stretch to fill the row\'s height, with their text at the top. align-items: center lines up their middles instead.',
          replies: ['And centring the banner?'],
        },
        {
          tey: 'Make the banner a flex container, then use both: justify-content: center for left-right, align-items: center for top-bottom. Give it a height so there\'s room to centre in.',
          replies: ['That\'s it?'],
        },
        {
          tey: 'That\'s it. For years people built tricks with tables and negative margins to do this. Now it\'s three lines.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Dead centre',
      caption: 'The banner is a flex container with a height. Both centres together put the words in the middle.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; margin: 0; }\n  section { display: flex; justify-content: center; align-items: center; height: 200px; background-color: #1F2E52; }\n</style>\n<section>\n  <h2>New beat Friday</h2>\n</section>\n',
      challenge: 'Delete align-items: center. The words jump up. Delete justify-content: center. They slide left.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'justify-content: along the row. align-items: across it. Both set to center: dead centre.',
    },
  ],
  apply: {
    scenario: 'Centring, finally.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In a row, which property moves items up and down?',
        options: [
          { text: 'align-items' },
          { text: 'justify-content', why: 'That\'s along the row, left to right.' },
          { text: 'gap', why: 'That\'s space between items.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Line up the middles of the name and the links: align-items center on the header',
        starter: '<style>\n  header { display: flex; justify-content: space-between; }\n</style>\n<header>\n  <h1>Mensah Beats</h1>\n  <nav><a href="#gigs">Gigs</a></nav>\n</header>\n',
        solution: '<style>\n  header { display: flex; justify-content: space-between; align-items: center; }\n</style>\n<header>\n  <h1>Mensah Beats</h1>\n  <nav><a href="#gigs">Gigs</a></nav>\n</header>\n',
        hint: 'align-items: center;',
        checks: [
          { message: 'Middles lined up', dom: { selector: 'header', style: 'align-items', styleValue: 'center' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each property to its direction (in a row).',
        pairs: [
          ['justify-content', 'Left to right'],
          ['align-items', 'Top to bottom'],
          ['gap', 'Between items'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Needed to centre the banner text both ways?',
        groups: ['Needed', 'Not needed'],
        items: [
          { text: 'display: flex', group: 0 },
          { text: 'justify-content: center', group: 0 },
          { text: 'list-style: none', group: 1 },
          { text: 'border-radius: 12px', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I set align-items: center but nothing moved up or down.',
        options: [
          { text: 'align-items is broken.', why: 'Without extra height, there\'s nowhere to move.' },
          { text: 'Use justify-content twice.', why: 'That\'s the other direction.' },
          { text: 'The container needs room to centre in. Give it a height, like 200px.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'The banner text should be in the middle. Tap the missing piece.',
        language: 'css',
        lines: ['section {', '  justify-content: center;', '  align-items: center;', '  height: 200px;', '}'],
        bug: 0,
        explanation: 'No display: flex, so justify-content and align-items do nothing.',
        fix: 'section { display: flex; justify-content: center; align-items: center; height: 200px; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Where are the words?',
        code: 'section { display: flex; justify-content: center; height: 200px; }\n\n<section><h2>New beat Friday</h2></section>',
        language: 'html',
        options: [
          { text: 'Dead centre', why: 'align-items isn\'t set.' },
          { text: 'In the middle left to right, but at the top' },
          { text: 'Top left', why: 'justify-content centres it left to right.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Centre it both ways.',
        language: 'css',
        template: 'section {\n  display: flex;\n  [[1]]: center;\n  [[2]]: center;\n  height: 200px;\n}',
        blanks: [['justify-content', 'align-items'], ['align-items', 'justify-content']],
        distractors: ['text-align', 'margin', 'vertical-align'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property lines items up across the row? (hyphenated)',
        answers: ['align-items'],
        placeholder: 'A property',
      },
      {
        kind: 'writeCode',
        prompt: 'Centre the banner text both ways: display flex, justify-content center, align-items center',
        starter: '<style>\n  section { height: 200px; }\n</style>\n<section><h2>New beat Friday</h2></section>\n',
        solution: '<style>\n  section { height: 200px; display: flex; justify-content: center; align-items: center; }\n</style>\n<section><h2>New beat Friday</h2></section>\n',
        hint: 'display: flex; justify-content: center; align-items: center;',
        checks: [
          { message: 'A flex container', dom: { selector: 'section', style: 'display', styleValue: 'flex' } },
          { message: 'Centred left to right', dom: { selector: 'section', style: 'justify-content', styleValue: 'center' } },
          { message: 'Centred top to bottom', dom: { selector: 'section', style: 'align-items', styleValue: 'center' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What on your page would look better centred: a banner, a button, a quote?',
    starters: ['I\'d centre...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add align-items: center to your header, and centre one banner or button on your page both ways.',
  },
  notes: 'align-items initial value normal behaves as stretch for flex items. Pre-Flexbox vertical centring relied on table-cell display, absolute positioning with negative margins, or line-height tricks.',
};

export default lesson;
