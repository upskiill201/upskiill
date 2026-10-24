import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 14. Myth or Fact: bytes, sizeof, and why types have sizes. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'How big is a type?',
  summary: 'Sol 2, 21:40. Lars\'s reply arrives: "Your board has 32 kilobytes of memory. Every variable costs bytes. Know what you spend." Ines asks the board what each type costs.',
  minutes: 10,
  outcomes: [
    'Explain what a byte is',
    'Use sizeof to ask how many bytes a type or variable takes',
    'Say why a char is smaller than an int, and an int smaller than a double',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Every variable takes up space in memory.', isFact: true, explain: 'Fact. Memory is measured in bytes, and every variable uses some. On a board with 32 KB, that adds up.' },
        { text: 'A char and a double take the same amount of memory.', isFact: false, explain: 'Myth. A char is 1 byte: enough for one character. A double is usually 8: enough for about 15 significant digits.' },
        { text: 'C can tell you how many bytes a type uses.', isFact: true, explain: 'Fact. sizeof(int) gives the size of an int in bytes, on the machine you\'re compiling for.' },
        { text: 'An int is the same size on every computer.', isFact: false, explain: 'Myth. C only promises a minimum. On most computers today an int is 4 bytes, but old boards like HABCON\'s used 2.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>A <strong>byte</strong> is 8 bits: 8 tiny on/off switches, enough for 256 different values. <code>sizeof</code> tells you how many bytes something uses:</p><p><code>printf("%zu\\n", sizeof(int));</code></p><p><code>%zu</code> is the placeholder for sizes: sizeof gives a special whole-number type called <code>size_t</code>. On this board: char 1, int 4, double 8.</p>',
    },
    {
      kind: 'tryIt',
      title: 'What each type costs',
      code: '#include <stdio.h>\n\nint main(void) {\n    double temp_c = 21.5;\n\n    printf("char:   %zu byte\\n", sizeof(char));\n    printf("int:    %zu bytes\\n", sizeof(int));\n    printf("double: %zu bytes\\n", sizeof(double));\n    printf("temp_c: %zu bytes\\n", sizeof(temp_c));\n    return 0;\n}\n',
      caption: 'Run it. sizeof works on a type, or on a variable.',
      challenge: 'Add a line for sizeof(float). Is it bigger or smaller than a double?',
    },
  ],
  apply: {
    scenario: 'Sol 2, 21:40. Lars\'s budget of bytes.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does sizeof(int) give?',
        options: [
          { text: 'The biggest number an int can hold', why: 'That\'s INT_MAX. sizeof gives the number of bytes.' },
          { text: 'How many bytes an int uses' },
          { text: 'The value of an int', why: 'sizeof measures the box, not what\'s in it.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the type to its size on this board.',
        pairs: [
          ['char', '1 byte'],
          ['int', '4 bytes'],
          ['double', '8 bytes'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print double uses 8 bytes, with the 8 coming from sizeof(double) and %zu.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("double uses %zu bytes\\n", sizeof(double));\n    return 0;\n}\n',
        hint: 'printf("double uses %zu bytes\\n", sizeof(double));',
        checks: [
          { message: 'Print double uses 8 bytes', outputIncludes: 'double uses 8 bytes' },
          { message: 'Use sizeof', codeIncludes: 'sizeof(double)' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many bits are in a byte?',
        options: [
          { text: '8' },
          { text: '10', why: 'A byte is 8 bits, not 10.' },
          { text: '1024', why: '1024 bytes is a kilobyte. A byte is 8 bits.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Smaller or bigger than an int (4 bytes) on this board?',
        groups: ['Smaller', 'Bigger'],
        items: [
          { text: 'char', group: 0 },
          { text: 'double', group: 1 },
          { text: 'One letter like \'G\'', group: 0 },
          { text: 'A temperature like 21.5', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ask how big the variable is.',
        template: 'int water = 1610;\nprintf("[[1]]\\n", [[2]](water));',
        blanks: [['%zu'], ['sizeof']],
        distractors: ['%f', 'size'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'lars',
        message: 'HABCON stored temperatures as int tenths of a degree: 215 meant 21.5. Why do you think I did that?',
        prompt: 'Ines\'s best guess?',
        options: [
          { text: 'To save memory: in 1998 an int took less space than a double, and the board was tiny.' },
          { text: 'Because C had no decimals in 1998.', why: 'C has had double since the start. It was about saving bytes.' },
          { text: 'To make the numbers harder to read.', why: 'Lars was saving memory, not hiding anything.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many bytes does a char take?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line\'s placeholder is wrong for sizeof?',
        lines: ['printf("%zu\\n", sizeof(int));', 'printf("%f\\n", sizeof(char));', 'printf("%zu\\n", sizeof(double));'],
        bug: 1,
        fix: 'printf("%zu\\n", sizeof(char));',
        explanation: 'sizeof gives a whole number (size_t). %f is for doubles; use %zu.',
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Lars wants a byte budget. Print Total: 13 bytes, where 13 is sizeof(char) + sizeof(int) + sizeof(double).',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Total: %zu bytes\\n", sizeof(char) + sizeof(int) + sizeof(double));\n    return 0;\n}\n',
        hint: 'Add the three sizeof values inside printf, with %zu.',
        checks: [
          { message: 'Print Total: 13 bytes', outputIncludes: 'Total: 13 bytes' },
          { message: 'Use sizeof three times', codeIncludes: 'sizeof(double)' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Lars says "know what you spend". What resource do you spend without counting (phone storage, data, time), and would counting change how you use it?',
    starters: ['I spend ... without counting', 'If I counted it...'],
  },
  deepen: {
    title: 'Kilobytes, megabytes, gigabytes',
    summary: '1 KB is 1,024 bytes, 1 MB is 1,024 KB, 1 GB is 1,024 MB. Your phone has billions of bytes; the backup board has 32 thousand. Same C, very different budgets.',
  },
  notes: 'sizeof and size_t: ISO C 6.5.3.4, 7.19; %zu: 7.21.6.1 (C99). sizeof(char) is 1 by definition; int is at least 16 bits (5.2.4.2.1); int 4 bytes and double 8 bytes on mainstream platforms and in this runner. 16-bit int on older embedded compilers is historical fact; HABCON details fictional.',
};

export default lesson;
