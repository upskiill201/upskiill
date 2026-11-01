import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: converting, constants, swapping, tracing. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the swap that worked',
  summary: 'Tunde gets his wedding money a month early, Bisi takes his slot, and the tracker shows the swap correctly. Quick check on converting, constants, swaps and tracing.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Convert between text and numbers', 'Swap values and trace code without notes'],
  learn: [
    {
      kind: 'story',
      title: 'The 25th, wedding month',
      beats: [
        { speaker: 'narrator', text: 'Pay day. Ada runs the tracker: "This month: Tunde. Next month: Bisi." Tunde takes the envelope and hugs everyone.' },
        { speaker: 'narrator', text: 'Tunde, to the whole office: "For the record, the program is better than the notebook."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: converting, constants, swaps, tracing.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add the two payments from the bank, converting them first',
        starter: 'first = "25000"\nsecond = "12500"\n',
        solution: 'first = "25000"\nsecond = "12500"\nprint(int(first) + int(second))\n',
        hint: 'int(first) + int(second)',
        checks: [
          { message: 'Print 37500', outputEquals: '37500' },
          { message: 'Convert with int()', codeIncludes: 'int(' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'a = "Tunde"\nb = "Bisi"\na, b = b, a\nprint(a)',
        language: 'python',
        options: [
          { text: 'Tunde', why: 'After the swap, a holds what b held.' },
          { text: 'Tunde Bisi', why: 'print(a) prints only a.' },
          { text: 'Bisi' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Works, or error?',
        groups: ['Works', 'Error'],
        items: [
          { text: 'int("25000")', group: 0 },
          { text: 'int("twenty")', group: 1 },
          { text: 'str(25000) + " naira"', group: 0 },
          { text: '25000 + " naira"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'fee = 50\ntotal = 1000 + fee\nfee = 0\nprint(total)',
        language: 'python',
        options: [
          { text: '1000', why: 'total was worked out when fee was 50.' },
          { text: '1050' },
          { text: '50', why: 'That\'s the old fee.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make constants GROUP_NAME and PAY_DAY, then print OFFICE AJO pays on the 25th',
        starter: '',
        solution: 'GROUP_NAME = "OFFICE AJO"\nPAY_DAY = 25\nprint(f"{GROUP_NAME} pays on the {PAY_DAY}th")\n',
        hint: 'Two constants in capitals, then one f-string.',
        checks: [
          { message: 'Print OFFICE AJO pays on the 25th', outputEquals: 'OFFICE AJO pays on the 25th' },
          { message: 'Make the constant PAY_DAY', expr: 'PAY_DAY == 25' },
          { message: 'Make the constant GROUP_NAME', expr: 'GROUP_NAME == "OFFICE AJO"' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the safe swap.',
        language: 'python',
        lines: ['temp = this_month', 'this_month = next_month', 'next_month = temp'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its result.',
        pairs: [
          ['int("7") + 1', '8'],
          ['str(7) + "1"', '71'],
          ['int(7.9)', '7'],
          ['float("7")', '7.0'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the constant convention?',
        language: 'python',
        lines: ['MONTHS_IN_YEAR = 12', 'Share_Amount = 25000', 'PAY_DAY = 25'],
        bug: 1,
        fix: 'SHARE_AMOUNT = 25000',
        explanation: 'Constants are all capitals with underscores.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Swap in one line.',
        language: 'python',
        template: 'this_month, next_month = [[1]], [[2]]',
        blanks: [['next_month'], ['this_month']],
        distractors: ['temp', 'this_month + next_month'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print Paid: 12500.5 from the text "12500.50"',
        starter: 'paid = "12500.50"\n',
        solution: 'paid = "12500.50"\nprint(f"Paid: {float(paid)}")\n',
        hint: 'float(paid) inside an f-string.',
        checks: [{ message: 'Print Paid: 12500.5', outputEquals: 'Paid: 12500.5' }],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Tunde and Bisi swapped. What\'s the one swap mistake to avoid?',
        prompt: "Ada's answer?",
        options: [
          { text: 'Overwriting one value before saving it, like a = b then b = a.' },
          { text: 'Using too many variables.', why: 'A temp variable is fine.' },
          { text: 'Swapping on a Monday.', why: 'Any day works.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(int("30") * 2) show?',
        answers: ['60'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Which of this week\'s ideas would you explain to a friend first, and how?',
    starters: ['I\'d start with...', 'I\'d explain it as...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 11-14. 25000 + 12500 = 37500; float("12500.50") = 12500.5.',
};

export default lesson;
