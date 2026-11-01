import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: Dana's letter in the paper. COUNT(*). */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'COUNT',
  summary: '4 weeks to the 100th. Dana writes to the local paper: "The Starlight can\'t say how many tickets it sells." Ms Delgado wants numbers, not lists. Juno stops listing rows and starts counting them.',
  minutes: 10,
  outcomes: [
    'Count rows with COUNT(*)',
    'Count only matching rows with WHERE',
    'Name a count with AS',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday morning, the Lakeview Ledger',
      beats: [
        { speaker: 'narrator', text: 'Page 4 of the local paper. A letter from Dana Whitlock, Crane Holdings.' },
        { speaker: 'dana', text: '"I asked the Starlight how many tickets it sold this autumn. Nobody could tell me. The site deserves a business that can."' },
        { speaker: 'walt', text: 'Three hundred and something. I could have told her.' },
        { speaker: 'juno', text: '"Something" isn\'t a number. Give me ten seconds.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>So far every query returned rows. <strong>COUNT(*)</strong> returns one number instead: how many rows there are.</p><p><code>SELECT COUNT(*) FROM tickets;</code></p><p>Add a WHERE and it counts only the matching rows. Add AS to name the answer.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Three hundred and what?',
      database: 'starlight',
      code: 'SELECT COUNT(*) AS tickets_sold FROM tickets;\n',
      caption: 'One row, one number. Run it.',
      challenge: 'Add WHERE screening_id = 17 to count just Casablanca night.',
    },
  ],
  apply: {
    scenario: 'Answering Dana\'s letter with counts.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does SELECT COUNT(*) FROM members; return?',
        options: [
          { text: 'Every member\'s row', why: 'That\'s SELECT *. COUNT(*) gives one number.' },
          { text: 'The number of columns', why: 'It counts rows.' },
          { text: 'One number: how many members there are' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'How many tickets did the Starlight sell this autumn? Count every row in tickets, and name it tickets_sold.',
        starter: '',
        solution: 'SELECT COUNT(*) AS tickets_sold FROM tickets;\n',
        hint: 'SELECT COUNT(*) AS tickets_sold FROM tickets;',
        database: 'starlight',
        checks: [
          { message: 'Name it tickets_sold', outputIncludes: 'tickets_sold' },
          { message: '313 tickets', outputIncludes: '313' },
          { message: 'Use COUNT', codeIncludes: 'count(' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Count the members in Chicago.',
        template: "SELECT [[1]](*) FROM members [[2]] city = 'Chicago';",
        blanks: [['COUNT'], ['WHERE']],
        distractors: ['SUM', 'TOTAL', 'AND'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many rows does this return?',
        code: 'SELECT COUNT(*) FROM tickets\nWHERE screening_id = 17;',
        language: 'sql',
        options: [
          { text: '20 rows, one per ticket', why: 'COUNT turns the 20 matching rows into one number.' },
          { text: '1 row, saying 20' },
          { text: '313 rows', why: 'WHERE keeps 20, and COUNT returns a single row.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'How many tickets were sold for matinees? Count the tickets joined to screenings where the price is 9.',
        starter: 'SELECT COUNT(*)\nFROM tickets t\n',
        solution: 'SELECT COUNT(*)\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nWHERE s.price = 9;\n',
        hint: 'JOIN screenings s ON t.screening_id = s.id WHERE s.price = 9',
        database: 'starlight',
        checks: [
          { message: '119 matinee tickets', outputIncludes: '119' },
          { message: 'One row: the count', outputIncludes: '(1 row)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line stops this query?',
        lines: ['SELECT COUNT *', 'FROM tickets', 'WHERE member_id IS NULL;'],
        bug: 0,
        fix: 'SELECT COUNT(*)',
        explanation: 'COUNT needs its brackets: COUNT(*).',
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'How many films does the Starlight have? Count them, named film_count.',
        starter: '',
        solution: 'SELECT COUNT(*) AS film_count FROM films;\n',
        hint: 'SELECT COUNT(*) AS film_count FROM films;',
        database: 'starlight',
        checks: [
          { message: 'Name it film_count', outputIncludes: 'film_count' },
          { message: '15 films', outputIncludes: 'film_count 15' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A list or a count?',
        groups: ['A list (rows)', 'A count (one number)'],
        items: [
          { text: 'Which members live in Skokie?', group: 0 },
          { text: 'How many members live in Skokie?', group: 1 },
          { text: 'How many tickets were walk-ins?', group: 1 },
          { text: 'Who came to Parasite?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'Why not just SELECT * and count the rows yourself? It says "313 rows" at the bottom anyway.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Fair, that works too.', why: 'Here, yes, but an app or a report needs the number itself, as data.' },
          { text: 'COUNT gives the number as an answer you can name, report and use. And at 3 million rows, nobody wants them all on screen.' },
          { text: 'The bottom line is often wrong.', why: 'It isn\'t wrong; it\'s just not something a report or app can use.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 3 review: build the join from tickets to their screenings.',
        tiles: ['FROM tickets t', 'JOIN screenings s', 'ON t.screening_id = s.id'],
        distractors: ['ON t.id = s.id', 'WHERE'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The Starlight has 40 members. What does SELECT COUNT(*) FROM members; show?',
        answers: ['40'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What do you "sort of know" a number for (screen time, money spent on food, hours of sleep)? How would you get the real count?',
    starters: ['I roughly think...', 'The real count would come from...'],
  },
  deepen: {
    title: 'Aggregate functions',
    summary: 'COUNT is an aggregate function: it turns many rows into one value. SUM, AVG, MIN and MAX are next.',
  },
  notes: 'starlight.sql: 313 tickets; screening 17 = 20; matinee tickets = 119; 15 films; 40 members; 22 in Chicago. The Lakeview Ledger is a fictional local paper.',
};

export default lesson;
