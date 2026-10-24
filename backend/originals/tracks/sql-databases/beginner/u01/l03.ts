import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Before/after: free-for-all cards vs typed columns. TEXT, INTEGER, REAL. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Why the shoebox lies',
  summary: '7 weeks to the 100th. Juno tries to add up what Friday took. The paid column says $14, 14.00, comp and paid. Leo laughs. Arjun\'s first message: "Give every column one kind of value."',
  minutes: 10,
  outcomes: [
    'Spot a column that mixes different kinds of values',
    'Choose a type for a column: TEXT, INTEGER or REAL',
    'Explain why one kind of value per column matters',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The paid column, two ways',
      before: { label: 'The shoebox', text: '$14\n14.00\ncomp\n9\npaid' },
      after: { label: 'A typed column (REAL)', text: '14.0\n14.0\n0.0\n9.0\n14.0' },
      notes: [
        'Before: five ways of writing money. A computer can\'t add "comp" to "$14".',
        'After: every value is a number, so the total is one sum away.',
        '"comp" (a free ticket) becomes 0. "paid" needs Walt to remember the price.',
      ],
    },
    {
      kind: 'text',
      html: '<p>Every column in a real table has a <strong>type</strong>: the kind of value it holds. SQLite, the database in this course, has three you\'ll use all the time:</p><p><strong>TEXT</strong> for words: names, titles, seats like G7.<br><strong>INTEGER</strong> for whole numbers: a year, a count, an id.<br><strong>REAL</strong> for numbers with decimals: money, like 14.50.</p>',
    },
    {
      kind: 'tryIt',
      title: 'See the mess',
      database: 'shoebox',
      code: 'SELECT name, film, paid FROM cards;\n',
      caption: 'Run it and read the paid and film columns. How many ways is money written? Is every film spelled right?',
      challenge: 'Swap paid for seat. One card has no seat at all.',
    },
  ],
  apply: {
    scenario: 'Cleaning up how the Starlight writes things down.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why can\'t Juno total the paid column in the shoebox?',
        options: [
          { text: 'It mixes numbers with words like comp and paid' },
          { text: 'There are too many cards', why: 'Ten cards is tiny. Databases add up millions.' },
          { text: 'SQL can\'t add money', why: 'It can, as long as the values are numbers.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which type fits each value best?',
        groups: ['TEXT', 'INTEGER', 'REAL'],
        items: [
          { text: 'Casablanca', group: 0 },
          { text: '1942', group: 1 },
          { text: '14.50', group: 2 },
          { text: 'G7', group: 0 },
          { text: '120 seats', group: 1 },
          { text: '9.00', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Show each card\'s name and paid columns, so Juno can see every way money was written.',
        starter: '',
        solution: 'SELECT name, paid FROM cards;\n',
        hint: 'SELECT name, paid FROM cards;',
        database: 'shoebox',
        checks: [
          { message: 'Show name, then paid', outputIncludes: 'name | paid' },
          { message: 'Show all 10 cards', outputIncludes: '(10 rows)' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each column to its type.',
        pairs: [
          ['title', 'TEXT'],
          ['year', 'INTEGER'],
          ['price', 'REAL'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A seat like G7 has a letter and a number. Which type?',
        options: [
          { text: 'INTEGER', why: 'INTEGER is for whole numbers only. G isn\'t a number.' },
          { text: 'REAL', why: 'REAL is for decimal numbers.' },
          { text: 'TEXT' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the problem in Walt\'s cards: which line is a typo the database would treat as a different film?',
        lines: ['Casablanca', 'Paddington 2', 'Cassablanca', 'Vertigo'],
        bug: 2,
        fix: 'Casablanca',
        explanation: 'To a database, "Cassablanca" and "Casablanca" are two different films. One table of films, typed once, fixes this (lesson 7).',
      },
      {
        kind: 'writeCode',
        prompt: 'Show the film and night of every card, to find the misspelled film.',
        starter: 'SELECT film FROM cards;\n',
        solution: 'SELECT film, night FROM cards;\n',
        hint: 'Add the night column after film, with a comma.',
        database: 'shoebox',
        checks: [
          { message: 'Show film, then night', outputIncludes: 'film | night' },
          { message: 'The misspelled film shows up', outputIncludes: 'Cassablanca' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Saw your photo of the cards. Rule one of databases?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Every column holds one kind of value, written one way.' },
          { text: 'Use as many columns as possible.', why: 'More columns isn\'t better. Clear ones are.' },
          { text: 'Write money however feels natural.', why: 'That\'s exactly how the shoebox got five ways of writing $14.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which SQLite type would you give a column of ticket prices like 9.00 and 14.00?',
        answers: ['REAL'],
        placeholder: 'TEXT, INTEGER or REAL',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: show what was paid on every card.',
        tiles: ['SELECT', 'paid', 'FROM', 'cards', ';'],
        distractors: ['TOTAL', 'REAL'],
        language: 'sql',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever kept a list where the same thing was written different ways (dates, names, money)? What did it cost you later?',
    starters: ['I once kept...', 'It cost me...'],
  },
  deepen: {
    title: 'SQLite\'s types',
    summary: 'SQLite also has BLOB (raw bytes, like images) and treats types a little loosely. Real apps still pick one type per column and stick to it.',
  },
  notes: 'SQLite storage classes: NULL, INTEGER, REAL, TEXT, BLOB (sqlite.org/datatype3.html). shoebox paid values: $14 x5, 14.00, $9, comp, 9, paid; card 4 film is "Cassablanca".',
};

export default lesson;
