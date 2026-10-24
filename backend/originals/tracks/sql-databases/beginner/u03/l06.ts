import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Chat with Tey: LEFT JOIN keeps every row from the left table. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'LEFT JOIN',
  summary: '5 weeks to the 100th. Ms Delgado wants every ticket from Casablanca night with a name next to it. Juno\'s JOIN shows 15. The box office sold 20. Five people have vanished from her answer.',
  minutes: 10,
  outcomes: [
    'Keep every row from the first table with LEFT JOIN',
    'Read the NULLs a LEFT JOIN fills in',
    'Choose between JOIN and LEFT JOIN',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'JOIN keeps only the rows that match on both sides. Walk-in tickets have no member, so they vanish.', replies: ['But I need all 20 tickets.'] },
        { tey: 'Then use LEFT JOIN. It keeps every row from the table on the left (the one after FROM), match or no match.', replies: ['What goes in the name for a walk-in?'] },
        { tey: 'NULL. LEFT JOIN fills the missing side with NULLs. Ticket, seat, and name: NULL.', replies: ['So JOIN = only matches, LEFT JOIN = everything on the left?'] },
        { tey: 'You\'ve got it. Ask yourself: "Do I want rows with no match?" Yes: LEFT JOIN. No: JOIN.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'All 20 tickets',
      database: 'starlight',
      code: 'SELECT t.seat, m.name\nFROM tickets t\nLEFT JOIN members m ON t.member_id = m.id\nWHERE t.screening_id = 17\nORDER BY t.seat;\n',
      caption: 'Casablanca night with LEFT JOIN. Run it: 20 rows, and the walk-ins show NULL as their name.',
      challenge: 'Change LEFT JOIN to JOIN and run it again. Count the rows.',
    },
  ],
  apply: {
    scenario: 'Every ticket, even the walk-ins.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does LEFT JOIN keep that JOIN doesn\'t?',
        options: [
          { text: 'Rows from the left table that have no match' },
          { text: 'Rows from the right table with no match', why: 'That\'s a RIGHT JOIN. LEFT keeps the left (FROM) table.' },
          { text: 'Nothing; they\'re the same', why: 'They differ exactly when some rows have no match.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Show every ticket on Casablanca night (screening 17) with the member\'s name, including walk-ins.',
        starter: 'SELECT t.seat, m.name\nFROM tickets t\nJOIN members m ON t.member_id = m.id\nWHERE t.screening_id = 17;\n',
        solution: 'SELECT t.seat, m.name\nFROM tickets t\nLEFT JOIN members m ON t.member_id = m.id\nWHERE t.screening_id = 17;\n',
        hint: 'Change JOIN to LEFT JOIN.',
        database: 'starlight',
        checks: [
          { message: 'All 20 tickets', outputIncludes: '(20 rows)' },
          { message: 'Walk-ins show NULL', outputIncludes: 'NULL' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Screening 21 has 19 tickets; 3 are walk-ins. How many rows?',
        code: 'SELECT t.seat, m.name\nFROM tickets t\nLEFT JOIN members m ON t.member_id = m.id\nWHERE t.screening_id = 21;',
        language: 'sql',
        options: [
          { text: '16', why: 'That\'s JOIN. LEFT JOIN keeps the 3 walk-ins too.' },
          { text: '3', why: 'Those are just the walk-ins.' },
          { text: '19' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'JOIN or LEFT JOIN?',
        groups: ['JOIN', 'LEFT JOIN'],
        items: [
          { text: 'Every ticket, with a name if there is one', group: 1 },
          { text: 'Only tickets bought by members, with names', group: 0 },
          { text: 'Every screening, even ones with no tickets yet', group: 1 },
          { text: 'Tickets with their screening (every ticket has one)', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Keep every ticket, even without a member.',
        template: 'SELECT t.id, m.name\nFROM tickets t\n[[1]] [[2]] members m ON t.member_id = m.id;',
        blanks: [['LEFT'], ['JOIN']],
        distractors: ['RIGHT', 'ALL', 'WHERE'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Show every ticket for screening 21 (Jaws) with seat and member name, walk-ins included, sorted by seat.",
        starter: '',
        solution: 'SELECT t.seat, m.name\nFROM tickets t\nLEFT JOIN members m ON t.member_id = m.id\nWHERE t.screening_id = 21\nORDER BY t.seat;\n',
        hint: 'LEFT JOIN members m ON t.member_id = m.id, WHERE t.screening_id = 21, ORDER BY t.seat',
        database: 'starlight',
        checks: [
          { message: 'Show seat and name', outputIncludes: 'seat | name' },
          { message: 'All 19 tickets', outputIncludes: '(19 rows)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Juno wants every screening, even ones that sold nothing. Which line is the problem?',
        lines: ['SELECT s.id, t.seat', 'FROM screenings s', 'JOIN tickets t ON t.screening_id = s.id;'],
        bug: 2,
        fix: 'LEFT JOIN tickets t ON t.screening_id = s.id;',
        explanation: 'A plain JOIN drops screenings with no tickets, like the three birthday shows. LEFT JOIN keeps them.',
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'FROM members LEFT JOIN tickets, or FROM tickets LEFT JOIN members. Same thing?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Yes, order doesn\'t matter.', why: 'For JOIN it doesn\'t; for LEFT JOIN it does. The left table is the one that\'s kept whole.' },
          { text: 'No. LEFT JOIN keeps everything from the first table. Tickets first keeps every ticket; members first keeps every member.' },
          { text: 'Only one of them runs.', why: 'Both run. They answer different questions.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 2 review: build "tickets with no member".',
        tiles: ['SELECT id', 'FROM tickets', 'WHERE member_id', 'IS NULL;'],
        distractors: ['= NULL;', 'IS NOT'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a LEFT JOIN, what fills the columns of a row that found no match?',
        answers: ['NULL', 'NULLs'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'When does a list need the "gaps" too? Think of a class register, a team rota, a to-do list. What would leaving out the gaps hide?',
    starters: ['The list is...', 'Leaving out the gaps hides...'],
  },
  deepen: {
    title: 'RIGHT and FULL joins',
    summary: 'RIGHT JOIN keeps the right table instead; FULL OUTER JOIN keeps both. SQLite added them in version 3.39, but most people just swap the tables and use LEFT JOIN.',
  },
  notes: 'starlight.sql: screening 17 = 20 tickets (5 walk-ins); screening 21 = 19 tickets (3 walk-ins). SQLite supports RIGHT and FULL OUTER JOIN since 3.39.0 (2022).',
};

export default lesson;
