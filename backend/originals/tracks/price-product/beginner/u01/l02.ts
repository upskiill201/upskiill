import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Step-by-step: what a price has to cover. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What a price has to cover',
  summary: 'David opens a blank page and writes six headings. Every price, for a bag of laundry or an hour of design work, has to pay for all six. Clinton\'s price was only paying for one.',
  minutes: 11,
  outcomes: [
    'Name the six things a price must cover',
    'Sort costs into the right group',
    'Spot the costs people forget most',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Six things inside every price',
      steps: [
        { title: '1. The main direct cost', body: 'What you pay for each sale. For WashDay: Mama Rose\'s 1,000 FCFA a bag.' },
        { title: '2. Supplies', body: 'Things used up with each sale: the plastic bag and the name tag.' },
        { title: '3. Payment fees', body: 'What it costs to get paid. Mobile Money fees when Clinton takes cash out to pay Mama Rose.' },
        { title: '4. A share of running costs', body: 'Costs that keep the business going whatever you sell: bike repairs, phone data for WhatsApp. Spread them across all the bags.' },
        { title: '5. Your time', body: 'Hours spent collecting, cycling, answering messages. If the price doesn\'t pay for your time, you\'re working for free.' },
        { title: '6. Profit and a buffer', body: 'Something left over: for bad weeks, repairs, and growth. A business with no buffer breaks the first time something goes wrong.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The costs people forget are usually 3, 4 and 5: fees, running costs and their own time.',
    },
  ],
  apply: {
    scenario: 'What\'s inside the price.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which group does this WashDay cost belong to?',
        groups: ['Direct cost', 'Supplies', 'Running costs'],
        items: [
          { text: 'Mama Rose\'s 1,000 FCFA a bag', group: 0 },
          { text: 'Plastic bag and name tag', group: 1 },
          { text: 'Bike chain repair', group: 2 },
          { text: 'Phone data for WhatsApp', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which three costs do people forget most?',
        options: [
          { text: 'The main direct cost', why: 'That one is hard to miss.' },
          { text: 'None; people count everything', why: 'Clinton counted only one of six.' },
          { text: 'Payment fees, running costs and their own time' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the six things a price must cover, as David listed them.',
        lines: ['The main direct cost', 'Supplies', 'Payment fees', 'A share of running costs', 'Your time', 'Profit and a buffer'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the item to the WashDay example.',
        pairs: [
          ['Direct cost', 'Mama Rose\'s washing'],
          ['Payment fees', 'Mobile Money cash-out'],
          ['Your time', 'Hours on the bicycle'],
          ['Buffer', 'Money for a bad week'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'My time is free. I\'m a student. I\'d be on my phone anyway.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'True, students\' time is worthless.', why: 'Time always has a value.' },
          { text: 'Your time could earn money elsewhere or go into your studies. If WashDay doesn\'t pay for it, the business is borrowing from you.' },
          { text: 'Then work more hours.', why: 'More unpaid hours makes it worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Why a buffer?',
        template: 'A business with no [[1]] breaks the first time something goes [[2]].',
        blanks: [['buffer'], ['wrong']],
        distractors: ['logo', 'right'],
      },
      {
        kind: 'mcq',
        prompt: 'Which item did Clinton\'s 1,500 FCFA price really cover when he set it?',
        options: [
          { text: 'Only the main direct cost, Mama Rose\'s washing' },
          { text: 'All six', why: 'He forgot five of them.' },
          { text: 'Only his time', why: 'He didn\'t think about his time at all.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this freelancer\'s pricing is missing a whole group?',
        lines: [
          'Software subscription: 5,000 FCFA a month.',
          'Mobile Money fees: about 2%.',
          'Price: the same as what my software costs, per project.',
          'Internet data: 3,000 FCFA a month.',
        ],
        bug: 2,
        fix: 'Price: costs plus my hours plus a buffer.',
        explanation: 'It covers costs but not their time or any profit.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many things must a price cover, in David\'s list?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Something used up each sale, or a running cost?',
        groups: ['Each sale', 'Running cost'],
        items: [
          { text: 'A name tag on each bag', group: 0 },
          { text: 'Monthly phone data', group: 1 },
          { text: 'A new bike tyre', group: 1 },
          { text: 'The plastic bag for each order', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'List the six things your own price has to cover. Which one have you been ignoring?',
    starters: ['My direct cost is...', 'I\'ve been ignoring...'],
  },
  deepen: {
    title: 'Freelancers too',
    summary: 'The six apply to services and freelance work as well: tools, fees, data, a share of your equipment, your hours and a buffer for months with less work.',
  },
  notes: 'Cost categories are this course\'s teaching device, based on standard cost accounting (direct costs, variable costs, overheads, owner\'s time, profit margin).',
};

export default lesson;
