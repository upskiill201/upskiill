import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Before/After: one number vs a range. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'One number vs a range',
  summary: 'Ada drafts her logo quote as a range: "₦100,000 to ₦150,000". Lucía spots the problem at once. Ranges can work, but only one kind.',
  minutes: 12,
  outcomes: [
    'Know the three kinds of range offer',
    'Use a bolstering range that starts at your goal',
    'Avoid a range that starts with a concession',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'A range that gives money away vs one that doesn\'t',
      before: {
        label: 'Backdown range',
        text: '"The logo would be ₦100,000 to ₦150,000."\nMrs Okon hears one number: ₦100,000.\nAda has offered a discount before anyone asked.',
      },
      after: {
        label: 'Bolstering range',
        text: '"The logo is ₦150,000 to ₦180,000, depending on how many revisions you\'d like and which files you need."\nThe bottom of the range is Ada\'s goal.\nThe top is a reason to choose more, not a starting point to bargain down from.',
      },
      notes: [
        'Daniel Ames and Malia Mason (2015) found that a range starting at your goal and going up did as well as, or better than, a single number, and seemed more polite.',
        'Ranges that start below your goal ("backdown" ranges) got worse deals.',
        'Tie the range to something real: revisions, files, speed.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'If you give a range, make the bottom your goal, and tie the top to something extra.',
    },
  ],
  apply: {
    scenario: 'The logo range.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Ada\'s goal is ₦150,000. Which is a bolstering range?',
        options: [
          { text: '₦100,000 to ₦150,000', why: 'That\'s a backdown range; it starts below her goal.' },
          { text: '₦120,000 to ₦180,000', why: 'That brackets her goal; the bottom is below it.' },
          { text: '₦150,000 to ₦180,000' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Bolstering or backdown range? (Goal: ₦480,000)',
        groups: ['Bolstering', 'Backdown'],
        items: [
          { text: '₦480,000 to ₦520,000', group: 0 },
          { text: '₦430,000 to ₦480,000', group: 1 },
          { text: '₦480,000 to ₦500,000', group: 0 },
          { text: '₦400,000 to ₦480,000', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a range like "₦100,000 to ₦150,000", which number will the other side usually hear? Type it.',
        answers: ['100000', '100,000', '₦100,000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the range type to its effect.',
        pairs: [
          ['Bolstering', 'Starts at your goal, goes up'],
          ['Bracketing', 'Goal in the middle'],
          ['Backdown', 'Starts with a concession'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why not just give one number?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Single numbers never work.', why: 'They work well; ranges are an option.' },
          { text: 'One number is fine too. A bolstering range adds a polite choice, and the top end rewards her for wanting more.' },
          { text: 'Always give a wide range.', why: 'Only if it starts at your goal.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Make the [[1]] of the range your goal, and tie the top to something [[2]].',
        blanks: [['bottom'], ['extra', 'more']],
        distractors: ['middle', 'secret'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did range offers seem more polite in Ames and Mason\'s studies?',
        options: [
          { text: 'They look flexible, so a harsh counter-offer feels rude' },
          { text: 'They are always lower', why: 'Bolstering ranges aren\'t lower.' },
          { text: 'Nobody notices them', why: 'People notice both ends.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s quote gives money away?',
        lines: [
          'Thank you for thinking of me.',
          'The logo is ₦150,000 to ₦180,000.',
          'It depends on revisions and files.',
          'But I could do ₦100,000 if that\'s easier.',
        ],
        bug: 3,
        fix: 'Delete it.',
        explanation: 'It turns her range into a backdown range.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s range is ₦150,000 to ₦180,000. How wide is it, in naira?',
        answers: ['30000', '30,000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to build a range offer.',
        lines: ['Set your goal', 'Make it the bottom of the range', 'Pick a higher top', 'Tie the top to something extra'],
      },
    ],
  },
  reflect: {
    prompt: 'For your own ask, write a bolstering range. What extra justifies the top end?',
    starters: ['My range:...', 'The top end includes...'],
  },
  deepen: {
    title: 'Tandem anchoring',
    summary: 'Ames and Mason called it tandem anchoring: people listen to both ends of a range. A bolstering range nudges counter-offers up, and seems polite at the same time.',
  },
  notes: 'Ames & Mason (2015), "Tandem anchoring: Informational and politeness effects of range offers in social exchange", JPSP 108(2): bolstering ranges matched or beat point offers and seemed more polite; backdown ranges underperformed. Fictional logo goal ₦150,000.',
};

export default lesson;
