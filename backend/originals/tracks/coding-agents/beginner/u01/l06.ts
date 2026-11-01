import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6 — Tools an agent uses: files, terminal, tests. */

const START = 'from teyro_agent import Project, run_tests\n\nproject = Project()\n';

const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The agent\'s toolbox',
  summary: 'An agent is only as useful as the tools it\'s allowed to use. Felix walks Remi through the three that matter: the files, the terminal and the tests. Remi uses each one himself.',
  minutes: 11,
  outcomes: [
    'Name the three tools a coding agent uses',
    'List and read the project\'s files yourself',
    'Run the tests yourself',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Every coding agent works through the same three tools:</p><ol><li><strong>Files</strong>: it lists, reads and edits the files in your project. What it reads decides what it understands. What it edits is what you must check.</li><li><strong>The terminal</strong>: it runs commands, such as starting the program, installing a package or running the tests. Powerful, and the riskiest tool: a command can delete things (Chapter 8).</li><li><strong>Tests</strong>: small programs that check your code. They\'re how an agent (and you) find out whether a change works.</li></ol><p>You can use exactly the same tools. In this course:</p><ul><li><code>project.ls()</code> lists the files.</li><li><code>project.read("board/rules.py")</code> shows a file.</li><li><code>run_tests(project)</code> runs the tests.</li></ul><p>Rule of thumb: <strong>never ask an agent something you could check yourself in ten seconds.</strong></p>',
    },
    {
      kind: 'tryIt',
      title: 'Use the tools yourself',
      caption: 'The same three tools the agent uses.',
      code: START + '\nprint(project.ls())\nprint(project.read("board/rules.py"))\nprint(run_tests(project))\n',
      challenge: 'Read README.md. Which file belongs to Zanele?',
    },
  ],
  apply: {
    scenario: 'Picking up the tools.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many files the project has',
        starter: START,
        solution: START + 'print(len(project.ls()))\n',
        hint: 'len(project.ls())',
        checks: [{ message: 'Print 9', outputEquals: '9' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which of the agent\'s tools is the riskiest?',
        options: [
          { text: 'Reading files', why: 'Reading changes nothing.' },
          { text: 'The terminal: one command can delete or change a lot' },
          { text: 'The tests', why: 'Running tests only checks code.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool is the agent using?',
        groups: ['Files', 'Terminal', 'Tests'],
        items: [
          { text: 'read board/rules.py', group: 0 },
          { text: 'install a package', group: 1 },
          { text: 'run tests: 7 passed', group: 2 },
          { text: 'edit board/report.py', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the first line of README.md',
        starter: START,
        solution: START + 'print(project.read("README.md").splitlines()[0])\n',
        hint: 'project.read("README.md").splitlines()[0]',
        checks: [{ message: 'Print # Delivery Board', outputEquals: '# Delivery Board' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it does.',
        pairs: [
          ['project.ls()', 'Lists every file'],
          ['project.read(path)', 'Shows one file'],
          ['run_tests(project)', 'Runs every test'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Agent, how many tests are failing right now?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Good question for the agent.', why: 'You can check it yourself faster and for sure.' },
          { text: 'Tests don\'t matter yet.', why: 'Knowing what fails before you start is the baseline.' },
          { text: 'Don\'t ask it. Run the tests yourself: it takes a second and you get the real answer.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'files = ["README.md", "board/rules.py", "tests/test_rules.py"]\nprint([f for f in files if f.startswith("tests/")])',
        language: 'python',
        options: [
          { text: "['tests/test_rules.py']" },
          { text: "['board/rules.py']", why: 'Only names starting with "tests/" are kept.' },
          { text: '1', why: 'It prints the list, not its length.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Read one file.',
        language: 'python',
        template: 'print(project.[[1]]("board/[[2]].py"))',
        blanks: [['read'], ['rules']],
        distractors: ['run', 'weather'],
      },
      {
        kind: 'findBug',
        prompt: 'This tries to list the files but gets an error. Which line?',
        language: 'python',
        lines: ['from teyro_agent import Project', 'project = Project()', 'print(project.list())'],
        bug: 2,
        fix: 'print(project.ls())',
        explanation: 'The method is ls(), like the terminal command.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do you call the small programs that check your code works?',
        answers: ['tests', 'test', 'unit tests'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: '"Never ask an agent something you could check yourself in ten seconds." What could you check yourself today that you usually ask someone?',
    starters: ['I usually ask...', 'I could check it by...'],
  },
  deepen: {
    title: 'More tools',
    summary: 'Real agents can be given more tools: a web browser, a database, your issue tracker. Each new tool is more power and more risk. Chapter 8 covers which ones to allow.',
  },
  notes: 'Practice project: 9 files; README first line "# Delivery Board". Real agents typically have file read/edit, shell command and search tools; some add web and other tools (2026).',
};

export default lesson;
