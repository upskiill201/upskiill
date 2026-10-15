import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6 — text needs quotes: strings, single vs double quotes, digits as text. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Text needs quotes',
  summary: '"5" and 5 look the same on screen. To Python, one is text and one is a number, and that difference is behind a lot of beginner bugs.',
  minutes: 12,
  outcomes: [
    'Explain what a string is',
    'Choose single or double quotes, including for words like "Ada\'s"',
    'Tell text that looks like a number from a real number',
  ],
  learn: [
    {
      kind: 'explore',
      title: "Ada's code. Tap each part.",
      text: 'print("Ada\'s ajo")   print(\'Pay day\')   print("5" + "5")   print(5 + 5)',
      hotspots: [
        { phrase: '"Ada\'s ajo"', note: 'Text in quotes is called a string. Double quotes here, because the text has an apostrophe in it.' },
        { phrase: "'Pay day'", note: "Single quotes work too. Python doesn't mind which, as long as the start and end match." },
        { phrase: '"5" + "5"', note: 'These are strings that happen to contain digits. Adding strings joins them: this prints 55.' },
        { phrase: '5 + 5', note: 'Real numbers, no quotes. Python adds them: this prints 10.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>A piece of text in quotes is called a <strong>string</strong> (a string of characters). Three rules:</p><ol><li><strong>Single or double quotes</strong>, but the same at both ends: <code>"hi"</code> or <code>\'hi\'</code>, never <code>"hi\'</code>.</li><li><strong>Apostrophe inside? Use double quotes:</strong> <code>"Ada\'s ajo"</code>.</li><li><strong>No quotes means it isn\'t text.</strong> <code>print(Hello)</code> makes Python look for something <em>named</em> Hello, and fail.</li></ol>',
    },
    {
      kind: 'tryIt',
      title: 'Text or number?',
      caption: 'Same digits, very different results. Press Run.',
      code: 'print("5" + "5")\nprint(5 + 5)\n',
      challenge: 'Change both lines to use 20 instead of 5, and predict the output before you press Run.',
    },
  ],
  apply: {
    scenario: 'Ada learns what strings are.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("5" + "5")',
        language: 'python',
        options: [
          { text: '55' },
          { text: '10', why: 'Those are strings. + joins strings instead of adding.' },
          { text: 'An error', why: 'Joining two strings is allowed.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: "Print Ada's ajo (with the apostrophe)",
        starter: '',
        solution: 'print("Ada\'s ajo")\n',
        hint: "Text with an apostrophe goes in double quotes: \"...'s...\"",
        checks: [{ message: "Print Ada's ajo", outputIncludes: "Ada's ajo" }],
      },
      {
        kind: 'sortGroups',
        prompt: 'String or number?',
        groups: ['String (text)', 'Number'],
        items: [
          { text: '"20000"', group: 0 },
          { text: '20000', group: 1 },
          { text: "'Tunde'", group: 0 },
          { text: '3.5', group: 1 },
          { text: '"3.5"', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line will cause an error?',
        language: 'python',
        lines: ['print("Pay day")', "print('Pay day')", 'print("Pay day\')'],
        bug: 2,
        fix: 'print("Pay day")',
        explanation: 'The quotes must match. It starts with " so it must end with ".',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Text in quotes is called a ... (one word)',
        answers: ['string', 'str'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why does print(Hello) cause an error?',
        options: [
          { text: 'Without quotes, Python looks for something named Hello, and nothing has that name' },
          { text: 'Hello is a banned word', why: 'Any text works in quotes.' },
          { text: 'print only works with numbers', why: 'print works with text and numbers.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print 10 by adding two real numbers, then 55 by joining two strings',
        starter: '# Line 1 should print 10\n# Line 2 should print 55\n',
        solution: 'print(5 + 5)\nprint("5" + "5")\n',
        hint: 'Numbers without quotes add up. Strings in quotes join together.',
        checks: [{ message: 'Print 10, then 55', outputEquals: '10\n55' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it prints.',
        pairs: [
          ['print(2 + 3)', '5'],
          ['print("2" + "3")', '23'],
          ['print("2 + 3")', '2 + 3'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Single quotes or double quotes? Which is right?',
        prompt: 'What is the best answer?',
        options: [
          { text: 'Both work. Match them at both ends, and use double quotes when the text has an apostrophe.' },
          { text: 'Only double quotes work in Python.', why: 'Single quotes work too.' },
          { text: 'Single quotes are for numbers.', why: 'Both kinds are for text.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: "Build a line that prints Tunde's turn",
        language: 'python',
        tiles: ['print(', '"Tunde\'s turn"', ')'],
        distractors: ["'Tunde's turn'", 'Tunde'],
      },
    ],
  },
  reflect: {
    prompt: 'In your own words, why does "5" + "5" give 55 but 5 + 5 give 10?',
    starters: ['The difference is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Print a sentence with an apostrophe in it, like your name\'s first letter. Then try it with single quotes and read the error.',
  },
  notes: 'str + str concatenates; int + int adds. print(Hello) raises NameError. Mismatched quotes: SyntaxError (unterminated string literal).',
};

export default lesson;
