import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Myth or Fact: needs are fixed. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '"My needs are fixed"',
  summary: 'Ada used to think her needs were what they were: you can\'t change a need. Two weeks of buses and cook-ups say otherwise. Five beliefs about needs, tested.',
  minutes: 10,
  outcomes: [
    'See that most needs have more than one version',
    'Know which needs truly are fixed',
    'Stay flexible without risking safety or health',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Needs are fixed: you can\'t change what they cost.',
          isFact: false,
          explain: 'Myth, mostly. The need is fixed (eat, get to work). The version you choose, and so the cost, isn\'t. Ada cut ₦45,000 from food and transport without losing either.',
        },
        {
          text: 'Some costs really are fixed in the short term.',
          isFact: true,
          explain: 'Fact. Rent this year, a loan repayment, a contract. You change those at renewal time, not this week.',
        },
        {
          text: 'Cutting needs means cutting your health or safety.',
          isFact: false,
          explain: 'Myth. Done properly, you cut the version, never the need. Late-night rides stayed. Medicine stays. Safety and health are never traded away.',
        },
        {
          text: 'What counts as a need can depend on your situation.',
          isFact: true,
          explain: 'Fact. A car is a need in some towns and a want in others. Family support is a need for Ada. Be honest about your life, not a generic list.',
        },
        {
          text: 'If something feels like a need, it is one.',
          isFact: false,
          explain: 'Myth. After three months of rides, the bus felt impossible. It wasn\'t. Feelings follow habits.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The need is fixed; the version isn\'t. Change the version, never the safety or health, and change fixed costs at renewal time.',
    },
  ],
  apply: {
    scenario: 'Are needs fixed?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Needs can\'t change in cost', group: 0 },
          { text: 'Some costs are fixed in the short term', group: 1 },
          { text: 'If it feels like a need, it is one', group: 0 },
          { text: 'Needs depend on your situation', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s fixed, and what isn\'t?',
        options: [
          { text: 'The need is fixed; the version and cost aren\'t' },
          { text: 'Everything is fixed', why: 'Ada changed food and transport.' },
          { text: 'Nothing is a need', why: 'Food and getting to work are needs.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each cost to when it can change.',
        pairs: [
          ['Rent', 'At renewal'],
          ['Daily transport', 'This week'],
          ['Phone instalment', 'When the plan ends'],
          ['Food', 'This Sunday'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'My phone instalment is fixed for 9 more months. So I can\'t save there.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'True for now. Note the end date, and don\'t start another one. When it ends, that ₦20,000 goes straight to savings.' },
          { text: 'Stop paying it.', why: 'Missing payments costs more and hurts her record.' },
          { text: 'Buy another phone.', why: 'That\'s more instalments.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Change the [[1]], never the [[2]] or health.',
        blanks: [['version'], ['safety']],
        distractors: ['need', 'friends'],
      },
      {
        kind: 'findBug',
        prompt: 'Which "saving" crosses the line?',
        lines: [
          'Bus on dry mornings.',
          'Cook on Sundays.',
          'Skip my asthma medicine refill to save ₦6,000.',
        ],
        bug: 2,
        fix: 'Keep medicine; find savings elsewhere.',
        explanation: 'Health is never traded for savings.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s phone instalment ends in 9 months. At ₦20,000 a month, how much will she still pay?',
        answers: ['180000', '180,000', '₦180,000', '₦180000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did the bus feel impossible after three months of rides?',
        options: [
          { text: 'Feelings follow habits; the ride had become normal' },
          { text: 'The bus got worse', why: 'Same bus.' },
          { text: 'She lost her job', why: 'She didn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to handle a "fixed" cost.',
        lines: ['Check if it\'s truly fixed', 'Note when it can change', 'Don\'t add more like it', 'Change it at renewal'],
      },
      {
        kind: 'mcq',
        prompt: 'For Ada, family support to Mum is a need. Why?',
        options: [
          { text: 'It\'s part of her real life and values' },
          { text: 'Everyone must send money home', why: 'Not everyone; it\'s about Ada\'s life.' },
          { text: 'It isn\'t', why: 'For Ada, it is.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of your "fixed" costs could change at the next renewal? When is that?',
    starters: ['Cost:...', 'Renewal:...', 'What I could change:...'],
  },
  deepen: {
    title: 'Renewal reminders',
    summary: 'Put the end or renewal date of every contract (rent, phone plan, insurance, subscriptions) in your calendar a month before. That\'s when "fixed" costs become negotiable, and a short call can save more than months of cutting.',
  },
  notes: 'Phone instalment 12 months, 3 paid → 9 left × 20,000 = 180,000 (fictional).',
};

export default lesson;
