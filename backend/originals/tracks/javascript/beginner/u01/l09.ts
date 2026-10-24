import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Before/After: camelCase names, comments, readable code. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Names and notes',
  summary: 'Nora opens Friday\'s code on Sunday and can\'t read her own work. x, y2, thing. Rafa: "Write it for the person who reads it at 6 a.m. That\'s you."',
  minutes: 10,
  outcomes: [
    'Name variables in camelCase so they say what they hold',
    'Write comments with // that explain why',
    'Tidy code so someone else can read it',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Friday\'s code, read on Sunday',
      before: {
        label: 'What Nora wrote',
        text: 'const x = 59;\nconst y2 = 39;\nlet thing = x*2+y2*2;\nconsole.log(thing);',
      },
      after: {
        label: 'What Rafa asked for',
        text: '// Window prices for Saturday, in dollars\nconst adultPrice = 59;\nconst kidPrice = 39;\n\n// The family-of-four deal Mags asked about\nconst familyTotal = adultPrice * 2 + kidPrice * 2;\nconsole.log(familyTotal);',
      },
      notes: [
        'Names say what\'s inside: adultPrice, not x.',
        'camelCase: join the words, start each new word with a capital. adultPrice, familyTotal, isOpen.',
        'Comments (// ...) explain the why: where a number came from, who asked for it.',
        'Spaces around + and * and blank lines between parts make it easier to scan.',
      ],
    },
    {
      kind: 'text',
      html: '<p>Names can use letters, digits, <code>_</code> and <code>$</code>, but can\'t <b>start</b> with a digit and can\'t have spaces or dashes. <code>2ndLift</code> and <code>lift-name</code> won\'t work. <code>secondLift</code> and <code>liftName</code> will.</p><p>A few words are taken by JavaScript itself, like <code>let</code>, <code>const</code> and <code>if</code>. You can\'t use them as names.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Tidy it up',
      code: 'const a = 29;\nconst b = 3;\nconsole.log(a*b);\n',
      caption: 'This works, but nobody knows what it means. Rename a and b, and add a comment.',
      challenge: 'Rename them seniorPrice and seniors, and add a comment above that says what the total is for.',
    },
  ],
  apply: {
    scenario: 'Nora rewrites Friday\'s code so 6 a.m. Nora can read it.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which name is best for the number of trails that are open?',
        options: [
          { text: 'n', why: 'Short, but it says nothing about what it holds.' },
          { text: 'openTrails' },
          { text: 'OPEN-TRAILS', why: 'Dashes aren\'t allowed in names. JavaScript reads it as OPEN minus TRAILS.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Allowed as a variable name or not?',
        groups: ['Works', 'Breaks'],
        items: [
          { text: 'liftName', group: 0 },
          { text: 'lift name', group: 1 },
          { text: '2ndLift', group: 1 },
          { text: 'secondLift', group: 0 },
          { text: 'const', group: 1 },
          { text: 'trail_count', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Write "number of riders" as one camelCase name.',
        answers: ['numberOfRiders'],
        placeholder: 'camelCase',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: '// console.log("Closed");\nconsole.log("Open");',
        language: 'javascript',
        options: [
          { text: 'Closed then Open', why: 'The first line starts with //, so it\'s a comment and never runs.' },
          { text: 'Open' },
          { text: 'Nothing', why: 'Only the first line is a comment. The second runs.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Rewrite this with clear names: seniorPrice for 29 and seniors for 3. Store the result in seniorTotal and print it.',
        starter: 'const a = 29;\nconst b = 3;\nconsole.log(a * b);\n',
        solution: '// Three seniors at the window\nconst seniorPrice = 29;\nconst seniors = 3;\nconst seniorTotal = seniorPrice * seniors;\nconsole.log(seniorTotal);\n',
        hint: 'const seniorTotal = seniorPrice * seniors;',
        checks: [
          { message: 'Print 87', outputEquals: '87' },
          { message: 'seniorPrice is 29', expr: 'seniorPrice === 29' },
          { message: 'seniors is 3', expr: 'seniors === 3' },
          { message: 'seniorTotal is 87', expr: 'seniorTotal === 87' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line stops the program?',
        lines: ['const liftName = "Old Blue";', 'const lift-status = "open";', 'console.log(liftName);'],
        bug: 1,
        fix: 'const liftStatus = "open";',
        explanation: 'Names can\'t contain a dash. JavaScript reads lift-status as "lift minus status". Use camelCase.',
        language: 'javascript',
      },
      {
        kind: 'mcq',
        prompt: 'Which comment is most useful?',
        options: [
          { text: '// set price to 20', why: 'The code already says that. A comment should add what the code can\'t.' },
          { text: '// variable', why: 'This tells the reader nothing.' },
          { text: '// Locals Tuesday: Mags\'s rule since 1998, $20 for everyone' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Turn the first line into a note that doesn\'t run.',
        template: '[[1]] Prices change on Dec 19 for the holidays\nconst adultPrice = 59;',
        blanks: [['//']],
        distractors: ['#', '<!--', '**'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Write a program with a comment on the first line, then const openTrails = 10 and print exactly: Open trails: 10',
        starter: '',
        solution: '// Trails open this morning\nconst openTrails = 10;\nconsole.log(`Open trails: ${openTrails}`);\n',
        hint: '// your note\nconst openTrails = 10;\nconsole.log(`Open trails: ${openTrails}`);',
        checks: [
          { message: 'Print Open trails: 10', outputEquals: 'Open trails: 10' },
          { message: 'Include a // comment', codeIncludes: '//' },
          { message: 'openTrails is 10', expr: 'openTrails === 10' },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa tests Nora. Pick her answer.',
        from: 'rafa',
        message: 'Who are you writing names and comments for?',
        options: [
          { text: 'For JavaScript, so it runs faster', why: 'JavaScript doesn\'t care about names or comments at all.' },
          { text: 'For whoever reads it next, usually me on a tired morning' },
          { text: 'For the teacher', why: 'There\'s no teacher at 6 a.m. on a powder day.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a note you left yourself that made no sense later. What would have made it clear?',
    starters: ['I once wrote...', 'It should have said...'],
  },
  deepen: {
    title: 'Formatters do the spacing for you',
    summary: 'On a laptop, code editors like VS Code can tidy spacing automatically with a tool called Prettier. Names and comments are still your job: no tool knows that 20 is Mags\'s Locals Tuesday price.',
  },
  notes: 'Identifier rules: MDN "Lexical grammar" (identifiers, reserved words). camelCase is the common JavaScript convention (MDN code style guide). Comments: // single-line.',
};

export default lesson;
