import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4 — free. console.log() up close: the parts, text vs numbers, several lines, and the semicolon. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Your first line: console.log()',
  summary: 'console.log() is the first thing every TypeScript and JavaScript programmer learns. Four small parts, and the mistakes everyone makes with them.',
  minutes: 12,
  outcomes: ['Name the parts of a console.log() line', 'Show text and numbers on separate lines', 'Fix the most common console.log() mistakes'],
  learn: [
    {
      kind: 'compare',
      title: 'One missing quote',
      before: { label: 'Error', text: 'console.log("Room 2 is free);\n\nUnterminated string literal.' },
      after: { label: 'Works', text: 'console.log("Room 2 is free");\n\nRoom 2 is free' },
      notes: [
        'Text needs a quote at both ends, so TypeScript knows where it stops.',
        'The error message says "unterminated string": a string is programmer-speak for text.',
        'Without the closing quote, TypeScript thinks the bracket and semicolon are part of the text too.',
      ],
    },
    {
      kind: 'text',
      html:
        '<p><strong>The parts of a console.log() line</strong></p><ul>' +
        '<li><code>console.log</code> is the instruction: "show this". All lowercase, with a dot in the middle.</li>' +
        '<li><code>( )</code> brackets hold what you want to show.</li>' +
        '<li><code>" "</code> quotes go around <strong>text</strong>. Numbers don\'t need them: <code>console.log(45)</code>.</li>' +
        '<li><code>;</code> the semicolon ends the instruction, like a full stop. TypeScript usually copes without it, but teams like Kinwell\'s always write it, so we will too.</li></ul>' +
        '<p>Each <code>console.log</code> shows its own line, top to bottom.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Grace\'s first session list',
      caption: 'Text, a number, and more text, each on its own line. Press Run.',
      code: 'console.log("Kinwell research sessions");\nconsole.log(3);\nconsole.log("Room 2 is free");\n',
      challenge: 'Add a fourth line that shows Session length: 45 minutes, and run it.',
    },
  ],
  apply: {
    scenario: 'Grace\'s first session list.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of console.log("Hi"); to its job.',
        pairs: [
          ['console.log', 'The instruction: show this'],
          ['( )', 'Holds what to show'],
          ['" "', 'Marks where text starts and ends'],
          [';', 'Ends the instruction'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will cause an error.',
        language: 'typescript',
        lines: ['console.log("Sessions today");', 'console.log("Room 2 is free);', 'console.log(3);'],
        bug: 1,
        fix: 'console.log("Room 2 is free");',
        explanation: 'The text is missing its closing quote, so TypeScript can\'t tell where it ends.',
      },
      {
        kind: 'writeCode',
        prompt: 'Show Kinwell research sessions',
        starter: '',
        solution: 'console.log("Kinwell research sessions");\n',
        hint: 'console.log, brackets, and your text inside quotes, then a semicolon.',
        checks: [{ message: 'Show Kinwell research sessions', outputIncludes: 'Kinwell research sessions' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines does this show?',
        code: 'console.log("Monday");\nconsole.log(3);\nconsole.log("sessions");',
        language: 'typescript',
        options: [
          { text: '1: Monday 3 sessions', why: 'Each console.log starts its own line.' },
          { text: '2', why: 'Count the console.log instructions: each one shows a line.' },
          { text: '3' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Add the brackets and the semicolon.',
        language: 'typescript',
        template: 'console.log[[1]]"Room 3"[[2]][[3]]',
        blanks: [['('], [')'], [';']],
        distractors: ['[', ']', ':'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Works, or error?',
        groups: ['Works', 'Error'],
        items: [
          { text: 'console.log("Hello");', group: 0 },
          { text: 'console.log(45);', group: 0 },
          { text: 'console.log("Hello);', group: 1 },
          { text: 'console.log("Hello";', group: 1 },
          { text: 'console.log("Room", 2);', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Programmers have a name for a piece of text in code. What is it? (it starts with s)',
        answers: ['string', 'a string', 'strings'],
        placeholder: 'One word',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that shows the number 45',
        language: 'typescript',
        tiles: ['console.log', '(', '45', ')', ';'],
        distractors: ['"', 'Console.log'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does text need quotes, but console.log(45) doesn\'t?',
        options: [
          { text: 'Numbers are banned from quotes', why: 'You can put digits in quotes. They just become text, not a number.' },
          { text: 'Quotes show where text starts and ends; a number is just a number' },
          { text: 'Quotes make the text bold', why: 'Quotes are never shown. They only mark the edges of the text.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show this session list exactly',
        starter: '// Line 1: Sessions today\n// Line 2: the number 3\n// Line 3: Room 2 is free\n',
        solution: 'console.log("Sessions today");\nconsole.log(3);\nconsole.log("Room 2 is free");\n',
        hint: 'Three console.log lines. The middle one is a number, so no quotes.',
        checks: [{ message: 'Sessions today, then 3, then Room 2 is free', outputEquals: 'Sessions today\n3\nRoom 2 is free' }],
      },
    ],
  },
  reflect: {
    prompt: 'Which part of console.log("..."); do you think you\'ll forget most often? How will you remember it?',
    starters: ['The part I\'ll forget is...', 'I\'ll remember it by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the Code playground (TypeScript), show a three-line note about your day: a title, a number, and a sentence.',
  },
  notes: 'Unterminated string → TS1002 "Unterminated string literal." (a syntax error; the runner shows it as SyntaxError). Semicolons: optional via automatic semicolon insertion; the course always writes them. The playground starter comments use // (taught properly in lesson 12).',
};

export default lesson;
