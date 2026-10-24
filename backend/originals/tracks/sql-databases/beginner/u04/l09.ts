import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Card deck: CASE WHEN to label rows, then group by the label. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'CASE WHEN',
  summary: '4 weeks to the 100th. Dana\'s claim, one last time: "old films for old neighbours". There\'s no "classic" column. Juno makes one, on the fly, and groups by it.',
  minutes: 11,
  outcomes: [
    'Label rows with CASE WHEN … THEN … ELSE … END',
    'Group and count by a label you made',
    'Turn a vague claim into a number',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>CASE</strong> is SQL\'s "if". It gives each row a value depending on a condition:</p><p><code>CASE WHEN year &lt; 1970 THEN \'Classic\' ELSE \'Modern\' END</code></p><p>Rows are checked one at a time: a film from 1942 gets \'Classic\', one from 2017 gets \'Modern\'.</p>',
    },
    {
      kind: 'text',
      html: '<p>Name it with AS, then GROUP BY it like any other column:</p><p><code>SELECT CASE … END AS era, COUNT(*) … GROUP BY era;</code></p><p>Now a claim like "only old films sell" becomes two numbers you can compare.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Old films or new?',
      database: 'starlight',
      code: "SELECT CASE WHEN f.year < 1970 THEN 'Classic' ELSE 'Modern' END AS era,\n       COUNT(*) AS sold\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nGROUP BY era;\n",
      caption: 'Every ticket labelled by its film\'s era, then counted. Run it.',
      challenge: 'Add SUM(t.price_paid) AS takings. Which era earns more?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Every CASE ends with END. Forgetting it is the most common CASE mistake.',
    },
  ],
  apply: {
    scenario: 'Testing Dana\'s claim with labels.',
    items: [
      {
        kind: 'mcq',
        prompt: "What does CASE WHEN price = 9 THEN 'Matinee' ELSE 'Evening' END give a $14 screening?",
        options: [
          { text: "'Matinee'", why: '14 isn\'t 9, so the WHEN is false and ELSE is used.' },
          { text: 'NULL', why: 'With an ELSE, a non-matching row gets the ELSE value.' },
          { text: "'Evening'" },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: "Label each film: title, and CASE WHEN minutes > 120 THEN 'Long' ELSE 'Short' END as length.",
        starter: 'SELECT title,\nFROM films;\n',
        solution: "SELECT title,\n       CASE WHEN minutes > 120 THEN 'Long' ELSE 'Short' END AS length\nFROM films;\n",
        hint: "CASE WHEN minutes > 120 THEN 'Long' ELSE 'Short' END AS length",
        database: 'starlight',
        checks: [
          { message: 'Name it length', outputIncludes: 'title | length' },
          { message: 'Vertigo is Long', outputIncludes: 'Vertigo | Long' },
          { message: 'Casablanca is Short', outputIncludes: 'Casablanca | Short' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the CASE in order.',
        lines: ['CASE', "  WHEN price_paid = 0 THEN 'Comp'", "  ELSE 'Paid'", 'END AS kind'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Comps vs paid: label each ticket 'Comp' (price_paid = 0) or 'Paid', as kind, and count each kind.",
        starter: '',
        solution: "SELECT CASE WHEN price_paid = 0 THEN 'Comp' ELSE 'Paid' END AS kind,\n       COUNT(*) AS tickets\nFROM tickets\nGROUP BY kind;\n",
        hint: "CASE … END AS kind, COUNT(*), GROUP BY kind",
        database: 'starlight',
        checks: [
          { message: '19 comps', outputIncludes: 'Comp | 19' },
          { message: '294 paid', outputIncludes: 'Paid | 294' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the CASE?',
        lines: ["SELECT CASE WHEN f.year < 1970 THEN 'Classic'", "            ELSE 'Modern' AS era", 'FROM films f;'],
        bug: 1,
        fix: "            ELSE 'Modern' END AS era",
        explanation: 'Every CASE needs END before its AS name.',
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Seven films are from before 1970 and eight after. What comes back?',
        code: "SELECT CASE WHEN year < 1970 THEN 'Classic' ELSE 'Modern' END AS era,\n       COUNT(*)\nFROM films GROUP BY era;",
        language: 'sql',
        options: [
          { text: 'Classic | 7 and Modern | 8' },
          { text: '15 rows, one per film', why: 'GROUP BY era makes one row per label.' },
          { text: 'Classic | 15', why: 'Each film gets the label that fits its own year.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Matinee or evening, for each screening.',
        template: "SELECT id,\n  [[1]] WHEN price = 9 [[2]] 'Matinee' [[3]] 'Evening' END AS kind\nFROM screenings;",
        blanks: [['CASE'], ['THEN'], ['ELSE']],
        distractors: ['IF', 'DO', 'OR'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: "Matinee vs evening takings: label each ticket's screening 'Matinee' (s.price = 9) or 'Evening', as kind, with SUM(t.price_paid) as takings per kind.",
        starter: '',
        solution: "SELECT CASE WHEN s.price = 9 THEN 'Matinee' ELSE 'Evening' END AS kind,\n       SUM(t.price_paid) AS takings\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nGROUP BY kind;\n",
        hint: 'JOIN screenings, CASE on s.price, SUM(t.price_paid), GROUP BY kind',
        database: 'starlight',
        checks: [
          { message: 'Evenings took $2,492', outputIncludes: 'Evening | 2492' },
          { message: 'Matinees took $1,044', outputIncludes: 'Matinee | 1044' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'dana',
        message: 'Classic films are the only thing that place sells. Everyone knows it.',
        prompt: 'Juno ran the era query. Her best reply?',
        options: [
          { text: 'Everyone\'s wrong.', why: 'True, but show the numbers.' },
          { text: 'Modern films sold 177 tickets this autumn; classics sold 136. People come for both.' },
          { text: 'Classics are better anyway.', why: 'That\'s taste, not evidence.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 3 review: count tickets per member name.',
        tiles: ['SELECT m.name, COUNT(*)', 'FROM tickets t', 'JOIN members m ON t.member_id = m.id', 'GROUP BY m.name;'],
        distractors: ['GROUP BY t.id;', 'ON t.id = m.id'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word closes every CASE?',
        answers: ['END'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'What label would make your own data clearer: weekday vs weekend, work vs personal, need vs want? What would you expect to see?',
    starters: ['I\'d label by...', 'I expect...'],
  },
  deepen: {
    title: 'More than two labels',
    summary: "CASE can have many WHENs: WHEN year < 1950 THEN '40s and older' WHEN year < 1980 THEN '50s to 70s' ELSE 'Recent'. The first true one wins.",
  },
  notes: "starlight.sql: films before 1970 = 7, after = 8; tickets by era Classic 136 / 1579, Modern 177 / 1957; Comp 19, Paid 294; evening takings 2492, matinee 1044; Vertigo 128 min (Long), Casablanca 102 (Short).",
};

export default lesson;
