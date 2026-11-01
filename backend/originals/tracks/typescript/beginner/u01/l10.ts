import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 plus earlier. Story beat: Grace explains her progress at stand-up. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the stand-up',
  summary: 'Monday stand-up. Priya asks what Grace has been learning, in front of the whole team. Quotes, type errors, erased types and reading errors, all mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Use quotes correctly in text', 'Read and fix type errors and syntax errors', 'Explain what happens to types when code runs'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Monday, 9:30. Kinwell\'s stand-up. Everyone says what they did and what\'s next. Then Priya turns to Grace: "And you\'re learning TypeScript now?"',
          replies: ['Gulp', 'Bring it on'],
        },
        {
          tey: 'Grace takes a breath. She knows more than she thinks. Text needs quotes. Type errors mean a value doesn\'t match its label. The labels get erased before the code runs.',
          replies: ['And errors?'],
        },
        {
          tey: 'And errors are just notes: read the message, find the line, fix one thing, run again. Let\'s see if you could do Grace\'s stand-up.',
        },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: the stand-up.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which line shows Grace\'s list without an error?',
        options: [
          { text: 'console.log(\'Grace\'s list\');', why: 'The apostrophe ends the single-quoted text early.' },
          { text: 'console.log(Grace\'s list);', why: 'Without quotes around the text, TypeScript can\'t read it.' },
          { text: 'console.log("Grace\'s list");' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Show Today\'s stand-up (with the apostrophe)',
        starter: '',
        solution: 'console.log("Today\'s stand-up");\n',
        hint: 'Double quotes around the whole text keep the apostrophe safe.',
        checks: [{ message: 'Show Today\'s stand-up', outputIncludes: 'Today\'s stand-up' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Syntax error, type error, or fine?',
        groups: ['Syntax error', 'Type error', 'Fine'],
        items: [
          { text: 'console.log("Room 2";', group: 0 },
          { text: 'let rooms: number = "2";', group: 1 },
          { text: 'console.log("Rooms: " + 2);', group: 2 },
          { text: 'console.log("Room 2);', group: 0 },
          { text: 'let room: string = "Room 2";', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What runs in the browser: the TypeScript you write, or something else?',
        options: [
          { text: 'JavaScript, with the type labels removed' },
          { text: 'The TypeScript, labels and all', why: 'Browsers run JavaScript. TypeScript checks the labels, then erases them.' },
          { text: 'A picture of your code', why: 'It runs as real JavaScript, just without the labels.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the type error so the code shows Stand-up at 9:30',
        starter: 'let time: string = 930;\nconsole.log("Stand-up at " + time);\n',
        solution: 'let time: string = "9:30";\nconsole.log("Stand-up at " + time);\n',
        hint: 'time is labelled string, so it needs text in quotes: "9:30".',
        checks: [
          { message: 'No type errors', noTypeErrors: true },
          { message: 'Show Stand-up at 9:30', outputIncludes: 'Stand-up at 9:30' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line TypeScript can\'t find a name in.',
        language: 'typescript',
        lines: ['console.log("Monday");', 'console.log(Priya);', 'console.log("Room 1");'],
        bug: 1,
        fix: 'console.log("Priya");',
        explanation: 'Without quotes, Priya is read as a name TypeScript doesn\'t know.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'priya',
        message: 'So what\'s the most useful thing you\'ve learned so far?',
        options: [
          { text: 'That red lines are bad and I should avoid them.', why: 'Red lines are the safety net working. Grace has learned to read them, not fear them.' },
          { text: 'That TypeScript catches mistakes like the ones in our spreadsheet before anything runs, and the messages say how to fix them.' },
          { text: 'Nothing yet, it\'s only been two weeks.', why: 'Grace has learned plenty. Saying it out loud is part of learning.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each label to what it allows.',
        pairs: [
          [': number', 'Only numbers, like 45'],
          [': string', 'Only text, like "Room 2"'],
          ['"45"', 'Text, even though it looks like a number'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: 'let room: string = "Room 3";\nconsole.log("Booked:", room);',
        language: 'typescript',
        options: [
          { text: 'Booked: room', why: 'room is a name, so console.log shows what\'s inside it.' },
          { text: 'Booked: Room 3' },
          { text: 'An error', why: 'room is labelled string and holds text, so everything matches.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the label so this works.',
        language: 'typescript',
        template: 'let team: [[1]] = "UX research";',
        blanks: [['string']],
        distractors: ['number', 'text'],
      },
      {
        kind: 'orderLines',
        prompt: 'Grace\'s routine for any error, in order.',
        lines: ['Read the message', 'Find the line', 'Fix one thing', 'Run again'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make room a string holding Room 4, sessions a number holding 2, and show Room 4 2',
        starter: '',
        solution: 'let room: string = "Room 4";\nlet sessions: number = 2;\nconsole.log(room, sessions);\n',
        hint: 'Two labelled boxes, then console.log(room, sessions).',
        checks: [
          { message: 'Label room as a string', codeIncludes: ': string' },
          { message: 'Label sessions as a number', codeIncludes: ': number' },
          { message: 'Show Room 4 2', outputEquals: 'Room 4 2' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'How would you explain what you\'ve learned so far to someone at your work, in one or two sentences?',
    starters: ['I\'d say...', 'The most useful part is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Explain TypeScript to a friend in one sentence, without the word "code". If they get it, you\'ve got it.',
  },
  notes: 'Checkpoint 2 reviews l06–l09 (quotes, type errors, erased types, reading errors) plus l01–l04. time: string = 930 → TS2322 number not assignable to string.',
};

export default lesson;
