import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Chapter Challenge: Pauline and Wanjiku clash in the workshop. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the clash',
  summary: 'Week 4, Monday. The workshop is going perfectly. Then the open question. Pauline: "We tell customers 5-day refunds now. It\'s a win." Wanjiku: "We tell them nothing until the test is done." Everyone looks at Remi. Brian, as promised, says nothing.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 3 tool in one live moment',
    'Handle a clash between two allies without picking a side',
    'End the meeting with a decision both can back',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 4, Monday, 10:40 a.m.',
      beats: [
        { speaker: 'pauline', text: 'Customers have waited 21 days for years. We tell them now: five-day refunds are coming. It\'s the best news we\'ve had all year.' },
        { speaker: 'wanjiku', text: 'And if the test fails? Then we\'ve promised something we can\'t do, in writing, to our biggest customers.' },
        { speaker: 'narrator', text: 'Pauline\'s arms are folded. Wanjiku\'s glasses are off. Felix studies the ceiling. Emeka has politely muted himself. Brian keeps his promise and says nothing.' },
        { speaker: 'narrator', text: 'Ten minutes left on the timer. Both of them are right about something. You\'re with Remi.' },
      ],
    },
  ],
  apply: {
    scenario: 'The workshop, 10:40 a.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Remi do first?',
        options: [
          { text: 'Name what each one is protecting: Pauline wants customers to feel the win; Wanjiku wants no broken promises' },
          { text: 'Pick Pauline\'s side: good news is good', why: 'Picking a side loses the other ally.' },
          { text: 'Park it for next week', why: 'It\'s THE decision for today. Park it and nothing goes out.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Whose interest is it?',
        groups: ['Pauline', 'Wanjiku', 'Both'],
        items: [
          { text: 'Customers feel progress now', group: 0 },
          { text: 'No promise we can\'t keep', group: 1 },
          { text: 'Keeping Mama Mboga Fresh', group: 2 },
          { text: 'The satisfaction score', group: 0 },
          { text: 'A clean audit', group: 1 },
          { text: 'Synergix\'s reputation', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'pauline',
        message: 'So are we telling them or not?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Not. Wanjiku\'s right.', why: 'Picks a winner and loses Pauline.' },
          { text: 'Yes. Pauline\'s right.', why: 'Picks a winner and loses Wanjiku.' },
          { text: 'What if we tell them what\'s true today: "We\'re fixing refunds. You\'ll hear from us on the 30th with a firm date." Progress, and no promise we can\'t keep.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Look for the shared ___ behind the two positions. (one word)',
        answers: ['interest', 'Interest', 'goal'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s ten minutes in order.',
        lines: ['Name what each one protects', 'Say the shared goal', 'Offer an option for both', 'Get owners and a date'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Remi ask Brian to stay quiet, even now?',
        options: [
          { text: 'Brian has no opinion', why: 'He does. It just goes last.' },
          { text: 'To avoid blame', why: 'It\'s about ownership.' },
          { text: 'If the senior person decides, the two allies don\'t own the answer' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'The decision Remi reads out. Which line breaks Chapter 3?',
        lines: [
          'Pauline drafts the "we\'re fixing it" message by Wednesday.',
          'Wanjiku checks it says nothing we can\'t keep.',
          'And we\'ll sort out the firm date at some point.',
        ],
        bug: 2,
        fix: 'On the 30th, after the test, Pauline sends the firm date.',
        explanation: '"At some point" is a vague yes. Give it a when.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to the moment.',
        pairs: [
          ['Interests, not positions', 'Naming what each protects'],
          ['Shared goal', '"Within 5 days, no new errors"'],
          ['Implementation intention', '"On the 30th, Pauline sends it"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'After the meeting, what\'s the best thing Remi can do for Pauline and Wanjiku?',
        options: [
          { text: 'Tell Brian who "won"', why: 'Nobody won. Both got something.' },
          { text: 'Thank both privately, and tell each that the other was right about something' },
          { text: 'Nothing, it\'s settled', why: 'A private thank-you keeps both allies.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3, in one line.',
        template: 'One shared [[1]]. No [[2]] in the room. People back what they [[3]].',
        blanks: [['goal'], ['surprises'], ['build']],
        distractors: ['boss', 'buy'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the customer message.',
        tiles: ['We\'re', 'fixing', 'refunds.', 'Firm', 'date', 'on', 'the', '30th.'],
        distractors: ['tomorrow.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of two people you respect who disagree. What is each one protecting? Is there an option that gives both what they need?',
    starters: ['One is protecting...', 'The other is protecting...', 'An option: ...'],
  },
  deepen: {
    title: 'Next: Week 5',
    summary: 'Two weeks later, the numbers are moving: 21 days down to 11. Then Felix sends a one-line message on Monday morning: "IT leadership just froze all changes until next quarter. Sorry." Chapter 4: When it stalls.',
  },
  notes: 'Chapter 3 challenge. Mediating between two allies using interests (Fisher & Ury), shared goal, facilitation and implementation intentions. Fictional events.',
};

export default lesson;
