import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: voice and nerves',
  summary: 'Recording, the self-check, pace and pauses, and "I am excited". A quick check before Lucía works on eye contact.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Self-check a recording', 'Manage pace and nerves'],
  learn: [
    {
      kind: 'story',
      title: 'Second recording',
      beats: [
        { speaker: 'lucia', text: 'New recording: 150 words a minute, pauses at every signpost. It felt painfully slow.' },
        { speaker: 'diego', text: 'It sounds like someone who knows what they\'re talking about.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: voice and nerves.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the self-check.',
        lines: ['Record two minutes', 'Watch silent', 'Listen blind', 'Check the card', 'Pick one or two fixes'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s Lucía\'s new pace?',
        options: [
          { text: '190', why: 'That was before.' },
          { text: '150 words a minute' },
          { text: '90', why: '150.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps with nerves, or not?',
        groups: ['Helps', 'Doesn\'t help'],
        items: [
          { text: '"I am excited."', group: 0 },
          { text: '"Calm down, calm down."', group: 1 },
          { text: 'Knowing your first line', group: 0 },
          { text: 'Rushing to get it over with', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many words a minute did Lucía speak at first?',
        answers: ['190'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'I\'m presenting the email results on Monday and I\'m shaking already.',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'Just calm down.', why: 'Reframe instead.' },
          { text: 'Talk fast to get it over with.', why: 'Slow down.' },
          { text: 'Same for me. Say "I am excited", then your first line, which you\'ll know by heart. Then pause at every full stop.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Pauses.',
        template: 'Pause after the [[1]] and before a key [[2]].',
        blanks: [['message'], ['number']],
        distractors: ['joke', 'slide'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its source.',
        pairs: [
          ['"I am excited"', 'Brooks (2014)'],
          ['Watch with the sound off', 'The self-check'],
          ['Slow feels slower to you', 'Diego\'s note'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Tomás\'s Monday plan is the mistake?',
        lines: [
          'Know my first line by heart.',
          'Say "I am excited" beforehand.',
          'Skip the pauses so I finish faster.',
          'Record a practice on Sunday.',
        ],
        bug: 2,
        fix: 'Pause at every signpost.',
        explanation: 'Pauses make him sound calm and give the audience time.',
      },
      {
        kind: 'mcq',
        prompt: 'What did Diego say the new recording sounds like?',
        options: [
          { text: 'Too slow', why: 'It sounds confident.' },
          { text: 'Someone who knows what they\'re talking about' },
          { text: 'Robotic', why: 'It sounds confident.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many fixes should you pick at a time, at most?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Record yourself again after one fix. What changed between the two recordings?',
    starters: ['Before:...', 'After:...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1-4.',
};

export default lesson;
