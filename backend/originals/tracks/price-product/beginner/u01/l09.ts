import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: price card v1, one guessed price. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Price card v1',
  summary: 'WashDay\'s price card today is one line. Clinton and David annotate it with everything Chapter 1 found. Tap each part to see what\'s wrong with it.',
  minutes: 11,
  outcomes: [
    'Read a price card critically',
    'Link each price to its costs',
    'List what the next version must fix',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'WashDay price card v1',
      text: 'Standard bag: 1,500 FCFA, any hostel, any weather, any day. Costs 1,125 a bag, leaving 375 (25%). Pays Clinton about 625 FCFA an hour. Break-even 9 bags a month; his target needs 80. Rainy-day pickups at the top of the hill can lose money.',
      hotspots: [
        { phrase: '1,500 FCFA', note: 'A guess from course 1. It was never set from costs or value; it just "sounded fair".' },
        { phrase: 'any hostel, any weather, any day', note: 'One price for very different jobs. A hostel next to the gate and one at the top of the hill in the rain cost the same to the customer, but not to Clinton.' },
        { phrase: 'leaving 375 (25%)', note: 'Not 500, as Clinton thought. Fees, bags and running costs take 125 FCFA a bag.' },
        { phrase: 'about 625 FCFA an hour', note: 'Less than the 1,000 FCFA an hour the campus library pays.' },
        { phrase: 'can lose money', note: 'The rainy-day hill pickups. Lesson 10 works out exactly how much.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A price card shows what customers pay. Behind every line should be a cost and a reason.',
    },
  ],
  apply: {
    scenario: 'Reading price card v1.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the biggest problem with "any hostel, any weather, any day"?',
        options: [
          { text: 'It\'s too long to read', why: 'It\'s short; the issue is the costs behind it.' },
          { text: 'Very different jobs cost Clinton very different amounts but pay the same' },
          { text: 'Nothing, it\'s simple', why: 'Simple, but some orders lose money.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number on the card to what it means.',
        pairs: [
          ['1,125', 'Full cost of a bag'],
          ['375', 'Margin per bag'],
          ['625', 'Pay per hour'],
          ['9', 'Break-even bags a month'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fine on price card v1, or a problem to fix?',
        groups: ['Fine', 'Problem'],
        items: [
          { text: 'Students understand the price', group: 0 },
          { text: 'Hill pickups in the rain lose money', group: 1 },
          { text: 'Clinton earns under the library rate', group: 1 },
          { text: 'Payment by Mobile Money', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many bags a month does Clinton need for his 30,000 FCFA target at today\'s price?',
        answers: ['80'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Students like one simple price. Isn\'t simple good?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Simple is always best.', why: 'Not if some orders lose money.' },
          { text: 'Make it as complicated as possible.', why: 'Clear and fair, not complicated.' },
          { text: 'Simple is good, until simple loses you money. Keep it easy to read, but make sure every order pays its way.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Behind every price.',
        template: 'Behind every line on the card should be a [[1]] and a [[2]].',
        blanks: [['cost'], ['reason']],
        distractors: ['logo', 'guess'],
      },
      {
        kind: 'mcq',
        prompt: 'Where did the 1,500 FCFA price come from?',
        options: [
          { text: 'A guess that "sounded fair"' },
          { text: 'A careful cost sheet', why: 'The cost sheet came later.' },
          { text: 'A customer survey', why: 'Nobody was asked.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which note on Clinton\'s annotated card is wrong?',
        lines: [
          'Cost per bag: 1,125.',
          'Margin per bag: 500.',
          'Pay per hour: about 625.',
          'Break-even: 9 bags a month.',
        ],
        bug: 1,
        fix: 'Margin per bag: 375.',
        explanation: '500 was the guess before counting every cost.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what the next versions of the card should do.',
        lines: ['Cover every cost', 'Reflect what it\'s worth to customers', 'Price the hard orders differently', 'Pay Clinton fairly'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Something customers see, or something behind the card?',
        groups: ['Customers see', 'Behind the card'],
        items: [
          { text: '1,500 FCFA a bag', group: 0 },
          { text: 'Cost 1,125', group: 1 },
          { text: 'Margin 375', group: 1 },
          { text: 'Pickup from your room', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own price card v1. Next to each price, write its cost and what you keep.',
    starters: ['My price is...', 'Behind it:...'],
  },
  deepen: {
    title: 'Five versions',
    summary: 'This card gets a new version every chapter: a value range, options and a zone fee, a price rise, and finally a card that pays. Lesson 9 always shows where it\'s up to.',
  },
  notes: 'Price card v1 (fictional): standard bag 1,500 FCFA; cost 1,125; margin 375 (25%); ~625 FCFA/hour; break-even 9 bags/month; target 80 bags/month.',
};

export default lesson;
