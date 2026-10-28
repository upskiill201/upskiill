import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Walkthrough: if, blocks, running code only when something is true. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'if',
  summary: 'The website prints "Locals Tuesday: $20!" every day of the week. Wes notices on a Thursday. Code that should only sometimes run needs an if.',
  minutes: 10,
  outcomes: [
    'Write an if statement with a condition and a block',
    'Run lines only when a condition is true',
    'Use a boolean variable as the condition',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building an if',
      steps: [
        {
          title: 'The word if, then a question in brackets',
          body: 'if ( ... ) holds a condition: anything that comes out true or false.',
          code: 'if (day === "Tuesday")',
          language: 'javascript',
        },
        {
          title: 'Curly braces hold what to do',
          body: 'The lines between { and } are a block. They run only when the condition is true. Indent them two spaces so it\'s easy to see they belong to the if.',
          code: 'if (day === "Tuesday") {\n  console.log("Locals Tuesday: $20!");\n}',
          language: 'javascript',
        },
        {
          title: 'False means skip',
          body: 'If the condition is false, JavaScript jumps over the whole block and carries on after the }.',
          code: 'const day = "Thursday";\nif (day === "Tuesday") {\n  console.log("Locals Tuesday: $20!"); // skipped\n}\nconsole.log("Lifts open at 9"); // always runs',
          language: 'javascript',
        },
        {
          title: 'Booleans fit straight in',
          body: 'A variable that already holds true or false can be the condition by itself.',
          code: 'const isPowderDay = true;\nif (isPowderDay) {\n  console.log("Fresh snow! Get here early.");\n}',
          language: 'javascript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Only on Tuesday',
      code: 'const day = "Thursday";\n\nif (day === "Tuesday") {\n  console.log("Locals Tuesday: $20 for everyone!");\n}\n\nconsole.log("Lifts open at 9 a.m.");\n',
      caption: 'Run it: only the second message prints. Thursday isn\'t Tuesday.',
      challenge: 'Change day to "Tuesday" and run it again.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'No semicolon after if ( ... ). if (day === "Tuesday"); { ... } ends the if right there, and the block then runs every time.',
    },
  ],
  apply: {
    scenario: 'Wes caught the Thursday bug. Nora fixes it with if.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const age = 3;\nif (age < 6) {\n  console.log("Free");\n}\nconsole.log("Enjoy!");',
        language: 'javascript',
        options: [
          { text: 'Enjoy!', why: '3 < 6 is true, so the block runs too.' },
          { text: 'Free\nEnjoy!' },
          { text: 'Free', why: 'The last line is outside the if, so it always runs.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const age = 9;\nif (age < 6) {\n  console.log("Free");\n}\nconsole.log("Enjoy!");',
        language: 'javascript',
        options: [
          { text: 'Enjoy!' },
          { text: 'Free\nEnjoy!', why: '9 < 6 is false, so the block is skipped.' },
          { text: 'Nothing', why: 'Only the block is skipped. The last line still runs.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the opening line of an if that checks for Tuesday.',
        tiles: ['if', '(', 'day', '===', '"Tuesday"', ')', '{'],
        distractors: ['=', ';'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const day = "Tuesday". Write an if that prints Locals Tuesday: $20 only when day is "Tuesday".',
        starter: 'const day = "Tuesday";\n',
        solution: 'const day = "Tuesday";\nif (day === "Tuesday") {\n  console.log("Locals Tuesday: $20");\n}\n',
        hint: 'if (day === "Tuesday") {\n  console.log("Locals Tuesday: $20");\n}',
        checks: [
          { message: 'Print Locals Tuesday: $20', outputEquals: 'Locals Tuesday: $20' },
          { message: 'Use an if', codeIncludes: 'if (' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The Locals Tuesday message prints on Thursday too. Which line is wrong?',
        lines: ['const day = "Thursday";', 'if (day === "Tuesday"); {', '  console.log("Locals Tuesday: $20");', '}'],
        bug: 1,
        fix: 'if (day === "Tuesday") {',
        explanation: 'The ; ends the if straight away, so the block below isn\'t part of it and always runs.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the if.',
        template: 'if ([[1]]) [[2]]\n  console.log("Fresh snow!");\n[[3]]',
        blanks: [['isPowderDay'], ['{'], ['}']],
        distractors: ['(', ')', ';'],
        language: 'javascript',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the senior check in order.',
        lines: ['const age = 72;', 'if (age >= 70) {', '  console.log("Senior price: $29");', '}'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const isPowderDay = true. If it\'s true, print Fresh snow! Then, outside the if, always print Lifts open at 9.',
        starter: 'const isPowderDay = true;\n',
        solution: 'const isPowderDay = true;\nif (isPowderDay) {\n  console.log("Fresh snow!");\n}\nconsole.log("Lifts open at 9");\n',
        hint: 'Put the second console.log after the closing }.',
        checks: [
          { message: 'Print both lines in order', outputEquals: 'Fresh snow!\nLifts open at 9' },
          { message: 'Use isPowderDay as the condition', codeIncludes: 'if (isPowderDay)' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The lines between { and } after an if are called a...',
        answers: ['block', 'a block', 'code block'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Wes reports another bug. Pick Nora\'s reply.',
        from: 'wes',
        message: 'it said locals tuesday on THURSDAY. i paid $59 like a sucker',
        options: [
          { text: 'Fixed: the message is inside an if now, so it only shows when the day is Tuesday' },
          { text: 'Just come on Tuesdays', why: 'True, but the website still lies four days a week.' },
          { text: 'Computers make mistakes sometimes', why: 'The computer did exactly what the code said. The code needed an if.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which messages in your life should only appear sometimes: a reminder, a warning, a greeting? What\'s the condition for each?',
    starters: ['Only show ... if...', 'My phone should only...'],
  },
  deepen: {
    title: 'if without braces',
    summary: 'You\'ll see if (x) console.log("hi"); with no braces. It works for exactly one line. Add a second line and it won\'t be inside the if, which causes real bugs. Most teams always use braces, and so does this course.',
  },
  notes: 'if...else statement: MDN "if...else". Empty statement after if(...); : MDN "Empty statement". Outline: Ch2 L2.',
};

export default lesson;
