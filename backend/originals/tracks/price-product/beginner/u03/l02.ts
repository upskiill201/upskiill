import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Before/After: per item, per bag or per month? */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Per item, per bag or per month?',
  summary: 'Mama Rose charges per item. WashDay charges per bag. Miracle\'s startup charges per month. David compares how the same laundry costs under each, and what each one makes customers do.',
  minutes: 12,
  outcomes: [
    'Compare charging per item, per bag and per month',
    'See how the unit you charge for changes behaviour',
    'Pick the unit that fits your customers',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Per item vs per bag',
      before: {
        label: 'Per item (like Mama Rose)',
        text: '150 FCFA an item.\n12 items = 1,800; 6 items = 900.\nFair for small loads.\nBut students count every sock, and Clinton has to count too.',
      },
      after: {
        label: 'Per bag (WashDay)',
        text: '1,800 FCFA a bag, up to 12 items.\nSimple: one bag, one price.\nStudents fill the bag to get their money\'s worth.\nClinton\'s costs are per bag anyway, so it matches.',
      },
      notes: [
        'Per month is the third way: a plan of four bags for a fixed monthly price (lesson 7).',
        'The unit you charge for changes what people do: per item makes them wash less; per bag makes them fill it.',
        'Choose the unit that matches your costs and is easy for customers to understand.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Charge for what drives your cost, in a unit customers understand.',
    },
  ],
  apply: {
    scenario: 'Choosing the unit.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'At 150 FCFA an item, what do 6 items cost, in FCFA?',
        answers: ['900'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'A student has only 6 items. Which is cheaper for her: per item at 150, or 1,800 a bag?',
        options: [
          { text: 'Per bag: 1,800 FCFA', why: 'Per item is 900 for 6.' },
          { text: 'Per item: 900 FCFA' },
          { text: 'The same', why: '900 vs 1,800.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the unit to what it makes customers do.',
        pairs: [
          ['Per item', 'Count every sock'],
          ['Per bag', 'Fill the bag'],
          ['Per month', 'Use it every week'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Better per bag, or better per item?',
        groups: ['Per bag', 'Per item'],
        items: [
          { text: 'Clinton\'s cost is the same whatever\'s in the bag', group: 0 },
          { text: 'Some customers have tiny loads', group: 1 },
          { text: 'Simple, one-price messaging', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Should I switch to per item like Mama Rose?',
        prompt: "David's best reply?",
        options: [
          { text: 'Yes, always copy competitors.', why: 'His costs work differently from hers.' },
          { text: 'Charge per hour instead.', why: 'Customers don\'t think in his hours.' },
          { text: 'Your costs are per bag: one pickup, one wash fee. Per bag matches that and is simpler. Handle small loads with a cheaper option.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Choosing the unit.',
        template: 'Charge for what drives your [[1]], in a unit customers [[2]].',
        blanks: [['cost'], ['understand']],
        distractors: ['mood', 'ignore'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does per bag suit WashDay\'s costs?',
        options: [
          { text: 'Mama Rose charges per bag and pickups are per bag' },
          { text: 'Bags are cheaper than items', why: 'It\'s about how costs are counted.' },
          { text: 'It doesn\'t', why: 'His costs are mostly per bag.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A 12-item bag at 1,800 FCFA. What is that per item, in FCFA?',
        answers: ['150'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this pricing plan mixes up units?',
        lines: [
          'Standard: 1,800 a bag, up to 12 items.',
          'Express: 2,500 a bag.',
          'Ironing: 15 FCFA per second of ironing.',
          'Hill zone: +500 a bag.',
        ],
        bug: 2,
        fix: 'Ironing: +200 a bag.',
        explanation: 'Nobody can work out a price per second. Use the same unit as the rest.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order these prices for 12 items, lowest to highest.',
        lines: ['WashDay per bag: 1,800', 'Mama Rose per item: 2,400', 'Express bag: 2,500'],
      },
    ],
  },
  reflect: {
    prompt: 'What unit do you charge in: per item, per job, per hour, per month? Does it match your costs, and do customers understand it?',
    starters: ['I charge per...', 'It matches my costs because...'],
  },
  deepen: {
    title: 'The unit shapes behaviour',
    summary: 'Unlimited data makes people stream more; per-text pricing made people text less. The unit you charge for quietly changes what customers do.',
  },
  notes: 'Fictional: 150 FCFA/item equivalent at 1,800 per 12-item bag; Mama Rose 200/item (2,400 per 12). Pricing units ("price metrics") are a standard pricing design choice.',
};

export default lesson;
