import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: Ada's line v4, the hard choices. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ada\'s line v4: the hard choices',
  summary: 'The car said no to, old things sold, a goals list started. Ada\'s line now has a new section: decisions. Tap through it.',
  minutes: 11,
  outcomes: [
    'Read a spending plan with big decisions recorded',
    'See how one-off decisions change the goal',
    'Record your own big decisions',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s line v4',
      text: 'MONTHLY SAVING: ₦135,000 (cheaper data plan with the same speed, minus ₦5,000; last streaming app dropped, minus ₦5,000). ONE-OFFS: old phone and tablet sold, plus ₦90,000. Aso-ebi, minus ₦55,000 (paid). DECISIONS: Car, not now. Goal: own car, ₦4,000,000, in 3 years. Laptop, fixed, next one in 18 months. Third handbag, sold to Ngozi\'s contact. MEXICO FUND BY MONTH 6: about ₦845,000 of ₦900,000. GAP: about ₦55,000.',
      hotspots: [
        { phrase: 'MONTHLY SAVING: ₦135,000', note: 'From ₦20,000 to ₦135,000 in four chapters. The last ₦10,000 came from two small switches.' },
        { phrase: 'old phone and tablet sold, plus ₦90,000', note: '"Would I buy it again?" turned ₦90,000 of drawer clutter into Mexico money.' },
        { phrase: 'Aso-ebi, minus ₦55,000 (paid)', note: 'Family is her top value. Paid the smart way, from this plan, on purpose.' },
        { phrase: 'Car, not now.', note: 'Total cost: about ₦295,000 a month. Opportunity cost: Mexico and her savings. 10/10/10: not now.' },
        { phrase: 'Goal: own car, ₦4,000,000, in 3 years.', note: 'Not never. A number and a date.' },
        { phrase: 'MEXICO FUND BY MONTH 6: about ₦845,000', note: '₦135,000 × 6 = ₦810,000, plus ₦90,000, minus ₦55,000.' },
        { phrase: 'GAP: about ₦55,000', note: 'So close. Chapter 5 brings one more surprise, and one more decision.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Record big decisions next to your spending: what you chose, what you said "not now" to, and the goal you created.',
    },
  ],
  apply: {
    scenario: 'Reading line v4.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₦135,000 × 6 months. How much?',
        answers: ['810000', '810,000', '₦810,000', '₦810000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: '₦810,000 + ₦90,000 − ₦55,000. Mexico fund by month 6?',
        answers: ['845000', '845,000', '₦845,000', '₦845000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Target ₦900,000. What\'s the gap?',
        options: [
          { text: '₦55,000' },
          { text: '₦90,000', why: 'That\'s what she sold. 900,000 − 845,000 = 55,000.' },
          { text: 'Nothing', why: 'She\'s ₦55,000 short.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Monthly change, one-off, or decision?',
        groups: ['Monthly', 'One-off', 'Decision'],
        items: [
          { text: 'Cheaper data plan', group: 0 },
          { text: 'Old phone and tablet sold', group: 1 },
          { text: 'Car: not now', group: 2 },
          { text: 'Aso-ebi paid', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each decision to the tool behind it.',
        pairs: [
          ['Car: not now', 'Total cost and 10/10/10'],
          ['Old phone sold', 'Would I buy it again?'],
          ['Car goal in 3 years', '"Not now" isn\'t never'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: '₦55,000 short. So close. What now?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'You have two months left. A small freelance job, or one more trim, would do it. Don\'t touch your joys now.' },
          { text: 'Borrow it.', why: '₦55,000 is reachable without debt.' },
          { text: 'Give up.', why: 'She\'s 94% there.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Recording decisions.',
        template: 'What you [[1]], what you said "not [[2]]" to, and the goal you created.',
        blanks: [['chose'], ['now']],
        distractors: ['bought', 'ever'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v4 is wrong?',
        lines: [
          'Monthly saving: ₦135,000.',
          'Car: bought.',
          'Gap: about ₦55,000.',
        ],
        bug: 1,
        fix: 'Car: not now; goal in 3 years.',
        explanation: 'She said not now to the car.',
      },
      {
        kind: 'mcq',
        prompt: 'About what percent of the ₦900,000 target does ₦845,000 reach? (Roughly.)',
        options: [
          { text: 'About 94%' },
          { text: 'About 50%', why: 'Much higher.' },
          { text: 'About 110%', why: 'Still slightly short.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s line versions.',
        lines: ['v1: where the raise went', 'v2: the first ₦65,000', 'v3: the values map', 'v4: the hard choices'],
      },
    ],
  },
  reflect: {
    prompt: 'Write down one big decision you\'ve made or are facing: what you chose, what you said "not now" to, and any new goal.',
    starters: ['I chose...', 'Not now:...', 'New goal:...'],
  },
  deepen: {
    title: 'A decisions log',
    summary: 'Some people keep a simple log of big money decisions and why they made them. Months later it shows patterns: which choices you\'re glad about, which you regret, and what to do next time.',
  },
  notes: 'Ada\'s line v4 per running numbers: saving 135,000/month; one-offs +90,000 −55,000; fund by month 6 ≈ 845,000; gap 55,000 (closed in Ch5 by a freelance job).',
};

export default lesson;
