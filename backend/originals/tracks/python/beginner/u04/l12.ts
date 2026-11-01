import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 12 — Input is always text: "30000" from input() is a str, not a number. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Input is always text',
  summary: 'Ada asks "How much did you pay? ", Bisi types 30000, and the tracker adds the late fee. The answer: 300001500. The bank-export bug is back, and this time Bisi typed it herself.',
  minutes: 11,
  outcomes: [
    'Know that input() always returns a str',
    'Spot the "joined instead of added" bug',
    'Check an answer\'s type with type()',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Everything typed is text',
      html: '<p>A keyboard sends characters. When Bisi types 30000 and presses Enter, Python receives the five characters 3, 0, 0, 0, 0: the string <code>"30000"</code>. <code>input()</code> never guesses that you meant a number, because it can\'t know: "30000" might be an amount, a postcode or part of a password.</p><p>So <code>amount = input("How much? ")</code> then <code>amount + "1500"</code> joins two strings: <code>"300001500"</code>. And <code>amount + 1500</code>, with a number, is a TypeError.</p><p>It\'s the same rule Arjun gave in Chapter 2: <strong>everything from outside the program arrives as text</strong>. Files, forms, bank exports and the keyboard. Next lesson: converting it on the way in.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The type of an answer',
      caption: 'Bisi types 30000. Look at the type.',
      code: 'amount = input("How much did you pay? ")\n\nprint(type(amount))\nprint(amount + "1500")\n',
      stdin: ['30000'],
      challenge: 'Try print(amount + 1500) with a number. Read the error.',
    },
  ],
  apply: {
    scenario: 'The 300001500 bug.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Bisi types 30000. What type does input() give back?',
        options: [
          { text: 'int', why: 'input() always returns text.' },
          { text: 'str' },
          { text: 'float', why: 'Text. Conversion is your job.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Ask "How much? " and print the type of the answer',
        starter: '',
        solution: 'amount = input("How much? ")\nprint(type(amount))\n',
        hint: 'print(type(amount))',
        stdin: ['30000'],
        checks: [{ message: "Print <class 'str'>", outputIncludes: "<class 'str'>" }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The user types 2. What does this print?',
        code: 'n = input("Months: ")\nprint(n * 3)',
        language: 'python',
        options: [
          { text: 'Months: 2 then 222' },
          { text: 'Months: 2 then 6', why: 'n is the text "2", so * repeats it.' },
          { text: 'An error', why: 'Text times a whole number is allowed.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'What type is it?',
        groups: ['str', 'int'],
        items: [
          { text: 'input("Amount: ")', group: 0 },
          { text: '30000', group: 1 },
          { text: 'An answer typed as 30000', group: 0 },
          { text: 'len("30000")', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line joins text instead of adding?',
        language: 'python',
        lines: ['amount = input("How much? ")', 'fee = "1500"', 'print(amount + fee)'],
        bug: 2,
        fix: 'print(int(amount) + int(fee))',
        explanation: 'Both are strings, so + joins them: 300001500.',
      },
      {
        kind: 'writeCode',
        prompt: 'Show the bug on purpose: ask "How much? " and print the answer joined with "1500"',
        starter: '',
        solution: 'amount = input("How much? ")\nprint(amount + "1500")\n',
        hint: 'amount + "1500"',
        stdin: ['30000'],
        checks: [{ message: 'Print 300001500', outputIncludes: '300001500' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'amount = input(...), user types 5. Match the code to the result.',
        pairs: [
          ['amount + "0"', '"50"'],
          ['amount * 2', '"55"'],
          ['len(amount)', '1'],
          ['amount + 1', 'TypeError'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why doesn\'t input() just give me a number when someone types digits?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'It does, sometimes.', why: 'Never: always a str.' },
          { text: 'It can\'t know what you mean. "007" could be a code or the number 7. It gives you the text and lets you decide.' },
          { text: 'Because Python is old.', why: 'It\'s a deliberate design choice.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'input() always returns a [[1]].',
        template: 'input() always returns a [[1]].',
        blanks: [['str', 'string']],
        distractors: ['int', 'float'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The user types 7. What does print(input("? ") + "7") show after the prompt line? (just the answer)',
        answers: ['77'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Where have you seen a number treated as text, like a phone number losing its leading 0 or an ID shown in scientific notation?',
    starters: ['I saw...', 'It happened because...'],
  },
  deepen: {
    title: 'Python 2 was riskier',
    summary: 'In Python 2, input() ran whatever you typed as code, which was dangerous. Python 3\'s input() always returns plain text, which is safer.',
  },
  notes: 'input() returns str in Python 3 (Built-in Functions). Python 2\'s input() evaluated the typed text (equivalent to eval(raw_input())); Python 3 removed this (PEP 3111). "30000" + "1500" = "300001500"; "2" * 3 = "222".',
};

export default lesson;
