import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: Ms Delgado asks who the regulars are. Foreign keys, followed by hand. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The number that points',
  summary: '5 weeks to the 100th. Ms Delgado is impressed, then asks: "Who are your regulars, and what do they come to see?" The tickets table only says screening 17, member 13. Juno follows the numbers.',
  minutes: 10,
  outcomes: [
    'Explain what a foreign key is',
    'Follow an id from one table to another',
    'See why answers often need two tables',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 10 a.m., Lakeview Community Bank',
      beats: [
        { speaker: 'narrator', text: 'Ms Delgado scrolls through Juno\'s tables. Films, screenings, members, 313 tickets.' },
        { speaker: 'narrator', text: '"Clean," she says. "Now tell me who your regulars are. And what they come to see."' },
        { speaker: 'juno', text: 'Ticket 226. Screening 17, member 13, seat G7. That\'s... numbers.' },
        { speaker: 'walt', text: 'That\'s Jack Murphy. At Casablanca. I could have told you that.' },
        { speaker: 'juno', text: 'You could. But the database has to look it up in two other tables.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>In <code>tickets</code>, <code>screening_id</code> holds a screening\'s id and <code>member_id</code> holds a member\'s id. A column that points at another table\'s primary key is a <strong>foreign key</strong>.</p><p>It\'s Chapter 1\'s rule in action: the member\'s name lives once, in <code>members</code>. Every ticket just points at it.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Follow the numbers',
      database: 'starlight',
      code: "SELECT * FROM tickets WHERE id = 226;\nSELECT * FROM members WHERE id = 13;\nSELECT * FROM screenings WHERE id = 17;\n",
      caption: 'Three queries, three tables. Ticket 226 points at member 13 and screening 17. Run it and read all three results.',
      challenge: 'Screening 17 has a film_id too. Add a fourth query to find that film.',
    },
  ],
  apply: {
    scenario: 'Following ticket 226 by hand.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a foreign key?',
        options: [
          { text: 'A key from another country', why: 'Nice try, Leo.' },
          { text: 'A column that holds the id of a row in another table' },
          { text: 'A second primary key', why: 'A table has one primary key. A foreign key points at another table\'s.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Ticket 226 says member 13. Show that member\'s name and city.',
        starter: '',
        solution: 'SELECT name, city FROM members WHERE id = 13;\n',
        hint: 'WHERE id = 13 in the members table.',
        database: 'starlight',
        checks: [
          { message: 'It\'s Jack Murphy, from Chicago', outputIncludes: 'Jack Murphy | Chicago' },
          { message: 'One member', outputIncludes: '(1 row)' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'In the tickets table, where does each column point?',
        pairs: [
          ['screening_id', 'screenings.id'],
          ['member_id', 'members.id'],
          ['id', 'This ticket itself'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Screening 17 has film_id 1. Show the title and year of film 1.',
        starter: '',
        solution: 'SELECT title, year FROM films WHERE id = 1;\n',
        hint: 'SELECT title, year FROM films WHERE id = 1;',
        database: 'starlight',
        checks: [
          { message: 'Casablanca, 1942', outputIncludes: 'Casablanca | 1942' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A ticket has member_id NULL. What does that tell you?',
        language: 'sql',
        code: 'SELECT * FROM tickets WHERE member_id IS NULL;',
        options: [
          { text: 'The member was deleted', why: 'Nothing was deleted. NULL means it never pointed anywhere.' },
          { text: 'It\'s an error in the data', why: 'Walk-ins are normal: not everyone is a member.' },
          { text: 'A walk-in: the ticket points at no member' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Primary key or foreign key?',
        groups: ['Primary key', 'Foreign key'],
        items: [
          { text: 'films.id', group: 0 },
          { text: 'screenings.film_id', group: 1 },
          { text: 'members.id', group: 0 },
          { text: 'tickets.member_id', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Find the screening that ticket 225 points at (screening 17).',
        template: 'SELECT starts_at, price FROM [[1]] WHERE [[2]] = 17;',
        blanks: [['screenings'], ['id']],
        distractors: ['tickets', 'screening_id', 'film_id'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Rosa is member 1. Show the screening_id and seat of every ticket she holds, sorted by screening_id.",
        starter: '',
        solution: 'SELECT screening_id, seat FROM tickets WHERE member_id = 1 ORDER BY screening_id;\n',
        hint: 'WHERE member_id = 1 ORDER BY screening_id',
        database: 'starlight',
        checks: [
          { message: 'Show screening_id and seat', outputIncludes: 'screening_id | seat' },
          { message: 'Rosa holds 7 tickets', outputIncludes: '(7 rows)' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'This is so slow. Why not just write Jack\'s name and the film title on every ticket?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Because then a typo in one ticket makes a new person. The id points at one Jack, always. And next lesson, JOIN does the looking up for us.' },
          { text: 'Because names are too long.', why: 'Length isn\'t the problem; repeating facts is.' },
          { text: 'Good idea, let\'s do that.', why: 'That\'s how the shoebox ended up with "Cassablanca".' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 2 review: Rosa\'s tickets at evening prices or more, in a query on screenings.',
        tiles: ['SELECT id, starts_at', 'FROM screenings', 'WHERE price >= 14', ';'],
        distractors: ['WHERE price = NULL', 'FROM tickets'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the tickets table, which column points at the members table?',
        answers: ['member_id'],
        placeholder: 'A column name',
      },
    ],
  },
  reflect: {
    prompt: 'Think of an everyday "number that points": an order number, a booking reference, a seat on a ticket. What does it point at?',
    starters: ['The number is...', 'It points at...'],
  },
  deepen: {
    title: 'Keys in the wild',
    summary: 'Your bank statement lists a merchant id, not the whole shop. Your boarding pass shows a booking reference. Foreign keys are everywhere.',
  },
  notes: 'starlight.sql: ticket 226 = screening 17, member 13 (Jack Murphy, Chicago), seat G7; screening 17 = film 1 (Casablanca 1942); member 1 (Rosa Marin) holds 7 tickets.',
};

export default lesson;
