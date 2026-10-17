import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4 — Indentation matters: what's inside a block, and IndentationError. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Indentation matters',
  summary: 'Ada\'s tracker thanks everyone, even people who haven\'t paid. Nothing is misspelled. One line is four spaces too far to the left, and to Python, that changes the meaning.',
  minutes: 11,
  outcomes: [
    'Read a block by its indentation',
    'Move a line in or out of an if on purpose',
    'Fix an IndentationError',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Same words, different meaning',
      before: {
        label: 'Thank-you outside the if',
        text: 'if paid >= SHARE:\n    print("Paid in full")\nprint("Thank you!")\n\nEveryone gets thanked, paid or not.',
      },
      after: {
        label: 'Thank-you inside the if',
        text: 'if paid >= SHARE:\n    print("Paid in full")\n    print("Thank you!")\n\nOnly people who paid get thanked.',
      },
      notes: [
        'In Python, indentation is not decoration: it decides which lines belong to the if.',
        'Every line in a block must be indented by the same amount. Mixing 4 spaces and 3 is an IndentationError.',
        'A line indented when there\'s no if above it is an error too: "unexpected indent".',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Who gets thanked?',
      caption: 'paid is 15000. Move the thank-you line in and out and watch what changes.',
      code: 'SHARE = 30000\npaid = 15000\n\nif paid >= SHARE:\n    print("Paid in full")\nprint("Thank you!")\n',
      challenge: 'Indent print("Thank you!") by 4 spaces and run it again.',
    },
  ],
  apply: {
    scenario: 'Thanking the right people.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'paid = 15000. What does this print?',
        code: 'if paid >= 30000:\n    print("Paid")\n    print("Thanks")',
        language: 'python',
        options: [
          { text: 'Thanks', why: 'Both lines are indented: both are skipped.' },
          { text: 'Nothing' },
          { text: 'Paid', why: 'The condition is False.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the indentation so only people who paid get thanked. paid is 15000, so only Checked should print',
        starter: 'SHARE = 30000\npaid = 15000\nif paid >= SHARE:\n    print("Paid in full")\nprint("Thank you!")\nprint("Checked")\n',
        solution: 'SHARE = 30000\npaid = 15000\nif paid >= SHARE:\n    print("Paid in full")\n    print("Thank you!")\nprint("Checked")\n',
        hint: 'Indent the thank-you line by 4 spaces.',
        checks: [
          { message: 'Print only Checked for a short payment', outputEquals: 'Checked' },
          { message: 'Keep the thank-you message', codeIncludes: 'Thank you!' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is an IndentationError?',
        language: 'python',
        lines: ['if paid >= 30000:', '    print("Paid")', '   print("Thanks")'],
        bug: 2,
        fix: '    print("Thanks")',
        explanation: 'Three spaces doesn\'t match the block\'s four.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Inside the if, or after it?',
        groups: ['Inside the if', 'After the if'],
        items: [
          { text: '    print("Paid")', group: 0 },
          { text: 'print("Checked")', group: 1 },
          { text: '    total = total + paid', group: 0 },
          { text: 'print("Next member")', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print "Checked" for everyone, after the if',
        starter: 'paid = 15000\nif paid >= 30000:\n    print("Paid in full")\n',
        solution: 'paid = 15000\nif paid >= 30000:\n    print("Paid in full")\nprint("Checked")\n',
        hint: 'An unindented print after the block.',
        checks: [{ message: 'Print Checked', outputEquals: 'Checked' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Python care so much about indentation?',
        options: [
          { text: 'To make code pretty', why: 'It\'s part of the meaning, not just looks.' },
          { text: 'It doesn\'t really', why: 'Move one line and the program changes.' },
          { text: 'It uses indentation to know which lines belong to the if, instead of brackets like other languages' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order it so only payers are thanked, and everyone is checked.',
        language: 'python',
        lines: ['if paid >= 30000:', '    print("Paid in full")', '    print("Thank you!")', 'print("Checked")'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to the error.',
        pairs: [
          ['Missing colon on the if', 'SyntaxError'],
          ['3 spaces in a 4-space block', 'IndentationError'],
          ['Indent with no if above', 'Unexpected indent'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'My editor mixes tabs and spaces. Problem?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Yes: Python 3 refuses to mix them in a block. Set the editor to insert 4 spaces when you press Tab.' },
          { text: 'No, they\'re the same.', why: 'To Python they\'re different characters.' },
          { text: 'Only on Mondays.', why: 'Every day.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'An indented line with no if (or other block) above it gives an "unexpected ___" error. (one word)',
        answers: ['indent', 'indentation'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'In Python, where a line sits changes what it means. Where else does layout change meaning (a list vs a paragraph, a table)?',
    starters: ['Layout matters when...', 'For example...'],
  },
  deepen: {
    title: 'Why Python chose indentation',
    summary: 'Python inherited significant indentation from ABC, the teaching language Guido van Rossum worked on before Python. The idea: code is read far more than it\'s written.',
  },
  notes: 'Indentation defines blocks (Python Language Reference §2.1.8). Python 3 disallows mixing tabs and spaces inconsistently (TabError). Indentation from ABC: Guido van Rossum, "The History of Python" blog and the Python FAQ ("Why does Python use indentation for grouping of statements?").',
};

export default lesson;
