import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Card deck: what wealth really is. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Wealth isn\'t a salary',
  summary: 'Miracle earns ₦900,000 a month. Is she wealthy? Not necessarily. Four cards on the difference between income and wealth, and the one number that measures it.',
  minutes: 10,
  outcomes: [
    'Explain the difference between income and wealth',
    'Define assets, debts and net worth',
    'See why high earners can have low wealth',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Income</strong> is money coming in: salary, freelance pay, business profit. It flows through your hands every month.</p><p><strong>Wealth</strong> is what you keep and own, minus what you owe. It\'s what\'s left when the flow stops.</p><p>Someone can earn a lot and have little wealth (they spend it all). Someone can earn modestly and build real wealth (they keep and grow some of it for years).</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Assets</strong> are things you own that have value: savings, pension, investments, property, a business. (A phone or car counts too, but loses value fast.)</p><p><strong>Debts</strong> (or liabilities) are what you owe: loans, credit, money borrowed from family.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Net worth = assets − debts.</strong> It\'s the single best measure of wealth. It can be negative (more debt than assets), which is common early in life, and it can grow over decades.</p><p>Miracle: savings ₦1,400,000 + pension ₦1,100,000 − staff loan ₦250,000 = <strong>₦2,250,000</strong>.</p>',
    },
    {
      kind: 'check',
      question: 'Someone earns ₦2 million a month but owes more than they own. Are they wealthy?',
      options: ['No: their net worth is negative', 'Yes: they earn a lot', 'Can\'t say'],
      answer: 0,
      explanation: 'High income, negative net worth. Income isn\'t wealth.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Income is the flow; wealth is what you keep. Net worth = assets − debts. Track that number, not just your salary.',
    },
  ],
  apply: {
    scenario: 'Income vs wealth.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Asset or debt?',
        groups: ['Asset', 'Debt'],
        items: [
          { text: 'Savings account', group: 0 },
          { text: 'Staff loan', group: 1 },
          { text: 'Workplace pension', group: 0 },
          { text: 'Money borrowed from a friend', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '₦1,400,000 + ₦1,100,000 − ₦250,000. What\'s Miracle\'s net worth?',
        answers: ['2250000', '2,250,000', '₦2,250,000', '₦2250000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between income and wealth?',
        options: [
          { text: 'They\'re the same', why: 'High earners can have little wealth.' },
          { text: 'Wealth is your salary', why: 'Salary is income.' },
          { text: 'Income flows in; wealth is what you keep and own, minus what you owe' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its meaning.',
        pairs: [
          ['Income', 'Money coming in'],
          ['Asset', 'Something you own with value'],
          ['Debt', 'Something you owe'],
          ['Net worth', 'Assets minus debts'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'I earn ₦900,000 a month, so I\'m doing well, right?',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'Yes, you\'re rich.', why: 'Income isn\'t wealth.' },
          { text: 'You earn well. Whether you\'re building wealth depends on what you keep. What\'s your net worth?' },
          { text: 'No, you\'re poor.', why: 'Her net worth is positive and growing.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The formula.',
        template: 'Net worth = [[1]] − [[2]].',
        blanks: [['assets'], ['debts', 'liabilities']],
        distractors: ['income', 'salary'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Net worth can be negative.',
          'A high salary always means high wealth.',
          'Phones count as assets but lose value fast.',
        ],
        bug: 1,
        fix: 'A high salary helps, but wealth depends on what you keep.',
        explanation: 'Many high earners spend almost everything.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Someone has assets of ₦500,000 and debts of ₦800,000. Net worth?',
        answers: ['-300000', '−300000', '-300,000', '−300,000', '-₦300,000', '−₦300,000'],
        placeholder: 'A number (can be negative)',
      },
      {
        kind: 'mcq',
        prompt: 'Why is net worth a better measure than salary?',
        options: [
          { text: 'It shows what you\'ve actually kept and built' },
          { text: 'It\'s easier to calculate', why: 'It\'s more useful, not easier.' },
          { text: 'Salary doesn\'t matter', why: 'Salary matters; it just isn\'t wealth.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to think about wealth.',
        lines: ['Income comes in', 'You spend some', 'You keep the rest', 'What you keep grows', 'Minus what you owe = net worth'],
      },
    ],
  },
  reflect: {
    prompt: 'Roughly, what do you own and what do you owe? Is your net worth positive or negative right now?',
    starters: ['I own about...', 'I owe about...', 'So my net worth is...'],
  },
  deepen: {
    title: 'The millionaire next door',
    summary: 'Researchers Thomas Stanley and William Danko studied wealthy households in the US and found many had modest incomes and lifestyles: they built wealth by spending less than they earned for many years. Income gets attention; habits build wealth.',
  },
  notes: 'Stanley & Danko (1996), The Millionaire Next Door. Miracle net worth per running numbers. Negative net worth example fictional.',
};

export default lesson;
