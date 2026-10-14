import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3 — free. What a program is: exact instructions, run top to bottom. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'What is a program?',
  summary: 'A program is a recipe a computer follows exactly: every step, in order, top to bottom. No guessing what you meant.',
  minutes: 12,
  outcomes: [
    'Explain what a program is',
    'Predict the order lines run in',
    'Write a program with several lines',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'How Python runs your code',
      steps: [
        {
          title: 'A program is a list of instructions',
          body: 'Like a recipe: "boil water, add rice, wait 15 minutes". Each line is one instruction.',
        },
        {
          title: 'Python runs them top to bottom',
          body: 'Line 1, then line 2, then line 3. The order you write is the order it happens.',
          code: 'print("Boil the water")\nprint("Add the rice")\nprint("Wait 15 minutes")',
          language: 'python',
        },
        {
          title: 'It does exactly what you wrote',
          body: 'Not what you meant. If you write the steps in the wrong order, Python follows the wrong order. Computers are fast, not clever.',
        },
        {
          title: 'The interpreter reads it',
          body: 'Python reads your code with a program called an interpreter. It reads a line, runs it, then moves on to the next.',
        },
        {
          title: 'If a line goes wrong, it stops',
          body: 'When a line goes wrong while the program runs, the lines before it have already run and the lines after it never do. (Some mistakes, like a missing quote, stop Python before it runs anything at all: lesson 9.) Error messages say exactly where to look.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Top to bottom',
      caption: "Ada's ajo, in three steps. Press Run and watch the order.",
      code: 'print("1. Everyone pays in")\nprint("2. One person collects the pot")\nprint("3. Next month, someone else collects")\n',
      challenge: 'Swap the first two lines and run it again. The output order changes with them.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Top to bottom, exactly as written. Python never skips ahead or guesses what you meant.',
    },
  ],
  apply: {
    scenario: "Ada's first multi-line program.",
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a program?',
        options: [
          { text: 'A list of instructions the computer follows exactly, in order' },
          { text: 'A computer that understands what you mean', why: 'It follows what you wrote, not what you meant.' },
          { text: 'An app you download', why: 'Apps are programs, but a program can be one line you wrote.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What is the FIRST line this prints?',
        code: 'print("Collect the pot")\nprint("Pay in")',
        language: 'python',
        options: [
          { text: 'Collect the pot' },
          { text: 'Pay in', why: 'Python runs top to bottom, even when the order is silly.' },
          { text: 'Both at the same time', why: 'One line at a time, in order.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the lines in order so the steps print correctly.',
        language: 'python',
        lines: ['print("Pay in your share")', 'print("Wait for your turn")', 'print("Collect the pot")'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the three ajo steps',
        starter: '# Print these three lines, in this order:\n# Step 1: pay in\n# Step 2: wait your turn\n# Step 3: collect the pot\n',
        solution: 'print("Step 1: pay in")\nprint("Step 2: wait your turn")\nprint("Step 3: collect the pot")\n',
        hint: 'One print( ) per line, each with its text in quotes, in the right order.',
        checks: [
          {
            message: 'Print the three steps, in order, and nothing else',
            outputEquals: 'Step 1: pay in\nStep 2: wait your turn\nStep 3: collect the pot',
          },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The program that reads and runs your Python code is called the ... (one word)',
        answers: ['interpreter'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'True about how Python runs code, or not?',
        groups: ['True', 'Not true'],
        items: [
          { text: 'It runs lines top to bottom', group: 0 },
          { text: 'It guesses what you meant', group: 1 },
          { text: 'It stops at an error', group: 0 },
          { text: 'It runs the last line first', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada wants the steps in the right order. Which line is in the wrong place?',
        language: 'python',
        lines: ['print("Collect the pot")', 'print("Pay in")', 'print("Wait your turn")'],
        bug: 0,
        fix: 'Move print("Collect the pot") to the end.',
        explanation: 'Collecting the pot is the last step, so its line goes last.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its meaning.',
        pairs: [
          ['Program', 'A list of instructions'],
          ['Interpreter', 'Reads and runs Python'],
          ['Line', 'One instruction'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In a 4-line program, line 2 goes wrong while it runs (say, dividing by zero). Which lines run?',
        options: [
          { text: 'Only line 1' },
          { text: 'All of them', why: 'Python stops at the error.' },
          { text: 'Lines 3 and 4', why: 'Python never gets past the mistake on line 2.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Ada on one line, then Lagos on the next',
        starter: '',
        solution: 'print("Ada")\nprint("Lagos")\n',
        hint: 'Two print( ) lines, one after the other.',
        checks: [{ message: 'Print Ada, then Lagos on its own line', outputEquals: 'Ada\nLagos' }],
      },
    ],
  },
  reflect: {
    prompt: 'Write a "program" for something you do every morning, as numbered steps. What happens if two steps swap places?',
    starters: ['1.', 'If two steps swapped...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your morning routine as print lines, run it, then swap two lines and run it again.',
  },
  notes: 'CPython reads source, compiles to bytecode and executes; "reads a line, runs it" is a standard beginner simplification of the observable behaviour. Lines before an exception run; a SyntaxError stops the whole file before anything runs (taught in lesson 9).',
};

export default lesson;
