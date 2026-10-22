import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 16. Think like a programmer: break a problem into tiny steps, plan in plain words (comments), then code each step. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Think like a programmer',
  summary: '"Make a booking tool" is too big to start. "Show today\'s date" isn\'t. Programmers turn big jobs into tiny steps, the way nurses turn a shift into tasks.',
  minutes: 12,
  outcomes: ['Break a task into small, exact steps', 'Write a plan in plain words before coding', 'Turn each step of a plan into a line of code'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Grace stares at a blank file. "Where do I even start building a booking tool?" Sound familiar?',
          replies: ['Very', 'Not yet, but it will'],
        },
        {
          tey: 'Here\'s the trick. You already do this at work. A nurse doesn\'t think "look after twelve patients". She thinks: obs at 8, meds at 9, notes before handover.',
          replies: ['So: tiny steps?'],
        },
        {
          tey: 'Tiny, exact steps. So small that each one is obviously doable. Programmers often write them first as plain-English comments. It\'s called pseudocode: "fake code".',
          replies: ['Show me one'],
        },
        {
          tey: 'Goal: show the morning\'s plan. Step 1: show a title. Step 2: work out the minutes for three sessions. Step 3: show the minutes. Each step becomes a line of code. Try it below.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Plan first, then code',
      caption: 'The comments are the plan. Each line of code does one step. Press Run.',
      code: '// Step 1: show a title\nconsole.log("Tuesday morning");\n// Step 2: work out the minutes for 3 sessions\nconst minutes: number = 3 * (45 + 15);\n// Step 3: show the minutes\nconsole.log("Minutes booked:", minutes);\n',
      challenge: 'Add a Step 4: show the hours (minutes divided by 60).',
    },
  ],
  apply: {
    scenario: 'Grace\'s first plan.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is pseudocode?',
        options: [
          { text: 'A plan written in plain words before the real code' },
          { text: 'Code with mistakes in it', why: 'Pseudocode isn\'t broken code. It\'s a plain-English plan.' },
          { text: 'A secret code', why: '"Pseudo" means fake: it\'s plain words standing in for code, for planning.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Small, exact step, or too big?',
        groups: ['Small, exact step', 'Too big for one step'],
        items: [
          { text: 'Show the title', group: 0 },
          { text: 'Build the booking tool', group: 1 },
          { text: 'Work out 3 times 60', group: 0 },
          { text: 'Fix everything', group: 1 },
          { text: 'Show the total minutes', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the plan for "show how long the morning is" in order.',
        lines: ['Show a title', 'Work out the minutes', 'Show the minutes', 'Show the hours'],
      },
      {
        kind: 'writeCode',
        prompt: 'Follow the plan in the comments, one line of code per step',
        starter: '// Step 1: show Wednesday\n\n// Step 2: show Room 3 is free\n\n',
        solution: '// Step 1: show Wednesday\nconsole.log("Wednesday");\n// Step 2: show Room 3 is free\nconsole.log("Room 3 is free");\n',
        hint: 'Put a console.log line under each comment.',
        checks: [
          { message: 'Keep the plan comments', codeIncludes: '// Step 2' },
          { message: 'Wednesday, then Room 3 is free', outputEquals: 'Wednesday\nRoom 3 is free' },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'grace',
        message: 'It feels slow to write a plan before the code. Should I skip it?',
        options: [
          { text: 'Always skip planning, real programmers just type.', why: 'Experienced programmers plan all the time, often on paper or in comments.' },
          { text: 'For tiny programs, maybe. But a plan stops you getting lost on bigger ones, and it\'s quicker than fixing a muddle.' },
          { text: 'Plan for an hour before every line.', why: 'A plan should be quick: a few short steps, then start.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each plan step to its code.',
        pairs: [
          ['Show a title', 'console.log("Plan");'],
          ['Store 3 sessions', 'const sessions: number = 3;'],
          ['Work out the minutes', 'const minutes: number = sessions * 60;'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A nurse\'s shift and a program have something in common. What is it?',
        options: [
          { text: 'Both are impossible to plan', why: 'Both are planned the same way: big job, broken into small steps.' },
          { text: 'Both are a big job broken into small steps, done in order' },
          { text: 'Neither needs checking', why: 'Both need checking. That\'s what types are for in code.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Turn the plan step into code.',
        language: 'typescript',
        template: '// Step: show the number of rooms (4)\n[[1]](4);',
        blanks: [['console.log']],
        distractors: ['print', 'show'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do programmers call a plan written in plain words? (starts with p)',
        answers: ['pseudocode', 'pseudo code', 'pseudo-code'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Write the code for this plan: store 2 sessions in a number called sessions, work out their minutes (sessions times 60) in a number called minutes, and show minutes',
        starter: '// Step 1: store 2 sessions\n// Step 2: work out the minutes\n// Step 3: show the minutes\n',
        solution: '// Step 1: store 2 sessions\nconst sessions: number = 2;\n// Step 2: work out the minutes\nconst minutes: number = sessions * 60;\n// Step 3: show the minutes\nconsole.log(minutes);\n',
        hint: 'const sessions: number = 2; then const minutes: number = sessions * 60; then console.log(minutes);',
        checks: [
          { message: 'sessions is 2', expr: 'sessions === 2' },
          { message: 'minutes is 120', expr: 'minutes === 120' },
          { message: 'Show 120', outputEquals: '120' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Pick a big task you\'re putting off. Write it as three tiny, exact steps. Which one could you do today?',
    starters: ['The big task is...', 'Step 1 is...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Before your next lesson, write a plan for a tiny program about your day, just as comments. Then fill in the code.',
  },
  notes: 'Pseudocode as comments is a common teaching technique. const is used here informally; Chapter 2 explains const vs let.',
};

export default lesson;
