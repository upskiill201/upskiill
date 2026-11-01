import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint. Reviews lessons 1–4: SELECT *, choosing columns, types, CREATE TABLE. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Arjun\'s first call',
  summary: '7 weeks to the 100th. 10:30 p.m. in Chicago, 9 a.m. in Bengaluru. Arjun, an old friend from a film forum, wants to see the shoebox table and Juno\'s first CREATE TABLE. Quick check before the data goes in.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Read a table with SELECT without notes', 'Create a table with the right types'],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, 10:30 p.m. (Monday, 9 a.m. in Bengaluru)',
      beats: [
        { speaker: 'arjun', text: 'My favourite cinema in Bengaluru closed in 2019. Single screen, red seats. Nobody could prove how many people came. So. Show me yours.' },
        { speaker: 'juno', text: 'Ten cards, one table. And a films table with nothing in it.' },
        { speaker: 'arjun', text: 'Nothing in it is the right start. Types?' },
        { speaker: 'juno', text: 'Title is TEXT, year is INTEGER. Money will be REAL. No more "comp" in the paid column.' },
        { speaker: 'arjun', text: 'Good. Now prove you can do it without me.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Juno shows Arjun what she\'s built.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does SELECT * FROM cards; show?',
        options: [
          { text: 'Only the first card', why: 'With no condition, every row comes back.' },
          { text: 'Every column of every card' },
          { text: 'The names of the columns only', why: 'The rows come back too.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the name and film of every card, name first.',
        starter: '',
        solution: 'SELECT name, film FROM cards;\n',
        hint: 'SELECT name, film FROM cards;',
        database: 'shoebox',
        checks: [
          { message: 'Show name, then film', outputIncludes: 'name | film' },
          { message: 'Show all 10 cards', outputIncludes: '(10 rows)' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Sort the values by the type you\'d give them.',
        groups: ['TEXT', 'INTEGER', 'REAL'],
        items: [
          { text: 'Rear Window', group: 0 },
          { text: '1954', group: 1 },
          { text: '9.50', group: 2 },
          { text: 'Fri 2 Oct', group: 0 },
          { text: '112 minutes', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line has the mistake?',
        lines: ['SELECT name seat', 'FROM cards;'],
        bug: 0,
        fix: 'SELECT name, seat',
        explanation: 'Without a comma, SQL treats seat as a new label for the name column. You\'d get one column called seat, full of names.',
        language: 'sql',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the CREATE TABLE.',
        template: 'CREATE TABLE screenings (\n  id [[1]],\n  starts_at TEXT,\n  price [[2]]\n);',
        blanks: [['INTEGER'], ['REAL']],
        distractors: ['TEXT', 'NUMBER'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Create a films table with id INTEGER, title TEXT, year INTEGER and minutes INTEGER.',
        starter: 'CREATE TABLE films (\n  id INTEGER,\n  title TEXT,\n\n);\n',
        solution: 'CREATE TABLE films (\n  id INTEGER,\n  title TEXT,\n  year INTEGER,\n  minutes INTEGER\n);\n',
        hint: 'Add year INTEGER, and minutes INTEGER, with a comma between them and none after the last one.',
        checks: [
          { message: 'Create a table called films', outputIncludes: 'Created table films' },
          { message: 'Give it 4 columns', expr: "SELECT COUNT(*) = 4 FROM pragma_table_info('films')" },
          { message: 'Make minutes an INTEGER', expr: "SELECT type = 'INTEGER' FROM pragma_table_info('films') WHERE name = 'minutes'" },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the SQL word to its job.',
        pairs: [
          ['SELECT', 'Asks for data'],
          ['FROM', 'Names the table'],
          ['CREATE TABLE', 'Makes a new table'],
          ['*', 'Every column'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the second line show?',
        code: 'CREATE TABLE members (id INTEGER, name TEXT);\nSELECT * FROM members;',
        language: 'sql',
        options: [
          { text: 'id | name, then 0 rows' },
          { text: 'An error', why: 'An empty table is fine to SELECT from.' },
          { text: 'The ten names from the shoebox', why: 'This is a new table. Nothing has been added to it.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: show each card\'s seat and what was paid.',
        tiles: ['SELECT', 'seat,', 'paid', 'FROM', 'cards;'],
        distractors: ['seat', 'TABLE'],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why didn\'t you make paid a TEXT column? Then "comp" would fit.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'TEXT is too long to type.', why: 'Typing has nothing to do with it.' },
          { text: 'Because then the database couldn\'t add the takings up. A free ticket is just 0.' },
          { text: 'Because REAL looks more professional.', why: 'It\'s about what the database can do with the values, not looks.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the seat and name of every card, seat first.',
        starter: '',
        solution: 'SELECT seat, name FROM cards;\n',
        hint: 'The column you list first comes first.',
        database: 'shoebox',
        checks: [
          { message: 'Show seat, then name', outputIncludes: 'seat | name' },
          { message: 'Show all 10 cards', outputIncludes: '(10 rows)' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A column holds whole numbers like 1926 and 120. Which type?',
        answers: ['INTEGER', 'INT'],
        placeholder: 'A type',
      },
    ],
  },
  reflect: {
    prompt: 'Which felt more natural: asking a table for data, or designing a new one? Why?',
    starters: ['More natural was...', 'Because...'],
  },
  notes: 'Checkpoint for lessons 1-4. Arjun (shared cast, Bengaluru) meets Juno through a classic-film restoration forum (CAST.md, The Starlight). Chicago is 10.5 hours behind Bengaluru in October (CDT, UTC-5; IST, UTC+5:30), so 10:30 p.m. Sunday in Chicago is 9:00 a.m. Monday in Bengaluru.',
};

export default lesson;
