import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Walkthrough: map. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'map',
  summary: 'The radio station doesn\'t want objects. It wants a line of text per trail. The lodge screen wants names only. Same list, turned into something new: that\'s map.',
  minutes: 10,
  outcomes: [
    'Turn every item into something new with map',
    'Pull one property out of each object',
    'Chain filter and map together',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From objects to what people need',
      steps: [
        {
          title: 'map runs a function on every item',
          body: 'Whatever your function returns becomes the item in a new array. Same length as before, one result per item.',
          code: 'const names = trails.map((trail) => trail.name);\n// ["Schoolhouse", "Bluebird", "The Chute"]',
          language: 'javascript',
        },
        {
          title: 'Build text for each one',
          body: 'Return a template literal and you get a list of sentences.',
          code: 'const lines = trails.map((trail) => `${trail.name}: ${trail.level}`);\n// ["Schoolhouse: green", "Bluebird: blue", ...]',
          language: 'javascript',
        },
        {
          title: 'Numbers work too',
          body: 'Holiday pricing: every price plus $5.',
          code: 'const prices = [59, 39, 29];\nconst holiday = prices.map((p) => p + 5);   // [64, 44, 34]',
          language: 'javascript',
        },
        {
          title: 'Chain: filter, then map',
          body: 'filter keeps the open trails, map turns them into names, join makes one string. Read it left to right.',
          code: 'const openNames = trails\n  .filter((t) => t.open)\n  .map((t) => t.name)\n  .join(", ");',
          language: 'javascript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Same list, new shape',
      code: 'const trails = [\n  { name: "Schoolhouse", level: "green", open: true },\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "The Chute", level: "black", open: false },\n];\n\nconsole.log(trails.map((trail) => trail.name));\n\nconst openNames = trails\n  .filter((t) => t.open)\n  .map((t) => t.name)\n  .join(", ");\nconsole.log(`Open: ${openNames}`);\n',
      caption: 'map never changes trails. It builds a new array.',
      challenge: 'Make a list of lines like "BLUE: Bluebird" with map and .toUpperCase().',
    },
  ],
  apply: {
    scenario: 'Reshaping the trail list for everyone.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const prices = [59, 39];\nconst doubled = prices.map((p) => p * 2);\nconsole.log(doubled.join(","));',
        language: 'javascript',
        options: [
          { text: '59,39', why: 'map returns the doubled values.' },
          { text: '118,78' },
          { text: '196', why: 'map makes one result per item; it doesn\'t add them up.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'map or filter?',
        groups: ['map', 'filter'],
        items: [
          { text: 'Get just the names of every trail', group: 0 },
          { text: 'Keep only the open trails', group: 1 },
          { text: 'Add $5 to every price', group: 0 },
          { text: 'Keep only waits over 10 minutes', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Use map to make const names, an array of every lift\'s name. Print names.join(", ").',
        starter: 'const lifts = [\n  { name: "Old Blue", wait: 12 },\n  { name: "Ridge T-Bar", wait: 0 },\n  { name: "Bunny Carpet", wait: 3 },\n];\n',
        solution: 'const lifts = [\n  { name: "Old Blue", wait: 12 },\n  { name: "Ridge T-Bar", wait: 0 },\n  { name: "Bunny Carpet", wait: 3 },\n];\n\nconst names = lifts.map((lift) => lift.name);\nconsole.log(names.join(", "));\n',
        hint: 'const names = lifts.map((lift) => lift.name);',
        checks: [
          { message: 'Print Old Blue, Ridge T-Bar, Bunny Carpet', outputEquals: 'Old Blue, Ridge T-Bar, Bunny Carpet' },
          { message: 'names is an array of 3 strings', expr: 'Array.isArray(names) && names.length === 3 && names[2] === "Bunny Carpet"' },
          { message: 'Use map', codeIncludes: '.map(' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'trails has 14 items. How many does trails.map((t) => t.name) have?',
        options: [
          { text: 'Only the open ones', why: 'map doesn\'t drop anything. That\'s filter\'s job.' },
          { text: '1', why: 'map returns one item per item.' },
          { text: '14' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make one line of text per trail.',
        template: 'const lines = trails.[[1]]((t) => `${t.[[2]]}: ${t.level}`);',
        blanks: [['map'], ['name']],
        distractors: ['filter', 'forEach', 'trail'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Holiday prices: use map to add 5 to every price. Print the new array joined with ", ".',
        starter: 'const prices = [59, 39, 29];\n',
        solution: 'const prices = [59, 39, 29];\nconst holiday = prices.map((p) => p + 5);\nconsole.log(holiday.join(", "));\n',
        hint: 'const holiday = prices.map((p) => p + 5);',
        checks: [
          { message: 'Print 64, 44, 34', outputEquals: '64, 44, 34' },
          { message: 'prices is unchanged', expr: 'prices.join() === "59,39,29"' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'names is full of undefined. Which line is the problem?',
        lines: ['const names = trails.map((trail) => {', '  trail.name;', '});'],
        bug: 1,
        fix: '  return trail.name;',
        explanation: 'With braces, the function must return. Drop the braces, or add return.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Chain filter, map and join: print exactly Open: Schoolhouse, Bluebird',
        starter: 'const trails = [\n  { name: "Schoolhouse", open: true },\n  { name: "Bluebird", open: true },\n  { name: "The Chute", open: false },\n];\n',
        solution: 'const trails = [\n  { name: "Schoolhouse", open: true },\n  { name: "Bluebird", open: true },\n  { name: "The Chute", open: false },\n];\n\nconst openNames = trails\n  .filter((t) => t.open)\n  .map((t) => t.name)\n  .join(", ");\n\nconsole.log(`Open: ${openNames}`);\n',
        hint: 'trails.filter((t) => t.open).map((t) => t.name).join(", ")',
        checks: [
          { message: 'Print Open: Schoolhouse, Bluebird', outputEquals: 'Open: Schoolhouse, Bluebird' },
          { message: 'Use filter', codeIncludes: '.filter(' },
          { message: 'Use map', codeIncludes: '.map(' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the chain in the right order to get open trail names as one string.',
        lines: ['trails', '  .filter((t) => t.open)', '  .map((t) => t.name)', '  .join(", ");'],
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which array method turns every item into something new, keeping the same length?',
        answers: ['map', 'map()', '.map()'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Where do you turn one list into another: a guest list into name tags, receipts into totals, contacts into emails?',
    starters: ['I turn ... into...', 'list.map((x) => ...)'],
  },
  deepen: {
    title: 'forEach',
    summary: 'You\'ll see trails.forEach((t) => console.log(t.name)). It runs a function on each item but returns nothing. It\'s a loop in method form; for...of does the same job and is easier to stop early. Use map when you want a new array back.',
  },
  notes: 'Array.prototype.map, forEach: MDN. Method chaining.',
};

export default lesson;
