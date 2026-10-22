import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the first number',
  summary: 'Miracle writes her first net worth on a sticky note on her monitor: ₦2,250,000, dated. Check what you know: Dad\'s lesson, income vs wealth, myths and net worth.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain income vs wealth', 'Calculate a net worth'],
  learn: [
    {
      kind: 'story',
      title: 'Sticky note',
      beats: [
        { speaker: 'miracle', text: '₦2,250,000. Dated. Next update: first Sunday of next quarter.' },
        { speaker: 'narrator', text: 'Halima, walking past her desk: "Is that your salary?" Miracle: "Better. It\'s what I\'ve kept."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: time is the secret.',
    items: [
      {
        kind: 'fillBlank',
        prompt: 'The formula.',
        template: 'Net worth = [[1]] − [[2]].',
        blanks: [['assets'], ['debts', 'liabilities']],
        distractors: ['income', 'salary'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Assets ₦900,000, debts ₦300,000. Net worth?',
        answers: ['600000', '600,000', '₦600,000', '₦600000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'You need a big salary to build wealth', group: 0 },
          { text: 'Starting early matters a lot', group: 1 },
          { text: 'It\'s too late after 40', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between income and wealth?',
        options: [
          { text: 'Income flows in; wealth is what you keep and own minus what you owe' },
          { text: 'None', why: 'Big difference.' },
          { text: 'Wealth is only property', why: 'Savings and pensions count too.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Papa, will you do your net worth with me on Sunday?',
        prompt: 'Why is this a good next step for Dad?',
        options: [
          { text: 'To make him feel bad', why: 'It\'s to help.' },
          { text: 'He needs to know where he stands before any plan' },
          { text: 'It\'s pointless at 59', why: 'Later beats never.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each item to asset or debt.',
        pairs: [
          ['Pension pot', 'Asset'],
          ['Staff loan', 'Debt'],
          ['Savings account', 'Asset (savings)'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line repeats Dad\'s mistake?',
        lines: [
          'I know my net worth now.',
          'I\'ll check my pension this week.',
          'I\'ll start long-term saving properly next year.',
        ],
        bug: 2,
        fix: 'I\'ll start this month.',
        explanation: '"Next year" is the trap.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the net worth steps.',
        lines: ['List money', 'List long-term pots', 'List debts', 'Subtract', 'Date it'],
      },
      {
        kind: 'mcq',
        prompt: 'How often will Miracle update her net worth?',
        options: [
          { text: 'Every day', why: 'Too often for a long-term number.' },
          { text: 'Never', why: 'Tracking direction is the point.' },
          { text: 'Every quarter' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Miracle saves ₦120,000 a month. How much in a year?',
        answers: ['1440000', '1,440,000', '₦1,440,000', '₦1440000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Have you written down your net worth yet? Where will you keep it?',
    starters: ['My number:...', 'I\'ll keep it...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1–4. Halima per CAST (Afiya Clinic Success, ML lead).',
};

export default lesson;
