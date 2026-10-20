import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6 — Checkpoints: save before each step. */

const V1 = 'Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. If the distance is blank, flag it. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';
const MORNING = 'Write morning_list in board/morning.py: the order ids of deliveries at risk, oldest first. Only change board/morning.py. Done when all tests pass.';
const SLOPPY = 'Write morning_message in board/message.py.';
const START = `from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\nagent = PracticeAgent()\nagent.run(${JSON.stringify(V1)}, project)\nagent.run(${JSON.stringify(MORNING)}, project)\n`;

const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Checkpoints',
  summary: 'Steps 1 and 2 work. Remi rushes step 3 with a sloppy brief, and the agent breaks Zanele\'s report again. This time it doesn\'t matter: he saved a checkpoint first.',
  minutes: 12,
  outcomes: [
    'Save a checkpoint before each agent step',
    'Go back to it when a step goes wrong',
    'Know what real projects use for checkpoints',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>A <strong>checkpoint</strong> is a saved copy of every file at a moment you know is good. Before each agent step:</p><pre><code>project.checkpoint("after step 2")   # save\nagent.run(brief, project)            # the risky part\nproject.restore("after step 2")      # if it went wrong</code></pre><p>Restoring puts every file back exactly as it was: changed files reverted, new files removed. No untangling.</p><p>The rhythm becomes:</p><ol><li>Check the step works.</li><li>Save a checkpoint.</li><li>Brief the next step.</li><li>Good? Save again. Bad? Restore and rewrite the brief.</li></ol><p>In real projects the checkpoint is a <strong>git commit</strong>: a saved, named snapshot you can always return to. Many agents also have their own "undo" or checkpoint feature. Whichever you use, <strong>never start an agent step without a way back.</strong></p>',
    },
    {
      kind: 'tryIt',
      title: 'Save, break, restore',
      caption: 'Step 3 with a sloppy brief, then back.',
      code: START + `\nproject.checkpoint("after step 2")\nprint("Saved:", run_tests(project))\nchange = agent.run(${JSON.stringify(SLOPPY)}, project)\nprint("Sloppy step 3 touched:", change.files_touched, "|", run_tests(project))\nproject.restore("after step 2")\nprint("Restored:", run_tests(project), "|", "board/message.py" in project.ls())\n`,
      challenge: 'Now rerun step 3 with "Only change board/message.py." added.',
    },
  ],
  apply: {
    scenario: 'Always a way back.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Save a checkpoint, run the sloppy step 3, restore, and print the test results',
        starter: START + `sloppy = ${JSON.stringify(SLOPPY)}\n`,
        solution: START + `sloppy = ${JSON.stringify(SLOPPY)}\nproject.checkpoint("after step 2")\nagent.run(sloppy, project)\nproject.restore("after step 2")\nprint(run_tests(project))\n`,
        hint: 'checkpoint, run, restore, then print(run_tests(project))',
        checks: [{ message: 'Print 7 passed', outputEquals: '7 passed' }],
      },
      {
        kind: 'mcq',
        prompt: 'When should you save a checkpoint?',
        options: [
          { text: 'Right after you\'ve checked a step works, before the next one' },
          { text: 'Only at the end of the day', why: 'Then a bad step costs you the whole day.' },
          { text: 'Only when something breaks', why: 'By then it\'s too late to save the good state.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the sloppy step 3 (no checkpoint) and print how many tests fail',
        starter: START + `sloppy = ${JSON.stringify(SLOPPY)}\n`,
        solution: START + `sloppy = ${JSON.stringify(SLOPPY)}\nagent.run(sloppy, project)\nprint(len(run_tests(project).failed))\n`,
        hint: 'len(run_tests(project).failed)',
        checks: [{ message: 'Print 1 (Zanele\'s report test)', outputEquals: '1' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does restoring the checkpoint undo it?',
        groups: ['Undone', 'Not undone'],
        items: [
          { text: 'The edit to board/report.py', group: 0 },
          { text: 'The new file board/message.py', group: 0 },
          { text: 'A message you sent Brian about it', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the practice tool to the real one.',
        pairs: [
          ['project.checkpoint()', 'A git commit'],
          ['project.restore()', 'Going back to that commit'],
          ['A fresh Project()', 'A fresh clone of the repo'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'The agent broke the report again. I\'ll spend the afternoon fixing it.',
        prompt: "Felix's best reply?",
        options: [
          { text: 'You saved after step 2? Then restore it: one line, ten seconds. Fix the brief, not the mess.' },
          { text: 'Yes, fix it by hand.', why: 'Restoring is faster and certain.' },
          { text: 'Start the whole project again.', why: 'The checkpoint keeps steps 1 and 2.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The project has 10 files at the checkpoint. The agent creates board/message.py. Then you restore. What does this print?',
        code: 'print(len(project.ls()))',
        language: 'python',
        options: [
          { text: '10' },
          { text: '11', why: 'Restore removes files that weren\'t there at the checkpoint.' },
          { text: '9', why: 'board/morning.py was there at the checkpoint.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Save and go back.',
        language: 'python',
        template: 'project.[[1]]("after step 2")\nagent.run(brief, project)\nproject.[[2]]("after step 2")',
        blanks: [['checkpoint'], ['restore']],
        distractors: ['delete', 'read'],
      },
      {
        kind: 'findBug',
        prompt: 'In this routine, which line comes too late?',
        lines: ['agent.run(step3_brief, project)', 'project.checkpoint("after step 2")', 'print(run_tests(project))'],
        bug: 1,
        fix: 'Save the checkpoint BEFORE running step 3.',
        explanation: 'Saved after step 3, it keeps the broken state.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In real projects, what is a saved snapshot of the code called? (a git ...)',
        answers: ['commit', 'a commit', 'git commit'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Where do you already use "save points": in games, documents, phones? What would change if you used them at work?',
    starters: ['I already save...', 'At work I could...'],
  },
  deepen: {
    title: 'Agent checkpoints',
    summary: 'Several real agents keep their own checkpoints and let you rewind a session. Useful, but git commits are the checkpoint your whole team can see (Chapter 9).',
  },
  notes: 'Practice agent after Brief v1 + morning-list step: 10 files, 7 passed. Sloppy step 3 "Write morning_message in board/message.py." creates message.py and renames the report function (6 passed, 1 failed: tests/test_report.py). restore("after step 2") -> 7 passed, 10 files, no message.py.',
};

export default lesson;
