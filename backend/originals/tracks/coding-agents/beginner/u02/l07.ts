import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7 — "Done when...": checkable finish lines. */

const START = 'from teyro_agent import Project, PracticeAgent, read_brief\n\n';
const R = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py.';

const lesson: OriginalLesson = {
  key: 'l07',
  title: '"Done when..."',
  summary: 'Remi\'s brief says "make sure it works well." The agent says "All tests pass" without running anything. Felix: "\'Works well\' isn\'t a finish line. Give it one it can check."',
  minutes: 12,
  outcomes: [
    'Tell a checkable finish line from a vague one',
    'Write a "done when" into a brief',
    'Check that the agent actually ran the check',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Vague vs checkable',
      before: {
        label: 'Vague finish',
        text: '"Make sure it works well."\n"Make it robust."\n"Test it properly."\nThe agent can\'t check any of these, so it claims them.',
      },
      after: {
        label: 'Checkable finish',
        text: '"Done when all tests pass."\n"Done when run_tests shows 7 passed."\n"Done when D-1008 is flagged and D-1007 isn\'t."\nThe agent can check each one, and so can you.',
      },
      notes: [
        'A finish line is checkable if two people would agree whether it\'s met.',
        'With a checkable "done when", the practice agent runs the tests and reports the real result.',
        'Without one, it ends with a claim: "All tests pass."',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Two finish lines',
      caption: 'Did the agent run the tests?',
      code: START + `rule = ${JSON.stringify(R)}\n` + 'for finish in [" Make sure it works well.", " Done when all tests pass."]:\n    change = PracticeAgent().run(rule + finish, Project())\n    print(read_brief(rule + finish)["done_when"], change.ran_tests, "|", change.message)\n',
      challenge: 'Try " Test it properly." Is that checkable?',
    },
  ],
  apply: {
    scenario: 'A finish line it can check.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Change the finish line so the agent runs the tests, then print change.ran_tests',
        starter: START + `brief = ${JSON.stringify(R)} + " Make sure it works well."\nchange = PracticeAgent().run(brief, Project())\nprint(change.ran_tests)\n`,
        solution: START + `brief = ${JSON.stringify(R)} + " Done when all tests pass."\nchange = PracticeAgent().run(brief, Project())\nprint(change.ran_tests)\n`,
        hint: '" Done when all tests pass."',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a finish line checkable?',
        options: [
          { text: 'It uses strong words like "robust"', why: 'Strong words aren\'t checkable.' },
          { text: 'Two people would agree whether it\'s met' },
          { text: 'It\'s long', why: 'Length doesn\'t make it checkable.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Checkable or vague?',
        groups: ['Checkable', 'Vague'],
        items: [
          { text: 'Done when all tests pass', group: 0 },
          { text: 'Make it robust', group: 1 },
          { text: 'Done when D-1008 is flagged', group: 0 },
          { text: 'Make sure it works well', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the finish line to what the agent does.',
        pairs: [
          ['"Make sure it works well"', 'Claims the tests pass'],
          ['"Done when all tests pass"', 'Runs the tests and reports'],
          ['No finish line', 'Stops when it thinks it\'s done'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: '"Works well" is obvious. Why spell it out?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'You\'re right, it\'s obvious.', why: 'The agent claimed it without checking.' },
          { text: 'Finish lines slow it down.', why: 'They make it check its work.' },
          { text: 'Obvious to you. To the agent it\'s nothing it can test. "All tests pass" it can run, and so can I.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_agent import read_brief\nprint(read_brief("Make it robust.")["done_when"])',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: '"Robust" isn\'t a test it can run.' },
          { text: 'robust', why: 'It prints True or False.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print whether read_brief finds a finish line in "Done when all tests pass."',
        starter: START,
        solution: START + 'print(read_brief("Done when all tests pass.")["done_when"])\n',
        hint: 'read_brief("...")["done_when"]',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'A finish line.',
        template: '[[1]] when all tests [[2]].',
        blanks: [['Done'], ['pass']],
        distractors: ['Maybe', 'exist'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the brief is the vague finish?',
        lines: [
          'Write is_at_risk in board/rules.py.',
          'Dates look like 2026-03-06 15:00.',
          'Only change board/rules.py.',
          'Make it really solid.',
        ],
        bug: 3,
        fix: 'Done when all tests pass.',
        explanation: '"Really solid" can\'t be checked.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Complete the finish line: "Done when all tests ..."',
        answers: ['pass'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'What is the finish line for something you\'re working on? Write it so a stranger could check it.',
    starters: ['It\'s done when...', 'Anyone could check by...'],
  },
  deepen: {
    title: 'Definition of done',
    summary: 'Software teams agree a "definition of done" for every task: tests pass, reviewed, documented. Agents need the same thing, written in the brief.',
  },
  notes: 'Practice agent: "Make sure it works well." -> done_when False, ran_tests False, claim "All tests pass."; "Done when all tests pass." -> ran_tests True, "Done. All 7 tests pass." read_brief("Make it robust.") done_when False.',
};

export default lesson;
