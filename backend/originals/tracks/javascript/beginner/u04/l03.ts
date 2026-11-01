import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Walkthrough: push, pop, includes, indexOf. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Add, remove, find',
  summary: 'Trails open and close all morning. Nora needs to add one to the open list, take one off, and answer the question everyone asks: "Is Bluebird open?"',
  minutes: 10,
  outcomes: [
    'Add to the end of an array with push',
    'Remove the last item with pop',
    'Check if an array contains something with includes and indexOf',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The open list, through the morning',
      steps: [
        {
          title: '8:30: the list so far',
          body: 'Patrol has swept three trails.',
          code: 'const open = ["Schoolhouse", "Lazy Elk", "Bluebird"];',
          language: 'javascript',
        },
        {
          title: '8:45: push adds to the end',
          body: 'Rafa radios that Mags\'s Run is clear. push puts it at the end of the list, and the array itself changes.',
          code: 'open.push("Mags\'s Run");\n// ["Schoolhouse", "Lazy Elk", "Bluebird", "Mags\'s Run"]',
          language: 'javascript',
        },
        {
          title: '9:10: pop removes the last one',
          body: 'Wind on the upper mountain: the last trail added closes again. pop takes the last item off and gives it back to you.',
          code: 'const closed = open.pop();\nconsole.log(closed);   // Mags\'s Run',
          language: 'javascript',
        },
        {
          title: '"Is Bluebird open?"',
          body: 'includes answers yes or no. indexOf tells you where it is, or -1 if it isn\'t there at all.',
          code: 'open.includes("Bluebird");   // true\nopen.indexOf("Bluebird");    // 2\nopen.indexOf("The Chute");   // -1',
          language: 'javascript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Run the morning',
      code: 'const open = ["Schoolhouse", "Lazy Elk", "Bluebird"];\n\nopen.push("Mags\'s Run");\nconsole.log(open);\n\nconst closed = open.pop();\nconsole.log(`Closed again: ${closed}`);\n\nconsole.log(open.includes("Bluebird"));\nconsole.log(open.indexOf("The Chute"));\n',
      caption: 'push and pop change the array. includes and indexOf only look.',
      challenge: 'Push "Big Sky" and "Lone Pine" (push can take several at once: open.push("Big Sky", "Lone Pine")).',
    },
  ],
  apply: {
    scenario: 'The open list, through the morning.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const open = ["Schoolhouse"];\nopen.push("Bluebird");\nconsole.log(open.length);',
        language: 'javascript',
        options: [
          { text: '1', why: 'push added one, so there are two now.' },
          { text: '2' },
          { text: 'Bluebird', why: 'This prints the length.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each method to what it does.',
        pairs: [
          ['push', 'Adds to the end'],
          ['pop', 'Removes the last one'],
          ['includes', 'true if it\'s there'],
          ['indexOf', 'Its position, or -1'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Start with const open = ["Schoolhouse", "Lazy Elk"]. Push "Bluebird", then print open.length.',
        starter: 'const open = ["Schoolhouse", "Lazy Elk"];\n',
        solution: 'const open = ["Schoolhouse", "Lazy Elk"];\nopen.push("Bluebird");\nconsole.log(open.length);\n',
        hint: 'open.push("Bluebird");',
        checks: [
          { message: 'Print 3', outputEquals: '3' },
          { message: 'Bluebird is last', expr: 'open[open.length - 1] === "Bluebird"' },
          { message: 'Use push', codeIncludes: '.push(' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const open = ["Schoolhouse", "Bluebird"];\nconsole.log(open.indexOf("Ridgeline"));',
        language: 'javascript',
        options: [
          { text: '-1' },
          { text: 'undefined', why: 'indexOf uses -1 to say "not found".' },
          { text: 'false', why: 'That\'s what includes would say.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Is Lone Pine on the open list?',
        template: 'if (open.[[1]]("Lone Pine")) {\n  console.log("Lone Pine is open");\n}',
        blanks: [['includes']],
        distractors: ['has', 'contains', 'find'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'This should add Big Sky, but the list doesn\'t change. Which line is wrong?',
        lines: ['const open = ["Bluebird"];', 'open.push;', 'console.log(open);'],
        bug: 1,
        fix: 'open.push("Big Sky");',
        explanation: 'push is a method: call it with brackets and give it the value to add.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'A trail closes: pop the last one off open, store it in const closed, and print exactly: Closed: Mags\'s Run',
        starter: 'const open = ["Schoolhouse", "Bluebird", "Mags\'s Run"];\n',
        solution: 'const open = ["Schoolhouse", "Bluebird", "Mags\'s Run"];\nconst closed = open.pop();\nconsole.log(`Closed: ${closed}`);\n',
        hint: 'const closed = open.pop();',
        checks: [
          { message: 'Print Closed: Mags\'s Run', outputEquals: 'Closed: Mags\'s Run' },
          { message: 'open now has 2 trails', expr: 'open.length === 2' },
          { message: 'Use pop', codeIncludes: '.pop()' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it change the array, or only look?',
        groups: ['Changes it', 'Only looks'],
        items: [
          { text: 'push', group: 0 },
          { text: 'includes', group: 1 },
          { text: 'pop', group: 0 },
          { text: 'indexOf', group: 1 },
          { text: '.length', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make a function isOpen(name) that returns true if name is in the open array. Print isOpen("Bluebird") then isOpen("The Chute").',
        starter: 'const open = ["Schoolhouse", "Lazy Elk", "Bluebird"];\n',
        solution: 'const open = ["Schoolhouse", "Lazy Elk", "Bluebird"];\n\nfunction isOpen(name) {\n  return open.includes(name);\n}\n\nconsole.log(isOpen("Bluebird"));\nconsole.log(isOpen("The Chute"));\n',
        hint: 'return open.includes(name);',
        checks: [
          { message: 'Print true then false', outputEquals: 'true\nfalse' },
          { message: 'isOpen("Lazy Elk") is true', expr: 'isOpen("Lazy Elk") === true' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which method takes the LAST item off an array and gives it back?',
        answers: ['pop', 'pop()', '.pop()'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a list that changes during your day: a queue, a to-do list, a playlist. When do you push, pop, or check includes?',
    starters: ['I push when...', 'I check includes when...'],
  },
  deepen: {
    title: 'The front of the list',
    summary: 'push and pop work at the end. unshift adds to the front, and shift removes from the front. A lift line is shift-and-push: people join at the back and leave from the front. That\'s called a queue.',
  },
  notes: 'Array methods push, pop, includes, indexOf, shift, unshift: MDN. indexOf returns -1 when absent.',
};

export default lesson;
