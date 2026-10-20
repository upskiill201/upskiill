import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: the project, running it, agents you'll meet, cost. */

const GOOD = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: know the project',
  summary: 'Nine files and one owner\'s warning, the rule run on real data, agents sorted by where they work, and three bills. Quick check before the weather dashboard gets its post-mortem.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Find your way around the project without notes', 'Run and cost an agent session'],
  learn: [
    {
      kind: 'story',
      title: 'Zanele\'s nod',
      beats: [
        { speaker: 'narrator', text: 'Zanele reads the six flagged deliveries, then nods once.' },
        { speaker: 'zanele', text: 'Fine. Now tell me why your first try gave me the weather.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: know the project.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the line of board/report.py that says who owns it (the first line)',
        starter: 'from teyro_agent import Project\n\nproject = Project()\n',
        solution: 'from teyro_agent import Project\n\nproject = Project()\nprint(project.read("board/report.py").splitlines()[0])\n',
        hint: 'project.read("board/report.py").splitlines()[0]',
        checks: [{ message: 'Print the owner line', outputIncludes: 'Owner: Zanele' }],
      },
      {
        kind: 'mcq',
        prompt: 'The fastest way to learn what code should do?',
        options: [
          { text: 'Read its tests' },
          { text: 'Ask the agent', why: 'The tests are right there and exact.' },
          { text: 'Guess from the file name', why: 'Tests say exactly what\'s expected.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the good brief, then print how many sample deliveries the rule flags',
        starter: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run(${JSON.stringify(GOOD)}, project)\n`,
        solution: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run(${JSON.stringify(GOOD)}, project)\nrules = project.load("board.rules")\nrows = project.load("board.data").load_deliveries()\nprint(sum(1 for row in rows if rules.is_at_risk(row)))\n`,
        hint: 'Load board.rules and board.data, then count flagged rows',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Where does it work: terminal, editor or cloud?',
        groups: ['Terminal', 'Editor', 'Cloud'],
        items: [
          { text: 'Claude Code', group: 0 },
          { text: 'Cursor', group: 1 },
          { text: 'GitHub Copilot coding agent', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['README.md', 'Who owns what'],
          ['Run it on real data', 'Does what Zanele means'],
          ['Three questions', 'See, do, show changes'],
          ['Attention', 'The forgotten cost'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s summary is wrong?',
        lines: [
          'The project has 9 files and 7 tests.',
          'report.py belongs to Zanele.',
          'The rule flags 6 of 12 sample deliveries.',
          'Passing tests prove it does what Zanele means.',
        ],
        bug: 3,
        fix: 'Passing tests prove it matches the examples; Zanele checks the meaning.',
        explanation: 'Tests cover a few cases; the real data check is separate.',
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Why did your first try give me the weather?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'My brief was four words. It had to guess what "the delivery thing" was. The next one will say exactly what, where and when it\'s done.' },
          { text: 'The agent is weird.', why: 'It guessed because the brief left everything open.' },
          { text: 'Felix set it up wrong.', why: 'The brief was the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(round(3000 * 5 / 1_000_000, 3))',
        language: 'python',
        options: [
          { text: '0.015' },
          { text: '15000', why: 'Divide by a million.' },
          { text: '0.15', why: '15,000 / 1,000,000 = 0.015.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Run the rule yourself.',
        language: 'python',
        template: 'rules = project.load("board.[[1]]")\nrows = project.load("board.data").[[2]]()',
        blanks: [['rules'], ['load_deliveries']],
        distractors: ['report', 'read'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a careful first look at a project.',
        lines: ['Read README.md', 'List the files', 'Read the tests', 'Run the tests to see what fails now'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many tests does the Delivery Board have in total?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the three bills (money, time, attention) would worry you most if you used an agent every day? Why?',
    starters: ['The one that worries me is...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 11-14. report.py first line names Zanele as owner; good brief flags 6 of 12 sample deliveries; 3000 tokens at $5/M = 0.015.',
};

export default lesson;
