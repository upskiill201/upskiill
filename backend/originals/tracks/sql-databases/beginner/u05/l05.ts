import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 — Checkpoint. Reviews lessons 1–4 (UPDATE, DELETE, UNIQUE/CHECK, foreign keys) plus earlier chapters. Story: tickets go on sale. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: on sale',
  summary: 'The 100th birthday. Monday, 9 a.m. Birthday tickets go on sale. Rosa is first through the door, as she has been since 1981. Juno\'s hands are steady. The rules are in place.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Add, change and remove rows safely without notes', 'Pick the constraint that stops a mistake'],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 9:00 a.m.',
      beats: [
        { speaker: 'narrator', text: 'A queue down the block. Leo hands out programmes. Walt shakes every hand.' },
        { speaker: 'walt', text: 'Rosa! Casablanca, Saturday. Which seat?' },
        { speaker: 'narrator', text: 'Rosa smiles. "G7. Obviously."' },
        { speaker: 'juno', text: 'G7, screening 26. And if anyone else asks for it, the database will say no before I can.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the first morning of sales.',
    items: [
      {
        kind: 'writeCode',
        prompt: "Sell Rosa (member 1) seat 'G7' for Casablanca on the birthday weekend (screening 26), price_paid 25.",
        starter: '',
        solution: "INSERT INTO tickets (screening_id, member_id, seat, price_paid)\nVALUES (26, 1, 'G7', 25);\n",
        hint: "INSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES (26, 1, 'G7', 25);",
        database: 'starlight',
        checks: [
          { message: 'One ticket added', outputIncludes: 'INSERT: 1 row added' },
          { message: 'Rosa has G7 on screening 26', expr: "SELECT COUNT(*) = 1 FROM tickets WHERE screening_id = 26 AND member_id = 1 AND seat = 'G7'" },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The UNIQUE index on (screening_id, seat) is in place. Jack asks for G7 on screening 26 too. What happens?',
        options: [
          { text: 'He gets it; Rosa loses hers', why: 'The database never overwrites with an INSERT.' },
          { text: 'The INSERT is refused: UNIQUE constraint failed' },
          { text: 'Both get G7', why: 'That\'s the shoebox. The rule stops it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'A screening\'s price changes. Only screening 27.',
        template: '[[1]] screenings [[2]] price = 22 [[3]] id = 27;',
        blanks: [['UPDATE'], ['SET'], ['WHERE']],
        distractors: ['INSERT', 'VALUES', 'HAVING'],
        language: 'sql',
      },
      {
        kind: 'findBug',
        prompt: 'Which line would hurt the most?',
        lines: ["UPDATE tickets SET seat = 'G8' WHERE id = 226;", 'DELETE FROM tickets;', 'SELECT COUNT(*) FROM tickets;'],
        bug: 1,
        fix: 'DELETE FROM tickets WHERE id = …;',
        explanation: 'A DELETE with no WHERE removes every ticket ever sold.',
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Add the rule, the right way: move Jack's old ticket 226 to 'G8', then CREATE UNIQUE INDEX one_ticket_per_seat ON tickets (screening_id, seat).",
        starter: '',
        solution: "UPDATE tickets SET seat = 'G8' WHERE id = 226;\nCREATE UNIQUE INDEX one_ticket_per_seat ON tickets (screening_id, seat);\n",
        hint: 'UPDATE first, then CREATE UNIQUE INDEX.',
        database: 'starlight',
        checks: [
          { message: 'Jack is in G8', expr: "SELECT seat = 'G8' FROM tickets WHERE id = 226" },
          { message: 'The rule exists', outputIncludes: 'Created index one_ticket_per_seat' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which constraint stops each mistake?',
        groups: ['UNIQUE', 'REFERENCES', 'NOT NULL'],
        items: [
          { text: 'A ticket for screening 99', group: 1 },
          { text: 'G7 sold twice on Saturday', group: 0 },
          { text: 'A ticket with no seat', group: 2 },
          { text: 'A ticket for member 41 (there are 40)', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the pad say?',
        code: "UPDATE screenings SET price = 25\nWHERE starts_at >= '2026-11-01';",
        language: 'sql',
        options: [
          { text: 'UPDATE: 27 rows changed', why: 'The WHERE keeps it to November.' },
          { text: 'UPDATE: 0 rows changed', why: 'Three screenings match. (They\'re already 25, but they still count as changed.)' },
          { text: 'UPDATE: 3 rows changed' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: "Tom Becker (member 2) books by mistake: seat 'B5' on screening 25. Add it, then cancel it by its seat and screening, then count screening 25's tickets as sold.",
        starter: "INSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES (25, 2, 'B5', 25);\n\n",
        solution: "INSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES (25, 2, 'B5', 25);\n\nDELETE FROM tickets WHERE screening_id = 25 AND seat = 'B5';\nSELECT COUNT(*) AS sold FROM tickets WHERE screening_id = 25;\n",
        hint: "DELETE FROM tickets WHERE screening_id = 25 AND seat = 'B5'; then COUNT.",
        database: 'starlight',
        checks: [
          { message: 'Delete exactly 1 row', outputIncludes: 'DELETE: 1 row deleted' },
          { message: 'Screening 25 is back to 0 sold', outputIncludes: 'sold 0' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Earlier chapters review: match the clause to its chapter skill.',
        pairs: [
          ['CREATE TABLE', 'Design a table'],
          ['WHERE … LIKE', 'Find rows by pattern'],
          ['LEFT JOIN', 'Keep rows with no match'],
          ['GROUP BY', 'One row per group'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the safe change in order.',
        lines: ['SELECT * FROM tickets WHERE id = 226;', "UPDATE tickets SET seat = 'G8' WHERE id = 226;", 'SELECT * FROM tickets WHERE id = 226;'],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'Jack\'s at the counter asking for G7 Saturday. What do I tell him?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Tell him it\'s Rosa\'s, has been since September 28th. G8 is free, right next to her. I\'ll book it.' },
          { text: 'Give him G7 too, they can share.', why: 'That\'s the whole reason Chapter 1 happened.' },
          { text: 'Tell him the computer says no.', why: 'True, but Walt can do better than that for a regular.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A ticket for screening 99 fails with "… constraint failed". Which two words go first?',
        answers: ['FOREIGN KEY', 'foreign key constraint failed', 'FOREIGN KEY constraint'],
        placeholder: 'e.g. UNIQUE',
      },
    ],
  },
  reflect: {
    prompt: 'Which felt riskier to you: changing data (UPDATE, DELETE) or reading it? What will you always do first now?',
    starters: ['Riskier is...', 'I will always...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1-4. starlight.sql: screening 26 = Casablanca 2026-11-21 19:30; screening 25 has no tickets; the 3 November screenings are already 25 (SQLite still reports them as changed rows).',
};

export default lesson;
