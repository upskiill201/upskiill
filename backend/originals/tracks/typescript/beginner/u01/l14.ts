import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 14. Read code before you write it: predict the output line by line, then run to check. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Read code before you write it',
  summary: 'Femi\'s secret: good programmers read far more code than they write. Before you press Run, guess what will happen. Then check.',
  minutes: 12,
  outcomes: ['Predict what a short program shows', 'Read a program top to bottom, line by line', 'Spot what changes a program\'s output'],
  learn: [
    {
      kind: 'explore',
      title: 'Read it line by line',
      text: 'let booked: number = 2;\nconsole.log("Booked: " + booked);\nbooked = booked + 1;\nconsole.log("Booked: " + booked);\n// console.log("Room 4 free");',
      hotspots: [
        { phrase: 'let booked: number = 2;', note: 'A box called booked, labelled number, holding 2.' },
        { phrase: 'console.log("Booked: " + booked);', note: 'Shows Booked: 2. The box still holds 2 at this point.' },
        { phrase: 'booked = booked + 1;', note: 'Take what\'s in booked (2), add 1, and put the answer (3) back in the box.' },
        { phrase: '// console.log("Room 4 free");', note: 'A comment. It never runs, so it shows nothing.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Code runs top to bottom. A box holds whatever was last put in it, at that moment. So the same console.log line can show different things at different points.',
    },
    {
      kind: 'tryIt',
      title: 'Was your guess right?',
      caption: 'Guess the two lines this shows, then press Run.',
      code: 'let booked: number = 2;\nconsole.log("Booked: " + booked);\nbooked = booked + 1;\nconsole.log("Booked: " + booked);\n',
      challenge: 'Change + 1 to + 5 and guess again before you run it.',
    },
  ],
  apply: {
    scenario: 'Reading Femi\'s code before touching it.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: 'let rooms: number = 3;\nconsole.log(rooms);',
        language: 'typescript',
        options: [
          { text: 'rooms', why: 'rooms is a name, so console.log shows what\'s inside: 3.' },
          { text: 'number', why: 'number is the label, and labels are erased. It shows the value.' },
          { text: '3' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the LAST line show?',
        code: 'let sessions: number = 4;\nsessions = sessions - 1;\nconsole.log(sessions);',
        language: 'typescript',
        options: [
          { text: '3' },
          { text: '4', why: 'Line 2 takes 1 away and puts the answer back, so sessions is 3 by the end.' },
          { text: 'sessions - 1', why: 'That\'s worked out, not shown as text.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put this program in order so it shows Booked: 1, then Booked: 2.',
        lines: ['let booked: number = 1;', 'console.log("Booked: " + booked);', 'booked = booked + 1;', 'console.log("Booked: " + booked);'],
      },
      {
        kind: 'writeCode',
        prompt: 'Start booked at 0, add 1 to it, then show booked (it should show 1)',
        starter: 'let booked: number = 0;\n',
        solution: 'let booked: number = 0;\nbooked = booked + 1;\nconsole.log(booked);\n',
        hint: 'booked = booked + 1; then console.log(booked);',
        checks: [
          { message: 'booked ends at 1', expr: 'booked === 1' },
          { message: 'Show 1', outputEquals: '1' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines does this show?',
        code: 'console.log("Room 1");\n// console.log("Room 2");\nconsole.log("Room 3");',
        language: 'typescript',
        options: [
          { text: '3', why: 'The middle line is a comment, so it doesn\'t run.' },
          { text: '2' },
          { text: '1', why: 'Two of the lines aren\'t comments, so two lines show.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'This should show Free rooms: 2. Tap the line that makes it show the wrong number.',
        language: 'typescript',
        lines: ['let free: number = 3;', 'free = free + 1;', 'console.log("Free rooms: " + free);'],
        bug: 1,
        fix: 'free = free - 1;',
        explanation: 'It adds 1 (making 4) when a room was taken. It should take 1 away.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'femi',
        message: 'Before you run my code, tell me what you think it\'ll show.',
        options: [
          { text: 'I\'ll just run it and see.', why: 'Running is fine, but guessing first is how you find out whether you really understand it.' },
          { text: 'Line by line: it starts at 2, adds 1, so the second line shows Booked: 3.' },
          { text: 'No idea, code is a mystery.', why: 'Reading top to bottom, one line at a time, turns it from a mystery into steps.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'let x: number = 5; then x = x + 2; What is in x now?',
        answers: ['7'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does this line show something?',
        groups: ['Shows something', 'Shows nothing'],
        items: [
          { text: 'console.log(5);', group: 0 },
          { text: 'let count: number = 5;', group: 1 },
          { text: '// console.log(5);', group: 1 },
          { text: 'console.log("Hi");', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Show Waiting: 3, take one patient in, then show Waiting: 2',
        starter: 'let waiting: number = 3;\n',
        solution: 'let waiting: number = 3;\nconsole.log("Waiting: " + waiting);\nwaiting = waiting - 1;\nconsole.log("Waiting: " + waiting);\n',
        hint: 'Show it, then waiting = waiting - 1, then show it again.',
        checks: [{ message: 'Waiting: 3, then Waiting: 2', outputEquals: 'Waiting: 3\nWaiting: 2' }],
      },
    ],
  },
  reflect: {
    prompt: 'When did reading something carefully, before acting on it, save you from a mistake?',
    starters: ['I once read...', 'Reading first helped because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a four-line program, then show it to someone and ask them to guess the output before you run it.',
  },
  notes: 'Reassignment booked = booked + 1 introduced informally here; Chapter 2 teaches let/const properly. TS infers nothing new here: all boxes are explicitly labelled.',
};

export default lesson;
