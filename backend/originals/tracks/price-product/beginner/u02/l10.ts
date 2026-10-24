import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: what is a standard bag worth? */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: what is a bag worth?',
  summary: 'Miracle asks Clinton to defend one price for a standard bag, with every number behind it: floor, fair pay, value, ceiling, anchor, and what he and the student each get. Everything from Chapter 2.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Defend a value-based price with numbers', 'Use everything from Chapter 2 together'],
  learn: [
    {
      kind: 'story',
      title: 'Defend it',
      beats: [
        { speaker: 'miracle', text: 'Pick one number for a standard bag, and tell me why it\'s right for you AND for the student.' },
        { speaker: 'clinton', text: '1,800. It\'s above my fair-pay line, 600 under the stand, and I can say "we carry it".' },
        { speaker: 'david', text: 'Show your working. Every number.' },
        { speaker: 'tey', text: 'That\'s Chapter 2: price from value, between the cost floor and the customer\'s next-best option, with honest anchors. Chapter 3: one price can\'t fit every customer.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: what is a bag worth?',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'At 1,800 FCFA, with a cost of 1,125, what is Clinton\'s margin per bag?',
        answers: ['675'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: '20 bags a weekend at 675 margin, over 12 hours. What does that pay Clinton per hour?',
        options: [
          { text: '1,125 FCFA an hour' },
          { text: '625 FCFA an hour', why: 'That was at 1,500.' },
          { text: '675 FCFA an hour', why: '20 × 675 = 13,500, divided by 12 hours.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much does a student save at 1,800 compared with Mama Rose\'s 2,400, in FCFA?',
        answers: ['600'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line of Clinton\'s defence to its number.',
        pairs: [
          ['Floor (cost)', '1,125'],
          ['Fair-pay line', '1,725'],
          ['Chosen price', '1,800'],
          ['Ceiling (the stand)', '2,400'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is this part of Clinton\'s honest defence?',
        groups: ['Honest defence', 'Not honest'],
        items: [
          { text: 'Less than the 2,400 at the stand', group: 0 },
          { text: 'We carry it to and from your room', group: 0 },
          { text: 'Normally 3,500, today 1,800', group: 1 },
          { text: '150 FCFA an item', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'What if some first-years really can\'t pay 1,800?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Then charge everyone 1,500.', why: 'That underprices the many who value it more.' },
          { text: 'Ignore them.', why: 'A cheaper, cheaper-to-serve option can keep them.' },
          { text: 'Then give them a cheaper option that still earns, like dropping the bag at a pickup point. That\'s Chapter 3. Don\'t drop the main price for everyone.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter in one line.',
        template: 'Price from [[1]], between the cost floor and the customer\'s [[2]] option.',
        blanks: [['value'], ['next-best', 'next best']],
        distractors: ['cost', 'cheapest'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s working is wrong?',
        lines: [
          'Cost per bag: 1,125.',
          'At 1,800, margin is 675.',
          'Student saves 600 against the stand.',
          'Hourly pay at 20 bags: 13,500 ÷ 20 = 675 an hour.',
        ],
        bug: 3,
        fix: 'Hourly pay: 13,500 ÷ 12 hours = 1,125 an hour.',
        explanation: 'Divide by hours, not bags.',
      },
      {
        kind: 'mcq',
        prompt: 'Which evidence best supports 1,800 being acceptable to students?',
        options: [
          { text: 'A poll where students said 1,000', why: 'That argues the other way, and it\'s weak evidence.' },
          { text: 'Many already pay 2,400 at the stand and carry it themselves' },
          { text: 'Clinton wants more money', why: 'That\'s his need, not their evidence.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps of Clinton\'s defence.',
        lines: ['State the floor (cost)', 'State the fair-pay line', 'Show the value against the next-best option', 'Name the price and what each side gets'],
      },
      {
        kind: 'typeAnswer',
        prompt: '20 bags at 675 margin. How much margin for the weekend, in FCFA?',
        answers: ['13500', '13,500'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Defend your own price in four lines: floor, fair pay, value against the next-best option, and what each side gets.',
    starters: ['My floor is...', 'The customer gets...'],
  },
  notes: 'Chapter 2 challenge (fictional): 1,800 price → margin 675; 20 bags = 13,500 over 12 hours = 1,125 FCFA/hour; student saves 600 vs Mama Rose\'s 2,400.',
};

export default lesson;
