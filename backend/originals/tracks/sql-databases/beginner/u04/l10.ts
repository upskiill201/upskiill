import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Unit Challenge. The report for Ms Delgado: every aggregate in one meeting. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: the bank report',
  summary: '4 weeks to the 100th. Friday, 10 a.m., Lakeview Community Bank. Ms Delgado has a list. Juno has a laptop. Every number has to be right, including the ones that aren\'t flattering.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Build a report from COUNT, SUM, AVG, MIN and MAX',
    'Group, filter groups and label rows to answer business questions',
    'Present honest numbers, good and bad',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 10 a.m., the bank',
      beats: [
        { speaker: 'narrator', text: 'Ms Delgado\'s office. A plant, a calculator, and a printed copy of Dana\'s letter.' },
        { speaker: 'narrator', text: '"Total takings. Your best films. What the free tickets cost. And how full a typical night is."' },
        { speaker: 'walt', text: 'Juno, tell her the good ones first.' },
        { speaker: 'juno', text: 'I\'ll tell her all of them.' },
      ],
      choice: {
        prompt: 'A typical night sells about 13 of 120 seats. Should Juno include that?',
        options: [
          { text: 'Yes, and show what sells best, so the bank sees a plan, not a secret.', outcome: 'Ms Delgado puts her pen down. "Honest numbers. I can work with honest numbers."', best: true },
          { text: 'No, leave it out. It helps Dana.', outcome: 'The bank would find it in the data anyway, and then trust nothing else in the report.' },
          { text: 'Round it up to "about half full".', outcome: 'That\'s not rounding, that\'s making it up. A database is only worth having if its numbers are true.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'Unit Challenge: Ms Delgado\'s list.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Line 1: total tickets and total takings, as tickets and takings, in one row.',
        starter: '',
        solution: 'SELECT COUNT(*) AS tickets, SUM(price_paid) AS takings\nFROM tickets;\n',
        hint: 'COUNT(*) AS tickets, SUM(price_paid) AS takings',
        database: 'starlight',
        checks: [
          { message: 'Name them tickets and takings', outputIncludes: 'tickets | takings' },
          { message: '313 tickets, $3,536', outputIncludes: '313 | 3536' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Line 2: "takings per film, best first". Which pair of clauses?',
        options: [
          { text: 'GROUP BY f.title, then ORDER BY takings DESC' },
          { text: 'ORDER BY f.title, then GROUP BY takings', why: 'Group by the film; sort by the money.' },
          { text: 'WHERE takings > 0', why: 'takings is a SUM; WHERE can\'t see it.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Line 2: the top 3 films by takings. f.title and SUM(t.price_paid) as takings.',
        starter: '',
        solution: 'SELECT f.title, SUM(t.price_paid) AS takings\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nGROUP BY f.title\nORDER BY takings DESC\nLIMIT 3;\n',
        hint: 'Two JOINs, GROUP BY f.title, ORDER BY takings DESC, LIMIT 3',
        database: 'starlight',
        checks: [
          { message: 'Casablanca, $476', outputIncludes: 'Casablanca | 476' },
          { message: 'Then Jaws, $434', outputIncludes: 'Jaws | 434' },
          { message: 'Top 3 only', outputIncludes: '(3 rows)' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Line 3: what the comps cost at face value.',
        template: 'SELECT [[1]](s.price) AS face_value\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\n[[2]] t.price_paid = 0;',
        blanks: [['SUM'], ['WHERE']],
        distractors: ['COUNT', 'HAVING', 'AVG'],
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Line 4: how full is a typical night? The average of tickets per screening: round(COUNT(*) / 24.0, 1) as avg_per_night (24 screenings sold tickets).',
        starter: 'SELECT\nFROM tickets;\n',
        solution: 'SELECT ROUND(COUNT(*) / 24.0, 1) AS avg_per_night\nFROM tickets;\n',
        hint: 'ROUND(COUNT(*) / 24.0, 1) AS avg_per_night. 24.0 keeps the decimals.',
        database: 'starlight',
        checks: [
          { message: 'Name it avg_per_night', outputIncludes: 'avg_per_night' },
          { message: 'About 13 tickets a night', outputIncludes: 'avg_per_night 13' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'September had 16 screenings, October 8 (so far), November 3 (not on sale). What comes back?',
        code: "SELECT CASE WHEN starts_at < '2026-10-01' THEN 'September' ELSE 'Later' END AS part,\n       COUNT(*)\nFROM screenings GROUP BY part;",
        language: 'sql',
        options: [
          { text: 'September | 16 and Later | 8', why: 'Later also includes the 3 November screenings.' },
          { text: 'Later | 11 and September | 16' },
          { text: 'One row: 27', why: 'GROUP BY part makes one row per label.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Line 5: the most loyal members. member_id and COUNT(*) as visits, for members with 12 or more tickets, most first.',
        starter: '',
        solution: 'SELECT member_id, COUNT(*) AS visits\nFROM tickets\nWHERE member_id IS NOT NULL\nGROUP BY member_id\nHAVING COUNT(*) >= 12\nORDER BY visits DESC;\n',
        hint: 'GROUP BY member_id, HAVING COUNT(*) >= 12, ORDER BY visits DESC',
        database: 'starlight',
        checks: [
          { message: 'Member 18 with 15 visits', outputIncludes: '18 | 15' },
          { message: 'Member 36 with 12', outputIncludes: '36 | 12' },
          { message: 'Just those 2', outputIncludes: '(2 rows)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Line 6 errors with "misuse of aggregate". Which line?',
        lines: ['SELECT f.genre, SUM(t.price_paid) AS takings', 'FROM tickets t', 'JOIN screenings s ON t.screening_id = s.id', 'JOIN films f ON s.film_id = f.id', 'WHERE SUM(t.price_paid) > 300', 'GROUP BY f.genre;'],
        bug: 4,
        fix: '(move it after GROUP BY as HAVING SUM(t.price_paid) > 300)',
        explanation: 'Totals don\'t exist until after GROUP BY. Filter them with HAVING.',
        language: 'sql',
      },
      {
        kind: 'writeCode',
        prompt: 'Line 6: genres that took more than $300. f.genre and SUM(t.price_paid) as takings, biggest first.',
        starter: '',
        solution: 'SELECT f.genre, SUM(t.price_paid) AS takings\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nJOIN films f ON s.film_id = f.id\nGROUP BY f.genre\nHAVING SUM(t.price_paid) > 300\nORDER BY takings DESC;\n',
        hint: 'GROUP BY f.genre HAVING SUM(t.price_paid) > 300 ORDER BY takings DESC',
        database: 'starlight',
        checks: [
          { message: 'Thrillers lead', outputIncludes: 'genre | takings Thriller' },
          { message: 'Use HAVING', codeIncludes: 'having' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool did each line of the report need?',
        groups: ['GROUP BY', 'HAVING', 'CASE'],
        items: [
          { text: 'Takings per film', group: 0 },
          { text: 'Only members with 12+ visits', group: 1 },
          { text: 'Matinee vs evening labels', group: 2 },
          { text: 'Tickets per city', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each report number to its query.',
        pairs: [
          ['$3,536', 'SUM(price_paid)'],
          ['313', 'COUNT(*)'],
          ['40', 'COUNT(DISTINCT member_id)'],
          ['$251', 'SUM(s.price) of the comps'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'She said "honest numbers". Is that good or bad?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Bad. She saw the 13 a night.', why: 'She saw it, and she\'s still talking to them. That\'s good.' },
          { text: 'It means nothing.', why: 'From a loan officer, it means a lot.' },
          { text: 'Good. She knows what she\'s lending against. Now we prove the birthday weekend can sell out.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 3 review: screenings with no tickets yet.',
        tiles: ['SELECT s.id FROM screenings s', 'LEFT JOIN tickets t ON t.screening_id = s.id', 'WHERE t.id IS NULL;'],
        distractors: ['JOIN tickets t ON t.screening_id = s.id', 'WHERE t.id = NULL;'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The birthday weekend is 3 screenings of 120 seats. How many seats must sell for a sell-out?',
        answers: ['360'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Juno told the bank the unflattering number too. When did telling the whole truth, numbers included, help you more than it hurt?',
    starters: ['I told...', 'It helped because...'],
  },
  deepen: {
    title: 'From query to dashboard',
    summary: 'Every line of this report is one saved query. Dashboards are just saved queries that run again every morning.',
  },
  notes: 'Unit Challenge for Chapter 4. starlight.sql: 313 tickets, 3536 takings; top films Casablanca 476, Jaws 434, Back to the Future 392; comps face value 251; 313 / 24 sold screenings = 13.0; screenings Sep 16, Oct 8, Nov 3; members with >= 12 tickets: 18 (15), 36 (12); genre takings: Thriller top. Birthday weekend = 3 × 120 = 360 seats.',
};

export default lesson;
