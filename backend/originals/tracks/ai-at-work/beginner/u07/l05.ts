import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 5 — Checkpoint 1. Helper, formulas, words to formulas, cleaning. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: formulas and clean data',
  summary: 'AI as a helper, formulas explained, formulas from words, and clean data. Show you can get exact numbers out of a messy sheet.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can get and check formulas with AI', 'Show you can clean data safely'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 7, first Checkpoint. 10pm, still eleven hours until the meeting.', replies: ['Ready'] },
        { tey: 'Warm-up: who adds up 3,000 rows, the AI or the spreadsheet?', replies: ['The spreadsheet'] },
        { tey: 'AI explains, spreadsheet calculates. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: 10pm, the night before.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'AI or spreadsheet?',
        groups: ['AI', 'Spreadsheet'],
        items: [
          { text: 'Explain a formula', group: 0 },
          { text: 'Add 3,000 amounts', group: 1 },
          { text: 'Suggest cleaning steps', group: 0 },
          { text: 'Count matching rows', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the function to its job.',
        pairs: [
          ['SUM', 'Adds a range'],
          ['COUNTIF', 'Counts matching rows'],
          ['SUMIF', 'Adds matching rows'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rows: 100 completed, 40 failed, 60 completed. SUMIF for "completed"?',
        answers: ['160'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which formula request is best?',
        options: [
          { text: 'Formula for Makola?', why: 'Missing tool, columns, conditions.' },
          { text: 'In Excel, columns A Date, C Amount, D Market, E Status. Formula for total C where D is "Makola" and E is "completed". Explain each part.' },
          { text: 'Add it all up for me.', why: 'Use a formula.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which column must not be pasted into the AI?',
        lines: ['Date', 'Amount', 'Owner ID number', 'Status'],
        bug: 2,
        fix: 'Remove it or replace with "XXX".',
        explanation: 'ID numbers are personal data.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the cleaning.',
        lines: ['Copy the original', 'List the mess', 'Fix each kind', 'Flag what you can\'t fix', 'Note changes'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mess to the fix.',
        pairs: [
          ['"makola "', 'TRIM and standardise'],
          ['"GHS 80" as text', 'Convert to a number'],
          ['Duplicate payment', 'Remove and note'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The formula says 0 for Makola. Is the pilot dead?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'No: probably a spelling mismatch in the Market column. I\'m standardising it and will recheck.' },
          { text: 'Yes, zero sales.', why: 'Check the data first.' },
          { text: 'The formula is broken forever.', why: 'Likely a text mismatch.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'AI [[1]], the spreadsheet calculates. [[2]] the original first.',
        blanks: [['explains'], ['Copy']],
        distractors: ['guesses', 'Delete'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the explain request.',
        tiles: ['Explain', 'this', 'formula', 'piece', 'by', 'piece'],
        distractors: ['fast'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fix it or flag it?',
        groups: ['Fix', 'Flag'],
        items: [
          { text: 'Capital letters in market name', group: 0 },
          { text: 'A blank amount', group: 1 },
          { text: 'Mixed date formats', group: 0 },
          { text: 'A suspiciously huge payment', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which explanation of =COUNTIF(E:E,"failed") is wrong?',
        lines: ['Looks at column E', 'Finds "failed"', 'Adds the amounts', 'Returns how many failed'],
        bug: 2,
        fix: 'Counts the rows',
        explanation: 'COUNTIF counts, it doesn\'t add.',
      },
      {
        kind: 'mcq',
        prompt: 'How should Ada check a new formula?',
        options: [
          { text: 'Compare it with a few rows she checked by hand' },
          { text: 'Ask the AI if it\'s right', why: 'Test it against real rows.' },
          { text: 'Trust it if it looks complex', why: 'Complex isn\'t correct.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which function removes extra spaces from text? (one word)',
        answers: ['TRIM', 'trim'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which of these four skills will save you the most time with spreadsheets?',
    starters: ['The skill:', 'Because...'],
  },
  notes: 'Checkpoint for Unit 7 lessons 1-4.',
};

export default lesson;
