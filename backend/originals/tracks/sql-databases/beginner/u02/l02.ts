import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Chat with Tey: comparisons on numbers, text dates and "not equal". */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Bigger, smaller, not equal',
  summary: '6 weeks to the 100th. Round two of the bet. "Which films are older than 1950?" Walt counts on his fingers. Juno reaches for the less-than sign.',
  minutes: 10,
  outcomes: [
    'Filter with >, <, >=, <= and <> (not equal)',
    'Compare dates written as YYYY-MM-DD text',
    'Pick the right comparison for a question',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'WHERE can do more than "equals". year < 1950 means "year is less than 1950".', replies: ['What else is there?'] },
        { tey: '> bigger than, < smaller than, >= and <= "or equal to", and <> means not equal. So price <> 9 skips the matinees.', replies: ['Do dates work?'] },
        { tey: "Ours do. starts_at is text like '2026-10-02 19:30', biggest part first. Text compares letter by letter, so later dates come out bigger.", replies: ['So starts_at >= \'2026-10-01\' is October onwards?'] },
        { tey: "Exactly. That's why databases store dates year first. '02/10/2026' would sort all wrong." },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Round two',
      database: 'starlight',
      code: 'SELECT title, year FROM films WHERE year < 1950;\n',
      caption: 'Three films older than 1950. Run it.',
      challenge: 'Change it to films longer than two hours: WHERE minutes > 120. How many?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '< 1950 does not include 1950 itself. If the question says "1950 or earlier", use <= 1950.',
    },
  ],
  apply: {
    scenario: 'Round two: numbers and dates.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the sign to its meaning.',
        pairs: [
          ['>', 'Bigger than'],
          ['<', 'Smaller than'],
          ['>=', 'Bigger than or equal to'],
          ['<>', 'Not equal to'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Show the title and minutes of every film longer than 120 minutes.',
        starter: 'SELECT title, minutes FROM films\n',
        solution: 'SELECT title, minutes FROM films\nWHERE minutes > 120;\n',
        hint: 'WHERE minutes > 120;',
        database: 'starlight',
        checks: [
          { message: 'Include Parasite (132 minutes)', outputIncludes: 'Parasite | 132' },
          { message: 'Exactly 5 films', outputIncludes: '(5 rows)' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which condition finds films from 1950 or earlier?',
        options: [
          { text: 'year < 1950', why: 'That leaves out a film made in 1950.' },
          { text: 'year > 1950', why: 'That\'s the films after 1950.' },
          { text: 'year <= 1950' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Show every evening screening: price more than 9. Show id, starts_at and price.',
        starter: '',
        solution: 'SELECT id, starts_at, price FROM screenings WHERE price > 9;\n',
        hint: 'WHERE price > 9 (matinees are $9; evenings $14; the birthday $25).',
        database: 'starlight',
        checks: [
          { message: 'Show id, starts_at and price', outputIncludes: 'id | starts_at | price' },
          { message: 'All 15 non-matinee screenings', outputIncludes: '(15 rows)' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Every screening that is NOT a $9 matinee.',
        template: 'SELECT * FROM screenings WHERE price [[1]] 9;',
        blanks: [['<>', '!=']],
        distractors: ['=', '><', 'NOT'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: "Which screenings does this find?",
        code: "SELECT * FROM screenings\nWHERE starts_at >= '2026-11-01';",
        language: 'sql',
        options: [
          { text: 'The three 100th-birthday screenings in November' },
          { text: 'None: you can\'t compare text', why: 'You can. Year-first dates compare correctly as text.' },
          { text: 'Every screening', why: 'Only the ones on or after 1 November.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "Show the id and starts_at of every screening in October 2026 or later.",
        starter: '',
        solution: "SELECT id, starts_at FROM screenings WHERE starts_at >= '2026-10-01';\n",
        hint: "WHERE starts_at >= '2026-10-01' (a date is text, so quotes).",
        database: 'starlight',
        checks: [
          { message: 'Show id and starts_at', outputIncludes: 'id | starts_at' },
          { message: '8 in October plus the 3 birthday screenings', outputIncludes: '(11 rows)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes this find nothing?',
        lines: ['SELECT title FROM films', 'WHERE year > 2000', '  AND year < 1990;'],
        bug: 2,
        fix: '  AND year < 2020;',
        explanation: 'No film is both after 2000 and before 1990. Next lesson is all about AND.',
        language: 'sql',
      },
      {
        kind: 'sortGroups',
        prompt: 'Chapter 1 review: which type would each column have?',
        groups: ['TEXT', 'INTEGER', 'REAL'],
        items: [
          { text: 'starts_at', group: 0 },
          { text: 'minutes', group: 1 },
          { text: 'price', group: 2 },
          { text: 'seat', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: "Why do you write dates as 2026-10-02? Normal people write 10/02.",
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Because databases are not normal people.', why: 'Funny, but it doesn\'t explain anything.' },
          { text: 'Year first means the text sorts in date order, so >= and ORDER BY just work.' },
          { text: 'It\'s an American thing.', why: 'Most Americans write month first. This is the international standard, ISO 8601.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Run it in your head: SELECT title FROM films WHERE year < 1930; Which film comes back?',
        answers: ['The General', 'General'],
        placeholder: 'A title',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a decision with a cut-off: a budget limit, a minimum age, a deadline. How would you write it with > or <?',
    starters: ['My cut-off is...', 'In SQL it would be...'],
  },
  deepen: {
    title: 'Dates in real databases',
    summary: 'Many databases have a DATE type. SQLite keeps dates as text in the ISO 8601 format (YYYY-MM-DD) and has date functions that read it.',
  },
  notes: 'starlight.sql: films before 1950 = The General 1926, The Wizard of Oz 1939, Casablanca 1942; over 120 min = Vertigo 128, Some Like It Hot 121, Jaws 124, Spirited Away 125, Parasite 132; price > 9 = 12 evenings + 3 birthday = 15; starts_at >= 2026-10-01 = screenings 17-27 = 11. Dates: ISO 8601; SQLite date and time functions read it (sqlite.org/lang_datefunc.html).',
};

export default lesson;
