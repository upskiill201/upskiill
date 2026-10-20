import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: the night before. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the night before',
  summary: 'The night before Njangi Pay. Clothes ironed, bus booked, story bank on one page. Miracle calls for one last quiz. Not knowing an answer, the day before, questions to ask, and nerves.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Handle a question you can\'t answer', 'Prepare the practical details', 'Calm nerves and ask good questions'],
  learn: [
    {
      kind: 'story',
      title: '9pm',
      beats: [
        { speaker: 'narrator', text: 'The night before. A shirt on a hanger. A bus ticket on the desk. One page of stories.' },
        { speaker: 'miracle', text: 'Last quiz. Then sleep. Sleep is part of the preparation.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: the night before.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the honest "I don\'t know" approach in order.',
        lines: ['Pause and breathe', 'Say what you haven\'t done', 'Link to something you have done', 'Reason out loud'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Bring it, or leave it?',
        groups: ['Bring', 'Leave'],
        items: [
          { text: 'CV copy', group: 0 },
          { text: 'Questions for them', group: 0 },
          { text: 'Notebook and pen', group: 0 },
          { text: 'A speaker playing music', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s a great final question to ask?',
        options: [
          { text: '"Is there anything about my background you\'d like me to say more about?"' },
          { text: '"No questions."', why: 'A missed chance.' },
          { text: '"What does your company do?"', why: 'It\'s on the website.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the bluff.',
        lines: ['I haven\'t built payments, but...', 'I\'ve built banking systems for years.', 'At Kmer, unique IDs stopped duplicates.'],
        bug: 1,
        explanation: 'Untrue. Bluffs collapse on the first follow-up.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Your hands are shaking in the waiting room. What do you do?',
        options: [
          { text: 'Breathe out slowly a few times, and tell myself this is energy.' },
          { text: 'Leave before they call me.', why: 'Nerves are normal.' },
          { text: 'Drink three coffees.', why: 'Breathe instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the fix.',
        pairs: [
          ['Video freezes', 'Rejoin or phone the recruiter'],
          ['Lost your place', 'Sorry, let me start again'],
          ['Don\'t know the answer', 'Reason out loud from what you know'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How many questions should Clinton prepare?',
        options: [
          { text: 'About five, and ask two or three' },
          { text: 'None', why: 'Always have some.' },
          { text: 'Twenty, ask all', why: 'Too many. Two or three.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s last tips.',
        template: 'Don\'t [[1]]. Pause on purpose. [[2]] is part of the preparation.',
        blanks: [['bluff'], ['Sleep']],
        distractors: ['breathe', 'Coffee', 'Panic'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many minutes early should Clinton arrive at reception? (a number)',
        answers: ['10', '15', 'ten', 'fifteen', '10-15', '10 to 15'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good question for them, or avoid?',
        groups: ['Good', 'Avoid'],
        items: [
          { text: 'What\'s the team\'s biggest challenge?', group: 0 },
          { text: 'When was the company founded?', group: 1 },
          { text: 'How do graduates learn here?', group: 0 },
          { text: 'Can I work from the beach?', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'For a video interview, where should the light be?',
        options: [
          { text: 'In front of you, on your face' },
          { text: 'Behind you', why: 'Your face would be in shadow.' },
          { text: 'Off', why: 'They need to see you.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s on your own "night before" list for your next big moment?',
    starters: ['My list:', 'The thing I always forget is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your one-page story bank: six stories, five lines each, and five questions for them at the bottom.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;
