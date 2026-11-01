import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Card deck: DISTINCT, AS (aliases) and maths in SELECT. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'DISTINCT, AS and maths',
  summary: '6 weeks to the 100th. Walt has an idea: add $2 to every birthday ticket for the roof fund. Leo wants the poster to say "two hours of Vertigo". The database can do the maths and name the answers.',
  minutes: 11,
  outcomes: [
    'List each value once with DISTINCT',
    'Do maths on columns in SELECT',
    'Name a result column with AS',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>DISTINCT</strong> removes repeats. Which cities do members come from?</p><p><code>SELECT DISTINCT city FROM members;</code></p><p>40 members, but only 5 cities. Each comes back once.</p>',
    },
    {
      kind: 'text',
      html: '<p>SELECT can also <strong>calculate</strong>: <code>price + 2</code>, <code>minutes / 60.0</code>. The table doesn\'t change; only the answer does.</p><p><strong>AS</strong> gives the result a readable name: <code>price + 2 AS with_fund</code>.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The roof fund',
      database: 'starlight',
      code: "SELECT starts_at, price, price + 2 AS with_fund\nFROM screenings\nWHERE starts_at >= '2026-11-01';\n",
      caption: 'The three birthday screenings, at $25 and with the $2 roof fund added. Run it.',
      challenge: 'Change + 2 to * 1.1 to see a 10% rise instead.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Whole number divided by whole number gives a whole number: 128 / 60 is 2, not 2.13. Divide by 60.0 to keep the decimals.',
    },
  ],
  apply: {
    scenario: 'Maths for the roof fund and the poster.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does DISTINCT do?',
        options: [
          { text: 'Sorts the rows', why: 'That\'s ORDER BY.' },
          { text: 'Shows each different value only once' },
          { text: 'Finds missing values', why: 'That\'s IS NULL.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Which genres does the Starlight show? List each genre once.',
        starter: 'SELECT genre FROM films;\n',
        solution: 'SELECT DISTINCT genre FROM films;\n',
        hint: 'Put DISTINCT straight after SELECT.',
        database: 'starlight',
        checks: [
          { message: 'Include Animation', outputIncludes: 'Animation' },
          { message: 'Each of the 8 genres once', outputIncludes: '(8 rows)' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the SQL to what it gives.',
        pairs: [
          ['DISTINCT city', 'Each city once'],
          ['price + 2', 'The price plus two dollars'],
          ['AS with_fund', 'Names the result column'],
          ['minutes / 60.0', 'The length in hours'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Vertigo is 128 minutes. What does this show for it?',
        code: 'SELECT title, minutes / 60 AS hours\nFROM films WHERE id = 3;',
        language: 'sql',
        options: [
          { text: '2.13', why: 'Both numbers are whole, so SQLite drops the decimals.' },
          { text: '128', why: 'It divides by 60 first.' },
          { text: '2' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'For the poster: show each film\'s title and its length in hours, as a column called hours. Divide by 60.0.',
        starter: '',
        solution: 'SELECT title, minutes / 60.0 AS hours FROM films;\n',
        hint: 'SELECT title, minutes / 60.0 AS hours FROM films;',
        database: 'starlight',
        checks: [
          { message: 'Name the column hours', outputIncludes: 'title | hours' },
          { message: 'Use 60.0 so the decimals stay', outputIncludes: 'The General | 1.3' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Show each evening price with the $2 roof fund added, named with_fund.',
        template: 'SELECT id, price [[1]] 2 [[2]] with_fund\nFROM screenings WHERE price = 14;',
        blanks: [['+'], ['AS']],
        distractors: ['*', 'IS', '='],
        language: 'sql',
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the query?',
        lines: ['SELECT title,', '       minutes / 60.0 AS length in hours', 'FROM films;'],
        bug: 1,
        fix: '       minutes / 60.0 AS hours',
        explanation: 'A name after AS can\'t have spaces (unless you put it in double quotes). Keep it one word: hours, or length_hours.',
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Which cities do members live in? Each city once, in alphabetical order.',
        starter: '',
        solution: 'SELECT DISTINCT city FROM members ORDER BY city;\n',
        hint: 'SELECT DISTINCT city FROM members ORDER BY city;',
        database: 'starlight',
        checks: [
          { message: 'Chicago comes first', outputIncludes: 'city Chicago Cicero' },
          { message: 'Each of the 5 cities once', outputIncludes: '(5 rows)' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'So if I add $2 in your SELECT, the prices go up?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Yes, the table changes.', why: 'SELECT never changes the data. Changing it is UPDATE, in Chapter 5.' },
          { text: 'No. SELECT only shows the maths. The real prices stay $25 until we decide to change them.' },
          { text: 'Only for members.', why: 'SELECT doesn\'t change any rows, for anyone.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Chapter 2 review: which tool fits?',
        groups: ['LIKE', 'IN', 'IS NULL'],
        items: [
          { text: 'Titles starting with "The"', group: 0 },
          { text: 'Members 1, 13 and 40', group: 1 },
          { text: 'Tickets with no member', group: 2 },
          { text: 'Names containing "an"', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Run it in your head: SELECT 25 + 2 AS with_fund; What number comes back?',
        answers: ['27'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'If you could add one calculated column to a list in your life (a budget, a training log), what would it be and what would you call it?',
    starters: ['I\'d add...', 'I\'d call it...'],
  },
  deepen: {
    title: 'ROUND',
    summary: 'ROUND(minutes / 60.0, 1) rounds to one decimal place: 2.1 hours. You\'ll use it for money in Chapter 4.',
  },
  notes: 'starlight.sql: 8 genres (Drama, Musical, Thriller, Comedy, Romance, Sci-Fi, Animation, Family); 5 cities (Chicago, Cicero, Evanston, Oak Park, Skokie); The General 78 min = 1.3 h. SQLite integer division truncates (sqlite.org/lang_expr.html). The $2 roof fund is a story idea, not a real price.',
};

export default lesson;
