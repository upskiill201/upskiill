import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: the stranger test, exact rules, edge cases, length. */

const GOOD = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: exact and short',
  summary: 'Written for a stranger, fuzzy words made exact, edges answered, and nothing extra. Quick check before Remi looks back at the guess that started all this.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Make a brief exact, complete and short without notes', 'Test the edges yourself'],
  learn: [
    {
      kind: 'story',
      title: 'Red pen',
      beats: [
        { speaker: 'narrator', text: 'Felix prints Remi\'s page-long brief and crosses out three paragraphs. One sentence gets added: "If the distance is blank, flag it."' },
        { speaker: 'felix', text: 'Shorter and more complete. That\'s the job.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: exact and short.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Run the good brief and print whether a Wednesday route of exactly 150 km is at risk',
        starter: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run(${JSON.stringify(GOOD)}, project)\nrules = project.load("board.rules")\n`,
        solution: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run(${JSON.stringify(GOOD)}, project)\nrules = project.load("board.rules")\nprint(rules.is_at_risk({"placed_at": "2026-03-04 10:00", "distance_km": "150"}))\n`,
        hint: 'rules.is_at_risk({"placed_at": "2026-03-04 10:00", "distance_km": "150"})',
        checks: [{ message: 'Print False', outputEquals: 'False' }],
      },
      {
        kind: 'mcq',
        prompt: '"Do it like last time" fails which test?',
        options: [
          { text: 'The stranger test' },
          { text: 'The unit tests', why: 'It fails before any code: a stranger can\'t act on it.' },
          { text: 'None, it\'s clear', why: 'The agent wasn\'t there last time.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Exact or fuzzy?',
        groups: ['Exact', 'Fuzzy'],
        items: [
          { text: 'Over 150 km', group: 0 },
          { text: 'Friday afternoons', group: 1 },
          { text: 'If the distance is blank, flag it', group: 0 },
          { text: 'Handle blanks sensibly', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the warning words found in "Handle blanks the usual way, like we said."',
        starter: 'brief = "Handle blanks the usual way, like we said."\nwarning_words = ["usual", "normal", "obvious", "thing", "stuff", "like we said", "as before"]\n',
        solution: 'brief = "Handle blanks the usual way, like we said."\nwarning_words = ["usual", "normal", "obvious", "thing", "stuff", "like we said", "as before"]\nprint([w for w in warning_words if w in brief.lower()])\n',
        hint: '[w for w in warning_words if w in brief.lower()]',
        checks: [{ message: "Print ['usual', 'like we said']", outputEquals: "['usual', 'like we said']" }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['"Like we said"', 'Fails the stranger test'],
          ['"Exactly what?"', 'Turns words into rules'],
          ['14:00 and 13:59', 'Edge cases'],
          ['A page of history', 'Buries the rule'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this brief contradicts another?',
        lines: [
          'Only change board/rules.py.',
          'If the distance is blank, flag it.',
          'Also rename the report function to something nicer.',
          'Done when all tests pass.',
        ],
        bug: 2,
        fix: 'Delete it; the report isn\'t part of this task.',
        explanation: 'It contradicts "Only change board/rules.py."',
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'What happens with my blank-distance rows now?',
        prompt: "Remi's best reply?",
        options: [
          { text: 'They\'re flagged at risk, so someone checks them, as you asked. Before, one blank row crashed the whole list.' },
          { text: 'They\'re skipped.', why: 'Zanele asked for them to be flagged.' },
          { text: 'No idea.', why: 'He tested it in lesson 13.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(len("Only change board/rules.py. Done when all tests pass.".split()))',
        language: 'python',
        options: [
          { text: '8' },
          { text: '9', why: 'board/rules.py. is one word (no spaces).' },
          { text: '2', why: 'split() splits on spaces, not sentences.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Edges.',
        template: '"Over 150 km" means 150 itself is [[1]] at risk; "from 2 p.m." means 14:00 [[2]].',
        blanks: [['not'], ['counts']],
        distractors: ['always', 'never'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Remi improves a draft brief.',
        lines: ['Apply the stranger test', 'Make every fuzzy word exact', 'Answer the edge cases', 'Cut what the agent doesn\'t need'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On which day does Synergix take no orders?',
        answers: ['Sunday', 'sunday', 'Sundays'],
        placeholder: 'A day',
      },
    ],
  },
  reflect: {
    prompt: 'Which is harder for you: adding what\'s missing, or cutting what isn\'t needed? Why?',
    starters: ['It\'s harder to...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 11-14. Good brief: 150 km exactly -> False. "Only change board/rules.py. Done when all tests pass." = 8 words.',
};

export default lesson;
