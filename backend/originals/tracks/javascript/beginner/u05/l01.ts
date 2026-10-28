import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: objects, one trail with many facts. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Objects',
  summary: 'Sunday 27 December. Nora has three lists that line up by position: names, levels, open. Wes sorts one of them and the website calls a black run green. Facts about one trail need to stay together.',
  minutes: 10,
  outcomes: [
    'Make an object with { } and key: value pairs',
    'Read a property with a dot',
    'Explain why objects keep related facts together',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sunday, 9:05 a.m.',
      beats: [
        { speaker: 'narrator', text: 'A family in matching jackets is halfway down The Chute, which the website says is a green beginner run.' },
        { speaker: 'rafa', text: 'Patrol\'s bringing them down. Nora, why does the website think The Chute is green?' },
        { speaker: 'wes', text: 'i sorted the names list so it would look nicer' },
        { speaker: 'nora', text: 'And the levels list stayed where it was. Now every name has someone else\'s level.' },
        { speaker: 'rafa', text: 'Three lists that have to stay in step will always fall out of step. Keep each trail\'s facts together, in one thing.' },
        { speaker: 'nora', text: 'One thing per trail. With labels.' },
        { speaker: 'rafa', text: 'That\'s an object.' },
      ],
      choice: {
        prompt: 'How should Nora store a trail\'s name, level and open status?',
        options: [
          { text: 'Three lists, and a note telling everyone not to sort them', outcome: 'Someone will sort one. Probably Wes. Probably on a Saturday.' },
          { text: 'One object per trail, with a label for each fact', outcome: 'The facts travel together. Sort, filter or move a trail, and its level comes with it.', best: true },
          { text: 'One long string: "The Chute black closed"', outcome: 'Readable for people, but code would have to cut it apart every time. And trail names have spaces.' },
        ],
      },
    },
    {
      kind: 'code',
      language: 'javascript',
      code: 'const trail = {\n  name: "The Chute",\n  level: "black",\n  open: false,\n};\n\nconsole.log(trail.name);   // The Chute\nconsole.log(trail.level);  // black',
      caption: 'Curly braces, then key: value pairs separated by commas. trail.name reads the value stored under name.',
    },
    {
      kind: 'tryIt',
      title: 'One trail, all its facts',
      code: 'const trail = {\n  name: "Bluebird",\n  level: "blue",\n  open: true,\n  groomed: true,\n};\n\nconsole.log(trail);\nconsole.log(`${trail.name} is a ${trail.level} run`);\n',
      caption: 'Each fact has a label (the key). Values can be any type.',
      challenge: 'Make a second object for "Rattlesnake", a black run that is open but not groomed, and print its level.',
    },
  ],
  apply: {
    scenario: 'Every trail\'s facts, kept together.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the website call The Chute green?',
        options: [
          { text: 'JavaScript mixed up the words', why: 'JavaScript did exactly what the code said.' },
          { text: 'Two lists that had to line up by position stopped lining up when one was sorted' },
          { text: 'Someone typed green by mistake', why: 'Nobody typed anything. One list moved and the other didn\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const lift = { name: "Old Blue", seats: 2 };\nconsole.log(lift.seats);',
        language: 'javascript',
        options: [
          { text: 'seats', why: 'lift.seats reads the value stored under seats.' },
          { text: 'Old Blue', why: 'That\'s lift.name.' },
          { text: '2' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an object for the Bunny Carpet with a type of "carpet".',
        tiles: ['const lift = {', 'name: "Bunny Carpet",', 'type: "carpet"', '};'],
        distractors: ['[', 'name = "Bunny Carpet"'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const trail with name "Lone Pine", level "blue" and open true. Print trail.name.',
        starter: '',
        solution: 'const trail = {\n  name: "Lone Pine",\n  level: "blue",\n  open: true,\n};\n\nconsole.log(trail.name);\n',
        hint: 'const trail = { name: "Lone Pine", level: "blue", open: true };',
        checks: [
          { message: 'Print Lone Pine', outputEquals: 'Lone Pine' },
          { message: 'trail.level is "blue"', expr: 'trail.level === "blue"' },
          { message: 'trail.open is true', expr: 'trail.open === true' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This stops with a SyntaxError. Which line?',
        lines: ['const trail = {', '  name = "Big Sky",', '  level: "blue",', '};'],
        bug: 1,
        fix: '  name: "Big Sky",',
        explanation: 'Inside an object, keys and values are joined with a colon, not =.',
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece of an object to its name.',
        pairs: [
          ['{ }', 'Holds the whole object'],
          ['name', 'A key (the label)'],
          ['"Bluebird"', 'A value'],
          ['trail.name', 'Reading a property'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Finish the object and read from it.',
        template: 'const lift = [[1]] name[[2]] "Old Blue", wait: 12 };\nconsole.log(lift[[3]]wait);',
        blanks: [['{'], [':'], ['.']],
        distractors: ['[', '=', ','],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const lift with name "Old Blue", type "chair" and waitMinutes 12. Print exactly: Old Blue: 12 min wait, using the object\'s properties.',
        starter: '',
        solution: 'const lift = {\n  name: "Old Blue",\n  type: "chair",\n  waitMinutes: 12,\n};\n\nconsole.log(`${lift.name}: ${lift.waitMinutes} min wait`);\n',
        hint: 'console.log(`${lift.name}: ${lift.waitMinutes} min wait`);',
        checks: [
          { message: 'Print Old Blue: 12 min wait', outputEquals: 'Old Blue: 12 min wait' },
          { message: 'Read the properties', codeIncludes: 'lift.waitMinutes' },
          { message: 'lift.type is "chair"', expr: 'lift.type === "chair"' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In { level: "black" }, what is level called?',
        answers: ['key', 'a key', 'property', 'property name', 'a property'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Wes feels bad. Pick Nora\'s reply.',
        from: 'wes',
        message: 'sorry about the sorting thing. is the family ok',
        options: [
          { text: 'They\'re fine, Rafa walked them down. And it wasn\'t really your fault: the data was fragile. Objects fix that' },
          { text: 'Never touch the website again', why: 'Wes found a real weakness. That\'s useful.' },
          { text: 'It\'s JavaScript\'s fault', why: 'The way the data was stored was the problem.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Pick something you own: a phone, a bike, a recipe. What keys would its object have?',
    starters: ['const phone = { ... }', 'It would have keys like...'],
  },
  deepen: {
    title: 'You\'ve seen objects already',
    summary: 'console is an object, and log is one of its properties: console.log. Math is an object with max and min. "Old Blue".length reads a property of a string. Dots mean "look inside this thing".',
  },
  notes: 'Objects: MDN "Working with objects", object initializer. Sun 27 Dec 2026. Trail levels match practice-api.js (The Chute is black).',
};

export default lesson;
