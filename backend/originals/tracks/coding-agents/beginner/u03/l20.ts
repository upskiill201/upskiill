import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 20 — Chapter challenge: build it in small steps. */

const V1 = 'Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. If the distance is blank, flag it. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';
const WHOLE = 'Build the whole Delivery Board: the at-risk rule, the morning list and a morning message for Brian.';
const START = 'from teyro_agent import Project, PracticeAgent, run_tests\n\n';

const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter challenge: small steps',
  summary: 'Felix\'s challenge: "Fresh project. Plan it, cut the plan, then build the list and the message in small steps, with checkpoints. Write your own briefs." Everything from Chapter 3, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Plan and build in small, checked steps', 'Use everything from Chapter 3 together'],
  learn: [
    {
      kind: 'story',
      title: 'Your own briefs',
      beats: [
        { speaker: 'felix', text: 'No copying Remi\'s briefs this time. Write the morning list and message briefs yourself.' },
        { speaker: 'remi', text: 'Plan, cut, checkpoint, one step, check. Got it.' },
        { speaker: 'tey', text: 'That\'s the chapter in one go. No hints you haven\'t already used.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: small steps.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Ask for the whole-board plan without code, then print the steps that don\'t mention dashboard, config or report',
        starter: START + `project = Project()\nbrief = ${JSON.stringify(WHOLE)}\n`,
        solution: START + `project = Project()\nbrief = ${JSON.stringify(WHOLE)}\nplan = PracticeAgent().run(brief + " Plan first, don't write code yet.", project).plan\nprint([s for s in plan if not any(w in s for w in ["dashboard", "config", "report"])])\n`,
        hint: 'Add " Plan first, don\'t write code yet.", then filter the plan',
        checks: [{ message: 'Print the three real steps', outputEquals: "['Write is_at_risk in board/rules.py', 'Write morning_list in board/morning.py', 'Write morning_message in board/message.py']" }],
      },
      {
        kind: 'mcq',
        prompt: 'In what order should the three steps run?',
        options: [
          { text: 'Message, list, rule', why: 'Each needs the one before it.' },
          { text: 'Rule, morning list, message' },
          { text: 'All at once', why: 'That\'s the six-file change.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'After the rule step, write your OWN morning-list brief (oldest first, one file, a finish line). Checks: touches only board/morning.py, the agent ran the tests, and the list is oldest first',
        starter: START + `project = Project()\nagent = PracticeAgent()\nagent.run(${JSON.stringify(V1)}, project)\nproject.checkpoint("after rule")\nbrief = "Write morning_list."\nchange = agent.run(brief, project)\n`,
        solution: START + `project = Project()\nagent = PracticeAgent()\nagent.run(${JSON.stringify(V1)}, project)\nproject.checkpoint("after rule")\nbrief = "Write morning_list in board/morning.py: the order ids of deliveries at risk, oldest first. Only change board/morning.py. Done when all tests pass."\nchange = agent.run(brief, project)\n`,
        hint: 'Name the file, say "oldest first", add "Only change board/morning.py." and "Done when all tests pass."',
        checks: [
          { message: 'Only board/morning.py was touched', expr: 'change.files_touched == ["board/morning.py"]' },
          { message: 'The agent ran the tests', expr: 'change.ran_tests' },
          { message: 'The list is oldest first', expr: 'project.load("board.morning").morning_list(project.load("board.data").load_deliveries()) == ["D-1002", "D-1004", "D-1008", "D-1009", "D-1010", "D-1011"]' },
          { message: 'All tests still pass', expr: 'run_tests(project).ok' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 habit is this?',
        groups: ['Plan', 'Step', 'Safety'],
        items: [
          { text: 'Plan first, don\'t write code yet', group: 0 },
          { text: 'Only change board/morning.py', group: 1 },
          { text: 'project.checkpoint() before each step', group: 2 },
          { text: 'Cross out the dashboard', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write your OWN message brief that handles quiet days. Checks: touches only board/message.py, and morning_message([]) says no deliveries are at risk',
        starter: START + 'project = Project()\nbrief = "Write morning_message."\nchange = PracticeAgent().run(brief, project)\n',
        solution: START + 'project = Project()\nbrief = "Write morning_message in board/message.py: takes the list of order ids and returns one line for Brian. If none are at risk, say so. Only change board/message.py. Done when all tests pass."\nchange = PracticeAgent().run(brief, project)\n',
        hint: 'Include "If none are at risk, say so." and "Only change board/message.py."',
        checks: [
          { message: 'Only board/message.py was touched', expr: 'change.files_touched == ["board/message.py"]' },
          { message: 'Quiet days say so', expr: 'project.load("board.message").morning_message([]) == "Good morning! No deliveries at risk today."' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the Chapter 3 fix.',
        pairs: [
          ['Six files at once', 'One step at a time'],
          ['A bad step 3', 'Restore the checkpoint'],
          ['An empty morning list', 'Rule before list'],
          ['A tired session', 'Start fresh'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Your step 2 touched report.py as well. What now?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'Fix report.py by hand and carry on.', why: 'Restore and re-brief is faster and certain.' },
          { text: 'Leave it; the list works.', why: 'Zanele\'s report is now broken.' },
          { text: 'Restore the checkpoint from before step 2, add "Only change board/morning.py." to the brief, and run it again.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this run breaks the chapter\'s rules?',
        language: 'python',
        lines: ['project.checkpoint("before list")', 'agent.run(list_brief + " " + message_brief, project)', 'print(run_tests(project))'],
        bug: 1,
        fix: 'Run the list brief, check it, checkpoint, then run the message brief.',
        explanation: 'Two steps in one run is a big change again.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'tasks = "- [x] rule\\n- [x] list\\n- [ ] message"\nprint(tasks.count("[x]"), "of", tasks.count("- ["))',
        language: 'python',
        options: [
          { text: '2 of 3' },
          { text: '3 of 3', why: 'Only two are ticked.' },
          { text: '1 of 3', why: 'rule and list are ticked.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter in one line.',
        template: 'Plan first, then one small [[1]] at a time, with a [[2]] before each.',
        blanks: [['step'], ['checkpoint']],
        distractors: ['file', 'meeting'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the whole chapter\'s way of working.',
        lines: ['Explore the project', 'Ask for a plan, no code', 'Cut the plan to what\'s needed', 'Checkpoint, then one small step', 'Check it and tick it', 'Stop to show people'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What phrase asks an agent for a plan without code? (Plan first, don\'t write ... yet)',
        answers: ['code'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'You built the board in small, checked steps. How would you use the same method for a big task in your own life?',
    starters: ['I\'d split it into...', 'My checkpoint would be...'],
  },
  notes: 'Chapter 3 challenge. Whole-board plan minus dashboard/config/report = rule, list, message. Learner-written briefs checked by behaviour: list touches only morning.py, ran tests, oldest-first ids; message touches only message.py, empty case "Good morning! No deliveries at risk today."',
};

export default lesson;
