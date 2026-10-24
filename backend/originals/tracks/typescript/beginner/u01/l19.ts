import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 19. The most common beginner mistakes: missing quotes and brackets, capital Console, curly phone quotes, = vs === (preview). */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The most common beginner mistakes',
  summary: 'Every programmer makes the same handful of mistakes in their first month. Learn to spot them in a second, and you\'ll fix most errors before you even run.',
  minutes: 12,
  outcomes: ['Spot the most common beginner mistakes on sight', 'Know which mistakes TypeScript catches for you', 'Fix a line with more than one mistake'],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Capital letters don\'t matter: Console.log works the same as console.log.',
          isFact: false,
          explain: 'Myth. Capitals count. TypeScript says \'Console\' only refers to a type, but is being used as a value. It\'s console, all lowercase.',
        },
        {
          text: 'Curly quotes from a phone keyboard (“like these”) can break your code.',
          isFact: true,
          explain: 'Fact. Code needs straight quotes ("like these"). Teyro\'s editor straightens them as you type, but code copied from elsewhere can still have them.',
        },
        {
          text: 'A missing closing bracket is the most common beginner error of all.',
          isFact: true,
          explain: 'Fact: missing brackets and quotes top the list. The message usually says \')\' expected, and points at the line.',
        },
        {
          text: 'One = and three === mean the same thing.',
          isFact: false,
          explain: 'Myth. One = puts a value into a box. === asks "are these equal?". You\'ll use === in Chapter 5.',
        },
        {
          text: 'If the code runs, there are no mistakes in it.',
          isFact: false,
          explain: 'Myth. "45" + 15 runs and shows 4515. Running isn\'t the same as being right. That\'s why types and checks exist.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Spot it before you run it',
      caption: 'This line has a beginner mistake. Find it first, then run it to see if you were right.',
      code: 'Console.log("Room 2 is free");\n',
      challenge: 'Fix it and run again.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'Grace\'s mistake hunt.',
    items: [
      {
        kind: 'findBug',
        prompt: 'Tap the line with the mistake.',
        language: 'typescript',
        lines: ['console.log("Monday");', 'Console.log("Room 1");', 'console.log("Room 2");'],
        bug: 1,
        fix: 'console.log("Room 1");',
        explanation: 'Console with a capital C is a type name, not the console you can log to.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which mistake is it?',
        groups: ['Missing quote or bracket', 'Wrong capitals or spelling'],
        items: [
          { text: 'console.log("Room 2);', group: 0 },
          { text: 'Console.log("Room 2");', group: 1 },
          { text: 'console.log("Room 2";', group: 0 },
          { text: 'consol.log("Room 2");', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which line is written correctly?',
        options: [
          { text: 'console.log(“Room 2”);', why: 'Those are curly quotes from a phone keyboard. Code needs straight quotes.' },
          { text: 'console.log("Room 2");' },
          { text: 'console.Log("Room 2");', why: 'log is all lowercase.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the capital letter so it shows Room 2 is free with no errors',
        starter: 'Console.log("Room 2 is free");\n',
        solution: 'console.log("Room 2 is free");\n',
        hint: 'console is all lowercase.',
        checks: [
          { message: 'No errors', noTypeErrors: true },
          { message: 'Show Room 2 is free', outputIncludes: 'Room 2 is free' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each mistake to its fix.',
        pairs: [
          ['Console.log', 'Make it lowercase: console.log'],
          ['“curly quotes”', 'Use straight quotes: "like this"'],
          ['console.log("Hi";', 'Add the closing bracket'],
          ['"45" + 15', 'Remove the quotes to add numbers'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does one = do in code?',
        options: [
          { text: 'Checks if two things are equal', why: 'That\'s ===. One = puts a value into a box.' },
          { text: 'Nothing, it\'s decoration', why: 'It does something important: it stores a value.' },
          { text: 'Puts a value into a box, like sessions = 4' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'femi',
        message: 'Confession: I still forget closing brackets. Every week.',
        options: [
          { text: 'Same. That\'s why I read the message and check the line it points at, instead of panicking.' },
          { text: 'Then you\'re not a real developer.', why: 'Everyone makes these mistakes, at every level. What matters is fixing them calmly.' },
          { text: 'I never make mistakes.', why: 'Everyone does, including Femi. Spotting them fast is the skill.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Fix the line: lowercase instruction, closing quote and bracket.',
        language: 'typescript',
        template: '[[1]].log("Room 3 is free[[2]][[3]];',
        blanks: [['console'], ['"'], [')']],
        distractors: ['Console', '\''],
      },
      {
        kind: 'typeAnswer',
        prompt: '"45" + 15 runs and shows 4515. Is that output right? (yes or no)',
        answers: ['no'],
        placeholder: 'yes or no',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix all three lines so the code shows Monday, Room 1, Room 2 with no errors',
        starter: 'console.log("Monday";\nConsole.log("Room 1");\nconsole.log("Room 2);\n',
        solution: 'console.log("Monday");\nconsole.log("Room 1");\nconsole.log("Room 2");\n',
        hint: 'Line 1: missing bracket. Line 2: capital C. Line 3: missing quote. Fix one at a time.',
        checks: [
          { message: 'No errors', noTypeErrors: true },
          { message: 'Monday, Room 1, Room 2', outputEquals: 'Monday\nRoom 1\nRoom 2' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of these mistakes do you think you\'ll make most? What\'s one habit that would help you catch it?',
    starters: ['I\'ll probably...', 'A habit that would help is...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Keep a "mistakes I make" list for a week, like Miracle\'s study-mistakes list in Study Smarter with AI.',
  },
  notes: 'Console.log → TS2693 "\'Console\' only refers to a type, but is being used as a value here." (interface Console in the lib). Curly quotes → TS1127 "Invalid character." The Teyro editor runs straightenQuotes on input, so writeCode starters never contain curly quotes (the loader does not straighten them).',
};

export default lesson;
