import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: the 40-year map v2. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The 40-year map v2: on autopilot',
  summary: 'One quarter later. The pension is fixed, the emergency fund is full, and 20% leaves on payday without Miracle lifting a finger. Tap through version 2.',
  minutes: 11,
  outcomes: [
    'Read an updated long-term map',
    'See how habits change the numbers',
    'Update your own map',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Miracle\'s 40-year map v2 (one quarter later)',
      text: 'NET WORTH: ₦3,770,000 (was ₦2,250,000). Emergency fund ₦1,440,000, full at 3 months, separate. Pension ₦2,100,000 (back-pay ₦360,000 added). Long-term pot ₦390,000. Staff loan ₦160,000 left. HABITS: Pension 8% + 10%, checked. Extra pension ₦50,000 a month. Long-term pot ₦130,000 a month. All automatic on payday. NEXT RAISE: half to long-term saving (reminder set). FUTURE ME: house in Buea, helping my nieces, never worried about rent. DAD: Sunday calls started.',
      hotspots: [
        { phrase: 'NET WORTH: ₦3,770,000', note: 'Up about ₦1.5 million in one quarter: back-pay, three months of automatic saving, and the loan shrinking. 1,440,000 + 2,100,000 + 390,000 − 160,000.' },
        { phrase: 'Emergency fund ₦1,440,000, full at 3 months', note: 'Topped up by ₦40,000 and moved to its own account. Next target: six months.' },
        { phrase: 'Pension ₦2,100,000 (back-pay ₦360,000 added)', note: 'The four missing months, paid in, plus three months of regular and extra contributions. Checking her statement was worth ₦360,000.' },
        { phrase: 'Long-term pot ₦390,000', note: 'Three months at ₦130,000. New, and growing.' },
        { phrase: 'All automatic on payday', note: 'Zero decisions a month. Dad\'s "next year" has nowhere to hide.' },
        { phrase: 'NEXT RAISE: half to long-term saving', note: 'Save More Tomorrow, set up before the raise arrives.' },
        { phrase: 'DAD: Sunday calls started', note: 'They\'re going through his numbers together. Chapter 5 builds his plan.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Update your map every quarter. Watching net worth climb because of habits, not luck, is the best motivation there is.',
    },
  ],
  apply: {
    scenario: 'Reading map v2.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Net worth went from ₦2,250,000 to ₦3,770,000. How much did it rise?',
        answers: ['1520000', '1,520,000', '₦1,520,000', '₦1520000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Long-term pot: ₦130,000 × 3 months. How much?',
        answers: ['390000', '390,000', '₦390,000', '₦390000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each change to the lesson behind it.',
        pairs: [
          ['Back-pay ₦360,000', 'The missing four months'],
          ['Emergency fund full', 'The order of saving'],
          ['20% automatic on payday', 'By hand vs automatic'],
          ['Half of next raise', 'A share of every raise'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Automatic or needs a decision?',
        groups: ['Automatic', 'Needs a decision'],
        items: [
          { text: 'Pension 8% + 10%', group: 0 },
          { text: 'Long-term pot transfer', group: 0 },
          { text: 'Raising the transfer when the raise lands', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What added the most to net worth this quarter?',
        options: [
          { text: 'The pension back-pay and three months of automatic saving' },
          { text: 'A lucky investment', why: 'No luck involved.' },
          { text: 'A raise', why: 'The raise is next quarter.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'One and a half million in one quarter. I barely did anything!',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'That\'s the point. You set it up once; now it works without you.' },
          { text: 'It was luck.', why: 'It was habits.' },
          { text: 'Now relax and stop checking.', why: 'Keep checking twice a year.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The habits on autopilot.',
        template: 'Pension, extra pension, long-term [[1]]: all [[2]] on payday.',
        blanks: [['pot'], ['automatic']],
        distractors: ['loan', 'manual'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v2 is wrong?',
        lines: [
          'Emergency fund: full at 3 months.',
          'Pension: back-pay added.',
          'Saving: by hand, when I remember.',
        ],
        bug: 2,
        fix: 'Saving: automatic on payday.',
        explanation: 'The old fragile habit is gone.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s Miracle\'s next emergency fund target?',
        options: [
          { text: 'Six months of must-haves' },
          { text: 'None; three is the maximum', why: 'Six is better for many people.' },
          { text: 'Twelve months', why: 'Six is her target.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the map versions so far.',
        lines: ['v1: where I stand', 'v2: on autopilot', 'Next: making time work'],
      },
    ],
  },
  reflect: {
    prompt: 'Update your own map with one automatic habit you\'ve set up (or will set up this week).',
    starters: ['My automatic habit:...', 'It moves on...'],
  },
  deepen: {
    title: 'Small steps, big numbers',
    summary: 'In one quarter, Miracle\'s net worth rose by nearly half, mostly from things she set up once. The same habits, kept for decades, are what turn ordinary salaries into real security.',
  },
  notes: 'Map v2 (fictional): EF 1,440,000 (old savings moved + 40,000 top-up); pension 1,100,000 + back-pay 360,000 + 3 × (162,000 regular + 50,000 extra) ≈ 2,100,000; long-term pot 3 × 130,000 = 390,000; staff loan 160,000. Net worth 3,770,000.',
};

export default lesson;
