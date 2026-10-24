import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 20 — Unit Challenge. The 9am meeting. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: the 9am meeting',
  summary: 'From 3,000 messy rows at 9pm to a one-page report at 9am. Every Unit 7 skill, under pressure.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Use every Unit 7 skill on real data', 'Prove you can turn rows into a trusted story'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 7\'s final challenge. 9pm to 9am: clean, calculate, check, explain.', replies: ['Let\'s go'] },
        { tey: 'The theme: AI explains, the spreadsheet calculates, Ada checks and tells the story. Go.' },
      ],
    },
  ],
  apply: {
    scenario: '9pm. The spreadsheet opens.',
    items: [
      {
        kind: 'findBug',
        prompt: '9:00pm. Which column must go before any AI use?',
        lines: ['Date', 'Shop ID', 'Owner phone', 'Amount'],
        bug: 2,
        fix: 'Delete it from the copy you use with AI.',
        explanation: 'Personal data.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: '9:10pm. Which request gets the total?',
        options: [
          { text: 'Here are 3,000 rows; add them up.', why: 'Risky maths and data.' },
          { text: 'Columns: A Date, C Amount, E Status. Give a formula for the total of C where E is "completed", and explain it.' },
          { text: 'How much money?', why: 'No detail.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: '9:30pm. Order the cleaning.',
        lines: ['Copy the original', 'List the mess', 'Fix each kind', 'Flag what can\'t be fixed', 'Note what changed'],
      },
      {
        kind: 'matchPairs',
        prompt: '10:00pm. Match the mess to the fix.',
        pairs: [
          ['"Makola Mkt"', 'Standardise the name'],
          ['"120 " as text', 'TRIM and convert'],
          ['A duplicate row', 'Remove and note it'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '10:30pm. Rows: 100 completed, 50 failed, 150 completed. SUMIF for "completed"?',
        answers: ['250'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: '11:00pm. Rows or columns of the weekly table?',
        groups: ['Rows', 'Columns'],
        items: [
          { text: 'Week 2', group: 0 },
          { text: 'Makola', group: 1 },
          { text: 'Week 4', group: 0 },
          { text: 'Total', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Midnight. 400, 470, 530, 600, but week 3 had a festival. What does Ada say?',
        options: [
          { text: 'Festivals triple sales', why: 'One-off.' },
          { text: 'Steady growth overall; part of week 3 may be the festival' },
          { text: 'No trend', why: 'Four weeks of rise.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '12:30am. Five shops did 1, 2, 2, 3, 92 payments. Median?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: '1:00am. Match the question to the chart.',
        pairs: [
          ['Weekly growth', 'Line chart'],
          ['Makola vs Kaneshie', 'Sorted bar'],
          ['Size vs failures', 'Scatter plot'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '1:30am. The AI says total processed is 5,800,000 GHS. Ada\'s head estimate is about 60,000. What now?',
        options: [
          { text: 'Use the AI number', why: 'The estimate says it\'s wrong.' },
          { text: 'Split the difference', why: 'Recalculate.' },
          { text: 'Recalculate in the sheet; the AI is roughly 100x too high' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: '2:00am. Which formula misses data? (rows 2 to 3001)',
        lines: ['=SUM(C2:C3001)', '=COUNTIF(E2:E3001,"failed")', '=AVERAGE(C2:C2800)', '=SUMIF(D2:D3001,"Makola",C2:C3001)'],
        bug: 2,
        fix: '=AVERAGE(C2:C3001)',
        explanation: 'Stops at row 2800.',
      },
      {
        kind: 'mcq',
        prompt: '6:00am. Active shops went from 60% to 75%. Which line goes in the report?',
        options: [
          { text: 'Up 15 percentage points (a 25% increase)' },
          { text: 'Up 15%', why: 'Ambiguous.' },
          { text: 'Up 75%', why: 'Wrong.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: '6:30am. Plain words or jargon for Carmen?',
        groups: ['Plain', 'Jargon'],
        items: [
          { text: '"About 1 in 25 payments fails"', group: 0 },
          { text: '"Failure rate 4.2%, σ=1.1"', group: 1 },
          { text: '"Payments grew by half"', group: 0 },
          { text: '"n=600 cohort"', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: '7:00am. Complete the drafting request.',
        template: 'Using only this table, draft a one-page report. Don\'t [[1]] any [[2]].',
        blanks: [['change'], ['figures', 'numbers']],
        distractors: ['love', 'fonts'],
      },
      {
        kind: 'findBug',
        prompt: '7:30am. The sheet says 600. Which draft line is wrong?',
        lines: ['Payments grew by half in four weeks', 'Week 4: 620 payments', 'About 1 in 25 fail', 'Review again at week 8'],
        bug: 1,
        fix: 'Week 4: 600 payments',
        explanation: 'The draft changed a figure.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: '9:20am. Carmen loved it. She\'s told your founders, and they want you to present the pilot to them next month. Ready?',
        prompt: 'It\'s Ada\'s first time presenting to the founders. Best reply?',
        options: [
          { text: 'I\'ll just read the report out.', why: 'A pitch needs a deck and practice.' },
          { text: 'Can someone else do it?', why: 'It\'s her work to present.' },
          { text: 'Nervous, but yes. I\'ll build a short deck from this report and practise it properly.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the one idea behind all of Unit 7?',
        options: [
          { text: 'Let AI do all the maths', why: 'Spreadsheets calculate.' },
          { text: 'AI explains and drafts; the spreadsheet calculates; you check every number and tell the story honestly' },
          { text: 'Avoid numbers', why: 'You can handle them now.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'You finished Unit 7! What spreadsheet task will you tackle differently now?',
    starters: ['The task:', 'Now I\'ll...'],
  },
  deepen: { title: 'Coming next', summary: 'Unit 8: the pitch. Ada presents the pilot to the founders for the first time.' },
  notes: 'Review of the whole unit. Figures fictional.',
};

export default lesson;
