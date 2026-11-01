import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Myth or Fact: find, some and every. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'find, some and every',
  summary: 'Three questions arrive at once. "Tell me about Lone Pine." "Is any black run open?" "Is every green groomed?" Each one has its own array method.',
  minutes: 10,
  outcomes: [
    'Get the first matching object with find',
    'Ask "is there at least one?" with some',
    'Ask "are they all?" with every',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'trails.find((t) => t.name === "Lone Pine") gives back an array with Lone Pine in it.',
          isFact: false,
          explain: 'find gives back the first matching ITEM itself (the object), not an array. If nothing matches, it gives undefined.',
        },
        {
          text: 'trails.some((t) => t.level === "black" && t.open) is true if at least one black trail is open.',
          isFact: true,
          explain: 'some answers "is there at least one?" with true or false. It stops looking as soon as it finds one.',
        },
        {
          text: 'every is true only if the test passes for every single item.',
          isFact: true,
          explain: 'One failure and every is false. "Is every green groomed?" is every((t) => t.groomed) on the greens.',
        },
        {
          text: 'filter and find do exactly the same thing.',
          isFact: false,
          explain: 'filter returns ALL matches in an array. find returns only the FIRST match, as the item itself. Use find when you expect one answer.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Three questions',
      code: 'const trails = [\n  { name: "Schoolhouse", level: "green", open: true, groomed: true },\n  { name: "Lazy Elk", level: "green", open: true, groomed: true },\n  { name: "Lone Pine", level: "blue", open: true, groomed: true },\n  { name: "Rattlesnake", level: "black", open: true, groomed: false },\n  { name: "The Chute", level: "black", open: false, groomed: false },\n];\n\nconst lonePine = trails.find((t) => t.name === "Lone Pine");\nconsole.log(lonePine.level);\n\nconsole.log(trails.some((t) => t.level === "black" && t.open));\n\nconst greens = trails.filter((t) => t.level === "green");\nconsole.log(greens.every((t) => t.groomed));\n',
      caption: 'find gives an object. some and every give true or false.',
      challenge: 'Try find with a name that isn\'t there, like "Powder Bowl". What comes back?',
    },
  ],
  apply: {
    scenario: 'Three questions, three methods.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each method to what it gives back.',
        pairs: [
          ['find', 'The first matching item, or undefined'],
          ['filter', 'An array of every match'],
          ['some', 'true if at least one matches'],
          ['every', 'true only if all match'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const waits = [12, 0, 3];\nconsole.log(waits.some((w) => w > 10));',
        language: 'javascript',
        options: [
          { text: 'true' },
          { text: 'false', why: '12 is over 10, so at least one matches.' },
          { text: '12', why: 'some answers true or false. find would give 12.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const waits = [12, 0, 3];\nconsole.log(waits.every((w) => w > 1));',
        language: 'javascript',
        options: [
          { text: 'true', why: '0 is not over 1, so not every wait passes.' },
          { text: '[12, 3]', why: 'That would be filter.' },
          { text: 'false' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Use find to get the trail named "Lone Pine", store it in const trail, and print trail.level.',
        starter: 'const trails = [\n  { name: "Bluebird", level: "blue" },\n  { name: "Lone Pine", level: "blue" },\n  { name: "Ridgeline", level: "black" },\n];\n',
        solution: 'const trails = [\n  { name: "Bluebird", level: "blue" },\n  { name: "Lone Pine", level: "blue" },\n  { name: "Ridgeline", level: "black" },\n];\n\nconst trail = trails.find((t) => t.name === "Lone Pine");\nconsole.log(trail.level);\n',
        hint: 'const trail = trails.find((t) => t.name === "Lone Pine");',
        checks: [
          { message: 'Print blue', outputEquals: 'blue' },
          { message: 'trail is the Lone Pine object', expr: 'trail === trails[1]' },
          { message: 'Use find', codeIncludes: '.find(' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This stops with "Cannot read properties of undefined". Which line is the cause?',
        lines: ['const trail = trails.find((t) => t.name === "Powder Bowl");', 'console.log(trail.level);'],
        bug: 0,
        fix: 'Check if (trail) before reading trail.level',
        explanation: 'There\'s no Powder Bowl, so find returns undefined, and undefined has no .level. Check the result before using it.',
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which method answers each question?',
        groups: ['find', 'some', 'every'],
        items: [
          { text: 'Tell me about Bluebird', group: 0 },
          { text: 'Is any lift on hold?', group: 1 },
          { text: 'Are all the greens open?', group: 2 },
          { text: 'Which rider has bib 13?', group: 0 },
          { text: 'Has anyone waited over 20 minutes?', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print true or false: is ANY black trail open? Use some.',
        starter: 'const trails = [\n  { name: "Rattlesnake", level: "black", open: false },\n  { name: "Ridgeline", level: "black", open: true },\n  { name: "Bluebird", level: "blue", open: true },\n];\n',
        solution: 'const trails = [\n  { name: "Rattlesnake", level: "black", open: false },\n  { name: "Ridgeline", level: "black", open: true },\n  { name: "Bluebird", level: "blue", open: true },\n];\n\nconsole.log(trails.some((t) => t.level === "black" && t.open));\n',
        hint: 'trails.some((t) => t.level === "black" && t.open)',
        checks: [
          { message: 'Print true', outputEquals: 'true' },
          { message: 'Use some', codeIncludes: '.some(' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Is every lift open?',
        template: 'const allOpen = lifts.[[1]]((lift) => lift.status [[2]] "open");',
        blanks: [['every'], ['===']],
        distractors: ['some', '=', 'all'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Write function findTrail(trails, name) that returns the matching trail, or undefined. Print findTrail(trails, "Big Sky").level.',
        starter: 'const trails = [\n  { name: "Big Sky", level: "blue" },\n  { name: "Hermit Glade", level: "black" },\n];\n',
        solution: 'const trails = [\n  { name: "Big Sky", level: "blue" },\n  { name: "Hermit Glade", level: "black" },\n];\n\nfunction findTrail(trails, name) {\n  return trails.find((t) => t.name === name);\n}\n\nconsole.log(findTrail(trails, "Big Sky").level);\n',
        hint: 'return trails.find((t) => t.name === name);',
        checks: [
          { message: 'Print blue', outputEquals: 'blue' },
          { message: 'findTrail finds Hermit Glade', expr: 'findTrail(trails, "Hermit Glade").level === "black"' },
          { message: 'A missing name gives undefined', expr: 'findTrail(trails, "Powder Bowl") === undefined' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does find return when nothing matches?',
        answers: ['undefined'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a "some" question and an "every" question about your week. ("Did I exercise on any day?" "Did I sleep 7 hours every night?")',
    starters: ['Some: ...', 'Every: ...'],
  },
  deepen: {
    title: 'findIndex',
    summary: 'findIndex works like find but gives the position, or -1 if nothing matches, the same way indexOf does. Handy when you want to replace the item at that spot. In Level 3 you\'ll find items by id this way.',
  },
  notes: 'Array.prototype.find, some, every, findIndex: MDN. Accessing a property of undefined throws TypeError "Cannot read properties of undefined" (V8 wording).',
};

export default lesson;
