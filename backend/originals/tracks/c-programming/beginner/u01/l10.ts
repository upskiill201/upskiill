import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Checkpoint. Reviews lessons 6–9: compiling, semicolons, reading errors, escape sequences. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: The status report',
  summary: 'Sol 1, 18:30. Mission Support\'s email window opens at 19:00. Hal wants a tidy status report on the console first, and Ines\'s draft won\'t compile.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Fix compile errors by reading the message', 'Print a lined-up report with escape sequences'],
  learn: [
    {
      kind: 'story',
      title: 'Sol 1, 18:30',
      beats: [
        { speaker: 'hal', text: 'Thirty minutes to the email window. I want the status report on that console when I send it.' },
        { speaker: 'ines', text: 'It\'s written. It just... says "String not closed".' },
        { speaker: 'tomoko', text: 'Then let\'s find the string that isn\'t closed.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the status report before the email window.',
    items: [
      {
        kind: 'mcq',
        prompt: 'A compile error appears. What printed from your program?',
        options: [
          { text: 'Nothing: the program never ran' },
          { text: 'Everything above the broken line', why: 'Compiling comes first. If it fails, no line runs.' },
          { text: 'Everything except the broken line', why: 'C doesn\'t skip broken lines; it refuses to build.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Ines\'s draft. Fix it so it compiles and prints the two report lines.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("STATUS REPORT\\n);\n    printf("Board:\\tbackup\\n")\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("STATUS REPORT\\n");\n    printf("Board:\\tbackup\\n");\n    return 0;\n}\n',
        hint: 'Fix the first error first: the first printf is missing its closing quote. Then run again.',
        checks: [
          { message: 'Print STATUS REPORT', outputIncludes: 'STATUS REPORT' },
          { message: 'Print the Board line with a tab', outputIncludes: 'Board:\tbackup' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it prints.',
        pairs: [
          ['\\"', '"'],
          ['%%', '%'],
          ['\\\\', '\\'],
          ['\\t', 'A tab'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Error: \';\' expected, on line 4. Which line actually has the mistake?',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("Crew: 4\\n")', '    printf("Sol: 1\\n");', '    return 0;', '}'],
        bug: 2,
        fix: '    printf("Crew: 4\\n");',
        explanation: 'The compiler only noticed on the next line. The ; is missing at the end of the line above.',
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("Water: 72%% \\"OK\\"\\n");',
        language: 'c',
        options: [
          { text: 'Water: 72% "OK"' },
          { text: 'Water: 72%% "OK"', why: '%% prints a single %.' },
          { text: 'Water: 72% OK', why: 'Each \\" prints a quote mark.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs a semicolon at the end, or not?',
        groups: ['Needs ;', 'No ;'],
        items: [
          { text: 'printf("Report\\n")', group: 0 },
          { text: '#include <stdio.h>', group: 1 },
          { text: 'return 0', group: 0 },
          { text: '}', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'There are four errors on screen. We have twenty minutes.',
        prompt: 'Ines\'s plan?',
        options: [
          { text: 'Fix the first one and run again. The others may vanish with it.' },
          { text: 'Rewrite the report from scratch.', why: 'Most of it is right. Fixing the first error is far quicker.' },
          { text: 'Send Lars the errors and wait.', why: 'Lars answers once a sol. Reading the first error is faster.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the report line so it prints Power:<tab>62%',
        template: 'printf("Power:[[1]]62[[2]]\\n");',
        blanks: [['\\t'], ['%%']],
        distractors: ['%', '/t'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Write the full report: three lines exactly as shown.\nSTATUS REPORT\nBoard: "backup"\nPower: 62%',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("STATUS REPORT\\n");\n    printf("Board: \\"backup\\"\\n");\n    printf("Power: 62%%\\n");\n    return 0;\n}\n',
        hint: 'Quotes inside the text need \\", and the percent sign needs %%.',
        checks: [
          { message: 'Print the three lines exactly', outputEquals: 'STATUS REPORT\nBoard: "backup"\nPower: 62%' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The message says \'pritnf\' undeclared. What kind of mistake is that, in one word?',
        answers: ['typo', 'a typo', 'spelling', 'misspelling'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which error message from this chapter would you now recognise instantly, and which still confuses you?',
    starters: ['I\'d recognise...', 'Still confusing:...'],
  },
  notes: 'Review of lessons 6-9. No new facts.',
};

export default lesson;
