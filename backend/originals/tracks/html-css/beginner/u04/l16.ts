import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 16 — CSS myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'CSS myths',
  summary: '"CSS is just for colours." "If it\'s wrong, the page crashes." "You need to memorise every property." Clinton has heard it all online. Myth or fact?',
  minutes: 11,
  outcomes: ['Spot common beginner myths about CSS', 'Know how browsers handle CSS mistakes', 'Learn CSS the way developers actually do'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'CSS is only for colours.', isFact: false, explain: 'Colours, fonts, spacing, layout, animation, and how pages adapt to phones. You\'ll use most of these in this track.' },
        { text: 'A mistake in CSS crashes the page.', isFact: false, explain: 'The browser quietly skips any line it can\'t understand and keeps going. Great for visitors, tricky for you: nothing tells you something\'s wrong.' },
        { text: 'The same HTML can look completely different with different CSS.', isFact: true, explain: 'That was the whole idea in 1994. You did it in lesson 7.' },
        { text: 'You have to memorise every CSS property.', isFact: false, explain: 'Developers look things up all the time, often on MDN. Knowing the common ones and where to look is what matters.' },
        { text: 'A later rule can override an earlier one.', isFact: true, explain: 'When two rules are equally specific, the later one wins.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The browser keeps going',
      caption: 'One line is misspelled. The browser skips it and still applies the others.',
      code: '<style>\n  h1 {\n    colr: orange;\n    background-color: black;\n    color: white;\n  }\n</style>\n<h1>Mensah Beats</h1>\n',
      challenge: 'Fix colr to color and move it below color: white. What colour wins now?',
    },
  ],
  apply: {
    scenario: 'Clinton\'s CSS myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Mistakes are quietly skipped', group: 0 },
          { text: 'CSS is only for colours', group: 1 },
          { text: 'A later rule can win', group: 0 },
          { text: 'You must memorise everything', group: 1 },
          { text: 'A mistake crashes the page', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the heading look like?',
        code: 'h1 {\n  colr: orange;\n  background-color: black;\n  color: white;\n}',
        language: 'css',
        options: [
          { text: 'Nothing works, the page crashes', why: 'The browser skips colr and keeps going.' },
          { text: 'White text on black' },
          { text: 'Orange text on black', why: 'colr isn\'t a property, so it\'s skipped.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the misspelled property so the heading is orange',
        starter: '<style>\n  h1 { colr: orange; }\n</style>\n<h1>Mensah Beats</h1>\n',
        solution: '<style>\n  h1 { color: orange; }\n</style>\n<h1>Mensah Beats</h1>\n',
        hint: 'colr should be color.',
        checks: [
          { message: 'The heading is orange', dom: { selector: 'h1', style: 'color', styleValue: 'orange' } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Real developers know every CSS property by heart, right?',
        options: [
          { text: 'No, they look things up all the time, often on MDN. Knowing where to look is the skill.' },
          { text: 'Yes, all 500 of them.', why: 'Nobody does. They look things up.' },
          { text: 'They use HTML instead.', why: 'They use CSS, and look things up.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['CSS can change layout and spacing.', 'If one line is wrong, the whole stylesheet stops working.', 'Developers look things up on MDN.'],
        bug: 1,
        explanation: 'Only the broken line is skipped. The rest still works.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['CSS is only colours', 'Also fonts, spacing, layout, motion'],
          ['Mistakes crash the page', 'Bad lines are skipped quietly'],
          ['Memorise everything', 'Look things up on MDN'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "the browser quietly skips mistakes" tricky for you?',
        options: [
          { text: 'Nothing warns you, so you have to look for what didn\'t change' },
          { text: 'It deletes your file', why: 'It just skips the line.' },
          { text: 'It isn\'t tricky', why: 'Silent failures are easy to miss.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the sentence.',
        template: 'When the browser can\'t read a CSS line, it [[1]] it and keeps [[2]].',
        blanks: [['skips', 'ignores'], ['going']],
        distractors: ['crashes', 'stopping', 'deletes'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which website do many developers use to look up CSS properties? (three letters)',
        answers: ['mdn'],
        placeholder: 'Three letters',
      },
      {
        kind: 'sortGroups',
        prompt: 'Something CSS can do?',
        groups: ['CSS can do it', 'Not CSS\'s job'],
        items: [
          { text: 'Change fonts', group: 0 },
          { text: 'Play a beat', group: 1 },
          { text: 'Add space around things', group: 0 },
          { text: 'Say which line is the main heading', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which CSS myth did you believe before this chapter?',
    starters: ['I believed...', 'Now I know...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Look up one CSS property you haven\'t used yet on MDN (developer.mozilla.org) and try it in the playground.',
  },
  notes: 'CSS error handling: invalid declarations are ignored (CSS Syntax spec). MDN Web Docs: developer.mozilla.org.',
};

export default lesson;
