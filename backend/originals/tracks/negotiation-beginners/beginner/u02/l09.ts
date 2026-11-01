import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: ask card v2, the rent. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ask card v2',
  summary: 'Friday night. Ada\'s ask card for the rent is now a real plan. Tap each line to see where it came from.',
  minutes: 11,
  outcomes: [
    'Read a full preparation for one negotiation',
    'Link each line to a lesson from this chapter',
    'Build version 2 of your own ask card',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s ask card v2: the rent',
      text: 'Goal: ₦1,300,000 a year. Evidence: similar flats rent for ₦1,300,000 to ₦1,450,000. My interests: stay near work, a stable budget, no moving costs. My BATNA: the flat near work, about ₦1,450,000 a year with fees. Walk-away (private): ₦1,450,000. His interests: cover rising costs, no empty months, rent on time. What I can offer: a two-year lease, rent on the 1st. First line: "I\'d like to stay. Can we find a rent that works for both of us?"',
      hotspots: [
        { phrase: 'Goal: ₦1,300,000 a year', note: 'Lesson 6: ambitious, but at the bottom of a real range.' },
        { phrase: 'My BATNA', note: 'Lesson 4: costed honestly over two years, fees included.' },
        { phrase: 'Walk-away (private)', note: 'Lesson 8: shared with nobody, decided before Saturday.' },
        { phrase: 'no empty months', note: 'Lesson 7: empty months could cost him about ₦350,000.' },
        { phrase: 'a two-year lease', note: 'Lesson 3: an option that fits his interests, not just a lower number.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A good ask card has a goal, evidence, both sides\' interests, your BATNA, a private walk-away, and something you can offer.',
    },
  ],
  apply: {
    scenario: 'Ask card v2.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the lesson it came from.',
        pairs: [
          ['Evidence', 'Finding a fair number'],
          ['BATNA', 'Your alternative'],
          ['His interests', 'Their side of the table'],
          ['What I can offer', 'Positions vs interests'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s new on v2 compared with v1?',
        options: [
          { text: 'Nothing', why: 'v1 had only wants and first lines.' },
          { text: 'Numbers, evidence, a BATNA, both sides\' interests and offers' },
          { text: 'Only the first line', why: 'Most of the plan is new.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Something Ada will say, or keep private?',
        groups: ['Say', 'Private'],
        items: [
          { text: 'Her wish to stay', group: 0 },
          { text: 'Her ₦1,450,000 walk-away', group: 1 },
          { text: 'The two-year lease idea', group: 0 },
          { text: 'How much his empty months would cost him', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the bottom of the market range on the card, in naira?',
        answers: ['1300000', '1,300,000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'My first line doesn\'t mention a number. Is that weak?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Yes, open with ₦1,000,000.', why: 'An unbacked low number damages trust.' },
          { text: 'Never mention a number.', why: 'She will, after the opening.' },
          { text: 'No. It starts on the same side of the table. The number comes next, with your evidence. That\'s Chapter 3.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The first line.',
        template: '"I\'d like to [[1]]. Can we find a rent that works for [[2]] of us?"',
        blanks: [['stay'], ['both']],
        distractors: ['leave', 'none'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "rent on the 1st" on the card?',
        options: [
          { text: 'It\'s a legal requirement', why: 'It\'s an offer, not a rule.' },
          { text: 'It costs Ada little but eases one of his worries' },
          { text: 'It\'s irrelevant', why: 'On-time rent is one of his interests.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this ask card copy is wrong?',
        lines: [
          'Goal: ₦1,300,000.',
          'BATNA: the flat near work.',
          'Walk-away: tell him at the start.',
          'Offer: a two-year lease.',
        ],
        bug: 2,
        fix: 'Walk-away: private.',
        explanation: 'Shared walk-aways become the deal.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the ask card from top to bottom.',
        lines: ['Goal', 'Evidence', 'My interests', 'My BATNA', 'Walk-away', 'His interests', 'What I can offer', 'First line'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many years is the lease Ada can offer?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write version 2 of your own ask card for one real negotiation.',
    starters: ['Goal:...', 'What I can offer:...'],
  },
  notes: 'Ask card v2 (fictional). Figures from Chapter 2: range ₦1,300,000–₦1,450,000; BATNA ≈ ₦1,450,000/yr; landlord vacancy cost ≈ ₦350,000.',
};

export default lesson;
