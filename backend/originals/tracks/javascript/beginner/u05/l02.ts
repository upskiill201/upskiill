import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Walkthrough: dot and bracket notation, changing and adding properties. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Dot and brackets',
  summary: 'Grooming finishes on Bluebird at 6 a.m. and Big Sky gets a new note for the lodge. Nora needs to change facts inside her objects, and read a fact when the key is in a variable.',
  minutes: 10,
  outcomes: [
    'Change a property with a dot',
    'Add a new property to an object',
    'Read a property with brackets when the key is in a variable',
  ],
  learn: [
    {
      kind: 'steps',
      title: '6 a.m. updates',
      steps: [
        {
          title: 'Read with a dot',
          body: 'You know this one. The key goes after the dot.',
          code: 'const trail = { name: "Bluebird", level: "blue", groomed: false };\nconsole.log(trail.groomed);   // false',
          language: 'javascript',
        },
        {
          title: 'Change with a dot',
          body: 'Put the property on the left of = to store a new value. The object changes, even though trail is a const: const only stops you replacing the whole object.',
          code: 'trail.groomed = true;\nconsole.log(trail.groomed);   // true',
          language: 'javascript',
        },
        {
          title: 'Add a brand new property',
          body: 'Assign to a key that doesn\'t exist yet, and it appears.',
          code: 'trail.note = "Fresh corduroy until 10";\nconsole.log(trail);',
          language: 'javascript',
        },
        {
          title: 'Brackets when the key is in a variable',
          body: 'trail.fact looks for a key literally called "fact". To use the key stored IN fact, use brackets: trail[fact].',
          code: 'const fact = "level";\nconsole.log(trail[fact]);     // blue\nconsole.log(trail["name"]);   // Bluebird',
          language: 'javascript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Groom it, note it',
      code: 'const trail = { name: "Bluebird", level: "blue", groomed: false };\n\ntrail.groomed = true;\ntrail.note = "Fresh corduroy until 10";\n\nconst fact = "level";\nconsole.log(trail[fact]);\nconsole.log(trail);\n',
      caption: 'Dot when you know the key as you type. Brackets when the key comes from a variable.',
      challenge: 'Change fact to "note" and run it again.',
    },
  ],
  apply: {
    scenario: 'The 6 a.m. trail updates.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const trail = { name: "Big Sky", open: false };\ntrail.open = true;\nconsole.log(trail.open);',
        language: 'javascript',
        options: [
          { text: 'false', why: 'The second line changed it to true.' },
          { text: 'true' },
          { text: 'An error, trail is const', why: 'const stops you replacing the object, not changing what\'s inside.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Bluebird has been groomed. Set trail.groomed to true, then print trail.groomed.',
        starter: 'const trail = { name: "Bluebird", level: "blue", groomed: false };\n',
        solution: 'const trail = { name: "Bluebird", level: "blue", groomed: false };\ntrail.groomed = true;\nconsole.log(trail.groomed);\n',
        hint: 'trail.groomed = true;',
        checks: [
          { message: 'Print true', outputEquals: 'true' },
          { message: 'The object changed', expr: 'trail.groomed === true' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const trail = { name: "Lone Pine", level: "blue" };\nconst fact = "level";\nconsole.log(trail.fact);',
        language: 'javascript',
        options: [
          { text: 'blue', why: 'trail.fact looks for a key called "fact". There isn\'t one.' },
          { text: 'level', why: 'It doesn\'t print the key name.' },
          { text: 'undefined' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Read the property whose key is stored in fact.',
        template: 'const fact = "level";\nconsole.log(trail[[1]]fact[[2]]);',
        blanks: [['['], [']']],
        distractors: ['.', '(', '{'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Add a new property note with the value "Icy at the top" to the trail, then print trail.note.',
        starter: 'const trail = { name: "Rattlesnake", level: "black" };\n',
        solution: 'const trail = { name: "Rattlesnake", level: "black" };\ntrail.note = "Icy at the top";\nconsole.log(trail.note);\n',
        hint: 'trail.note = "Icy at the top";',
        checks: [
          { message: 'Print Icy at the top', outputEquals: 'Icy at the top' },
          { message: 'trail has the note', expr: 'trail.note === "Icy at the top"' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Nora wants the value under the key in fact, but gets undefined. Which line?',
        lines: ['const lift = { name: "Old Blue", waitMinutes: 12 };', 'const fact = "waitMinutes";', 'console.log(lift.fact);'],
        bug: 2,
        fix: 'console.log(lift[fact]);',
        explanation: 'lift.fact means a key literally called "fact". To use the variable, write lift[fact].',
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'Dot or brackets?',
        groups: ['trail.key works', 'Needs trail[...]'],
        items: [
          { text: 'You know the key is level as you type', group: 0 },
          { text: 'The key is in a variable called fact', group: 1 },
          { text: 'You know the key is open as you type', group: 0 },
          { text: 'The key has a space in it, like "top speed"', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write function describe(trail, fact) that returns the value of that fact, using brackets. Print describe(trail, "level").',
        starter: 'const trail = { name: "Hermit Glade", level: "black", open: false };\n',
        solution: 'const trail = { name: "Hermit Glade", level: "black", open: false };\n\nfunction describe(trail, fact) {\n  return trail[fact];\n}\n\nconsole.log(describe(trail, "level"));\n',
        hint: 'return trail[fact];',
        checks: [
          { message: 'Print black', outputEquals: 'black' },
          { message: 'describe(trail, "name") is "Hermit Glade"', expr: 'describe(trail, "name") === "Hermit Glade"' },
          { message: 'describe(trail, "open") is false', expr: 'describe(trail, "open") === false' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do you get when you read a key that isn\'t in the object?',
        answers: ['undefined'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'With const t = { name: "Bluebird" } and const k = "name", match each to its result.',
        pairs: [
          ['t.name', '"Bluebird"'],
          ['t[k]', '"Bluebird" (from k)'],
          ['t.k', 'undefined'],
          ['t["name"]', '"Bluebird" (quoted key)'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If your phone\'s settings were one object, which properties would you change most often?',
    starters: ['settings.volume = ...', 'I\'d change...'],
  },
  deepen: {
    title: 'delete',
    summary: 'delete trail.note removes a property entirely. You won\'t need it often: setting a value to null or false usually says what you mean more clearly, and keeps every trail shaped the same.',
  },
  notes: 'Property accessors (dot and bracket): MDN "Property accessors". const binding vs object mutability: MDN "const". delete operator: MDN.',
};

export default lesson;
