import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 2 — how career changes really happen (Ibarra, 2003). Reading. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'How changes really happen',
  summary: 'Clinton imagines career changers deciding one day and switching the next. Miracle sends him a summary of research that followed real career changers. Most of them did something quite different.',
  minutes: 12,
  outcomes: ['Describe the "test and learn" approach to career change', 'Name three ways to test a new direction', 'See change as a process, not a moment'],
  learn: [
    {
      kind: 'reading',
      title: 'Test and learn',
      html:
        '<p>Herminia Ibarra, a professor who studied people changing careers, described what she saw in her book <em>Working Identity</em> (2003). Many people expect to <strong>plan first, then act</strong>: work out exactly who they want to be, then make the switch. The people she followed mostly did the opposite: they <strong>acted their way into new thinking</strong>.</p>' +
        '<p>Three things helped most:</p>' +
        '<ul><li><strong>Experiments.</strong> Small projects, side work, temporary assignments: trying the new work before committing. Clinton\'s user research and the Bafoussam workshop are experiments.</li>' +
        '<li><strong>New networks.</strong> People in the new field know things and open doors your current circle can\'t. Aïcha, and the engineer who moved to product.</li>' +
        '<li><strong>Making sense of it.</strong> Telling a story that connects past and future: "I moved from building payments to deciding what we build, because..."</li></ul>' +
        '<p>Change usually takes time, with false starts. That isn\'t failure; it\'s how most people find a direction that fits.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Act your way into new thinking: experiments, new networks, and a story that connects past and future.',
    },
  ],
  apply: {
    scenario: 'Miracle\'s research summary.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Ibarra find most career changers did?',
        options: [
          { text: 'Planned perfectly, then switched in one day', why: 'Most tested first.' },
          { text: 'Acted their way into new thinking through experiments' },
          { text: 'Never changed', why: 'She studied people who did change.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to Clinton\'s example.',
        pairs: [
          ['Experiments', 'The Bafoussam workshop'],
          ['New networks', 'Aïcha and the engineer-turned-PM'],
          ['Making sense', '"From building payments to deciding what we build"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Experiment, or big commitment?',
        groups: ['Experiment', 'Big commitment'],
        items: [
          { text: 'A side project in product', group: 0 },
          { text: 'Resigning before trying', group: 1 },
          { text: 'A temporary assignment', group: 0 },
          { text: 'A two-year degree before any taste of it', group: 1 },
          { text: 'Shadowing a PM for a week', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I tried one product task and it was hard. Does that mean it\'s wrong for me?',
        options: [
          { text: 'Yes, stop now.', why: 'False starts are normal.' },
          { text: 'It should feel easy if it\'s right.', why: 'New work is often hard.' },
          { text: 'Not necessarily: hard and energising is different from hard and draining. One experiment is one data point.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the misunderstanding.',
        lines: ['Change usually takes time.', 'If it takes more than a month, I\'ve failed.', 'False starts are part of it.'],
        bug: 1,
        explanation: 'Change is a process, often with false starts.',
      },
      {
        kind: 'mcq',
        prompt: 'Why do new networks matter in a change?',
        options: [
          { text: 'People in the new field know things and open doors' },
          { text: 'To replace your old friends', why: 'To add knowledge and doors.' },
          { text: 'They don\'t', why: 'They often matter a lot.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What does "making sense" mean here?',
        options: [
          { text: 'Making money', why: 'A connecting story.' },
          { text: 'Common sense', why: 'A story connecting past and future.' },
          { text: 'A story that connects your past to your future' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the idea.',
        template: 'Act your way into new [[1]]. Use small [[2]].',
        blanks: [['thinking'], ['experiments']],
        distractors: ['debt', 'leaps', 'guesses'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In what year was Working Identity published? (a number)',
        answers: ['2003'],
        placeholder: 'A year',
      },
      {
        kind: 'sortGroups',
        prompt: 'New network contact, or old circle?',
        groups: ['New network', 'Old circle'],
        items: [
          { text: 'Aïcha, product manager', group: 0 },
          { text: 'His football team', group: 1 },
          { text: 'An engineer who moved to product', group: 0 },
          { text: 'His school friends', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you were changing direction, what experiment, new contact and story would you start with?',
    starters: ['Experiment:', 'New contact:'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Look up a summary of Herminia Ibarra\'s Working Identity. Notice the idea of testing "possible selves".',
  },
  notes: 'Ibarra, H. (2003). Working Identity: Unconventional Strategies for Reinventing Your Career. Harvard Business School Press. Summarised, not quoted.',
};

export default lesson;
