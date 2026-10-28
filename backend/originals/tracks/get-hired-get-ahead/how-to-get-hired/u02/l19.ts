import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 19 — the learner's internship plan (kit piece 2). Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your internship plan',
  summary: 'Now it\'s your turn. Whether you\'re looking for an internship, starting one, or in a first job, this plan works the same way. Five parts, one page.',
  minutes: 12,
  outcomes: ['Write a one-page internship plan', 'Set a weekly proof habit', 'Plan how you\'ll leave with a reference'],
  learn: [
    {
      kind: 'steps',
      title: 'Kit piece 2: your internship plan',
      steps: [
        { title: '1. What I want to learn', body: 'One specific line, like David\'s "lab research on malaria" or Clinton\'s "building for real users on basic phones".' },
        { title: '2. Where I\'ll look', body: 'Three formal schemes with deadlines, three people to ask, and one company to pitch speculatively.' },
        { title: '3. My first two weeks', body: 'Find the biggest worry. Read the brief and agree what "done" means. Ask one clarifying question.' },
        { title: '4. My weekly habits', body: 'A four-line Friday update. One line in the wins log. One specific feedback question every two weeks.' },
        { title: '5. How I\'ll leave', body: 'A one-month summary, a reference ask while it\'s fresh, recommendation reminders, and a thank-you to everyone, including the drivers.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Learn, look, start, habits, leave. One page. Update it as you go.',
    },
  ],
  apply: {
    scenario: 'You write your internship plan.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the plan in order.',
        lines: ['What I want to learn', 'Where I\'ll look', 'My first two weeks', 'My weekly habits', 'How I\'ll leave'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the plan?',
        groups: ['First two weeks', 'How I\'ll leave'],
        items: [
          { text: 'Find the biggest worry', group: 0 },
          { text: 'Ask for a reference', group: 1 },
          { text: 'Agree what "done" means', group: 0 },
          { text: 'Thank everyone', group: 1 },
          { text: 'Send recommendation reminders', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How often should you write in your wins log?',
        options: [
          { text: 'Once a year', why: 'You\'ll forget. Weekly.' },
          { text: 'Every week' },
          { text: 'Only when something huge happens', why: 'Small wins add up. Weekly.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'A learner says they\'re already in a job, not an internship. Is this plan useless for them?',
        options: [
          { text: 'Yes, skip it.', why: 'The habits work in any role.' },
          { text: 'Tell them to find an internship.', why: 'The plan works where they are.' },
          { text: 'No: the first-weeks habits, updates, wins log and feedback work in any new role.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak plan line.',
        lines: ['Learn: building for basic phones.', 'Look: anywhere, whatever.', 'Habits: four-line Friday update.'],
        bug: 1,
        explanation: 'Be specific: three schemes, three people, one pitch.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to how often.',
        pairs: [
          ['Friday update', 'Every week'],
          ['Specific feedback question', 'Every two weeks'],
          ['Progress summary', 'Once a month'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which "where I\'ll look" line is best?',
        options: [
          { text: 'Three schemes with deadlines, three people, one speculative pitch' },
          { text: 'One big company', why: 'Too few. Mix schemes, people and pitches.' },
          { text: 'Job boards only', why: 'Use people too.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the plan.',
        template: 'Learn, [[1]], start, habits, [[2]].',
        blanks: [['look'], ['leave']],
        distractors: ['wait', 'quit', 'rest'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many parts does the plan have? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: 'Front-end work at a fintech', group: 0 },
          { text: 'Something good', group: 1 },
          { text: 'Ask Mrs Ewane by Friday', group: 0 },
          { text: 'Network a bit', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write the first line of your plan now: what do you want to learn in your next internship or role?',
    starters: ['I want to learn...', 'Ideally at...'],
  },
  deepen: {
    title: 'Your kit, piece 2',
    summary: 'Write your one-page internship plan with all five parts. Put the deadlines in your calendar today.',
  },
  notes: 'Kit piece 2 of How to Get Hired (piece 1 = network map, Ch1). Works for interns and first-job starters.',
};

export default lesson;
