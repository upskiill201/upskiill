import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Walkthrough: GROUP BY, one row per group. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'GROUP BY',
  summary: '4 weeks to the 100th. "Tickets per night," says Ms Delgado. Juno could run 24 COUNT queries, one per screening. Or one query with two new words.',
  minutes: 11,
  outcomes: [
    'Count or total per group with GROUP BY',
    'Show the group column next to its count',
    'Sort groups by their counts',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From one count to a count per group',
      steps: [
        { title: 'One count for everything', body: 'COUNT(*) on its own squeezes every row into one number.', code: 'SELECT COUNT(*) FROM members;', language: 'sql' },
        { title: 'GROUP BY splits the rows first', body: 'Rows with the same city go into one pile. COUNT(*) then counts each pile.', code: 'SELECT city, COUNT(*)\nFROM members\nGROUP BY city;', language: 'sql' },
        { title: 'Name it and sort it', body: 'Biggest group first.', code: 'SELECT city, COUNT(*) AS members\nFROM members\nGROUP BY city\nORDER BY members DESC;', language: 'sql' },
        { title: 'The rule', body: 'Every column in SELECT is either in GROUP BY, or inside COUNT, SUM, AVG, MIN or MAX.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Tickets per night',
      database: 'starlight',
      code: 'SELECT screening_id, COUNT(*) AS sold\nFROM tickets\nGROUP BY screening_id\nORDER BY sold DESC;\n',
      caption: 'One row per screening that sold tickets, busiest first. Run it.',
      challenge: 'Swap COUNT(*) for SUM(price_paid) AS takings, and sort by takings.',
    },
  ],
  apply: {
    scenario: 'Tickets per night for Ms Delgado.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does GROUP BY city do?',
        options: [
          { text: 'Sorts members by city', why: 'Sorting is ORDER BY. GROUP BY makes one row per city.' },
          { text: 'Puts rows with the same city together, so COUNT or SUM works per city' },
          { text: 'Removes the city column', why: 'It makes the city column the label of each group.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'How many members live in each city? Show city and COUNT(*) as members.',
        starter: 'SELECT city, COUNT(*) AS members\nFROM members\n',
        solution: 'SELECT city, COUNT(*) AS members\nFROM members\nGROUP BY city;\n',
        hint: 'Add GROUP BY city;',
        database: 'starlight',
        checks: [
          { message: 'Chicago has 22', outputIncludes: 'Chicago | 22' },
          { message: 'One row per city: 5', outputIncludes: '(5 rows)' },
          { message: 'Use GROUP BY', codeIncludes: 'group by city' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Films per genre.',
        template: 'SELECT genre, [[1]](*) AS films\nFROM films\n[[2]] [[3]] genre;',
        blanks: [['COUNT'], ['GROUP'], ['BY']],
        distractors: ['SUM', 'ORDER', 'WHERE'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Tickets were sold at two prices, $9 and $14. How many rows?',
        code: 'SELECT s.price, COUNT(*)\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nGROUP BY s.price;',
        language: 'sql',
        options: [
          { text: '313', why: 'GROUP BY squeezes the tickets into one row per price.' },
          { text: '1', why: 'One row per group, and there are two prices.' },
          { text: '2' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'The busiest night: tickets per screening_id as sold, busiest first, top 1.',
        starter: '',
        solution: 'SELECT screening_id, COUNT(*) AS sold\nFROM tickets\nGROUP BY screening_id\nORDER BY sold DESC\nLIMIT 1;\n',
        hint: 'GROUP BY screening_id, ORDER BY sold DESC, LIMIT 1',
        database: 'starlight',
        checks: [
          { message: 'Casablanca night, 20 tickets', outputIncludes: 'screening_id | sold 17 | 20' },
          { message: 'Just the busiest', outputIncludes: '(1 row)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This breaks the GROUP BY rule. Which line?',
        lines: ['SELECT city, name, COUNT(*)', 'FROM members', 'GROUP BY city;'],
        bug: 0,
        fix: 'SELECT city, COUNT(*)',
        explanation: 'name isn\'t grouped or counted. A city has many names, so which one? (SQLite quietly picks one; most databases refuse.)',
        language: 'sql',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the parts in order.',
        lines: ['SELECT genre, COUNT(*) AS films', 'FROM films', 'WHERE year > 1950', 'GROUP BY genre', 'ORDER BY films DESC;'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Takings by price: show s.price and SUM(t.price_paid) as takings, grouped by s.price.',
        starter: '',
        solution: 'SELECT s.price, SUM(t.price_paid) AS takings\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nGROUP BY s.price;\n',
        hint: 'JOIN screenings, GROUP BY s.price, SUM(t.price_paid) AS takings',
        database: 'starlight',
        checks: [
          { message: 'Matinees took $1,044', outputIncludes: '9 | 1044' },
          { message: 'Evenings took $2,492', outputIncludes: '14 | 2492' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'GROUP BY and ORDER BY. Aren\'t they the same thing?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Yes, just different spellings.', why: 'They do different jobs, and often appear together.' },
          { text: 'GROUP BY is faster.', why: 'Speed isn\'t the difference. What comes back is.' },
          { text: 'No. GROUP BY squeezes rows into one per group. ORDER BY just sorts whatever rows you have.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 3 review: match the result to the cause.',
        pairs: [
          ['8,451 rows', 'A JOIN with no ON'],
          ['ambiguous column name', 'A bare id with two tables'],
          ['NULL in the name column', 'LEFT JOIN on a walk-in'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Members per city: how many rows come back? (The Starlight has members in Chicago, Evanston, Oak Park, Skokie and Cicero.)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'If you grouped your own spending last month, what would the groups be, and which would be biggest?',
    starters: ['My groups would be...', 'The biggest is probably...'],
  },
  deepen: {
    title: 'Group by two columns',
    summary: 'GROUP BY city, joined_year gives one row per city per year. Try GROUP BY genre, year on films.',
  },
  notes: 'starlight.sql: members per city = Chicago 22, Evanston 6, Oak Park 5, Skokie 4, Cicero 3; busiest screening = 17 (20 tickets), then 7 and 21 (19 each); price 9 → 119 tickets / 1044, price 14 → 194 tickets / 2492. SQLite allows bare columns in aggregate queries (sqlite.org/lang_select.html#bareagg).',
};

export default lesson;
