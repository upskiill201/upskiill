import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Myth or Fact opener: ids and INTEGER PRIMARY KEY. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Every row needs an id',
  summary: '7 weeks to the 100th. Walt says every regular is "Rosa from row G" or "Tom who likes Jaws". Two Toms book the same night. Juno gives every row a number nobody can mix up.',
  minutes: 10,
  outcomes: [
    'Explain why every row needs a unique id',
    'Make an id column with INTEGER PRIMARY KEY',
    'Let the database number new rows for you',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'A person\'s name is a safe way to tell rows apart.', isFact: false, explain: 'Two members can share a name. Chicago has plenty of Tom Beckers.' },
        { text: 'A primary key is a column whose value is different in every row.', isFact: true, explain: 'That\'s exactly it. It\'s how the database (and other tables) point at one row.' },
        { text: 'You have to choose every id number yourself.', isFact: false, explain: 'With INTEGER PRIMARY KEY, SQLite picks the next number when you leave the id out.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>Mark the id column as the table\'s <strong>primary key</strong>:</p><p><code>id INTEGER PRIMARY KEY</code></p><p>Now the database refuses two rows with the same id, and if you leave the id out of an INSERT, it gives the row the next free number: 1, 2, 3…</p>',
    },
    {
      kind: 'tryIt',
      title: 'Numbers you don\'t have to choose',
      code: "CREATE TABLE members (\n  id INTEGER PRIMARY KEY,\n  name TEXT\n);\n\nINSERT INTO members (name) VALUES ('Tom Becker');\nINSERT INTO members (name) VALUES ('Tom Becker');\n\nSELECT * FROM members;\n",
      caption: 'Two Toms, no ids typed. Run it: SQLite numbers them 1 and 2, so they can never be mixed up.',
      challenge: "Add a third member, 'Aiko Tanaka'. What id does she get?",
    },
    {
      kind: 'tryIt',
      title: 'The database says no',
      code: "CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT);\n\nINSERT INTO members (id, name) VALUES (1, 'Rosa Marin');\nINSERT INTO members (id, name) VALUES (1, 'Jack Murphy');\n",
      caption: 'Two rows with id 1. Run it and read the error: the database stops the second one. That\'s the protection the shoebox never had.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'Giving every Starlight row a number.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a primary key?',
        options: [
          { text: 'The most important column, like the title', why: 'It\'s not about importance. It\'s about being unique.' },
          { text: 'A password for the table', why: 'Nothing to do with security.' },
          { text: 'A column whose value is different in every row, so each row can be found exactly' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Create a members table with id INTEGER PRIMARY KEY and name TEXT.',
        starter: '',
        solution: 'CREATE TABLE members (\n  id INTEGER PRIMARY KEY,\n  name TEXT\n);\n',
        hint: 'CREATE TABLE members ( id INTEGER PRIMARY KEY, name TEXT );',
        checks: [
          { message: 'Create a table called members', outputIncludes: 'Created table members' },
          { message: 'Make id the primary key', expr: "SELECT pk = 1 FROM pragma_table_info('members') WHERE name = 'id'" },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Make id the films table\'s primary key.',
        template: 'CREATE TABLE films (\n  id INTEGER [[1]] [[2]],\n  title TEXT\n);',
        blanks: [['PRIMARY'], ['KEY']],
        distractors: ['UNIQUE', 'MAIN', 'ID'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What id does Coco get?',
        code: "CREATE TABLE films (id INTEGER PRIMARY KEY, title TEXT);\nINSERT INTO films (title) VALUES ('Jaws');\nINSERT INTO films (title) VALUES ('Alien');\nINSERT INTO films (title) VALUES ('Coco');",
        language: 'sql',
        options: [
          { text: '3' },
          { text: '0', why: 'SQLite starts at 1.' },
          { text: 'NULL', why: 'An INTEGER PRIMARY KEY is filled in for you when you leave it out.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "The table is ready. Add two members WITHOUT typing ids: 'Rosa Marin' and 'Jack Murphy'. Then show the table.",
        starter: 'CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT);\n\n',
        solution: "CREATE TABLE members (id INTEGER PRIMARY KEY, name TEXT);\n\nINSERT INTO members (name) VALUES ('Rosa Marin'), ('Jack Murphy');\nSELECT * FROM members;\n",
        hint: "List only the name column: INSERT INTO members (name) VALUES ('Rosa Marin'), ('Jack Murphy');",
        checks: [
          { message: 'Jack gets id 2 by himself', outputIncludes: '2 | Jack Murphy' },
          { message: 'Don\'t type the ids', codeIncludes: 'members (name)' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good primary key, or not?',
        groups: ['Good primary key', 'Not unique enough'],
        items: [
          { text: 'id: 1, 2, 3…', group: 0 },
          { text: 'name', group: 1 },
          { text: 'city', group: 1 },
          { text: 'ticket number printed on the stub', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This will fail. Which line?',
        lines: ['CREATE TABLE films (id INTEGER PRIMARY KEY, title TEXT);', "INSERT INTO films (id, title) VALUES (7, 'Jaws');", "INSERT INTO films (id, title) VALUES (7, 'Alien');"],
        bug: 2,
        fix: "INSERT INTO films (id, title) VALUES (8, 'Alien');",
        explanation: 'id 7 is already taken by Jaws. A primary key can\'t repeat, so the database refuses the row.',
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'Numbers? My regulars aren\'t numbers, Juno. They\'re people.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'They\'re still people. The number just makes sure Rosa\'s seat never goes to someone else.' },
          { text: 'In a database, everyone\'s a number.', why: 'True-ish, but Walt will hear "cold". The id is there to protect them.' },
          { text: 'We\'ll use their names as ids.', why: 'Names repeat. That\'s how the trouble started.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the id column of a new table.',
        tiles: ['id', 'INTEGER', 'PRIMARY', 'KEY'],
        distractors: ['TEXT', 'UNIQUE NAME'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'You INSERT a film without an id into a table that has 14 films with ids 1 to 14. What id does it get?',
        answers: ['15'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Where in real life are you "a number" for good reason: a student number, an order number, a passport? What would go wrong without it?',
    starters: ['I\'m a number at...', 'Without it...'],
  },
  deepen: {
    title: 'How SQLite picks the next id',
    summary: 'An INTEGER PRIMARY KEY becomes the row\'s rowid. Leave it out and SQLite uses one more than the largest id in the table.',
  },
  notes: 'SQLite: a column declared INTEGER PRIMARY KEY is an alias for the rowid; on insert without a value it uses max(rowid)+1 (sqlite.org/lang_createtable.html#rowid, sqlite.org/autoinc.html).',
};

export default lesson;
