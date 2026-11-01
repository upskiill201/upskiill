import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint. Reviews lessons 1–4 (foreign keys, JOIN … ON, aliases, three-table joins) plus earlier chapters. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the regulars',
  summary: '5 weeks to the 100th. Ms Delgado emails: "Send me three of your regulars and what they came to see." Walt names his favourites. Juno checks them against the tickets.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Join two and three tables without notes', 'Choose the right ON condition'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 3 p.m.',
      beats: [
        { speaker: 'walt', text: 'Rosa. Jenny Kim, who never misses a matinee. And Felix, who sits in the back and cries at Jaws.' },
        { speaker: 'juno', text: 'Let\'s see what the tickets say.' },
        { speaker: 'leo', text: 'Nobody cries at Jaws.' },
        { speaker: 'walt', text: 'Felix does.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Walt\'s three regulars.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which ON joins tickets to members?',
        options: [
          { text: 'ON t.id = m.id', why: 'That matches ticket numbers to member numbers, which mean different things.' },
          { text: 'ON t.member_id = m.id' },
          { text: 'ON t.member_id = m.member_id', why: 'members has no member_id. Its key is id.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "Find Jenny Kim's tickets: show the seat and starts_at of every ticket held by the member named 'Jenny Kim'. Join tickets, members and screenings.",
        starter: '',
        solution: "SELECT t.seat, s.starts_at\nFROM tickets t\nJOIN members m ON t.member_id = m.id\nJOIN screenings s ON t.screening_id = s.id\nWHERE m.name = 'Jenny Kim';\n",
        hint: "JOIN members m ON t.member_id = m.id, JOIN screenings s ON t.screening_id = s.id, WHERE m.name = 'Jenny Kim'",
        database: 'starlight',
        checks: [
          { message: 'Show seat and starts_at', outputIncludes: 'seat | starts_at' },
          { message: 'Jenny has 15 tickets', outputIncludes: '(15 rows)' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the join.',
        template: 'SELECT f.title\nFROM screenings s\nJOIN films f [[1]] s.[[2]] = f.id;',
        blanks: [['ON'], ['film_id']],
        distractors: ['WHERE', 'id', 'screening_id'],
        language: 'sql',
      },
      {
        kind: 'findBug',
        prompt: 'Which line stops this query?',
        lines: ['SELECT t.seat, name', 'FROM tickets t', 'JOIN members m ON t.member_id = m.id', 'WHERE id = 1;'],
        bug: 3,
        fix: 'WHERE m.id = 1;',
        explanation: 'Both tables have an id, so a bare id is ambiguous. Say which one: m.id.',
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Did Felix Wagner really come to Jaws? Show the film titles of all his tickets.",
        starter: '',
        solution: "SELECT f.title\nFROM tickets t\nJOIN members m ON t.member_id = m.id\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nWHERE m.name = 'Felix Wagner';\n",
        hint: 'Three JOINs: members, screenings, films. WHERE m.name = \'Felix Wagner\'.',
        database: 'starlight',
        checks: [
          { message: 'Jaws is there', outputIncludes: 'Jaws' },
          { message: 'All 12 of his tickets', outputIncludes: '(12 rows)' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Screening 17 has 20 tickets; 5 are walk-ins. How many rows?',
        code: 'SELECT t.seat, m.name\nFROM tickets t\nJOIN members m ON t.member_id = m.id\nWHERE t.screening_id = 17;',
        language: 'sql',
        options: [
          { text: '20', why: 'Walk-ins have no member to match, so JOIN leaves them out.' },
          { text: '5', why: 'Those are the walk-ins, the ones that are dropped.' },
          { text: '15' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each foreign key to the table it points at.',
        pairs: [
          ['tickets.screening_id', 'screenings'],
          ['tickets.member_id', 'members'],
          ['screenings.film_id', 'films'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the query in order.',
        lines: ['SELECT m.name, t.seat', 'FROM tickets t', 'JOIN members m ON t.member_id = m.id', 'WHERE t.screening_id = 17', 'ORDER BY t.seat;'],
        language: 'sql',
      },
      {
        kind: 'sortGroups',
        prompt: 'Earlier chapters review: which clause?',
        groups: ['WHERE', 'ORDER BY', 'CREATE TABLE'],
        items: [
          { text: "city IN ('Skokie', 'Cicero')", group: 0 },
          { text: 'starts_at DESC', group: 1 },
          { text: 'id INTEGER PRIMARY KEY', group: 2 },
          { text: 'email IS NOT NULL', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: "Rosa's films: show the film title and starts_at of each of Rosa Marin's tickets, earliest first.",
        starter: '',
        solution: "SELECT f.title, s.starts_at\nFROM tickets t\nJOIN members m ON t.member_id = m.id\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nWHERE m.name = 'Rosa Marin'\nORDER BY s.starts_at;\n",
        hint: "The same three JOINs, WHERE m.name = 'Rosa Marin', ORDER BY s.starts_at",
        database: 'starlight',
        checks: [
          { message: 'Her first was Jaws, on 5 September', outputIncludes: 'title | starts_at Jaws | 2026-09-05 19:30' },
          { message: 'All 7 of her tickets', outputIncludes: '(7 rows)' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'OK. Felix came to Jaws. Did he cry, though?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'The database says yes.', why: 'The database only knows what was typed in: tickets, not tears.' },
          { text: 'No idea. The data says he came. Whether he cried is Walt\'s department.' },
          { text: 'Add a cried column.', why: 'Funny. But you can\'t collect that honestly.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: "Which table do you JOIN to turn a ticket's member_id into a name?",
        answers: ['members'],
        placeholder: 'A table name',
      },
    ],
  },
  reflect: {
    prompt: 'Walt "knew" his regulars; the data agreed. When has your gut been confirmed by the numbers, and when was it wrong?',
    starters: ['My gut said...', 'The numbers said...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4. starlight.sql: Jenny Kim (18) 15 tickets; Felix Wagner (36) 12 tickets incl. Jaws; Rosa Marin (1) 7 tickets, first Jaws at screening 3 (2026-09-05 19:30).',
};

export default lesson;
