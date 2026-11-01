import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Step-by-step: what a discount really costs. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What a discount really costs',
  summary: 'Three friends want 20% off. "It\'s only 360 francs," says Clinton. David shows him it\'s more than half his margin, and how many extra bags he\'d need to make up for it.',
  minutes: 12,
  outcomes: [
    'Work out what a discount does to your margin',
    'Calculate how many more sales a discount needs',
    'Decide when a discount is worth it',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Discount maths in four steps',
      steps: [
        { title: '1. Start from the margin, not the price', body: 'Standard bag: price 1,800, cost 1,125, margin 675.' },
        { title: '2. Take the discount off the margin', body: 'A 10% discount is 180 FCFA. The cost doesn\'t change, so the whole 180 comes off the margin: 675 − 180 = 495.' },
        { title: '3. Work out the sales needed to earn the same', body: 'Old margin ÷ new margin = 675 ÷ 495 ≈ 1.36. He\'d need about 36% more bags just to stand still.' },
        { title: '4. Try the friends\' 20%', body: '20% is 360. Margin 675 − 360 = 315. 675 ÷ 315 ≈ 2.14: more than double the bags to earn the same. "Only 360" is 53% of his margin.' },
        { title: 'When a discount is worth it', body: 'When it brings something back: a customer who becomes a regular, a slow day filled, a plan sign-up. Never "just because".' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'A discount comes entirely out of your margin. With thin margins, small discounts need big sales increases.',
    },
  ],
  apply: {
    scenario: 'The discount sums.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'What is 10% of 1,800 FCFA?',
        answers: ['180'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'With a 10% discount, what is the margin on a Standard bag (normally 675)?',
        options: [
          { text: '607 FCFA', why: 'The full 180 comes off the margin, not 10% of it.' },
          { text: '675 FCFA', why: 'The discount comes off.' },
          { text: '495 FCFA' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the discount steps.',
        lines: ['Start from the margin', 'Take the discount off the margin', 'Divide the old margin by the new one', 'Decide if the extra sales are realistic'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is 20% of 1,800 FCFA?',
        answers: ['360'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'With 20% off, the margin falls from 675 to 315. Roughly how many times more bags would earn the same?',
        options: [
          { text: 'About 1.2 times', why: '675 ÷ 315 ≈ 2.14.' },
          { text: 'About 2.1 times' },
          { text: 'The same number', why: 'Each bag earns much less.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'It\'s only 360 francs. Surely that\'s fine for friends?',
        prompt: "David's best reply?",
        options: [
          { text: 'Yes, small discounts don\'t matter.', why: 'It\'s 53% of the margin.' },
          { text: 'Never do anything for friends.', why: 'A plan gives a fair saving that earns.' },
          { text: '360 is more than half your 675 margin. For friends, offer the Saturday Plan: 1,600 a bag, and they commit to four bags.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'A discount worth giving, or not?',
        groups: ['Worth it', 'Not worth it'],
        items: [
          { text: 'Plan price in return for four bags a month', group: 0 },
          { text: '20% off because someone asked nicely', group: 1 },
          { text: 'A cheaper Saver on slow dry-season weeks', group: 0 },
          { text: 'Everyone 10% off "to be nice"', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The warning.',
        template: 'A discount comes entirely out of your [[1]], not your [[2]].',
        blanks: [['margin'], ['costs', 'cost']],
        distractors: ['savings', 'price'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s discount maths is wrong?',
        lines: [
          'Price 1,800, cost 1,125, margin 675.',
          '10% discount: 180 off the price.',
          'New margin: 675 − 10% of 675 = 607.',
          'So I need about 11% more bags.',
        ],
        bug: 2,
        fix: 'New margin: 675 − 180 = 495.',
        explanation: 'The whole discount comes off the margin.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At the old 1,500 price (margin 375), a 10% discount (150) leaves what margin, in FCFA?',
        answers: ['225'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Work out what a 10% discount would do to your own margin. How many more sales would you need to earn the same?',
    starters: ['My margin would fall to...', 'I\'d need...'],
  },
  deepen: {
    title: 'Thin margins, big effects',
    summary: 'The thinner your margin, the more a discount hurts. At 1,500, 10% off needed 67% more bags; at 1,800, 36%. Higher margins give you room for the occasional smart deal.',
  },
  notes: 'Fictional: Standard 1,800, cost 1,125, margin 675; 10% (180) → 495 (needs ≈1.36× bags); 20% (360) → 315 (≈2.14×); at 1,500: 10% (150) → 225 (≈1.67×).',
};

export default lesson;
