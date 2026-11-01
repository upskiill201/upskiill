import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Walkthrough: JOIN … ON, tickets with their screenings. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'JOIN … ON',
  summary: '5 weeks to the 100th. 10:30 p.m., Arjun on video. "Three queries for one ticket? Let the database follow the numbers." He types two words that change everything: JOIN and ON.',
  minutes: 11,
  outcomes: [
    'Combine two tables with JOIN … ON',
    'Write the ON condition that matches the ids',
    'Use table.column to say which table a column is from',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Tickets, with their screenings',
      steps: [
        { title: 'Start from one table', body: 'Every ticket.', code: 'SELECT * FROM tickets', language: 'sql' },
        { title: 'JOIN the other', body: 'Bring in the screenings table.', code: 'SELECT * FROM tickets\nJOIN screenings', language: 'sql' },
        { title: 'Say how they match: ON', body: 'A ticket belongs to the screening whose id equals its screening_id.', code: 'SELECT * FROM tickets\nJOIN screenings ON tickets.screening_id = screenings.id', language: 'sql' },
        { title: 'Pick columns from both', body: 'table.column says which table each one comes from.', code: 'SELECT tickets.seat, screenings.starts_at\nFROM tickets\nJOIN screenings ON tickets.screening_id = screenings.id;', language: 'sql' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'One query instead of three',
      database: 'starlight',
      code: "SELECT tickets.id, tickets.seat, screenings.starts_at, screenings.price\nFROM tickets\nJOIN screenings ON tickets.screening_id = screenings.id\nWHERE tickets.member_id = 1;\n",
      caption: 'Rosa\'s 7 tickets, each with its date and price from screenings. Run it.',
      challenge: 'Change member 1 to member 13 to see Jack\'s tickets.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The ON condition is nearly always "foreign key = primary key": tickets.screening_id = screenings.id.',
    },
  ],
  apply: {
    scenario: 'Arjun\'s first JOIN lesson.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does ON say in a JOIN?',
        options: [
          { text: 'Which rows of the two tables belong together' },
          { text: 'Which columns to show', why: 'That\'s still the list after SELECT.' },
          { text: 'That the join is switched on', why: 'Good guess, but ON is the matching rule.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Match every ticket to its screening.',
        template: 'SELECT tickets.seat, screenings.starts_at\nFROM tickets\n[[1]] screenings [[2]] tickets.screening_id = screenings.[[3]];',
        blanks: [['JOIN'], ['ON'], ['id']],
        distractors: ['WITH', 'WHERE', 'film_id'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Show each ticket\'s seat with its screening\'s starts_at, for Rosa (member 1), earliest first.',
        starter: 'SELECT tickets.seat, screenings.starts_at\nFROM tickets\n',
        solution: 'SELECT tickets.seat, screenings.starts_at\nFROM tickets\nJOIN screenings ON tickets.screening_id = screenings.id\nWHERE tickets.member_id = 1\nORDER BY screenings.starts_at;\n',
        hint: 'JOIN screenings ON tickets.screening_id = screenings.id, then WHERE tickets.member_id = 1 and ORDER BY screenings.starts_at.',
        database: 'starlight',
        checks: [
          { message: 'Her first was H11 on 5 September', outputIncludes: 'seat | starts_at H11 | 2026-09-05 19:30' },
          { message: 'All 7 of her tickets', outputIncludes: '(7 rows)' },
          { message: 'Use JOIN', codeIncludes: 'join screenings' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This JOIN matches the wrong things. Which line?',
        lines: ['SELECT tickets.seat, screenings.starts_at', 'FROM tickets', 'JOIN screenings ON tickets.id = screenings.id;'],
        bug: 2,
        fix: 'JOIN screenings ON tickets.screening_id = screenings.id;',
        explanation: 'tickets.id is the ticket\'s own number. Ticket 5 has nothing to do with screening 5. Match the foreign key: tickets.screening_id.',
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Every ticket has exactly one screening. The Starlight has 313 tickets. How many rows?',
        code: 'SELECT tickets.id, screenings.starts_at\nFROM tickets\nJOIN screenings ON tickets.screening_id = screenings.id;',
        language: 'sql',
        options: [
          { text: '27, one per screening', why: 'Each ticket gets its own row, with its screening\'s details.' },
          { text: '340, tickets plus screenings', why: 'A JOIN doesn\'t add the tables up; it matches rows.' },
          { text: '313: one row per ticket' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Join tickets to members: show the seat and the member\'s name for every ticket on Casablanca night (screening 17).',
        starter: '',
        solution: 'SELECT tickets.seat, members.name\nFROM tickets\nJOIN members ON tickets.member_id = members.id\nWHERE tickets.screening_id = 17;\n',
        hint: 'JOIN members ON tickets.member_id = members.id WHERE tickets.screening_id = 17',
        database: 'starlight',
        checks: [
          { message: 'Show seat and name', outputIncludes: 'seat | name' },
          { message: 'Jack Murphy is there', outputIncludes: 'G7 | Jack Murphy' },
          { message: '15 member tickets that night', outputIncludes: '(15 rows)' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the JOIN in order.',
        lines: ['SELECT tickets.seat, members.name', 'FROM tickets', 'JOIN members ON tickets.member_id = members.id', 'WHERE tickets.screening_id = 21;'],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Casablanca night had 20 tickets, but your join shows 15 rows. Where did 5 go?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'The database lost them.', why: 'Nothing is lost. JOIN only keeps rows that find a match.' },
          { text: 'They\'re walk-ins. Their member_id is NULL, so there\'s no member to match, and JOIN drops them.' },
          { text: 'Five people left early.', why: 'Leaving early doesn\'t change the data.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 2 review: match the query part to its job.',
        pairs: [
          ['IS NULL', 'Finds missing values'],
          ["LIKE 'G%'", 'Starts with G'],
          ['BETWEEN 1 AND 5', 'A range, ends included'],
          ['DISTINCT', 'Each value once'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Complete the ON: JOIN members ON tickets.member_id = …',
        answers: ['members.id'],
        placeholder: 'table.column',
      },
    ],
  },
  reflect: {
    prompt: 'Two lists in your life that "point" at each other: a calendar and your contacts, receipts and a budget. What would you JOIN them ON?',
    starters: ['I\'d join...', 'ON...'],
  },
  deepen: {
    title: 'INNER JOIN',
    summary: 'JOIN is short for INNER JOIN: only rows that match on both sides. You\'ll meet its cousin, LEFT JOIN, in lesson 6.',
  },
  notes: 'starlight.sql: Rosa (member 1) tickets 7, first H11 at screening 3 (2026-09-05 19:30); screening 17 has 20 tickets, 15 with members, 5 walk-ins; tickets JOIN screenings = 313 rows.',
};

export default lesson;
