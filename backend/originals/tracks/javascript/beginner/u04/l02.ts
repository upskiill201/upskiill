import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Myth or Fact: positions start at 0, index and length. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Positions start at 0',
  summary: 'Rafa asks for "the first trail" and Nora\'s code gives him the second one. JavaScript counts from zero, and every programmer has tripped over it.',
  minutes: 10,
  outcomes: [
    'Read one item with its index: trails[0]',
    'Find the last item with length - 1',
    'Change an item by its index',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The first item in an array is trails[1].',
          isFact: false,
          explain: 'Positions (indexes) start at 0. trails[0] is the first item, trails[1] the second. Think of it as "how many steps from the start".',
        },
        {
          text: 'In an array of 14 trails, the last index is 13.',
          isFact: true,
          explain: 'Indexes go 0 to 13: fourteen positions. So the last item is always trails[trails.length - 1].',
        },
        {
          text: 'trails[20] stops the program with an error when there are only 14 trails.',
          isFact: false,
          explain: 'No error: you just get undefined. That\'s quieter, and sneakier, than an error.',
        },
        {
          text: 'You can change an item with trails[3] = "Old Mill (closed)".',
          isFact: true,
          explain: 'Square brackets work for writing as well as reading. Even in a const array, you can change the items; you just can\'t replace the whole array.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Count from zero',
      code: 'const lifts = ["Old Blue", "Ridge T-Bar", "Bunny Carpet"];\n\nconsole.log(lifts[0]);\nconsole.log(lifts[2]);\nconsole.log(lifts[lifts.length - 1]);\nconsole.log(lifts[3]);\n\nlifts[1] = "Ridge T-Bar (wind hold)";\nconsole.log(lifts);\n',
      caption: 'Index 3 doesn\'t exist in a list of three, so you get undefined.',
      challenge: 'Print the middle lift using its index.',
    },
  ],
  apply: {
    scenario: 'Rafa\'s radio calls, by position.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const lifts = ["Old Blue", "Ridge T-Bar", "Bunny Carpet"];\nconsole.log(lifts[1]);',
        language: 'javascript',
        options: [
          { text: 'Old Blue', why: 'That\'s lifts[0]. Counting starts at 0.' },
          { text: 'Ridge T-Bar' },
          { text: 'Bunny Carpet', why: 'That\'s lifts[2].' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'const blacks = ["Rattlesnake", "Ridgeline", "Hermit Glade", "The Chute"]. Match each to its value.',
        pairs: [
          ['blacks[0]', 'Rattlesnake'],
          ['blacks[3]', 'The Chute'],
          ['blacks.length', '4'],
          ['blacks[4]', 'undefined'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make const lifts = ["Old Blue", "Ridge T-Bar", "Bunny Carpet"]. Print the first lift, using its index.',
        starter: 'const lifts = ["Old Blue", "Ridge T-Bar", "Bunny Carpet"];\n',
        solution: 'const lifts = ["Old Blue", "Ridge T-Bar", "Bunny Carpet"];\nconsole.log(lifts[0]);\n',
        hint: 'console.log(lifts[0]);',
        checks: [
          { message: 'Print Old Blue', outputEquals: 'Old Blue' },
          { message: 'Use an index', codeIncludes: 'lifts[0]' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Print the last trail, whatever the list\'s length.',
        template: 'console.log(trails[trails.[[1]] [[2]] 1]);',
        blanks: [['length'], ['-']],
        distractors: ['size', '+', 'last'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'Rafa asked for the first trail, and got Lazy Elk. Which line?',
        lines: ['const trails = ["Schoolhouse", "Lazy Elk", "Bunny Hollow"];', 'console.log(trails[1]);'],
        bug: 1,
        fix: 'console.log(trails[0]);',
        explanation: 'The first item is at index 0. Index 1 is the second.',
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'An array has 14 items. What is the index of the last one?',
        answers: ['13'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Old Mill (index 3) is closed. Change it to "Old Mill (closed)" using its index, then print trails[3].',
        starter: 'const trails = ["Schoolhouse", "Lazy Elk", "Bunny Hollow", "Old Mill"];\n',
        solution: 'const trails = ["Schoolhouse", "Lazy Elk", "Bunny Hollow", "Old Mill"];\ntrails[3] = "Old Mill (closed)";\nconsole.log(trails[3]);\n',
        hint: 'trails[3] = "Old Mill (closed)";',
        checks: [
          { message: 'Print Old Mill (closed)', outputEquals: 'Old Mill (closed)' },
          { message: 'The array itself changed', expr: 'trails[3] === "Old Mill (closed)" && trails.length === 4' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const waits = [12, 0, 3];\nconsole.log(waits[0] + waits[2]);',
        language: 'javascript',
        options: [
          { text: '12', why: 'waits[2] is 3, so it\'s 12 + 3.' },
          { text: '123', why: 'These are numbers, so they add.' },
          { text: '15' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the last item of waits using waits.length - 1 (not the number 2).',
        starter: 'const waits = [12, 0, 3];\n',
        solution: 'const waits = [12, 0, 3];\nconsole.log(waits[waits.length - 1]);\n',
        hint: 'console.log(waits[waits.length - 1]);',
        checks: [
          { message: 'Print 3', outputEquals: '3' },
          { message: 'Use length - 1', codeIncludes: 'length - 1' },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Wes is confused. Pick Nora\'s explanation.',
        from: 'wes',
        message: 'why does it start at 0. that\'s so dumb',
        options: [
          { text: 'It\'s how far from the start each item is. The first one is zero steps away' },
          { text: 'No reason, it\'s random', why: 'There\'s a reason: the index is a distance from the start.' },
          { text: 'It only starts at 0 on Tuesdays', why: 'Nice try. Every day.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where else do we count from zero without thinking: ground floors, a baby\'s age, a stopwatch? Does it make zero-based arrays feel less strange?',
    starters: ['The ground floor is...', 'It feels...'],
  },
  deepen: {
    title: '.at(-1)',
    summary: 'Newer JavaScript has trails.at(-1), which gives the last item without length - 1, and trails.at(-2) for the one before. It works in every modern browser. You\'ll still see length - 1 everywhere, so it\'s worth knowing both.',
  },
  notes: 'Array indexes are zero-based (MDN "Array"); out-of-range index returns undefined. const arrays are mutable (MDN "const"). Array.prototype.at: MDN (ES2022).',
};

export default lesson;
