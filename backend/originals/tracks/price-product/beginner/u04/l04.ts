import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Chat with Tey: raising prices without losing regulars. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Raising prices, keeping regulars',
  summary: 'Ten regulars made WashDay work. Clinton doesn\'t want to lose them. Tey walks him through how to raise a price so most good customers stay, and feel respected.',
  minutes: 12,
  outcomes: [
    'Give notice and reasons for a price rise',
    'Look after loyal customers during a change',
    'Write a clear price-rise message',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Four things help a price rise go well. First, notice: tell people two weeks before, not on the day.', replies: ['Second?'] },
        { tey: 'Reasons: say why, honestly. "We now pay two washers fairly so your bag is never turned away, and we\'ve added Saver for tighter budgets."', replies: ['Third?'] },
        { tey: 'Thanks to regulars: keep them at 1,600 until the end of the month, or offer the Saturday Plan at 1,600 a bag. Loyal customers should feel the change last, not first.', replies: ['And fourth?'] },
        { tey: 'Something better: make the service visibly better at the same time. Clinton adds a WhatsApp photo of each bag when it\'s collected, so nobody worries. A rise that comes with something new feels fair.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Notice, reasons, thanks to regulars, and something better. That\'s how a price rise feels fair.',
    },
  ],
  apply: {
    scenario: 'The price-rise message.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the four parts of a good price rise.',
        lines: ['Give notice', 'Give honest reasons', 'Thank regulars', 'Add something better'],
      },
      {
        kind: 'mcq',
        prompt: 'Why give regulars the new price last?',
        options: [
          { text: 'They made the business work; loyalty should be rewarded, not punished' },
          { text: 'They won\'t notice', why: 'They will; that\'s why you look after them.' },
          { text: 'It\'s required by law', why: 'It\'s about keeping good customers.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the rise feel fair, or makes it feel unfair?',
        groups: ['Fair', 'Unfair'],
        items: [
          { text: 'Two weeks\' notice', group: 0 },
          { text: 'Raising it the morning of pickup', group: 1 },
          { text: 'Explaining the second washer', group: 0 },
          { text: '"Prices have changed." Nothing else.', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the message to an example.',
        pairs: [
          ['Notice', '"From 1 November..."'],
          ['Reason', '"So your bag is never turned away"'],
          ['Thanks', '"Regulars keep 1,600 until month end"'],
          ['Something better', '"Photo of your bag on collection"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Should I apologise a lot in the message?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Yes, apologise many times.', why: 'Too much apology suggests the price is wrong.' },
          { text: 'Be warm, not sorry. Explain clearly and confidently what changes and why. A fair price for a good service needs no grovelling.' },
          { text: 'Don\'t send a message.', why: 'Notice is the first rule.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The four parts.',
        template: 'Notice, reasons, thanks to [[1]], and something [[2]].',
        blanks: [['regulars'], ['better']],
        distractors: ['strangers', 'cheaper'],
      },
      {
        kind: 'mcq',
        prompt: 'A regular stays at 1,600 for one more month instead of 1,800. How much margin per bag does Clinton give up?',
        options: [
          { text: '675 FCFA', why: 'He still earns 475; he gives up 200.' },
          { text: 'Nothing', why: '1,800 − 1,600 = 200.' },
          { text: '200 FCFA' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s draft message should change?',
        lines: [
          'From 1 November, Standard bags are 1,800.',
          'We now pay two washers fairly, so no bag is turned away.',
          'Prices may go up again any time without warning.',
          'Regulars: you keep 1,600 until 30 November. Thank you!',
        ],
        bug: 2,
        fix: 'Delete it: promise notice for any future change.',
        explanation: 'Threatening surprise rises undoes the trust the rest builds.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks of notice does Tey suggest?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Something better that comes with the rise, or not?',
        groups: ['Something better', 'Not really'],
        items: [
          { text: 'Photo of each bag on collection', group: 0 },
          { text: 'A new font on the price card', group: 1 },
          { text: 'No bag ever turned away', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Draft a price-rise message for your own offer, with all four parts.',
    starters: ['From [date],...', 'Because...'],
  },
  deepen: {
    title: 'Reference prices',
    summary: 'Customers judge a new price against the old one, their "reference price". That\'s why rises need reasons, and why regulars, who know the old price best, need the most care.',
  },
  notes: 'Fictional: regulars keep 1,600 until month end (vs 1,800; 200 less margin, 475 still earned); WhatsApp collection photo added. Reference-price effects are well documented in pricing research (e.g. Kalyanaram & Winer, 1995).',
};

export default lesson;
