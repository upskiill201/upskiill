import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Card deck: irregular income. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'When income comes and goes',
  summary: 'A hall rapper pays GH₵120 for a beat. Last month: GH₵80. The month before: nothing. How do you budget money you can\'t predict? Plan on the lowest month, and give the extra a job when it lands.',
  minutes: 11,
  outcomes: [
    'Budget when part of your income is irregular',
    'Plan on your lowest month',
    'Use a split rule when extra money arrives',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Irregular income</strong> is money that changes month to month: side-hustle sales, tips, commission, freelance work, gifts. Kofi\'s beat sales: GH₵0, GH₵80, GH₵120.</p><p>The danger: budgeting on your <em>best</em> month. You plan for GH₵120 of beats, earn GH₵0, and the plan is short before it starts.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Rule 1: plan on the lowest month.</strong> Build the budget on income you\'re sure of. For Kofi, that\'s Mum\'s GH₵1,500 and GH₵0 of beats. Anything else is a bonus.</p><p>For someone whose <em>whole</em> income is irregular (a freelancer, a trader), use your lowest month from the last six, or the average of your three lowest.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Rule 2: give extra money a job the day it lands.</strong> Decide a split rule in advance, so you don\'t decide in the moment. Kofi\'s rule:</p><ul><li><strong>50%</strong> to savings or sinking funds</li><li><strong>25%</strong> to whatever line is under pressure</li><li><strong>25%</strong> to enjoy</li></ul><p>GH₵120 from a beat becomes GH₵60 saved, GH₵30 to a stretched line, GH₵30 to enjoy.</p>',
    },
    {
      kind: 'check',
      question: 'Kofi earned GH₵0, GH₵80 and GH₵120 from beats in three months. What should his budget assume?',
      options: ['GH₵0', 'GH₵120', 'GH₵67, the average'],
      answer: 0,
      explanation: 'Plan on the lowest. Any beat money is a bonus with a job waiting for it.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Plan on the lowest month. When extra money arrives, split it by a rule you chose in advance.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s beat money.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Regular or irregular income?',
        groups: ['Regular', 'Irregular'],
        items: [
          { text: 'A monthly allowance of GH₵1,500', group: 0 },
          { text: 'Beat sales', group: 1 },
          { text: 'A fixed monthly salary', group: 0 },
          { text: 'Tips from a weekend job', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the danger of budgeting on your best month?',
        options: [
          { text: 'You\'ll save too much', why: 'The opposite: you plan to spend money that may never arrive.' },
          { text: 'There isn\'t one', why: 'Best months are rare by definition.' },
          { text: 'When a low month comes, the plan is short before it starts' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵120 beat sale, split 50/25/25. How much goes to savings?',
        answers: ['60', 'GH₵60', '60 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'GH₵120 split by Kofi\'s rule. Match each part.',
        pairs: [
          ['50%', 'GH₵60 to savings'],
          ['25% (pressure)', 'GH₵30 to a stretched line'],
          ['25% (enjoy)', 'GH₵30 to enjoy'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'A rapper just paid GH₵120! Let\'s celebrate. Suya for the whole corridor!',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Congratulations! Split rule first: GH₵60 saved, GH₵30 to the stretched line, GH₵30 for suya. Celebrate with that.' },
          { text: 'Save every cedi of it.', why: 'A rule with no enjoyment gets broken. 25% for fun keeps it going.' },
          { text: 'Yes! It\'s bonus money, spend it all.', why: 'Bonus money with no job tends to disappear by Friday.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Rule 1.',
        template: 'Plan on the [[1]] month. Extra money is a [[2]].',
        blanks: [['lowest'], ['bonus']],
        distractors: ['best', 'loan'],
      },
      {
        kind: 'mcq',
        prompt: 'A freelancer earned 2,000, 3,500, 1,200, 2,800, 1,500 and 4,000 over six months. What\'s a safe monthly income to budget on?',
        options: [
          { text: '4,000, the best month', why: 'Most months were far below that.' },
          { text: 'About 1,200 to 1,600: the lowest month, or the average of the three lowest' },
          { text: '2,500, the average of all six', why: 'The average hides the low months that break a plan.' },
        ],
        answer: 1,
        explanation: 'Three lowest: 1,200, 1,500 and 2,000, averaging about 1,570. Budget there, and treat the rest as bonus.',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kofi\'s plan relies on money he might not get?',
        lines: [
          'Income: Mum\'s GH₵1,500.',
          'Beats: GH₵0 planned, bonus if sold.',
          'Fun: GH₵30 a week, plus GH₵100 from next month\'s beats.',
        ],
        bug: 2,
        fix: 'Fun: GH₵30 a week. Beat money split by the rule if it comes.',
        explanation: 'Promising future beat money to fun is budgeting on the best month again.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what to do when extra money lands.',
        lines: ['Money lands', 'Apply the split rule straight away', 'Move each part to its line', 'Enjoy the fun part'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A GH₵80 beat sale, split 50/25/25. How much is for enjoying?',
        answers: ['20', 'GH₵20', '20 cedis'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Is any of your income irregular? What would your own split rule be when extra money arrives?',
    starters: ['My irregular income is...', 'My split rule: ...% save, ...% ..., ...% enjoy'],
  },
  deepen: {
    title: 'A buffer month',
    summary: 'People whose income is fully irregular often aim to build up one month of expenses in reserve. Then each month you live on last month\'s earnings, and the ups and downs stop hurting. It takes time to build; any amount helps.',
  },
  notes: 'Fictional beat income: month 0: 0, month 1: 80 (day 6), month 2: 120 (week 3). Split rule 50/25/25 is a teaching device, not advice. Freelancer example: three lowest 1,200 + 1,500 + 2,000 = 4,700 / 3 ≈ 1,567.',
};

export default lesson;
