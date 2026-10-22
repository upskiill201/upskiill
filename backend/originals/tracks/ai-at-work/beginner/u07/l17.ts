import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 17 — common spreadsheet mistakes (with real cases). */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common spreadsheet mistakes',
  summary: 'Spreadsheet mistakes have changed government policy and lost thousands of health records. Tap the five most common ones, and how to catch them.',
  minutes: 12,
  outcomes: [
    'Recognise the most common spreadsheet errors',
    'Know two real cases where they mattered',
    'Use AI to review a sheet for mistakes',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Five common mistakes',
      text: 'A range that misses rows. A total typed in by hand. A file format that cuts off data. Text that looks like numbers. Copied formulas pointing at the wrong cells.',
      hotspots: [
        { phrase: 'A range that misses rows', note: 'In 2013, a student found that an influential economics paper (Reinhart and Rogoff) had left five countries out of an averaging range, which changed its results.' },
        { phrase: 'A total typed in by hand', note: 'It doesn\'t update when the data changes. Always use a formula.' },
        { phrase: 'A file format that cuts off data', note: 'In 2020, Public Health England missed nearly 16,000 COVID cases because an old Excel format holds only about 65,000 rows.' },
        { phrase: 'Text that looks like numbers', note: '"120 " with a space, or "GHS 80", is ignored by SUM. Totals come out low.' },
        { phrase: 'Copied formulas pointing at the wrong cells', note: 'Copying shifts cell references. Check a formula at the bottom of the column, not just the top.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Check ranges cover all rows, use formulas not typed totals, watch file limits and text-numbers, and check the last formula in a column.',
    },
  ],
  apply: {
    scenario: 'Ada reviews Tolu\'s pilot sheet for mistakes.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the real case to the mistake.',
        pairs: [
          ['Reinhart and Rogoff (2013)', 'A range that missed rows'],
          ['Public Health England (2020)', 'A file format that cut off data'],
          ['A low pilot total', 'Text that looks like numbers'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What went wrong at Public Health England in 2020?',
        options: [
          { text: 'A virus deleted the file', why: 'It was a format limit.' },
          { text: 'An old Excel format\'s row limit cut off nearly 16,000 cases' },
          { text: 'Someone typed the wrong total', why: 'It was a row limit.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which formula probably misses data? (data is in rows 2 to 3001)',
        lines: ['=SUM(C2:C3001)', '=COUNTIF(E2:E3001,"failed")', '=SUM(C2:C2500)', '=AVERAGE(C2:C3001)'],
        bug: 2,
        fix: '=SUM(C2:C3001)',
        explanation: 'It stops at row 2500, missing 501 rows.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Mistake, or good practice?',
        groups: ['Mistake', 'Good practice'],
        items: [
          { text: 'Typing the total as 58,000', group: 0 },
          { text: 'Using =SUM for the total', group: 1 },
          { text: '"GHS 80" in the Amount column', group: 0 },
          { text: 'Checking the last formula in a column', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which review request is most useful?',
        options: [
          { text: 'Is my sheet right?', why: 'It can\'t see the sheet.' },
          { text: 'Here are my formulas and column descriptions. Check for ranges that miss rows, typed totals, text-numbers and references that shift when copied.' },
          { text: 'Make my sheet prettier.', why: 'Not a check.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Why does SUM ignore some amounts?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Spreadsheets are broken.', why: 'It\'s the data format.' },
          { text: 'No idea.', why: 'Text-numbers are a common cause.' },
          { text: 'Some cells are text, like "GHS 80" or "120 " with a space. SUM skips text. I\'ve converted them to numbers.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many COVID cases did Public Health England miss?',
        answers: ['16000', '16,000', '15841', '15,841'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Use [[1]], not typed totals. Check the [[2]] formula in a column.',
        blanks: [['formulas'], ['last']],
        distractors: ['guesses', 'prettiest'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the correct total formula.',
        tiles: ['=SUM(', 'C2:C3001', ')'],
        distractors: ['C2:C2500'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s sheet review.',
        lines: ['Check ranges cover all rows', 'Replace typed totals with formulas', 'Fix text-numbers', 'Check the last formula in each column'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Would SUM count this cell?',
        groups: ['Counts', 'Ignored'],
        items: [
          { text: '120', group: 0 },
          { text: '"GHS 80"', group: 1 },
          { text: '95', group: 0 },
          { text: '"120 " stored as text', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What changed when the Reinhart-Rogoff error was found?',
        options: [
          { text: 'Their results were weaker than the original paper suggested' },
          { text: 'Nothing', why: 'The results changed.' },
          { text: 'Excel was banned', why: 'The analysis was corrected.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these five mistakes might be in a sheet you use?',
    starters: ['The sheet:', 'Possible mistake:'],
  },
  deepen: { title: 'Try it today', summary: 'Check the last formula in one column of a sheet you rely on. Does its range cover every row?' },
  notes: 'Herndon, Ash & Pollin (2013) found spreadsheet and data errors in Reinhart & Rogoff (2010). Public Health England, October 2020: 15,841 cases missed due to the XLS row limit (65,536 rows).',
};

export default lesson;
