import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: tell me about yourself',
  summary: 'The four-minute mistake, the stages, the five things interviewers look for, and present, past, future. A quick check before Remi tries his new answer out loud.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain what interviews check', 'Shape a one-minute answer'],
  learn: [
    {
      kind: 'story',
      title: 'Voice note',
      beats: [
        { speaker: 'remi', text: '(voice note) OK, new answer. Present, past, future. 58 seconds.' },
        { speaker: 'ada', text: '58 seconds! And I actually want to ask you about the booking app. That\'s the point.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: tell me about yourself.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the answer.',
        lines: ['Present', 'Past', 'Future'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the stage to what it checks.',
        pairs: [
          ['Screen', 'Clear and interested'],
          ['Technical', 'Can you do the work?'],
          ['Final round', 'How you think with others'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "tell me about yourself" really ask?',
        options: [
          { text: 'Your full life story', why: 'That costs time.' },
          { text: 'Why you fit this role' },
          { text: 'Your salary', why: 'Not at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which of the five is this question testing?',
        groups: ['Want it', 'Grow'],
        items: [
          { text: '"Why this role?"', group: 0 },
          { text: '"What feedback changed how you work?"', group: 1 },
          { text: '"What do you know about us?"', group: 0 },
          { text: '"Tell me about a mistake."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'A friend says just be natural and don\'t prepare.',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Be natural and prepared. Learn the shape and your examples, not a script.' },
          { text: 'Your friend is right.', why: 'Unprepared answers ramble.' },
          { text: 'Memorise every word.', why: 'That sounds robotic.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds was Remi\'s new answer?',
        answers: ['58'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'The shape.',
        template: 'Present, [[1]], [[2]].',
        blanks: [['past'], ['future']],
        distractors: ['hobbies', 'salary'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this answer goes wrong?',
        lines: [
          'I\'m a second-year accounting student.',
          'I run the finance for my hostel\'s welfare fund.',
          'Let me tell you about every subject I\'ve taken.',
          'I want this role to learn how audits really work.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It turns a minute into a lecture.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s a good sign after your answer?',
        options: [
          { text: 'They say "we\'re short on time"', why: 'That\'s what happened to Remi.' },
          { text: 'They ask you more about something you mentioned' },
          { text: 'Total silence', why: 'You want follow-up questions.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many common hiring stages did Ada list?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Say your present, past, future answer to a friend or a mirror. What did they ask you about next?',
    starters: ['They asked about...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1-4.',
};

export default lesson;
