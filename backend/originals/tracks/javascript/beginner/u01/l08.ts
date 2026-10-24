import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Reading: ReferenceError, SyntaxError, TypeError, and how to read an error. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Reading error messages',
  summary: 'Nora\'s screen goes red and she wants to throw the laptop into the snow. Rafa: "Read it. Errors are the most honest thing a computer says."',
  minutes: 10,
  outcomes: [
    'Read the three parts of an error: type, message and line',
    'Tell ReferenceError, SyntaxError and TypeError apart',
    'Fix the most common cause of each',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Rafa\'s rule: read the red',
      html: '<p>In the patrol hut, Rafa writes three words on the whiteboard: <b>type, message, line</b>.</p><p>Every JavaScript error tells you all three. <code>ReferenceError: kidprice is not defined (line 2)</code> says: what <i>kind</i> of problem, what exactly went wrong, and where to look.</p><p><b>ReferenceError</b>: you used a name JavaScript has never heard of. Almost always a typo or a capital letter: <code>kidprice</code> instead of <code>kidPrice</code>, or using a variable before you made it.</p><p><b>SyntaxError</b>: the code isn\'t written in a shape JavaScript can read. A missing quote, a missing bracket, a stray comma. Nothing runs at all, not even the lines before it.</p><p><b>TypeError</b>: the shape is fine, but you did something a value can\'t do. Giving a <code>const</code> a new value is one. Calling something that isn\'t a function is another.</p><p>"The first error is the real one," Rafa says. "Fix it, run again. Never guess at five things at once."</p>',
    },
    {
      kind: 'tryIt',
      title: 'Break it on purpose',
      code: 'const kidPrice = 39;\nconsole.log(kidprice);\n',
      caption: 'This one is meant to fail. Read the red: type, message, line.',
      challenge: 'Fix the capital P and run it again.',
      expectError: true,
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'An error isn\'t a sign you\'re bad at this. Professional developers see dozens a day. The skill is reading them calmly.',
    },
  ],
  apply: {
    scenario: 'Rafa\'s whiteboard drill: read the red.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each error type to its usual cause.',
        pairs: [
          ['ReferenceError', 'A name that was never made'],
          ['SyntaxError', 'Code written in a shape JS can\'t read'],
          ['TypeError', 'Doing something a value can\'t do'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'ReferenceError: adultprice is not defined. What\'s the most likely fix?',
        options: [
          { text: 'Check the spelling and capitals of adultprice' },
          { text: 'Add more brackets', why: 'Brackets cause SyntaxErrors. This is about a name.' },
          { text: 'Change const to let', why: 'That fixes a TypeError about changing a const, not an unknown name.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which error would each line cause?',
        groups: ['ReferenceError', 'SyntaxError'],
        items: [
          { text: 'console.log(trialCount);  // never made', group: 0 },
          { text: 'console.log("Open);', group: 1 },
          { text: 'console.log(59;', group: 1 },
          { text: 'console.log(Adultprice);', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'SyntaxError. Which line has the missing piece?',
        lines: ['const lift = "Old Blue";', 'console.log(`${lift} is open`;', 'console.log("See you!");'],
        bug: 1,
        fix: 'console.log(`${lift} is open`);',
        explanation: 'console.log( opens a bracket that never closes. Every ( needs a ).',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the code so it runs and prints 39.',
        starter: 'const kidPrice = 39;\nconsole.log(KidPrice);\n',
        solution: 'const kidPrice = 39;\nconsole.log(kidPrice);\n',
        hint: 'The name in console.log must match the one on line 1 exactly.',
        checks: [{ message: 'Print 39', outputEquals: '39' }],
      },
      {
        kind: 'mcq',
        prompt: 'TypeError: Assignment to constant variable. What happened?',
        options: [
          { text: 'A name was spelled wrong', why: 'That\'s a ReferenceError.' },
          { text: 'A quote is missing', why: 'That\'s a SyntaxError.' },
          { text: 'The code gave a const a new value' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'This count stops with a TypeError. Fix it so it prints 3.',
        starter: 'const riders = 2;\nriders++;\nconsole.log(riders);\n',
        solution: 'let riders = 2;\nriders++;\nconsole.log(riders);\n',
        hint: 'A value that changes needs let, not const.',
        checks: [{ message: 'Print 3', outputEquals: '3' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rafa\'s three words: every error tells you its type, its message and its...',
        answers: ['line', 'line number', 'the line'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'There are four errors on screen. What should Nora do first?',
        options: [
          { text: 'Fix all four at once to save time', why: 'Often one mistake causes the others. Fixing all four means guessing.' },
          { text: 'Fix the first one, then run again' },
          { text: 'Delete the code and start over', why: 'Errors point at exactly where to look. No need to start again.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Rafa\'s error routine in order.',
        lines: [
          'Read the error type',
          'Read the message',
          'Go to the line it names',
          'Fix one thing',
          'Run it again',
        ],
      },
    ],
  },
  reflect: {
    prompt: 'How do you usually react when something on a computer goes wrong? What would "read the red" look like for you?',
    starters: ['Usually I...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'The full list of error types',
    summary: 'JavaScript has a few more: RangeError (a number out of range, like a negative array length), URIError, and errors you make yourself with throw new Error("..."), which you\'ll use in Level 3. MDN\'s "JavaScript error reference" lists every message with an example and a fix.',
  },
  notes: 'Error types: MDN "Error", "ReferenceError", "SyntaxError", "TypeError". "x is not defined" is V8/Chrome wording. SyntaxErrors stop the whole script before it runs (parse errors).',
};

export default lesson;
