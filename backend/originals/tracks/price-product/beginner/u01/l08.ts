import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Reading: break-even. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Break-even',
  summary: 'How many bags does WashDay have to wash in a month before it earns anything at all? And how many to pay Clinton what he wants? David splits the costs into two kinds and finds out.',
  minutes: 12,
  outcomes: [
    'Split costs into fixed and variable',
    'Work out contribution per sale',
    'Find the break-even point and a target',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Two kinds of cost',
      html: '<p><strong>Variable costs</strong> come with every bag: Mama Rose 1,000, bag and tag 50, Mobile Money 30. Total <strong>1,080 FCFA a bag</strong>.</p><p><strong>Fixed costs</strong> stay the same whatever happens: bike repairs and phone data, about <strong>3,600 FCFA a month</strong>.</p><p>Each bag sold at 1,500 leaves 1,500 − 1,080 = <strong>420 FCFA</strong> to pay the fixed costs. That\'s the bag\'s <em>contribution</em>.</p><p><strong>Break-even</strong>: fixed costs ÷ contribution = 3,600 ÷ 420 ≈ 8.6. So WashDay needs <strong>9 bags a month</strong> before it earns a single franc for Clinton.</p><p><strong>A target</strong>: Clinton wants WashDay to pay him 30,000 FCFA a month. Add that to the fixed costs: (3,600 + 30,000) ÷ 420 = <strong>80 bags a month</strong>. That\'s 20 every weekend, and Mama Rose can only wash 25 on a Saturday.</p><p>Break-even tells you the minimum. The target tells you whether the price and your capacity can get you where you want to go.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Break-even = fixed costs ÷ (price − variable cost per sale).',
    },
  ],
  apply: {
    scenario: 'Finding break-even.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Fixed or variable cost?',
        groups: ['Fixed', 'Variable'],
        items: [
          { text: 'Mama Rose\'s 1,000 a bag', group: 1 },
          { text: 'Monthly phone data', group: 0 },
          { text: 'Bag and name tag', group: 1 },
          { text: 'Bike repairs each month', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Price 1,500, variable cost 1,080. What is the contribution per bag, in FCFA?',
        answers: ['420'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Fixed costs 3,600 ÷ contribution 420 ≈ 8.6. How many bags a month to break even?',
        options: [
          { text: '9 bags (you can\'t sell part of a bag)' },
          { text: '8 bags', why: '8 × 420 = 3,360, still short of 3,600.' },
          { text: '3,600 bags', why: 'Divide by the contribution per bag.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the term to its meaning.',
        pairs: [
          ['Variable cost', 'Comes with every sale'],
          ['Fixed cost', 'Same whatever you sell'],
          ['Contribution', 'Price − variable cost'],
          ['Break-even', 'Sales needed to cover fixed costs'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'So after 9 bags, I\'m rich?',
        prompt: "David's best reply?",
        options: [
          { text: 'After 9 bags you\'ve covered the fixed costs. Every bag after that earns 420. To earn 30,000, you need 80 bags a month.' },
          { text: 'Yes, rich after 9.', why: 'Break-even means zero profit, not riches.' },
          { text: 'You never break even.', why: 'He breaks even at 9 bags a month.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'To earn 30,000 a month: (3,600 + 30,000) ÷ 420. How many bags a month?',
        answers: ['80'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'The break-even formula.',
        template: 'Break-even = [[1]] costs divided by (price minus [[2]] cost per sale).',
        blanks: [['fixed'], ['variable']],
        distractors: ['total', 'hourly'],
      },
      {
        kind: 'mcq',
        prompt: '80 bags a month is 20 a weekend. Why is that a worry?',
        options: [
          { text: 'It\'s close to Mama Rose\'s limit of 25 bags on a Saturday' },
          { text: 'It\'s too few to matter', why: 'It\'s near the capacity limit.' },
          { text: 'It isn\'t a worry', why: 'There\'s little room for growth or a bad week.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this break-even sum is wrong?',
        lines: [
          'Variable cost per bag: 1,080.',
          'Contribution: 1,500 − 1,080 = 420.',
          'Break-even: 3,600 ÷ 1,500 = 2.4 bags.',
          'Round up to whole bags.',
        ],
        bug: 2,
        fix: 'Break-even: 3,600 ÷ 420 ≈ 8.6, so 9 bags.',
        explanation: 'Divide by the contribution, not the price.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the break-even steps.',
        lines: ['Split costs into fixed and variable', 'Work out contribution per sale', 'Divide fixed costs by contribution', 'Round up to whole sales'],
      },
    ],
  },
  reflect: {
    prompt: 'What are your fixed costs each month, and your contribution per sale? How many sales to break even?',
    starters: ['My fixed costs are...', 'I break even at...'],
  },
  deepen: {
    title: 'Price changes move break-even',
    summary: 'At 1,800 FCFA, contribution jumps to 720 and break-even falls to 5 bags; the 30,000 target needs only about 47 bags. Price changes capacity problems too.',
  },
  notes: 'Fictional: variable 1,080 (1,000 + 50 + 30); fixed 3,600/month; contribution at 1,500 = 420; break-even 3,600/420 ≈ 8.6 → 9 bags; target (3,600 + 30,000)/420 = 80 bags. At 1,800: contribution 720, break-even 5, target ≈ 46.7 → 47.',
};

export default lesson;
