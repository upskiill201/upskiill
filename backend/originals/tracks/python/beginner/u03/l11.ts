import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 11 — += and friends: running totals with augmented assignment. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: '+= and friends',
  summary: 'Payments trickle in all week. Ada keeps a running total: collected = collected + 3000000, again and again. Arjun shows her the shortcut every programmer uses.',
  minutes: 11,
  outcomes: [
    'Keep a running total with +=',
    'Use -=, *= and //= too',
    'Know that x += 1 means x = x + 1',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A running total',
      steps: [
        {
          title: '1. Start at zero',
          body: 'Nobody has paid yet on the 1st.',
          code: 'collected_kobo = 0',
          language: 'python',
        },
        {
          title: '2. The long way',
          body: 'Add a payment to whatever is there.',
          code: 'collected_kobo = collected_kobo + 3000000',
          language: 'python',
        },
        {
          title: '3. The shortcut',
          body: '+= means "add to this variable". Exactly the same as step 2, with less typing and no chance of misspelling the name twice.',
          code: 'collected_kobo += 3000000',
          language: 'python',
        },
        {
          title: '4. Its friends',
          body: '-= takes away, *= multiplies, //= floor-divides. Each one updates the variable in place.',
          code: 'collected_kobo -= 5000  # bank fee\nmembers += 1\nsavings *= 2',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Payments come in',
      caption: 'Three payments, then the bank fee.',
      code: 'collected_kobo = 0\n\ncollected_kobo += 3000000  # Tunde\ncollected_kobo += 3000000  # Bisi\ncollected_kobo += 1500000  # Kemi, half\ncollected_kobo -= 5000     # bank fee\n\nprint(collected_kobo)\nprint(f"{collected_kobo // 100} naira")\n',
      challenge: 'Kemi pays her second half. Add it with +=.',
    },
  ],
  apply: {
    scenario: 'Payments trickle in.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'total = 10\ntotal += 5\nprint(total)',
        language: 'python',
        options: [
          { text: '15' },
          { text: '5', why: '+= adds to what\'s there.' },
          { text: '105', why: 'Both are numbers, so it adds.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add two payments of 3000000 kobo with +=, then print the total',
        starter: 'collected_kobo = 0\n',
        solution: 'collected_kobo = 0\ncollected_kobo += 3000000\ncollected_kobo += 3000000\nprint(collected_kobo)\n',
        hint: 'collected_kobo += 3000000, twice.',
        checks: [
          { message: 'Print 6000000', outputEquals: '6000000' },
          { message: 'Use +=', codeIncludes: '+=' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the shortcut to the long way.',
        pairs: [
          ['x += 2', 'x = x + 2'],
          ['x -= 2', 'x = x - 2'],
          ['x *= 2', 'x = x * 2'],
          ['x //= 2', 'x = x // 2'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = 11\nmembers -= 4\nprint(members)',
        language: 'python',
        options: [
          { text: '15', why: '-= takes away.' },
          { text: '-4', why: 'It subtracts from the current value, 11.' },
          { text: '7' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Take the 5000 kobo bank fee off the collected total with -=, then print it',
        starter: 'collected_kobo = 7500000\n',
        solution: 'collected_kobo = 7500000\ncollected_kobo -= 5000\nprint(collected_kobo)\n',
        hint: 'collected_kobo -= 5000',
        checks: [
          { message: 'Print 7495000', outputEquals: '7495000' },
          { message: 'Use -=', codeIncludes: '-=' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line forgets to keep the running total?',
        language: 'python',
        lines: ['collected = 0', 'collected += 3000000', 'collected = 3000000', 'print(collected)'],
        bug: 2,
        fix: 'collected += 3000000',
        explanation: 'collected = 3000000 replaces the total instead of adding to it.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Add Kemi\'s half to the total.',
        language: 'python',
        template: 'collected_kobo [[1]] 1500000',
        blanks: [['+=']],
        distractors: ['=+', '=='],
      },
      {
        kind: 'sortGroups',
        prompt: 'collected = 100. Does the line make it bigger or smaller?',
        groups: ['Bigger', 'Smaller'],
        items: [
          { text: 'collected += 50', group: 0 },
          { text: 'collected -= 50', group: 1 },
          { text: 'collected *= 2', group: 0 },
          { text: 'collected //= 2', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Is += just to save typing?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'It\'s faster for the computer.', why: 'The main win is clarity and fewer typos.' },
          { text: 'It does something different from x = x + 1.', why: 'For numbers, it\'s the same.' },
          { text: 'Mostly, but it also means you write the name once, so there\'s no chance of a typo on one side.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'x = 3, then x *= 4. What is x?',
        answers: ['12'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'A running total starts at zero and grows. What running total do you keep in your head (steps, spending, pages read)?',
    starters: ['I keep a running total of...', 'It would help to...'],
  },
  deepen: {
    title: 'Watch out for =+',
    summary: 'x =+ 5 is not a typo Python catches: it means x = +5, so it replaces x with 5. Always write += with the + first.',
  },
  notes: 'Augmented assignment statements (Python Language Reference §7.2.1: +=, -=, *=, //=, etc.). 3000000 * 2 + 1500000 - 5000 = 7495000; x =+ 5 parses as x = (+5).',
};

export default lesson;
