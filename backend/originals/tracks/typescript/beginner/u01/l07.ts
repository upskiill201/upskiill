import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Reading a type error step by step: label, wrong value, the message, the fix. Text + number joining is fine. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Your first type error',
  summary: 'The red line isn\'t a telling-off. It\'s a note from TypeScript saying exactly what doesn\'t match. Learn to read one, calmly, in four steps.',
  minutes: 13,
  outcomes: ['Read a type error message', 'Find the line it points at', 'Fix the value or the label so they match'],
  learn: [
    {
      kind: 'steps',
      title: 'Reading a type error, step by step',
      steps: [
        {
          title: '1. The label',
          body: 'This line makes a box called sessions and labels it number. From now on, only numbers can go in it.',
          code: 'let sessions: number = 3;',
          language: 'typescript',
        },
        {
          title: '2. The wrong value',
          body: 'Someone puts text into the box. In the spreadsheet, this would slip through. TypeScript draws a red line under it.',
          code: 'let sessions: number = 3;\nsessions = "three";',
          language: 'typescript',
        },
        {
          title: '3. The message',
          body: 'Type \'string\' is not assignable to type \'number\'. In plain words: you gave me text (a string), but this box only takes numbers. It even says which line.',
        },
        {
          title: '4. The fix',
          body: 'Make the value match the label: 3 is a number, "three" is text. Change the value, and the red line goes away.',
          code: 'let sessions: number = 3;\nsessions = 4;',
          language: 'typescript',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Joining text and a number with + is fine: "Sessions: " + 3 shows Sessions: 3. The error only appears when a value doesn\'t match the label you gave it.',
    },
    {
      kind: 'tryIt',
      title: 'Read the message',
      caption: 'This has one type error. Run it, read the message, then fix it.',
      code: 'let room: number = 2;\nroom = "Room 3";\nconsole.log("Room: " + room);\n',
      challenge: 'Fix the second line so room gets a number, and run it again.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'Grace meets her first red line.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Type \'string\' is not assignable to type \'number\'. What does it mean?',
        options: [
          { text: 'You gave text where only a number is allowed' },
          { text: 'Your computer is out of memory', why: 'It\'s about a value not matching its label, nothing to do with memory.' },
          { text: 'You can\'t use numbers at all', why: 'You can. You just can\'t put text where a number belongs.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the four steps for reading a type error in order.',
        lines: ['Look at the label', 'Spot the value that doesn\'t match', 'Read what the message says', 'Change the value or the label'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Is this a type error?',
        code: 'console.log("Sessions: " + 3);',
        language: 'typescript',
        options: [
          { text: 'Yes: you can\'t mix text and numbers', why: 'With + TypeScript happily joins text and a number. This shows Sessions: 3.' },
          { text: 'No: it shows Sessions: 3' },
          { text: 'Yes: numbers need quotes', why: 'Numbers never need quotes.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the type error so the code shows Room: 3',
        starter: 'let room: number = 2;\nroom = "Room 3";\nconsole.log("Room: " + room);\n',
        solution: 'let room: number = 2;\nroom = 3;\nconsole.log("Room: " + room);\n',
        hint: 'room is labelled number, so give it 3, not "Room 3".',
        checks: [
          { message: 'No type errors', noTypeErrors: true },
          { message: 'Show Room: 3', outputEquals: 'Room: 3' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line TypeScript underlines in red.',
        language: 'typescript',
        lines: ['let patients: number = 5;', 'console.log(patients);', 'patients = "six";', 'console.log(patients);'],
        bug: 2,
        fix: 'patients = 6;',
        explanation: 'patients is labelled number, and "six" is text.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'grace',
        message: 'There\'s a red line and a scary message. Should I just delete the whole line?',
        options: [
          { text: 'Yes, delete anything that\'s red.', why: 'Deleting hides the problem. The message tells you exactly what to fix, so read it first.' },
          { text: 'Read the message first: it says what doesn\'t match and on which line. Then fix that one thing.' },
          { text: 'Ask Femi to fix it every time.', why: 'Femi\'s busy, and reading errors yourself is the skill that makes you a programmer.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Type error, or fine?',
        groups: ['Type error', 'Fine'],
        items: [
          { text: 'let rooms: number = "2";', group: 0 },
          { text: 'let rooms: number = 2;', group: 1 },
          { text: 'console.log("Rooms: " + 2);', group: 1 },
          { text: 'let name: string = 44;', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Fix the value so it matches the label.',
        language: 'typescript',
        template: 'let minutes: number = [[1]];',
        blanks: [['45']],
        distractors: ['"45"', 'forty-five'],
      },
      {
        kind: 'writeCode',
        prompt: 'Your turn to break it on purpose: give sessions (a number) a text value, so TypeScript reports the error',
        starter: 'let sessions: number = 3;\n',
        solution: 'let sessions: number = 3;\nsessions = "three";\n',
        hint: 'Add a line that sets sessions to some text in quotes.',
        checks: [{ message: 'TypeScript reports: not assignable to type \'number\'', typeErrorIncludes: "not assignable to type 'number'" }],
      },
      {
        kind: 'mcq',
        prompt: 'Where does the type error message point?',
        options: [
          { text: 'Always line 1', why: 'It points at the exact line where the mismatch is.' },
          { text: 'Nowhere: you have to search', why: 'TypeScript tells you the line, so you don\'t have to hunt.' },
          { text: 'At the line where the value doesn\'t match its label' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'How do you usually react when something tells you you\'ve made a mistake? How could you read a red line the way you\'d read a calm colleague\'s note?',
    starters: ['When I see a mistake, I usually...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Break your own code on purpose in the playground: put text where a number goes, then a number where text goes, and read both messages.',
  },
  notes: 'TS2322 "Type \'string\' is not assignable to type \'number\'." Runner still runs code with type errors (like TypeScript\'s emit), so the try-it prints Room: Room 3; grading fails until there are no type errors. The deliberate-error writeCode uses typeErrorIncludes.',
};

export default lesson;
