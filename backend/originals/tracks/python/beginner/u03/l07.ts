import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7 — round(): to a whole number or to 2 places, and banker's rounding. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'round()',
  summary: 'Bisi wants to know her share in naira and kobo if the pot were split seven ways: 47142.857142857145. Ada needs it to two decimal places. Python rounds, with one surprise.',
  minutes: 11,
  outcomes: [
    'Round to a whole number with round(x)',
    'Round to decimal places with round(x, 2)',
    'Know that halves round to the nearest even number',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Before and after round()',
      before: {
        label: 'Raw',
        text: '330000 / 7 → 47142.857142857145. Fifteen digits nobody can pay.',
      },
      after: {
        label: 'Rounded',
        text: 'round(330000 / 7, 2) → 47142.86. round(330000 / 7) → 47143. Readable, and close enough to talk about.',
      },
      notes: [
        'round(x) gives the nearest whole number, as an int.',
        'round(x, 2) gives 2 decimal places, as a float.',
        'The surprise: exact halves go to the nearest even number. round(2.5) is 2 and round(3.5) is 4. It\'s called banker\'s rounding, and it stops lots of rounding from drifting upwards.',
      ],
    },
    {
      kind: 'tryIt',
      title: "Bisi's share",
      caption: 'Try both kinds of rounding, then the halves.',
      code: 'share = 330000 / 7\n\nprint(share)\nprint(round(share, 2))\nprint(round(share))\nprint(round(2.5), round(3.5))\n',
      challenge: 'What is round(share, 1)?',
    },
  ],
  apply: {
    scenario: "Rounding Bisi's share.",
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(round(47142.857, 2))',
        language: 'python',
        options: [
          { text: '47142.85', why: 'The next digit is 7, so it rounds up.' },
          { text: '47143', why: 'That\'s round() with no places.' },
          { text: '47142.86' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the seven-way share rounded to 2 decimal places',
        starter: 'share = 330000 / 7\n',
        solution: 'share = 330000 / 7\nprint(round(share, 2))\n',
        hint: 'round(share, 2)',
        checks: [
          { message: 'Print 47142.86', outputEquals: '47142.86' },
          { message: 'Use round()', codeIncludes: 'round(' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(round(2.5))',
        language: 'python',
        options: [
          { text: '3', why: 'Python rounds exact halves to the nearest even number.' },
          { text: '2.5', why: 'round() with no places gives a whole number.' },
          { text: '2' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its result.',
        pairs: [
          ['round(7.6)', '8'],
          ['round(7.4)', '7'],
          ['round(3.5)', '4'],
          ['round(7.456, 1)', '7.5'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the share as a whole number with round()',
        starter: 'share = 330000 / 7\n',
        solution: 'share = 330000 / 7\nprint(round(share))\n',
        hint: 'round(share) with no second number.',
        checks: [{ message: 'Print 47143', outputEquals: '47143' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'What type does it give?',
        groups: ['int', 'float'],
        items: [
          { text: 'round(47142.857)', group: 0 },
          { text: 'round(47142.857, 2)', group: 1 },
          { text: 'round(2.5)', group: 0 },
          { text: 'round(9.99, 1)', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Round to two decimal places.',
        language: 'python',
        template: 'print(round(share, [[1]]))',
        blanks: [['2']],
        distractors: ['0.01', '"2"'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line rounds to a whole number, when Ada wanted 2 places?',
        language: 'python',
        lines: ['share = 330000 / 7', 'print(round(share))', 'print(round(share, 2))'],
        bug: 1,
        fix: 'print(round(share, 2))',
        explanation: 'Without the second number, round() gives a whole number.',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'round(2.5) gave 2! Is Python broken?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, report it.', why: 'It\'s documented behaviour.' },
          { text: 'No, it\'s on purpose. Exact halves go to the even number, so rounding lots of halves doesn\'t drift up.' },
          { text: 'It always rounds down.', why: 'round(3.5) is 4.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(round(9.7)) show?',
        answers: ['10'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Rounding is fine for talking, risky for paying. When is "about 47,143" good enough, and when isn\'t it?',
    starters: ['Close enough when...', 'Not good enough when...'],
  },
  deepen: {
    title: 'Rounding money properly',
    summary: 'Floats can round in surprising ways: round(2.675, 2) gives 2.67, not 2.68. Lesson 9 shows the reliable way to handle money: whole kobo.',
  },
  notes: 'round() uses round-half-to-even (Built-in Functions: round, "values are rounded to the closest multiple of 10 to the power minus ndigits; if two multiples are equally close, rounding is done toward the even choice"). round(2.675, 2) == 2.67 is the documented float example. 330000 / 7 = 47142.857142857145; round(…, 2) = 47142.86; round(…) = 47143.',
};

export default lesson;
