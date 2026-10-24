import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 20 — Chapter challenge: write a brief that can't be misread. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests, read_brief\n\n';
const MESSY = 'Flag the late ones the usual way. Don\'t mess up Zanele\'s stuff. Make it work well.';

const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter challenge: the brief',
  summary: 'Felix\'s challenge: "Here\'s a brief from someone who wasn\'t in any of our meetings. Fix it until the agent can\'t misread it, and prove it." Everything from Chapter 2, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Turn a messy brief into a complete one', 'Use everything from Chapter 2 together'],
  learn: [
    {
      kind: 'story',
      title: 'Fix it, prove it',
      beats: [
        { speaker: 'felix', text: '"Flag the late ones the usual way. Don\'t mess up Zanele\'s stuff. Make it work well." Fix it.' },
        { speaker: 'remi', text: 'Every sentence fails the stranger test. Give me five minutes.' },
        { speaker: 'tey', text: 'That\'s the chapter in one go. No hints you haven\'t already used.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: the brief.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the warning words found in the messy brief, as a list',
        starter: START + `brief = ${JSON.stringify(MESSY)}\nwarning_words = ["usual", "normal", "obvious", "thing", "stuff", "like we said", "as before"]\n`,
        solution: START + `brief = ${JSON.stringify(MESSY)}\nwarning_words = ["usual", "normal", "obvious", "thing", "stuff", "like we said", "as before"]\nprint([w for w in warning_words if w in brief.lower()])\n`,
        hint: '[w for w in warning_words if w in brief.lower()]',
        checks: [{ message: "Print ['usual', 'stuff']", outputEquals: "['usual', 'stuff']" }],
      },
      {
        kind: 'mcq',
        prompt: 'Which part is completely missing from the messy brief?',
        options: [
          { text: 'A goal of any kind', why: '"Flag the late ones" is a rough goal.' },
          { text: 'An example of the data' },
          { text: 'Any mention of Zanele', why: 'It mentions her stuff, vaguely.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the read_brief parts (example_date, time_rule, saturday, distance, scope, done_when) missing from the messy brief, as a list',
        starter: START + `brief = ${JSON.stringify(MESSY)}\nparts = ["example_date", "time_rule", "saturday", "distance", "scope", "done_when"]\nfound = read_brief(brief)\n`,
        solution: START + `brief = ${JSON.stringify(MESSY)}\nparts = ["example_date", "time_rule", "saturday", "distance", "scope", "done_when"]\nfound = read_brief(brief)\nprint([p for p in parts if not found[p]])\n`,
        hint: '[p for p in parts if not found[p]]',
        checks: [{ message: 'Print all six parts', outputEquals: "['example_date', 'time_rule', 'saturday', 'distance', 'scope', 'done_when']" }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which fix does each messy phrase need?',
        groups: ['Exact rule', 'Limit', 'Finish line'],
        items: [
          { text: 'the late ones the usual way', group: 0 },
          { text: 'Don\'t mess up Zanele\'s stuff', group: 1 },
          { text: 'Make it work well', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Rewrite the brief completely. It must pass all 7 tests, touch only board/rules.py, run the tests, flag blank distances, and contain no warning words',
        starter: START + `project = Project()\nbrief = ${JSON.stringify(MESSY)}\nchange = PracticeAgent().run(brief, project)\nrules = project.load("board.rules") if "board/rules.py" in change.files_touched else None\nwarning_words = ["usual", "normal", "obvious", "thing", "stuff", "like we said", "as before"]\n`,
        solution: START + 'project = Project()\nbrief = "Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. If the distance is blank, flag it. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass."\nchange = PracticeAgent().run(brief, project)\nrules = project.load("board.rules") if "board/rules.py" in change.files_touched else None\nwarning_words = ["usual", "normal", "obvious", "thing", "stuff", "like we said", "as before"]\n',
        hint: 'All five parts, the blank-distance rule, and no vague words',
        checks: [
          { message: 'All 7 tests pass', expr: 'run_tests(project).ok' },
          { message: 'Only board/rules.py was touched', expr: 'change.files_touched == ["board/rules.py"]' },
          { message: 'The agent ran the tests', expr: 'change.ran_tests' },
          { message: 'Blank distances are flagged', expr: 'rules is not None and rules.is_at_risk({"placed_at": "2026-03-04 10:00", "distance_km": ""}) is True' },
          { message: 'No warning words', expr: 'not [w for w in warning_words if w in brief.lower()]' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to what it adds to a brief.',
        pairs: [
          ['Goal in one sentence', 'What to build, where'],
          ['Examples', 'A real date'],
          ['Limits', 'Only change one file'],
          ['Edge cases', 'What to do with blanks'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Why does a brief need all that? Can\'t the agent work it out?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'Yes, it can work it out.', why: 'It guesses, and guesses look right.' },
          { text: 'Agents are useless without a page of text.', why: 'A complete, short brief is enough.' },
          { text: 'It works out a guess. A week ago that guess was a weather dashboard. Five minutes of brief saves an afternoon of checking.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s rewrite still fails the stranger test?',
        lines: [
          'Write is_at_risk in board/rules.py: True when a delivery is likely to arrive late.',
          'At risk: Friday from 2 p.m., Saturday, or over 150 km.',
          'Treat blank distances the way Zanele likes.',
          'Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.',
        ],
        bug: 2,
        fix: 'If the distance is blank, flag it.',
        explanation: '"The way Zanele likes" needs you to know Zanele.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_agent import read_brief\nf = read_brief("If the distance is blank, flag it.")\nprint(f["blank_distance"], f["distance"])',
        language: 'python',
        options: [
          { text: 'True False' },
          { text: 'True True', why: 'No "150" in this sentence, so distance is False.' },
          { text: 'False False', why: 'It mentions a blank distance.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter in one line.',
        template: 'Write for a [[1]]: goal, in/out, example, limits, [[2]] when.',
        blanks: [['stranger'], ['done']],
        distractors: ['friend', 'maybe'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the parts of Brief v1.',
        lines: ['Goal', 'Inputs and outputs', 'The exact rule and edge cases', 'A real example', 'Limits', 'Done when'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What one-word question turns a fuzzy phrase into an exact rule? ("... what?")',
        answers: ['Exactly', 'exactly'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'You can now write a brief a stranger can\'t misread. Where else, outside of agents, would that skill help you?',
    starters: ['It would help when...', 'For example...'],
  },
  notes: 'Chapter 2 challenge. Messy brief: warning words usual, stuff; read_brief finds none of example_date, time_rule, saturday, distance, scope, done_when (task at_risk via "late"). Rewritten brief passes 7 tests, touches only rules.py, flags blank distances.',
};

export default lesson;
