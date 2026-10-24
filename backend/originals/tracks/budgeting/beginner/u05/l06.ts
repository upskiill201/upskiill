import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Before/After: your budget is a draft. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Your budget is a draft',
  summary: 'Kofi puts his month 2 sheet next to month 3\'s. Half the numbers have changed. Is that failure? It\'s the opposite: a budget that never changes is one nobody is using.',
  minutes: 11,
  outcomes: [
    'Improve a budget using last month\'s results',
    'Decide which lines to grow and which to shrink',
    'Expect three months before a budget fits',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Month 2 sheet vs month 4 plan',
      before: {
        label: 'Month 2 (first budget)',
        text: 'Food out GH₵100 a week (went over twice)\nTransport GH₵15 a week (under every week)\nFun GH₵30 a week\nSchool GH₵100 (GH₵40 unused)\nSurprises GH₵150\nNo sinking funds',
      },
      after: {
        label: 'Month 4 plan (after three months)',
        text: 'Food out GH₵110 a week (fits lab days)\nTransport GH₵10 a week (he walks more than he thought)\nFun GH₵25 a week (a balance he\'s happy with)\nSchool GH₵60 (exams have their own fund)\nSurprises GH₵150 (refilled)\nSinking funds: bus home, exams, phone and laptop',
      },
      notes: [
        'Lines that went over every month grew. Lines that were under every month shrank.',
        'New predictable costs got their own sinking funds instead of surprising him.',
        'Fun found its level: not as high as month 2, not as low as month 3.',
        'Savings stayed at GH₵200 throughout. The changes happened around it.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Month 1 is a guess, month 2 is better, month 3 is close. A budget is a draft you improve with real numbers.',
    },
  ],
  apply: {
    scenario: 'Improving the draft.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Grow the line, shrink it, or keep it?',
        groups: ['Grow', 'Shrink', 'Keep'],
        items: [
          { text: 'Food out: over two months in a row', group: 0 },
          { text: 'Transport: under every week', group: 1 },
          { text: 'Savings: hit every month', group: 2 },
          { text: 'School: GH₵40 unused, exams now separate', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Transport was GH₵15 a week, now GH₵10. How much a month (4 weeks) is freed?',
        answers: ['20', 'GH₵20', '20 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Half of Kofi\'s numbers changed in three months. What does that show?',
        options: [
          { text: 'His first budget failed', why: 'It worked well enough to teach him the real numbers.' },
          { text: 'He\'s using it and improving it with real results' },
          { text: 'Budgets are pointless', why: 'The changes made it fit his life better.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'Your fun went 30, 20, now 25. Can\'t you decide?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Fair, I\'ll set it to zero.', why: 'Zero fun is the plan that breaks.' },
          { text: 'You\'re right, I\'ll stop changing anything.', why: 'Changing based on results is the point.' },
          { text: '30 was more than I needed, 20 felt tight. 25 is where it fits. That\'s what months 2 and 3 were for.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three months.',
        template: 'Month 1 is a [[1]], month 2 is better, month 3 is [[2]].',
        blanks: [['guess'], ['close']],
        distractors: ['failure', 'perfect'],
      },
      {
        kind: 'findBug',
        prompt: 'Which change goes against what the results showed?',
        lines: [
          'Food out up to GH₵110 (it went over).',
          'Transport down to GH₵10 (it was under).',
          'Savings down to GH₵50 to make room for more fun.',
        ],
        bug: 2,
        fix: 'Keep savings at GH₵200; take room for fun from a line that was under.',
        explanation: 'Savings were hit every month. Cutting the line that\'s working hurts future-Kofi for no reason.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the result to the change.',
        pairs: [
          ['Over every month', 'Grow the line'],
          ['Under every month', 'Shrink the line'],
          ['A new predictable cost', 'Add a sinking fund'],
          ['Used the surprises line', 'Refill it'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'If one line grows by GH₵40, what has to happen?',
        options: [
          { text: 'Nothing else changes', why: 'Then the sheet no longer adds up.' },
          { text: 'Other lines shrink by GH₵40 in total, so it still adds up' },
          { text: 'Borrow GH₵40', why: 'Never. Rebalance instead.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the end-of-month draft update.',
        lines: ['Compare each line to what really happened', 'Grow lines that were over', 'Shrink lines that were under', 'Add sinking funds for what\'s coming', 'Check it still adds up'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'School shrinks from GH₵100 to GH₵60. How much is freed for other lines?',
        answers: ['40', 'GH₵40', '40 cedis'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'If you\'ve started a budget, which line would you change first next month, and why?',
    starters: ['I\'d change...', 'Because last month...'],
  },
  deepen: {
    title: 'A monthly review, too',
    summary: 'Weekly checks keep the month on track; a 20-minute review at month end improves next month\'s draft. Compare plan and reality line by line, then write next month\'s sheet before the money arrives.',
  },
  notes: 'Fictional sheet evolution months 2 → 4. Savings constant at 200/month.',
};

export default lesson;
