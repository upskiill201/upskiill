import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: evidence board v5, decision day. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Evidence board v5',
  summary: 'The last version of Clinton\'s board. Five weeks ago every card said "untested". Now most say "supported", one says "killed", and two point straight at what comes next.',
  minutes: 11,
  outcomes: [
    'Read a finished evidence board',
    'See how far evidence has moved since week one',
    'Find the cards that lead to the next stage',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Evidence board v5',
      text: 'Food delivery: killed. Laundry is a real problem: supported. They pay for pickup: supported, 54 bags. They come back: supported, 8 of 12. Real pull: supported, 45% very disappointed. Mama Rose partnership: supported, up to 25 bags. Capacity beyond 25 bags: untested. The price pays Clinton fairly: doubtful, 500 FCFA a bag.',
      hotspots: [
        { phrase: 'Food delivery: killed', note: 'Week one\'s idea. One evening and ten doors saved 350,000 FCFA. The most valuable "failure" on the board.' },
        { phrase: 'They pay for pickup: supported, 54 bags', note: 'The riskiest card since Chapter 2, now backed by three weekends of real Mobile Money payments.' },
        { phrase: 'They come back: supported, 8 of 12', note: 'Two-thirds of the first customers paid again. The hardest card to fake.' },
        { phrase: 'Capacity beyond 25 bags: untested', note: 'Mama Rose\'s limit. Growth needs a second washer, a second bicycle, or both.' },
        { phrase: 'The price pays Clinton fairly: doubtful', note: '27,000 FCFA kept over three weekends of hills. This card opens the next course: How to Price a Product or Service.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A validated idea isn\'t a finished business. It\'s an idea with evidence, and a clear list of what to test next.',
    },
  ],
  apply: {
    scenario: 'Reading board v5.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which label on board v5?',
        groups: ['Supported', 'Untested', 'Doubtful'],
        items: [
          { text: 'They pay for pickup', group: 0 },
          { text: 'Capacity beyond 25 bags', group: 1 },
          { text: 'The price pays Clinton fairly', group: 2 },
          { text: 'They come back', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which card is the most valuable "failure" on the board?',
        options: [
          { text: 'Food delivery: killed cheaply, saving the app money' },
          { text: 'They come back', why: 'That\'s a success.' },
          { text: 'Mama Rose partnership', why: 'Supported, not killed.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to its evidence.',
        pairs: [
          ['They pay', '54 paid bags'],
          ['They come back', '8 of 12'],
          ['Real pull', '45% very disappointed'],
          ['Partnership', 'Up to 25 bags a Saturday'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Most cards are supported. So I\'ve built a business!',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, you\'re done learning.', why: 'Two important cards are still open.' },
          { text: 'You\'ve validated an idea. A business also needs a price that pays you and room to grow. Those are your next two cards.' },
          { text: 'No, start over.', why: 'The evidence is strong; keep building on it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'What a validated idea is.',
        template: 'An idea with [[1]], and a clear list of what to [[2]] next.',
        blanks: [['evidence'], ['test']],
        distractors: ['hope', 'buy'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In week one, how many of the board\'s cards were supported by evidence?',
        answers: ['0', 'zero', 'none'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which card opens the pricing course?',
        options: [
          { text: 'Food delivery: killed', why: 'That\'s the past.' },
          { text: 'They come back', why: 'Supported; not about price.' },
          { text: 'The price pays Clinton fairly: doubtful' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which card on this version of the board is over-claimed?',
        lines: [
          'They pay for pickup: supported (54 bags).',
          'They come back: supported (8 of 12).',
          'Capacity for 100 bags: supported (Mama Rose said 25).',
          'The price pays Clinton fairly: doubtful.',
        ],
        bug: 2,
        fix: 'Capacity beyond 25 bags: untested.',
        explanation: 'Mama Rose\'s limit is 25; nothing supports 100.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the board\'s versions.',
        lines: ['v1: all untested', 'v2: food killed, laundry found', 'v3: market sized', 'v4: they pay', 'v5: decision day'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Validated, or a next step?',
        groups: ['Validated', 'Next step'],
        items: [
          { text: 'Laundry is a real problem', group: 0 },
          { text: 'A second washer', group: 1 },
          { text: 'Students pay and return', group: 0 },
          { text: 'A fairer price', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Compare your own board from Chapter 1 with today. Which cards moved, and what\'s your next test?',
    starters: ['The card that moved most...', 'My next test is...'],
  },
  deepen: {
    title: 'Keep the board',
    summary: 'Founders who keep testing after launch keep the board too: new cards for new markets, prices and products. It\'s a habit, not a one-off.',
  },
  notes: 'Board v5 (fictional) summarises the course: food delivery killed; laundry problem, payment (54 bags), return (8 of 12), pull (45%), partnership (25 bags) supported; capacity beyond 25 untested; fair price doubtful (500 FCFA kept per bag, 27,000 FCFA total).',
};

export default lesson;
