import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: the risk map v3. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Arjun\'s risk map v3: pots and dates',
  summary: 'The map changes shape. Instead of a list of ideas, it\'s now a set of pots, each with a date, an amount and the risk that fits. Tap through version 3.',
  minutes: 11,
  outcomes: [
    'Read a map organised by goals and dates',
    'See how each pot\'s risk follows its date',
    'Build your own pots',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Arjun\'s risk map v3',
      text: 'TOTAL: ₹13,50,000. POT 1, APPA\'S OPERATION: ₹2,50,000, two months, savings account. PAID. POT 2, EMERGENCY FUND: ₹3,60,000, six months of costs, any time, savings, reachable in a day. POT 3, HOME DEPOSIT: ₹3,00,000, about five years, mostly protected, getting safer each year. POT 4, LONG TERM: ₹4,40,000, 20 years or more, can take ups and downs. NOT YET INVESTED: still learning how to spread it. MY RISK: tolerance medium, capacity medium (freelance income, now with a full emergency fund). RULE: the date decides the risk.',
      hotspots: [
        { phrase: 'PAID', note: 'The operation went well. Not a rupee of investments was sold.' },
        { phrase: 'six months of costs', note: 'Nearer six than three because his income is uneven.' },
        { phrase: 'getting safer each year', note: 'The glide path from lesson 7.' },
        { phrase: '20 years or more, can take ups and downs', note: 'The only pot that faces bigger market risk.' },
        { phrase: 'NOT YET INVESTED: still learning how to spread it', note: 'He knows which pot can take risk. Next: how to spread that risk. Chapter 4.' },
        { phrase: 'capacity medium', note: 'Uneven income lowered it; the full emergency fund raised it.' },
        { phrase: 'the date decides the risk', note: 'One sentence that replaced four loud opinions.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Organise money by pots with dates. Only the long-term pot faces big ups and downs. Everything needed soon stays safe.',
    },
  ],
  apply: {
    scenario: 'Reading map v3.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Add the pots: ₹2,50,000 + ₹3,60,000 + ₹3,00,000 + ₹4,40,000. Total?',
        answers: ['1350000', '13,50,000', '1,350,000', '₹13,50,000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each pot to its date.',
        pairs: [
          ['Appa\'s operation', 'Two months'],
          ['Emergency fund', 'Any time'],
          ['Home deposit', 'About five years'],
          ['Long term', '20 years or more'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Faces big ups and downs, or kept safe?',
        groups: ['Big ups and downs', 'Kept safe'],
        items: [
          { text: 'Long-term pot', group: 0 },
          { text: 'Emergency fund', group: 1 },
          { text: 'Appa\'s operation', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the long-term pot "not yet invested"?',
        options: [
          { text: 'He forgot', why: 'He\'s waiting until he understands spreading.' },
          { text: 'It\'s for emergencies', why: 'That\'s Pot 2.' },
          { text: 'He knows it can take risk, but hasn\'t learnt how to spread it yet' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'What share of your money can actually take big risks?',
        prompt: 'Arjun\'s best answer?',
        options: [
          { text: 'Only the long-term pot, ₹4.4 lakh, about a third. The rest has dates too close.' },
          { text: 'All of it.', why: 'Most pots have near dates.' },
          { text: 'None of it.', why: 'The long-term pot can.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'The [[1]] decides the [[2]].',
        blanks: [['date'], ['risk']],
        distractors: ['tip', 'return'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v3 is wrong?',
        lines: [
          'Emergency fund: savings, reachable in a day.',
          'Home deposit: getting safer each year.',
          'Appa\'s operation: long-term pot, can take ups and downs.',
        ],
        bug: 2,
        fix: 'Appa\'s operation: savings, two months.',
        explanation: 'Two-month money must stay safe.',
      },
      {
        kind: 'mcq',
        prompt: 'What raised Arjun\'s risk capacity?',
        options: [
          { text: 'His cousin\'s tips', why: 'Tips don\'t raise capacity.' },
          { text: 'Uneven income', why: 'That lowers it.' },
          { text: 'A full emergency fund' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The long-term pot is ₹4,40,000 of ₹13,50,000. Roughly what percent? (Nearest whole number.)',
        answers: ['33', '33%', '32.6', '32.59'],
        placeholder: 'A percent',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s map versions.',
        lines: ['v1: three questions', 'v2: five kinds of risk', 'v3: pots and dates'],
      },
    ],
  },
  reflect: {
    prompt: 'Draw your own pots: name, date, amount and risk for each.',
    starters: ['Pot 1:...', 'Pot 2:...'],
  },
  deepen: {
    title: 'Pots in your banking app',
    summary: 'Many banking apps let you create separate labelled savings pots. Naming them after goals ("Appa\'s operation", "Emergency") makes it much harder to dip into the wrong one.',
  },
  notes: 'Map v3 (fictional): 2.5 + 3.6 + 3 + 4.4 = 13.5 lakh. 4.4/13.5 ≈ 32.6%.',
};

export default lesson;
