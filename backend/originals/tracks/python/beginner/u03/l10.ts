import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: powers, round(), floats, kobo. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: kobo, not crumbs',
  summary: 'The tracker now stores every amount in kobo. Kemi runs her own check against the bank statement and it balances to the last kobo. Quick check before running totals.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use **, round() and kobo maths without notes', 'Explain why floats can be slightly off'],
  learn: [
    {
      kind: 'story',
      title: 'The bank statement',
      beats: [
        { speaker: 'narrator', text: 'Kemi lays the bank statement next to Ada\'s phone. She ticks off each payment. Every kobo matches.' },
        { speaker: 'narrator', text: 'Kemi: "In fifteen years, this is the first ajo I\'ve seen that balances."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: powers, rounding and kobo.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Convert ₦330,000 to kobo and split it 7 ways: print each share and what\'s left, in kobo',
        starter: 'pot_naira = 330000\npeople = 7\n',
        solution: 'pot_naira = 330000\npeople = 7\npot_kobo = pot_naira * 100\nprint(pot_kobo // people)\nprint(pot_kobo % people)\n',
        hint: 'pot_kobo = pot_naira * 100, then // and %.',
        checks: [{ message: 'Print 4714285 then 5', outputEquals: '4714285\n5' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(round(3.5) + round(2.5))',
        explanation: 'Halves go to the even number: round(3.5) is 4 and round(2.5) is 2.',
        language: 'python',
        options: [
          { text: '7', why: 'round(2.5) is 2, not 3.' },
          { text: '6.0', why: 'round() with no places gives ints.' },
          { text: '6' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'True or False?',
        groups: ['True', 'False'],
        items: [
          { text: '0.1 + 0.2 == 0.3', group: 1 },
          { text: '10 + 20 == 30', group: 0 },
          { text: 'round(0.1 + 0.2, 2) == 0.3', group: 0 },
          { text: '2 ** 3 == 6', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the seven-way share in naira, rounded to 2 places',
        starter: 'pot = 330000\npeople = 7\n',
        solution: 'pot = 330000\npeople = 7\nprint(round(pot / people, 2))\n',
        hint: 'round(pot / people, 2)',
        checks: [{ message: 'Print 47142.86', outputEquals: '47142.86' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its result.',
        pairs: [
          ['4 ** 2', '16'],
          ['round(16.66, 1)', '16.7'],
          ['1700 // 100', '17'],
          ['1650 % 100', '50'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line could make the books not balance?',
        language: 'python',
        lines: ['share_kobo = 3000000', 'fee = 0.1 + 0.2', 'pot_kobo = share_kobo * 11'],
        bug: 1,
        fix: 'fee_kobo = 30',
        explanation: 'Floats can be slightly off. Store the fee in whole kobo.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(2 + 3 ** 2)',
        language: 'python',
        options: [
          { text: '11' },
          { text: '25', why: '** goes first: 3 ** 2 = 9.' },
          { text: '10', why: '3 ** 2 is 9, not 8.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print 47142 naira 85 kobo from 4714285 kobo',
        starter: 'each_kobo = 4714285\n',
        solution: 'each_kobo = 4714285\nprint(f"{each_kobo // 100} naira {each_kobo % 100} kobo")\n',
        hint: '// 100 for naira, % 100 for kobo.',
        checks: [{ message: 'Print 47142 naira 85 kobo', outputEquals: '47142 naira 85 kobo' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Naira to kobo.',
        language: 'python',
        template: 'share_kobo = SHARE_NAIRA [[1]] [[2]]',
        blanks: [['*'], ['100']],
        distractors: ['/', '10'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Kemi says the books balance. What made the difference?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Luck.', why: 'It\'s design, not luck.' },
          { text: 'All the maths is in whole kobo, with // and %, so nothing is rounded or lost.' },
          { text: 'Using floats everywhere.', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the kobo recipe.',
        lines: ['Convert naira to kobo', 'Do all the maths in kobo', 'Split with // and %', 'Convert to naira only to show it'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(10 ** 2) show?',
        answers: ['100'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Kemi trusts the tracker because it balances against an independent record. What do you check your own records against?',
    starters: ['I check against...', 'It catches...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 6-9. 33000000 // 7 = 4714285, % 7 = 5; round(330000/7, 2) = 47142.86; round(3.5) + round(2.5) = 4 + 2 = 6; 2 + 3**2 = 11.',
};

export default lesson;
