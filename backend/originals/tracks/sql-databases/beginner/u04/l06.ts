import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Tap to explore: GROUP BY on joined tables (takings per film). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'GROUP BY with JOIN',
  summary: '4 weeks to the 100th. Walt has to pick the films for next spring. "Which ones earn?" Takings live in tickets; titles live in films. Juno joins, then groups.',
  minutes: 11,
  outcomes: [
    'Group joined rows by a column from another table',
    'Total and count per film, per genre, per city',
    'Rank the groups to make a decision',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Takings per film, part by part',
      text: 'SELECT f.title, COUNT(*) AS sold, SUM(t.price_paid) AS takings FROM tickets t JOIN screenings s ON t.screening_id = s.id JOIN films f ON s.film_id = f.id GROUP BY f.title ORDER BY takings DESC',
      hotspots: [
        { phrase: 'FROM tickets t', note: 'Start where the money is: one row per ticket.' },
        { phrase: 'JOIN films f ON s.film_id = f.id', note: 'The joins stick each ticket\'s film onto its row (via screenings).' },
        { phrase: 'GROUP BY f.title', note: 'Then pile the tickets up by film title: one pile per film.' },
        { phrase: 'SUM(t.price_paid) AS takings', note: 'Add up each pile\'s money.' },
        { phrase: 'ORDER BY takings DESC', note: 'Biggest earner first, so the decision is easy to read.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Which films earn?',
      database: 'starlight',
      code: 'SELECT f.title, COUNT(*) AS sold, SUM(t.price_paid) AS takings\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nGROUP BY f.title\nORDER BY takings DESC;\n',
      caption: 'Fourteen films that sold tickets, ranked by money. Run it.',
      challenge: 'Change GROUP BY f.title to f.genre (and the SELECT too). Which genre earns most?',
    },
  ],
  apply: {
    scenario: 'Picking next spring\'s films.',
    items: [
      {
        kind: 'mcq',
        prompt: 'To get takings per film title, what do you GROUP BY?',
        options: [
          { text: 't.price_paid', why: 'That groups tickets by price, not by film.' },
          { text: 's.id', why: 'That\'s one group per screening; Casablanca had two.' },
          { text: 'f.title' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Takings per film: f.title and SUM(t.price_paid) as takings, biggest first.',
        starter: 'SELECT f.title, SUM(t.price_paid) AS takings\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\n',
        solution: 'SELECT f.title, SUM(t.price_paid) AS takings\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nGROUP BY f.title\nORDER BY takings DESC;\n',
        hint: 'GROUP BY f.title ORDER BY takings DESC',
        database: 'starlight',
        checks: [
          { message: 'Casablanca tops it with $476', outputIncludes: 'title | takings Casablanca | 476' },
          { message: '14 films sold tickets', outputIncludes: '(14 rows)' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the query in order.',
        lines: ['SELECT f.genre, COUNT(*) AS sold', 'FROM tickets t', 'JOIN screenings s ON t.screening_id = s.id', 'JOIN films f ON s.film_id = f.id', 'GROUP BY f.genre', 'ORDER BY sold DESC;'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Tickets per genre: f.genre and COUNT(*) as sold, most first, top 1.',
        starter: '',
        solution: 'SELECT f.genre, COUNT(*) AS sold\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nGROUP BY f.genre\nORDER BY sold DESC\nLIMIT 1;\n',
        hint: 'GROUP BY f.genre ORDER BY sold DESC LIMIT 1',
        database: 'starlight',
        checks: [
          { message: 'Thrillers sold 105 tickets', outputIncludes: 'Thriller | 105' },
          { message: 'Just the top genre', outputIncludes: '(1 row)' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Members live in 5 cities. How many rows?',
        code: 'SELECT m.city, COUNT(*)\nFROM tickets t\nJOIN members m ON t.member_id = m.id\nGROUP BY m.city;',
        language: 'sql',
        options: [
          { text: '5' },
          { text: '266, one per member ticket', why: 'GROUP BY makes one row per city.' },
          { text: '6, with a row for walk-ins', why: 'JOIN drops walk-ins, so no NULL city group.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Member tickets per city.',
        template: 'SELECT m.city, COUNT(*) AS sold\nFROM tickets t\nJOIN members m ON t.member_id = m.[[1]]\nGROUP BY [[2]];',
        blanks: [['id'], ['m.city']],
        distractors: ['member_id', 't.city', 'city_id'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Which city\'s members buy the most tickets? m.city and COUNT(*) as sold, most first.',
        starter: '',
        solution: 'SELECT m.city, COUNT(*) AS sold\nFROM tickets t\nJOIN members m ON t.member_id = m.id\nGROUP BY m.city\nORDER BY sold DESC;\n',
        hint: 'JOIN members, GROUP BY m.city, ORDER BY sold DESC',
        database: 'starlight',
        checks: [
          { message: 'Chicago first with 141', outputIncludes: 'city | sold Chicago | 141' },
          { message: 'Oak Park is second, with 45', outputIncludes: 'Oak Park | 45' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gives one row per screening instead of per film?',
        lines: ['SELECT f.title, SUM(t.price_paid)', 'FROM tickets t', 'JOIN screenings s ON t.screening_id = s.id', 'JOIN films f ON s.film_id = f.id', 'GROUP BY s.id;'],
        bug: 4,
        fix: 'GROUP BY f.title;',
        explanation: 'Casablanca played twice, so grouping by screening splits its money in two. Group by the film.',
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'Thrillers sell the most tickets. So, all thrillers next spring?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Yes, only thrillers.', why: 'Four thrillers sold 105 tickets; that\'s also partly because there were more thriller screenings.' },
          { text: 'More thrillers, sure. But there were more thriller screenings too, so let\'s compare per screening before we drop anything.' },
          { text: 'No, data can\'t pick films.', why: 'It can inform the choice. Walt still makes it.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 2 review: films from 2017, using IN.',
        tiles: ['SELECT title FROM films', 'WHERE year IN', '(2017)', ';'],
        distractors: ['WHERE year LIKE', '(2017, 2018 OR)'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which film took the most money this autumn?',
        answers: ['Casablanca'],
        placeholder: 'A title',
      },
    ],
  },
  reflect: {
    prompt: 'A "biggest earner" can be misleading if some things got more chances (more screenings, more shelf space). Where have you seen that in real life?',
    starters: ['I saw it when...', 'A fairer comparison would be...'],
  },
  deepen: {
    title: 'Per screening, not per film',
    summary: 'Divide each film\'s ticket count by its number of screenings (COUNT(DISTINCT s.id)) to compare films fairly. Try it.',
  },
  notes: 'starlight.sql: takings per film top = Casablanca 476 (38), Jaws 434 (35), Back to the Future 392 (31); 14 films sold tickets (The General has none); genre tickets Thriller 105; member tickets per city Chicago 141, Oak Park 45, Skokie 34, Evanston 32, Cicero 14.',
};

export default lesson;
