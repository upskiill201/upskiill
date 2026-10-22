import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: questions',
  summary: 'The dreaded list, five steps for any question, tough questions and "I don\'t know". A quick check before the big day.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Answer questions clearly', 'Handle tough and unknown questions'],
  learn: [
    {
      kind: 'story',
      title: 'Saturday practice',
      beats: [
        { speaker: 'diego', text: 'Ten questions, ten answers, none over 30 seconds. And you said "fair question" to my nastiest one.' },
        { speaker: 'lucia', text: 'I didn\'t even feel defensive. I\'d heard it before.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: questions.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps for any question.',
        lines: ['Listen to the end', 'Repeat it', 'Answer first', 'Keep it short', 'Check and move on'],
      },
      {
        kind: 'mcq',
        prompt: 'Why didn\'t Lucía feel defensive?',
        options: [
          { text: 'Diego was being nice', why: 'She\'d practised it.' },
          { text: 'She\'d practised the question before' },
          { text: 'She didn\'t answer', why: 'She\'d practised it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Tough question or "I don\'t know" question?',
        groups: ['Tough', 'I don\'t know'],
        items: [
          { text: '"Wasn\'t the target too low?"', group: 0 },
          { text: '"What will it sell next year?"', group: 1 },
          { text: '"Isn\'t Monterrey a big risk?"', group: 0 },
          { text: '"What will a rival launch in 2027?"', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Answers should be under how many seconds?',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: 'Someone asked me something I didn\'t know and I just froze.',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'Next time: "I don\'t know yet. What I can say is... I\'ll come back to you by Friday." Then write it down.' },
          { text: 'Make something up next time.', why: 'Say what you know.' },
          { text: 'Avoid questions.', why: 'Prepare the answer pattern.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tough questions.',
        template: '[[1]], answer with one fact, [[2]] back.',
        blanks: [['Acknowledge'], ['bridge']],
        distractors: ['Argue', 'run'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to its job.',
        pairs: [
          ['"Fair question."', 'Lowers the heat'],
          ['"The question is..."', 'Repeats for the room'],
          ['"Does that answer it?"', 'Checks it landed'],
          ['"I don\'t know yet."', 'Honest uncertainty'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Sofía\'s Q&A plan is the mistake?',
        lines: [
          'List the three questions I dread.',
          'Practise a short answer to each.',
          'If I don\'t know, invent a number so I look ready.',
          'Repeat each question before answering.',
        ],
        bug: 2,
        fix: 'Say what I know and promise a follow-up.',
        explanation: 'An invented number can come back to bite.',
      },
      {
        kind: 'mcq',
        prompt: 'What should you do with a rambling question?',
        options: [
          { text: 'Answer every part', why: 'Find the core.' },
          { text: 'Repeat its core in one line, then answer' },
          { text: 'Tell them to be quicker', why: 'Summarise kindly.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many dreaded questions did Lucía practise?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which kind of question worries you most: tough, unknown or rambling? Practise one.',
    starters: ['Most worrying:...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1-4.',
};

export default lesson;
