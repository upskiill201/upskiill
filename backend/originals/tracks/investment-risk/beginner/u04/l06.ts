import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Before/After: Vikram's stock vs a broad spread. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Three years later',
  summary: 'A made-up but realistic three years: ₹4.4 lakh in one hot stock, and ₹4.4 lakh in a broad spread. The one-stock path has the best year. Then it has the worst.',
  minutes: 11,
  outcomes: [
    'Compare a single-stock path with a broad spread',
    'See why the best year can hide the worst risk',
    'Understand why spread-out pots are easier to stay in',
  ],
  learn: [
    {
      kind: 'compare',
      title: '₹4,40,000, three years (example numbers)',
      before: {
        label: 'One hot stock',
        text: 'Year 1: +60% → ₹7,04,000\nYear 2: bad results, −55% → ₹3,16,800\nYear 3: +15% → ₹3,64,320\nAfter three years: about ₹80,000 below the start\nWorst moment: down more than half from the peak',
      },
      after: {
        label: 'Broad spread',
        text: 'Year 1: +12% → ₹4,92,800\nYear 2: market dip, −8% → ₹4,53,376\nYear 3: +10% → ₹4,98,714\nAfter three years: about ₹59,000 above the start\nWorst moment: down 8% in one year',
      },
      notes: [
        'In year 1, the hot stock looks genius. That\'s when the screenshots are sent.',
        'One set of bad results did what a whole bad market couldn\'t do to the spread.',
        'Real single stocks can do far better than this, or go to zero. The spread\'s results are much more predictable.',
        'The spread is also easier to stay in: an 8% dip is bearable; a 55% crash makes people sell at the bottom.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A single stock\'s best year is often when people pile in. A broad spread rarely has the best year, and rarely the worst.',
    },
  ],
  apply: {
    scenario: 'Three years later.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'One stock: ₹4,40,000 grows 60%. Value after year 1?',
        answers: ['704000', '7,04,000', '704,000', '₹7,04,000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Then ₹7,04,000 falls 55%. Value after year 2?',
        answers: ['316800', '3,16,800', '316,800', '₹3,16,800'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When are people most likely to pile into a single stock?',
        options: [
          { text: 'After its best year, when the screenshots go round' },
          { text: 'After its worst year', why: 'People usually chase after rises.' },
          { text: 'Never', why: 'People often chase recent winners.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'One hot stock, or broad spread?',
        groups: ['One hot stock', 'Broad spread'],
        items: [
          { text: '+60% then −55%', group: 0 },
          { text: 'Worst year −8%', group: 1 },
          { text: 'Ends below the start', group: 0 },
          { text: 'Ends above the start', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Vikram\'s stock just reported bad results. It\'s down 40% this week.',
        prompt: 'What does Grace say?',
        options: [
          { text: 'Tell him "I told you so".', why: 'Unkind and unhelpful.' },
          { text: 'That\'s the risk of one basket. Be kind to him. He\'ll be feeling it.' },
          { text: 'Buy his stock now it\'s cheap.', why: 'Chasing in the other direction.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The pattern.',
        template: 'A broad spread rarely has the [[1]] year, and rarely the [[2]].',
        blanks: [['best'], ['worst']],
        distractors: ['first', 'last'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to its value.',
        pairs: [
          ['One stock, year 1', '₹7,04,000'],
          ['One stock, year 2', '₹3,16,800'],
          ['Spread, year 2', '₹4,53,376'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion is wrong?',
        lines: [
          'The single stock had the best single year.',
          'It also had the worst single year.',
          'So single stocks always end lower than spreads.',
        ],
        bug: 2,
        fix: 'Single stocks can end much higher or much lower: far less predictable.',
        explanation: 'The issue is unpredictability, not certain loss.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is a broad spread easier to stay in?',
        options: [
          { text: 'It can\'t fall', why: 'It fell 8% in year 2.' },
          { text: 'It\'s hidden from view', why: 'It\'s about smaller swings.' },
          { text: 'Its falls are usually smaller, so people panic less' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the one-stock story.',
        lines: ['Best year: screenshots everywhere', 'Bad results', 'Price more than halves', 'Partial recovery, still below start'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever bought something after it had already gone up a lot? What happened next?',
    starters: ['I bought...', 'Next...'],
  },
  deepen: {
    title: 'Chasing performance',
    summary: 'Studies of fund investors repeatedly find money flows into whatever did best recently, often just before it cools off. A steady plan beats chasing last year\'s winner for most people.',
  },
  notes: 'Example numbers: 4.4 × 1.6 = 7.04; × 0.45 = 3.168; × 1.15 = 3.6432. Spread: 4.4 × 1.12 = 4.928; × 0.92 = 4.5338; × 1.1 = 4.9871.',
};

export default lesson;
