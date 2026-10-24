import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Before/After: cheap swaps that aren't miserable. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Cheap swaps that aren\'t miserable',
  summary: 'Efua\'s secret isn\'t starving. It\'s swapping. Same needs, cheaper versions, and a few small joys kept on purpose. Kofi\'s day, before and after.',
  minutes: 11,
  outcomes: [
    'Swap the expensive version of a need for a cheaper one',
    'Keep one small joy so the plan lasts',
    'Work out what a day of swaps saves',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Kofi\'s day, before and after',
      before: {
        label: 'Before (about GH₵65 a day)',
        text: 'Breakfast from the stall: GH₵10\nLunch from the canteen: GH₵25\nKelewele at night: GH₵12\nDrinks: GH₵8\nDaily data bundle: GH₵10',
      },
      after: {
        label: 'After (about GH₵12 a day)',
        text: 'Bread and tea in the room: GH₵3\nRice and stew cooked in the hall with Efua and Yaw: GH₵6\nGari and groundnuts at night: GH₵2\nWater from the hall\'s filter: GH₵0\nCampus Wi-Fi plus a small plan: about GH₵1 a day\nKept: one kelewele on Friday, GH₵12 a week',
      },
      notes: [
        'Every need is still met: breakfast, lunch, dinner, water, data. Only the expensive versions changed.',
        'Cooking together splits the cost of oil, gas and seasoning three ways.',
        'Friday kelewele stays on purpose. A plan with no joy in it doesn\'t survive the week.',
        'From about GH₵65 a day to about GH₵12 is roughly GH₵53 saved every single day.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Swap, don\'t starve. Keep the need, cheapen the version, and protect one small joy.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s swaps.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each expensive version to its swap.',
        pairs: [
          ['Canteen lunch', 'Rice and stew cooked in the hall'],
          ['Daily data bundle', 'Campus Wi-Fi plus a small plan'],
          ['Bought drinks', 'Filtered water from the hall'],
          ['Stall breakfast', 'Bread and tea in the room'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About GH₵65 a day before, about GH₵12 after. How much is saved each day?',
        answers: ['53', 'GH₵53', '53 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does Kofi keep Friday kelewele?',
        options: [
          { text: 'He forgot to cut it', why: 'It\'s kept on purpose.' },
          { text: 'Because a plan with no joy usually gets abandoned' },
          { text: 'Because kelewele is a need', why: 'It\'s a want. A small, chosen one.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A good swap, or just suffering?',
        groups: ['Good swap', 'Just suffering'],
        items: [
          { text: 'Cooking with roommates to share costs', group: 0 },
          { text: 'Skipping dinner every day', group: 1 },
          { text: 'Using campus Wi-Fi for big downloads', group: 0 },
          { text: 'Walking 90 minutes to avoid a GH₵3 ride before an exam', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Cooking in the hall? Chale, that\'s for broke people.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'I AM broke, Yaw. That\'s literally the point.', why: 'Honest, and funny, but he could also invite Yaw in.' },
          { text: 'Fine, I\'ll keep buying lunch then.', why: 'That\'s how food reached GH₵660.' },
          { text: 'It\'s GH₵6 instead of GH₵25, and it tastes better. Join us tonight, you can bring the pepper.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The swap rule.',
        template: '[[1]], don\'t [[2]].',
        blanks: [['Swap'], ['starve']],
        distractors: ['Spend', 'cook'],
      },
      {
        kind: 'findBug',
        prompt: 'Which swap will probably backfire?',
        lines: [
          'Cook rice and stew with Efua and Yaw.',
          'Use the hall\'s filtered water.',
          'Never buy anything nice for 18 days, not even once.',
          'Download lecture videos on campus Wi-Fi.',
        ],
        bug: 2,
        fix: 'Keep one small, planned treat a week.',
        explanation: 'Total denial tends to snap into a spending binge. One planned joy makes the plan last.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lunch saving: GH₵25 down to GH₵6. Over 18 days, how much is saved on lunch alone?',
        answers: ['342', 'GH₵342', '342 cedis'],
        placeholder: 'A number',
        explanation: '25 − 6 = 19 a day. 19 × 18 = 342.',
      },
      {
        kind: 'mcq',
        prompt: 'Which person is using swaps well?',
        options: [
          { text: 'Someone who takes the bus most days and keeps a taxi for late nights' },
          { text: 'Someone who takes a taxi everywhere because it\'s nicer', why: 'No swap at all.' },
          { text: 'Someone who walks home alone late at night to save GH₵5', why: 'Safety is a need. Never swap it away.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to build a swap.',
        lines: ['Name the need', 'Find the cheaper version', 'Check it still meets the need', 'Keep one small joy'],
      },
    ],
  },
  reflect: {
    prompt: 'Name one expensive version of a need in your week. What\'s the swap? And which small joy will you protect?',
    starters: ['I could swap...', 'for...', 'The joy I\'ll keep is...'],
  },
  deepen: {
    title: 'Safety and health are never swapped',
    summary: 'Swaps cheapen the version, never the need itself. Don\'t swap away safe transport at night, medicine, or enough food to study on. If a swap puts your health or safety at risk, it\'s the wrong swap.',
  },
  notes: 'Illustrative Kumasi student prices (fictional, "about"): stall breakfast 10, canteen lunch 25, kelewele 12, drinks 8, daily bundle 10 → 65; after: 3 + 6 + 2 + 0 + ~1 = ~12. Lunch saving 19/day × 18 = 342.',
};

export default lesson;
