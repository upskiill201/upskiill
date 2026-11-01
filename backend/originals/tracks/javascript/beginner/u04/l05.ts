import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint. Reviews lessons 1–4: arrays, indexes, push/pop/includes/indexOf, for...of. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the morning sweep',
  summary: 'Wednesday 23 December, 7:15 a.m. Rafa\'s radio is dead. The morning sweep has to come from Nora\'s screen, trail by trail, with the patrol listening.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Build and change an array of trails', 'Loop through it to make a report'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 7:15 a.m.',
      beats: [
        { speaker: 'rafa', text: 'Battery\'s frozen. No radio until it warms up. You read the sweep from the screen.' },
        { speaker: 'nora', text: 'The list is in an array. I loop through it, one trail per line.' },
        { speaker: 'rafa', text: 'And when someone calls a trail open while you\'re reading?' },
        { speaker: 'nora', text: 'Push it on. The next loop picks it up.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the sweep, from Nora\'s screen.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const trails = ["Bluebird", "Big Sky", "Lone Pine"];\nconsole.log(trails[2]);',
        language: 'javascript',
        options: [
          { text: 'Big Sky', why: 'That\'s index 1.' },
          { text: 'Lone Pine' },
          { text: 'undefined', why: 'Index 2 is the third item, and it exists.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make const sweep = ["Schoolhouse", "Lazy Elk", "Bluebird"]. Push "Big Sky". Then loop and print each as Clear: name.',
        starter: '',
        solution: 'const sweep = ["Schoolhouse", "Lazy Elk", "Bluebird"];\nsweep.push("Big Sky");\n\nfor (const trail of sweep) {\n  console.log(`Clear: ${trail}`);\n}\n',
        hint: 'sweep.push("Big Sky"); then for (const trail of sweep) { ... }',
        checks: [
          { message: 'Print four Clear lines, in order', outputEquals: 'Clear: Schoolhouse\nClear: Lazy Elk\nClear: Bluebird\nClear: Big Sky' },
          { message: 'sweep has 4 trails', expr: 'sweep.length === 4' },
          { message: 'Loop with for...of', codeIncludes: ' of sweep' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'const open = ["Schoolhouse", "Bluebird"]. Match each to its value.',
        pairs: [
          ['open.length', '2'],
          ['open[0]', 'Schoolhouse'],
          ['open.includes("Bluebird")', 'true'],
          ['open.indexOf("Ridgeline")', '-1'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Rafa hears "undefined" on the report. Which line is wrong?',
        lines: ['const trails = ["Bluebird", "Big Sky"];', 'console.log(trails[trails.length]);'],
        bug: 1,
        fix: 'console.log(trails[trails.length - 1]);',
        explanation: 'length is 2, but the last index is 1. Use length - 1.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Remove the last trail, then check the list.',
        template: 'const closed = trails.[[1]]();\nconsole.log(trails.[[2]]("Big Sky"));',
        blanks: [['pop'], ['includes']],
        distractors: ['push', 'remove', 'has'],
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'What kind of value does each give?',
        groups: ['A number', 'true/false', 'A trail name'],
        items: [
          { text: 'trails.length', group: 0 },
          { text: 'trails.includes("Bluebird")', group: 1 },
          { text: 'trails[0]', group: 2 },
          { text: 'trails.indexOf("Bluebird")', group: 0 },
          { text: 'trails.pop()', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write function isOnList(name) that returns true if name is in the open array. Print isOnList("Ridgeline").',
        starter: 'const open = ["Schoolhouse", "Bluebird", "Rattlesnake"];\n',
        solution: 'const open = ["Schoolhouse", "Bluebird", "Rattlesnake"];\n\nfunction isOnList(name) {\n  return open.includes(name);\n}\n\nconsole.log(isOnList("Ridgeline"));\n',
        hint: 'return open.includes(name);',
        checks: [
          { message: 'Print false', outputEquals: 'false' },
          { message: 'isOnList("Bluebird") is true', expr: 'isOnList("Bluebird") === true' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const lifts = ["Old Blue", "Bunny Carpet"];\nlifts.push("Ridge T-Bar");\nfor (const lift of lifts) {\n  console.log(lift[0]);\n}',
        language: 'javascript',
        options: [
          { text: 'Old Blue\nBunny Carpet\nRidge T-Bar', why: 'lift[0] is the first character of each name.' },
          { text: 'O\nB\nR' },
          { text: 'Old Blue', why: 'The loop runs once per lift.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps of the morning report.',
        lines: [
          'const open = ["Schoolhouse"];',
          'open.push("Bluebird");',
          'for (const trail of open) {',
          '  console.log(`Open: ${trail}`);',
          '}',
        ],
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'An array has 4 items. What index does the first one have?',
        answers: ['0', 'zero'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        prompt: 'The radio crackles back. Pick Nora\'s reply.',
        from: 'rafa',
        message: 'Radio\'s back. Do we still need your screen?',
        options: [
          { text: 'Keep both. The list on screen updates itself, and the radio reads it out' },
          { text: 'No, delete the array', why: 'The list is what everything else will be built on.' },
          { text: 'Only on Tuesdays', why: 'The sweep happens every day.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You can now handle a list of any length with a few lines. What list in your life would you loop through first?',
    starters: ['I\'d loop through...', 'For each one I\'d...'],
  },
  notes: 'Checkpoint for u04 lessons 1–4. Wed 23 Dec 2026.',
};

export default lesson;
