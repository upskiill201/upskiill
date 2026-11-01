import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Myth or Fact: pricing myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Pricing myths',
  summary: 'Clinton\'s friends all have pricing advice: "Be the cheapest!" "Just add a bit to your costs." "Students can\'t pay more." David puts each one to the test. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Spot common pricing myths',
    'See how small price changes move profit',
    'Know why cost-plus pricing isn\'t enough',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The cheapest business always wins.',
          isFact: false,
          explain: 'Myth. Hand-washing is free, and students still pay WashDay. People pay for what they value: time, ease, trust. Cheapest often means busiest and broke.',
        },
        {
          text: 'A small price rise can change profit a lot.',
          isFact: true,
          explain: 'Fact. Raise 1,500 to 1,600 and the margin goes from 375 to 475: 27% more per bag, from a price rise of under 7%.',
        },
        {
          text: 'The right price is your cost plus a little bit.',
          isFact: false,
          explain: 'Myth. Cost sets the floor, the lowest you can go. It says nothing about what the service is worth to customers, which may be much more.',
        },
        {
          text: 'Many new businesses and freelancers charge too little.',
          isFact: true,
          explain: 'Fact. Fear of losing customers pushes new sellers to underprice. Underpricing is hard to fix later and can make customers doubt the quality.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Cost is the floor, not the price. The price comes from the value (Chapter 2).',
    },
  ],
  apply: {
    scenario: 'Testing the advice.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'At 1,600 FCFA with a 1,125 cost, what is the margin per bag?',
        answers: ['475'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Margin rises from 375 to 475. By about what percent?',
        options: [
          { text: 'About 27%' },
          { text: 'About 7%', why: 'That\'s the price rise; the margin rises much more.' },
          { text: '100%', why: '100 more on 375 is about 27%.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'The cheapest always wins', group: 0 },
          { text: 'Cost is the lowest you can go', group: 1 },
          { text: 'Price = cost plus a little', group: 0 },
          { text: 'New sellers often underprice', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'If I\'m the cheapest in Buea, everyone will use me!',
        prompt: "David's best reply?",
        options: [
          { text: 'Yes, be the cheapest.', why: 'That\'s how he got busy and broke.' },
          { text: 'Be the most expensive instead.', why: 'Price should follow value, not a slogan.' },
          { text: 'The bucket is free and you still beat it. Students pay for their Saturday, not for the cheapest option.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the price idea to what it really is.',
        pairs: [
          ['Your cost', 'The floor'],
          ['The value to customers', 'Where the price should come from'],
          ['Being cheapest', 'Often busy and broke'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The price goes from 1,500 to 1,600. By roughly what percent is that?',
        options: [
          { text: 'About 27%', why: 'That\'s the margin rise.' },
          { text: 'About 7%' },
          { text: '100%', why: '100 more on 1,500 is under 7%.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Floor and price.',
        template: 'Cost is the [[1]], not the [[2]].',
        blanks: [['floor'], ['price']],
        distractors: ['ceiling', 'profit'],
      },
      {
        kind: 'findBug',
        prompt: 'Which piece of advice in the group chat is a myth?',
        lines: [
          'Know your full cost per bag first.',
          'Check what it\'s worth to customers.',
          'Always be the cheapest in town.',
          'Test any new price before changing everything.',
        ],
        bug: 2,
        fix: 'Price from value, with cost as the floor.',
        explanation: 'Cheapest isn\'t a strategy; WashDay already beats free.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the lowest price WashDay can charge without losing money on an ordinary bag, in FCFA?',
        answers: ['1125', '1,125'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order these prices for a standard bag, lowest to highest.',
        lines: ['1,125 (the floor)', '1,500 (today\'s guess)', '1,725 (pays Clinton like the library)'],
      },
    ],
  },
  reflect: {
    prompt: 'Which pricing myth have you believed? What would change if you stopped believing it?',
    starters: ['I believed...', 'If I stopped...'],
  },
  deepen: {
    title: 'The 1% study',
    summary: 'In Marn and Rosiello\'s classic analysis, a 1% price improvement raised operating profit by about 11% on average. For WashDay, a 7% rise lifts the margin by 27%.',
  },
  notes: 'Fictional: 1,600 − 1,125 = 475 margin (+26.7% vs 375), price rise 6.7%. Marn & Rosiello (1992) HBR. Underpricing by new sellers is widely reported in small-business and freelancing advice.',
};

export default lesson;
