import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Types are checked, then erased: what actually runs is plain JavaScript. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Types are erased',
  summary: 'Browsers only understand JavaScript. So what happens to all those labels? TypeScript checks them, then quietly removes them before the code runs.',
  minutes: 12,
  outcomes: ['Explain what happens to types when code runs', 'Turn a line of TypeScript into the JavaScript it becomes', 'Say why types cost nothing when the program runs'],
  learn: [
    {
      kind: 'compare',
      title: 'What you write, and what runs',
      before: { label: 'TypeScript (you write)', text: 'let sessions: number = 3;\nlet room: string = "Room 2";\nconsole.log(room, sessions);' },
      after: { label: 'JavaScript (what runs)', text: 'let sessions = 3;\nlet room = "Room 2";\nconsole.log(room, sessions);' },
      notes: [
        'The labels (: number, : string) are gone. Everything else is exactly the same.',
        'TypeScript checks the labels first, then removes them. This is called erasing the types.',
        'So types never slow your program down: by the time it runs, they don\'t exist.',
      ],
    },
    {
      kind: 'text',
      html:
        '<p>Femi draws two boxes on a sticky note. "Think of it like a medication check," he says. "Two nurses check the dose against the chart <em>before</em> it goes in. The patient never sees the chart. They just get the right dose."</p>' +
        '<p>TypeScript is the check. The JavaScript is what the patient gets. Every browser, every phone, every server runs the JavaScript, and the labels have already done their job.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Labels in, same result out',
      caption: 'This has labels on every line. Run it: the output is exactly what plain JavaScript would show.',
      code: 'let room: string = "Room 2";\nlet sessions: number = 3;\nconsole.log(room, "has", sessions, "sessions");\n',
      challenge: 'Delete the labels (: string and : number) and run it again. Same output, because the labels never reach the output.',
    },
  ],
  apply: {
    scenario: 'Femi\'s sticky note.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What happens to : number when the code runs?',
        options: [
          { text: 'It\'s shown in the output', why: 'Labels are never shown. They\'re removed before the code runs.' },
          { text: 'It makes the code slower', why: 'Labels are gone by the time the code runs, so they cost nothing.' },
          { text: 'It\'s checked first, then removed: the running code has no labels' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each TypeScript line to the JavaScript it becomes.',
        pairs: [
          ['let rooms: number = 4;', 'let rooms = 4;'],
          ['let name: string = "Grace";', 'let name = "Grace";'],
          ['console.log(rooms);', 'console.log(rooms);'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put what happens to your code in order.',
        lines: ['You write TypeScript, with labels', 'TypeScript checks every label', 'The labels are removed', 'The JavaScript runs'],
      },
      {
        kind: 'writeCode',
        prompt: 'Label room as a string and sessions as a number, then show them: Room 2 3',
        starter: 'let room = "Room 2";\nlet sessions = 3;\nconsole.log(room, sessions);\n',
        solution: 'let room: string = "Room 2";\nlet sessions: number = 3;\nconsole.log(room, sessions);\n',
        hint: 'Add : string after room and : number after sessions.',
        checks: [
          { message: 'Label room as a string', codeIncludes: 'room: string' },
          { message: 'Label sessions as a number', codeIncludes: 'sessions: number' },
          { message: 'Show Room 2 3', outputEquals: 'Room 2 3' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'console.log can show several things at once, separated by commas. What does this show?',
        code: 'let room: string = "Room 1";\nconsole.log("Booked:", room);',
        language: 'typescript',
        options: [
          { text: 'Booked: room', why: 'room without quotes is the NAME of a box, so console.log shows what\'s inside it.' },
          { text: 'Booked: Room 1: string', why: 'The label is erased. It never appears in the output.' },
          { text: 'Booked: Room 1' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Still there when the code runs, or erased?',
        groups: ['Still there', 'Erased'],
        items: [
          { text: ': number', group: 1 },
          { text: 'console.log("Hi")', group: 0 },
          { text: ': string', group: 1 },
          { text: 'the value 45', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'jayden',
        message: 'Mum. If the types get deleted anyway, what\'s the point of writing them?',
        options: [
          { text: 'There isn\'t one, I\'ll stop writing them.', why: 'The point is the check before running. Skip it and the mistakes reach the people using your app.' },
          { text: 'They catch the mistakes BEFORE the code runs. By the time they\'re deleted, they\'ve done their job.' },
          { text: 'They make the code look professional.', why: 'Looking tidy is a bonus. The real point is catching mistakes early.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Browsers don\'t run TypeScript directly. Which language do they actually run?',
        answers: ['JavaScript', 'JS'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'This is the JavaScript that runs. Fill in what\'s left once the label is erased.',
        language: 'typescript',
        template: '// TypeScript: let minutes: number = 45;\nlet minutes [[1]] 45;',
        blanks: [['=']],
        distractors: [': number =', ':'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make a box called name labelled string, holding Grace, and show Hello, then the name',
        starter: '',
        solution: 'let name: string = "Grace";\nconsole.log("Hello,", name);\n',
        hint: 'let name: string = "Grace"; then console.log("Hello,", name);',
        checks: [
          { message: 'Label name as a string', codeIncludes: ': string' },
          { message: 'Show Hello, Grace', outputIncludes: 'Hello, Grace' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a check in your life that nobody sees but that prevents mistakes (a second signature, a checklist, a read-back). What would go wrong without it?',
    starters: ['A check nobody sees is...', 'Without it...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'On typescriptlang.org/play you can see the JavaScript any TypeScript turns into, side by side.',
  },
  notes: 'Type erasure: TypeScript\'s design goal "impose no runtime overhead" (TypeScript Design Goals, GitHub wiki). console.log with several arguments joins them with spaces. The name `name` is fine in our runner (no DOM lib, so no clash with window.name).',
};

export default lesson;
