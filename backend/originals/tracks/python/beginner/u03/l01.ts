import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1 — Whole numbers and decimals: int and float in sums, and why / always gives a float. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Whole numbers and decimals',
  summary: 'Kemi asks to pay her share in two halves this month. Ada works it out: 30000 / 2 is 15000.0. Where did the .0 come from, and does it matter?',
  minutes: 11,
  outcomes: [
    'Tell ints from floats in a sum\'s answer',
    'Know that / always gives a float',
    'Predict the type when ints and floats mix',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The first of the month',
      beats: [
        { speaker: 'narrator', text: 'Kemi, from accounts, asks if she can pay her 30000 in two halves this month. Ada types print(30000 / 2).' },
        { speaker: 'narrator', text: 'Output: 15000.0.' },
        { speaker: 'ada', text: 'Arjun, why .0? Half of 30000 is 15000. It\'s not a decimal.' },
        { speaker: 'arjun', text: 'Division in Python always gives a float, a number with a decimal point, even when it divides exactly. 15000.0 and 15000 are equal, but they\'re different types.' },
      ],
      choice: {
        prompt: 'Does the .0 matter for Kemi\'s half?',
        options: [
          {
            text: 'Not for the value: 15000.0 == 15000. But it\'s worth knowing which type you have.',
            outcome: 'Right. The value is the same. Later in the chapter, Ada learns when floats can go slightly wrong with money.',
            best: true,
          },
          {
            text: 'It means Kemi owes 15000 and a bit.',
            outcome: '.0 means zero decimals. Kemi owes exactly 15000.',
          },
          {
            text: 'It\'s an error.',
            outcome: 'No error: it\'s Python\'s float type.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>Python has two kinds of number:</p><ul><li><strong>int</strong>: whole numbers, like <code>30000</code> or <code>-5</code>.</li><li><strong>float</strong>: numbers with a decimal point, like <code>15000.0</code> or <code>2.5</code>.</li></ul><p>Rules for the answer\'s type: <code>/</code> always gives a float. <code>+ - *</code> on two ints give an int. Mix an int with a float and the answer is a float: <code>30000 + 0.5</code> is <code>30000.5</code>.</p>',
    },
    {
      kind: 'tryIt',
      title: "Kemi's halves",
      caption: 'Run it, and look at which answers have a .0.',
      code: 'share = 30000\n\nprint(share / 2)\nprint(share * 2)\nprint(share + 0.5)\nprint(15000.0 == 15000)\n',
      challenge: 'Print type(share / 2) and type(share * 2).',
    },
  ],
  apply: {
    scenario: "Kemi pays in halves.",
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(30000 / 2)',
        language: 'python',
        options: [
          { text: '15000', why: '/ always gives a float.' },
          { text: '15000.0' },
          { text: '15000.5', why: 'It divides exactly; the .0 just marks a float.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "Print Kemi's half of the share",
        starter: 'share = 30000\n',
        solution: 'share = 30000\nprint(share / 2)\n',
        hint: 'print(share / 2)',
        checks: [
          { message: 'Print 15000.0', outputEquals: '15000.0' },
          { message: 'Divide the variable', codeIncludes: 'share / 2' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'int or float answer?',
        groups: ['int', 'float'],
        items: [
          { text: '30000 * 2', group: 0 },
          { text: '30000 / 2', group: 1 },
          { text: '30000 + 0.5', group: 1 },
          { text: '30000 - 5000', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(15000.0 == 15000)',
        language: 'python',
        options: [
          { text: 'False', why: 'Different types, but the same value. == compares values.' },
          { text: 'Error', why: 'Comparing an int and a float is fine.' },
          { text: 'True' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the type of share / 2',
        starter: 'share = 30000\n',
        solution: 'share = 30000\nprint(type(share / 2))\n',
        hint: 'print(type(share / 2))',
        checks: [{ message: "Print <class 'float'>", outputEquals: "<class 'float'>" }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the sum to its answer.',
        pairs: [
          ['30000 / 3', '10000.0'],
          ['30000 * 3', '90000'],
          ['2.5 + 2.5', '5.0'],
          ['7 - 2', '5'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada expects every answer to be a whole int. Which line gives a float?',
        language: 'python',
        lines: ['print(11 * 30000)', 'print(330000 / 11)', 'print(330000 - 50)'],
        bug: 1,
        explanation: '/ always gives a float: 30000.0.',
      },
      {
        kind: 'fillBlank',
        prompt: 'A whole number is an [[1]]; a number with a decimal point is a [[2]].',
        template: 'A whole number is an [[1]]; a number with a decimal point is a [[2]].',
        blanks: [['int'], ['float']],
        distractors: ['str', 'decimal'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why do you think Python makes / always return a float?',
        prompt: "Ada's best guess?",
        options: [
          { text: 'So you always know what type you\'ll get, whether it divides exactly or not.' },
          { text: 'To annoy people.', why: 'It\'s a deliberate, consistent rule.' },
          { text: 'Because floats are bigger.', why: 'It\'s about predictability, not size.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(9 / 3) show?',
        answers: ['3.0'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: '15000 and 15000.0 are the same value but different types. Where else does the same amount look different (₦15k, 15,000, fifteen thousand)?',
    starters: ['I\'ve seen it written as...', 'It matters when...'],
  },
  deepen: {
    title: 'Python 2 was different',
    summary: 'In Python 2, 7 / 2 gave 3. Python 3 changed / to always give a float (PEP 238). It\'s one reason Python 2 code sometimes breaks today.',
  },
  notes: 'True division / always returns float in Python 3 (PEP 238 "Changing the Division Operator"; tutorial §3.1.1). Mixed int/float arithmetic returns float. 15000.0 == 15000 is True. Kemi is a named member of the office ajo (code name only).',
};

export default lesson;
