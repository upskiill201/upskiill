import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: the 40-year map v5. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The 40-year map v5: the long game',
  summary: 'The final version of Miracle\'s map. It has money on it, and also habits, rules, protection, family and a review date. Tap through version 5.',
  minutes: 11,
  outcomes: [
    'Read a complete long-term money map',
    'See how habits, protection and family fit together',
    'Plan your own map\'s final version',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Miracle\'s 40-year map v5',
      text: 'AGE 26. NET WORTH: ₦6,400,000, after a fall. HABITS: ₦355,000 (28%) to future me on payday. Half of every raise or bonus. PROTECTION: emergency fund, three months. Work health cover; checked what it excludes. RULES: "When it falls" page, signed. No tips, no status debt, quarterly review. FAMILY: ₦100,000 family pot, fixed, gifts not loans. Dad\'s plan agreed, check-in every quarter. SKILLS: data course done; next, a certificate. NEXT REVIEW: first Saturday of the quarter. AGE 60: on track, if I keep the habits.',
      hotspots: [
        { phrase: 'NET WORTH: ₦6,400,000, after a fall', note: 'Even after a 15% fall in the long-term pot, still up. The gap kept filling it.' },
        { phrase: 'Half of every raise or bonus', note: 'The rule that grew her savings rate from 13% to 28% without a single cut.' },
        { phrase: 'checked what it excludes', note: 'Protection only works if you know its limits.' },
        { phrase: '"When it falls" page, signed', note: 'Calm-Miracle\'s instructions for scared-Miracle.' },
        { phrase: 'gifts not loans', note: 'Generous and sustainable. The pot means she can keep helping.' },
        { phrase: 'data course done', note: 'Her biggest investment: her own earning power.' },
        { phrase: 'on track, if I keep the habits', note: 'Not a promise. A direction. The habits are the plan.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A complete map has money, habits, protection, rules, family, skills and a review date. Update it every quarter for 40 years.',
    },
  ],
  apply: {
    scenario: 'Reading map v5.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each map section to its contents.',
        pairs: [
          ['Habits', '28% on payday, half of every raise'],
          ['Protection', 'Emergency fund and health cover'],
          ['Rules', '"When it falls" page, quarterly review'],
          ['Family', '₦100,000 pot, gifts not loans'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Net worth is up despite a 15% fall. Why?',
        options: [
          { text: 'She sold before it fell', why: 'She didn\'t time it; she kept going.' },
          { text: 'A lucky tip', why: 'No tips on her map.' },
          { text: 'She kept saving the gap, and kept buying during the fall' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Money on the map, or habit on the map?',
        groups: ['Money', 'Habit or rule'],
        items: [
          { text: 'Net worth ₦6,400,000', group: 0 },
          { text: 'Quarterly review', group: 1 },
          { text: 'Family pot ₦100,000', group: 0 },
          { text: 'Half of every raise', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Which line on the map matters most?',
        prompt: 'Miracle\'s best answer?',
        options: [
          { text: 'The net worth number.', why: 'The number follows the habits.' },
          { text: '"If I keep the habits." Everything else depends on it.' },
          { text: 'None of them.', why: 'The habits are the plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'A complete map.',
        template: 'Money, habits, [[1]], rules, family, skills and a [[2]] date.',
        blanks: [['protection'], ['review']],
        distractors: ['tips', 'loan'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Net worth went from ₦2,250,000 (map v1) to ₦6,400,000 (map v5). How much did it grow?',
        answers: ['4150000', '4,150,000', '₦4,150,000', '₦4150000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v5 doesn\'t belong?',
        lines: [
          'Protection: emergency fund, three months.',
          'Rules: no tips, no status debt.',
          'Family: lend whatever anyone asks.',
        ],
        bug: 2,
        fix: 'Family: fixed pot, gifts not loans.',
        explanation: 'Unlimited lending would sink the plan.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does the map say "on track, if I keep the habits" instead of a promise?',
        options: [
          { text: 'Nothing is guaranteed; the habits are what she controls' },
          { text: 'She\'s unsure of her maths', why: 'It\'s about honesty, not maths.' },
          { text: 'She\'s pessimistic', why: 'It\'s honest and hopeful.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'She\'s 26 and plans for 60. How many years of quarterly reviews is that?',
        answers: ['34', 'thirty-four'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order all five map versions.',
        lines: ['v1: where I stand', 'v2: on autopilot', 'v3: time working', 'v4: the gap grows', 'v5: the long game'],
      },
    ],
  },
  reflect: {
    prompt: 'Sketch your own v5: one line each for habits, protection, rules, family and skills.',
    starters: ['Habits:...', 'Protection:...', 'Rules:...', 'Family:...', 'Skills:...'],
  },
  deepen: {
    title: 'The map is a habit too',
    summary: 'The map itself is a habit: one Saturday a quarter, update the numbers and check the rules. People who look at their money regularly, calmly and on a schedule tend to make fewer panic decisions.',
  },
  notes: 'Map v5 (fictional): net worth 6,400,000 after a quarter of saving (~₦1.07m incl. employer pension) and a fall in the long-term pot. 6,400,000 − 2,250,000 = 4,150,000. 60 − 26 = 34.',
};

export default lesson;
