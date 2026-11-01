import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9 — The trust ladder: suggest, edit, run. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\n';
const GOOD = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The trust ladder',
  summary: 'Felix sets Remi\'s agent to "suggest" for the first week. Remi complains. Felix explains the ladder: suggest, then edit, then run, and you climb it one rung at a time.',
  minutes: 12,
  outcomes: [
    'Name the three rungs of the trust ladder',
    'Run the practice agent in each mode',
    'Choose a mode for a job',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Three rungs',
      steps: [
        { title: '1. Suggest', body: 'The agent shows you the change. Nothing in your project moves until you apply it. Safest; the most work for you.', code: 'agent = PracticeAgent(mode="suggest")', language: 'python' },
        { title: '2. Edit', body: 'It changes files, but can\'t run commands. You run the tests.', code: 'agent = PracticeAgent(mode="edit")', language: 'python' },
        { title: '3. Run', body: 'It changes files AND runs commands, such as the tests. Fastest, and you check after.', code: 'agent = PracticeAgent(mode="run")', language: 'python' },
        { title: '4. Climb slowly', body: 'Start low on a new project or a new agent. Move up as it earns trust on that kind of task. Drop down for anything risky: real data, money, deleting things.' },
        { title: '5. Real tools', body: 'Real agents have the same idea under different names: ask before every edit, auto-accept edits, ask before commands, allow some commands. Chapter 8 sets them properly.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'One brief, three modes',
      caption: 'Watch what changes in the project each time.',
      code: 'from teyro_agent import Project, PracticeAgent, run_tests\n\n' + `brief = ${JSON.stringify(GOOD)}\n` + 'for mode in ["suggest", "edit", "run"]:\n    project = Project()\n    change = PracticeAgent(mode=mode).run(brief, project)\n    print(mode, "|", run_tests(project), "| ran tests:", change.ran_tests)\n',
      challenge: 'In suggest mode, print change.diff. The change is there, just not applied.',
    },
  ],
  apply: {
    scenario: 'Climbing the ladder.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the good brief in suggest mode, then print the test results of the project',
        starter: START + `brief = ${JSON.stringify(GOOD)}\n`,
        solution: START + `brief = ${JSON.stringify(GOOD)}\nPracticeAgent(mode="suggest").run(brief, project)\nprint(run_tests(project))\n`,
        hint: 'PracticeAgent(mode="suggest").run(brief, project)',
        checks: [{ message: 'Still 4 passed, 3 failed: suggest changes nothing', outputIncludes: '4 passed, 3 failed' }],
      },
      {
        kind: 'mcq',
        prompt: 'In edit mode, who runs the tests?',
        options: [
          { text: 'The agent', why: 'Edit mode can\'t run commands.' },
          { text: 'You do' },
          { text: 'Nobody needs to', why: 'Someone always does.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which mode would you start with?',
        groups: ['Suggest', 'Edit', 'Run'],
        items: [
          { text: 'A brand-new agent on a project with real customer data', group: 0 },
          { text: 'A trusted agent fixing a failing test you wrote', group: 2 },
          { text: 'Week two, small changes you check by hand', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mode to what it may do.',
        pairs: [
          ['suggest', 'Show changes only'],
          ['edit', 'Change files, run nothing'],
          ['run', 'Change files and run commands'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Suggest mode is so slow. Can\'t I just use run mode for everything?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Sure, speed is all that matters.', why: 'More power means more damage when it guesses wrong.' },
          { text: 'Never use run mode.', why: 'For trusted, checkable work it\'s the fastest and fine.' },
          { text: 'Earn it. A week of good suggestions on this project, then edit. Run mode comes when it\'s proven itself, and never for anything that can delete data.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'modes = ["suggest", "edit", "run"]\nprint(modes.index("run"))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '3', why: 'Counting starts at 0.' },
          { text: 'run', why: 'index() returns the position.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the good brief in edit mode and print whether the agent ran the tests',
        starter: START + `brief = ${JSON.stringify(GOOD)}\n`,
        solution: START + `brief = ${JSON.stringify(GOOD)}\nchange = PracticeAgent(mode="edit").run(brief, project)\nprint(change.ran_tests)\n`,
        hint: 'change.ran_tests',
        checks: [{ message: 'Print False', outputEquals: 'False' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The ladder.',
        template: 'Suggest, then [[1]], then [[2]].',
        blanks: [['edit'], ['run']],
        distractors: ['ship', 'delete'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s setup is the risky one?',
        lines: [
          'New agent, first week: suggest mode.',
          'Small, checked changes: edit mode.',
          'Changes to the live customer database: run mode, no questions asked.',
          'Tests on trusted tasks: run mode.',
        ],
        bug: 2,
        fix: 'Anything touching live data: suggest mode, and a human approves.',
        explanation: 'Drop down the ladder for risky work, not up.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which mode lets the agent change files and run commands?',
        answers: ['run', 'run mode'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'How do you decide how much to trust a new colleague? How is the trust ladder the same, and how is it different?',
    starters: ['With a new colleague I...', 'With an agent...'],
  },
  deepen: {
    title: 'Trust is per task',
    summary: 'An agent can be trusted with test fixes and not with database changes. Trust isn\'t one setting for the agent; it\'s one setting per kind of job.',
  },
  notes: 'Practice agent modes: suggest (records the change, writes nothing; tests stay 4 passed, 3 failed), edit (writes, runs nothing; ran_tests False; your run gives 7 passed), run (writes and runs; 7 passed). Real tools offer comparable permission modes (2026).',
};

export default lesson;
