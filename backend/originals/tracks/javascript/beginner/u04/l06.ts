import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Walkthrough: totals and counts in a loop (the accumulator pattern). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Totals and counts in a loop',
  summary: 'Mags wants one number for the radio station: how much snow fell this week. Seven days, seven numbers. Nora needs a running total.',
  minutes: 10,
  outcomes: [
    'Add up an array with a running total',
    'Count items that pass a test',
    'Work out an average from a total and a length',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The running total',
      steps: [
        {
          title: 'Start at zero, before the loop',
          body: 'Make a let that will grow. It must be outside the loop, or it would reset every time round.',
          code: 'const snowfall = [2, 0, 5, 7, 0, 1, 3]; // inches, Mon to Sun\nlet total = 0;',
          language: 'javascript',
        },
        {
          title: 'Add each item inside the loop',
          body: 'Every time round, add the current day\'s number to total.',
          code: 'for (const inches of snowfall) {\n  total += inches;\n}',
          language: 'javascript',
        },
        {
          title: 'Use it after the loop',
          body: 'When the loop ends, total holds the sum of everything.',
          code: 'console.log(`Snow this week: ${total} inches`); // 18',
          language: 'javascript',
        },
        {
          title: 'Counting is the same idea',
          body: 'Start a count at 0, and add 1 only when an item passes a test. Here: how many days had any snow?',
          code: 'let snowDays = 0;\nfor (const inches of snowfall) {\n  if (inches > 0) {\n    snowDays++;\n  }\n}\nconsole.log(snowDays); // 5',
          language: 'javascript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The week in snow',
      code: 'const snowfall = [2, 0, 5, 7, 0, 1, 3];\n\nlet total = 0;\nlet snowDays = 0;\n\nfor (const inches of snowfall) {\n  total += inches;\n  if (inches > 0) {\n    snowDays++;\n  }\n}\n\nconsole.log(`Total: ${total} inches`);\nconsole.log(`Snow days: ${snowDays}`);\nconsole.log(`Average: ${total / snowfall.length} inches a day`);\n',
      caption: 'One loop can keep several running numbers at once.',
      challenge: 'Count the big days instead: inches of 5 or more.',
    },
  ],
  apply: {
    scenario: 'Mags\'s number for the radio station.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'let total = 0;\nfor (const n of [2, 3, 5]) {\n  total += n;\n}\nconsole.log(total);',
        language: 'javascript',
        options: [
          { text: '5', why: 'That\'s only the last item. total adds them all.' },
          { text: '10' },
          { text: '235', why: 'These are numbers, so they add.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'This prints 3 instead of 18. Which line is in the wrong place?',
        lines: ['for (const inches of snowfall) {', '  let total = 0;', '  total += inches;', '}'],
        bug: 1,
        fix: 'Move let total = 0; above the loop.',
        explanation: 'Inside the loop, total resets to 0 every time round. It has to start once, before the loop.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Add up the lift waits with a loop and print the total.',
        starter: 'const waits = [12, 0, 3];\nlet total = 0;\n',
        solution: 'const waits = [12, 0, 3];\nlet total = 0;\n\nfor (const wait of waits) {\n  total += wait;\n}\n\nconsole.log(total);\n',
        hint: 'for (const wait of waits) { total += wait; }',
        checks: [
          { message: 'Print 15', outputEquals: '15' },
          { message: 'total is 15', expr: 'total === 15' },
          { message: 'Use a loop', codeIncludes: ' of waits' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Count the days with more than 4 inches.',
        template: 'let bigDays = [[1]];\nfor (const inches of snowfall) {\n  if (inches > 4) {\n    bigDays[[2]];\n  }\n}',
        blanks: [['0'], ['++']],
        distractors: ['1', '--', '+= inches'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Count how many trails are open. open holds true/false for each trail. Store the count in let openCount and print exactly: Open trails: 10',
        starter: 'const open = [true, true, true, false, true, true, true, true, true, false, true, true, false, false];\nlet openCount = 0;\n',
        solution: 'const open = [true, true, true, false, true, true, true, true, true, false, true, true, false, false];\nlet openCount = 0;\n\nfor (const isOpen of open) {\n  if (isOpen) {\n    openCount++;\n  }\n}\n\nconsole.log(`Open trails: ${openCount}`);\n',
        hint: 'for (const isOpen of open) { if (isOpen) { openCount++; } }',
        checks: [
          { message: 'Print Open trails: 10', outputEquals: 'Open trails: 10' },
          { message: 'openCount is 10', expr: 'openCount === 10' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The week\'s total is 18 inches over 7 days. Which line gives the average?',
        options: [
          { text: 'total * snowfall.length', why: 'An average divides, it doesn\'t multiply.' },
          { text: 'total / snowfall.length' },
          { text: 'snowfall.length / total', why: 'That\'s the wrong way round.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines to add up a list.',
        lines: ['let total = 0;', 'for (const n of numbers) {', '  total += n;', '}', 'console.log(total);'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Write function sum(numbers) that returns the total of any array of numbers. Print sum([2, 0, 5, 7, 0, 1, 3]).',
        starter: '',
        solution: 'function sum(numbers) {\n  let total = 0;\n  for (const n of numbers) {\n    total += n;\n  }\n  return total;\n}\n\nconsole.log(sum([2, 0, 5, 7, 0, 1, 3]));\n',
        hint: 'Inside the function: let total = 0; loop; return total;',
        checks: [
          { message: 'Print 18', outputEquals: '18' },
          { message: 'sum([1, 2]) is 3', expr: 'sum([1, 2]) === 3' },
          { message: 'sum([]) is 0', expr: 'sum([]) === 0' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What should a running total start at, before the loop? (a number)',
        answers: ['0', 'zero'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        prompt: 'The radio station calls. Pick Mags\'s best line.',
        from: 'mags',
        message: 'The radio wants the week\'s snow in one number. What do I say?',
        options: [
          { text: 'Eighteen inches this week, and it snowed five days out of seven' },
          { text: 'Two, zero, five, seven, zero, one, three', why: 'They asked for one number: the total.' },
          { text: 'A lot', why: 'Nora\'s code gives an exact answer: 18.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What would you add up or count if you had a list of your week: hours slept, money spent, steps walked?',
    starters: ['I\'d total...', 'I\'d count the days when...'],
  },
  deepen: {
    title: 'reduce',
    summary: 'Arrays have a built-in tool for this: snowfall.reduce((total, n) => total + n, 0). It does exactly what your loop does, in one line. It\'s worth learning later, but the loop is easier to read while you\'re starting, and it\'s what reduce does underneath.',
  },
  notes: 'Accumulator pattern; Array.prototype.reduce: MDN. Snowfall week sum 18, snow days 5. open flags match practice-api.js trails (10 open of 14).',
};

export default lesson;
