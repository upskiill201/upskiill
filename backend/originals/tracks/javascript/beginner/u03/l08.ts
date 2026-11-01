import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Walkthrough: small functions working together. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Small functions, working together',
  summary: 'Nora\'s price function is forty lines long and nobody, including Nora, wants to touch it. Rafa\'s advice: one function, one job. Then let them call each other.',
  minutes: 11,
  outcomes: [
    'Split a big job into small functions with one job each',
    'Call one function from inside another',
    'Use a function that returns true/false inside an if',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building a price from small pieces',
      steps: [
        {
          title: 'A question function',
          body: 'One small job: is this person free? It returns true or false. Its name reads like the question.',
          code: 'function isFree(age) {\n  return age < 6;\n}',
          language: 'javascript',
        },
        {
          title: 'Another one',
          body: 'Is it Locals Tuesday? Again, one question, one answer.',
          code: 'function isLocalsTuesday(day) {\n  return day === "Tuesday";\n}',
          language: 'javascript',
        },
        {
          title: 'A function that uses them',
          body: 'The price function calls the small ones inside its ifs. It reads almost like Mags\'s sign.',
          code: 'function ticketPrice(age, day) {\n  if (isFree(age)) {\n    return 0;\n  }\n  if (isLocalsTuesday(day)) {\n    return 20;\n  }\n  return 59;\n}',
          language: 'javascript',
        },
        {
          title: 'return ends early',
          body: 'Each return stops the function right there. So once isFree is true, the Tuesday check never runs. No else needed: this style is called an early return.',
          code: 'console.log(ticketPrice(4, "Tuesday"));   // 0\nconsole.log(ticketPrice(30, "Tuesday"));  // 20\nconsole.log(ticketPrice(30, "Friday"));   // 59',
          language: 'javascript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Pieces that click together',
      code: 'function isFree(age) {\n  return age < 6;\n}\n\nfunction isLocalsTuesday(day) {\n  return day === "Tuesday";\n}\n\nfunction ticketPrice(age, day) {\n  if (isFree(age)) {\n    return 0;\n  }\n  if (isLocalsTuesday(day)) {\n    return 20;\n  }\n  return 59;\n}\n\nconsole.log(ticketPrice(4, "Tuesday"));\nconsole.log(ticketPrice(30, "Tuesday"));\nconsole.log(ticketPrice(30, "Friday"));\n',
      caption: 'Each small function can be tested on its own. When one rule changes, you know exactly where to look.',
      challenge: 'Add function isSenior(age) that returns age >= 70, and a rule in ticketPrice that returns 29 for seniors (after the Tuesday rule).',
    },
  ],
  apply: {
    scenario: 'Rafa\'s rule: one function, one job.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function isFree(age) {\n  return age < 6;\n}\nconsole.log(isFree(5));',
        language: 'javascript',
        options: [
          { text: 'false', why: '5 < 6 is true.' },
          { text: 'true' },
          { text: '5', why: 'It returns the result of the comparison.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function price(age) {\n  if (age < 6) {\n    return 0;\n  }\n  return 59;\n}\nconsole.log(price(3));',
        language: 'javascript',
        options: [
          { text: '0' },
          { text: '0\n59', why: 'return 0 ends the function. return 59 never runs.' },
          { text: '59', why: '3 < 6, so it returns 0 first.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Declare function isSenior(age) that returns true when age is 70 or more. Print isSenior(72).',
        starter: '',
        solution: 'function isSenior(age) {\n  return age >= 70;\n}\n\nconsole.log(isSenior(72));\n',
        hint: 'return age >= 70;',
        checks: [
          { message: 'Print true', outputEquals: 'true' },
          { message: 'isSenior(70) is true', expr: 'isSenior(70) === true' },
          { message: 'isSenior(69) is false', expr: 'isSenior(69) === false' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'One job or too many? Sort the function names.',
        groups: ['One clear job', 'Too many jobs'],
        items: [
          { text: 'isFree(age)', group: 0 },
          { text: 'priceAndPrintAndSaveAndEmail()', group: 1 },
          { text: 'kidsCost(n)', group: 0 },
          { text: 'doEverything()', group: 1 },
          { text: 'isLocalsTuesday(day)', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Use the question function inside the if.',
        template: 'function ticketPrice(age) {\n  if ([[1]](age)) {\n    [[2]] 0;\n  }\n  return 59;\n}',
        blanks: [['isFree'], ['return']],
        distractors: ['free', 'console.log', 'age'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'Toddlers are charged $59. Which line is the problem?',
        lines: ['function isFree(age) {', '  age < 6;', '}', 'function price(age) {', '  return isFree(age) ? 0 : 59;', '}'],
        bug: 1,
        fix: '  return age < 6;',
        explanation: 'isFree works out the answer but doesn\'t return it, so it gives undefined, which is falsy. Every age pays $59.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Write isFree(age) (under 6) and isLocalsTuesday(day) (day is "Tuesday"). Then write ticketPrice(age, day) that uses them with early returns: free is 0, Tuesday is 20, otherwise 59. Print ticketPrice(40, "Tuesday").',
        starter: '',
        solution: 'function isFree(age) {\n  return age < 6;\n}\n\nfunction isLocalsTuesday(day) {\n  return day === "Tuesday";\n}\n\nfunction ticketPrice(age, day) {\n  if (isFree(age)) {\n    return 0;\n  }\n  if (isLocalsTuesday(day)) {\n    return 20;\n  }\n  return 59;\n}\n\nconsole.log(ticketPrice(40, "Tuesday"));\n',
        hint: 'Three functions. ticketPrice calls the other two inside its ifs.',
        checks: [
          { message: 'Print 20', outputEquals: '20' },
          { message: 'A toddler on Tuesday is free', expr: 'ticketPrice(3, "Tuesday") === 0' },
          { message: 'An adult on Friday pays 59', expr: 'ticketPrice(30, "Friday") === 59' },
          { message: 'ticketPrice calls isFree', codeIncludes: 'isFree(age)' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each function to what it returns.',
        pairs: [
          ['isFree(3)', 'true'],
          ['isFree(30)', 'false'],
          ['isLocalsTuesday("Monday")', 'false (not Tuesday)'],
          ['ticketPrice(30, "Monday")', '59'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Returning from a function as soon as you know the answer, instead of using else, is called an early...',
        answers: ['return', 'early return'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Mags changes the free age from "under 6" to "under 5". What changes?',
        options: [
          { text: 'Only isFree' },
          { text: 'Every function that mentions ages', why: 'Only isFree knows the free rule. That\'s the point of one job each.' },
          { text: 'ticketPrice and isFree', why: 'ticketPrice just asks isFree. It doesn\'t know the number.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Take a job you do (cooking dinner, opening a shop). Split it into three small functions with one job each. What would you name them?',
    starters: ['1. ...', 'They\'d be called...'],
  },
  deepen: {
    title: 'Pure functions',
    summary: 'isFree and kidsCost only use their parameters and only return a value: same input, same output, every time. Developers call these pure functions. They\'re the easiest kind to test, which is why Rafa likes them.',
  },
  notes: 'Function composition, early return: common practice (e.g. MDN "Functions" guide). Pure function: MDN glossary.',
};

export default lesson;
