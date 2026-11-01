import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Myth or Fact: diversification myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Spreading myths',
  summary: '"Diversification means boring, low returns." "Buy what you know." "Rebalancing means selling your winners, which is mad." Five beliefs about spreading risk, tested.',
  minutes: 10,
  outcomes: [
    'Correct common myths about diversification',
    'Understand rebalancing',
    'See the limits of "buy what you know"',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Diversification guarantees you won\'t lose money.',
          isFact: false,
          explain: 'Myth. It reduces the damage from any single failure. Market-wide falls can still hit a spread pot.',
        },
        {
          text: '"Buy what you know" is enough to manage risk.',
          isFact: false,
          explain: 'Myth. Knowing a company or industry doesn\'t protect you from its risks, and often means you\'re concentrated in things tied to your job or city.',
        },
        {
          text: 'Rebalancing can help keep a pot at the risk level you chose.',
          isFact: true,
          explain: 'Fact. If shares rise a lot, they become a bigger share of your pot, and the pot gets riskier than planned. Rebalancing moves it back, for example once a year.',
        },
        {
          text: 'A diversified pot always earns less than a concentrated one.',
          isFact: false,
          explain: 'Myth. Sometimes the concentrated bet wins big; often it does worse. A spread gives a more predictable result, not always a smaller one.',
        },
        {
          text: 'Spreading across time, by investing monthly, reduces the risk of investing everything at a bad moment.',
          isFact: true,
          explain: 'Fact. Regular amounts buy at many prices, so no single day decides your result.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Joel\'s question',
      beats: [
        { speaker: 'joel', text: 'Why would I ever sell the part that went up?' },
        { speaker: 'arjun', text: 'Because otherwise your "steady" pot slowly turns into a risky one without you choosing it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Spreading reduces single failures, not market falls. "Buy what you know" often means concentrated. Rebalance to keep the risk you chose. Invest over time.',
    },
  ],
  apply: {
    scenario: 'Spreading myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Diversification guarantees no losses', group: 0 },
          { text: 'Rebalancing keeps your chosen risk level', group: 1 },
          { text: '"Buy what you know" is enough', group: 0 },
          { text: 'Monthly investing spreads timing risk', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A pot started 60% shares, 40% bonds. Shares rose a lot; now it\'s 75% shares. What happened to its risk?',
        options: [
          { text: 'It became safer', why: 'More shares means more risk.' },
          { text: 'It became riskier than planned' },
          { text: 'Nothing', why: 'The mix changed.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'I work in tech, I know tech, so I\'ll only invest in tech.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Then a tech slump hits your job and your savings at once. Knowing it doesn\'t protect you from it.' },
          { text: 'Perfect plan.', why: 'Double concentration.' },
          { text: 'Never invest in tech.', why: 'Too absolute; just don\'t make it everything.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Rebalancing.',
        template: 'Rebalancing moves your pot back to the [[1]] level you [[2]].',
        blanks: [['risk'], ['chose']],
        distractors: ['tax', 'guessed'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Spread pots never lose"', 'Market falls still happen'],
          ['"Buy what you know"', 'Often means concentration'],
          ['"Spread always earns less"', 'More predictable, not always less'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Joel\'s plan is the myth?',
        lines: [
          'Spread across many companies and some bonds.',
          'Add a set amount monthly.',
          'Never rebalance; let winners run forever.',
        ],
        bug: 2,
        fix: 'Rebalance once a year to the mix I chose.',
        explanation: 'Without rebalancing, the pot drifts into more risk than planned.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A ₹1,00,000 pot is 75% shares. How much is in shares?',
        answers: ['75000', '75,000', '₹75,000', '₹75000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'How often do many people rebalance?',
        options: [
          { text: 'Every hour', why: 'That\'s trading, with costs.' },
          { text: 'About once a year, or when the mix drifts a lot' },
          { text: 'Never', why: 'Then risk drifts.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a yearly rebalance.',
        lines: ['Check the current mix', 'Compare it with the chosen mix', 'Move money back toward the chosen mix', 'Note it on the risk map'],
      },
      {
        kind: 'mcq',
        prompt: 'What does a spread give you instead of a jackpot?',
        options: [
          { text: 'A guaranteed profit', why: 'Nothing is guaranteed.' },
          { text: 'Nothing', why: 'Predictability is valuable.' },
          { text: 'A more predictable result' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which "buy what you know" instinct do you have? Does it concentrate your risk?',
    starters: ['I tend to...', 'That concentrates...'],
  },
  deepen: {
    title: 'Rebalancing in plain words',
    summary: 'Rebalancing quietly makes you sell some of what rose and buy some of what fell. It feels backwards, but it keeps your risk where you chose it, and stops a winning streak from turning your pot into a bet.',
  },
  notes: 'Rebalancing: standard practice; annual or threshold-based. Joel, Kavya per CAST.',
};

export default lesson;
