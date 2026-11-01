import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Tap to explore: arrow functions. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Arrow functions',
  summary: 'Rafa\'s old code from Denver is full of =>. Nora thinks it\'s a typo. It\'s the short way to write a function, and modern JavaScript uses it everywhere.',
  minutes: 10,
  outcomes: [
    'Read an arrow function',
    'Write one with a body in { } and return',
    'Write a one-line arrow that returns without the word return',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Rafa\'s Denver code',
      text: 'Rafa writes const kidsCost = (n) => n * 39; and Nora stares at it. It does the same as function kidsCost(n) { return n * 39; }, just shorter. For more steps, he uses braces: const greet = (name) => { const msg = `Hi, ${name}`; return msg; };',
      hotspots: [
        { phrase: 'const kidsCost =', note: 'An arrow function has no name of its own. You store it in a const, and the const\'s name is how you call it: kidsCost(2).' },
        { phrase: '(n) =>', note: 'The parameters go in brackets, then the arrow => ("goes to"). With exactly one parameter you may drop the brackets: n => n * 39.' },
        { phrase: 'n * 39;', note: 'With no braces, the arrow returns whatever is after it. No return keyword needed. This is the one-line form.' },
        { phrase: '=> {', note: 'With braces, it\'s a normal body: several lines, and you must write return yourself, just like a function declaration.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Same function, shorter',
      code: 'function kidsCostOld(n) {\n  return n * 39;\n}\n\nconst kidsCost = (n) => n * 39;\n\nconsole.log(kidsCostOld(2));\nconsole.log(kidsCost(2));\n',
      caption: 'Both give 78. The arrow version is the one you\'ll see most in modern code.',
      challenge: 'Write const adultsCost = (n) => n * 59; and print adultsCost(2).',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'If you add braces, add return. (n) => { n * 39 } returns undefined, because a body in braces needs return like any function.',
    },
  ],
  apply: {
    scenario: 'Reading, then writing, Rafa\'s style.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const double = (n) => n * 2;\nconsole.log(double(20));',
        language: 'javascript',
        options: [
          { text: '40' },
          { text: '20', why: 'The arrow returns n * 2.' },
          { text: 'undefined', why: 'No braces means it returns automatically.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const double = (n) => { n * 2 };\nconsole.log(double(20));',
        language: 'javascript',
        options: [
          { text: '40', why: 'With braces, you need return. Without it, the result is thrown away.' },
          { text: 'An error', why: 'It runs fine. It just returns nothing.' },
          { text: 'undefined' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each arrow function to the declaration it equals.',
        pairs: [
          ['(n) => n * 59', 'function (n) { return n * 59; }'],
          ['() => "Open!"', 'function () { return "Open!"; }'],
          ['(a, b) => a + b', 'function (a, b) { return a + b; }'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write const seniorsCost as a one-line arrow function that returns n * 29. Print seniorsCost(2).',
        starter: '',
        solution: 'const seniorsCost = (n) => n * 29;\nconsole.log(seniorsCost(2));\n',
        hint: 'const seniorsCost = (n) => n * 29;',
        checks: [
          { message: 'Print 58', outputEquals: '58' },
          { message: 'Use an arrow =>', codeIncludes: '=>' },
          { message: 'seniorsCost(3) returns 87', expr: 'seniorsCost(3) === 87' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Finish the arrow function.',
        template: 'const kidsCost = (n) [[1]] n * 39;',
        blanks: [['=>']],
        distractors: ['->', '>=', '=='],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'This prints undefined instead of the message. Which line?',
        lines: ['const liftMsg = (lift) => {', '  `${lift} is open`;', '};', 'console.log(liftMsg("Old Blue"));'],
        bug: 1,
        fix: '  return `${lift} is open`;',
        explanation: 'The body has braces, so it needs return. Either add return, or drop the braces.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Write const familyCost = (adults, kids) => ... returning adults * 59 + kids * 39. Print familyCost(2, 2).',
        starter: '',
        solution: 'const familyCost = (adults, kids) => adults * 59 + kids * 39;\nconsole.log(familyCost(2, 2));\n',
        hint: 'const familyCost = (adults, kids) => adults * 59 + kids * 39;',
        checks: [
          { message: 'Print 196', outputEquals: '196' },
          { message: 'Use an arrow', codeIncludes: '=>' },
          { message: 'familyCost(1, 2) returns 137', expr: 'familyCost(1, 2) === 137' },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an arrow function that returns the text "Open!".',
        tiles: ['const status', '=', '()', '=>', '"Open!"', ';'],
        distractors: ['return', 'function'],
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Functions written with => are called ... functions.',
        answers: ['arrow', 'arrow functions'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Nora asks Rafa a question. Pick his best answer.',
        from: 'nora',
        message: 'Which should I use, function or =>?',
        options: [
          { text: 'Only arrows. function is outdated', why: 'Both are current JavaScript. Plenty of modern code uses function declarations.' },
          { text: 'Either works. Arrows are handy for short ones, especially when you pass a function to another function, which is next week' },
          { text: 'Only function. Arrows are a fad', why: 'Arrows have been standard since 2015 and are everywhere.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Shorter isn\'t always clearer. When would you choose the longer function form, so the next reader understands faster?',
    starters: ['I\'d use function when...', 'Arrows are clearer for...'],
  },
  deepen: {
    title: 'Where arrows really shine',
    summary: 'In Chapter 5 you\'ll pass small functions to array tools: trails.filter((t) => t.open). One-line arrows make those read almost like English. That\'s the main reason they exist.',
  },
  notes: 'Arrow function expressions: MDN "Arrow function expressions" (ES2015). Braces body requires explicit return.',
};

export default lesson;
