import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: the pause list v3, trick spotter. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The pause list v3: trick spotter',
  summary: 'Back in Kumasi, Kofi screenshots a flash-sale page and annotates it like Mum would. Tap every trick on the page.',
  minutes: 11,
  outcomes: [
    'Find every persuasion trick on a real-looking sales page',
    'Name each trick and its defence',
    'Use the page as a template for spotting tricks',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'A flash-sale page, annotated',
      text: 'MEGA FLASH SALE. Studio headphones. Was GH₵1,500, now GH₵599 (60% OFF). Ends in 09:59. Only 2 left in stock! 23 people are viewing this right now. Ama in Kumasi just bought this! Bestseller. Choose: Basic GH₵599. Pro GH₵899. Pro Max GH₵949. Free delivery on orders over GH₵700. Pay later: 4 x GH₵150. Add protection plan (pre-selected): GH₵49. No thanks, I don\'t care about my music.',
      hotspots: [
        { phrase: 'Was GH₵1,500, now GH₵599 (60% OFF)', note: 'Anchor. Ask: says who? Check two other shops before believing GH₵599 is a bargain.' },
        { phrase: 'Ends in 09:59', note: 'Fake urgency, if it restarts on refresh. Test it.' },
        { phrase: 'Only 2 left in stock!', note: 'Scarcity claim you can\'t check. Wait a day and look again.' },
        { phrase: '23 people are viewing this right now', note: 'Unverifiable social proof, designed to make you hurry.' },
        { phrase: 'Pro GH₵899. Pro Max GH₵949.', note: 'Decoy. Pro is there to make Pro Max look like a bargain. Start from what you need.' },
        { phrase: 'Free delivery on orders over GH₵700', note: 'Threshold. Designed to make you upgrade or add items to "save".' },
        { phrase: 'Pay later: 4 x GH₵150', note: 'Turns down the "ouch". GH₵600 total, paid later. Chapter 4 looks at this closely.' },
        { phrase: 'No thanks, I don\'t care about my music.', note: 'Confirmshaming plus a pre-selected add-on: sneaking. Untick it, click "no", feel nothing.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Annotate one sales page a week, like Kofi. Once you\'ve named the tricks, they lose most of their power.',
    },
  ],
  apply: {
    scenario: 'Spotting the tricks.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the page to its trick.',
        pairs: [
          ['"Was GH₵1,500"', 'Anchor'],
          ['"Ends in 09:59"', 'Fake urgency'],
          ['"23 people viewing"', 'Social proof'],
          ['Pro and Pro Max', 'Decoy'],
          ['Pre-selected protection plan', 'Sneaking'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Pay later: 4 x GH₵150. What\'s the total?',
        answers: ['600', 'GH₵600', '600 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Basic is GH₵599. If Kofi takes "pay later", how much more does he pay in total?',
        options: [
          { text: 'Nothing; it\'s the same', why: '600 vs 599, and it adds a debt.' },
          { text: 'GH₵150 more', why: 'The total is 4 × 150 = 600.' },
          { text: 'GH₵1 more, but it pushes the "ouch" into the future' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Can you check it, or not?',
        groups: ['Can check', 'Can\'t check'],
        items: [
          { text: 'The price at two other shops', group: 0 },
          { text: '"23 people viewing"', group: 1 },
          { text: 'Whether the timer restarts', group: 0 },
          { text: '"Ama in Kumasi just bought this!"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Pro Max is only GH₵50 more than Pro! That\'s a steal!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'That\'s the decoy working. Compare with Basic and with what you need. Do you need Pro Max at all?' },
          { text: 'True, get Pro Max.', why: 'He\'s comparing with the decoy, not his needs.' },
          { text: 'Never buy headphones.', why: 'The trick is the problem, not headphones.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Why annotate pages?',
        template: 'Once you\'ve [[1]] the tricks, they lose most of their [[2]].',
        blanks: [['named'], ['power']],
        distractors: ['bought', 'price'],
      },
      {
        kind: 'findBug',
        prompt: 'Which response to the page is still caught by a trick?',
        lines: [
          'I untick the protection plan.',
          'I check two other shops for the real price.',
          'I\'ll add a GH₵110 cable to get free delivery.',
        ],
        bug: 2,
        fix: 'Pay delivery if needed, or skip it; don\'t add items to reach a threshold.',
        explanation: 'Adding GH₵110 to "save" on delivery spends more, unless he needed the cable anyway.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many tricks did Tey mark on the page? (Count the hotspots: 8.) Type the number.',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the single most useful move against this page?',
        options: [
          { text: 'Buy before the timer ends', why: 'That\'s the page\'s plan, not yours.' },
          { text: 'Buy Pro Max', why: 'Decoy.' },
          { text: 'Close it, and decide tomorrow, with other prices in hand' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pause list so far.',
        lines: ['v1: count the urges', 'v2: map triggers and swaps', 'v3: spot the tricks'],
      },
    ],
  },
  reflect: {
    prompt: 'Screenshot a real sales page you see this week. How many tricks can you find on it?',
    starters: ['I found... tricks', 'The sneakiest was...'],
  },
  deepen: {
    title: 'Ask for the pause',
    summary: 'Many tricks work by removing thinking time. The best counter-trick is to add it back: screenshot, close, sleep, compare. If the deal was real, it will survive a night.',
  },
  notes: 'Fictional sales page combining tricks from L02–L08. 4 × 150 = 600.',
};

export default lesson;
