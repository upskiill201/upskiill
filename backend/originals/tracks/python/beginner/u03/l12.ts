import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 12 — Percentages and fees: the 5% late fee, in naira and in kobo. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Percentages and fees',
  summary: 'After three late payments in a row, the group agrees a rule: pay after the 25th and you add 5% of the share. Ada has to teach the tracker what "5% of" means.',
  minutes: 11,
  outcomes: [
    'Work out a percentage of an amount',
    'Add a fee to a total',
    'Keep percentage maths exact in kobo',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: '"5% of" means 5 out of every 100. So 5% of 30000 is 30000 * 5 / 100, which is 1500.0 naira. You can also write 30000 * 0.05.', replies: ['Which is better?'] },
        { tey: 'Both give 1500.0. But 0.05 is a float, with the tiny-error problem from lesson 8. For money, Kemi\'s rule wins: work in kobo with whole numbers.', replies: ['Show me in kobo'] },
        { tey: 'share_kobo = 3000000. late_fee_kobo = share_kobo * 5 // 100, which is 150000 kobo, exactly ₦1,500. Multiply first, then // 100, so nothing is lost.', replies: ['And the total owed?'] },
        { tey: 'owed_kobo = share_kobo + late_fee_kobo: 3150000 kobo, or ₦31,500. Name the rate too: LATE_FEE_PERCENT = 5. If the group changes the rule, it\'s one line.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The late fee',
      caption: 'Change LATE_FEE_PERCENT to 10 and run it again.',
      code: 'SHARE_KOBO = 3000000\nLATE_FEE_PERCENT = 5\n\nlate_fee_kobo = SHARE_KOBO * LATE_FEE_PERCENT // 100\nowed_kobo = SHARE_KOBO + late_fee_kobo\n\nprint(f"Late fee: {late_fee_kobo // 100} naira")\nprint(f"Owed: {owed_kobo // 100} naira")\n',
      challenge: 'What would a 2.5% fee be? (Hint: multiply by 25, then // 1000.)',
    },
  ],
  apply: {
    scenario: 'The 5% late fee.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(30000 * 5 / 100)',
        language: 'python',
        options: [
          { text: '150000.0', why: 'Divide by 100, not 1.' },
          { text: '1500.0' },
          { text: '1500', why: '/ gives a float.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Work out the 5% late fee in kobo and print it',
        starter: 'SHARE_KOBO = 3000000\nLATE_FEE_PERCENT = 5\n',
        solution: 'SHARE_KOBO = 3000000\nLATE_FEE_PERCENT = 5\nprint(SHARE_KOBO * LATE_FEE_PERCENT // 100)\n',
        hint: 'SHARE_KOBO * LATE_FEE_PERCENT // 100',
        checks: [
          { message: 'Print 150000', outputEquals: '150000' },
          { message: 'Use the constant for the rate', codeIncludes: 'LATE_FEE_PERCENT' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the percentage to its amount, on a 30000 share.',
        pairs: [
          ['10%', '3000'],
          ['5%', '1500'],
          ['50%', '15000'],
          ['1%', '300'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print what a late payer owes in naira: the share plus the 5% fee',
        starter: 'SHARE_KOBO = 3000000\nLATE_FEE_PERCENT = 5\n',
        solution: 'SHARE_KOBO = 3000000\nLATE_FEE_PERCENT = 5\nowed_kobo = SHARE_KOBO + SHARE_KOBO * LATE_FEE_PERCENT // 100\nprint(owed_kobo // 100)\n',
        hint: 'Share plus fee, in kobo, then // 100 for naira.',
        checks: [{ message: 'Print 31500', outputEquals: '31500' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gives the wrong 5% fee?',
        language: 'python',
        lines: ['share = 30000', 'fee = share * 5 // 100', 'fee = share * 5 / 10'],
        bug: 2,
        fix: 'fee = share * 5 / 100',
        explanation: 'Per cent means per hundred: divide by 100, not 10.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Exact in whole kobo, or a float?',
        groups: ['Whole kobo (int)', 'Float'],
        items: [
          { text: '3000000 * 5 // 100', group: 0 },
          { text: '30000 * 0.05', group: 1 },
          { text: '3000000 * 25 // 1000', group: 0 },
          { text: '30000 * 5 / 100', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A percentage in whole kobo.',
        language: 'python',
        template: 'fee_kobo = SHARE_KOBO * LATE_FEE_PERCENT [[1]] 100',
        blanks: [['//']],
        distractors: ['/', '%'],
      },
      {
        kind: 'mcq',
        prompt: 'Why multiply before // 100, not after?',
        options: [
          { text: 'Dividing first could throw away kobo before you multiply' },
          { text: 'Python requires it', why: 'Both run. One loses precision.' },
          { text: 'It doesn\'t matter', why: 'With //, the order can change the answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why make LATE_FEE_PERCENT a constant instead of typing 5?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Because 5 is unlucky.', why: 'It\'s about readability and change.' },
          { text: 'So the rule is named, and when the group changes it, I change one line.' },
          { text: 'Python needs constants for percentages.', why: 'It doesn\'t. People do.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is 10% of 30000? (a whole number)',
        answers: ['3000', '3000.0', '3,000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Percentages hide in prices, fees and discounts. Which one do you most want to check next time you pay?',
    starters: ['Next time I pay...', 'I\'ll work out...'],
  },
  deepen: {
    title: 'Percentage change',
    summary: 'A rise from 25000 to 30000 is (30000 - 25000) / 25000 * 100 = 20%. Try it in the Try it card.',
  },
  notes: '5% of 30000 = 1500; in kobo 3000000 * 5 // 100 = 150000; owed 3150000 kobo = 31500 naira. 2.5%: 3000000 * 25 // 1000 = 75000. (30000 - 25000) / 25000 * 100 = 20.0. Late-fee rule is a story decision by the ajo group.',
};

export default lesson;
