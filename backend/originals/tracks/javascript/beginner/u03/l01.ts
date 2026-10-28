import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: two windows, two answers; your first function. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Your first function',
  summary: 'Monday 14 December. A family pays $196 at window one and $176 at window two, for the same tickets. Somebody copied the rules wrong. Rules belong in one place.',
  minutes: 10,
  outcomes: [
    'Explain what a function is for',
    'Declare a function with the function keyword',
    'Call a function by its name with ()',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 11:30 a.m.',
      beats: [
        { speaker: 'narrator', text: 'A dad holds up two receipts at the lodge counter. Same family, same day, two windows: $196 and $176.' },
        { speaker: 'mags', text: 'Which one is right?' },
        { speaker: 'nora', text: 'The first. Window two has a copy of my code from Thursday, before I fixed the kids\' band.' },
        { speaker: 'rafa', text: 'There\'s your problem. Two copies of the same rules. They will always drift apart.' },
        { speaker: 'nora', text: 'So one copy, and both windows ask it?' },
        { speaker: 'rafa', text: 'That\'s a function. You write the steps once, give them a name, and call the name whenever you need them.' },
      ],
      choice: {
        prompt: 'How should Nora stop the two windows disagreeing?',
        options: [
          { text: 'Check both copies every morning', outcome: 'She\'d be checking forever, and the one day she forgets is the busiest day of the season.' },
          { text: 'Put the rules in one named function that both windows call', outcome: 'One copy means one answer. Fix it once, fixed everywhere.', best: true },
          { text: 'Close window two', outcome: 'Mags would never allow it. The line would reach the highway.' },
        ],
      },
    },
    {
      kind: 'code',
      language: 'javascript',
      code: 'function openingMessage() {\n  console.log("Silver Pine is open!");\n  console.log("Lifts run 9 a.m. to 4 p.m.");\n}\n\nopeningMessage();\nopeningMessage();',
      caption: 'function, a name, (), then the steps in { }. That\'s the declaration. openingMessage(); runs the steps: that\'s a call.',
    },
    {
      kind: 'tryIt',
      title: 'Write once, run often',
      code: 'function openingMessage() {\n  console.log("Silver Pine is open!");\n  console.log("Lifts run 9 a.m. to 4 p.m.");\n}\n\nopeningMessage();\n',
      caption: 'Declaring a function doesn\'t run it. Only the call at the bottom does.',
      challenge: 'Call openingMessage() two more times. Then delete every call and run it: nothing prints.',
    },
  ],
  apply: {
    scenario: 'One copy of the message, for every window.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function hello() {\n  console.log("Hi!");\n}',
        language: 'javascript',
        options: [
          { text: 'Hi!', why: 'The function is declared but never called.' },
          { text: 'hello', why: 'Nothing prints the name.' },
          { text: 'Nothing' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function hello() {\n  console.log("Hi!");\n}\nhello();\nhello();',
        language: 'javascript',
        options: [
          { text: 'Hi!\nHi!' },
          { text: 'Hi!', why: 'It\'s called twice, so it runs twice.' },
          { text: 'hello\nhello', why: 'Calling it runs the steps inside.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of a function to its job.',
        pairs: [
          ['function', 'Starts the declaration'],
          ['openingMessage', 'The name you call it by'],
          ['{ ... }', 'Holds the steps'],
          ['openingMessage();', 'Runs it'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Declare a function called lifts that prints Old Blue: open. Then call it.',
        starter: '',
        solution: 'function lifts() {\n  console.log("Old Blue: open");\n}\n\nlifts();\n',
        hint: 'function lifts() {\n  console.log("Old Blue: open");\n}\nlifts();',
        checks: [
          { message: 'Print Old Blue: open', outputEquals: 'Old Blue: open' },
          { message: 'Declare a function called lifts', expr: 'typeof lifts === "function"' },
          { message: 'Call it', codeIncludes: 'lifts()' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Nothing prints. Which line is the problem?',
        lines: ['function closingMessage() {', '  console.log("Last chair at 4!");', '}', 'closingMessage;'],
        bug: 3,
        fix: 'closingMessage();',
        explanation: 'Writing the name without () only mentions the function. The brackets are what call it.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Declare and call it.',
        template: '[[1]] snowReport() {\n  console.log("7 inches of new snow");\n}\nsnowReport[[2]];',
        blanks: [['function'], ['()']],
        distractors: ['func', 'def', '{}'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Declare a function called rules that prints two lines: Under 6: free then Locals Tuesday: $20. Call it twice, once for each window.',
        starter: '',
        solution: 'function rules() {\n  console.log("Under 6: free");\n  console.log("Locals Tuesday: $20");\n}\n\nrules();\nrules();\n',
        hint: 'Two console.log lines inside the function, then rules(); rules();',
        checks: [
          { message: 'Print the two lines, twice', outputEquals: 'Under 6: free\nLocals Tuesday: $20\nUnder 6: free\nLocals Tuesday: $20' },
          { message: 'rules is a function', expr: 'typeof rules === "function"' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Running a function by writing its name and () is called a function...',
        answers: ['call', 'calling', 'a call'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why did the two windows give different prices?',
        options: [
          { text: 'JavaScript does maths differently on each computer', why: 'It doesn\'t. The code was different.' },
          { text: 'They each had their own copy of the rules, and one copy was old' },
          { text: 'Window two was slower', why: 'Speed didn\'t change the answer. The rules did.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put this program in order.',
        lines: ['function greet() {', '  console.log("Welcome to Silver Pine!");', '}', 'greet();'],
        language: 'javascript',
      },
    ],
  },
  reflect: {
    prompt: 'What set of steps do you repeat often: a morning routine, a checklist at work? What would you name it as a function?',
    starters: ['I\'d call it...', 'The steps inside would be...'],
  },
  deepen: {
    title: 'You\'ve been calling functions all along',
    summary: 'console.log() is a function, written by browser makers. So are Number() and "text".toUpperCase(). The () after a name always means "run this". Now you can make your own.',
  },
  notes: 'Function declarations and calls: MDN "Functions", "function declaration". Mon 14 Dec 2026. Receipts: 196 (correct) vs 176 (old copy).',
};

export default lesson;
