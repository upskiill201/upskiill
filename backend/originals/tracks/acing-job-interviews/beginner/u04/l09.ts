import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: interview card v4, hard questions. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Interview card v4',
  summary: 'Remi adds a hard-questions section to his card: his weakness, his salary range, his redirect and his stuck routine. Tap each line.',
  minutes: 11,
  outcomes: [
    'Add hard-question answers to your interview card',
    'Link each line to a lesson from this chapter',
    'Keep every answer short and honest',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Remi\'s interview card v4: hard questions',
      text: 'Weakness: too relaxed about deadlines; weekly goals now; last two projects early. Salary: market 25,000 to 40,000; mine 30,000 to 35,000, flexible for the right role. Stuck: clarify, simple first, small example, improve out loud, ask. Personal questions: "I\'d rather keep the focus on the role." Why hire me: real users, small shops, fast learner. Five years: growing as a developer for small businesses.',
      hotspots: [
        { phrase: 'Weakness: too relaxed about deadlines', note: 'Lesson 3: real, safe and improving.' },
        { phrase: 'mine 30,000 to 35,000', note: 'Lesson 4: a researched range starting at a fair target.' },
        { phrase: 'Stuck:', note: 'Lesson 2: think out loud; asking is fine, silence isn\'t.' },
        { phrase: '"I\'d rather keep the focus on the role."', note: 'Lesson 6: a calm redirect.' },
        { phrase: 'Why hire me:', note: 'Lesson 8: strengths matched to the ad, with proof.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v4 adds: weakness, salary range, the stuck routine, a redirect, and short answers to tricky questions.',
    },
  ],
  apply: {
    scenario: 'Interview card v4.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the card line to the lesson.',
        pairs: [
          ['Weakness', 'A real weakness'],
          ['Salary', 'The salary question'],
          ['Stuck routine', 'Thinking out loud'],
          ['Redirect', 'Questions that shouldn\'t be asked'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the top of Remi\'s own salary range, in KES?',
        answers: ['35000', '35,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s new on v4?',
        options: [
          { text: 'Answers for the hard questions' },
          { text: 'The story bank', why: 'That was v3.' },
          { text: 'Company research', why: 'That was v2.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'On v4, or from an earlier version?',
        groups: ['New on v4', 'Earlier'],
        items: [
          { text: 'Salary range', group: 0 },
          { text: 'One-minute answer', group: 1 },
          { text: 'Stuck routine', group: 0 },
          { text: 'Six STAR stories', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'My card is getting long. Is that a problem?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Yes, delete half.', why: 'Keywords, not deletion.' },
          { text: 'Make it 20 pages.', why: 'One page.' },
          { text: 'Keep it to a page of keywords. You\'re not reading it in the interview; it\'s how you prepare.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The weakness line.',
        template: 'Too relaxed about [[1]]; weekly [[2]] now.',
        blanks: [['deadlines'], ['goals']],
        distractors: ['lunch', 'naps'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the salary line a range, not a single number?',
        options: [
          { text: 'He doesn\'t know what he wants', why: 'The bottom is a real target.' },
          { text: 'It shows research and room to talk, starting at a fair target' },
          { text: 'Ranges are required', why: 'It\'s a choice.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this copy of v4 is wrong?',
        lines: [
          'Weakness: too relaxed about deadlines; weekly goals.',
          'Salary: anything is fine.',
          'Stuck: think out loud.',
          'Five years: growing as a developer.',
        ],
        bug: 1,
        fix: 'Salary: 30,000 to 35,000, flexible for the right role.',
        explanation: 'That\'s the round-two mistake.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps are in Remi\'s stuck routine?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the hard-question section.',
        lines: ['Weakness', 'Salary', 'Stuck routine', 'Personal questions', 'Why hire me', 'Five years'],
      },
    ],
  },
  reflect: {
    prompt: 'Add a hard-questions section to your own interview card.',
    starters: ['Weakness:...', 'Salary:...'],
  },
  notes: 'Interview card v4 (fictional) adds hard-question answers.',
};

export default lesson;
