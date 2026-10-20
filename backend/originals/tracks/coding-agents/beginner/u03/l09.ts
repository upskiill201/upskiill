import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9 — Letting the agent explore before it edits. */

const EXPLORE = 'Read the project and tell me what you find. Don\'t change anything.';
const START = 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\n';

const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Explore first',
  summary: 'On a project he doesn\'t know yet, Felix\'s first brief is never "change X". It\'s "look around and tell me what you find." Remi tries it on a fresh Delivery Board.',
  minutes: 11,
  outcomes: [
    'Ask an agent to explore without changing anything',
    'Check that nothing changed',
    'Use what it found to write better briefs',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Look before you touch',
      steps: [
        { title: '1. Ask it to explore', body: '"Read the project and tell me what you find. Don\'t change anything."' },
        { title: '2. It reads everything', body: 'The practice agent reads all 9 files and runs the tests. Its log is all "read" lines and one test run.' },
        { title: '3. It reports', body: 'It found the baseline (4 passed, 3 failed), that is_at_risk isn\'t written yet, and that board/report.py belongs to Zanele.' },
        { title: '4. Check nothing changed', body: 'files_touched should be empty. If an explore session edits files, stop and find out why.', code: 'print(change.files_touched)   # []', language: 'python' },
        { title: '5. Use what it found', body: 'Its report gives you facts for the brief: which function, which file, who owns what. It costs tokens (7,700 here), so do it once per new project or area.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Look around',
      caption: 'Read-only, then report.',
      code: START + `\nchange = PracticeAgent().run(${JSON.stringify(EXPLORE)}, project)\nprint(change.message)\nprint("Files changed:", change.files_touched)\nprint("Steps:", len(change.log), "| tokens:", change.tokens)\n`,
      challenge: 'Try it in "suggest" mode. What changes in the report?',
    },
  ],
  apply: {
    scenario: 'Look before you touch.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the explore brief and print the files it changed',
        starter: START + `brief = ${JSON.stringify(EXPLORE)}\n`,
        solution: START + `brief = ${JSON.stringify(EXPLORE)}\nchange = PracticeAgent().run(brief, project)\nprint(change.files_touched)\n`,
        hint: 'print(change.files_touched)',
        checks: [{ message: 'Print []', outputEquals: '[]' }],
      },
      {
        kind: 'mcq',
        prompt: 'When is an explore step most useful?',
        options: [
          { text: 'On a project or part of a project you don\'t know yet' },
          { text: 'Before every single one-line fix', why: 'It costs tokens; once per new area is enough.' },
          { text: 'After the code is shipped', why: 'Explore before you change things.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the explore brief and print how many log steps start with "read"',
        starter: START + `change = PracticeAgent().run(${JSON.stringify(EXPLORE)}, project)\n`,
        solution: START + `change = PracticeAgent().run(${JSON.stringify(EXPLORE)}, project)\nprint(len([step for step in change.log if step.startswith("read")]))\n`,
        hint: 'Count log steps that start with "read"',
        checks: [{ message: 'Print 9', outputEquals: '9' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Did the explore report tell Remi this?',
        groups: ['In the report', 'Not in it'],
        items: [
          { text: 'The test baseline', group: 0 },
          { text: 'That is_at_risk isn\'t written yet', group: 0 },
          { text: 'Who owns board/report.py', group: 0 },
          { text: 'Zanele\'s exact rule', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the explore finding to the brief line it leads to.',
        pairs: [
          ['is_at_risk not written', 'Write is_at_risk in board/rules.py'],
          ['report.py is Zanele\'s', 'Only change board/rules.py'],
          ['4 passed, 3 failed', 'Done when all tests pass'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Why didn\'t it find Zanele\'s rule? It read everything.',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Because the rule isn\'t in the project; it\'s in Zanele\'s head. Exploring finds what\'s written down. The rest you have to ask people.' },
          { text: 'It should have guessed it.', why: 'Guessing is what we\'re avoiding.' },
          { text: 'It didn\'t read properly.', why: 'It read all 9 files; the rule isn\'t there.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'log = ["read README.md", "read board/rules.py", "run tests: 4 passed, 3 failed"]\nprint(any(step.startswith(("edit", "create")) for step in log))',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: 'No step edits or creates a file.' },
          { text: '3', why: 'any() returns True or False.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The explore brief.',
        template: 'Read the project and tell me what you find. Don\'t [[1]] [[2]].',
        blanks: [['change'], ['anything']],
        distractors: ['read', 'tests'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this "explore" session is a red flag?',
        lines: ['read README.md', 'read board/rules.py', 'edit board/report.py', 'run tests: 4 passed, 3 failed'],
        bug: 2,
        fix: 'Stop: an explore session should only read and run tests.',
        explanation: 'It was told not to change anything.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many practice tokens did the explore session use?',
        answers: ['7700', '7,700'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When you start somewhere new (a job, a class, a group chat), how do you "explore" before you act?',
    starters: ['I usually...', 'It tells me...'],
  },
  deepen: {
    title: 'Ask questions about the code',
    summary: 'Agents are good at answering "where is X done?" or "what calls this function?" in a big codebase. Exploring with questions is often the most valuable, lowest-risk way to use one.',
  },
  notes: 'Practice agent explore brief: reads all 9 files, runs tests (run mode), files_touched [], message "I read 9 files and changed nothing. Tests: 4 passed, 3 failed: ... board/rules.py: is_at_risk is not written yet... board/report.py belongs to Zanele...", tokens 7700.',
};

export default lesson;
