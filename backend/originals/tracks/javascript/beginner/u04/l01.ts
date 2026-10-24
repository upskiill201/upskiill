import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: arrays, a list in one variable. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Lists',
  summary: 'Monday 21 December, the shortest day of the year. Rafa reads fourteen trail names over the radio every morning, from a laminated card. Nora wants them in code. Fourteen variables? No.',
  minutes: 10,
  outcomes: [
    'Make an array with [ ]',
    'Print an array and its length',
    'Store strings, numbers or booleans in a list',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 7:10 a.m., the patrol hut',
      beats: [
        { speaker: 'narrator', text: 'Solstice. Dark until 7:20. Rafa reads the morning sweep from a laminated card, a pen tied to it with string.' },
        { speaker: 'rafa', text: 'Schoolhouse. Lazy Elk. Bunny Hollow. Old Mill. Bluebird...' },
        { speaker: 'nora', text: 'If I make a variable for every trail, that\'s trail1 to trail14. And next year Mags opens a fifteenth.' },
        { speaker: 'rafa', text: 'Don\'t. Make one variable that holds a list. In JavaScript, that\'s an array.' },
        { speaker: 'nora', text: 'One name, fourteen trails.' },
        { speaker: 'rafa', text: 'One name, as many as you like. That\'s the point.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>An <b>array</b> is a list of values in square brackets, separated by commas. It\'s stored in one variable, like any value.</p><p><code>.length</code> tells you how many items it holds.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The first five',
      code: 'const trails = ["Schoolhouse", "Lazy Elk", "Bunny Hollow", "Old Mill", "Bluebird"];\n\nconsole.log(trails);\nconsole.log(trails.length);\n\nconst waits = [12, 0, 3];\nconsole.log(waits);\n',
      caption: 'An array can hold any kind of value: strings, numbers, booleans.',
      challenge: 'Add "Mags\'s Run" to the end of the trails list, inside the brackets, and run it. Watch the length change.',
    },
  ],
  apply: {
    scenario: 'The laminated card becomes an array.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which line makes an array of three lifts?',
        options: [
          { text: 'const lifts = "Old Blue", "Ridge T-Bar", "Bunny Carpet";', why: 'Without square brackets, this isn\'t one list.' },
          { text: 'const lifts = ["Old Blue", "Ridge T-Bar", "Bunny Carpet"];' },
          { text: 'const lifts = {Old Blue, Ridge T-Bar, Bunny Carpet};', why: 'Arrays use [ ], and strings need quotes.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const lifts = ["Old Blue", "Ridge T-Bar", "Bunny Carpet"];\nconsole.log(lifts.length);',
        language: 'javascript',
        options: [
          { text: '3' },
          { text: '2', why: '.length counts the items: there are three.' },
          { text: '33', why: '.length counts items, not characters.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an array of the three lift wait times: 12, 0 and 3.',
        tiles: ['const waits', '=', '[', '12,', '0,', '3', ']', ';'],
        distractors: ['{', '}'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const lifts holding "Old Blue", "Ridge T-Bar" and "Bunny Carpet". Print its length.',
        starter: '',
        solution: 'const lifts = ["Old Blue", "Ridge T-Bar", "Bunny Carpet"];\nconsole.log(lifts.length);\n',
        hint: 'const lifts = ["Old Blue", "Ridge T-Bar", "Bunny Carpet"];',
        checks: [
          { message: 'Print 3', outputEquals: '3' },
          { message: 'lifts is an array of 3', expr: 'Array.isArray(lifts) && lifts.length === 3' },
          { message: 'Old Blue is in it', expr: 'lifts.includes("Old Blue")' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This stops with a SyntaxError. Which line?',
        lines: ['const greens = ["Schoolhouse", "Lazy Elk" "Bunny Hollow"];', 'console.log(greens.length);'],
        bug: 0,
        fix: 'const greens = ["Schoolhouse", "Lazy Elk", "Bunny Hollow"];',
        explanation: 'Items must be separated by commas. "Lazy Elk" "Bunny Hollow" has none between them.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the list and count it.',
        template: 'const blacks = [[1]]"Rattlesnake", "Ridgeline"[[2]];\nconsole.log(blacks.[[3]]);',
        blanks: [['['], [']'], ['length']],
        distractors: ['{', 'size', 'count'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const greens holding the four green trails: "Schoolhouse", "Lazy Elk", "Bunny Hollow", "Old Mill". Print exactly: Green trails: 4, using greens.length.',
        starter: '',
        solution: 'const greens = ["Schoolhouse", "Lazy Elk", "Bunny Hollow", "Old Mill"];\nconsole.log(`Green trails: ${greens.length}`);\n',
        hint: 'console.log(`Green trails: ${greens.length}`);',
        checks: [
          { message: 'Print Green trails: 4', outputEquals: 'Green trails: 4' },
          { message: 'Use greens.length', codeIncludes: 'greens.length' },
          { message: 'greens has the four names', expr: 'greens.join() === "Schoolhouse,Lazy Elk,Bunny Hollow,Old Mill"' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In JavaScript, a list of values in square brackets is called an...',
        answers: ['array', 'an array'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Is each value an array?',
        groups: ['Array', 'Not an array'],
        items: [
          { text: '["Old Blue"]', group: 0 },
          { text: '"Old Blue"', group: 1 },
          { text: '[12, 0, 3]', group: 0 },
          { text: '[]', group: 0 },
          { text: '14', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Mags has a plan for next season. Pick Nora\'s reply.',
        from: 'mags',
        message: 'If I open a fifteenth trail next year, do you have to rewrite everything?',
        options: [
          { text: 'Yes, every line that mentions trails', why: 'Code that uses the array and .length just keeps working.' },
          { text: 'I add one name to the array. Everything that counts or lists trails picks it up' },
          { text: 'Arrays can only hold fourteen things', why: 'Arrays can hold thousands of items.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What lists do you keep: groceries, songs, to-dos? Write one as a JavaScript array in your head.',
    starters: ['const groceries = [...]', 'My list would be...'],
  },
  deepen: {
    title: 'An empty array is still an array',
    summary: 'const tickets = []; is a list with nothing in it yet, and tickets.length is 0. Apps start with empty arrays all the time and fill them as people do things. You\'ll do exactly that in Level 3.',
  },
  notes: 'Arrays: MDN "Array", Array.prototype.length. Mon 21 Dec 2026 is the winter solstice (Dec 21, 2026). Trail names match frontend/public/javascript/practice-api.js.',
};

export default lesson;
