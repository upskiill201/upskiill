import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 17 — Common brief mistakes. */

const START = 'from teyro_agent import read_brief\n\n';

const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common brief mistakes',
  summary: 'Felix keeps a list of the brief mistakes he sees most, and the one-line fix for each. Remi has made all of them this week.',
  minutes: 11,
  outcomes: [
    'Name the most common brief mistakes',
    'Fix each with one line',
    'Use read_brief() to check a brief\'s parts',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Mistake vs fix',
      before: {
        label: 'Mistake',
        text: 'A wish instead of a goal ("improve it").\nDescriptions instead of examples.\nNo limits.\nA vague finish line ("works well").\nFuzzy words ("far", "afternoon").\nWords that need you to have been there.\nA page of background.',
      },
      after: {
        label: 'Fix',
        text: 'Name what to build, where.\nPaste a real example.\n"Only change ..."\n"Done when all tests pass."\nExact values: 150 km, 14:00.\nWrite for a stranger.\nCut to what the agent needs.',
      },
      notes: [
        'Most bad briefs have two or three of these at once.',
        'A quick check: does it have a goal, an example, limits and a finish line? read_brief() tells you what the practice agent found.',
        'Real agents don\'t have read_brief(). Asking "any questions first?" is the real-world version.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Check the parts',
      caption: 'Which of the key parts did the agent find?',
      code: START + 'parts = ["example_date", "scope", "done_when"]\nbrief = "Write is_at_risk. Dates are normal. Make it work well."\nfound = read_brief(brief)\nfor part in parts:\n    print(part, found[part])\n',
      challenge: 'Fix the brief so all three are True.',
    },
  ],
  apply: {
    scenario: 'Spotting the usual mistakes.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the parts (from example_date, scope, done_when) that read_brief does NOT find in the brief below, as a list',
        starter: START + 'parts = ["example_date", "scope", "done_when"]\nbrief = "Write is_at_risk. Dates are normal. Make it work well."\nfound = read_brief(brief)\n',
        solution: START + 'parts = ["example_date", "scope", "done_when"]\nbrief = "Write is_at_risk. Dates are normal. Make it work well."\nfound = read_brief(brief)\nprint([part for part in parts if not found[part]])\n',
        hint: '[part for part in parts if not found[part]]',
        checks: [{ message: "Print ['example_date', 'scope', 'done_when']", outputEquals: "['example_date', 'scope', 'done_when']" }],
      },
      {
        kind: 'mcq',
        prompt: 'What is the real-world version of read_brief()?',
        options: [
          { text: 'Asking the agent "any questions first?"' },
          { text: 'Running the tests', why: 'That checks the code, not the brief.' },
          { text: 'Writing a longer brief', why: 'Length doesn\'t show gaps.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its fix.',
        pairs: [
          ['"Improve it"', 'Name what to build'],
          ['"The normal format"', 'Paste a real example'],
          ['"Works well"', 'Done when all tests pass'],
          ['"Far away"', 'Over 150 km'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the brief so example_date, scope and done_when are all True, then print the missing parts (should be [])',
        starter: START + 'parts = ["example_date", "scope", "done_when"]\nbrief = "Write is_at_risk. Dates are normal. Make it work well."\nfound = read_brief(brief)\nprint([part for part in parts if not found[part]])\n',
        solution: START + 'parts = ["example_date", "scope", "done_when"]\nbrief = "Write is_at_risk. Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass."\nfound = read_brief(brief)\nprint([part for part in parts if not found[part]])\n',
        hint: 'Add a real date, "Only change board/rules.py." and "Done when all tests pass."',
        checks: [{ message: 'Print []', outputEquals: '[]' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which mistake is it?',
        groups: ['No example', 'No limits', 'Vague finish'],
        items: [
          { text: 'Dates are in the standard format.', group: 0 },
          { text: 'Change whatever you need.', group: 1 },
          { text: 'Make it good.', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'I\'ve made every one of these mistakes this week.',
        prompt: "Felix's best reply?",
        options: [
          { text: 'Good, now you know them. Keep the list next to you, and check every brief against it before you send.' },
          { text: 'That\'s bad.', why: 'Mistakes in week one are how you learn.' },
          { text: 'Stop using the agent.', why: 'The fix is better briefs, not no agent.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_agent import read_brief\nprint(read_brief("Change whatever you need.")["scope"])',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: 'There\'s no "Only change ..." limit.' },
          { text: 'whatever', why: 'It prints True or False.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The quick check.',
        template: 'A goal, an [[1]], limits and a [[2]] line.',
        blanks: [['example'], ['finish']],
        distractors: ['opinion', 'long'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this brief is the mistake?',
        lines: [
          'Write is_at_risk in board/rules.py.',
          'At risk: Friday from 2 p.m., Saturday, or over 150 km.',
          'Dates look like 2026-03-06 15:00.',
          'Change anything you think needs it.',
        ],
        bug: 3,
        fix: 'Only change board/rules.py.',
        explanation: 'An open invitation is the opposite of a limit.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which read_brief key shows whether the brief has an example date?',
        answers: ['example_date'],
        placeholder: 'A key',
      },
    ],
  },
  reflect: {
    prompt: 'Which mistake on the list surprised you most? Why?',
    starters: ['I was surprised by...', 'Because I thought...'],
  },
  deepen: {
    title: 'Brief templates',
    summary: 'Many teams keep a brief template with headings: Goal, Inputs, Outputs, Examples, Limits, Done when. Filling in the blanks beats starting from nothing.',
  },
  notes: 'read_brief("Write is_at_risk. Dates are normal. Make it work well.") -> example_date, scope, done_when all False. read_brief("Change whatever you need.") scope False.',
};

export default lesson;
