import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Step-by-step: the risk–return ladder. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The risk ladder',
  summary: 'Arjun draws a ladder on his whiteboard, the way he\'d sketch a system diagram. At the bottom, the safest places for money. At the top, the riskiest. Step by step, what changes as you climb.',
  minutes: 11,
  outcomes: [
    'Explain the link between risk and expected return',
    'Place common kinds of investment on a risk ladder',
    'See why higher possible returns come with bigger possible losses',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Climbing the ladder',
      steps: [
        { title: 'Rung 1: cash in a bank account', body: 'Very unlikely to lose rupees. Usually grows slowly, sometimes slower than prices rise.' },
        { title: 'Rung 2: fixed deposits and government bonds', body: 'You lend for a set time at a set rate. Usually steady. The main risks: inflation, and needing the money early.' },
        { title: 'Rung 3: company bonds', body: 'Lending to companies. Usually pays more than government bonds, because a company is more likely to fail to pay back.' },
        { title: 'Rung 4: a wide spread of shares', body: 'Owning small parts of many businesses. Can grow more over decades. Can also fall a lot in a bad year.' },
        { title: 'Rung 5: single companies, crypto, trading', body: 'The biggest swings. Can rise fast. Can fall fast, or to zero.' },
        { title: 'The pattern', body: 'As you climb, the possible gains get bigger, and so do the possible losses. Higher expected return is the payment for taking more risk. Nothing on the ladder gives high returns with no risk.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Higher possible returns come with bigger possible losses. If someone shows you the top of the ladder\'s returns with the bottom\'s safety, something is wrong.',
    },
  ],
  apply: {
    scenario: 'The whiteboard ladder.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the ladder from lowest risk to highest.',
        lines: ['Cash in a bank account', 'Fixed deposits and government bonds', 'Company bonds', 'A wide spread of shares', 'Single companies, crypto, trading'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do company bonds usually pay more than government bonds?',
        options: [
          { text: 'Companies are kinder', why: 'It\'s payment for extra risk.' },
          { text: 'A company is more likely to fail to pay back, so lenders want more' },
          { text: 'They don\'t', why: 'They usually pay more, for more risk.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Lower rungs or higher rungs?',
        groups: ['Lower rungs', 'Higher rungs'],
        items: [
          { text: 'Fixed deposit', group: 0 },
          { text: 'One small company\'s shares', group: 1 },
          { text: 'Savings account', group: 0 },
          { text: 'Crypto coins', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'So why doesn\'t everyone just climb to the top?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Because the top can fall to zero. You only climb with money you can leave alone for years and afford to see drop.' },
          { text: 'Because they\'re scared.', why: 'It\'s about what the money is for.' },
          { text: 'Everyone should.', why: 'Not for money you need soon.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The pattern.',
        template: 'As you climb, possible [[1]] get bigger, and so do possible [[2]].',
        blanks: [['gains', 'returns'], ['losses']],
        distractors: ['fees', 'taxes'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each rung to its main risk.',
        pairs: [
          ['Cash', 'Inflation'],
          ['Company bonds', 'The company not paying back'],
          ['Shares', 'Big falls in bad years'],
          ['Crypto', 'Huge swings, possibly to zero'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which claim should make Arjun suspicious?',
        lines: [
          'Fixed deposit: steady, modest return.',
          'Shares: higher long-term growth, bigger falls.',
          'Our scheme: share-like returns with fixed-deposit safety.',
        ],
        bug: 2,
        fix: 'Higher returns always come with higher risk.',
        explanation: 'Top-of-ladder returns with bottom-of-ladder safety don\'t exist.',
      },
      {
        kind: 'mcq',
        prompt: 'Is cash in a bank account completely risk-free?',
        options: [
          { text: 'Yes, completely', why: 'Inflation is a risk.' },
          { text: 'No: if prices rise faster than its interest, it loses buying power' },
          { text: 'No, it often goes to zero', why: 'The risk is buying power, not disappearing.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many rungs are on Arjun\'s ladder?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What is the higher expected return on upper rungs a payment for?',
        options: [
          { text: 'Being clever', why: 'It\'s for bearing risk.' },
          { text: 'Nothing; it\'s free', why: 'Nothing on the ladder is free.' },
          { text: 'Accepting more risk of loss' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Where on the ladder is any money you have now? Is that where you meant it to be?',
    starters: ['My money is on rung...', 'I meant it to be...'],
  },
  deepen: {
    title: '"Expected" return',
    summary: '"Expected" doesn\'t mean promised. It means roughly what you might get on average over a long time, across good and bad years. Any single year can be very different.',
  },
  notes: 'Generic asset ladder; no products named. India context: FDs, G-secs stated generally.',
};

export default lesson;
