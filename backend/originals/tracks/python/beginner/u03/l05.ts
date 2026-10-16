import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: int/float, maths with variables, order, // and %. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the holiday month',
  summary: 'Seven members, 47142 each and 6 naira over. The group votes to put the 6 in the next pot. The tracker\'s maths now matches the notebook. Quick check before powers and rounding.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use + - * / // % with variables', 'Predict int vs float and the order of a sum'],
  learn: [
    {
      kind: 'story',
      title: 'The holiday payout',
      beats: [
        { speaker: 'narrator', text: 'Ada reads out the tracker: "Seven people. 47142 each. 6 left over." Kemi checks it on paper: 47142 times 7 is 329994, plus 6.' },
        { speaker: 'narrator', text: 'The group votes: the 6 goes into next month\'s pot.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: money maths basics.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Split 330000 between 7: print the whole share, then the remainder',
        starter: 'pot = 330000\npeople = 7\n',
        solution: 'pot = 330000\npeople = 7\nprint(pot // people)\nprint(pot % people)\n',
        hint: '// for the share, % for the remainder.',
        checks: [{ message: 'Print 47142 then 6', outputEquals: '47142\n6' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(5 + 10 / 5)',
        language: 'python',
        options: [
          { text: '7.0' },
          { text: '3.0', why: '/ goes first: 10 / 5 = 2.0, then + 5.' },
          { text: '7', why: '/ makes the answer a float.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'int or float?',
        groups: ['int', 'float'],
        items: [
          { text: '330000 // 7', group: 0 },
          { text: '330000 / 11', group: 1 },
          { text: '330000 % 7', group: 0 },
          { text: '30000 * 1.5', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gives the wrong share after the fee?',
        language: 'python',
        lines: ['pot = 330000', 'fee = 55', 'print(pot - fee / 11)'],
        bug: 2,
        fix: 'print((pot - fee) / 11)',
        explanation: 'Only the fee gets divided without brackets.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the payout: pot minus BANK_FEE',
        starter: 'members = 11\nSHARE = 30000\nBANK_FEE = 50\n',
        solution: 'members = 11\nSHARE = 30000\nBANK_FEE = 50\nprint(members * SHARE - BANK_FEE)\n',
        hint: 'members * SHARE - BANK_FEE',
        checks: [{ message: 'Print 329950', outputEquals: '329950' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the operator to its job.',
        pairs: [
          ['/', 'Divide, gives a float'],
          ['//', 'Divide, drop the decimals'],
          ['%', 'The remainder'],
          ['*', 'Multiply'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(47142 * 7 + 6)',
        language: 'python',
        options: [
          { text: '329994', why: 'That\'s before adding the 6.' },
          { text: '330000' },
          { text: '330042', why: '* goes first: 329994 + 6.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The golden check for // and %.',
        language: 'python',
        template: '(pot // people) [[1]] people [[2]] pot % people == pot',
        blanks: [['*'], ['+']],
        distractors: ['-', '/'],
      },
      {
        kind: 'writeCode',
        prompt: 'Kemi pays half her share: print it as a whole number with //',
        starter: 'SHARE = 30000\n',
        solution: 'SHARE = 30000\nprint(SHARE // 2)\n',
        hint: 'SHARE // 2 gives an int.',
        checks: [
          { message: 'Print 15000', outputEquals: '15000' },
          { message: 'Use //', codeIncludes: '//' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: '330000 / 7 or 330000 // 7 for the payout?',
        prompt: "Ada's best answer?",
        options: [
          { text: '/, it\'s more accurate.', why: 'More decimals, but nobody can be paid them.' },
          { text: 'Either, they\'re the same.', why: '47142.857... vs 47142.' },
          { text: '//, with % for what\'s left over. You can\'t pay someone 0.857 of a naira.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the payout program.',
        language: 'python',
        lines: ['pot = 330000', 'people = 7', 'each = pot // people', 'left = pot % people', 'print(each, left)'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(25 // 4) show?',
        answers: ['6'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Kemi checked the tracker on paper, and it matched. Why is a second, independent check worth it?',
    starters: ['A second check...', 'It caught...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4. 330000 // 7 = 47142, % = 6; 47142 * 7 = 329994; 5 + 10 / 5 = 7.0; 11 * 30000 - 50 = 329950; 25 // 4 = 6.',
};

export default lesson;
