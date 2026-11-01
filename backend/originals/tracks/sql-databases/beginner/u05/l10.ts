import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10 — Unit Challenge and course finale. The 100th birthday: the whole booking flow, live. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: the 100th birthday',
  summary: 'Friday 20 November, 6:45 p.m. The Starlight is 100 years old tonight. 357 of 360 birthday seats are sold. The last three go now, in front of a full lobby, Ms Delgado and Dana Whitlock. Every rule you built is on the line.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Run a complete booking flow: protect, book, change, check',
    'Use constraints, transactions and views together',
    'Answer the final questions with joins and totals',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday 20 November, 6:45 p.m.',
      beats: [
        { speaker: 'narrator', text: 'A queue around the block. A pianist warming up for The General. Walt in his grandfather\'s bow tie.' },
        { speaker: 'leo', text: 'Three seats left on the whole weekend. The app says so, and I believe it.' },
        { speaker: 'narrator', text: 'Ms Delgado is in row C. Dana Whitlock stands at the back, arms folded.' },
        { speaker: 'dana', text: 'Let\'s see it hold when it matters.' },
        { speaker: 'juno', text: 'Practice copy first, same as always. Then the real one.' },
      ],
      choice: {
        prompt: 'Two people tap the last seat at the same second. What saves the night?',
        options: [
          { text: 'The UNIQUE rule: the database accepts the first booking and refuses the second.', outcome: 'One gets the seat, the other gets "Sorry, just taken." Nobody fights in row G tonight.', best: true },
          { text: 'Leo watching the screen very closely.', outcome: 'Leo blinks. Seats don\'t wait.' },
          { text: 'Walt\'s memory.', outcome: 'Walt is busy shaking hands, and his memory sold G7 twice once already.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'Unit Challenge: the birthday weekend, live.',
    items: [
      {
        kind: 'writeCode',
        prompt: "Step 1, protect: make the data clean (move ticket 226 to 'G8') and add CREATE UNIQUE INDEX one_ticket_per_seat ON tickets (screening_id, seat).",
        starter: '',
        solution: "UPDATE tickets SET seat = 'G8' WHERE id = 226;\nCREATE UNIQUE INDEX one_ticket_per_seat ON tickets (screening_id, seat);\n",
        hint: 'UPDATE first, then CREATE UNIQUE INDEX.',
        database: 'starlight',
        checks: [
          { message: 'Jack moved to G8', outputIncludes: 'UPDATE: 1 row changed' },
          { message: 'The rule is in place', outputIncludes: 'Created index one_ticket_per_seat' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Step 2: the Ortega family wants the last two seats together on Saturday. Why a transaction?',
        options: [
          { text: 'So both seats are booked, or neither is' },
          { text: 'To make it faster', why: 'It\'s about all-or-nothing, not speed.' },
          { text: 'Transactions are needed for every INSERT', why: 'One simple INSERT is its own transaction already.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "Step 2, book: inside one committed transaction, sell Luis Ortega (member 19) seats 'K11' and 'K12' on screening 26 at 25 each.",
        starter: 'BEGIN;\n\nCOMMIT;\n',
        solution: "BEGIN;\nINSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES\n  (26, 19, 'K11', 25), (26, 19, 'K12', 25);\nCOMMIT;\n",
        hint: "Between BEGIN and COMMIT: one INSERT with (26, 19, 'K11', 25), (26, 19, 'K12', 25).",
        database: 'starlight',
        checks: [
          { message: 'Two seats added', outputIncludes: 'INSERT: 2 rows added' },
          { message: 'Committed', outputIncludes: 'Transaction committed' },
          { message: 'Both on screening 26 for member 19', expr: 'SELECT COUNT(*) = 2 FROM tickets WHERE screening_id = 26 AND member_id = 19' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'With the UNIQUE rule in place, two phones send this at the same moment. What happens?',
        code: "INSERT INTO tickets (screening_id, seat, price_paid) VALUES (25, 'H5', 25);\nINSERT INTO tickets (screening_id, seat, price_paid) VALUES (25, 'H5', 25);",
        language: 'sql',
        options: [
          { text: 'Both succeed', why: 'Same screening, same seat: the rule refuses the second.' },
          { text: 'The first succeeds; the second gets UNIQUE constraint failed' },
          { text: 'Both fail', why: 'The first is valid; only the second breaks the rule.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Step 3: Leo fixes the Sunday price to $25. Which line would ruin the bank report?',
        lines: ['SELECT id, price FROM screenings WHERE id = 27;', 'UPDATE screenings SET price = 25;', 'SELECT id, price FROM screenings WHERE id = 27;'],
        bug: 1,
        fix: 'UPDATE screenings SET price = 25 WHERE id = 27;',
        explanation: 'No WHERE: every past screening becomes $25 and the takings history no longer matches its prices.',
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Step 4, check: create the seats_left view (as in lesson 8), book 'A1' on screening 25, then show its remaining seats.",
        starter: '',
        solution: "CREATE VIEW seats_left AS\nSELECT s.id, f.title, s.seats - COUNT(t.id) AS remaining\nFROM screenings s\nJOIN films f ON s.film_id = f.id\nLEFT JOIN tickets t ON t.screening_id = s.id\nGROUP BY s.id;\n\nINSERT INTO tickets (screening_id, seat, price_paid) VALUES (25, 'A1', 25);\nSELECT remaining FROM seats_left WHERE id = 25;\n",
        hint: 'CREATE VIEW …; INSERT …; SELECT remaining FROM seats_left WHERE id = 25;',
        database: 'starlight',
        checks: [
          { message: 'Create the view', outputIncludes: 'Created view seats_left' },
          { message: 'One seat gone: 119 remaining', outputIncludes: 'remaining 119' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool protects which part of the night?',
        groups: ['UNIQUE', 'Transaction', 'REFERENCES'],
        items: [
          { text: 'No seat sold twice', group: 0 },
          { text: 'A family\'s seats: all or none', group: 1 },
          { text: 'No ticket for a show that doesn\'t exist', group: 2 },
          { text: 'No ticket for a member who doesn\'t exist', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: "Ms Delgado's last question: the autumn's takings per film genre, biggest first. f.genre and SUM(t.price_paid) as takings.",
        starter: '',
        solution: 'SELECT f.genre, SUM(t.price_paid) AS takings\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nGROUP BY f.genre\nORDER BY takings DESC;\n',
        hint: 'Two JOINs, GROUP BY f.genre, ORDER BY takings DESC',
        database: 'starlight',
        checks: [
          { message: 'Thrillers took the most', outputIncludes: 'genre | takings Thriller' },
          { message: 'All 8 genres', outputIncludes: '(8 rows)' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the whole course in order: what Juno built, chapter by chapter.',
        lines: ['CREATE TABLE films (…);', "SELECT … WHERE genre = 'Thriller';", 'SELECT … JOIN screenings s ON …;', 'SELECT f.title, SUM(t.price_paid) … GROUP BY f.title;', 'CREATE UNIQUE INDEX one_ticket_per_seat …;'],
        language: 'sql',
      },
      {
        kind: 'fillBlank',
        prompt: 'The app\'s seat map query.',
        template: 'SELECT seat [[1]] tickets [[2]] screening_id = ?;',
        blanks: [['FROM'], ['WHERE']],
        distractors: ['INTO', 'HAVING', 'ON'],
        language: 'sql',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each chapter to what it gave the Starlight.',
        pairs: [
          ['The Shoebox', 'Tables with types and keys'],
          ['Find Me a Seat', 'Questions with WHERE'],
          ['Who Came to What?', 'Joins across tables'],
          ['Prove It to the Bank', 'Honest totals'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'dana',
        message: 'Sold out, no double bookings, numbers the bank believes. I\'ll tell Crane Holdings to look elsewhere.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Good. Get out.', why: 'Dana was right about the old Starlight. A gracious answer wins the night.' },
          { text: 'You were right, a business has to count its seats. Now this one does. Stay for The General?' },
          { text: 'We were always a real business.', why: 'Seven weeks ago they couldn\'t count their own tickets. Dana\'s challenge helped.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "The finale: book 'C3' on screening 25 for Walt's guest (no member, price 0). Then count every ticket as total_tickets.",
        starter: '',
        solution: "INSERT INTO tickets (screening_id, seat, price_paid) VALUES (25, 'C3', 0);\nSELECT COUNT(*) AS total_tickets FROM tickets;\n",
        hint: "INSERT … VALUES (25, 'C3', 0); then SELECT COUNT(*) AS total_tickets FROM tickets;",
        database: 'starlight',
        checks: [
          { message: 'One more ticket', outputIncludes: 'INSERT: 1 row added' },
          { message: '314 in this copy', outputIncludes: 'total_tickets 314' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Walt kept one thing in the lobby as an exhibit: "Where it all began." What is it?',
        answers: ['the shoebox', 'shoebox', 'a shoebox'],
        placeholder: 'One word or two',
      },
    ],
  },
  reflect: {
    prompt: 'Seven weeks ago Juno had a shoebox. You now know enough SQL to build a database for something real. What would you build first, and what would its tables be?',
    starters: ['I would build...', 'Its tables would be...'],
  },
  deepen: {
    title: 'Your own database',
    summary: 'Install DB Browser for SQLite (free) or use SQLite on your computer, and build the Starlight again from Chapter 1, for something of your own: a club, a shop, a collection.',
  },
  notes: 'Course finale. starlight.sql: ticket 226 → G8 clears the duplicate; member 19 = Luis Ortega; screening 25 has 0 tickets, 120 seats → 119 after one booking; genre takings top = Thriller (8 genres sold); 313 + 1 = 314. The "357 of 360 sold" is story narration (the real sales happen in the app), not practice data. DB Browser for SQLite is free and open source (sqlitebrowser.org).',
};

export default lesson;
