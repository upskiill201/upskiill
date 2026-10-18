import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2 — len(): count the characters, and spot hidden spaces. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'len()',
  summary: 'Two names look identical on screen, but Python says they\'re different. Ada can\'t see a trailing space. len() can: it counts every character, visible or not.',
  minutes: 10,
  outcomes: [
    'Count characters with len()',
    'Use len() to find hidden spaces',
    'Know that the empty string "" has length 0',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Counting what you can\'t see',
      text: 'len("Tunde") is 5. len("Tunde ") is 6, because the space at the end is a character. len("") is 0: an empty string, with nothing in it.',
      hotspots: [
        { phrase: 'len("Tunde") is 5', note: 'len() is a built-in function: it gives the length, the number of characters.' },
        { phrase: 'len("Tunde ") is 6', note: 'The trailing space is invisible on screen but very visible to len(). It\'s the quickest test for hidden spaces.' },
        { phrase: 'len("") is 0', note: 'Two quotes with nothing between them is the empty string. You\'ll get one when someone presses Enter without typing.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Find the hidden space',
      caption: 'Both names print the same. Their lengths don\'t.',
      code: 'a = "Tunde"\nb = "Tunde "\n\nprint(a)\nprint(b)\nprint(len(a), len(b))\n',
      challenge: 'Add a third name with a space at the start, and print its length.',
    },
  ],
  apply: {
    scenario: 'Hunting hidden spaces.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(len("Bisi"))',
        language: 'python',
        options: [
          { text: '3', why: 'B, i, s, i: four characters.' },
          { text: '4' },
          { text: 'Bisi', why: 'len() gives a number.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the length of the bank\'s name, "TUNDE "',
        starter: 'from_bank = "TUNDE "\n',
        solution: 'from_bank = "TUNDE "\nprint(len(from_bank))\n',
        hint: 'print(len(from_bank))',
        checks: [
          { message: 'Print 6', outputEquals: '6' },
          { message: 'Use len()', codeIncludes: 'len(' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its result.',
        pairs: [
          ['len("Kemi")', '4'],
          ['len(" Kemi")', '5'],
          ['len("")', '0'],
          ['len("Ngozi")', '5 letters'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Has a hidden space, or doesn\'t?',
        groups: ['Hidden space', 'No hidden space'],
        items: [
          { text: 'len("Ada") is 4', group: 0 },
          { text: 'len("Ada") is 3', group: 1 },
          { text: 'len("Yusuf") is 6', group: 0 },
          { text: 'len("Yusuf") is 5', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print Tunde has 5 letters using len() inside an f-string',
        starter: 'name = "Tunde"\n',
        solution: 'name = "Tunde"\nprint(f"{name} has {len(name)} letters")\n',
        hint: 'f"{name} has {len(name)} letters"',
        checks: [{ message: 'Print Tunde has 5 letters', outputEquals: 'Tunde has 5 letters' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line errors?',
        language: 'python',
        lines: ['name = "Tunde"', 'print(len(name))', 'print(name.len())'],
        bug: 2,
        fix: 'print(len(name))',
        explanation: 'len() goes around the string. Strings don\'t have a .len() method.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Count the characters.',
        language: 'python',
        template: 'print([[1]]("Amaka"))',
        blanks: [['len']],
        distractors: ['count', 'size'],
      },
      {
        kind: 'mcq',
        prompt: 'Someone presses Enter without typing a name. What is len() of what they "typed"?',
        options: [
          { text: '0: it\'s the empty string ""' },
          { text: '1', why: 'Enter itself isn\'t kept.' },
          { text: 'An error', why: 'len("") is fine: 0.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Two names look the same but don\'t match. First thing you\'d try?',
        prompt: "Ada's answer?",
        options: [
          { text: 'Squint at the screen.', why: 'Trailing spaces are invisible.' },
          { text: 'Delete the program.', why: 'One len() call finds it.' },
          { text: 'Print len() of both. If one\'s longer, there\'s a hidden space.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(len("Dayo ")) show?',
        answers: ['5'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'len() makes the invisible visible. What invisible thing in your work would you love a quick way to check?',
    starters: ['I can\'t easily see...', 'A quick check would be...'],
  },
  deepen: {
    title: 'len() works on more than text',
    summary: 'In Chapter 6, len() counts members in a list too: one function, many kinds of sequence.',
  },
  notes: 'len() built-in returns the number of items in a sequence (Built-in Functions: len). len("") == 0. str has no .len() method (AttributeError).',
};

export default lesson;
