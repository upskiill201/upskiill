import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: back-pay',
  summary: 'An email from HR: "Payroll error fixed for all staff. Missing employer contributions paid in." Bisi sends Miracle a gif of a dancing goat. Check what you know: raising problems, pensions and the order of saving.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain how workplace pensions work', 'Put saving goals in order'],
  learn: [
    {
      kind: 'story',
      title: 'Fixed',
      beats: [
        { speaker: 'bisi', text: 'Twelve of us were missing contributions. You fixed it for everyone.' },
        { speaker: 'miracle', text: 'I just read my statement. Everyone should read theirs.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: pay future you first.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps of saving.',
        lines: ['Free employer money', 'Emergency fund', 'Expensive debt', 'Long-term saving', 'Automate it all'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Employee 8% + employer 10%. Total percentage?',
        answers: ['18', '18%', '18 percent'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'A pension payment is missing. Best first step?',
        options: [
          { text: 'A public complaint', why: 'Calm and private works faster.' },
          { text: 'Ignore it', why: 'It\'s your money.' },
          { text: 'A calm email with the statement attached' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Pensions grow most in the early years', group: 1 },
          { text: 'You never need to check a pension', group: 0 },
          { text: 'A pension alone may not be enough', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'I have a high-interest loan app debt and no emergency fund. Should I invest first?',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'No. A small emergency fund, then clear the expensive debt, then invest. That debt costs more than investing is likely to earn.' },
          { text: 'Yes, invest first.', why: 'Expensive debt usually costs more than investing earns.' },
          { text: 'Ignore the debt.', why: 'It grows.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Emergency fund size.',
        template: 'Three to [[1]] months of [[2]] costs.',
        blanks: [['six', '6'], ['must-have', 'essential']],
        distractors: ['twelve', 'fun'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each pot to its rule.',
        pairs: [
          ['Emergency fund', 'Safe and reachable'],
          ['Pension', 'Check twice a year'],
          ['Expensive debt', 'Clear early'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step is out of order?',
        lines: [
          'Pension running.',
          'All spare money into long-term investments.',
          'Emergency fund: maybe next year.',
        ],
        bug: 2,
        fix: 'Emergency fund before long-term investing.',
        explanation: 'And "next year" is the trap again.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: what\'s net worth?',
        options: [
          { text: 'Salary', why: 'That\'s income.' },
          { text: 'Savings only', why: 'Savings are one asset.' },
          { text: 'Assets minus debts' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: what was Folake\'s "secret"?',
        options: [
          { text: 'A hot tip', why: 'She avoided tips.' },
          { text: 'There\'s no secret: just habits and time' },
          { text: 'Rich parents', why: 'Her father drove a bus.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 1: Miracle\'s net worth on her first sticky note, in naira.',
        answers: ['2250000', '2,250,000', '₦2,250,000', '₦2250000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the next step in the order of saving for you?',
    starters: ['My next step:...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1–4 with Chapter 1 review. Twelve staff affected (fictional).',
};

export default lesson;
