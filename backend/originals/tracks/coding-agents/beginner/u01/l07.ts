import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7 — "Done!" is a claim, not a fact. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\n';
const BRIEF = 'Write is_at_risk in board/rules.py: flag deliveries that will be late.';

const lesson: OriginalLesson = {
  key: 'l07',
  title: '"Done!" is a claim',
  summary: 'Remi tries a slightly better brief. The agent replies: "Done! All tests pass." Remi runs the tests himself. Not one of the 7 passes.',
  minutes: 12,
  outcomes: [
    'Tell an agent\'s claim from the evidence',
    'Check whether the agent really ran the tests',
    'Run the tests yourself after every change',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'What it said vs what happened',
      before: {
        label: 'The claim',
        text: '"Done! I added is_at_risk to board/rules.py. All tests pass."\nConfident.\nShort.\nNothing to check it against.',
      },
      after: {
        label: 'The evidence',
        text: 'change.ran_tests is False: it never ran them.\nrun_tests(project): 0 passed, 7 failed.\nIt also changed board/report.py, which it didn\'t mention.\nThe claim was a guess.',
      },
      notes: [
        'Agents often report what they expect to be true, not what they checked.',
        'Evidence means a test run you can see: which tests, how many passed.',
        'Rule: after every agent change, run the tests yourself.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Check the claim',
      caption: 'A better brief, but no finish line.',
      code: START + `\nchange = PracticeAgent().run(${JSON.stringify(BRIEF)}, project)\nprint("Agent says:", change.message)\nprint("Did it run the tests?", change.ran_tests)\nprint("Real result:", run_tests(project))\n`,
      challenge: 'Print change.files_touched. Did it mention every file?',
    },
  ],
  apply: {
    scenario: 'Trust, then verify.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the brief below and print whether the agent ran the tests (change.ran_tests)',
        starter: START + `brief = ${JSON.stringify(BRIEF)}\n`,
        solution: START + `brief = ${JSON.stringify(BRIEF)}\nchange = PracticeAgent().run(brief, project)\nprint(change.ran_tests)\n`,
        hint: 'print(change.ran_tests)',
        checks: [{ message: 'Print False', outputEquals: 'False' }],
      },
      {
        kind: 'mcq',
        prompt: 'The agent says "All tests pass" but ran_tests is False. What is "All tests pass"?',
        options: [
          { text: 'Proof the code works', why: 'It never ran them.' },
          { text: 'A guess presented as a fact' },
          { text: 'A lie on purpose', why: 'Agents predict likely text; it isn\'t trying to trick you, which is why you check.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'After the same brief, print how many tests really fail',
        starter: START + `PracticeAgent().run(${JSON.stringify(BRIEF)}, project)\n`,
        solution: START + `PracticeAgent().run(${JSON.stringify(BRIEF)}, project)\nprint(len(run_tests(project).failed))\n`,
        hint: 'len(run_tests(project).failed)',
        checks: [{ message: 'Print 7', outputEquals: '7' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence or claim?',
        groups: ['Evidence', 'Claim'],
        items: [
          { text: 'A test run you can see: 7 passed', group: 0 },
          { text: '"Should work now"', group: 1 },
          { text: 'change.files_touched', group: 0 },
          { text: '"All tests pass" with ran_tests False', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what you see to what you do.',
        pairs: [
          ['"Done!"', 'Run the tests yourself'],
          ['ran_tests is False', 'Ignore any test claim'],
          ['A file it didn\'t mention', 'Read that file\'s changes'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'It literally said all tests pass. Why would it say that if it didn\'t check?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'It must have checked in secret.', why: 'Its log shows no test run.' },
          { text: 'Agents never claim things.', why: 'They do it often; that\'s the lesson.' },
          { text: 'An agent writes the most likely next words. After "I added the function", "All tests pass" is a likely sentence. Likely isn\'t checked.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'log = ["read README.md", "edit board/rules.py"]\nprint("run tests" in " ".join(log))',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: 'No step mentions running tests.' },
          { text: '2', why: 'It prints True or False.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'After every agent change, [[1]] the tests [[2]].',
        blanks: [['run'], ['yourself']],
        distractors: ['delete', 'later'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s message to Felix is not supported by evidence?',
        lines: [
          'The agent wrote is_at_risk in board/rules.py.',
          'It also changed board/report.py.',
          'All tests pass.',
          'Can you take a look?',
        ],
        bug: 2,
        fix: 'Run the tests and report what they actually say: 0 of 7 pass.',
        explanation: 'He copied the agent\'s claim without checking it.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'After this brief, how many of the 7 tests really pass?',
        answers: ['0', 'zero', 'none'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When a colleague says "done", what do you look at before you believe it? Should an agent get more trust, or less?',
    starters: ['I look at...', 'An agent should get...'],
  },
  deepen: {
    title: 'Why so many failed',
    summary: 'The agent guessed the date format and renamed a function in the report file. Chapter 2 fixes the first with an example in the brief; Chapter 4 catches the second in review.',
  },
  notes: 'Practice agent, brief "Write is_at_risk in board/rules.py: flag deliveries that will be late.": message "Done! I added is_at_risk to board/rules.py. All tests pass.", ran_tests False, touched board/report.py and board/rules.py; run_tests -> 0 passed, 7 failed.',
};

export default lesson;
