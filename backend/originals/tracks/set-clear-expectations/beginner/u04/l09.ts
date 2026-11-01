import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: the change note to Mr Rao, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the change note',
  summary: 'Day 21, 10:20 a.m., right after the call. Arjun sends Mr Rao a short change note. Mr Rao forwards it to Rohit with three words: "Read this first." Rohit stops messaging the juniors. Tap through to see every Chapter 4 tool in it.',
  minutes: 11,
  outcomes: [
    'See every Chapter 4 tool in one short note',
    'Write a change note a busy client will read',
    'Close a change so nobody remembers it differently',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Arjun to Mr Rao, Day 21, 10:20 a.m.',
      text: 'Diwali launch stays Day 28, with a ₹100 comeback code for every buyer. You chose option B: comeback code now, full loyalty points in January. What moves: coupons, from Day 24 to Day 26. Not in this version: points, wishlists, reviews, WhatsApp. New ideas go on the January list, and I\'ll send it every Thursday. Please send any requests to me, so the team stays on Diwali. Next update: Thursday, 6 p.m.',
      hotspots: [
        { phrase: 'Diwali launch stays Day 28', note: 'Line one: the most important thing, and what stays the same.' },
        { phrase: 'You chose option B', note: 'The client\'s own choice, written down. Nobody remembers it differently later.' },
        { phrase: 'What moves: coupons, from Day 24 to Day 26.', note: 'The trade-off, named. No quiet costs.' },
        { phrase: 'Not in this version: points, wishlists, reviews, WhatsApp.', note: 'The Won\'t list, finally where he\'ll see it: near the top.' },
        { phrase: 'New ideas go on the January list', note: 'A home for scope creep, so new ideas feel heard, not refused.' },
        { phrase: 'Please send any requests to me', note: 'One route for requests. The back channel, closed politely.' },
        { phrase: 'Next update: Thursday, 6 p.m.', note: 'A steady rhythm, so nobody needs to call at 8:15 p.m.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A change note: what stays (line one), what they chose, what moves, what\'s not included, where new ideas go, how requests come in, when the next update is.',
    },
  ],
  apply: {
    scenario: 'Line check, the change note.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Rohit stop messaging the juniors?',
        options: [
          { text: 'Arjun blocked him', why: 'No need.' },
          { text: 'He lost interest', why: 'His uncle told him to read the note.' },
          { text: 'Mr Rao forwarded a note that said requests go to Arjun' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 4 tool is it?',
        groups: ['Change request', 'Scope creep', 'Upwards'],
        items: [
          { text: '"You chose option B"', group: 0 },
          { text: '"New ideas go on the January list"', group: 1 },
          { text: 'Line one: launch stays Day 28', group: 2 },
          { text: '"What moves: coupons"', group: 0 },
          { text: '"Not in this version: WhatsApp"', group: 1 },
          { text: '"Next update: Thursday, 6 p.m."', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Rohit hasn\'t messaged me for two days. Did something happen?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Mr Rao and I agreed requests come to me, so you can focus. If he does message, forward it to me with no guilt.' },
          { text: 'I told him off.', why: 'Not true, and not the point.' },
          { text: 'No idea.', why: 'She deserves to know the new route.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Line one says what ___ the same. (one word)',
        answers: ['stays', 'Stays'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why write "You chose option B"?',
        options: [
          { text: 'To blame him if it goes wrong', why: 'It\'s a record, not a weapon.' },
          { text: 'So nobody remembers the decision differently later' },
          { text: 'Lawyers require it', why: 'It\'s about shared memory.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Draft 1 of the note. Which line breaks Chapter 4?',
        lines: [
          'Diwali launch stays Day 28.',
          'We\'ll try to fit some of the other ideas in too.',
          'Next update: Thursday, 6 p.m.',
        ],
        bug: 1,
        fix: 'New ideas go on the January list.',
        explanation: '"We\'ll try" is heard as yes, and invites more creep.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the change note in order.',
        lines: ['What stays, in line one', 'What they chose', 'What moves', 'What\'s not included', 'Next update time'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the idea.',
        pairs: [
          ['"What moves: coupons"', 'Naming the trade-off'],
          ['"January list"', 'A home for new ideas'],
          ['"Requests to me"', 'One route in'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Close every change in [[1]], so nobody [[2]] it differently.',
        blanks: [['writing'], ['remembers']],
        distractors: ['secret', 'loves'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Mr Rao\'s forward to Rohit.',
        tiles: ['Read', 'this', 'first.'],
        distractors: ['Ignore'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a change that someone later remembered differently from you. What would a one-paragraph change note have said?',
    starters: ['They remembered...', 'The note would say...'],
  },
  deepen: {
    title: 'Close it in writing',
    summary: 'After your next decision with a client, boss or group, send a three-line note: what stays, what changed, what\'s next. Same day.',
  },
  notes: 'Synthesis of Chapter 4 tools: answer first, client-chosen options, named trade-offs, explicit exclusions, later list, single intake route, update cadence. Fictional note.',
};

export default lesson;
