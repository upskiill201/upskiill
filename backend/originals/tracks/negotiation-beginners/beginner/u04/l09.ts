import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: ask card v4, the rent package. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ask card v4',
  summary: 'Friday night before the second rent meeting. Ada\'s ask card now has questions, issues, three packages and a fair standard. Tap each line to see why.',
  minutes: 11,
  outcomes: [
    'Read an ask card built for trading',
    'Link each line to a lesson from this chapter',
    'Add issues and packages to your own card',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s ask card v4: the rent, round two',
      text: 'Open with questions: what made you decide on the rise, and what worries you? Issues: rent, lease length, repairs, payment timing. Fair standard: similar flats rent for ₦1,300,000 to ₦1,450,000; my neighbour renewed at ₦1,350,000. Packages: A ₦1,400,000 for one year; B ₦1,350,000 for two years; C ₦1,320,000 for two years, I handle small repairs. Never give away: the two-year lease on its own. Walk-away (private): ₦1,450,000.',
      hotspots: [
        { phrase: 'Open with questions', note: 'Lesson 3: find his interests before proposing anything.' },
        { phrase: 'Issues: rent, lease length, repairs, payment timing', note: 'Lesson 4: four issues to trade, not one number to split.' },
        { phrase: 'my neighbour renewed at ₦1,350,000', note: 'Lesson 7: a fair standard he can agree with.' },
        { phrase: 'Packages:', note: 'Lesson 6: three offers, all fine for Ada. His choice shows his priorities.' },
        { phrase: 'Never give away: the two-year lease on its own', note: 'Lesson 5: trade it, never give it free.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v4 adds questions, issues, packages and fair standards: the tools for making the deal bigger.',
    },
  ],
  apply: {
    scenario: 'Ask card v4.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the card line to the lesson.',
        pairs: [
          ['Open with questions', 'Questions that find interests'],
          ['Four issues', 'Things you value differently'],
          ['Three packages', 'Several offers at once'],
          ['Neighbour\'s renewal', 'Fair standards'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s new on v4?',
        options: [
          { text: 'Questions, issues to trade, packages and fair standards' },
          { text: 'A lower walk-away', why: 'The walk-away stays the same.' },
          { text: 'Nothing', why: 'v4 adds the trading tools.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Package C: ₦1,320,000 for two years. Total, in naira?',
        answers: ['2640000', '2,640,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Say it in the meeting, or keep it private?',
        groups: ['Say it', 'Private'],
        items: [
          { text: 'The three packages', group: 0 },
          { text: 'The ₦1,450,000 walk-away', group: 1 },
          { text: 'The neighbour\'s renewal', group: 0 },
          { text: 'How much she wants to stay', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I start with the packages?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Start with questions. His answers might change which packages you offer.' },
          { text: 'Yes, packages first, no questions.', why: 'Questions first reveal his interests.' },
          { text: 'Skip the packages.', why: 'They\'re her strongest tool.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The order.',
        template: 'First [[1]], then [[2]].',
        blanks: [['questions'], ['packages', 'offers']],
        distractors: ['threats', 'apologies'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "never give away the two-year lease on its own" on the card?',
        options: [
          { text: 'It\'s her best trade; giving it free wastes it' },
          { text: 'She doesn\'t want two years', why: 'She does; she wants something for it.' },
          { text: 'It\'s illegal', why: 'It\'s strategy.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this ask card copy is wrong?',
        lines: [
          'Open with questions.',
          'Package B: ₦1,350,000 for two years.',
          'Package D: ₦1,500,000 for one year.',
          'Walk-away: ₦1,450,000 (private).',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: '₦1,500,000 is above her walk-away; every package must be fine for her.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many issues are listed on the card?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the meeting plan.',
        lines: ['Ask questions', 'Name the fair standard', 'Offer the packages', 'Trade, never give away'],
      },
    ],
  },
  reflect: {
    prompt: 'Add issues, two packages and a fair standard to your own ask card.',
    starters: ['Issues:...', 'Packages:...'],
  },
  notes: 'Ask card v4 (fictional): packages A ₦1,400,000/1 yr, B ₦1,350,000/2 yrs, C ₦1,320,000/2 yrs + small repairs; market ₦1,300,000–₦1,450,000; neighbour ₦1,350,000.',
};

export default lesson;
