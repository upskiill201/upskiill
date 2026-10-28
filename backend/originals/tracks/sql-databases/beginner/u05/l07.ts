import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Tap to explore: CREATE INDEX and EXPLAIN QUERY PLAN (SCAN vs SEARCH). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Fast at 9 a.m.',
  summary: 'The 100th birthday. Arjun asks a calm question: "When 300 people tap Book at 9 a.m., how does the database find screening 26\'s seats?" Right now, by reading every ticket ever sold.',
  minutes: 11,
  outcomes: [
    'Explain what an index does',
    'Create one with CREATE INDEX',
    'Check a query uses it with EXPLAIN QUERY PLAN',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: 'CREATE INDEX idx_tickets_screening ON tickets (screening_id); EXPLAIN QUERY PLAN SELECT seat FROM tickets WHERE screening_id = 26;',
      hotspots: [
        { phrase: 'CREATE INDEX', note: 'Like the index at the back of a book: a sorted list of values, each pointing at its rows.' },
        { phrase: 'idx_tickets_screening', note: 'The index\'s name. Say what it\'s for: index on tickets, by screening.' },
        { phrase: 'ON tickets (screening_id)', note: 'Index the column you search by. WHERE screening_id = … can now jump straight to the right rows.' },
        { phrase: 'EXPLAIN QUERY PLAN', note: 'Asks the database how it would run the query, without running it.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'SCAN, then SEARCH',
      database: 'starlight',
      code: '-- Before: read every ticket\nEXPLAIN QUERY PLAN SELECT seat FROM tickets WHERE screening_id = 26;\n\nCREATE INDEX idx_tickets_screening ON tickets (screening_id);\n\n-- After: jump straight there\nEXPLAIN QUERY PLAN SELECT seat FROM tickets WHERE screening_id = 26;\n',
      caption: 'Read the detail column. SCAN means "read every row". SEARCH … USING INDEX means "look it up". Run it.',
      challenge: 'Try the plan for WHERE member_id = 1. Does the new index help that one?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Indexes speed up reading but make every INSERT a little slower, because the index must be updated too. Index the columns you search often, not every column.',
    },
  ],
  apply: {
    scenario: 'Getting ready for 9 a.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does an index do?',
        options: [
          { text: 'Makes the table smaller', why: 'It actually takes a little extra space.' },
          { text: 'Sorts the rows on screen', why: 'That\'s ORDER BY. An index is behind the scenes.' },
          { text: 'Lets the database find matching rows without reading every row' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Create an index called idx_tickets_screening on tickets (screening_id).',
        starter: '',
        solution: 'CREATE INDEX idx_tickets_screening ON tickets (screening_id);\n',
        hint: 'CREATE INDEX idx_tickets_screening ON tickets (screening_id);',
        database: 'starlight',
        checks: [
          { message: 'Create the index', outputIncludes: 'Created index idx_tickets_screening' },
          { message: 'It covers screening_id', expr: "SELECT name = 'screening_id' FROM pragma_index_info('idx_tickets_screening')" },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the plan to what it means.',
        pairs: [
          ['SCAN tickets', 'Read every row'],
          ['SEARCH … USING INDEX', 'Jump to the matching rows'],
          ['EXPLAIN QUERY PLAN', 'Show how, without running it'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Members search their tickets by member_id. Index tickets (member_id) as idx_tickets_member, then show the plan for SELECT seat FROM tickets WHERE member_id = 1.',
        starter: '',
        solution: 'CREATE INDEX idx_tickets_member ON tickets (member_id);\nEXPLAIN QUERY PLAN SELECT seat FROM tickets WHERE member_id = 1;\n',
        hint: 'CREATE INDEX … ; then EXPLAIN QUERY PLAN SELECT …;',
        database: 'starlight',
        checks: [
          { message: 'Create the index', outputIncludes: 'Created index idx_tickets_member' },
          { message: 'The plan uses it', outputIncludes: 'USING INDEX idx_tickets_member' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'No index on members.city. What does the plan say?',
        code: "EXPLAIN QUERY PLAN\nSELECT name FROM members WHERE city = 'Skokie';",
        language: 'sql',
        options: [
          { text: 'SEARCH members USING INDEX', why: 'There\'s no index on city to use.' },
          { text: 'SCAN members' },
          { text: 'An error: no index', why: 'Queries work without indexes; they just read every row.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Index screenings by when they start.',
        template: 'CREATE [[1]] idx_screenings_start [[2]] screenings (starts_at);',
        blanks: [['INDEX'], ['ON']],
        distractors: ['KEY', 'FOR', 'TABLE'],
        language: 'sql',
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth an index?',
        groups: ['Yes: searched often', 'Probably not'],
        items: [
          { text: 'tickets.screening_id (every seat map)', group: 0 },
          { text: 'tickets.member_id (every "My tickets" screen)', group: 0 },
          { text: 'films.minutes (searched once a year)', group: 1 },
          { text: 'A table with 15 rows', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t work?',
        lines: ['CREATE INDEX idx_tickets_screening ON tickets (screening_id);', 'CREATE INDEX idx_tickets_screening ON tickets (member_id);'],
        bug: 1,
        fix: 'CREATE INDEX idx_tickets_member ON tickets (member_id);',
        explanation: 'Two indexes can\'t share a name. Name each one after its column.',
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: '313 tickets is nothing. Do you really need an index?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Not today. But every season adds hundreds more, and the seat map runs that query every time anyone taps. One line now saves the slow day later.' },
          { text: 'No, indexes are only for big companies.', why: 'They\'re for any table that grows and gets searched.' },
          { text: 'Yes, index every column.', why: 'Each index slows writes a little. Index what you search.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 3 review: My tickets, with film titles, for member 1.',
        tiles: ['SELECT f.title, t.seat FROM tickets t', 'JOIN screenings s ON t.screening_id = s.id', 'JOIN films f ON s.film_id = f.id', 'WHERE t.member_id = 1;'],
        distractors: ['JOIN films f ON t.id = f.id', 'GROUP BY f.title'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a query plan, which word means "read every row"?',
        answers: ['SCAN'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'What do you "index" in real life so you can find it fast (labelled folders, a contacts list, a spice rack)? What would be worth indexing next?',
    starters: ['I already index...', 'Next I\'d index...'],
  },
  deepen: {
    title: 'Primary keys are indexed already',
    summary: 'Searching by id is always fast: an INTEGER PRIMARY KEY is how SQLite stores the rows. And every UNIQUE rule creates an index too.',
  },
  notes: 'sql.js 1.14.1 bundles SQLite 3.49.1; EXPLAIN QUERY PLAN detail = "SCAN tickets" without an index, "SEARCH tickets USING INDEX idx_tickets_screening (screening_id=?)" with one (sqlite.org/eqp.html).',
};

export default lesson;
