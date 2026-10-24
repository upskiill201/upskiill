import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Chat with Tey: SUM, AVG and ROUND. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'SUM and AVG',
  summary: '4 weeks to the 100th. Ms Delgado\'s next email has one line: "Takings, please." The shoebox could never add up "comp" and "$14". The tickets table can.',
  minutes: 10,
  outcomes: [
    'Add up a column with SUM',
    'Find the average with AVG',
    'Round money to cents with ROUND',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'COUNT counts rows. SUM adds up a column. SUM(price_paid) is every dollar the tickets took.', replies: ['And the average ticket?'] },
        { tey: 'AVG(price_paid). It adds them up and divides by how many there are. Free comps count as 0, so they pull it down.', replies: ['It gives me lots of decimals.'] },
        { tey: 'ROUND(AVG(price_paid), 2) rounds to 2 decimal places: cents. ROUND(x) with no number rounds to a whole number.', replies: ['Can I add a WHERE?'] },
        { tey: 'Always. SUM(price_paid) with WHERE screening_id = 17 is one night\'s takings. That\'s why REAL prices mattered back in Chapter 1.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Takings, please',
      database: 'starlight',
      code: 'SELECT SUM(price_paid) AS takings,\n       ROUND(AVG(price_paid), 2) AS avg_ticket\nFROM tickets;\n',
      caption: 'Two numbers in one row: the total and the average. Run it.',
      challenge: 'Add WHERE screening_id = 17 for Casablanca night alone.',
    },
  ],
  apply: {
    scenario: 'Takings for Ms Delgado.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the function to what it gives.',
        pairs: [
          ['COUNT(*)', 'How many rows'],
          ['SUM(price_paid)', 'All the prices added up'],
          ['AVG(price_paid)', 'The average price'],
          ['ROUND(x, 2)', 'x to 2 decimal places'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'What did all the tickets take? Add up price_paid and name it takings.',
        starter: '',
        solution: 'SELECT SUM(price_paid) AS takings FROM tickets;\n',
        hint: 'SELECT SUM(price_paid) AS takings FROM tickets;',
        database: 'starlight',
        checks: [
          { message: 'Name it takings', outputIncludes: 'takings' },
          { message: '$3,536 in six weekends', outputIncludes: 'takings 3536' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the average ticket come out below the $14 evening price?',
        options: [
          { text: 'AVG is broken', why: 'AVG is fine. The tickets include cheaper ones.' },
          { text: 'Matinees cost $9 and free comps count as $0, which pull the average down' },
          { text: 'SUM was used instead', why: 'AVG is its own function: total divided by count.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'The average ticket price, rounded to 2 decimal places, named avg_ticket.',
        starter: 'SELECT AVG(price_paid) FROM tickets;\n',
        solution: 'SELECT ROUND(AVG(price_paid), 2) AS avg_ticket FROM tickets;\n',
        hint: 'Wrap it: ROUND(AVG(price_paid), 2) AS avg_ticket',
        database: 'starlight',
        checks: [
          { message: 'Name it avg_ticket', outputIncludes: 'avg_ticket' },
          { message: 'About $11.30', outputIncludes: 'avg_ticket 11.3' },
          { message: 'Use ROUND', codeIncludes: 'round(' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Casablanca night\'s takings.',
        template: 'SELECT [[1]](price_paid) FROM tickets\nWHERE [[2]] = 17;',
        blanks: [['SUM'], ['screening_id']],
        distractors: ['COUNT', 'AVG', 'id'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Casablanca night: 18 tickets at $14 and 2 free comps. What does this show?',
        code: 'SELECT SUM(price_paid)\nFROM tickets WHERE screening_id = 17;',
        language: 'sql',
        options: [
          { text: '280', why: 'That\'s 20 × $14. The two comps paid $0.' },
          { text: '252' },
          { text: '20', why: 'That\'s COUNT. SUM adds the prices.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'What did matinees take? Sum price_paid for tickets whose screening price is 9.',
        starter: '',
        solution: 'SELECT SUM(t.price_paid)\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nWHERE s.price = 9;\n',
        hint: 'JOIN screenings, WHERE s.price = 9, SUM(t.price_paid)',
        database: 'starlight',
        checks: [
          { message: 'Matinees took $1,044', outputIncludes: '1044' },
          { message: 'Use SUM', codeIncludes: 'sum(' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t give the average?',
        lines: ['SELECT', '  SUM(price_paid) / COUNT(price_paid),', '  AVERAGE(price_paid)', 'FROM tickets;'],
        bug: 2,
        fix: '  AVG(price_paid)',
        explanation: 'The function is AVG, not AVERAGE. (Line 2 works: it\'s the average done by hand.)',
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'Three thousand five hundred dollars. In six weekends. Is that good?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'It\'s amazing!', why: 'Is it? The roof costs $40,000. Honest beats hopeful with a bank.' },
          { text: 'It\'s terrible.', why: 'Too harsh. It\'s a real number, and the first one Walt has ever had.' },
          { text: 'It\'s honest. $3,536, and now we can see which nights earn it. That\'s what the bank asked for.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Chapter 3 review: JOIN or LEFT JOIN?',
        groups: ['JOIN', 'LEFT JOIN'],
        items: [
          { text: 'Matinee tickets with their prices', group: 0 },
          { text: 'Every screening, even unsold ones', group: 1 },
          { text: 'Every ticket, with a name if there is one', group: 1 },
          { text: 'Member tickets with member names', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does ROUND(11.297, 2) give?',
        answers: ['11.3', '11.30'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Pick one thing you spend money on every week. Would you rather know the total, or the average? Why?',
    starters: ['I spend on...', 'I\'d want the...'],
  },
  deepen: {
    title: 'Money and REAL',
    summary: 'Real banking systems store money as whole cents (INTEGER) to avoid tiny rounding errors. For the Starlight, REAL plus ROUND is fine.',
  },
  notes: 'starlight.sql: SUM(price_paid) = 3536; AVG = 11.297 → ROUND(…, 2) = 11.3; screening 17 = 252 (18 × 14, 2 comps); matinees (price 9) = 1044. The roof figure ($40,000) is the story\'s loan amount.',
};

export default lesson;
