import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Card deck: NULL (missing values), leaving columns out, NOT NULL. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Empty is not zero',
  summary: '7 weeks to the 100th. Ms Delgado from Lakeview Community Bank sends her checklist. Line 3: "No missing amounts." Ellen\'s card has no seat. What does a database do with nothing?',
  minutes: 10,
  outcomes: [
    'Explain what NULL means',
    'See NULL appear when a column is left out',
    'Stop a column ever being empty with NOT NULL',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Ellen Novak\'s card has no seat written on it. In a database, a value that is missing is <strong>NULL</strong>.</p><p>NULL is not 0 and not an empty word. It means <strong>"we don\'t know"</strong>. A free ticket costs 0, which is known. A ticket whose price nobody wrote down is NULL.</p>',
    },
    {
      kind: 'text',
      html: '<p>Leave a column out of an INSERT and it becomes NULL:</p><p><code>INSERT INTO films (id, title) VALUES (15, \'The General\');</code></p><p>No year given, so year is NULL. Sometimes that\'s fine. For a title, it never is.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Watch NULL appear',
      code: "CREATE TABLE films (id INTEGER PRIMARY KEY, title TEXT, year INTEGER);\n\nINSERT INTO films (title, year) VALUES ('Casablanca', 1942);\nINSERT INTO films (title) VALUES ('The General');\n\nSELECT * FROM films;\n",
      caption: 'The General was added without a year. Run it and look at its year.',
      challenge: "Give The General its year: add year to the column list and 1926 to its VALUES.",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Add NOT NULL after a column\'s type, like title TEXT NOT NULL, and the database refuses any row without one.',
    },
    {
      kind: 'tryIt',
      title: 'NOT NULL says no',
      code: "CREATE TABLE films (\n  id INTEGER PRIMARY KEY,\n  title TEXT NOT NULL,\n  year INTEGER\n);\n\nINSERT INTO films (year) VALUES (1926);\n",
      caption: 'A film with a year but no title. Run it and read what the database says.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'Ms Delgado\'s checklist: no missing amounts.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does NULL mean?',
        options: [
          { text: 'Zero', why: 'Zero is a known value. A free ticket costs 0.' },
          { text: 'The value is missing: we don\'t know it' },
          { text: 'An error', why: 'NULL is allowed unless you say NOT NULL. It just means missing.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'NULL or a real value?',
        groups: ['NULL (unknown)', 'A known value'],
        items: [
          { text: 'A free ticket\'s price', group: 1 },
          { text: 'A seat nobody wrote down', group: 0 },
          { text: 'A member with no email given', group: 0 },
          { text: '0 tickets sold so far', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: "Add The General WITHOUT a year (title only), then show the films table. You should see NULL.",
        starter: 'CREATE TABLE films (id INTEGER PRIMARY KEY, title TEXT, year INTEGER);\n\n',
        solution: "CREATE TABLE films (id INTEGER PRIMARY KEY, title TEXT, year INTEGER);\n\nINSERT INTO films (title) VALUES ('The General');\nSELECT * FROM films;\n",
        hint: "INSERT INTO films (title) VALUES ('The General'); then SELECT * FROM films;",
        checks: [
          { message: 'The General\'s year shows NULL', outputIncludes: 'The General | NULL' },
          { message: 'Show the table', outputIncludes: '(1 row)' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: "What is Vertigo's year after this?",
        code: "CREATE TABLE films (id INTEGER PRIMARY KEY, title TEXT, year INTEGER);\nINSERT INTO films (title) VALUES ('Vertigo');",
        language: 'sql',
        options: [
          { text: '0', why: 'Nothing was given, and nothing isn\'t 0.' },
          { text: 'An empty word', why: 'Text and numbers aren\'t made up. It\'s simply missing.' },
          { text: 'NULL' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make sure a film can never be saved without a title.',
        template: 'CREATE TABLE films (\n  id INTEGER PRIMARY KEY,\n  title TEXT [[1]] [[2]]\n);',
        blanks: [['NOT'], ['NULL']],
        distractors: ['EMPTY', 'ZERO', 'NO'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Create a screenings table where starts_at and price can never be empty: id INTEGER PRIMARY KEY, starts_at TEXT NOT NULL, price REAL NOT NULL.',
        starter: 'CREATE TABLE screenings (\n  id INTEGER PRIMARY KEY,\n\n);\n',
        solution: 'CREATE TABLE screenings (\n  id INTEGER PRIMARY KEY,\n  starts_at TEXT NOT NULL,\n  price REAL NOT NULL\n);\n',
        hint: 'Add NOT NULL after each type: starts_at TEXT NOT NULL, price REAL NOT NULL',
        checks: [
          { message: 'Create the screenings table', outputIncludes: 'Created table screenings' },
          { message: 'price can\'t be empty', expr: "SELECT \"notnull\" = 1 FROM pragma_table_info('screenings') WHERE name = 'price'" },
          { message: 'starts_at can\'t be empty', expr: "SELECT \"notnull\" = 1 FROM pragma_table_info('screenings') WHERE name = 'starts_at'" },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The table says title TEXT NOT NULL. Which INSERT will the database refuse?',
        lines: ["INSERT INTO films (title, year) VALUES ('Jaws', 1975);", "INSERT INTO films (title) VALUES ('Alien');", 'INSERT INTO films (year) VALUES (1985);'],
        bug: 2,
        fix: "INSERT INTO films (title, year) VALUES ('Back to the Future', 1985);",
        explanation: 'The third row has no title, and title is NOT NULL. A missing year is fine: year allows NULL.',
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'Ellen\'s card has no seat. Just put 0 in the seat column?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Sure, 0 means nothing.', why: 'There\'s no seat 0. Now the data looks known when it isn\'t.' },
          { text: 'Put "unknown".', why: 'That\'s the shoebox\'s "comp" problem again: a word pretending to be data.' },
          { text: 'No. Leave it NULL, so we know it\'s missing and can ask Walt. A fake value hides the problem.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the value to what it tells you.',
        pairs: [
          ['0', 'Known: nothing, like a free ticket'],
          ['NULL', 'Unknown: nobody wrote it down'],
          ['NOT NULL', 'This column must always have a value'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What word does SQL show for a missing value?',
        answers: ['NULL'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'When have you filled in a form with a made-up value (like 0 or "n/a") just to get past it? What did that hide?',
    starters: ['I once put...', 'It hid...'],
  },
  deepen: {
    title: 'NULL is strange',
    summary: 'NULL isn\'t even equal to NULL: "unknown = unknown" is unknown. That\'s why Chapter 2 finds missing values with IS NULL, never = NULL.',
  },
  notes: 'NULL semantics: sqlite.org/nulls.html. pragma_table_info exposes the notnull flag (quoted because notnull is also a keyword).',
};

export default lesson;
