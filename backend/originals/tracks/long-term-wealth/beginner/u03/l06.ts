import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Before/After: compounding for you vs against you. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Compounding for you, or against you',
  summary: 'Compounding works the same on savings and on debt. Emmanuel\'s ₦90,000 loan app balance and Miracle\'s ₦90,000 long-term pot, side by side, a year later.',
  minutes: 11,
  outcomes: [
    'See how compounding grows debt as well as savings',
    'Understand why expensive debt comes first',
    'Make compounding work for you',
  ],
  learn: [
    {
      kind: 'compare',
      title: '₦90,000, two directions, one year',
      before: {
        label: 'Emmanuel\'s loan app, left unpaid',
        text: 'Starts at ₦90,000\nGrows at an example 10% a month in fees and interest\nAfter 6 months: about ₦159,000\nAfter 12 months: about ₦282,000\nMore than tripled. Working against him.',
      },
      after: {
        label: 'Miracle\'s ₦90,000, long-term',
        text: 'Starts at ₦90,000\nGrows at an example 8% a year\nAfter 12 months: about ₦97,200\nAfter 10 years: about ₦194,000\nSlowly doubling. Working for her.',
      },
      notes: [
        'Same starting number, same maths, opposite directions.',
        'High-interest debt compounds much faster than most savings grow. That\'s why it comes first in the order of saving.',
        'Clearing a debt that costs 10% a month is like earning 10% a month, guaranteed. No investment reliably does that.',
        'Once expensive debt is gone, compounding can start working for you instead.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Compounding doesn\'t care which side you\'re on. Clear expensive debt first; then let compounding work for you.',
    },
  ],
  apply: {
    scenario: 'Two directions.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What happened to Emmanuel\'s ₦90,000 debt in a year, left unpaid?',
        options: [
          { text: 'It more than tripled' },
          { text: 'It stayed the same', why: 'Fees and interest compounded.' },
          { text: 'It shrank', why: 'Unpaid debt grows.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '₦90,000 grows 8% in a year. Total? (Answer in naira.)',
        answers: ['97200', '97,200', '₦97,200', '₦97200'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Compounding for you, or against you?',
        groups: ['For you', 'Against you'],
        items: [
          { text: 'Long-term savings left to grow', group: 0 },
          { text: 'Unpaid loan app balance', group: 1 },
          { text: 'Pension contributions over decades', group: 0 },
          { text: 'Credit card balance growing', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Should I save a bit AND pay the loan a bit?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Keep a tiny emergency buffer, then throw everything else at the loan. Paying it off "earns" you its whole interest rate.' },
          { text: 'Split evenly forever.', why: 'The loan grows faster than savings.' },
          { text: 'Ignore the loan.', why: 'It triples in a year.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The insight.',
        template: 'Clearing a debt that costs 10% a month is like [[1]] 10% a month, [[2]].',
        blanks: [['earning'], ['guaranteed']],
        distractors: ['losing', 'maybe'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each amount to the time.',
        pairs: [
          ['Debt after 6 months', 'About ₦159,000'],
          ['Debt after 12 months', 'About ₦282,000'],
          ['Savings after 10 years', 'About ₦194,000'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan lets compounding work against Emmanuel?',
        lines: [
          'Pay the loan app off in two months.',
          'Then start saving automatically.',
          'Make minimum payments for a year while investing.',
        ],
        bug: 2,
        fix: 'Clear the loan first, then invest.',
        explanation: 'The debt compounds far faster than the investments would grow.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does high-interest debt come before investing?',
        options: [
          { text: 'It compounds against you faster than most investments grow' },
          { text: 'Banks require it', why: 'It\'s maths, not rules.' },
          { text: 'It doesn\'t', why: 'It should.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rule of 72: a debt at 10% a month doubles in about how many months? (Round to the nearest month.)',
        answers: ['7', 'seven', '7.2'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Emmanuel\'s path.',
        lines: ['Tiny emergency buffer', 'Clear the loan app', 'Build the fund to three months', 'Let compounding work for him'],
      },
    ],
  },
  reflect: {
    prompt: 'Is compounding working for you or against you right now? What\'s one step to switch sides?',
    starters: ['Right now it\'s working...', 'One step:...'],
  },
  deepen: {
    title: 'Watch out for "minimum payments"',
    summary: 'Paying only the minimum on a debt often barely covers the interest, so the balance shrinks very slowly, or not at all. Paying more than the minimum, on the most expensive debt first, is how people escape.',
  },
  notes: 'Illustrative: 90,000 × 1.1^6 ≈ 159,442; × 1.1^12 ≈ 282,457. 90,000 × 1.08 = 97,200; × 1.08^10 ≈ 194,302. Example rates only.',
};

export default lesson;
