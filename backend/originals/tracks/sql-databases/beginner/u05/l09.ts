import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Reading: how an app uses the database. One query per screen, ? parameters, SQL injection. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The app talks SQL',
  summary: 'The 100th birthday. Arjun builds the Starlight Tickets app around Juno\'s database in one weekend. Every button sends one of her queries. Then he shows her the one mistake that could hand the database to a stranger.',
  minutes: 12,
  outcomes: [
    'Match each screen of an app to its SQL',
    'Explain ? placeholders (parameters)',
    'Explain why user text must never be pasted into SQL',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Four screens, four queries',
      html: '<p>An app is mostly buttons that send SQL to a database and show what comes back. Starlight Tickets has four screens:</p><p><strong>What\'s on</strong>: <code>SELECT * FROM seats_left WHERE starts_at >= ?</code><br><strong>Seat map</strong>: <code>SELECT seat FROM tickets WHERE screening_id = ?</code><br><strong>Book</strong>: <code>INSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES (?, ?, ?, ?)</code><br><strong>My tickets</strong>: the three-table join, <code>WHERE t.member_id = ?</code></p><p>Each <code>?</code> is a <strong>parameter</strong>: a gap the app fills with a value, like the seat someone tapped. The database receives the SQL and the values <em>separately</em>, so a value can never change what the SQL does.</p>',
    },
    {
      kind: 'code',
      language: 'javascript',
      caption: 'The Book button in the app (JavaScript). The SQL is Juno\'s; the values arrive separately.',
      code: "db.run(\n  'INSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES (?, ?, ?, ?)',\n  [screeningId, memberId, seat, price]\n);",
    },
    {
      kind: 'compare',
      title: 'Pasting vs parameters',
      before: { label: 'Pasting the name into the SQL', text: "\"... WHERE name = '\" + typed + \"'\"\n\nSomeone types:\n' OR '1'='1\n\n→ WHERE name = '' OR '1'='1'\n→ every member's email comes back" },
      after: { label: 'A parameter', text: "\"... WHERE name = ?\", [typed]\n\nSomeone types:\n' OR '1'='1\n\n→ looks for a member literally called that\n→ 0 rows" },
      notes: [
        'This attack is called SQL injection, and it\'s one of the most common ways real apps get broken into.',
        'The fix is always the same: parameters (?), never gluing user text into SQL.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Seat map for Saturday',
      database: 'starlight',
      code: "-- The app fills ? with 26 when Saturday is tapped.\n-- Here we type the value in, to see what it sends back.\nINSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES (26, 1, 'G7', 25);\n\nSELECT seat FROM tickets WHERE screening_id = 26;\n",
      caption: 'Book (one INSERT), then the seat map (one SELECT). Run it: G7 is taken on Saturday.',
      challenge: "Book G8 for Jack (member 13) too, and run it again.",
    },
  ],
  apply: {
    scenario: 'Wiring Juno\'s queries into the app.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each app screen to its SQL.',
        pairs: [
          ['What\'s on', 'SELECT … FROM seats_left'],
          ['Seat map', 'SELECT seat … WHERE screening_id = ?'],
          ['Book', 'INSERT INTO tickets …'],
          ['My tickets', 'JOIN … WHERE t.member_id = ?'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is a ? in an app\'s SQL?',
        options: [
          { text: 'A placeholder the app fills with a value, sent separately from the SQL' },
          { text: 'A wildcard, like %', why: 'That\'s LIKE. ? is a parameter.' },
          { text: 'A typo', why: 'It\'s deliberate: a gap for a value.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "The Book button, with its values filled in: Rosa (member 1) books 'G7' on screening 26 for 25. Then show the seat map for screening 26.",
        starter: '',
        solution: "INSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES (26, 1, 'G7', 25);\nSELECT seat FROM tickets WHERE screening_id = 26;\n",
        hint: "INSERT … VALUES (26, 1, 'G7', 25); then SELECT seat FROM tickets WHERE screening_id = 26;",
        database: 'starlight',
        checks: [
          { message: 'One booking', outputIncludes: 'INSERT: 1 row added' },
          { message: 'The seat map shows G7', outputIncludes: 'seat G7' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe or dangerous?',
        groups: ['Safe', 'Dangerous'],
        items: [
          { text: "'SELECT … WHERE name = ?', [typed]", group: 0 },
          { text: "\"SELECT … WHERE name = '\" + typed + \"'\"", group: 1 },
          { text: "'INSERT … VALUES (?, ?, ?, ?)', [values]", group: 0 },
          { text: 'Building SQL from whatever someone types', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: "My tickets screen for Rosa (member 1): film title, starts_at and seat of her tickets, newest first. (The app sends 1 as the ?.)",
        starter: '',
        solution: 'SELECT f.title, s.starts_at, t.seat\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nWHERE t.member_id = 1\nORDER BY s.starts_at DESC;\n',
        hint: 'Three tables, WHERE t.member_id = 1, ORDER BY s.starts_at DESC',
        database: 'starlight',
        checks: [
          { message: 'Show title, starts_at and seat', outputIncludes: 'title | starts_at | seat' },
          { message: 'All 7 of her tickets', outputIncludes: '(7 rows)' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: "With a parameter, someone types ' OR '1'='1 as a name. What does the app find?",
        code: "SELECT email FROM members WHERE name = ?\n-- ? = ' OR '1'='1",
        language: 'sql',
        options: [
          { text: 'Every member\'s email', why: 'That only happens when text is pasted into the SQL.' },
          { text: 'An error that crashes the app', why: 'It\'s just an odd name to look for.' },
          { text: 'Nothing: no member is called that' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the app is the security hole?',
        lines: ['const seat = form.seat;', "db.all('SELECT seat FROM tickets WHERE screening_id = ?', [screeningId]);", "db.all(\"SELECT * FROM members WHERE email = '\" + form.email + \"'\");"],
        bug: 2,
        fix: "db.all('SELECT * FROM members WHERE email = ?', [form.email]);",
        explanation: 'Line 3 glues typed text into SQL: SQL injection. Line 2 uses a parameter and is safe.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'The seat map, ready for the app.',
        template: 'SELECT seat FROM tickets WHERE screening_id = [[1]];',
        blanks: [['?']],
        distractors: ['%', '*', "'26'"],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Last thing before we ship. If someone taps Book on G7 when it\'s already taken, what happens?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'The app crashes.', why: 'The database refuses the INSERT; the app should catch that and say so.' },
          { text: 'The UNIQUE rule refuses it, the app catches "UNIQUE constraint failed", and it shows "Sorry, G7 was just taken. Pick another seat."' },
          { text: 'Both people get it.', why: 'Not since lesson 3.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the Book statement the app sends.',
        tiles: ['INSERT INTO tickets', '(screening_id, member_id, seat, price_paid)', 'VALUES', '(?, ?, ?, ?);'],
        distractors: ["('?', '?')", 'SELECT'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the attack called when typed text is pasted into SQL?',
        answers: ['SQL injection', 'injection', 'sql injection attack'],
        placeholder: 'Two words',
      },
    ],
  },
  reflect: {
    prompt: 'Think of an app you use daily. Pick one screen. What SQL do you think it sends, and which part is a ? filled with your data?',
    starters: ['The app is...', 'The screen sends...'],
  },
  deepen: {
    title: 'OWASP and injection',
    summary: 'OWASP, a non-profit for web security, lists injection among the most common web app risks. Read its "SQL Injection Prevention Cheat Sheet": the first rule is parameters.',
  },
  notes: 'Parameterised queries prevent SQL injection (OWASP SQL Injection Prevention Cheat Sheet, cheatsheetseries.owasp.org). Injection appears in the OWASP Top 10 (A03:2021 Injection). The db.run / db.all calls follow the shape of common SQLite libraries for JavaScript.',
};

export default lesson;
