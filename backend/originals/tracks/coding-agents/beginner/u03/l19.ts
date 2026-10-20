import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 19 — Plan v1: three steps done, each one checked. */

const V1 = 'Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. If the distance is blank, flag it. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';
const MORNING = 'Write morning_list in board/morning.py: the order ids of deliveries at risk, oldest first. Only change board/morning.py. Done when all tests pass.';
const MESSAGE = 'Write morning_message in board/message.py: takes the list of order ids and returns one line for Brian. If none are at risk, say so. Only change board/message.py. Done when all tests pass.';
const STEPS = `steps = [\n    ("rule", ${JSON.stringify(V1)}),\n    ("morning list", ${JSON.stringify(MORNING)}),\n    ("message", ${JSON.stringify(MESSAGE)}),\n]\n`;
const START = 'from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\nagent = PracticeAgent()\n' + STEPS;

const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Plan v1',
  summary: 'Friday. Remi runs Plan v1 properly: a checkpoint before each step, one small brief at a time, every result checked. Brian gets his first real morning message.',
  minutes: 13,
  outcomes: [
    'Run a multi-step plan with checkpoints and checks',
    'Stop the plan as soon as a step fails',
    'Produce the first real morning message',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Good morning, Brian',
      beats: [
        { speaker: 'narrator', text: 'Remi\'s plan: rule, morning list, message. Before each step, a checkpoint. After each, the tests, a read of the change, and a tick in TASKS.md.' },
        { speaker: 'narrator', text: 'Step 1: one file, 7 of 7. Step 2: one file, 9 lines, the right six deliveries. Step 3: one file, quiet days handled.' },
        { speaker: 'remi', text: 'Same agent as Monday. Three small changes instead of one big one.' },
        { speaker: 'narrator', text: 'Brian\'s phone: "Good morning! 6 deliveries at risk today: D-1002, D-1004, D-1008, D-1009, D-1010, D-1011."' },
        { speaker: 'brian', text: 'That\'s exactly what I wanted. On Monday you showed me the weather.' },
        { speaker: 'felix', text: 'Now I\'ll review it properly. Every line. That\'s next.' },
        { speaker: 'tey', text: 'Small steps got it built. Next chapter: reading what the agent wrote, line by line, like Felix does.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Run Plan v1',
      caption: 'Checkpoint, step, check. Stop if a step fails.',
      code: START + '\nfor name, brief in steps:\n    project.checkpoint(f"before {name}")\n    change = agent.run(brief, project)\n    result = run_tests(project)\n    print(name, "|", change.files_touched, "|", result)\n    if not result.ok or len(change.files_touched) != 1:\n        project.restore(f"before {name}")\n        print("Stopped at", name)\n        break\n\nrows = project.load("board.data").load_deliveries()\nids = project.load("board.morning").morning_list(rows)\nprint(project.load("board.message").morning_message(ids))\n',
      challenge: 'Remove "Only change board/message.py." from step 3. Where does the plan stop?',
    },
  ],
  apply: {
    scenario: 'Plan v1.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the three steps in order, then print Brian\'s morning message for the sample deliveries',
        starter: START,
        solution: START + 'for name, brief in steps:\n    agent.run(brief, project)\nrows = project.load("board.data").load_deliveries()\nids = project.load("board.morning").morning_list(rows)\nprint(project.load("board.message").morning_message(ids))\n',
        hint: 'Run each brief, then morning_list(rows), then morning_message(ids)',
        checks: [{ message: 'Print Brian\'s message', outputEquals: 'Good morning! 6 deliveries at risk today: D-1002, D-1004, D-1008, D-1009, D-1010, D-1011.' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why stop the plan as soon as a step fails?',
        options: [
          { text: 'Later steps would build on a broken one' },
          { text: 'To save tokens only', why: 'The real reason is not building on broken work.' },
          { text: 'Agents can\'t continue after a failure', why: 'They can; you shouldn\'t let them.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the three steps and print how many files the project has at the end',
        starter: START,
        solution: START + 'for name, brief in steps:\n    agent.run(brief, project)\nprint(len(project.ls()))\n',
        hint: 'len(project.ls()) after the loop',
        checks: [{ message: 'Print 11 (9 + morning.py + message.py)', outputEquals: '11' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order one step of Plan v1.',
        lines: ['Save a checkpoint', 'Brief one small step', 'Run the tests', 'Read the change', 'Tick it in TASKS.md'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to what it produced.',
        pairs: [
          ['Rule', 'board/rules.py, 7 of 7'],
          ['Morning list', 'Six ids, oldest first'],
          ['Message', 'One line for Brian'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Why was this so much better than Monday?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'On Monday I asked for everything in one line. This time: a plan, then three small, complete briefs, checking each before the next.' },
          { text: 'The agent got smarter.', why: 'Same agent; different process.' },
          { text: 'Luck.', why: 'Every step was checked.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'results = ["7 passed", "7 passed", "6 passed, 1 failed"]\nfor i, r in enumerate(results, start=1):\n    if "failed" in r:\n        print("Stop at step", i)\n        break',
        language: 'python',
        options: [
          { text: 'Stop at step 3' },
          { text: 'Stop at step 2', why: 'Step 3 is the first with a failure.' },
          { text: 'Nothing', why: 'Step 3 has "failed".' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The loop.',
        language: 'python',
        template: 'for name, brief in steps:\n    project.[[1]](f"before {name}")\n    agent.[[2]](brief, project)',
        blanks: [['checkpoint'], ['run']],
        distractors: ['restore', 'read'],
      },
      {
        kind: 'findBug',
        prompt: 'In this version of the loop, which line means a failure is never undone?',
        language: 'python',
        lines: ['for name, brief in steps:', '    agent.run(brief, project)', '    project.checkpoint(f"after {name}")', '    if not run_tests(project).ok:', '        break'],
        bug: 2,
        fix: 'Save the checkpoint BEFORE the step, and restore it when the tests fail.',
        explanation: 'A checkpoint after a bad step saves the bad state.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many deliveries were at risk in Brian\'s first morning message?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Same agent, same week, very different results. What one habit from this chapter will you use first?',
    starters: ['I\'ll start with...', 'Because...'],
  },
  deepen: {
    title: 'Chapter 4: reading the code',
    summary: 'The tests pass and Brian is happy. But Felix hasn\'t read a line yet. Chapter 4 is about reading diffs: what the agent wrote, what it changed silently, and what it made up.',
  },
  notes: 'Practice agent, Plan v1 (Brief v1, morning list oldest first, message with empty case), each with "Only change" + done-when: each step touches 1 file, 7 passed after each; final project 11 files; morning_message(morning_list(sample)) = "Good morning! 6 deliveries at risk today: D-1002, D-1004, D-1008, D-1009, D-1010, D-1011."',
};

export default lesson;
