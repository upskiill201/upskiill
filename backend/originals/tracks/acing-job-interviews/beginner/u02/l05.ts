import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: do your homework',
  summary: 'What research should answer, the one-hour plan, "why us?" and decoding the ad. A quick check before Remi sets up for a video interview.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Research a company in an hour', 'Answer "why us?" specifically'],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 10:15 p.m.',
      beats: [
        { speaker: 'remi', text: 'One hour done. Three facts, one "why us?", three questions. And I found a missing Swahili option.' },
        { speaker: 'ada', text: 'Now you\'re interesting. Last thing: your video set-up.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: do your homework.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the one-hour research plan.',
        lines: ['Use the product', 'Read the job ad closely', 'Look up the company', 'Look up your interviewer', 'Write your notes'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific "why us?" or generic?',
        groups: ['Specific', 'Generic'],
        items: [
          { text: '"Your app works offline in rural areas"', group: 0 },
          { text: '"You\'re an exciting company"', group: 1 },
          { text: '"Your team builds for slow phones"', group: 0 },
          { text: '"It\'s good for my CV"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A job ad lists a skill as "nice to have". You don\'t have it. Best answer?',
        options: [
          { text: 'Say honestly you haven\'t yet, mention what\'s close, and that you\'re keen to learn' },
          { text: 'Claim you have it', why: 'Never overclaim.' },
          { text: 'Withdraw your application', why: 'Nice-to-haves are usually not required.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the ad part to how to use it.',
        pairs: [
          ['Must-haves', 'Prepare evidence for each'],
          ['Nice-to-haves', 'Be honest'],
          ['Repeated words', 'Expect questions on them'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'What if they ask about something I didn\'t research?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Say what you do know, and ask about it: "I didn\'t see much about that; how does it work here?"' },
          { text: 'Make something up.', why: 'It gets found out.' },
          { text: 'Panic.', why: 'Curiosity is a good answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How long is the research plan, in minutes?',
        answers: ['60', 'sixty'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Research notes.',
        template: 'Three facts, one "why [[1]]?" sentence, three [[2]].',
        blanks: [['us'], ['questions']],
        distractors: ['me', 'jokes'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this "why us?" is a problem?',
        lines: [
          'I used your app last week.',
          'I liked how fast it was on my old phone.',
          'Honestly, I\'ve applied to 40 companies.',
          'Building for small shops is what I want to do.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It says "you\'re just one of many".',
      },
      {
        kind: 'mcq',
        prompt: 'Why use the product before the interview?',
        options: [
          { text: 'It gives real, specific things to talk about' },
          { text: 'To find faults to criticise', why: 'It\'s for understanding.' },
          { text: 'It\'s not useful', why: 'It\'s the fastest research.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What language option was missing from the Mtaa Labs app?',
        answers: ['Swahili', 'swahili', 'Kiswahili'],
        placeholder: 'A language',
      },
    ],
  },
  reflect: {
    prompt: 'What one thing from today\'s research would you most want to mention in an interview?',
    starters: ['I would mention...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4.',
};

export default lesson;
