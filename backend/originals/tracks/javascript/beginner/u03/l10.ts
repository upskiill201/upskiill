import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Unit Challenge. ticketPrice(age, day) for every window and the website. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: ticketPrice() for every window',
  summary: 'Saturday 19 December, the start of holiday prices. Two windows, the website and Mags\'s new phone app all need one answer. Nora writes the function they\'ll all share.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Write a complete ticketPrice(age, day) from small functions',
    'Make sure every path returns a value',
    'Reuse one function from several places',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Saturday, 7:30 a.m.',
      beats: [
        { speaker: 'mags', text: 'Holiday crowds start today. Window one, window two, the website. If any of them disagree, I\'m going back to the chalkboard.' },
        { speaker: 'nora', text: 'They won\'t. They all call ticketPrice(age, day). One function. Small helpers inside.' },
        { speaker: 'rafa', text: 'And the edge cases? Five, six, twelve, thirteen, sixty-nine, seventy?' },
        { speaker: 'nora', text: 'Every path ends in a return. No gaps.' },
        { speaker: 'wes', text: 'what does it charge a 200 year old' },
        { speaker: 'nora', text: 'Twenty-nine dollars, Wes. Same as any senior.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: the function every window shares.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const isFree = (age) => age < 6;\nconsole.log(isFree(6));',
        language: 'javascript',
        options: [
          { text: 'true', why: '6 is not less than 6.' },
          { text: 'false' },
          { text: 'undefined', why: 'A one-line arrow returns its value.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Write the helpers as arrow functions: isFree (age under 6), isKid (age under 13), isSenior (age 70 or more), and isLocalsTuesday (day is "Tuesday"). Print isSenior(70).',
        starter: '',
        solution: 'const isFree = (age) => age < 6;\nconst isKid = (age) => age < 13;\nconst isSenior = (age) => age >= 70;\nconst isLocalsTuesday = (day) => day === "Tuesday";\n\nconsole.log(isSenior(70));\n',
        hint: 'const isKid = (age) => age < 13;',
        checks: [
          { message: 'Print true', outputEquals: 'true' },
          { message: 'isFree(5) and not isFree(6)', expr: 'isFree(5) === true && isFree(6) === false' },
          { message: 'isKid(12) and not isKid(13)', expr: 'isKid(12) === true && isKid(13) === false' },
          { message: 'isLocalsTuesday("Tuesday")', expr: 'isLocalsTuesday("Tuesday") === true && isLocalsTuesday("tuesday") === false' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the rules inside ticketPrice.',
        lines: [
          'if (isFree(age)) return 0;',
          'if (isLocalsTuesday(day)) return 20;',
          'if (isKid(age)) return 39;',
          'if (isSenior(age)) return 29;',
          'return 59;',
        ],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Now the whole thing. Write the four helpers, then function ticketPrice(age, day) with early returns: free 0, Tuesday 20, kids 39, seniors 29, everyone else 59. Print ticketPrice(8, "Saturday").',
        starter: 'const isFree = (age) => age < 6;\nconst isKid = (age) => age < 13;\nconst isSenior = (age) => age >= 70;\nconst isLocalsTuesday = (day) => day === "Tuesday";\n\n',
        solution: 'const isFree = (age) => age < 6;\nconst isKid = (age) => age < 13;\nconst isSenior = (age) => age >= 70;\nconst isLocalsTuesday = (day) => day === "Tuesday";\n\nfunction ticketPrice(age, day) {\n  if (isFree(age)) return 0;\n  if (isLocalsTuesday(day)) return 20;\n  if (isKid(age)) return 39;\n  if (isSenior(age)) return 29;\n  return 59;\n}\n\nconsole.log(ticketPrice(8, "Saturday"));\n',
        hint: 'function ticketPrice(age, day) { if (isFree(age)) return 0; ... return 59; }',
        checks: [
          { message: 'Print 39', outputEquals: '39' },
          { message: 'Boundaries: 5, 6, 12, 13', expr: 'ticketPrice(5, "Friday") === 0 && ticketPrice(6, "Friday") === 39 && ticketPrice(12, "Friday") === 39 && ticketPrice(13, "Friday") === 59' },
          { message: 'Boundaries: 69, 70', expr: 'ticketPrice(69, "Friday") === 59 && ticketPrice(70, "Friday") === 29' },
          { message: 'Tuesday: 20, but toddlers stay free', expr: 'ticketPrice(40, "Tuesday") === 20 && ticketPrice(80, "Tuesday") === 20 && ticketPrice(2, "Tuesday") === 0' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'A 90-year-old on Saturday is shown $undefined. Which line is missing something?',
        lines: [
          'function ticketPrice(age, day) {',
          '  if (age < 6) return 0;',
          '  if (age < 13) return 39;',
          '  if (age >= 13 && age < 70) return 59;',
          '}',
        ],
        bug: 3,
        fix: 'Add if (age >= 70) return 29; and end with return 59;',
        explanation: 'No rule matches 70 and over, so the function falls through to } and returns undefined.',
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each call to its price.',
        pairs: [
          ['ticketPrice(4, "Tuesday")', '$0'],
          ['ticketPrice(35, "Tuesday")', '$20'],
          ['ticketPrice(10, "Sunday")', '$39'],
          ['ticketPrice(75, "Sunday")', '$29'],
          ['ticketPrice(40, "Sunday")', '$59'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why use isFree(age) inside ticketPrice instead of writing age < 6 there?',
        options: [
          { text: 'It runs faster', why: 'Speed isn\'t the point.' },
          { text: 'JavaScript requires it', why: 'Both work. It\'s a choice for clarity.' },
          { text: 'It reads like the rule, and the free age lives in exactly one place' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Use a ticketPrice that\'s already written. Make const window1 = ticketPrice(10, "Saturday") + ticketPrice(40, "Saturday") and const website the same way. Print exactly: Both windows: $98',
        starter: 'function ticketPrice(age, day) {\n  if (age < 6) return 0;\n  if (day === "Tuesday") return 20;\n  if (age < 13) return 39;\n  if (age >= 70) return 29;\n  return 59;\n}\n\n',
        solution: 'function ticketPrice(age, day) {\n  if (age < 6) return 0;\n  if (day === "Tuesday") return 20;\n  if (age < 13) return 39;\n  if (age >= 70) return 29;\n  return 59;\n}\n\nconst window1 = ticketPrice(10, "Saturday") + ticketPrice(40, "Saturday");\nconst website = ticketPrice(10, "Saturday") + ticketPrice(40, "Saturday");\n\nif (window1 === website) {\n  console.log(`Both windows: $${window1}`);\n}\n',
        hint: 'const window1 = ticketPrice(10, "Saturday") + ticketPrice(40, "Saturday");',
        checks: [
          { message: 'Print Both windows: $98', outputEquals: 'Both windows: $98' },
          { message: 'window1 is 98', expr: 'window1 === 98' },
          { message: 'website is 98', expr: 'website === 98' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A one-line helper for the receipt.',
        template: 'const receipt = (total) [[1]] `Total: $${[[2]]}`;',
        blanks: [['=>'], ['total']],
        distractors: ['->', 'return', 'price'],
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which bug would each mistake cause?',
        groups: ['undefined', 'NaN', 'ReferenceError'],
        items: [
          { text: 'A rule chain with a gap at 70', group: 0 },
          { text: 'Adding a function\'s result that only printed', group: 1 },
          { text: 'Printing a variable made inside a function, from outside', group: 2 },
          { text: 'An arrow with braces and no return', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Testing 5 and 6, 12 and 13, 69 and 70 is testing the boundary...',
        answers: ['values', 'value', 'cases', 'edges'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Mags wants a change at noon. Pick Nora\'s reply.',
        from: 'mags',
        message: 'Holiday special: kids pay $35 until New Year. How long will that take you?',
        options: [
          { text: 'A day. I\'ll update all four places', why: 'There\'s only one place now: ticketPrice.' },
          { text: 'One line, one minute. Every window and the website pick it up' },
          { text: 'Can\'t be done mid-season', why: 'It\'s a single return in one function.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'In three chapters you went from console.log to a real pricing function. What would you build next for something in your own life, using a function with parameters?',
    starters: ['I\'d write a function called...', 'It would take ... and return...'],
  },
  deepen: {
    title: 'Next: fourteen trails',
    summary: 'One function, one person, one answer. But a ski hill is lists: 14 trails, 3 lifts, hundreds of riders. Next chapter, Nora learns arrays and loops, so one function can go through a whole list.',
  },
  notes: 'Unit Challenge u03. Holiday prices from Sat 19 Dec 2026 (story only). Kid 10 + adult 40 on Saturday = 39 + 59 = 98.',
};

export default lesson;
