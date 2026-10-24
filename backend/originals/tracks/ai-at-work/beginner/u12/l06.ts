import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 12 · Lesson 6 — AI for writing vs AI for numbers. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'AI for writing vs AI for numbers',
  summary: 'The same chat tool that writes a beautiful email can fumble a sum. Ada learns why, and which tools to reach for when numbers matter.',
  minutes: 12,
  outcomes: [
    'Know why chat AI is stronger with words than numbers',
    'Use tools that calculate for numeric work',
    'Combine the two safely',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Words and numbers',
      html:
        '<p>Chat assistants are <strong>language models</strong>: they predict words. That makes them excellent at drafting, rewriting, summarising and explaining.</p>' +
        '<p>With numbers, predicting the next likely digit isn\'t the same as calculating. Long sums, percentages and rounding can go wrong.</p>' +
        '<h3>What to use for numbers</h3>' +
        '<ul>' +
        '<li><strong>Your spreadsheet</strong>, with formulas the AI helps you write (Unit 7).</li>' +
        '<li><strong>AI features that run code or calculations</strong>: some assistants show that they ran a calculation or a small program. Those results are usually more reliable, but check the inputs.</li>' +
        '<li><strong>The source system</strong>, like your payments dashboard, for official figures.</li>' +
        '</ul>' +
        '<p>The combination works best: <em>numbers from tools that calculate, words from the AI.</em></p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Words from the AI; numbers from tools that calculate: spreadsheets, code-running features, source systems.',
    },
  ],
  apply: {
    scenario: 'Ada splits a report into words and numbers.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Best from chat AI, or from a tool that calculates?',
        groups: ['Chat AI', 'Calculating tool'],
        items: [
          { text: 'Rewriting a paragraph more simply', group: 0 },
          { text: 'Total payments this month', group: 1 },
          { text: 'Explaining what a trend means', group: 0 },
          { text: 'Percentage change in failures', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can chat AI fumble sums?',
        options: [
          { text: 'It hates maths', why: 'It predicts rather than computes.' },
          { text: 'It predicts likely text; that isn\'t the same as calculating' },
          { text: 'It never fumbles', why: 'It can.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request combines both safely?',
        options: [
          { text: 'Work out last month\'s totals and write the report.', why: 'Its maths needs checking.' },
          { text: 'Here are the totals from our dashboard. Write a three-sentence summary for Carmen. Don\'t change any numbers.' },
          { text: 'Guess the totals and write it nicely.', why: 'Never guess.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI said our campaign reached 1.2 million people. Our dashboard says 120,000.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Use the bigger one.', why: 'The source is the dashboard.' },
          { text: 'Average them.', why: 'Use the source.' },
          { text: 'Trust the dashboard: it\'s the source. Use the AI for the words around the number, not the number itself.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: '[[1]] from the AI; numbers from tools that [[2]].',
        blanks: [['Words'], ['calculate']],
        distractors: ['Numbers', 'guess'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the need to the tool.',
        pairs: [
          ['Official pilot figures', 'The payments dashboard'],
          ['A formula', 'Spreadsheet, with AI help'],
          ['A clear summary paragraph', 'Chat AI'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Ada\'s report process is risky?',
        lines: [
          'Pull totals from the dashboard',
          'Calculate changes in the spreadsheet',
          'Let the chat AI recalculate everything "to double-check"',
          'AI writes the summary around the numbers',
        ],
        bug: 2,
        fix: 'Double-check in the spreadsheet or source system.',
        explanation: 'Chat AI isn\'t the right checker for arithmetic.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the instruction Ada adds.',
        tiles: ['Don\'t', 'change', 'any', 'numbers'],
        distractors: ['round'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does the dashboard say the campaign reached?',
        answers: ['120000', '120,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'An assistant shows it ran a calculation. Is Ada done checking?',
        options: [
          { text: 'Not quite; check it used the right input numbers' },
          { text: 'Yes, always right', why: 'Inputs can be wrong.' },
          { text: 'Never trust it', why: 'More reliable; check inputs.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Source of truth, or not?',
        groups: ['Source of truth', 'Not'],
        items: [
          { text: 'The payments dashboard', group: 0 },
          { text: 'A number an AI chat wrote', group: 1 },
          { text: 'The signed contract', group: 0 },
          { text: 'A remembered figure from last week', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s report process.',
        lines: ['Pull figures from the source', 'Calculate in the spreadsheet', 'AI writes the words', 'Check no numbers changed'],
      },
    ],
  },
  reflect: {
    prompt: 'Where do the numbers in your reports come from? Which ones came from an AI chat?',
    starters: ['My numbers come from...', 'From AI:'],
  },
  deepen: { title: 'Try it today', summary: 'In your next report, mark every number with its source. Replace any that came from a chat.' },
  notes: 'Some assistants include code execution or calculators; capabilities vary.',
};

export default lesson;
