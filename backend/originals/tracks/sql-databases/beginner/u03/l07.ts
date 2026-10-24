import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Myth or Fact opener: LEFT JOIN + IS NULL to find what has no match. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Finding who\'s missing',
  summary: '5 weeks to the 100th. Two worries. Walt: "Is there a member who stopped coming?" Leo: "Which screenings haven\'t sold a single seat?" Both are questions about rows with no match.',
  minutes: 10,
  outcomes: [
    'Find rows with no match: LEFT JOIN, then IS NULL',
    'Check the right column for NULL',
    'Read an empty result as an answer',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'To find screenings with no tickets, you need a special command.', isFact: false, explain: 'No new command: LEFT JOIN tickets, then keep the rows where the ticket side is NULL.' },
        { text: 'After a LEFT JOIN, a NULL ticket id means "no ticket matched this row".', isFact: true, explain: 'Every real ticket has an id, so a NULL id can only mean there was no match.' },
        { text: 'A query that returns 0 rows has failed.', isFact: false, explain: 'Zero rows is an answer. "Which members never came?" → nobody. That\'s good news.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Seats nobody has bought',
      database: 'starlight',
      code: 'SELECT s.id, s.starts_at\nFROM screenings s\nLEFT JOIN tickets t ON t.screening_id = s.id\nWHERE t.id IS NULL;\n',
      caption: 'Every screening, LEFT JOINed to its tickets; keep only the ones where no ticket matched. Run it.',
      challenge: 'Which three screenings are these, and why haven\'t they sold anything yet?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Test a column that is never NULL in real rows, like the id. Here t.id IS NULL can only mean "no ticket".',
    },
  ],
  apply: {
    scenario: 'Who and what is missing?',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which pair of tools finds rows with no match?',
        options: [
          { text: 'JOIN and = NULL', why: 'JOIN drops unmatched rows, and = NULL never matches.' },
          { text: 'DISTINCT and ORDER BY', why: 'Those tidy results; they don\'t find gaps.' },
          { text: 'LEFT JOIN and IS NULL' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Which screenings haven\'t sold a single ticket? Show id and starts_at.',
        starter: 'SELECT s.id, s.starts_at\nFROM screenings s\n',
        solution: 'SELECT s.id, s.starts_at\nFROM screenings s\nLEFT JOIN tickets t ON t.screening_id = s.id\nWHERE t.id IS NULL;\n',
        hint: 'LEFT JOIN tickets t ON t.screening_id = s.id WHERE t.id IS NULL',
        database: 'starlight',
        checks: [
          { message: 'The 100th birthday opener is one', outputIncludes: '25 | 2026-11-20 19:30' },
          { message: 'Exactly 3 screenings', outputIncludes: '(3 rows)' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put "members with no tickets" in order.',
        lines: ['SELECT m.name', 'FROM members m', 'LEFT JOIN tickets t ON t.member_id = m.id', 'WHERE t.id IS NULL;'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Walt's worry: show the name of every member who has NO tickets at all.",
        starter: '',
        solution: 'SELECT m.name\nFROM members m\nLEFT JOIN tickets t ON t.member_id = m.id\nWHERE t.id IS NULL;\n',
        hint: 'Start FROM members m, LEFT JOIN tickets, keep WHERE t.id IS NULL.',
        database: 'starlight',
        checks: [
          { message: 'Start from members and LEFT JOIN tickets', codeIncludes: 'left join tickets' },
          { message: 'Nobody: every member came at least once', outputIncludes: '(0 rows)' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The query above returns 0 rows. What does that mean?',
        code: 'SELECT m.name FROM members m\nLEFT JOIN tickets t ON t.member_id = m.id\nWHERE t.id IS NULL;',
        language: 'sql',
        options: [
          { text: 'Every one of the 40 members has at least one ticket' },
          { text: 'The query is broken', why: 'It ran fine. Zero rows is the answer.' },
          { text: 'There are no members', why: 'There are 40; none of them is missing a ticket.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'This should find screenings with no tickets, but finds none. Which line?',
        lines: ['SELECT s.id', 'FROM screenings s', 'JOIN tickets t ON t.screening_id = s.id', 'WHERE t.id IS NULL;'],
        bug: 2,
        fix: 'LEFT JOIN tickets t ON t.screening_id = s.id',
        explanation: 'A plain JOIN has already dropped the unmatched screenings before WHERE looks for NULLs.',
        language: 'sql',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the "no match" pattern.',
        template: 'SELECT s.id FROM screenings s\n[[1]] JOIN tickets t ON t.screening_id = s.id\nWHERE t.id [[2]] NULL;',
        blanks: [['LEFT'], ['IS']],
        distractors: ['INNER', '=', 'NOT'],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'Zero? Not one member has stopped coming? You\'re sure?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'I\'m not sure, the database might be wrong.', why: 'The query is right. The doubt to raise is different: it only counts six weekends.' },
          { text: 'Sure for these six weekends: all 40 came at least once. Anyone who stopped before September wouldn\'t be in the data.' },
          { text: 'Yes, 100% forever.', why: 'Only for the weekends that were typed in.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Earlier review: match the result to the query.',
        pairs: [
          ['15 rows', 'JOIN members, screening 17'],
          ['20 rows', 'LEFT JOIN members, screening 17'],
          ['3 rows', 'Screenings with no tickets'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 1 review: build a table for poster designs that always has a title.',
        tiles: ['CREATE TABLE posters (', 'id INTEGER PRIMARY KEY,', 'title TEXT NOT NULL', ');'],
        distractors: ['title NULL', 'INSERT INTO'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Why haven\'t screenings 25, 26 and 27 sold anything? Which birthday are they for?',
        answers: ['100th', '100', 'the 100th', 'hundredth'],
        placeholder: 'A birthday',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a "missing" list that matters: people you haven\'t called in a while, bills not yet paid. How would you find it?',
    starters: ['My missing list is...', 'I\'d find it by...'],
  },
  deepen: {
    title: 'NOT EXISTS',
    summary: 'Another way to ask "has no match" is WHERE NOT EXISTS (SELECT 1 FROM tickets t WHERE t.member_id = m.id). Same answer, different shape.',
  },
  notes: 'starlight.sql: screenings with no tickets = 25, 26, 27 (the 100th birthday weekend, not on sale yet); all 40 members hold at least one ticket.',
};

export default lesson;
