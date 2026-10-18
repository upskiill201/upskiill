import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3 — Indexing: [0] is the first character, [-1] the last. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Indexing: the first letter',
  summary: 'Ada wants initials on the member cards: T for Tunde, B for Bisi. Every character in a string has a position number, and Python starts counting at zero.',
  minutes: 11,
  outcomes: [
    'Get one character with [index]',
    'Know that the first character is [0]',
    'Count from the end with [-1]',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Positions in "Tunde"',
      steps: [
        {
          title: '1. Every character has a position',
          body: 'T is at 0, u at 1, n at 2, d at 3, e at 4. Python counts from 0, so the last position is one less than the length.',
          code: 'name = "Tunde"\n#        01234',
          language: 'python',
        },
        {
          title: '2. Square brackets pick one',
          body: 'name[0] is the first character.',
          code: 'print(name[0])  # T',
          language: 'python',
        },
        {
          title: '3. Negative numbers count from the end',
          body: 'name[-1] is the last character, name[-2] the one before it.',
          code: 'print(name[-1])  # e',
          language: 'python',
        },
        {
          title: '4. Too far is an error',
          body: '"Tunde" has positions 0 to 4. name[5] is an IndexError: string index out of range.',
          code: 'print(name[5])  # IndexError',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Initials',
      caption: 'First and last letters of two names.',
      code: 'first = "Tunde"\nsecond = "Bisi"\n\nprint(first[0], second[0])\nprint(first[-1], second[-1])\nprint(f"Initials: {first[0]}{second[0]}")\n',
      challenge: 'Print the third letter of each name.',
    },
  ],
  apply: {
    scenario: 'Initials for the member cards.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'name = "Kemi"\nprint(name[1])',
        language: 'python',
        options: [
          { text: 'K', why: 'K is at 0. [1] is the second character.' },
          { text: 'i', why: 'That\'s [-1].' },
          { text: 'e' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: "Print the first letter of the member's name",
        starter: 'name = "Ngozi"\n',
        solution: 'name = "Ngozi"\nprint(name[0])\n',
        hint: 'print(name[0])',
        checks: [
          { message: 'Print N', outputEquals: 'N' },
          { message: 'Use [0]', codeIncludes: '[0]' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'name = "Yusuf". Match the code to the character.',
        pairs: [
          ['name[0]', 'Y'],
          ['name[1]', 'u'],
          ['name[2]', 's'],
          ['name[-1]', 'f'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the last letter of the name with [-1]',
        starter: 'name = "Ifeoma"\n',
        solution: 'name = "Ifeoma"\nprint(name[-1])\n',
        hint: 'print(name[-1])',
        checks: [
          { message: 'Print a', outputEquals: 'a' },
          { message: 'Use [-1]', codeIncludes: '[-1]' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is an IndexError?',
        language: 'python',
        lines: ['name = "Ada"', 'print(name[2])', 'print(name[3])'],
        bug: 2,
        fix: 'print(name[-1])',
        explanation: '"Ada" has positions 0, 1 and 2. There is no [3].',
      },
      {
        kind: 'fillBlank',
        prompt: 'The first character.',
        language: 'python',
        template: 'initial = name[[[1]]]',
        blanks: [['0']],
        distractors: ['1', '-0'],
      },
      {
        kind: 'sortGroups',
        prompt: 'name = "Segun" (5 letters). Works, or IndexError?',
        groups: ['Works', 'IndexError'],
        items: [
          { text: 'name[4]', group: 0 },
          { text: 'name[5]', group: 1 },
          { text: 'name[-5]', group: 0 },
          { text: 'name[-6]', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the initials TB from two variables',
        starter: 'first = "Tunde"\nsecond = "Bisi"\n',
        solution: 'first = "Tunde"\nsecond = "Bisi"\nprint(first[0] + second[0])\n',
        hint: 'first[0] + second[0]',
        checks: [{ message: 'Print TB', outputEquals: 'TB' }],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why does Python start at 0? Humans start at 1!',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'It\'s a bug.', why: 'It\'s a deliberate convention.' },
          { text: 'Think of it as "how many steps from the start". The first letter is 0 steps in. Almost every language does it.' },
          { text: 'Only Python does it.', why: 'Most programming languages start at 0.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'name = "Amaka". What does print(name[-2]) show?',
        answers: ['k'],
        placeholder: 'One character',
      },
    ],
  },
  reflect: {
    prompt: 'Counting from 0 feels strange at first. What else do you count from 0 without noticing (a baby\'s age, floors in some buildings)?',
    starters: ['We count from 0 when...', 'It makes sense because...'],
  },
  deepen: {
    title: 'Strings can\'t be changed in place',
    summary: 'name[0] = "t" is a TypeError: strings are immutable. To change text you build a new string, which is what .lower() and friends do.',
  },
  notes: 'String indexing and negative indices (Python tutorial §3.1.2). IndexError: string index out of range. str is immutable (item assignment raises TypeError). "Amaka"[-2] = "k".',
};

export default lesson;
