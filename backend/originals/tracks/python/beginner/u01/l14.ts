import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 14 — read code before you write it: predicting output, tracing line by line. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Read code before you write it',
  summary: 'Good programmers read code like a detective: line by line, predicting what each one does before they press Run. It is the fastest way to get better.',
  minutes: 12,
  outcomes: [
    'Predict output before running code',
    'Trace a short program line by line',
    'Write code to match a given output',
  ],
  learn: [
    {
      kind: 'explore',
      title: "Arjun's code. Predict each line, then tap it.",
      text: 'print("=" * 12)\nprint("AJO REPORT")\nprint("Members:", 10)\nprint("Pot:", 10 * 20000)\nprint("Share:", 200000 / 10)\n# print("TODO: who has paid")',
      hotspots: [
        { phrase: 'print("=" * 12)', note: 'Text times 12: a line of 12 equals signs. ============' },
        { phrase: 'print("Members:", 10)', note: 'Two items with a comma: Members: 10, with one space between.' },
        { phrase: 'print("Pot:", 10 * 20000)', note: 'The sum is worked out first: Pot: 200000.' },
        { phrase: 'print("Share:", 200000 / 10)', note: 'Division gives a decimal: Share: 20000.0. Did you predict the .0?' },
        { phrase: '# print("TODO: who has paid")', note: 'Commented out, so it prints nothing. A note for later.' },
      ],
    },
    {
      kind: 'text',
      html: '<p><strong>Predict, then run.</strong> Before you press Run, say out loud what each line will print. Then compare.</p><ul><li><strong>Right?</strong> Your mental model of Python is working.</li><li><strong>Wrong?</strong> Even better: you just found the exact thing to learn. (Most people miss the <code>.0</code> the first time.)</li></ul><p>This is how professional programmers read other people\'s code, and how you\'ll learn from every example in this course.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Predict first',
      caption: 'Guess every line of output in your head. Then press Run and check.',
      code: 'print("=" * 12)\nprint("AJO REPORT")\nprint("Members:", 10)\nprint("Pot:", 10 * 20000)\nprint("Share:", 200000 / 10)\n# print("TODO: who has paid")\n',
      challenge: 'How many of the five lines did you predict exactly right?',
    },
  ],
  apply: {
    scenario: 'Ada learns to read code.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("Share:", 30000 / 10)',
        language: 'python',
        options: [
          { text: 'Share: 3000', why: '/ gives a decimal, so there is a .0.' },
          { text: 'Share:3000.0', why: 'The comma adds a space.' },
          { text: 'Share: 3000.0' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Write code that prints exactly this',
        starter: '# == AJO ==\n# Pot: 200000\n',
        solution: 'print("== AJO ==")\nprint("Pot:", 10 * 20000)\n',
        hint: 'Two print( ) lines. The second can use a comma between "Pot:" and the number.',
        checks: [{ message: 'Print == AJO == then Pot: 200000', outputEquals: '== AJO ==\nPot: 200000' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines does this print?',
        code: 'print("A")\n# print("B")\nprint()\nprint("C")',
        language: 'python',
        options: [
          { text: '4', why: 'The commented line prints nothing.' },
          { text: '3' },
          { text: '2', why: 'print() prints an empty line, which counts.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("ab" * 3) show?',
        answers: ['ababab'],
        placeholder: 'Output',
      },
      {
        kind: 'orderLines',
        prompt: 'This output was printed: AJO, then Members: 10, then a line of dashes. Order the code.',
        language: 'python',
        lines: ['print("AJO")', 'print("Members:", 10)', 'print("-" * 10)'],
      },
      {
        kind: 'findBug',
        prompt: 'Ada predicted "Pot: 200000". Which line will NOT print what she predicted?',
        language: 'python',
        lines: ['print("Members:", 10)', 'print("Pot:", "10 * 20000")'],
        bug: 1,
        fix: 'print("Pot:", 10 * 20000)',
        explanation: 'The sum is in quotes, so it prints as text: Pot: 10 * 20000.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its output.',
        pairs: [
          ['print(9 / 3)', '3.0'],
          ['print(9 * 3)', '27'],
          ['print("9" + "3")', '93'],
          ['print("-" * 3)', '---'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Recreate this report',
        starter: '# ------\n# Members: 12\n# ------\n',
        solution: 'print("-" * 6)\nprint("Members:", 12)\nprint("-" * 6)\n',
        hint: 'A line of 6 dashes is "-" * 6.',
        checks: [{ message: 'Print the three lines exactly', outputEquals: '------\nMembers: 12\n------' }],
      },
      {
        kind: 'mcq',
        prompt: 'You predicted wrong. What is the best thing to do?',
        options: [
          { text: 'Ignore it and move on', why: 'A wrong prediction points straight at a gap.' },
          { text: 'Stop predicting', why: 'Predicting is what makes the learning stick.' },
          { text: 'Work out which line surprised you and why: that is the thing to learn' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that prints Share: 20000.0',
        language: 'python',
        tiles: ['print(', '"Share:"', ',', '200000 / 10', ')'],
        distractors: ['"200000 / 10"', '+'],
      },
    ],
  },
  reflect: {
    prompt: 'Which prediction did you get wrong in this lesson? What did it teach you?',
    starters: ['I predicted...', 'It actually...', 'Now I know...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Before running any example in the next lessons, write your prediction in a comment first. Then run it and compare.',
  },
  notes: 'Predicting before running (predict-run-investigate, PRIMM) is an established approach in programming education; stated generally. 200000 / 10 = 20000.0; 30000 / 10 = 3000.0; 9 / 3 = 3.0.',
};

export default lesson;
