import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Reading: JOIN first, then WHERE and ORDER BY on any joined column. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'JOIN, then filter and sort',
  summary: '5 weeks to the 100th. Dana tells a city councillor the Starlight "only sells old films to old neighbours". Juno filters the joined tickets by film year, by city and by genre.',
  minutes: 11,
  outcomes: [
    'Filter joined rows on a column from any table',
    'Sort joined rows by a column from any table',
    'Build a query in the order SQL needs',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'One big table, for a moment',
      html: '<p>Think of a JOIN as building one wide, temporary table: every ticket, with its screening\'s columns and its film\'s columns stuck on the side.</p><p>After that, <strong>WHERE and ORDER BY work on any of those columns</strong>, from any table:</p><p><code>WHERE f.year >= 2000</code> (from films)<br><code>AND m.city = \'Evanston\'</code> (from members)<br><code>ORDER BY s.starts_at</code> (from screenings)</p><p>The order of the parts never changes: <strong>SELECT, FROM, JOINs, WHERE, ORDER BY, LIMIT</strong>.</p><p>Dana says the Starlight only sells old films. The tickets say otherwise: films made since 2000 sold 66 tickets in six weekends.</p>',
    },
    {
      kind: 'tryIt',
      title: 'New films, new audiences',
      database: 'starlight',
      code: 'SELECT f.title, f.year, s.starts_at, t.seat\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nWHERE f.year >= 2000\nORDER BY s.starts_at;\n',
      caption: 'Every ticket for a film made since 2000, in date order. Run it and check the row count.',
      challenge: "Add AND f.genre = 'Animation' to the WHERE. How many tickets were for animation?",
    },
  ],
  apply: {
    scenario: 'Answering Dana with filtered joins.',
    items: [
      {
        kind: 'mcq',
        prompt: 'After a JOIN, which columns can WHERE use?',
        options: [
          { text: 'Only columns from the FROM table', why: 'Any joined table\'s columns can be used.' },
          { text: 'Columns from any of the joined tables' },
          { text: 'Only columns in the SELECT list', why: 'WHERE can filter on columns you don\'t even show.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "How many tickets did Evanston members buy? Show the ticket id and member name for members whose city is Evanston.",
        starter: '',
        solution: "SELECT t.id, m.name\nFROM tickets t\nJOIN members m ON t.member_id = m.id\nWHERE m.city = 'Evanston';\n",
        hint: "JOIN members m ON t.member_id = m.id WHERE m.city = 'Evanston'",
        database: 'starlight',
        checks: [
          { message: 'Show id and name', outputIncludes: 'id | name' },
          { message: 'Evanston members bought 32 tickets', outputIncludes: '(32 rows)' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the parts in the order SQL needs.',
        lines: ['SELECT f.title, t.seat', 'FROM tickets t', 'JOIN screenings s ON t.screening_id = s.id', 'JOIN films f ON s.film_id = f.id', "WHERE f.genre = 'Animation'", 'ORDER BY f.title;'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Show the film title and seat of every Animation ticket, sorted by title.",
        starter: '',
        solution: "SELECT f.title, t.seat\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nWHERE f.genre = 'Animation'\nORDER BY f.title;\n",
        hint: "Two JOINs, WHERE f.genre = 'Animation', ORDER BY f.title",
        database: 'starlight',
        checks: [
          { message: 'Coco comes before Spirited Away', outputIncludes: 'title | seat Coco' },
          { message: '34 animation tickets', outputIncludes: '(34 rows)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is in the wrong place?',
        lines: ['SELECT f.title, t.seat', 'FROM tickets t', "WHERE f.genre = 'Comedy'", 'JOIN screenings s ON t.screening_id = s.id', 'JOIN films f ON s.film_id = f.id;'],
        bug: 2,
        fix: '(move the WHERE after the JOINs)',
        explanation: 'WHERE always comes after every JOIN. SQL builds the joined rows first, then filters them.',
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Matinees cost $9. There were 119 matinee tickets. How many rows?',
        code: 'SELECT t.id\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nWHERE s.price = 9;',
        language: 'sql',
        options: [
          { text: '12, one per matinee', why: 'It\'s one row per ticket, not per screening.' },
          { text: '119' },
          { text: '313', why: 'WHERE keeps only matinee tickets.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tickets for films made before 1960, newest screening first.',
        template: 'SELECT f.title, s.starts_at\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\n[[1]] f.year < 1960\n[[2]] s.starts_at DESC;',
        blanks: [['WHERE'], ['ORDER BY']],
        distractors: ['ON', 'GROUP BY', 'LIMIT'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Dana's claim, tested: show the title and starts_at of tickets for films made since 2000 (f.year >= 2000), newest screening first, top 5.",
        starter: '',
        solution: 'SELECT f.title, s.starts_at\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nWHERE f.year >= 2000\nORDER BY s.starts_at DESC\nLIMIT 5;\n',
        hint: 'WHERE f.year >= 2000 ORDER BY s.starts_at DESC LIMIT 5',
        database: 'starlight',
        checks: [
          { message: 'Spirited Away on 10 October is the newest', outputIncludes: 'title | starts_at Spirited Away | 2026-10-10 14:00' },
          { message: 'Just 5 rows', outputIncludes: '(5 rows)' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'dana',
        message: 'Fine. Some young families came to a cartoon. That\'s not a business plan.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'You\'re right.', why: 'She isn\'t, and Juno has the numbers.' },
          { text: 'Cartoons are art.', why: 'True, but it doesn\'t answer the business point.' },
          { text: 'It\'s 66 tickets for films made since 2000, in six weekends. That\'s a pattern, and it\'s going in the bank\'s report.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Chapter 2 review: which comparison?',
        groups: ['=', 'BETWEEN', 'LIKE'],
        items: [
          { text: "Members in exactly 'Skokie'", group: 0 },
          { text: 'Films from 1950 to 1959', group: 1 },
          { text: 'Titles starting with "The"', group: 2 },
          { text: 'Screenings priced 9 to 14', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which comes first in a query: WHERE or JOIN?',
        answers: ['JOIN'],
        placeholder: 'WHERE or JOIN',
      },
    ],
  },
  reflect: {
    prompt: 'Has someone ever made a confident claim about you or your work that the facts didn\'t support? How did you answer?',
    starters: ['The claim was...', 'The facts said...'],
  },
  deepen: {
    title: 'Filtering in ON',
    summary: 'With LEFT JOIN, a condition in ON and the same condition in WHERE can give different answers. Try both on screenings and tickets when you feel brave.',
  },
  notes: 'starlight.sql: tickets for films with year >= 2000 = Spirited Away 18 + Paddington 2 20 + Coco 16 + Parasite 12 = 66; Evanston members 32 tickets; Animation 34 tickets; matinee (price 9) 119 tickets; newest since-2000 screening with tickets = 22 Spirited Away 2026-10-10 14:00.',
};

export default lesson;
