import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 14 — Reading variables in someone else's code: tracing values line by line. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: "Reading variables in someone else's code",
  summary: 'Arjun sends a snippet from the startup\'s app: "What does this print? Don\'t run it." Ada traces it line by line, the way programmers read code every day.',
  minutes: 12,
  outcomes: [
    'Trace a variable\'s value line by line',
    'Predict the output before running',
    'Spot where a value changes',
  ],
  learn: [
    {
      kind: 'explore',
      title: "Arjun's snippet",
      text: 'fee = 100, then total = 25000 + fee, then fee = 200, then print(total). It prints 25100, not 25200. total was worked out once, when its line ran, and doesn\'t change when fee does.',
      hotspots: [
        { phrase: 'fee = 100', note: 'Line 1. The box fee holds 100.' },
        { phrase: 'total = 25000 + fee', note: 'Line 2. Python works it out now, with fee as 100: total is 25100.' },
        { phrase: 'fee = 200', note: 'Line 3. fee changes. total doesn\'t: it stored a number, not a formula.' },
        { phrase: 'It prints 25100, not 25200', note: 'Unlike a spreadsheet cell, a variable doesn\'t recalculate. To update total, run its line again.' },
      ],
    },
    {
      kind: 'text',
      html: '<p><strong>How to trace:</strong> go line by line, top to bottom, and keep a little table: each variable and its value right now. When a line changes a variable, cross out the old value. At a <code>print</code>, read the table.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Check the trace',
      caption: 'Predict first, then run. Were you right?',
      code: 'fee = 100\ntotal = 25000 + fee\nfee = 200\nprint(total)\n\ntotal = 25000 + fee\nprint(total)\n',
      challenge: 'Add print(fee) between every line and watch it change.',
    },
  ],
  apply: {
    scenario: 'Predict before you run.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'x = 5\ny = x * 2\nx = 100\nprint(y)',
        language: 'python',
        options: [
          { text: '10' },
          { text: '200', why: 'y was worked out when x was 5. It doesn\'t recalculate.' },
          { text: '100', why: 'That\'s x.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Recalculate total after fee changes, so it prints 25200',
        starter: 'fee = 100\ntotal = 25000 + fee\nfee = 200\n# Make total use the new fee, then print it\n',
        solution: 'fee = 100\ntotal = 25000 + fee\nfee = 200\ntotal = 25000 + fee\nprint(total)\n',
        hint: 'Run total = 25000 + fee again, after fee = 200.',
        checks: [
          { message: 'Print 25200', outputEquals: '25200' },
          { message: 'total ends as 25200', expr: 'total == 25200' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'name = "Tunde"\nmsg = f"Hi {name}"\nname = "Bisi"\nprint(msg)',
        language: 'python',
        options: [
          { text: 'Hi Bisi', why: 'msg was built when name was Tunde.' },
          { text: 'Hi Tunde' },
          { text: 'Hi {name}', why: 'It\'s an f-string, so the braces were filled in.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'a = 1, b = a + 1, a = 10. What is each value now?',
        groups: ['Is 10', 'Is 2'],
        items: [
          { text: 'a', group: 0 },
          { text: 'b', group: 1 },
          { text: 'b * 5', group: 0 },
          { text: 'a - 8', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print members after each change: 10, then 11, then 13',
        starter: 'members = 10\nprint(members)\nmembers = members + 1\n',
        solution: 'members = 10\nprint(members)\nmembers = members + 1\nprint(members)\nmembers = members + 2\nprint(members)\n',
        hint: 'Print after the + 1, then add 2 and print again.',
        checks: [{ message: 'Print 10, 11, 13 on three lines', outputEquals: '10\n11\n13' }],
      },
      {
        kind: 'findBug',
        prompt: 'Ada expects 25200. Which line runs too early?',
        language: 'python',
        lines: ['fee = 100', 'total = 25000 + fee', 'fee = 200', 'print(total)'],
        bug: 1,
        fix: 'Move total = 25000 + fee to after fee = 200',
        explanation: 'total is worked out once, with whatever fee is at that moment.',
      },
      {
        kind: 'matchPairs',
        prompt: 'x = 3, then x = x * 2, then x = x + 1. Match the moment to the value.',
        pairs: [
          ['After line 1', '3'],
          ['After line 2', '6'],
          ['After line 3', '7'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why trace by hand when you could just run it?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Because reading code is most of the job, and tracing is how I find bugs before running anything.' },
          { text: 'You\'re right, never trace.', why: 'Tracing is how you understand code you didn\'t write.' },
          { text: 'Running code is dangerous.', why: 'Not here. Tracing just builds understanding.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'a = 4, b = a, a = 9. What is b?',
        answers: ['4'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'How is a Python variable different from a spreadsheet formula?',
        options: [
          { text: 'It recalculates automatically', why: 'That\'s the spreadsheet.' },
          { text: 'There\'s no difference', why: 'That\'s exactly the trap in Arjun\'s snippet.' },
          { text: 'It stores a value once; it doesn\'t recalculate when other variables change' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Tracing means slowing down and checking each step. Where else would slowing down to trace each step save you a mistake?',
    starters: ['I rush when...', 'Tracing would help with...'],
  },
  deepen: {
    title: 'Python Tutor',
    summary: 'pythontutor.com draws every variable as you step through code. Paste Arjun\'s snippet and watch it.',
  },
  notes: 'Assignment binds the evaluated value, not an expression (Python Language Reference §7.2). 25000 + 100 = 25100; 25000 + 200 = 25200. Python Tutor: Philip Guo, pythontutor.com.',
};

export default lesson;
