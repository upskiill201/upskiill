import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint 1, the last free lesson. Reviews lessons 1–4. Story beat: Ada shows Tunde her first program. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the first program',
  summary: "Lunch break. Ada runs her first program in front of Tunde. Python's story, how programs run, and print(), all mixed together.",
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you know where Python came from and how it runs', 'Write print() lines without help'],
  learn: [
    {
      kind: 'story',
      title: 'Lunch break',
      beats: [
        { speaker: 'narrator', text: 'Ada holds out her phone. Five lines of Python. She presses Run.' },
        { speaker: 'narrator', text: 'The screen prints: OFFICE AJO. Members: 10. Monthly share: 20000.' },
        { speaker: 'ada', text: "Tunde. I wrote this. In my lunch break." },
        { speaker: 'narrator', text: 'Tunde leans in. "Can it tell us who has paid?"' },
        { speaker: 'ada', text: 'Not yet. Give me a few weeks.' },
        { speaker: 'tey', text: "That's how every programmer starts: a few lines that work, and a list of things they want next. Let's check the first part stuck." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1.',
    items: [
      {
        kind: 'mcq',
        prompt: "Python's name comes from...",
        options: [
          { text: 'A snake', why: 'The logo has snakes. The name is from the comedy show.' },
          { text: 'An abbreviation', why: 'It is not short for anything.' },
          { text: "Monty Python's Flying Circus" },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Members: 10',
        starter: '',
        solution: 'print("Members: 10")\n',
        hint: 'print, brackets, and the words in quotes.',
        checks: [{ message: 'Print Members: 10', outputIncludes: 'Members: 10' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the history in order.',
        lines: ['A hobby project over Christmas', 'The first public release', 'Python 3 arrives', 'Python 2 is retired'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(20000 * 10)',
        language: 'python',
        options: [
          { text: '20000 * 10', why: 'No quotes, so Python works the sum out.' },
          { text: '200000' },
          { text: '2000010', why: '* multiplies.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line will stop the program?',
        language: 'python',
        lines: ['print("OFFICE AJO")', 'print()', 'Print("Members: 10")'],
        bug: 2,
        fix: 'print("Members: 10")',
        explanation: 'Python is case-sensitive. Print is not print.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which version of Python does this course teach? (a number)',
        answers: ['3', 'python 3'],
        placeholder: 'Number',
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'Python runs lines top to bottom', group: 0 },
          { text: 'print() with nothing inside prints an empty line', group: 0 },
          { text: 'Numbers need quotes to be printed', group: 1 },
          { text: 'Python guesses what you meant', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: "Print Ada's lunch-break screen exactly",
        starter: '# OFFICE AJO\n# Members: 10\n# Monthly share: 20000\n',
        solution: 'print("OFFICE AJO")\nprint("Members: 10")\nprint("Monthly share: 20000")\n',
        hint: 'Three print( ) lines, in that order.',
        checks: [{ message: 'The three lines, in order, and nothing else', outputEquals: 'OFFICE AJO\nMembers: 10\nMonthly share: 20000' }],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'How did the demo go?',
        prompt: "Ada's program worked. What's the most useful reply?",
        options: [
          { text: "It worked! Tunde asked if it can tell who has paid. That's what I want to build next." },
          { text: "It worked, so I'm done learning.", why: 'Five lines is the very start.' },
          { text: 'It printed the code instead of the text.', why: 'It ran the code and printed the text.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the line so it prints the pot.',
        language: 'python',
        template: '[[1]](20000 [[2]] 10)',
        blanks: [['print'], ['*']],
        distractors: ['Print', 'x', '+'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its big idea.',
        pairs: [
          ['Where Python came from', 'A 1989 hobby project'],
          ['What it is used for', 'AI, data, websites, automation'],
          ['What a program is', 'Exact steps, top to bottom'],
          ['print()', 'Shows text and numbers'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that prints an empty line',
        language: 'python',
        tiles: ['print(', ')'],
        distractors: ['"', 'empty'],
      },
    ],
  },
  reflect: {
    prompt: "You've finished the first five lessons. What surprised you most about writing code?",
    starters: ['The surprising part was...', 'Next I want to...'],
  },
  deepen: { title: 'Keep going', summary: 'Show someone a program you wrote today. Explaining it out loud is great practice.' },
  notes: 'Review only. 20000 * 10 = 200000.',
};

export default lesson;
