import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 12. Comments: // and /* *\/, comments are ignored, explain why not what, commenting out a line. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Comments: notes for humans',
  summary: 'Priya opens Femi\'s code to check a number and understands none of it. A comment would have taken him ten seconds. Here is how to leave notes in code.',
  minutes: 12,
  outcomes: ['Write one-line and multi-line comments', 'Explain why a comment helps', 'Switch a line off by turning it into a comment'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Priya is looking at a line in Femi\'s code: const x = 2700. "What\'s 2700?" Nobody knows. Not even Femi, three months later.',
          replies: ['Ouch', 'What should it say?'],
        },
        {
          tey: 'A comment! Two slashes, //, and everything after them on that line is a note for humans. TypeScript ignores it completely.',
          replies: ['Show me'],
        },
        {
          tey: 'const x = 2700; // seconds in a 45-minute session. Ten seconds to write. Saves an hour of head-scratching.',
          replies: ['Can a note be longer?', 'Do comments slow the code down?'],
        },
        {
          tey: 'Longer notes go between /* and */, across as many lines as you like. And no, they don\'t slow anything: like types, they never reach the running code.',
          replies: ['What makes a good comment?'],
        },
        {
          tey: 'Write WHY, not what. "add 15" says what the code already shows. "15 minutes to reset the room between patients" says why. That\'s the one future-you needs.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Comments are ignored',
      caption: 'Only one line here actually runs. Press Run and see which.',
      code: '// The Session Booker: version 0.0\n/* Grace started this on a Thursday,\n   with a lot of help from Femi. */\nconsole.log("Sessions today: 3"); // 3 rooms booked\n',
      challenge: 'Put // at the start of the console.log line and run again. Nothing shows: the line is now a comment.',
    },
  ],
  apply: {
    scenario: 'Making Femi\'s code readable.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does TypeScript do with a comment?',
        options: [
          { text: 'Shows it in the output', why: 'Comments are never shown. They\'re notes for people reading the code.' },
          { text: 'Ignores it completely' },
          { text: 'Checks its spelling', why: 'TypeScript doesn\'t look inside comments at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: '// console.log("Room 1");\nconsole.log("Room 2");',
        language: 'typescript',
        options: [
          { text: 'Room 2' },
          { text: 'Room 1 then Room 2', why: 'The first line starts with //, so it\'s a comment and doesn\'t run.' },
          { text: 'Nothing', why: 'The second line isn\'t a comment, so it runs.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a comment above the line saying why it\'s 15, then run it (it should still show 15)',
        starter: 'console.log(15);\n',
        solution: '// minutes to reset the room between patients\nconsole.log(15);\n',
        hint: 'Start a new first line with // and your note.',
        checks: [
          { message: 'Add a // comment', codeIncludes: '//' },
          { message: 'Still show 15', outputEquals: '15' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful comment (why) or not much help (what)?',
        groups: ['Helpful: says why', 'Not much help: says what'],
        items: [
          { text: '// 15 minutes to reset the room between patients', group: 0 },
          { text: '// add 15', group: 1 },
          { text: '// Priya asked for no sessions after 4pm', group: 0 },
          { text: '// show the number', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Turn the first line into a comment.',
        language: 'typescript',
        template: '[[1]] seconds in a 45-minute session\nconst sessionSeconds = 2700;',
        blanks: [['//']],
        distractors: ['#', '<!--', '/'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each comment style to when you\'d use it.',
        pairs: [
          ['// one line', 'A short note on one line'],
          ['/* ... */', 'A longer note across several lines'],
          ['// in front of code', 'Switch a line off for now'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'femi',
        message: 'Honestly, comments are for beginners. Good code explains itself.',
        options: [
          { text: 'Good code shows WHAT it does. It still can\'t show WHY: like why it\'s 15 minutes and not 10.' },
          { text: 'You\'re right, I\'ll never write comments.', why: 'Priya couldn\'t read Femi\'s code without one. A short "why" saves everyone time.' },
          { text: 'Then I\'ll comment every single line.', why: 'Too many comments are noise. Comment the reasons, not the obvious.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Switch off the second line with a comment, so only Room 1 is free shows',
        starter: 'console.log("Room 1 is free");\nconsole.log("Room 2 is free");\n',
        solution: 'console.log("Room 1 is free");\n// console.log("Room 2 is free");\n',
        hint: 'Put // at the very start of the second line.',
        checks: [
          { message: 'Only show Room 1 is free', outputEquals: 'Room 1 is free' },
          { message: 'Keep the line, as a comment', codeIncludes: '// console.log' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A comment is a note for people. What does TypeScript do with it? (one word)',
        answers: ['ignores', 'ignore', 'ignores it', 'nothing', 'skips', 'skips it'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'This should show 45. Tap the line that stops it showing.',
        language: 'typescript',
        lines: ['// session length in minutes', '// console.log(45);'],
        bug: 1,
        fix: 'console.log(45);',
        explanation: 'The console.log line is a comment, so it never runs. Remove the //.',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a note someone left you (at work, at home) that saved you time. What made it useful?',
    starters: ['A useful note I got was...', 'It worked because it told me...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Open any code you\'ve written in this course and add one "why" comment to it.',
  },
  notes: 'TypeScript comments: // line, /* */ block; both stripped from output JS by default (removeComments is off by default, but comments never affect behaviour). 45 minutes = 2700 seconds.',
};

export default lesson;
