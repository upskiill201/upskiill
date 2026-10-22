import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 2 — padding: space inside the border. Before / After. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Room inside the box',
  summary: 'Same card, one new line of CSS. Before: the words touch the orange border. After: they sit in the middle with room around them. That line is padding.',
  minutes: 11,
  outcomes: ['Add padding to a box', 'Explain that padding sits inside the border', 'Set padding on one side only'],
  learn: [
    {
      kind: 'compare',
      title: 'No padding vs padding',
      before: { label: 'Squashed', text: 'article { border: 2px solid #FF9600; }\n\nThe words sit right against the border. On a phone, "Sunrise in Osu" almost touches the orange line. Efua: "It looks trapped."' },
      after: { label: 'Room to breathe', text: 'article {\n  border: 2px solid #FF9600;\n  padding: 16px;\n}\n\n16px of space on every side, inside the border. The background colour fills the padding too, so the card looks bigger and calmer.' },
      notes: [
        'Padding is space inside the border, between the edge and the content.',
        'One value sets all four sides.',
        'A background colour shows through the padding.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Add padding',
      caption: 'The first card has padding, the second doesn\'t. Compare them.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article { border: 2px solid #FF9600; }\n  article + article { padding: 16px; }\n</style>\n<article><h2>No padding</h2></article>\n<article><h2>16px padding</h2></article>\n',
      challenge: 'Change 16px to 32px. Then try padding-left: 40px; on its own.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'padding: 16px; for all sides, or padding-top, padding-right, padding-bottom, padding-left for one.',
    },
  ],
  apply: {
    scenario: 'The squashed card.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where does padding go?',
        options: [
          { text: 'Outside the border', why: 'That\'s margin, coming soon.' },
          { text: 'Inside the border, around the content' },
          { text: 'In the text itself', why: 'It\'s space in the box, not in the words.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Give the card 16px of padding',
        starter: '<style>\n  article { border: 2px solid #FF9600; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        solution: '<style>\n  article { border: 2px solid #FF9600; padding: 16px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        hint: 'Add padding: 16px; inside the article rule.',
        checks: [
          { message: '16px at the top', dom: { selector: 'article', style: 'padding-top', styleValue: '16px' } },
          { message: '16px on the left', dom: { selector: 'article', style: 'padding-left', styleValue: '16px' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it add padding?',
        groups: ['Adds padding', 'Doesn\'t'],
        items: [
          { text: 'padding: 16px;', group: 0 },
          { text: 'Typing spaces before the words', group: 1 },
          { text: 'padding-left: 20px;', group: 0 },
          { text: 'border: 2px solid #FF9600;', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken line.',
        language: 'css',
        lines: ['article {', '  padding 16px;', '}'],
        bug: 1,
        explanation: 'Missing the colon. The browser skips the whole line.',
        fix: '  padding: 16px;',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'The card background is pink now. Does the pink go behind the padding too?',
        options: [
          { text: 'Yes, the background fills the padding, right up to the border.' },
          { text: 'No, only behind the words.', why: 'Background colour fills content and padding.' },
          { text: 'Only if you add a margin.', why: 'Margin is outside the border.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it does.',
        pairs: [
          ['padding: 16px;', 'Room on all four sides'],
          ['padding-top: 8px;', 'Room above the content'],
          ['padding-left: 24px;', 'Room on the left only'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which side gets the most room?',
        code: 'article { padding: 8px; padding-left: 32px; }',
        language: 'css',
        options: [
          { text: 'All sides 32px', why: 'Only padding-left changes, after the shorthand.' },
          { text: 'The left: 32px, the others 8px' },
          { text: 'All sides 8px', why: 'The later padding-left wins for the left side.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Give the card room on every side.',
        language: 'css',
        template: 'article { [[1]]: 16px; }',
        blanks: [['padding']],
        distractors: ['margin', 'border', 'space'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which property sets space inside the border? (one word)',
        answers: ['padding'],
        placeholder: 'A property',
      },
      {
        kind: 'writeCode',
        prompt: 'Give only the left side of the card 24px of padding',
        starter: '<style>\n  article { border: 2px solid #FF9600; }\n</style>\n<article><p>Slow, warm, made at 5am.</p></article>\n',
        solution: '<style>\n  article { border: 2px solid #FF9600; padding-left: 24px; }\n</style>\n<article><p>Slow, warm, made at 5am.</p></article>\n',
        hint: 'padding-left: 24px;',
        checks: [
          { message: '24px on the left', dom: { selector: 'article', style: 'padding-left', styleValue: '24px' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Find a button in an app you like. How much room is there between its text and its edge?',
    starters: ['The button has...', 'It feels...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give one box on your own page padding: 16px; and a border. Then try 8px and 32px. Which feels right?',
  },
  notes: 'padding shorthand and longhands (MDN). The adjacent-sibling selector in the tryIt (article + article) is only there to compare two cards; it isn\'t taught.',
};

export default lesson;
