import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: the jar v5, paid in full. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The jar v5: paid in full',
  summary: 'Week 16. Every cedi accounted for, from GH₵490 to the shop counter. Tap through the final jar and see exactly how the GH₵2,130 gap was closed.',
  minutes: 11,
  outcomes: [
    'See how a big gap is closed by many small moves',
    'Read a final savings summary',
    'Write your own end-of-goal summary',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The jar v5 (week 16)',
      text: 'STARTED: GH₵490 (week 0). WEEKLY SAVING: GH₵55 rising to GH₵125 after the leak hunt. LOST TO LEAKS: GH₵90 (weeks 5 and 6). EMERGENCY: malaria, GH₵280, from the fund; fund refilled. BEATS: GH₵450. CHRISTMAS: GH₵200 of GH₵300. OLD LAPTOP PARTS: GH₵250. TOTAL: GH₵2,880. LAPTOP: found at GH₵3,200, haggled to GH₵2,850. PAID IN CASH. LEFT: GH₵30. EMERGENCY FUND: GH₵300, full. LOANS: 0.',
      hotspots: [
        { phrase: 'STARTED: GH₵490', note: 'GH₵790 minus the GH₵300 emergency fund Miracle insisted on.' },
        { phrase: 'GH₵55 rising to GH₵125', note: 'The leak hunt more than doubled his weekly rate without touching his joys.' },
        { phrase: 'LOST TO LEAKS: GH₵90', note: 'Two missed Sundays. The reason everything became automatic.' },
        { phrase: 'EMERGENCY: malaria, GH₵280, from the fund', note: 'The day the emergency fund earned its place. The laptop jar never went backwards.' },
        { phrase: 'BEATS: GH₵450', note: 'Three beats at GH₵150, priced by value and a clear offer, not habit.' },
        { phrase: 'OLD LAPTOP PARTS: GH₵250', note: 'The dead laptop paid for part of its replacement, after he rescued his files.' },
        { phrase: 'haggled to GH₵2,850', note: 'Efua\'s brother found the same spec for GH₵3,200. Yaw did the rest. Lowering the goal\'s cost is saving too.' },
        { phrase: 'LOANS: 0', note: 'The GH₵480-a-month deal would have cost GH₵5,760. Kofi paid GH₵2,850.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A big gap is rarely closed by one big move. It\'s closed by many small ones: leaks, automation, protection, a little extra, and a better price.',
    },
  ],
  apply: {
    scenario: 'Reading the final jar.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Total GH₵2,880, laptop GH₵2,850. How much is left?',
        answers: ['30', 'GH₵30', '30 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The payment plan would have cost GH₵5,760. Kofi paid GH₵2,850. How much did he save by saving?',
        answers: ['2910', '2,910', 'GH₵2,910', 'GH₵2910'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the total to the chapter that found it.',
        pairs: [
          ['GH₵125 a week', 'Ch 2: leak hunt'],
          ['No missed weeks after week 7', 'Ch 3: automatic'],
          ['Laptop jar untouched by malaria', 'Ch 4: emergency fund'],
          ['GH₵450 beats, GH₵200 Christmas', 'Ch 5: earn and split'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How did the laptop end up costing GH₵2,850 instead of GH₵3,500?',
        options: [
          { text: 'Searching for the same spec cheaper, then haggling' },
          { text: 'He bought a worse laptop', why: 'Same spec, better price.' },
          { text: 'A loan', why: 'Zero loans.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Saved money, earned money, or cut the price?',
        groups: ['Saved', 'Earned or received', 'Cut the price'],
        items: [
          { text: 'Leak hunt', group: 0 },
          { text: 'Beats at GH₵150', group: 1 },
          { text: 'Haggling at the shop', group: 2 },
          { text: 'Christmas money', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'You owe me for the haggling. GH₵350 off!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'I do. Suya on me tonight, from the fun line. And I\'ll show you how to do the jar.' },
          { text: 'Take the GH₵30 left.', why: 'Generous, but a planned thank-you from the fun line is better.' },
          { text: 'You did nothing.', why: 'He saved GH₵350. Thank him.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'How big gaps close.',
        template: 'Not one big move, but many [[1]] ones.',
        blanks: [['small']],
        distractors: ['lucky', 'loud'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of the final jar is wrong?',
        lines: [
          'Total: GH₵2,880.',
          'Laptop: GH₵2,850.',
          'Emergency fund: GH₵20.',
          'Loans: 0.',
        ],
        bug: 2,
        fix: 'Emergency fund: GH₵300, full.',
        explanation: 'It was refilled by week 12, and stayed full.',
      },
      {
        kind: 'mcq',
        prompt: 'The GH₵3,200 shop price was lower than GH₵3,500. Why did Kofi plan on GH₵3,500 all along?',
        options: [
          { text: 'Planning on the honest middle price meant a cheaper find was a bonus, not a lifeline' },
          { text: 'He didn\'t know better', why: 'It was a deliberate choice in Chapter 1.' },
          { text: 'To impress Mum', why: 'It was about planning honestly.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the semester.',
        lines: ['Laptop dies', 'Emergency fund first', 'Leak hunt', 'Saving made automatic', 'Malaria', 'Beats and Christmas money', 'Paid in full'],
      },
    ],
  },
  reflect: {
    prompt: 'Write the summary card for your own goal, even if it\'s not finished: start, rate, setbacks, extras, total, loans.',
    starters: ['Started:...', 'Rate:...', 'Setbacks:...', 'Total so far:...'],
  },
  deepen: {
    title: 'Keep the card',
    summary: 'Kofi keeps all five jars in his notes. Next time a goal feels impossible, v1 (a GH₵2,130 gap) next to v5 (paid in full) is the best proof he has that it isn\'t.',
  },
  notes: 'Jar v5 per running numbers (save-money.ts): 1,980 + 450 + 200 + 250 = 2,880; laptop 3,200 → 2,850 (Yaw haggles GH₵350); left 30. 5,760 − 2,850 = 2,910.',
};

export default lesson;
