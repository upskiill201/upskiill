import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Before/after: unsorted vs ORDER BY; DESC and LIMIT. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'ORDER BY and LIMIT',
  summary: '6 weeks to the 100th. Leo is designing the birthday poster: "the three longest films we\'ve shown". Walt says Casablanca. Juno sorts, then cuts.',
  minutes: 10,
  outcomes: [
    'Sort rows with ORDER BY, smallest first',
    'Sort the other way with DESC',
    'Keep just the top few with LIMIT',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The same films, two ways',
      before: { label: 'No ORDER BY', text: 'Casablanca 102\nThe Wizard of Oz 102\nVertigo 128\nRear Window 112\n…in whatever order they were added' },
      after: { label: 'ORDER BY minutes DESC LIMIT 3', text: 'Parasite 132\nVertigo 128\nSpirited Away 125' },
      notes: [
        'Without ORDER BY, the order is not promised. Never rely on it.',
        'ORDER BY minutes sorts smallest first. DESC (descending) flips it: biggest first.',
        'LIMIT 3 keeps only the first three rows after sorting.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'The poster\'s top three',
      database: 'starlight',
      code: 'SELECT title, minutes FROM films\nORDER BY minutes DESC\nLIMIT 3;\n',
      caption: 'Sorted longest first, then cut to three. Run it.',
      challenge: 'Remove DESC. Now you get the three shortest. Which film is shortest?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The order is always: SELECT … FROM … WHERE … ORDER BY … LIMIT. WHERE picks the rows, ORDER BY sorts them, LIMIT cuts the list.',
    },
  ],
  apply: {
    scenario: 'Facts for the birthday poster.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does DESC do in ORDER BY year DESC?',
        options: [
          { text: 'Sorts newest first: biggest year at the top' },
          { text: 'Describes the table', why: 'Some databases use DESCRIBE for that, but in ORDER BY, DESC means descending.' },
          { text: 'Removes the year column', why: 'It only changes the order.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the title and year of every film, oldest first.',
        starter: 'SELECT title, year FROM films\n',
        solution: 'SELECT title, year FROM films\nORDER BY year;\n',
        hint: 'ORDER BY year; (smallest first is the default).',
        database: 'starlight',
        checks: [
          { message: 'The General (1926) comes first', outputIncludes: 'title | year The General | 1926' },
          { message: 'All 15 films', outputIncludes: '(15 rows)' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the query in the order SQL needs.',
        lines: ['SELECT title, year', 'FROM films', "WHERE genre = 'Thriller'", 'ORDER BY year DESC', 'LIMIT 2;'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Show the title and minutes of the three LONGEST films.',
        starter: '',
        solution: 'SELECT title, minutes FROM films\nORDER BY minutes DESC\nLIMIT 3;\n',
        hint: 'ORDER BY minutes DESC, then LIMIT 3.',
        database: 'starlight',
        checks: [
          { message: 'Parasite first, at 132 minutes', outputIncludes: 'title | minutes Parasite | 132' },
          { message: 'Only 3 films', outputIncludes: '(3 rows)' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: 'SELECT title FROM films\nORDER BY year DESC\nLIMIT 1;',
        language: 'sql',
        options: [
          { text: 'The General, the oldest', why: 'DESC puts the biggest year first: the newest.' },
          { text: 'Every film, newest first', why: 'LIMIT 1 keeps just one row.' },
          { text: 'Parasite (2019), the newest' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The five most recent members to join.',
        template: 'SELECT name, joined FROM members\nORDER BY joined [[1]]\n[[2]] 5;',
        blanks: [['DESC'], ['LIMIT']],
        distractors: ['ASC', 'TOP', 'MAX'],
        language: 'sql',
      },
      {
        kind: 'findBug',
        prompt: 'Which line is in the wrong place?',
        lines: ['SELECT title, minutes', 'FROM films', 'LIMIT 3', 'ORDER BY minutes DESC;'],
        bug: 2,
        fix: '(move LIMIT 3 to the end)',
        explanation: 'LIMIT always comes last: sort first, then cut.',
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "The first two screenings ever in the database: show id and starts_at, earliest first, two rows.",
        starter: '',
        solution: 'SELECT id, starts_at FROM screenings\nORDER BY starts_at\nLIMIT 2;\n',
        hint: 'ORDER BY starts_at (year-first dates sort correctly), LIMIT 2.',
        database: 'starlight',
        checks: [
          { message: 'Starts with Fri 4 Sep', outputIncludes: '1 | 2026-09-04 19:30' },
          { message: 'Just 2 rows', outputIncludes: '(2 rows)' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'I ran SELECT title FROM films and Casablanca came first. So it\'s the oldest?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Yes, the first row is always the oldest.', why: 'Without ORDER BY there\'s no promised order at all.' },
          { text: 'No. It\'s first because I typed it in first. Without ORDER BY, the order means nothing. The oldest is The General.' },
          { text: 'Rows are random.', why: 'Not random, just not promised. Never rely on it.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Chapter 1 review: which INSERT puts text in correctly?',
        options: [
          { text: "VALUES (16, \"Metropolis\", 1927)", why: 'Double quotes are for names of columns and tables in SQL, not text.' },
          { text: 'VALUES (16, Metropolis, 1927)', why: 'Without quotes, SQL thinks Metropolis is a column.' },
          { text: "VALUES (16, 'Metropolis', 1927)" },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word, added to ORDER BY, sorts biggest first?',
        answers: ['DESC', 'DESCENDING'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'What "top 3" would be useful in your own life: biggest expenses, most-played songs, longest commutes? What would you sort by?',
    starters: ['My top 3 would be...', 'Sorted by...'],
  },
  deepen: {
    title: 'Sorting by two columns',
    summary: 'ORDER BY genre, year sorts by genre first, then by year inside each genre. Try it on films.',
  },
  notes: 'starlight.sql: longest = Parasite 132, Vertigo 128, Spirited Away 125; oldest = The General 1926; newest = Parasite 2019; first screenings = 1 (2026-09-04 19:30), 2 (2026-09-05 14:00). Without ORDER BY, SQL does not guarantee row order.',
};

export default lesson;
