import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8 — Why 0.1 + 0.2 isn't 0.3: floating-point, and what it means for money. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: "Why 0.1 + 0.2 isn't 0.3",
  summary: 'Ada adds two small fees, 0.10 and 0.20, and Python says 0.30000000000000004. It isn\'t a bug in Python. It\'s how almost every computer stores decimals, and it matters for money.',
  minutes: 12,
  outcomes: [
    'Explain why floats can be slightly off',
    'Avoid comparing floats with ==',
    'Know why money is better stored as whole numbers',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Computers count in twos',
      html: '<p>Try writing one third as a decimal: 0.3333... It never ends, so you stop somewhere and accept a tiny error. Computers have the same problem, but in <strong>binary</strong> (base 2) instead of base 10. In binary, even 0.1 never ends.</p><p>So a float stores the nearest value it can, using a standard called <strong>IEEE 754</strong> that almost every computer and language shares. Usually the difference is invisible. Sometimes it shows: <code>0.1 + 0.2</code> is <code>0.30000000000000004</code>, and <code>0.1 + 0.2 == 0.3</code> is <code>False</code>.</p><p>For most things (a distance, a temperature) the error is far too small to matter. For <strong>money</strong> it\'s different: thousands of tiny errors can add up, and an amount that is "almost" 0.30 can fail a check that it equals 0.30. That\'s why accounting systems often store money as <strong>whole numbers of the smallest unit</strong>, like kobo. Next lesson, Ada does exactly that.</p>',
    },
    {
      kind: 'tryIt',
      title: 'See it for yourself',
      caption: 'Run it. The last line shows the safer way to compare.',
      code: 'print(0.1 + 0.2)\nprint(0.1 + 0.2 == 0.3)\nprint(round(0.1 + 0.2, 2) == 0.3)\n\n# In kobo, there is no problem:\nprint(10 + 20 == 30)\n',
      challenge: 'Try print(1.1 * 3). Is it exactly 3.3?',
    },
  ],
  apply: {
    scenario: 'The tiny fee that wasn\'t.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(0.1 + 0.2 == 0.3)',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: '0.1 + 0.2 is stored as 0.30000000000000004.' },
          { text: 'An error', why: 'Comparing floats is allowed, just risky.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print 0.1 + 0.2, rounded to 2 places',
        starter: '',
        solution: 'print(round(0.1 + 0.2, 2))\n',
        hint: 'round(0.1 + 0.2, 2)',
        checks: [
          { message: 'Print 0.3', outputEquals: '0.3' },
          { message: 'Use round()', codeIncludes: 'round(' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t a float store 0.1 exactly?',
        options: [
          { text: 'Python is badly written', why: 'Almost every language does the same: IEEE 754.' },
          { text: 'In binary, 0.1 is a never-ending fraction, so it\'s stored as the nearest value' },
          { text: '0.1 is too small', why: 'Size isn\'t the issue. Base 2 is.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Exact, or might be slightly off?',
        groups: ['Exact', 'Might be slightly off'],
        items: [
          { text: '10 + 20 (kobo, ints)', group: 0 },
          { text: '0.1 + 0.2 (floats)', group: 1 },
          { text: '330000 // 7', group: 0 },
          { text: '1.1 * 3', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add the two fees in kobo (10 and 20) and print whether they equal 30',
        starter: 'fee_a = 10  # kobo\nfee_b = 20  # kobo\n',
        solution: 'fee_a = 10  # kobo\nfee_b = 20  # kobo\nprint(fee_a + fee_b == 30)\n',
        hint: 'print(fee_a + fee_b == 30)',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which check might wrongly say False?',
        language: 'python',
        lines: ['print(10 + 20 == 30)', 'print(0.1 + 0.2 == 0.3)', 'print(round(0.1 + 0.2, 2) == 0.3)'],
        bug: 1,
        explanation: 'Comparing floats with == is risky. Round first, or use whole numbers.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its meaning.',
        pairs: [
          ['IEEE 754', 'The standard for storing floats'],
          ['Binary', 'Counting in base 2'],
          ['Kobo', 'Money as whole numbers'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Round before comparing floats.',
        language: 'python',
        template: 'print([[1]](0.1 + 0.2, 2) == 0.3)',
        blanks: [['round']],
        distractors: ['int', 'str'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'If floats are slightly off, should I never use them?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Never use floats.', why: 'They\'re fine for most things.' },
          { text: 'It doesn\'t matter.', why: 'For money it can.' },
          { text: 'Use them for measurements. For money that must add up exactly, use whole kobo, or round carefully.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(0.5 + 0.5) show?',
        answers: ['1.0'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever seen a total that was off by a kobo or a cent (a bill, a bank statement)? What might have caused it?',
    starters: ['I saw...', 'It might have been...'],
  },
  deepen: {
    title: 'The Python docs explain it',
    summary: 'The Python tutorial has a whole page on this: "Floating-Point Arithmetic: Issues and Limitations". It\'s short and clear.',
  },
  notes: 'Python tutorial §15 "Floating-Point Arithmetic: Issues and Limitations": 0.1 cannot be represented exactly in binary; 0.1 + 0.2 == 0.3 is False; most machines use IEEE 754 double precision. 1.1 * 3 = 3.3000000000000003. 0.5 + 0.5 = 1.0 (0.5 is exact in binary).',
};

export default lesson;
