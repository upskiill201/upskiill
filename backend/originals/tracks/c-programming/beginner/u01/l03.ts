import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Tap to explore: every line of the smallest C program. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Inside a C program',
  summary: 'Sol 1, 08:15. Ines does what she does with any new circuit: she traces every wire. Today the wires are five lines of C, and each one has a job.',
  minutes: 11,
  outcomes: [
    'Name the parts of a C program: #include, main, braces, statements, return',
    'Explain where a C program starts',
    'Write the skeleton of a program from memory',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part',
      text: '#include <stdio.h>\n\nint main(void) {\n    printf("Hab pressure OK\\n");\n    return 0;\n}',
      hotspots: [
        { phrase: '#include <stdio.h>', note: 'Brings in the "standard input/output" tools, including printf. Without it, C doesn\'t know what printf is.' },
        { phrase: 'int main(void)', note: 'The main function: every C program starts running here, at the top of main. int means it gives back a whole number when it ends; void means it takes nothing in.' },
        { phrase: '{', note: 'An opening brace starts main\'s body: the instructions that belong to main.' },
        { phrase: 'printf("Hab pressure OK\\n");', note: 'A statement: one instruction. This one prints a line. Statements end with a semicolon.' },
        { phrase: 'return 0;', note: 'Ends main and tells whoever ran the program "0: everything went fine".' },
        { phrase: '}', note: 'The closing brace ends main\'s body. Every { needs its }.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ines\'s rule from wiring, now for code: every { is a wire going in, every } is the wire coming back. Count them. They must match.',
    },
    {
      kind: 'tryIt',
      title: 'Your own skeleton',
      code: '#include <stdio.h>\n\nint main(void) {\n    printf("Hab pressure OK\\n");\n    printf("Airlock sealed\\n");\n    return 0;\n}\n',
      caption: 'Everything between { and } is main\'s body. The board runs it top to bottom. Run it.',
      challenge: 'Move the Airlock sealed line above the Hab pressure line. Run it: the order of the output follows the order of the code.',
    },
  ],
  apply: {
    scenario: 'Sol 1, 08:15. Tracing every line.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where does every C program start running?',
        options: [
          { text: 'At the first line of the file', why: 'The first line is usually #include. Running starts at main.' },
          { text: 'At the top of main', },
          { text: 'At return 0', why: 'return 0 is where main ends.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['#include <stdio.h>', 'Brings in printf and friends'],
          ['int main(void)', 'Where the program starts'],
          ['{ ... }', 'Holds main\'s instructions'],
          ['return 0;', 'Ends main: all went fine'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the skeleton.',
        template: '#include <stdio.h>\n\nint [[1]](void) {\n    printf("Ready\\n");\n    [[2]] 0;\n}',
        blanks: [['main'], ['return']],
        distractors: ['start', 'end', 'begin'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'The body is empty. Add a line inside main that prints: Airlock sealed',
        starter: '#include <stdio.h>\n\nint main(void) {\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Airlock sealed\\n");\n    return 0;\n}\n',
        hint: 'Put printf("Airlock sealed\\n"); on its own line, above return 0;',
        checks: [
          { message: 'Print Airlock sealed', outputIncludes: 'Airlock sealed' },
          { message: 'Keep return 0;', codeIncludes: 'return 0;' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is missing something?',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("GreenHab lights on\\n");', '    return 0;'],
        bug: 3,
        fix: '    return 0;\n}',
        explanation: 'main\'s body opens with { but never closes. The program needs a } after return 0;',
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this program print?',
        code: '#include <stdio.h>\n\nint main(void) {\n    printf("B\\n");\n    printf("A\\n");\n    return 0;\n}',
        language: 'c',
        options: [
          { text: 'A, then B', why: 'C runs the lines in the order they\'re written, not alphabetical order.' },
          { text: 'B, then A' },
          { text: 'Only B', why: 'Both printf lines run, one after the other.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Inside main\'s braces, or outside?',
        groups: ['Outside main', 'Inside main\'s { }'],
        items: [
          { text: '#include <stdio.h>', group: 0 },
          { text: 'printf("Hello\\n");', group: 1 },
          { text: 'return 0;', group: 1 },
          { text: 'int main(void)', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the lines in order.',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("Hab pressure OK\\n");', '    return 0;', '}'],
        language: 'c',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Every C program starts in a function with what name?',
        answers: ['main', 'main()'],
        placeholder: 'A function name',
      },
      {
        kind: 'writeCode',
        prompt: 'Write the whole program yourself. Make it print GreenHab lights on.',
        starter: '',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("GreenHab lights on\\n");\n    return 0;\n}\n',
        hint: 'Five lines: #include <stdio.h>, int main(void) {, the printf, return 0;, and }.',
        checks: [
          { message: 'Include stdio.h', codeIncludes: '#include <stdio.h>' },
          { message: 'Print GreenHab lights on', outputIncludes: 'GreenHab lights on' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Ines learns code the way she learned wiring: trace every part until it makes sense. How do you usually learn something new: by reading, by trying, or by taking it apart?',
    starters: ['I usually learn by...', 'For C, I\'ll try...'],
  },
  deepen: {
    title: 'Why "void"?',
    summary: 'In int main(void), void means "no inputs". Older C code writes int main() instead. Both work here; int main(void) says what you mean.',
  },
  notes: 'stdio.h = standard input/output header (C standard library). main as program entry point and return 0 as success: ISO C standard (5.1.2.2). int main(void) vs int main(): both valid hosted forms.',
};

export default lesson;
