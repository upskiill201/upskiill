import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Walkthrough: reading an int with scanf("%d", &x), prompts, and input in the output. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Reading a number with scanf',
  summary: 'Sol 3, 07:30. The CO2 sensor isn\'t wired to the backup board yet, so whoever is on watch reads the meter and types the number in. The board needs to listen as well as talk.',
  minutes: 12,
  outcomes: [
    'Read a whole number from the keyboard with scanf',
    'Print a prompt so the user knows what to type',
    'Remember the & before the variable name',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Asking the watch for a reading',
      steps: [
        {
          title: 'Make the box first',
          body: 'scanf needs somewhere to put what\'s typed. Declare the variable before you read into it.',
          code: 'int co2_ppm;',
          language: 'c',
        },
        {
          title: 'Ask, politely',
          body: 'Print a prompt so the person knows what to type. No \\n: the answer is typed on the same line.',
          code: 'printf("CO2 reading (ppm)? ");',
          language: 'c',
        },
        {
          title: 'Read it with scanf',
          body: 'scanf is printf\'s opposite: it reads. %d means "read a whole number". The & in front of the name means "put it in this box". Chapter 8 explains exactly why the & is needed; until then, never forget it.',
          code: 'scanf("%d", &co2_ppm);',
          language: 'c',
        },
        {
          title: 'Use it like any variable',
          body: 'Now co2_ppm holds whatever was typed. Print it, calculate with it, decide with it.',
          code: 'printf("You typed %d ppm\\n", co2_ppm);',
          language: 'c',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'In these lessons, the input is typed for you (or into the Input box). It appears in the output right where the program read it, just like on a real terminal.',
    },
    {
      kind: 'tryIt',
      title: 'The watch reading',
      code: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm;\n\n    printf("CO2 reading (ppm)? ");\n    scanf("%d", &co2_ppm);\n    printf("Logged: %d ppm\\n", co2_ppm);\n    return 0;\n}\n',
      caption: 'This run is given the input 1150. Run it and see where it appears.',
      challenge: 'Add a second line that prints double the reading.',
      stdin: ['1150'],
    },
  ],
  apply: {
    scenario: 'Sol 3, 07:30. Typing in the readings.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does scanf do?',
        options: [
          { text: 'Reads what the user types into a variable' },
          { text: 'Prints a number', why: 'That\'s printf. scanf reads.' },
          { text: 'Scans the program for errors', why: 'That\'s the compiler\'s job. scanf reads input.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Read a whole number into co2_ppm.',
        template: 'scanf("[[1]]", [[2]]co2_ppm);',
        blanks: [['%d'], ['&']],
        distractors: ['%f', '*'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Ask Reading? then read a number into co2_ppm and print Logged: followed by it. (The input 1150 is given.)',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm;\n    printf("Reading? ");\n    scanf("%d", &co2_ppm);\n    printf("Logged: %d\\n", co2_ppm);\n    return 0;\n}\n',
        hint: 'printf("Reading? "); scanf("%d", &co2_ppm); printf("Logged: %d\\n", co2_ppm);',
        stdin: ['1150'],
        checks: [
          { message: 'Print Logged: 1150', outputIncludes: 'Logged: 1150' },
          { message: 'Use scanf with &', codeIncludes: '&co2_ppm' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The reading always comes out wrong. Which line is the bug?',
        lines: ['int co2_ppm;', 'printf("Reading? ");', 'scanf("%d", co2_ppm);', 'printf("%d\\n", co2_ppm);'],
        bug: 2,
        fix: 'scanf("%d", &co2_ppm);',
        explanation: 'scanf needs & before the variable: it must know WHERE to put the number, not what\'s in the box now.',
        language: 'c',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the lines in order.',
        lines: ['int co2_ppm;', 'printf("Reading? ");', 'scanf("%d", &co2_ppm);', 'printf("Logged %d\\n", co2_ppm);'],
        language: 'c',
      },
      {
        kind: 'mcq',
        prompt: 'Why does the prompt printf("Reading? ") have no \\n?',
        options: [
          { text: 'So the person types the answer on the same line' },
          { text: 'scanf breaks if there\'s a \\n', why: 'It wouldn\'t break; it\'s just nicer to answer on the same line.' },
          { text: 'It\'s a mistake', why: 'It\'s deliberate: prompts usually leave the cursor on the same line.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to its job.',
        pairs: [
          ['printf', 'Writes to the screen'],
          ['scanf', 'Reads from the keyboard'],
          ['%d in scanf', 'Read a whole number'],
          ['&co2_ppm', 'Where to put it'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'I forgot the & and it compiled anyway. So it\'s optional?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'No. It compiles, but scanf writes the number to the wrong place. On a real board that can crash it.' },
          { text: 'Yes, it\'s optional for ints.', why: 'It\'s never optional for scanf with an int. Without it, the number goes somewhere random.' },
          { text: 'Only printf needs &.', why: 'The other way round: printf takes values, scanf needs & to know where to store.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which symbol must go before the variable name in scanf("%d", ?co2_ppm)? Type its name.',
        answers: ['ampersand', 'and sign', 'and'],
        placeholder: 'Its name, in words',
      },
      {
        kind: 'writeCode',
        prompt: 'Read the water tank level (given: 1574) and print Tank: 1574 litres, then Usable: 1174 litres (minus the 400 reserve).',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int tank_litres;\n    printf("Tank reading? ");\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int tank_litres;\n    printf("Tank reading? ");\n    scanf("%d", &tank_litres);\n    printf("Tank: %d litres\\n", tank_litres);\n    printf("Usable: %d litres\\n", tank_litres - 400);\n    return 0;\n}\n',
        hint: 'scanf("%d", &tank_litres); then two printf lines.',
        stdin: ['1574'],
        checks: [
          { message: 'Print Tank: 1574 litres', outputIncludes: 'Tank: 1574 litres' },
          { message: 'Print Usable: 1174 litres', outputIncludes: 'Usable: 1174 litres' },
          { message: 'Read it with scanf', codeIncludes: 'scanf(' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'A good prompt tells people exactly what to type. Think of a form or app that asked you something unclear. How would you reword its question?',
    starters: ['The unclear question was...', 'I\'d ask instead...'],
  },
  notes: 'scanf with %d and an int* argument (ISO C 7.21.6.2). Passing an int instead of int* is undefined behaviour; this runner may silently write to address 0, a real board may crash. The & operator is explained in Chapter 8.',
};

export default lesson;
