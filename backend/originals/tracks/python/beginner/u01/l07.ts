import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7 — printing several things: commas, sep and end. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Printing several things',
  summary: 'One print() can show text and numbers together. Commas do the spacing for you, and two small extras let you choose what goes between and after.',
  minutes: 12,
  outcomes: [
    'Print text and numbers together with commas',
    'Change what goes between items with sep',
    'Keep printing on the same line with end',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From one thing to many',
      steps: [
        {
          title: 'Commas separate items',
          body: 'Put a comma between each thing you want to print. Python prints them in order with one space between.',
          code: 'print("Members:", 10)\n# Members: 10',
          language: 'python',
        },
        {
          title: 'Mix text and numbers freely',
          body: 'With commas, numbers and text can sit side by side. Python even works out sums first.',
          code: 'print("Pot:", 10 * 20000)\n# Pot: 200000',
          language: 'python',
        },
        {
          title: 'sep: what goes between',
          body: 'Add sep= at the end to choose the separator instead of a space.',
          code: 'print("Ada", "Tunde", "Bisi", sep=" | ")\n# Ada | Tunde | Bisi',
          language: 'python',
        },
        {
          title: 'end: what goes after',
          body: 'Normally print starts a new line at the end. end= changes that, so the next print continues the same line.',
          code: 'print("Loading", end="...")\nprint("done")\n# Loading...done',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Ada\'s summary line',
      caption: 'Text and numbers in one line. Press Run.',
      code: 'print("Members:", 10)\nprint("Monthly share:", 20000)\nprint("Pot:", 10 * 20000)\nprint("Ada", "Tunde", "Bisi", sep=" | ")\n',
      challenge: 'Add a line that prints Next up: Tunde, using a comma between the two parts.',
    },
  ],
  apply: {
    scenario: 'Ada prints her ajo summary.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("Members:", 10)',
        language: 'python',
        options: [
          { text: 'Members:10', why: 'Commas add one space between items.' },
          { text: '"Members:", 10', why: 'Python prints the values, not the code.' },
          { text: 'Members: 10' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the pot with a label',
        starter: '# Print: Pot: followed by 10 * 20000\n',
        solution: 'print("Pot:", 10 * 20000)\n',
        hint: 'Text, a comma, then the sum: print("Pot:", 10 * 20000)',
        checks: [
          { message: 'Print Pot: 200000', outputIncludes: 'Pot: 200000' },
          { message: 'Let Python do the sum', codeIncludes: '*' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("A", "B", "C", sep="-")',
        language: 'python',
        options: [
          { text: 'A-B-C' },
          { text: 'A B C', why: 'sep replaced the spaces with dashes.' },
          { text: 'A-B-C-', why: 'sep only goes between items, not after the last one.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make the names print as Ada, Tunde',
        language: 'python',
        template: 'print("Ada", "Tunde", [[1]]=", ")',
        blanks: [['sep']],
        distractors: ['end', 'gap'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the lines in order to print a summary: title, then members, then pot.',
        language: 'python',
        lines: ['print("AJO SUMMARY")', 'print("Members:", 10)', 'print("Pot:", 200000)'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word, used as end="...", stops print from starting a new line? (one word)',
        answers: ['end'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the members separated by commas',
        starter: '# Print exactly: Ada, Tunde, Bisi\n',
        solution: 'print("Ada", "Tunde", "Bisi", sep=", ")\n',
        hint: 'Three names as three items, then sep=", " at the end.',
        checks: [
          { message: 'Print Ada, Tunde, Bisi', outputEquals: 'Ada, Tunde, Bisi' },
          { message: 'Use sep instead of typing the commas into one string', codeIncludes: 'sep=' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada wants "Pot: 200000". Which line is wrong?',
        language: 'python',
        lines: ['print("Members:", 10)', 'print("Pot:" 200000)'],
        bug: 1,
        fix: 'print("Pot:", 200000)',
        explanation: 'Each item needs a comma between it and the next.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the extra to what it does.',
        pairs: [
          ['A comma', 'Separates items, adds a space'],
          ['sep="..."', 'Changes what goes between items'],
          ['end="..."', 'Changes what goes after the line'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: print("Next up:", "Tunde")',
        language: 'python',
        tiles: ['print(', '"Next up:"', ',', '"Tunde"', ')'],
        distractors: ['+', 'sep'],
      },
    ],
  },
  reflect: {
    prompt: 'Write the print() line you would use to show your name and age on one line.',
    starters: ['print('],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Print a short list of three friends separated by " | ", then try end="" to print two words on one line.',
  },
  notes: 'print(*objects, sep=" ", end="\\n"): sep defaults to a space, end to newline (Python docs, built-in print).',
};

export default lesson;
