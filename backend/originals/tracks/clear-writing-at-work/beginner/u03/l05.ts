import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: point first',
  summary: '"I need them to...", BLUF, the ask first, and subject lines. A quick check before Zanele learns to make replying easy.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Lead with the ask', 'Write useful subject lines'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday',
      beats: [
        { speaker: 'zanele', text: 'Both emails rewritten. Asks first, decisions in the subject lines.' },
        { speaker: 'achieng', text: 'Good. Now make it so easy to reply that he can do it from his phone at a traffic light.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: point first.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the BLUF steps.',
        lines: ['Bottom line', 'Why', 'What it costs or changes', 'What happens next'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong or weak subject line?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: '"Action by Monday: sign the June rota"', group: 0 },
          { text: '"Hello"', group: 1 },
          { text: '"Question: can we start Lagos in June?"', group: 0 },
          { text: '"Update"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should be the first line of a request?',
        options: [
          { text: 'The ask' },
          { text: 'The history', why: 'That buries the ask.' },
          { text: 'An apology', why: 'Start with the ask.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague phrase to the clear one.',
        pairs: [
          ['"Any thoughts?"', '"Yes or no?"'],
          ['"When you get a chance"', '"By Friday"'],
          ['"Would it be possible to consider"', '"Please could you approve"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'My manager says background first is more respectful.',
        prompt: "Mrs Achieng\'s best reply?",
        options: [
          { text: 'Respect is not wasting his time. Give the ask first, then the background for anyone who wants it.' },
          { text: 'Your manager is right.', why: 'Busy readers need the ask first.' },
          { text: 'Ignore your manager.', why: 'Explain the reason kindly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'BLUF.',
        template: 'Bottom [[1]] up [[2]].',
        blanks: [['line'], ['front']],
        distractors: ['half', 'last'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this request is in the wrong place?',
        lines: [
          'As background, the team was formed in 2019 and...',
          'Please approve hiring one extra driver by Friday.',
          'Why: Saturday orders are up 30%.',
          'If yes, we post the job on Monday.',
        ],
        bug: 0,
        fix: 'Delete it, or move it to the end.',
        explanation: 'Background before the ask.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'From 34% to 21%: how many percentage points did late deliveries fall?',
        answers: ['13'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which subject-line type means no action is needed?',
        options: [
          { text: 'FYI' },
          { text: 'Decision needed', why: 'That needs a decision.' },
          { text: 'Action', why: 'That needs action.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps are in BLUF as this course teaches it?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite one request you need to send this week using BLUF and a strong subject line.',
    starters: ['Subject:...', 'First line:...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4. 34 − 21 = 13 points.',
};

export default lesson;
