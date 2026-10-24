import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Before/After: filter. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'filter',
  summary: 'The ski school wants a list of open green trails. The patrol wants open blacks. The groomer wants ungroomed ones. Nora is tired of writing the same loop. Arrays have a tool for "keep only these".',
  minutes: 10,
  outcomes: [
    'Keep only matching items with filter',
    'Write the test as an arrow function',
    'Count matches with filter(...).length',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Open green trails for the ski school',
      before: {
        label: 'A loop, an empty list and push',
        text: 'const greens = [];\nfor (const trail of trails) {\n  if (trail.level === "green" && trail.open) {\n    greens.push(trail);\n  }\n}\n\nFive lines, and you write them again for every new question.',
      },
      after: {
        label: 'filter',
        text: 'const greens = trails.filter(\n  (trail) => trail.level === "green" && trail.open\n);\n\nfilter runs your test on each item and keeps the ones where it returns true. It gives back a NEW array; trails is left alone.',
      },
      notes: [
        'The arrow function is the test: it gets one item and returns true (keep) or false (drop).',
        'filter always returns an array, even if nothing matches: then it\'s [].',
        'Need a count? Add .length: trails.filter((t) => t.open).length.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Keep only these',
      code: 'const trails = [\n  { name: "Schoolhouse", level: "green", open: true },\n  { name: "Old Mill", level: "green", open: false },\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "Rattlesnake", level: "black", open: true },\n  { name: "The Chute", level: "black", open: false },\n];\n\nconst openGreens = trails.filter((trail) => trail.level === "green" && trail.open);\nconsole.log(openGreens.length);\nconsole.log(openGreens[0].name);\n\nconst closed = trails.filter((trail) => !trail.open);\nconsole.log(`${closed.length} closed`);\n',
      caption: 'Each filter is one line that reads like the question.',
      challenge: 'Filter the open black trails and print how many there are.',
    },
  ],
  apply: {
    scenario: 'Everyone wants a different list.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const waits = [12, 0, 3, 22];\nconst long = waits.filter((w) => w > 10);\nconsole.log(long.length);',
        language: 'javascript',
        options: [
          { text: '2' },
          { text: '4', why: 'filter keeps only the waits over 10: 12 and 22.' },
          { text: '34', why: 'filter keeps items, it doesn\'t add them.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Keep only the open trails.',
        template: 'const open = trails.[[1]]((trail) [[2]] trail.open);',
        blanks: [['filter'], ['=>']],
        distractors: ['find', 'map', '->'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Use filter to make const blacks with only the black trails. Print blacks.length.',
        starter: 'const trails = [\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "Rattlesnake", level: "black", open: true },\n  { name: "The Chute", level: "black", open: false },\n];\n',
        solution: 'const trails = [\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "Rattlesnake", level: "black", open: true },\n  { name: "The Chute", level: "black", open: false },\n];\n\nconst blacks = trails.filter((trail) => trail.level === "black");\nconsole.log(blacks.length);\n',
        hint: 'const blacks = trails.filter((trail) => trail.level === "black");',
        checks: [
          { message: 'Print 2', outputEquals: '2' },
          { message: 'blacks holds the black trails', expr: 'blacks.every((t) => t.level === "black") && blacks.length === 2' },
          { message: 'Use filter', codeIncludes: '.filter(' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'After const open = trails.filter((t) => t.open), what happened to trails?',
        options: [
          { text: 'It lost its closed trails', why: 'filter makes a new array. The original is untouched.' },
          { text: 'Nothing. filter made a new array' },
          { text: 'It was sorted', why: 'filter doesn\'t change the order either.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'filter returns an empty list. Which line is wrong?',
        lines: ['const open = trails.filter((trail) => {', '  trail.open;', '});'],
        bug: 1,
        fix: '  return trail.open;',
        explanation: 'With braces, the test must return. Without return, every test gives undefined (falsy), so nothing is kept.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'In one line, print how many trails are closed: filter with !trail.open, then .length.',
        starter: 'const trails = [\n  { name: "Schoolhouse", open: true },\n  { name: "Old Mill", open: false },\n  { name: "The Chute", open: false },\n];\n',
        solution: 'const trails = [\n  { name: "Schoolhouse", open: true },\n  { name: "Old Mill", open: false },\n  { name: "The Chute", open: false },\n];\n\nconsole.log(trails.filter((trail) => !trail.open).length);\n',
        hint: 'console.log(trails.filter((trail) => !trail.open).length);',
        checks: [
          { message: 'Print 2', outputEquals: '2' },
          { message: 'Use filter and .length', codeIncludes: ').length' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which filter answers each question?',
        groups: ['(t) => t.open', '(t) => !t.groomed', '(t) => t.level === "green"'],
        items: [
          { text: 'Which trails can I ski right now?', group: 0 },
          { text: 'What does the groomer still need to do?', group: 1 },
          { text: 'Where can beginners go?', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write function byLevel(trails, level) that returns only the trails of that level. Print byLevel(trails, "blue").length.',
        starter: 'const trails = [\n  { name: "Bluebird", level: "blue" },\n  { name: "Big Sky", level: "blue" },\n  { name: "Schoolhouse", level: "green" },\n];\n',
        solution: 'const trails = [\n  { name: "Bluebird", level: "blue" },\n  { name: "Big Sky", level: "blue" },\n  { name: "Schoolhouse", level: "green" },\n];\n\nfunction byLevel(trails, level) {\n  return trails.filter((trail) => trail.level === level);\n}\n\nconsole.log(byLevel(trails, "blue").length);\n',
        hint: 'return trails.filter((trail) => trail.level === level);',
        checks: [
          { message: 'Print 2', outputEquals: '2' },
          { message: 'byLevel(trails, "green") has 1 trail', expr: 'byLevel(trails, "green").length === 1' },
          { message: 'byLevel(trails, "black") is empty', expr: 'byLevel(trails, "black").length === 0' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does filter return when no item passes the test? Answer in words.',
        answers: ['an empty array', 'empty array', 'empty list', 'an empty list'],
        placeholder: 'An ... array',
      },
      {
        kind: 'chatReply',
        prompt: 'The ski school calls. Pick Nora\'s reply.',
        from: 'mags',
        message: 'Ski school says: which greens are open for the 10 a.m. lesson?',
        options: [
          { text: 'Two: Schoolhouse and Lazy Elk. One filter, so I can answer the next question just as fast' },
          { text: 'All of them', why: 'Old Mill is closed. The filter knows.' },
          { text: 'Let me loop through and push for ten minutes', why: 'One filter line does it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What question would you ask a list in your life with filter: emails from your boss, expenses over $50, songs under 3 minutes?',
    starters: ['emails.filter((e) => ...)', 'I\'d filter for...'],
  },
  deepen: {
    title: 'Methods that take functions',
    summary: 'filter is the first of a family: map, find, some, every, sort and reduce all take a small function. That\'s why arrow functions exist. Once one clicks, the rest are the same idea.',
  },
  notes: 'Array.prototype.filter: MDN (returns a new array).',
};

export default lesson;
