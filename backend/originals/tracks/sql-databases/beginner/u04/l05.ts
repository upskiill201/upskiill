import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint. Reviews lessons 1–4 (COUNT, SUM/AVG/ROUND, MIN/MAX, GROUP BY) plus earlier chapters. Story: what Walt's comps cost. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Walt\'s comps',
  summary: '4 weeks to the 100th. Ms Delgado spots tickets at $0. "Comps," Walt says. "Friends." She asks how many, and what they would have paid. Walt has never once added it up.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Count, total and average without notes', 'Group results and sort the groups'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, the box office',
      beats: [
        { speaker: 'walt', text: 'A comp is a thank-you. The piano tuner. The man who fixed the boiler. Rosa\'s granddaughter.' },
        { speaker: 'juno', text: 'Nobody\'s taking them away. Ms Delgado just wants to know what they cost.' },
        { speaker: 'walt', text: 'A thank-you doesn\'t cost anything.' },
        { speaker: 'leo', text: 'It costs one seat. Times however many.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: what do the comps cost?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'How many comps? Count the tickets where price_paid is 0, named comps.',
        starter: '',
        solution: 'SELECT COUNT(*) AS comps FROM tickets WHERE price_paid = 0;\n',
        hint: 'COUNT(*) AS comps … WHERE price_paid = 0',
        database: 'starlight',
        checks: [
          { message: 'Name it comps', outputIncludes: 'comps' },
          { message: '19 free tickets', outputIncludes: 'comps 19' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What would the comps have paid? Each comp\'s screening price is in screenings. Which function adds them up?',
        options: [
          { text: 'COUNT(s.price)', why: 'That counts them: 19 again.' },
          { text: 'SUM(s.price)' },
          { text: 'SUM(t.price_paid)', why: 'Every comp paid 0, so that\'s 0.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'What would the comps have paid at full price? Sum s.price for tickets where t.price_paid = 0, named face_value.',
        starter: '',
        solution: 'SELECT SUM(s.price) AS face_value\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nWHERE t.price_paid = 0;\n',
        hint: 'JOIN screenings, WHERE t.price_paid = 0, SUM(s.price) AS face_value',
        database: 'starlight',
        checks: [
          { message: 'Name it face_value', outputIncludes: 'face_value' },
          { message: '$251 of thank-yous', outputIncludes: 'face_value 251' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Comps per screening.',
        template: 'SELECT screening_id, COUNT(*) AS comps\nFROM tickets\nWHERE price_paid = 0\n[[1]] [[2]] screening_id;',
        blanks: [['GROUP'], ['BY']],
        distractors: ['ORDER', 'SUM', 'HAVING'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: 'SELECT MIN(price_paid), MAX(price_paid)\nFROM tickets;',
        language: 'sql',
        options: [
          { text: '0 | 14' },
          { text: '9 | 25', why: 'Comps paid 0, and nobody has bought a $25 birthday ticket yet.' },
          { text: '0 | 25', why: 'The $25 screenings have no tickets yet.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Takings per screening: screening_id and SUM(price_paid) as takings, biggest first, top 3.',
        starter: '',
        solution: 'SELECT screening_id, SUM(price_paid) AS takings\nFROM tickets\nGROUP BY screening_id\nORDER BY takings DESC\nLIMIT 3;\n',
        hint: 'GROUP BY screening_id, ORDER BY takings DESC, LIMIT 3',
        database: 'starlight',
        checks: [
          { message: 'Name it takings', outputIncludes: 'screening_id | takings' },
          { message: 'The top night took $252', outputIncludes: '| 252' },
          { message: 'Just 3 rows', outputIncludes: '(3 rows)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is wrong?',
        lines: ['SELECT screening_id, SUM(price_paid)', 'FROM tickets', 'ORDER BY screening_id;'],
        bug: 2,
        fix: 'GROUP BY screening_id;',
        explanation: 'Without GROUP BY, SUM squeezes everything into one row. To get one total per screening, group by it.',
        language: 'sql',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to its function.',
        pairs: [
          ['How many comps?', 'COUNT'],
          ['What did they cost?', 'SUM'],
          ['Average ticket?', 'AVG'],
          ['Earliest booking?', 'MIN'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The average evening ticket (price_paid, for screenings priced 14), rounded to 2 places, as avg_evening.',
        starter: '',
        solution: 'SELECT ROUND(AVG(t.price_paid), 2) AS avg_evening\nFROM tickets t\nJOIN screenings s ON t.screening_id = s.id\nWHERE s.price = 14;\n',
        hint: 'JOIN screenings, WHERE s.price = 14, ROUND(AVG(t.price_paid), 2)',
        database: 'starlight',
        checks: [
          { message: 'Name it avg_evening', outputIncludes: 'avg_evening' },
          { message: 'Comps pull it to about $12.85', outputIncludes: '12.85' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Earlier chapters review: which part of the query?',
        groups: ['JOIN', 'WHERE', 'GROUP BY'],
        items: [
          { text: 'ON t.screening_id = s.id', group: 0 },
          { text: 'price_paid = 0', group: 1 },
          { text: 'screening_id', group: 2 },
          { text: 'member_id IS NULL', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'walt',
        message: 'Two hundred and fifty-one dollars. In thank-yous. Are you telling me to stop?',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'Yes, stop all of them.', why: 'That\'s not Juno\'s call, and the comps buy goodwill a database can\'t count.' },
          { text: 'No. I\'m telling you what they cost, so you choose them on purpose. The bank just wants to see you know.' },
          { text: 'It doesn\'t matter.', why: '$251 is 7% of the takings. It matters enough to know.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which two words split rows into groups before COUNT or SUM?',
        answers: ['GROUP BY'],
        placeholder: 'Two words',
      },
    ],
  },
  reflect: {
    prompt: 'What do you give away for free (time, favours, rides)? Would knowing what it "costs" change it, or just make it a choice?',
    starters: ['I give away...', 'Knowing would...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1-4. starlight.sql: 19 comps (price_paid 0), face value SUM(s.price) = 251 (7.1% of 3536 takings); top screening takings 252 (screenings 7 and 17); evening AVG(price_paid) = 2492/194 = 12.845 → 12.85.',
};

export default lesson;
