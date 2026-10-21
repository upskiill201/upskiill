import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: the plain checklist v1. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Plain checklist v1',
  summary: 'Zanele tapes a card to her monitor: the plain checklist. She\'ll run every message through it before she hits send. Version 1 has five checks. Tap each one.',
  minutes: 11,
  outcomes: [
    'Start a checklist for clear writing',
    'Link each check to a lesson from this chapter',
    'Use it on a real message',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Zanele\'s plain checklist v1',
      text: 'Before I send: 1. Do the first two lines say the point? 2. Is this draft two, not draft one? 3. Have I cut the warm-up, history, method, repeats and filler? 4. Does it do one job, for the people who need it? 5. Would it pass the phone test?',
      hotspots: [
        { phrase: 'first two lines say the point', note: 'Lesson 1: "?" from Mr Kamau.' },
        { phrase: 'draft two, not draft one', note: 'Lesson 6: draft one is for me.' },
        { phrase: 'cut the warm-up, history, method, repeats and filler', note: 'Lesson 3: the five cuts.' },
        { phrase: 'one job, for the people who need it', note: 'Lesson 8: one message, one purpose.' },
        { phrase: 'the phone test', note: 'Lesson 4: what shows without scrolling gets read.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Point in two lines, draft two, five cuts, one job, phone test.',
    },
  ],
  apply: {
    scenario: 'Plain checklist v1.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the lesson.',
        pairs: [
          ['Point in two lines', 'The question mark'],
          ['Draft two', 'Why we over-write'],
          ['One job', 'One message, one purpose'],
          ['Phone test', '900 words vs 120'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many checks are on v1?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the checks as written.',
        lines: ['Point in two lines', 'Draft two', 'Five cuts', 'One job', 'Phone test'],
      },
      {
        kind: 'mcq',
        prompt: 'When should Zanele use the checklist?',
        options: [
          { text: 'Before sending anything that matters' },
          { text: 'Once a year', why: 'Every important message.' },
          { text: 'Only for Mr Kamau', why: 'For every reader.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'A checklist for emails? Isn\'t that a bit much?',
        prompt: "Zanele's best reply?",
        options: [
          { text: 'It takes 30 seconds and my updates went from "?" to "Good. Keep going."' },
          { text: 'Yes, it\'s silly.', why: 'It works.' },
          { text: 'Pilots use checklists, so I must too.', why: 'Her reason is the results.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Check 4.',
        template: 'Does it do one [[1]], for the people who [[2]] it?',
        blanks: [['job'], ['need']],
        distractors: ['joke', 'hate'],
      },
      {
        kind: 'sortGroups',
        prompt: 'On v1, or coming later?',
        groups: ['On v1', 'Later'],
        items: [
          { text: 'Point in two lines', group: 0 },
          { text: 'Plain words', group: 1 },
          { text: 'One job', group: 0 },
          { text: 'Headings for skimmers', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which check in this copy of v1 is wrong?',
        lines: [
          'Do the first two lines say the point?',
          'Is this draft one, sent quickly?',
          'Does it do one job?',
          'Would it pass the phone test?',
        ],
        bug: 1,
        fix: 'Is this draft two, not draft one?',
        explanation: 'Draft one is for her.',
      },
      {
        kind: 'mcq',
        prompt: 'What does "five cuts" refer to?',
        options: [
          { text: 'Warm-up, history, method, repeats and filler' },
          { text: 'Five paragraphs to delete', why: 'Five kinds of padding.' },
          { text: 'Five readers to remove', why: 'Kinds of padding.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many seconds does Zanele say the checklist takes?',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Run your next important message through the five checks. What did you change?',
    starters: ['I changed...'],
  },
  notes: 'Plain checklist v1 (fictional) is this course\'s recurring device, growing to v5.',
};

export default lesson;
