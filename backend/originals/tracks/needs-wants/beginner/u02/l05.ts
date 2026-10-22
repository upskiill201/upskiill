import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the bus, day one',
  summary: 'Monday, 7:40 a.m. Ada takes the BRT for the first time in three months, with a design podcast in her ears. It\'s fine. It\'s actually fine. Check what you know: cutting order, the four questions, the big three and need-now.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Cut in the right order', 'Find the need part of a mixed cost'],
  learn: [
    {
      kind: 'story',
      title: 'BRT',
      beats: [
        { speaker: 'ada', text: 'Twenty-five extra minutes. One episode about colour theory. ₦1,000 saved. I\'m weirdly proud.' },
        { speaker: 'narrator', text: 'Lucía, by voice note: "Welcome back to normal life. Normal life is underrated."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the space between.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order what to cut first.',
        lines: ['Things that give nothing', 'Things you barely notice', 'Things you like a bit', 'Protect what you love'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Need now or need later?',
        groups: ['Need now', 'Need later'],
        items: [
          { text: 'Broken phone screen you can\'t read', group: 0 },
          { text: 'Slow but working laptop', group: 1 },
          { text: 'Shoes with a hole', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which saves Ada more: cooking with Ngozi, or giving up chocolate?',
        options: [
          { text: 'Cooking with Ngozi: food is a big-three line' },
          { text: 'Chocolate', why: 'A small joy, a small saving.' },
          { text: 'Same', why: 'About ₦25,000 vs ₦3,000.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The four questions.',
        template: 'How often do I truly [[1]] it? What\'s the basic [[2]]? What happens if I use it? How much [[3]] does the upgrade bring?',
        blanks: [['need'], ['alternative'], ['joy']],
        distractors: ['want', 'price'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s cuts so far: gym and subscriptions ₦20,000, transport ₦20,000, food ₦25,000. Total?',
        answers: ['65000', '65,000', '₦65,000', '₦65000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Can I cut my art class to speed things up?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Yes, cut it.', why: 'Cutting joy first makes the plan feel like punishment.' },
          { text: 'It\'s the one you love most. Protect it. There are other lines to look at first.' },
          { text: 'Take two classes instead.', why: 'Not what\'s needed now.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Late-night rides are a safety need.',
          'Dry-morning rides are a choice.',
          'All rides are wants.',
        ],
        bug: 2,
        fix: 'Some rides are needs (safety); others are choices.',
        explanation: 'Safety is never a want.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: what is need inflation?',
        options: [
          { text: 'Prices rising', why: 'That\'s price inflation.' },
          { text: 'Needing more money', why: 'It\'s about the words and feelings shifting.' },
          { text: 'Wants becoming "needs" as they become normal' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: what happens on the hedonic treadmill?',
        options: [
          { text: 'You get fitter', why: 'It\'s a metaphor.' },
          { text: 'Upgrades become normal; the pleasure fades and the cost stays' },
          { text: 'You always feel happier', why: 'You drift back.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each cost to its basic version.',
        pairs: [
          ['Rides every day', 'Bus on dry mornings'],
          ['Delivery most nights', 'Shared cooking'],
          ['A new laptop now', 'A ₦40,000 fix'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada still needs ₦130,000 more a month. After ₦65,000 of cuts, how much more?',
        answers: ['65000', '65,000', '₦65,000', '₦65000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which of your costs would the four questions shrink the most?',
    starters: ['The cost:...', 'The need part is...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1–4 with Chapter 1 review. Cuts so far: 20,000 + 20,000 + 25,000 = 65,000/month (saving now 85,000).',
};

export default lesson;
