import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 19 — the learner's change strategy (kit piece 5). Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your change strategy',
  summary: 'Your turn. Whether you\'re changing roles, fields or just testing an idea, here\'s the last piece of your kit: a one-page change strategy you can follow at your own pace.',
  minutes: 12,
  outcomes: ['Write a one-page change strategy', 'Plan reversible experiments', 'Set a fair review point'],
  learn: [
    {
      kind: 'steps',
      title: 'Kit piece 5: your change strategy',
      steps: [
        { title: '1. The direction and the bridge', body: 'Where you\'re heading, and what carries over from where you are. One sentence each.' },
        { title: '2. Three experiments', body: 'Small, reversible tests: a task in your current job, a side project, a short assignment. Each with a reviewer.' },
        { title: '3. A new network', body: 'Three people in the new field, and one community or meet-up.' },
        { title: '4. Your story and your route', body: 'Your "why the change" in four sentences. Your route: internal move, bridge role, or outside change. Your money plan for any dip.' },
        { title: '5. A fair review point', body: 'A date and three questions: am I learning, is my energy up, are the people I serve better off?' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Direction and bridge, three experiments, a new network, a story and route, a fair review point.',
    },
  ],
  apply: {
    scenario: 'You write your change strategy.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the kit piece in order.',
        lines: ['The direction and the bridge', 'Three experiments', 'A new network', 'Your story and your route', 'A fair review point'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Reversible experiment, or a big leap?',
        groups: ['Experiment', 'Big leap'],
        items: [
          { text: 'A task in your current job', group: 0 },
          { text: 'Resigning first', group: 1 },
          { text: 'A side project', group: 0 },
          { text: 'A short assignment', group: 0 },
          { text: 'Moving abroad with no plan', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What are the three fair review questions?',
        options: [
          { text: 'Am I learning? Is my energy up? Are people I serve better off?' },
          { text: 'Am I rich? Am I famous? Am I the boss?', why: 'Learning, energy, impact.' },
          { text: 'Was today good?', why: 'Learning, energy, impact.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'A learner happily loves their job and doesn\'t want to change. Do they need this?',
        options: [
          { text: 'Keep it for later. Most careers have turns, and it helps to know how to change well when one comes.' },
          { text: 'Yes, they must change now.', why: 'No need to change; keep it for later.' },
          { text: 'Delete it.', why: 'Keep it for when it\'s needed.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak strategy line.',
        lines: ['Three experiments with reviewers.', 'Review: whenever I feel like it.', 'Three people in the new field.'],
        bug: 1,
        explanation: 'Set a fair review date.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each route to an example.',
        pairs: [
          ['Internal move', 'Developer to APM at Njangi Pay'],
          ['Bridge role', 'Reporting analyst at a bank'],
          ['Outside change', 'Side project, then a new employer'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why include a money plan?',
        options: [
          { text: 'Some changes involve a short-term dip' },
          { text: 'To get rich', why: 'To manage any dip.' },
          { text: 'It\'s not needed', why: 'A dip can happen.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the kit.',
        template: 'Three [[1]], a new [[2]], a fair review point.',
        blanks: [['experiments'], ['network']],
        distractors: ['leaps', 'title', 'excuse'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many experiments does the strategy plan? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the strategy, or not?',
        groups: ['In it', 'Not in it'],
        items: [
          { text: 'A bridge sentence', group: 0 },
          { text: 'A plan to burn bridges', group: 1 },
          { text: 'A review date', group: 0 },
          { text: 'An invented title', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write your direction and bridge sentences now, even for a change you\'re only curious about.',
    starters: ['Direction:', 'What carries over:'],
  },
  deepen: {
    title: 'Your kit, piece 5',
    summary: 'Write your one-page change strategy. Plan your first experiment for this month.',
  },
  notes: 'Kit piece 5, the final piece of How to Get Ahead at Work.',
};

export default lesson;
