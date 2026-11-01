import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the final round',
  summary: 'Assessment days, nerves, group exercises and panels. A quick check before Remi decides what to send after the interview.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Handle nerves and group exercises', 'Manage a panel interview'],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 4 p.m.',
      beats: [
        { speaker: 'remi', text: '(to Ada) Done. Brian said "great alignment" at the end. I think that\'s good?' },
        { speaker: 'ada', text: 'In Brian language, that\'s very good. Now: what are you sending them tonight?' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the final round.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five group-exercise moves.',
        lines: ['Clarify the task', 'Add one good idea', 'Build on others by name', 'Bring quiet people in', 'Keep time and summarise'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence-backed nerves technique, or myth?',
        groups: ['Evidence-backed', 'Myth'],
        items: [
          { text: 'Say "I\'m excited"', group: 0 },
          { text: 'Power pose to change hormones', group: 1 },
          { text: 'Remember nerves show less than you think', group: 0 },
          { text: 'Panic means you\'ll fail', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'An interviewer uses a phrase you don\'t understand. Best move?',
        options: [
          { text: 'Guess and hope', why: 'You may answer the wrong question.' },
          { text: 'Ask a short clarifying question' },
          { text: 'Change the subject', why: 'Clarify first.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the researcher to the idea.',
        pairs: [
          ['Brooks', 'Call nerves excitement'],
          ['Savitsky and Gilovich', 'Illusion of transparency'],
          ['Ranehill', 'Power posing didn\'t replicate'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'I barely spoke in the group exercise. Have I blown it?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'You gave the best idea in the room, checking the routes first. That counts more than talking a lot.' },
          { text: 'Probably, yes.', why: 'Unkind and likely untrue.' },
          { text: 'Just talk more next time, loudly.', why: 'Quality over volume.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'In a group.',
        template: 'Build on others by [[1]], and bring [[2]] people in.',
        blanks: [['name'], ['quiet']],
        distractors: ['shouting', 'loud'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What did Brian say at the end? Type the two words.',
        answers: ['great alignment', 'Great alignment'],
        placeholder: 'Two words',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this panel plan is a mistake?',
        lines: [
          'Learn all three names at the start.',
          'Look around the whole panel as I answer.',
          'Only answer the senior person; ignore the others.',
          'Thank each panellist at the end.',
        ],
        bug: 2,
        fix: 'Answer the asker; include everyone.',
        explanation: 'Every panellist usually scores you.',
      },
      {
        kind: 'mcq',
        prompt: 'Which final-round question is strongest?',
        options: [
          { text: '"Do you have a canteen?"', why: 'Fine later; not your best.' },
          { text: '"What would make someone really successful in this internship?"' },
          { text: '"Did I get it?"', why: 'Too soon; ask about next steps instead.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many candidates were in the group exercise?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which final-round skill do you most need to practise: nerves, groups or panels?',
    starters: ['I most need...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1-4.',
};

export default lesson;
