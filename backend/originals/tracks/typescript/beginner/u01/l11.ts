import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 11. Arithmetic: + - * / %, order of operations, brackets, and "45" + 15 = "4515" (caught when labelled). */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'TypeScript as a calculator',
  summary: 'Sessions are 45 minutes with 15 to reset the room. How long is a morning of three? TypeScript can work it out, and catch the sneakiest maths bug of all.',
  minutes: 13,
  outcomes: ['Do maths with + - * and /', 'Use brackets to control the order', 'Spot when a number is secretly text'],
  learn: [
    {
      kind: 'compare',
      title: 'The sneakiest bug in the spreadsheet',
      before: { label: 'Text plus a number', text: 'console.log("45" + 15);\n\n4515' },
      after: { label: 'A number plus a number', text: 'console.log(45 + 15);\n\n60' },
      notes: [
        'With quotes, "45" is text. Text + a number JOINS them: "45" then "15" makes "4515".',
        'Without quotes, 45 is a number, so + adds: 60.',
        'This is exactly how the spreadsheet once booked a 4,515-minute session. Labels catch it, as you\'ll see below.',
      ],
    },
    {
      kind: 'text',
      html:
        '<p><strong>The maths signs</strong></p><ul>' +
        '<li><code>+</code> add, <code>-</code> subtract</li>' +
        '<li><code>*</code> multiply (a star, not an x)</li>' +
        '<li><code>/</code> divide: <code>10 / 4</code> is <code>2.5</code></li></ul>' +
        '<p>Like school maths, <code>*</code> and <code>/</code> happen before <code>+</code> and <code>-</code>. So <code>2 + 3 * 4</code> is 14. Brackets go first: <code>(2 + 3) * 4</code> is 20.</p>' +
        '<p>And here is the type label earning its keep: <code>const total: number = "45" + 15;</code> gives a red line, because "45" + 15 makes text, not a number.</p>',
    },
    {
      kind: 'tryIt',
      title: 'A morning of sessions',
      caption: 'Three sessions, each 45 minutes plus 15 to reset the room. Press Run.',
      code: 'const morning: number = 3 * (45 + 15);\nconsole.log("Minutes needed:", morning);\nconsole.log("Hours needed:", morning / 60);\n',
      challenge: 'Change it to four sessions and run it again. Does it still fit in a morning?',
    },
  ],
  apply: {
    scenario: 'Planning Tuesday\'s sessions.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each sign to what it does.',
        pairs: [
          ['+', 'Add'],
          ['-', 'Subtract'],
          ['*', 'Multiply'],
          ['/', 'Divide'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: 'console.log(2 + 3 * 4);',
        language: 'typescript',
        options: [
          { text: '20', why: 'Multiplying happens first: 3 * 4 is 12, then 2 + 12 is 14.' },
          { text: '14' },
          { text: '234', why: 'These are numbers, not text, so they\'re added and multiplied, not joined.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show how many minutes two sessions take: 2 times (45 plus 15). It should show 120.',
        starter: '',
        solution: 'console.log(2 * (45 + 15));\n',
        hint: 'Brackets first: 2 * (45 + 15).',
        checks: [
          { message: 'Show 120', outputEquals: '120' },
          { message: 'Work it out with *', codeIncludes: '*' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: 'console.log("45" + 15);',
        language: 'typescript',
        options: [
          { text: '60', why: 'With quotes, "45" is text, so + joins instead of adding.' },
          { text: 'An error', why: 'Joining text and a number with + is allowed. It just isn\'t what you wanted.' },
          { text: '4515' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which make 60?',
        groups: ['Makes 60', 'Doesn\'t'],
        items: [
          { text: '45 + 15', group: 0 },
          { text: '"45" + 15', group: 1 },
          { text: '120 / 2', group: 0 },
          { text: '2 * 30', group: 0 },
          { text: '30 + 30 * 2', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the bug: the total should be the number 60, with no type errors',
        starter: 'const total: number = "45" + 15;\nconsole.log(total);\n',
        solution: 'const total: number = 45 + 15;\nconsole.log(total);\n',
        hint: '"45" in quotes is text. Remove the quotes so it\'s a number.',
        checks: [
          { message: 'No type errors', noTypeErrors: true },
          { message: 'Show 60', outputEquals: '60' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Add the brackets so the reset time is added before multiplying.',
        language: 'typescript',
        template: 'console.log(3 * [[1]]45 + 15[[2]]);',
        blanks: [['('], [')']],
        distractors: ['[', ']'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does console.log(10 / 4) show?',
        answers: ['2.5'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did : number help with "45" + 15?',
        options: [
          { text: 'It made the code run faster', why: 'Speed isn\'t the point. The label caught that the result was text, not a number.' },
          { text: 'TypeScript saw the result was text, not a number, and showed a red line' },
          { text: 'It turned "45" into a number automatically', why: 'TypeScript doesn\'t change your values. It only checks them.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make a number called day: 6 sessions of 45 minutes plus 15 to reset. Show it in hours (it should show 6).',
        starter: 'const day: number = 0;\n',
        solution: 'const day: number = 6 * (45 + 15);\nconsole.log(day / 60);\n',
        hint: 'day is 6 * (45 + 15). Then divide by 60 inside console.log.',
        checks: [
          { message: 'Work out the day', expr: 'day === 360' },
          { message: 'Show 6', outputEquals: '6' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where have you seen a number that was secretly text cause a problem: a spreadsheet, a form, a bill?',
    starters: ['I once saw...', 'It went wrong because...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Try % in the playground: 7 % 3 shows 1, the remainder after dividing. You\'ll use it in Chapter 3 to split sessions across rooms.',
  },
  notes: '"45" + 15 → "4515" (string concatenation; no TS error unless the result is labelled number → TS2322). Operator precedence: * / before + -. 3 * (45 + 15) = 180; 6 * (45 + 15) = 360; 360 / 60 = 6.',
};

export default lesson;
