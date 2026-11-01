import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Chat with Tey: source code, the compiler, machine code; compile errors vs output. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Compile, then run',
  summary: 'Sol 1, 13:20. Ines presses Run on a program with a typo and gets no output at all, just a message. Why didn\'t the board run the lines that were fine?',
  minutes: 11,
  outcomes: [
    'Explain what a compiler does, in two steps',
    'Tell a compile error from a program that ran',
    'Say what source code and machine code are',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Quick question. When you press Run, what do you think happens first?', replies: ['It runs my lines?', 'No idea'] },
        { tey: 'Two things happen, in order. First the compiler reads your whole program, your source code, and translates it into machine code: the numbers the processor runs.', replies: ['And then?'] },
        { tey: 'Then the machine code runs. That\'s when printf actually prints. Compile, then run. Always in that order.', replies: ['So what if there\'s a typo?'] },
        { tey: 'Then step one fails. The compiler can\'t translate something it can\'t understand, so it stops and tells you where. Nothing runs, not even the lines that were fine.', replies: ['That\'s what happened to me!'] },
        { tey: 'Exactly. A compile error means "I couldn\'t build it". Output means "it built, and it ran". Two very different moments. Learn to tell them apart and half of debugging is done.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A program that won\'t build',
      code: '#include <stdio.h>\n\nint main(void) {\n    printf("Line one\\n");\n    printf("Line two\\n")\n    return 0;\n}\n',
      caption: 'Run it. Line one is fine, but nothing prints: the compiler stopped at line 5 before anything could run.',
      challenge: 'Add the missing ; and run it again. Now both lines print.',
      expectError: true,
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Source code: the C you write. Machine code: what the compiler makes from it. On your own computer you\'d type a command like gcc main.c -o main to compile, then ./main to run. Here, the Run button does both.',
    },
  ],
  apply: {
    scenario: 'Sol 1, 13:20. Why nothing printed.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When you press Run, what happens first?',
        options: [
          { text: 'The program runs line by line', why: 'Not yet: it has to be translated first.' },
          { text: 'The compiler translates the whole program into machine code' },
          { text: 'printf prints the first line', why: 'printf only prints once the program runs, after compiling.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each word to its meaning.',
        pairs: [
          ['Source code', 'The C you write'],
          ['Compiler', 'Translates C to machine code'],
          ['Machine code', 'What the processor runs'],
          ['Compile error', 'The program couldn\'t be built'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A program has a typo on line 9 of 10. What prints when you press Run?',
        options: [
          { text: 'Lines 1 to 8\'s output, then an error', why: 'The compiler checks the whole program before any of it runs.' },
          { text: 'Nothing from the program: just the compile error' },
          { text: 'Everything except line 9', why: 'C never skips a broken line. It refuses to build the program.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Compile time or run time? When does each happen?',
        groups: ['While compiling', 'While running'],
        items: [
          { text: 'A missing ; is found', group: 0 },
          { text: 'printf shows text on the screen', group: 1 },
          { text: 'C is translated to machine code', group: 0 },
          { text: 'The lines inside main are carried out', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'This won\'t compile. Fix it so it prints both lines.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("Compiled\\n")\n    printf("Running\\n");\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Compiled\\n");\n    printf("Running\\n");\n    return 0;\n}\n',
        hint: 'Look at the end of the first printf line.',
        checks: [
          { message: 'Print Compiled, then Running', outputEquals: 'Compiled\nRunning' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'So the screen\'s blank. Is the board broken again?',
        prompt: 'What should Ines check first?',
        options: [
          { text: 'Yes, swap the board.', why: 'A blank screen after Run is usually a compile error, not hardware.' },
          { text: 'Whether the compiler reported an error. If it did, nothing ran.' },
          { text: 'Restart the generator.', why: 'The power is fine. The message from the compiler will say what\'s wrong.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Fill in the two steps.',
        template: 'First the [[1]] turns source code into machine code. Then the machine code [[2]].',
        blanks: [['compiler'], ['runs']],
        distractors: ['printf', 'stops'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On a computer, a common command to compile C starts with which three-letter program name?',
        answers: ['gcc'],
        placeholder: 'Three letters',
      },
      {
        kind: 'findBug',
        prompt: 'Find the sentence that\'s wrong.',
        lines: [
          'The compiler reads the whole program first.',
          'If it finds an error, nothing runs.',
          'Lines above the error still print.',
          'Once it compiles, the program runs from main.',
        ],
        bug: 2,
        fix: 'Nothing prints at all: the program never ran.',
        explanation: 'A compile error stops everything before any line runs.',
      },
      {
        kind: 'writeCode',
        prompt: 'Two mistakes this time. Fix them so it prints Compile, then run',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("Compile, then run\\n)\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Compile, then run\\n");\n    return 0;\n}\n',
        hint: 'The text needs its closing double quote, and the line needs its semicolon.',
        checks: [
          { message: 'Print Compile, then run', outputIncludes: 'Compile, then run' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you do in two steps: prepare, then do (cook, then eat; pack, then travel). How is it like compile, then run?',
    starters: ['My two-step thing is...', 'The "compile" part is...'],
  },
  deepen: {
    title: 'Compile C on your own computer',
    summary: 'On Linux or macOS, try gcc --version in a terminal. On Windows, compilers come with MSYS2 or Visual Studio. You\'ll set one up in the last chapter.',
  },
  notes: 'gcc main.c -o main then ./main: standard GCC usage (gcc.gnu.org docs). Compilation must succeed before any execution: true of all ahead-of-time C compilers.',
};

export default lesson;
