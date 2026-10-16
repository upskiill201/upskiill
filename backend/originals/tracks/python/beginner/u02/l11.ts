import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 11 — int(), float() and str(): converting between types. Story: the bank export. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'int() and str(): converting',
  summary: 'The bank app exports payments as text: "25000", "25000", "12500". Ada adds them up and gets 250002500012500. Time to turn text back into numbers.',
  minutes: 12,
  outcomes: [
    'Turn text into a number with int() and float()',
    'Turn a number into text with str()',
    'Know when a conversion will fail',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, the bank export',
      beats: [
        { speaker: 'narrator', text: 'Ada copies three payments from the bank app into her tracker: "25000", "25000" and "12500". She adds them with +.' },
        { speaker: 'narrator', text: 'Output: 250002500012500.' },
        { speaker: 'ada', text: 'Arjun. The bank gives me text.' },
        { speaker: 'arjun', text: 'Everything from outside your program arrives as text: files, forms, copy and paste. Convert it on the way in. int("25000") is the number 25000.' },
      ],
      choice: {
        prompt: 'What should Ada do with the three payments?',
        options: [
          {
            text: 'Convert each one with int() before adding them up.',
            outcome: 'int("25000") + int("25000") + int("12500") is 62500. The tracker matches the bank.',
            best: true,
          },
          {
            text: 'Delete the quotes by hand every month.',
            outcome: 'Fine for three payments. Not for thirty, every month, forever.',
          },
          {
            text: 'Use * instead of +.',
            outcome: '"25000" * "25000" is a TypeError: you can\'t multiply text by text.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>Three converters, each named after the type it makes:</p><ul><li><code>int("25000")</code> gives <code>25000</code>, a whole number.</li><li><code>float("12500.50")</code> gives <code>12500.5</code>, a decimal.</li><li><code>str(25000)</code> gives <code>"25000"</code>, text.</li></ul><p>A conversion only works if it makes sense: <code>int("Tunde")</code> and <code>int("12500.50")</code> are both <strong>ValueError</strong>s. And <code>int()</code> on a float chops off the decimals, without rounding: <code>int(9.99)</code> is <code>9</code>.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The bank export, fixed',
      caption: 'The first line joins text. The second adds numbers.',
      code: 'a = "25000"\nb = "25000"\nc = "12500"\n\nprint(a + b + c)\nprint(int(a) + int(b) + int(c))\n',
      challenge: 'Try print(int("12500.50")). Read the error. Then try float("12500.50").',
    },
  ],
  apply: {
    scenario: 'Converting the bank export.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(int("25000") + 1)',
        language: 'python',
        options: [
          { text: '250001', why: 'int() turned the text into a number, so + adds.' },
          { text: 'TypeError', why: 'After int(), both sides are numbers.' },
          { text: '25001' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add up the three payments as numbers',
        starter: 'a = "25000"\nb = "25000"\nc = "12500"\n',
        solution: 'a = "25000"\nb = "25000"\nc = "12500"\nprint(int(a) + int(b) + int(c))\n',
        hint: 'Wrap each one in int() before adding.',
        checks: [
          { message: 'Print 62500', outputEquals: '62500' },
          { message: 'Convert with int()', codeIncludes: 'int(' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the conversion to its result.',
        pairs: [
          ['int("12")', '12'],
          ['float("2.5")', '2.5'],
          ['str(12)', '"12"'],
          ['int(9.99)', '9'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Works, or ValueError?',
        groups: ['Works', 'ValueError'],
        items: [
          { text: 'int("25000")', group: 0 },
          { text: 'int("Tunde")', group: 1 },
          { text: 'float("12500.50")', group: 0 },
          { text: 'int("12500.50")', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print Paid: 12500.5 by converting the text with float()',
        starter: 'paid = "12500.50"\n',
        solution: 'paid = "12500.50"\nprint(f"Paid: {float(paid)}")\n',
        hint: 'float(paid) inside an f-string.',
        checks: [
          { message: 'Print Paid: 12500.5', outputEquals: 'Paid: 12500.5' },
          { message: 'Use float()', codeIncludes: 'float(' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(int(9.99))',
        language: 'python',
        options: [
          { text: '10', why: 'int() chops the decimals off. It doesn\'t round.' },
          { text: '9' },
          { text: '9.99', why: 'int() always gives a whole number.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line still joins text instead of adding?',
        language: 'python',
        lines: ['a = "25000"', 'b = "12500"', 'print(a + int(b))'],
        bug: 2,
        fix: 'print(int(a) + int(b))',
        explanation: 'a is still text, so this is a TypeError: text + number. Convert both.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Turn the number into text so + can join it.',
        language: 'python',
        template: 'print("Members: " + [[1]](11))',
        blanks: [['str']],
        distractors: ['int', 'text'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Where does text that should be a number usually come from?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'From outside the program: files, forms, copy and paste. Convert it on the way in.' },
          { text: 'From typos.', why: 'Sometimes, but mostly it\'s just how data arrives.' },
          { text: 'Python makes everything text.', why: 'Only data from outside starts as text.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which function turns "42" into the number 42? (three letters)',
        answers: ['int', 'int()'],
        placeholder: 'Function',
      },
    ],
  },
  reflect: {
    prompt: 'Data from outside often looks right but is the wrong type. Have you seen that in a spreadsheet or form?',
    starters: ['I once copied...', 'It turned out to be...'],
  },
  deepen: {
    title: 'input() is text too',
    summary: 'In Chapter 4 Ada asks the user to type amounts with input(). It always gives text, so int() comes straight back.',
  },
  notes: 'int(), float(), str() constructors (Built-in Functions). int("12500.50") raises ValueError: invalid literal for int() with base 10; int(9.99) truncates toward zero → 9. 25000 + 25000 + 12500 = 62500.',
};

export default lesson;
