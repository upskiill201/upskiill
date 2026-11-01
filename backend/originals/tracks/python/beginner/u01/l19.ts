import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 19 — the most common beginner mistakes, as myth or fact. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The most common beginner mistakes',
  summary: 'Capital letters, curly quotes, stray spaces and missing brackets: the mistakes almost everyone makes in week one, and how to spot them in seconds.',
  minutes: 12,
  outcomes: [
    'Recognise the five most common first-week mistakes',
    'Fix each one from its error message',
    'Check your own code for them before running',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Print and print are the same to Python.',
          isFact: false,
          explain: 'Python is case-sensitive. Print with a capital P is a different name: NameError.',
        },
        {
          text: 'Spaces at the start of a line don\'t matter in Python.',
          isFact: false,
          explain: 'They matter a lot. A line that starts with spaces for no reason gives IndentationError: unexpected indent. (Chapter 5 shows where spaces are needed.)',
        },
        {
          text: 'Curly “smart” quotes from a phone keyboard work fine in code.',
          isFact: false,
          explain: 'Python needs straight quotes ("). Teyro straightens them for you, but many other editors won\'t.',
        },
        {
          text: 'Every ( needs a matching ).',
          isFact: true,
          explain: 'A missing ) is one of the most common SyntaxErrors. Python often says "\'(\' was never closed".',
        },
        {
          text: 'Professional programmers memorise everything.',
          isFact: false,
          explain: 'They look things up all the time. What they do have is the habit of reading errors and checking their code.',
        },
      ],
    },
    {
      kind: 'text',
      html: '<p><strong>The five-second check</strong> before you press Run:</p><ol><li><strong>Lowercase</strong> <code>print</code>?</li><li><strong>Every quote</strong> closed, and matching?</li><li><strong>Every bracket</strong> closed?</li><li><strong>Commas</strong> between items?</li><li><strong>No stray spaces</strong> at the start of lines?</li></ol><p>It catches most first-week errors before Python does.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Stray spaces',
      caption: 'Line 2 starts with two spaces. Press Run and read the error.',
      code: 'print("OFFICE AJO")\n  print("Members:", 10)\n',
      challenge: 'Delete the two spaces at the start of line 2, then run it again.',
      expectError: true,
    },
  ],
  apply: {
    scenario: "Ada's five-second check.",
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fix all three mistakes',
        starter: 'Print("OFFICE AJO")\n  print("Members:", 10)\nprint("Pot:", 200000\n',
        solution: 'print("OFFICE AJO")\nprint("Members:", 10)\nprint("Pot:", 200000)\n',
        hint: 'One capital letter, two stray spaces, one missing bracket.',
        checks: [{ message: 'Print all three lines', outputEquals: 'OFFICE AJO\nMembers: 10\nPot: 200000' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its error.',
        pairs: [
          ['Print("Hi")', 'NameError'],
          ['print("Hi"', 'SyntaxError'],
          ['  print("Hi") at the start', 'IndentationError'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Runs, or error?',
        groups: ['Runs', 'Error'],
        items: [
          { text: 'print("Pot:", 200000)', group: 0 },
          { text: 'print("Pot:" 200000)', group: 1 },
          { text: "print('Pot')", group: 0 },
          { text: 'PRINT("Pot")', group: 1 },
          { text: 'print("Pot"))', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "IndentationError: unexpected indent" usually mean in week one?',
        options: [
          { text: 'A line starts with spaces it shouldn\'t have' },
          { text: 'A quote is missing', why: 'That is a SyntaxError about a string.' },
          { text: 'The program is too long', why: 'It is about spaces at the start of a line.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the five-second check.',
        lines: ['Lowercase print', 'Quotes closed and matching', 'Brackets closed', 'Commas between items', 'No stray spaces at the start'],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the quotes',
        starter: "print(\"Ada's turn')\n",
        solution: 'print("Ada\'s turn")\n',
        hint: 'It starts with " so it must end with " too.',
        checks: [{ message: "Print Ada's turn", outputIncludes: "Ada's turn" }],
      },
      {
        kind: 'findBug',
        prompt: 'Run the five-second check. Which line fails it?',
        language: 'python',
        lines: ['print("Members:", 10)', 'print("Share:", 200000 / 10)', 'print("Pot:", 200000'],
        bug: 2,
        fix: 'print("Pot:", 200000)',
        explanation: 'The bracket opened after print is never closed.',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: "I keep making the same three mistakes. Am I bad at this?",
        prompt: "What's Arjun's honest answer?",
        options: [
          { text: 'Yes, real programmers never make mistakes.', why: 'They make them all the time.' },
          { text: 'Everyone makes them in week one. You now spot them in seconds, and that is the skill.' },
          { text: 'Stop coding for a while.', why: 'Mistakes are how you learn. Keep going.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Python cares about capital letters. It is case-... (one word)',
        answers: ['sensitive'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Do professional programmers memorise everything?',
        options: [
          { text: 'Yes, every function', why: 'Nobody does. Looking things up is normal.' },
          { text: 'Only the hard parts', why: 'Even the hard parts get looked up.' },
          { text: 'No. They look things up constantly, and read errors calmly' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five mistakes have you made in this chapter? Which will you watch for most?',
    starters: ['I have made...', 'I will watch for...'],
  },
  deepen: {
    title: 'Make it a habit',
    summary: 'Do the five-second check before every Run in the Chapter Challenge. Count how many errors it saves you.',
  },
  notes:
    'Top-level leading spaces → "IndentationError: unexpected indent". Missing ) → "SyntaxError: \'(\' was never closed" (3.10+). Case-sensitivity: NameError. Curly quotes: "SyntaxError: invalid character" — Teyro\'s editor straightens them (frontend/lib/code/checks.ts straightenQuotes). Try it live card is expectError.',
};

export default lesson;
