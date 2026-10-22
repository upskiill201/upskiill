import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: write less',
  summary: 'Two-line readers, six principles, five cuts and the four-part update. A quick check before Zanele finds out why she writes so much.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Cut a message to what matters', 'Write a four-part update'],
  learn: [
    {
      kind: 'story',
      title: 'Week two',
      beats: [
        { speaker: 'narrator', text: 'Zanele sends the week-2 update: 110 words. Mr Kamau replies in four minutes: "Good. Keep going. Fix the driver contracts."' },
        { speaker: 'achieng', text: 'Three short sentences. From him, that\'s a love letter.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: write less.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the four-part update.',
        lines: ['Result', 'Decision needed', 'Main risk', 'Next step'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the filler to the short form.',
        pairs: [
          ['"In order to"', '"To"'],
          ['"Due to the fact that"', '"Because"'],
          ['"At this point in time"', '"Now"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Cut it, or keep it?',
        groups: ['Cut', 'Keep'],
        items: [
          { text: '"As you may recall..."', group: 0 },
          { text: 'The week\'s result', group: 1 },
          { text: 'How the data was cleaned', group: 0 },
          { text: 'The risk he needs to fix', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s Rogers and Lasky-Fink\'s first principle?',
        options: [
          { text: 'More detail is better', why: 'The opposite.' },
          { text: 'Always attach a report', why: 'Less is more.' },
          { text: 'Less is more' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'A colleague sent me 2,000 words asking for one number.',
        prompt: "Mrs Achieng's best reply?",
        options: [
          { text: 'Reply with 3,000 words.', why: 'Model the short version.' },
          { text: 'Reply with the number in the first line. And maybe send them this course.' },
          { text: 'Ignore it.', why: 'Answer it simply.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two lines.',
        template: 'Assume your reader reads [[1]] lines. Make them the [[2]].',
        blanks: [['two', '2'], ['point']],
        distractors: ['ten', 'greeting'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many words was Zanele\'s week-2 update?',
        answers: ['110'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this update breaks the four-part shape?',
        lines: [
          'Week 2: late deliveries at 22%.',
          'Decision needed: approve two driver contracts by 30 April.',
          'Let me now explain in detail how I calculated this...',
          'Next update Friday.',
        ],
        bug: 2,
        fix: 'Method attached.',
        explanation: 'The method goes in the attachment.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the "phone test"?',
        options: [
          { text: 'Check what shows on a phone without scrolling: that\'s what gets read' },
          { text: 'Call the reader', why: 'It\'s about reading on a phone.' },
          { text: 'Type it on your phone', why: 'Read it there.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did Mr Kamau take to reply to week 2?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write today\'s most important message in under 120 words.',
    starters: ['My message:...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1-4. Fictional week-2 update (22%).',
};

export default lesson;
