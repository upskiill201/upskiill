import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Chat with Tey: your time is a cost too. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Your time is a cost too',
  summary: '375 FCFA a bag, 20 bags, 12 hours. Tey helps Clinton work out what WashDay pays him per hour, and compares it with the job at the campus library.',
  minutes: 12,
  outcomes: [
    'Work out what your business pays you per hour',
    'Compare it with what your time could earn elsewhere',
    'Work out the margin you need for a fair hourly rate',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Let\'s price Clinton\'s time. 20 bags at 375 FCFA margin is 7,500 FCFA for the weekend. He worked 12 hours. What\'s that per hour?', replies: ['625 FCFA an hour?'] },
        { tey: 'Right. The campus library pays student assistants about 1,000 FCFA an hour, indoors, no hills, no rain. That\'s Clinton\'s "opportunity cost": what his time could earn instead.', replies: ['So WashDay pays less than the library?'] },
        { tey: 'Right now, yes. To earn 1,000 an hour over 12 hours, he needs 12,000 FCFA from 20 bags: 600 margin a bag, not 375.', replies: ['So the price should be...?'] },
        { tey: 'Cost 1,125 plus 600 is 1,725 FCFA, just to match the library, with no buffer and no profit. That doesn\'t mean customers will pay it. That\'s Chapter 2. But now he knows what "fair to me" looks like.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'If your price doesn\'t pay for your hours, your business is borrowing from you.',
    },
  ],
  apply: {
    scenario: 'What\'s an hour worth?',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '20 bags at 375 FCFA margin. How much margin for the weekend, in FCFA?',
        answers: ['7500', '7,500'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: '7,500 FCFA for 12 hours. How much per hour?',
        options: [
          { text: '833 FCFA', why: 'That uses the 500 he thought he kept.' },
          { text: '1,000 FCFA', why: 'That\'s the library job.' },
          { text: '625 FCFA' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to what it means.',
        pairs: [
          ['625 FCFA', 'What WashDay pays Clinton an hour'],
          ['1,000 FCFA', 'What the library pays an hour'],
          ['600 FCFA', 'Margin per bag to match the library'],
          ['1,725 FCFA', 'Price to match the library'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of Clinton\'s time, or not?',
        groups: ['His time', 'Not his time'],
        items: [
          { text: 'Cycling to pickups', group: 0 },
          { text: 'Answering WhatsApp orders', group: 0 },
          { text: 'Mama Rose washing', group: 1 },
          { text: 'Chasing a late payment', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I\'d earn more at the library. Should I just quit WashDay?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, quit today.', why: 'Demand is strong; the price is what\'s wrong.' },
          { text: 'Not yet: the problem is the price, not the business. Students value it. Find out what it\'s worth to them before you decide.' },
          { text: 'Work more hours to earn more.', why: 'More hours at 625 an hour doesn\'t fix the rate.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Opportunity cost.',
        template: 'What your [[1]] could earn [[2]].',
        blanks: [['time'], ['instead', 'elsewhere']],
        distractors: ['bike', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'To earn 1,000 FCFA an hour for 12 hours from 20 bags, what margin per bag is needed, in FCFA?',
        answers: ['600'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is 1,725 FCFA not automatically the right price?',
        options: [
          { text: 'It\'s too low to ever work', why: 'It might be fine; it hasn\'t been tested.' },
          { text: 'Prices must end in 00', why: 'Rounding is a detail; value is the point.' },
          { text: 'It only covers costs and his time; customers\' view of the value hasn\'t been checked' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s reasoning ignores his time?',
        lines: [
          'Each bag leaves 375 FCFA.',
          'A weekend takes 12 hours.',
          'So the business is profitable, because 375 is more than zero.',
          'The library pays 1,000 an hour.',
        ],
        bug: 2,
        fix: 'At 625 FCFA an hour, it pays less than the library.',
        explanation: '"More than zero" ignores what his hours could earn.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps to price your own time.',
        lines: ['Count your hours', 'Work out what you earn per hour', 'Compare with what your time could earn elsewhere', 'Work out the margin you\'d need'],
      },
    ],
  },
  reflect: {
    prompt: 'How many hours does one sale of yours take? What does your price pay you per hour?',
    starters: ['One sale takes...', 'Per hour I earn...'],
  },
  deepen: {
    title: 'Opportunity cost',
    summary: 'Economists call it opportunity cost: the value of the best thing you gave up. For a student founder, it might be a campus job, or study time before exams.',
  },
  notes: 'Fictional: 20 bags × 375 = 7,500 FCFA for 12 hours = 625 FCFA/hour; campus library assistant ~1,000 FCFA/hour (fictional); 600 margin needed; 1,125 + 600 = 1,725 FCFA.',
};

export default lesson;
