import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: back on his feet',
  summary: 'Week 10. Kofi is well again, back at lectures, a little thinner. The fund is refilling, the jar is still growing. Check what you know: paying for emergencies, the test, refilling and borrowing well.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Handle an emergency without touching a goal', 'Refill a fund with a clear plan'],
  learn: [
    {
      kind: 'story',
      title: 'Lecture hall',
      beats: [
        { speaker: 'efua', text: 'You look terrible.' },
        { speaker: 'kofi', text: 'Thank you. The laptop jar looks great, though.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the emergency.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Emergency or not?',
        groups: ['Emergency', 'Not an emergency'],
        items: [
          { text: 'Clinic treatment for malaria', group: 0 },
          { text: 'A sale ending tonight', group: 1 },
          { text: 'Urgent bus home for a family crisis', group: 0 },
          { text: 'Exam fees due next month', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Fund target GH₵400, now GH₵100, refilling GH₵50 a week. How many weeks?',
        answers: ['6', 'six', '6 weeks'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'After using the emergency fund, what comes first?',
        options: [
          { text: 'Celebrating with a treat', why: 'Refill first.' },
          { text: 'Locking it so it can\'t be used again', why: 'It must stay reachable.' },
          { text: 'Refilling it, with a set amount and end date' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The emergency test.',
        template: '[[1]], necessary, [[2]].',
        blanks: [['Urgent'], ['unexpected']],
        distractors: ['Cheap', 'planned'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'My friend needs GH₵300 for a clinic bill. He found an app that gives it in 5 minutes.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Great, apps are fast.', why: 'Fast and expensive, with contact-access risks.' },
          { text: 'Tell him to ask the clinic for a payment plan and ask family first. The app is the last option.' },
          { text: 'He should skip the clinic.', why: 'Health first, always.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each cost to its pot.',
        pairs: [
          ['Malaria treatment', 'Emergency fund'],
          ['Exam fees next month', 'Sinking fund'],
          ['Concert tickets', 'Fun line, or wait'],
          ['The laptop', 'Goal jar'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which refill plan will drag on?',
        lines: [
          'Gap GH₵280.',
          'GH₵70 a week for 4 weeks.',
          'Then switch back... someday.',
        ],
        bug: 2,
        fix: 'Switch back in week 13, with a reminder set.',
        explanation: 'Without an end date, the goal stays slowed for longer than needed.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: what makes savings hard to raid at 11 p.m.?',
        options: [
          { text: 'Willpower alone', why: 'Willpower is lowest at 11 p.m.' },
          { text: 'Keeping it in the main wallet', why: 'That makes it easiest to raid.' },
          { text: 'A separate place, no spending link, and a 24-hour rule' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: why build an emergency fund before the goal?',
        options: [
          { text: 'So one bad week can\'t undo months of saving' },
          { text: 'Because it earns more', why: 'It\'s protection, not earnings.' },
          { text: 'It doesn\'t matter which first', why: 'Week 9 shows why it matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 3: GH₵230 on the 1st plus GH₵70 every Sunday for 4 Sundays. Monthly total?',
        answers: ['510', 'GH₵510', '510 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the calmer route when there\'s no fund.',
        lines: ['Ask for a payment plan', 'Ask family, with clear dates', 'Ask school or work support', 'Only then consider a loan, with all questions answered'],
      },
    ],
  },
  reflect: {
    prompt: 'What would your own emergency rules be? Write the three questions somewhere you\'ll see them.',
    starters: ['My rules:...', 'I\'ll keep them...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1–4 with Chapter 1 and 3 review.',
};

export default lesson;
