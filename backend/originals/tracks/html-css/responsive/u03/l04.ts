import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 3 · Lesson 4 — justify-content along the row: flex-start, center, flex-end, space-between. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Spreading along the row',
  summary: 'The name and the links are in one row, but squashed together on the left. Efua wants the name on the far left and the links on the far right. One property decides where items sit along a row. Tap each value.',
  minutes: 11,
  outcomes: ['Use justify-content to place items along a row', 'Push two items to opposite ends with space-between', 'Choose the right value for a layout'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each value of justify-content',
      text: 'header { display: flex; justify-content: space-between; }\n\njustify-content: flex-start;\njustify-content: center;\njustify-content: flex-end;\njustify-content: space-between;',
      hotspots: [
        { phrase: 'flex-start;', note: 'The default: items bunch up at the start of the row, on the left.' },
        { phrase: 'center;', note: 'Items bunch up in the middle. Good for a row of buttons under a form.' },
        { phrase: 'flex-end;', note: 'Items bunch up at the end, on the right.' },
        { phrase: 'justify-content: space-between;', note: 'The first item at the start, the last at the end, and the leftover space shared out between them. With two items, that\'s far left and far right: the classic header.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Name left, links right',
      caption: 'Two items in the header, so space-between sends them to opposite ends.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; margin: 0; }\n  header { display: flex; justify-content: space-between; background-color: #1F2E52; padding: 0 16px; }\n  nav ul { display: flex; gap: 16px; list-style: none; padding: 0; }\n  a { color: #FF9600; }\n</style>\n<header>\n  <p><strong>Mensah Beats</strong></p>\n  <nav><ul><li><a href="#beats">Beats</a></li><li><a href="#gigs">Gigs</a></li><li><a href="#book">Book me</a></li></ul></nav>\n</header>\n',
      challenge: 'Try center, then flex-end. Which looks most like a real site?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'justify-content places items along the row. space-between is the header classic.',
    },
  ],
  apply: {
    scenario: 'Name left, links right.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which value puts the name far left and the nav far right?',
        options: [
          { text: 'center', why: 'That bunches both in the middle.' },
          { text: 'space-between' },
          { text: 'flex-start', why: 'That\'s the default: both on the left.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Send the name and the nav to opposite ends: justify-content space-between on the header',
        starter: '<style>\n  header { display: flex; }\n</style>\n<header>\n  <p>Mensah Beats</p>\n  <nav><a href="#gigs">Gigs</a></nav>\n</header>\n',
        solution: '<style>\n  header { display: flex; justify-content: space-between; }\n</style>\n<header>\n  <p>Mensah Beats</p>\n  <nav><a href="#gigs">Gigs</a></nav>\n</header>\n',
        hint: 'justify-content: space-between;',
        checks: [
          { message: 'Opposite ends', dom: { selector: 'header', style: 'justify-content', styleValue: 'space-between' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each value to where items go.',
        pairs: [
          ['flex-start', 'Bunched on the left'],
          ['center', 'Bunched in the middle'],
          ['flex-end', 'Bunched on the right'],
          ['space-between', 'First left, last right'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it change where items sit along the row?',
        groups: ['Yes', 'No'],
        items: [
          { text: 'justify-content: center', group: 0 },
          { text: 'list-style: none', group: 1 },
          { text: 'justify-content: flex-end', group: 0 },
          { text: 'color: #FF9600', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I put justify-content: space-between on the nav, but the name didn\'t move.',
        options: [
          { text: 'It goes on the container whose items you\'re moving: the header, which holds the name and the nav.' },
          { text: 'Add it to the p as well.', why: 'It belongs on the container: the header.' },
          { text: 'space-between only works with three items.', why: 'It works with two.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that does nothing.',
        language: 'css',
        lines: ['header { display: flex; justify-content: space-between; }', 'section { justify-content: center; }', 'nav ul { display: flex; justify-content: flex-end; }'],
        bug: 1,
        explanation: 'section isn\'t a flex container. justify-content only works with display: flex.',
        fix: 'section { display: flex; justify-content: center; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Three buttons. Where do they sit?',
        code: 'p { display: flex; justify-content: center; gap: 8px; }\n\n<p><a>Play</a><a>Share</a><a>Save</a></p>',
        language: 'html',
        options: [
          { text: 'Spread across the whole row', why: 'That\'s space-between.' },
          { text: 'Together in the middle, 8px apart' },
          { text: 'Stacked in the middle', why: 'They\'re still in a row.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the classic header.',
        language: 'css',
        template: 'header { display: flex; justify-content: [[1]]; }',
        blanks: [['space-between']],
        distractors: ['center', 'left-right', 'spread'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the default value of justify-content? (hyphenated)',
        answers: ['flex-start', 'normal', 'start'],
        placeholder: 'A value',
      },
      {
        kind: 'writeCode',
        prompt: 'Centre the row of buttons: justify-content center on the p',
        starter: '<style>\n  p { display: flex; gap: 8px; }\n</style>\n<p><a href="#play">Play</a><a href="#share">Share</a></p>\n',
        solution: '<style>\n  p { display: flex; gap: 8px; justify-content: center; }\n</style>\n<p><a href="#play">Play</a><a href="#share">Share</a></p>\n',
        hint: 'justify-content: center;',
        checks: [
          { message: 'Centred', dom: { selector: 'p', style: 'justify-content', styleValue: 'center' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which value would suit your own header, and why?',
    starters: ['I\'d use...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your header justify-content: space-between, so your name and your links sit at opposite ends.',
  },
  notes: 'justify-content initial value is normal, which behaves as flex-start in flex containers, hence both accepted.',
};

export default lesson;
