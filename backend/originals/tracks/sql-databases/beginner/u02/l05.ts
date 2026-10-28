import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint. Reviews lessons 1–4 (WHERE, comparisons, AND/OR, ORDER BY/LIMIT) plus Chapter 1. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Walt\'s Tuesday list',
  summary: '6 weeks to the 100th. Tuesday is Walt\'s day for phoning regulars. This week he hands Juno a list of questions instead of opening the shoebox. Leo keeps score.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Filter, combine and sort rows without notes', 'Choose the right comparison for a question'],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 11 a.m.',
      beats: [
        { speaker: 'walt', text: 'Six questions. I wrote them on a card. Old habits.' },
        { speaker: 'leo', text: 'Score so far: database 3, Walt 1. Walt got Parasite.' },
        { speaker: 'juno', text: 'Read me the first one.' },
        { speaker: 'walt', text: '"Who are our members in Skokie, and how do I reach them?"' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Walt\'s card of questions.',
    items: [
      {
        kind: 'writeCode',
        prompt: "Walt's question 1: show the name and email of members in Skokie.",
        starter: '',
        solution: "SELECT name, email FROM members WHERE city = 'Skokie';\n",
        hint: "WHERE city = 'Skokie'",
        database: 'starlight',
        checks: [
          { message: 'Show name and email', outputIncludes: 'name | email' },
          { message: 'All 4 Skokie members', outputIncludes: '(4 rows)' },
        ],
      },
      {
        kind: 'mcq',
        prompt: "Question 2: \"Films shorter than 100 minutes.\" Which condition?",
        options: [
          { text: 'minutes > 100', why: 'That\'s longer than 100.' },
          { text: 'minutes < 100' },
          { text: "minutes = '100'", why: 'That finds exactly 100, and minutes is a number, so no quotes.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Question 2: show the title and minutes of films shorter than 100 minutes.',
        starter: '',
        solution: 'SELECT title, minutes FROM films WHERE minutes < 100;\n',
        hint: 'WHERE minutes < 100',
        database: 'starlight',
        checks: [
          { message: 'The Princess Bride and The General', outputIncludes: 'The General | 78' },
          { message: 'Exactly 2 films', outputIncludes: '(2 rows)' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Question 3: matinees in September.',
        template: "SELECT * FROM screenings\nWHERE price = 9 [[1]] starts_at [[2]] '2026-10-01';",
        blanks: [['AND'], ['<']],
        distractors: ['OR', '>', '='],
        language: 'sql',
      },
      {
        kind: 'findBug',
        prompt: 'Question 4 went wrong. Which line?',
        lines: ['SELECT name', 'FROM members', "WHERE city = Evanston", 'ORDER BY name;'],
        bug: 2,
        fix: "WHERE city = 'Evanston'",
        explanation: 'Evanston is text, so it needs single quotes. Without them SQL looks for a column called Evanston.',
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Without brackets, what does this keep?',
        code: "SELECT title FROM films\nWHERE genre = 'Drama' OR genre = 'Romance' AND year > 1960;",
        language: 'sql',
        options: [
          { text: 'Dramas and romances made after 1960', why: 'That needs brackets around the OR.' },
          { text: 'Every drama, plus romances made after 1960' },
          { text: 'Nothing', why: 'AND goes first, then OR adds every drama.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Question 5: the 3 newest members. Show name and joined, newest first.',
        starter: '',
        solution: 'SELECT name, joined FROM members\nORDER BY joined DESC\nLIMIT 3;\n',
        hint: 'ORDER BY joined DESC LIMIT 3',
        database: 'starlight',
        checks: [
          { message: 'Mia Lindqvist joined most recently', outputIncludes: 'name | joined Mia Lindqvist' },
          { message: 'Only 3 rows', outputIncludes: '(3 rows)' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of a query to its job.',
        pairs: [
          ['WHERE', 'Keeps matching rows'],
          ['ORDER BY', 'Sorts the rows'],
          ['LIMIT', 'Keeps only the first few'],
          ['DESC', 'Biggest first'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the query in order.',
        lines: ['SELECT title, minutes', 'FROM films', "WHERE genre = 'Animation'", 'ORDER BY minutes;'],
        language: 'sql',
      },
      {
        kind: 'sortGroups',
        prompt: 'Chapter 1 review: which statement would you use?',
        groups: ['CREATE TABLE', 'INSERT INTO', 'SELECT'],
        items: [
          { text: 'Add The General to films', group: 1 },
          { text: 'Make a table for snacks', group: 0 },
          { text: 'See every member in Cicero', group: 2 },
          { text: 'Add a new member', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'Last one. Which is our longest film? I\'m saying Casablanca.',
        prompt: 'Juno ran ORDER BY minutes DESC LIMIT 1. Her best reply?',
        options: [
          { text: 'Casablanca, yes.', why: 'Casablanca is 102 minutes. Not even close.' },
          { text: 'You\'re wrong again.', why: 'True, but there\'s a kinder way to say it.' },
          { text: 'Parasite, 132 minutes. Casablanca is 102: it just feels longer because you\'ve seen it forty times.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: "How many members does WHERE city = 'Skokie' find? (You ran it for question 1.)",
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which kind of question is easiest for you to turn into SQL: "which", "how many", or "top"? Which is hardest?',
    starters: ['Easiest is...', 'Hardest is...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4. starlight.sql: Skokie 4 members; under 100 minutes = The Princess Bride 98, The General 78; newest members = Mia Lindqvist 2026-09-02, Noah Green 2026-08-24, Sam Okoro 2026-02-28.',
};

export default lesson;
