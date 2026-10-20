import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3 — Inputs and outputs. */

const GOOD = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';
const START = `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run(${JSON.stringify(GOOD)}, project)\nrules = project.load("board.rules")\n`;

const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Inputs and outputs',
  summary: 'Felix asks two questions about is_at_risk: what goes in, and what comes out? Remi realises he never said. The agent got lucky because the tests told it.',
  minutes: 12,
  outcomes: [
    'Describe a function by what goes in and what comes out',
    'Call is_at_risk with a delivery yourself',
    'Write inputs and outputs into a brief',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'What goes in, what comes out',
      text: 'is_at_risk takes one delivery: a dictionary with placed_at, like "2026-03-06 15:00", and distance_km, like "20". It returns True or False, nothing else. Distances arrive as text, not numbers, because they come from a CSV file. A brief that says this leaves nothing to guess.',
      hotspots: [
        { phrase: 'one delivery', note: 'One at a time, not the whole list. Another brief might want a list in and a list out; say which.' },
        { phrase: 'a dictionary with placed_at', note: 'The exact key names matter. "placed", "date" or "time" would all be wrong guesses.' },
        { phrase: 'True or False, nothing else', note: 'Not "yes", not a score, not a message. The board needs a simple flag.' },
        { phrase: 'arrive as text, not numbers', note: 'CSV files give you text. The code must turn "180" into 180 before comparing it with 150.' },
        { phrase: 'leaves nothing to guess', note: 'This time the agent got it right because the tests showed it. Don\'t rely on luck.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Call it yourself',
      caption: 'One delivery in, True or False out.',
      code: START + '\nprint(rules.is_at_risk({"placed_at": "2026-03-06 15:00", "distance_km": "20"}))\nprint(rules.is_at_risk({"placed_at": "2026-03-02 09:00", "distance_km": "20"}))\nprint(type(rules.is_at_risk({"placed_at": "2026-03-04 10:00", "distance_km": "180"})))\n',
      challenge: 'Try a delivery on Saturday 2026-03-07.',
    },
  ],
  apply: {
    scenario: 'In and out.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Call is_at_risk for a Wednesday delivery ("2026-03-04 10:00") of 180 km and print the result',
        starter: START,
        solution: START + 'print(rules.is_at_risk({"placed_at": "2026-03-04 10:00", "distance_km": "180"}))\n',
        hint: 'rules.is_at_risk({"placed_at": "...", "distance_km": "180"})',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does distance_km arrive as text like "180"?',
        options: [
          { text: 'It comes from a CSV file, and CSV values are read as text' },
          { text: 'Someone typed it wrong', why: 'Every CSV value starts as text.' },
          { text: 'Python stores all numbers as text', why: 'It doesn\'t; CSV reading gives text.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the brief to what it says.',
        pairs: [
          ['Input', 'One delivery dictionary'],
          ['Keys', 'placed_at and distance_km'],
          ['Output', 'True or False'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Input or output of is_at_risk?',
        groups: ['Input', 'Output'],
        items: [
          { text: '{"placed_at": "2026-03-06 15:00", "distance_km": "20"}', group: 0 },
          { text: 'True', group: 1 },
          { text: 'distance_km as text', group: 0 },
          { text: 'False', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'The agent figured out the inputs from the tests. So I don\'t need to write them?',
        prompt: "Felix's best reply?",
        options: [
          { text: 'This time the tests showed it. Next time there might be no tests for that part. Write it down; it costs one line.' },
          { text: 'Right, never write inputs.', why: 'You\'re relying on luck.' },
          { text: 'Inputs don\'t matter.', why: 'Wrong key names break everything.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("180" > "150", float("180") > 150)',
        language: 'python',
        options: [
          { text: 'True True' },
          { text: 'True False', why: '180.0 is more than 150.' },
          { text: 'An error', why: 'Comparing two strings works (letter by letter); float() turns text into a number.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the type name of what is_at_risk returns (use type(...).__name__)',
        starter: START + 'result = rules.is_at_risk({"placed_at": "2026-03-02 09:00", "distance_km": "20"})\n',
        solution: START + 'result = rules.is_at_risk({"placed_at": "2026-03-02 09:00", "distance_km": "20"})\nprint(type(result).__name__)\n',
        hint: 'type(result).__name__',
        checks: [{ message: 'Print bool', outputEquals: 'bool' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Inputs and outputs, in the brief.',
        template: 'Input: one delivery with placed_at and [[1]]. Output: [[2]] or False.',
        blanks: [['distance_km'], ['True']],
        distractors: ['driver', 'None'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the brief names a key that doesn\'t exist?',
        lines: [
          'Input: one delivery dictionary.',
          'It has "placed" (when it was ordered) and "distance_km".',
          'Output: True if at risk, otherwise False.',
          'Distances arrive as text.',
        ],
        bug: 1,
        fix: 'It has "placed_at" and "distance_km".',
        explanation: 'The data uses placed_at. A wrong key name means a KeyError.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What type does is_at_risk return? (one word)',
        answers: ['bool', 'boolean', 'Boolean'],
        placeholder: 'A type',
      },
    ],
  },
  reflect: {
    prompt: 'Describe something you do at work or school as "what goes in" and "what comes out".',
    starters: ['What goes in:...', 'What comes out:...'],
  },
  deepen: {
    title: 'Function signatures',
    summary: 'Programmers write inputs and outputs as a signature, like is_at_risk(delivery: dict) -> bool. Putting one in a brief is a precise, short way to say both.',
  },
  notes: 'Good-brief rules.py: is_at_risk(dict) -> bool. Wednesday 2026-03-04 10:00 at 180 km -> True. CSV values are read as str by csv.DictReader.',
};

export default lesson;
