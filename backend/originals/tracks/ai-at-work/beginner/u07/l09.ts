import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 9 — checking AI's maths. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Checking AI\'s maths',
  summary: 'AI is brilliant at explaining maths and surprisingly shaky at doing it. Sort the myths from the facts, and learn three quick checks.',
  minutes: 12,
  outcomes: [
    'Know where AI maths goes wrong',
    'Use three quick checks on any number',
    'Prefer formulas over answers',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Because AI runs on computers, its arithmetic is always exact.',
          isFact: false,
          explain: 'Chat models predict text; they don\'t always calculate. They can slip on long sums, percentages and rounding.',
        },
        {
          text: 'Some AI tools can run calculations in code, which is more reliable than guessing.',
          isFact: true,
          explain: 'When a tool shows it ran code or a calculation, results are usually more reliable, but still check the inputs it used.',
        },
        {
          text: 'A quick estimate in your head can catch big AI maths errors.',
          isFact: true,
          explain: '50 shops x about 12 payments x about 100 GHS is about 60,000. If the AI says 6,000,000, something\'s wrong.',
        },
        {
          text: 'If the AI shows its working, the answer must be right.',
          isFact: false,
          explain: 'Working helps you check, but a step can still be wrong. Check the steps.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Three checks: estimate in your head, recalculate in the spreadsheet, and check the inputs. Prefer a formula to an answer.',
    },
  ],
  apply: {
    scenario: 'The AI gave Ada some numbers. She checks them.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'AI arithmetic is always exact', group: 0 },
          { text: 'A head estimate catches big errors', group: 1 },
          { text: 'Shown working means it\'s right', group: 0 },
          { text: 'Running code is more reliable than guessing', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rough estimate: 50 shops x 12 payments x 100 GHS. About how much?',
        answers: ['60000', '60,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'The AI says the pilot processed 6,000,000 GHS. Ada\'s estimate is about 60,000. What now?',
        options: [
          { text: 'Trust the AI', why: 'The estimate says it\'s far too high.' },
          { text: 'Recalculate in the spreadsheet; the AI is likely off by a factor of 100' },
          { text: 'Average the two', why: 'Recalculate exactly.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the three checks.',
        lines: ['Estimate in your head', 'Recalculate in the spreadsheet', 'Check the inputs'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is safest?',
        options: [
          { text: 'What\'s the average payment?', why: 'You\'d still need to check its maths.' },
          { text: 'Give me the spreadsheet formula for the average payment amount, so I can calculate it myself.' },
          { text: 'Round it to look nice.', why: 'Not about accuracy.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI says average payment is 127.4 GHS. Can I quote it?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, it\'s precise.', why: 'Precise isn\'t the same as correct.' },
          { text: 'Never quote averages.', why: 'Just check it.' },
          { text: 'Let me check it with a formula in the sheet first. Two minutes.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Prefer a [[1]] to an [[2]].',
        blanks: [['formula'], ['answer']],
        distractors: ['guess', 'emoji'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in the AI\'s working is wrong?',
        lines: [
          'Payments: 600 in week 4',
          'Average amount: 100 GHS',
          'Total: 600 x 100 = 6,000 GHS',
          'So week 4 processed 60,000 GHS',
        ],
        bug: 2,
        fix: 'Total: 600 x 100 = 60,000 GHS',
        explanation: '600 x 100 is 60,000, not 6,000. The last line happens to be right, but the step isn\'t.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to what it catches.',
        pairs: [
          ['Head estimate', 'Answers off by 10x or 100x'],
          ['Spreadsheet recalculation', 'Small arithmetic slips'],
          ['Checking inputs', 'The wrong numbers used'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s rule.',
        tiles: ['Estimate,', 'recalculate,', 'check', 'inputs'],
        distractors: ['trust'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Check carefully, or low risk?',
        groups: ['Check carefully', 'Low risk'],
        items: [
          { text: 'A total for Carmen\'s deck', group: 0 },
          { text: 'An explanation of what a median is', group: 1 },
          { text: 'A percentage change for the board', group: 0 },
          { text: 'Ideas for chart titles', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why check the inputs, even when the maths is right?',
        options: [
          { text: 'Correct maths on the wrong numbers is still wrong' },
          { text: 'Inputs are always wrong', why: 'Sometimes; that\'s why you check.' },
          { text: 'No need', why: 'Wrong inputs give wrong answers.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'When did you last use a number from AI? Would a head estimate have caught a mistake?',
    starters: ['The number:', 'My estimate:'],
  },
  deepen: { title: 'Try it today', summary: 'Before trusting any AI number, do a 10-second head estimate. Note if it matches.' },
  notes: 'Language models are known to make arithmetic errors; tools that execute code reduce but don\'t remove the need to check inputs. Figures fictional.',
};

export default lesson;
