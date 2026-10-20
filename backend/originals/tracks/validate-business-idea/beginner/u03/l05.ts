import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: how many?',
  summary: 'Count the people you can reach, size it bottom-up in four steps, and plan with what you can win. Quick check before Clinton meets his biggest competitor.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Size a market bottom-up without notes', 'Tell total, reachable and winnable apart'],
  learn: [
    {
      kind: 'story',
      title: 'One page of sums',
      beats: [
        { speaker: 'narrator', text: 'David\'s page: 2,000 reachable, 800 who pay, 2.4 million reachable, 360,000 winnable. Every number has a source written next to it.' },
        { speaker: 'david', text: 'Now: who are they paying today, and why would they switch to you?' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: how many?',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '30 hostels with 40 rooms each. How many students can be reached?',
        answers: ['1200', '1,200'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which estimate is bottom-up?',
        options: [
          { text: 'Hostels counted × rooms × shares from interviews' },
          { text: '10% of all students', why: 'Top-down with a guessed share.' },
          { text: '1% of the national market', why: 'Top-down.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Total, reachable or winnable?',
        groups: ['Total', 'Reachable', 'Winnable'],
        items: [
          { text: 'All students who do laundry', group: 0 },
          { text: 'Hostel students near campus who pay sometimes', group: 1 },
          { text: 'What one bicycle can carry this month', group: 2 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '500 customers, twice a month, 1,000 FCFA each time. How much a month, in FCFA?',
        answers: ['1000000', '1,000,000', '1 million'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['10% of everyone', 'A guess wearing a number'],
          ['Bottom-up', 'Every number has a source'],
          ['Customers × times × price', 'Money per month'],
          ['Winnable', 'What you plan with'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I\'ll tell Miracle the market is 2.4 million and leave it there.',
        prompt: "David's best reply?",
        options: [
          { text: 'Tell her both: 2.4 million reachable, about 360,000 a month winnable with one bike. She\'ll trust you more.' },
          { text: 'Yes, the bigger the better.', why: 'Leaving out the realistic number misleads everyone, including you.' },
          { text: 'Don\'t mention numbers.', why: 'Numbers with sources are the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which step of this estimate is a guess?',
        lines: [
          'Reach: 25 hostels counted × 40 rooms = 1,000.',
          'Problem: 60% from interviews.',
          'Pay: 75% because people love convenience.',
          'Frequency: twice a month, from payers.',
        ],
        bug: 2,
        fix: 'Pay: use the share who already pay, from interviews (40%).',
        explanation: '"People love convenience" isn\'t a source.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The formula.',
        template: 'Customers × [[1]] per month × [[2]].',
        blanks: [['times'], ['price']],
        distractors: ['likes', 'hostels'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the four sizing steps.',
        lines: ['Count who you can reach', 'Apply who has the problem', 'Apply who already pays', 'Multiply by how often and the price'],
      },
      {
        kind: 'mcq',
        prompt: 'What is 40% of 1,000?',
        options: [
          { text: '400' },
          { text: '40', why: '40% of 100 is 40.' },
          { text: '4,000', why: '40% is less than the whole.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Check your own market size from lesson 3. Which number would David challenge first?',
    starters: ['He\'d challenge...', 'I could check it by...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4. 30 × 40 = 1,200; 500 × 2 × 1,000 = 1,000,000 FCFA.',
};

export default lesson;
