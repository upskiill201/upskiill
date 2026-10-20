import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: the audit results. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the audit results',
  summary: 'Two weeks of evenings, 28 lines, one surprise. Clinton shows Miracle the counts on a video call. She smiles: "You keep lighting up when you talk about drivers." Then a quiz. Drifting, career plans, direction and the energy audit.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain what a career plan is', 'Write a direction, not a vague goal', 'Use an energy audit'],
  learn: [
    {
      kind: 'story',
      title: '28 lines',
      beats: [
        { speaker: 'narrator', text: 'Two weeks. 28 lines. Talking to users: 8 up. Deciding what to build: 6 up. Deep debugging: 5 down.' },
        { speaker: 'miracle', text: 'You keep lighting up when you talk about drivers. Interesting. Quiz first, then we talk about what it means.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the audit results.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the plan\'s parts in order.',
        lines: ['Direction', 'Skills', 'Experiences', 'Next steps'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s a career plan?',
        options: [
          { text: 'A set of choices you update as you learn' },
          { text: 'A fixed prophecy', why: 'It changes as you learn.' },
          { text: 'A list of titles', why: 'Choices, skills, steps.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Vague or directional?',
        groups: ['Vague', 'Directional'],
        items: [
          { text: 'Be successful', group: 0 },
          { text: 'Closer to deciding what we build', group: 1 },
          { text: 'Earn more', group: 0 },
          { text: 'Talk to two product managers this month', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step that jumps too fast.',
        lines: ['Notices a pattern.', 'Resigns tomorrow.', 'Tests it with small experiments.'],
        bug: 1,
        explanation: 'Test before you jump.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Miracle.',
        from: 'miracle',
        message: 'What will you do with the audit?',
        options: [
          { text: 'Try more user-facing work in small ways, and see if the pattern holds.' },
          { text: 'Switch to product tomorrow.', why: 'Test first.' },
          { text: 'Nothing.', why: 'It\'s useful data.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its source.',
        pairs: [
          ['If-then plans', 'Gollwitzer\'s research'],
          ['Where in three years?', 'Paul at lunch'],
          ['Energy audit', 'Miracle\'s suggestion'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is a good if-then plan?',
        options: [
          { text: '"If it\'s Friday evening, then I\'ll write my energy lines."' },
          { text: '"I\'ll try to remember."', why: 'Use a trigger.' },
          { text: '"Maybe sometimes."', why: 'Use if-then.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s observation.',
        template: 'You keep [[1]] up when you talk about [[2]].',
        blanks: [['lighting'], ['drivers']],
        distractors: ['giving', 'money', 'code'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines did Clinton write in two weeks? (a number)',
        answers: ['28', 'twenty-eight', 'twenty eight'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Choosing or drifting?',
        groups: ['Choosing', 'Drifting'],
        items: [
          { text: 'Running an energy audit', group: 0 },
          { text: 'Taking whatever comes', group: 1 },
          { text: 'Writing a direction', group: 0 },
          { text: 'An impressive title with no reason', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many skills should a plan focus on?',
        options: [
          { text: 'Two or three' },
          { text: 'Ten', why: 'Too many.' },
          { text: 'None', why: 'Two or three.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'If your energy audit showed a surprise, what small experiment would you run next?',
    starters: ['The surprise might be...', 'My experiment:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Look at your energy lines so far. Circle the work that came up most often as "energy up".',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;
