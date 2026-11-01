import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Before/After: a week of food, two ways. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'A week of food, two ways',
  summary: 'Ada\'s food week before, and after one Sunday of cooking with Ngozi. Same Ada, same job, same late nights. Side by side.',
  minutes: 11,
  outcomes: [
    'Plan a week of food that saves without feeling like sacrifice',
    'Keep the delivery nights that matter',
    'Use batch cooking and leftovers',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Ada\'s food week',
      before: {
        label: 'Before: delivery by default',
        text: 'Mon–Fri lunch: ordered to the office, ₦3,500 a day\nMon–Thu dinner: delivery, ₦4,000 a night\nFriday: dinner out with friends, ₦8,000\nWeekend: snacks and two more deliveries\nAbout ₦23,500 a week, nearly ₦95,000 a month',
      },
      after: {
        label: 'After: Sunday cook-up with Ngozi',
        text: 'Sunday: jollof, stew, beans and plantain, cooked together, about ₦14,000 shared\nMon–Thu lunch: leftovers in a flask\nMon–Wed dinner: home-cooked\nThursday: delivery after a late deadline (planned), ₦4,000\nFriday: dinner out with friends, kept, ₦8,000\nAbout ₦17,500 a week, about ₦70,000 a month',
      },
      notes: [
        'One shared cooking session covers most of the week. Splitting with Ngozi halves the cost of ingredients and gas.',
        'Friday with friends stayed. It\'s her favourite meal of the week.',
        'The Thursday delivery is planned, not a surprise. Planned treats feel like treats.',
        'About ₦25,000 a month saved, and Ada says the food is better.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'One cook-up, leftovers for lunch, one planned delivery night, and keep the meal with friends. Cut the default, not the joy.',
    },
  ],
  apply: {
    scenario: 'A week of food.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Before: about ₦95,000 a month. After: about ₦70,000. Monthly saving?',
        answers: ['25000', '25,000', '₦25,000', '₦25000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Kept, cut, or new?',
        groups: ['Kept', 'Cut', 'New'],
        items: [
          { text: 'Friday dinner with friends', group: 0 },
          { text: 'Daily lunch delivery', group: 1 },
          { text: 'Sunday cook-up with Ngozi', group: 2 },
          { text: 'Leftovers in a flask', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep one planned delivery night?',
        options: [
          { text: 'Delivery is a need', why: 'It\'s a planned choice.' },
          { text: 'She forgot to cut it', why: 'It\'s deliberate.' },
          { text: 'Late deadlines happen; a planned treat beats an unplanned scramble' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I cut Friday dinner out too? It\'s ₦8,000.',
        prompt: 'Ngozi\'s best reply? (She\'s blunt.)',
        options: [
          { text: 'Don\'t you dare. That\'s the best night of your week. We already saved ₦25,000.' },
          { text: 'Yes, cut it.', why: 'It\'s her favourite joy. Protect it.' },
          { text: 'Order delivery to the restaurant.', why: 'Nonsense, but funny.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Cut the [[1]], not the [[2]].',
        blanks: [['default'], ['joy']],
        distractors: ['food', 'friends'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the new week to its purpose.',
        pairs: [
          ['Sunday cook-up', 'Covers most of the week'],
          ['Leftovers in a flask', 'Replaces lunch delivery'],
          ['Thursday delivery', 'Planned treat for late nights'],
          ['Friday dinner out', 'Joy with friends, protected'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan will probably fail by Wednesday?',
        lines: [
          'Cook on Sunday with Ngozi.',
          'Take leftovers for lunch.',
          'Never order food again, even on deadline nights.',
        ],
        bug: 2,
        fix: 'Plan one delivery night for deadlines.',
        explanation: 'A "never" with no room for late nights breaks the first time a deadline runs late.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lunch delivery ₦3,500 × 5 days. How much a week?',
        answers: ['17500', '17,500', '₦17,500', '₦17500'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does splitting with Ngozi help so much?',
        options: [
          { text: 'Ngozi pays for everything', why: 'They split.' },
          { text: 'It doesn\'t', why: 'Sharing halves the cost.' },
          { text: 'Ingredients and gas cost about half each, and cooking is more fun together' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s new food week.',
        lines: ['Sunday cook-up with Ngozi', 'Leftovers for weekday lunches', 'Home-cooked dinners most nights', 'One planned delivery', 'Friday out with friends'],
      },
    ],
  },
  reflect: {
    prompt: 'Plan your next food week: one cook-up, a lunch plan, one planned treat, and the meal you love most.',
    starters: ['Cook-up:...', 'Lunches:...', 'Treat:...', 'Protected meal:...'],
  },
  deepen: {
    title: 'Batch cooking basics',
    summary: 'Cook two or three dishes that keep well (stews, beans, rice dishes) on one day, store them in portions, and you\'ve made most of a week\'s meals in a couple of hours. Cooking with someone else halves the cost and the work.',
  },
  notes: 'Fictional Lagos food prices (₦): lunch delivery 3,500, dinner delivery 4,000, Friday out 8,000; shared cook-up 14,000 (Ada\'s half 7,000). Monthly ~95,000 → ~70,000.',
};

export default lesson;
