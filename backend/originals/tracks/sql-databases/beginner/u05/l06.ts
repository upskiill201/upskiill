import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Myth or Fact opener: transactions (BEGIN, COMMIT, ROLLBACK). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'All or nothing',
  summary: 'The 100th birthday. The Kims want four seats together for The Wizard of Oz. The card machine fails after the second seat is saved. Now two seats are sold to a family with no tickets.',
  minutes: 11,
  outcomes: [
    'Group several changes into one transaction',
    'Keep them with COMMIT or undo them with ROLLBACK',
    'Explain why bookings need all-or-nothing',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'If a booking stops halfway, the database undoes the first half by itself.', isFact: false, explain: 'Not unless the changes were in a transaction. Otherwise the first two seats just stay sold.' },
        { text: 'Between BEGIN and COMMIT, changes either all happen or none do.', isFact: true, explain: 'That\'s a transaction. COMMIT keeps them all; ROLLBACK throws them all away.' },
        { text: 'ROLLBACK can undo yesterday\'s changes.', isFact: false, explain: 'Only changes since BEGIN that haven\'t been committed. After COMMIT, they\'re permanent.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The Kims, undone',
      database: 'starlight',
      code: "BEGIN;\nINSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES (27, 18, 'D1', 25);\nINSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES (27, 18, 'D2', 25);\n-- The card fails here. Undo everything since BEGIN:\nROLLBACK;\n\nSELECT COUNT(*) AS sold FROM tickets WHERE screening_id = 27;\n",
      caption: 'Two seats inserted, then rolled back. Run it: screening 27 still has 0 sold.',
      challenge: 'Change ROLLBACK to COMMIT. Now the two seats stay.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'BEGIN starts it. COMMIT keeps everything. ROLLBACK undoes everything. Apps wrap every booking, payment and transfer like this.',
    },
  ],
  apply: {
    scenario: 'Booking the Kims\' four seats safely.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does ROLLBACK do?',
        options: [
          { text: 'Undoes every change since BEGIN' },
          { text: 'Undoes the last statement only', why: 'It undoes the whole transaction since BEGIN.' },
          { text: 'Restores yesterday\'s backup', why: 'It only undoes the open transaction.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "Book the Kims (member 18, Jenny Kim) four seats on screening 27, D1 to D4, at 25 each, inside one transaction that is committed.",
        starter: 'BEGIN;\n\n',
        solution: "BEGIN;\nINSERT INTO tickets (screening_id, member_id, seat, price_paid) VALUES\n  (27, 18, 'D1', 25), (27, 18, 'D2', 25), (27, 18, 'D3', 25), (27, 18, 'D4', 25);\nCOMMIT;\n",
        hint: "BEGIN; one INSERT with four rows; COMMIT;",
        database: 'starlight',
        checks: [
          { message: 'Four seats added', outputIncludes: 'INSERT: 4 rows added' },
          { message: 'Committed', outputIncludes: 'Transaction committed' },
          { message: 'Screening 27 has 4 sold', expr: 'SELECT COUNT(*) = 4 FROM tickets WHERE screening_id = 27' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the safe booking in order.',
        lines: ['BEGIN;', "INSERT INTO tickets (…) VALUES (27, 18, 'D1', 25);", "INSERT INTO tickets (…) VALUES (27, 18, 'D2', 25);", 'COMMIT;'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Screening 27 had 0 sold. What does the last line show?',
        code: "BEGIN;\nINSERT INTO tickets (screening_id, seat, price_paid) VALUES (27, 'E1', 25);\nROLLBACK;\nSELECT COUNT(*) FROM tickets WHERE screening_id = 27;",
        language: 'sql',
        options: [
          { text: '1', why: 'ROLLBACK undid the INSERT.' },
          { text: '0' },
          { text: 'An error', why: 'Everything here is valid.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The card failed: undo the whole booking.',
        template: "[[1]];\nINSERT INTO tickets (screening_id, seat, price_paid) VALUES (27, 'F1', 25);\n[[2]];",
        blanks: [['BEGIN'], ['ROLLBACK']],
        distractors: ['START', 'COMMIT', 'UNDO'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "The card fails. Start a transaction, insert seats 'F1' and 'F2' on screening 27, then roll it all back, and show the count for screening 27 as sold.",
        starter: '',
        solution: "BEGIN;\nINSERT INTO tickets (screening_id, seat, price_paid) VALUES (27, 'F1', 25), (27, 'F2', 25);\nROLLBACK;\nSELECT COUNT(*) AS sold FROM tickets WHERE screening_id = 27;\n",
        hint: 'BEGIN; INSERT …; ROLLBACK; SELECT COUNT(*) AS sold …',
        database: 'starlight',
        checks: [
          { message: 'Rolled back', outputIncludes: 'Transaction rolled back' },
          { message: 'Still 0 sold', outputIncludes: 'sold 0' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it need a transaction?',
        groups: ['Yes: all or nothing', 'No: one simple change'],
        items: [
          { text: 'Four seats for one family', group: 0 },
          { text: 'Moving a ticket: delete the old seat, add the new one', group: 0 },
          { text: 'Fixing one member\'s email', group: 1 },
          { text: 'Reading tonight\'s seat list', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The seats never get saved for good. Which line is wrong?',
        lines: ['BEGIN;', "INSERT INTO tickets (screening_id, seat, price_paid) VALUES (27, 'G1', 25);", "INSERT INTO tickets (screening_id, seat, price_paid) VALUES (27, 'G2', 25);", 'ROLLBACK;'],
        bug: 3,
        fix: 'COMMIT;',
        explanation: 'The booking went fine, so keep it with COMMIT. ROLLBACK threw it away.',
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'Why not just delete the two seats by hand when the card fails?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Good plan.', why: 'Until someone else buys D3 in the seconds between.' },
          { text: 'Deleting is slower.', why: 'It\'s not about speed.' },
          { text: 'By hand means someone has to notice, remember and get it right at 9 a.m. with a queue. ROLLBACK does it every time, instantly.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 4 review: count tickets per screening for the birthday weekend.',
        tiles: ['SELECT screening_id, COUNT(*)', 'FROM tickets', 'WHERE screening_id >= 25', 'GROUP BY screening_id;'],
        distractors: ['HAVING screening_id', 'ORDER BY COUNT'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which statement keeps every change in a transaction for good?',
        answers: ['COMMIT'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'What in your life must happen "all or nothing" (moving money, booking a trip with flights and a hotel)? What happens when only half goes through?',
    starters: ['All or nothing for me is...', 'When half goes through...'],
  },
  deepen: {
    title: 'ACID',
    summary: 'Databases promise transactions are Atomic (all or nothing), Consistent, Isolated and Durable. Look up "ACID database" for the four words.',
  },
  notes: 'starlight.sql: screening 27 (The Wizard of Oz, 2026-11-22 14:00) has no tickets; member 18 = Jenny Kim. SQLite transactions: sqlite.org/lang_transaction.html.',
};

export default lesson;
