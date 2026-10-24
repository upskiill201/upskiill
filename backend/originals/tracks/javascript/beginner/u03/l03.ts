import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Before/After: return vs console.log. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'return vs console.log',
  summary: 'Nora\'s kidsCost() prints the price beautifully. Then she tries to add it to the adults\' price and gets NaN. Printing an answer isn\'t the same as giving it back.',
  minutes: 11,
  outcomes: [
    'Send a value back from a function with return',
    'Store or use what a function returns',
    'Tell when to return and when to print',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The NaN total',
      before: {
        label: 'Printing inside',
        text: 'function kidsCost(kids) {\n  console.log(kids * 39);\n}\n\nconst total = kidsCost(2) + 118;\n// prints 78, then total is NaN\n\nThe 78 goes to the console, a screen for people. The code that called kidsCost gets nothing back: undefined. undefined + 118 is NaN.',
      },
      after: {
        label: 'Returning',
        text: 'function kidsCost(kids) {\n  return kids * 39;\n}\n\nconst total = kidsCost(2) + 118;\nconsole.log(total);   // 196\n\nreturn hands the value back to whoever called. The call kidsCost(2) becomes 78, ready to add, store or print.',
      },
      notes: [
        'console.log shows a value to a person. return gives a value to the code.',
        'A function that works something out should usually return it. Print it where you need to show it.',
        'return also ends the function straight away: lines after it don\'t run.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Give it back',
      code: 'function kidsCost(kids) {\n  return kids * 39;\n}\n\nconst kids = kidsCost(2);\nconst total = kids + 118;\n\nconsole.log(`Kids: $${kids}`);\nconsole.log(`Total: $${total}`);\n',
      caption: 'kidsCost(2) is replaced by what it returns: 78.',
      challenge: 'Change return to console.log inside the function and run it. Watch the total break.',
    },
  ],
  apply: {
    scenario: 'Nora fixes the NaN total.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function adults(n) {\n  return n * 59;\n}\nconsole.log(adults(2));',
        language: 'javascript',
        options: [
          { text: '118' },
          { text: 'Nothing', why: 'adults(2) returns 118, and console.log prints it.' },
          { text: 'undefined', why: 'The function returns a value, so the call isn\'t undefined.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does the last line print?',
        code: 'function adults(n) {\n  console.log(n * 59);\n}\nconst cost = adults(2);\nconsole.log(cost);',
        language: 'javascript',
        options: [
          { text: '118', why: '118 is printed inside the function, but nothing is returned, so cost is undefined.' },
          { text: 'undefined' },
          { text: 'NaN', why: 'cost itself is undefined. NaN would only appear if you did maths with it.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Declare function kidsCost(kids) that RETURNS kids * 39. Don\'t print inside it. Then print kidsCost(3).',
        starter: 'function kidsCost(kids) {\n\n}\n',
        solution: 'function kidsCost(kids) {\n  return kids * 39;\n}\n\nconsole.log(kidsCost(3));\n',
        hint: 'return kids * 39;',
        checks: [
          { message: 'Print 117', outputEquals: '117' },
          { message: 'kidsCost(2) returns 78', expr: 'kidsCost(2) === 78' },
          { message: 'Use return', codeIncludes: 'return' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'total comes out as NaN. Which line should change?',
        lines: ['function seniorsCost(n) {', '  console.log(n * 29);', '}', 'const total = seniorsCost(2) + 59;'],
        bug: 1,
        fix: '  return n * 29;',
        explanation: 'The function prints but doesn\'t return, so seniorsCost(2) is undefined, and undefined + 59 is NaN.',
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'return or console.log?',
        groups: ['return', 'console.log'],
        items: [
          { text: 'A price the code will add to a total', group: 0 },
          { text: 'A message for a person to read', group: 1 },
          { text: 'A true/false answer an if will use', group: 0 },
          { text: 'Checking what a variable holds while you debug', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function check() {\n  return "first";\n  console.log("second");\n}\nconsole.log(check());',
        language: 'javascript',
        options: [
          { text: 'second\nfirst', why: 'return ends the function. The line after it never runs.' },
          { text: 'first' },
          { text: 'first\nsecond', why: 'Nothing after return runs.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the function give back the senior price.',
        template: 'function seniorsCost(n) {\n  [[1]] n * 29;\n}\nconst cost = [[2]](2);',
        blanks: [['return'], ['seniorsCost']],
        distractors: ['console.log', 'give', 'cost'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Declare function adultsCost(n) that returns n * 59. Store adultsCost(2) + 78 in const total, then print exactly: Total: $196',
        starter: '',
        solution: 'function adultsCost(n) {\n  return n * 59;\n}\n\nconst total = adultsCost(2) + 78;\nconsole.log(`Total: $${total}`);\n',
        hint: 'const total = adultsCost(2) + 78;',
        checks: [
          { message: 'Print Total: $196', outputEquals: 'Total: $196' },
          { message: 'adultsCost(1) returns 59', expr: 'adultsCost(1) === 59' },
          { message: 'total is 196', expr: 'total === 196' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does a function give back if it never uses return?',
        answers: ['undefined'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it does.',
        pairs: [
          ['return x;', 'Hands x back to the caller'],
          ['console.log(x);', 'Shows x to a person'],
          ['const y = f();', 'Stores what f returns'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of asking a colleague for a number. When do you want them to shout it across the room (print), and when do you want it written on a note you can use (return)?',
    starters: ['Shouting is fine when...', 'I need it on a note when...'],
  },
  deepen: {
    title: 'Functions can return any value',
    summary: 'Strings, numbers, booleans, lists, objects, even other functions. A function like isFree(age) that returns true or false can go straight into an if: if (isFree(4)) { ... }. You\'ll build lots of these.',
  },
  notes: 'return statement: MDN "return". A function without return gives undefined; undefined + number is NaN.',
};

export default lesson;
