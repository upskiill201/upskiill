import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1 — free. Where Python came from, and the first line of code. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Where Python came from',
  summary: 'Christmas 1989, Amsterdam: a programmer needs a hobby project. Today it is one of the most popular languages on Earth, and your first line of it is one tap away.',
  minutes: 12,
  outcomes: [
    'Tell the story of how Python started, and where its name comes from',
    'Know which Python you are learning (Python 3)',
    'Run your first line of Python',
  ],
  learn: [
    {
      kind: 'story',
      title: 'A hobby for the holidays',
      beats: [
        { speaker: 'narrator', text: 'Amsterdam, December 1989. Guido van Rossum works at CWI, the Dutch national research centre for maths and computer science.' },
        { speaker: 'narrator', text: 'The office is closed for the week around Christmas. Guido wants a hobby project to keep him busy. He decides to write a new programming language.' },
        { speaker: 'narrator', text: 'He wants it to be easy to read and fun to use, building on ideas from ABC, a teaching language he had worked on. It needs a name.' },
        { speaker: 'narrator', text: "He's a big fan of a British comedy show, Monty Python's Flying Circus. So he calls it Python. Not after the snake." },
        { speaker: 'narrator', text: 'In February 1991 he shares the first version with the world. Today, millions of people use it.' },
        { speaker: 'narrator', text: 'Lagos, today. Ada runs the savings group at her office: ten colleagues pay in every month, and one takes the whole pot. She tracks it all in a battered notebook.' },
        { speaker: 'ada', text: "Tunde says he paid in March. The notebook says he didn't. This is the third argument this year." },
        { speaker: 'arjun', text: "You need a program, not a notebook. Learn Python. And start where Python started: with one line." },
      ],
      choice: {
        prompt: 'What should Ada do first?',
        options: [
          {
            text: 'Learn what Python is, and run one line of it today',
            outcome: 'Ten minutes later, her phone prints "Hello, Ajo!". It is a tiny start, and it is real code.',
            best: true,
          },
          {
            text: 'Buy a better notebook',
            outcome: "A nicer notebook. The same argument next month, because a notebook can't check anything.",
          },
          {
            text: 'Wait until she has a whole free weekend to learn',
            outcome: "The free weekend never comes. Ten minutes a day beats a weekend you'll never have.",
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Python, in five dates</strong></p><ul><li><strong>1989:</strong> Guido starts Python as a hobby project over Christmas.</li><li><strong>1991:</strong> the first public release (version 0.9.0).</li><li><strong>2000:</strong> Python 2 arrives.</li><li><strong>2008:</strong> Python 3 arrives. It fixed old problems, but older Python 2 code needed changes to run on it.</li><li><strong>2020:</strong> Python 2 is officially retired.</li></ul><p>This course teaches <strong>Python 3</strong>, the Python everyone uses today. Python is free and open source, looked after by the Python Software Foundation.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Your first line of Python',
      caption: 'This is a complete Python program: one line. Press Run.',
      code: 'print("Hello, Ajo!")\n',
      challenge: 'Change the words inside the quotes to your own name and run it again.',
    },
  ],
  apply: {
    scenario: 'Day one of Ada learning Python.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Who created Python?',
        options: [
          { text: 'The cast of Monty Python', why: 'They inspired the name, not the language.' },
          { text: 'Guido van Rossum' },
          { text: 'A team at a big tech company', why: 'It started as one person\'s hobby project.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Where does the name "Python" come from?',
        options: [
          { text: 'The snake', why: 'A popular guess, but no. The logo has snakes; the name does not.' },
          { text: "Monty Python's Flying Circus, a British comedy show" },
          { text: 'It stands for "Programming Your Things Here"', why: 'It is not short for anything.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: "Put Python's history in order.",
        lines: ['Guido starts Python over Christmas', 'The first public release', 'Python 3 arrives', 'Python 2 is retired'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Guido start writing Python?',
        answers: ['1989'],
        placeholder: 'Year',
      },
      {
        kind: 'writeCode',
        prompt: 'Print Hello, Python!',
        starter: '',
        solution: 'print("Hello, Python!")\n',
        hint: 'Copy the shape of your first line: print, brackets, and the words inside quotes.',
        checks: [
          { message: 'Print Hello, Python!', outputIncludes: 'Hello, Python!' },
          { message: 'Use print()', codeIncludes: 'print(' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each year to what happened.',
        pairs: [
          ['1989', 'A hobby project begins'],
          ['1991', 'First public release'],
          ['2008', 'Python 3 arrives'],
          ['2020', 'Python 2 is retired'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("Ajo")',
        language: 'python',
        options: [
          { text: '"Ajo"', why: 'The quotes tell Python where the text starts and ends. They are not printed.' },
          { text: 'print("Ajo")', why: 'Python runs the code. It does not print the code itself.' },
          { text: 'Ajo' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Quick question before we start: which Python are you learning?',
        prompt: 'What should Ada reply?',
        options: [
          { text: 'Python 3, the one everyone uses today.' },
          { text: 'Python 2, it sounds more stable.', why: 'Python 2 was retired in 2020.' },
          { text: 'The snake one.', why: 'Funny, but there is only one Python language, and the name comes from comedy.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the line so it prints Hello, Ajo!',
        language: 'python',
        template: '[[1]]("Hello, Ajo!")',
        blanks: [['print']],
        distractors: ['Print', 'say', 'show'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that prints Hi',
        language: 'python',
        tiles: ['print(', '"Hi"', ')'],
        distractors: ['Print(', 'Hi'],
      },
    ],
  },
  reflect: {
    prompt: 'Guido started Python as a hobby over one holiday. What would you like to build with Python one day?',
    starters: ['One day I would like to build...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Run your first line again with your own name. Then try printing your city too, on a second line.',
  },
  notes:
    'Guido van Rossum, foreword to "Programming Python" (1996): started December 1989 as a hobby over the Christmas week at CWI; named after Monty Python\'s Flying Circus. ABC influence: python.org history. 0.9.0: February 1991 (alt.sources). Python 2.0: October 2000. Python 3.0: 3 December 2008. Python 2 end of life: 1 January 2020 (PEP 373 / python.org "Sunsetting Python 2"). PSF founded 2001. "Millions of people" is a safe generalisation of widely reported developer surveys.',
};

export default lesson;
