import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Myth or Fact: scope (inside and outside a function). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Inside and outside',
  summary: 'Nora makes a variable called total inside her function, then tries to print it outside. ReferenceError. Variables have a home, and they don\'t leave it.',
  minutes: 10,
  outcomes: [
    'Explain where a variable can be used (its scope)',
    'Use outside variables inside a function',
    'Avoid relying on variables made inside a function',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'A variable made inside a function can be used anywhere in the program.',
          isFact: false,
          explain: 'A variable made with let or const inside { } lives only inside those braces. Outside, it doesn\'t exist: ReferenceError. That area is its scope.',
        },
        {
          text: 'A function can read a const that was made outside it, at the top of the program.',
          isFact: true,
          explain: 'Inner code can see outward. A const adultPrice at the top is visible inside every function below it.',
        },
        {
          text: 'Two different functions can each have their own variable called total.',
          isFact: true,
          explain: 'Each function\'s total lives in its own scope. They never clash. That\'s what makes functions safe to reuse.',
        },
        {
          text: 'If you need a value from inside a function, the clean way is to return it.',
          isFact: true,
          explain: 'Don\'t try to reach in. Let the function hand the value out with return, and store it where you need it.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Where does total live?',
      code: 'const adultPrice = 59;  // outside: visible everywhere below\n\nfunction familyCost(adults) {\n  const total = adults * adultPrice;  // inside: lives only here\n  return total;\n}\n\nconst bill = familyCost(2);\nconsole.log(bill);\n// console.log(total);  // try removing the // at the start\n',
      caption: 'The function can see adultPrice. The outside can\'t see total, so it uses what was returned.',
      challenge: 'Remove the // on the last line and run it. Read the error.',
    },
  ],
  apply: {
    scenario: 'Where each variable lives.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What happens on the last line?',
        code: 'function f() {\n  const total = 196;\n}\nf();\nconsole.log(total);',
        language: 'javascript',
        options: [
          { text: 'It prints 196', why: 'total only exists inside f.' },
          { text: 'ReferenceError: total is not defined' },
          { text: 'It prints undefined', why: 'It\'s not just empty. Outside f, the name doesn\'t exist at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const kidPrice = 39;\nfunction kids(n) {\n  return n * kidPrice;\n}\nconsole.log(kids(2));',
        language: 'javascript',
        options: [
          { text: '78' },
          { text: 'ReferenceError', why: 'kidPrice is made outside, at the top, so the function can see it.' },
          { text: 'NaN', why: 'kidPrice is 39, so the maths works.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Can the last line, outside every function, use it?',
        groups: ['Yes', 'No'],
        items: [
          { text: 'const adultPrice made at the top', group: 0 },
          { text: 'const total made inside familyCost', group: 1 },
          { text: 'The parameter adults of familyCost', group: 1 },
          { text: 'The function familyCost itself', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the program so it prints 196: return the total from the function and store it in const bill outside.',
        starter: 'function familyCost() {\n  const total = 2 * 59 + 2 * 39;\n}\n\nfamilyCost();\nconsole.log(total);\n',
        solution: 'function familyCost() {\n  const total = 2 * 59 + 2 * 39;\n  return total;\n}\n\nconst bill = familyCost();\nconsole.log(bill);\n',
        hint: 'Add return total; inside, then const bill = familyCost();',
        checks: [
          { message: 'Print 196', outputEquals: '196' },
          { message: 'bill holds 196', expr: 'bill === 196' },
          { message: 'Use return', codeIncludes: 'return' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line causes a ReferenceError?',
        lines: ['function kids(n) {', '  const cost = n * 39;', '  return cost;', '}', 'console.log(cost);'],
        bug: 4,
        fix: 'console.log(kids(2));',
        explanation: 'cost lives inside kids. Outside, use what kids returns instead.',
        language: 'javascript',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function a() {\n  const total = 1;\n  return total;\n}\nfunction b() {\n  const total = 2;\n  return total;\n}\nconsole.log(a() + b());',
        language: 'javascript',
        options: [
          { text: '2', why: 'Each total lives in its own function. They don\'t overwrite each other.' },
          { text: 'An error, total is made twice', why: 'They\'re in different scopes, so it\'s allowed.' },
          { text: '3' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The part of a program where a variable can be used is called its...',
        answers: ['scope'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const seniorPrice = 29 at the top. Declare function seniors(n) that uses seniorPrice and returns the cost. Print seniors(3).',
        starter: 'const seniorPrice = 29;\n',
        solution: 'const seniorPrice = 29;\n\nfunction seniors(n) {\n  return n * seniorPrice;\n}\n\nconsole.log(seniors(3));\n',
        hint: 'return n * seniorPrice;',
        checks: [
          { message: 'Print 87', outputEquals: '87' },
          { message: 'Use seniorPrice inside the function', codeIncludes: 'n * seniorPrice' },
          { message: 'seniors(1) returns 29', expr: 'seniors(1) === 29' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Get the value out the clean way.',
        template: 'function snow() {\n  const inches = 7;\n  [[1]] inches;\n}\nconst today = [[2]];',
        blanks: [['return'], ['snow()']],
        distractors: ['inches', 'snow', 'console.log'],
        language: 'javascript',
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa explains why scope is good. Pick the best summary.',
        from: 'rafa',
        message: 'Why do you think JavaScript hides a function\'s variables from the outside?',
        options: [
          { text: 'To make coding harder', why: 'It makes it easier: no clashes.' },
          { text: 'So functions can\'t clash. My total and your total never overwrite each other' },
          { text: 'To save memory', why: 'That\'s a side effect at most. The main point is no clashes.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a household where everyone has a drawer. What\'s the "global" stuff in the kitchen, and what\'s private to each drawer?',
    starters: ['In the kitchen, shared:', 'In my drawer:'],
  },
  deepen: {
    title: 'Block scope',
    summary: 'Scope isn\'t only about functions. let and const made inside any { }, an if block or a loop, live only inside it too. That\'s called block scope. Old var ignored blocks, which is one more reason to use let and const.',
  },
  notes: 'Scope: MDN glossary "Scope", "Block scope". let/const are block-scoped; var is function-scoped (MDN "var").',
};

export default lesson;
