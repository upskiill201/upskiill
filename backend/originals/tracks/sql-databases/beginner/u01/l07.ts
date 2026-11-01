import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Reading: database design. Films vs screenings, never repeat a film's details. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'One table or two?',
  summary: '7 weeks to the 100th. Arjun asks where the showtimes go. Juno\'s plan is to add them to the films table. Arjun asks how many times Casablanca will be typed.',
  minutes: 11,
  outcomes: [
    'Spot data that repeats in a table',
    'Split it into two tables linked by an id',
    'Create a screenings table that points at films',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Type it once',
      html: '<p>Casablanca plays on Fri 4 Sep, Fri 2 Oct and on the 100th birthday. Juno\'s first idea is one big table:</p><p><code>title | year | starts_at | price</code></p><p>So "Casablanca, 1942" gets typed three times. Type it as "Cassablanca" once, and the database thinks there are two films. That\'s exactly what happened in the shoebox.</p><p><strong>The fix: two tables.</strong> <code>films</code> holds each film once. <code>screenings</code> holds each showing, and instead of the title it stores the film\'s <strong>id</strong>:</p><p><code>screenings: id | film_id | starts_at | price</code></p><p>A screening with <code>film_id = 1</code> means "film number 1", Casablanca. Fix a typo in films and every screening is right at once.</p><p>Designers call this rule <strong>"one fact, one place"</strong>. You\'ll join the tables back together in Chapter 3.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Two tables, one link',
      code: "CREATE TABLE films (id INTEGER, title TEXT, year INTEGER);\nCREATE TABLE screenings (id INTEGER, film_id INTEGER, starts_at TEXT, price REAL);\n\nINSERT INTO films (id, title, year) VALUES (1, 'Casablanca', 1942);\nINSERT INTO screenings (id, film_id, starts_at, price) VALUES\n  (1, 1, '2026-09-04 19:30', 14.00),\n  (2, 1, '2026-10-02 19:30', 14.00);\n\nSELECT * FROM screenings;\n",
      caption: 'Two screenings, and the title typed once. film_id 1 points at Casablanca. Run it.',
      challenge: "Add a third screening of film 1: (3, 1, '2026-11-21 19:30', 25.00).",
    },
  ],
  apply: {
    scenario: 'Designing the Starlight\'s tables with Arjun.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why not store the film\'s title on every screening?',
        options: [
          { text: 'Titles are too long', why: 'Length isn\'t the problem. Repeating it is.' },
          { text: 'The same fact typed many times will end up typed differently somewhere' },
          { text: 'SQL can\'t store text in two tables', why: 'It can. It just shouldn\'t have to.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which table does each column belong in?',
        groups: ['films', 'screenings'],
        items: [
          { text: 'title', group: 0 },
          { text: 'starts_at', group: 1 },
          { text: 'year', group: 0 },
          { text: 'price', group: 1 },
          { text: 'film_id', group: 1 },
          { text: 'minutes', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Create the screenings table: id INTEGER, film_id INTEGER, starts_at TEXT and price REAL.',
        starter: '',
        solution: 'CREATE TABLE screenings (\n  id INTEGER,\n  film_id INTEGER,\n  starts_at TEXT,\n  price REAL\n);\n',
        hint: 'CREATE TABLE screenings ( … ); with the four columns, commas between them.',
        checks: [
          { message: 'Create a table called screenings', outputIncludes: 'Created table screenings' },
          { message: 'Give it a film_id INTEGER column', expr: "SELECT type = 'INTEGER' FROM pragma_table_info('screenings') WHERE name = 'film_id'" },
          { message: 'Make price REAL', expr: "SELECT type = 'REAL' FROM pragma_table_info('screenings') WHERE name = 'price'" },
        ],
      },
      {
        kind: 'mcq',
        prompt: "In screenings, a row has film_id = 3. What does that mean?",
        options: [
          { text: 'It\'s the third screening', why: 'That would be its own id. film_id points at a film.' },
          { text: 'Three people booked', why: 'Bookings are a different table.' },
          { text: 'It\'s a showing of the film whose id is 3' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Add a screening of film 2 on Sat 5 Sep at 2 p.m. for $9.',
        template: "INSERT INTO screenings (id, film_id, starts_at, price)\nVALUES (5, [[1]], '2026-09-05 14:00', [[2]]);",
        blanks: [['2'], ['9', '9.00', '9.0']],
        distractors: ["'2'", '$9'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Casablanca (film 1) is already in films. Add a screening for it: id 1, '2026-10-02 19:30', price 14.00. Then show screenings.",
        starter: "CREATE TABLE films (id INTEGER, title TEXT, year INTEGER);\nCREATE TABLE screenings (id INTEGER, film_id INTEGER, starts_at TEXT, price REAL);\nINSERT INTO films (id, title, year) VALUES (1, 'Casablanca', 1942);\n\n",
        solution: "CREATE TABLE films (id INTEGER, title TEXT, year INTEGER);\nCREATE TABLE screenings (id INTEGER, film_id INTEGER, starts_at TEXT, price REAL);\nINSERT INTO films (id, title, year) VALUES (1, 'Casablanca', 1942);\n\nINSERT INTO screenings (id, film_id, starts_at, price) VALUES (1, 1, '2026-10-02 19:30', 14.00);\nSELECT * FROM screenings;\n",
        hint: "INSERT INTO screenings (id, film_id, starts_at, price) VALUES (1, 1, '2026-10-02 19:30', 14.00);",
        checks: [
          { message: 'The screening points at film 1', expr: "SELECT COUNT(*) = 1 FROM screenings WHERE film_id = 1 AND starts_at = '2026-10-02 19:30'" },
          { message: 'Show the screenings table', outputIncludes: '(1 row)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the design problem: which column breaks "one fact, one place"?',
        lines: ['screenings: id', 'screenings: film_id', 'screenings: film_title', 'screenings: starts_at'],
        bug: 2,
        fix: '(remove it: the title lives in films)',
        explanation: 'film_id already says which film it is. Storing the title too means typing it again, and one day it won\'t match.',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Quick test. Walt renames "The Wizard of Oz" to "Wizard of Oz" on the posters. How many rows do you change?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Every screening of it, one by one.', why: 'Only if the title were stored on every screening. It isn\'t.' },
          { text: 'One. The title lives in films, once. Every screening just points at it.' },
          { text: 'None, titles can\'t change.', why: 'They can. One UPDATE in one row, which you\'ll learn in Chapter 5.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the columns of a good screenings table.',
        tiles: ['id INTEGER,', 'film_id INTEGER,', 'starts_at TEXT,', 'price REAL'],
        distractors: ['title TEXT,', 'year INTEGER,'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: "What's the name of the column in screenings that points at a film?",
        answers: ['film_id'],
        placeholder: 'A column name',
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you write down again and again (an address, a name, a price). Where could it live once instead?',
    starters: ['I keep writing...', 'It could live...'],
  },
  deepen: {
    title: 'Normalisation',
    summary: '"One fact, one place" has a formal name: normalisation. Look up "first normal form" when you\'re curious; the idea is exactly this lesson.',
  },
  notes: 'Design principle: normalisation (avoid repeating data across rows). Screening dates match starlight.sql: Casablanca on 2026-09-04 19:30, 2026-10-02 19:30 and 2026-11-21 19:30.',
};

export default lesson;
