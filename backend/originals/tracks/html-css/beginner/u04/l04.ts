import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4 — the page's background and text: styling body. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Style the whole page',
  summary: 'Kofi\'s heading is orange, but the page is still blinding white. Miracle\'s tip: style body, the element that holds everything you see. Tap each line of Kofi\'s new rules.',
  minutes: 11,
  outcomes: ['Style the whole page with body', 'Set background and text colours together', 'See how body\'s text colour flows into the page'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of Kofi\'s stylesheet',
      text: '<style>\n  body {\n    background-color: midnightblue;\n    color: white;\n  }\n  h1 { color: orange; }\n</style>',
      hotspots: [
        { phrase: 'body {', note: 'body holds everything you see on the page. Style it and you style the whole page at once.' },
        { phrase: 'background-color: midnightblue;', note: 'The colour behind everything. A deep night blue, like Accra after a gig.' },
        { phrase: 'color: white;', note: 'The text colour for the page. Paragraphs and lists inside body take it on, unless another rule says otherwise.' },
        { phrase: 'h1 { color: orange; }', note: 'A more specific rule for the heading. It overrides the white for h1 only.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Night mode for Mensah Beats',
      caption: 'One body rule changes the whole page. The h1 rule keeps the heading orange.',
      code: '<style>\n  body {\n    background-color: midnightblue;\n    color: white;\n  }\n  h1 { color: orange; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra, made late at night.</p>\n',
      challenge: 'Try a light version: background-color: ivory; and color: black;',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Style body for the whole page. Elements inside take its text colour unless a rule of their own says otherwise.',
    },
  ],
  apply: {
    scenario: 'Mensah Beats gets night mode.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Give the whole page a midnightblue background and white text',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra.</p>\n',
        solution: '<style>\n  body {\n    background-color: midnightblue;\n    color: white;\n  }\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra.</p>\n',
        hint: 'body { background-color: midnightblue; color: white; }',
        checks: [
          { message: 'A midnightblue page', dom: { selector: 'body', style: 'background-color', styleValue: 'midnightblue' } },
          { message: 'White text on the page', dom: { selector: 'body', style: 'color', styleValue: 'white' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why style body instead of every element?',
        options: [
          { text: 'body is the only element CSS can reach', why: 'CSS can reach any element.' },
          { text: 'body holds everything, so one rule styles the whole page' },
          { text: 'It makes beats louder', why: 'It\'s about the whole page\'s look.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it changes.',
        pairs: [
          ['body { background-color: ... }', 'The colour behind everything'],
          ['body { color: ... }', 'The page\'s text colour'],
          ['h1 { color: orange; }', 'Just the heading'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the paragraph?',
        code: '<style>\n  body { color: white; background-color: black; }\n  h1 { color: orange; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Made in Accra.</p>',
        language: 'html',
        options: [
          { text: 'Orange', why: 'The orange rule is for h1 only.' },
          { text: 'White, from body' },
          { text: 'Black', why: 'Black is the background. Text is white.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Ama can\'t read anything. Tap the problem.',
        language: 'css',
        lines: ['body {', '  background-color: black;', '  color: black;', '}'],
        bug: 2,
        explanation: 'Black text on a black page. The text is there, just invisible.',
        fix: '  color: white;',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Why is the heading orange but the rest white?',
        options: [
          { text: 'It\'s a bug.', why: 'It\'s on purpose: two rules.' },
          { text: 'Orange is the default.', why: 'The default is black. Kofi\'s rules changed it.' },
          { text: 'The page rule makes text white, and a separate h1 rule makes the heading orange.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Easy to read, or hard?',
        groups: ['Easy to read', 'Hard to read'],
        items: [
          { text: 'White text on midnightblue', group: 0 },
          { text: 'Black text on black', group: 1 },
          { text: 'Black text on ivory', group: 0 },
          { text: 'Yellow text on white', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the light version.',
        language: 'css',
        template: '[[1]] { background-color: ivory; [[2]]: black; }',
        blanks: [['body'], ['color']],
        distractors: ['page', 'colour', 'html'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element holds everything you see on a page? (one word)',
        answers: ['body'],
        placeholder: 'A tag name',
      },
      {
        kind: 'writeCode',
        prompt: 'Keep the night page, and make the h1 orange with its own rule',
        starter: '<style>\n  body { background-color: midnightblue; color: white; }\n\n</style>\n<h1>Mensah Beats</h1>\n',
        solution: '<style>\n  body { background-color: midnightblue; color: white; }\n  h1 { color: orange; }\n</style>\n<h1>Mensah Beats</h1>\n',
        hint: 'Add h1 { color: orange; } on the empty line.',
        checks: [
          { message: 'The heading is orange', dom: { selector: 'h1', style: 'color', styleValue: 'orange' } },
          { message: 'The page is still midnightblue', dom: { selector: 'body', style: 'background-color', styleValue: 'midnightblue' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Night mode or light mode for your own page? What feeling do you want visitors to get?',
    starters: ['I\'d choose...', 'Because I want people to feel...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your own page a body rule: a background and a text colour that are easy to read together.',
  },
  notes: 'color is an inherited property, so text inside body takes it unless overridden. Readability of colour pairs is covered properly (contrast) in Chapter 5.',
};

export default lesson;
