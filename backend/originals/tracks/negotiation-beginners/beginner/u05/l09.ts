import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: ask card v5, the complete card. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ask card v5',
  summary: 'The finished ask card, the one Ada will reuse for every negotiation. Tap each part to see the chapter it came from.',
  minutes: 11,
  outcomes: [
    'Read a complete negotiation plan',
    'Link each part to a chapter of this course',
    'Copy the card for your own negotiations',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s ask card v5',
      text: 'Notice: what is the negotiation? My first line. Prepare: goal, evidence, my BATNA, private walk-away, their side. Ask: number, because, silence; a bolstering range if useful. Trade: questions first, issues, packages, a fair standard. Close: answer a no with questions, concede in shrinking steps with if-then, summary in writing the same day. After: keep my promises, visibly.',
      hotspots: [
        { phrase: 'Notice', note: 'Chapter 1: four yeses Ada never saw as negotiations.' },
        { phrase: 'Prepare', note: 'Chapter 2: goal, walk-away and an honestly costed BATNA.' },
        { phrase: 'number, because, silence', note: 'Chapter 3: the bakery quote, ₦120,000 with half upfront.' },
        { phrase: 'Trade', note: 'Chapter 4: the rent, ₦1,350,000 for two years.' },
        { phrase: 'summary in writing the same day', note: 'Chapter 5: "Matches my notes."' },
        { phrase: 'keep my promises, visibly', note: 'Lesson 8: the next negotiation starts now.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Notice, prepare, ask, trade, close, follow through. One card for every negotiation.',
    },
  ],
  apply: {
    scenario: 'Ask card v5.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the six parts of the card.',
        lines: ['Notice', 'Prepare', 'Ask', 'Trade', 'Close', 'After'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to its result in Ada\'s story.',
        pairs: [
          ['Ask', 'Bakery logo at ₦120,000'],
          ['Trade', 'Rent at ₦1,350,000 for two years'],
          ['Close', '₦420,000 now, ₦480,000 in writing'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s new on v5?',
        options: [
          { text: 'Only the walk-away', why: 'That was on v2.' },
          { text: 'Nothing', why: 'v5 adds closing and follow-through.' },
          { text: 'The Close and After parts' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the card is this?',
        groups: ['Prepare', 'Ask', 'Close'],
        items: [
          { text: 'Private walk-away', group: 0 },
          { text: 'Number, because, silence', group: 1 },
          { text: 'Summary the same day', group: 2 },
          { text: 'Cost the BATNA', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Do I need the whole card for asking a seller for free delivery?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Always fill every line.', why: 'Match effort to stakes.' },
          { text: 'For small asks, just Notice and Ask. Use the whole card when the stakes are high.' },
          { text: 'Never use it for small things.', why: 'The Ask part still helps.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Closing a no.',
        template: 'Answer a no with [[1]]. Concede in [[2]] steps.',
        blanks: [['questions'], ['shrinking', 'smaller']],
        distractors: ['threats', 'giant'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many parts does ask card v5 have?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which part stops Ada saying yes to a bad deal?',
        options: [
          { text: 'Ask: the silence', why: 'Silence helps the ask; the walk-away stops bad yeses.' },
          { text: 'After: promises', why: 'That\'s follow-through.' },
          { text: 'Prepare: the private walk-away' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this copy of the card is wrong?',
        lines: [
          'Prepare: goal, BATNA, private walk-away.',
          'Ask: number, because, silence.',
          'Trade: give the best issue away first, for goodwill.',
          'Close: summary in writing the same day.',
        ],
        bug: 2,
        fix: 'Trade: questions, issues, packages, fair standard.',
        explanation: 'Never give your best trade away for free.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the card is this?',
        groups: ['Trade', 'After'],
        items: [
          { text: 'Three packages', group: 0 },
          { text: 'Updates every two weeks', group: 1 },
          { text: 'A fair standard', group: 0 },
          { text: 'Fix the gate lock in week one', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Copy ask card v5 and fill it in for the most important negotiation in your life right now.',
    starters: ['Notice:...', 'Prepare:...'],
  },
  notes: 'Ask card v5 (fictional) summarises the course: notice, prepare, ask, trade, close, after.',
};

export default lesson;
