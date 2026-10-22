import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Step-by-step: a price list anyone understands, with no hidden fees. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'No hidden fees',
  summary: 'Two students were surprised by the hill fee after booking. Nobody likes a surprise at the end. David rewrites the price list so that what you see is exactly what you pay.',
  minutes: 12,
  outcomes: [
    'Write a price list with no surprises',
    'Show every fee before people book',
    'Define exactly what each price includes',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five rules for a clear price list',
      steps: [
        { title: '1. Say what\'s included', body: '"A bag: up to 12 items, washed, dried and folded." Then nobody argues about a 13th shirt.' },
        { title: '2. Show every fee up front', body: 'The hill fee goes next to the prices, not in a message after booking: "Hill hostels +500, rain or shine."' },
        { title: '3. Show the total before they pay', body: 'When a hill student books Standard, the reply says "2,300 FCFA total" before they send money.' },
        { title: '4. Include your own costs', body: 'Mobile Money fees are Clinton\'s cost, already inside the price. No "+ transaction fee" at the end.' },
        { title: '5. Write the rules once, clearly', body: 'Plan rollover, what happens if a bag is late, how to cancel. One short list, the same for everyone.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Fees that appear at the end feel like tricks, even when they\'re fair. Show them first.',
    },
  ],
  apply: {
    scenario: 'The clear price list.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five rules.',
        lines: ['Say what\'s included', 'Show every fee up front', 'Show the total before they pay', 'Include your own costs', 'Write the rules once, clearly'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A hill student books Standard. What total should the reply show, in FCFA?',
        answers: ['2300', '2,300'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did two students feel tricked by the hill fee?',
        options: [
          { text: 'They only found out about it after booking' },
          { text: 'The fee was too high', why: 'The fee was fair; the timing was the problem.' },
          { text: 'They don\'t live on the hill', why: 'They did; they just weren\'t told first.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear or hidden?',
        groups: ['Clear', 'Hidden'],
        items: [
          { text: '"Hill hostels +500" on the price list', group: 0 },
          { text: '"+ transaction fee" added at payment', group: 1 },
          { text: '"Up to 12 items" on the card', group: 0 },
          { text: 'Extra charge for a 13th item, mentioned on Sunday', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'If I show the hill fee up front, fewer hill students will book.',
        prompt: "David's best reply?",
        options: [
          { text: 'Then hide it.', why: 'Surprises destroy trust.' },
          { text: 'Maybe a few. But the ones who book won\'t feel cheated, and they\'ll book again. Surprise fees lose customers for good.' },
          { text: 'Then drop the fee.', why: 'The fee covers a real cost.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'What a bag includes.',
        template: 'Up to [[1]] items, washed, [[2]] and folded.',
        blanks: [['12', 'twelve'], ['dried']],
        distractors: ['20', 'ironed'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to the problem it prevents.',
        pairs: [
          ['Say what\'s included', 'Arguments about extra items'],
          ['Fees up front', 'Feeling tricked'],
          ['Total before payment', 'Wrong amounts sent'],
          ['Rules written once', 'Different answers for different people'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who pays the Mobile Money fees on the new card?',
        options: [
          { text: 'The customer, added at the end', why: 'That would be a hidden fee.' },
          { text: 'Mama Rose', why: 'They\'re Clinton\'s cost.' },
          { text: 'Clinton: they\'re already inside the price' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this draft price list breaks a rule?',
        lines: [
          'Standard: 1,800 a bag (up to 12 items).',
          'Hill hostels: +500, rain or shine.',
          'Small extra charges may apply.',
          'Plan: 6,400 a month, one unused bag rolls over.',
        ],
        bug: 2,
        fix: 'Delete it, or list exactly what they are.',
        explanation: '"May apply" is a hidden fee waiting to happen.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A hill student books Express. 2,500 + 500. What total should the reply show, in FCFA?',
        answers: ['3000', '3,000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Read your own price list as a new customer. Is there anything they\'d only discover after paying?',
    starters: ['A new customer might be surprised by...', 'I\'ll show it by...'],
  },
  deepen: {
    title: 'Drip pricing',
    summary: 'Showing a low price and adding fees later is called drip pricing. Research and regulators in many countries treat it as misleading. Showing the full price up front builds trust.',
  },
  notes: 'Drip pricing: studied by behavioural economists (e.g. Blake et al., 2021) and restricted by consumer regulators in several countries. Fictional WashDay totals: Standard hill 2,300, Express hill 3,000.',
};

export default lesson;
