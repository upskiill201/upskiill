import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Tap to explore an INSERT; adding one row and several rows. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'INSERT INTO',
  summary: '7 weeks to the 100th. Monday, before opening. Leo reads the film titles off the old posters in the corridor while Juno types them into the films table.',
  minutes: 11,
  outcomes: [
    'Add a row with INSERT INTO … VALUES',
    'Put text in single quotes and numbers without them',
    'Add several rows in one statement',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: "INSERT INTO films (id, title, year) VALUES (1, 'Casablanca', 1942);",
      hotspots: [
        { phrase: 'INSERT INTO films', note: 'Add a new row to the films table.' },
        { phrase: '(id, title, year)', note: 'The columns you are filling, in this order.' },
        { phrase: 'VALUES', note: 'Here come the values, in the same order as the columns.' },
        { phrase: "'Casablanca'", note: 'Text goes in single quotes. Without them, SQL thinks Casablanca is a column name.' },
        { phrase: '1942', note: 'Numbers go in bare, no quotes.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The first three films',
      code: "CREATE TABLE films (id INTEGER, title TEXT, year INTEGER);\n\nINSERT INTO films (id, title, year) VALUES (1, 'Casablanca', 1942);\nINSERT INTO films (id, title, year) VALUES\n  (2, 'The Wizard of Oz', 1939),\n  (3, 'Vertigo', 1958);\n\nSELECT * FROM films;\n",
      caption: 'One INSERT adds one row. The second adds two: brackets per row, commas between them. Run it.',
      challenge: "Add a fourth film: (4, 'Rear Window', 1954). Put it in the second INSERT, after Vertigo, with a comma.",
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: "Use straight single quotes for text: 'Jaws'. Double quotes mean something else in SQL, and curly quotes from a phone are fixed for you as you type.",
    },
  ],
  apply: {
    scenario: 'Typing the posters into the films table.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which INSERT is written correctly?',
        options: [
          { text: "INSERT INTO films (id, title) VALUES (5, Jaws);", why: 'Jaws is text, so it needs single quotes: \'Jaws\'.' },
          { text: "INSERT INTO films (id, title) VALUES ('5', 'Jaws');", why: '5 is a number, so no quotes. It works in SQLite, but it\'s a bad habit.' },
          { text: "INSERT INTO films (id, title) VALUES (5, 'Jaws');" },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: "Add Jaws (1975) to the films table with id 1. The table is already created for you.",
        starter: 'CREATE TABLE films (id INTEGER, title TEXT, year INTEGER);\n\n',
        solution: "CREATE TABLE films (id INTEGER, title TEXT, year INTEGER);\n\nINSERT INTO films (id, title, year) VALUES (1, 'Jaws', 1975);\n",
        hint: "INSERT INTO films (id, title, year) VALUES (1, 'Jaws', 1975);",
        checks: [
          { message: 'Add one row', outputIncludes: 'INSERT: 1 row added' },
          { message: 'Jaws, 1975, with id 1', expr: "SELECT COUNT(*) = 1 FROM films WHERE id = 1 AND title = 'Jaws' AND year = 1975" },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the INSERT.',
        template: "INSERT [[1]] films (id, title) [[2]] (6, 'Coco');",
        blanks: [['INTO'], ['VALUES']],
        distractors: ['TO', 'VALUE', 'WITH'],
        language: 'sql',
      },
      {
        kind: 'findBug',
        prompt: 'Which line stops this working?',
        lines: ['INSERT INTO films (id, title, year)', "VALUES (7, Alien, 1979);"],
        bug: 1,
        fix: "VALUES (7, 'Alien', 1979);",
        explanation: "Alien is text and needs single quotes. Without them SQL looks for a column called Alien and stops.",
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'After these lines, how many rows are in films?',
        code: "CREATE TABLE films (id INTEGER, title TEXT);\nINSERT INTO films (id, title) VALUES (1, 'Coco');\nINSERT INTO films (id, title) VALUES (2, 'Jaws'), (3, 'Alien');",
        language: 'sql',
        options: [
          { text: '2', why: 'The second INSERT adds two rows, one per bracket.' },
          { text: '3' },
          { text: '1', why: 'Every INSERT here adds rows; count the brackets after VALUES.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "Add two films in ONE statement: (1, 'Coco', 2017) and (2, 'Paddington 2', 2017).",
        starter: 'CREATE TABLE films (id INTEGER, title TEXT, year INTEGER);\n\n',
        solution: "CREATE TABLE films (id INTEGER, title TEXT, year INTEGER);\n\nINSERT INTO films (id, title, year) VALUES\n  (1, 'Coco', 2017),\n  (2, 'Paddington 2', 2017);\n",
        hint: "One INSERT, then VALUES (1, 'Coco', 2017), (2, 'Paddington 2', 2017);",
        checks: [
          { message: 'Add both rows in one statement', outputIncludes: 'INSERT: 2 rows added' },
          { message: 'Both films are there', expr: "SELECT COUNT(*) = 2 FROM films WHERE year = 2017" },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the lines in order: make the table, add a film, check it.',
        lines: ['CREATE TABLE films (id INTEGER, title TEXT);', "INSERT INTO films (id, title) VALUES (1, 'Vertigo');", 'SELECT * FROM films;'],
        language: 'sql',
      },
      {
        kind: 'matchPairs',
        prompt: 'Quotes or no quotes?',
        pairs: [
          ["'Roman Holiday'", 'Text: single quotes'],
          ['1953', 'A number: no quotes'],
          ['title', 'A column name: no quotes'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: "I typed INSERT INTO films VALUES ('Jaws', 1, 1975) and it went in. Done?",
        prompt: 'Juno\'s best reply?',
        options: [
          { text: "Not quite. Without the column list, the values go in the table's order: id, title, year. You just made a film called 1 with the id Jaws." },
          { text: 'Done. SQL would have stopped you if it was wrong.', why: 'SQLite is forgiving about types, so it took the wrong order without a word.' },
          { text: 'Type it again louder.', why: 'Leo would enjoy that, but it won\'t fix the order.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: "Build: add Spirited Away (2001) with id 10.",
        tiles: ['INSERT INTO', 'films (id, title, year)', 'VALUES', "(10, 'Spirited Away', 2001);"],
        distractors: ['(10, Spirited Away, 2001);', 'SELECT'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Add Rear Window (1954) with id 4, then show the whole films table.",
        starter: 'CREATE TABLE films (id INTEGER, title TEXT, year INTEGER);\n',
        solution: "CREATE TABLE films (id INTEGER, title TEXT, year INTEGER);\nINSERT INTO films (id, title, year) VALUES (4, 'Rear Window', 1954);\nSELECT * FROM films;\n",
        hint: "INSERT first, then SELECT * FROM films;",
        checks: [
          { message: 'Rear Window is in the table', outputIncludes: 'Rear Window | 1954' },
          { message: 'Show the table with SELECT', outputIncludes: '(1 row)' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Typing data in by hand is slow and easy to get wrong. What could Juno do to make fewer mistakes as she types 300 bookings?',
    starters: ['She could...', 'The mistake I\'d worry about is...'],
  },
  deepen: {
    title: 'The column list is your seatbelt',
    summary: 'You can leave out the column list, but always write it. If someone adds a column to the table later, your INSERT still puts every value in the right place.',
  },
  notes: 'Film years: Casablanca 1942, The Wizard of Oz 1939, Vertigo 1958, Rear Window 1954, Jaws 1975, Coco 2017, Paddington 2 2017, Alien 1979, Spirited Away 2001, Roman Holiday 1953. SQLite uses type affinity, so a TEXT value in an INTEGER column is stored without an error (sqlite.org/datatype3.html).',
};

export default lesson;
