import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Walkthrough: AND, OR and brackets. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'AND, OR and brackets',
  summary: '6 weeks to the 100th. Round three. "Recent thrillers." "Comedies or cartoons, made this century." Walt\'s answers get longer. Juno\'s conditions get two parts.',
  minutes: 11,
  outcomes: [
    'Combine conditions with AND and OR',
    'Use brackets to say which part goes first',
    'Predict how many rows a combined condition keeps',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Two conditions at once',
      steps: [
        { title: 'AND: both must be true', body: 'A thriller AND made after 1970. Fewer rows: Jaws and Parasite.', code: "WHERE genre = 'Thriller' AND year > 1970", language: 'sql' },
        { title: 'OR: either one will do', body: 'Sci-Fi OR Thriller. More rows: six films.', code: "WHERE genre = 'Sci-Fi' OR genre = 'Thriller'", language: 'sql' },
        { title: 'The trap: AND goes first', body: 'Without brackets, SQL does AND before OR. This means "any comedy, or an animation after 2000": 5 rows.', code: "WHERE genre = 'Comedy' OR genre = 'Animation' AND year > 2000", language: 'sql' },
        { title: 'Brackets fix it', body: 'Now it means "a comedy or animation, and after 2000": 2 rows.', code: "WHERE (genre = 'Comedy' OR genre = 'Animation') AND year > 2000", language: 'sql' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Spot the difference',
      database: 'starlight',
      code: "SELECT title, genre, year FROM films\nWHERE (genre = 'Comedy' OR genre = 'Animation')\n  AND year > 2000;\n",
      caption: 'Run it: 2 rows. Then delete both brackets and run it again.',
      challenge: 'Without the brackets you get 5. Which three films sneak in, and why?',
    },
  ],
  apply: {
    scenario: 'Round three: questions with two parts.',
    items: [
      {
        kind: 'mcq',
        prompt: 'AND or OR: which one usually gives you MORE rows?',
        options: [
          { text: 'AND', why: 'AND needs both to be true, so it keeps fewer rows.' },
          { text: 'OR' },
          { text: 'Always the same', why: 'OR keeps a row if either part is true, so it keeps more.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the titles of thrillers made after 1970.',
        starter: 'SELECT title FROM films\n',
        solution: "SELECT title FROM films\nWHERE genre = 'Thriller' AND year > 1970;\n",
        hint: "WHERE genre = 'Thriller' AND year > 1970;",
        database: 'starlight',
        checks: [
          { message: 'Jaws and Parasite', outputIncludes: 'Parasite' },
          { message: 'Exactly 2 films', outputIncludes: '(2 rows)' },
          { message: 'Use AND', codeIncludes: ' and ' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'AND or OR for each question?',
        groups: ['AND', 'OR'],
        items: [
          { text: 'Members in Chicago who joined before 2020', group: 0 },
          { text: 'Films that are Sci-Fi or Thriller', group: 1 },
          { text: 'Evening screenings in October', group: 0 },
          { text: 'Members in Skokie or Cicero', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many rows? (Starlight has 4 thrillers and 2 Sci-Fi films.)',
        code: "SELECT title FROM films\nWHERE genre = 'Sci-Fi' OR genre = 'Thriller';",
        language: 'sql',
        options: [
          { text: '0', why: 'No film is both, but OR only needs one.' },
          { text: '6' },
          { text: '2', why: 'OR adds the two groups together.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "Ms Delgado asks about loyal locals: show the name and joined date of members in Chicago who joined before 2020 ('2020-01-01').",
        starter: '',
        solution: "SELECT name, joined FROM members\nWHERE city = 'Chicago' AND joined < '2020-01-01';\n",
        hint: "Two conditions joined by AND: city = 'Chicago' AND joined < '2020-01-01'",
        database: 'starlight',
        checks: [
          { message: 'Show name and joined', outputIncludes: 'name | joined' },
          { message: 'The 4 longest-serving Chicago members', outputIncludes: '(4 rows)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Juno wants "comedies or animations made after 2000". Which line needs fixing?',
        lines: ['SELECT title FROM films', "WHERE genre = 'Comedy' OR genre = 'Animation'", '  AND year > 2000;'],
        bug: 1,
        fix: "WHERE (genre = 'Comedy' OR genre = 'Animation')",
        explanation: 'Without brackets, AND goes first, so every comedy sneaks in whatever its year. Brackets around the OR fix it.',
        language: 'sql',
      },
      {
        kind: 'fillBlank',
        prompt: 'Members who live in Skokie or Cicero.',
        template: "SELECT name FROM members\nWHERE city = 'Skokie' [[1]] city = 'Cicero';",
        blanks: [['OR']],
        distractors: ['AND', ','],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Show the title and year of comedies OR animations made after 2000. Use brackets.",
        starter: '',
        solution: "SELECT title, year FROM films\nWHERE (genre = 'Comedy' OR genre = 'Animation') AND year > 2000;\n",
        hint: "(genre = 'Comedy' OR genre = 'Animation') AND year > 2000",
        database: 'starlight',
        checks: [
          { message: 'Spirited Away and Coco', outputIncludes: 'Spirited Away' },
          { message: 'Exactly 2 films', outputIncludes: '(2 rows)' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'Thrillers made after 1970... Jaws! And that Korean one with the house. Parasite.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Right both times. Two for two, same as the database.' },
          { text: 'Wrong, there are more.', why: 'There are exactly two. Walt got it.' },
          { text: 'Too slow, Walt.', why: 'Walt got it right. Let him have it; the point is trust in the data, not beating him.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 1 review: build a table for staff with an id that numbers itself.',
        tiles: ['CREATE TABLE staff (', 'id INTEGER PRIMARY KEY,', 'name TEXT NOT NULL', ');'],
        distractors: ['id TEXT,', 'INSERT'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Without brackets, which does SQL do first: AND or OR?',
        answers: ['AND'],
        placeholder: 'AND or OR',
      },
    ],
  },
  reflect: {
    prompt: 'When you search for something (a flat, a flight, a job), which conditions are AND (must have) and which are OR (either is fine)?',
    starters: ['Must have...', 'Either is fine...'],
  },
  deepen: {
    title: 'NOT',
    summary: "NOT flips a condition: WHERE NOT genre = 'Comedy' keeps everything else. With brackets, NOT (a OR b) means neither.",
  },
  notes: "starlight.sql: Thriller AND year > 1970 = Jaws, Parasite; Sci-Fi OR Thriller = 6; Chicago AND joined < 2020-01-01 = Diego Ruiz, Ama Mensah, Leila Farah, Arthur Shaw; (Comedy OR Animation) AND year > 2000 = Spirited Away, Coco; without brackets = 5 (adds Some Like It Hot, The Princess Bride, The General). SQL operator precedence: AND binds tighter than OR (sqlite.org/lang_expr.html). Parasite is South Korean (2019).",
};

export default lesson;
