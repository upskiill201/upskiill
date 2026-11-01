import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Story: Walt wants names and seats to call people. Choosing columns. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Rows and columns',
  summary: '7 weeks to the 100th. Saturday morning. Walt wants to ring everyone who booked, but SELECT * shows him everything. Juno asks for just the columns he needs.',
  minutes: 10,
  outcomes: [
    'Pick only the columns you need: SELECT name, seat',
    'Choose the order the columns come back in',
    'Tell rows from columns',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Walt wants to ring everyone in the shoebox. SELECT * gives him six columns. He needs two: the name and the seat.', replies: ['Can I ask for just those?'] },
        { tey: 'Yes. Swap the * for column names, with commas between them: SELECT name, seat FROM cards;', replies: ['Does the order matter?'] },
        { tey: 'Only for how it looks. Columns come back in the order you list them. SELECT seat, name puts the seat first.', replies: ['And the rows?'] },
        { tey: 'Every row still comes back, all 10. Choosing columns cuts the table sideways. Next chapter you\'ll cut it the other way, picking rows.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Just what Walt needs',
      database: 'shoebox',
      code: 'SELECT name, seat FROM cards;\n',
      caption: 'Run it: two columns, all 10 rows.',
      challenge: 'Add the film too: SELECT name, film, seat FROM cards; and run it again.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Column names must match the table exactly. Open Tables under the editor any time to see every column\'s real name.',
    },
  ],
  apply: {
    scenario: 'Getting Walt his phone list.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which query shows only the name and seat columns?',
        options: [
          { text: 'SELECT name, seat FROM cards;' },
          { text: 'SELECT * FROM cards;', why: '* means every column: all six.' },
          { text: 'SELECT name seat FROM cards;', why: 'Without a comma, SQL reads seat as a new label for name, so you get one column.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Show just the name and seat of every card, name first.',
        starter: 'SELECT * FROM cards;\n',
        solution: 'SELECT name, seat FROM cards;\n',
        hint: 'Replace the * with name, seat',
        database: 'shoebox',
        checks: [
          { message: 'Show the name and seat columns, in that order', outputIncludes: 'name | seat' },
          { message: 'Show all 10 cards', outputIncludes: '(10 rows)' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Show the film and the night of every card.',
        template: 'SELECT film[[1]] night FROM [[2]];',
        blanks: [[','], ['cards']],
        distractors: ['and', 'card', ';'],
        language: 'sql',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many columns does this show?',
        code: 'SELECT name, film, seat FROM cards;',
        language: 'sql',
        options: [
          { text: '1', why: 'Each name between the commas is one column.' },
          { text: '6', why: 'That\'s SELECT *: every column in the table.' },
          { text: '3' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the word to what it is in the cards table.',
        pairs: [
          ['Table', 'The whole set of cards'],
          ['Row', 'One card'],
          ['Column', 'One fact on every card, like seat'],
          ['Value', 'G7, in one row\'s seat column'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Leo wants the seat first, then the name. Show seat and name, in that order.',
        starter: '',
        solution: 'SELECT seat, name FROM cards;\n',
        hint: 'List the columns in the order you want them: SELECT seat, name FROM cards;',
        database: 'shoebox',
        checks: [
          { message: 'Put seat first, then name', outputIncludes: 'seat | name' },
          { message: 'Show all 10 cards', outputIncludes: '(10 rows)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the query?',
        lines: ['SELECT name,', '       seats', 'FROM cards;'],
        bug: 1,
        fix: '       seat',
        explanation: 'The column is called seat, not seats. Names must match exactly (Tables shows the real ones).',
        language: 'sql',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: show the name and what each person paid.',
        tiles: ['SELECT', 'name,', 'paid', 'FROM', 'cards;'],
        distractors: ['name', 'WHERE'],
        language: 'sql',
      },
      {
        kind: 'chatReply',
        from: 'leo',
        message: 'Why not just use SELECT * every time? It shows everything.',
        prompt: 'Juno\'s best reply?',
        options: [
          { text: 'You\'re right, always use *.', why: 'Fine for a quick look, but real tables can have 40 columns.' },
          { text: 'Because * is slower to type.', why: 'It\'s actually quicker to type. That\'s not the reason.' },
          { text: 'Asking for only the columns you need gives a list you can actually read. Walt needs two columns, not six.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Run SELECT name, seat FROM cards; Whose card has no seat at all? (It shows NULL.)',
        answers: ['Ellen Novak', 'Ellen'],
        placeholder: 'A name',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a list you use (contacts, a playlist, a timetable). Which two or three columns do you actually look at?',
    starters: ['The list is...', 'I only look at...'],
  },
  deepen: {
    title: 'Peek at the Tables panel',
    summary: 'In any SQL pad, tap Tables. It lists every table and its columns. Real developers check the columns first, every time.',
  },
  notes: 'shoebox.sql columns: id, name, film, night, seat, paid. Card 8 (Ellen Novak) has seat NULL.',
};

export default lesson;
