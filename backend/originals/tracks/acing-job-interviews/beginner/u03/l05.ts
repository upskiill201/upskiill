import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: your stories',
  summary: 'Behavioural questions, STAR, the story bank and specific stories with numbers. A quick check before Remi learns where honesty ends and exaggeration begins.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Tell a story in STAR', 'Match stories to questions'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday',
      beats: [
        { speaker: 'remi', text: 'Six stories, all in STAR. I told the Kevin one to my flatmate in 90 seconds.' },
        { speaker: 'ada', text: 'And did he understand what you did?' },
        { speaker: 'remi', text: 'He said, "So testing beats arguing." Exactly the point.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: your stories.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order STAR.',
        lines: ['Situation', 'Task', 'Action', 'Result'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Behavioural question or not?',
        groups: ['Behavioural', 'Not'],
        items: [
          { text: '"Give an example of a time you led a team."', group: 0 },
          { text: '"What university do you attend?"', group: 1 },
          { text: '"Tell me about a mistake you made."', group: 0 },
          { text: '"When can you start?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which STAR part should be longest?',
        options: [
          { text: 'Action' },
          { text: 'Situation', why: 'Short set-up.' },
          { text: 'Task', why: 'One sentence.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the best story type.',
        pairs: [
          ['"A time you failed"', 'A mistake you learned from'],
          ['"A time you disagreed"', 'A conflict you resolved'],
          ['"A time under pressure"', 'A tight deadline'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'My result is small: we just submitted on time. Should I make it sound bigger?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'No. Say it exactly: "two days early, A-minus." Small, true and specific beats big and vague.' },
          { text: 'Yes, say you won an award.', why: 'Never invent results.' },
          { text: 'Leave out the result.', why: 'Always end with one.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Specific stories.',
        template: 'Add [[1]], and say "[[2]]" for your actions.',
        blanks: [['numbers'], ['I']],
        distractors: ['jokes', 'they'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds did Remi\'s Kevin story take?',
        answers: ['90', 'ninety'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this STAR answer is missing its point?',
        lines: [
          'S: At my part-time job, a customer was angry about a late order.',
          'T: I was on the till that day.',
          'A: Then everything was fine.',
          'R: She came back the next week and thanked me.',
        ],
        bug: 2,
        fix: 'A: I apologised, tracked the order and called her with an update.',
        explanation: 'The action part says nothing.',
      },
      {
        kind: 'mcq',
        prompt: 'Why have a story bank instead of answers to every question?',
        options: [
          { text: 'A few true stories can answer most behavioural questions' },
          { text: 'It saves typing', why: 'It\'s about coverage.' },
          { text: 'Interviewers ask the same six things', why: 'Questions vary; stories adapt.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does the R in STAR stand for?',
        answers: ['Result', 'result'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Tell one of your STAR stories to someone in under two minutes. What did they remember?',
    starters: ['They remembered...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4.',
};

export default lesson;
