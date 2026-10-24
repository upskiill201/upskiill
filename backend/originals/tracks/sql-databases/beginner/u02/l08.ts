import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Reading: IS NULL / IS NOT NULL, and why = NULL never matches. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Who has no email?',
  summary: '6 weeks to the 100th. Leo wants to email every member about the birthday. Some members never gave an email. Juno writes WHERE email = NULL and gets nothing. Not even the ones she knows are missing.',
  minutes: 10,
  outcomes: [
    'Find missing values with IS NULL',
    'Find filled-in values with IS NOT NULL',
    'Explain why = NULL never matches',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Unknown is not equal to anything',
      html: '<p>Remember: NULL means <strong>"unknown"</strong>. So what is the answer to "is this unknown email equal to unknown"?</p><p>SQL\'s answer: <em>unknown</em>. Not true. And WHERE only keeps rows where the condition is <strong>true</strong>. That\'s why <code>WHERE email = NULL</code> finds nothing, ever.</p><p>SQL has special words for it:</p><p><code>WHERE email IS NULL</code>: the email is missing.<br><code>WHERE email IS NOT NULL</code>: the email is there.</p><p>At the Starlight, NULL shows up in two places: members who never gave an email, and <strong>walk-in tickets</strong> sold at the door to people who aren\'t members, where <code>member_id</code> is NULL.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The two queries',
      database: 'starlight',
      code: "-- Finds nothing, ever:\nSELECT name FROM members WHERE email = NULL;\n\n-- The right way:\nSELECT name FROM members WHERE email IS NULL;\n",
      caption: 'Two queries, two results. Run it and compare: 0 rows, then 6.',
      challenge: 'Change the second one to IS NOT NULL. How many members can Leo email?',
    },
  ],
  apply: {
    scenario: 'Leo\'s birthday email list.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does WHERE email = NULL find nothing?',
        options: [
          { text: 'Comparing anything with unknown gives unknown, and WHERE only keeps true' },
          { text: 'Nobody has a missing email', why: 'Six members do. IS NULL finds them.' },
          { text: 'NULL needs quotes', why: "'NULL' in quotes is the word NULL, a different thing entirely." },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the name and city of every member with no email.',
        starter: 'SELECT name, city FROM members\n',
        solution: 'SELECT name, city FROM members\nWHERE email IS NULL;\n',
        hint: 'WHERE email IS NULL;',
        database: 'starlight',
        checks: [
          { message: 'Include Marcus Hill', outputIncludes: 'Marcus Hill' },
          { message: 'All 6 members with no email', outputIncludes: '(6 rows)' },
          { message: 'Use IS NULL', codeIncludes: 'is null' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Leo\'s list: members he CAN email.',
        template: 'SELECT name, email FROM members\nWHERE email [[1]] [[2]] NULL;',
        blanks: [['IS'], ['NOT']],
        distractors: ['=', '<>', 'NO'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The Starlight has 40 members and 6 have no email. How many rows?',
        code: 'SELECT name FROM members\nWHERE email IS NOT NULL;',
        language: 'sql',
        options: [
          { text: '6', why: 'That\'s IS NULL. IS NOT NULL is everyone else.' },
          { text: '34' },
          { text: '40', why: 'The six with no email are left out.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'How many walk-in tickets? Show the id and seat of every ticket with no member_id.',
        starter: '',
        solution: 'SELECT id, seat FROM tickets WHERE member_id IS NULL;\n',
        hint: 'WHERE member_id IS NULL',
        database: 'starlight',
        checks: [
          { message: 'Show id and seat', outputIncludes: 'id | seat' },
          { message: 'All 47 walk-in tickets', outputIncludes: '(47 rows)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This list should be members WITH an email in Chicago. Which line is wrong?',
        lines: ['SELECT name, email', 'FROM members', "WHERE city = 'Chicago'", '  AND email <> NULL;'],
        bug: 3,
        fix: '  AND email IS NOT NULL;',
        explanation: '<> NULL is also unknown, so it finds nothing. Use IS NOT NULL.',
        language: 'sql',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does WHERE keep the row?',
        groups: ['Kept', 'Not kept'],
        items: [
          { text: 'email IS NULL, and the email is missing', group: 0 },
          { text: 'email = NULL, and the email is missing', group: 1 },
          { text: 'email IS NOT NULL, and there is an email', group: 0 },
          { text: 'email <> NULL, and there is an email', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Leo\'s first batch: the name and email of Chicago members who HAVE an email, sorted by name.',
        starter: '',
        solution: "SELECT name, email FROM members\nWHERE city = 'Chicago' AND email IS NOT NULL\nORDER BY name;\n",
        hint: "city = 'Chicago' AND email IS NOT NULL, then ORDER BY name.",
        database: 'starlight',
        checks: [
          { message: 'Aiko Tanaka comes first', outputIncludes: 'name | email Aiko Tanaka' },
          { message: '19 Chicago members with an email', outputIncludes: '(19 rows)' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'For people with no email, can I just put "none" in the column?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Sure, it reads nicer.', why: 'Then IS NULL stops finding them, and an email app will try to send to "none".' },
          { text: 'Put an empty string instead.', why: 'Same problem: it looks like a value but isn\'t one.' },
          { text: 'No. NULL says "we don\'t know" and IS NULL can find it. "none" is a fake email.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Chapter 2 review: the three cheapest screenings, cheapest first.',
        tiles: ['SELECT id, price FROM screenings', 'ORDER BY price', 'LIMIT 3', ';'],
        distractors: ['ORDER BY price DESC', 'WHERE price'],
        language: 'sql',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Complete the condition that finds walk-in tickets: WHERE member_id …',
        answers: ['IS NULL'],
        placeholder: 'Two words',
      },
    ],
  },
  reflect: {
    prompt: 'Is there something you don\'t know about yourself that a form keeps asking (a middle name, a work phone)? What do you type, and what would NULL mean instead?',
    starters: ['The form asks...', 'I usually type...'],
  },
  deepen: {
    title: 'Three-valued logic',
    summary: 'SQL conditions can be true, false or unknown. Look up "SQL three-valued logic" to see the full table for AND, OR and NOT.',
  },
  notes: 'starlight.sql: members with NULL email = 4 Marcus Hill, 9 Diego Ruiz, 17 Omar Saleh, 23 Ivan Petrov, 31 Daniel Weiss, 36 Felix Wagner; 34 with email; Chicago members 22, of whom 3 have no email (Diego, Ivan, Daniel) = 19; walk-in tickets (member_id NULL) = 47. NULL comparisons: sqlite.org/nulls.html.',
};

export default lesson;
