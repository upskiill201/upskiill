import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: price card v3, three options and a zone fee. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Price card v3',
  summary: 'The one-line price card becomes a real menu: three tiers, a hill fee, an extra and a monthly plan. Tap each line to see its cost and margin.',
  minutes: 11,
  outcomes: [
    'Read a price card with options',
    'Check the margin behind each line',
    'See what still needs testing',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'WashDay price card v3',
      text: 'Saver: 1,400 FCFA, drop it at the stand, back in 2 days. Standard: 1,800 FCFA, room pickup, back Sunday. Express: 2,500 FCFA, back the same evening. Ironing: +200. Hill hostels: +500, on the 10 a.m. hill run. Saturday Plan: 6,400 FCFA a month for 4 Standard bags. Not yet tested with customers.',
      hotspots: [
        { phrase: 'Saver: 1,400 FCFA', note: 'Margin 275, but only about 10 minutes of Clinton\'s time. For Esther and tight budgets.' },
        { phrase: 'Standard: 1,800 FCFA', note: 'Margin 675. The middle option, likely the most chosen.' },
        { phrase: 'Express: 2,500 FCFA', note: 'Mama Rose\'s priority wash costs 1,300, so the cost is 1,425. Margin 1,075. For the third-years.' },
        { phrase: 'Hill hostels: +500', note: 'Shared rides on one run cost about 400 a bag. Standard hill: 2,300, margin 775. Same fee rain or shine.' },
        { phrase: 'Saturday Plan', note: '1,600 a bag, margin 475, paid on the 1st. One unused bag rolls over.' },
        { phrase: 'Not yet tested with customers', note: 'A designed card, not a proven one. Chapter 4 tests the new prices before switching everyone.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Every line on the card: a real need, a clear price, and a margin you\'ve checked.',
    },
  ],
  apply: {
    scenario: 'Reading price card v3.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the line to its margin.',
        pairs: [
          ['Saver', '275'],
          ['Standard', '675'],
          ['Express', '1,075'],
          ['Plan bag', '475'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is still missing before v3 goes live?',
        options: [
          { text: 'Testing the new prices with real customers' },
          { text: 'More options', why: 'There are enough; they need testing.' },
          { text: 'A logo', why: 'Not the issue.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A hill student wants Express. 2,500 + 500 hill fee. What is the price, in FCFA?',
        answers: ['3000', '3,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'New in v3, or already in v2?',
        groups: ['New in v3', 'In v2'],
        items: [
          { text: 'Express tier', group: 0 },
          { text: 'The 2,400 anchor', group: 1 },
          { text: 'Hill zone fee', group: 0 },
          { text: 'Saturday Plan', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'v3 looks amazing. Let\'s switch everyone tomorrow!',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, switch everyone now.', why: 'Untested changes can lose regulars.' },
          { text: 'It\'s a design, not proof. Test it with one hostel first, and tell your regulars before their price changes. Chapter 4.' },
          { text: 'Never change prices.', why: 'v1 lost money; change is needed, carefully.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Every line on the card.',
        template: 'A real [[1]], a clear [[2]], and a checked margin.',
        blanks: [['need'], ['price']],
        distractors: ['logo', 'discount'],
      },
      {
        kind: 'mcq',
        prompt: 'Hill Express: price 3,000, cost 1,425 + 400 rides. What is the margin?',
        options: [
          { text: '1,575 FCFA', why: 'Remember the 400 in rides.' },
          { text: '1,075 FCFA', why: 'That\'s nearby Express.' },
          { text: '1,175 FCFA' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this draft card has no margin check?',
        lines: [
          'Saver 1,400 (cost 1,125).',
          'Standard 1,800 (cost 1,125).',
          'Express 2,500 (cost 1,425).',
          'Folding service +50 (cost unknown).',
        ],
        bug: 3,
        fix: 'Work out the cost first, or drop it.',
        explanation: 'Every line needs a checked margin.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the card\'s versions.',
        lines: ['v1: one guessed price', 'v2: a value range and an anchor', 'v3: tiers, a zone fee, an extra and a plan', 'v4 (next): tested and launched'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Saturday Plan for a hill student: 6,400 + 4 × 500. What is the monthly price, in FCFA?',
        answers: ['8400', '8,400'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write your price card v3: your tiers, any zone or extra fees, and a plan if it fits. Note the margin next to each.',
    starters: ['My tiers are...', 'Margins:...'],
  },
  deepen: {
    title: 'Menus, not lists',
    summary: 'A good price card reads like a menu: each line says what you get and what it costs. Customers should be able to choose without asking a question.',
  },
  notes: 'Price card v3 (fictional): Saver 1,400 (margin 275), Standard 1,800 (675), Express 2,500 (cost 1,425, margin 1,075), ironing +200 (+100), hill +500 (rides ~400/bag; Standard hill margin 775; hill Express 3,000, margin 1,175), Saturday Plan 6,400 (1,600/bag, margin 475; hill plan 8,400).',
};

export default lesson;
