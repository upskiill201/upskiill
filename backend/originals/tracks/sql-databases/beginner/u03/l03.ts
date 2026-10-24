import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Before/after: long table names vs aliases (t, s, m). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Short names',
  summary: '5 weeks to the 100th. Juno\'s joins are getting wide: tickets.screening_id = screenings.id, over and over, on a phone screen. Arjun shows her the trick every developer uses.',
  minutes: 10,
  outcomes: [
    'Give a table a short alias: FROM tickets t',
    'Use aliases everywhere in a query',
    'Keep joins short enough to read on a phone',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Same query, two ways',
      before: { label: 'Full names', text: 'SELECT tickets.seat, members.name\nFROM tickets\nJOIN members ON tickets.member_id = members.id\nWHERE tickets.screening_id = 17;' },
      after: { label: 'Aliases', text: 'SELECT t.seat, m.name\nFROM tickets t\nJOIN members m ON t.member_id = m.id\nWHERE t.screening_id = 17;' },
      notes: [
        'FROM tickets t gives tickets the short name t for this query.',
        'Once a table has an alias, use it everywhere in the query: t.seat, t.member_id.',
        'First letters are the usual choice: t for tickets, s for screenings, m for members, f for films.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Short and sweet',
      database: 'starlight',
      code: 'SELECT t.seat, m.name, m.city\nFROM tickets t\nJOIN members m ON t.member_id = m.id\nWHERE t.screening_id = 17\nORDER BY t.seat;\n',
      caption: 'Casablanca night, with every member\'s city. Run it.',
      challenge: 'Change 17 to 21 (Jaws, Fri 9 Oct). Who sat in row K?',
    },
  ],
  apply: {
    scenario: 'Shorter joins, same answers.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In FROM screenings s, what is s?',
        options: [
          { text: 'A new table', why: 'Nothing new is created. It\'s a nickname for this one query.' },
          { text: 'A short name (alias) for screenings in this query' },
          { text: 'A column', why: 'It names the table, not a column.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the aliases.',
        template: 'SELECT [[1]].seat, s.starts_at\nFROM tickets t\nJOIN screenings [[2]] ON t.screening_id = s.id;',
        blanks: [['t'], ['s']],
        distractors: ['tickets', 'screenings', 'm'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'With aliases t and s: show each ticket\'s seat and its screening\'s price, for screening 21.',
        starter: 'SELECT t.seat, s.price\nFROM tickets t\n',
        solution: 'SELECT t.seat, s.price\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nWHERE t.screening_id = 21;\n',
        hint: 'JOIN screenings s ON t.screening_id = s.id WHERE t.screening_id = 21',
        database: 'starlight',
        checks: [
          { message: 'Show seat and price', outputIncludes: 'seat | price' },
          { message: 'All 19 tickets for screening 21', outputIncludes: '(19 rows)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the query?',
        lines: ['SELECT t.seat, m.name', 'FROM tickets t', 'JOIN members m ON tickets.member_id = m.id;'],
        bug: 2,
        fix: 'JOIN members m ON t.member_id = m.id;',
        explanation: 'Once tickets is called t, the full name stops working in that query. Use t.member_id.',
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Both tables have a column called id. What happens?',
        code: 'SELECT id, name\nFROM tickets t\nJOIN members m ON t.member_id = m.id;',
        language: 'sql',
        options: [
          { text: 'It shows the ticket id', why: 'SQL won\'t guess.' },
          { text: 'An error: "ambiguous column name: id"' },
          { text: 'It shows both ids', why: 'It refuses to pick. Say t.id or m.id.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the ticket id (t.id), seat and member name for screening 21, sorted by seat. Use aliases t and m.',
        starter: '',
        solution: 'SELECT t.id, t.seat, m.name\nFROM tickets t\nJOIN members m ON t.member_id = m.id\nWHERE t.screening_id = 21\nORDER BY t.seat;\n',
        hint: 'SELECT t.id, t.seat, m.name … ORDER BY t.seat',
        database: 'starlight',
        checks: [
          { message: 'Show id, seat and name', outputIncludes: 'id | seat | name' },
          { message: '16 member tickets for screening 21', outputIncludes: '(16 rows)' },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the FROM and JOIN with aliases.',
        tiles: ['FROM screenings s', 'JOIN films f', 'ON s.film_id = f.id'],
        distractors: ['ON s.id = f.id', 'JOIN f films'],
        language: 'sql',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the alias to its table.',
        pairs: [
          ['t', 'tickets'],
          ['s', 'screenings'],
          ['m', 'members'],
          ['f', 'films'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'I\'d name them tkt, scr and mbr. Clearer.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Any short name works, as long as we use the same ones every time. I\'ll stick to first letters: everyone on the team can guess them.' },
          { text: 'Aliases must be one letter.', why: 'They can be any name. One letter is just a habit.' },
          { text: 'Aliases slow the database down.', why: 'They make no difference to speed.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Chapters 1 and 2 review: does it change the data?',
        groups: ['Changes the data', 'Only reads it'],
        items: [
          { text: 'INSERT INTO members …', group: 0 },
          { text: 'SELECT … JOIN …', group: 1 },
          { text: 'CREATE TABLE snacks …', group: 0 },
          { text: 'SELECT DISTINCT city …', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Your query says FROM films f. How do you write the title column?',
        answers: ['f.title'],
        placeholder: 'alias.column',
      },
    ],
  },
  reflect: {
    prompt: 'Which nicknames or shortcuts do you use every day (for people, places, apps)? When do they make things clearer, and when more confusing?',
    starters: ['I call...', 'It gets confusing when...'],
  },
  deepen: {
    title: 'AS for tables',
    summary: 'FROM tickets AS t means exactly the same as FROM tickets t. Some teams write AS for tables too; SQLite accepts both.',
  },
  notes: 'starlight.sql: screening 21 (Jaws, 2026-10-09 19:30) has 19 tickets, 16 with members. SQLite error for an unqualified shared column: "ambiguous column name: id".',
};

export default lesson;
