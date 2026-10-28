import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Walkthrough: printf and \n, one step at a time. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'printf and the new line',
  summary: 'Sol 1, 09:40. Ines prints the crew list and gets one long squashed line: InesHalTomokoMateus. The fix is two characters long.',
  minutes: 11,
  outcomes: [
    'Explain what \\n does inside printf',
    'Print several lines with one or many printf calls',
    'Predict exactly what printf will print',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From one squashed line to a crew list',
      steps: [
        {
          title: 'The problem',
          body: 'printf prints exactly what\'s between the quotes, and nothing else. It doesn\'t start a new line by itself.',
          code: 'printf("Ines");\nprintf("Hal");\n// prints: InesHal',
          language: 'c',
        },
        {
          title: 'The new-line character',
          body: '\\n is one special character that means "new line". The backslash says: the next letter isn\'t a normal n.',
          code: 'printf("Ines\\n");\nprintf("Hal\\n");\n// prints:\n// Ines\n// Hal',
          language: 'c',
        },
        {
          title: 'Several lines from one printf',
          body: '\\n can go anywhere in the text, as many times as you like.',
          code: 'printf("Ines\\nHal\\nTomoko\\n");',
          language: 'c',
        },
        {
          title: 'Forgetting the last \\n',
          body: 'Without a final \\n, whatever prints next continues on the same line. End your lines with \\n.',
          code: 'printf("Crew: 4");\nprintf("Sol: 1\\n");\n// prints: Crew: 4Sol: 1',
          language: 'c',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Fix the crew list',
      code: '#include <stdio.h>\n\nint main(void) {\n    printf("Ines");\n    printf("Hal");\n    printf("Tomoko");\n    printf("Mateus");\n    return 0;\n}\n',
      caption: 'Run it and see the squashed line. Then fix it.',
      challenge: 'Add \\n before each closing quote so every name is on its own line.',
    },
  ],
  apply: {
    scenario: 'Sol 1, 09:40. The crew list.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does \\n do inside printf\'s quotes?',
        options: [
          { text: 'Prints a backslash and an n', why: 'Together they make one special character, and it isn\'t printed as letters.' },
          { text: 'Starts a new line' },
          { text: 'Ends the program', why: 'return 0; ends main. \\n only moves to the next line.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("Sol");\nprintf(" 1\\n");',
        language: 'c',
        options: [
          { text: 'Sol 1', },
          { text: 'Sol\n 1', why: 'The first printf has no \\n, so the second one carries on the same line.' },
          { text: 'Sol1', why: 'The space inside " 1" is printed too.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the crew list, one name per line: Ines, Hal, Tomoko, Mateus',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("Ines");\n    printf("Hal");\n    printf("Tomoko");\n    printf("Mateus");\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Ines\\n");\n    printf("Hal\\n");\n    printf("Tomoko\\n");\n    printf("Mateus\\n");\n    return 0;\n}\n',
        hint: 'Add \\n just before each closing quote: printf("Ines\\n");',
        checks: [
          { message: 'Print the four names on four lines', outputEquals: 'Ines\nHal\nTomoko\nMateus' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Make this print two lines with one printf.',
        template: 'printf("Water OK[[1]]Oxygen OK\\n");',
        blanks: [['\\n']],
        distractors: ['/n', 'n'],
        language: 'c',
      },
      {
        kind: 'findBug',
        prompt: 'The output should be on two lines. Which line causes the squash?',
        lines: ['printf("Hab: sealed");', 'printf("GreenHab: sealed\\n");'],
        bug: 0,
        fix: 'printf("Hab: sealed\\n");',
        explanation: 'The first line has no \\n, so GreenHab: sealed lands on the same line.',
        language: 'c',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a printf that prints Sol 1 and then a new line.',
        tiles: ['printf', '(', '"Sol 1\\n"', ')', ';'],
        distractors: ['"Sol 1/n"', 'newline'],
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines does this print?',
        code: 'printf("A\\nB\\nC\\n");',
        language: 'c',
        options: [
          { text: 'One', why: 'Each \\n starts a new line, so A, B and C each get their own.' },
          { text: 'Two', why: 'Count the \\n: there are three, after A, B and C.' },
          { text: 'Three' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'Can the board print my two plant counts on separate lines with just one printf?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Yes: put \\n between them and at the end, inside the same quotes.' },
          { text: 'No, each line needs its own printf.', why: 'It can be clearer, but one printf with \\n in the middle works too.' },
          { text: 'Only if we press Enter inside the quotes.', why: 'A real line break inside the quotes is an error in C. \\n is how you write one.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Without a \\n at the end, where does the next printf start: on the same line or a new line?',
        answers: ['same line', 'same', 'the same line'],
        placeholder: 'same line / new line',
      },
      {
        kind: 'writeCode',
        prompt: 'With ONE printf, print three lines: Water OK, Oxygen OK, Power LOW',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("");\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Water OK\\nOxygen OK\\nPower LOW\\n");\n    return 0;\n}\n',
        hint: 'Put \\n after each part, all inside the same quotes.',
        checks: [
          { message: 'Print the three lines in order', outputEquals: 'Water OK\nOxygen OK\nPower LOW' },
          { message: 'Use \\n to start the new lines', codeIncludes: '\\n' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'printf does exactly what you write, nothing more. Where in your life does something do exactly what it\'s told, mistakes included?',
    starters: ['Something that does exactly what it\'s told is...', 'It catches me out when...'],
  },
  deepen: {
    title: 'puts: printf\'s simpler cousin',
    summary: 'puts("Hab online"); prints the text and adds the new line for you. It can\'t do the number tricks printf can, which is why most C uses printf.',
  },
  notes: 'printf does not append a newline; \\n is the newline escape (ISO C 5.2.2). puts appends a newline (7.21.7.9). A raw line break inside a string literal is a compile error.',
};

export default lesson;
