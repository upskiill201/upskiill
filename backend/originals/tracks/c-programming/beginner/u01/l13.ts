import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 13. Before / After: whitespace doesn't matter to C, it matters to people. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Spaces, indents and style',
  summary: 'Sol 1, 22:05. Mateus "saves space" by writing a whole program on one line. It compiles. Nobody, including Mateus, can read it an hour later.',
  minutes: 10,
  outcomes: [
    'Explain that C ignores extra spaces and line breaks between code',
    'Indent a program\'s body so its structure is visible',
    'Know where spaces DO matter: inside the quotes',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Same program, two styles',
      before: {
        label: 'Mateus: one line',
        text: '#include <stdio.h>\nint main(void){printf("Rover 1: 84%%\\n");printf("Rover 2: 31%%\\n");return 0;}',
      },
      after: {
        label: 'Ines: one statement per line, indented',
        text: '#include <stdio.h>\n\nint main(void) {\n    printf("Rover 1: 84%%\\n");\n    printf("Rover 2: 31%%\\n");\n    return 0;\n}',
      },
      notes: [
        'Both compile and print exactly the same. C ignores extra spaces, tabs and line breaks between pieces of code.',
        'One statement per line means each line has one job: easy to read, easy to find in an error message.',
        'The body is indented 4 spaces, so you can see at a glance what\'s inside main.',
        'A blank line after #include separates "setup" from the program itself.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Spaces inside the quotes are different: they\'re part of the text and get printed. printf("A   B") prints three spaces.',
    },
    {
      kind: 'tryIt',
      title: 'Tidy Mateus\'s line',
      code: '#include <stdio.h>\nint main(void){printf("Rover 1: 84%%\\n");printf("Rover 2: 31%%\\n");return 0;}\n',
      caption: 'Run it: it works. Now make it readable without changing what it prints.',
      challenge: 'Put each statement on its own line, indented 4 spaces inside main, and run it again.',
    },
  ],
  apply: {
    scenario: 'Sol 1, 22:05. Untangling Mateus\'s line.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Does C care if you write a whole program on one line?',
        options: [
          { text: 'No: it ignores extra spaces and line breaks between code' },
          { text: 'Yes: each statement must be on its own line', why: 'C uses ; to find where statements end, not line breaks.' },
          { text: 'Yes: it won\'t compile', why: 'Mateus\'s one-liner compiles fine. It\'s just hard to read.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("Fan   1\\n");',
        language: 'c',
        options: [
          { text: 'Fan 1', why: 'Spaces inside the quotes are part of the text. All three are printed.' },
          { text: 'Fan   1' },
          { text: 'Fan1', why: 'The spaces between the quotes are printed as they are.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does this change what the program prints?',
        groups: ['Changes the output', 'Doesn\'t change it'],
        items: [
          { text: 'Indenting printf by 4 spaces', group: 1 },
          { text: 'Adding spaces inside printf\'s quotes', group: 0 },
          { text: 'Putting a blank line after #include', group: 1 },
          { text: 'Changing the words between the quotes', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make this readable: one statement per line, the body indented. It must still print the same two lines.',
        starter: '#include <stdio.h>\nint main(void){printf("Hab: 21 C\\n");printf("GreenHab: 24 C\\n");return 0;}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Hab: 21 C\\n");\n    printf("GreenHab: 24 C\\n");\n    return 0;\n}\n',
        hint: 'Press Enter after each ; and after the {, and indent the lines inside main.',
        checks: [
          { message: 'Print the same two lines', outputEquals: 'Hab: 21 C\nGreenHab: 24 C' },
          { message: 'Indent the first printf by 4 spaces on its own line', codeIncludes: '\n    printf("Hab: 21 C\\n");' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Rebuild Mateus\'s one-liner as a readable program.',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("Rover 1: 84%%\\n");', '    printf("Rover 2: 31%%\\n");', '    return 0;', '}'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'One line is shorter. Shorter is better, no?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Shorter to type, slower to read. Code is read far more often than it\'s written.' },
          { text: 'Yes, always make code as short as possible.', why: 'Short but unreadable code is where bugs hide.' },
          { text: 'One-line programs don\'t compile.', why: 'They do compile. The problem is people reading them.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which version has a real problem, not just a style one?',
        lines: [
          'int main(void){ printf("Hi\\n"); return 0; }',
          'int main(void) {\n  printf("Hi\\n");\n  return 0;\n}',
          'int main(void) {\n    printf("Hi\\n")\n    return 0;\n}',
        ],
        bug: 2,
        fix: 'Add the ; after printf("Hi\\n")',
        explanation: 'Spacing and indent sizes are style. A missing semicolon is an error, however neat the layout.',
        language: 'c',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many spaces does this course indent the body of main by?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to why it helps.',
        pairs: [
          ['One statement per line', 'Each line has one job'],
          ['Indent the body', 'You can see what\'s inside main'],
          ['Blank line after #include', 'Separates setup from the program'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write a neat program (indented, one statement per line) that prints Rover 1: 84% and Rover 2: 31% on two lines.',
        starter: '',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Rover 1: 84%%\\n");\n    printf("Rover 2: 31%%\\n");\n    return 0;\n}\n',
        hint: 'Remember %% for each percent sign.',
        checks: [
          { message: 'Print both lines', outputEquals: 'Rover 1: 84%\nRover 2: 31%' },
          { message: 'Indent with 4 spaces', codeIncludes: '\n    printf(' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a document that was hard to read because of its layout: a form, a timetable, a manual. What one change would have made it readable?',
    starters: ['The hard-to-read thing was...', 'One change that would help...'],
  },
  deepen: {
    title: 'Style guides',
    summary: 'Teams agree on one style so all code looks the same. The Linux kernel style uses 8-wide tabs; many projects use 4 spaces. Tools like clang-format fix layout automatically.',
  },
  notes: 'Whitespace between tokens is insignificant in C (translation phases, ISO C 5.1.1.2). Linux kernel coding style: 8-character tabs (kernel.org Documentation/process/coding-style). clang-format is part of LLVM.',
};

export default lesson;
