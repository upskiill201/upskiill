import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: the plan is signed off. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: signed off',
  summary: 'Ngozi replies to Clinton\'s summary: "Yes, that\'s the plan. 1 March." Paul, overhearing, says: "Retry-service design doc? Send it to me first." Before he starts, a quiz. The ladder, dates, gap plans and asking clearly.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Read a career ladder for evidence and gaps', 'Turn "not yet" into a dated plan', 'Ask clearly, without hinting'],
  learn: [
    {
      kind: 'story',
      title: 'Yes, that\'s the plan',
      beats: [
        { speaker: 'narrator', text: 'Ngozi\'s reply: "Yes, that\'s the plan. 1 March."' },
        { speaker: 'paul', text: 'Retry-service design doc? Send it to me first. I\'ll be honest.' },
        { speaker: 'clinton', text: '(to himself) He will. That\'s the point.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: the plan.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the ladder-reading method in order.',
        lines: ['What does it mean here?', 'What evidence do I have?', 'What\'s missing?', 'What\'s one concrete action?'],
      },
      {
        kind: 'mcq',
        prompt: 'What turns "revisit later" into a plan?',
        options: [
          { text: 'A guaranteed promotion', why: 'A plan, not a promise.' },
          { text: 'A date, specific evidence and check-ins' },
          { text: 'Waiting', why: 'Date, evidence, check-ins.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear ask, or hint?',
        groups: ['Clear', 'Hint'],
        items: [
          { text: 'I\'d like to work towards Developer by March', group: 0 },
          { text: 'Some people get promoted fast, huh?', group: 1 },
          { text: 'What would you need to see?', group: 0 },
          { text: 'Sighing about my title', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak gap-plan line.',
        lines: ['Lead the retry rebuild with Kemi.', 'Become a better person overall.', 'Write the design doc; Paul reviews it.'],
        bug: 1,
        explanation: 'Too vague. Name real projects and observable "done".',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Paul.',
        from: 'paul',
        message: 'Why do you want me to review the design doc first? I\'m harsh.',
        options: [
          { text: 'I don\'t, actually.', why: 'Hard reviews help.' },
          { text: 'So you\'ll approve it quickly.', why: 'It\'s about improving it.' },
          { text: 'Because your review will make it much better, and shows I can explain trade-offs to a tough reviewer.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each plan part to Clinton\'s version.',
        pairs: [
          ['Date', '1 March'],
          ['Gap 1', 'Lead the retry rebuild with Kemi'],
          ['Gap 2', 'Write the design doc'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why is hinting risky?',
        options: [
          { text: 'Managers often miss hints, or read them as complaints' },
          { text: 'Hints always work', why: 'They often get missed.' },
          { text: 'It\'s illegal', why: 'It\'s just unclear.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Don\'t [[1]]. Ask [[2]].',
        blanks: [['hint'], ['clearly']],
        distractors: ['plan', 'never', 'loudly'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who will review the design doc first? (one word)',
        answers: ['paul'],
        placeholder: 'A name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence he has, or a gap?',
        groups: ['Has it', 'Gap'],
        items: [
          { text: 'Mentoring Kemi', group: 0 },
          { text: 'Leading a two-person project', group: 1 },
          { text: 'End-to-end delivery', group: 0 },
          { text: 'A design doc', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many gaps is Clinton focusing on?',
        options: [
          { text: 'Five', why: 'Two, for focus.' },
          { text: 'None', why: 'Two.' },
          { text: 'Two' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Who would give you the hardest, most useful review of your work? Would you ask them?',
    starters: ['The hardest reviewer would be...', 'I would / wouldn\'t ask because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask a tough, fair person to review one piece of your work this month. Thank them for every comment.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09.',
};

export default lesson;
