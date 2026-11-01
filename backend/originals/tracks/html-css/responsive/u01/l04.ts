import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 1 · Lesson 4 — shorthand: one, two and four values (clockwise from the top). Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'One number, two or four',
  summary: 'Miracle sends Kofi her own card CSS. Some lines have one number, some two, some four. It looks like a code, and it is: a clock, starting at the top. Tap each line.',
  minutes: 11,
  outcomes: ['Read padding and margin with one, two or four values', 'Remember the clockwise order: top, right, bottom, left', 'Write a shorthand for different sides'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of Miracle\'s CSS',
      text: 'article { padding: 16px; }\nh2 { margin: 0 0 8px; }\np { padding: 8px 16px; }\nfooter { margin: 24px 16px 8px 16px; }',
      hotspots: [
        { phrase: 'padding: 16px;', note: 'One value: all four sides get 16px.' },
        { phrase: 'padding: 8px 16px;', note: 'Two values: top and bottom get the first (8px), left and right get the second (16px).' },
        { phrase: 'margin: 24px 16px 8px 16px;', note: 'Four values go clockwise from the top: top 24px, right 16px, bottom 8px, left 16px. Think of a clock: 12, 3, 6, 9.' },
        { phrase: 'margin: 0 0 8px;', note: 'Three values: top 0, left and right 0, bottom 8px. It removes the heading\'s default space above and keeps a little below. 0 needs no unit.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Clockwise padding',
      caption: 'Four different paddings, so you can see which side is which.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article { background-color: #F0438A; color: #14213D; padding: 4px 16px 32px 48px; }\n</style>\n<article><h2>Jollof Bounce</h2></article>\n',
      challenge: 'Change it to padding: 16px 32px; and predict where the room goes before you look.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Top, right, bottom, left: TRouBLe. Two values: top-and-bottom, then left-and-right.',
    },
  ],
  apply: {
    scenario: 'Cracking Miracle\'s code.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How much padding is on the left?',
        code: 'p { padding: 8px 16px; }',
        language: 'css',
        options: [
          { text: '16px' },
          { text: '8px', why: '8px is top and bottom.' },
          { text: '24px', why: 'They don\'t add up: the second value is left and right.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the four sides in shorthand order.',
        lines: ['Top', 'Right', 'Bottom', 'Left'],
      },
      {
        kind: 'writeCode',
        prompt: 'In one line, give the card 8px padding top and bottom and 16px left and right',
        starter: '<style>\n  article { border: 2px solid #FF9600; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        solution: '<style>\n  article { border: 2px solid #FF9600; padding: 8px 16px; }\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n',
        hint: 'padding: 8px 16px;',
        checks: [
          { message: '8px at the top', dom: { selector: 'article', style: 'padding-top', styleValue: '8px' } },
          { message: '16px on the right', dom: { selector: 'article', style: 'padding-right', styleValue: '16px' } },
          { message: '8px at the bottom', dom: { selector: 'article', style: 'padding-bottom', styleValue: '8px' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each shorthand to what it means.',
        pairs: [
          ['padding: 16px;', 'All four sides 16px'],
          ['padding: 8px 16px;', 'Top/bottom 8px, sides 16px'],
          ['padding: 1px 2px 3px 4px;', 'Top 1, right 2, bottom 3, left 4'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Kofi wants 24px only at the bottom. Tap the line that does something else.',
        language: 'css',
        lines: ['h2 { margin: 0 0 24px 0; }', 'h2 { margin: 24px 0 0 0; }', 'h2 { margin-bottom: 24px; }'],
        bug: 1,
        explanation: 'The first value is the top. That puts 24px above the heading.',
        fix: 'h2 { margin: 0 0 24px 0; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Why does Miracle write 0 without px?',
        options: [
          { text: 'It\'s a mistake.', why: '0 is fine without a unit.' },
          { text: '0 means "default".', why: '0 means no space at all.' },
          { text: 'Zero is zero in any unit, so CSS lets you leave the unit off.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it give the left side 16px?',
        groups: ['Left is 16px', 'Left is something else'],
        items: [
          { text: 'padding: 16px;', group: 0 },
          { text: 'padding: 8px 16px;', group: 0 },
          { text: 'padding: 16px 8px;', group: 1 },
          { text: 'padding: 0 0 0 4px;', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Give the footer 24px top, 16px right, 8px bottom, 16px left.',
        language: 'css',
        template: 'footer { margin: [[1]] 16px [[2]] 16px; }',
        blanks: [['24px'], ['8px']],
        distractors: ['16px', '0', '32px'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'With four values, which side comes first? (one word)',
        answers: ['top'],
        placeholder: 'A side',
      },
      {
        kind: 'writeCode',
        prompt: 'Remove the space above the h2 but keep 8px below it, in one margin line',
        starter: '<style>\n\n</style>\n<article><h2>Sunrise in Osu</h2><p>Slow and warm.</p></article>\n',
        solution: '<style>\n  h2 { margin: 0 0 8px; }\n</style>\n<article><h2>Sunrise in Osu</h2><p>Slow and warm.</p></article>\n',
        hint: 'h2 { margin: 0 0 8px; } or margin: 0 0 8px 0;',
        checks: [
          { message: 'No space above', dom: { selector: 'h2', style: 'margin-top', styleValue: '0px' } },
          { message: '8px below', dom: { selector: 'h2', style: 'margin-bottom', styleValue: '8px' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What trick will you use to remember the clockwise order?',
    starters: ['I\'ll remember it by...', 'Top, then...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Rewrite any four separate padding lines on your page as one shorthand line.',
  },
  notes: 'Shorthand value counts for padding/margin per MDN: 1 (all), 2 (vertical, horizontal), 3 (top, horizontal, bottom), 4 (top, right, bottom, left). Unitless 0 is valid for lengths.',
};

export default lesson;
