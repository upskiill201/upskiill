import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14 plus earlier. Story beat: Jayden challenges his mum. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Jayden\'s challenge',
  summary: 'Sunday at the kitchen table. Jayden, 17, thinks he can out-code his mum. Maths, comments, where code runs and reading code, all mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Do maths in TypeScript and spot text pretending to be a number', 'Use comments well', 'Predict what code shows before running it'],
  learn: [
    {
      kind: 'story',
      title: 'The kitchen table',
      beats: [
        { speaker: 'narrator', text: 'Sunday, after lunch. Jayden slides his laptop across the table.' },
        { speaker: 'jayden', text: 'I did a coding club at school. Bet I can beat you. Ten questions.' },
        { speaker: 'grace', text: 'You\'re on. Loser washes up.' },
        { speaker: 'jayden', text: 'Question one. What\'s "45" plus 15?' },
        { speaker: 'grace', text: 'Trick question. With quotes it\'s text, so you get 4515. That\'s the exact bug that broke our spreadsheet.' },
        { speaker: 'narrator', text: 'Jayden looks at the sink. Then back at his mum.' },
        { speaker: 'tey', text: 'Grace is off to a good start. Let\'s see if you can match her.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: Jayden\'s challenge.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: 'console.log("45" + 15);',
        language: 'typescript',
        options: [
          { text: '60', why: '"45" has quotes, so it\'s text and + joins.' },
          { text: '4515' },
          { text: 'An error', why: 'Joining text and a number is allowed. It just gives text.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show how many minutes four sessions take: 4 times (45 plus 15). It should show 240.',
        starter: '',
        solution: 'console.log(4 * (45 + 15));\n',
        hint: 'Brackets first, then multiply: 4 * (45 + 15).',
        checks: [
          { message: 'Show 240', outputEquals: '240' },
          { message: 'Work it out with *', codeIncludes: '*' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: 'console.log((2 + 3) * 4);',
        language: 'typescript',
        options: [
          { text: '14', why: 'The brackets go first: 2 + 3 is 5, then 5 * 4.' },
          { text: '234', why: 'These are numbers, so they\'re worked out, not joined.' },
          { text: '20' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful comment, or switched-off code?',
        groups: ['A helpful note', 'Code switched off'],
        items: [
          { text: '// 15 minutes to reset the room', group: 0 },
          { text: '// console.log("Room 2");', group: 1 },
          { text: '// Priya wants no sessions after 4pm', group: 0 },
          { text: '// booked = booked + 1;', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where can TypeScript code end up running?',
        options: [
          { text: 'Only on Microsoft computers', why: 'Once checked and turned into JavaScript, it runs almost anywhere.' },
          { text: 'In browsers, on phones, and on servers with Node.js' },
          { text: 'Only in a special app', why: 'Every browser runs JavaScript, so no special app is needed.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the bug so total is the number 60 with no type errors',
        starter: 'const total: number = "30" + 30;\nconsole.log(total);\n',
        solution: 'const total: number = 30 + 30;\nconsole.log(total);\n',
        hint: 'Remove the quotes from "30" so it\'s a number.',
        checks: [
          { message: 'No type errors', noTypeErrors: true },
          { message: 'Show 60', outputEquals: '60' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the last line show?',
        code: 'let washing: number = 5;\nwashing = washing - 2;\nconsole.log(washing);',
        language: 'typescript',
        options: [
          { text: '3' },
          { text: '5', why: 'Line 2 takes 2 away and puts the answer back.' },
          { text: '-2', why: 'It takes 2 away from what\'s already in washing (5).' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'jayden',
        message: 'OK, why do you even write : number? My club never bothered.',
        options: [
          { text: 'So TypeScript catches it when "45" sneaks in where a number should be, before anything runs.' },
          { text: 'Because it looks clever.', why: 'Grace writes it because it catches real bugs, like the "4515" one.' },
          { text: 'No reason, it\'s optional.', why: 'Often you can leave it out, but the label is what lets TypeScript catch the mistake.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Add the signs so this shows 180: three sessions of 45 plus 15.',
        language: 'typescript',
        template: 'console.log(3 [[1]] (45 [[2]] 15));',
        blanks: [['*'], ['+']],
        distractors: ['-', '/'],
      },
      {
        kind: 'findBug',
        prompt: 'This should show Sinks: 1. Tap the line that\'s wrong.',
        language: 'typescript',
        lines: ['let sinks: number = 1;', '// sinks = sinks + 1;', 'consol.log("Sinks: " + sinks);'],
        bug: 2,
        fix: 'console.log("Sinks: " + sinks);',
        explanation: 'consol is misspelled. TypeScript would say: did you mean console?',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does console.log(90 / 60) show?',
        answers: ['1.5'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Add a "why" comment, and show Dishes: 2',
        starter: 'let dishes: number = 2;\n',
        solution: 'let dishes: number = 2;\n// Jayden lost, so he washes up\nconsole.log("Dishes: " + dishes);\n',
        hint: 'A line starting with //, then console.log("Dishes: " + dishes);',
        checks: [
          { message: 'Add a comment', codeIncludes: '//' },
          { message: 'Show Dishes: 2', outputEquals: 'Dishes: 2' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Teaching or quizzing someone else is one of the best ways to check what you know. Who could you explain this week\'s lessons to?',
    starters: ['I could explain it to...', 'The part I\'d explain first is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write three questions like Jayden\'s for a friend: one maths, one comment, one predict-the-output.',
  },
  notes: 'Checkpoint 3 reviews l11–l14 (arithmetic, "45"+15, comments, where code runs, reading code) plus earlier. 4*(45+15)=240; (2+3)*4=20; 90/60=1.5.',
};

export default lesson;
