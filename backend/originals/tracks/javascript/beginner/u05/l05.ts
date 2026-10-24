import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 — Checkpoint. Reviews lessons 1–4: objects, dot and brackets, arrays of objects, looping. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the patrol radio',
  summary: 'Monday 28 December, 2:40 p.m. Wind is closing the upper mountain one trail at a time, and every patrol radio wants the current list. Nora updates the objects as the calls come in.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Change objects inside a list as things happen', 'Report from a list of objects'],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 2:40 p.m.',
      beats: [
        { speaker: 'rafa', text: 'Ridgeline closing. Rattlesnake next. Wind\'s gusting forty up top.' },
        { speaker: 'nora', text: 'Ridgeline, open false. Done. The board, the lodge and the website all read the same list.' },
        { speaker: 'rafa', text: 'And what\'s still open on the blacks?' },
        { speaker: 'nora', text: 'Give me one loop.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: closing the upper mountain.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const trail = { name: "Ridgeline", level: "black", open: true };\ntrail.open = false;\nconsole.log(trail.open);',
        language: 'javascript',
        options: [
          { text: 'true', why: 'The second line changed it.' },
          { text: 'false' },
          { text: 'An error', why: 'Changing a property of a const object is allowed.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Ridgeline (index 1) closes. Set its open to false, then print exactly: Ridgeline: closed',
        starter: 'const trails = [\n  { name: "Rattlesnake", level: "black", open: true },\n  { name: "Ridgeline", level: "black", open: true },\n];\n',
        solution: 'const trails = [\n  { name: "Rattlesnake", level: "black", open: true },\n  { name: "Ridgeline", level: "black", open: true },\n];\n\ntrails[1].open = false;\nconsole.log(`${trails[1].name}: ${trails[1].open ? "open" : "closed"}`);\n',
        hint: 'trails[1].open = false;',
        checks: [
          { message: 'Print Ridgeline: closed', outputEquals: 'Ridgeline: closed' },
          { message: 'Ridgeline is closed in the list', expr: 'trails[1].open === false' },
          { message: 'Rattlesnake is still open', expr: 'trails[0].open === true' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'With const t = { name: "Bluebird", level: "blue" }, match each to its value.',
        pairs: [
          ['t.name', 'Bluebird'],
          ['t["level"]', 'blue'],
          ['t.open', 'undefined'],
          ['Object.keys(t).length', '2'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This prints undefined. Which line?',
        lines: ['const trails = [{ name: "Big Sky", open: true }];', 'console.log(trails.open);'],
        bug: 1,
        fix: 'console.log(trails[0].open);',
        explanation: 'Pick the object out of the array first, then read its property.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Make a trail object.',
        template: 'const trail = [[1]] name: "Lone Pine", level[[2]] "blue" };',
        blanks: [['{'], [':']],
        distractors: ['[', '=', '('],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the names of the black trails that are still open, one per line, using a loop and an if with &&.',
        starter: 'const trails = [\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "Rattlesnake", level: "black", open: true },\n  { name: "Ridgeline", level: "black", open: false },\n  { name: "Hermit Glade", level: "black", open: true },\n];\n',
        solution: 'const trails = [\n  { name: "Bluebird", level: "blue", open: true },\n  { name: "Rattlesnake", level: "black", open: true },\n  { name: "Ridgeline", level: "black", open: false },\n  { name: "Hermit Glade", level: "black", open: true },\n];\n\nfor (const trail of trails) {\n  if (trail.level === "black" && trail.open) {\n    console.log(trail.name);\n  }\n}\n',
        hint: 'if (trail.level === "black" && trail.open) { console.log(trail.name); }',
        checks: [
          { message: 'Print Rattlesnake and Hermit Glade', outputEquals: 'Rattlesnake\nHermit Glade' },
          { message: 'Use &&', codeIncludes: '&&' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a list of objects safer than three lists that line up by position?',
        options: [
          { text: 'It uses less memory', why: 'That\'s not the reason.' },
          { text: 'Each trail\'s facts stay together, even when the list is sorted or changed' },
          { text: 'JavaScript doesn\'t allow three lists', why: 'It does. They just drift apart.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'What is each one?',
        groups: ['An array', 'An object', 'A single value'],
        items: [
          { text: '[{ name: "Bluebird" }]', group: 0 },
          { text: '{ name: "Bluebird" }', group: 1 },
          { text: '"Bluebird"', group: 2 },
          { text: 'trails[0]', group: 1 },
          { text: 'trails[0].name', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write function closeTrail(trail) that sets trail.open to false. Call it on trails[0] and print trails[0].open.',
        starter: 'const trails = [{ name: "Rattlesnake", level: "black", open: true }];\n',
        solution: 'const trails = [{ name: "Rattlesnake", level: "black", open: true }];\n\nfunction closeTrail(trail) {\n  trail.open = false;\n}\n\ncloseTrail(trails[0]);\nconsole.log(trails[0].open);\n',
        hint: 'function closeTrail(trail) { trail.open = false; }',
        checks: [
          { message: 'Print false', outputEquals: 'false' },
          { message: 'closeTrail works on any trail', expr: '(() => { const t = { open: true }; closeTrail(t); return t.open === false; })()' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In trails[2].level, what is 2 called?',
        answers: ['index', 'the index', 'an index', 'position'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa checks in. Pick Nora\'s reply.',
        from: 'rafa',
        message: 'Upper mountain\'s shut. Does the website know?',
        options: [
          { text: 'It reads the same list I just changed, so yes, everywhere at once' },
          { text: 'I\'ll update it tonight', why: 'No need: the website reads the same objects.' },
          { text: 'Only if someone refreshes the radio', why: 'The radio isn\'t involved. The list is.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You changed facts inside objects as calls came in. What in your life gets updated like that: a shared calendar, an order status, a team board?',
    starters: ['We update...', 'Everyone reads the same...'],
  },
  notes: 'Checkpoint for u05 lessons 1–4. Mon 28 Dec 2026. Objects passed to functions are shared references (MDN "Working with objects").',
};

export default lesson;
