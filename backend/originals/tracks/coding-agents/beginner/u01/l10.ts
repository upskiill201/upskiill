import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: tools, claims vs evidence, judging, the trust ladder. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\n';
const BRIEF = 'Write is_at_risk in board/rules.py: flag deliveries that will be late.';

const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: claims and evidence',
  summary: 'Three tools, claims versus evidence, typing versus judging, and the trust ladder. Quick check before Remi takes a proper look around the project.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Check an agent\'s claim with the tests yourself', 'Pick the right rung of the ladder'],
  learn: [
    {
      kind: 'story',
      title: 'Felix\'s one question',
      beats: [
        { speaker: 'narrator', text: 'Remi sends Felix a screenshot: "All tests pass!" Felix replies with one question.' },
        { speaker: 'felix', text: 'Did YOU run them?' },
        { speaker: 'remi', text: '...Give me a minute.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: claims and evidence.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the brief below, then print the real test results',
        starter: START + `brief = ${JSON.stringify(BRIEF)}\n`,
        solution: START + `brief = ${JSON.stringify(BRIEF)}\nPracticeAgent().run(brief, project)\nprint(run_tests(project))\n`,
        hint: 'print(run_tests(project))',
        checks: [{ message: 'Print the 0 passed, 7 failed summary', outputIncludes: '0 passed, 7 failed' }],
      },
      {
        kind: 'mcq',
        prompt: 'The agent says "All tests pass." What do you do first?',
        options: [
          { text: 'Tell Felix it\'s ready', why: 'Check first.' },
          { text: 'Run the tests yourself' },
          { text: 'Ask the agent if it\'s sure', why: 'It will say yes. Run them.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool: files, terminal or tests?',
        groups: ['Files', 'Terminal', 'Tests'],
        items: [
          { text: 'project.read("README.md")', group: 0 },
          { text: 'start the program', group: 1 },
          { text: 'run_tests(project)', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Run the same brief and print the files the agent touched',
        starter: START + `brief = ${JSON.stringify(BRIEF)}\n`,
        solution: START + `brief = ${JSON.stringify(BRIEF)}\nchange = PracticeAgent().run(brief, project)\nprint(change.files_touched)\n`,
        hint: 'change.files_touched',
        checks: [{ message: "Print ['board/report.py', 'board/rules.py']", outputEquals: "['board/report.py', 'board/rules.py']" }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['Terminal', 'The riskiest tool'],
          ['"All tests pass"', 'A claim until you run them'],
          ['Your job', 'Judging, not typing'],
          ['Suggest mode', 'The bottom rung'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s report is a claim, not evidence?',
        lines: [
          'I ran the tests: 0 of 7 pass.',
          'The agent changed board/rules.py and board/report.py.',
          'The agent says it\'s finished.',
          'Next: a clearer brief.',
        ],
        bug: 2,
        fix: 'Leave it out, or say what the evidence shows instead.',
        explanation: 'The agent\'s word adds nothing next to the test run.',
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Did YOU run them?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'No, but it said they pass.', why: 'That\'s the claim Felix is questioning.' },
          { text: 'Tests are your job.', why: 'Checking your own change is your job.' },
          { text: 'Now I have: 0 of 7 pass, and it changed report.py without saying. I\'ll fix the brief before sending anything again.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'passed, total = 0, 7\nprint(passed == total)',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: '0 is not 7.' },
          { text: '7', why: 'It prints the comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Trust, then verify.',
        template: 'A claim says it [[1]]; [[2]] shows it does.',
        blanks: [['works'], ['evidence']],
        distractors: ['nothing', 'Felix'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order what Remi does after an agent change.',
        lines: ['Read the agent\'s message', 'Look at the files it touched', 'Run the tests yourself', 'Report what the evidence shows'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which agent mode shows changes but applies nothing?',
        answers: ['suggest', 'suggest mode'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Felix asked one question: "Did YOU run them?" What one question will you ask yourself before sending agent work to anyone?',
    starters: ['My question is...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 6-9. Brief without a finish line: touched board/report.py and board/rules.py; run_tests 0 passed, 7 failed.',
};

export default lesson;
