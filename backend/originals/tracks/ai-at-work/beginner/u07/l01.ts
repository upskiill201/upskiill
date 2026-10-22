import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 1 — AI as your spreadsheet helper. Story: 3,000 rows. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'AI as your spreadsheet helper',
  summary: '3,000 rows of pilot payments, and a meeting at nine. Ada isn\'t a numbers person. AI won\'t do the maths for her, but it will teach her how, fast.',
  minutes: 12,
  outcomes: [
    'Know what AI is good and bad at with spreadsheets',
    'Describe your data to AI without pasting everything',
    'Let the spreadsheet calculate, and AI explain',
  ],
  learn: [
    {
      kind: 'story',
      title: '3,000 rows',
      beats: [
        { speaker: 'narrator', text: 'Month 5. 9pm. The pilot spreadsheet: 3,000 payments from 50 shops, five columns, and a 9am meeting with Carmen.' },
        { speaker: 'ada', text: 'I\'ll paste it all into the AI and ask for the total.' },
        { speaker: 'tey', text: 'Careful. AIs can be shaky at adding thousands of numbers, and that sheet has shop phone numbers in it.' },
        { speaker: 'ada', text: 'So what do I paste?' },
        { speaker: 'tey', text: 'The column names and five sample rows, with phone numbers removed. Ask for the formula. Then the spreadsheet does the maths, exactly.' },
      ],
      choice: {
        prompt: 'What\'s the best way to get the total?',
        options: [
          { text: 'Ask AI for the formula, then let the spreadsheet calculate', outcome: 'Yes. The spreadsheet is exact; the AI explains how.', best: true },
          { text: 'Paste all 3,000 rows and ask the AI to add them up', outcome: 'Risky maths and private data in the chat.' },
          { text: 'Add them up with a calculator, one by one', outcome: 'Exact, but she\'d still be there at 9am.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Describe the data (column names plus a few sample rows, no personal details) and ask AI for the formula. Let the spreadsheet do the maths.',
    },
  ],
  apply: {
    scenario: 'Ada opens the pilot spreadsheet at 9pm.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Good job for the AI, or for the spreadsheet?',
        groups: ['AI', 'Spreadsheet'],
        items: [
          { text: 'Explaining what a formula does', group: 0 },
          { text: 'Adding up 3,000 amounts exactly', group: 1 },
          { text: 'Suggesting which chart to use', group: 0 },
          { text: 'Counting rows that match a rule', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why not paste all 3,000 rows into the AI?',
        options: [
          { text: 'AI can\'t read numbers', why: 'It can; the risks are accuracy and privacy.' },
          { text: 'Its arithmetic can be unreliable, and the sheet has personal data' },
          { text: 'It\'s against the law', why: 'It\'s about accuracy and privacy.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is best?',
        options: [
          { text: 'Here are 3,000 rows. What\'s the total?', why: 'Risky maths and data.' },
          { text: 'My sheet has columns Date, Shop ID, Amount (GHS), Method, Status. Here are 5 sample rows. Write a formula for the total of Amount where Status is "completed".' },
          { text: 'Analyse my data.', why: 'No description of the data or goal.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which column must Ada remove before pasting samples?',
        lines: ['Date', 'Shop ID', 'Owner phone number', 'Amount (GHS)'],
        bug: 2,
        fix: 'Delete it from the sample, or replace with "XXX".',
        explanation: 'Phone numbers are personal data.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can you just send me what the AI says the total is?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Sure, the AI added it up.', why: 'AI arithmetic can be wrong.' },
          { text: 'I can\'t do totals.', why: 'A formula can.' },
          { text: 'I\'ll send the total from the spreadsheet itself, using a formula the AI helped me write. That way it\'s exact.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'AI [[1]] how. The spreadsheet does the [[2]].',
        blanks: [['explains'], ['maths', 'math']],
        distractors: ['hides', 'guessing'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many rows are in the pilot spreadsheet?',
        answers: ['3000', '3,000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what to paste to why.',
        pairs: [
          ['Column names', 'So AI knows the structure'],
          ['5 sample rows', 'So AI sees the format'],
          ['Your goal', 'So AI writes the right formula'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s request.',
        tiles: ['Write', 'a', 'formula', 'for', 'the', 'total'],
        distractors: ['guess'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s approach.',
        lines: ['Remove personal columns from the sample', 'Describe columns and goal', 'Ask for the formula', 'Run it in the spreadsheet'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to paste into AI, or not?',
        groups: ['Safe', 'Not safe'],
        items: [
          { text: 'Column names', group: 0 },
          { text: 'Shop owners\' phone numbers', group: 1 },
          { text: 'A made-up sample row', group: 0 },
          { text: 'Owners\' full names and ID numbers', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does a formula give you that an AI answer doesn\'t?',
        options: [
          { text: 'An exact result that updates when the data changes' },
          { text: 'A nicer explanation', why: 'AI explains; formulas calculate.' },
          { text: 'Nothing', why: 'Exact, repeatable results.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What spreadsheet task do you avoid? How would you describe it to AI without pasting private data?',
    starters: ['The task:', 'I\'d describe it as...'],
  },
  deepen: { title: 'Try it today', summary: 'Describe a sheet you use (column names + goal) to AI and ask for one formula. Run it.' },
  notes: 'Language models can make arithmetic errors on long lists; spreadsheet formulas compute exactly. Data fictional; GHS = Ghanaian cedi.',
};

export default lesson;
