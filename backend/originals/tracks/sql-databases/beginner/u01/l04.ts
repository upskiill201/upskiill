import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Walkthrough: Juno's first CREATE TABLE, films, on an empty database. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'CREATE TABLE films',
  summary: '7 weeks to the 100th. 1:40 a.m., after the last show. The projector is cooling, the lobby is dark, and Juno makes the Starlight\'s first real table.',
  minutes: 11,
  outcomes: [
    'Create a table with CREATE TABLE',
    'Give every column a name and a type',
    'Check a new table with SELECT',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building the films table',
      steps: [
        { title: 'Name the table', body: 'Plural and lowercase is the usual style: films, not Film.', code: 'CREATE TABLE films (', language: 'sql' },
        { title: 'One line per column', body: 'Each line is a column name, then its type. Commas between columns.', code: '  id INTEGER,\n  title TEXT,\n  year INTEGER', language: 'sql' },
        { title: 'Close it', body: 'A closing bracket and a semicolon. No comma after the last column.', code: ');', language: 'sql' },
        { title: 'Look inside', body: 'A new table has columns but no rows yet: 0 rows.', code: 'SELECT * FROM films;', language: 'sql' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Your first table',
      code: 'CREATE TABLE films (\n  id INTEGER,\n  title TEXT,\n  year INTEGER\n);\n\nSELECT * FROM films;\n',
      caption: 'This runs on a brand-new, empty database. Run it: the table is created, then SELECT shows its columns and 0 rows.',
      challenge: 'Add a fourth column, genre TEXT, and run it again. Don\'t forget the comma after year INTEGER.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Every run starts from a fresh database, so you can run CREATE TABLE again and again while you practise.',
    },
  ],
  apply: {
    scenario: 'Juno\'s first table, at 2 a.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does CREATE TABLE do?',
        options: [
          { text: 'Adds a row of data', why: 'That\'s INSERT, next lesson.' },
          { text: 'Makes a new, empty table with the columns you name' },
          { text: 'Shows a table', why: 'That\'s SELECT.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the statement in order.',
        lines: ['CREATE TABLE films (', '  id INTEGER,', '  title TEXT,', '  year INTEGER', ');'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Create a table called films with three columns: id INTEGER, title TEXT and year INTEGER.',
        starter: 'CREATE TABLE films (\n\n);\n',
        solution: 'CREATE TABLE films (\n  id INTEGER,\n  title TEXT,\n  year INTEGER\n);\n',
        hint: 'One column per line inside the brackets, with commas between them: id INTEGER, title TEXT, year INTEGER',
        checks: [
          { message: 'Create a table called films', outputIncludes: 'Created table films' },
          { message: 'Give it 3 columns', expr: "SELECT COUNT(*) = 3 FROM pragma_table_info('films')" },
          { message: 'Make title a TEXT column', expr: "SELECT type = 'TEXT' FROM pragma_table_info('films') WHERE name = 'title'" },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks this CREATE TABLE?',
        lines: ['CREATE TABLE films (', '  id INTEGER,', '  title TEXT,', '  year INTEGER,', ');'],
        bug: 3,
        fix: '  year INTEGER',
        explanation: 'The last column has no comma after it. A comma there tells SQL another column is coming, then it finds the bracket.',
        language: 'sql',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the table for the Starlight\'s members.',
        template: 'CREATE [[1]] members (\n  id INTEGER,\n  name [[2]]\n);',
        blanks: [['TABLE'], ['TEXT']],
        distractors: ['ROW', 'INTEGER', 'NAME'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Straight after CREATE TABLE films, what does SELECT * FROM films; show?',
        language: 'sql',
        code: 'CREATE TABLE films (id INTEGER, title TEXT);\nSELECT * FROM films;',
        options: [
          { text: 'An error: the table is empty', why: 'Empty is fine. SELECT just finds nothing.' },
          { text: 'One blank row', why: 'No rows have been added, not even a blank one.' },
          { text: 'The column names and 0 rows' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Create the members table: id INTEGER, name TEXT and email TEXT. Then SELECT * FROM members to check it.',
        starter: '',
        solution: 'CREATE TABLE members (\n  id INTEGER,\n  name TEXT,\n  email TEXT\n);\n\nSELECT * FROM members;\n',
        hint: 'CREATE TABLE members ( id INTEGER, name TEXT, email TEXT ); then SELECT * FROM members;',
        checks: [
          { message: 'Create a table called members', outputIncludes: 'Created table members' },
          { message: 'Give it id, name and email', expr: "SELECT COUNT(*) = 3 FROM pragma_table_info('members') WHERE name IN ('id', 'name', 'email')" },
          { message: 'Check it with SELECT (0 rows)', outputIncludes: '(0 rows)' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the piece of CREATE TABLE to its job.',
        pairs: [
          ['films', 'The table\'s name'],
          ['title TEXT', 'A column and its type'],
          [',', 'Separates two columns'],
          [');', 'Closes the statement'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'It\'s 2 a.m. and you made an empty table. Where are the films?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'You\'re right, it\'s useless.', why: 'An empty table is a plan. The data comes next.' },
          { text: 'The table is the shape. Every film I add will have to fit it: an id, a title, a year. Adding them is tomorrow.' },
          { text: 'The films are hidden.', why: 'Nothing is hidden. SELECT shows 0 rows because none were added.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which two words start every statement that makes a new table?',
        answers: ['CREATE TABLE'],
        placeholder: 'Two words',
      },
    ],
  },
  reflect: {
    prompt: 'If you made a table for something in your life (books, gym sessions, savings), what would its columns be?',
    starters: ['My table would be called...', 'Its columns would be...'],
  },
  deepen: {
    title: 'Naming things',
    summary: 'Pick one style and keep it: lowercase, words joined by underscores (starts_at, film_id). Arjun will insist, and he\'s right.',
  },
  notes: 'pragma_table_info() is a SQLite table-valued function (SQLite 3.16+), used here only in hidden checks.',
};

export default lesson;
