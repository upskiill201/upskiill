import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Chat with Tey: DELETE, previewed with SELECT, and the id as the safest WHERE. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'DELETE, carefully',
  summary: 'The 100th birthday. Leo has been testing the booking screen and left fake tickets everywhere: seats called TEST1, TEST2. Juno wants them gone, and nothing else.',
  minutes: 10,
  outcomes: [
    'Remove rows with DELETE FROM … WHERE',
    'Preview exactly what will go with a SELECT first',
    'Prefer the id when deleting one row',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'DELETE FROM tickets WHERE … removes the rows that match. Like UPDATE, without WHERE it removes every row.', replies: ['So the same SELECT-first habit?'] },
        { tey: "Exactly. Run SELECT * FROM tickets WHERE seat LIKE 'TEST%' first. If it shows only Leo's fakes, swap SELECT * for DELETE.", replies: ['What if I want to delete one ticket?'] },
        { tey: "Use its id: WHERE id = 226. A seat isn't safe: screening 17 has two G7 tickets, so WHERE seat = 'G7' would delete both.", replies: ['Can I delete a member?'] },
        { tey: 'Only if nothing points at them. Rosa has tickets, so the database refuses to delete her: those tickets would point at nobody. More on that in lesson 4.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Leo\'s test tickets',
      database: 'starlight',
      code: "-- Leo's tests (added just for this run)\nINSERT INTO tickets (screening_id, seat, price_paid) VALUES (25, 'TEST1', 0), (25, 'TEST2', 0);\n\n-- 1. Preview\nSELECT id, seat FROM tickets WHERE seat LIKE 'TEST%';\n\n-- 2. Delete exactly those\nDELETE FROM tickets WHERE seat LIKE 'TEST%';\n",
      caption: 'Preview, then delete with the same WHERE. Run it: 2 rows shown, 2 rows deleted.',
      challenge: 'Add SELECT COUNT(*) FROM tickets; at the end. It should be back to 313.',
    },
  ],
  apply: {
    scenario: 'Cleaning up Leo\'s tests.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does DELETE FROM tickets; (no WHERE) do?',
        options: [
          { text: 'Deletes every ticket' },
          { text: 'Deletes the tickets table itself', why: 'The table stays, empty. Removing the table is DROP TABLE.' },
          { text: 'Nothing without a WHERE', why: 'It runs, and removes every row.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "Delete Leo's test tickets: every ticket whose seat starts with 'TEST'. Nothing else.",
        starter: "INSERT INTO tickets (screening_id, seat, price_paid) VALUES (25, 'TEST1', 0), (26, 'TEST2', 0), (27, 'TEST3', 0);\n\n",
        solution: "INSERT INTO tickets (screening_id, seat, price_paid) VALUES (25, 'TEST1', 0), (26, 'TEST2', 0), (27, 'TEST3', 0);\n\nDELETE FROM tickets WHERE seat LIKE 'TEST%';\n",
        hint: "DELETE FROM tickets WHERE seat LIKE 'TEST%';",
        database: 'starlight',
        checks: [
          { message: 'Delete exactly 3 rows', outputIncludes: 'DELETE: 3 rows deleted' },
          { message: 'All 313 real tickets are still there', expr: 'SELECT COUNT(*) = 313 FROM tickets' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Screening 17 has two tickets for G7. What does this do?',
        code: "DELETE FROM tickets\nWHERE screening_id = 17 AND seat = 'G7';",
        language: 'sql',
        options: [
          { text: 'Deletes Jack\'s ticket only', why: 'Both rows match. Rosa\'s goes too.' },
          { text: 'Deletes both G7 tickets: Rosa\'s and Jack\'s' },
          { text: 'Fails', why: 'It runs fine, which is the problem.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Delete exactly one ticket, the safe way.',
        template: 'DELETE [[1]] tickets WHERE [[2]] = 226;',
        blanks: [['FROM'], ['id']],
        distractors: ['INTO', 'seat', 'member_id'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Jack decides to take a refund instead of moving. Delete his ticket, id 226, and only that one.',
        starter: '',
        solution: 'DELETE FROM tickets WHERE id = 226;\n',
        hint: 'DELETE FROM tickets WHERE id = 226;',
        database: 'starlight',
        checks: [
          { message: 'Delete exactly 1 row', outputIncludes: 'DELETE: 1 row deleted' },
          { message: 'Rosa\'s G7 ticket stays', expr: 'SELECT COUNT(*) = 1 FROM tickets WHERE id = 225' },
          { message: 'Use the id', codeIncludes: 'id = 226' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line would empty the whole table?',
        lines: ["SELECT * FROM tickets WHERE seat LIKE 'TEST%';", 'DELETE FROM tickets;', "SELECT COUNT(*) FROM tickets;"],
        bug: 1,
        fix: "DELETE FROM tickets WHERE seat LIKE 'TEST%';",
        explanation: 'The preview had a WHERE; the DELETE forgot it. Copy the WHERE across, always.',
        language: 'sql',
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe WHERE for deleting one ticket, or risky?',
        groups: ['Safe', 'Risky'],
        items: [
          { text: 'WHERE id = 226', group: 0 },
          { text: "WHERE seat = 'G7'", group: 1 },
          { text: 'WHERE member_id = 13', group: 1 },
          { text: 'WHERE id = 225', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Try to delete Rosa (member 1). Read the error, then fix the code: delete member 1\'s tickets FIRST, then member 1.',
        starter: 'DELETE FROM members WHERE id = 1;\n',
        solution: 'DELETE FROM tickets WHERE member_id = 1;\nDELETE FROM members WHERE id = 1;\n',
        hint: 'Tickets point at members, so remove the tickets first: DELETE FROM tickets WHERE member_id = 1;',
        database: 'starlight',
        checks: [
          { message: 'Her 7 tickets go first', outputIncludes: 'DELETE: 7 rows deleted' },
          { message: 'Then she is removed', expr: 'SELECT COUNT(*) = 0 FROM members WHERE id = 1' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'Delete Rosa? Over my dead body.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Practice only, Walt. And see: the database wouldn\'t even let me delete her while she still had tickets. It protects her history.' },
          { text: 'It was Leo\'s idea.', why: 'It wasn\'t. And blaming Leo won\'t calm Walt down.' },
          { text: 'She\'s just a row.', why: 'To Walt she\'s Rosa. And the point was that the database protected her.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the statement to what it does.',
        pairs: [
          ['INSERT', 'Adds rows'],
          ['UPDATE', 'Changes rows'],
          ['DELETE', 'Removes rows'],
          ['SELECT', 'Only reads'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What should you always run, with the same WHERE, before a DELETE?',
        answers: ['SELECT', 'a SELECT', 'select'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'What do you delete without checking first (emails, photos, files)? What would a "preview" step look like for you?',
    starters: ['I delete...', 'My preview would be...'],
  },
  deepen: {
    title: 'Soft deletes',
    summary: 'Many apps never really delete: they set a column like cancelled = 1 and hide those rows. History stays, and mistakes can be undone.',
  },
  notes: 'starlight.sql: screening 17 has tickets 225 and 226 for G7; member 1 (Rosa) has 7 tickets; deleting a member with tickets fails with FOREIGN KEY constraint failed (foreign_keys is ON in the runner).',
};

export default lesson;
