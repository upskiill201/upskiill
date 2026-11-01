import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9 — Same task, three briefs, three results. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests\n\n';
const VAGUE = 'make the delivery thing';
const MED = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Only change board/rules.py. Done when all tests pass.';
const FULL = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Three briefs, three results',
  summary: 'Felix puts three of Remi\'s briefs side by side and runs each on a fresh project. Same agent, same task, three very different afternoons.',
  minutes: 12,
  outcomes: [
    'Compare briefs by their results, not their length',
    'Run the same task on fresh projects',
    'Name the one difference between each pair',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Side by side',
      steps: [
        { title: '1. The vague brief', body: '"make the delivery thing". Result: a weather dashboard. Tests unchanged: 4 passed, 3 failed.' },
        { title: '2. The nearly brief', body: 'Rule, limit and finish line, no example date. Result: the agent stays in rules.py, guesses the date format, reports honestly: 1 of 7 tests pass.' },
        { title: '3. The full brief', body: 'Add one sentence: "Dates look like 2026-03-06 15:00." Result: one file changed, all 7 tests pass, and the agent ran them.' },
        { title: '4. Fresh project each time', body: 'Always compare on a fresh copy. If you run brief 2 on top of brief 1\'s mess, you\'re testing both at once.', code: 'for brief in briefs:\n    project = Project()   # fresh every time\n    PracticeAgent().run(brief, project)', language: 'python' },
        { title: '5. The lesson', body: 'Each step up added a missing piece, not more words. The difference between 1 of 7 and 7 of 7 was five words.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Run all three',
      caption: 'A fresh project for each brief.',
      code: START + `briefs = [${JSON.stringify(VAGUE)},\n          ${JSON.stringify(MED)},\n          ${JSON.stringify(FULL)}]\n` + 'for number, brief in enumerate(briefs, start=1):\n    project = Project()\n    change = PracticeAgent().run(brief, project)\n    print(number, run_tests(project).total - len(run_tests(project).failed), "of 7 |", change.files_touched)\n',
      challenge: 'Add a fourth brief: the full one without "Only change board/rules.py."',
    },
  ],
  apply: {
    scenario: 'Comparing briefs fairly.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run each brief on a fresh project and print the number of passing tests for each, as a list',
        starter: START + `briefs = [${JSON.stringify(VAGUE)}, ${JSON.stringify(MED)}, ${JSON.stringify(FULL)}]\nresults = []\n`,
        solution: START + `briefs = [${JSON.stringify(VAGUE)}, ${JSON.stringify(MED)}, ${JSON.stringify(FULL)}]\nresults = []\nfor brief in briefs:\n    project = Project()\n    PracticeAgent().run(brief, project)\n    results.append(len(run_tests(project).passed))\nprint(results)\n`,
        hint: 'A fresh Project() inside the loop; append len(run_tests(project).passed)',
        checks: [{ message: 'Print [4, 1, 7]', outputEquals: '[4, 1, 7]' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why use a fresh project for each brief?',
        options: [
          { text: 'Projects get slow after one run', why: 'It\'s about a fair comparison.' },
          { text: 'So each result shows only that brief\'s effect' },
          { text: 'The agent can\'t run twice', why: 'It can; but results would mix.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the brief to its result.',
        pairs: [
          ['Vague', 'Weather dashboard, 4 of 7'],
          ['Nearly', 'Honest failure, 1 of 7'],
          ['Full', 'One file, 7 of 7'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'What made the difference between the briefs?',
        groups: ['Vague to nearly', 'Nearly to full'],
        items: [
          { text: 'Naming the task and the file', group: 0 },
          { text: 'One real example date', group: 1 },
          { text: 'Writing Zanele\'s rule', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'So longer briefs are better?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'Yes, write pages.', why: 'Completeness matters, not length (lesson 14).' },
          { text: 'No, shorter is always better.', why: 'Too short leaves gaps.' },
          { text: 'Not longer: complete. The full brief is only five words longer than the nearly one. The missing example made all the difference.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'results = [4, 1, 7]\nprint(results.index(max(results)) + 1)',
        language: 'python',
        options: [
          { text: '3' },
          { text: '2', why: 'max is 7 at index 2, plus 1 is 3.' },
          { text: '7', why: 'It prints which brief, not the score.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many more words the full brief has than the nearly brief',
        starter: `MED = ${JSON.stringify(MED)}\nFULL = ${JSON.stringify(FULL)}\n`,
        solution: `MED = ${JSON.stringify(MED)}\nFULL = ${JSON.stringify(FULL)}\nprint(len(FULL.split()) - len(MED.split()))\n`,
        hint: 'len(FULL.split()) - len(MED.split())',
        checks: [{ message: 'Print 5', outputEquals: '5' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Comparing fairly.',
        language: 'python',
        template: 'for brief in briefs:\n    project = [[1]]()\n    PracticeAgent().[[2]](brief, project)',
        blanks: [['Project'], ['run']],
        distractors: ['Change', 'read'],
      },
      {
        kind: 'findBug',
        prompt: 'This compares the briefs unfairly. Which line?',
        language: 'python',
        lines: ['project = Project()', 'for brief in briefs:', '    PracticeAgent().run(brief, project)', '    print(run_tests(project))'],
        bug: 0,
        fix: 'Create project = Project() inside the loop.',
        explanation: 'Each brief should start from a fresh project.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of 7 tests pass with the "nearly" brief?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which of your three briefs would you have written on your first day? What would you add now?',
    starters: ['On day one I\'d write...', 'Now I\'d add...'],
  },
  deepen: {
    title: 'A/B testing briefs',
    summary: 'Running two versions of something side by side is called an A/B test. Teams do it with prompts too, measuring results on the same tests rather than trusting how a prompt reads.',
  },
  notes: 'Practice agent on fresh projects: vague -> 4 passed (weather dashboard), nearly (no example date) -> 1 passed, full -> 7 passed. The full brief has 5 more words than the nearly one ("Dates look like 2026-03-06 15:00." splits into 5).',
};

export default lesson;
