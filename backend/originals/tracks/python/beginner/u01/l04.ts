import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4 — free. print() up close: the name, the brackets, the quotes, and empty lines. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Your first line: print()',
  summary: "print() is the first thing every Python programmer learns. Three small parts, and getting any of them wrong is the most common first error.",
  minutes: 12,
  outcomes: [
    'Name the three parts of a print() line',
    'Print text, numbers and empty lines',
    'Fix the most common print() mistakes',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'One capital letter',
      before: { label: 'Error', text: 'Print("Welcome")\n\nNameError: name \'Print\' is not defined' },
      after: { label: 'Works', text: 'print("Welcome")\n\nWelcome' },
      notes: [
        'Python is case-sensitive: print is all lowercase.',
        'Phones love to capitalise the first letter. Watch for it.',
        'The error message even names the word it didn\'t recognise.',
      ],
    },
    {
      kind: 'text',
      html: '<p><strong>The three parts of a print() line</strong></p><ul><li><code>print</code> is the name of the instruction. All lowercase.</li><li><code>( )</code> brackets hold what you want printed.</li><li><code>" "</code> quotes go around <strong>text</strong>, so Python knows where it starts and ends. Numbers don\'t need them: <code>print(42)</code>.</li></ul><p>And <code>print()</code> with nothing inside prints an empty line, which is handy for spacing things out.</p>',
    },
    {
      kind: 'tryIt',
      title: 'A tiny welcome screen',
      caption: 'Text, an empty line, and more text. Press Run.',
      code: 'print("Welcome to the office ajo!")\nprint()\nprint("Members: 10")\n',
      challenge: 'Add a fourth line that prints Monthly share: 20000, and run it.',
    },
  ],
  apply: {
    scenario: "Ada's first welcome screen.",
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of print("Hi") to its job.',
        pairs: [
          ['print', 'The instruction'],
          ['( )', 'Holds what to print'],
          ['" "', 'Marks where text starts and ends'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will cause an error.',
        language: 'python',
        lines: ['print("Welcome")', 'Print("Members: 10")', 'print(20000)'],
        bug: 1,
        fix: 'print("Members: 10")',
        explanation: 'Print with a capital P is a different name, and Python doesn\'t know it.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print Welcome to the office ajo!',
        starter: '',
        solution: 'print("Welcome to the office ajo!")\n',
        hint: 'print, then brackets, then your text inside quotes.',
        checks: [{ message: 'Print Welcome to the office ajo!', outputIncludes: 'Welcome to the office ajo!' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines does this print, counting the empty one?',
        code: 'print("Pay day")\nprint()\nprint("Collect")',
        language: 'python',
        options: [
          { text: '3' },
          { text: '2', why: 'print() with nothing inside still prints a line: an empty one.' },
          { text: '1', why: 'Each print() starts a new line.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Add the brackets.',
        language: 'python',
        template: 'print[[1]]"Pay day!"[[2]]',
        blanks: [['('], [')']],
        distractors: ['[', ']', '{'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word shows things on the screen in Python? (all lowercase)',
        answers: ['print'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Works, or error?',
        groups: ['Works', 'Error'],
        items: [
          { text: 'print("Hello")', group: 0 },
          { text: 'print(42)', group: 0 },
          { text: 'Print("Hello")', group: 1 },
          { text: 'print("Hello"', group: 1 },
          { text: 'print()', group: 0 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that prints the number 10',
        language: 'python',
        tiles: ['print(', '10', ')'],
        distractors: ['Print(', '"'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print this welcome screen exactly',
        starter: '# OFFICE AJO\n# (an empty line)\n# Pay day is the 25th\n',
        solution: 'print("OFFICE AJO")\nprint()\nprint("Pay day is the 25th")\n',
        hint: 'Three lines: print the title, print() for the empty line, then the pay day line.',
        checks: [
          { message: 'OFFICE AJO, an empty line, then Pay day is the 25th', outputEquals: 'OFFICE AJO\n\nPay day is the 25th' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does text need quotes, but print(42) doesn\'t?',
        options: [
          { text: 'Quotes show where text starts and ends; a number is just a number' },
          { text: 'Numbers are banned from quotes', why: 'You can put digits in quotes. They just become text then.' },
          { text: 'Quotes make text bigger', why: 'Quotes are not printed at all.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the three parts of print() do you think you\'ll get wrong most often? How will you remember it?',
    starters: ['The part I\'ll forget is...', 'I\'ll remember it by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make your own welcome screen: a title, an empty line, and two lines about you.',
  },
  notes: 'NameError message for Print: "name \'Print\' is not defined" (Python 3.12 may add "Did you mean: \'print\'?"). print() with no arguments writes a newline.',
};

export default lesson;
