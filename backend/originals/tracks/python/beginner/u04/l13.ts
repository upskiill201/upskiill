import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 13 — Converting input to numbers: int(input(...)), and cleaning first. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Converting input to numbers',
  summary: 'Ada fixes the 300001500 bug the way Kemi would: convert on the way in. One line, int(input(...)), and the tracker can do maths with what people type.',
  minutes: 12,
  outcomes: [
    'Convert an answer with int(input(...))',
    'Clean an answer before converting it',
    'Use float() when decimals are allowed',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One line, three jobs',
      text: 'amount = int(input("Amount paid: ").strip().replace(",", "")) asks the question, cleans the answer and turns it into a whole number. If the user types " 30,000 ", amount is 30000.',
      hotspots: [
        { phrase: 'input("Amount paid: ")', note: 'Runs first, innermost: shows the prompt and gives back the typed text.' },
        { phrase: '.strip()', note: 'Removes spaces at the ends of the answer.' },
        { phrase: '.replace(",", "")', note: 'Removes commas, so "30,000" becomes "30000".' },
        { phrase: 'int(', note: 'Runs last, outermost: turns the cleaned text into a number. If it still isn\'t a whole number, ValueError.' },
        { phrase: 'amount is 30000', note: 'An int at last: + adds, * multiplies, and the late fee works.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Adding the late fee, properly',
      caption: 'Bisi types " 30,000 " with spaces and a comma.',
      code: 'amount = int(input("Amount paid: ").strip().replace(",", ""))\nLATE_FEE = 1500\n\nprint(amount + LATE_FEE)\n',
      stdin: [' 30,000 '],
      challenge: 'Try it with float() instead of int(), and type 12500.50.',
    },
  ],
  apply: {
    scenario: 'Converting answers on the way in.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In int(input("Amount: ")), which runs first?',
        options: [
          { text: 'int()', why: 'int() needs input()\'s answer first.' },
          { text: 'Both at once', why: 'Inside out: input(), then int().' },
          { text: 'input(): the inside runs before the outside' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Ask "Amount paid: ", convert it with int(), and print it plus 1500',
        starter: '',
        solution: 'amount = int(input("Amount paid: "))\nprint(amount + 1500)\n',
        hint: 'amount = int(input("Amount paid: "))',
        stdin: ['30000'],
        checks: [
          { message: 'Print 31500', outputIncludes: '31500' },
          { message: 'Convert with int()', codeIncludes: 'int(input(' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The user types 30,000 with a comma. Clean it, convert it and print it',
        starter: '',
        solution: 'amount = int(input("Amount paid: ").replace(",", ""))\nprint(amount)\n',
        hint: 'int(input(...).replace(",", ""))',
        stdin: ['30,000'],
        checks: [
          { message: 'Print 30000', outputIncludes: '30000' },
          { message: 'Use .replace()', codeIncludes: '.replace(' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Will int() accept the answer?',
        groups: ['Works', 'ValueError'],
        items: [
          { text: 'The user types 30000', group: 0 },
          { text: 'The user types thirty thousand', group: 1 },
          { text: 'The user types 12500.50', group: 1 },
          { text: 'The user types  2 (with a space)', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the answer to the right converter.',
        pairs: [
          ['Months paid: 3', 'int()'],
          ['Amount with kobo: 12500.50', 'float()'],
          ['A member\'s name', 'No conversion'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line converts too late?',
        language: 'python',
        lines: ['amount = input("Amount: ")', 'total = amount + 1500', 'print(int(total))'],
        bug: 1,
        fix: 'total = int(amount) + 1500',
        explanation: 'amount is still text on line 2: TypeError. Convert before doing maths.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Ask and convert in one line.',
        language: 'python',
        template: 'months = [[1]]([[2]]("Months paid: "))',
        blanks: [['int'], ['input']],
        distractors: ['str', 'print'],
      },
      {
        kind: 'writeCode',
        prompt: 'Ask "Amount: " and print it as a float (the user types 12500.50)',
        starter: '',
        solution: 'amount = float(input("Amount: "))\nprint(amount)\n',
        hint: 'float(input("Amount: "))',
        stdin: ['12500.50'],
        checks: [{ message: 'Print 12500.5', outputIncludes: '12500.5' }],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'What happens if Bisi types "thirty thousand"?',
        prompt: "Ada's honest answer?",
        options: [
          { text: 'int() raises a ValueError and the program stops. Chapter 5 checks answers first; Chapter 10 catches the error.' },
          { text: 'Python understands words.', why: 'int("thirty thousand") is a ValueError.' },
          { text: 'It gives 0.', why: 'It gives an error, not 0.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The user types 4. What does print(int(input("? ")) * 2) show after the prompt? (just the answer)',
        answers: ['8'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: '"Clean, then convert" happens all over the place: forms, bank apps, calculators. Where do you rely on someone else doing it well?',
    starters: ['I rely on...', 'When it fails...'],
  },
  deepen: {
    title: 'Bad answers are coming',
    summary: 'People will type "thirty", "N30k" or nothing at all. Chapter 5 checks answers with if; Chapter 10 handles errors with try and except.',
  },
  notes: 'Nested calls evaluate inside out. int() accepts surrounding whitespace; it raises ValueError on "12500.50" or words. float("12500.50") = 12500.5. Output for input with stdin: the runner echoes "Amount paid: 30,000" then the printed 30000.',
};

export default lesson;
