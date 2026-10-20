import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: checkpoints, step size, order, exploring. */

const V1 = 'Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. If the distance is blank, flag it. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';
const MORNING = 'Write morning_list in board/morning.py: the order ids of deliveries at risk, oldest first. Only change board/morning.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: save, size, order',
  summary: 'A checkpoint before every step, steps small enough to check in two minutes, foundations first, and a look around before touching anything. Quick check before long sessions.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Run a safe, ordered sequence of steps without notes', 'Recover from a bad step'],
  learn: [
    {
      kind: 'story',
      title: 'Ten seconds',
      beats: [
        { speaker: 'narrator', text: 'Step 3 goes wrong again. Remi types one line, project.restore, and he\'s back in ten seconds.' },
        { speaker: 'felix', text: 'That\'s the moment you stop being scared of the agent.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: save, size, order.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the rule, save a checkpoint called "step 1", run the morning list, then restore "step 1" and print whether board/morning.py is in the project',
        starter: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nagent = PracticeAgent()\n`,
        solution: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nagent = PracticeAgent()\nagent.run(${JSON.stringify(V1)}, project)\nproject.checkpoint("step 1")\nagent.run(${JSON.stringify(MORNING)}, project)\nproject.restore("step 1")\nprint("board/morning.py" in project.ls())\n`,
        hint: 'run, checkpoint("step 1"), run, restore("step 1"), then check project.ls()',
        checks: [{ message: 'Print False', outputEquals: 'False' }],
      },
      {
        kind: 'mcq',
        prompt: 'The morning list returns [] on a fresh project. Why?',
        options: [
          { text: 'The rule it depends on isn\'t written yet' },
          { text: 'The list code is wrong', why: 'It\'s correct; its foundation is missing.' },
          { text: 'There are no deliveries', why: 'There are 12.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a safe agent step.',
        lines: ['Check the last step works', 'Save a checkpoint', 'Brief one small step', 'Check it; restore if it went wrong'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Explore first, or brief a change straight away?',
        groups: ['Explore first', 'Brief straight away'],
        items: [
          { text: 'A project you\'ve never seen', group: 0 },
          { text: 'The next small step in code you just reviewed', group: 1 },
          { text: 'A new part of the codebase', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['project.restore()', 'Back in ten seconds'],
          ['Two minutes', 'Right-sized step'],
          ['Imports', 'Show dependencies'],
          ['files_touched is []', 'Explore changed nothing'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s routine is in the wrong order?',
        lines: [
          'Explore the project.',
          'Write the morning message.',
          'Write is_at_risk.',
          'Write the morning list.',
        ],
        bug: 1,
        fix: 'Write the message last: rule, list, message.',
        explanation: 'The message needs the list, which needs the rule.',
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'What if the agent wrecks everything?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'I save a checkpoint before every step, so the worst case is going back ten seconds and rewriting one brief.' },
          { text: 'It won\'t.', why: 'It will sometimes; the checkpoint is why it doesn\'t matter.' },
          { text: 'We\'d start the project again.', why: 'The checkpoint keeps every good step.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'saved = {"a.py": "v1"}\nfiles = {"a.py": "v2", "b.py": "new"}\nfiles = dict(saved)\nprint(sorted(files))',
        language: 'python',
        options: [
          { text: "['a.py']" },
          { text: "['a.py', 'b.py']", why: 'files is replaced by a copy of saved.' },
          { text: "{'a.py': 'v1'}", why: 'sorted() of a dict gives a list of keys.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Write reviewable(change) (at most 2 files and 30 added lines) and print it for the morning-list step',
        starter: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nagent = PracticeAgent()\nagent.run(${JSON.stringify(V1)}, project)\nstep = agent.run(${JSON.stringify(MORNING)}, project)\n`,
        solution: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nagent = PracticeAgent()\nagent.run(${JSON.stringify(V1)}, project)\nstep = agent.run(${JSON.stringify(MORNING)}, project)\n\ndef reviewable(change):\n    return len(change.files_touched) <= 2 and change.lines_added <= 30\n\nprint(reviewable(step))\n`,
        hint: 'len(change.files_touched) <= 2 and change.lines_added <= 30',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rhythm.',
        template: 'Check, [[1]], brief, check, and [[2]] if it went wrong.',
        blanks: [['save'], ['restore']],
        distractors: ['ship', 'panic'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the practice method that saves every file? (project.____())',
        answers: ['checkpoint', 'checkpoint()'],
        placeholder: 'A method name',
      },
    ],
  },
  reflect: {
    prompt: 'Felix says checkpoints are when you stop being scared of the agent. What would you try if you knew you could always go back?',
    starters: ['I\'d try...', 'Because going back is...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 6-9. After rule + checkpoint("step 1") + morning list + restore("step 1"), board/morning.py is gone.',
};

export default lesson;
