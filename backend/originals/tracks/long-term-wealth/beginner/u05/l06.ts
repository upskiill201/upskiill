import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Before/After: Dad's retirement plan. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'A plan for Dad',
  summary: 'Miracle flies to Buea for a weekend. With Dad at the kitchen table, they turn a scary letter into a plan. Before and after.',
  minutes: 11,
  outcomes: [
    'Turn a retirement shock into a plan',
    'Build a budget around a fixed retirement income',
    'Support a parent without sinking yourself',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Dad\'s retirement: before and after the weekend',
      before: {
        label: 'Friday: the letter',
        text: 'Pension: smaller than he was told; first payment may be late\nSavings: about 400,000 FCFA in a drawer\nNo budget: "I\'ll manage"\nHealth: no cover after he leaves the school\nPlan for Miracle\'s help: "Send whatever, when you can"\nFeeling: ashamed and frightened',
      },
      after: {
        label: 'Sunday: the plan',
        text: 'Budget built around his actual monthly pension\n400,000 FCFA moved to a savings account as his emergency buffer, for a late pension or a bill\nMiracle: a fixed monthly amount from her family pot, on the same day each month\nHealth: they look into the cover options available where he lives and set aside a small health fund\nSmall income: Saturday maths tutoring for exam students, his idea\nFeeling: "For the first time, I know what next year looks like."',
      },
      notes: [
        'They started from his real pension, not the one he was promised.',
        'His savings became a buffer, so a late pension doesn\'t mean borrowing.',
        'Miracle\'s help is fixed and regular, so both of them can plan.',
        'The tutoring was Dad\'s idea. It brings in a little money and a lot of purpose.',
        'Miracle checked her own plan too: her saving didn\'t change.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Build a retirement budget on the real income, keep a buffer for late payments, make family support fixed and regular, and protect your own saving while you help.',
    },
  ],
  apply: {
    scenario: 'The kitchen table in Buea.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why build Dad\'s budget on his actual pension, not the promised one?',
        options: [
          { text: 'The promised one is bigger', why: 'Bigger, but not real.' },
          { text: 'A plan built on money he won\'t get will fail' },
          { text: 'It doesn\'t matter', why: 'The real number is the only one that works.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Friday or Sunday?',
        groups: ['Friday', 'Sunday'],
        items: [
          { text: '"Send whatever, when you can"', group: 0 },
          { text: 'A fixed monthly amount on the same day', group: 1 },
          { text: 'Savings in a drawer', group: 0 },
          { text: 'A buffer for a late pension', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Dad keeps saying he\'s ashamed to need help.',
        prompt: 'What could Miracle say?',
        options: [
          { text: 'You should have saved.', why: 'True, but cruel and unhelpful now.' },
          { text: 'Don\'t worry, I\'ll pay for everything.', why: 'Unsustainable, and takes away his part.' },
          { text: 'You taught for 35 years and paid for my school. This is us planning together, not you failing.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Family support.',
        template: 'Make support [[1]] and [[2]], so both of you can plan.',
        blanks: [['fixed'], ['regular']],
        distractors: ['secret', 'random'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the plan to its job.',
        pairs: [
          ['400,000 FCFA buffer', 'Covers a late pension or a bill'],
          ['Miracle\'s fixed amount', 'Predictable support'],
          ['Saturday tutoring', 'A little income and purpose'],
          ['Small health fund', 'Covers medical costs'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of an alternative plan would sink Miracle?',
        lines: [
          'Dad: budget on his real pension.',
          'Miracle: a fixed amount from her family pot.',
          'Miracle: stop all her own saving to send more.',
        ],
        bug: 2,
        fix: 'Keep her own saving; help from the family pot.',
        explanation: 'If she stops saving, she risks becoming the next parent with nothing at 60.',
      },
      {
        kind: 'mcq',
        prompt: 'Why was it important that tutoring was Dad\'s idea?',
        options: [
          { text: 'Miracle didn\'t care', why: 'She cared about his dignity.' },
          { text: 'He keeps his dignity and purpose, not just income' },
          { text: 'It wasn\'t', why: 'Owning the plan matters to him.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the weekend.',
        lines: ['Read the letter together', 'Write down the real pension', 'Build a budget around it', 'Set up the buffer and support', 'Add the tutoring idea'],
      },
      {
        kind: 'mcq',
        prompt: 'Did Miracle\'s own saving change?',
        options: [
          { text: 'Yes, she stopped saving', why: 'She kept her saving.' },
          { text: 'Yes, she doubled it', why: 'It stayed the same.' },
          { text: 'No: support came from her family pot' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What changed most for Dad?',
        options: [
          { text: 'He knows what next year looks like' },
          { text: 'He became rich', why: 'He has a plan, not riches.' },
          { text: 'Nothing', why: 'He went from fear to a plan.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is there a conversation about money you\'ve been avoiding with someone you love? What would a first step be?',
    starters: ['The conversation is with...', 'A first step would be...'],
  },
  deepen: {
    title: 'Retirement budgets',
    summary: 'In retirement, income is usually fixed while some costs (especially health) tend to rise. A good retirement budget starts from the real income, keeps a buffer, and plans for health costs early.',
  },
  notes: 'Dad: narrated (not a CastId). FCFA for Cameroon. No products or insurers named. Miracle\'s family pot ₦100,000/month (L04).',
};

export default lesson;
