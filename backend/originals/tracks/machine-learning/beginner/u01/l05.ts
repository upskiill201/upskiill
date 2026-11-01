import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: rules vs learning, everyday ML, examples/features/labels, finding a rule. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the first page',
  summary: 'One page, twelve patients, one rule that\'s right 11 times out of 12. Halima tapes it above her desk. Quick check before she meets the man who gave machine learning its name.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain rules vs learning without notes', 'Name features and labels, and test a rule'],
  learn: [
    {
      kind: 'story',
      title: 'The sticky note',
      beats: [
        { speaker: 'narrator', text: 'Halima writes the rule on a sticky note: "Waited over 14 days, no reminder: likely to miss."' },
        { speaker: 'bisi', text: 'If that\'s right, I know who to call first tomorrow.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: what machine learning is.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What makes a program "machine learning"?',
        options: [
          { text: 'It runs on a fast computer', why: 'Speed has nothing to do with it.' },
          { text: 'It finds its rules from examples' },
          { text: 'It has a lot of if-statements', why: 'Hand-written rules are normal programming.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "Print \"5 of 12 missed\" using the two variables",
        starter: "missed = 5\ntotal = 12\n",
        solution: "missed = 5\ntotal = 12\nprint(f\"{missed} of {total} missed\")\n",
        hint: "print(f\"{missed} of {total} missed\")",
        checks: [
          { message: "Print 5 of 12 missed", outputEquals: "5 of 12 missed" },
          { message: "Use the variables", codeIncludes: "{missed}" },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Feature or label, when predicting whether a patient will miss?',
        groups: ['Feature', 'Label'],
        items: [
          { text: 'reminder', group: 0 },
          { text: 'missed', group: 1 },
          { text: 'wait_days', group: 0 },
          { text: 'distance_km', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it learned from.',
        pairs: [
          ['Spam filter', 'Emails marked as spam'],
          ['Keyboard', 'Lots of typed text'],
          ['No-show model', 'Past appointments and who came'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Rule: wait > 14 and no reminder → miss. Hauwa: 16 days, no reminder. Prediction?',
        options: [
          { text: 'Will miss' },
          { text: 'Will come', why: '16 > 14 and no reminder: both parts true.' },
          { text: 'Can\'t tell', why: 'The rule always gives an answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Using the rule, miss or come?',
        groups: ['Will miss', 'Will come'],
        items: [
          { text: '30 days, no reminder', group: 0 },
          { text: '30 days, reminder', group: 1 },
          { text: '5 days, no reminder', group: 1 },
          { text: '15 days, no reminder', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the wrong sentence.',
        lines: [
          'Each row of the table is an example.',
          'Features are the clues we know before the day.',
          'A good model is right every single time.',
          'The label is the answer we want to predict.',
        ],
        bug: 2,
        fix: 'A good model is right most of the time, and we measure how often.',
        explanation: 'Even good models make mistakes. The rule was right 11 of 12 times, and that was good.',
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Let\'s add "how long the visit took" as a feature.',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Sure, more is better.', why: 'A feature from after the event can\'t help you predict it.' },
          { text: 'We only know that after the visit. We have to predict before, so it can\'t be a clue.' },
          { text: 'Visits don\'t take time.', why: 'The issue is WHEN we know it, not whether it exists.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Machine learning in one line.',
        template: 'Give the computer [[1]] with answers, and it finds the [[2]].',
        blanks: [['examples'], ['rules', 'patterns']],
        distractors: ['robots', 'labels'],
      },
      {
        kind: 'mcq',
        prompt: 'Chidi wants to add "or the name is Obi" to make the rule perfect. What\'s wrong?',
        options: [
          { text: 'Nothing: 12 out of 12 is better', why: 'Perfect on old examples isn\'t the goal. New patients are.' },
          { text: 'Names are too long', why: 'The problem is that it won\'t work for anyone new.' },
          { text: 'It memorises this page instead of learning a pattern for new patients' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps a model (or Halima) follows.',
        lines: ['Collect examples with answers', 'Find a pattern', 'Turn it into a rule', 'Check how often it\'s right'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'One row of a dataset is called an... (one word)',
        answers: ['example', 'sample', 'observation', 'record'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So is this "AI" or not?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, it\'s fully finished AI.', why: 'It\'s a hand-made rule from 12 rows: a start.' },
          { text: 'It\'s the first step. Right now it\'s a rule I found by hand. Soon a computer will find better ones from thousands of appointments.' },
          { text: 'No, and it never will be.', why: 'Learning rules from data is exactly what comes next.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What surprised you most so far: how simple the core idea is, or how much it depends on good examples?',
    starters: ['I was surprised that...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1-4. Uses the made-up 12-patient table from lesson 4.',
};

export default lesson;
