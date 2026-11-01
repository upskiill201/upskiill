import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Tap to explore a three-table join: tickets → screenings → films. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Three tables, one answer',
  summary: '5 weeks to the 100th. Ms Delgado\'s real question: what do people come to see? A ticket knows its screening; a screening knows its film. Juno chains two JOINs.',
  minutes: 11,
  outcomes: [
    'Join three tables in one query',
    'Follow a chain of foreign keys',
    'Answer "who saw which film" questions',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each step of the chain',
      text: 'SELECT m.name, f.title FROM tickets t JOIN screenings s ON t.screening_id = s.id JOIN films f ON s.film_id = f.id JOIN members m ON t.member_id = m.id',
      hotspots: [
        { phrase: 'FROM tickets t', note: 'Start where the facts are: one row per ticket.' },
        { phrase: 'JOIN screenings s ON t.screening_id = s.id', note: 'Step 1: each ticket finds its screening.' },
        { phrase: 'JOIN films f ON s.film_id = f.id', note: 'Step 2: each screening finds its film. Notice the ON uses s, from the step before.' },
        { phrase: 'JOIN members m ON t.member_id = m.id', note: 'And a third JOIN brings in who bought it.' },
        { phrase: 'SELECT m.name, f.title', note: 'Now columns from any of the joined tables can be shown together.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Who came to Parasite?',
      database: 'starlight',
      code: "SELECT m.name, f.title, s.starts_at\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nJOIN members m ON t.member_id = m.id\nWHERE f.title = 'Parasite';\n",
      caption: 'Four tables, one question. Run it: nine members came to Parasite.',
      challenge: "Change Parasite to 'Spirited Away'. Who came to that?",
    },
  ],
  apply: {
    scenario: 'What do Starlight members come to see?',
    items: [
      {
        kind: 'mcq',
        prompt: 'To get from a ticket to its film title, which path?',
        options: [
          { text: 'tickets → films, directly', why: 'tickets has no film_id. The film is one step further.' },
          { text: 'tickets → members → films', why: 'Members don\'t point at films.' },
          { text: 'tickets → screenings → films' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the three-table join in order.',
        lines: ['SELECT t.seat, f.title', 'FROM tickets t', 'JOIN screenings s ON t.screening_id = s.id', 'JOIN films f ON s.film_id = f.id', "WHERE f.title = 'Jaws';"],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Show the seat and film title of every ticket for Casablanca. Join tickets, screenings and films.",
        starter: 'SELECT t.seat, f.title\nFROM tickets t\n',
        solution: "SELECT t.seat, f.title\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nWHERE f.title = 'Casablanca';\n",
        hint: "Two JOINs: screenings s ON t.screening_id = s.id, then films f ON s.film_id = f.id. Then WHERE f.title = 'Casablanca'.",
        database: 'starlight',
        checks: [
          { message: 'Show seat and title', outputIncludes: 'seat | title' },
          { message: 'All 38 Casablanca tickets, both screenings', outputIncludes: '(38 rows)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line joins the wrong columns?',
        lines: ['SELECT t.seat, f.title', 'FROM tickets t', 'JOIN screenings s ON t.screening_id = s.id', 'JOIN films f ON t.screening_id = f.id;'],
        bug: 3,
        fix: 'JOIN films f ON s.film_id = f.id;',
        explanation: 'A film is found from the screening\'s film_id, not the ticket\'s screening_id.',
        language: 'sql',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the chain.',
        template: 'FROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON [[1]].film_id = f.[[2]]',
        blanks: [['s'], ['id']],
        distractors: ['t', 'f', 'film_id'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Which films did Jack Murphy (member 13) see? Show the film title and seat for his tickets.',
        starter: '',
        solution: 'SELECT f.title, t.seat\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nWHERE t.member_id = 13;\n',
        hint: 'The same two JOINs, then WHERE t.member_id = 13.',
        database: 'starlight',
        checks: [
          { message: 'Show title and seat', outputIncludes: 'title | seat' },
          { message: 'Roman Holiday is one of them', outputIncludes: 'Roman Holiday' },
          { message: 'All 5 of Jack\'s tickets', outputIncludes: '(5 rows)' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Casablanca has 38 tickets: 18 on 4 Sep and 20 on 2 Oct. How many rows?',
        code: "SELECT t.id FROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nWHERE f.title = 'Casablanca'\n  AND s.starts_at < '2026-10-01';",
        language: 'sql',
        options: [
          { text: '18' },
          { text: '20', why: 'That\'s 2 October, which is after 1 October.' },
          { text: '38', why: 'The date condition keeps only the September screening.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'dana',
        message: 'Your members only come for Casablanca. Nostalgia isn\'t a business, Juno.',
        prompt: 'Juno has the three-table join open. Her best reply?',
        options: [
          { text: 'That\'s not true.', why: 'Saying it isn\'t enough with Dana. Show her the data.' },
          { text: 'Casablanca is our biggest film, and members also came to Parasite, Spirited Away and Jaws. It\'s all in the tickets.' },
          { text: 'Nostalgia is a business.', why: 'Maybe, but Dana wants numbers, and Juno has them.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 2 review: the five newest films, newest first.',
        tiles: ['SELECT title, year', 'FROM films', 'ORDER BY year DESC', 'LIMIT 5;'],
        distractors: ['ORDER BY year', 'WHERE LIMIT 5'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many JOINs does it take to go from tickets to films?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'A question you\'ve asked that needed facts from three places (a calendar, a map, a message). How did you put them together?',
    starters: ['I needed...', 'I put them together by...'],
  },
  deepen: {
    title: 'Draw the chain',
    summary: 'Sketch the four tables as boxes and draw an arrow for every foreign key. Every JOIN you write is one of those arrows.',
  },
  notes: 'starlight.sql: Parasite (screening 15) = 12 tickets, 9 members; Casablanca = 38 tickets (18 at screening 1, 20 at screening 17); Jack Murphy (13) = 5 tickets: Paddington 2, Roman Holiday x2, Casablanca, The Princess Bride.',
};

export default lesson;
