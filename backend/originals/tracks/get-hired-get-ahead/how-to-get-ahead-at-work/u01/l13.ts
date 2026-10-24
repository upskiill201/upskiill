import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 13 — making the most of 1:1s with your manager. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Your 1:1',
  summary: 'Every Tuesday, Clinton has 30 minutes with Ngozi. For three weeks he turned up with nothing, and they talked about the weather. Tey shows him how to make the 1:1 the most useful half hour of his week.',
  minutes: 11,
  outcomes: ['Bring an agenda to your 1:1s', 'Use them for progress, problems and growth', 'Keep simple notes'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Whose meeting is a 1:1?',
          replies: ['Ngozi\'s', 'Mine?'],
        },
        {
          tey: 'Mostly yours. Many managers expect you to bring the agenda. Without one, the time drifts. A simple shape: progress since last week, anything stuck, one bigger topic, and feedback.',
          replies: ['What\'s a bigger topic?'],
        },
        {
          tey: 'Something beyond this week: "What skills should I build to own a bigger feature?" "How did the incident go from your side?" "What does the team need most next quarter?" One per week is plenty.',
          replies: ['And feedback?'],
        },
        {
          tey: 'Ask for it regularly, small and specific: "What\'s one thing I could do better in code reviews?" And keep notes in one running doc, with dates. In six months, that doc will help you a lot.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Your 1:1, your agenda: progress, stuck, one bigger topic, feedback. Keep a running doc.',
    },
  ],
  apply: {
    scenario: 'Clinton plans his Tuesday 1:1.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Who usually brings the 1:1 agenda?',
        options: [
          { text: 'Always the manager', why: 'Many managers expect you to bring it.' },
          { text: 'You, the employee' },
          { text: 'Nobody', why: 'Without one, the time drifts.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the 1:1 agenda in order.',
        lines: ['Progress since last week', 'Anything stuck', 'One bigger topic', 'Feedback'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good 1:1 topic, or not?',
        groups: ['Good', 'Not useful'],
        items: [
          { text: 'What skills to build for bigger features', group: 0 },
          { text: 'Only the weather', group: 1 },
          { text: 'A blocker on the retry button', group: 0 },
          { text: 'Complaining about a colleague\'s shoes', group: 1 },
          { text: 'One thing to do better in reviews', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best bigger topic.',
        from: 'clinton',
        message: 'What should my bigger topic be this week?',
        options: [
          { text: '"When will I be promoted?" (week seven)', why: 'Ask what to build toward first.' },
          { text: '"Nothing, I\'m fine."', why: 'Bring one topic.' },
          { text: '"What would I need to show to own a bigger feature next quarter?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the habit that wastes the 1:1.',
        lines: ['Brings four short agenda points.', 'Turns up with nothing and waits.', 'Keeps notes in a running doc.'],
        bug: 1,
        explanation: 'Without an agenda, the time drifts.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each agenda part to an example.',
        pairs: [
          ['Progress', 'Retry button ready for review'],
          ['Stuck', 'Need access to the staging logs'],
          ['Feedback', 'One thing to improve in reviews?'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why keep 1:1 notes in one running doc?',
        options: [
          { text: 'They show progress over months and help later conversations' },
          { text: 'To catch Ngozi out', why: 'It\'s for his progress.' },
          { text: 'No reason', why: 'They help a lot later.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the agenda.',
        template: 'Progress, [[1]], one bigger topic, [[2]].',
        blanks: [['stuck'], ['feedback']],
        distractors: ['gossip', 'weather', 'lunch'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is Clinton\'s weekly 1:1? (a number)',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific feedback question, or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: 'One thing to improve in my reviews?', group: 0 },
          { text: 'How am I doing?', group: 1 },
          { text: 'Was my incident message clear enough?', group: 0 },
          { text: 'Any thoughts?', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you had 30 minutes with your manager, teacher or mentor every week, what would your first agenda be?',
    starters: ['Progress:', 'Bigger topic:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Start a running 1:1 doc: date, progress, stuck, bigger topic, feedback. Use it at your next meeting with someone senior.',
  },
  notes: 'Common 1:1 practice; some managers run their own agenda, so ask how they prefer it.',
};

export default lesson;
