import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 13 — Edge cases in the brief. */

const GOOD = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';
const START = `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run(${JSON.stringify(GOOD)}, project)\nrules = project.load("board.rules")\n`;

const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Edge cases',
  summary: 'All 7 tests pass. Felix tries four deliveries the tests never mention: 13:59 on Friday, 14:00 exactly, 150 km exactly, and a blank distance. One of them crashes the board.',
  minutes: 12,
  outcomes: [
    'Find the edge cases a rule leaves open',
    'Test them against the agent\'s code',
    'Answer them in the brief',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'At the edges',
      text: 'Friday at 13:59 is fine and 14:00 is at risk: "from 2 p.m." includes 14:00. A route of exactly 150 km is fine, because the rule says over 150. Those match what Zanele meant. But a delivery with a blank distance crashes the code, and the brief never said what to do. Zanele\'s answer: if the distance is blank, flag it, so someone checks.',
      hotspots: [
        { phrase: '13:59 is fine and 14:00 is at risk', note: '"From 2 p.m." means 14:00 counts. "After 2 p.m." might not. The words at the edge matter.' },
        { phrase: 'exactly 150 km is fine', note: '"Over 150" means 150 itself isn\'t at risk. If Zanele wanted 150 included, the brief would say "150 km or more".' },
        { phrase: 'crashes the code', note: 'float("") raises ValueError: could not convert string to float. One blank row and the whole morning list fails.' },
        { phrase: 'the brief never said', note: 'Edge cases nobody mentions become guesses, or crashes.' },
        { phrase: 'if the distance is blank, flag it', note: 'One sentence in the brief. The practice agent then writes code that handles blanks.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Try the edges',
      caption: 'The agent\'s code from the full brief.',
      code: START + '\nfor placed, km in [("2026-03-06 13:59", "20"), ("2026-03-06 14:00", "20"), ("2026-03-04 10:00", "150")]:\n    print(placed, km, "->", rules.is_at_risk({"placed_at": placed, "distance_km": km}))\ntry:\n    rules.is_at_risk({"placed_at": "2026-03-04 10:00", "distance_km": ""})\nexcept ValueError as e:\n    print("blank ->", "ValueError:", e)\n',
      challenge: 'Try 150.5 km. At risk?',
    },
  ],
  apply: {
    scenario: 'What the tests never asked.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print whether a Friday order at exactly 14:00 (20 km) is at risk',
        starter: START,
        solution: START + 'print(rules.is_at_risk({"placed_at": "2026-03-06 14:00", "distance_km": "20"}))\n',
        hint: 'rules.is_at_risk({"placed_at": "2026-03-06 14:00", "distance_km": "20"})',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does a blank distance crash the code?',
        options: [
          { text: 'The date is wrong', why: 'The date reads fine; the distance line fails.' },
          { text: 'float("") can\'t turn empty text into a number' },
          { text: 'Blank rows are always deleted', why: 'They reach the code and crash it.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add Zanele\'s blank-distance rule to the brief, run it, and print is_at_risk for a blank distance',
        starter: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\n' + `brief = ${JSON.stringify(GOOD)}\n` + 'PracticeAgent().run(brief, project)\nrules = project.load("board.rules")\n',
        solution: 'from teyro_agent import Project, PracticeAgent\n\nproject = Project()\n' + `brief = ${JSON.stringify(GOOD)} + " If the distance is blank, flag it."\n` + 'PracticeAgent().run(brief, project)\nrules = project.load("board.rules")\nprint(rules.is_at_risk({"placed_at": "2026-03-04 10:00", "distance_km": ""}))\n',
        hint: 'Add " If the distance is blank, flag it." to the brief',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'With the rule (Friday from 14:00, Saturday, over 150 km), at risk or fine?',
        groups: ['At risk', 'Fine'],
        items: [
          { text: 'Friday 14:00, 20 km', group: 0 },
          { text: 'Friday 13:59, 20 km', group: 1 },
          { text: 'Wednesday, 150 km', group: 1 },
          { text: 'Wednesday, 150.5 km', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the brief\'s words to what they include.',
        pairs: [
          ['From 2 p.m.', '14:00 counts'],
          ['Over 150 km', '150 itself doesn\'t'],
          ['150 km or more', '150 itself counts'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'All 7 tests pass. Why look for more cases?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'You don\'t need to.', why: 'Edge cases are where real data breaks code.' },
          { text: 'Add a test for every number.', why: 'Test the edges, not every value.' },
          { text: 'The tests only ask 7 questions. Real data asks thousands. One blank distance and the whole morning list crashes.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'distance = "".strip()\nprint(not distance)',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: 'An empty string counts as False, so "not" makes it True.' },
          { text: 'An error', why: 'strip() on an empty string is fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The blank-distance sentence.',
        template: 'If the distance is [[1]], [[2]] it.',
        blanks: [['blank', 'missing', 'empty'], ['flag']],
        distractors: ['long', 'delete'],
      },
      {
        kind: 'findBug',
        prompt: 'With the full brief, which delivery crashes is_at_risk?',
        lines: [
          '{"placed_at": "2026-03-06 13:59", "distance_km": "20"}',
          '{"placed_at": "2026-03-04 10:00", "distance_km": "150"}',
          '{"placed_at": "2026-03-04 10:00", "distance_km": ""}',
          '{"placed_at": "2026-03-07 10:00", "distance_km": "9"}',
        ],
        bug: 2,
        fix: 'Add "If the distance is blank, flag it." to the brief.',
        explanation: 'float("") raises ValueError.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is a route of exactly 150 km at risk under "over 150 km"? (yes or no)',
        answers: ['no'],
        placeholder: 'yes or no',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a rule you follow ("before 5 p.m.", "under 18"). What happens exactly at the edge?',
    starters: ['The rule is...', 'At exactly the edge...'],
  },
  deepen: {
    title: 'Boundary testing',
    summary: 'Testers always check the values either side of a limit: 13:59 and 14:00, 150 and 150.5. Chapter 5 turns these edges into tests the agent has to pass.',
  },
  notes: 'Practice agent with the full brief: Fri 13:59 False, Fri 14:00 True, 150 km False, 150.5 True; blank distance -> ValueError: could not convert string to float: \'\'. With "If the distance is blank, flag it." the generated code returns True for blank distances.',
};

export default lesson;
