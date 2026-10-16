import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4 — Text and numbers are different types: "25000" vs 25000, int vs float vs str. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Text and numbers are different types',
  summary: 'Ada prints the pot and gets 2500025000250002500025000... Tunde laughs for a full minute. One pair of quotes made her share text instead of a number.',
  minutes: 12,
  outcomes: [
    'Tell a number from text that looks like a number',
    'Know three types: int, float and str',
    'Predict what + and * do to text and to numbers',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'One pair of quotes',
      before: {
        label: 'share = "25000"',
        text: 'Text. "25000" * 3 repeats it: 250002500025000. "25000" + 1 is a TypeError: you can\'t add text and a number.',
      },
      after: {
        label: 'share = 25000',
        text: 'A number. 25000 * 3 is 75000. 25000 + 1 is 25001. Maths works.',
      },
      notes: [
        'Every value has a type. Three you\'ll use all the time: int (whole numbers like 25000), float (decimals like 2500.5) and str (text, in quotes).',
        'Quotes decide it. "25000" is a str, however much it looks like a number.',
        '+ means add for numbers but join for text, and * means multiply for numbers but repeat for text.',
      ],
    },
    {
      kind: 'tryIt',
      title: "Tunde's favourite bug",
      caption: 'Run it. Then remove the quotes around 25000 and run it again.',
      code: 'share = "25000"\nprint(share * 3)\n\nshare = 25000\nprint(share * 3)\n',
      challenge: 'Try print("25000" + 1). Read the error message: it names both types.',
    },
  ],
  apply: {
    scenario: 'Text or number?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which type is it?',
        groups: ['int', 'float', 'str'],
        items: [
          { text: '25000', group: 0 },
          { text: '2500.5', group: 1 },
          { text: '"25000"', group: 2 },
          { text: '"Tunde"', group: 2 },
          { text: '11', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("10" * 2)',
        language: 'python',
        options: [
          { text: '20', why: '"10" is text, so * repeats it.' },
          { text: '1010' },
          { text: 'An error', why: 'Text times a whole number is allowed: it repeats.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: "Fix Ada's bug so the pot prints 250000",
        starter: 'members = 10\nshare = "25000"\nprint(members * share)\n',
        solution: 'members = 10\nshare = 25000\nprint(members * share)\n',
        hint: 'A number has no quotes.',
        checks: [
          { message: 'Print 250000', outputEquals: '250000' },
          { message: 'Make share a number', expr: 'share == 25000' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "25000" + 1 give a TypeError?',
        options: [
          { text: '25000 is too big', why: 'Python handles huge numbers easily.' },
          { text: 'There\'s a missing bracket', why: 'The brackets are fine. The types don\'t match.' },
          { text: 'Python can\'t add text and a number' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it gives.',
        pairs: [
          ['25000 * 2', '50000'],
          ['"ab" * 2', 'abab'],
          ['"Ada" + "!"', 'Ada!'],
          ['10 / 4', '2.5'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print a banner of 3 AJO words in a row, using * on text',
        starter: 'word = "AJO "\n',
        solution: 'word = "AJO "\nprint(word * 3)\n',
        hint: 'print(word * 3)',
        checks: [
          { message: 'Print AJO AJO AJO', outputIncludes: 'AJO AJO AJO' },
          { message: 'Use * to repeat the text', codeIncludes: '* 3' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes the pot come out as repeated text?',
        language: 'python',
        lines: ['members = 10', 'share = "25000"', 'print(members * share)'],
        bug: 1,
        fix: 'share = 25000',
        explanation: 'With quotes, share is text, so members * share repeats it ten times.',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Tunde just messaged me: "Your tracker says the pot is 2500025000250002500025000... Are we rich?"',
        prompt: "Ada's best reply?",
        options: [
          { text: 'It\'s repeating the text "25000". I put quotes round a number. Fixing it now.' },
          { text: 'Yes! Everyone gets millions.', why: 'Sadly, it\'s a bug: the share was text.' },
          { text: 'Python is broken.', why: 'Python did exactly what the code said.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What type is "Tunde"? (three letters)',
        answers: ['str', 'string'],
        placeholder: 'Type',
      },
      {
        kind: 'fillBlank',
        prompt: 'Make share a whole number, not text.',
        language: 'python',
        template: 'share = [[1]]',
        blanks: [['25000']],
        distractors: ['"25000"', "'25000'"],
      },
    ],
  },
  reflect: {
    prompt: 'Have you seen a spreadsheet treat a number as text (a phone number losing its 0, a total that won\'t add up)? What caused it?',
    starters: ['I saw...', 'It happened because...'],
  },
  deepen: {
    title: 'More types',
    summary: 'Python has many more types: True/False (bool), lists, dictionaries. You\'ll meet each one when Ada needs it.',
  },
  notes: 'Built-in types int, float, str (Python docs, Built-in Types). str * int repeats; str + int raises TypeError: can only concatenate str (not "int") to str. 10 / 4 = 2.5.',
};

export default lesson;
