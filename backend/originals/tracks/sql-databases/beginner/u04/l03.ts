import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Myth or Fact opener: MIN and MAX on numbers, dates and text. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'MIN and MAX',
  summary: '4 weeks to the 100th. Ms Delgado asks how far ahead people book. Leo wants the oldest and newest films for the poster. Two small functions answer both.',
  minutes: 10,
  outcomes: [
    'Find the smallest and biggest values with MIN and MAX',
    'Use them on numbers, dates and text',
    'Combine several aggregates in one SELECT',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'MAX only works on numbers.', isFact: false, explain: 'It works on dates written year first, and on text too (alphabetical).' },
        { text: 'MIN(bought_on) gives the earliest booking date.', isFact: true, explain: 'Year-first dates sort correctly, so the smallest is the earliest.' },
        { text: 'You can only use one aggregate per query.', isFact: false, explain: 'SELECT MIN(year), MAX(year), COUNT(*) FROM films; returns all three in one row.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Oldest, newest, longest',
      database: 'starlight',
      code: 'SELECT MIN(year) AS oldest,\n       MAX(year) AS newest,\n       MAX(minutes) AS longest\nFROM films;\n',
      caption: 'Three answers in one row. Run it.',
      challenge: 'Add MIN(minutes) AS shortest. Which film is that, do you remember?',
    },
  ],
  apply: {
    scenario: 'The earliest booking and the poster\'s extremes.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does MAX(price) FROM screenings give?',
        options: [
          { text: 'The most expensive screening price' },
          { text: 'The number of prices', why: 'That\'s COUNT.' },
          { text: 'Every price, biggest first', why: 'That\'s ORDER BY price DESC. MAX returns one value.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'When was the earliest ticket bought? Show MIN(bought_on) as first_booking.',
        starter: '',
        solution: 'SELECT MIN(bought_on) AS first_booking FROM tickets;\n',
        hint: 'SELECT MIN(bought_on) AS first_booking FROM tickets;',
        database: 'starlight',
        checks: [
          { message: 'Name it first_booking', outputIncludes: 'first_booking' },
          { message: 'Someone booked on 26 August', outputIncludes: '2026-08-26' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The longest and shortest films.',
        template: 'SELECT [[1]](minutes) AS longest, [[2]](minutes) AS shortest\nFROM films;',
        blanks: [['MAX'], ['MIN']],
        distractors: ['TOP', 'SUM', 'LOW'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: 'SELECT MIN(title) FROM films;',
        language: 'sql',
        options: [
          { text: 'The shortest title', why: 'For text, MIN is the first in alphabetical order, not the shortest.' },
          { text: 'An error', why: 'MIN works on text.' },
          { text: 'Alien: the first title alphabetically' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'The poster needs both: the oldest film year as oldest and the newest as newest.',
        starter: 'SELECT\nFROM films;\n',
        solution: 'SELECT MIN(year) AS oldest, MAX(year) AS newest\nFROM films;\n',
        hint: 'SELECT MIN(year) AS oldest, MAX(year) AS newest FROM films;',
        database: 'starlight',
        checks: [
          { message: 'Name them oldest and newest', outputIncludes: 'oldest | newest' },
          { message: '1926 to 2019', outputIncludes: '1926 | 2019' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t do what Leo wants (the most expensive birthday ticket)?',
        lines: ['SELECT MAXIMUM(price)', 'FROM screenings', "WHERE starts_at >= '2026-11-01';"],
        bug: 0,
        fix: 'SELECT MAX(price)',
        explanation: 'The function is MAX. SQL function names are short: MIN, MAX, AVG, SUM, COUNT.',
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Rosa (member 1): her first and last booking dates, as first_bought and last_bought.",
        starter: '',
        solution: 'SELECT MIN(bought_on) AS first_bought, MAX(bought_on) AS last_bought\nFROM tickets\nWHERE member_id = 1;\n',
        hint: 'MIN and MAX of bought_on, WHERE member_id = 1',
        database: 'starlight',
        checks: [
          { message: 'Name them first_bought and last_bought', outputIncludes: 'first_bought | last_bought' },
          { message: 'Use WHERE member_id = 1', codeIncludes: 'member_id = 1' },
          { message: 'Her bookings run from 2 September to 6 October', outputIncludes: '2026-09-02 | 2026-10-06' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which function answers it?',
        groups: ['COUNT', 'SUM', 'MAX'],
        items: [
          { text: 'How many members are in Cicero?', group: 0 },
          { text: 'What did October take?', group: 1 },
          { text: 'What\'s the latest booking date?', group: 2 },
          { text: 'How many films are comedies?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'MAX(minutes) says 132. But which film is it? MAX won\'t tell me.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Right: MAX gives the value, not the row. For the film, ORDER BY minutes DESC LIMIT 1. It\'s Parasite.' },
          { text: 'Add title to the SELECT and it will always be right.', why: 'SQLite happens to allow it, but most databases refuse, and it\'s easy to get wrong.' },
          { text: 'You can\'t find out.', why: 'You can, with ORDER BY and LIMIT from Chapter 2.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 3 review: build the start of "every screening, even unsold".',
        tiles: ['FROM screenings s', 'LEFT JOIN tickets t', 'ON t.screening_id = s.id'],
        distractors: ['JOIN tickets t', 'ON t.id = s.id'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'SELECT MAX(price) FROM screenings; Birthday seats are $25, evenings $14, matinees $9. What comes back?',
        answers: ['25'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What are the "extremes" worth knowing in your life: your longest streak, your biggest expense, your earliest start? Which surprises you?',
    starters: ['My biggest...', 'What surprises me is...'],
  },
  deepen: {
    title: 'The row behind the MAX',
    summary: 'To get the whole row with the biggest value, use ORDER BY … DESC LIMIT 1, or a subquery: WHERE minutes = (SELECT MAX(minutes) FROM films).',
  },
  notes: 'starlight.sql: MIN(year) 1926, MAX(year) 2019, MAX(minutes) 132 (Parasite), MIN(minutes) 78 (The General); MIN(bought_on) 2026-08-26; MIN(title) Alien; max screening price 25.',
};

export default lesson;
