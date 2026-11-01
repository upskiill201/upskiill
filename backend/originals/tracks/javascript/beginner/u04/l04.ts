import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Chat with Tey: for...of loops. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'for...of',
  summary: 'Nora has the trails in an array. Now she wants a line for each one on the morning report, without writing console.log fourteen times.',
  minutes: 10,
  outcomes: [
    'Loop through every item of an array with for...of',
    'Use the loop variable inside the block',
    'Build one line of output per item',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Rafa reads every trail on the radio. In code that\'s "for each trail in the list, do this". JavaScript says it almost the same way: for (const trail of trails) { ... }',
          replies: ['What\'s trail?'],
        },
        {
          tey: 'A new variable the loop makes for you. First time round it holds trails[0], next time trails[1], and so on to the end. You pick the name: singular of the list reads best.',
          replies: ['And the { }?'],
        },
        {
          tey: 'The block runs once per item. Fourteen trails, fourteen runs. When the list runs out, the loop stops by itself and the code carries on below.',
          replies: ['So adding a trail just works?'],
        },
        {
          tey: 'Exactly. Add a fifteenth trail to the array and the loop runs fifteen times. You never touch the loop.',
          replies: ['Nice'],
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Every trail, one line each',
      code: 'const trails = ["Schoolhouse", "Lazy Elk", "Bunny Hollow", "Old Mill", "Bluebird"];\n\nfor (const trail of trails) {\n  console.log(`Patrol: ${trail} is clear`);\n}\n\nconsole.log("Sweep done.");\n',
      caption: 'The block runs once for each trail. "Sweep done." runs once, after the loop.',
      challenge: 'Add two more trails to the array. The loop picks them up without any other change.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'for...of loops over the items. Use const for the loop variable: each time round it\'s a fresh variable holding the next item.',
    },
  ],
  apply: {
    scenario: 'The morning sweep, one trail at a time.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const lifts = ["Old Blue", "Bunny Carpet"];\nfor (const lift of lifts) {\n  console.log(lift);\n}',
        language: 'javascript',
        options: [
          { text: 'Old Blue,Bunny Carpet', why: 'The loop prints each item on its own line.' },
          { text: 'lift\nlift', why: 'lift holds each item\'s value, not the word lift.' },
          { text: 'Old Blue\nBunny Carpet' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Finish the loop.',
        template: '[[1]] (const trail [[2]] trails) {\n  console.log(trail);\n}',
        blanks: [['for'], ['of']],
        distractors: ['loop', 'in', 'each'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Loop through lifts and print each name on its own line.',
        starter: 'const lifts = ["Old Blue", "Ridge T-Bar", "Bunny Carpet"];\n',
        solution: 'const lifts = ["Old Blue", "Ridge T-Bar", "Bunny Carpet"];\n\nfor (const lift of lifts) {\n  console.log(lift);\n}\n',
        hint: 'for (const lift of lifts) {\n  console.log(lift);\n}',
        checks: [
          { message: 'Print all three, in order', outputEquals: 'Old Blue\nRidge T-Bar\nBunny Carpet' },
          { message: 'Use for...of', codeIncludes: ' of lifts' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'An array has 14 trails. How many times does the block of a for...of loop run?',
        options: [
          { text: '13', why: 'Indexes go up to 13, but there are 14 items.' },
          { text: '14' },
          { text: '1', why: 'The block runs once per item.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'This prints "Patrol: trails is clear" five times. Which line is wrong?',
        lines: ['for (const trail of trails) {', '  console.log(`Patrol: ${trails} is clear`);', '}'],
        bug: 1,
        fix: '  console.log(`Patrol: ${trail} is clear`);',
        explanation: 'Inside the loop, use trail (one item), not trails (the whole list).',
        language: 'javascript',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the sweep in order.',
        lines: [
          'const trails = ["Bluebird", "Big Sky"];',
          'for (const trail of trails) {',
          '  console.log(`${trail}: clear`);',
          '}',
          'console.log("Sweep done.");',
        ],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Loop through blacks and print each as BLACK: name (use a template literal).',
        starter: 'const blacks = ["Rattlesnake", "Ridgeline", "Hermit Glade", "The Chute"];\n',
        solution: 'const blacks = ["Rattlesnake", "Ridgeline", "Hermit Glade", "The Chute"];\n\nfor (const trail of blacks) {\n  console.log(`BLACK: ${trail}`);\n}\n',
        hint: 'for (const trail of blacks) { console.log(`BLACK: ${trail}`); }',
        checks: [
          { message: 'Print the four lines', outputEquals: 'BLACK: Rattlesnake\nBLACK: Ridgeline\nBLACK: Hermit Glade\nBLACK: The Chute' },
          { message: 'Loop with for...of over blacks', codeIncludes: ' of blacks' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In for (const lift of lifts), which word names one item at a time?',
        answers: ['lift'],
        placeholder: 'One word',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the first line of a loop over riders.',
        tiles: ['for', '(', 'const rider', 'of', 'riders', ')', '{'],
        distractors: ['in', ';'],
        language: 'javascript',
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa has a question about the radio. Pick Nora\'s answer.',
        from: 'rafa',
        message: 'When we open Hermit Glade, do I need you to change the report code?',
        options: [
          { text: 'Yes, add another console.log', why: 'The loop covers every item already.' },
          { text: 'No. Add it to the array; the loop reads whatever is there' },
          { text: 'Only if it\'s a black trail', why: 'The loop treats every item the same.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What do you do "for each" of something: for each email, reply; for each plant, water? Write one as a for...of in your head.',
    starters: ['for (const ... of ...) {', 'For each ..., I...'],
  },
  deepen: {
    title: 'for...of works on strings too',
    summary: 'for (const letter of "Old Blue") goes through each character, space included. Most of the time you\'ll loop over arrays, but it\'s the same idea: one item at a time, start to finish.',
  },
  notes: 'for...of: MDN "for...of" (iterables: arrays, strings).',
};

export default lesson;
