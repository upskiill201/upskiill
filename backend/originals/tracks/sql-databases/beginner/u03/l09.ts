import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Card deck: join mistakes (missing ON, wrong ON, ambiguous columns). */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'When a join goes wrong',
  summary: '5 weeks to the 100th. Leo tries a join by himself and proudly announces the Starlight sold 8,451 tickets. Juno nearly drops her coffee. One missing word did it.',
  minutes: 10,
  outcomes: [
    'Spot a join with no ON (the row explosion)',
    'Spot an ON that matches the wrong columns',
    'Sanity-check a join by counting rows',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Leo wrote <code>FROM tickets JOIN screenings</code> and forgot the ON. With no rule for matching, SQLite pairs <strong>every</strong> ticket with <strong>every</strong> screening: 313 × 27 = 8,451 rows.</p><p>Each wrong row looks perfectly real, which is what makes it dangerous.</p>',
    },
    {
      kind: 'text',
      html: '<p>Three checks before you trust a join:</p><p><strong>1.</strong> Every JOIN has an ON.<br><strong>2.</strong> The ON matches a foreign key to its primary key: <code>t.screening_id = s.id</code>, not <code>t.id = s.id</code>.<br><strong>3.</strong> The row count makes sense. Tickets joined to screenings should be 313, one per ticket.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Leo\'s 8,451 tickets',
      database: 'starlight',
      code: '-- No ON: every ticket meets every screening\nSELECT t.id, s.starts_at\nFROM tickets t\nJOIN screenings s;\n',
      caption: 'Run it and look at the row count under the table.',
      challenge: 'Add ON t.screening_id = s.id after JOIN screenings s and run it again: 313.',
    },
  ],
  apply: {
    scenario: 'Checking Leo\'s joins.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Leo get 8,451 rows?',
        options: [
          { text: 'With no ON, every ticket was paired with every screening: 313 × 27' },
          { text: 'The Starlight really sold 8,451 tickets', why: 'It sold 313. The rest are made-up pairs.' },
          { text: 'SQLite counted twice', why: 'SQLite did exactly what it was told: no matching rule, so every pair.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix Leo\'s join so every ticket gets only its own screening.',
        starter: 'SELECT t.id, s.starts_at\nFROM tickets t\nJOIN screenings s;\n',
        solution: 'SELECT t.id, s.starts_at\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id;\n',
        hint: 'Add ON t.screening_id = s.id before the semicolon.',
        database: 'starlight',
        checks: [
          { message: 'One row per ticket: 313', outputIncludes: '(313 rows)' },
          { message: 'Use ON', codeIncludes: 'on t.screening_id = s.id' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This runs, but the answers are nonsense. Which line?',
        lines: ['SELECT m.name, t.seat', 'FROM tickets t', 'JOIN members m ON t.id = m.id', 'WHERE t.screening_id = 17;'],
        bug: 2,
        fix: 'JOIN members m ON t.member_id = m.id',
        explanation: 'Ticket 5 isn\'t bought by member 5. Match the foreign key, t.member_id, to m.id.',
        language: 'sql',
      },
      {
        kind: 'sortGroups',
        prompt: 'Trust it or check it?',
        groups: ['Looks right', 'Something\'s wrong'],
        items: [
          { text: 'tickets JOIN screenings: 313 rows', group: 0 },
          { text: 'tickets JOIN screenings: 8,451 rows', group: 1 },
          { text: 'Casablanca tickets: 38', group: 0 },
          { text: 'Casablanca tickets: more than the 313 sold in total', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What happens?',
        code: 'SELECT id, title\nFROM screenings s\nJOIN films f ON s.film_id = f.id;',
        language: 'sql',
        options: [
          { text: 'It shows the screening ids', why: 'SQL won\'t choose between s.id and f.id for you.' },
          { text: 'An error: ambiguous column name: id' },
          { text: 'It shows the film ids', why: 'Both tables have an id, so it refuses to guess.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix it: show each screening\'s id (s.id) and its film title.',
        starter: 'SELECT id, title\nFROM screenings s\nJOIN films f ON s.film_id = f.id;\n',
        solution: 'SELECT s.id, f.title\nFROM screenings s\nJOIN films f ON s.film_id = f.id;\n',
        hint: 'Say which table each column is from: s.id, f.title.',
        database: 'starlight',
        checks: [
          { message: 'Show id and title', outputIncludes: 'id | title' },
          { message: 'One row per screening: 27', outputIncludes: '(27 rows)' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A safe join: foreign key on the left, primary key on the right.',
        template: 'JOIN films f ON s.[[1]] = f.[[2]]',
        blanks: [['film_id'], ['id']],
        distractors: ['id', 'title', 'screening_id'],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: '8,451 tickets! We\'re rich! Can I tell Walt?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Yes! Tell everyone.', why: 'And then the bank sees a number 27 times too big.' },
          { text: 'Never use JOIN again.', why: 'JOIN is fine; it just needs its ON.' },
          { text: 'Not yet. That\'s 313 × 27: you forgot the ON. The real number is 313. Always check the count makes sense.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its sign.',
        pairs: [
          ['No ON', 'Far too many rows'],
          ['ON t.id = m.id', 'Real-looking but wrong names'],
          ['Bare id with two tables', 'ambiguous column name'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 2 review: the 3 longest films, longest first.',
        tiles: ['SELECT title FROM films', 'ORDER BY minutes DESC', 'LIMIT 3;'],
        distractors: ['ORDER BY minutes', 'WHERE LIMIT 3'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'tickets (313 rows) joined to screenings (27 rows) with no ON. How many rows?',
        answers: ['8451', '8,451'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When have you trusted a number because it looked official, then found it was wrong? What check would have caught it?',
    starters: ['The number was...', 'The check would be...'],
  },
  deepen: {
    title: 'CROSS JOIN on purpose',
    summary: 'Pairing everything with everything is sometimes useful: every seat in every screening, for a seat map. Write it as CROSS JOIN so readers know you meant it.',
  },
  notes: 'starlight.sql: 313 tickets × 27 screenings = 8,451 rows. SQLite treats JOIN without ON as a cross join (sqlite.org/lang_select.html).',
};

export default lesson;
