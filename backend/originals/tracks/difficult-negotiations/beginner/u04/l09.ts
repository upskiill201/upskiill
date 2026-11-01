import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: deal sheet v4. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Deal sheet v4',
  summary: 'Thursday night. The deal sheet now has a real BATNA, a walk-away built on it, their alternatives, and the walk-away email ready. Tap each line.',
  minutes: 11,
  outcomes: [
    'Read a deal sheet built for a walk-or-stay decision',
    'Link each line to a lesson from this chapter',
    'Add BATNA and walk-away planning to your own sheet',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Arjun\'s deal sheet v4',
      text: 'Phase one cost: £25,000. Our BATNA: Kinwell extension, keeps £12,000; two proposals sent. Walk-away (private): £37,000. Their alternatives: a new agency, weeks of setup, risk of missing spring; the board saw our demo. Test: do the other quotes include till integration and 12 weeks? If £35,000 stays: decline politely, open door at around £40,000. Never: bluff, insult, go silent.',
      hotspots: [
        { phrase: 'Kinwell extension, keeps £12,000', note: 'Lesson 3: made real with one phone call.' },
        { phrase: 'Walk-away (private): £37,000', note: '£25,000 costs plus the £12,000 he\'d keep at Kinwell.' },
        { phrase: 'risk of missing spring', note: 'Lesson 4: switching isn\'t free for them.' },
        { phrase: 'do the other quotes include till integration and 12 weeks?', note: 'Lesson 4: test claims like for like.' },
        { phrase: 'decline politely, open door at around £40,000', note: 'Lesson 8: a walk-away that leaves a path back.' },
        { phrase: 'Never: bluff, insult, go silent', note: 'Lesson 7: credibility is power.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v4 adds the BATNA, its value, a walk-away built on it, their alternatives, and the walk-away plan.',
    },
  ],
  apply: {
    scenario: 'Deal sheet v4.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the lesson.',
        pairs: [
          ['Kinwell extension', 'Make your alternative stronger'],
          ['Risk of missing spring', 'Their alternatives'],
          ['Decline politely', 'How to walk away well'],
          ['Never bluff', 'Power myths'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '£25,000 costs plus £12,000 BATNA value. Walk-away, in pounds?',
        answers: ['37000', '37,000', '£37,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What will Arjun do if Friday stays at £35,000?',
        options: [
          { text: 'Decline politely, with an open door at around £40,000' },
          { text: 'Accept', why: 'It\'s below his walk-away.' },
          { text: 'Go silent', why: 'That\'s on the "never" list.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Arjun\'s power, or their weakness?',
        groups: ['Arjun\'s power', 'Their weakness'],
        items: [
          { text: 'Kinwell\'s offer', group: 0 },
          { text: 'Risk of missing spring', group: 1 },
          { text: 'Two proposals out', group: 0 },
          { text: 'A new agency\'s setup time', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Could we lower the walk-away to £35,000, just this once?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Sure, why not.', why: 'Then the walk-away means nothing.' },
          { text: 'Raise it to £48,000.', why: 'It should match the BATNA, not a wish.' },
          { text: 'Only if something real changes, like Kinwell falling through. The walk-away comes from the BATNA, not from wanting the deal.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'What v4 adds.',
        template: 'The [[1]], its value, and a walk-away [[2]] on it.',
        blanks: [['BATNA', 'alternative'], ['built', 'based']],
        distractors: ['logo', 'guessed'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "the board saw our demo" on the sheet?',
        options: [
          { text: 'To brag', why: 'It\'s a source of power.' },
          { text: 'It raises Harlow & Finch\'s cost of switching agencies' },
          { text: 'No reason', why: 'It matters to their alternatives.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this deal sheet copy is wrong?',
        lines: [
          'BATNA: Kinwell, keeps £12,000.',
          'Walk-away: £37,000, private.',
          'If £35,000 stays: say Amazon wants us.',
          'Open door at around £40,000.',
        ],
        bug: 2,
        fix: 'If £35,000 stays: decline politely.',
        explanation: 'A bluff breaks the "never" list.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many proposals has Arjun sent to old leads?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the deal sheet v4 sections.',
        lines: ['Phase one cost', 'Our BATNA', 'Walk-away', 'Their alternatives', 'What to test', 'The walk-away plan'],
      },
    ],
  },
  reflect: {
    prompt: 'Add BATNA, walk-away and a walk-away plan to your own deal sheet.',
    starters: ['BATNA:...', 'If they don\'t move, I will...'],
  },
  notes: 'Deal sheet v4 (fictional): costs £25,000; Kinwell BATNA £12,000; walk-away £37,000; open door at ~£40,000.',
};

export default lesson;
