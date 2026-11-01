import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Unit Challenge. The 100th-birthday invitation list, built from joins. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: the invitation list',
  summary: '5 weeks to the 100th. Walt wants to invite, personally, everyone who came to Casablanca this autumn to its birthday screening. Some get an email. Some get a phone call. Nobody gets left out.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Answer a real question with a three-table join',
    'Use DISTINCT, LEFT JOIN and IS NULL on joined data',
    'Check a join by its row count',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Saturday, after the matinee',
      beats: [
        { speaker: 'walt', text: 'My grandfather sent a letter to every regular in 1926. "The Starlight opens Friday." I want to do the same.' },
        { speaker: 'juno', text: 'Everyone who came to Casablanca, invited to Casablanca on the 21st.' },
        { speaker: 'leo', text: 'And the ones with no email? Carrier pigeon?' },
        { speaker: 'walt', text: 'I\'ll phone them. Like I always have.' },
      ],
      choice: {
        prompt: 'Rosa came to Casablanca twice. How many invitations should she get?',
        options: [
          { text: 'One. The list needs each person once: DISTINCT.', outcome: 'Right. One invitation per person, however many times they came.', best: true },
          { text: 'Two, one per ticket.', outcome: 'Two identical letters from Walt would look like the shoebox all over again.' },
          { text: 'None, she already has a seat.', outcome: 'She has a seat from October. The birthday is a new screening.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'Unit Challenge: the Casablanca invitation list.',
    items: [
      {
        kind: 'mcq',
        prompt: 'To get from a ticket to a film title AND a member name, how many JOINs from tickets?',
        options: [
          { text: '1', why: 'Films are two steps away (via screenings), and members is another table.' },
          { text: '3: screenings, films and members' },
          { text: '2', why: 'Screenings and films is two; you need members as well.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "Everyone who came to Casablanca: show each member's name once, in alphabetical order.",
        starter: 'SELECT DISTINCT m.name\nFROM tickets t\n',
        solution: "SELECT DISTINCT m.name\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nJOIN members m ON t.member_id = m.id\nWHERE f.title = 'Casablanca'\nORDER BY m.name;\n",
        hint: "Three JOINs (screenings, films, members), WHERE f.title = 'Casablanca', ORDER BY m.name.",
        database: 'starlight',
        checks: [
          { message: 'Ama Mensah is first', outputIncludes: 'name Ama Mensah' },
          { message: '21 different people', outputIncludes: '(21 rows)' },
          { message: 'Each person once', codeIncludes: 'distinct' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The email list: only people with an email.',
        template: "SELECT DISTINCT m.name, m.email\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nJOIN members m ON t.member_id = m.id\nWHERE f.title = 'Casablanca' AND m.email [[1]] [[2]] NULL;",
        blanks: [['IS'], ['NOT']],
        distractors: ['=', '<>', 'NO'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Walt's phone list: the names of Casablanca members who have NO email, alphabetical, each once.",
        starter: '',
        solution: "SELECT DISTINCT m.name\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nJOIN members m ON t.member_id = m.id\nWHERE f.title = 'Casablanca' AND m.email IS NULL\nORDER BY m.name;\n",
        hint: "The same query, plus AND m.email IS NULL.",
        database: 'starlight',
        checks: [
          { message: 'Daniel Weiss first', outputIncludes: 'name Daniel Weiss' },
          { message: '4 phone calls for Walt', outputIncludes: '(4 rows)' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: '21 people came to Casablanca, and 4 have no email. How many rows?',
        code: "SELECT DISTINCT m.name FROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nJOIN members m ON t.member_id = m.id\nWHERE f.title = 'Casablanca'\n  AND m.email IS NOT NULL;",
        language: 'sql',
        options: [
          { text: '17' },
          { text: '21', why: 'IS NOT NULL leaves out the 4 with no email.' },
          { text: '38', why: 'That\'s every Casablanca ticket. DISTINCT names are fewer.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'This list shows Rosa twice. Which line needs a word added?',
        lines: ['SELECT m.name', 'FROM tickets t', 'JOIN screenings s ON t.screening_id = s.id', 'JOIN members m ON t.member_id = m.id', 'WHERE s.film_id = 1;'],
        bug: 0,
        fix: 'SELECT DISTINCT m.name',
        explanation: 'Rosa has two Casablanca tickets, so she appears twice. DISTINCT keeps each name once.',
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "How many Casablanca tickets were walk-ins? Show the id and seat of Casablanca tickets with no member. (They can't be invited, but Walt wants to know.)",
        starter: '',
        solution: "SELECT t.id, t.seat\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nWHERE f.title = 'Casablanca' AND t.member_id IS NULL;\n",
        hint: "No members join needed: JOIN screenings and films, WHERE f.title = 'Casablanca' AND t.member_id IS NULL.",
        database: 'starlight',
        checks: [
          { message: 'Show id and seat', outputIncludes: 'id | seat' },
          { message: '9 walk-in tickets', outputIncludes: '(9 rows)' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool for each part of Walt\'s list?',
        groups: ['JOIN', 'DISTINCT', 'IS NULL'],
        items: [
          { text: 'Turn member_id into a name', group: 0 },
          { text: 'One invitation per person', group: 1 },
          { text: 'Find who has no email', group: 2 },
          { text: 'Find each ticket\'s film', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the screenings-with-no-tickets query in order.',
        lines: ['SELECT s.id, s.starts_at', 'FROM screenings s', 'LEFT JOIN tickets t ON t.screening_id = s.id', 'WHERE t.id IS NULL;'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "The Sunday birthday show is The Wizard of Oz. Show the names of everyone who came to it this autumn, each once, alphabetical.",
        starter: '',
        solution: "SELECT DISTINCT m.name\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nJOIN members m ON t.member_id = m.id\nWHERE f.title = 'The Wizard of Oz'\nORDER BY m.name;\n",
        hint: "Same as Casablanca, with f.title = 'The Wizard of Oz'.",
        database: 'starlight',
        checks: [
          { message: 'Aiko Tanaka first', outputIncludes: 'name Aiko Tanaka' },
          { message: '13 people', outputIncludes: '(13 rows)' },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the join that keeps every ticket, even walk-ins.',
        tiles: ['FROM tickets t', 'LEFT JOIN members m', 'ON t.member_id = m.id'],
        distractors: ['JOIN members m', 'ON t.id = m.id'],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'Twenty-one invitations. Seventeen emails, four calls. My grandfather would have liked your box, Juno.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'He\'d have liked the shoebox more.', why: 'Modest, but the shoebox sold G7 twice.' },
          { text: 'The box only knew who to invite because you wrote every card. The calls are yours.' },
          { text: 'It\'s not a box, it\'s a relational database.', why: 'True, and Walt will never call it that.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapters 1 and 2 review: match the statement to what it does.',
        pairs: [
          ['PRIMARY KEY', 'Every row has its own id'],
          ['NOT NULL', 'The value can\'t be missing'],
          ['LIMIT 3', 'Keep the first three rows'],
          ['LIKE', 'Match a pattern'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which keyword makes each person appear only once in the list?',
        answers: ['DISTINCT'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Who would be on your "invitation list" for something that matters to you, and which "table" would you have to join to find them?',
    starters: ['I\'d invite...', 'I\'d find them in...'],
  },
  deepen: {
    title: 'Mail merge',
    summary: 'A query like this is the first step of every mail merge: the database finds the people, and an email tool fills each name into the letter.',
  },
  notes: 'Unit Challenge for Chapter 3. starlight.sql: Casablanca (screenings 1, 17) = 21 distinct members (first alphabetically Ama Mensah), 4 without email (Daniel Weiss, Diego Ruiz, Felix Wagner, Omar Saleh), 17 with; 9 walk-in tickets; The Wizard of Oz (screenings 8, 20) = 13 distinct members, first Aiko Tanaka.',
};

export default lesson;
