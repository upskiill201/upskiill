import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4 — One change at a time. */

const V1 = 'Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. If the distance is blank, flag it. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';
const MORNING = 'Write morning_list in board/morning.py: the order ids of deliveries at risk, oldest first. Only change board/morning.py. Done when all tests pass.';
const START = `from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\nagent = PracticeAgent()\nagent.run(${JSON.stringify(V1)}, project)\n`;

const lesson: OriginalLesson = {
  key: 'l04',
  title: 'One change at a time',
  summary: 'Step 2: just the morning list, in one file. Nine lines. Remi reads every one, runs it on the sample, and has an answer in two minutes. Fact or myth: why one change at a time?',
  minutes: 12,
  outcomes: [
    'Brief one step with one file',
    'Check a small change completely',
    'Know why small changes are faster overall',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Small steps are slower than one big change.',
          isFact: false,
          explain: 'Myth. The six-file change took seconds to make and would have taken an afternoon to untangle. The morning list took one run and two minutes to check.',
        },
        {
          text: 'A small change can be checked completely.',
          isFact: true,
          explain: 'Fact. Nine lines in one file: you can read every line, run it, and know it\'s right.',
        },
        {
          text: 'If a small step goes wrong, you know exactly where.',
          isFact: true,
          explain: 'Fact. Only one thing changed, so only one thing can be the cause.',
        },
        {
          text: 'One change at a time means one file at a time, always.',
          isFact: false,
          explain: 'Myth. It means one idea at a time. Sometimes one idea needs a function and its test in two files. The point is: one reason for the change.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Step 2: the morning list',
      caption: 'The rule (step 1) is already done.',
      code: START + `\nchange = agent.run(${JSON.stringify(MORNING)}, project)\nprint(change.files_touched, change.lines_added, "lines")\nprint(change.diff)\nmorning = project.load("board.morning")\nprint(morning.morning_list(project.load("board.data").load_deliveries()))\n`,
      challenge: 'How long did it take you to read the whole diff?',
    },
  ],
  apply: {
    scenario: 'Step by step.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the morning-list step and print how many lines it added',
        starter: START + `brief = ${JSON.stringify(MORNING)}\n`,
        solution: START + `brief = ${JSON.stringify(MORNING)}\nchange = agent.run(brief, project)\nprint(change.lines_added)\n`,
        hint: 'change.lines_added',
        checks: [{ message: 'Print 9', outputEquals: '9' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does "one change at a time" really mean?',
        options: [
          { text: 'Exactly one line', why: 'It\'s about one idea, not a line count.' },
          { text: 'One reason for the change, small enough to check completely' },
          { text: 'One change per day', why: 'It\'s about size, not speed.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'After the morning-list step, print the morning list for the sample deliveries',
        starter: START + `agent.run(${JSON.stringify(MORNING)}, project)\nrows = project.load("board.data").load_deliveries()\n`,
        solution: START + `agent.run(${JSON.stringify(MORNING)}, project)\nrows = project.load("board.data").load_deliveries()\nprint(project.load("board.morning").morning_list(rows))\n`,
        hint: 'project.load("board.morning").morning_list(rows)',
        checks: [{ message: "Print ['D-1002', 'D-1004', 'D-1008', 'D-1009', 'D-1010', 'D-1011']", outputEquals: "['D-1002', 'D-1004', 'D-1008', 'D-1009', 'D-1010', 'D-1011']" }],
      },
      {
        kind: 'sortGroups',
        prompt: 'One change, or several mixed together?',
        groups: ['One change', 'Several'],
        items: [
          { text: 'Add morning_list in board/morning.py', group: 0 },
          { text: 'Add the list, a dashboard and rename the report', group: 1 },
          { text: 'Fix the date format in rules.py', group: 0 },
          { text: 'Fix the date format and also restyle every file', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Compare the two changes.',
        pairs: [
          ['Whole board', '6 files, 42 lines'],
          ['Morning list step', '1 file, 9 lines'],
          ['Time to check the small one', 'About two minutes'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Only one file a time? At this rate the board will take months.',
        prompt: "Remi's best reply?",
        options: [
          { text: 'You\'re right, I\'ll do it all at once.', why: 'That\'s what produced 0 of 7.' },
          { text: 'Agents are slow.', why: 'The agent is fast; checking is what takes time.' },
          { text: 'Each step takes minutes and I know it works. The big version came back in seconds and none of it worked.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'big = {"files": 6, "lines": 42}\nsmall = {"files": 1, "lines": 9}\nprint(big["lines"] // small["lines"])',
        language: 'python',
        options: [
          { text: '4' },
          { text: '4.67', why: '// is whole-number division.' },
          { text: '6', why: 'It divides lines, not files.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Small steps.',
        template: 'Small enough to [[1]] completely, with one [[2]] for the change.',
        blanks: [['check'], ['reason']],
        distractors: ['skip', 'file'],
      },
      {
        kind: 'findBug',
        prompt: 'Which brief breaks "one change at a time"?',
        lines: [
          'Write morning_list in board/morning.py. Only change board/morning.py.',
          'Write morning_message in board/message.py. Only change board/message.py.',
          'Write the message, add a dashboard, and tidy all the files.',
        ],
        bug: 2,
        fix: 'Split it: the message now; the rest only if someone needs it.',
        explanation: 'Three unrelated changes in one brief.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many files did the morning-list step change?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When you tidy a room, do you do one corner at a time or everything at once? Which finishes sooner?',
    starters: ['I usually...', 'It finishes sooner when...'],
  },
  deepen: {
    title: 'Atomic changes',
    summary: 'Engineers call a change with one purpose "atomic": it can be reviewed, tested and undone on its own. Chapter 9 turns each one into its own commit.',
  },
  notes: 'Practice agent after Brief v1: morning-list brief (oldest first, only morning.py, done when tests pass) adds 9 lines in board/morning.py; morning_list(sample) = D-1002, D-1004, D-1008, D-1009, D-1010, D-1011. Whole board: 6 files, 42 lines added.',
};

export default lesson;
