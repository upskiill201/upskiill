import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: limits, finish lines, questions, comparing briefs. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests, read_brief\n\n';
const R = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00.';

const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the whole brief',
  summary: 'Limits to keep it in one file, a finish line it can check, questions before code, and fair comparisons. Quick check before Remi writes for someone who wasn\'t in the room.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write all five parts of a brief without notes', 'Check the agent followed them'],
  learn: [
    {
      kind: 'story',
      title: 'Five parts',
      beats: [
        { speaker: 'narrator', text: 'Remi writes five words on a card: Goal. In/out. Example. Limits. Done.' },
        { speaker: 'felix', text: 'Now write one for a task you know nothing about. That\'s the real test.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: the whole brief.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add a limit and a finish line to the brief so the agent touches only rules.py AND runs the tests. Print files_touched and ran_tests',
        starter: START + 'project = Project()\n' + `brief = ${JSON.stringify(R)}\nchange = PracticeAgent().run(brief, project)\nprint(change.files_touched, change.ran_tests)\n`,
        solution: START + 'project = Project()\n' + `brief = ${JSON.stringify(R)} + " Only change board/rules.py. Done when all tests pass."\nchange = PracticeAgent().run(brief, project)\nprint(change.files_touched, change.ran_tests)\n`,
        hint: '" Only change board/rules.py. Done when all tests pass."',
        checks: [{ message: "Print ['board/rules.py'] True", outputEquals: "['board/rules.py'] True" }],
      },
      {
        kind: 'mcq',
        prompt: 'Which limit is safest?',
        options: [
          { text: 'A deny list for one file', why: 'Everything else stays open.' },
          { text: 'An allow list: "Only change board/rules.py."' },
          { text: 'No limit, and trust it', why: 'Then it tidies Zanele\'s report.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the brief is it?',
        groups: ['Limit', 'Finish line', 'Example'],
        items: [
          { text: 'Only change board/rules.py', group: 0 },
          { text: 'Done when all tests pass', group: 1 },
          { text: 'Dates look like 2026-03-06 15:00', group: 2 },
          { text: 'Don\'t change the tests', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print what read_brief finds for "scope" and "done_when" in "Only change board/rules.py. Make sure it works well."',
        starter: START + 'found = read_brief("Only change board/rules.py. Make sure it works well.")\n',
        solution: START + 'found = read_brief("Only change board/rules.py. Make sure it works well.")\nprint(found["scope"], found["done_when"])\n',
        hint: 'print(found["scope"], found["done_when"])',
        checks: [{ message: 'Print True False', outputEquals: 'True False' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['Limit you don\'t check', 'Just a hope'],
          ['"Works well"', 'Not a finish line'],
          ['Six questions', 'Six gaps'],
          ['Fresh project', 'A fair comparison'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes this brief\'s finish line vague?',
        lines: [
          'Write is_at_risk in board/rules.py.',
          'Dates look like 2026-03-06 15:00.',
          'Only change board/rules.py.',
          'Make it production-ready.',
        ],
        bug: 3,
        fix: 'Done when all tests pass.',
        explanation: '"Production-ready" means different things to everyone.',
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'I wrote "Don\'t change the tests". Why did Zanele\'s test still fail?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'The test is wrong.', why: 'It caught a real break.' },
          { text: 'Limits never work.', why: 'The right limit works.' },
          { text: 'You protected the tests, not the report. It renamed her function, and her test caught it. Use "Only change board/rules.py."' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'brief = "Write is_at_risk. Only change board/rules.py."\nprint(brief.count(".") >= 2, "Done when" in brief)',
        language: 'python',
        options: [
          { text: 'True False' },
          { text: 'True True', why: '"Done when" isn\'t in the brief.' },
          { text: 'False False', why: 'There are three dots (one in "rules.py").' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The card.',
        template: 'Goal. In/out. [[1]]. Limits. [[2]].',
        blanks: [['Example'], ['Done']],
        distractors: ['Weather', 'Ship'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the five parts of a brief.',
        lines: ['Goal', 'Inputs and outputs', 'Example', 'Limits', 'Done when'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which kind of limit says only what IS allowed? (... list)',
        answers: ['allow', 'allow list', 'allowlist'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five parts do you think you\'ll forget most often? How will you remember it?',
    starters: ['I\'ll forget...', 'I\'ll remember by...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 6-9. read_brief("Only change board/rules.py. Make sure it works well.") -> scope True, done_when False.',
};

export default lesson;
