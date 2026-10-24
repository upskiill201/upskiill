import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Before / After: where semicolons go, and where they don't. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The semicolon rule',
  summary: 'Sol 1, 14:05. Mateus "helps" by adding a semicolon to the end of every line. Now nothing compiles. Where do they really go?',
  minutes: 10,
  outcomes: [
    'Put a semicolon at the end of every statement',
    'Know which lines never take a semicolon',
    'Fix a missing or extra semicolon',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Mateus\'s version, and the fixed one',
      before: {
        label: 'Semicolons everywhere',
        text: '#include <stdio.h>;\n\nint main(void) {;\n    printf("Rover 1 ready\\n");\n    return 0;\n};',
      },
      after: {
        label: 'Semicolons on statements only',
        text: '#include <stdio.h>\n\nint main(void) {\n    printf("Rover 1 ready\\n");\n    return 0;\n}',
      },
      notes: [
        'A statement is one instruction: printf(...) and return 0 are statements. Each one ends with ;',
        '#include lines are instructions for the compiler before it starts. They never take a ;',
        'int main(void) { opens a block of statements. The { marks the start. A ; after it is an "empty statement": it does nothing, so it\'s just noise.',
        'The closing } ends main. A ; after it is an error on many compilers, including this one.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A quick test: does the line DO something (print, return)? Then it ends with ;. Does it open or close a block, or start with #? Then it doesn\'t.',
    },
    {
      kind: 'tryIt',
      title: 'One missing, see what happens',
      code: '#include <stdio.h>\n\nint main(void) {\n    printf("Rover 1 ready\\n")\n    printf("Rover 2 ready\\n");\n    return 0;\n}\n',
      caption: 'Run it and read the error: it tells you which line needs the semicolon.',
      challenge: 'Add the semicolon and run it again.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'Sol 1, 14:05. Cleaning up after Mateus.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which line needs a semicolon at the end?',
        options: [
          { text: '#include <stdio.h>', why: 'Lines starting with # are for the compiler before it starts. No semicolon.' },
          { text: 'int main(void) {', why: 'This opens a block. The { does the job.' },
          { text: 'printf("Hello\\n")' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Ends with a semicolon, or not?',
        groups: ['Needs ;', 'No ;'],
        items: [
          { text: 'printf("Ready\\n")', group: 0 },
          { text: 'return 0', group: 0 },
          { text: '#include <stdio.h>', group: 1 },
          { text: 'int main(void) {', group: 1 },
          { text: '}', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is missing its semicolon?',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("Hab: OK\\n");', '    printf("GreenHab: OK\\n")', '    return 0;', '}'],
        bug: 3,
        fix: '    printf("GreenHab: OK\\n");',
        explanation: 'A statement without its ; runs straight into the next line, and the compiler can\'t tell where one ends.',
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Mateus added semicolons where they don\'t belong. Fix the program so it compiles and prints Rover 1 ready.',
        starter: '#include <stdio.h>;\n\nint main(void) {\n    printf("Rover 1 ready\\n");\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Rover 1 ready\\n");\n    return 0;\n}\n',
        hint: 'Look at the very first line. # lines never end with ;',
        checks: [
          { message: 'Print Rover 1 ready', outputIncludes: 'Rover 1 ready' },
          { message: 'No ; after the #include line', codeIncludes: '#include <stdio.h>\n' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does C need semicolons at all?',
        options: [
          { text: 'To mark where each statement ends, since C ignores line breaks' },
          { text: 'To make the program run faster', why: 'They don\'t change speed. They tell the compiler where statements end.' },
          { text: 'Only for style; they\'re optional', why: 'Leave one out and the program won\'t compile.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the statement that ends main.',
        tiles: ['return', '0', ';'],
        distractors: ['}', ':'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'In my defence, more semicolons is safer, right?',
        prompt: 'Ines\'s reply?',
        options: [
          { text: 'Right, add them everywhere.', why: 'A ; after #include is an error. Extra ones aren\'t "safer".' },
          { text: 'Not on # lines or after braces. Semicolons end statements, nothing else.' },
          { text: 'Semicolons don\'t matter in C.', why: 'Leave one out and nothing compiles. They matter.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In C, one instruction like printf("Hi\\n"); is called a what?',
        answers: ['statement', 'a statement'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the program in order.',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("Rover 1 ready\\n");', '    printf("Rover 2 ready\\n");', '    return 0;', '}'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Three statements are missing their semicolons. Fix them all so it prints the rover report.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("Rover 1: charged\\n")\n    printf("Rover 2: charging\\n")\n    return 0\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Rover 1: charged\\n");\n    printf("Rover 2: charging\\n");\n    return 0;\n}\n',
        hint: 'Two printf lines and the return line each need a ; at the end.',
        checks: [
          { message: 'Print both rover lines', outputEquals: 'Rover 1: charged\nRover 2: charging' },
          { message: 'End return 0 with a semicolon', codeIncludes: 'return 0;' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'C needs you to mark the end of every instruction. Where else do people use a symbol to say "this part is finished"?',
    starters: ['Another "finished" symbol I know is...', 'It helps because...'],
  },
  notes: 'Statements terminated by ; (ISO C 6.8); preprocessing directives (#include) are not statements; compound statement { } takes no terminator. Note: a ; after #include <stdio.h> gives an "extra tokens" warning in GCC and an error/warning in other compilers; in this runner it is an error.',
};

export default lesson;
