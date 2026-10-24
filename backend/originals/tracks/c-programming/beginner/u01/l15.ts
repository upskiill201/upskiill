import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 15 — Checkpoint. Reviews lessons 11–14: comments, many statements, style, %d. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: The banner',
  summary: 'Sol 2, 08:00. Morning briefing. Hal wants a banner on the console every morning: station, sol, crew count, plant count. Tidy, commented, and with the board doing the counting.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Combine printf, puts and %d in one tidy program', 'Comment code and switch lines off'],
  learn: [
    {
      kind: 'story',
      title: 'Sol 2, 08:00',
      beats: [
        { speaker: 'hal', text: 'Every morning, same banner, same order. Station, sol, crew, plants. I read it with my coffee.' },
        { speaker: 'tomoko', text: '48 tomatoes, 12 lettuce trays. Let the board add them.' },
        { speaker: 'mateus', text: 'And put my name first in the crew list.' },
        { speaker: 'hal', text: 'Alphabetical, Rocha. Same as the checklist.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the morning banner.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: '// printf("Sol 1\\n");\nprintf("Sol %d\\n", 1 + 1);',
        language: 'c',
        options: [
          { text: 'Sol 1, then Sol 2', why: 'The first line is commented out: it never runs.' },
          { text: 'Sol 2' },
          { text: 'Sol 1 + 1', why: 'C works out 1 + 1 before printing.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the banner: RED MESA, then Sol 2, then Crew: 4. Use %d for the 2 and the 4.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    puts("RED MESA");\n    printf("Sol %d\\n", 2);\n    printf("Crew: %d\\n", 4);\n    return 0;\n}\n',
        hint: 'puts("RED MESA"); then printf("Sol %d\\n", 2); then printf("Crew: %d\\n", 4);',
        checks: [
          { message: 'Print the three lines in order', outputEquals: 'RED MESA\nSol 2\nCrew: 4' },
          { message: 'Use %d', codeIncludes: '%d' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it change the output?',
        groups: ['Changes the output', 'No change'],
        items: [
          { text: 'Adding a // comment', group: 1 },
          { text: 'Indenting a line', group: 1 },
          { text: 'Putting // in front of a printf', group: 0 },
          { text: 'Swapping the order of two printf lines', group: 0 },
          { text: 'Changing 48 + 12 to 48 + 13', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the line so it prints Plants: 60, with the board adding.',
        template: 'printf("Plants: [[1]]\\n", 48 + [[2]]);',
        blanks: [['%d'], ['12']],
        distractors: ['%', '60'],
        language: 'c',
      },
      {
        kind: 'findBug',
        prompt: 'Which line is the bug?',
        lines: ['/* Morning banner', '#include <stdio.h>', 'int main(void) {', '    puts("RED MESA");', '    return 0;', '}'],
        bug: 0,
        fix: '/* Morning banner */',
        explanation: 'The block comment never closes, so the compiler ignores the rest of the file.',
        language: 'c',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tool to its job.',
        pairs: [
          ['//', 'A note to the end of the line'],
          ['puts', 'Prints a line and its new line'],
          ['%d', 'Where a whole number is printed'],
          ['Indenting', 'Shows what\'s inside main'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("%d crew, %d rovers\\n", 4, 2);',
        language: 'c',
        options: [
          { text: '2 crew, 4 rovers', why: 'Numbers fill the placeholders left to right.' },
          { text: '4 crew, 2 rovers' },
          { text: '6 crew, 6 rovers', why: 'Nothing is added: each %d gets its own value.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'I wrote the banner on one line to save time. It works!',
        prompt: 'Ines\'s reply?',
        options: [
          { text: 'It works, but Hal reads the code too. One statement per line, indented, please.' },
          { text: 'One-line programs don\'t compile.', why: 'They do. They\'re just hard to read and fix.' },
          { text: 'Great, ship it.', why: 'It works today; the next person to change it will struggle.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the banner program in order.',
        lines: ['#include <stdio.h>', 'int main(void) {', '    // Hal reads this with his coffee', '    puts("RED MESA");', '    printf("Plants: %d\\n", 48 + 12);', '    return 0;', '}'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Full banner: a /* */ comment at the top, then print RED MESA, an empty line, Crew: 4 and Plants: 60 (the board adds 48 + 12).',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '/* Morning banner for Hal */\n#include <stdio.h>\n\nint main(void) {\n    puts("RED MESA");\n    printf("\\n");\n    printf("Crew: %d\\n", 4);\n    printf("Plants: %d\\n", 48 + 12);\n    return 0;\n}\n',
        hint: 'Comment at the top with /* */. Then puts, an empty printf("\\n"), and two printf lines with %d.',
        checks: [
          { message: 'Print the banner exactly', outputEquals: 'RED MESA\n\nCrew: 4\nPlants: 60' },
          { message: 'Let C add 48 + 12', codeIncludes: '48 + 12' },
          { message: 'Add a /* */ comment', codeIncludes: '/*' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Hal wants the same banner every morning. What small routine do you rely on to start your day, and why does the order matter?',
    starters: ['My morning routine is...', 'The order matters because...'],
  },
  notes: 'Review of lessons 11-14. No new facts.',
};

export default lesson;
