import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: Leo's UPDATE without WHERE. UPDATE … SET … WHERE. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'UPDATE … WHERE',
  summary: 'The 100th birthday. Tickets go on sale Monday. Leo is asked to set the birthday prices to $25. He runs one line. Every screening in the database is now $25, including last month\'s matinees.',
  minutes: 11,
  outcomes: [
    'Change rows with UPDATE … SET',
    'Limit the change with WHERE',
    'Check a change with SELECT before and after',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, 9:12 p.m.',
      beats: [
        { speaker: 'leo', text: 'Done! UPDATE screenings SET price = 25. Easy.' },
        { speaker: 'narrator', text: 'The pad says: UPDATE: 27 rows changed.' },
        { speaker: 'juno', text: 'Twenty-seven? There are three birthday screenings.' },
        { speaker: 'leo', text: '...Is there an undo button?' },
        { speaker: 'juno', text: 'Not in SQL. Good thing this is a practice copy. Let\'s learn the word you forgot.' },
      ],
    },
    {
      kind: 'text',
      html: '<p><strong>UPDATE</strong> changes values in rows that already exist:</p><p><code>UPDATE screenings SET price = 25 WHERE starts_at >= \'2026-11-01\';</code></p><p><strong>SET</strong> says what to change. <strong>WHERE</strong> says which rows. Without WHERE, <em>every</em> row changes.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Leo\'s mistake, and the fix',
      database: 'starlight',
      code: "-- Leo's version: no WHERE\nUPDATE screenings SET price = 30;\n\n-- Check: every price is now 30\nSELECT id, starts_at, price FROM screenings LIMIT 3;\n",
      caption: 'Run it: 27 rows changed. (Every run starts from a fresh copy, so nothing real breaks.)',
      challenge: "Add WHERE starts_at >= '2026-11-01' to the UPDATE and run it again: 3 rows.",
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Before any UPDATE, run the same WHERE as a SELECT. If the SELECT shows the right rows, the UPDATE will change the right rows.',
    },
  ],
  apply: {
    scenario: 'Getting the birthday prices right.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does an UPDATE without WHERE change?',
        options: [
          { text: 'Nothing, it needs a WHERE to run', why: 'It runs. That\'s the danger.' },
          { text: 'Only the first row', why: 'It changes every row in the table.' },
          { text: 'Every row in the table' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: "Walt adds the $2 roof fund: set the price of the three birthday screenings to 27. Only those three.",
        starter: 'UPDATE screenings\nSET price = 27\n',
        solution: "UPDATE screenings\nSET price = 27\nWHERE starts_at >= '2026-11-01';\n",
        hint: "Add WHERE starts_at >= '2026-11-01';",
        database: 'starlight',
        checks: [
          { message: 'Change exactly 3 rows', outputIncludes: 'UPDATE: 3 rows changed' },
          { message: 'Birthday screenings are $27', expr: 'SELECT COUNT(*) = 3 FROM screenings WHERE price = 27' },
          { message: 'Matinees are still $9', expr: 'SELECT COUNT(*) = 12 FROM screenings WHERE price = 9' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Fix the double booking: move Jack\'s ticket (id 226) to seat G8.',
        template: "[[1]] tickets\n[[2]] seat = 'G8'\nWHERE id = 226;",
        blanks: [['UPDATE'], ['SET']],
        distractors: ['INSERT', 'CHANGE', 'VALUES'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Rosa booked G7 first, so Jack moves. Change ticket 226's seat to 'G8'.",
        starter: '',
        solution: "UPDATE tickets SET seat = 'G8' WHERE id = 226;\n",
        hint: "UPDATE tickets SET seat = 'G8' WHERE id = 226;",
        database: 'starlight',
        checks: [
          { message: 'Change exactly 1 row', outputIncludes: 'UPDATE: 1 row changed' },
          { message: 'Jack is in G8', expr: "SELECT seat = 'G8' FROM tickets WHERE id = 226" },
          { message: 'Rosa keeps G7', expr: "SELECT seat = 'G7' FROM tickets WHERE id = 225" },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the pad say?',
        code: "UPDATE members SET city = 'Chicago'\nWHERE city = 'Cicero';",
        language: 'sql',
        options: [
          { text: 'UPDATE: 3 rows changed' },
          { text: 'UPDATE: 40 rows changed', why: 'WHERE limits it to the 3 Cicero members.' },
          { text: 'An error: Chicago already exists', why: 'Many rows can share a value. Only keys must be unique.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Leo wants to fix Marcus Hill\'s missing email. Which line is dangerous?',
        lines: ['UPDATE members', "SET email = 'marcus.hill@example.com';"],
        bug: 1,
        fix: "SET email = 'marcus.hill@example.com' WHERE id = 4;",
        explanation: 'No WHERE: all 40 members would get Marcus\'s email.',
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Give Marcus Hill (member 4) his email: 'marcus.hill@example.com'. Then SELECT his row to check.",
        starter: '',
        solution: "UPDATE members SET email = 'marcus.hill@example.com' WHERE id = 4;\nSELECT name, email FROM members WHERE id = 4;\n",
        hint: 'UPDATE … SET email = … WHERE id = 4; then SELECT … WHERE id = 4;',
        database: 'starlight',
        checks: [
          { message: 'Only Marcus changes', outputIncludes: 'UPDATE: 1 row changed' },
          { message: 'His row shows the email', outputIncludes: 'Marcus Hill | marcus.hill@example.com' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the safe way to update in order.',
        lines: ["SELECT * FROM screenings WHERE starts_at >= '2026-11-01';", "UPDATE screenings SET price = 25 WHERE starts_at >= '2026-11-01';", "SELECT id, price FROM screenings WHERE starts_at >= '2026-11-01';"],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'I changed 27 prices. On the real database. Walt\'s going to kill me.',
        prompt: 'This time it was practice. What should Juno say?',
        options: [
          { text: 'It\'s fine, nobody will notice.', why: 'They would, on the bank report.' },
          { text: 'You\'re banned from SQL.', why: 'Everyone makes this mistake once. The fix is a habit, not a ban.' },
          { text: 'Practice copy, so nothing\'s lost. From now on: SELECT with the WHERE first, then UPDATE with the same WHERE. And we back up before big changes.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Earlier chapters review: changes data, or only reads it?',
        groups: ['Changes data', 'Only reads'],
        items: [
          { text: 'UPDATE … SET', group: 0 },
          { text: 'SELECT … GROUP BY', group: 1 },
          { text: 'INSERT INTO', group: 0 },
          { text: 'SELECT … LEFT JOIN', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word says which rows an UPDATE changes?',
        answers: ['WHERE'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever changed "everything" when you meant one thing (reply-all, find-and-replace, a group chat)? What habit would have caught it?',
    starters: ['I once...', 'The habit would be...'],
  },
  deepen: {
    title: 'Backups',
    summary: 'Real databases are backed up every day, and big changes are tried on a copy first. SQLite databases are one file, so a backup is literally a copy of it.',
  },
  notes: 'starlight.sql: 27 screenings (12 at $9, 12 at $14, 3 at $25); ticket 225 Rosa G7, 226 Jack G7 → G8 (G8 is free on screening 17); 3 members in Cicero; member 4 Marcus Hill has NULL email.',
};

export default lesson;
