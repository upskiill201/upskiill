import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9 — Comparing text in conditions: clean first, == and in, alphabetical order. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Comparing text',
  summary: 'The tracker asks "Your name: " and checks it against this month\'s collector. Chapter 4 taught Ada why "tunde " isn\'t "Tunde". Now the cleaning goes into decisions.',
  minutes: 11,
  outcomes: [
    'Clean text before comparing it in an if',
    'Use in inside a condition',
    'Know that < and > compare text alphabetically',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Is it your month?',
      steps: [
        {
          title: '1. Ask and clean',
          body: 'Use Chapter 4\'s recipe on what people type.',
          code: 'name = input("Your name: ").strip().title()',
          language: 'python',
        },
        {
          title: '2. Compare in the if',
          body: 'Both sides are now in the same form, so == is fair.',
          code: 'if name == this_month:\n    print("It\'s your month!")',
          language: 'python',
        },
        {
          title: '3. Or search with in',
          body: 'For "does the note mention them?", lowercase both and use in.',
          code: 'if name.lower() in note.lower():\n    print("Payment found")',
          language: 'python',
        },
        {
          title: '4. Alphabetical order',
          body: 'For strings, < means "comes earlier in the alphabet". "Ada" < "Bisi" is True. Capitals come before small letters, so clean first here too.',
          code: 'print("Ada" < "Bisi")  # True',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Is it your month?',
      caption: 'Tunde types his name with odd capitals.',
      code: 'this_month = "Tunde"\nname = input("Your name: ").strip().title()\n\nif name == this_month:\n    print("It\'s your month! The pot is yours.")\nelse:\n    print(f"Not this month, {name}. It\'s {this_month}\'s turn.")\n',
      stdin: ['  tUNDE '],
      challenge: 'Remove .strip().title() and run it again. What happens?',
    },
  ],
  apply: {
    scenario: 'Whose month is it?',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'name = "tunde "\nif name == "Tunde":\n    print("Yours")\nelse:\n    print("Not yours")',
        language: 'python',
        options: [
          { text: 'Yours', why: 'Without cleaning, "tunde " is not "Tunde".' },
          { text: 'Not yours' },
          { text: 'An error', why: 'It runs; it just says the wrong thing.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Ask "Your name: ", clean it, and print Your month! if it matches this_month, otherwise Not yet',
        starter: 'this_month = "Bisi"\n',
        solution: 'this_month = "Bisi"\nname = input("Your name: ").strip().title()\nif name == this_month:\n    print("Your month!")\nelse:\n    print("Not yet")\n',
        hint: 'input(...).strip().title(), then if/else.',
        stdin: [' bisi'],
        checks: [
          { message: 'Print Your month!', outputIncludes: 'Your month!' },
          { message: 'Clean the name', codeIncludes: '.strip()' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'True or False?',
        groups: ['True', 'False'],
        items: [
          { text: '"Ada" < "Bisi"', group: 0 },
          { text: '"Tunde" < "Bisi"', group: 1 },
          { text: '"bisi" in "ajo april bisi"', group: 0 },
          { text: '"Bisi" == "bisi"', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'If the member\'s name appears in the note (ignoring capitals), print Payment found',
        starter: 'name = "Kemi"\nnote = "AJO APRIL KEMI"\n',
        solution: 'name = "Kemi"\nnote = "AJO APRIL KEMI"\nif name.lower() in note.lower():\n    print("Payment found")\n',
        hint: 'if name.lower() in note.lower():',
        checks: [{ message: 'Print Payment found', outputEquals: 'Payment found' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line compares without cleaning?',
        language: 'python',
        lines: ['name = input("Your name: ")', 'if name == "Tunde":', '    print("Your month!")'],
        bug: 0,
        fix: 'name = input("Your name: ").strip().title()',
        explanation: 'Whatever people type has to be cleaned before ==, or "tunde " won\'t match.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the code.',
        pairs: [
          ['Is it exactly them?', 'name == this_month'],
          ['Does the note mention them?', 'name.lower() in note.lower()'],
          ['Do they come first in the alphabet?', 'name < other'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("ada" < "Bisi")',
        language: 'python',
        options: [
          { text: 'True', why: 'Capital letters sort before small ones, so "Bisi" comes first.' },
          { text: 'An error', why: 'Strings can be compared with <.' },
          { text: 'False' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Clean what the user typed.',
        language: 'python',
        template: 'name = input("Your name: ").[[1]]().[[2]]()',
        blanks: [['strip'], ['title']],
        distractors: ['split', 'upper'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Tunde typed "  tUNDE " and still got "It\'s your month!". Why?',
        prompt: "Ada's answer?",
        options: [
          { text: 'The input is cleaned with .strip().title() before the if, so it becomes "Tunde".' },
          { text: 'Python ignores capitals in if.', why: 'It doesn\'t. The cleaning does.' },
          { text: 'Luck.', why: 'Cleaning, every time.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("Bisi" < "Kemi") show?',
        answers: ['True'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Cleaning before comparing is the difference between "it works for me" and "it works for everyone". Where do you see that difference in apps you use?',
    starters: ['An app that works for everyone...', 'One that doesn\'t...'],
  },
  deepen: {
    title: 'Why capitals sort first',
    summary: 'Strings compare by character codes: "A" is 65 and "a" is 97, so every capital comes before every small letter. Lowercase both sides for true alphabetical order.',
  },
  notes: 'String comparison is lexicographic by code point (Python Language Reference §6.10.1). ord("A") = 65, ord("a") = 97, so "ada" < "Bisi" is False.',
};

export default lesson;
