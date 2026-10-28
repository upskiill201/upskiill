import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 12 — Running the project yourself. */

const GOOD = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';
const START = `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run(${JSON.stringify(GOOD)}, project)\nrules = project.load("board.rules")\ndata = project.load("board.data")\n`;

const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Run it yourself',
  summary: 'The tests pass with Felix\'s brief. Zanele isn\'t convinced: "Show me which of my deliveries it flags." Remi runs the rule on the real sample, and checks the list with her.',
  minutes: 12,
  outcomes: [
    'Load and call the project\'s own code',
    'Run the agent\'s rule on real sample data',
    'Check the result with the person who knows the data',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Show me',
      beats: [
        { speaker: 'remi', text: 'All 7 tests pass.' },
        { speaker: 'zanele', text: 'Tests are your examples. Show me MY deliveries. Which ones does it flag?' },
        { speaker: 'narrator', text: 'Remi loads the sample data and runs is_at_risk on every delivery. Six of twelve come back flagged.' },
        { speaker: 'zanele', text: 'D-1008: Friday at exactly 2 p.m. Yes, that one waits all weekend. D-1007, Friday morning, 140 km: no, that goes out the same day. Good.' },
        { speaker: 'felix', text: 'That\'s the step most people skip. Tests passing means it does what the tests say. Running it on real data with Zanele means it does what she means.' },
      ],
      choice: {
        prompt: 'The tests pass. What should Remi do next?',
        options: [
          { text: 'Run the rule on the real sample and check the list with Zanele.', outcome: 'Right. She spots in seconds whether the flags make sense.', best: true },
          { text: 'Ship it: the tests pass.', outcome: 'The tests only cover six examples. Real data has cases nobody wrote a test for.' },
          { text: 'Ask the agent whether the list looks right.', outcome: 'The agent doesn\'t know Synergix\'s deliveries. Zanele does.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Flag the sample deliveries',
      caption: 'The agent\'s rule, on Zanele\'s data.',
      code: START + '\nrows = data.load_deliveries()\nfor row in rows:\n    if rules.is_at_risk(row):\n        print(row["order_id"], row["placed_at"], row["city"], row["distance_km"], "km")\n',
      challenge: 'Print the deliveries that are NOT at risk instead.',
    },
  ],
  apply: {
    scenario: 'Seeing it work on real data.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many of the 12 sample deliveries the rule flags',
        starter: START + 'rows = data.load_deliveries()\n',
        solution: START + 'rows = data.load_deliveries()\nprint(len([row for row in rows if rules.is_at_risk(row)]))\n',
        hint: 'len([row for row in rows if rules.is_at_risk(row)])',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why run the rule on real data when the tests already pass?',
        options: [
          { text: 'Tests are usually wrong', why: 'They\'re useful, just limited to the cases written.' },
          { text: 'Tests check a few examples; real data shows whether it does what Zanele means' },
          { text: 'To make it faster', why: 'It\'s about correctness, not speed.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the order_id of every flagged delivery, as a list',
        starter: START + 'rows = data.load_deliveries()\n',
        solution: START + 'rows = data.load_deliveries()\nprint([row["order_id"] for row in rows if rules.is_at_risk(row)])\n',
        hint: '[row["order_id"] for row in rows if rules.is_at_risk(row)]',
        checks: [{ message: "Print ['D-1002', 'D-1004', 'D-1008', 'D-1009', 'D-1010', 'D-1011']", outputEquals: "['D-1002', 'D-1004', 'D-1008', 'D-1009', 'D-1010', 'D-1011']" }],
      },
      {
        kind: 'sortGroups',
        prompt: 'With the rule (Friday from 2 p.m., Saturday, or over 150 km), flagged or not?',
        groups: ['Flagged', 'Not flagged'],
        items: [
          { text: 'D-1008: Friday 14:00, 10 km', group: 0 },
          { text: 'D-1007: Friday 11:10, 140 km', group: 1 },
          { text: 'D-1002: Monday 16:40, 160 km', group: 0 },
          { text: 'D-1012: Monday 09:00, 11 km', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the delivery to why it\'s flagged.',
        pairs: [
          ['D-1004', 'A 480 km route'],
          ['D-1009', 'Friday at 17:45'],
          ['D-1010', 'Placed on Saturday'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'D-1007 is Friday morning, 140 km. Why isn\'t it flagged?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'The agent decided.', why: 'Remi should explain the rule and check it with her.' },
          { text: 'It must be a bug.', why: 'It matches the rule as written.' },
          { text: 'It\'s before 2 p.m. and under 150 km, so by your rule it goes out the same day. Is that right?' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(float("140") > 150)',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: '140 is less than 150.' },
          { text: '140.0', why: 'It prints the comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Load the project\'s code.',
        language: 'python',
        template: 'rules = project.[[1]]("board.rules")\nprint(rules.[[2]](row))',
        blanks: [['load'], ['is_at_risk']],
        distractors: ['read', 'run'],
      },
      {
        kind: 'findBug',
        prompt: 'This counts every delivery, not the flagged ones. Which line?',
        language: 'python',
        lines: ['rows = data.load_deliveries()', 'flagged = [row for row in rows]', 'print(len(flagged))'],
        bug: 1,
        fix: 'flagged = [row for row in rows if rules.is_at_risk(row)]',
        explanation: 'Keep only rows the rule flags.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which order was placed on Friday at exactly 14:00?',
        answers: ['D-1008', 'd-1008', '1008'],
        placeholder: 'An order id',
      },
    ],
  },
  reflect: {
    prompt: 'Zanele checked the list in seconds because she knows the data. Who is "Zanele" for your own work?',
    starters: ['For my work, it\'s...', 'They\'d spot...'],
  },
  deepen: {
    title: 'Tests vs real data',
    summary: 'Tests are fixed examples. Real data keeps surprising you: blanks, odd formats, typos. Chapter 6 runs the board on Synergix\'s messy deliveries.csv.',
  },
  notes: 'Practice agent with the good brief; data/sample.csv flagged: D-1002 (Mon 16:40, 160 km), D-1004 (480 km), D-1008 (Fri 14:00), D-1009 (Fri 17:45, 155 km), D-1010 (Sat 10:00), D-1011 (Sat 15:30). Not flagged includes D-1007 (Fri 11:10, 140 km). 2026-03-06 is a Friday.',
};

export default lesson;
