import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Reading: when a function says undefined. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'When a function says undefined',
  summary: 'The website shows "Price: $undefined" for one family in a hundred. Nora and Rafa go hunting for the gap in the rules.',
  minutes: 10,
  outcomes: [
    'List the four usual reasons a function returns undefined',
    'Find the missing path in an if chain',
    'Make sure every path through a function returns a value',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Price: $undefined',
      html: '<p>Rafa calls it "the undefined hunt". When a function gives back <code>undefined</code>, it\'s almost always one of four things:</p><ol><li><b>No return at all.</b> The function prints or works something out, but never hands it back.</li><li><b>return in braces is missing.</b> An arrow function with <code>{ }</code> needs <code>return</code>, just like a declaration.</li><li><b>A missing argument.</b> The caller didn\'t pass a value, so the parameter is <code>undefined</code>, and so is anything built from it.</li><li><b>A path with no return.</b> The ifs cover some cases but not all. When none match, the function reaches its closing <code>}</code> and returns <code>undefined</code>.</li></ol><p>Nora\'s bug was number 4:</p><pre>function ticketPrice(age) {\n  if (age &lt; 6) return 0;\n  if (age &lt; 13) return 39;\n  if (age &gt; 70) return 29;\n  if (age &gt;= 13 &amp;&amp; age &lt; 70) return 59;\n}</pre><p>Someone exactly 70 matches nothing. "Every function that returns something should end with a return," Rafa says. "A last line that catches everyone else." Replace the last if with a plain <code>return 59;</code> and there are no gaps.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The gap at 70',
      code: 'function ticketPrice(age) {\n  if (age < 6) return 0;\n  if (age < 13) return 39;\n  if (age > 70) return 29;\n  if (age >= 13 && age < 70) return 59;\n}\n\nconsole.log(ticketPrice(69));\nconsole.log(ticketPrice(70));\nconsole.log(ticketPrice(71));\n',
      caption: 'One age falls through every if. Find it, then fix the code so it can\'t happen.',
      challenge: 'Change > 70 to >= 70, and replace the last if with return 59;',
    },
  ],
  apply: {
    scenario: 'The undefined hunt.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function price(age) {\n  if (age < 6) {\n    return 0;\n  }\n}\nconsole.log(price(30));',
        language: 'javascript',
        options: [
          { text: '0', why: '30 isn\'t under 6, so return 0 never runs.' },
          { text: 'undefined' },
          { text: '59', why: 'There\'s no 59 anywhere in this function.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which of these give undefined?',
        groups: ['undefined', 'A real value'],
        items: [
          { text: 'const f = (n) => { n * 2 }; f(3)', group: 0 },
          { text: 'const f = (n) => n * 2; f(3)', group: 1 },
          { text: 'function f() { console.log(5); } f()', group: 0 },
          { text: 'function f() { return 5; } f()', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line leaves a gap for someone exactly 13?',
        lines: ['function price(age) {', '  if (age < 13) return 39;', '  if (age > 13) return 59;', '}'],
        bug: 2,
        fix: '  return 59;',
        explanation: '13 is neither < 13 nor > 13, so it falls through. A final plain return catches everyone else.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix ticketPrice so every age returns a number: 0 under 6, 39 under 13, 29 for 70 and over, 59 for everyone else. Print ticketPrice(70).',
        starter: 'function ticketPrice(age) {\n  if (age < 6) return 0;\n  if (age < 13) return 39;\n  if (age > 70) return 29;\n  if (age >= 13 && age < 70) return 59;\n}\n\nconsole.log(ticketPrice(70));\n',
        solution: 'function ticketPrice(age) {\n  if (age < 6) return 0;\n  if (age < 13) return 39;\n  if (age >= 70) return 29;\n  return 59;\n}\n\nconsole.log(ticketPrice(70));\n',
        hint: 'Use >= 70, and end with a plain return 59;',
        checks: [
          { message: 'Print 29', outputEquals: '29' },
          { message: '13 pays 59', expr: 'ticketPrice(13) === 59' },
          { message: '69 pays 59', expr: 'ticketPrice(69) === 59' },
          { message: '6 pays 39', expr: 'ticketPrice(6) === 39' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function greet(name) {\n  return `Hi, ${name}`;\n}\nconsole.log(greet());',
        language: 'javascript',
        options: [
          { text: 'Hi, ', why: 'The missing argument becomes undefined, and that word is put into the text.' },
          { text: 'An error', why: 'Missing arguments don\'t cause errors.' },
          { text: 'Hi, undefined' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each bug to its fix.',
        pairs: [
          ['The function only prints', 'Add return'],
          ['An arrow body in { } with no return', 'Add return, or drop the braces'],
          ['The call leaves out an argument', 'Pass it, or give a default'],
          ['Some ages match no if', 'End with a plain return'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'This arrow function returns undefined. Fix it so wait("Old Blue") returns the text Old Blue: 12 min, then print it.',
        starter: 'const wait = (lift) => {\n  `${lift}: 12 min`;\n};\n\nconsole.log(wait("Old Blue"));\n',
        solution: 'const wait = (lift) => `${lift}: 12 min`;\n\nconsole.log(wait("Old Blue"));\n',
        hint: 'Either add return inside the braces, or drop the braces.',
        checks: [
          { message: 'Print Old Blue: 12 min', outputEquals: 'Old Blue: 12 min' },
          { message: 'wait returns the text', expr: 'wait("x") === "x: 12 min"' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A function that reaches its closing } without a return gives back...',
        answers: ['undefined'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Close the gap: catch everyone else at the end.',
        template: 'function price(age) {\n  if (age < 6) return 0;\n  if (age >= 70) return 29;\n  [[1]] 59;\n}',
        blanks: [['return']],
        distractors: ['if', 'else 59', 'console.log'],
        language: 'javascript',
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa quizzes Nora. Pick her answer.',
        from: 'rafa',
        message: 'One in a hundred families saw $undefined. Why so rare?',
        options: [
          { text: 'Because only people exactly 70 fell through the gap' },
          { text: 'The website was slow that day', why: 'Speed doesn\'t make a value undefined.' },
          { text: 'Random computer glitch', why: 'Code does exactly what it says. The gap was in the rules.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Edge cases, like being exactly 70, hide in everyday rules too. Think of a rule with a border ("under 18", "over $50"). Who sits exactly on the line?',
    starters: ['The rule is...', 'Exactly on the line is...'],
  },
  deepen: {
    title: 'Test the borders',
    summary: 'Testers call these boundary values: test 5 and 6, 12 and 13, 69 and 70. Most bugs in rules live right on the edges. Rafa\'s Denver job was mostly this: try the number just below, on and just above every limit.',
  },
  notes: 'Functions return undefined without a return statement (MDN "return"). Boundary value analysis: standard software testing technique.',
};

export default lesson;
