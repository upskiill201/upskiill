import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 13 — where Python runs: the interpreter, .py files, the >>> prompt, and the browser. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Where Python runs',
  summary: 'On a laptop, a server, a phone, and right now, in your browser. Same Python, four places to run it.',
  minutes: 11,
  outcomes: [
    'Explain what the Python interpreter does',
    'Tell a .py file from the interactive >>> prompt',
    'Know how this course runs your code',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>1. The interpreter</strong></p><p>Python code on its own is just text. The <strong>interpreter</strong> is the program that reads it and makes it happen. The standard one is called CPython, and it is what people mean when they say "install Python".</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. Files ending in .py</strong></p><p>Real programs live in files like <code>main.py</code> or <code>ajo.py</code>. You run one with a command such as <code>python3 ajo.py</code> (on some computers just <code>python</code>). The whole file runs top to bottom, then stops. Look at the top of every code box in this course: <code>main.py</code>.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>3. The >>> prompt</strong></p><p>Type <code>python3</code> on its own and you get an interactive prompt that looks like <code>>>></code>. Type one line, press Enter, see the result straight away. Great for quick experiments, like a calculator that speaks Python.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>4. In your browser (this course)</strong></p><p>Teyro runs real Python 3 inside your browser, using a version of the interpreter compiled to WebAssembly. Nothing to install, and your code never leaves your device. You\'ll install Python on a computer in Chapter 12, when your programs get bigger.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Ask Python which version it is',
      caption: 'Two lines you don\'t need to understand yet: they ask Python about itself. Press Run.',
      code: 'import sys\nprint("Running Python", sys.version_info.major)\n',
      challenge: 'Run it again: it is the same Python 3 you would install on a computer.',
    },
  ],
  apply: {
    scenario: 'Ada works out where her code actually runs.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each place to what it is.',
        pairs: [
          ['Interpreter', 'Reads and runs Python code'],
          ['ajo.py', 'A file holding a whole program'],
          ['>>>', 'The interactive prompt for quick tries'],
          ['Your browser', 'Where this course runs your code'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Python program files end in... (three characters, with the dot)',
        answers: ['.py', 'py'],
        placeholder: '.something',
      },
      {
        kind: 'writeCode',
        prompt: 'Print where your code is running',
        starter: '',
        solution: 'print("This Python runs in my browser")\n',
        hint: 'One print( ) with the sentence in quotes.',
        checks: [{ message: 'Print This Python runs in my browser', outputIncludes: 'This Python runs in my browser' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is the main difference between running a .py file and using the >>> prompt?',
        options: [
          { text: 'A file runs all at once; the prompt runs one line at a time as you type' },
          { text: 'The prompt is a different language', why: 'It is the same Python.' },
          { text: 'Files can only print numbers', why: 'Files can do anything Python can.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Best for a quick experiment, or a real program?',
        groups: ['Quick experiment', 'Real program'],
        items: [
          { text: 'Checking what 7 / 2 gives', group: 0 },
          { text: 'The Ajo Tracker', group: 1 },
          { text: 'Trying one print() line', group: 0 },
          { text: 'Code you want to run every month', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How does Teyro run your Python?',
        options: [
          { text: 'Real Python 3, inside your browser, on your device' },
          { text: 'It sends your code to Teyro\'s servers', why: 'It runs on your device. Your code stays with you.' },
          { text: 'It only pretends to run it', why: 'It is the real Python interpreter, compiled to WebAssembly.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print a mini about-screen',
        starter: '# Line 1: File: ajo.py\n# Line 2: Language: Python 3\n',
        solution: 'print("File: ajo.py")\nprint("Language: Python 3")\n',
        hint: 'Two print( ) lines.',
        checks: [{ message: 'Print the two lines exactly', outputEquals: 'File: ajo.py\nLanguage: Python 3' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the command that runs a file on a computer.',
        template: '[[1]] ajo.[[2]]',
        blanks: [['python3', 'python'], ['py']],
        distractors: ['run', 'exe'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: "Arjun, do I need to install Python to keep learning?",
        prompt: "What's the accurate reply?",
        options: [
          { text: 'Not yet. Teyro runs real Python in your browser. You\'ll install it when your programs get bigger.' },
          { text: 'Yes, today, or nothing will work.', why: 'The browser runs real Python already.' },
          { text: 'You can never install Python on a phone or laptop.', why: 'You can install it on computers; Chapter 12 shows how.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What is CPython?',
        options: [
          { text: 'The standard Python interpreter, the one you install' },
          { text: 'A different language from Python', why: 'It is the program that runs Python.' },
          { text: 'A Python for children', why: 'The C is for the language it is written in.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where would you like your own Python programs to run one day: your laptop, a website, your phone?',
    starters: ['I\'d like my programs to run on...', 'Because...'],
  },
  deepen: {
    title: 'Look closer',
    summary: 'Notice the file name at the top of every code box in this course. Every program you write here is a real main.py file.',
  },
  notes: 'CPython is the reference implementation (written in C). Pyodide = CPython compiled to WebAssembly; the course runner uses it in a Web Worker, in the learner\'s browser. Interactive prompt ">>>" is the REPL. `python3 file.py` on macOS/Linux; `python` or `py` on Windows.',
};

export default lesson;
