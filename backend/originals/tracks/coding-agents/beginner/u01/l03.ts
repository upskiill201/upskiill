import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3 — The agent loop: read, plan, act, check. */

const START = 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\n';
const BRIEF = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The agent loop',
  summary: 'Felix shows Remi what a good session looks like. Same agent, a careful brief: it reads, plans, changes one file, runs the tests and reports. Read, plan, act, check.',
  minutes: 12,
  outcomes: [
    'Name the four steps of the agent loop',
    'Find each step in an agent\'s log',
    'See which step was missing from Remi\'s first try',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Read, plan, act, check',
      text: 'An agent works in a loop. It reads the files it needs. It makes a plan. It acts: edits files, runs commands. Then it checks the result, usually by running the tests, and goes round again if something failed. Remi\'s weather dashboard skipped the check entirely.',
      hotspots: [
        { phrase: 'reads the files it needs', note: 'It can\'t know your project until it opens files. What it reads decides what it understands.' },
        { phrase: 'makes a plan', note: 'A list of steps. You can ask to see the plan before it does anything (Chapter 3).' },
        { phrase: 'edits files, runs commands', note: 'This is where it changes your project. Everything here needs checking.' },
        { phrase: 'checks the result', note: 'The step agents skip most. Running the tests turns "I think it works" into evidence.' },
        { phrase: 'skipped the check entirely', note: 'Its log: read README.md, create board/dashboard.py. No tests run, then "Done!".' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A full loop',
      caption: 'Felix\'s careful brief. Read the log line by line.',
      code: START + `\nbrief = ${JSON.stringify(BRIEF)}\nchange = PracticeAgent().run(brief, project)\nprint("Plan:", change.plan)\nfor step in change.log:\n    print(step)\nprint(change.message)\n`,
      challenge: 'Which log line is the "check" step?',
    },
  ],
  apply: {
    scenario: 'Following the loop.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run Felix\'s brief and print the last line of the log',
        starter: START + `brief = ${JSON.stringify(BRIEF)}\n`,
        solution: START + `brief = ${JSON.stringify(BRIEF)}\nchange = PracticeAgent().run(brief, project)\nprint(change.log[-1])\n`,
        hint: 'change.log[-1]',
        checks: [{ message: 'Print run tests: 7 passed', outputEquals: 'run tests: 7 passed' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which step did the weather-dashboard session skip?',
        options: [
          { text: 'Read: it read nothing', why: 'It read README.md first.' },
          { text: 'Check: it never ran the tests' },
          { text: 'Act: it changed nothing', why: 'It created board/dashboard.py.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the agent loop in order.',
        lines: ['Read the files it needs', 'Make a plan', 'Edit files and run commands', 'Check the result'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step of the loop is this log line?',
        groups: ['Read', 'Act', 'Check'],
        items: [
          { text: 'read board/rules.py', group: 0 },
          { text: 'edit board/rules.py', group: 1 },
          { text: 'run tests: 7 passed', group: 2 },
          { text: 'read tests/test_rules.py', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'The second session ran the tests itself. So I don\'t need to?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Right, never run them yourself.', why: 'Running them yourself takes seconds and catches surprises.' },
          { text: 'Tests are a waste of time.', why: 'They\'re the best evidence you have.' },
          { text: 'Its test run is good evidence. I still run them myself before I approve. Trust, then verify.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'log = ["read README.md", "edit board/rules.py", "run tests: 7 passed"]\nprint(any(step.startswith("run tests") for step in log))',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: 'The last step starts with "run tests".' },
          { text: '3', why: 'any() returns True or False.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run Felix\'s brief and print True if any log step starts with "run tests"',
        starter: START + `brief = ${JSON.stringify(BRIEF)}\nchange = PracticeAgent().run(brief, project)\n`,
        solution: START + `brief = ${JSON.stringify(BRIEF)}\nchange = PracticeAgent().run(brief, project)\nprint(any(step.startswith("run tests") for step in change.log))\n`,
        hint: 'any(step.startswith("run tests") for step in change.log)',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to what it gives you.',
        pairs: [
          ['Read', 'Understanding of the project'],
          ['Plan', 'A list of steps'],
          ['Act', 'Changed files'],
          ['Check', 'Evidence it works'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The loop.',
        template: 'Read, [[1]], act, [[2]].',
        blanks: [['plan'], ['check']],
        distractors: ['guess', 'ship'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which step of the loop do agents skip most often?',
        answers: ['check', 'checking', 'the check'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'When you do a task yourself, which of read, plan, act, check do you skip? What happens when you do?',
    starters: ['I usually skip...', 'When I do...'],
  },
  deepen: {
    title: 'Why loops go wrong',
    summary: 'Each trip round the loop builds on the last. A wrong early guess (a date format, a file name) gets built on again and again. That\'s why small steps and early checks matter (Chapters 3 and 5).',
  },
  notes: 'Practice agent with the careful brief: plan [Read board/rules.py and tests/test_rules.py, Write is_at_risk in board/rules.py, Run the tests]; log read README.md, read board/rules.py, read tests/test_rules.py, edit board/rules.py, run tests: 7 passed; message "Done. All 7 tests pass."',
};

export default lesson;
