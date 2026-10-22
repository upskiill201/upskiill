import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1 — free. The hook: the spreadsheet that broke, and Grace's first line of code. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The spreadsheet that broke',
  summary: 'A patient booked twice, a phone number in the time column, and a developer who says, "That can\'t happen in our code." Grace runs her first program.',
  minutes: 11,
  outcomes: ['Say what a program is', 'Run your first line of TypeScript', 'Change it and run it again'],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 9:40',
      beats: [
        { speaker: 'narrator', text: 'Kinwell, Manchester. Grace opens the research team\'s booking spreadsheet. Two patients are booked into Room 2 at 10:00. Row 14 has a phone number typed into the Time column.' },
        { speaker: 'grace', text: 'Right. Nobody panic. Eighteen years on a ward, I have fixed worse than this before breakfast.' },
        { speaker: 'narrator', text: 'She sorts it in four minutes, with a phone call and a very calm voice. Then she walks over to Femi\'s desk.' },
        { speaker: 'grace', text: 'Femi. Our app books thousands of hospital appointments. Why does it never put a phone number where a time should go?' },
        { speaker: 'femi', text: 'Because TypeScript won\'t let it. The code knows a time is a time. If you try to put a phone number there, it refuses before anything even runs.' },
        { speaker: 'grace', text: 'The code checks itself? Like a second nurse checking a dose?' },
        { speaker: 'femi', text: 'Exactly like that. Want me to show you?' },
      ],
      choice: {
        prompt: 'What should Grace do?',
        options: [
          {
            text: '"Show me. Start from the very beginning."',
            outcome: 'Femi grins and opens a blank file. Good call: everyone starts at the beginning, including Femi once.',
            best: true,
          },
          {
            text: '"I\'ll just add more colours to the spreadsheet."',
            outcome: 'Colours don\'t stop someone typing a phone number into the Time column. Something that checks the data does.',
          },
          {
            text: '"Coding is for 25-year-olds. I\'m 44."',
            outcome: 'Plenty of people learn to code later in life. Careful, precise people often make the best programmers. Grace is both.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A program is a list of instructions a computer follows exactly, in order. It never guesses what you meant. That\'s why checking matters.',
    },
    {
      kind: 'tryIt',
      title: 'Your first program',
      caption: 'This is a whole program: one instruction that shows a message. Press Run.',
      code: 'console.log("Hello, Kinwell!");\n',
      challenge: 'Change Kinwell to your own name, then run it again.',
    },
  ],
  apply: {
    scenario: 'Grace\'s first five minutes of code.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a program?',
        options: [
          { text: 'A guess at what you want', why: 'Computers never guess. They do exactly what the instructions say.' },
          { text: 'A list of instructions a computer follows exactly, in order' },
          { text: 'A type of spreadsheet', why: 'A spreadsheet is something a program shows you. The program is the instructions behind it.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: 'console.log("Session at 10:00");',
        language: 'typescript',
        options: [
          { text: '"Session at 10:00"', why: 'The quotes mark where the text starts and ends. They are not shown.' },
          { text: 'Session at 10:00' },
          { text: 'console.log', why: 'console.log is the instruction. It shows what is inside the brackets.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show the message Hello, Kinwell!',
        starter: '',
        solution: 'console.log("Hello, Kinwell!");\n',
        hint: 'console.log, then brackets, then your text inside quotes.',
        checks: [{ message: 'Show Hello, Kinwell!', outputIncludes: 'Hello, Kinwell!' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Computers... or people?',
        groups: ['Computers', 'People'],
        items: [
          { text: 'Follow instructions exactly', group: 0 },
          { text: 'Guess what you meant', group: 1 },
          { text: 'Never get bored of repeating a step', group: 0 },
          { text: 'Fill in a missing step from experience', group: 1 },
          { text: 'Do the steps in order, top to bottom', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the instruction that shows a message.',
        language: 'typescript',
        template: 'console.[[1]]("Room 2 is free");',
        blanks: [['log']],
        distractors: ['print', 'show', 'say'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'femi',
        message: 'Honest question before we start: why do you want to learn this?',
        options: [
          { text: 'Everyone says I should.', why: 'That\'s a start, but Femi is asking what YOU want from it. A real reason keeps you going on hard days.' },
          { text: 'I don\'t really know.', why: 'Grace does know: she wants the booking mistakes to stop. A clear reason makes learning stick.' },
          { text: 'I\'m tired of fixing the same spreadsheet mistakes. I want to build something that stops them.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that shows Hi',
        language: 'typescript',
        tiles: ['console', '.log', '(', '"Hi"', ')', ';'],
        distractors: ['print', '.say'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'console.log() shows things on the screen. What goes after the dot? (one word)',
        answers: ['log'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each word to what it means.',
        pairs: [
          ['Program', 'Instructions a computer follows'],
          ['Code', 'The words those instructions are written in'],
          ['Run', 'Make the computer follow them'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Show two lines: Monday, then 3 sessions today',
        starter: '',
        solution: 'console.log("Monday");\nconsole.log("3 sessions today");\n',
        hint: 'Two console.log lines, one under the other. Each one shows one line.',
        checks: [{ message: 'Monday, then 3 sessions today', outputEquals: 'Monday\n3 sessions today' }],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a list, form or spreadsheet in your life that keeps going wrong. What mistake does it let people make?',
    starters: ['The thing that keeps going wrong is...', 'People keep putting...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open the Code playground, switch to TypeScript, and make the computer greet three people, one line each.',
  },
  notes: 'Kinwell, Grace, Femi, Priya and Jayden come from The Art of Small Talk (docs/originals/small-talk-outline.md); this course is set a few months later. console.log writes a line to the output; the runner shows it.',
};

export default lesson;
