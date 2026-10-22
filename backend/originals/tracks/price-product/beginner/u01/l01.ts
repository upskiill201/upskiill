import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: the 500-franc problem. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The 500-franc problem',
  summary: 'WashDay works: students pay and come back. But Clinton guessed his price, 1,500 FCFA a bag, and after a long, rainy weekend David asks how much he actually earned. The answer is worse than either of them thought.',
  minutes: 11,
  outcomes: [
    'Meet WashDay and its guessed price',
    'See why a busy business can still be broke',
    'Know why pricing is worth getting right',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Busy and broke',
      beats: [
        { speaker: 'narrator', text: 'Buea, rainy season. WashDay picks up hostel students\' laundry on Saturday morning; Mama Rose washes it; Clinton brings it back on Sunday. 1,500 FCFA a bag. Students love it.' },
        { speaker: 'narrator', text: 'This weekend: 20 bags, 12 hours on a borrowed bicycle, and two moto-taxis up the hill when the rain came down sideways.' },
        { speaker: 'clinton', text: 'Mama Rose gets 1,000 a bag, so I keep 500. Twenty bags: 10,000 FCFA! Not bad.' },
        { speaker: 'david', text: 'What about the bags and name tags? The Mobile Money fees? The bike chain you fixed? The moto-taxis?' },
        { speaker: 'clinton', text: '...I didn\'t count those.' },
        { speaker: 'miracle', text: 'Then you don\'t know your price yet, Clinton. You know a number you guessed. This course turns that guess into a price that pays you.' },
        { speaker: 'tey', text: 'Busy isn\'t the same as profitable. Many new businesses discover they\'re working hard for almost nothing because they guessed the price. Let\'s find out what a bag really costs.' },
      ],
      choice: {
        prompt: 'What should Clinton do first?',
        options: [
          { text: 'Add up everything one bag really costs him.', outcome: 'Right. You can\'t set a good price until you know your real cost. That\'s this chapter.', best: true },
          { text: 'Raise the price to 3,000 FCFA straight away.', outcome: 'Maybe the price should rise, but by how much? Without the costs, it\'s another guess.' },
          { text: 'Take more orders to earn more.', outcome: 'If some orders lose money, more of them makes it worse.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Bring something of your own to price: a product, a service, or an hour of your time. Every lesson helps you price it.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s weekend.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Clinton charges 1,500 FCFA a bag and Mama Rose takes 1,000. How much does he keep per bag, before other costs?',
        answers: ['500'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What did Clinton forget when he said "20 bags = 10,000 FCFA for me"?',
        options: [
          { text: 'Nothing; 10,000 is right', why: 'Those costs come out of his 500 a bag.' },
          { text: 'The other costs: bags, tags, Mobile Money fees, repairs, moto-taxis' },
          { text: 'Mama Rose\'s share', why: 'He took that off already.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A cost Clinton counted, or forgot?',
        groups: ['Counted', 'Forgot'],
        items: [
          { text: 'Mama Rose\'s 1,000 FCFA a bag', group: 0 },
          { text: 'Plastic bags and name tags', group: 1 },
          { text: 'Mobile Money fees', group: 1 },
          { text: 'The bike chain repair', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to their part.',
        pairs: [
          ['Clinton', 'Runs WashDay'],
          ['David', 'Builds the cost sheet'],
          ['Mama Rose', 'Washes each bag'],
          ['Miracle', 'Mentors by voice note'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'We\'re so busy! That must mean we\'re doing well.',
        prompt: "David's best reply?",
        options: [
          { text: 'Yes, busy always means profit.', why: 'Busy and broke is common.' },
          { text: 'Busy means you should stop.', why: 'Demand is good news; the price is the question.' },
          { text: 'Busy means people want it. It doesn\'t mean you\'re earning. Let\'s count every cost before we celebrate.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: '20 bags at 1,500 FCFA. How much did customers pay in total?',
        options: [
          { text: '30,000 FCFA' },
          { text: '10,000 FCFA', why: 'That\'s what Clinton thought he kept.' },
          { text: '20,000 FCFA', why: 'That\'s Mama Rose\'s share.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Miracle\'s point.',
        template: 'You don\'t know your [[1]] yet. You know a number you [[2]].',
        blanks: [['price'], ['guessed']],
        distractors: ['customers', 'counted'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Clinton\'s plan makes things worse if some orders lose money?',
        lines: [
          'Count every cost of one bag.',
          'Find which orders lose money.',
          'Take as many orders as possible, whatever they cost.',
          'Set a price that covers everything.',
        ],
        bug: 2,
        fix: 'Fix the loss-making orders before taking more of them.',
        explanation: 'More losing orders means bigger losses.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Clinton thought he earned 10,000 FCFA in 12 hours. How much an hour is that, to the nearest whole franc?',
        answers: ['833'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to fix a guessed price.',
        lines: ['Count every cost of one sale', 'See what you really keep', 'Find out what it\'s worth to customers', 'Set and test a new price'],
      },
    ],
  },
  reflect: {
    prompt: 'What are you pricing in this course? How did you arrive at its price, or what would you guess today?',
    starters: ['I\'m pricing...', 'Right now I\'d charge... because...'],
  },
  deepen: {
    title: 'Why price matters so much',
    summary: 'A classic study of large companies found that a 1% better price raised operating profit by about 11% on average, more than a 1% rise in sales. Small businesses feel the same effect, often even more.',
  },
  notes: 'Marn & Rosiello (1992), "Managing Price, Gaining Profit", Harvard Business Review: 1% price improvement ≈ 11.1% operating-profit rise across a large sample of companies. WashDay numbers are fictional: 20 bags × 1,500 = 30,000 FCFA; Mama Rose 20,000; Clinton "thought" 10,000 for 12 hours (≈833 FCFA/hour).',
};

export default lesson;
