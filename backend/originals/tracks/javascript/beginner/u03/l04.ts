import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Chat with Tey: more than one parameter, and default values. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'More than one parameter, and defaults',
  summary: 'A family\'s price depends on two things: how many adults and how many kids. Nora\'s function needs two slots, and a sensible answer when one is left out.',
  minutes: 10,
  outcomes: [
    'Declare a function with two or more parameters',
    'Pass arguments in the right order',
    'Give a parameter a default value',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'A family\'s total needs two numbers: adults and kids. So the function gets two parameters, separated by a comma: function familyCost(adults, kids).',
          replies: ['How does it know which is which?'],
        },
        {
          tey: 'By position. familyCost(2, 3) puts 2 in adults and 3 in kids, because that\'s the order in the declaration. Swap them, and you get the wrong price without any error.',
          replies: ['Scary', 'What if someone leaves one out?'],
        },
        {
          tey: 'A missing argument becomes undefined, and 2 * 59 + undefined * 39 is NaN. Fix: give the parameter a default. function familyCost(adults, kids = 0). If kids isn\'t passed, it\'s 0.',
          replies: ['Like a pre-filled box'],
        },
        {
          tey: 'Exactly. A pre-filled box that you can still overwrite. familyCost(2) means two adults, no kids. familyCost(2, 3) still works.',
          replies: ['Got it'],
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two slots and a default',
      code: 'function familyCost(adults, kids = 0) {\n  return adults * 59 + kids * 39;\n}\n\nconsole.log(familyCost(2, 2));\nconsole.log(familyCost(2));\nconsole.log(familyCost(1, 3));\n',
      caption: 'Order decides which argument goes in which parameter.',
      challenge: 'Try familyCost(2, 2) then familyCost(2, 2) with the parameters swapped in the declaration. Same numbers, different answer?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Put parameters with defaults last. function f(kids = 0, adults) makes callers write f(undefined, 2) to skip the first one.',
    },
  ],
  apply: {
    scenario: 'familyCost() for every family.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function familyCost(adults, kids) {\n  return adults * 59 + kids * 39;\n}\nconsole.log(familyCost(1, 2));',
        language: 'javascript',
        options: [
          { text: '137' },
          { text: '157', why: 'That swaps them: 2 adults and 1 kid. Order matters.' },
          { text: 'NaN', why: 'Both arguments are passed, so the sum works.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function familyCost(adults, kids) {\n  return adults * 59 + kids * 39;\n}\nconsole.log(familyCost(2));',
        language: 'javascript',
        options: [
          { text: '118', why: 'kids is undefined, not 0. undefined * 39 is NaN.' },
          { text: 'An error', why: 'Leaving out an argument isn\'t an error. It just becomes undefined.' },
          { text: 'NaN' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Give kids a default of 0.',
        template: 'function familyCost(adults, kids [[1]] [[2]]) {\n  return adults * 59 + kids * 39;\n}',
        blanks: [['='], ['0']],
        distractors: ['==', ':', 'undefined'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Declare function familyCost(adults, kids = 0) that returns adults * 59 + kids * 39. Print familyCost(2, 3), then familyCost(2).',
        starter: '',
        solution: 'function familyCost(adults, kids = 0) {\n  return adults * 59 + kids * 39;\n}\n\nconsole.log(familyCost(2, 3));\nconsole.log(familyCost(2));\n',
        hint: 'function familyCost(adults, kids = 0) {\n  return adults * 59 + kids * 39;\n}',
        checks: [
          { message: 'Print 235, then 118', outputEquals: '235\n118' },
          { message: 'familyCost(1, 1) returns 98', expr: 'familyCost(1, 1) === 98' },
          { message: 'kids defaults to 0', expr: 'familyCost(3) === 177' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'A family of 1 adult and 4 kids is charged $295. Which line is the mistake?',
        lines: ['function familyCost(adults, kids) {', '  return adults * 59 + kids * 39;', '}', 'console.log(familyCost(4, 1));'],
        bug: 3,
        fix: 'console.log(familyCost(1, 4));',
        explanation: 'The arguments are in the wrong order. 4 goes into adults. Match the declaration: adults first, then kids.',
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'With function f(adults, kids = 0), match each call to its values.',
        pairs: [
          ['f(2, 3)', 'adults 2, kids 3'],
          ['f(2)', 'adults 2, kids 0'],
          ['f(3, 2)', 'adults 3, kids 2'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Declare function liftLine(lift, minutes = 5) that returns the text `${lift}: ${minutes} min wait`. Print liftLine("Old Blue", 12) and liftLine("Bunny Carpet").',
        starter: '',
        solution: 'function liftLine(lift, minutes = 5) {\n  return `${lift}: ${minutes} min wait`;\n}\n\nconsole.log(liftLine("Old Blue", 12));\nconsole.log(liftLine("Bunny Carpet"));\n',
        hint: 'return `${lift}: ${minutes} min wait`;',
        checks: [
          { message: 'Print both lines', outputEquals: 'Old Blue: 12 min wait\nBunny Carpet: 5 min wait' },
          { message: 'minutes defaults to 5', expr: 'liftLine("x") === "x: 5 min wait"' },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the call for 2 adults and 1 kid.',
        tiles: ['familyCost', '(', '2', ',', '1', ')'],
        distractors: [';', '+'],
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'An argument that isn\'t passed, and has no default, becomes...',
        answers: ['undefined'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which declaration is easiest to call when kids are often left out?',
        options: [
          { text: 'function f(kids = 0, adults)', why: 'Callers would have to write f(undefined, 2) to skip kids.' },
          { text: 'function f(adults, kids = 0)' },
          { text: 'function f(adults, kids)', why: 'Leaving kids out gives NaN.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What sensible default would you give these: a coffee order\'s size, a meeting length, a tip percentage?',
    starters: ['size = ...', 'My defaults would be...'],
  },
  deepen: {
    title: 'Too many parameters',
    summary: 'When a function needs five or six values, calls like f(2, 3, 0, true, "Tue") get unreadable. In Chapter 5 you\'ll meet objects, which let you pass one bundle with labelled parts: f({ adults: 2, kids: 3 }).',
  },
  notes: 'Default parameters: MDN "Default parameters". 2×59+3×39 = 235; 1×59+2×39 = 137; 3×59 = 177; 1+1 = 98.',
};

export default lesson;
