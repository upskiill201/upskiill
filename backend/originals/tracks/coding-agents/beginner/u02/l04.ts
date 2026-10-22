import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4 — Examples beat descriptions. */

const START = 'from teyro_agent import Project, PracticeAgent, run_tests, read_brief\n\n';
const BASE = 'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. Only change board/rules.py. Done when all tests pass.';

const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Examples beat descriptions',
  summary: 'Remi tries describing the date format: "the usual format", "ISO-style", "year first". Then he just pastes one real date. Fact or myth: why one example beats a paragraph?',
  minutes: 12,
  outcomes: [
    'Know why a real example beats a description',
    'Add a real example to a brief',
    'See the agent\'s guess disappear',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: '"Dates are in the usual format" tells the agent enough.',
          isFact: false,
          explain: 'Myth. Usual for whom? 06/03/2026, 03/06/2026 and 2026-03-06 are all "usual" somewhere. The practice agent still guesses.',
        },
        {
          text: 'One real example from the data removes the guess.',
          isFact: true,
          explain: 'Fact. "Dates look like 2026-03-06 15:00" shows the order, the separators and the time in one go.',
        },
        {
          text: 'Examples should be made up to keep things simple.',
          isFact: false,
          explain: 'Myth. Copy real ones from the data. Made-up examples carry your assumptions; real ones carry the truth.',
        },
        {
          text: 'Examples of the output help as much as examples of the input.',
          isFact: true,
          explain: 'Fact. "2026-03-06 15:00, 20 km -> True" shows the rule working. Zanele\'s test names are exactly this.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Description vs example',
      caption: 'Three ways to say the date format.',
      code: START + `base = ${JSON.stringify(BASE)}\n` + 'for extra in ["Dates are in the usual format.", "Dates are year first.", "Dates look like 2026-03-06 15:00."]:\n    project = Project()\n    PracticeAgent().run(base + " " + extra, project)\n    print(read_brief(base + " " + extra)["example_date"], run_tests(project).total - len(run_tests(project).failed), "of 7 pass |", extra)\n',
      challenge: 'Try "Dates look like 2026-03-07 10:00." Does any real date work?',
    },
  ],
  apply: {
    scenario: 'Show, don\'t describe.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add a real example date to the brief so all 7 tests pass, then print the test results',
        starter: START + 'project = Project()\n' + `brief = ${JSON.stringify(BASE)} + " Dates are in the usual format."\nPracticeAgent().run(brief, project)\nprint(run_tests(project))\n`,
        solution: START + 'project = Project()\n' + `brief = ${JSON.stringify(BASE)} + " Dates look like 2026-03-06 15:00."\nPracticeAgent().run(brief, project)\nprint(run_tests(project))\n`,
        hint: '"Dates look like 2026-03-06 15:00."',
        checks: [{ message: 'Print 7 passed', outputEquals: '7 passed' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "the usual format" fail?',
        options: [
          { text: 'The agent can\'t read the word "usual"', why: 'It reads it; it just doesn\'t say which format.' },
          { text: 'Different places use different "usual" formats, so it still has to guess' },
          { text: 'It\'s too short', why: 'A short example works; the problem is vagueness.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Example or description?',
        groups: ['Example', 'Description'],
        items: [
          { text: 'Dates look like 2026-03-06 15:00', group: 0 },
          { text: 'Dates are in the normal format', group: 1 },
          { text: '2026-03-06 15:00, 20 km -> True', group: 0 },
          { text: 'Long routes count', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the date to where it\'s "usual".',
        pairs: [
          ['06/03/2026', 'Day first, as in Kenya and the UK'],
          ['03/06/2026', 'Month first, as in the US'],
          ['2026-03-06', 'Year first, as in the data'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'I\'ll explain the format properly: four-digit year, dash, two-digit month...',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Yes, the longer the better.', why: 'One example is clearer and shorter.' },
          { text: 'Leave the format out.', why: 'Then it guesses, as in lesson 1.' },
          { text: 'Or paste one real date. "2026-03-06 15:00" says all of that, and can\'t be misread.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_agent import read_brief\nprint(read_brief("Dates look like 2026-03-06 15:00.")["example_date"])',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: 'The brief contains a real example date.' },
          { text: '2026-03-06 15:00', why: 'It says whether an example was found.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print whether read_brief finds an example date in "Dates are year first."',
        starter: START,
        solution: START + 'print(read_brief("Dates are year first.")["example_date"])\n',
        hint: 'read_brief("...")["example_date"]',
        checks: [{ message: 'Print False', outputEquals: 'False' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The example.',
        template: 'Dates look like [[1]]-03-06 [[2]]:00.',
        blanks: [['2026'], ['15']],
        distractors: ['06', '3'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this brief is a description that should be an example?',
        lines: [
          'Write is_at_risk in board/rules.py.',
          'At risk: Friday from 2 p.m., Saturday, or over 150 km.',
          'Dates are written the normal way.',
          'Only change board/rules.py. Done when all tests pass.',
        ],
        bug: 2,
        fix: 'Dates look like 2026-03-06 15:00.',
        explanation: '"The normal way" is a description; a real date is an example.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Where should examples in a brief come from: made up, or the real data?',
        answers: ['real data', 'the real data', 'real', 'the data', 'data'],
        placeholder: 'Two words',
      },
    ],
  },
  reflect: {
    prompt: 'When someone explains something to you, does an example or a description help more? Give one time an example saved you.',
    starters: ['An example helped when...', 'The description alone...'],
  },
  deepen: {
    title: 'Few-shot prompting',
    summary: 'Giving an AI a few examples of what you want is called few-shot prompting. It works for agents, chatbots and almost every AI tool.',
  },
  notes: 'Practice agent: "Dates are in the usual format." and "Dates are year first." -> example_date False, guessed format, 1 of 7 pass. "Dates look like 2026-03-06 15:00." -> example_date True, 7 passed. Date order conventions: day-first (Kenya, UK), month-first (US), ISO 8601 year-first.',
};

export default lesson;
