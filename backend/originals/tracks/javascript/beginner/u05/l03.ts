import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Chat with Tey: arrays of objects. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Lists of objects',
  summary: 'One object per trail is great. Fourteen loose objects is not. Tey shows Nora the shape almost every app\'s data has: a list of objects.',
  minutes: 10,
  outcomes: [
    'Store many objects in one array',
    'Reach a property with trails[0].name',
    'Add a new object to the list with push',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Nora has an object for Bluebird and one for The Chute. Twelve more to go. Where do they all live?',
          replies: ['In an array?'],
        },
        {
          tey: 'Yes. An array where every item is an object: const trails = [ { name: "Bluebird", level: "blue" }, { name: "The Chute", level: "black" } ]. A list of things, each with labelled facts.',
          replies: ['How do I get The Chute\'s level?'],
        },
        {
          tey: 'Two steps, left to right. trails[1] is The Chute\'s object. Then .level reads inside it: trails[1].level is "black".',
          replies: ['And sorting can\'t break it now?'],
        },
        {
          tey: 'Right. Sort the array and each object moves as one piece, with its level inside. Shopping carts, chat messages, sports results: almost every app\'s data looks like this.',
          replies: ['Got it'],
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Three trails, one list',
      code: 'const trails = [\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "The Chute", level: "black", open: false },\n  { name: "Schoolhouse", level: "green", open: true },\n];\n\nconsole.log(trails.length);\nconsole.log(trails[1].name);\nconsole.log(trails[1].level);\n\ntrails.push({ name: "Lone Pine", level: "blue", open: true });\nconsole.log(trails.length);\n',
      caption: 'Index first to pick the object, then a dot to look inside it.',
      challenge: 'Print the name of the last trail using trails.length - 1.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Keep every object in a list the same shape: the same keys, in the same order. Code that loops over them can then trust every trail has a name, a level and an open.',
    },
  ],
  apply: {
    scenario: 'All the trails, in one list.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const lifts = [\n  { name: "Old Blue", wait: 12 },\n  { name: "Bunny Carpet", wait: 3 },\n];\nconsole.log(lifts[1].wait);',
        language: 'javascript',
        options: [
          { text: '12', why: 'That\'s lifts[0].wait.' },
          { text: '3' },
          { text: 'Bunny Carpet', why: 'That\'s lifts[1].name.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Print the first trail\'s name.',
        template: 'console.log(trails[[1]]0[[2]][[3]]name);',
        blanks: [['['], [']'], ['.']],
        distractors: ['(', ')', '{'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the level of the second trail (The Chute).',
        starter: 'const trails = [\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "The Chute", level: "black", open: false },\n];\n',
        solution: 'const trails = [\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "The Chute", level: "black", open: false },\n];\n\nconsole.log(trails[1].level);\n',
        hint: 'console.log(trails[1].level);',
        checks: [
          { message: 'Print black', outputEquals: 'black' },
          { message: 'Read it from the array', codeIncludes: 'trails[1]' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This prints undefined. Which line?',
        lines: ['const trails = [{ name: "Bluebird", level: "blue" }];', 'console.log(trails.name);'],
        bug: 1,
        fix: 'console.log(trails[0].name);',
        explanation: 'trails is the array. The array has no name; the object inside it does. Pick the object first: trails[0].',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Push a new trail object { name: "Big Sky", level: "blue", open: true } onto trails, then print trails.length.',
        starter: 'const trails = [\n  { name: "Bluebird", level: "blue", open: true },\n];\n',
        solution: 'const trails = [\n  { name: "Bluebird", level: "blue", open: true },\n];\n\ntrails.push({ name: "Big Sky", level: "blue", open: true });\nconsole.log(trails.length);\n',
        hint: 'trails.push({ name: "Big Sky", level: "blue", open: true });',
        checks: [
          { message: 'Print 2', outputEquals: '2' },
          { message: 'Big Sky is the last trail', expr: 'trails[1].name === "Big Sky" && trails[1].open === true' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'With the two-lift list above (Old Blue 12, Bunny Carpet 3), match each to its value.',
        pairs: [
          ['lifts.length', '2'],
          ['lifts[0].name', 'Old Blue'],
          ['lifts[0].wait', '12'],
          ['lifts[2]', 'undefined'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t sorting mix up a trail\'s level any more?',
        options: [
          { text: 'Each object moves as one piece, with its level inside' },
          { text: 'Arrays of objects can\'t be sorted', why: 'They can. That\'s fine now.' },
          { text: 'JavaScript checks the levels', why: 'Nothing checks them. They just stay together.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Change The Chute (index 1) to open: true, then print exactly: The Chute is open: true',
        starter: 'const trails = [\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "The Chute", level: "black", open: false },\n];\n',
        solution: 'const trails = [\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "The Chute", level: "black", open: false },\n];\n\ntrails[1].open = true;\nconsole.log(`${trails[1].name} is open: ${trails[1].open}`);\n',
        hint: 'trails[1].open = true;',
        checks: [
          { message: 'Print The Chute is open: true', outputEquals: 'The Chute is open: true' },
          { message: 'The object changed', expr: 'trails[1].open === true' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'trails[3].name: which comes first, picking the object or reading the property? (one word: object or property)',
        answers: ['object', 'the object', 'picking the object'],
        placeholder: 'object or property',
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa approves. Pick Nora\'s reply.',
        from: 'rafa',
        message: 'One list of objects. This is how the real apps I tested in Denver stored everything.',
        options: [
          { text: 'Then the next step is going through them all at once, like the trail report' },
          { text: 'So I\'m done learning?', why: 'Now she can loop over objects, filter them and more.' },
          { text: 'I\'ll go back to three lists', why: 'That\'s how The Chute ended up green.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of an app you use: messages, a shopping cart, a playlist. What would one object in its list look like?',
    starters: ['Each item would have...', '{ title: ..., ... }'],
  },
  deepen: {
    title: 'This is JSON',
    summary: 'A list of objects written out as text is almost exactly JSON, the format most websites use to send data. In Level 3, Nora loads the real championship results as JSON from a server, and they arrive as a list of objects like this one.',
  },
  notes: 'Arrays of objects: MDN "Working with objects", "Array". JSON relation: MDN "JSON".',
};

export default lesson;
