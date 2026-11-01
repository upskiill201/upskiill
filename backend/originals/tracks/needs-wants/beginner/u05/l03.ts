import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Card deck: a spending plan built from values. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'A plan built from values',
  summary: 'Ada turns everything into one plan for after Mexico: not categories like "food" and "fun", but her values. Four cards on a values-first spending plan.',
  minutes: 10,
  outcomes: [
    'Build a spending plan organised by values',
    'Give each value a monthly amount',
    'Keep must-haves and savings protected',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Start with the base.</strong> Must-haves first: food, transport, utilities, rent savings. Ada: about ₦200,000. These are non-negotiable, at their basic versions.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Then your values, in order.</strong> Each gets a monthly amount:</p><ul><li><strong>Family:</strong> support ₦40,000 + family line ₦20,000.</li><li><strong>Growth:</strong> art class ₦15,000 + online course ₦10,000 + laptop fund ₦50,000.</li><li><strong>Adventure:</strong> next trip fund ₦30,000 + car goal ₦50,000.</li><li><strong>Connection:</strong> Friday dinners ₦32,000.</li><li><strong>Giving:</strong> church ₦20,000.</li></ul>',
    },
    {
      kind: 'text',
      html: '<p><strong>Then security.</strong> Emergency fund ₦13,000 a month until it reaches three months of must-haves.</p><p><strong>Then the rest.</strong> Personal care, clothes, small fun: what\'s left, about ₦0 to spare. If it doesn\'t fit, the values at the bottom of the list shrink first, never the base.</p>',
    },
    {
      kind: 'check',
      question: 'If money is short one month, what shrinks first?',
      options: ['Must-haves', 'Family support', 'The lowest-ranked values and extras'],
      answer: 2,
      explanation: 'The base and top values are protected. Lower ones flex.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Base first, then values in rank order, then security, then the rest. When money is tight, the bottom flexes, never the base.',
    },
  ],
  apply: {
    scenario: 'Ada\'s plan after Mexico.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order a values-first plan.',
        lines: ['Must-haves at basic versions', 'Values in rank order', 'Security: emergency fund', 'Everything else'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Family: support ₦40,000 + family line ₦20,000. Total?',
        answers: ['60000', '60,000', '₦60,000', '₦60000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Growth: art class ₦15,000 + course ₦10,000 + laptop fund ₦50,000. Total?',
        answers: ['75000', '75,000', '₦75,000', '₦75000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its value.',
        pairs: [
          ['Car goal', 'Adventure'],
          ['Laptop fund', 'Growth'],
          ['Family line', 'Family'],
          ['Friday dinners', 'Connection'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Protected, or flexes when money is tight?',
        groups: ['Protected', 'Flexes'],
        items: [
          { text: 'Food and transport at basic versions', group: 0 },
          { text: 'Next-trip fund', group: 1 },
          { text: 'Family support', group: 0 },
          { text: 'Small extras', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why organise by values instead of normal categories?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'No reason; it\'s the same.', why: 'Values tell you what to protect.' },
          { text: 'Because then every naira has a reason you care about. When something has to give, you already know what.' },
          { text: 'Categories are illegal.', why: 'Nonsense; values are just more useful.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'When money is tight.',
        template: 'The [[1]] flexes, never the [[2]].',
        blanks: [['bottom'], ['base']],
        distractors: ['top', 'fun'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the plan\'s order?',
        lines: [
          'Must-haves first.',
          'Values in rank order.',
          'If short, cut food to fund the trip.',
        ],
        bug: 2,
        fix: 'If short, shrink the trip fund.',
        explanation: 'Food is the base. The trip flexes.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Adventure: next trip ₦30,000 + car goal ₦50,000. Total?',
        answers: ['80000', '80,000', '₦80,000', '₦80000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is security (the emergency fund) in the plan?',
        options: [
          { text: 'It protects everything else when something goes wrong' },
          { text: 'It\'s a value she doesn\'t care about', why: 'It protects the values she does care about.' },
          { text: 'It isn\'t needed', why: 'Mum\'s freezer showed why it is.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own values-first plan: base, top values with amounts, security, the rest.',
    starters: ['Base:...', 'Value 1:...', 'Value 2:...', 'Security:...'],
  },
  deepen: {
    title: 'Percentages help too',
    summary: 'Some people set values as percentages of income ("family 12%, growth 15%") so the plan grows with each raise. That\'s the opposite of lifestyle creep: when income rises, your values get more, not your habits.',
  },
  notes: 'Ada post-Mexico plan (fictional, ₦/month, total 480,000): base ~200,000; family 60,000; growth 75,000; adventure 80,000; connection 32,000; giving 20,000; emergency fund 13,000 → 480,000.',
};

export default lesson;
