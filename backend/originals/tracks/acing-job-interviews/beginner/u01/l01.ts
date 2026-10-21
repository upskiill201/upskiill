import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: four minutes. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Four minutes',
  summary: 'Remi\'s first ever interview: a phone screen with Savanna Bank. The first question is easy: "Tell me about yourself." Four minutes later, he\'s still talking about his first computer.',
  minutes: 11,
  outcomes: [
    'See why "tell me about yourself" matters so much',
    'Notice what rambling costs in an interview',
    'Know what this course covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The phone screen',
      beats: [
        { speaker: 'narrator', text: 'Remi, 21, final-year computer science in Nairobi. Three internship interviews in the next five weeks. First: Savanna Bank.' },
        { speaker: 'narrator', text: '"So, Remi, tell me about yourself." He starts with his first computer, aged nine. Then his uncle\'s cyber café.' },
        { speaker: 'narrator', text: 'Four minutes later he reaches his degree. The interviewer says, "Thanks, we\'re a bit short on time," and skips two questions.' },
        { speaker: 'remi', text: '(voice note to Ada, after) I think I talked for too long. Is that bad?' },
        { speaker: 'ada', text: 'Ha. Probably. "Tell me about yourself" isn\'t your life story. It\'s why you fit this job, in about a minute.' },
        { speaker: 'tey', text: 'This course: how interviews work, research, a bank of true stories, the hard questions, and the final round.' },
      ],
      choice: {
        prompt: 'What should Remi\'s answer have focused on?',
        options: [
          { text: 'Who he is now, what he\'s done that fits the role, and why he wants this internship', outcome: 'Right. Present, past, future, in about a minute, all pointed at the job.', best: true },
          { text: 'His whole life, in order, so they know him properly', outcome: 'That\'s what he did. They wanted relevance, not a biography.' },
          { text: 'His hobbies, to seem friendly', outcome: 'A little personality is fine, but they need to know why he fits.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '"Tell me about yourself" means: why do you fit this role? Answer in about a minute.',
    },
  ],
  apply: {
    scenario: 'The phone screen.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did Remi talk for in his first answer?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does "tell me about yourself" really ask?',
        options: [
          { text: 'Why you fit this role, briefly' },
          { text: 'Your life story from childhood', why: 'That\'s what Remi gave; it cost him time.' },
          { text: 'Your hobbies', why: 'Some colour is fine; fit is the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful in this answer, or not really?',
        groups: ['Useful', 'Not really'],
        items: [
          { text: 'His final-year project', group: 0 },
          { text: 'His first computer, aged nine', group: 1 },
          { text: 'Why he wants this internship', group: 0 },
          { text: 'Every school he attended', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'But if I keep it short, won\'t they think I have nothing to say?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Short and clear makes them want to ask more. That\'s what you want: a conversation, not a speech.' },
          { text: 'Yes, talk as long as you can.', why: 'They skipped two questions because of it.' },
          { text: 'Just say your name.', why: 'Too short; about a minute is right.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the interview to what happens in it.',
        pairs: [
          ['Savanna Bank', 'A phone screen'],
          ['Mtaa Labs', 'A technical interview'],
          ['Synergix', 'The final round'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: '"Tell me about yourself" means: why do you [[1]] this role? Answer in about a [[2]].',
        blanks: [['fit'], ['minute']],
        distractors: ['hate', 'hour'],
      },
      {
        kind: 'mcq',
        prompt: 'What did the long answer cost Remi?',
        options: [
          { text: 'Two questions he never got to answer' },
          { text: 'Nothing', why: 'The interviewer skipped two questions.' },
          { text: 'A job offer on the spot', why: 'It cost him time to impress.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s plan for next time is the mistake?',
        lines: [
          'Say who I am now in one sentence.',
          'Mention one or two things that fit the role.',
          'Then cover my childhood in detail.',
          'Say why I want this internship.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Childhood isn\'t why he fits the role.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this course covers.',
        lines: ['How interviews work', 'Research', 'Your story bank', 'The hard questions', 'The final round'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many internship interviews does Remi have in the next five weeks?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'If someone asked you "tell me about yourself" right now, what would you say? Time it.',
    starters: ['I would say...', 'It took about...'],
  },
  deepen: {
    title: 'The first question',
    summary: 'Many interviews open with "tell me about yourself". It sets the tone for everything after, so it\'s worth preparing more than any other answer.',
  },
  notes: 'Fictional storyline: Remi (CAST.md), Savanna Bank (fictional), Mtaa Labs (fictional startup), Synergix final round. Prequel to Corporate Jargon (Remi\'s Synergix internship).',
};

export default lesson;
