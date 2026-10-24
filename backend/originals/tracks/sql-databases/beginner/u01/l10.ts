import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Unit Challenge. Starlight v1: films + screenings for the 100th birthday weekend. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: Starlight v1',
  summary: '7 weeks to the 100th. Ms Delgado visits tomorrow at 10. Tonight Juno builds the real thing: films, screenings, keys, no empty titles, and the 100th birthday weekend on the calendar.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Design and create two linked tables from scratch',
    'Fill them with INSERT and check them with SELECT',
    'Use primary keys and NOT NULL to protect the data',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 11:50 p.m.',
      beats: [
        { speaker: 'narrator', text: 'The last show is over. Leo stacks the chairs in the lobby. Juno opens her laptop on the box-office counter.' },
        { speaker: 'leo', text: 'The bank lady comes at ten. What are you showing her, the shoebox?' },
        { speaker: 'juno', text: 'Version one. Films. Screenings. Every row numbered, nothing missing.' },
        { speaker: 'walt', text: 'And the birthday? Put the birthday in first. Friday the 20th, The General. My grandfather\'s year.' },
        { speaker: 'narrator', text: 'The General, a 1926 silent comedy, with a live pianist. Then Casablanca on the Saturday, The Wizard of Oz on the Sunday afternoon. $25 a seat.' },
      ],
      choice: {
        prompt: 'Juno has one night. What does she build first?',
        options: [
          { text: 'The tables, carefully: keys and NOT NULL first, then the data.', outcome: 'Right. A good shape makes every row after it easier and safer.', best: true },
          { text: 'A booking app with buttons.', outcome: 'An app needs somewhere to keep its data. That\'s tonight\'s job; the app is Chapter 5.' },
          { text: 'Everything in one big table, to save time.', outcome: 'It saves an hour tonight and costs her every week after. One fact, one place.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'Unit Challenge: Starlight v1, before the bank arrives.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which column should be the films table\'s primary key?',
        options: [
          { text: 'title', why: 'Titles can repeat (remakes!) and can be typed wrong.' },
          { text: 'year', why: 'Lots of films share a year.' },
          { text: 'id INTEGER PRIMARY KEY' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Create the films table: id INTEGER PRIMARY KEY, title TEXT NOT NULL, year INTEGER and minutes INTEGER.',
        starter: '',
        solution: 'CREATE TABLE films (\n  id INTEGER PRIMARY KEY,\n  title TEXT NOT NULL,\n  year INTEGER,\n  minutes INTEGER\n);\n',
        hint: 'CREATE TABLE films ( id INTEGER PRIMARY KEY, title TEXT NOT NULL, year INTEGER, minutes INTEGER );',
        checks: [
          { message: 'Create the films table', outputIncludes: 'Created table films' },
          { message: 'id is the primary key', expr: "SELECT pk = 1 FROM pragma_table_info('films') WHERE name = 'id'" },
          { message: 'title can\'t be empty', expr: "SELECT \"notnull\" = 1 FROM pragma_table_info('films') WHERE name = 'title'" },
          { message: 'It has 4 columns', expr: "SELECT COUNT(*) = 4 FROM pragma_table_info('films')" },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'films or screenings?',
        groups: ['films', 'screenings'],
        items: [
          { text: 'The General, 1926', group: 0 },
          { text: 'Fri 20 Nov, 7:30 p.m.', group: 1 },
          { text: '$25 a seat', group: 1 },
          { text: '78 minutes long', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: "Add the birthday film: The General, 1926, 78 minutes. Let the database choose its id.",
        starter: 'CREATE TABLE films (id INTEGER PRIMARY KEY, title TEXT NOT NULL, year INTEGER, minutes INTEGER);\n\n',
        solution: "CREATE TABLE films (id INTEGER PRIMARY KEY, title TEXT NOT NULL, year INTEGER, minutes INTEGER);\n\nINSERT INTO films (title, year, minutes) VALUES ('The General', 1926, 78);\n",
        hint: "Leave id out of the column list: INSERT INTO films (title, year, minutes) VALUES (…);",
        checks: [
          { message: 'Add The General, 1926, 78 minutes', expr: "SELECT COUNT(*) = 1 FROM films WHERE title = 'The General' AND year = 1926 AND minutes = 78" },
          { message: 'Its id was chosen for you (1)', expr: "SELECT id = 1 FROM films WHERE title = 'The General'" },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line will the database refuse?',
        lines: ['CREATE TABLE films (id INTEGER PRIMARY KEY, title TEXT NOT NULL);', "INSERT INTO films (id, title) VALUES (1, 'Casablanca');", "INSERT INTO films (id, title) VALUES (2, 'The Wizard of Oz');", "INSERT INTO films (id, title) VALUES (2, 'The General');"],
        bug: 3,
        fix: "INSERT INTO films (id, title) VALUES (3, 'The General');",
        explanation: 'id 2 is taken. The primary key refuses a second row with it.',
        language: 'sql',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the screenings table.',
        template: 'CREATE TABLE screenings (\n  id INTEGER [[1]] KEY,\n  film_id INTEGER NOT NULL,\n  starts_at [[2]] NOT NULL,\n  price [[3]] NOT NULL\n);',
        blanks: [['PRIMARY'], ['TEXT'], ['REAL']],
        distractors: ['UNIQUE', 'INTEGER', 'DATE'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Create screenings: id INTEGER PRIMARY KEY, film_id INTEGER NOT NULL, starts_at TEXT NOT NULL, price REAL NOT NULL.',
        starter: '',
        solution: 'CREATE TABLE screenings (\n  id INTEGER PRIMARY KEY,\n  film_id INTEGER NOT NULL,\n  starts_at TEXT NOT NULL,\n  price REAL NOT NULL\n);\n',
        hint: 'Four columns. Every one except id gets NOT NULL.',
        checks: [
          { message: 'Create the screenings table', outputIncludes: 'Created table screenings' },
          { message: 'film_id can\'t be empty', expr: "SELECT \"notnull\" = 1 FROM pragma_table_info('screenings') WHERE name = 'film_id'" },
          { message: 'price is REAL and can\'t be empty', expr: "SELECT type = 'REAL' AND \"notnull\" = 1 FROM pragma_table_info('screenings') WHERE name = 'price'" },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'films has Casablanca as id 1. What does this screening mean?',
        code: "INSERT INTO screenings (film_id, starts_at, price)\nVALUES (1, '2026-11-21 19:30', 25.00);",
        language: 'sql',
        options: [
          { text: 'Casablanca, Saturday 21 Nov, 7:30 p.m., $25' },
          { text: 'Screening number 1 of anything', why: 'film_id is which film, not which screening.' },
          { text: 'An error: no title given', why: 'The title lives in films. film_id 1 points at it.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "Add the three birthday screenings at $25: film 3 on '2026-11-20 19:30', film 1 on '2026-11-21 19:30', film 2 on '2026-11-22 14:00'. Then show them.",
        starter: "CREATE TABLE films (id INTEGER PRIMARY KEY, title TEXT NOT NULL, year INTEGER);\nINSERT INTO films (title, year) VALUES ('Casablanca', 1942), ('The Wizard of Oz', 1939), ('The General', 1926);\nCREATE TABLE screenings (id INTEGER PRIMARY KEY, film_id INTEGER NOT NULL, starts_at TEXT NOT NULL, price REAL NOT NULL);\n\n",
        solution: "CREATE TABLE films (id INTEGER PRIMARY KEY, title TEXT NOT NULL, year INTEGER);\nINSERT INTO films (title, year) VALUES ('Casablanca', 1942), ('The Wizard of Oz', 1939), ('The General', 1926);\nCREATE TABLE screenings (id INTEGER PRIMARY KEY, film_id INTEGER NOT NULL, starts_at TEXT NOT NULL, price REAL NOT NULL);\n\nINSERT INTO screenings (film_id, starts_at, price) VALUES\n  (3, '2026-11-20 19:30', 25.00),\n  (1, '2026-11-21 19:30', 25.00),\n  (2, '2026-11-22 14:00', 25.00);\nSELECT * FROM screenings;\n",
        hint: "One INSERT with three rows: (3, '2026-11-20 19:30', 25.00), (1, …), (2, …). Leave id out.",
        checks: [
          { message: 'Add three screenings', outputIncludes: 'INSERT: 3 rows added' },
          { message: 'The General opens the weekend on Friday', expr: "SELECT film_id = 3 FROM screenings WHERE starts_at = '2026-11-20 19:30'" },
          { message: 'Every seat is $25', expr: 'SELECT COUNT(*) = 3 FROM screenings WHERE price = 25' },
          { message: 'Show the screenings', outputIncludes: '(3 rows)' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Juno\'s night in order.',
        lines: ['CREATE TABLE films (…);', 'CREATE TABLE screenings (…);', 'INSERT INTO films (…) VALUES (…);', 'INSERT INTO screenings (…) VALUES (…);', 'SELECT * FROM screenings;'],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'Why does the screening say 3 and not The General? My grandfather would want his film by name.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Numbers are faster for computers.', why: 'True, but that\'s not the point that matters to Walt.' },
          { text: 'It is by name, in one place: films. The 3 points at it, so it can never be misspelled on the birthday weekend.' },
          { text: 'I\'ll change it to the title.', why: 'That breaks one fact, one place.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each protection to what it stops.',
        pairs: [
          ['PRIMARY KEY', 'Two rows with the same id'],
          ['NOT NULL', 'A row with a missing value'],
          ['REAL price', 'Prices written as words'],
          ['film_id', 'Typing the title again and again'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: "Build: show the birthday screenings' times and prices.",
        tiles: ['SELECT', 'starts_at,', 'price', 'FROM', 'screenings;'],
        distractors: ['starts_at', 'films;'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Last check before bed. Run this: the database refuses it, because the film has no title. Fix the INSERT so Casablanca (1942) goes in, and keep title NOT NULL.",
        starter: "CREATE TABLE films (id INTEGER PRIMARY KEY, title TEXT NOT NULL, year INTEGER);\nINSERT INTO films (year) VALUES (1942);\n",
        solution: "CREATE TABLE films (id INTEGER PRIMARY KEY, title TEXT NOT NULL, year INTEGER);\nINSERT INTO films (title, year) VALUES ('Casablanca', 1942);\n",
        hint: "Add title to the column list and 'Casablanca' to the VALUES.",
        checks: [
          { message: 'The film has its title', expr: "SELECT COUNT(*) = 1 FROM films WHERE title = 'Casablanca' AND year = 1942" },
          { message: 'Keep title NOT NULL', expr: "SELECT \"notnull\" = 1 FROM pragma_table_info('films') WHERE name = 'title'" },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The Starlight opened in November 1926. Which birthday does it celebrate on Friday 20 November 2026?',
        answers: ['100', '100th', 'hundredth', 'one hundredth'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'You just designed a database from nothing. Which choice tonight will save Juno the most trouble later, and why?',
    starters: ['The choice that matters most is...', 'Because later...'],
  },
  deepen: {
    title: 'Draw it first',
    summary: 'Before you create tables, sketch them as boxes with their columns and draw an arrow from film_id to films.id. That drawing is called an ER diagram.',
  },
  notes: 'Unit Challenge for Chapter 1. The General (1926, Buster Keaton and Clyde Bruckman) is a silent comedy; runtime varies by print (about 67-79 min), the Starlight\'s print is 78. Birthday prices and times match starlight.sql screenings 25-27.',
};

export default lesson;
