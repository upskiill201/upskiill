import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: Leo's bet; WHERE with exact matches on the full Starlight database. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'WHERE: only the rows you want',
  summary: '6 weeks to the 100th. Juno spent the weekend typing six weekends of bookings into the real database. Leo bets his poster budget that Walt\'s memory is faster. Round one: "Which films are thrillers?"',
  minutes: 10,
  outcomes: [
    'Keep only the rows that match with WHERE',
    'Match text in single quotes and numbers without',
    'Combine choosing columns with choosing rows',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 4 p.m., the box office',
      beats: [
        { speaker: 'narrator', text: 'The Starlight database is real now: films, screenings, members and 313 tickets from six weekends.' },
        { speaker: 'leo', text: 'Twenty dollars of poster paint says Walt answers faster than your laptop.' },
        { speaker: 'walt', text: 'Ask me anything. Forty-five years. It\'s all up here.' },
        { speaker: 'juno', text: 'Fine. Which of our films are thrillers?' },
        { speaker: 'walt', text: 'Vertigo. Jaws. That one with the window. And... the other one.' },
        { speaker: 'narrator', text: 'Juno types one line. Four titles appear before Walt finds "the other one".' },
      ],
    },
    {
      kind: 'text',
      html: '<p><strong>WHERE</strong> keeps only the rows that match a condition. It goes after FROM:</p><p><code>SELECT title FROM films WHERE genre = \'Thriller\';</code></p><p>Text goes in single quotes and must match exactly, capitals too: <code>\'thriller\'</code> finds nothing. Numbers go in bare: <code>WHERE year = 1975</code>.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Round one',
      database: 'starlight',
      code: "SELECT title, year FROM films WHERE genre = 'Thriller';\n",
      caption: 'This runs on the Starlight database: 15 films, 27 screenings, 40 members, 313 tickets. Open Tables to see them all.',
      challenge: "Change 'Thriller' to 'Comedy'. Which three films come back?",
    },
  ],
  apply: {
    scenario: 'Round one of Leo\'s bet.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does WHERE do?',
        options: [
          { text: 'Picks which columns come back', why: 'That\'s the list after SELECT.' },
          { text: 'Keeps only the rows that match a condition' },
          { text: 'Names the table', why: 'That\'s FROM.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the titles of the films from 2017.',
        starter: 'SELECT title FROM films\n',
        solution: 'SELECT title FROM films\nWHERE year = 2017;\n',
        hint: 'Add WHERE year = 2017; (a number, so no quotes).',
        database: 'starlight',
        checks: [
          { message: 'Show Paddington 2 and Coco', outputIncludes: 'Paddington 2' },
          { message: 'Only the 2 films from 2017', outputIncludes: '(2 rows)' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Show the members who live in Evanston.',
        template: "SELECT name FROM members [[1]] city = [[2]];",
        blanks: [['WHERE'], ["'Evanston'"]],
        distractors: ['Evanston', 'IF', '"WHERE"'],
        language: 'sql',
      },
      {
        kind: 'findBug',
        prompt: 'This finds nothing. Which line is wrong?',
        lines: ['SELECT title', 'FROM films', "WHERE genre = 'thriller';"],
        bug: 2,
        fix: "WHERE genre = 'Thriller';",
        explanation: "Text must match exactly, capitals included. The genre is stored as 'Thriller'.",
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many rows? (Hint: the Starlight has 6 members in Evanston.)',
        code: "SELECT name FROM members WHERE city = 'Evanston';",
        language: 'sql',
        options: [
          { text: '40', why: 'That\'s every member. WHERE keeps only Evanston.' },
          { text: '1', why: 'WHERE can match many rows, not just one.' },
          { text: '6' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Walt wants every member in Oak Park: show their name and email.',
        starter: '',
        solution: "SELECT name, email FROM members WHERE city = 'Oak Park';\n",
        hint: "WHERE city = 'Oak Park' (text, so single quotes, and a capital P).",
        database: 'starlight',
        checks: [
          { message: 'Show name and email', outputIncludes: 'name | email' },
          { message: 'All 5 Oak Park members', outputIncludes: '(5 rows)' },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: the titles of the Sci-Fi films.',
        tiles: ['SELECT title', 'FROM films', 'WHERE', "genre = 'Sci-Fi'", ';'],
        distractors: ['genre = Sci-Fi', 'WHEN'],
        language: 'sql',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review: match the statement to what it does.',
        pairs: [
          ['CREATE TABLE', 'Makes a new table'],
          ['INSERT INTO', 'Adds rows'],
          ['SELECT … WHERE', 'Shows matching rows'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'Fine, it\'s quick. But my memory knows things your box doesn\'t.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'It knows exactly what we typed in, every time. You know the people. We need both.' },
          { text: 'No it doesn\'t.', why: 'Walt does know things the data doesn\'t: why people come. Picking a fight won\'t help.' },
          { text: 'Your memory is out of date.', why: 'True of the seats, maybe, but it won\'t win Walt over.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the id and starts_at of every screening of film 1 (Casablanca).',
        starter: '',
        solution: 'SELECT id, starts_at FROM screenings WHERE film_id = 1;\n',
        hint: 'The screenings table has film_id. WHERE film_id = 1',
        database: 'starlight',
        checks: [
          { message: 'Show id and starts_at', outputIncludes: 'id | starts_at' },
          { message: 'Casablanca plays 3 times, including the birthday', outputIncludes: '(3 rows)' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: "Chapter 1 review: a member has no email written down. What does the database store?",
        answers: ['NULL'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a question you ask about your own life again and again (what\'s on this week, who owes me)? What would its WHERE be?',
    starters: ['My question is...', 'WHERE...'],
  },
  deepen: {
    title: 'Case and SQLite',
    summary: 'SQL keywords like SELECT and where work in any case, but the text inside quotes doesn\'t. Some databases ignore case in text; SQLite\'s = doesn\'t.',
  },
  notes: 'starlight.sql: thrillers = Vertigo, Rear Window, Jaws, Parasite; comedies = Some Like It Hot, The Princess Bride, The General; 2017 = Paddington 2, Coco; Evanston 6, Oak Park 5 members; Casablanca screenings 1, 17, 26.',
};

export default lesson;
