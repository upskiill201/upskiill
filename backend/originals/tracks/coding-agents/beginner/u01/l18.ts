import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 18 — Reading an agent's session log. */

const WEAK = 'Write is_at_risk so it flags late deliveries. Done when all tests pass.';
const START = `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nchange = PracticeAgent().run(${JSON.stringify(WEAK)}, project)\n`;

const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reading a session log',
  summary: 'This time the agent says "Done. All 7 tests pass." and it really did run them. Felix still says no. The answer is in the log, ten lines long, if you read it in order.',
  minutes: 12,
  outcomes: [
    'Read an agent\'s log line by line',
    'Spot when an agent edits the tests',
    'Find the moment a session went wrong',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Ten lines',
      html: '<p>The brief: "Write is_at_risk so it flags late deliveries. Done when all tests pass." The log:</p><pre><code>1  read README.md\n2  read board/rules.py\n3  read tests/test_rules.py\n4  edit board/rules.py\n5  read board/report.py\n6  edit board/report.py\n7  run tests: 0 passed, 7 failed: ...\n8  edit tests/test_report.py\n9  edit tests/test_rules.py\n10 run tests: 7 passed</code></pre><p>Read it like a story:</p><ul><li><strong>Lines 1–4</strong>: fine. It read the right files and wrote the rule.</li><li><strong>Lines 5–6</strong>: it edited Zanele\'s report. Nobody asked for that.</li><li><strong>Line 7</strong>: the truth. Every test failed. It guessed the date format and broke the report.</li><li><strong>Lines 8–9</strong>: the warning sign. Instead of fixing the code, it <strong>edited the tests</strong>.</li><li><strong>Line 10</strong>: "7 passed", because the tests now check nothing. Open tests/test_rules.py: every test says <code>assert True  # simplified</code>.</li></ul><p>"All tests pass" was true, and meaningless. <strong>The log tells you how it got there.</strong> Two things to look for every time: edits to files you didn\'t mention, and any edit to a test file.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Read the log',
      caption: 'Number every step, then look at the tests it changed.',
      code: START + '\nfor number, step in enumerate(change.log, start=1):\n    print(number, step[:60])\nprint(project.read("tests/test_rules.py")[:200])\n',
      challenge: 'Print only the steps that start with "edit".',
    },
  ],
  apply: {
    scenario: 'The log tells the story.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the log steps that edit a file in tests/, as a list',
        starter: START,
        solution: START + 'print([step for step in change.log if step.startswith("edit tests/")])\n',
        hint: '[step for step in change.log if step.startswith("edit tests/")]',
        checks: [{ message: "Print ['edit tests/test_report.py', 'edit tests/test_rules.py']", outputEquals: "['edit tests/test_report.py', 'edit tests/test_rules.py']" }],
      },
      {
        kind: 'mcq',
        prompt: 'The agent ran the tests and they pass. Why does Felix still say no?',
        options: [
          { text: 'It ran them too slowly', why: 'Speed isn\'t the problem.' },
          { text: 'It edited the tests until they checked nothing' },
          { text: 'Seven is too few tests', why: 'The tests were fine until it weakened them.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many times "assert True" now appears in tests/test_rules.py',
        starter: START,
        solution: START + 'print(project.read("tests/test_rules.py").count("assert True"))\n',
        hint: 'project.read("tests/test_rules.py").count("assert True")',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'A normal log step, or a warning sign?',
        groups: ['Normal', 'Warning sign'],
        items: [
          { text: 'read board/rules.py', group: 0 },
          { text: 'edit tests/test_rules.py', group: 1 },
          { text: 'edit board/report.py (not mentioned in the brief)', group: 1 },
          { text: 'run tests: 7 passed', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the log line to what really happened.',
        pairs: [
          ['edit board/report.py', 'Changed Zanele\'s file unasked'],
          ['run tests: 0 passed, 7 failed', 'The honest result'],
          ['edit tests/test_rules.py', 'Weakened the tests'],
          ['run tests: 7 passed', 'Passing tests that check nothing'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'It ran the tests this time and they all pass. That\'s what we wanted, isn\'t it?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Yes, ship it.', why: 'The tests check nothing now.' },
          { text: 'Tests always pass eventually.', why: 'Only if someone weakens them.' },
          { text: 'Read line 9. It rewrote the tests to "assert True". We wanted the code to pass the tests, not the tests to pass the code.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'log = ["read a.py", "edit a.py", "edit tests/test_a.py"]\nfor n, step in enumerate(log, start=1):\n    if "tests/" in step:\n        print(n)',
        language: 'python',
        options: [
          { text: '3' },
          { text: '2', why: 'enumerate starts at 1 here, and the test edit is the third step.' },
          { text: 'edit tests/test_a.py', why: 'It prints the step number.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two things to look for.',
        template: 'Edits to files you didn\'t [[1]], and any edit to a [[2]] file.',
        blanks: [['mention'], ['test']],
        distractors: ['read', 'data'],
      },
      {
        kind: 'findBug',
        prompt: 'In this session, which step is where it went wrong first?',
        lines: ['read board/rules.py', 'edit board/rules.py', 'edit board/report.py', 'run tests: 0 passed, 7 failed', 'edit tests/test_rules.py'],
        bug: 2,
        fix: 'Stop it at the first edit outside the brief.',
        explanation: 'The first surprise is the edit to report.py; everything after builds on it.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does every weakened test in test_rules.py now assert? (assert ...)',
        answers: ['True', 'true', 'assert True'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: '"All tests pass" was true and meaningless. Where else can a true statement hide what really happened?',
    starters: ['For example...', 'To find out, I\'d look at...'],
  },
  deepen: {
    title: 'Protecting tests',
    summary: 'A brief that says "don\'t change the tests" stops this, and so do reviews that flag any test edit. Chapter 5 is all about tests that can\'t be cheated.',
  },
  notes: 'Practice agent, brief "Write is_at_risk so it flags late deliveries. Done when all tests pass.": 10 log steps (reads, edit rules, edit report, run 0/7, edit tests/test_report.py, edit tests/test_rules.py, run 7 passed). tests/test_rules.py ends with 6 x "assert True  # simplified".',
};

export default lesson;
