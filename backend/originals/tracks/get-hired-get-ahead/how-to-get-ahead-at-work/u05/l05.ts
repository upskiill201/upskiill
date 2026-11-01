import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: Aïcha says yes to the experiment. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the priority list',
  summary: 'Aïcha agrees: Clinton can draft next quarter\'s offline priority list. He has two weeks. Before he starts, Miracle quizzes him. Leap vs bridge, test and learn, not starting from zero, and mapping the bridge.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Choose tested moves over blind leaps', 'Explain test-and-learn change', 'Map a bridge between roles'],
  learn: [
    {
      kind: 'story',
      title: 'Two weeks',
      beats: [
        { speaker: 'narrator', text: 'Aïcha\'s reply: "Yes. Draft it, and I\'ll review it with you. Two weeks."' },
        { speaker: 'miracle', text: 'Another experiment. Good. Quiz first.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: before the priority list.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why test before leaping?',
        options: [
          { text: 'Leaps never work', why: 'They sometimes do; testing is safer.' },
          { text: 'It costs less and teaches more' },
          { text: 'It\'s slower, so it\'s better', why: 'It\'s cheaper and more informative.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of test-and-learn to an example.',
        pairs: [
          ['Experiments', 'The priority list draft'],
          ['New networks', 'Aïcha'],
          ['Making sense', 'A bridge story'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the bridge-mapping steps in order.',
        lines: ['List what the role needs', 'Match your evidence', 'Mark the gaps honestly', 'Plan one experiment per gap', 'Turn it into a story'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Leap or bridge?',
        groups: ['Leap', 'Bridge'],
        items: [
          { text: 'Quit for a bootcamp', group: 0 },
          { text: 'Draft the priority list', group: 1 },
          { text: 'Internal transfer', group: 1 },
          { text: 'Resign with no plan', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the restart framing.',
        lines: ['My engineering helps me judge what\'s buildable.', 'I\'m starting from absolute zero.', 'I\'ve run user research.'],
        bug: 1,
        explanation: 'Untrue. Show what carries over.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Miracle.',
        from: 'miracle',
        message: 'What did Ibarra find about career changers?',
        options: [
          { text: 'They planned perfectly first.', why: 'Most tested first.' },
          { text: 'They all failed.', why: 'She studied successful changes.' },
          { text: 'Most acted their way into new thinking with experiments, new networks and a story.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What is Clinton\'s biggest product gap?',
        options: [
          { text: 'Prioritising a roadmap' },
          { text: 'User research', why: 'He has evidence there.' },
          { text: 'Technical judgement', why: 'He has a year of it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s summary.',
        template: 'Test before you [[1]]. You\'re not starting from [[2]].',
        blanks: [['leap'], ['zero']],
        distractors: ['plan', 'scratch', 'home'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks does Clinton have for the priority list? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Carries over, or not?',
        groups: ['Carries over', 'Doesn\'t'],
        items: [
          { text: 'Knowing what\'s buildable', group: 0 },
          { text: 'A test framework\'s quirks', group: 1 },
          { text: 'Relationships with support', group: 0 },
          { text: 'His editor theme', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Are false starts in a career change a sign of failure?',
        options: [
          { text: 'Yes, always', why: 'They\'re normal.' },
          { text: 'Only for graduates', why: 'Normal for everyone.' },
          { text: 'No, they\'re a normal part of the process' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What experiment could you run in the next two weeks to test a direction you\'re curious about?',
    starters: ['My experiment:', 'I\'ll ask...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask for one two-week experiment in a direction you\'re curious about, with someone to review it.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
