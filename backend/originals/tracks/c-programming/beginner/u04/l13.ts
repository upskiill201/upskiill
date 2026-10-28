import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 13. Tap to explore: nested loops for a grid of GreenHab trays. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Loops inside loops',
  summary: 'Sol 4, 18:30. Tomoko\'s seed trays sit on 3 shelves with 4 trays each. She wants a label for every tray: shelf and position. A loop for the shelves, and inside it, a loop for the trays.',
  minutes: 12,
  outcomes: [
    'Put one loop inside another to cover rows and columns',
    'Predict how many times the inner body runs',
    'Print a grid, ending each row with a new line',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Labelling the trays',
      text: 'for (int shelf = 1; shelf <= 3; shelf++) {\n    for (int tray = 1; tray <= 4; tray++) {\n        printf("S%dT%d ", shelf, tray);\n    }\n    printf("\\n");\n}',
      hotspots: [
        { phrase: 'for (int shelf = 1; shelf <= 3; shelf++) {', note: 'The outer loop: one round per shelf, three rounds in total.' },
        { phrase: 'for (int tray = 1; tray <= 4; tray++) {', note: 'The inner loop runs completely, all 4 trays, for EACH shelf. Then the outer loop moves to the next shelf and the inner loop starts again at 1.' },
        { phrase: 'printf("S%dT%d ", shelf, tray);', note: 'Runs 3 × 4 = 12 times: every shelf with every tray.' },
        { phrase: 'printf("\\n");', note: 'Inside the outer loop but after the inner one: ends each shelf\'s row. Runs 3 times.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Tray labels',
      code: '#include <stdio.h>\n\nint main(void) {\n    for (int shelf = 1; shelf <= 3; shelf++) {\n        for (int tray = 1; tray <= 4; tray++) {\n            printf("S%dT%d ", shelf, tray);\n        }\n        printf("\\n");\n    }\n    return 0;\n}\n',
      caption: 'Run it: three rows of four.',
      challenge: 'Make it 4 shelves of 6 trays.',
    },
  ],
  apply: {
    scenario: 'Sol 4, 18:30. Labelling the GreenHab.',
    items: [
      {
        kind: 'mcq',
        prompt: 'An outer loop runs 3 times and an inner loop 4 times. How many times does the inner body run?',
        options: [
          { text: '7', why: 'The inner loop runs fully for EACH outer round: 3 × 4.' },
          { text: '12' },
          { text: '4', why: 'That\'s just one round of the outer loop.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'for (int r = 1; r <= 2; r++) {\n    for (int c = 1; c <= 3; c++) {\n        printf("*");\n    }\n    printf("\\n");\n}',
        language: 'c',
        options: [
          { text: '***\n***' },
          { text: '**\n**\n**', why: 'The outer loop makes 2 rows; the inner makes 3 stars per row.' },
          { text: '******', why: 'The printf("\\n") after the inner loop starts a new row.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print a grid of 3 rows, each with 5 dots (.....), using nested loops.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    for (int row = 1; row <= 3; row++) {\n        for (int col = 1; col <= 5; col++) {\n            printf(".");\n        }\n        printf("\\n");\n    }\n    return 0;\n}\n',
        hint: 'Outer loop for rows, inner loop for dots, printf("\\n") after the inner loop.',
        checks: [
          { message: 'Print 3 rows of 5 dots', outputEquals: '.....\n.....\n.....' },
          { message: 'Use nested loops', codeIncludes: 'for (int col' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Everything prints on one long line. Which line is in the wrong place?',
        lines: ['for (int r = 1; r <= 3; r++) {', '    for (int c = 1; c <= 4; c++) {', '        printf("x");', '    }', '}', 'printf("\\n");'],
        bug: 5,
        fix: 'Move printf("\\n"); inside the outer loop, after the inner loop\'s }.',
        explanation: 'The new line has to end each row, so it belongs inside the outer loop, once per row.',
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the tray program (3 shelves × 4 trays), how many times does each line run?',
        groups: ['3 times', '12 times'],
        items: [
          { text: 'printf("\\n") after the inner loop', group: 0 },
          { text: 'printf of each tray label', group: 1 },
          { text: 'The start of the inner loop', group: 0 },
          { text: 'The inner loop\'s tray++', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Print every shelf/tray pair for 2 shelves of 3 trays.',
        template: 'for (int s = 1; s <= 2; s++) {\n    for (int t = 1; t <= [[1]]; t++) {\n        printf("%d-%d ", [[2]], t);\n    }\n}',
        blanks: [['3'], ['s']],
        distractors: ['2', 't'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'Why does the tray number go back to 1 on every shelf?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'It\'s a bug.', why: 'It\'s exactly what we want: each shelf starts at tray 1.' },
          { text: 'printf resets it.', why: 'The inner for line\'s start, int tray = 1, runs again each outer round.' },
          { text: 'The inner loop starts fresh each time the outer loop goes round, so tray = 1 runs again.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Outer loop 5 times, inner loop 2 times. How many times does the inner body run?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the loop to what it covers.',
        pairs: [
          ['Outer loop', 'Each shelf (row)'],
          ['Inner loop', 'Each tray on that shelf (column)'],
          ['printf("\\n") after the inner loop', 'Ends one row'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the tray labels for 2 shelves of 3 trays, each row ending with a new line:\nS1T1 S1T2 S1T3\nS2T1 S2T2 S2T3',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    for (int shelf = 1; shelf <= 2; shelf++) {\n        for (int tray = 1; tray <= 3; tray++) {\n            printf("S%dT%d ", shelf, tray);\n        }\n        printf("\\n");\n    }\n    return 0;\n}\n',
        hint: 'printf("S%dT%d ", shelf, tray); inside, printf("\\n"); after the inner loop.',
        checks: [
          { message: 'Print both rows of labels', outputEquals: 'S1T1 S1T2 S1T3\nS2T1 S2T2 S2T3' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Rows and columns are everywhere: seats in a cinema, days in a calendar, a spreadsheet. Which grid would you describe with a loop inside a loop?',
    starters: ['The grid I picked is...', 'The outer loop would be...'],
  },
  notes: 'Nested iteration statements. outputEquals trims trailing spaces at line ends, so the space after the last label in each row is ignored.',
};

export default lesson;
