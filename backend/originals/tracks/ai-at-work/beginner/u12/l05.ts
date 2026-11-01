import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 12 · Lesson 5 — Checkpoint 1. Comparing, built-in, free vs paid, matching. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: choosing tools fairly',
  summary: 'Fair comparisons, built-in AI, free vs paid and matching tools to tasks. Show you can cut through the tool noise.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can compare tools fairly', 'Show you can match tools to tasks and data'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 12, first Checkpoint. Five demos, one decision.', replies: ['Ready'] },
        { tey: 'Warm-up: how do you compare tools fairly?', replies: ['Same tasks, same prompts, same criteria'] },
        { tey: 'Exactly. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: choosing for Carmen\'s team.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order a fair comparison.',
        lines: ['Pick 3 real tasks', 'Same prompts in each tool', 'Score on the same criteria', 'Compare'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good criterion, or not?',
        groups: ['Good', 'Not useful'],
        items: [
          { text: 'Accuracy on our tasks', group: 0 },
          { text: 'The salesperson\'s charm', group: 1 },
          { text: 'Data safety', group: 0 },
          { text: 'The logo', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why check built-in AI before buying a new tool?',
        options: [
          { text: 'It may already do the job and knows your files' },
          { text: 'It\'s always better', why: 'Not always; check first.' },
          { text: 'New tools are banned', why: 'Check first.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Free plan, or business plan, typically?',
        groups: ['Free', 'Business'],
        items: [
          { text: 'Limits that run out', group: 0 },
          { text: 'Admin controls', group: 1 },
          { text: 'May train on chats by default', group: 0 },
          { text: 'Limits training on your data', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which match is a mistake?',
        lines: ['Thread summary: email AI', 'Formula: spreadsheet AI', 'Customer IDs: free public chat', 'Cover image: approved image tool'],
        bug: 2,
        fix: 'Approved tool, under data rules.',
        explanation: 'Personal data.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the five matching questions.',
        lines: ['Task', 'Data', 'Where it lives', 'What good needs', 'Is AI right?'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Which AI is the best?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'The newest.', why: 'Task first.' },
          { text: 'For which task, with what data? Tell me and I\'ll suggest the right kind of tool.' },
          { text: 'The priciest.', why: 'Task first.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which test task is most useful for comparing tools?',
        options: [
          { text: 'Write a poem.', why: 'Not their work.' },
          { text: 'Summarise this real campaign report for Carmen in 5 bullets with page numbers.' },
          { text: 'Tell a joke.', why: 'Not their work.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Check what you [[1]] first. For work data, the [[2]] matter most.',
        blanks: [['have'], ['terms']],
        distractors: ['want', 'logos'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the need to what paying often buys.',
        pairs: [
          ['Running out of messages', 'Higher limits'],
          ['Client data', 'Safer data terms'],
          ['Team access', 'Admin controls'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the comparison rule.',
        tiles: ['Same', 'tasks,', 'same', 'prompts,', 'same', 'scores'],
        distractors: ['demos'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many real tasks does Ada test in a comparison?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which built-in AI use needs care?',
        lines: ['Email thread summary', 'Formula help', 'Recording a client call without telling them', 'Voice typing a note'],
        bug: 2,
        fix: 'Tell everyone, and follow client rules.',
        explanation: 'Recording consent.',
      },
      {
        kind: 'mcq',
        prompt: 'Does paying remove company data rules?',
        options: [
          { text: 'Yes', why: 'Rules still apply.' },
          { text: 'Only for small teams', why: 'Always apply.' },
          { text: 'No; rules still apply' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these four would most improve how your team picks tools?',
    starters: ['The one:', 'Because...'],
  },
  notes: 'Checkpoint for Unit 12 lessons 1-4.',
};

export default lesson;
