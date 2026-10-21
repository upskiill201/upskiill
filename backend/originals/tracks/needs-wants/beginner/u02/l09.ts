import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: Ada's line v2. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ada\'s line v2: the first ₦65,000',
  summary: 'Two weeks in. Ada redraws her line with the first cuts made. Tap through what moved, what stayed, and how far she\'s come.',
  minutes: 11,
  outcomes: [
    'Read an updated need–want line',
    'See the effect of cutting in the right order',
    'Update your own line',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s line v2 (two weeks in)',
      text: 'MUST-HAVE: Food (cooking with Ngozi) ₦70,000. Transport (bus, plus rides at night and in rain) ₦55,000. Utilities and data ₦35,000. Family support ₦40,000. SHOULD-HAVE: Weekend art class ₦15,000, protected. Laptop fix ₦40,000, once. WANT: Phone instalment ₦20,000 (9 months left). CUT: Gym ₦12,000. Extra subscriptions ₦8,000. Daily delivery. SAVING: ₦85,000 a month (was ₦20,000). MEXICO TARGET: ₦150,000 a month. STILL TO FIND: ₦65,000.',
      hotspots: [
        { phrase: 'Food (cooking with Ngozi) ₦70,000', note: 'The Sunday cook-up. Down ₦25,000, and Friday dinner out survived.' },
        { phrase: 'Transport (bus, plus rides at night and in rain) ₦55,000', note: 'The four questions kept the safety rides and cut the sunny-morning ones. Down ₦20,000.' },
        { phrase: 'Weekend art class ₦15,000, protected', note: 'Never on the cut list. The thing she loves most.' },
        { phrase: 'Laptop fix ₦40,000, once', note: 'A later need handled with a cheap fix instead of a ₦900,000 laptop.' },
        { phrase: 'Phone instalment ₦20,000 (9 months left)', note: 'Fixed for now. The end date is in her calendar.' },
        { phrase: 'SAVING: ₦85,000 a month', note: '₦20,000 + 65,000 of cuts. Four times what she was saving two weeks ago.' },
        { phrase: 'STILL TO FIND: ₦65,000', note: 'The easy cuts are done. The rest needs harder questions: what does Ada actually value?' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Redraw your line after every round of changes. Seeing the saving grow is what keeps you going.',
    },
  ],
  apply: {
    scenario: 'Reading line v2.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Saving ₦20,000 + cuts ₦65,000. What\'s Ada saving now?',
        answers: ['85000', '85,000', '₦85,000', '₦85000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Target ₦150,000 a month, saving ₦85,000. How much is still to find?',
        answers: ['65000', '65,000', '₦65,000', '₦65000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Cut, protected, or fixed for now?',
        groups: ['Cut', 'Protected', 'Fixed for now'],
        items: [
          { text: 'Gym', group: 0 },
          { text: 'Art class', group: 1 },
          { text: 'Phone instalment', group: 2 },
          { text: 'Extra subscriptions', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each change to the lesson behind it.',
        pairs: [
          ['Gym and subscriptions cut', 'The first cut'],
          ['Safety rides kept', 'Four questions'],
          ['Cook-up with Ngozi', 'A week of food, two ways'],
          ['Laptop fix, not a new one', 'Need it, or need it now?'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many times more is Ada saving than two weeks ago?',
        options: [
          { text: 'About four times' },
          { text: 'Twice', why: '85,000 ÷ 20,000 ≈ 4.' },
          { text: 'The same', why: 'Up from 20,000 to 85,000.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'The easy cuts are done. Where does the last ₦65,000 come from?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'From knowing what you really value. Next we look at what matters to you, and what you\'re spending on that doesn\'t.' },
          { text: 'Cut the art class.', why: 'Still protected.' },
          { text: 'A loan.', why: 'Never for a trip.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Line v2 in one line.',
        template: 'Cut the [[1]], kept the safety [[2]], protected the art [[3]].',
        blanks: [['gym'], ['rides'], ['class']],
        distractors: ['bus', 'phone'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v2 is wrong?',
        lines: [
          'Food: ₦70,000.',
          'Transport: ₦55,000.',
          'Saving: ₦150,000.',
          'Still to find: ₦65,000.',
        ],
        bug: 2,
        fix: 'Saving: ₦85,000.',
        explanation: 'If she were saving ₦150,000 there\'d be nothing left to find.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'At ₦85,000 a month for 6 months, how much would Ada have?',
        answers: ['510000', '510,000', '₦510,000', '₦510000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s line so far.',
        lines: ['v1: where the raise went', 'v2: the first ₦65,000', 'Next: what Ada really values'],
      },
    ],
  },
  reflect: {
    prompt: 'Redraw your line with one change you\'ve made. How much has it freed?',
    starters: ['I changed...', 'It freed...'],
  },
  deepen: {
    title: 'Momentum',
    summary: 'Ada found ₦65,000 in two weeks with changes she barely feels. That\'s why easy cuts come first: the progress makes the harder decisions in Chapter 3 feel worth facing.',
  },
  notes: 'Ada\'s line v2 per running numbers: saving 85,000; still to find 65,000.',
};

export default lesson;
