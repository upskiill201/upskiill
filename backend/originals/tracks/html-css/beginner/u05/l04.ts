import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4 — reading a hex code: red, green, blue pairs; rgb(). Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Inside a colour code',
  summary: '#FF9600 isn\'t random. It\'s three numbers in disguise: how much red, green and blue light to mix. Tap each part to crack the code.',
  minutes: 11,
  outcomes: ['Read a hex code as red, green and blue', 'Write the same colour with rgb()', 'Predict roughly what a code will look like'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of Kofi\'s orange',
      text: 'h1 { color: #FF9600; }\nh2 { color: rgb(255, 150, 0); }',
      hotspots: [
        { phrase: '#', note: 'The # says "a colour code follows".' },
        { phrase: 'FF', note: 'The first pair is red. Pairs go from 00 (none) to FF (full). FF means full red.' },
        { phrase: '96', note: 'The second pair is green. 96 is a bit over half. Red plus some green makes orange.' },
        { phrase: '00', note: 'The third pair is blue. 00 means no blue at all.' },
        { phrase: 'rgb(255, 150, 0)', note: 'The same orange in ordinary numbers: red 255 (full), green 150, blue 0. Hex is just a shorter way to write it.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Mix your own light',
      caption: 'Screens mix red, green and blue light. Change one pair at a time and watch the colour move.',
      code: '<style>\n  body { background-color: #14213D; }\n  h1 { color: #FF9600; }\n  h2 { color: rgb(255, 150, 0); }\n</style>\n<h1>Hex: #FF9600</h1>\n<h2>rgb(255, 150, 0)</h2>\n',
      challenge: 'Change #FF9600 to #FF0000 (only red), then #00FF00, then #FFFFFF.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '#RRGGBB: red, green, blue, each from 00 to FF. #000000 is black, #FFFFFF is white.',
    },
  ],
  apply: {
    scenario: 'Kofi cracks the code.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each pair in #FF9600 to its colour.',
        pairs: [
          ['FF', 'Red'],
          ['96', 'Green'],
          ['00', 'Blue'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What colour is #FFFFFF?',
        options: [
          { text: 'Black', why: 'That\'s #000000: no light at all.' },
          { text: 'Yellow', why: 'Yellow has no blue: #FFFF00.' },
          { text: 'White: full red, green and blue light' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Write Kofi\'s orange the other way: make the h2 rgb(255, 150, 0)',
        starter: '<style>\n\n</style>\n<h2>New beat</h2>\n',
        solution: '<style>\n  h2 { color: rgb(255, 150, 0); }\n</style>\n<h2>New beat</h2>\n',
        hint: 'h2 { color: rgb(255, 150, 0); }',
        checks: [
          { message: 'The h2 is Kofi\'s orange', dom: { selector: 'h2', style: 'color', styleValue: '#FF9600' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Light or dark?',
        groups: ['Light', 'Dark'],
        items: [
          { text: '#FFF6E5', group: 0 },
          { text: '#14213D', group: 1 },
          { text: '#FFFFFF', group: 0 },
          { text: '#000000', group: 1 },
          { text: '#222222', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is #FF0000?',
        code: 'h1 { color: #FF0000; }',
        language: 'css',
        options: [
          { text: 'Green', why: 'Green is the middle pair: #00FF00.' },
          { text: 'Red: full red, no green, no blue' },
          { text: 'Black', why: 'Black has no light at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the impossible colour code.',
        language: 'css',
        lines: ['h1 { color: #FF9600; }', 'p { color: #FFF6E5; }', 'a { color: #GG9600; }'],
        bug: 2,
        explanation: 'Hex uses 0–9 and A–F only. G isn\'t allowed.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Why are there letters in a number?',
        options: [
          { text: 'Hex counts to 15 in one place: 0 to 9, then A to F. So FF means 255.' },
          { text: 'It\'s a secret password.', why: 'It\'s a way of counting with 16 symbols.' },
          { text: 'Letters make it prettier.', why: 'They let one character count up to 15.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the same orange in rgb.',
        language: 'css',
        template: 'h1 { color: rgb([[1]], 150, [[2]]); }',
        blanks: [['255'], ['0']],
        distractors: ['100', 'FF', '150'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What hex code is pure black? (include the #)',
        answers: ['#000000', '#000'],
        placeholder: '#......',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the parts of #FF9600 in order.',
        lines: ['#', 'FF (red)', '96 (green)', '00 (blue)'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick one of your palette codes. Can you guess which of red, green or blue is strongest in it?',
    starters: ['My code is...', 'I think the strongest is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, make grey by setting red, green and blue the same: #777777. Try #333333 and #BBBBBB too.',
  },
  notes: 'Hex colours are base-16 pairs for red, green and blue (00–FF = 0–255). #FF9600 = rgb(255, 150, 0).',
};

export default lesson;
