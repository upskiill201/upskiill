import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 18. Grace's plan: turn the spreadsheet's problems into a feature list (the course map). */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Grace\'s plan for the Session Booker',
  summary: 'Every problem the spreadsheet ever caused, turned into a feature. This is the plan for the whole course, and the start of a real program.',
  minutes: 12,
  outcomes: ['Turn a list of problems into features', 'Order features from simplest to hardest', 'Write a program\'s first lines from a plan'],
  learn: [
    {
      kind: 'steps',
      title: 'From problems to a plan',
      steps: [
        {
          title: '1. List the problems',
          body: 'Grace writes down everything the spreadsheet got wrong: double bookings, a phone number in the time column, "Tuesday 31 June", messy names like "  sARAH khan ", sessions that don\'t fit in a day, and reminders that never went out.',
        },
        {
          title: '2. Turn each one into a feature',
          body: 'A problem becomes something the program will do. "Double bookings" becomes "refuse a room that\'s already booked". "Phone number in the time column" becomes "every booking has a shape, and a time must be a time".',
        },
        {
          title: '3. Put them in order, simplest first',
          body: 'Show a session list first. Then store details, then do the maths, then tidy names, then decisions, then lists. Each chapter of this course adds one of these.',
        },
        {
          title: '4. Start with the smallest real thing',
          body: 'Version 0.0 just shows today\'s sessions. Small, but real, and it runs. You\'ll build it in the Chapter Challenge.',
          code: '// Session Booker v0.0\nconsole.log("Kinwell research sessions");\nconsole.log("10:00  Room 2  P-014");',
          language: 'typescript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The first lines of the booker',
      caption: 'This is where Version 0.0 starts. Press Run.',
      code: '// Session Booker v0.0\nconsole.log("Kinwell research sessions");\nconsole.log("10:00  Room 2  P-014");\nconsole.log("11:00  Room 1  P-022");\n',
      challenge: 'Add a third session: 12:00 in Room 3 for P-031.',
    },
  ],
  apply: {
    scenario: 'Planning the Session Booker.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each spreadsheet problem to the feature that fixes it.',
        pairs: [
          ['Double bookings', 'Refuse a room that\'s already booked'],
          ['Phone number in the time column', 'Every booking has a typed shape'],
          ['Messy names like "  sARAH khan "', 'Tidy text automatically'],
          ['Too many sessions for one day', 'Work out how many slots fit'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Grace\'s planning steps in order.',
        lines: ['List the problems', 'Turn each one into a feature', 'Order them, simplest first', 'Build the smallest real version'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Grace start with a version that only shows a list?',
        options: [
          { text: 'Because that\'s all TypeScript can do', why: 'TypeScript can do much more. Starting small means you have something working early.' },
          { text: 'Small and real beats big and unfinished: it runs today, and each chapter adds to it' },
          { text: 'To make Priya think she\'s done', why: 'It\'s a real first version, and Grace says so. Each chapter adds a feature.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Start the booker: show Kinwell research sessions, then 10:00 Room 2',
        starter: '// Session Booker v0.0\n',
        solution: '// Session Booker v0.0\nconsole.log("Kinwell research sessions");\nconsole.log("10:00 Room 2");\n',
        hint: 'Two console.log lines under the comment.',
        checks: [{ message: 'The title, then 10:00 Room 2', outputEquals: 'Kinwell research sessions\n10:00 Room 2' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'A clear feature, or too vague?',
        groups: ['Clear feature', 'Too vague'],
        items: [
          { text: 'Show today\'s sessions in time order', group: 0 },
          { text: 'Make it good', group: 1 },
          { text: 'Refuse a second booking for the same room and time', group: 0 },
          { text: 'Fix the spreadsheet stuff', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'priya',
        message: 'This is great. Can it send reminders by Friday?',
        options: [
          { text: 'Sure, no problem!', why: 'Reminders come much later in the plan. Promising Friday sets Grace up to fail.' },
          { text: 'Reminders are on the plan, but later. This week it shows the session list. I\'ll show you each new feature as it\'s ready.' },
          { text: 'I can\'t do any of this.', why: 'She can, step by step. The plan shows exactly what comes when.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many sessions does this list show?',
        code: 'console.log("Sessions");\nconsole.log("10:00 Room 2");\n// console.log("11:00 Room 1");\nconsole.log("12:00 Room 3");',
        language: 'typescript',
        options: [
          { text: '3', why: 'The 11:00 line is a comment, so it doesn\'t show.' },
          { text: '1', why: 'Two session lines aren\'t comments.' },
          { text: '2' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Add the version comment at the top of the booker.',
        language: 'typescript',
        template: '[[1]] Session Booker v0.0\nconsole.log("Kinwell research sessions");',
        blanks: [['//']],
        distractors: ['#', '/'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version number does the Session Booker start at?',
        answers: ['v0.0', '0.0', 'v0', '0'],
        placeholder: 'e.g. v1.0',
      },
      {
        kind: 'writeCode',
        prompt: 'Store the number of sessions planned (2) in a number called planned, then show Planned: 2',
        starter: '// Session Booker v0.0\n',
        solution: '// Session Booker v0.0\nconst planned: number = 2;\nconsole.log("Planned: " + planned);\n',
        hint: 'const planned: number = 2; then console.log("Planned: " + planned);',
        checks: [
          { message: 'planned is 2', expr: 'planned === 2' },
          { message: 'Show Planned: 2', outputEquals: 'Planned: 2' },
          { message: 'Label it as a number', codeIncludes: ': number' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something annoying in your daily life that a small program could fix. Write its first three features, simplest first.',
    starters: ['The annoying thing is...', 'Feature 1:...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Look at the map for this course: each chapter\'s banner shows the booker\'s version, from v0.0 to v1.0.',
  },
  notes: 'Problem → chapter mapping (outline): numbers/slots = Ch3, tidy text = Ch4, double bookings/decisions = Ch5, lists = Ch6, typed booking shape = Ch9, reminders/fetch = Ch13. Patient codes like P-014 are fictional research IDs (no real patient data).',
};

export default lesson;
