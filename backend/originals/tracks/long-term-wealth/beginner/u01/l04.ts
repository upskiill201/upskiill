import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Step-by-step: calculate your net worth. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Your net worth in 20 minutes',
  summary: 'Miracle has never once added up what she owns and owes. Tonight she does it, step by step, in twenty minutes. Here\'s how.',
  minutes: 11,
  outcomes: [
    'List your assets and debts',
    'Calculate your net worth',
    'Set a date to update it',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Miracle\'s net worth',
      steps: [
        { title: '1. List money you have', body: 'Every account and wallet, at today\'s balance. Miracle: savings ₦1,400,000, current account ₦60,000, mobile wallet ₦15,000.' },
        { title: '2. List long-term pots', body: 'Workplace pension, any investments, any savings group. Miracle logs into her pension account for the first time: ₦1,100,000.' },
        { title: '3. List big things you own, honestly', body: 'Only things you could sell for real money. Laptop: maybe ₦300,000. Don\'t count the sofa. Some people leave these out to keep it simple; Miracle leaves them out.' },
        { title: '4. List every debt', body: 'Loans, credit, money owed to friends or family, buy-now-pay-later. Miracle: staff loan ₦250,000 left.' },
        { title: '5. Subtract', body: 'Money and pots: 1,400,000 + 60,000 + 15,000 + 1,100,000 = ₦2,575,000. Minus debts ₦250,000 = ₦2,325,000. (Her rounded figure, using just savings and pension, is ₦2,250,000.)' },
        { title: '6. Write the date, and set the next one', body: 'Net worth isn\'t a grade; it\'s a starting point. Miracle will update it on the first Sunday of every quarter.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'List money, long-term pots and debts; subtract; write the date. Update it every three months. The direction matters more than the number.',
    },
  ],
  apply: {
    scenario: 'Miracle\'s first net worth.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps.',
        lines: ['List money you have', 'List long-term pots', 'List big things (optional)', 'List every debt', 'Subtract', 'Write the date and set the next one'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Savings ₦1,400,000 + pension ₦1,100,000. Total?',
        answers: ['2500000', '2,500,000', '₦2,500,000', '₦2500000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Include in net worth, or leave out?',
        groups: ['Include', 'Leave out'],
        items: [
          { text: 'Pension balance', group: 0 },
          { text: 'Staff loan (as a debt)', group: 0 },
          { text: 'An old sofa', group: 1 },
          { text: 'Money owed to a friend (as a debt)', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why update net worth every three months, not every day?',
        options: [
          { text: 'It\'s a long-term number; quarterly shows the direction without stress' },
          { text: 'Banks only allow it quarterly', why: 'It\'s your choice.' },
          { text: 'Never update it', why: 'Tracking the direction is the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'My net worth feels small for someone with my salary.',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'It\'s a starting point, not a grade. What matters is which way it moves every quarter from now.' },
          { text: 'It is small. Shame.', why: 'Shame doesn\'t help.' },
          { text: 'Don\'t track it then.', why: 'Tracking is how it grows.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'The [[1]] matters more than the [[2]].',
        blanks: [['direction'], ['number']],
        distractors: ['salary', 'bank'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this net worth list is a mistake?',
        lines: [
          'Savings: ₦400,000.',
          'Loan: ₦150,000 (as a debt).',
          'Next month\'s salary: ₦300,000 (as an asset).',
        ],
        bug: 2,
        fix: 'Leave out money you haven\'t received yet.',
        explanation: 'Net worth counts what you have today, not future income.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each item to where it goes.',
        pairs: [
          ['Pension pot', 'Long-term pots'],
          ['Mobile wallet', 'Money you have'],
          ['Buy-now-pay-later', 'Debts'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Assets ₦2,575,000, debts ₦250,000. Net worth?',
        answers: ['2325000', '2,325,000', '₦2,325,000', '₦2325000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What surprised Miracle most?',
        options: [
          { text: 'She\'d never looked at her pension' },
          { text: 'She had no savings', why: 'She has ₦1.4 million.' },
          { text: 'She had huge debts', why: 'Only a small staff loan.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Do your own net worth tonight, even roughly. What\'s the number, and what date will you update it?',
    starters: ['My net worth today:...', 'Next update:...'],
  },
  deepen: {
    title: 'Negative is a starting point too',
    summary: 'Many people in their twenties have a negative net worth, especially with student loans. That\'s common, not shameful. Watching it move from negative towards zero is just as real progress as watching a positive number grow.',
  },
  notes: 'Miracle\'s full net worth (fictional): 1,400,000 + 60,000 + 15,000 + 1,100,000 − 250,000 = 2,325,000; course uses rounded 2,250,000 (savings + pension − loan) as the headline map figure.',
};

export default lesson;
