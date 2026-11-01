import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Myth or Fact opener: LIKE with % and _ (finding "Cassablanca" in the shoebox). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'LIKE and wildcards',
  summary: '6 weeks to the 100th. Juno checks the shoebox one last time. Somewhere, Casablanca is spelled wrong, and = can\'t find a word you can\'t spell. LIKE can.',
  minutes: 10,
  outcomes: [
    'Match part of a text with LIKE',
    'Use % for "anything" and _ for "exactly one character"',
    'Find misspellings and patterns',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: "WHERE film = 'Casablanca' also finds 'Cassablanca'.", isFact: false, explain: '= needs an exact match. One extra s and the row is invisible.' },
        { text: "In LIKE, % stands for any number of characters, even none.", isFact: true, explain: "'Cas%' matches Casablanca, Cassablanca, and even just Cas." },
        { text: "In SQLite, LIKE ignores capitals for English letters.", isFact: true, explain: "'cas%' finds Casablanca too. (= still cares about capitals.)" },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Every spelling of Casablanca',
      database: 'shoebox',
      code: "SELECT id, name, film FROM cards\nWHERE film LIKE 'Cas%';\n",
      caption: "Back in the shoebox. 'Cas%' means \"starts with Cas, then anything\". Run it: four cards, one of them misspelled.",
      challenge: "Try '%Bride' instead: anything, ending in Bride.",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: "_ (underscore) matches exactly one character. seat LIKE 'G_' finds G1 to G9, but not G10, which has two characters after the G.",
    },
  ],
  apply: {
    scenario: 'Hunting for patterns.',
    items: [
      {
        kind: 'mcq',
        prompt: "What does title LIKE 'The %' find?",
        options: [
          { text: 'Titles that start with "The "' },
          { text: 'Titles that are exactly "The %"', why: "In LIKE, % is a wildcard, not a percent sign." },
          { text: 'Titles that contain "The" anywhere', why: "That would be '%The%'." },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "Show the titles of films that start with 'The '.",
        starter: 'SELECT title FROM films\n',
        solution: "SELECT title FROM films\nWHERE title LIKE 'The %';\n",
        hint: "WHERE title LIKE 'The %' (note the space before %).",
        database: 'starlight',
        checks: [
          { message: 'Include The General', outputIncludes: 'The General' },
          { message: 'Exactly 3 films', outputIncludes: '(3 rows)' },
          { message: 'Use LIKE', codeIncludes: 'like' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the pattern to what it finds.',
        pairs: [
          ["'Cas%'", 'Starts with Cas'],
          ["'%Oz'", 'Ends with Oz'],
          ["'%an%'", 'Has "an" anywhere'],
          ["'G_'", 'G plus one character'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: "Walt remembers \"someone called -an-something\". Show the names of members with 'an' anywhere in their name.",
        starter: '',
        solution: "SELECT name FROM members WHERE name LIKE '%an%';\n",
        hint: "% on both sides: '%an%'",
        database: 'starlight',
        checks: [
          { message: 'Include Priya Raman', outputIncludes: 'Priya Raman' },
          { message: 'All 9 matches', outputIncludes: '(9 rows)' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Find every seat in row G with a one-digit number.',
        template: "SELECT seat FROM tickets\nWHERE screening_id = 17 AND seat [[1]] 'G[[2]]';",
        blanks: [['LIKE'], ['_']],
        distractors: ['=', '%', '*'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: "On Casablanca night (screening 17), row G has G1, G2, G7 (twice), G10, G11 and G12. How many rows does this find?",
        code: "SELECT seat FROM tickets\nWHERE screening_id = 17 AND seat LIKE 'G_';",
        language: 'sql',
        options: [
          { text: '7', why: "_ is exactly one character, so G10, G11 and G12 don't match." },
          { text: '4' },
          { text: '3', why: 'G7 was sold twice, so it appears twice.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "Show the seat and member_id of every ticket in row G (seat starts with G) on Casablanca night, screening 17.",
        starter: '',
        solution: "SELECT seat, member_id FROM tickets\nWHERE screening_id = 17 AND seat LIKE 'G%';\n",
        hint: "Two conditions: screening_id = 17 AND seat LIKE 'G%'",
        database: 'starlight',
        checks: [
          { message: 'Show seat and member_id', outputIncludes: 'seat | member_id' },
          { message: 'All 7 tickets in row G', outputIncludes: '(7 rows)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: "Leo wants titles ending in 'Window'. Which line is wrong?",
        lines: ['SELECT title', 'FROM films', "WHERE title = '%Window';"],
        bug: 2,
        fix: "WHERE title LIKE '%Window';",
        explanation: "= takes % literally, looking for a title that is exactly \"%Window\". Wildcards only work with LIKE.",
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'LIKE is great for finding typos. Would you use it to look up one member by id?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Yes, LIKE is always better.', why: 'LIKE is slower and fuzzier. For exact values, = is right.' },
          { text: 'No. For an exact value like an id, = is exact and fast. LIKE is for patterns.' },
          { text: 'Only on Tuesdays.', why: 'Arjun would not laugh.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 2 review: build "films from before 1950, oldest first".',
        tiles: ['SELECT title FROM films', 'WHERE year < 1950', 'ORDER BY year', ';'],
        distractors: ['ORDER BY year DESC', 'LIMIT'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: '% means any number of characters. What is the name of the symbol that means exactly one?',
        answers: ['underscore', 'an underscore', 'the underscore'],
        placeholder: 'Its name, in words',
      },
    ],
  },
  reflect: {
    prompt: 'Where have you lost something because it was spelled two ways: a contact saved twice, a file named "final" and "final2"?',
    starters: ['I once had...', 'A LIKE search would have...'],
  },
  deepen: {
    title: 'GLOB',
    summary: 'SQLite also has GLOB, which uses * and ? like file names and does care about capitals. LIKE is the one every database shares.',
  },
  notes: "shoebox.sql: film LIKE 'Cas%' = cards 1-4 (card 4 'Cassablanca'). starlight.sql: title LIKE 'The %' = The Wizard of Oz, The Princess Bride, The General; name LIKE '%an%' = 9 members; screening 17 row G = G1, G2, G7, G7, G10, G11, G12 (7); seat LIKE 'G_' = 4. SQLite LIKE is case-insensitive for ASCII by default (sqlite.org/lang_expr.html#like).",
};

export default lesson;
