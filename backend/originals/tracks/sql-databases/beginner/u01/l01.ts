import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story opener: seat G7 is sold twice. What a database is; the first SELECT. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Seat G7, sold twice',
  summary: '7 weeks to the 100th. Casablanca, sold out. Two regulars hold a card for the same seat, and a developer is watching from the lobby. Juno opens the shoebox and asks it her first question.',
  minutes: 10,
  outcomes: [
    'Say what a database and a table are',
    'Run your first query: SELECT * FROM a table',
    'Read the rows and columns it gives back',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday 2 October, 7:24 p.m.',
      beats: [
        { speaker: 'narrator', text: 'The Starlight Picture House, Chicago. 120 seats, all sold. Casablanca starts in six minutes.' },
        { speaker: 'narrator', text: 'Row G. Two regulars, Rosa and Jack, are both holding a ticket for seat G7.' },
        { speaker: 'walt', text: 'I wrote you both a card? I wrote you both a card.' },
        { speaker: 'narrator', text: 'In the lobby, a woman in a grey coat watches. Dana Whitlock, Crane Holdings. She hands Walt an envelope: $2.4 million for the building.' },
        { speaker: 'dana', text: 'Mr Abernathy, a business that can\'t count its own seats isn\'t a business. It\'s a hobby.' },
        { speaker: 'juno', text: 'Walt. Where do the bookings live?' },
        { speaker: 'walt', text: 'Same place they have since 1981. The shoebox.' },
      ],
      choice: {
        prompt: 'Juno has the shoebox. What should she do first?',
        options: [
          { text: 'Type every card into one neat list she can ask questions of.', outcome: 'That\'s the first step to a database: data in one place, in the same shape, ready for questions.', best: true },
          { text: 'Buy a bigger shoebox.', outcome: 'More room, same problem: nothing checks that a seat is only sold once.' },
          { text: 'Memorise every card.', outcome: 'Walt tried that for 45 years. Tonight is the result.' },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>A <strong>database</strong> is data kept in an organised way, so you can ask it questions and trust the answers.</p><p>Most databases keep data in <strong>tables</strong>: rows and columns, like a spreadsheet. Each <strong>row</strong> is one thing (one card). Each <strong>column</strong> is one fact about it (the name, the seat).</p>',
    },
    {
      kind: 'tryIt',
      title: 'Open the shoebox',
      database: 'shoebox',
      code: 'SELECT * FROM cards;\n',
      caption: 'Juno typed Walt\'s cards into a table called cards. Press Run. SELECT * FROM cards means "show me every column of every row in cards".',
      challenge: 'Find the two cards for seat G7. Who are they for?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'This language is SQL (say "sequel" or "S-Q-L", both are fine). SELECT asks for data, * means every column, FROM names the table, and ; ends the statement.',
    },
  ],
  apply: {
    scenario: 'Juno\'s first look inside the shoebox.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a database?',
        options: [
          { text: 'Any file on a computer', why: 'A file can be a mess. A database is organised so you can ask it questions.' },
          { text: 'Data kept in an organised way, so you can ask questions and trust the answers' },
          { text: 'A website', why: 'Websites often use a database, but they aren\'t one.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show every card in the shoebox: every column, every row of the cards table.',
        starter: '-- Every card in the shoebox\n',
        solution: '-- Every card in the shoebox\nSELECT * FROM cards;\n',
        hint: 'SELECT * FROM cards;',
        database: 'shoebox',
        checks: [
          { message: 'Show all 10 cards', outputIncludes: '(10 rows)' },
          { message: 'Use SELECT', codeIncludes: 'select' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the query to what it means.',
        pairs: [
          ['SELECT', 'Show me data'],
          ['*', 'Every column'],
          ['FROM cards', 'From the cards table'],
          [';', 'End of the statement'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the query so it shows every column.',
        template: 'SELECT [[1]] FROM cards;',
        blanks: [['*']],
        distractors: ['all', '#'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        prompt: 'In the cards table, what is one row?',
        options: [
          { text: 'One fact, like every seat number', why: 'That\'s a column: one fact about every card.' },
          { text: 'The whole shoebox', why: 'That\'s the table.' },
          { text: 'One card: one booking' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Leo tried it. Which line stops it working?',
        lines: ['SELECT *', 'FORM cards;'],
        bug: 1,
        fix: 'FROM cards;',
        explanation: 'FORM is a typo. SQL only understands its keywords spelled exactly: FROM.',
        language: 'sql',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the query that shows every card.',
        tiles: ['SELECT', '*', 'FROM', 'cards', ';'],
        distractors: ['SHOW', 'IN'],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'The shoebox has worked since 1981. Why change it now?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Because shoeboxes are old.', why: 'Old isn\'t the problem. Walt will only change for a real reason.' },
          { text: 'Because tonight it sold G7 twice, and nothing in a shoebox can stop that. A database can check every booking.' },
          { text: 'Because Dana said so.', why: 'Walt will never change anything because Dana said so.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'From memory this time: show every row and column of cards.',
        starter: '',
        solution: 'SELECT * FROM cards;\n',
        hint: 'Four words and a semicolon: SELECT, *, FROM, the table name.',
        database: 'shoebox',
        checks: [
          { message: 'Show Lena Fischer\'s card, the last one', outputIncludes: 'Lena Fischer' },
          { message: 'Show all 10 cards', outputIncludes: '(10 rows)' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Run the query again if you need to. Which seat is on two cards for Casablanca on Fri 2 Oct?',
        answers: ['G7'],
        placeholder: 'A seat, like A1',
      },
      {
        kind: 'sortGroups',
        prompt: 'Shoebox or database?',
        groups: ['Shoebox', 'Database'],
        items: [
          { text: 'Answers a question in a second', group: 1 },
          { text: 'Lets one seat be sold twice without noticing', group: 0 },
          { text: 'Every booking has the same columns', group: 1 },
          { text: 'You search it by hand, card by card', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where does important information live in your life right now: a notebook, a chat, a spreadsheet, your memory? What goes wrong with it?',
    starters: ['Mine lives in...', 'What goes wrong is...'],
  },
  deepen: {
    title: 'Databases you used today',
    summary: 'Count how many apps you opened today that must use a database: messages, bank, maps, music. Almost every one does.',
  },
  notes: 'shoebox.sql: 10 cards; cards 2 (Jack Murphy) and 3 (Rosa Marin) are both G7, Casablanca, Fri 2 Oct; card 10 is Lena Fischer. Casablanca (1942) is real. Pronunciation of SQL: both "sequel" and "S-Q-L" are in common use.',
};

export default lesson;
