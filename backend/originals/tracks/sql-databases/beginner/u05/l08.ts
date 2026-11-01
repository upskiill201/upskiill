import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Card deck: CREATE VIEW, a saved query the box-office screen reads. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'A view for the box office',
  summary: 'The 100th birthday. The box-office tablet needs one screen: each birthday show, and how many seats are left. The query is ten lines long. Walt will never type it. He won\'t have to.',
  minutes: 11,
  outcomes: [
    'Save a query as a view with CREATE VIEW',
    'Read a view like a table',
    'Build a "seats left" view with a LEFT JOIN and COUNT',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>A <strong>view</strong> is a saved SELECT with a name. It stores no data of its own: every time you read it, it runs its query on the latest rows.</p><p><code>CREATE VIEW birthday AS SELECT … ;</code><br><code>SELECT * FROM birthday;</code></p>',
    },
    {
      kind: 'text',
      html: '<p>Views keep long queries in one place. The tablet, the website and the weekly report can all read <code>seats_left</code>, and if the rule for "seats left" changes, you fix it once.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Seats left',
      database: 'starlight',
      code: "CREATE VIEW seats_left AS\nSELECT s.id, f.title, s.starts_at,\n       s.seats - COUNT(t.id) AS remaining\nFROM screenings s\nJOIN films f ON s.film_id = f.id\nLEFT JOIN tickets t ON t.screening_id = s.id\nGROUP BY s.id;\n\nSELECT * FROM seats_left WHERE starts_at >= '2026-11-01';\n",
      caption: 'The view counts sold tickets per screening and takes them from 120. Run it: all three birthday shows have 120 left.',
      challenge: "Before the SELECT, sell a seat: INSERT INTO tickets (screening_id, seat, price_paid) VALUES (25, 'A1', 25); Watch Friday drop to 119.",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'COUNT(t.id), not COUNT(*): with LEFT JOIN, a screening with no tickets still has one row, and COUNT(*) would count it as 1 sold.',
    },
  ],
  apply: {
    scenario: 'The box-office screen.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a view?',
        options: [
          { text: 'A copy of a table', why: 'It holds no data. It runs its query fresh each time.' },
          { text: 'A saved query you can SELECT from like a table' },
          { text: 'A chart', why: 'It\'s rows, like any table.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "Create a view called birthday: the id, title and starts_at of screenings from '2026-11-01' on, joined to films. Then SELECT * FROM birthday.",
        starter: 'CREATE VIEW birthday AS\n',
        solution: "CREATE VIEW birthday AS\nSELECT s.id, f.title, s.starts_at\nFROM screenings s\nJOIN films f ON s.film_id = f.id\nWHERE s.starts_at >= '2026-11-01';\n\nSELECT * FROM birthday;\n",
        hint: "CREATE VIEW birthday AS SELECT … JOIN films … WHERE s.starts_at >= '2026-11-01'; then SELECT * FROM birthday;",
        database: 'starlight',
        checks: [
          { message: 'Create the view', outputIncludes: 'Created view birthday' },
          { message: 'The General opens the weekend', outputIncludes: '25 | The General' },
          { message: 'Three shows', outputIncludes: '(3 rows)' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Save a query as a view.',
        template: "CREATE [[1]] members_no_email [[2]]\nSELECT name, city FROM members WHERE email IS NULL;",
        blanks: [['VIEW'], ['AS']],
        distractors: ['TABLE', 'INTO', 'FROM'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'After this, what does the view show for screening 26?',
        code: "CREATE VIEW sold AS\nSELECT screening_id, COUNT(*) AS n FROM tickets GROUP BY screening_id;\nINSERT INTO tickets (screening_id, seat, price_paid) VALUES (26, 'G7', 25);\nSELECT n FROM sold WHERE screening_id = 26;",
        language: 'sql',
        options: [
          { text: 'Nothing: the view was made before the ticket', why: 'A view runs fresh each time, so it sees the new ticket.' },
          { text: 'An error', why: 'Reading a view after an INSERT is fine.' },
          { text: '1' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: "Finish the seats_left view (LEFT JOIN tickets, GROUP BY s.id). Then show remaining for Casablanca night, id 17.",
        starter: 'CREATE VIEW seats_left AS\nSELECT s.id, f.title, s.starts_at,\n       s.seats - COUNT(t.id) AS remaining\nFROM screenings s\nJOIN films f ON s.film_id = f.id\n',
        solution: 'CREATE VIEW seats_left AS\nSELECT s.id, f.title, s.starts_at,\n       s.seats - COUNT(t.id) AS remaining\nFROM screenings s\nJOIN films f ON s.film_id = f.id\nLEFT JOIN tickets t ON t.screening_id = s.id\nGROUP BY s.id;\n\nSELECT remaining FROM seats_left WHERE id = 17;\n',
        hint: 'Add LEFT JOIN tickets t ON t.screening_id = s.id GROUP BY s.id; then the SELECT.',
        database: 'starlight',
        checks: [
          { message: 'Create the view', outputIncludes: 'Created view seats_left' },
          { message: '100 seats were left on Casablanca night', outputIncludes: 'remaining 100' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The birthday shows say 119 left, but nothing is sold. Which line?',
        lines: ['CREATE VIEW seats_left AS', 'SELECT s.id, s.seats - COUNT(*) AS remaining', 'FROM screenings s', 'LEFT JOIN tickets t ON t.screening_id = s.id', 'GROUP BY s.id;'],
        bug: 1,
        fix: 'SELECT s.id, s.seats - COUNT(t.id) AS remaining',
        explanation: 'With a LEFT JOIN, an unsold screening still has one row with NULLs. COUNT(*) counts it; COUNT(t.id) skips the NULL.',
        language: 'sql',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good job for a view, or not?',
        groups: ['Good view', 'Not a view\'s job'],
        items: [
          { text: 'Seats left per screening', group: 0 },
          { text: 'Tonight\'s list for the usher', group: 0 },
          { text: 'Selling a ticket', group: 1 },
          { text: 'Changing a price', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'So I just tap "seats left" and it\'s always right?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Only if I update it every night.', why: 'A view updates itself: it runs its query fresh every time.' },
          { text: 'Always. The view counts the tickets the moment you look. Sell a seat, and it\'s one less straight away.' },
          { text: 'It\'s right once a day.', why: 'It\'s right every time it\'s read.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 4 review: tickets sold per screening.',
        tiles: ['SELECT screening_id, COUNT(*) AS sold', 'FROM tickets', 'GROUP BY screening_id;'],
        distractors: ['ORDER BY screening_id;', 'WHERE COUNT(*)'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which two words save a query with a name?',
        answers: ['CREATE VIEW'],
        placeholder: 'Two words',
      },
    ],
  },
  reflect: {
    prompt: 'Which question do you ask again and again that deserves a "saved view": your weekly budget left, your next three deadlines? What would it show?',
    starters: ['I keep asking...', 'My view would show...'],
  },
  deepen: {
    title: 'Views in apps',
    summary: 'Apps often read views instead of raw tables, so the screen\'s query lives in the database where everyone can reuse it.',
  },
  notes: 'starlight.sql: every screening has seats = 120; screening 17 sold 20 → 100 left; birthday screenings 25-27 have 0 sold → 120 left.',
};

export default lesson;
