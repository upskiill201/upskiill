import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 18 — Testing every branch: one input per branch, plus the edges. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Testing every branch',
  summary: 'Before pay day, Ada makes a test plan: one payment for every branch of every decision, and every edge where a rule changes. It\'s the moment she finds her last bug: the 28th.',
  minutes: 12,
  outcomes: [
    'Make a test plan with one input per branch',
    'Test the edges where rules change',
    'Compare the actual output with the expected one',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The test plan',
      beats: [
        { speaker: 'narrator', text: 'Ada writes a table: day, on leave, expected fee. Day 24: 0. Day 25: 0. Day 26: 1500. Day 28: 1500. Day 29: 3000. On leave, day 30: 0.' },
        { speaker: 'narrator', text: 'She runs each one. Day 28 gives 3000. Her code says day < 28 where the whiteboard says "to the 28th".' },
        { speaker: 'arjun', text: '(on the call) That\'s why you test the edges. The middle of a rule is almost never where the bug is.' },
      ],
      choice: {
        prompt: 'Which days should Ada test for "26th to the 28th: 5%"?',
        options: [
          {
            text: 'The 25th, 26th, 28th and 29th: both sides of both edges.',
            outcome: 'The 28th catches the bug: < should be <=.',
            best: true,
          },
          {
            text: 'Just the 27th, right in the middle.',
            outcome: 'It passes. The bug on the 28th ships to pay day.',
          },
          {
            text: 'Every day of the month.',
            outcome: 'Thorough, but 30 tests where 4 would do. Edges are the smart choice.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Find the edge bug',
      caption: 'Change day to 25, 26, 28 and 29. Which one disagrees with the whiteboard?',
      code: 'SHARE = 30000\nday = 28\n\nif day <= 25:\n    fee = 0\nelif day < 28:\n    fee = SHARE * 5 // 100\nelse:\n    fee = SHARE * 10 // 100\n\nprint(f"Day {day}: fee {fee}")\n',
      challenge: 'Fix the bug so day 28 gives 1500.',
    },
  ],
  apply: {
    scenario: 'Testing the fee rules.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Rule: "26th to the 28th: ₦1,500". Which pair of tests checks the end of that rule?',
        options: [
          { text: 'Day 26 and day 27', why: 'That\'s the start, and the middle.' },
          { text: 'Day 28 and day 29' },
          { text: 'Day 1 and day 2', why: 'Far from the edge.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the edge bug so day 28 prints Fee: 1500',
        starter: 'SHARE = 30000\nday = 28\nif day <= 25:\n    fee = 0\nelif day < 28:\n    fee = SHARE * 5 // 100\nelse:\n    fee = SHARE * 10 // 100\nprint(f"Fee: {fee}")\n',
        solution: 'SHARE = 30000\nday = 28\nif day <= 25:\n    fee = 0\nelif day <= 28:\n    fee = SHARE * 5 // 100\nelse:\n    fee = SHARE * 10 // 100\nprint(f"Fee: {fee}")\n',
        hint: '"To the 28th" includes the 28th: <=.',
        checks: [
          { message: 'Print Fee: 1500', outputEquals: 'Fee: 1500' },
          { message: 'Use <= 28', codeIncludes: '<= 28' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Edge test or middle test, for the 26th–28th rule?',
        groups: ['Edge', 'Middle'],
        items: [
          { text: 'Day 25', group: 0 },
          { text: 'Day 27', group: 1 },
          { text: 'Day 28', group: 0 },
          { text: 'Day 29', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Test the fee for day 29 with the fixed rules and print Fee: 3000',
        starter: 'SHARE = 30000\nday = 29\n',
        solution: 'SHARE = 30000\nday = 29\nif day <= 25:\n    fee = 0\nelif day <= 28:\n    fee = SHARE * 5 // 100\nelse:\n    fee = SHARE * 10 // 100\nprint(f"Fee: {fee}")\n',
        hint: 'Same chain, day 29.',
        checks: [{ message: 'Print Fee: 3000', outputEquals: 'Fee: 3000' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the test day to the expected fee.',
        pairs: [
          ['Day 25', '0'],
          ['Day 26', '1500'],
          ['Day 28', '1500 too'],
          ['Day 29', '3000'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s test plan is wrong, according to the whiteboard?',
        lines: ['Day 25, not on leave: fee 0', 'Day 28, not on leave: fee 3000', 'Day 30, on leave: fee 0'],
        bug: 1,
        fix: 'Day 28, not on leave: fee 1500',
        explanation: '"From the 26th to the 28th" includes the 28th. A wrong expected value makes a test useless.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s testing routine.',
        lines: ['List every branch', 'Pick one input for each', 'Add the edges where rules change', 'Write the expected output', 'Run each and compare'],
      },
      {
        kind: 'fillBlank',
        prompt: '"To the 28th" means the 28th is [[1]], so use [[2]] 28.',
        template: '"To the 28th" means the 28th is [[1]], so use [[2]] 28.',
        blanks: [['included', 'in'], ['<=']],
        distractors: ['excluded', '<'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Testing every edge takes ages. Worth it?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Six tests caught a bug that would have overcharged someone on pay day. That\'s cheap.' },
          { text: 'No, just test the middle.', why: 'The middle passed; the edge was wrong.' },
          { text: 'Only for big programs.', why: 'Small programs have edges too.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Where rules change (like the 25th or the 28th) are called edge ___. (one word)',
        answers: ['cases', 'case'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Bugs live at the edges: the last day, the exact amount, the first member. What edge would you test in a rule you follow?',
    starters: ['The edge is...', 'I\'d check...'],
  },
  deepen: {
    title: 'Off-by-one errors',
    summary: '< where you meant <= is so common it has a name: an off-by-one error. Every programmer makes them. Edge tests catch them.',
  },
  notes: 'Boundary value testing: test values at and either side of each boundary (standard software testing practice, e.g. ISTQB Foundation syllabus, boundary value analysis). Off-by-one error: a common term for < vs <= mistakes.',
};

export default lesson;
