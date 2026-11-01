import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1 — Why vague briefs fail: the second brief, still one gap short. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests\n\nproject = Project()\n';
const MED = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Only change board/rules.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Why vague briefs fail',
  summary: 'Monday. Remi writes a second brief with Zanele\'s rule in it. Much better: the agent stays in one file and reports honestly. And 6 of 7 tests still fail, because of one thing he didn\'t write down.',
  minutes: 11,
  outcomes: [
    'See how one missing detail breaks a whole change',
    'Read an honest failure report from the agent',
    'Know that every gap in a brief becomes a guess',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Nearly',
      beats: [
        { speaker: 'narrator', text: 'Remi\'s new brief has the rule (Friday from 2 p.m., Saturday, over 150 km), says which file to change, and says when it\'s done.' },
        { speaker: 'narrator', text: 'The agent replies: "1 of 7 tests pass. These still fail: ... I did not change the tests."' },
        { speaker: 'remi', text: 'At least it\'s honest this time. But the rule is right there! Why is everything failing?' },
        { speaker: 'felix', text: 'Run one yourself and read the error.' },
        { speaker: 'narrator', text: 'ValueError: time data \'2026-03-06 15:00\' does not match format \'%d/%m/%Y %H:%M\'.' },
        { speaker: 'tey', text: 'It guessed the dates look like 06/03/2026. Nobody told it otherwise. One missing example, six failing tests. Every gap in a brief becomes a guess, and guesses compound.' },
      ],
      choice: {
        prompt: 'What should Remi add to the brief?',
        options: [
          { text: 'An example of a real date from the data: 2026-03-06 15:00.', outcome: 'Right. One example removes the guess completely. Lesson 4 is all about this.', best: true },
          { text: '"Use the right date format."', outcome: 'Which one? "Right" means nothing to someone who hasn\'t seen the data.' },
          { text: 'Nothing: tell the agent to try harder.', outcome: 'It will guess the same way again. The gap is in the brief.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'The second brief',
      caption: 'Rule, file and finish line, but no example date.',
      code: START + `\nbrief = ${JSON.stringify(MED)}\nchange = PracticeAgent().run(brief, project)\nprint(change.message[:60], "...")\nrules = project.load("board.rules")\ntry:\n    rules.is_at_risk({"placed_at": "2026-03-06 15:00", "distance_km": "20"})\nexcept ValueError as e:\n    print("ValueError:", e)\n`,
      challenge: 'Add "Dates look like 2026-03-06 15:00." to the brief and run it again.',
    },
  ],
  apply: {
    scenario: 'One gap, six failures.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the second brief and print how many tests really pass',
        starter: START + `brief = ${JSON.stringify(MED)}\n`,
        solution: START + `brief = ${JSON.stringify(MED)}\nPracticeAgent().run(brief, project)\nprint(len(run_tests(project).passed))\n`,
        hint: 'len(run_tests(project).passed)',
        checks: [{ message: 'Print 1', outputEquals: '1' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did 6 tests fail when the rule was in the brief?',
        options: [
          { text: 'The rule was wrong', why: 'The rule was right; the code crashed before using it.' },
          { text: 'The agent guessed the wrong date format, so every date failed to read' },
          { text: 'The tests are broken', why: 'The tests use real dates like 2026-03-06 15:00.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Was it in Remi\'s second brief, or missing?',
        groups: ['In the brief', 'Missing'],
        items: [
          { text: 'Friday from 2 p.m.', group: 0 },
          { text: 'What a date looks like', group: 1 },
          { text: 'Only change board/rules.py', group: 0 },
          { text: 'Done when all tests pass', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the brief to its result.',
        pairs: [
          ['"make the delivery thing"', 'A weather dashboard'],
          ['Rule but no date example', '1 of 7 tests pass'],
          ['Rule and a date example', 'All 7 tests pass'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'I gave it the whole rule. How can one little thing break everything?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Bad luck; try again.', why: 'Same brief, same guess.' },
          { text: 'The agent is broken.', why: 'It did what the brief allowed: it guessed.' },
          { text: 'Every date goes through that one line. Get it wrong and every test that reads a date fails. Small gaps in a brief can be the biggest.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from datetime import datetime\nprint(datetime.strptime("2026-03-06 15:00", "%Y-%m-%d %H:%M").hour)',
        language: 'python',
        options: [
          { text: '15' },
          { text: '3', why: '%H is the 24-hour clock.' },
          { text: 'An error', why: 'The format matches the text exactly.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Read "2026-03-06 15:00" with the format "%Y-%m-%d %H:%M" and print the weekday number',
        starter: 'from datetime import datetime\n',
        solution: 'from datetime import datetime\nprint(datetime.strptime("2026-03-06 15:00", "%Y-%m-%d %H:%M").weekday())\n',
        hint: 'datetime.strptime(text, format).weekday()',
        checks: [{ message: 'Print 4 (Friday)', outputEquals: '4' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule of briefs.',
        template: 'Every [[1]] in a brief becomes a [[2]].',
        blanks: [['gap'], ['guess']],
        distractors: ['test', 'file'],
      },
      {
        kind: 'findBug',
        prompt: 'In the agent\'s rules.py, which line causes the ValueError?',
        language: 'python',
        lines: ['def is_at_risk(delivery):', '    placed = datetime.strptime(delivery["placed_at"], "%d/%m/%Y %H:%M")', '    if placed.weekday() == 4 and placed.hour >= 14:', '        return True'],
        bug: 1,
        fix: '    placed = datetime.strptime(delivery["placed_at"], "%Y-%m-%d %H:%M")',
        explanation: 'The data says 2026-03-06 15:00: year first, with dashes.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What kind of error did the guessed date format cause?',
        answers: ['ValueError'],
        placeholder: 'An error name',
      },
    ],
  },
  reflect: {
    prompt: 'Think of instructions you followed that left out one "obvious" detail. What went wrong?',
    starters: ['The instructions said...', 'They left out...'],
  },
  deepen: {
    title: 'Why agents guess',
    summary: 'An agent is built to finish the task. When something is missing, finishing with a guess looks more helpful than stopping, unless you ask it to ask (lesson 8).',
  },
  notes: 'Practice agent, brief with rule + scope + done-when but no example date: guesses %d/%m/%Y %H:%M; run_tests 1 passed (test_report), 6 failed; message "1 of 7 tests pass. These still fail: ... I did not change the tests." Error: ValueError: time data \'2026-03-06 15:00\' does not match format \'%d/%m/%Y %H:%M\'.',
};

export default lesson;
