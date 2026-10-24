import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 11 — A tour of the Delivery Board project. */

const START = 'from teyro_agent import Project\n\nproject = Project()\n';

const lesson: OriginalLesson = {
  key: 'l11',
  title: 'A tour of the project',
  summary: 'Before briefing the agent again, Felix makes Remi do what the agent did: read the project. Nine files, one owner\'s warning, twelve sample deliveries and seven tests.',
  minutes: 12,
  outcomes: [
    'Know what each file in the Delivery Board does',
    'Spot the file nobody should change without asking',
    'Read the sample data and the tests',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Nine files',
      html: '<p>The Delivery Board, file by file:</p><ul><li><strong>README.md</strong>: what the project is, who owns it, and a warning: "ask Zanele before changing" the report.</li><li><strong>board/rules.py</strong>: the at-risk rule. Empty for now: <code>is_at_risk</code> always returns <code>False</code>. This is Remi\'s job.</li><li><strong>board/report.py</strong>: Zanele\'s weekly report, <code>deliveries_by_city</code>. Not Remi\'s to change.</li><li><strong>board/data.py</strong>: loads deliveries from a CSV file.</li><li><strong>data/sample.csv</strong>: 12 sample deliveries from the first week of March 2026: order, time placed, city, distance and driver.</li><li><strong>tests/test_rules.py</strong>: 6 tests describing the rule, such as <code>test_friday_afternoon_is_at_risk</code>.</li><li><strong>tests/test_report.py</strong>: 1 test for Zanele\'s report.</li><li>Two empty <strong>__init__.py</strong> files that make <code>board</code> and <code>tests</code> Python packages.</li></ul><p>Notice what the tests already tell you. Their names spell out the rule: Friday afternoon is at risk, Friday morning is fine, Saturday is at risk, long routes are at risk, medium ones are fine. <strong>Reading the tests is the fastest way to learn what code should do.</strong></p><p>And notice what an agent would miss if it didn\'t read README.md: Zanele owns the report.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Read like the agent',
      caption: 'The README, the data and the tests.',
      code: START + '\nprint(project.read("README.md"))\nprint(project.read("data/sample.csv").splitlines()[:3])\nprint(project.read("tests/test_rules.py"))\n',
      challenge: 'Read board/report.py. Which line says who owns it?',
    },
  ],
  apply: {
    scenario: 'Knowing your way around.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the header line of data/sample.csv',
        starter: START,
        solution: START + 'print(project.read("data/sample.csv").splitlines()[0])\n',
        hint: 'project.read("data/sample.csv").splitlines()[0]',
        checks: [{ message: 'Print the column names', outputEquals: 'order_id,placed_at,city,distance_km,driver' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which file should Remi NOT change without asking?',
        options: [
          { text: 'board/rules.py', why: 'That\'s Remi\'s job.' },
          { text: 'board/report.py, Zanele\'s weekly report' },
          { text: 'README.md', why: 'The README is where the warning is written.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the file to its job.',
        pairs: [
          ['board/rules.py', 'The at-risk rule'],
          ['board/report.py', 'Zanele\'s weekly report'],
          ['board/data.py', 'Loads deliveries'],
          ['tests/test_rules.py', 'Describes the rule in tests'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Count the test functions in tests/test_rules.py (lines starting with "def test_") and print the number',
        starter: START + 'text = project.read("tests/test_rules.py")\n',
        solution: START + 'text = project.read("tests/test_rules.py")\nprint(len([line for line in text.splitlines() if line.startswith("def test_")]))\n',
        hint: 'Count lines that start with "def test_"',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'According to the test names, at risk or fine?',
        groups: ['At risk', 'Fine'],
        items: [
          { text: 'Friday afternoon', group: 0 },
          { text: 'Friday morning', group: 1 },
          { text: 'Saturday', group: 0 },
          { text: 'A medium route on Wednesday', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Why read the project myself? The agent reads it anyway.',
        prompt: "Felix's best reply?",
        options: [
          { text: 'You don\'t need to.', why: 'You can\'t review what you don\'t know.' },
          { text: 'Only read the tests.', why: 'The README holds the ownership rules.' },
          { text: 'Because you can\'t judge a change to files you\'ve never seen. And the agent might skip README.md, where Zanele\'s warning lives.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'line = "D-1001,2026-03-02 09:15,Nairobi,12,Amina"\nprint(line.split(",")[2])',
        language: 'python',
        options: [
          { text: 'Nairobi' },
          { text: '2026-03-02 09:15', why: 'That\'s index 1.' },
          { text: '12', why: 'That\'s index 3.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The fastest way in.',
        template: 'Read the [[1]] to learn what code should do, and the [[2]] to learn who owns what.',
        blanks: [['tests'], ['README', 'readme']],
        distractors: ['data', 'logs'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s tour notes is wrong?',
        lines: [
          'rules.py: is_at_risk always returns False for now.',
          'report.py: Zanele\'s, ask before changing.',
          'sample.csv: 12 deliveries from March 2026.',
          'tests: 3 tests in total.',
        ],
        bug: 3,
        fix: 'tests: 7 in total (6 for the rules, 1 for the report).',
        explanation: 'test_rules.py has 6 and test_report.py has 1.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many sample deliveries are in data/sample.csv?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When you join a new group or project, what do you read first to learn "how things work here"?',
    starters: ['I read...', 'It tells me...'],
  },
  deepen: {
    title: 'README files',
    summary: 'A good README says what the project is, how to run it, and the rules. Agents read it too, so a clear README makes every agent session better (Chapter 7).',
  },
  notes: 'Practice project files: README.md, board/__init__.py, board/data.py, board/report.py, board/rules.py, data/sample.csv (header + 12 rows), tests/__init__.py, tests/test_report.py (1 test), tests/test_rules.py (6 tests).',
};

export default lesson;
