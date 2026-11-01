import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: evidence board v3, the numbers. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Evidence board v3',
  summary: 'The board gets numbers. Market cards now have counts and sources, Mama Rose has a card of her own, and the riskiest card hasn\'t moved: will they pay Clinton?',
  minutes: 11,
  outcomes: [
    'Add market numbers to an evidence board',
    'Add competitor findings as new cards',
    'Keep the riskiest card in focus',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Evidence board v3',
      text: 'About 800 hostel students near campus already pay for laundry help sometimes: supported, by counting and interviews. Reachable market about 2.4 million FCFA a month; winnable with one bike about 360,000: estimated. Mama Rose is overloaded and can\'t collect: supported. Mama Rose would partner with me: untested, risk 15. They would pay me for pickup: untested, risk 25.',
      hotspots: [
        { phrase: 'About 800 hostel students near campus', note: '40 hostels × about 50 rooms = 2,000; 40% already pay sometimes (6 of 15 interviews).' },
        { phrase: 'about 2.4 million FCFA a month', note: '800 × 2 bags a month × a guessed 1,500 FCFA. "Estimated", not "supported": the price is still a guess.' },
        { phrase: 'Mama Rose is overloaded and can\'t collect', note: 'He saw it: about 15 baskets turned away on a rainy Saturday, and she can\'t leave the stand.' },
        { phrase: 'Mama Rose would partner with me', note: 'New card from the visit. Big if true: no washing room needed. Untested until she agrees.' },
        { phrase: 'They would pay me for pickup: untested, risk 25', note: 'Still the riskiest card. Three chapters in, nobody has paid Clinton for laundry yet. Chapter 4 tests it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Estimates are useful, but they aren\'t evidence of payment. Only a payment is.',
    },
  ],
  apply: {
    scenario: 'Reading board v3.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which card is still the riskiest?',
        options: [
          { text: 'Mama Rose is overloaded', why: 'That\'s supported by what he saw.' },
          { text: 'The reachable market', why: 'Estimated from counts; payment is the bigger unknown.' },
          { text: 'They would pay me for pickup (risk 25)' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which label on board v3?',
        groups: ['Supported', 'Estimated', 'Untested'],
        items: [
          { text: 'Mama Rose can\'t collect', group: 0 },
          { text: '2.4 million FCFA a month reachable', group: 1 },
          { text: 'Mama Rose would partner with me', group: 2 },
          { text: 'Students would pay me for pickup', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to its source.',
        pairs: [
          ['800 likely customers', 'Counting plus interviews'],
          ['Mama Rose overloaded', 'Seeing it at the stand'],
          ['360,000 FCFA winnable', 'One bike, 60 bags a week'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'The market is 2.4 million. Can I mark "they\'d pay me" as supported now?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, the numbers prove it.', why: 'Estimates aren\'t payments.' },
          { text: 'No: the market size says how many COULD pay. Nobody has paid you yet. That\'s Chapter 4.' },
          { text: 'Mark it killed.', why: 'There\'s no evidence against it either; it\'s untested.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule for this board.',
        template: 'Estimates are useful, but only a [[1]] is evidence of [[2]].',
        blanks: [['payment'], ['paying', 'payment']],
        distractors: ['like', 'size'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the risk score on the new card "Mama Rose would partner with me"?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is the partnership card "big if true"?',
        options: [
          { text: 'It makes the logo better', why: 'It changes what he has to build.' },
          { text: 'It doubles the price', why: 'It changes costs and capacity, not price.' },
          { text: 'Clinton wouldn\'t need his own washing and drying space' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which card on this version of the board is over-claimed?',
        lines: [
          'About 800 likely customers: supported (count + interviews).',
          'Mama Rose overloaded: supported (seen).',
          'Reachable 2.4 million a month: supported (guaranteed income).',
          'They\'d pay me: untested.',
        ],
        bug: 2,
        fix: 'Reachable 2.4 million a month: estimated (price is a guess).',
        explanation: 'It depends on a guessed price and on people paying; it\'s an estimate.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the board\'s journey so far.',
        lines: ['v1: all untested', 'v2: food killed, laundry supported', 'v3: numbers and Mama Rose added', 'Next: test whether they\'ll pay'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Did Chapter 3 add this card, or an earlier chapter?',
        groups: ['Chapter 3', 'Earlier'],
        items: [
          { text: 'Market size', group: 0 },
          { text: 'Mama Rose would partner', group: 0 },
          { text: 'Laundry is a struggle', group: 1 },
          { text: 'Food delivery killed', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Add numbers and competitor cards to your board. Has your riskiest card moved?',
    starters: ['I added...', 'My riskiest card is still...'],
  },
  deepen: {
    title: 'Three labels plus one',
    summary: 'This board adds "estimated" for numbers built from evidence but not yet proved by sales. It\'s honest about the difference between "likely" and "happened".',
  },
  notes: 'Board v3 (fictional): 800 likely customers; reachable ~2.4 million FCFA/month and winnable ~360,000 FCFA/month (estimated); Mama Rose overloaded (supported); partnership untested (risk 15); pay-for-pickup untested (risk 25).',
};

export default lesson;
