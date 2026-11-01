import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Tap to explore: looping through an array of objects, and Object.keys. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Looping through objects',
  summary: 'The trail report again, but every line now knows each trail\'s level and whether it\'s open. One loop, every object, every fact.',
  minutes: 10,
  outcomes: [
    'Loop through an array of objects with for...of',
    'Use each object\'s properties inside the loop',
    'List an object\'s keys with Object.keys',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The new report',
      text: 'Nora writes for (const trail of trails) and inside it console.log(`${trail.name} (${trail.level}): ${trail.open ? "open" : "closed"}`). For the lodge\'s info screen she also uses Object.keys(trail) to list every fact a trail has.',
      hotspots: [
        { phrase: 'for (const trail of trails)', note: 'Same loop as Chapter 4. The difference: each trail is now an object, not just a name.' },
        { phrase: 'trail.name', note: 'Inside the loop, trail is one object, so a dot reads its facts. First time round it\'s the first trail, then the next.' },
        { phrase: 'trail.open ? "open" : "closed"', note: 'The ternary from Chapter 2 turns true/false into a word people can read.' },
        { phrase: 'Object.keys(trail)', note: 'Gives an array of the object\'s keys: ["name", "level", "open"]. Handy for showing every fact without naming each one.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Every trail, every fact',
      code: 'const trails = [\n  { name: "Schoolhouse", level: "green", open: true },\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "The Chute", level: "black", open: false },\n];\n\nfor (const trail of trails) {\n  console.log(`${trail.name} (${trail.level}): ${trail.open ? "open" : "closed"}`);\n}\n\nconsole.log(Object.keys(trails[0]));\n',
      caption: 'One loop, and each line reads three facts from one object.',
      challenge: 'Only print the trails that are open, with an if inside the loop.',
    },
  ],
  apply: {
    scenario: 'The new trail report.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const lifts = [{ name: "Old Blue" }, { name: "Bunny Carpet" }];\nfor (const lift of lifts) {\n  console.log(lift.name);\n}',
        language: 'javascript',
        options: [
          { text: 'Old Blue\nBunny Carpet' },
          { text: '[object Object]', why: 'lift.name reads the text inside each object.' },
          { text: 'name\nname', why: 'The value is printed, not the key.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Loop through lifts and print each as name: wait min (e.g. Old Blue: 12 min).',
        starter: 'const lifts = [\n  { name: "Old Blue", wait: 12 },\n  { name: "Ridge T-Bar", wait: 0 },\n  { name: "Bunny Carpet", wait: 3 },\n];\n',
        solution: 'const lifts = [\n  { name: "Old Blue", wait: 12 },\n  { name: "Ridge T-Bar", wait: 0 },\n  { name: "Bunny Carpet", wait: 3 },\n];\n\nfor (const lift of lifts) {\n  console.log(`${lift.name}: ${lift.wait} min`);\n}\n',
        hint: 'for (const lift of lifts) { console.log(`${lift.name}: ${lift.wait} min`); }',
        checks: [
          { message: 'Print all three lines', outputEquals: 'Old Blue: 12 min\nRidge T-Bar: 0 min\nBunny Carpet: 3 min' },
          { message: 'Use a loop', codeIncludes: ' of lifts' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Print only the open trails.',
        template: 'for (const trail of trails) {\n  if ([[1]].open) {\n    console.log(trail.[[2]]);\n  }\n}',
        blanks: [['trail'], ['name']],
        distractors: ['trails', 'open', 'trails[0]'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'Every line says "undefined (undefined)". Which line is wrong?',
        lines: ['for (const trail of trails) {', '  console.log(`${trails.name} (${trails.level})`);', '}'],
        bug: 1,
        fix: '  console.log(`${trail.name} (${trail.level})`);',
        explanation: 'Inside the loop, read from trail (one object), not trails (the whole array).',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Count the open trails with a loop over the objects. Print exactly: Open: 2',
        starter: 'const trails = [\n  { name: "Schoolhouse", level: "green", open: true },\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "The Chute", level: "black", open: false },\n];\n',
        solution: 'const trails = [\n  { name: "Schoolhouse", level: "green", open: true },\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "The Chute", level: "black", open: false },\n];\n\nlet openCount = 0;\nfor (const trail of trails) {\n  if (trail.open) {\n    openCount++;\n  }\n}\n\nconsole.log(`Open: ${openCount}`);\n',
        hint: 'let openCount = 0; then if (trail.open) { openCount++; }',
        checks: [
          { message: 'Print Open: 2', outputEquals: 'Open: 2' },
          { message: 'Read trail.open in the loop', codeIncludes: 'trail.open' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const t = { name: "Bluebird", level: "blue" };\nconsole.log(Object.keys(t).length);',
        language: 'javascript',
        options: [
          { text: '1', why: 'There are two keys: name and level.' },
          { text: '8', why: 'It counts keys, not letters.' },
          { text: '2' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Inside for (const trail of trails), what is each?',
        groups: ['The whole list', 'One object', 'One fact'],
        items: [
          { text: 'trails', group: 0 },
          { text: 'trail', group: 1 },
          { text: 'trail.level', group: 2 },
          { text: 'trails.length', group: 0 },
          { text: 'trail.open', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print each trail\'s report line: name (level): open or closed. Use a ternary for the last part.',
        starter: 'const trails = [\n  { name: "Schoolhouse", level: "green", open: true },\n  { name: "The Chute", level: "black", open: false },\n];\n',
        solution: 'const trails = [\n  { name: "Schoolhouse", level: "green", open: true },\n  { name: "The Chute", level: "black", open: false },\n];\n\nfor (const trail of trails) {\n  console.log(`${trail.name} (${trail.level}): ${trail.open ? "open" : "closed"}`);\n}\n',
        hint: '${trail.open ? "open" : "closed"}',
        checks: [
          { message: 'Print both report lines', outputEquals: 'Schoolhouse (green): open\nThe Chute (black): closed' },
          { message: 'Use a ternary', codeIncludes: '?' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which built-in gives you an array of an object\'s keys? (Object.???)',
        answers: ['keys', 'Object.keys'],
        placeholder: 'Object.???',
      },
      {
        kind: 'chatReply',
        prompt: 'The lodge manager calls. Pick Nora\'s reply.',
        from: 'mags',
        message: 'The lodge screen wants the levels too now, so beginners stay off the blacks. Big job?',
        options: [
          { text: 'One change to the loop\'s line. Every trail already carries its level' },
          { text: 'I\'ll need a new list of levels', why: 'The level is already inside each object.' },
          { text: 'Beginners should just know', why: 'The Chute family didn\'t. Showing the level helps.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a list of things you\'d want to see one line each, with two or three facts per line. What would the line look like?',
    starters: ['Each line would say...', '${item.name}: ...'],
  },
  deepen: {
    title: 'for...in and Object.entries',
    summary: 'for (const key in trail) loops over an object\'s keys, and Object.entries(trail) gives [key, value] pairs. They\'re useful for one object\'s facts. For lists of objects, for...of plus a dot (what you did here) is the everyday tool.',
  },
  notes: 'Object.keys, Object.entries, for...in: MDN.',
};

export default lesson;
