import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: deal sheet v5, the signed deal. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Deal sheet v5',
  summary: 'The final deal sheet: what was quoted, what was offered, every tactic, and what was signed. Tap each line to see the chapter that made it possible.',
  minutes: 11,
  outcomes: [
    'Read a complete record of a hard negotiation',
    'Link each result to a chapter of this course',
    'Use the deal sheet for your own next negotiation',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Arjun\'s deal sheet v5: signed',
      text: 'Quoted £48,000. Offered £28,000, a deadline and a comparison. Tactics logged: flinch, anchor, good cop, higher authority, deadline, competition, nibbles. Unreasonable requests: 14 features became 4; 120 days became 40/30/30. BATNA: Kinwell, £12,000. Walked away at £35,000. Signed: £42,000, phase one plus three months\' support, changes at £450 a day, phase-two review after launch. Arjun keeps £15,000.',
      hotspots: [
        { phrase: 'Offered £28,000, a deadline and a comparison', note: 'Chapter 1: pause, go to the balcony, reply calmly.' },
        { phrase: 'Tactics logged', note: 'Chapter 2: name the tactic, don\'t reward it.' },
        { phrase: '14 features became 4', note: 'Chapter 3: yes-if, trade-offs and the positive no.' },
        { phrase: 'Walked away at £35,000', note: 'Chapter 4: a real BATNA and a polite open door.' },
        { phrase: 'Signed: £42,000', note: 'Chapter 5: a package that beat both sides\' alternatives.' },
        { phrase: 'Arjun keeps £15,000', note: '£3,000 more than Kinwell, with a big reference and phase two ahead.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Keep your head, name the tactic, say yes-if, know your BATNA, package and sign. One sheet for every hard deal.',
    },
  ],
  apply: {
    scenario: 'Deal sheet v5.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the result to the chapter.',
        pairs: [
          ['Calm reply to £28,000', 'Chapter 1'],
          ['Tactic log', 'Chapter 2'],
          ['4 features, not 14', 'Chapter 3'],
          ['Walk-away at £35,000', 'Chapter 4'],
          ['£42,000 package', 'Chapter 5'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Arjun keeps £15,000; Kinwell would have given £12,000. How much better, in pounds?',
        answers: ['3000', '3,000', '£3,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What turned 120-day payment terms into 40/30/30?',
        options: [
          { text: 'A positive no: yes to paying the team, no to 120 days, then an offer' },
          { text: 'A threat', why: 'It was a positive no.' },
          { text: 'Giving in', why: 'He held the line with an offer.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter\'s skill?',
        groups: ['Keep your head', 'Tactics', 'Power'],
        items: [
          { text: 'Going to the balcony', group: 0 },
          { text: 'Testing a deadline', group: 1 },
          { text: 'Making Kinwell real', group: 2 },
          { text: 'Spotting good cop / bad cop', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'We quoted £48,000 and signed £42,000. Did we lose?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'No. £42,000 for less scope plus support, £15,000 kept, a better deal than our BATNA, and a client who wants phase two.' },
          { text: 'Yes, we lost £6,000.', why: 'The scope changed too.' },
          { text: 'We should have held at £48,000.', why: 'The package beat both alternatives.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The signed deal.',
        template: 'Phase one plus three months\' [[1]], changes at £450 a [[2]].',
        blanks: [['support'], ['day']],
        distractors: ['holiday', 'week'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many tactics are on the log?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this copy of the deal sheet is wrong?',
        lines: [
          'Quoted £48,000.',
          'BATNA: Kinwell, £12,000.',
          'Accepted £35,000 to keep the client.',
          'Signed £42,000 with support.',
        ],
        bug: 2,
        fix: 'Walked away at £35,000.',
        explanation: 'He declined £35,000; that\'s what brought them back.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the most important line for the next negotiation?',
        options: [
          { text: 'The phase-two review after launch' },
          { text: 'The first offer of £28,000', why: 'That\'s history now.' },
          { text: 'The tactics log only', why: 'Useful, but phase two is next.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the course\'s journey.',
        lines: ['Keep your head', 'Name the tactic', 'Handle unreasonable requests', 'Use your power', 'Close fairly'],
      },
    ],
  },
  reflect: {
    prompt: 'Make a deal sheet v5 for a hard negotiation you\'ve had, or one coming up.',
    starters: ['Offered:...', 'Tactics:...', 'My BATNA:...'],
  },
  notes: 'Deal sheet v5 (fictional) summarises the course: £48,000 quote → £28,000 offer → £42,000 signed (phase one + 3 months\' support); Arjun keeps £15,000 vs £12,000 BATNA.',
};

export default lesson;
