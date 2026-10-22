import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Step-by-step: STAR. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'STAR',
  summary: 'Ada teaches Remi the shape most interviewers are listening for: Situation, Task, Action, Result. Then they rebuild the Kevin story with it.',
  minutes: 12,
  outcomes: [
    'Structure an answer with STAR',
    'Spend most of the answer on your actions',
    'End with a result and what you learned',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'STAR, with the Kevin story',
      steps: [
        { title: 'S: Situation (one or two sentences)', body: '"In our third-year group project, with three weeks left, Kevin wanted to rewrite the whole app with a new database."' },
        { title: 'T: Task (one sentence)', body: '"I was responsible for the database, and we had to submit on time."' },
        { title: 'A: Action (most of the answer)', body: '"I suggested we test both designs for two days. I set up a quick comparison with real data, and we agreed to pick whichever was faster to finish."' },
        { title: 'R: Result (with a number if possible)', body: '"The old design won. Kevin agreed, we submitted two days early and got an A-minus."' },
        { title: 'Plus: what you learned (one line)', body: '"I learned that testing beats arguing. I still use that."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Situation and Task short, Action longest, Result with a number, then one line on what you learned.',
    },
  ],
  apply: {
    scenario: 'STAR.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the parts of STAR.',
        lines: ['Situation', 'Task', 'Action', 'Result'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its STAR part.',
        pairs: [
          ['"Three weeks left, Kevin wanted to rewrite it."', 'Situation'],
          ['"I was responsible for the database."', 'Task'],
          ['"I set up a quick comparison."', 'Action'],
          ['"We submitted two days early."', 'Result'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which part of a STAR answer should be longest?',
        options: [
          { text: 'Situation', why: 'Keep the set-up short.' },
          { text: 'Result', why: 'Short and specific.' },
          { text: 'Action' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days early did Remi\'s team submit?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Should I explain the whole project first so they understand?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Yes, explain it all for two minutes.', why: 'That buries the action.' },
          { text: 'One or two sentences of situation is enough. They want to hear what you did.' },
          { text: 'Skip the situation entirely.', why: 'A little context helps.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'What STAR stands for.',
        template: 'Situation, [[1]], Action, [[2]].',
        blanks: [['Task'], ['Result']],
        distractors: ['Talk', 'Reason'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Short part or long part of the answer?',
        groups: ['Keep short', 'The long part'],
        items: [
          { text: 'Situation', group: 0 },
          { text: 'Action', group: 1 },
          { text: 'Task', group: 0 },
          { text: 'What you learned', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add "what you learned" at the end?',
        options: [
          { text: 'To pad the answer', why: 'One line shows growth.' },
          { text: 'It\'s required by law', why: 'It\'s a good habit.' },
          { text: 'It shows you grow from experience, one of the things interviewers check' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of this STAR answer is too long?',
        lines: [
          'S: Our project had three weeks left. (Then two minutes on the module\'s history.)',
          'T: I owned the database.',
          'A: I set up a comparison with real data.',
          'R: We submitted two days early, A-minus.',
        ],
        bug: 0,
        fix: 'S: One or two sentences only.',
        explanation: 'A long situation leaves no time for actions.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'For how many days did they test both designs?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write one of your own stories in STAR. Underline the Action part. Is it the longest?',
    starters: ['S:...', 'T:...', 'A:...', 'R:...'],
  },
  deepen: {
    title: 'Where STAR comes from',
    summary: 'STAR is widely taught by careers services and is often credited to the consultancy DDI. Whoever invented it, interviewers trained in structured interviewing listen for exactly these parts.',
  },
  notes: 'STAR method: widely used in competency-based interviewing; often attributed to Development Dimensions International (DDI). Fictional story: Kevin, A-minus, two days early.',
};

export default lesson;
