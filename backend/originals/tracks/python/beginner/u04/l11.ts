import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 11 — input(): asking the user a question and storing the answer. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'input(): asking the user',
  summary: 'Until now Ada typed every name into the code herself. Bisi asks: "Can I just type my own name in?" For the first time, the tracker is going to ask a question and wait for an answer.',
  minutes: 11,
  outcomes: [
    'Ask a question with input()',
    'Store the answer in a variable',
    'Write a clear prompt, with a space at the end',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, Bisi\'s idea',
      beats: [
        { speaker: 'narrator', text: 'Bisi watches Ada type "Bisi" into the code for the fourth time.' },
        { speaker: 'narrator', text: '"Can\'t it just ask me my name?"' },
        { speaker: 'arjun', text: '(on the call) It can. input("Your name: ") shows the question, waits, and gives back whatever was typed. Store it like any value.' },
        { speaker: 'ada', text: 'So the program stops and waits for a person. That\'s new.' },
      ],
      choice: {
        prompt: 'What should Ada\'s question say?',
        options: [
          {
            text: 'input("Your name: "), with a space after the colon.',
            outcome: 'The answer appears neatly after the question: Your name: Bisi.',
            best: true,
          },
          {
            text: 'input("name")',
            outcome: 'It works, but the answer runs into the prompt: nameBisi. Hard to read.',
          },
          {
            text: 'input() with no question.',
            outcome: 'The program waits silently. Bisi has no idea it wants something.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><code>name = input("Your name: ")</code> does three things: shows the text in the brackets (the <strong>prompt</strong>), waits for the user to type and press Enter, then gives back what they typed as a string, stored in <code>name</code>.</p><p>In the Try it card, the "user" is played by a ready-made answer, so you can see exactly what happens.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The tracker asks',
      caption: 'The answer "Bisi" is typed in for you. The prompt and the answer both appear in the output.',
      code: 'name = input("Your name: ")\nprint(f"Welcome to the ajo, {name}!")\n',
      stdin: ['Bisi'],
      challenge: 'Change the prompt to "What is your first name? " and run it again.',
    },
  ],
  apply: {
    scenario: 'The tracker asks a question.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does input("Your name: ") give back?',
        options: [
          { text: 'The text "Your name: "', why: 'That\'s the prompt it shows. It returns the answer.' },
          { text: 'Nothing; it just prints', why: 'It returns the answer, so you can store it.' },
          { text: 'Whatever the user typed, as a string' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Ask for a name with the prompt "Your name: ", then print Welcome, Tunde!',
        starter: '',
        solution: 'name = input("Your name: ")\nprint(f"Welcome, {name}!")\n',
        hint: 'name = input("Your name: "), then an f-string.',
        stdin: ['Tunde'],
        checks: [
          { message: 'Print Welcome, Tunde!', outputIncludes: 'Welcome, Tunde!' },
          { message: 'Use input()', codeIncludes: 'input(' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order what input() does.',
        lines: ['Shows the prompt', 'Waits for the user', 'The user types and presses Enter', 'Gives back the text', 'You store it in a variable'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ask for the month.',
        language: 'python',
        template: 'month = [[1]]("Which month? ")',
        blanks: [['input']],
        distractors: ['print', 'ask'],
      },
      {
        kind: 'writeCode',
        prompt: 'Ask "Which month? " and print Paying for: March',
        starter: '',
        solution: 'month = input("Which month? ")\nprint(f"Paying for: {month}")\n',
        hint: 'Store input() in month, then print it in an f-string.',
        stdin: ['March'],
        checks: [{ message: 'Print Paying for: March', outputIncludes: 'Paying for: March' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line throws away the answer?',
        language: 'python',
        lines: ['input("Your name: ")', 'print(f"Welcome, {name}!")'],
        bug: 0,
        fix: 'name = input("Your name: ")',
        explanation: 'The answer was never stored, so name doesn\'t exist: NameError on the next line.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good prompt, or confusing?',
        groups: ['Good', 'Confusing'],
        items: [
          { text: 'input("Your name: ")', group: 0 },
          { text: 'input()', group: 1 },
          { text: 'input("Amount paid (naira): ")', group: 0 },
          { text: 'input("x")', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why does my prompt need a space at the end?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Python requires it.', why: 'It runs without one; it just looks squashed.' },
          { text: 'It doesn\'t matter.', why: 'It matters to the person using it.' },
          { text: 'The user\'s typing starts right after the prompt. Without the space you get "Your name:Bisi".' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that asks for a name and stores it.',
        language: 'python',
        tiles: ['name', '=', 'input(', '"Your name: "', ')'],
        distractors: ['print(', '=='],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which function asks the user a question and waits? (five letters)',
        answers: ['input', 'input()'],
        placeholder: 'Function',
      },
    ],
  },
  reflect: {
    prompt: 'A good prompt tells people exactly what to type. Think of a confusing form you\'ve filled in. What would a clearer question be?',
    starters: ['The form asked...', 'A clearer question...'],
  },
  deepen: {
    title: 'Programs that wait',
    summary: 'input() makes a program stop until someone answers. Everything you type comes back as text, which is next lesson\'s surprise.',
  },
  notes: 'input([prompt]) writes the prompt to stdout, reads a line, strips the trailing newline and returns it as str (Built-in Functions: input). The Teyro runner feeds stdin lines and echoes them after the prompt, like a terminal.',
};

export default lesson;
