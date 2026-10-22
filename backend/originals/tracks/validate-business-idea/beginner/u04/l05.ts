import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: ready to test',
  summary: 'Test by hand before building, an MVP answers one question, four cheap tests, and the pass mark set first. Quick check before the post goes up.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Plan a cheap, honest test without notes', 'Write a pass mark that can\'t be moved'],
  learn: [
    {
      kind: 'story',
      title: 'Post scheduled',
      beats: [
        { speaker: 'narrator', text: 'Thursday night. The pass mark is in David\'s and Miracle\'s chats. The post is ready for three hostel groups.' },
        { speaker: 'clinton', text: 'Ten paid bookings, half from strangers. Here goes.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: ready to test.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should come before building an app?',
        options: [
          { text: 'A cheap test showing people will pay' },
          { text: 'A logo', why: 'It doesn\'t test demand.' },
          { text: 'A big launch party', why: 'Nothing to launch yet.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the test to its evidence.',
        pairs: [
          ['Fake door', 'Sign-ups'],
          ['Pre-sale', 'Real payments'],
          ['Concierge', 'Doing the job by hand'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'MVP or not?',
        groups: ['MVP', 'Not an MVP'],
        items: [
          { text: 'A paid WhatsApp offer', group: 0 },
          { text: 'A six-week app build', group: 1 },
          { text: 'Collecting bags by hand', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A pass mark of 15 paid bookings from 500 people reached. What percentage is that?',
        answers: ['3', '3%'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I\'ll decide what counts as success after I see the numbers. Keeps it flexible.',
        prompt: "David's best reply?",
        options: [
          { text: 'Good, stay flexible.', why: 'That\'s moving the goalposts.' },
          { text: 'Skip the pass mark entirely.', why: 'Then the test can\'t fail, so it can\'t teach.' },
          { text: 'Flexible means you\'ll call anything a win. Write it now and send it to us.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'What an MVP is.',
        template: 'The smallest thing that answers your [[1]] [[2]].',
        blanks: [['riskiest'], ['question', 'assumption']],
        distractors: ['easiest', 'logo'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this test plan is dishonest?',
        lines: [
          'New pickup service; Mama Rose washes.',
          'Pay 1,500 FCFA on Mobile Money to book Saturday.',
          'Say we\'ve served 500 happy customers.',
          'Full refund if we can\'t collect.',
        ],
        bug: 2,
        fix: 'Say it\'s the first weekend.',
        explanation: 'Fake claims break trust and spoil the test.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the run-up to the test.',
        lines: ['Pick the riskiest assumption', 'Choose the cheapest honest test', 'Write and share the pass mark', 'Post the offer'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the WashDay test take payment up front?',
        options: [
          { text: 'To keep the money if no one shows up', why: 'Refunds are promised.' },
          { text: 'Payment is the strongest evidence that they\'ll pay' },
          { text: 'Because Mobile Money is required by law', why: 'It\'s about evidence.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the pass mark, or not?',
        groups: ['Pass mark', 'Not'],
        items: [
          { text: 'At least 10 paid bookings', group: 0 },
          { text: 'At least 80% of bags on time', group: 0 },
          { text: 'At least 100 likes', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Is your own test ready? What\'s your pass mark, and who have you shared it with?',
    starters: ['My pass mark is...', 'I shared it with...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1-4. 15 of 500 = 3%.',
};

export default lesson;
