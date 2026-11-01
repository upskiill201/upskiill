import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Walkthrough: REFERENCES (foreign key constraints) that refuse broken links. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Foreign keys that say no',
  summary: 'The 100th birthday. Leo\'s test booking points at screening 99. There is no screening 99. In the shoebox, a card for a show that doesn\'t exist would just sit there. The database says no.',
  minutes: 11,
  outcomes: [
    'Declare a foreign key with REFERENCES',
    'Read a FOREIGN KEY constraint failed error',
    'Know why SQLite apps switch foreign keys on',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From a number to a promise',
      steps: [
        { title: 'A plain number', body: 'In Chapter 1, film_id was just an INTEGER. Nothing stopped film_id = 99.', code: 'film_id INTEGER NOT NULL', language: 'sql' },
        { title: 'A foreign key', body: 'REFERENCES says this column must hold an id that exists in films.', code: 'film_id INTEGER NOT NULL REFERENCES films(id)', language: 'sql' },
        { title: 'Switched on', body: 'SQLite checks foreign keys only when the app asks. Every Teyro pad (and every good app) runs this first.', code: 'PRAGMA foreign_keys = ON;', language: 'sql' },
        { title: 'The database says no', body: 'A ticket for screening 99 is refused. So is deleting a screening that still has tickets.', code: "INSERT INTO tickets (screening_id, seat, price_paid)\nVALUES (99, 'A1', 25);\n-- FOREIGN KEY constraint failed", language: 'sql' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Screening 99',
      database: 'starlight',
      code: "INSERT INTO tickets (screening_id, member_id, seat, price_paid)\nVALUES (99, 2, 'A1', 25);\n",
      caption: 'The Starlight\'s tickets table says screening_id REFERENCES screenings(id). Run it and read the error.',
      challenge: 'Change 99 to 25, the real birthday opener. Now it goes in.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'Links that can\'t break.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does REFERENCES screenings(id) promise?',
        options: [
          { text: 'Every screening_id matches a real screening\'s id' },
          { text: 'screening_id is unique', why: 'Many tickets share a screening. REFERENCES is about existing, not unique.' },
          { text: 'screening_id can never be NULL', why: 'That\'s NOT NULL. A foreign key can be NULL (like member_id for walk-ins).' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "Create a snack_orders table: id INTEGER PRIMARY KEY, ticket_id INTEGER NOT NULL REFERENCES tickets(id), item TEXT NOT NULL.",
        starter: '',
        solution: 'CREATE TABLE snack_orders (\n  id INTEGER PRIMARY KEY,\n  ticket_id INTEGER NOT NULL REFERENCES tickets(id),\n  item TEXT NOT NULL\n);\n',
        hint: 'ticket_id INTEGER NOT NULL REFERENCES tickets(id)',
        database: 'starlight',
        checks: [
          { message: 'Create snack_orders', outputIncludes: 'Created table snack_orders' },
          { message: 'ticket_id points at tickets', expr: "SELECT COUNT(*) = 1 FROM pragma_foreign_key_list('snack_orders') WHERE \"table\" = 'tickets' AND \"from\" = 'ticket_id'" },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Point screenings at films.',
        template: 'film_id INTEGER NOT NULL [[1]] films([[2]])',
        blanks: [['REFERENCES'], ['id']],
        distractors: ['POINTS', 'film_id', 'FOREIGN'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Screening 17 has 20 tickets. What happens?',
        code: 'DELETE FROM screenings WHERE id = 17;',
        language: 'sql',
        options: [
          { text: 'Screening 17 is deleted, tickets stay', why: 'Then 20 tickets would point at nothing. The foreign key refuses.' },
          { text: 'Everything about screening 17 is deleted', why: 'Only with ON DELETE CASCADE, which the Starlight doesn\'t use.' },
          { text: 'An error: FOREIGN KEY constraint failed' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: "Fix Leo's test booking: it says screening 99. Make it the real birthday opener, screening 25, for member 2, seat 'A1', price_paid 25.",
        starter: "INSERT INTO tickets (screening_id, member_id, seat, price_paid)\nVALUES (99, 2, 'A1', 25);\n",
        solution: "INSERT INTO tickets (screening_id, member_id, seat, price_paid)\nVALUES (25, 2, 'A1', 25);\n",
        hint: 'Change 99 to 25.',
        database: 'starlight',
        checks: [
          { message: 'The booking goes in', outputIncludes: 'INSERT: 1 row added' },
          { message: 'It points at screening 25', expr: "SELECT COUNT(*) = 1 FROM tickets WHERE screening_id = 25 AND seat = 'A1'" },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which INSERT will the database refuse? (There are 40 members.)',
        lines: ["INSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES (25, 1, 'B1', 25);", "INSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES (25, NULL, 'B2', 25);", "INSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES (25, 41, 'B3', 25);"],
        bug: 2,
        fix: "… VALUES (25, NULL, 'B3', 25);  -- or a real member",
        explanation: 'There is no member 41. NULL is allowed (a walk-in), but a number must point at a real member.',
        language: 'sql',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the error to its cause.',
        pairs: [
          ['FOREIGN KEY constraint failed', 'Points at a row that doesn\'t exist'],
          ['UNIQUE constraint failed', 'A duplicate where only one is allowed'],
          ['NOT NULL constraint failed', 'A required value is missing'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Try deleting screening 25 (the birthday opener) after booking a ticket on it. Read the error, then delete the ticket first, then the screening.',
        starter: "INSERT INTO tickets (screening_id, seat, price_paid) VALUES (25, 'C1', 25);\nDELETE FROM screenings WHERE id = 25;\n",
        solution: "INSERT INTO tickets (screening_id, seat, price_paid) VALUES (25, 'C1', 25);\nDELETE FROM tickets WHERE screening_id = 25;\nDELETE FROM screenings WHERE id = 25;\n",
        hint: 'Add DELETE FROM tickets WHERE screening_id = 25; before deleting the screening.',
        database: 'starlight',
        checks: [
          { message: 'The screening is gone', expr: 'SELECT COUNT(*) = 0 FROM screenings WHERE id = 25' },
          { message: 'No ticket points at it', expr: 'SELECT COUNT(*) = 0 FROM tickets WHERE screening_id = 25' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'The database keeps telling me no. Can we turn foreign keys off?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Sure, just for today.', why: '"Just for today" is how the shoebox happened.' },
          { text: 'Every no is a mistake it caught before a customer did. Read the error: it\'s telling you what to fix.' },
          { text: 'They can\'t be turned off.', why: 'In SQLite they can, which is why apps switch them on.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 3 review: join tickets to screenings.',
        tiles: ['FROM tickets t', 'JOIN screenings s', 'ON t.screening_id = s.id'],
        distractors: ['ON t.id = s.film_id', 'LEFT'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word declares a foreign key on a column?',
        answers: ['REFERENCES'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Where in your life does a "link" break silently: a bookmark to a dead page, a contact whose number changed? What would a "foreign key" for it look like?',
    starters: ['A link that breaks is...', 'A rule that would catch it...'],
  },
  deepen: {
    title: 'ON DELETE CASCADE',
    summary: 'REFERENCES screenings(id) ON DELETE CASCADE deletes the tickets automatically with their screening. Powerful, and dangerous: use it only when the children truly can\'t exist alone.',
  },
  notes: 'starlight.sql declares tickets.screening_id REFERENCES screenings(id), tickets.member_id REFERENCES members(id), screenings.film_id REFERENCES films(id). SQLite enforces foreign keys only with PRAGMA foreign_keys = ON (sqlite.org/foreignkeys.html); the Teyro runner and verifier turn it on.',
};

export default lesson;
