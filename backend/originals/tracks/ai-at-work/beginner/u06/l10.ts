import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 10 — Checkpoint 2. Estimates, priorities, checklists, launch planning. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: honest time, clear order',
  summary: 'Honest estimates, real priorities, short checklists and a launch planned backwards. Show you can plan like you mean it.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can estimate and prioritise honestly', 'Show you can plan a launch with a plan B'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 2. Three weeks to the Makola launch.', replies: ['Ready'] },
        { tey: 'Warm-up: Tolu says "one week, easy". What do you ask?', replies: ['What happened last time?'] },
        { tey: 'Past cases beat hope. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: three weeks to launch.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the planning fallacy?',
        options: [
          { text: 'Planning too far ahead', why: 'It\'s about optimism.' },
          { text: 'Underestimating how long things will take' },
          { text: 'Not planning', why: 'It\'s about estimates.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest or optimistic estimate?',
        groups: ['Honest', 'Optimistic'],
        items: [
          { text: '"2 weeks likely, 3 at worst"', group: 0 },
          { text: '"Done by Friday if all goes well"', group: 1 },
          { text: '"Last time took 16 days"', group: 0 },
          { text: '"Easy, two days"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the box to the action.',
        pairs: [
          ['Important and urgent', 'Do now'],
          ['Important, not urgent', 'Schedule'],
          ['Urgent, not important', 'Keep short or delegate'],
          ['Neither', 'Drop'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which task is in the wrong box?',
        lines: ['Do now: fix the sign-up form', 'Do now: budget to Tobi', 'Do now: rename old files', 'Schedule: review template'],
        bug: 2,
        fix: 'Drop it, or do it in a spare moment.',
        explanation: 'Neither urgent nor important.',
      },
      {
        kind: 'mcq',
        prompt: 'How long should a working checklist be?',
        options: [
          { text: '30 or more', why: 'Long lists get skipped.' },
          { text: 'One item', why: 'Too short to help.' },
          { text: 'About 5 to 9 items' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'On the sign-up checklist, or not?',
        groups: ['On it', 'Not on it'],
        items: [
          { text: 'Test payment completed', group: 0 },
          { text: 'Walk to the shop', group: 1 },
          { text: 'ID matches account name', group: 0 },
          { text: 'Say good morning', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the launch planning steps.',
        lines: ['Fix date and goal', 'Work backwards', 'Run of show', 'Things to bring', 'Plan B'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can Tolu do my flyer colours today? He\'s on the budget, I know.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'The budget is due Thursday and comes first. Friday for the colours? If it can\'t wait, I\'ll do a quick version.' },
          { text: 'Sure, he\'ll drop the budget.', why: 'Budget is important and urgent.' },
          { text: 'No.', why: 'Offer a time.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which estimating request is best?',
        options: [
          { text: 'How long will it take?', why: 'Gets one optimistic number.' },
          { text: 'List every step and wait in this task, including the usually forgotten ones. Then give a likely and a worst-case time.' },
          { text: 'Make it quick.', why: 'Doesn\'t estimate.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Give a [[1]], not a date. Checklist only easy-to-[[2]] steps.',
        blanks: [['range'], ['miss']],
        distractors: ['guess', 'love'],
      },
      {
        kind: 'findBug',
        prompt: 'Which item is planned too late?',
        lines: ['1 week before: confirm bank', '3 days before: print flyers', 'Morning of: book the venue permit', 'Day before: charge phones'],
        bug: 2,
        fix: 'Book the permit weeks before.',
        explanation: 'Permits can\'t be arranged on the morning.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the plan B question.',
        tiles: ['What', 'are', 'the', '3', 'most', 'likely', 'problems?'],
        distractors: ['all'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Buehler\'s students guessed 34 days. About how long did it take?',
        answers: ['56', '55', '55.5'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'AI suggests, or a person decides?',
        groups: ['AI suggests', 'Person decides'],
        items: [
          { text: 'First sort of the task list', group: 0 },
          { text: 'Which task wins a conflict', group: 1 },
          { text: 'A things-to-bring list', group: 0 },
          { text: 'Which shops take part', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do experts like surgeons use checklists?',
        options: [
          { text: 'They\'re beginners', why: 'Experts use them too.' },
          { text: 'It\'s just tradition', why: 'They measurably reduce mistakes.' },
          { text: 'Under pressure, anyone can skip a step' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which planning habit from this checkpoint is your weakest?',
    starters: ['My weakest:', 'I\'ll practise it by...'],
  },
  notes: 'Checkpoint for Unit 6 lessons 6-9.',
};

export default lesson;
