import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Reading: COUNT(*) vs COUNT(column) vs COUNT(DISTINCT column). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'COUNT(*) vs COUNT(column)',
  summary: '4 weeks to the 100th. Ms Delgado asks three questions that sound the same: how many tickets, how many member tickets, how many different members. Juno gets three different numbers from one table.',
  minutes: 10,
  outcomes: [
    'Count every row with COUNT(*)',
    'Count only filled-in values with COUNT(column)',
    'Count different values with COUNT(DISTINCT column)',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Three counts, three answers',
      html: '<p>COUNT has three forms, and each answers a different question:</p><p><code>COUNT(*)</code> counts <strong>rows</strong>. Every ticket: 313.</p><p><code>COUNT(member_id)</code> counts <strong>values that aren\'t NULL</strong>. Walk-ins have no member_id, so they\'re skipped: 266.</p><p><code>COUNT(DISTINCT member_id)</code> counts <strong>different values</strong>. Rosa\'s seven tickets count once: 40 people.</p><p>Pick the one that matches the question. "How many tickets?", "how many sold to members?" and "how many members came?" are three different questions.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Three numbers, one table',
      database: 'starlight',
      code: 'SELECT COUNT(*) AS tickets,\n       COUNT(member_id) AS member_tickets,\n       COUNT(DISTINCT member_id) AS members\nFROM tickets;\n',
      caption: 'Run it and read the three numbers side by side.',
      challenge: 'Work out the walk-ins: tickets minus member_tickets. Does it match Chapter 2\'s 47?',
    },
  ],
  apply: {
    scenario: 'Ms Delgado\'s three questions.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does COUNT(member_id) skip?',
        options: [
          { text: 'Rows where member_id is NULL (the walk-ins)' },
          { text: 'Duplicate member ids', why: 'That\'s COUNT(DISTINCT member_id).' },
          { text: 'Nothing', why: 'COUNT(column) skips NULLs. Only COUNT(*) counts every row.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'How many members gave an email? Count the email column of members, named with_email.',
        starter: '',
        solution: 'SELECT COUNT(email) AS with_email FROM members;\n',
        hint: 'COUNT(email) skips the NULLs.',
        database: 'starlight',
        checks: [
          { message: 'Name it with_email', outputIncludes: 'with_email' },
          { message: '34 of the 40', outputIncludes: 'with_email 34' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the count.',
        pairs: [
          ['How many tickets?', 'COUNT(*)'],
          ['How many sold to members?', 'COUNT(member_id)'],
          ['How many different members came?', 'COUNT(DISTINCT member_id)'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Casablanca night: 20 tickets, 5 walk-ins, and Rosa and Sofia hold 2 each. How many?',
        code: 'SELECT COUNT(DISTINCT member_id)\nFROM tickets WHERE screening_id = 17;',
        language: 'sql',
        options: [
          { text: '20', why: 'That\'s COUNT(*).' },
          { text: '15', why: 'That\'s COUNT(member_id). With DISTINCT, Rosa and Sofia count once each.' },
          { text: '13' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'How many different members came to Casablanca night (screening 17)? Name it people.',
        starter: '',
        solution: 'SELECT COUNT(DISTINCT member_id) AS people\nFROM tickets\nWHERE screening_id = 17;\n',
        hint: 'COUNT(DISTINCT member_id) AS people … WHERE screening_id = 17',
        database: 'starlight',
        checks: [
          { message: 'Name it people', outputIncludes: 'people' },
          { message: '13 different members', outputIncludes: 'people 13' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tickets sold to members, per screening.',
        template: 'SELECT screening_id, COUNT([[1]]) AS member_tickets\nFROM tickets\nGROUP BY [[2]];',
        blanks: [['member_id'], ['screening_id']],
        distractors: ['*', 'DISTINCT', 'seat'],
        language: 'sql',
      },
      {
        kind: 'findBug',
        prompt: 'Leo wants how many PEOPLE came this autumn. Which line gives the wrong kind of count?',
        lines: ['SELECT COUNT(member_id) AS people', 'FROM tickets;'],
        bug: 0,
        fix: 'SELECT COUNT(DISTINCT member_id) AS people',
        explanation: 'COUNT(member_id) is 266 member tickets. People who came several times count several times. DISTINCT counts each person once: 40.',
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'All three in one row: COUNT(*) as tickets, COUNT(member_id) as member_tickets, COUNT(DISTINCT member_id) as members.',
        starter: 'SELECT\nFROM tickets;\n',
        solution: 'SELECT COUNT(*) AS tickets,\n       COUNT(member_id) AS member_tickets,\n       COUNT(DISTINCT member_id) AS members\nFROM tickets;\n',
        hint: 'Three counts separated by commas, each with its AS name.',
        database: 'starlight',
        checks: [
          { message: 'Name all three', outputIncludes: 'tickets | member_tickets | members' },
          { message: '313, 266 and 40', outputIncludes: '313 | 266 | 40' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'So which one goes in the bank report: 313, 266 or 40?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'The biggest. 313 looks best.', why: 'Pick the number that answers the question, not the one that looks best.' },
          { text: 'All three, labelled. 313 tickets, 266 to members, 40 different members. Each answers a different question.' },
          { text: '40. Only people matter.', why: 'The bank cares about tickets and money too.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Chapter 2 review: which counts would IS NULL help you check?',
        groups: ['Uses NULL', 'Doesn\'t'],
        items: [
          { text: 'Walk-in tickets', group: 0 },
          { text: 'Members with no email', group: 0 },
          { text: 'Films longer than 2 hours', group: 1 },
          { text: 'Matinee screenings', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'tickets has 313 rows and 47 walk-ins. What does COUNT(member_id) give?',
        answers: ['266'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a number you report (followers, customers, visits). Is it counting rows, filled-in values, or different people?',
    starters: ['The number I report is...', 'It really counts...'],
  },
  deepen: {
    title: 'AVG skips NULLs too',
    summary: 'SUM, AVG, MIN and MAX all ignore NULLs. An AVG over a column with missing values is the average of the known ones only.',
  },
  notes: 'starlight.sql: tickets COUNT(*) 313, COUNT(member_id) 266, COUNT(DISTINCT member_id) 40; members COUNT(email) 34; screening 17: 20 tickets, 15 member tickets, 13 distinct members (Rosa holds G2 and G7, Sofia Rossi B6 and D9). Aggregates ignore NULL (sqlite.org/lang_aggfunc.html).',
};

export default lesson;
