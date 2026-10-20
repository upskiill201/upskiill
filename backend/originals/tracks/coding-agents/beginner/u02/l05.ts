import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: gaps become guesses, goals, inputs and outputs, examples. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests, read_brief\n\n';

const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: what and how',
  summary: 'Gaps become guesses, the goal goes in one sentence, inputs and outputs get named, and a real example beats any description. Quick check before the limits.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write the first half of a brief without notes', 'Check what the agent picked up'],
  learn: [
    {
      kind: 'story',
      title: 'Half a brief',
      beats: [
        { speaker: 'narrator', text: 'Remi\'s brief now has a goal, inputs and outputs, the rule and a real date.' },
        { speaker: 'felix', text: 'Good. That\'s what to do. Now tell it what NOT to do.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: what and how.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print whether read_brief finds an example date in "Dates look like 2026-03-07 10:00."',
        starter: START,
        solution: START + 'print(read_brief("Dates look like 2026-03-07 10:00.")["example_date"])\n',
        hint: 'read_brief("...")["example_date"]',
        checks: [{ message: 'Print True', outputEquals: 'True' }],
      },
      {
        kind: 'mcq',
        prompt: 'What happens to every gap in a brief?',
        options: [
          { text: 'The agent fills it with a guess' },
          { text: 'The agent stops and asks', why: 'Only if you tell it to ask (lesson 8).' },
          { text: 'Nothing; gaps are ignored', why: 'They become guesses in the code.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Run the brief below and print the number of passing tests',
        starter: START + 'project = Project()\nbrief = "Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass."\n',
        solution: START + 'project = Project()\nbrief = "Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass."\nPracticeAgent().run(brief, project)\nprint(len(run_tests(project).passed))\n',
        hint: 'len(run_tests(project).passed)',
        checks: [{ message: 'Print 7', outputEquals: '7' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Goal, input/output, or example?',
        groups: ['Goal', 'Input/output', 'Example'],
        items: [
          { text: 'Write is_at_risk in board/rules.py', group: 0 },
          { text: 'Takes one delivery; returns True or False', group: 1 },
          { text: 'Dates look like 2026-03-06 15:00', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['One missing example', 'Six failing tests'],
          ['"Improve the board"', 'A wish, not a goal'],
          ['distance_km', 'Arrives as text'],
          ['A real date', 'Beats a description'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this brief is still vague?',
        lines: [
          'Write is_at_risk in board/rules.py.',
          'Input: one delivery with placed_at and distance_km. Output: True or False.',
          'At risk: Friday afternoons, weekends and long routes.',
          'Dates look like 2026-03-06 15:00.',
        ],
        bug: 2,
        fix: 'At risk: Friday from 2 p.m., Saturday, or a route over 150 km.',
        explanation: '"Afternoons", "weekends" and "long" all need exact values.',
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Why do you keep asking me for exact times and numbers?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'Because anything I leave vague, the agent guesses. Your "afternoon" became "all day" last time.' },
          { text: 'The agent likes numbers.', why: 'It\'s about removing guesses.' },
          { text: 'No reason.', why: 'Every exact value removes a guess.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from datetime import datetime\nprint(datetime.strptime("2026-03-07 10:00", "%Y-%m-%d %H:%M").weekday())',
        language: 'python',
        options: [
          { text: '5' },
          { text: '6', why: 'Monday is 0, so Saturday is 5.' },
          { text: '7', why: 'Weekdays go from 0 to 6.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What to put first.',
        template: 'Start with the [[1]] in one sentence, then the [[2]] and outputs.',
        blanks: [['goal'], ['inputs']],
        distractors: ['tests', 'weather'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the first half of a brief.',
        lines: ['Goal in one sentence', 'Inputs and outputs', 'The rule, with exact values', 'A real example'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'With no example, the agent guessed the date ... wrong. Which word fills the gap?',
        answers: ['format', 'date format'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Look back at your one-sentence goal from lesson 2. What inputs, outputs and examples would you add?',
    starters: ['Inputs:...', 'An example:...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4. Full brief -> 7 passed; 2026-03-07 is Saturday (weekday 5).',
};

export default lesson;
