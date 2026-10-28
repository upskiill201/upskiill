import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 6 — making a simple summary table. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Making a simple table',
  summary: '3,000 rows tell Carmen nothing. A small summary table tells her everything. Tap Ada\'s table to see how it\'s built.',
  minutes: 12,
  outcomes: [
    'Turn thousands of rows into a small summary table',
    'Choose rows and columns that answer a question',
    'Ask AI how to build it (pivot table or formulas)',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s summary table',
      text: 'Weekly payments by market. Rows: Week 1 to Week 4. Columns: Makola, Kaneshie, Total. Week 4: Makola 412, Kaneshie 188, Total 600. Each number counts completed payments only.',
      hotspots: [
        { phrase: 'Weekly payments by market', note: 'The title says exactly what the table shows. Write it first.' },
        { phrase: 'Rows: Week 1 to Week 4', note: 'Time down the side makes trends easy to read.' },
        { phrase: 'Columns: Makola, Kaneshie, Total', note: 'The comparison you care about across the top.' },
        { phrase: 'Total 600', note: 'Totals let readers check the parts add up.' },
        { phrase: 'completed payments only', note: 'Say what\'s counted. Failed payments would change the story.' },
      ],
    },
    {
      kind: 'reading',
      title: 'How to build it',
      html:
        '<p>Most spreadsheets have a <strong>pivot table</strong>: a tool that groups rows and adds them up for you. Ask AI: <em>"In Google Sheets, how do I make a pivot table with Week as rows, Market as columns, and the count of completed payments as values?"</em></p>' +
        '<p>Or ask for formulas (COUNTIFS) if you prefer a fixed layout. Either way, check one cell by hand.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Start from the question. Time down the side, comparison across the top, totals, and a note on what\'s counted.',
    },
  ],
  apply: {
    scenario: 'Ada builds a table for Carmen.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a pivot table?',
        options: [
          { text: 'A table that spins', why: 'It summarises data.' },
          { text: 'A tool that groups rows and adds them up for you' },
          { text: 'A chart', why: 'It\'s a summary table.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Rows or columns in Ada\'s table?',
        groups: ['Rows', 'Columns'],
        items: [
          { text: 'Week 1', group: 0 },
          { text: 'Makola', group: 1 },
          { text: 'Week 4', group: 0 },
          { text: 'Total', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Week 4: Makola 412, Kaneshie 188. What\'s the total?',
        answers: ['600'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the pivot table built?',
        options: [
          { text: 'Make a table.', why: 'No structure.' },
          { text: 'In Google Sheets, how do I make a pivot table with Week as rows, Market as columns, and the count of completed payments as values?' },
          { text: 'Summarise everything.', why: 'Not specific.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Does the table include failed payments?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Not sure.', why: 'She should know what\'s counted.' },
          { text: 'Everything is included.', why: 'It\'s completed only.' },
          { text: 'No, completed only; it says so under the title. Failed payments are in a separate line if you want them.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Time down the [[1]], comparison across the [[2]].',
        blanks: [['side'], ['top']],
        distractors: ['middle', 'bottom'],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of the table is a problem?',
        lines: [
          'Title: Weekly completed payments by market',
          'Week 3: Makola 380, Kaneshie 170, Total 600',
          'Week 4: Makola 412, Kaneshie 188, Total 600',
          'Note: completed payments only',
        ],
        bug: 1,
        fix: 'Week 3: Total 550',
        explanation: '380 + 170 is 550, not 600. Totals catch errors.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the table part to its job.',
        pairs: [
          ['Title', 'Says what the table shows'],
          ['Total', 'Lets readers check the parts'],
          ['Note', 'Says what\'s counted'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the table title.',
        tiles: ['Weekly', 'completed', 'payments', 'by', 'market'],
        distractors: ['stuff'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada builds the table.',
        lines: ['Write the question it answers', 'Choose rows and columns', 'Build the pivot table', 'Check one cell by hand'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in Carmen\'s summary, or too detailed?',
        groups: ['Summary', 'Too detailed'],
        items: [
          { text: 'Payments per market per week', group: 0 },
          { text: 'Every payment\'s timestamp', group: 1 },
          { text: 'Totals', group: 0 },
          { text: 'Each shop\'s phone number', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why check one cell by hand?',
        options: [
          { text: 'To make sure the table counts what you think it counts' },
          { text: 'To slow down', why: 'It catches setup mistakes.' },
          { text: 'Pivot tables are always wrong', why: 'Setup mistakes are common, not certain.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What question would a small summary table answer about your own data?',
    starters: ['The question:', 'Rows:', 'Columns:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI how to build a pivot table for one question about your data. Check one cell.' },
  notes: 'Kaneshie is a real market in Accra; figures fictional.',
};

export default lesson;
