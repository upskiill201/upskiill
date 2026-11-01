import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Unit Challenge. "Walt vs the database": every Chapter 2 tool in one race. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: Walt vs the database',
  summary: '6 weeks to the 100th. Friday, the final round. Leo reads the questions, Walt answers from memory, Juno answers in SQL. Twenty dollars of poster paint on the line.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Turn plain questions into SELECT queries',
    'Combine WHERE, AND/OR, LIKE, IN, BETWEEN and IS NULL',
    'Sort, cut and calculate the answers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 6 p.m., the lobby',
      beats: [
        { speaker: 'leo', text: 'Final round. Ten questions. Walt, you\'re on memory. Juno, you\'re on the box.' },
        { speaker: 'walt', text: 'Forty-five years of Fridays. Bring it.' },
        { speaker: 'narrator', text: 'Behind the glass doors, Dana Whitlock is on the phone, looking up at the roof.' },
        { speaker: 'juno', text: 'Ready.' },
      ],
      choice: {
        prompt: 'Walt wins question 1 ("our oldest film?": The General). What should Juno say?',
        options: [
          { text: '"Nice. Next question."', outcome: 'Good sport. Walt grins. The point was never to beat him, but to stop relying on one man\'s memory.', best: true },
          { text: '"Lucky guess."', outcome: 'Walt\'s grin disappears. He\'ll need to trust this database. Don\'t make it his enemy.' },
          { text: '"The database was faster anyway."', outcome: 'It was, by half a second. Walt is less impressed than you are.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'Unit Challenge: ten questions, against Walt\'s memory.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Q2: Which films are musicals or romances? Show title and genre. Use IN.',
        starter: '',
        solution: "SELECT title, genre FROM films WHERE genre IN ('Musical', 'Romance');\n",
        hint: "WHERE genre IN ('Musical', 'Romance')",
        database: 'starlight',
        checks: [
          { message: 'The Wizard of Oz and Roman Holiday', outputIncludes: 'Roman Holiday' },
          { message: 'Exactly 2 films', outputIncludes: '(2 rows)' },
          { message: 'Use IN', codeIncludes: 'in (' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Q3: "Members who joined in 2024." Which condition?',
        options: [
          { text: "joined = '2024'", why: "joined is a full date like '2024-06-03', so = '2024' matches nothing." },
          { text: "joined BETWEEN '2024-01-01' AND '2024-12-31'" },
          { text: 'joined > 2024', why: 'joined is text; compare it with a date in quotes.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "Q3: Show the name and joined date of members who joined in 2024, earliest first.",
        starter: '',
        solution: "SELECT name, joined FROM members\nWHERE joined BETWEEN '2024-01-01' AND '2024-12-31'\nORDER BY joined;\n",
        hint: "WHERE joined BETWEEN '2024-01-01' AND '2024-12-31' ORDER BY joined",
        database: 'starlight',
        checks: [
          { message: 'Yuki Sato joined first that year', outputIncludes: 'name | joined Yuki Sato' },
          { message: 'All 7 members from 2024', outputIncludes: '(7 rows)' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Q4: titles with "the" anywhere (any capitals).',
        template: "SELECT title FROM films WHERE title [[1]] '[[2]]the[[3]]';",
        blanks: [['LIKE'], ['%'], ['%']],
        distractors: ['=', '_', '*'],
        language: 'sql',
      },
      {
        kind: 'findBug',
        prompt: 'Q5 came back empty. Which line?',
        lines: ['SELECT id, seat', 'FROM tickets', 'WHERE screening_id = 17', '  AND member_id = NULL;'],
        bug: 3,
        fix: '  AND member_id IS NULL;',
        explanation: '= NULL is never true. Walk-ins are found with IS NULL.',
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Q5: How many walk-ins on Casablanca night? Show the id and seat of tickets for screening 17 with no member.',
        starter: '',
        solution: 'SELECT id, seat FROM tickets\nWHERE screening_id = 17 AND member_id IS NULL;\n',
        hint: 'screening_id = 17 AND member_id IS NULL',
        database: 'starlight',
        checks: [
          { message: 'Show id and seat', outputIncludes: 'id | seat' },
          { message: 'All 5 walk-ins that night', outputIncludes: '(5 rows)' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Q6: what comes back first?',
        code: 'SELECT title, minutes FROM films\nWHERE minutes BETWEEN 100 AND 110\nORDER BY minutes DESC;',
        language: 'sql',
        options: [
          { text: 'Coco | 105' },
          { text: 'Casablanca | 102', why: 'DESC puts the longest first. Coco is 105.' },
          { text: 'Parasite | 132', why: '132 is outside 100 to 110.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Q7: The two cheapest screenings in October, cheapest first, then earliest. Show id, starts_at and price.',
        starter: '',
        solution: "SELECT id, starts_at, price FROM screenings\nWHERE starts_at BETWEEN '2026-10-01' AND '2026-10-31 23:59'\nORDER BY price, starts_at\nLIMIT 2;\n",
        hint: 'October with BETWEEN, then ORDER BY price, starts_at and LIMIT 2.',
        database: 'starlight',
        checks: [
          { message: 'The first October matinee: screening 18', outputIncludes: 'id | starts_at | price 18 | 2026-10-03 14:00 | 9' },
          { message: 'Just 2 rows', outputIncludes: '(2 rows)' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Q8: put the query in order.',
        lines: ['SELECT DISTINCT city', 'FROM members', 'WHERE email IS NOT NULL', 'ORDER BY city;'],
        language: 'sql',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of a query does each job?',
        groups: ['SELECT', 'WHERE', 'ORDER BY'],
        items: [
          { text: 'price + 2 AS with_fund', group: 0 },
          { text: "city IN ('Skokie', 'Cicero')", group: 1 },
          { text: 'minutes DESC', group: 2 },
          { text: 'DISTINCT genre', group: 0 },
          { text: 'email IS NULL', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Q9: For the birthday flyer: each birthday screening\'s starts_at and its price with the $2 roof fund, as with_fund.',
        starter: '',
        solution: "SELECT starts_at, price + 2 AS with_fund FROM screenings\nWHERE starts_at >= '2026-11-01';\n",
        hint: "price + 2 AS with_fund, WHERE starts_at >= '2026-11-01'",
        database: 'starlight',
        checks: [
          { message: 'Name the column with_fund', outputIncludes: 'starts_at | with_fund' },
          { message: 'Each shows 27', outputIncludes: '2026-11-20 19:30 | 27' },
          { message: 'The 3 birthday screenings', outputIncludes: '(3 rows)' },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Q10: Chapter 1 review: add the pianist to a staff table.',
        tiles: ['INSERT INTO staff (name, role)', 'VALUES', "('Ines Costa', 'Pianist')", ';'],
        distractors: ["(Ines Costa, Pianist)", 'SELECT'],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'Alright. The box wins. Nine to one. But who told you Rosa had G7 first?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Nobody. You did, I guessed.', why: 'Juno didn\'t guess. The data knows.' },
          { text: 'The database is always right.', why: 'It\'s only as right as what was typed in. She checked the dates.' },
          { text: 'The tickets table. Rosa bought hers on 28 September, Jack on 1 October. The dates were on your cards all along.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: "Prove it: show the id, member_id and bought_on of both G7 tickets for screening 17, earliest bought first.",
        starter: '',
        solution: "SELECT id, member_id, bought_on FROM tickets\nWHERE screening_id = 17 AND seat = 'G7'\nORDER BY bought_on;\n",
        hint: "screening_id = 17 AND seat = 'G7', ORDER BY bought_on",
        database: 'starlight',
        checks: [
          { message: 'Rosa (member 1) bought first, on 28 September', outputIncludes: 'id | member_id | bought_on 225 | 1 | 2026-09-28' },
          { message: 'Both G7 tickets', outputIncludes: '(2 rows)' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Final score: the database won 9 to 1. Which film did Walt get right?',
        answers: ['The General', 'General'],
        placeholder: 'A title',
      },
    ],
  },
  reflect: {
    prompt: 'Walt\'s memory lost to the database, but he knows things it never will. What do you know about your work or life that no spreadsheet could capture?',
    starters: ['What I know is...', 'No database knows...'],
  },
  deepen: {
    title: 'Practise on real data',
    summary: 'Many cities publish open data (Chicago has a data portal). Pick a dataset and write down three questions you would ask it with WHERE and ORDER BY.',
  },
  notes: "Unit Challenge for Chapter 2. starlight.sql: Musical/Romance = The Wizard of Oz, Roman Holiday; joined in 2024 = 7 (first Yuki Sato 2024-02-17); screening 17 walk-ins = 5; 100-110 min = Casablanca 102, Wizard 102, Paddington 2 103, Coco 105; October cheapest = 18 (2026-10-03 14:00), 20 (2026-10-04 14:00); G7 tickets 225 (member 1, 2026-09-28) and 226 (member 13, 2026-10-01). Ines Costa is the pianist for the birthday screening of The General (a story character, named only).",
};

export default lesson;
