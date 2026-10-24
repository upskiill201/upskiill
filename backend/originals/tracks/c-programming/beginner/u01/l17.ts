import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 17. Reading lesson: what headers are, the standard library, what #include does. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Headers and #include',
  summary: 'Sol 1, 23:20. Mateus deletes the "boring" first line of a program. Suddenly C has never heard of printf. What was that line doing?',
  minutes: 11,
  outcomes: [
    'Explain what a header is and what #include does',
    'Name the headers for printing, numbers, text and maths',
    'Fix "undeclared" errors caused by a missing #include',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'C keeps its tools in a toolbox',
      html: '<p>C itself is tiny. It doesn\'t even know how to print. Printing, maths and text handling live in the <strong>standard library</strong>: ready-made tools that come with every C compiler.</p><p>The tools are grouped into <strong>headers</strong>, files ending in <code>.h</code>. Each header tells the compiler what one group of tools is called and how to use them.</p><p><code>#include &lt;stdio.h&gt;</code> means: "before compiling, paste in the description of the standard input/output tools". That\'s how the compiler learns that printf, puts and scanf exist.</p><h3>Headers you\'ll use in this course</h3><ul><li><code>stdio.h</code>: printf, puts, scanf, files</li><li><code>stdlib.h</code>: memory, random numbers, converting text to numbers</li><li><code>string.h</code>: working with text</li><li><code>math.h</code>: square roots, powers, rounding</li><li><code>ctype.h</code>: is this character a digit? a letter?</li></ul><p>Lines that start with <code>#</code> are handled before the real compiling begins, by the <strong>preprocessor</strong>. That\'s why they don\'t end with a semicolon.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Without the toolbox',
      code: 'int main(void) {\n    printf("Fans on\\n");\n    return 0;\n}\n',
      caption: 'No #include. Run it and read the error.',
      challenge: 'Add #include <stdio.h> as the first line and run it again.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'Sol 1, 23:20. The line Mateus deleted.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does #include <stdio.h> do?',
        options: [
          { text: 'Tells the compiler about printf and the other input/output tools' },
          { text: 'Prints the word stdio', why: 'Nothing is printed. It brings in descriptions of tools.' },
          { text: 'Starts the program', why: 'Programs start at main.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each header to what\'s inside.',
        pairs: [
          ['stdio.h', 'printf and puts'],
          ['math.h', 'Square roots and powers'],
          ['string.h', 'Tools for text'],
          ['stdlib.h', 'Random numbers and memory'],
          ['ctype.h', 'Is this a digit or a letter?'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Mateus deleted a line. Put it back so the program prints Fans on.',
        starter: 'int main(void) {\n    printf("Fans on\\n");\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Fans on\\n");\n    return 0;\n}\n',
        hint: 'printf lives in stdio.h. Include it on the first line.',
        checks: [
          { message: 'Print Fans on', outputIncludes: 'Fans on' },
          { message: 'Include stdio.h', codeIncludes: '#include <stdio.h>' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The compiler says \'printf\' undeclared, and printf is spelled right. What\'s the likely cause?',
        options: [
          { text: 'The program is missing #include <stdio.h>' },
          { text: 'printf only works on some computers', why: 'printf is part of every standard C library, once stdio.h is included.' },
          { text: 'There\'s a missing semicolon', why: 'That gives a different message: \';\' expected.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line stops this compiling?',
        lines: ['#include <stdoi.h>', 'int main(void) {', '    puts("Heater on");', '    return 0;', '}'],
        bug: 0,
        fix: '#include <stdio.h>',
        explanation: 'stdoi.h is a typo. There is no such header, so the compiler can\'t find it.',
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of C itself, or from a header?',
        groups: ['Built into C', 'Needs a header'],
        items: [
          { text: 'int', group: 0 },
          { text: 'return', group: 0 },
          { text: 'printf', group: 1 },
          { text: 'puts', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the first line.',
        template: '[[1]] <[[2]]>',
        blanks: [['#include'], ['stdio.h']],
        distractors: ['import', 'stdio.c'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'Why doesn\'t C just know printf already? Python knows print.',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'C keeps the language tiny, so it fits on boards like ours. Tools come in only when you include them.' },
          { text: 'Because C is broken.', why: 'It\'s a design choice: a small core plus a library.' },
          { text: 'C can\'t print at all.', why: 'It can, using printf from stdio.h.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Header file names end in a dot and one letter, like stdio.?. Which letter?',
        answers: ['h', '.h'],
        placeholder: 'One letter',
      },
      {
        kind: 'writeCode',
        prompt: 'Write the program from scratch: include stdio.h and print Toolbox loaded.',
        starter: '',
        solution: '#include <stdio.h>\n\nint main(void) {\n    puts("Toolbox loaded");\n    return 0;\n}\n',
        hint: 'First line #include <stdio.h>, then main with a puts or printf.',
        checks: [
          { message: 'Print Toolbox loaded', outputIncludes: 'Toolbox loaded' },
          { message: 'Include stdio.h', codeIncludes: '#include <stdio.h>' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'C keeps its tools in labelled boxes and only brings out the ones you ask for. How do you organise your own tools, files or kitchen?',
    starters: ['I organise my...', 'What works well is...'],
  },
  deepen: {
    title: 'Angle brackets or quotes?',
    summary: '#include <stdio.h> looks in the system\'s library folders. #include "sensors.h" looks next to your own code first. You\'ll write your own header in the last chapter.',
  },
  notes: 'Standard headers and their contents: ISO C clause 7 (stdio.h 7.21, stdlib.h 7.22, string.h 7.24, math.h 7.12, ctype.h 7.4). #include and the preprocessor: 6.10. <> vs "" search order: 6.10.2 (implementation-defined, conventional behaviour described).',
};

export default lesson;
