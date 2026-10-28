import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Tap to explore: IN (a list) and BETWEEN (a range). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'IN and BETWEEN',
  summary: '6 weeks to the 100th. Ms Delgado emails: "Bookings for the 1950s season, and anything in October." Juno\'s WHERE is turning into a wall of ORs. Two words shrink it.',
  minutes: 10,
  outcomes: [
    'Match any value in a list with IN',
    'Match a range with BETWEEN … AND …',
    'Rewrite long OR chains as IN',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Tap the shortcuts',
      text: "WHERE genre IN ('Comedy', 'Animation') AND year BETWEEN 1950 AND 2010",
      hotspots: [
        { phrase: "IN ('Comedy', 'Animation')", note: "Any value in the list. Same as genre = 'Comedy' OR genre = 'Animation', but shorter." },
        { phrase: 'BETWEEN 1950 AND 2010', note: 'A range, and both ends count: 1950 and 2010 are included. Same as year >= 1950 AND year <= 2010.' },
        { phrase: 'AND year', note: 'You can still combine them with AND and OR like any other condition.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The 1950s season',
      database: 'starlight',
      code: 'SELECT title, year FROM films\nWHERE year BETWEEN 1950 AND 1959\nORDER BY year;\n',
      caption: 'Four films from the 1950s, oldest first. Run it.',
      challenge: "Add AND genre IN ('Thriller', 'Comedy'). Which film drops out?",
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: "Dates with times need care: '2026-10-31 19:30' is bigger than '2026-10-31', so BETWEEN … AND '2026-10-31' would miss a show that evening. starts_at < '2026-11-01' is safer.",
    },
  ],
  apply: {
    scenario: 'Ms Delgado\'s email.',
    items: [
      {
        kind: 'mcq',
        prompt: "Which is the same as genre IN ('Drama', 'Romance')?",
        options: [
          { text: "genre = 'Drama' AND genre = 'Romance'", why: 'A film has one genre, so AND finds nothing.' },
          { text: "genre = 'Drama' OR genre = 'Romance'" },
          { text: "genre LIKE 'Drama%Romance'", why: 'That\'s a pattern, not a list.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "Show the title and genre of every comedy or animation. Use IN.",
        starter: 'SELECT title, genre FROM films\n',
        solution: "SELECT title, genre FROM films\nWHERE genre IN ('Comedy', 'Animation');\n",
        hint: "WHERE genre IN ('Comedy', 'Animation');",
        database: 'starlight',
        checks: [
          { message: 'Include Coco and The General', outputIncludes: 'Coco | Animation' },
          { message: 'All 5 films', outputIncludes: '(5 rows)' },
          { message: 'Use IN', codeIncludes: 'in (' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Films made from 1950 to 1959.',
        template: 'SELECT title FROM films\nWHERE year [[1]] 1950 [[2]] 1959;',
        blanks: [['BETWEEN'], ['AND']],
        distractors: ['IN', 'TO', 'OR'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Is a film from 1959 included?',
        code: 'WHERE year BETWEEN 1950 AND 1959',
        language: 'sql',
        options: [
          { text: 'No, BETWEEN leaves out the ends', why: 'BETWEEN includes both ends.' },
          { text: 'Only if it\'s a comedy', why: 'Genre has nothing to do with this condition.' },
          { text: 'Yes: both ends count' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: "Show the id and starts_at of every screening in October 2026: starts_at BETWEEN '2026-10-01' AND '2026-10-31 23:59'.",
        starter: '',
        solution: "SELECT id, starts_at FROM screenings\nWHERE starts_at BETWEEN '2026-10-01' AND '2026-10-31 23:59';\n",
        hint: "WHERE starts_at BETWEEN '2026-10-01' AND '2026-10-31 23:59'",
        database: 'starlight',
        checks: [
          { message: 'Starts with Casablanca night, screening 17', outputIncludes: '17 | 2026-10-02 19:30' },
          { message: 'All 8 October screenings', outputIncludes: '(8 rows)' },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: members who live in Skokie or Cicero, using IN.',
        tiles: ['SELECT name FROM members', 'WHERE city IN', "('Skokie', 'Cicero')", ';'],
        distractors: ["('Skokie' OR 'Cicero')", 'BETWEEN'],
        language: 'sql',
      },
      {
        kind: 'findBug',
        prompt: 'Which line has the mistake?',
        lines: ['SELECT name FROM members', "WHERE city IN ('Skokie' 'Cicero');"],
        bug: 1,
        fix: "WHERE city IN ('Skokie', 'Cicero');",
        explanation: 'The values in an IN list need commas between them, like columns after SELECT.',
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Walt wants to call Rosa and Jack, members 1 and 13, about seat G7. Show their name and email using IN.',
        starter: '',
        solution: 'SELECT name, email FROM members WHERE id IN (1, 13);\n',
        hint: 'WHERE id IN (1, 13) (numbers, no quotes).',
        database: 'starlight',
        checks: [
          { message: 'Rosa Marin and Jack Murphy', outputIncludes: 'Jack Murphy' },
          { message: 'Just the 2 of them', outputIncludes: '(2 rows)' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'IN or BETWEEN?',
        groups: ['IN (a list)', 'BETWEEN (a range)'],
        items: [
          { text: 'Members 1, 13 and 40', group: 0 },
          { text: 'Films 90 to 110 minutes long', group: 1 },
          { text: 'Genres: Drama, Romance, Musical', group: 0 },
          { text: 'Tickets bought from 1 to 7 October', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'Why not just write OR five times? It works.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'It works, but IN is one short line that says what you mean. Five ORs are five chances for a typo.' },
          { text: 'OR is slower to run.', why: 'The database often runs them the same way. The real win is reading and typing.' },
          { text: 'OR is not allowed with text.', why: 'It is allowed. IN is just neater.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Chapter 1 review: what goes after a column type to make sure it is never empty? (Two words.)',
        answers: ['NOT NULL'],
        placeholder: 'Two words',
      },
    ],
  },
  reflect: {
    prompt: 'Which questions in your work or life are about a list ("these three people") and which about a range ("from Monday to Friday")?',
    starters: ['A list question is...', 'A range question is...'],
  },
  deepen: {
    title: 'NOT IN and NOT BETWEEN',
    summary: 'Both can be flipped: genre NOT IN (\'Comedy\') keeps every other genre. Careful: NOT IN with a NULL in the list finds nothing at all.',
  },
  notes: "starlight.sql: Comedy/Animation = Some Like It Hot, The Princess Bride, Spirited Away, Coco, The General (5); 1950-1959 = Roman Holiday 1953, Rear Window 1954, Vertigo 1958, Some Like It Hot 1959; October screenings = 17-24 (8); members 1 Rosa Marin, 13 Jack Murphy. BETWEEN is inclusive (sqlite.org/lang_expr.html#between).",
};

export default lesson;
