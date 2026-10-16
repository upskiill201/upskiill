import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 13 — Formatting money with commas: f"{x:,}" and f"{x:,.2f}". */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Formatting money with commas',
  summary: 'Tunde squints at 329950 on the screen. "Is that thirty-two thousand or three hundred thousand?" Ada adds commas, and the naira sign, with two characters in an f-string.',
  minutes: 11,
  outcomes: [
    'Add thousands commas with :,',
    'Show money to two decimals with :,.2f',
    'Put a currency sign in front',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Before and after',
      before: {
        label: 'f"{payout}"',
        text: '329950 and 47142.857142857145. Count the digits to read them.',
      },
      after: {
        label: 'f"₦{payout:,}"',
        text: '₦329,950 and ₦47,142.86. Readable at a glance.',
      },
      notes: [
        'After the value, :, adds a comma every three digits: f"{329950:,}" is 329,950.',
        ':,.2f adds commas and shows exactly two decimals: f"{47142.857142857145:,.2f}" is 47,142.86.',
        'The ₦ is just text before the braces. It\'s for showing only: keep the maths in kobo.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Money that reads well',
      caption: 'The same numbers, raw and formatted.',
      code: 'payout = 329950\nseven_way = 330000 / 7\n\nprint(payout, seven_way)\nprint(f"₦{payout:,}")\nprint(f"₦{seven_way:,.2f}")\n',
      challenge: 'Format 2 ** 20 with commas.',
    },
  ],
  apply: {
    scenario: 'Making money readable.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(f"{330000:,}")',
        language: 'python',
        options: [
          { text: '330000', why: ':, adds the comma.' },
          { text: '3,30,000', why: 'Python groups in threes.' },
          { text: '330,000' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the payout with commas: 329,950',
        starter: 'payout = 329950\n',
        solution: 'payout = 329950\nprint(f"{payout:,}")\n',
        hint: 'f"{payout:,}"',
        checks: [
          { message: 'Print 329,950', outputEquals: '329,950' },
          { message: 'Use :, in the f-string', codeIncludes: ':,' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(f"{1500:,.2f}")',
        language: 'python',
        options: [
          { text: '1,500.00' },
          { text: '1500.00', why: 'The comma in :, adds the thousands separator.' },
          { text: '1,500', why: '.2f adds two decimals.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the seven-way share with commas and 2 decimals: 47,142.86',
        starter: 'share = 330000 / 7\n',
        solution: 'share = 330000 / 7\nprint(f"{share:,.2f}")\n',
        hint: 'f"{share:,.2f}"',
        checks: [{ message: 'Print 47,142.86', outputEquals: '47,142.86' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the format to the output for 1234567.891.',
        pairs: [
          [':,', '1,234,567.891'],
          [':,.2f', '1,234,567.89'],
          [':.0f', '1234568'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Show the pot as ₦330,000.',
        language: 'python',
        template: 'print(f"₦{pot[[1]]}")',
        blanks: [[':,']],
        distractors: [',:', ':.2'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line prints the raw number, with no commas?',
        language: 'python',
        lines: ['print(f"₦{pot:,}")', 'print(f"₦{pot}")', 'print(f"₦{pot:,.2f}")'],
        bug: 1,
        fix: 'print(f"₦{pot:,}")',
        explanation: 'No format code after the value, so no commas.',
      },
      {
        kind: 'writeCode',
        prompt: 'The payout is stored in kobo. Show it as naira with commas: 329,950',
        starter: 'payout_kobo = 32995000\n',
        solution: 'payout_kobo = 32995000\nprint(f"{payout_kobo // 100:,}")\n',
        hint: 'Convert to naira with // 100 inside the braces, then :,',
        checks: [
          { message: 'Print 329,950', outputEquals: '329,950' },
          { message: 'Convert from kobo', codeIncludes: '// 100' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I store the payout as "₦329,950" so it\'s always formatted?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, saves time.', why: 'Then every sum needs converting back.' },
          { text: 'No: store numbers for maths, format only when you print. Text can\'t be added up.' },
          { text: 'Store both.', why: 'Two copies drift apart. Format when showing.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(f"{1000000:,}") show?',
        answers: ['1,000,000'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Formatting changes how a number looks, not what it is. Where has a badly formatted number confused you?',
    starters: ['I misread...', 'Commas would have...'],
  },
  deepen: {
    title: 'Other ways to group',
    summary: ':_ uses underscores instead of commas: f"{330000:_}" is 330_000. Python also lets you write 330_000 in code, to make long numbers readable.',
  },
  notes: 'Thousands separator option "," in format specs: PEP 378. "_" option and underscores in numeric literals: PEP 515 (Python 3.6). f"{330000/7:,.2f}" = "47,142.86"; f"{1234567.891:,}" = "1,234,567.891"; f"{1234567.891:.0f}" = "1234568".',
};

export default lesson;
