import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: hard questions',
  summary: 'Thinking out loud, a real weakness and the salary question. A quick check before Remi meets a question nobody should ask.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Think out loud when stuck', 'Answer weakness and salary questions well'],
  learn: [
    {
      kind: 'story',
      title: 'Practice round',
      beats: [
        { speaker: 'ada', text: '(on a call) Biggest weakness?' },
        { speaker: 'remi', text: 'I\'m too relaxed about deadlines. So now I set weekly goals. My last two projects were early.' },
        { speaker: 'ada', text: 'I believe you. That\'s the point.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: hard questions.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps when you\'re stuck.',
        lines: ['Repeat and clarify', 'Say the simple approach', 'Try a small example', 'Improve it out loud', 'Say where you\'re stuck'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good weakness answer, or not?',
        groups: ['Good', 'Not'],
        items: [
          { text: '"I avoid public speaking, so I joined a debate club."', group: 0 },
          { text: '"I\'m too perfect."', group: 1 },
          { text: '"I used to miss small details; now I use checklists."', group: 0 },
          { text: '"I have no weaknesses."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: '"What are your salary expectations?" Best answer?',
        options: [
          { text: '"Anything is fine."', why: 'Invites a low offer.' },
          { text: 'A researched range, starting at a fair target, plus flexibility' },
          { text: 'A random high number', why: 'Base it on research.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the hard question to the approach.',
        pairs: [
          ['Weakness', 'Real, safe, improving'],
          ['Salary', 'Researched range'],
          ['Unsolvable problem', 'Think out loud'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'They asked me to estimate how many shops are in Nairobi. I have no idea!',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Say "I don\'t know" and stop.', why: 'They want your reasoning.' },
          { text: 'Guess a number silently.', why: 'Show the steps.' },
          { text: 'Nobody knows exactly. Think out loud: population, people per shop, a rough number, and say your assumptions.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Remi\'s market research range runs from 25,000 to what, in KES?',
        answers: ['40000', '40,000'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Weakness answer.',
        template: 'A real weakness, an [[1]], and what you\'re [[2]] about it.',
        blanks: [['example'], ['doing']],
        distractors: ['excuse', 'hiding'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this weakness answer is a problem?',
        lines: [
          'I used to avoid asking for help.',
          'On my last project that cost me two days.',
          'Now I ask after 30 minutes of being stuck.',
          'But really I\'m great at everything.',
        ],
        bug: 3,
        fix: 'Delete it.',
        explanation: 'It undoes the honesty.',
      },
      {
        kind: 'mcq',
        prompt: 'Is it OK to ask for a hint in a technical interview?',
        options: [
          { text: 'Never', why: 'Silence is worse.' },
          { text: 'Yes, after showing your thinking' },
          { text: 'Only at the very start', why: 'After showing your approach.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does Remi now set to beat his deadline weakness? (two words, weekly...)',
        answers: ['goals', 'weekly goals'],
        placeholder: 'A word',
      },
    ],
  },
  reflect: {
    prompt: 'Practise your weakness and salary answers out loud. Which felt more natural?',
    starters: ['The more natural one was...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1-4.',
};

export default lesson;
