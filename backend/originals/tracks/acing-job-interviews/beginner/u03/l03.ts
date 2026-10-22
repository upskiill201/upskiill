import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Explain cards: the story bank. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The story bank',
  summary: 'Remi can\'t prepare an answer for every question. Ada\'s trick: prepare six true stories, and each one can answer several questions.',
  minutes: 12,
  outcomes: [
    'Build a bank of six STAR stories',
    'Use one story for several questions',
    'Choose stories that cover the five things interviewers check',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Remi\'s story bank: six true stories, each written in STAR.</p><table><tr><th>Story</th><th>Can answer questions about...</th></tr><tr><td>1. The church booking app (120 weekly users)</td><td>initiative, technical skill, real users</td></tr><tr><td>2. The Kevin database disagreement</td><td>conflict, teamwork, persuading others</td></tr><tr><td>3. The Kigali hackathon demo that crashed</td><td>failure, pressure, learning from mistakes</td></tr><tr><td>4. Leading the coding club data project (8 members)</td><td>leadership, organising, motivating</td></tr><tr><td>5. Fixing the app the night before a church event, in exam week</td><td>deadlines, priorities, staying calm</td></tr><tr><td>6. Building his uncle\'s stock spreadsheet</td><td>helping a customer, understanding users, small business</td></tr></table><p>When a question comes, Remi asks: <strong>which story fits best?</strong> Then he tells it with the emphasis the question wants. "Tell me about a failure" and "Tell me about working under pressure" can both use the hackathon.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Six true stories can answer most behavioural questions. Pick the best fit, then stress what the question asks about.',
    },
  ],
  apply: {
    scenario: 'The story bank.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the question to Remi\'s best story.',
        pairs: [
          ['"A time you failed"', 'The hackathon crash'],
          ['"A time you led others"', 'The coding club project'],
          ['"A time you disagreed"', 'The Kevin database story'],
          ['"A time you helped a customer"', 'His uncle\'s stock spreadsheet'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many stories are in Remi\'s bank?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why six stories, not one for every possible question?',
        options: [
          { text: 'Each story can answer several questions, so six cover most of them' },
          { text: 'Six is a lucky number', why: 'It\'s about coverage.' },
          { text: 'Interviews only have six questions', why: 'Stories are reused.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which story fits?',
        groups: ['Hackathon', 'Exam-week fix'],
        items: [
          { text: '"Tell me about a failure."', group: 0 },
          { text: '"How do you manage competing deadlines?"', group: 1 },
          { text: '"What did you learn from a mistake?"', group: 0 },
          { text: '"Tell me about prioritising."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Can I use the booking app story twice in one interview?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Use it for every question.', why: 'Range matters.' },
          { text: 'Never mention it.', why: 'It\'s his strongest story.' },
          { text: 'Better to use a different story the second time. It shows range. Keep your best one for the question it fits most.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The trick.',
        template: 'Pick the best [[1]], then stress what the [[2]] asks about.',
        blanks: [['story', 'fit'], ['question']],
        distractors: ['joke', 'lecturer'],
      },
      {
        kind: 'mcq',
        prompt: 'Which kind of story is missing from many people\'s banks, but asked often?',
        options: [
          { text: 'Your favourite film', why: 'Not a behavioural story.' },
          { text: 'A failure or mistake you learned from' },
          { text: 'Your grades', why: 'Not a story.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which entry doesn\'t belong in a story bank?',
        lines: [
          'The booking app: initiative, real users.',
          'The hackathon crash: failure, learning.',
          'A story I\'ll invent about leading 50 people.',
          'The coding club: leadership.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Every story must be true.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many members were in the coding club data project?',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to build a story bank.',
        lines: ['List real moments', 'Pick six that cover different skills', 'Write each in STAR', 'Note which questions each answers', 'Practise them out loud'],
      },
    ],
  },
  reflect: {
    prompt: 'List six true stories from your life and what questions each could answer.',
    starters: ['1.', '2.', '3.'],
  },
  deepen: {
    title: 'Fresh stories help',
    summary: 'Recent stories are easier to tell with detail. Students can use projects, part-time jobs, volunteering and clubs, not just formal work.',
  },
  notes: 'Story-bank approach is common careers advice. Fictional stories (booking app, Kevin, Kigali hackathon where Remi met Ada per CAST.md, coding club, exam-week fix, uncle\'s spreadsheet).',
};

export default lesson;
