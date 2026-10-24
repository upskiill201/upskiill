import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 20 — Chapter Challenge. Session Booker v0.0: show the day's session list and fix the type error hidden in it. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Session Booker v0.0',
  summary: 'Friday, 4pm. Priya wants Monday\'s session list on her desk. Grace builds the first real version of the Session Booker, and finds a mistake hiding in it before anyone else does.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a small, real program from a plan', 'Use labels so TypeScript catches mistakes', 'Find and fix errors calmly, one at a time'],
  learn: [
    {
      kind: 'story',
      title: 'Version 0.0',
      beats: [
        { speaker: 'narrator', text: 'Friday, 4pm. Priya stops by Grace\'s desk. "Could you send me Monday\'s session list before you go?"' },
        { speaker: 'grace', text: 'I could copy it out of the spreadsheet. Or...' },
        { speaker: 'narrator', text: 'She opens her Session Booker file. Twelve lines. Labels on every box. A comment at the top: Session Booker v0.0.' },
        { speaker: 'narrator', text: 'One red line. A session length typed as "45" in quotes. The spreadsheet would have let it through and booked a 4,515-minute session.' },
        { speaker: 'grace', text: 'Not today.' },
        { speaker: 'femi', text: 'You found that before running it? Grace. That\'s literally the job.' },
        { speaker: 'tey', text: 'This is the chapter\'s challenge: everything you\'ve learned, all at once. Build v0.0 with Grace.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Session Booker v0.0.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does TypeScript add to JavaScript?',
        options: [
          { text: 'A faster browser', why: 'TypeScript checks your code. It doesn\'t change the browser.' },
          { text: 'Nothing, they\'re the same', why: 'Every JavaScript program is TypeScript, but TypeScript adds type labels and checks.' },
          { text: 'Labels for what things are, checked before the code runs' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Start Version 0.0: a comment with the version, then show Kinwell research sessions',
        starter: '',
        solution: '// Session Booker v0.0\nconsole.log("Kinwell research sessions");\n',
        hint: 'A // comment on the first line, then a console.log line.',
        checks: [
          { message: 'Add a // comment', codeIncludes: '//' },
          { message: 'Show Kinwell research sessions', outputEquals: 'Kinwell research sessions' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Text (string) or number?',
        groups: ['string', 'number'],
        items: [
          { text: '"Room 2"', group: 0 },
          { text: '45', group: 1 },
          { text: '"10:00"', group: 0 },
          { text: '"45"', group: 0 },
          { text: '3', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line with the hidden type error.',
        language: 'typescript',
        lines: [
          'const day: string = "Monday";',
          'const sessionLength: number = "45";',
          'const resetMinutes: number = 15;',
          'console.log(day);',
        ],
        bug: 1,
        fix: 'const sessionLength: number = 45;',
        explanation: 'sessionLength is labelled number, but "45" in quotes is text.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'With sessionLength fixed to 45, what does this show?',
        code: 'const sessionLength: number = 45;\nconst resetMinutes: number = 15;\nconsole.log(3 * (sessionLength + resetMinutes));',
        language: 'typescript',
        options: [
          { text: '150', why: 'Brackets first: 45 + 15 is 60, then 3 * 60.' },
          { text: '180' },
          { text: '45153', why: 'Both are numbers now, so + adds instead of joining.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the hidden type error so the code shows 180 with no type errors',
        starter: 'const sessionLength: number = "45";\nconst resetMinutes: number = 15;\nconsole.log(3 * (sessionLength + resetMinutes));\n',
        solution: 'const sessionLength: number = 45;\nconst resetMinutes: number = 15;\nconsole.log(3 * (sessionLength + resetMinutes));\n',
        hint: 'Remove the quotes around 45.',
        checks: [
          { message: 'No type errors', noTypeErrors: true },
          { message: 'Show 180', outputEquals: '180' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Version 0.0 in order.',
        language: 'typescript',
        lines: ['// Session Booker v0.0', 'console.log("Kinwell research sessions");', 'console.log("Monday");', 'console.log("10:00  Room 2  P-014");'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'priya',
        message: 'So is the booker finished?',
        options: [
          { text: 'Yes, it does everything.', why: 'It\'s Version 0.0: it shows the list. The rest comes chapter by chapter.' },
          { text: 'It\'s Version 0.0: it shows Monday\'s list, and it already caught one mistake. Every week it learns something new.' },
          { text: 'No, it\'s useless so far.', why: 'It works and it already caught a bug. Small and real is a great start.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each error message to its fix.',
        pairs: [
          ['Type \'string\' is not assignable to type \'number\'', 'Give it a real number, no quotes'],
          ['\')\' expected', 'Add the closing bracket'],
          ['Cannot find name \'consol\'', 'Fix the spelling: console'],
          ['Unterminated string literal', 'Add the closing quote'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make a string called day holding Monday, and a number called sessions holding 3. Show Monday: 3 sessions',
        starter: '// Session Booker v0.0\n',
        solution: '// Session Booker v0.0\nconst day: string = "Monday";\nconst sessions: number = 3;\nconsole.log(day + ": " + sessions + " sessions");\n',
        hint: 'Join them with +: day + ": " + sessions + " sessions".',
        checks: [
          { message: 'day is Monday', expr: 'day === "Monday"' },
          { message: 'sessions is the number 3', expr: 'sessions === 3' },
          { message: 'Show Monday: 3 sessions', outputEquals: 'Monday: 3 sessions' },
          { message: 'No type errors', noTypeErrors: true },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the labels.',
        language: 'typescript',
        template: 'const room: [[1]] = "Room 2";\nconst minutes: [[2]] = 45;',
        blanks: [['string'], ['number']],
        distractors: ['text', 'digit'],
      },
      {
        kind: 'mcq',
        prompt: 'TypeScript shows three errors at once. What does Grace do?',
        options: [
          { text: 'Rewrite the whole file', why: 'Most of the file is fine. Fix what the messages point at, one at a time.' },
          { text: 'Fix the first one, run again, then look at what\'s left' },
          { text: 'Ask an AI to rewrite it all', why: 'Grace uses AI to explain errors, not to write her code for her.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which language actually runs in the browser once TypeScript has checked your code?',
        answers: ['JavaScript', 'JS'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Version 0.0, complete: show the title, then Monday, then two sessions exactly as listed',
        starter: '// Session Booker v0.0\n// 1. the title: Kinwell research sessions\n// 2. the day: Monday\n// 3. 10:00 Room 2 P-014\n// 4. 11:00 Room 1 P-022\n',
        solution: '// Session Booker v0.0\nconsole.log("Kinwell research sessions");\nconsole.log("Monday");\nconsole.log("10:00 Room 2 P-014");\nconsole.log("11:00 Room 1 P-022");\n',
        hint: 'One console.log line for each step in the plan, in the same order.',
        checks: [
          {
            message: 'Title, Monday, then both sessions',
            outputEquals: 'Kinwell research sessions\nMonday\n10:00 Room 2 P-014\n11:00 Room 1 P-022',
          },
          { message: 'No errors', noTypeErrors: true },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'You\'ve finished Chapter 1. What can you do now that you couldn\'t do before? What do you want the Session Booker to do next?',
    starters: ['Now I can...', 'Next I want it to...'],
  },
  deepen: {
    title: 'Project',
    summary: 'In the Code playground, build your own Version 0.0 of something: a list for your week, your team, or your shopping, with a version comment at the top.',
  },
  notes: 'Unit Challenge (playbook §8a): climax of Chapter 1, covers l01–l19. 3 * (45 + 15) = 180. Chapter 2 (Names and types, v0.1) starts with const vs let and type inference.',
};

export default lesson;
