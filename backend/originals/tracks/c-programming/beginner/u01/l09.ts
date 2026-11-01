import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Card deck: escape sequences \n \t \" \\ and %% in printf. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Escape sequences',
  summary: 'Sol 1, 16:45. Tomoko wants her GreenHab sign to say Mode: "night" with the quotes, and a percent sign for humidity. Both break printf. Time to learn the backslash.',
  minutes: 11,
  outcomes: [
    'Print quotes, backslashes and tabs with escape sequences',
    'Print a percent sign with %%',
    'Line text up in columns with \\t',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Inside printf\'s quotes, a <strong>backslash</strong> means "the next character is special". You already know one: <code>\\n</code>, new line. These are called <strong>escape sequences</strong>.</p><ul><li><code>\\n</code> new line</li><li><code>\\t</code> tab: jumps to the next column, handy for lining things up</li><li><code>\\"</code> a double quote that doesn\'t end the text</li><li><code>\\\\</code> one backslash</li></ul>',
    },
    {
      kind: 'text',
      html: '<p>printf has one more special character of its own: <code>%</code>. It\'s how printf will soon print numbers. To print an actual percent sign, write it twice: <code>%%</code>.</p><p><code>printf("Humidity: 64%%\\n");</code> prints <strong>Humidity: 64%</strong></p>',
    },
    {
      kind: 'tryIt',
      title: 'Tomoko\'s sign',
      code: '#include <stdio.h>\n\nint main(void) {\n    printf("GreenHab\\tMode: \\"night\\"\\n");\n    printf("Humidity:\\t64%%\\n");\n    printf("Path:\\tC:\\\\greenhab\\\\log\\n");\n    return 0;\n}\n',
      caption: 'Run it and match each backslash in the code to what appears in the output.',
      challenge: 'Add a line that prints: Lights: "off" (with the quotes).',
    },
    {
      kind: 'check',
      question: 'Which prints a double quote inside the text?',
      options: ['\\"', '""', '\\q'],
      answer: 0,
      explanation: 'A backslash before the quote says "this one is part of the text, don\'t end it here".',
    },
  ],
  apply: {
    scenario: 'Sol 1, 16:45. The GreenHab sign.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the escape to what it prints.',
        pairs: [
          ['\\n', 'A new line'],
          ['\\t', 'A tab'],
          ['\\"', 'A double quote'],
          ['\\\\', 'One backslash'],
          ['%%', 'A percent sign'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("Mode: \\"day\\"\\n");',
        language: 'c',
        options: [
          { text: 'Mode: day', why: 'The \\" pieces print as real quote marks.' },
          { text: 'Mode: \\"day\\"', why: 'The backslashes aren\'t printed: each \\" becomes one quote.' },
          { text: 'Mode: "day"' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print exactly: Mode: "night"',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("Mode: night\\n");\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Mode: \\"night\\"\\n");\n    return 0;\n}\n',
        hint: 'Put \\" before and after night: printf("Mode: \\"night\\"\\n");',
        checks: [
          { message: 'Print Mode: "night" with the quotes', outputEquals: 'Mode: "night"' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Make it print Humidity: 64%',
        template: 'printf("Humidity: 64[[1]]\\n");',
        blanks: [['%%']],
        distractors: ['%', '\\%'],
        language: 'c',
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t compile?',
        lines: ['printf("Tank A\\tfull\\n");', 'printf("Say "hello"\\n");', 'printf("Done\\n");'],
        bug: 1,
        fix: 'printf("Say \\"hello\\"\\n");',
        explanation: 'The quote before hello ends the text early. Inner quotes need a backslash: \\".',
        language: 'c',
      },
      {
        kind: 'mcq',
        prompt: 'What is \\t good for?',
        options: [
          { text: 'Lining text up in columns' },
          { text: 'Printing the letter t', why: 'Just write t for that. \\t is a tab.' },
          { text: 'Ending the program', why: 'return 0; ends main.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the text that prints Tank, a tab, A, and then a new line.',
        tiles: ['"Tank', '\\t', 'A', '\\n"'],
        distractors: ['/t', 'tab'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'My sign printed Humidity: 64 and then nonsense. I wrote 64%\\n.',
        prompt: 'What should Ines tell her?',
        options: [
          { text: 'printf treats % as special. Write %% to print one percent sign.' },
          { text: 'Percent signs can\'t be printed in C.', why: 'They can: %% prints one.' },
          { text: 'Put the % after the \\n.', why: 'Moving it doesn\'t help. printf still reads % as special.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do we call codes like \\n and \\t that start with a backslash? (two words)',
        answers: ['escape sequences', 'escape sequence', 'escape codes'],
        placeholder: 'Two words',
      },
      {
        kind: 'writeCode',
        prompt: 'Print two lines lined up with tabs: Tank\\tLitres then A\\t380',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Tank\\tLitres\\n");\n    printf("A\\t380\\n");\n    return 0;\n}\n',
        hint: 'printf("Tank\\tLitres\\n"); then printf("A\\t380\\n");',
        checks: [
          { message: 'Print the header line with a tab', outputIncludes: 'Tank\tLitres' },
          { message: 'Print the A line with a tab', outputIncludes: 'A\t380' },
          { message: 'Use \\t', codeIncludes: '\\t' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'The backslash says "treat the next thing differently". Can you think of a sign or symbol in everyday life that changes what comes after it?',
    starters: ['One I can think of is...', 'It changes what comes after by...'],
  },
  deepen: {
    title: 'The rest of the escapes',
    summary: 'C also has \\a (beep), \\b (backspace), \\r (carriage return) and \\0 (the null character, which you\'ll meet in the strings chapter). Most programs only ever need \\n, \\t, \\" and \\\\.',
  },
  notes: 'Escape sequences: ISO C 6.4.4.4. %% conversion: 7.21.6.1. Note outputIncludes is whitespace-loose (tabs compare as spaces); the codeIncludes check requires an actual \\t.',
};

export default lesson;
