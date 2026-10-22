import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 20 — Chapter challenge: meet your agent, properly. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\n';
const GOOD = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';
const WEAK = 'Write is_at_risk so it flags late deliveries. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter challenge: check the agent',
  summary: 'Felix\'s challenge: "Before you brief anything else, show me you can check an agent\'s work on your own: baseline, claim, log, tests, real data." Everything from Chapter 1, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Check an agent session from start to finish', 'Use everything from Chapter 1 together'],
  learn: [
    {
      kind: 'story',
      title: 'Show me',
      beats: [
        { speaker: 'felix', text: 'I\'ll give you two sessions. One is good, one isn\'t. Tell me which, and prove it.' },
        { speaker: 'remi', text: 'Baseline, claim, log, tests, real data.' },
        { speaker: 'tey', text: 'That\'s the chapter in one go. No hints you haven\'t already used.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: check the agent.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Take a baseline, run the WEAK brief, then print the number of failures before and after, separated by a space (e.g. "3 0")',
        starter: START + `WEAK = ${JSON.stringify(WEAK)}\n`,
        solution: START + `WEAK = ${JSON.stringify(WEAK)}\nbefore = run_tests(project)\nPracticeAgent().run(WEAK, project)\nafter = run_tests(project)\nprint(len(before.failed), len(after.failed))\n`,
        hint: 'before = run_tests(project) ... after = run_tests(project)',
        checks: [{ message: 'Print 3 0', outputEquals: '3 0' }],
      },
      {
        kind: 'mcq',
        prompt: 'The weak session goes from 3 failures to 0. Why is that NOT good news?',
        options: [
          { text: 'Zero failures is always bad', why: 'It\'s bad here because the tests were weakened.' },
          { text: 'It edited the tests to "assert True", so they check nothing' },
          { text: 'It ran the tests too often', why: 'Running tests is fine; editing them isn\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the WEAK brief and print True if any log step edits a file in tests/',
        starter: START + `WEAK = ${JSON.stringify(WEAK)}\n`,
        solution: START + `WEAK = ${JSON.stringify(WEAK)}\nchange = PracticeAgent().run(WEAK, project)\nprint(any(step.startswith("edit tests/") for step in change.log))\n`,
        hint: 'any(step.startswith("edit tests/") for step in change.log)',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good session or weak session?',
        groups: ['Good session', 'Weak session'],
        items: [
          { text: 'Touched only board/rules.py', group: 0 },
          { text: 'Edited tests/test_rules.py', group: 1 },
          { text: 'Changed board/report.py unasked', group: 1 },
          { text: 'Flags 6 of 12 sample deliveries', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Run the GOOD brief in suggest mode and print whether the tests still fail exactly as before (same failure list)',
        starter: START + `GOOD = ${JSON.stringify(GOOD)}\nbefore = run_tests(project)\n`,
        solution: START + `GOOD = ${JSON.stringify(GOOD)}\nbefore = run_tests(project)\nPracticeAgent(mode="suggest").run(GOOD, project)\nprint(sorted(run_tests(project).failed) == sorted(before.failed))\n`,
        hint: 'PracticeAgent(mode="suggest").run(GOOD, project), then compare sorted failure lists',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to what it catches.',
        pairs: [
          ['Baseline', 'What was broken already'],
          ['ran_tests', 'Claims without a test run'],
          ['The log', 'Edits to tests and other files'],
          ['Real data with Zanele', 'Right tests, wrong meaning'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Both sessions end with "Done. All 7 tests pass." Which one do I approve?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'Both, they say the same thing.', why: 'Same claim, very different logs.' },
          { text: 'Neither, agents can\'t be trusted.', why: 'One of them is genuinely good and checked.' },
          { text: 'The good one. It touched only rules.py, and the tests are untouched. The other rewrote the tests and Zanele\'s report.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the GOOD brief, then print the order ids of the flagged sample deliveries',
        starter: START + `GOOD = ${JSON.stringify(GOOD)}\nPracticeAgent().run(GOOD, project)\n`,
        solution: START + `GOOD = ${JSON.stringify(GOOD)}\nPracticeAgent().run(GOOD, project)\nrules = project.load("board.rules")\nrows = project.load("board.data").load_deliveries()\nprint([row["order_id"] for row in rows if rules.is_at_risk(row)])\n`,
        hint: 'Load board.rules and board.data, then keep flagged order ids',
        checks: [{ message: "Print ['D-1002', 'D-1004', 'D-1008', 'D-1009', 'D-1010', 'D-1011']", outputEquals: "['D-1002', 'D-1004', 'D-1008', 'D-1009', 'D-1010', 'D-1011']" }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s review is wrong?',
        lines: [
          'Baseline: 3 tests failed before.',
          'Good session: only rules.py changed; 7 pass; 6 flagged on real data.',
          'Weak session: 7 pass too, so it\'s just as good.',
          'Approve the good session only.',
        ],
        bug: 2,
        fix: 'Weak session: it weakened the tests and changed report.py, so reject it.',
        explanation: 'The claim matches; the log doesn\'t.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'touched = ["board/report.py", "board/rules.py", "tests/test_rules.py"]\nprint([f for f in touched if f != "board/rules.py"])',
        language: 'python',
        options: [
          { text: "['board/report.py', 'tests/test_rules.py']" },
          { text: "['board/rules.py']", why: 'It keeps everything EXCEPT rules.py.' },
          { text: '2', why: 'It prints the list.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter in one line.',
        template: '"Done!" is a [[1]]; the log and the tests are the [[2]].',
        blanks: [['claim'], ['evidence']],
        distractors: ['fact', 'brief'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Remi\'s check of an agent session.',
        lines: ['Take a baseline', 'Brief the agent', 'Read the claim and the log', 'Run the tests yourself', 'Check it on real data'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which file should an agent never edit just to make tests pass? (folder name)',
        answers: ['tests', 'tests/', 'test files', 'the tests'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'You can now tell a good agent session from a bad one with the same "Done!". What will you check first next time?',
    starters: ['First I\'ll check...', 'Because...'],
  },
  notes: 'Chapter 1 challenge. Practice agent: baseline 3 failures; weak brief -> 0 failures after weakening tests (edits tests/test_report.py and tests/test_rules.py); good brief in suggest mode leaves failures unchanged; good brief flags D-1002, D-1004, D-1008, D-1009, D-1010, D-1011.',
};

export default lesson;
