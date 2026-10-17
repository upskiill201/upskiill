import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 14 — Escape characters and new lines: \n, \t, \" and \\. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Escape characters and new lines',
  summary: 'Ada wants a member card in one print: three lines, neatly lined up, and a quote from Tunde inside the text. Some characters need a backslash to get into a string.',
  minutes: 11,
  outcomes: [
    'Start a new line inside a string with \\n',
    'Line things up with \\t',
    'Put quotes inside a string with \\" or the other quote type',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Inside a string, a backslash \\ starts an escape: two characters that stand for one special one. The most useful is \\n, a new line. print("Name: Tunde\\nPaid: Yes") prints two lines.', replies: ['Any others?'] },
        { tey: '\\t is a tab, a jump to the next column, handy for lining things up. \\" is a double quote that doesn\'t end the string. And \\\\ is one real backslash.', replies: ['Quotes are confusing'] },
        { tey: 'The easy way: if the text contains double quotes, wrap it in single quotes. \'Tunde said "I paid!"\' needs no escapes at all.', replies: ['How long is "\\n"?'] },
        { tey: 'One character. len("\\n") is 1. The backslash and the n together make a single new-line character.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A card in one print',
      caption: 'Two escapes, one line of code, three lines of output.',
      code: 'print("Name:\\tTunde\\nPaid:\\tYes\\nMonth:\\tMarch")\nprint(\'Tunde said "I paid!"\')\n',
      challenge: 'Add a fourth line, Fee:\\t1500, to the card.',
    },
  ],
  apply: {
    scenario: 'A member card in one print.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines does this print?',
        code: 'print("Ada\\nTunde\\nBisi")',
        language: 'python',
        options: [
          { text: '1', why: 'Each \\n starts a new line.' },
          { text: '3' },
          { text: '2', why: 'Two \\n make three lines.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Name: Tunde and Paid: Yes on two lines, with one print and \\n',
        starter: '',
        solution: 'print("Name: Tunde\\nPaid: Yes")\n',
        hint: 'Put \\n between the two parts, inside one string.',
        checks: [
          { message: 'Print the two lines', outputEquals: 'Name: Tunde\nPaid: Yes' },
          { message: 'Use \\n in one print', codeIncludes: '\\n' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the escape to what it means.',
        pairs: [
          ['\\n', 'New line'],
          ['\\t', 'Tab'],
          ['\\"', 'A double quote'],
          ['\\\\', 'One backslash'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print: Tunde said "I paid!" (with the double quotes)',
        starter: '',
        solution: 'print(\'Tunde said "I paid!"\')\n',
        hint: 'Wrap it in single quotes, or use \\" inside double quotes.',
        checks: [{ message: 'Print Tunde said "I paid!"', outputEquals: 'Tunde said "I paid!"' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is a SyntaxError?',
        language: 'python',
        lines: ['print(\'Bisi said "Thanks"\')', 'print("Bisi said "Thanks"")', 'print("Bisi said \\"Thanks\\"")'],
        bug: 1,
        fix: 'print(\'Bisi said "Thanks"\')',
        explanation: 'The second " ends the string early. Use single quotes outside, or escape the inner quotes.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(len("A\\nB"))',
        language: 'python',
        options: [
          { text: '4', why: '\\n is one character.' },
          { text: '2', why: 'A, new line, B: three characters.' },
          { text: '3' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Works, or SyntaxError?',
        groups: ['Works', 'SyntaxError'],
        items: [
          { text: '\'He said "yes"\'', group: 0 },
          { text: '"He said "yes""', group: 1 },
          { text: '"It\'s paid"', group: 0 },
          { text: '\'It\'s paid\'', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Two lines in one string.',
        language: 'python',
        template: 'print("Paid: Yes[[1]]Fee: 1500")',
        blanks: [['\\n']],
        distractors: ['/n', '\\t'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'When would I use \\t instead of spaces?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'When labels have different lengths: \\t jumps to the next column, so the values line up. For exact layouts, f-string widths are better (next lessons).' },
          { text: 'Never.', why: 'It\'s handy for quick columns.' },
          { text: 'Always, spaces are wrong.', why: 'Both are fine. Tabs just line up columns.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which escape starts a new line? (backslash and one letter)',
        answers: ['\\n', 'n', 'backslash n'],
        placeholder: 'Escape',
      },
    ],
  },
  reflect: {
    prompt: 'Escape characters let you say "this character, but not its usual meaning". Where else do you use a signal like that (a quote mark, an asterisk in a message)?',
    starters: ['I use...', 'It means...'],
  },
  deepen: {
    title: 'Triple quotes',
    summary: '"""Three quotes""" let a string span several lines, with real line breaks inside. Handy for long messages and, later, docstrings.',
  },
  notes: 'String escape sequences \\n, \\t, \\", \\\\ (Python Language Reference §2.4.1). len("\\n") == 1. Triple-quoted strings (tutorial §3.1.2).',
};

export default lesson;
