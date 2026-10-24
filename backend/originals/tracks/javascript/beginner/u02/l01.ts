import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Myth or Fact: comparisons, booleans, ===. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'True or false',
  summary: 'Tuesday 8 December, Locals Tuesday. Before the website can decide who pays $20, it has to ask yes-or-no questions.',
  minutes: 10,
  outcomes: [
    'Compare values with > < >= <= and ===',
    'Know that a comparison gives true or false',
    'Store a true/false answer in a variable',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 7:40 a.m.',
      beats: [
        { speaker: 'mags', text: 'Locals Tuesday. Twenty dollars for anyone, since 1998. Under six still free. And the phone will ring off the wall.' },
        { speaker: 'nora', text: 'So the website needs to know: is today Tuesday? Is this kid under six?' },
        { speaker: 'rafa', text: 'Yes-or-no questions. Computers love those. Every one comes back true or false.' },
      ],
    },
    {
      kind: 'myth',
      statements: [
        {
          text: 'age < 6 gives back true or false.',
          isFact: true,
          explain: 'Every comparison answers with a boolean: true or false. If age is 4, age < 6 is true.',
        },
        {
          text: 'To check if two things are equal, you write a single = sign.',
          isFact: false,
          explain: 'A single = stores a value (age = 4). To ask "are these equal?" use three: age === 4.',
        },
        {
          text: '6 >= 6 is true.',
          isFact: true,
          explain: '>= means "greater than OR equal to", so 6 >= 6 is true. 6 > 6 is false.',
        },
        {
          text: '"Tuesday" === "tuesday" is true.',
          isFact: false,
          explain: 'String comparisons care about capitals. "T" and "t" are different characters, so it\'s false.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Ask the questions',
      code: 'const age = 4;\nconst day = "Tuesday";\n\nconsole.log(age < 6);\nconsole.log(day === "Tuesday");\nconsole.log(age >= 70);\n\nconst isFree = age < 6;\nconsole.log(`Free ticket: ${isFree}`);\n',
      caption: 'Every comparison prints true or false. You can store the answer, like any value.',
      challenge: 'Change age to 7 and day to "Wednesday", then run it again.',
    },
  ],
  apply: {
    scenario: 'Locals Tuesday: the yes-or-no questions.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const age = 8;\nconsole.log(age < 6);',
        language: 'javascript',
        options: [
          { text: 'true', why: '8 is not less than 6.' },
          { text: 'false' },
          { text: '8 < 6', why: 'JavaScript works the comparison out instead of printing it.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each sign to its meaning.',
        pairs: [
          ['>', 'Greater than'],
          ['<', 'Less than'],
          ['>=', 'Greater than or equal'],
          ['<=', 'Less than or equal'],
          ['===', 'Exactly equal'],
          ['!==', 'Not equal'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'age is 70. Which of these are true?',
        groups: ['true', 'false'],
        items: [
          { text: 'age >= 70', group: 0 },
          { text: 'age > 70', group: 1 },
          { text: 'age === 70', group: 0 },
          { text: 'age < 6', group: 1 },
          { text: 'age !== 12', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make const age = 4. Store age < 6 in a const called isFree, then print isFree.',
        starter: 'const age = 4;\n',
        solution: 'const age = 4;\nconst isFree = age < 6;\nconsole.log(isFree);\n',
        hint: 'const isFree = age < 6;',
        checks: [
          { message: 'Print true', outputEquals: 'true' },
          { message: 'isFree holds a boolean', expr: 'isFree === true' },
          { message: 'Work it out with <', codeIncludes: '< 6' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Nora wants to CHECK the day, but this line changes it instead. Which line?',
        lines: ['let day = "Monday";', 'console.log(day = "Tuesday");'],
        bug: 1,
        fix: 'console.log(day === "Tuesday");',
        explanation: 'A single = stores "Tuesday" in day. To ask a question, use ===.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Check if the senior discount applies (70 or older).',
        template: 'const isSenior = age [[1]] 70;',
        blanks: [['>=']],
        distractors: ['=>', '>', '='],
        language: 'javascript',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const day = "tuesday";\nconsole.log(day === "Tuesday");',
        language: 'javascript',
        options: [
          { text: 'true', why: 'The capital T makes them different strings.' },
          { text: 'tuesday', why: 'A comparison prints true or false.' },
          { text: 'false' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make const day = "Tuesday". Print exactly: Locals Tuesday: true by comparing day to "Tuesday" inside ${ }.',
        starter: 'const day = "Tuesday";\n',
        solution: 'const day = "Tuesday";\nconsole.log(`Locals Tuesday: ${day === "Tuesday"}`);\n',
        hint: 'console.log(`Locals Tuesday: ${day === "Tuesday"}`);',
        checks: [
          { message: 'Print Locals Tuesday: true', outputEquals: 'Locals Tuesday: true' },
          { message: 'Compare with ===', codeIncludes: '===' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'JavaScript\'s name for a true-or-false value?',
        answers: ['boolean', 'a boolean', 'booleans', 'bool'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Kids\' tickets are for ages 6 to 12. Which check is true for a 12-year-old?',
        options: [
          { text: 'age < 12', why: '12 is not less than 12.' },
          { text: 'age <= 12' },
          { text: 'age > 12', why: '12 is not more than 12.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a rule you follow, like "if it\'s below freezing, wear a hat". What is the yes-or-no question inside it?',
    starters: ['My rule is...', 'The question is...'],
  },
  deepen: {
    title: 'Comparing text alphabetically',
    summary: '< and > work on strings too, by alphabet order: "apple" < "banana" is true. But capitals come before lowercase ("Zebra" < "apple" is true), which surprises people. For sorting names properly, JavaScript has a.localeCompare(b), which you\'ll meet when sorting lists.',
  },
  notes: 'Comparison operators and booleans: MDN "Comparison operators", "Boolean". Strict equality ===: MDN. Locals Tuesday rules from the outline ($20 everyone, under 6 free). Tue 8 Dec 2026 is a Tuesday.',
};

export default lesson;
