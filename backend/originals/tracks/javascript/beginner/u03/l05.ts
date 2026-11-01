import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint. Reviews lessons 1–4: declaring, calling, parameters, return, defaults. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: two windows, one rule',
  summary: 'Wednesday 16 December. Both ticket windows now run Nora\'s functions. The dad with two receipts is back, and Mags wants to prove it can\'t happen again.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write a function with parameters that returns a value', 'Call the same function from two places and get the same answer'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 9:40 a.m.',
      beats: [
        { speaker: 'narrator', text: 'The dad from Monday is back with the same family, and a grin.' },
        { speaker: 'mags', text: 'Window one, window two. Same family. Go.' },
        { speaker: 'nora', text: 'Both windows call the same function. One copy of the rules.' },
        { speaker: 'rafa', text: 'Prove it. Write it without looking.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: one function, both windows.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why can\'t the two windows disagree any more?',
        options: [
          { text: 'They have the same computer', why: 'Different computers are fine. They call the same function.' },
          { text: 'Nora checks them every hour', why: 'No need. There\'s only one copy of the rules.' },
          { text: 'Both call one function, so there\'s only one copy of the rules' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Declare function adultsCost(n) that returns n * 59. Print adultsCost(3).',
        starter: '',
        solution: 'function adultsCost(n) {\n  return n * 59;\n}\n\nconsole.log(adultsCost(3));\n',
        hint: 'return n * 59;',
        checks: [
          { message: 'Print 177', outputEquals: '177' },
          { message: 'adultsCost(2) returns 118', expr: 'adultsCost(2) === 118' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function greet(name = "skier") {\n  return `Hi, ${name}!`;\n}\nconsole.log(greet());',
        language: 'javascript',
        options: [
          { text: 'Hi, undefined!', why: 'name has a default, so it\'s "skier" when nothing is passed.' },
          { text: 'Hi, skier!' },
          { text: 'Nothing', why: 'greet() returns a string, and console.log prints it.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'total is NaN. Which line is the cause?',
        lines: ['function kidsCost(n) {', '  console.log(n * 39);', '}', 'const total = 118 + kidsCost(2);'],
        bug: 1,
        fix: '  return n * 39;',
        explanation: 'Without return, kidsCost(2) gives back undefined. 118 + undefined is NaN.',
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each word to its meaning.',
        pairs: [
          ['Declaration', 'Writing the function once'],
          ['Call', 'Running it with ()'],
          ['Parameter', 'The slot in the declaration'],
          ['Argument', 'The value in the call'],
          ['return', 'What the call gives back'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Finish the function.',
        template: '[[1]] familyCost(adults, kids [[2]] 0) {\n  [[3]] adults * 59 + kids * 39;\n}',
        blanks: [['function'], ['='], ['return']],
        distractors: ['def', 'console.log', ':'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Declare function familyCost(adults, kids = 0) that returns the total (adults $59, kids $39). Then make const window1 = familyCost(2, 2) and const window2 = familyCost(2, 2), and print window1 === window2.',
        starter: '',
        solution: 'function familyCost(adults, kids = 0) {\n  return adults * 59 + kids * 39;\n}\n\nconst window1 = familyCost(2, 2);\nconst window2 = familyCost(2, 2);\nconsole.log(window1 === window2);\n',
        hint: 'Write familyCost first, then two consts that call it.',
        checks: [
          { message: 'Print true', outputEquals: 'true' },
          { message: 'window1 is 196', expr: 'window1 === 196' },
          { message: 'kids defaults to 0', expr: 'familyCost(1) === 59' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'function f(adults, kids) {\n  return adults * 59 + kids * 39;\n}\nconsole.log(f(0, 2));',
        language: 'javascript',
        options: [
          { text: '78' },
          { text: '118', why: '0 adults and 2 kids: 0 + 78.' },
          { text: 'NaN', why: '0 is a real number, so the maths works.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the program in a working order.',
        lines: [
          'function seniorsCost(n) {',
          '  return n * 29;',
          '}',
          'const cost = seniorsCost(2);',
          'console.log(`Seniors: $${cost}`);',
        ],
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which keyword sends a value back out of a function?',
        answers: ['return'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Declare function receipt(total) that returns the text Total: $ followed by the total. Print receipt(196).',
        starter: '',
        solution: 'function receipt(total) {\n  return `Total: $${total}`;\n}\n\nconsole.log(receipt(196));\n',
        hint: 'return `Total: $${total}`;',
        checks: [
          { message: 'Print Total: $196', outputEquals: 'Total: $196' },
          { message: 'receipt(5) returns "Total: $5"', expr: 'receipt(5) === "Total: $5"' },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'The dad is impressed. Pick Nora\'s reply.',
        from: 'mags',
        message: 'He says "same price at both windows, finally". Shall I tell him how?',
        options: [
          { text: 'Tell him both windows ask the same function now. One rule, one answer' },
          { text: 'Tell him it was luck', why: 'It wasn\'t. It\'s the whole point of a function.' },
          { text: 'Tell him the computers talk to each other', why: 'They don\'t need to. They share the code.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where at work or home do two people "keep their own copy" of the same rule or list? What goes wrong?',
    starters: ['Two copies of...', 'It goes wrong when...'],
  },
  notes: 'Checkpoint for u03 lessons 1–4. Wed 16 Dec 2026. familyCost(2,2) = 196.',
};

export default lesson;
