import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Chat with Tey: && and ||. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: '&& and ||',
  summary: 'Locals Tuesday is $20, unless you\'re under 6. And a toddler on a Tuesday is still free. Two questions at once need && and ||.',
  minutes: 10,
  outcomes: [
    'Join two conditions with && (both must be true)',
    'Join two conditions with || (either is enough)',
    'Use them inside an if',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Mags\'s rule: "$20 on Tuesday, for anyone 6 or older." That\'s two questions. Is it Tuesday? Are they 6 or older? Both have to be yes.',
          replies: ['So how do I ask both?'],
        },
        {
          tey: 'With && (say it "and"): day === "Tuesday" && age >= 6. It\'s true only when both sides are true. One false, and the whole thing is false.',
          replies: ['And if only one has to be true?'],
        },
        {
          tey: 'That\'s || ("or"). Rafa gets free lift rides if he\'s on patrol OR it\'s his day off: onPatrol || dayOff. True if either side is true, or both.',
          replies: ['Where\'s the | key?'],
        },
        {
          tey: 'On most phone keyboards it\'s in the symbols page, near the backslash. Two of them, no space: ||. Same for &&.',
          replies: ['Got it'],
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two questions, one answer',
      code: 'const day = "Tuesday";\nconst age = 34;\n\nif (day === "Tuesday" && age >= 6) {\n  console.log("Locals Tuesday: $20");\n}\n\nconst isWeekend = day === "Saturday" || day === "Sunday";\nconsole.log(`Weekend: ${isWeekend}`);\n',
      caption: '&& needs both sides true. || needs at least one.',
      challenge: 'Change age to 4. Then change day to "Sunday". What prints each time?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Write the full question on each side: day === "Saturday" || day === "Sunday". Writing day === "Saturday" || "Sunday" looks right but is always true.',
    },
  ],
  apply: {
    scenario: 'Mags\'s Locals Tuesday rule, written as code.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const day = "Tuesday";\nconst age = 4;\nconsole.log(day === "Tuesday" && age >= 6);',
        language: 'javascript',
        options: [
          { text: 'true', why: '&& needs BOTH. age >= 6 is false.' },
          { text: 'false' },
          { text: 'Tuesday', why: 'A comparison with && gives true or false.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'true or false?',
        groups: ['true', 'false'],
        items: [
          { text: 'true && true', group: 0 },
          { text: 'true && false', group: 1 },
          { text: 'true || false', group: 0 },
          { text: 'false || false', group: 1 },
          { text: 'false || true', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each rule to its operator.',
        pairs: [
          ['Both must be true', '&&'],
          ['At least one must be true', '||'],
          ['Exactly equal', '==='],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Weekend check: Saturday or Sunday.',
        template: 'const isWeekend = day === "Saturday" [[1]] day [[2]] "Sunday";',
        blanks: [['||'], ['===']],
        distractors: ['&&', '=', 'or'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const day = "Tuesday" and const age = 30. If it\'s Tuesday AND age is 6 or more, print $20.',
        starter: 'const day = "Tuesday";\nconst age = 30;\n',
        solution: 'const day = "Tuesday";\nconst age = 30;\nif (day === "Tuesday" && age >= 6) {\n  console.log("$20");\n}\n',
        hint: 'if (day === "Tuesday" && age >= 6) { ... }',
        checks: [
          { message: 'Print $20', outputEquals: '$20' },
          { message: 'Use &&', codeIncludes: '&&' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This says it\'s the weekend on a Wednesday. Which line is wrong?',
        lines: ['const day = "Wednesday";', 'const isWeekend = day === "Saturday" || "Sunday";', 'console.log(isWeekend);'],
        bug: 1,
        fix: 'const isWeekend = day === "Saturday" || day === "Sunday";',
        explanation: 'The right side is just "Sunday", which isn\'t a question. Ask the full question on each side of ||.',
        language: 'javascript',
      },
      {
        kind: 'mcq',
        prompt: 'Rafa rides free if he is on patrol, or if it\'s his day off. Which line?',
        options: [
          { text: 'onPatrol && dayOff', why: 'That needs both at once. He\'d almost never ride free.' },
          { text: 'onPatrol || dayOff' },
          { text: 'onPatrol === dayOff', why: 'That checks if they\'re the same, which isn\'t the rule.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make const day = "Sunday". Store whether it\'s Saturday or Sunday in const isWeekend, then print exactly: Weekend: true',
        starter: 'const day = "Sunday";\n',
        solution: 'const day = "Sunday";\nconst isWeekend = day === "Saturday" || day === "Sunday";\nconsole.log(`Weekend: ${isWeekend}`);\n',
        hint: 'const isWeekend = day === "Saturday" || day === "Sunday";',
        checks: [
          { message: 'Print Weekend: true', outputEquals: 'Weekend: true' },
          { message: 'isWeekend is true', expr: 'isWeekend === true' },
          { message: 'Use ||', codeIncludes: '||' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kids\' tickets: age 6 or more AND under 13. Which condition?',
        options: [
          { text: 'age >= 6 || age < 13', why: 'With ||, a 40-year-old passes (40 >= 6). Everyone would get the kids\' price.' },
          { text: 'age >= 6 && age < 13' },
          { text: 'age < 6 && age >= 13', why: 'No age is both under 6 and 13 or over, so this is never true.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the check: under 6 or 70 and over pays less.',
        tiles: ['age', '<', '6', '||', 'age', '>=', '70'],
        distractors: ['&&', '==='],
        language: 'javascript',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a rule with "and" or "or" in it: a discount, a deadline, a house rule. Write it as A && B or A || B.',
    starters: ['The rule is...', 'In code: ... && ...'],
  },
  deepen: {
    title: 'Short-circuiting',
    summary: '&& stops as soon as one side is false, and || stops as soon as one side is true. JavaScript doesn\'t even look at the second side. Developers use this on purpose, for example user && user.name only reads the name if there is a user. You\'ll see a safer version, ?., in Level 3.',
  },
  notes: 'Logical AND (&&), OR (||) and short-circuit evaluation: MDN "Logical AND", "Logical OR". A non-empty string is truthy, so x === "a" || "b" is always truthy.',
};

export default lesson;
