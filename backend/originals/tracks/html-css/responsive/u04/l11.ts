import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 4 · Lesson 11 — the gig list is data: a real table (table, tr, th, td, caption), not a grid of boxes. Story choice. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'The gig list is data',
  summary: 'Kofi has five gigs coming up, each with a date, a venue, a city and tickets. Fresh from Grid, he wants to build it as a grid of boxes. Miracle asks one question: "Is this a layout, or is it data?" Choose how to build it.',
  minutes: 11,
  outcomes: ['Tell layout from data', 'Build a simple table with table, tr, th and td', 'Give a table a caption'],
  learn: [
    {
      kind: 'story',
      title: 'Layout or data?',
      beats: [
        { speaker: 'narrator', text: 'Five gigs. Each one: a date, a venue, a city, and whether tickets are left.' },
        { speaker: 'kofi', text: 'Four columns! I\'ll make a grid of twenty little boxes.' },
        { speaker: 'miracle', text: 'Is it a layout, or is it data? Would you read it across a row, like "18 Oct, Labadi, Accra, tickets left"?' },
        { speaker: 'kofi', text: '...It\'s data.' },
      ],
      choice: {
        prompt: 'How should Kofi build the gig list?',
        options: [
          {
            text: 'A real HTML table, with column headings for Date, Venue, City and Tickets.',
            outcome: 'Screen readers can say "Venue: Labadi Beach" as Ama\'s friend moves along a row. It looks neat, and it means exactly what it is.',
            best: true,
          },
          {
            text: 'A grid of twenty boxes styled to look like a table.',
            outcome: 'It looks right, but it\'s twenty unrelated boxes. A screen reader just reads "18 Oct, Labadi Beach, Accra, Yes, 25 Oct..." with no headings.',
          },
          {
            text: 'Five paragraphs, one per gig.',
            outcome: 'Readable, but you can\'t scan down the dates or compare cities at a glance.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Tables are for data:</strong> things you read across rows and down columns, like a timetable or a gig list. <strong>table</strong> wraps it. Each <strong>tr</strong> is a row. <strong>th</strong> is a heading cell; <strong>td</strong> is an ordinary cell. A <strong>caption</strong> says what the table is. Grid is for layout; a table is for data. That\'s the job tables were always meant for.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Upcoming gigs',
      caption: 'A real table: a caption, a heading row, and one row per gig.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  table { border-collapse: collapse; width: 100%; }\n  th, td { padding: 8px; border-bottom: 1px solid #1F2E52; text-align: left; }\n  th { color: #FF9600; }\n</style>\n<table>\n  <caption>Upcoming gigs</caption>\n  <tr><th>Date</th><th>Venue</th><th>City</th><th>Tickets</th></tr>\n  <tr><td>18 Oct</td><td>Labadi Beach</td><td>Accra</td><td>Yes</td></tr>\n  <tr><td>25 Oct</td><td>Sound Up Saturdays</td><td>Accra</td><td>Sold out</td></tr>\n</table>\n',
      challenge: 'Add a third gig: 1 Nov, Campus Night, Kumasi, Yes.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Layout? Grid or Flexbox. Data you read across rows and down columns? A table, with th headings and a caption.',
    },
  ],
  apply: {
    scenario: 'The gig list.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is the gig list a table and the cover gallery a grid?',
        options: [
          { text: 'The gig list is data read across rows; the gallery is a layout of separate items' },
          { text: 'Tables are newer', why: 'It\'s about what the content is.' },
          { text: 'Grids can\'t hold text', why: 'They can. The gig list is data.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the heading row: a tr with th cells Date, Venue and City',
        starter: '<table>\n  <caption>Upcoming gigs</caption>\n\n  <tr><td>18 Oct</td><td>Labadi Beach</td><td>Accra</td></tr>\n</table>\n',
        solution: '<table>\n  <caption>Upcoming gigs</caption>\n  <tr><th>Date</th><th>Venue</th><th>City</th></tr>\n  <tr><td>18 Oct</td><td>Labadi Beach</td><td>Accra</td></tr>\n</table>\n',
        hint: '<tr><th>Date</th><th>Venue</th><th>City</th></tr>',
        checks: [
          { message: 'Three headings', dom: { selector: 'th', count: 3 } },
          { message: 'Starting with Date', dom: { selector: 'th', text: 'Date' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each element to its job.',
        pairs: [
          ['table', 'Wraps the data'],
          ['tr', 'One row'],
          ['th', 'A heading cell'],
          ['td', 'An ordinary cell'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Data (table) or layout (Grid)?',
        groups: ['Table', 'Grid'],
        items: [
          { text: 'Gig dates, venues and cities', group: 0 },
          { text: 'A wall of cover pictures', group: 1 },
          { text: 'A price list: item and price', group: 0 },
          { text: 'Main content beside a sidebar', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Wait, tables were bad in Chapter 3!',
        options: [
          { text: 'Tables for LAYOUT were bad. Tables for DATA are exactly right.' },
          { text: 'Yes, never use tables.', why: 'They\'re right for data.' },
          { text: 'Only use tables on laptops.', why: 'It\'s about data vs layout, not screens.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the cell that should be a heading.',
        language: 'html',
        lines: ['<tr><td>Date</td><th>Venue</th><th>City</th></tr>', '<tr><td>18 Oct</td><td>Labadi Beach</td><td>Accra</td></tr>', '<caption>Upcoming gigs</caption>'],
        bug: 0,
        explanation: '"Date" is a column heading, so it should be th, like Venue and City.',
        fix: '<tr><th>Date</th><th>Venue</th><th>City</th></tr>',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many rows of gigs (not counting the heading row)?',
        code: '<table>\n  <tr><th>Date</th><th>City</th></tr>\n  <tr><td>18 Oct</td><td>Accra</td></tr>\n  <tr><td>25 Oct</td><td>Accra</td></tr>\n  <tr><td>1 Nov</td><td>Kumasi</td></tr>\n</table>',
        language: 'html',
        options: [
          { text: 'Three' },
          { text: 'Four', why: 'The first tr is the heading row.' },
          { text: 'Six', why: 'Count the tr elements with td cells.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete one gig row.',
        language: 'html',
        template: '<[[1]]><[[2]]>1 Nov</td><td>Kumasi</td></tr>',
        blanks: [['tr'], ['td']],
        distractors: ['th', 'row', 'cell'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element gives a table a title that says what it is? (tag name)',
        answers: ['caption', '<caption>'],
        placeholder: 'A tag',
      },
      {
        kind: 'writeCode',
        prompt: 'Add a third gig row: 1 Nov, Campus Night, Kumasi',
        starter: '<table>\n  <tr><th>Date</th><th>Venue</th><th>City</th></tr>\n  <tr><td>18 Oct</td><td>Labadi Beach</td><td>Accra</td></tr>\n  <tr><td>25 Oct</td><td>Sound Up Saturdays</td><td>Accra</td></tr>\n\n</table>\n',
        solution: '<table>\n  <tr><th>Date</th><th>Venue</th><th>City</th></tr>\n  <tr><td>18 Oct</td><td>Labadi Beach</td><td>Accra</td></tr>\n  <tr><td>25 Oct</td><td>Sound Up Saturdays</td><td>Accra</td></tr>\n  <tr><td>1 Nov</td><td>Campus Night</td><td>Kumasi</td></tr>\n</table>\n',
        hint: '<tr><td>1 Nov</td><td>Campus Night</td><td>Kumasi</td></tr>',
        checks: [
          { message: 'Four rows in all', dom: { selector: 'tr', count: 4 } },
          { message: 'Kumasi is there', dom: { selector: 'td', text: 'Kumasi' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Is there anything on your page that\'s really data, like a timetable, a list of scores or prices?',
    starters: ['My...', 'would be a table because...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN HTML table basics" and read about th, td and caption.',
  },
  notes: 'Data tables with th header cells and caption (HTML spec; WCAG 1.3.1). thead/tbody and scope are skipped for beginners; browsers add tbody automatically. border-collapse and text-align shown only in the tryIt.',
};

export default lesson;
