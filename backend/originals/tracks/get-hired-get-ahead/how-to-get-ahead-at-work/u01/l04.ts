import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 4 — free. Writing a 30-60-90 plan. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'A 30-60-90 plan',
  summary: 'Clinton turns Ngozi\'s answers into a one-page plan: what he\'ll learn, do and deliver in each month. Miracle says it\'s the most useful page he\'ll write this year.',
  minutes: 12,
  outcomes: ['Write a one-page 30-60-90 plan', 'Split each phase into learn, do and people', 'Use the plan in your 1:1s'],
  learn: [
    {
      kind: 'steps',
      title: 'One page, three phases',
      steps: [
        { title: 'Days 1–30: learn', body: 'Learn the sync service and the deploy process. Meet everyone on the team and the support lead. Fix nothing big yet. Write notes in a shared doc so the next new person benefits.' },
        { title: 'Days 31–60: contribute', body: 'Ship one small fix drivers have complained about. Review two of Paul\'s pull requests to learn his standards. Ask for feedback once.' },
        { title: 'Days 61–90: own', body: 'Own one small feature from start to finish: the "retry failed sync" button. Present it at the team demo.' },
        { title: 'For each phase: people', body: 'Name one or two people to learn from. Days 1–30: Paul and the support lead. Days 31–60: the QA tester. Days 61–90: a product manager.' },
        { title: 'Use it every week', body: 'Bring the plan to Tuesday 1:1s. Tick off what\'s done, flag what\'s stuck, adjust it with Ngozi. A plan you don\'t look at isn\'t a plan.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Learn, contribute, own. People for each phase. Bring it to every 1:1.',
    },
  ],
  apply: {
    scenario: 'Clinton writes his 30-60-90 plan.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the three phases in order.',
        lines: ['Days 1–30: learn', 'Days 31–60: contribute', 'Days 61–90: own'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which phase does this belong to?',
        groups: ['Days 1–30', 'Days 61–90'],
        items: [
          { text: 'Learn the deploy process', group: 0 },
          { text: 'Own the retry button feature', group: 1 },
          { text: 'Meet everyone on the team', group: 0 },
          { text: 'Present at the team demo', group: 1 },
          { text: 'Write notes in a shared doc', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why review Paul\'s pull requests in days 31–60?',
        options: [
          { text: 'To learn his standards before writing bigger code' },
          { text: 'To find his mistakes', why: 'To learn, not to catch him out.' },
          { text: 'No reason', why: 'It teaches the team\'s standards.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step in the wrong phase.',
        lines: ['Days 1–30: learn the sync service.', 'Days 1–30: redesign the whole app.', 'Days 31–60: ship one small fix.'],
        bug: 1,
        explanation: 'Too big, too early. Learn first.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I wrote the plan. Do I just keep it in a drawer now?',
        options: [
          { text: 'No: I\'ll bring it to every Tuesday 1:1, tick things off and adjust it with Ngozi.' },
          { text: 'Yes, it\'s done.', why: 'A plan you don\'t look at isn\'t a plan.' },
          { text: 'Rewrite it daily.', why: 'Weekly check-ins are enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each phase to its people.',
        pairs: [
          ['Days 1–30', 'Paul and the support lead'],
          ['Days 31–60', 'The QA tester'],
          ['Days 61–90', 'A product manager'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why write notes in a shared doc?',
        options: [
          { text: 'The next new person benefits, and it shows he helps the team' },
          { text: 'To look busy', why: 'It helps others.' },
          { text: 'It\'s required', why: 'It\'s a generous habit.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the plan.',
        template: 'Learn, [[1]], [[2]].',
        blanks: [['contribute'], ['own']],
        distractors: ['rest', 'quit', 'hide'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days does a 30-60-90 plan cover? (a number)',
        answers: ['90', 'ninety'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good plan habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Ticking things off in 1:1s', group: 0 },
          { text: 'Never looking at it again', group: 1 },
          { text: 'Adjusting it with the manager', group: 0 },
          { text: 'Keeping it secret from the manager', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For your current or next role, what would you learn, contribute and own in each 30 days?',
    starters: ['Days 1–30:', 'Days 61–90:'],
  },
  deepen: {
    title: 'Your kit, piece 1',
    summary: 'Write a one-page 30-60-90 plan for your current or next role: learn, contribute, own, plus people for each phase. This is piece 1 of your career-growth kit.',
  },
  notes: '30-60-90 plans are a widely used onboarding format.',
};

export default lesson;
