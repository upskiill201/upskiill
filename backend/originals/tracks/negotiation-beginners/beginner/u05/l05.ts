import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: closing well',
  summary: '"Not like this" vs no, the five steps after a no, shrinking concessions, and the written summary. Quick check before Ada learns to ask without backlash.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Turn a no into a staged deal', 'Close with a written summary'],
  learn: [
    {
      kind: 'story',
      title: 'Sent',
      beats: [
        { speaker: 'narrator', text: 'Ada sends the summary at 4:12 p.m. At 4:30, Tobi replies: "Matches my notes. Well done today."' },
        { speaker: 'ada', text: 'Two words I\'ll frame: "Matches my notes."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: closing well.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps after a no.',
        lines: ['Thank them and stay calm', 'Find the real obstacle', 'Ask what would make it possible', 'Offer a staged deal', 'Agree a date in writing'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Shrinking concessions or not?',
        groups: ['Shrinking', 'Not'],
        items: [
          { text: '100 → 90 → 85 → 82', group: 0 },
          { text: '100 → 70 → 65', group: 1 },
          { text: '100 → 95 → 92', group: 0 },
          { text: '100 → 98 → 80', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: '"We can\'t do that this year." What\'s the best reply?',
        options: [
          { text: '"OK, never mind."', why: 'That gives up.' },
          { text: '"Then I\'m leaving."', why: 'A threat closes the talk.' },
          { text: '"Is it the amount or the timing? What could work this year?"' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'He offered ₦430,000. Should I just say yes?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Yes, and say nothing else.', why: 'She can get the review terms too.' },
          { text: 'Link it: "If we agree ₦430,000 now, could we put ₦480,000 after the goals in writing?"' },
          { text: 'No, demand ₦480,000.', why: 'A staged deal works for both.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Linking moves.',
        template: '"[[1]] I accept X, [[2]] could we agree Y?"',
        blanks: [['If'], ['then']],
        distractors: ['When', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A raise from ₦420,000 to ₦480,000 is how much a year, in naira? (12 months)',
        answers: ['720000', '720,000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague phrase to the clear version.',
        pairs: [
          ['"Soon"', 'On 1 February'],
          ['"More"', '₦480,000 a month'],
          ['"If it goes well"', 'Two named goals done'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this closing is the mistake?',
        lines: [
          'Thank you, this works for me.',
          'I\'ll send a summary this afternoon.',
          'No need to write anything, I trust you.',
          'Looking forward to the February review.',
        ],
        bug: 2,
        fix: 'Delete it: she sends the summary.',
        explanation: 'Trust and writing go together.',
      },
      {
        kind: 'mcq',
        prompt: 'What does a contingent agreement do?',
        options: [
          { text: 'Ties part of the deal to something that happens later' },
          { text: 'Cancels the deal', why: 'It makes part of it depend on results.' },
          { text: 'Splits the difference', why: 'It\'s about conditions and timing.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what time did Tobi reply "Matches my notes"? (Type like 4:30)',
        answers: ['4:30', '4.30', '430', '4:30 pm', '4:30 p.m.'],
        placeholder: 'A time',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one agreement in your life that you should confirm in writing this week?',
    starters: ['I will confirm...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1-4. (480,000 − 420,000) × 12 = 720,000.',
};

export default lesson;
