import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: GH₵2,000',
  summary: 'Week 15. The jar crosses GH₵2,000. Kelewele with Efua, as planned. Check what you know: earning a little more, windfalls, motivation and future-you.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use extra income and windfalls well', 'Keep going through the boring middle'],
  learn: [
    {
      kind: 'story',
      title: 'Milestone',
      beats: [
        { speaker: 'efua', text: 'GH₵2,000. Kelewele is on you. Fun line, I assume?' },
        { speaker: 'kofi', text: 'Fun line. Planned. Delicious.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the last stretch.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How should you price paid work?',
        options: [
          { text: 'Whatever the first buyer offers', why: 'That\'s pricing by habit.' },
          { text: 'By value and what others charge, with a clear offer' },
          { text: 'As high as possible', why: 'Too high loses the work.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the windfall steps.',
        lines: ['Wait a day', 'Check what\'s urgent', 'Split on purpose', 'Honour the giver', 'Move it the same day'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A GH₵600 windfall, two-thirds to the goal. How much to the goal?',
        answers: ['400', 'GH₵400', '400 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each motivation tool to its use.',
        pairs: [
          ['Milestones', 'Wins along the way'],
          ['Planned rewards', 'Fun from the fun line'],
          ['Fresh start', 'Restart on Monday'],
          ['Letter from future-you', 'Makes the goal real'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Hit GH₵2,000! Should I celebrate with something from the jar?',
        prompt: 'Efua\'s best reply?',
        options: [
          { text: 'Yes, take GH₵200.', why: 'That moves the goal further away.' },
          { text: 'No celebrations.', why: 'Planned rewards keep you going.' },
          { text: 'Celebrate from the fun line, as planned. The jar is for the laptop.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Found money.',
        template: 'Windfalls feel [[1]], so they get spent [[2]].',
        blanks: [['free', 'extra'], ['fast']],
        distractors: ['heavy', 'slowly'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps future-you feel real, or not?',
        groups: ['Helps', 'Doesn\'t help'],
        items: [
          { text: 'A letter dated the goal day', group: 0 },
          { text: '"Things will work out somehow"', group: 1 },
          { text: 'Picturing the exact day', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan for extra income could backfire?',
        lines: [
          'Charge GH₵150 with a clear offer.',
          'Decide where the money goes before it lands.',
          'Take every beat request, even during exams.',
        ],
        bug: 2,
        fix: 'Take only what fits around studying.',
        explanation: 'Extra income shouldn\'t cost the degree.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 4: what\'s the emergency test?',
        options: [
          { text: 'Expensive and urgent', why: 'Expensive isn\'t part of the test.' },
          { text: 'Urgent, necessary and unexpected' },
          { text: 'Anything a seller says is urgent', why: 'Seller urgency is fake urgency.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: when should savings move?',
        options: [
          { text: 'At month end', why: 'That\'s "save what\'s left".' },
          { text: 'When you remember', why: 'Remembering fails.' },
          { text: 'Automatically, when money arrives' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 2: at GH₵37.50 an hour, how many hours is GH₵150?',
        answers: ['4', 'four', '4 hours'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s your next milestone, and its planned reward?',
    starters: ['My next milestone:...', 'Reward:...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1–4 with review from Chapters 2–4. Week 15 jar ≈ 2,055 + beat payments arriving → "crosses GH₵2,000".',
};

export default lesson;
