import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 19 — Brief v1. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\n';
const V1 =
  'Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late. ' +
  'Input: one delivery with placed_at and distance_km, both text. Output: True or False. ' +
  'At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. If the distance is blank, flag it. ' +
  'Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Brief v1',
  summary: 'Friday. Remi writes Brief v1: goal, inputs and outputs, Zanele\'s exact rule, the blank-distance edge, a real date, one file, a finish line. He saves it in the project so it isn\'t lost.',
  minutes: 13,
  outcomes: [
    'Write a complete brief with all five parts and an edge case',
    'Check every part works with the agent',
    'Save the brief in the project',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Brief v1',
      beats: [
        { speaker: 'narrator', text: 'Remi reads his brief aloud to Zanele, one line at a time.' },
        { speaker: 'zanele', text: 'Yes. Yes. Blank distance flagged: yes. That\'s exactly what I meant.' },
        { speaker: 'narrator', text: 'He runs it on a fresh project. One file changed. 7 of 7 tests pass. The blank-distance delivery is flagged.' },
        { speaker: 'felix', text: 'Now save it. Put it in the project as BRIEF.md. Next week someone will ask why the rule is 150 km, and the answer will be right there.' },
        { speaker: 'remi', text: 'A week ago I wrote "make the delivery thing".' },
        { speaker: 'tey', text: 'And this week, a stranger could build the Delivery Board from your brief. Next: making the agent work in small steps, so you can check each one.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Run Brief v1',
      caption: 'Every part of the chapter, in one brief.',
      code: START + `\nbrief = ${JSON.stringify(V1)}\nchange = PracticeAgent().run(brief, project)\nprint(change.message, "|", change.files_touched)\nrules = project.load("board.rules")\nprint("Blank distance:", rules.is_at_risk({"placed_at": "2026-03-04 10:00", "distance_km": ""}))\nproject.write("BRIEF.md", brief)\nprint(project.ls())\n`,
      challenge: 'How many words is Brief v1? Is any of it not needed?',
    },
  ],
  apply: {
    scenario: 'Brief v1.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Write Brief v1: the agent must pass all 7 tests, touch only board/rules.py, run the tests, and flag blank distances',
        starter: START + 'brief = "Write is_at_risk in board/rules.py."\nchange = PracticeAgent().run(brief, project)\nrules = project.load("board.rules")\n',
        solution: START + `brief = ${JSON.stringify(V1)}\nchange = PracticeAgent().run(brief, project)\nrules = project.load("board.rules")\n`,
        hint: 'Goal, rule, "If the distance is blank, flag it.", a real date, "Only change board/rules.py.", "Done when all tests pass."',
        checks: [
          { message: 'All 7 tests pass', expr: 'run_tests(project).ok' },
          { message: 'Only board/rules.py was touched', expr: 'change.files_touched == ["board/rules.py"]' },
          { message: 'The agent ran the tests', expr: 'change.ran_tests' },
          { message: 'A blank distance is flagged', expr: 'rules.is_at_risk({"placed_at": "2026-03-04 10:00", "distance_km": ""}) is True' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why save the brief as BRIEF.md in the project?',
        options: [
          { text: 'So the reasons and rules stay with the code for the next person or session' },
          { text: 'The agent needs it to run', why: 'It reads the brief you send; the file is for the future.' },
          { text: 'To make the project bigger', why: 'It\'s about keeping knowledge.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of Brief v1 to its line.',
        pairs: [
          ['Goal', 'Write is_at_risk in board/rules.py'],
          ['Edge case', 'If the distance is blank, flag it'],
          ['Example', 'Dates look like 2026-03-06 15:00'],
          ['Finish line', 'Done when all tests pass'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Run Brief v1, save it as BRIEF.md in the project, and print how many files the project has',
        starter: START + `brief = ${JSON.stringify(V1)}\nPracticeAgent().run(brief, project)\n`,
        solution: START + `brief = ${JSON.stringify(V1)}\nPracticeAgent().run(brief, project)\nproject.write("BRIEF.md", brief)\nprint(len(project.ls()))\n`,
        hint: 'project.write("BRIEF.md", brief), then len(project.ls())',
        checks: [{ message: 'Print 10', outputEquals: '10' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter-2 lesson does this line of Brief v1 come from?',
        groups: ['Examples', 'Limits', 'Edge cases'],
        items: [
          { text: 'Dates look like 2026-03-06 15:00', group: 0 },
          { text: 'Only change board/rules.py', group: 1 },
          { text: 'If the distance is blank, flag it', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'If I change the rule to 140 km next month, what do you do?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'Update BRIEF.md and the test for 150, run the agent with the new brief, and check the tests and your sample list again.' },
          { text: 'Just tell the agent "use 140" in chat.', why: 'Then the saved brief and tests are out of date.' },
          { text: 'Change the number in the code by hand and tell no one.', why: 'The brief and tests would disagree with the code.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The project has 9 files and doesn\'t have BRIEF.md yet. What does this print?',
        code: 'project.write("BRIEF.md", "Write is_at_risk...")\nprint("BRIEF.md" in project.ls())',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: 'write() adds the file to the project.' },
          { text: '10', why: 'It prints True or False.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Save the brief.',
        language: 'python',
        template: 'project.[[1]]("[[2]].md", brief)',
        blanks: [['write'], ['BRIEF']],
        distractors: ['read', 'README'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Brief v1 would break it?',
        lines: [
          'Write is_at_risk in board/rules.py.',
          'At risk: Friday from 2 p.m., Saturday, or over 150 km. If the distance is blank, flag it.',
          'Dates are in the format we agreed.',
          'Only change board/rules.py. Done when all tests pass.',
        ],
        bug: 2,
        fix: 'Dates look like 2026-03-06 15:00.',
        explanation: '"The format we agreed" fails the stranger test and brings back the guess.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What file name does Felix suggest for saving the brief?',
        answers: ['BRIEF.md', 'brief.md', 'BRIEF'],
        placeholder: 'A file name',
      },
    ],
  },
  reflect: {
    prompt: 'Compare "make the delivery thing" with Brief v1. Which change made the biggest difference, in your view?',
    starters: ['The biggest difference was...', 'Because...'],
  },
  deepen: {
    title: 'Briefs as documentation',
    summary: 'A saved brief explains why the code is the way it is. Chapter 7 grows this into a project instruction file that every agent session reads first.',
  },
  notes: 'Practice agent with Brief v1 (goal, inputs/outputs, rule, blank-distance rule, example date, scope, done-when): 7 passed, touches only board/rules.py, ran_tests True, blank distance flagged True. After project.write("BRIEF.md", ...) the project has 10 files.',
};

export default lesson;
