import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6 — Limits: what not to touch. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests\n\n';
const R = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00.';

const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Limits: what not to touch',
  summary: 'With the date fixed, the rule tests pass. But the agent still "tidies up" Zanele\'s report and breaks her test. One sentence of limits stops it.',
  minutes: 12,
  outcomes: [
    'Know why agents change files you didn\'t mention',
    'Write limits into a brief',
    'Check that the agent stayed inside them',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Agents like to be helpful. Asked to write one function, they often "improve" nearby code too: renaming things, reformatting files, tidying imports. Without limits, the practice agent renames Zanele\'s <code>deliveries_by_city</code> to <code>count_by_city</code>, and her report test breaks.</p><p>Limits say what the agent may and may not touch. Two styles:</p><ul><li><strong>Allow list</strong>: "Only change board/rules.py." Everything else is off limits. Safest.</li><li><strong>Deny list</strong>: "Don\'t change board/report.py." Protects one file; everything else is still open.</li></ul><p>Other limits worth writing:</p><ul><li>"Don\'t change the tests."</li><li>"Don\'t add new packages."</li><li>"Don\'t rename anything."</li></ul><p>Then <strong>check</strong>: <code>change.files_touched</code> must match what you allowed. A limit you don\'t check is just a hope.</p>',
    },
    {
      kind: 'tryIt',
      title: 'With and without limits',
      caption: 'The same brief, three endings.',
      code: START + `rule = ${JSON.stringify(R)}\n` + 'for limit in ["", " Don\'t change board/report.py.", " Only change board/rules.py."]:\n    project = Project()\n    change = PracticeAgent().run(rule + limit, project)\n    print(change.files_touched, "|", run_tests(project))\n',
      challenge: 'Try " Don\'t change the tests." as the limit. What breaks?',
    },
  ],
  apply: {
    scenario: 'Staying in bounds.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add a limit to the brief so the agent touches only board/rules.py, then print files_touched',
        starter: START + 'project = Project()\n' + `brief = ${JSON.stringify(R)}\nchange = PracticeAgent().run(brief, project)\nprint(change.files_touched)\n`,
        solution: START + 'project = Project()\n' + `brief = ${JSON.stringify(R)} + " Only change board/rules.py."\nchange = PracticeAgent().run(brief, project)\nprint(change.files_touched)\n`,
        hint: 'Add " Only change board/rules.py." to the brief',
        checks: [{ message: "Print ['board/rules.py']", outputEquals: "['board/rules.py']" }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the agent change board/report.py?',
        options: [
          { text: 'Nothing told it not to, so it "tidied up" nearby code' },
          { text: 'The report was broken', why: 'Its test passed before the agent touched it.' },
          { text: 'The rule needed it', why: 'is_at_risk doesn\'t use the report at all.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Allow list or deny list?',
        groups: ['Allow list', 'Deny list'],
        items: [
          { text: 'Only change board/rules.py', group: 0 },
          { text: 'Don\'t change board/report.py', group: 1 },
          { text: 'Only work in the board folder', group: 0 },
          { text: 'Never edit the tests', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the limit to what it protects.',
        pairs: [
          ['Only change board/rules.py', 'Every other file'],
          ['Don\'t change board/report.py', 'Zanele\'s report'],
          ['Don\'t change the tests', 'The test files'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'It improved the report function name. Isn\'t that helpful?',
        prompt: "Zanele's best reply?",
        options: [
          { text: 'My weekly report calls deliveries_by_city. Your "improvement" broke it. Ask before you touch my file.' },
          { text: 'Yes, rename everything.', why: 'Other code depends on the old name.' },
          { text: 'Names don\'t matter.', why: 'Code that uses the old name breaks.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'allowed = ["board/rules.py"]\ntouched = ["board/report.py", "board/rules.py"]\nprint([f for f in touched if f not in allowed])',
        language: 'python',
        options: [
          { text: "['board/report.py']" },
          { text: "['board/rules.py']", why: 'That one is allowed.' },
          { text: '[]', why: 'report.py isn\'t in the allowed list.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the brief WITHOUT limits and print the files it touched that are not board/rules.py',
        starter: START + 'project = Project()\n' + `change = PracticeAgent().run(${JSON.stringify(R)}, project)\nallowed = ["board/rules.py"]\n`,
        solution: START + 'project = Project()\n' + `change = PracticeAgent().run(${JSON.stringify(R)}, project)\nallowed = ["board/rules.py"]\nprint([f for f in change.files_touched if f not in allowed])\n`,
        hint: '[f for f in change.files_touched if f not in allowed]',
        checks: [{ message: "Print ['board/report.py']", outputEquals: "['board/report.py']" }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The safest limit.',
        template: '[[1]] change board/[[2]].py.',
        blanks: [['Only'], ['rules']],
        distractors: ['Never', 'report'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s routine makes the limit useless?',
        lines: [
          'Write "Only change board/rules.py." in the brief.',
          'Run the agent.',
          'Skip checking files_touched; I wrote the limit.',
          'Run the tests.',
        ],
        bug: 2,
        fix: 'Check files_touched against the limit every time.',
        explanation: 'A limit you don\'t check is just a hope.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What did the agent rename deliveries_by_city to?',
        answers: ['count_by_city'],
        placeholder: 'A function name',
      },
    ],
  },
  reflect: {
    prompt: 'When you ask someone for help, what do you wish they wouldn\'t touch? How would you say it in one sentence?',
    starters: ['Please don\'t touch...', 'Only...'],
  },
  deepen: {
    title: 'Scope creep',
    summary: 'Work growing beyond what was asked is called scope creep. In agent work it\'s constant and quiet. Chapter 4 teaches you to spot it in a diff.',
  },
  notes: 'Practice agent, rule + example date: no limit -> touches report.py and rules.py, 6 passed, 1 failed (tests/test_report.py); "Don\'t change board/report.py." or "Only change board/rules.py." -> only rules.py, 7 passed.',
};

export default lesson;
