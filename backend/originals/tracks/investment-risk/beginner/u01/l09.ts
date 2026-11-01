import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: Arjun's risk map v1. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Arjun\'s risk map v1',
  summary: 'Arjun builds the money equivalent of an architecture diagram: every idea he\'s been given, scored on the three questions. Tap through version 1.',
  minutes: 11,
  outcomes: [
    'Score ideas on how far they could fall, zero risk and access',
    'Compare very different ideas on one page',
    'Start your own risk map',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Arjun\'s risk map v1',
      text: 'WINDFALL: ₹12,00,000, parked in a savings account while I learn. SAVINGS: ₹1,50,000. MONTHLY COSTS: ₹60,000. Income uneven. IDEAS, scored on fall / zero / access: Savings account: tiny / no / today. Wide spread of shares: big in a bad year / very unlikely / days. Land near Mysuru: unknown / title risk / months or years. Kavya\'s crypto: huge / possible / fast, at that day\'s price. Vikram\'s options: huge / yes, account can be wiped / fast. WhatsApp 3% a month: "can\'t fall" / unknown / locked 1 year. NOTES: "never" heard twice. Nobody asked what the money is for.',
      hotspots: [
        { phrase: 'parked in a savings account while I learn', note: 'No decision yet. The pause from lesson 1.' },
        { phrase: 'Income uneven', note: 'A freelancer\'s income swings. That will matter in Chapter 3.' },
        { phrase: 'title risk', note: 'Land can come with ownership disputes. One of the risks his uncle didn\'t mention.' },
        { phrase: 'account can be wiped', note: 'Trading with borrowed money or derivatives can lose more than a bad year; it can lose the lot.' },
        { phrase: '"can\'t fall" / unknown / locked 1 year', note: 'The only idea that claims no risk, and the only one he can\'t get out of. A bad combination.' },
        { phrase: '"never" heard twice', note: 'Warning words, logged.' },
        { phrase: 'Nobody asked what the money is for', note: 'The biggest gap in the map, and where Chapter 3 is heading.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Put every idea on one page and score it the same way. Very different ideas become easy to compare once they\'re side by side.',
    },
  ],
  apply: {
    scenario: 'Reading map v1.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its access.',
        pairs: [
          ['Savings account', 'Today'],
          ['Land', 'Months or years'],
          ['WhatsApp scheme', 'Locked 1 year'],
          ['Wide spread of shares', 'Days'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s worrying about the WhatsApp scheme\'s row?',
        options: [
          { text: 'It\'s too cheap', why: 'The claim and the lock-in are the worry.' },
          { text: 'It claims no risk and also locks your money in' },
          { text: 'Nothing', why: '"Can\'t fall" plus locked in is a bad combination.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Could it go to zero?',
        groups: ['Very unlikely', 'Possible'],
        items: [
          { text: 'Savings account', group: 0 },
          { text: 'Vikram\'s options', group: 1 },
          { text: 'Wide spread of shares', group: 0 },
          { text: 'Kavya\'s crypto', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'What\'s the biggest gap in your map?',
        prompt: 'Arjun\'s best answer?',
        options: [
          { text: 'I haven\'t picked the winner yet.', why: 'He doesn\'t need a winner; he needs a purpose.' },
          { text: 'There are no gaps.', why: 'He wrote one down himself.' },
          { text: 'Nobody, including me, has asked what the money is for.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The method.',
        template: 'Put every idea on one [[1]] and score it the [[2]] way.',
        blanks: [['page'], ['same']],
        distractors: ['account', 'fastest'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Monthly costs are ₹60,000. How many months would his ₹1,50,000 savings cover? (A decimal is fine.)',
        answers: ['2.5', '2 and a half', 'two and a half'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which row on a copy of v1 is scored wrongly?',
        lines: [
          'Savings account: tiny / no / today.',
          'Land: unknown / title risk / months or years.',
          'Vikram\'s options: tiny / no / today.',
        ],
        bug: 2,
        fix: 'Vikram\'s options: huge / yes / fast.',
        explanation: 'Options trading can lose the whole account.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does "income uneven" matter on the map?',
        options: [
          { text: 'He may need more money safe and reachable for slow months' },
          { text: 'It doesn\'t', why: 'It affects how much risk he can take.' },
          { text: 'It means he should take more risk', why: 'Usually the opposite.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which idea scores "huge" on how far it could fall?',
        options: [
          { text: 'Savings account', why: 'That\'s "tiny".' },
          { text: 'None', why: 'Crypto and options score "huge".' },
          { text: 'Kavya\'s crypto' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Arjun built the map.',
        lines: ['List every idea', 'Score each on the three questions', 'Note warning words', 'Spot what\'s missing'],
      },
    ],
  },
  reflect: {
    prompt: 'Start your own map: list two or three places your money is, or could go, and score them.',
    starters: ['Idea 1:... fall / zero / access', 'Idea 2:...'],
  },
  deepen: {
    title: 'Why a map, not a pick',
    summary: 'A map shows everything at once, including the boring options. That stops the loudest idea from winning just because it\'s loud.',
  },
  notes: 'Map v1 (fictional). 150,000/60,000 = 2.5 months.',
};

export default lesson;
