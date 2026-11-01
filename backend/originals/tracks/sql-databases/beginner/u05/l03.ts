import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Before/after: hoping vs constraints. UNIQUE (G7 never again), NOT NULL, CHECK. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'UNIQUE: G7 never again',
  summary: 'The 100th birthday. On Monday, 360 birthday seats go on sale to the whole neighbourhood at once. Juno\'s nightmare is a second G7, sold twice in front of a full lobby. So she makes it impossible.',
  minutes: 11,
  outcomes: [
    'Stop duplicates with a UNIQUE rule',
    'Add a UNIQUE index to an existing table',
    'Guard values with CHECK',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Hoping vs. a rule',
      before: { label: 'Without a rule', text: "INSERT … (17, 'G7') → fine\nINSERT … (17, 'G7') → fine\nTwo people, one seat." },
      after: { label: 'With UNIQUE (screening_id, seat)', text: "INSERT … (17, 'G7') → fine\nINSERT … (17, 'G7') → refused:\nUNIQUE constraint failed" },
      notes: [
        'A constraint is a rule the database enforces on every single INSERT and UPDATE. No human has to remember it.',
        'UNIQUE on two columns together means: the same seat can be sold for different screenings, but never twice for the same one.',
        'You can\'t add the rule while the data already breaks it: G7 has to be fixed first.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Fix first, then lock it',
      database: 'starlight',
      code: "-- 1. Move Jack so the data is clean\nUPDATE tickets SET seat = 'G8' WHERE id = 226;\n\n-- 2. The rule: one ticket per seat per screening\nCREATE UNIQUE INDEX one_ticket_per_seat ON tickets (screening_id, seat);\n\n-- 3. Try to sell G7 again\nINSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES (17, 2, 'G7', 14);\n",
      caption: 'Run it. The last line is refused: the database itself now stops a double booking.',
      expectError: true,
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'In a new table, write the rule inside CREATE TABLE: UNIQUE (screening_id, seat). On an existing table, add it with CREATE UNIQUE INDEX.',
    },
  ],
  apply: {
    scenario: 'Making G7 impossible.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does UNIQUE (screening_id, seat) allow?',
        options: [
          { text: 'Each seat only once in the whole database', why: 'G7 can be sold for every screening, just once per screening.' },
          { text: 'G7 once per screening, so G7 on Friday and G7 on Saturday are both fine' },
          { text: 'Any duplicates, but it warns you', why: 'It doesn\'t warn: it refuses.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "Run it: the rule fails, because G7 is already sold twice. Fix it: move ticket 226 to 'G8' first.",
        starter: 'CREATE UNIQUE INDEX one_ticket_per_seat ON tickets (screening_id, seat);\n',
        solution: "UPDATE tickets SET seat = 'G8' WHERE id = 226;\nCREATE UNIQUE INDEX one_ticket_per_seat ON tickets (screening_id, seat);\n",
        hint: "Put UPDATE tickets SET seat = 'G8' WHERE id = 226; on the line before.",
        database: 'starlight',
        checks: [
          { message: 'Create the index', outputIncludes: 'Created index one_ticket_per_seat' },
          { message: 'It is a UNIQUE index', expr: "SELECT \"unique\" = 1 FROM pragma_index_list('tickets') WHERE name = 'one_ticket_per_seat'" },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule, inside a new table.',
        template: 'CREATE TABLE bookings (\n  id INTEGER PRIMARY KEY,\n  screening_id INTEGER NOT NULL,\n  seat TEXT NOT NULL,\n  [[1]] (screening_id, [[2]])\n);',
        blanks: [['UNIQUE'], ['seat']],
        distractors: ['PRIMARY', 'DISTINCT', 'id'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'After the UNIQUE index exists, what happens?',
        code: "INSERT INTO tickets (screening_id, seat, price_paid)\nVALUES (25, 'A1', 25), (25, 'A1', 25);",
        language: 'sql',
        options: [
          { text: 'Both rows go in', why: 'Same screening, same seat: the rule refuses the second.' },
          { text: 'An error: UNIQUE constraint failed' },
          { text: 'Only one goes in, silently', why: 'SQLite doesn\'t silently drop rows; it stops with an error.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "A new snacks table with rules: id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, price REAL NOT NULL CHECK (price >= 0).",
        starter: '',
        solution: 'CREATE TABLE snacks (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL UNIQUE,\n  price REAL NOT NULL CHECK (price >= 0)\n);\n',
        hint: 'Rules go after the type: name TEXT NOT NULL UNIQUE, price REAL NOT NULL CHECK (price >= 0)',
        database: 'starlight',
        checks: [
          { message: 'Create the snacks table', outputIncludes: 'Created table snacks' },
          { message: 'Names must be unique', expr: "SELECT COUNT(*) = 1 FROM pragma_index_list('snacks') WHERE \"unique\" = 1" },
          { message: 'Use CHECK on price', codeIncludes: 'check (price >= 0)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: "The snacks table has CHECK (price >= 0). Which INSERT is refused?",
        lines: ["INSERT INTO snacks (name, price) VALUES ('Popcorn', 6.50);", "INSERT INTO snacks (name, price) VALUES ('Soda', 3.00);", "INSERT INTO snacks (name, price) VALUES ('Candy', -2);"],
        bug: 2,
        fix: "INSERT INTO snacks (name, price) VALUES ('Candy', 2.00);",
        explanation: 'A price of -2 breaks CHECK (price >= 0), so the database refuses it.',
        language: 'sql',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which rule stops it?',
        groups: ['UNIQUE', 'NOT NULL', 'CHECK'],
        items: [
          { text: 'A seat sold twice for one screening', group: 0 },
          { text: 'A ticket with no seat', group: 1 },
          { text: 'A price of minus $5', group: 2 },
          { text: 'Two snacks both called Popcorn', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the fix in order.',
        lines: ["SELECT screening_id, seat, COUNT(*) FROM tickets GROUP BY screening_id, seat HAVING COUNT(*) > 1;", "UPDATE tickets SET seat = 'G8' WHERE id = 226;", 'CREATE UNIQUE INDEX one_ticket_per_seat ON tickets (screening_id, seat);'],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why not just check in the app before selling a seat? Why put the rule in the database?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Because apps are slow.', why: 'Speed isn\'t the point.' },
          { text: 'No reason, either is fine.', why: 'Two people booking at the same second is exactly what an app-only check misses.' },
          { text: 'Two phones can check "G7 is free" at the same moment, and both sell it. The database rule is the one place that can\'t be raced.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 4 review: find seats sold twice.',
        tiles: ['SELECT screening_id, seat, COUNT(*)', 'FROM tickets', 'GROUP BY screening_id, seat', 'HAVING COUNT(*) > 1;'],
        distractors: ['WHERE COUNT(*) > 1', 'ORDER BY seat'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word, as a rule on a column or columns, refuses duplicates?',
        answers: ['UNIQUE'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which rule in your life is "enforced" by a system rather than by remembering (a card that blocks over a limit, a form that won\'t submit)? What would happen without it?',
    starters: ['The rule is...', 'Without it...'],
  },
  deepen: {
    title: 'Constraints are documentation',
    summary: 'A table\'s rules tell the next developer what\'s true about the data: every ticket has a seat, no seat is sold twice. Read CREATE TABLE statements like a contract.',
  },
  notes: 'starlight.sql: (17, G7) is doubled until ticket 226 moves to G8; CREATE UNIQUE INDEX fails on existing duplicates with "UNIQUE constraint failed: tickets.screening_id, tickets.seat". A column-level UNIQUE creates an automatic index visible in pragma_index_list.',
};

export default lesson;
