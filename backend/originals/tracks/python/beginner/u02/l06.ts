import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6 — type(): ask Python what a value is. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'type(): what is this?',
  summary: "Tunde's bug is fixed, but Ada wants to know before it happens again. Python has a built-in way to ask any value: what are you?",
  minutes: 11,
  outcomes: [
    'Ask Python a value\'s type with type()',
    'Read the answer: int, float or str',
    'Use type() to find a bug before it bites',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Three questions, three answers',
      text: 'print(type(25000)) shows <class \'int\'>. print(type(2500.5)) shows <class \'float\'>. print(type("25000")) shows <class \'str\'>. The word after class is the type\'s name.',
      hotspots: [
        { phrase: 'type(25000)', note: 'type() is a built-in function. Put any value or variable inside its brackets.' },
        { phrase: "<class 'int'>", note: 'int: a whole number, positive or negative, as big as you like.' },
        { phrase: "<class 'float'>", note: 'float: a number with a decimal point. 25000.0 is a float too, even though it\'s whole.' },
        { phrase: "<class 'str'>", note: 'str, short for string: text. Anything in quotes.' },
        { phrase: 'The word after class', note: 'In Python every type is a class. That idea matters much later; for now, just read the name.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Ask the values',
      caption: 'Run it, then try type(10 / 2). Is the answer a surprise?',
      code: 'share = 25000\nname = "Bisi"\nhalf_share = share / 2\n\nprint(type(share))\nprint(type(name))\nprint(type(half_share))\n',
      challenge: 'Add print(type("25000")) and compare it with type(share).',
    },
  ],
  apply: {
    scenario: 'Ada checks her types.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(type("Tunde"))',
        language: 'python',
        options: [
          { text: "<class 'name'>", why: 'There\'s no name type. Text is str.' },
          { text: "<class 'str'>" },
          { text: 'Tunde', why: 'type() tells you the type, not the value.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the type of share',
        starter: 'share = 25000\n',
        solution: 'share = 25000\nprint(type(share))\n',
        hint: 'print(type(share))',
        checks: [
          { message: "Print <class 'int'>", outputIncludes: "<class 'int'>" },
          { message: 'Use type()', codeIncludes: 'type(' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(type(10 / 2))',
        language: 'python',
        options: [
          { text: "<class 'float'>" },
          { text: "<class 'int'>", why: '/ always gives a float, even 10 / 2.' },
          { text: '5', why: 'type() shows the type, not the answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the value to what type() says.',
        pairs: [
          ['25000', "<class 'int'>"],
          ['25000.0', "<class 'float'>"],
          ['"25000"', "<class 'str'>"],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Find the sneaky one: print the type of all three',
        starter: 'members = 11\nshare = "25000"\nfee = 50\n# Print type() of each\n',
        solution: 'members = 11\nshare = "25000"\nfee = 50\nprint(type(members))\nprint(type(share))\nprint(type(fee))\n',
        hint: 'Three lines: print(type(members)), print(type(share)), print(type(fee)).',
        checks: [
          { message: "Print int, str, int in that order", outputEquals: "<class 'int'>\n<class 'str'>\n<class 'int'>" },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ask Python what name is.',
        language: 'python',
        template: 'print([[1]](name))',
        blanks: [['type']],
        distractors: ['kind', 'class'],
      },
      {
        kind: 'sortGroups',
        prompt: 'What will type() say?',
        groups: ['int', 'float', 'str'],
        items: [
          { text: '7 * 3', group: 0 },
          { text: '7 / 2', group: 1 },
          { text: '"7"', group: 2 },
          { text: '0.5', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada expects every type to be int. Which line will print str?',
        language: 'python',
        lines: ['print(type(11))', 'print(type("11"))', 'print(type(11 * 2))'],
        bug: 1,
        explanation: 'The quotes make "11" a str.',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'When would you actually use type() in real code?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'On every single line.', why: 'Use it when something is surprising, not everywhere.' },
          { text: 'Never, it\'s just for fun.', why: 'It\'s one of the fastest ways to understand a bug.' },
          { text: 'When maths gives a weird answer: check whether something I think is a number is really text.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'type(2.5) is float. What is type(2)? (three letters)',
        answers: ['int', "<class 'int'>"],
        placeholder: 'Type',
      },
    ],
  },
  reflect: {
    prompt: 'type() lets you check an assumption. What assumption do you make every day that you could quickly check?',
    starters: ['I assume...', 'I could check by...'],
  },
  deepen: {
    title: 'Everything is an object',
    summary: 'In Python, numbers, text and even functions are objects with a type. Try print(type(print)) and see what you get.',
  },
  notes: "type() returns the object's type (Python docs, Built-in Functions: type). True division / always returns float (Python tutorial §3.1.1). type(print) is <class 'builtin_function_or_method'>.",
};

export default lesson;
