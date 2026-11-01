import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Card deck: price floor, price ceiling and the space between. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Floor, ceiling and the space between',
  summary: 'David puts four numbers on one line: what a bag costs, what pays Clinton fairly, where value runs out, and the space in the middle where a good price lives.',
  minutes: 12,
  outcomes: [
    'Mark the floor, fair-pay line and ceiling for a price',
    'Choose a target range between them',
    'Split the value fairly between you and the customer',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Four numbers for a standard WashDay bag:</p><ol><li><strong>The floor: 1,125 FCFA.</strong> The full cost. Below this, every bag loses money.</li><li><strong>The fair-pay line: 1,725 FCFA.</strong> Cost plus 600, which pays Clinton about the library rate for his hours.</li><li><strong>The ceiling: about 2,400 FCFA.</strong> Mama Rose\'s basket price. Above it, students would rather carry their own basket to the stand.</li><li><strong>The target range: 1,800 to 2,000 FCFA.</strong> Above fair pay, clearly below the ceiling.</li></ol><p>At <strong>1,800</strong>: Clinton keeps 675 a bag (above the 600 fair-pay mark), and a student pays 600 less than at the stand and carries nothing. Both sides win.</p><p>At <strong>2,400</strong>: Clinton keeps more, but students have no money reason to choose WashDay over the stand. Too close to the ceiling.</p><p>A good price shares the value: enough for you to keep going, a clear deal for them.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Floor (cost) < fair pay < your price < ceiling (customer\'s next-best option).',
    },
  ],
  apply: {
    scenario: 'The price line.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order WashDay\'s price line from lowest to highest.',
        lines: ['Floor: 1,125', 'Fair pay: 1,725', 'Target: 1,800 to 2,000', 'Ceiling: 2,400'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At 1,800 FCFA, how much less does a student pay than Mama Rose\'s 2,400?',
        answers: ['600'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why not price at the ceiling, 2,400?',
        options: [
          { text: 'It\'s below cost', why: 'It\'s far above cost.' },
          { text: 'Students would have no money reason to choose WashDay over the stand' },
          { text: 'It\'s illegal', why: 'It\'s just poor value for customers.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to what it means.',
        pairs: [
          ['Floor', 'Below it, you lose money'],
          ['Fair pay', 'Pays your time properly'],
          ['Ceiling', 'Above it, customers go elsewhere'],
          ['Target range', 'Good for both sides'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Why not 2,300? Still under the ceiling.',
        prompt: "David's best reply?",
        options: [
          { text: 'Only 100 cheaper than the stand isn\'t much reason to switch for most students. 1,800 to 2,000 shares the value more fairly.' },
          { text: 'Yes, 2,300 is perfect.', why: 'Too little saving for students.' },
          { text: 'Go to 1,200 to be safe.', why: 'That\'s barely above the floor.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The order.',
        template: 'Floor < fair [[1]] < your price < [[2]].',
        blanks: [['pay'], ['ceiling']],
        distractors: ['logo', 'floor'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At 2,000 FCFA with a 1,125 cost, what is the margin per bag?',
        answers: ['875'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Where does this price fall?',
        groups: ['Below floor', 'Target range', 'At or above ceiling'],
        items: [
          { text: '1,000 FCFA', group: 0 },
          { text: '1,900 FCFA', group: 1 },
          { text: '2,500 FCFA', group: 2 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this price line is wrong?',
        lines: [
          'Floor: cost per bag, 1,125.',
          'Fair pay: 1,725.',
          'Ceiling: 1,500, because that\'s what I charge now.',
          'Target: 1,800 to 2,000.',
        ],
        bug: 2,
        fix: 'Ceiling: about 2,400, the customer\'s next-best option.',
        explanation: 'The ceiling comes from the customer\'s alternative, not your current price.',
      },
      {
        kind: 'mcq',
        prompt: 'At 1,800, does Clinton\'s margin reach the 600 fair-pay mark?',
        options: [
          { text: 'No: 675 is below 600', why: '675 is more than 600.' },
          { text: 'Yes: 675 is above 600' },
          { text: 'Exactly equal', why: 'It\'s 75 above.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Draw your own price line: floor, fair pay, ceiling. Where would you put your target range?',
    starters: ['Floor:...', 'Target range:...'],
  },
  deepen: {
    title: 'Sharing the value',
    summary: 'Pricing experts talk about the value created being shared between seller and customer. Take too much and customers leave; take too little and the business can\'t last.',
  },
  notes: 'Fictional price line: floor 1,125 (full cost), fair pay 1,725 (cost + 600 at ~1,000 FCFA/hour), ceiling ~2,400 (Mama Rose basket), target 1,800-2,000. Margins: 1,800 → 675; 2,000 → 875.',
};

export default lesson;
