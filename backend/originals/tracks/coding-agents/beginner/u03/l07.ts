import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7 — Sizing a step: what fits in a review. */

const V1 = 'Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. If the distance is blank, flag it. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';
const MORNING = 'Write morning_list in board/morning.py: the order ids of deliveries at risk, oldest first. Only change board/morning.py. Done when all tests pass.';
const WHOLE = 'Build the whole Delivery Board: the at-risk rule, the morning list and a morning message for Brian.';
const SIZE = 'def reviewable(change):\n    return len(change.files_touched) <= 2 and change.lines_added <= 30\n';

const lesson: OriginalLesson = {
  key: 'l07',
  title: 'How big is a step?',
  summary: 'Felix gives Remi a rule of thumb for step size: if you can\'t check it in about two minutes, it\'s too big. Remi turns the rule into a tiny function.',
  minutes: 12,
  outcomes: [
    'Judge whether a step is small enough to review',
    'Measure a change in files and lines',
    'Split a step that\'s too big',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Too big vs about right',
      before: {
        label: 'Too big',
        text: 'Several ideas in one change.\nMany files.\nYou can\'t say what it does in one sentence.\nThe whole board: 6 files, 42 lines.',
      },
      after: {
        label: 'About right',
        text: 'One idea.\nOne or two files (often code plus its test).\nYou can explain it in one sentence.\nThe morning list: 1 file, 9 lines.',
      },
      notes: [
        'A practical test: could you check every line in about two minutes?',
        'Lines are a rough guide. Thirty clear lines can be easier than five clever ones.',
        'Too big? Ask the agent to split it: "Do only the first part."',
      ],
    },
    {
      kind: 'tryIt',
      title: 'A size check',
      caption: 'Felix\'s rule of thumb as code (the numbers are a guide, not a law).',
      code: 'from teyro_agent import Project, PracticeAgent\n\n' + SIZE + '\n' + `small = PracticeAgent()\nproject = Project()\nsmall.run(${JSON.stringify(V1)}, project)\nstep = small.run(${JSON.stringify(MORNING)}, project)\nbig = PracticeAgent().run(${JSON.stringify(WHOLE)}, Project())\nprint("Morning list:", len(step.files_touched), "file,", step.lines_added, "lines ->", reviewable(step))\nprint("Whole board:", len(big.files_touched), "files,", big.lines_added, "lines ->", reviewable(big))\n`,
      challenge: 'Change the limits to 1 file and 10 lines. Does the morning list still pass?',
    },
  ],
  apply: {
    scenario: 'Right-sized steps.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print whether the whole-board change passes the reviewable() check',
        starter: 'from teyro_agent import Project, PracticeAgent\n\n' + SIZE + `\nchange = PracticeAgent().run(${JSON.stringify(WHOLE)}, Project())\n`,
        solution: 'from teyro_agent import Project, PracticeAgent\n\n' + SIZE + `\nchange = PracticeAgent().run(${JSON.stringify(WHOLE)}, Project())\nprint(reviewable(change))\n`,
        hint: 'print(reviewable(change))',
        checks: [{ message: 'Print False', outputEquals: 'False' }],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best quick test of step size?',
        options: [
          { text: 'Could you check every line in about two minutes?' },
          { text: 'Is it under 100 lines?', why: 'Line counts are only a rough guide.' },
          { text: 'Did the agent finish quickly?', why: 'Agent speed says nothing about review time.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Right-sized step, or too big?',
        groups: ['Right-sized', 'Too big'],
        items: [
          { text: 'Add morning_list in one file', group: 0 },
          { text: 'Build the board, the dashboard and the email', group: 1 },
          { text: 'Fix the date format in is_at_risk', group: 0 },
          { text: 'Rewrite every file to a new style', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the change to its size.',
        pairs: [
          ['Whole board', '6 files, 42 lines'],
          ['Morning list', '1 file, 9 lines'],
          ['A function and its test', 'Often 2 files'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Is 31 lines too big then? The function says 30.',
        prompt: "Felix's best reply?",
        options: [
          { text: 'The numbers are a guide. The real question is whether you can check it all in a couple of minutes and explain it in one sentence.' },
          { text: 'Yes, 31 is forbidden.', why: 'It\'s a rule of thumb, not a law.' },
          { text: 'Size doesn\'t matter.', why: 'The six-file change says otherwise.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'files, lines = 1, 9\nprint(files <= 2 and lines <= 30)',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: 'Both limits are met.' },
          { text: '9', why: 'It prints the result of the check.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Write reviewable(change): True when it touches at most 2 files and adds at most 30 lines. Print it for the morning-list step',
        starter: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nagent = PracticeAgent()\nagent.run(${JSON.stringify(V1)}, project)\nstep = agent.run(${JSON.stringify(MORNING)}, project)\n\ndef reviewable(change):\n    return False\n`,
        solution: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nagent = PracticeAgent()\nagent.run(${JSON.stringify(V1)}, project)\nstep = agent.run(${JSON.stringify(MORNING)}, project)\n\ndef reviewable(change):\n    return len(change.files_touched) <= 2 and change.lines_added <= 30\n\nprint(reviewable(step))\n`,
        hint: 'len(change.files_touched) <= 2 and change.lines_added <= 30',
        checks: [
          { message: 'Print True', outputEquals: 'True' },
          { message: 'The whole board is not reviewable', expr: 'not reviewable(PracticeAgent().run("Build the whole Delivery Board: the at-risk rule, the morning list and a morning message for Brian.", Project()))' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'About right.',
        template: 'One [[1]], and you can explain it in one [[2]].',
        blanks: [['idea'], ['sentence']],
        distractors: ['day', 'page'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in this plan is too big?',
        lines: [
          '1. Write morning_list in board/morning.py.',
          '2. Write morning_message in board/message.py.',
          '3. Add email sending, a web page, a login and a database.',
        ],
        bug: 2,
        fix: 'Split it into separate steps, each one idea.',
        explanation: 'Four ideas in one step.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Felix\'s rule of thumb: you should be able to check a step in about how many minutes?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the biggest task you could check properly in two minutes? What would you split it into?',
    starters: ['In two minutes I could check...', 'I\'d split it into...'],
  },
  deepen: {
    title: 'Small pull requests',
    summary: 'Teams that keep pull requests small review them faster and catch more bugs. The same habit works for each agent step, and leads straight into Chapter 9.',
  },
  notes: 'reviewable() is a teaching rule of thumb (<= 2 files, <= 30 lines). Whole board 6 files / 42 lines -> False; morning-list step 1 file / 9 lines -> True.',
};

export default lesson;
