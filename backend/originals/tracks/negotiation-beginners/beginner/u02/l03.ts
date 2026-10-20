import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Before/After: positions vs interests. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Positions vs interests',
  summary: '"₦1,500,000" and "lower" are positions. They can only clash. Underneath are interests: why each of them wants what they want. That\'s where the deal is.',
  minutes: 12,
  outcomes: [
    'Tell a position from an interest',
    'Find the interests behind a demand',
    'Use interests to open new options',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Arguing positions vs exploring interests',
      before: {
        label: 'Positions',
        text: 'Mr Adeyemi: "₦1,500,000."\nAda: "That\'s too much. Lower."\nHe: "Prices are going up everywhere."\nShe: "Not by 25%!"\nTwo numbers, pulling against each other.',
      },
      after: {
        label: 'Interests',
        text: 'His interests: his service charge and repair costs went up; he hates empty months between tenants; he wants rent paid on time.\nAda\'s interests: stay near work, keep a budget she can plan, avoid moving costs.\nNow there are things to work with: a longer lease, on-time payment, small repairs.',
      },
      notes: [
        'A position is what someone says they want. An interest is why they want it.',
        'Positions clash. Interests often fit together.',
        'Ask "why?" and "what worries you?" to find interests.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Positions are what people ask for. Interests are why. Negotiate about interests.',
    },
  ],
  apply: {
    scenario: 'Under the numbers.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Position or interest?',
        groups: ['Position', 'Interest'],
        items: [
          { text: '"₦1,500,000 a year."', group: 0 },
          { text: 'He hates empty months', group: 1 },
          { text: '"Lower, please."', group: 0 },
          { text: 'Ada wants to stay near work', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do positions tend to clash?',
        options: [
          { text: 'Two numbers can only move towards or away from each other' },
          { text: 'People are rude', why: 'It\'s the structure, not manners.' },
          { text: 'They don\'t', why: 'That\'s why interests help.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the interest to a possible option.',
        pairs: [
          ['He hates empty months', 'A two-year lease'],
          ['He wants rent on time', 'Ada pays on the 1st, always'],
          ['Ada wants a plannable budget', 'A fixed rent for two years'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'How do I find his interests? I can\'t read his mind.',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Ask. "What made you decide on the rise?" and "What matters most to you in a tenant?" People usually tell you.' },
          { text: 'Guess and assume.', why: 'Assumptions are often wrong.' },
          { text: 'Ignore them.', why: 'His interests are where the deal is.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The difference.',
        template: 'A position is what someone [[1]]. An interest is [[2]] they want it.',
        blanks: [['wants', 'asks for', 'says'], ['why']],
        distractors: ['when', 'hides'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'From ₦1,200,000 to ₦1,500,000 is a rise of what percent?',
        answers: ['25', '25%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which question best uncovers an interest?',
        options: [
          { text: '"What matters most to you in a tenant?"' },
          { text: '"Will you go lower?"', why: 'That\'s about positions.' },
          { text: '"Why are you so greedy?"', why: 'That starts a fight.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s plan is stuck on positions?',
        lines: [
          'Ask why he chose ₦1,500,000.',
          'Ask what worries him about tenants.',
          'Repeat "lower" until he gives in.',
          'Offer a longer lease if it helps him.',
        ],
        bug: 2,
        fix: 'Explore what he needs, then suggest options.',
        explanation: 'Repeating a position just pulls harder.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Whose interest is it?',
        groups: ['Ada\'s', 'Mr Adeyemi\'s'],
        items: [
          { text: 'Avoid moving costs', group: 0 },
          { text: 'Cover rising repair costs', group: 1 },
          { text: 'Stay near work', group: 0 },
          { text: 'No empty months', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the move from positions to options.',
        lines: ['Hear the position', 'Ask why', 'List both sides\' interests', 'Look for options that fit both'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a disagreement you\'re in. What\'s the other person\'s position, and what might their interests be?',
    starters: ['Their position:...', 'Their interests might be...'],
  },
  deepen: {
    title: 'Interests, not positions',
    summary: 'This is the best-known idea in Getting to Yes. Behind opposed positions there are often shared or compatible interests, and those open up deals that haggling never finds.',
  },
  notes: 'Positions vs interests: Fisher, Ury & Patton, Getting to Yes (1981/2011), ch. 3. Fictional landlord interests: higher service charge and repair costs, avoiding vacancy, on-time payment.',
};

export default lesson;
