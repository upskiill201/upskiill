import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint. Reviews lessons 1–4: what C is, the parts of a program, printf and \n. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: First words on the console',
  summary: 'Sol 1, 11:00. Hal wants proof before lunch: a status line on the backup console that every crew member can read. No notes.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write a complete C program from memory', 'Print several lines exactly as asked'],
  learn: [
    {
      kind: 'story',
      title: 'Sol 1, 11:00',
      beats: [
        { speaker: 'hal', text: 'Moreau. Show me the board talks. Something the crew can read when they walk past the airlock.' },
        { speaker: 'ines', text: 'Station name, sol, which board is running. Three lines.' },
        { speaker: 'mateus', text: 'Five dollars says she forgets a semicolon.' },
        { speaker: 'tomoko', text: 'I\'ll take that bet.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the airlock status screen.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What turns C into something the computer can run?',
        options: [
          { text: 'printf', why: 'printf prints text. It runs only after the program has been compiled.' },
          { text: 'The compiler' },
          { text: 'The \\n character', why: '\\n starts a new line in the output.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the program in order.',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("Red Mesa\\n");', '    printf("Sol 1\\n");', '    return 0;', '}'],
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("Board:");\nprintf(" backup\\n");\nprintf("OK\\n");',
        language: 'c',
        options: [
          { text: 'Board:\n backup\nOK', why: 'The first printf has no \\n, so " backup" joins it on the same line.' },
          { text: 'Board: backup\nOK' },
          { text: 'Board: backup OK', why: 'The \\n after backup moves OK to a new line.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line stops this compiling?',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("Status: green\\n")', '    return 0;', '}'],
        bug: 2,
        fix: '    printf("Status: green\\n");',
        explanation: 'Every statement ends with a semicolon. Mateus nearly won his five dollars.',
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Write the airlock screen: three lines, Red Mesa Station, then Sol 1, then Board: backup',
        starter: '',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Red Mesa Station\\n");\n    printf("Sol 1\\n");\n    printf("Board: backup\\n");\n    return 0;\n}\n',
        hint: 'The skeleton first (#include, int main(void) { ... return 0; }), then three printf lines, each ending in \\n.',
        checks: [
          { message: 'Print the three lines in order', outputEquals: 'Red Mesa Station\nSol 1\nBoard: backup' },
          { message: 'Write a main function', codeIncludes: 'main' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the piece to its job.',
        pairs: [
          ['#include <stdio.h>', 'Lets you use printf'],
          ['main', 'Where the program starts'],
          ['\\n', 'Starts a new line'],
          [';', 'Ends a statement'],
          ['}', 'Closes main\'s body'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the program.',
        template: '#include <[[1]]>\n\nint main(void) {\n    [[2]]("Crew: 4\\n");\n    return 0;\n}',
        blanks: [['stdio.h'], ['printf']],
        distractors: ['print', 'main.h'],
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'C runs main\'s lines from top to bottom', group: 0 },
          { text: 'printf adds a new line by itself', group: 1 },
          { text: 'C was made at Bell Labs', group: 0 },
          { text: 'Every { needs a matching }', group: 0 },
          { text: 'A program can start anywhere in the file', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'Fine, it works. But why does the board need a compiler at all? Just run the text.',
        prompt: 'Ines\'s best reply?',
        options: [
          { text: 'The processor only understands machine code. The compiler translates our C into it, once, before it runs.' },
          { text: 'Because printf is slow without it.', why: 'printf isn\'t the reason. Nothing runs at all until C is translated.' },
          { text: 'It doesn\'t need one, it\'s just tradition.', why: 'Without the compiler, the board couldn\'t run the program at all.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'With ONE printf, print two lines: Water: OK and Oxygen: OK',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Water: OK\\nOxygen: OK\\n");\n    return 0;\n}\n',
        hint: 'printf("Water: OK\\nOxygen: OK\\n");',
        checks: [
          { message: 'Print the two lines', outputEquals: 'Water: OK\nOxygen: OK' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What character ends every C statement? Type its name.',
        answers: ['semicolon', 'a semicolon', 'semi colon'],
        placeholder: 'Its name, in words',
      },
    ],
  },
  reflect: {
    prompt: 'You can now write a whole C program from nothing. Which part still feels shaky: the skeleton, printf, or \\n?',
    starters: ['The part that still feels shaky is...', 'I\'ll practise it by...'],
  },
  notes: 'Review of lessons 1-4. No new facts.',
};

export default lesson;
