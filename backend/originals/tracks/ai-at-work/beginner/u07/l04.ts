import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 4 — cleaning messy data. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Cleaning messy data',
  summary: 'The Makola total was low because the data is messy: "Makola", "makola", "Makola Mkt". Clean data gives true answers. AI shows you how.',
  minutes: 13,
  outcomes: [
    'Spot the common kinds of messy data',
    'Ask AI for cleaning steps or formulas',
    'Keep the original data untouched',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Five rows, before and after cleaning',
      before: {
        label: 'Messy',
        text: 'Market: "Makola", "makola ", "Makola Mkt", "MAKOLA"\nDate: "03/09/2024", "2024-09-03", "3 Sept"\nAmount: "120", "GHS 80", blank\nOne payment appears twice.',
      },
      after: {
        label: 'Clean',
        text: 'Market: "Makola" for all four.\nDate: one format, 2024-09-03.\nAmount: numbers only (120, 80); the blank one flagged to check.\nDuplicate removed, and noted.',
      },
      notes: [
        'Spelling and spaces split one market into four.',
        'Mixed date formats break filters and charts.',
        'Never quietly delete: flag blanks, note removed duplicates, keep the original copy.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Copy the original first. Then ask AI: "List the problems in these sample rows and give me steps or formulas to fix each."',
    },
  ],
  apply: {
    scenario: 'Ada cleans the pilot data at 10pm.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Messy, or clean?',
        groups: ['Messy', 'Clean'],
        items: [
          { text: '"makola " with a trailing space', group: 0 },
          { text: '"Makola"', group: 1 },
          { text: '"GHS 80" in a number column', group: 0 },
          { text: '80', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should Ada do before cleaning?',
        options: [
          { text: 'Keep a copy of the original data' },
          { text: 'Delete the duplicates', why: 'Copy first, so nothing is lost.' },
          { text: 'Email it to everyone', why: 'Copy first.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is most helpful?',
        options: [
          { text: 'Clean my data.', why: 'It can\'t see the sheet; no detail.' },
          { text: 'Here are 10 sample rows (no personal data). List every kind of mess you see, and give me a spreadsheet formula or step to fix each one.' },
          { text: 'Delete the bad rows.', why: 'Deleting loses information.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mess to the fix.',
        pairs: [
          ['Different spellings', 'Standardise to one name'],
          ['Extra spaces', 'TRIM the text'],
          ['Mixed date formats', 'Convert to one format'],
          ['Duplicate rows', 'Remove, and note how many'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Why did the Makola total change from 41,000 to 58,000 GHS?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'The market name was spelled four ways, so many rows weren\'t counted. I standardised it; the original data is saved if you want to check.' },
          { text: 'The AI changed it.', why: 'Explain the cleaning.' },
          { text: 'No idea.', why: 'She knows why.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: '[[1]] the original first. Never quietly [[2]]: flag and note.',
        blanks: [['Copy'], ['delete']],
        distractors: ['Ignore', 'celebrate'],
      },
      {
        kind: 'findBug',
        prompt: 'Which cleaning step is risky?',
        lines: [
          'Save a copy of the original',
          'Standardise "Makola" spellings',
          'Delete any row with a blank amount, without noting it',
          'Convert dates to one format',
        ],
        bug: 2,
        fix: 'Flag blank amounts and check them with Tolu.',
        explanation: 'Silent deletion can hide real problems.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many ways was "Makola" spelled in the messy data?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s first cleaning step.',
        tiles: ['Save', 'a', 'copy', 'of', 'the', 'original'],
        distractors: ['delete'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the cleaning.',
        lines: ['Copy the original', 'Ask AI to list the mess', 'Fix each kind', 'Flag what you can\'t fix', 'Note what you changed'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fix it, or flag it?',
        groups: ['Fix it', 'Flag it'],
        items: [
          { text: '"MAKOLA" in capitals', group: 0 },
          { text: 'A blank amount', group: 1 },
          { text: 'An extra space', group: 0 },
          { text: 'A payment of 900,000 GHS from a small stall', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the total rise after cleaning?',
        options: [
          { text: 'Rows with other spellings weren\'t being counted before' },
          { text: 'The AI added money', why: 'Cleaning just counted all the rows.' },
          { text: 'A mistake', why: 'It\'s the correct total now.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a spreadsheet you rely on. What kind of mess might be hiding in it?',
    starters: ['The sheet:', 'Possible mess:'],
  },
  deepen: { title: 'Try it today', summary: 'Paste 10 anonymised rows from a real sheet and ask AI to list every kind of mess.' },
  notes: 'TRIM removes extra spaces in Excel and Google Sheets. Figures fictional.',
};

export default lesson;
