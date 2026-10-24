import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Before/after: WHERE (rows) vs HAVING (groups); finding seat G7 sold twice. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'HAVING',
  summary: '4 weeks to the 100th. Ms Delgado asks the question Juno dreads: "Was G7 the only double booking?" 313 tickets, checked by eye? No. Grouped, and filtered by group.',
  minutes: 11,
  outcomes: [
    'Filter groups with HAVING',
    'Tell WHERE (before grouping) from HAVING (after)',
    'Find duplicates with GROUP BY … HAVING COUNT(*) > 1',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Filtering rows vs filtering groups',
      before: { label: 'WHERE: filters rows, before grouping', text: "SELECT city, COUNT(*)\nFROM members\nWHERE city <> 'Chicago'\nGROUP BY city;" },
      after: { label: 'HAVING: filters groups, after counting', text: 'SELECT city, COUNT(*)\nFROM members\nGROUP BY city\nHAVING COUNT(*) >= 5;' },
      notes: [
        'WHERE can\'t see counts: they don\'t exist yet when WHERE runs.',
        'HAVING runs after GROUP BY, so it can use COUNT, SUM and friends.',
        'Same order every time: WHERE, GROUP BY, HAVING, ORDER BY.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Was G7 the only one?',
      database: 'starlight',
      code: 'SELECT screening_id, seat, COUNT(*) AS times_sold\nFROM tickets\nGROUP BY screening_id, seat\nHAVING COUNT(*) > 1;\n',
      caption: 'Group every ticket by screening and seat. Any group bigger than 1 is a seat sold twice. Run it.',
      challenge: 'Change > 1 to = 1. That\'s every seat sold correctly: how many?',
    },
  ],
  apply: {
    scenario: 'Hunting for double bookings.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why can\'t you write WHERE COUNT(*) > 1?',
        options: [
          { text: 'COUNT doesn\'t work with WHERE ever', why: 'You can count rows that pass a WHERE. You just can\'t filter on the count in WHERE.' },
          { text: 'WHERE runs before the groups are counted, so there\'s no count yet. Use HAVING.' },
          { text: 'It works fine', why: 'SQLite says "misuse of aggregate". That\'s HAVING\'s job.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Find every seat sold more than once for the same screening: screening_id, seat and COUNT(*).',
        starter: 'SELECT screening_id, seat, COUNT(*)\nFROM tickets\nGROUP BY screening_id, seat\n',
        solution: 'SELECT screening_id, seat, COUNT(*)\nFROM tickets\nGROUP BY screening_id, seat\nHAVING COUNT(*) > 1;\n',
        hint: 'Add HAVING COUNT(*) > 1;',
        database: 'starlight',
        checks: [
          { message: 'G7 on screening 17, sold twice', outputIncludes: '17 | G7 | 2' },
          { message: 'Only one double booking', outputIncludes: '(1 row)' },
          { message: 'Use HAVING', codeIncludes: 'having' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'WHERE or HAVING?',
        groups: ['WHERE', 'HAVING'],
        items: [
          { text: 'Only tickets for screening 17', group: 0 },
          { text: 'Only films that sold more than 30 tickets', group: 1 },
          { text: 'Only members in Evanston', group: 0 },
          { text: 'Only cities with 5 or more members', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Cities with at least 5 members.',
        template: 'SELECT city, COUNT(*) FROM members\nGROUP BY city\n[[1]] COUNT(*) [[2]] 5;',
        blanks: [['HAVING'], ['>=']],
        distractors: ['WHERE', '=<', 'AND'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Genres with 2 or more films: Thriller 4, Comedy 3, Animation 2, Sci-Fi 2; the rest have 1. How many rows?',
        code: 'SELECT genre, COUNT(*) FROM films\nGROUP BY genre\nHAVING COUNT(*) >= 2;',
        language: 'sql',
        options: [
          { text: '8, every genre', why: 'HAVING drops the genres with only one film.' },
          { text: '2', why: 'Four genres have 2 or more.' },
          { text: '4' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'The real regulars: members with 10 or more tickets. Show member_id and COUNT(*) as visits, most first.',
        starter: '',
        solution: 'SELECT member_id, COUNT(*) AS visits\nFROM tickets\nWHERE member_id IS NOT NULL\nGROUP BY member_id\nHAVING COUNT(*) >= 10\nORDER BY visits DESC;\n',
        hint: 'GROUP BY member_id, HAVING COUNT(*) >= 10, ORDER BY visits DESC',
        database: 'starlight',
        checks: [
          { message: 'Member 18 (Jenny Kim) leads with 15', outputIncludes: 'member_id | visits 18 | 15' },
          { message: '6 members with 10 or more', outputIncludes: '(6 rows)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'SQLite says "misuse of aggregate". Which line?',
        lines: ['SELECT member_id, COUNT(*)', 'FROM tickets', 'WHERE COUNT(*) >= 10', 'GROUP BY member_id;'],
        bug: 2,
        fix: '(remove it, and add HAVING COUNT(*) >= 10 after GROUP BY)',
        explanation: 'Counts don\'t exist yet when WHERE runs. Filter on them with HAVING, after GROUP BY.',
        language: 'sql',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the parts in the order SQL needs.',
        lines: ['SELECT member_id, COUNT(*) AS visits', 'FROM tickets', 'WHERE member_id IS NOT NULL', 'GROUP BY member_id', 'HAVING COUNT(*) >= 10', 'ORDER BY visits DESC;'],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'dana',
        message: 'One double booking you know of. How do you know there aren\'t more?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'I checked every ticket by hand.', why: 'She didn\'t, and couldn\'t. The query did.' },
          { text: 'We don\'t, really.', why: 'They do. The query checked every screening and seat.' },
          { text: 'I grouped all 313 tickets by screening and seat. Exactly one group has two tickets: G7 on 2 October. And from next chapter, the database will refuse a second one.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 3 review: match the join to what it keeps.',
        pairs: [
          ['JOIN', 'Only rows that match'],
          ['LEFT JOIN', 'Every left row, matched or not'],
          ['LEFT JOIN … WHERE t.id IS NULL', 'Only the rows with no match'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which keyword filters groups after GROUP BY?',
        answers: ['HAVING'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Where could duplicates be hiding in your own lists (contacts, subscriptions, files)? How would you "group and count" to find them?',
    starters: ['Duplicates might be in...', 'I\'d group by...'],
  },
  deepen: {
    title: 'Clean up the duplicates',
    summary: 'Real teams run a duplicate check like this before every data import. In Chapter 5 you\'ll make the duplicate impossible instead.',
  },
  notes: 'starlight.sql: the only (screening_id, seat) with COUNT > 1 is (17, G7) = 2; members with >= 10 tickets: 18 Jenny Kim 15, 36 Felix Wagner 12, 5 Priya Raman 11, and 24 Ama Mensah, 6 Ellen Novak, 4 Marcus Hill with 10; genres with >= 2 films: Thriller 4, Comedy 3, Animation 2, Sci-Fi 2. SQLite error text: "misuse of aggregate".',
};

export default lesson;
