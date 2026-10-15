import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 11 — Python as a calculator: + - * /, order of operations, and text times a number. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Python as a calculator',
  summary: "Ada's phone calculator can't remember the sum she did yesterday. Python can show its working, share it, and run it again next month.",
  minutes: 12,
  outcomes: [
    'Use + - * and / in Python',
    'Predict the order Python works a sum out in',
    'Repeat text with *, for banners and lines',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Phone calculator vs Python',
      before: { label: 'Calculator', text: '20000 × 10 = 200000\n\nNext month: type it all again. Was it ×10 or ×11? Nobody remembers.' },
      after: { label: 'Python', text: 'print("Pot:", 20000 * 10)\n\nPot: 200000\n\nThe sum is written down, readable, and runs again any time.' },
      notes: ['The working is saved in the code.', 'Anyone can check it.', 'Change one number and run it again.'],
    },
    {
      kind: 'text',
      html: '<p><strong>The four basics</strong>: <code>+</code> add, <code>-</code> subtract, <code>*</code> multiply, <code>/</code> divide.</p><p><strong>Division gives a decimal.</strong> <code>200000 / 10</code> is <code>20000.0</code>, with a <code>.0</code>, even when it divides exactly. (Chapter 3 shows how to get whole numbers.)</p><p><strong>Order of operations:</strong> Python does <code>*</code> and <code>/</code> before <code>+</code> and <code>-</code>, like you learned at school. <code>2 + 3 * 4</code> is 14. Use brackets to choose: <code>(2 + 3) * 4</code> is 20.</p><p><strong>Bonus trick:</strong> text times a number repeats it. <code>"=" * 20</code> makes a line of 20 equals signs, perfect for a banner.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The ajo maths',
      caption: 'A banner, the pot, and each person\'s share. Press Run.',
      code: 'print("=" * 20)\nprint("Pot:", 20000 * 10)\nprint("Share:", 200000 / 10)\nprint("=" * 20)\n',
      challenge: 'A new member joins. Change both 10s to 11 and run it again.',
    },
  ],
  apply: {
    scenario: "Ada works out the ajo's numbers.",
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(2 + 3 * 4)',
        language: 'python',
        options: [
          { text: '14' },
          { text: '20', why: '* comes before +. That would need brackets: (2 + 3) * 4.' },
          { text: '9', why: 'That is 2 + 3 + 4.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the pot for 12 members paying 15000 each',
        starter: '# 12 members, 15000 each\n',
        solution: 'print(12 * 15000)\n',
        hint: 'Multiply with *: print(12 * 15000)',
        checks: [
          { message: 'Print 180000', outputIncludes: '180000' },
          { message: 'Let Python do the multiplying', codeIncludes: '*' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(200000 / 10)',
        language: 'python',
        options: [
          { text: '20000.0' },
          { text: '20000', why: '/ always gives a decimal in Python 3, even for exact answers.' },
          { text: '2000000', why: 'That is multiplying.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the symbol to what it does.',
        pairs: [
          ['+', 'Add'],
          ['-', 'Subtract'],
          ['*', 'Multiply'],
          ['/', 'Divide'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print((2 + 3) * 4) show?',
        answers: ['20'],
        placeholder: 'Output',
      },
      {
        kind: 'writeCode',
        prompt: 'Print a banner: a line of 10 stars, AJO, then 10 stars',
        starter: '',
        solution: 'print("*" * 10)\nprint("AJO")\nprint("*" * 10)\n',
        hint: 'Text times a number repeats it: "*" * 10',
        checks: [
          { message: 'Print **********, AJO, then **********', outputEquals: '**********\nAJO\n**********' },
          { message: 'Use * to repeat the stars instead of typing them', codeIncludes: '* 10' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada wants the share for 10 people: 20000. Which line gives the wrong answer?',
        language: 'python',
        lines: ['print("Pot:", 20000 * 10)', 'print("Share:", 200000 * 10)'],
        bug: 1,
        fix: 'print("Share:", 200000 / 10)',
        explanation: 'Sharing means dividing: / not *.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which does Python do first?',
        groups: ['Done first', 'Done after'],
        items: [
          { text: 'The * in 2 + 3 * 4', group: 0 },
          { text: 'The + in 2 + 3 * 4', group: 1 },
          { text: 'Anything in brackets', group: 0 },
          { text: 'The - in 10 - 6 / 2', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the sum give 20: add brackets.',
        language: 'python',
        template: 'print([[1]]2 + 3[[2]] * 4)',
        blanks: [['('], [')']],
        distractors: ['[', ']'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that prints a line of 20 dashes',
        language: 'python',
        tiles: ['print(', '"-"', '*', '20', ')'],
        distractors: ['+', '"20"'],
      },
    ],
  },
  reflect: {
    prompt: 'What is a sum you do again and again (bills, savings, splitting costs)? Write it as one line of Python.',
    starters: ['The sum I repeat is...', 'In Python: print('],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a 3-line program that works out a real bill you split with friends: the total, the number of people, and each share.',
  },
  notes: 'Python 3: / is true division and returns float (PEP 238). Operator precedence: * / before + - (Python reference, operator precedence). str * int repeats the string.',
};

export default lesson;
