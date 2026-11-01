import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1 — The six-file change. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\n';
const WHOLE = 'Build the whole Delivery Board: the at-risk rule, the morning list and a morning message for Brian.';

const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The six-file change',
  summary: 'Brief v1 worked, so Remi gets ambitious: "Build the whole Delivery Board." The agent changes six files at once and says all tests pass. Felix opens the change, scrolls, and types one word.',
  minutes: 11,
  outcomes: [
    'See why one big change is hard to review',
    'Measure a change: files, lines, results',
    'Know why small steps beat one big leap',
  ],
  learn: [
    {
      kind: 'story',
      title: 'No.',
      beats: [
        { speaker: 'remi', text: 'The rule works. Now the morning list and Brian\'s message. Why not ask for everything at once?' },
        { speaker: 'narrator', text: 'He types: "Build the whole Delivery Board: the at-risk rule, the morning list and a morning message for Brian." The agent changes six files and replies: "Done! I built the whole Delivery Board... All tests pass."' },
        { speaker: 'narrator', text: 'Felix opens it. A new rule, a morning list, a message, a weather dashboard nobody asked for, a settings file nobody uses, and Zanele\'s report renamed. He scrolls for a minute.' },
        { speaker: 'felix', text: 'No.' },
        { speaker: 'remi', text: 'No what?' },
        { speaker: 'felix', text: 'No, I can\'t review that. Six things at once means if one is wrong, I can\'t tell which. Run the tests.' },
        { speaker: 'narrator', text: 'Remi runs them. 0 of 7 pass.' },
      ],
      choice: {
        prompt: 'What should Remi do with the six-file change?',
        options: [
          { text: 'Throw it away and redo it in small steps, one file at a time.', outcome: 'Right. Untangling six mixed changes takes longer than redoing three small ones.', best: true },
          { text: 'Fix the failing tests inside the big change.', outcome: 'Which file broke them? With six changes mixed, every fix is a guess.' },
          { text: 'Ask the agent to "fix everything".', outcome: 'That makes the change bigger, not clearer.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'The whole board at once',
      caption: 'Measure what came back.',
      code: START + `\nchange = PracticeAgent().run(${JSON.stringify(WHOLE)}, project)\nprint(change.message)\nprint(len(change.files_touched), "files,", change.lines_added, "lines added")\nprint("Real result:", run_tests(project))\n`,
      challenge: 'Print change.files_touched. Which ones did Remi ask for?',
    },
  ],
  apply: {
    scenario: 'Too much at once.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the whole-board brief and print how many files the agent touched',
        starter: START + `brief = ${JSON.stringify(WHOLE)}\n`,
        solution: START + `brief = ${JSON.stringify(WHOLE)}\nchange = PracticeAgent().run(brief, project)\nprint(len(change.files_touched))\n`,
        hint: 'len(change.files_touched)',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t Felix review the six-file change?',
        options: [
          { text: 'He doesn\'t like long code', why: 'It\'s about finding the cause, not taste.' },
          { text: 'With six things changed at once, he can\'t tell which one broke the tests' },
          { text: 'Reviews only work on one file', why: 'They work on any size; small ones work best.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'In the six-file change: asked for, or not?',
        groups: ['Asked for', 'Not asked for'],
        items: [
          { text: 'board/morning.py', group: 0 },
          { text: 'board/dashboard.py (weather)', group: 1 },
          { text: 'board/message.py', group: 0 },
          { text: 'board/config.py (settings)', group: 1 },
          { text: 'Renaming Zanele\'s report function', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the claim to the fact.',
        pairs: [
          ['"Done!"', 'Six files changed'],
          ['"All tests pass"', '0 of 7 pass'],
          ['"The whole Delivery Board"', 'Including a weather dashboard'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Can\'t I just fix the big change instead of starting over?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Yes, patch it.', why: 'Patching a tangle you can\'t read makes a bigger tangle.' },
          { text: 'Ship it, the tests will catch problems later.', why: 'They\'re failing now.' },
          { text: 'You could spend the afternoon untangling it. Or throw it away and do three small steps, checking each. The second is faster.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'touched = ["board/config.py", "board/dashboard.py", "board/message.py", "board/morning.py", "board/report.py", "board/rules.py"]\nasked = ["board/rules.py", "board/morning.py", "board/message.py"]\nprint(len([f for f in touched if f not in asked]))',
        language: 'python',
        options: [
          { text: '3' },
          { text: '6', why: 'Only files not asked for are counted.' },
          { text: '0', why: 'config, dashboard and report weren\'t asked for.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the whole-board brief and print how many tests really fail',
        starter: START + `PracticeAgent().run(${JSON.stringify(WHOLE)}, project)\n`,
        solution: START + `PracticeAgent().run(${JSON.stringify(WHOLE)}, project)\nprint(len(run_tests(project).failed))\n`,
        hint: 'len(run_tests(project).failed)',
        checks: [{ message: 'Print 7', outputEquals: '7' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Felix\'s rule.',
        template: 'If [[1]] things change at once and one is wrong, you can\'t tell [[2]].',
        blanks: [['six', 'many'], ['which']],
        distractors: ['two', 'why'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s plan caused the problem?',
        lines: [
          'Brief v1 works for the rule.',
          'Next: ask for the whole board in one brief.',
          'Review the change.',
          'Run the tests.',
        ],
        bug: 1,
        fix: 'Next: one step at a time, starting with the morning list.',
        explanation: 'One giant brief gave one giant, unreviewable change.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What one word did Felix reply?',
        answers: ['No', 'no', 'No.'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever tried to do everything at once and lost track of what went wrong? What would small steps have looked like?',
    starters: ['I tried to...', 'Small steps would have been...'],
  },
  deepen: {
    title: 'Why big changes hide bugs',
    summary: 'Studies of code review find reviewers catch far fewer problems in large changes than in small ones. Attention runs out. The same is true when you review an agent.',
  },
  notes: 'Practice agent, whole-board brief: touches board/config.py, dashboard.py, message.py, morning.py, report.py, rules.py (6 files, 42 lines added), message "Done! I built the whole Delivery Board: ... All tests pass.", ran no tests; run_tests 0 passed, 7 failed. Code review research (e.g. SmartBear/Cisco study) finds defect detection drops for large reviews.',
};

export default lesson;
