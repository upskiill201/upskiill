import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 6 — reading a project brief: what "done" means. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Read the brief',
  summary: 'Mr Tamba writes Clinton\'s project on the whiteboard in five lines. Samuel reads it in two seconds and starts coding. Clinton reads it for ten minutes. Tap each line to see what he noticed.',
  minutes: 11,
  outcomes: ['Find the goal, the user and the limits in a brief', 'Agree what "done" means before you start', 'Ask one clarifying question'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of Mr Tamba\'s brief',
      text: 'Project: offline delivery confirmations.\nWho: our 14 drivers, mostly on basic Android phones.\nProblem: no mobile data in some areas, so deliveries aren\'t confirmed until evening.\nMust: work with no data, and sync when data comes back.\nDone by the end of the internship: three drivers using it for a full week.',
      hotspots: [
        { phrase: 'Project: offline delivery confirmations.', note: 'The goal in four words. Everything Clinton builds should serve this.' },
        { phrase: 'our 14 drivers, mostly on basic Android phones', note: 'The user. Basic phones means small, simple, light: no heavy app, no fancy animations.' },
        { phrase: 'deliveries aren\'t confirmed until evening', note: 'Why it matters to the business: customers wait all day not knowing. That\'s the cost.' },
        { phrase: 'work with no data, and sync when data comes back', note: 'The hard limit. A beautiful app that needs data fails the brief.' },
        { phrase: 'three drivers using it for a full week', note: 'What "done" means. Not "code finished": real people using it. Clinton writes this at the top of his notes.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before you start: the goal, the user, why it matters, the limits, and what "done" means. If one is missing, ask.',
    },
  ],
  apply: {
    scenario: 'Clinton reads his project brief.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the parts of a brief in order.',
        lines: ['The goal', 'Who it\'s for', 'Why it matters', 'The limits', 'What "done" means'],
      },
      {
        kind: 'mcq',
        prompt: 'What does "done" mean for Clinton\'s project?',
        options: [
          { text: 'The code compiles', why: 'Done means real use, not finished code.' },
          { text: 'Three drivers using it for a full week' },
          { text: 'Mr Tamba likes the colours', why: 'Done is three drivers using it for a week.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fits the brief, or not?',
        groups: ['Fits', 'Doesn\'t fit'],
        items: [
          { text: 'Saves confirmations on the phone with no data', group: 0 },
          { text: 'A video tutorial that needs 4G', group: 1 },
          { text: 'A small app for basic Android phones', group: 0 },
          { text: 'Heavy 3D animations', group: 1 },
          { text: 'Syncs when data returns', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap Samuel\'s mistake.',
        lines: ['Read the brief once.', 'Built a version that only works online.', 'Showed it to Mr Tamba.'],
        bug: 1,
        explanation: 'The brief\'s hard limit is "work with no data".',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best clarifying question.',
        from: 'clinton',
        message: 'The brief doesn\'t say how drivers confirm. What should I ask Mr Tamba?',
        options: [
          { text: '"Can you rewrite the whole brief?"', why: 'Ask one specific question.' },
          { text: 'Ask nothing and guess.', why: 'A one-line question saves a week of rework.' },
          { text: '"Should drivers confirm with a photo, a signature or just a tap?"' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it tells Clinton.',
        pairs: [
          ['Basic Android phones', 'Keep it small and light'],
          ['No data in some areas', 'It must work offline'],
          ['Three drivers for a week', 'What "done" means'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton write at the top of his notes?',
        options: [
          { text: 'Done = three drivers using it for a full week' },
          { text: 'Make it look cool', why: 'Write the definition of done.' },
          { text: 'Beat Samuel', why: 'Write what done means for the business.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Agree what [[1]] means before you [[2]].',
        blanks: [['done'], ['start']],
        distractors: ['fun', 'leave', 'quit'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many drivers does Kmer have? (a number)',
        answers: ['14', 'fourteen'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the brief, or missing?',
        groups: ['In the brief', 'Missing'],
        items: [
          { text: 'Who the users are', group: 0 },
          { text: 'How drivers confirm', group: 1 },
          { text: 'The deadline', group: 0 },
          { text: 'The no-data limit', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a task you were given recently. Did you know what "done" meant before you started?',
    starters: ['The task was...', '"Done" should have meant...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Take any task on your list. Write its five parts: goal, user, why it matters, limits, done. Notice which one you don\'t know.',
  },
  notes: 'Project brief reading is general workplace practice. Kmer\'s details are invented.',
};

export default lesson;
