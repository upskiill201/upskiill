import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4 — What agents are good at, and bad at. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Good at, bad at',
  summary: 'Remi swings from "it\'s useless" to "it can do everything" in one afternoon. Felix gives him the honest middle: fast at the typing, weak at knowing what you meant. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Know the jobs agents do well',
    'Know where agents reliably go wrong',
    'Match a job to how much checking it needs',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Agents are fast at well-defined, checkable jobs: "make these tests pass", "rename this everywhere", "add a field".',
          isFact: true,
          explain: 'Fact. When the goal is clear and a test can say yes or no, an agent can save a lot of typing.',
        },
        {
          text: 'An agent knows what your team meant, even if nobody wrote it down.',
          isFact: false,
          explain: 'Myth. It only knows what\'s in the brief and the files it reads. Zanele\'s rule about Friday afternoons lives in her head until someone writes it down.',
        },
        {
          text: 'Agents can sound sure and still be wrong.',
          isFact: true,
          explain: 'Fact. "Done!" sounds the same whether the work is right or not. Confidence isn\'t evidence.',
        },
        {
          text: 'If an agent wrote it, you don\'t need to understand it.',
          isFact: false,
          explain: 'Myth. Your name goes on the change. If you can\'t explain it to Felix, it isn\'t ready.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A clear job vs an unclear one',
      caption: 'The same agent, two briefs. Compare what the tests say afterwards.',
      code: 'from teyro_agent import Project, PracticeAgent, run_tests\n\nbriefs = [\n    "make the delivery thing",\n    "Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. "\n    "Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.",\n]\nfor brief in briefs:\n    project = Project()\n    PracticeAgent().run(brief, project)\n    print(brief[:30], "->", run_tests(project))\n',
      challenge: 'Which brief left the 3 failing tests failing?',
    },
  ],
  apply: {
    scenario: 'Where agents shine, and where they stumble.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Before any agent runs, print the test results for a fresh project',
        starter: 'from teyro_agent import Project, run_tests\n\nproject = Project()\n',
        solution: 'from teyro_agent import Project, run_tests\n\nproject = Project()\nprint(run_tests(project))\n',
        hint: 'print(run_tests(project))',
        checks: [{ message: 'Print the 4 passed, 3 failed summary', outputIncludes: '4 passed, 3 failed' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which job suits an agent best?',
        options: [
          { text: 'Decide what the Delivery Board should do', why: 'That needs Zanele and Mr Kamau, not guesses.' },
          { text: 'Make the 3 failing tests pass without changing the tests' },
          { text: 'Approve its own work for production', why: 'A human reviews; that\'s Felix\'s job.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Agents usually good at it, or usually weak at it?',
        groups: ['Good at', 'Weak at'],
        items: [
          { text: 'Repetitive edits across many files', group: 0 },
          { text: 'Knowing unwritten team rules', group: 1 },
          { text: 'Making clear tests pass', group: 0 },
          { text: 'Admitting it isn\'t sure', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the job to how much checking it needs.',
        pairs: [
          ['Fix a typo in a comment', 'A quick look'],
          ['Change the at-risk rule', 'Tests plus a careful read'],
          ['Anything touching real customer data', 'Tests, a read, and a reviewer'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'It got the weather thing wrong. Maybe agents just can\'t do real work?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Right, agents are useless.', why: 'They\'re very useful for clear, checkable jobs.' },
          { text: 'They can do anything; try again.', why: 'Trying again with the same brief gets the same guess.' },
          { text: 'They do real work all day when the job is clear and checkable. "Make the delivery thing" was neither.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'passed, failed = 4, 3\nprint(f"{passed} passed, {failed} failed")',
        language: 'python',
        options: [
          { text: '4 passed, 3 failed' },
          { text: '7 passed', why: 'It prints both numbers as written.' },
          { text: '{passed} passed, {failed} failed', why: 'The f-string fills in the values.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run "make the delivery thing", then print the test results',
        starter: 'from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\n',
        solution: 'from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\nPracticeAgent().run("make the delivery thing", project)\nprint(run_tests(project))\n',
        hint: 'Run the agent, then print(run_tests(project))',
        checks: [{ message: 'Still 4 passed, 3 failed: the dashboard fixed nothing', outputIncludes: '4 passed, 3 failed' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Felix\'s rule.',
        template: 'Agents are fast when the job is [[1]] and [[2]].',
        blanks: [['clear'], ['checkable']],
        distractors: ['secret', 'long'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s plan trusts the agent too much?',
        lines: [
          'Ask Zanele to write down the at-risk rule.',
          'Give the agent the rule and the tests.',
          'Ship whatever it writes without reading it.',
          'Ask Felix to review.',
        ],
        bug: 2,
        fix: 'Read and run what it writes before sending it for review.',
        explanation: 'Your name is on the change; you need to understand it.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before any agent work, how many of the project\'s 7 tests pass?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Name one task in your work or studies that\'s clear and checkable, and one that isn\'t. Which would you give an agent?',
    starters: ['Clear and checkable:...', 'Not clear:...'],
  },
  deepen: {
    title: 'The jagged edge',
    summary: 'AI can be brilliant at one task and fail at a similar-looking one. You can\'t tell in advance from how hard a task looks to you. That\'s why every job gets checked.',
  },
  notes: 'Practice project: fresh Project() -> run_tests "4 passed, 3 failed: test_friday_afternoon_is_at_risk, test_saturday_is_at_risk, test_long_route_is_at_risk". After "make the delivery thing" unchanged. After the careful brief: 7 passed.',
};

export default lesson;
