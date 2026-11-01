import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 15 — Checkpoint. Reviews lessons 11–14: break, continue, nested loops, sentinels. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: The rover route',
  summary: 'Sol 4, 20:00. Mateus is back, dusty and grinning. His route log has glitches, a hot spot, and a list of slopes that ends with -1. Hal wants three answers before dinner.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Choose break or continue for the job', 'Read until a sentinel and loop over a grid'],
  learn: [
    {
      kind: 'story',
      title: 'Sol 4, 20:00. Back at base',
      beats: [
        { speaker: 'mateus', text: 'Thirteen bags, one fossil. Probably. And the battery got hot near the canyon.' },
        { speaker: 'hal', text: 'Three answers. Where did it first get hot? What was the average slope, ignoring the glitches? And the full route grid for the log.' },
        { speaker: 'ines', text: 'break, continue, and a loop inside a loop.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Mateus\'s route log.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'break, continue, or neither?',
        groups: ['break', 'continue', 'Neither'],
        items: [
          { text: 'Find the first hot reading', group: 0 },
          { text: 'Skip -999 glitches', group: 1 },
          { text: 'Total every reading', group: 2 },
          { text: 'Stop the menu at 0', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Read 8 battery temperatures (given). Print the reading number of the first one over 45, as First hot reading: 4, and stop.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int t;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int t;\n    for (int i = 1; i <= 8; i++) {\n        scanf("%d", &t);\n        if (t > 45) {\n            printf("First hot reading: %d\\n", i);\n            break;\n        }\n    }\n    return 0;\n}\n',
        hint: 'if (t > 45) { printf(...); break; }',
        stdin: ['40 42 44 46 48 47 43 41'],
        checks: [
          { message: 'Print First hot reading: 4', outputIncludes: 'First hot reading: 4' },
          { message: 'Use break', codeIncludes: 'break;' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'for (int i = 1; i <= 4; i++) {\n    if (i == 2) continue;\n    if (i == 4) break;\n    printf("%d ", i);\n}',
        language: 'c',
        options: [
          { text: '1 2 3', why: 'continue skips printing 2.' },
          { text: '1 3' },
          { text: '1 3 4', why: 'break stops before 4 is printed.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The -999 glitches are being added into the total. Which line is wrong?',
        lines: ['scanf("%d", &slope);', 'if (slope == -999) {', '    break;', '}', 'total += slope;'],
        bug: 2,
        fix: '    continue;',
        explanation: 'break ends the whole loop at the first glitch. To skip just the glitch and keep going, use continue.',
        language: 'c',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the loop to its output.',
        pairs: [
          ['Nested loops, 2 rows × 2 cols', 'Four stars in a square'],
          ['while (scanf(...) == 1)', 'Reads until the input runs out'],
          ['while (n != -1)', 'Reads until the sentinel'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Read slopes until -1.',
        template: 'scanf("%d", &slope);\nwhile (slope [[1]] -1) {\n    total += slope;\n    [[2]]("%d", &slope);\n}',
        blanks: [['!='], ['scanf']],
        distractors: ['==', 'printf'],
        language: 'c',
      },
      {
        kind: 'mcq',
        prompt: 'Outer loop 4 times, inner loop 5 times. How many times does the inner body run?',
        options: [
          { text: '9', why: 'Nested loops multiply: 4 × 5.' },
          { text: '20' },
          { text: '5', why: 'The inner loop runs fully on every outer round.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'Why put the second scanf at the END of the sentinel loop?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'C requires scanf at the end of loops.', why: 'No rule: it\'s about checking before using.' },
          { text: 'It doesn\'t matter where it goes.', why: 'At the start of the body, -1 would be added before the check.' },
          { text: 'So the condition checks each new value, including -1, before it\'s ever added.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'continue skips the rest of the round. break leaves the loop. Which one would you use to ignore a single bad value?',
        answers: ['continue'],
        placeholder: 'A keyword',
      },
      {
        kind: 'writeCode',
        prompt: 'Read slopes until -1 (given). Skip -999 glitches with continue (you must still read the next value!). Print Average slope: 7.0',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int slope;\n    int total = 0;\n    int count = 0;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int slope;\n    int total = 0;\n    int count = 0;\n    while (scanf("%d", &slope) == 1 && slope != -1) {\n        if (slope == -999) {\n            continue;\n        }\n        total += slope;\n        count++;\n    }\n    printf("Average slope: %.1f\\n", (double)total / count);\n    return 0;\n}\n',
        hint: 'Read in the condition: while (scanf("%d", &slope) == 1 && slope != -1). Then continue can never skip the next read.',
        stdin: ['5 -999 8 9 -999 6 -1'],
        checks: [
          { message: 'Print Average slope: 7.0', outputIncludes: 'Average slope: 7.0' },
          { message: 'Use continue', codeIncludes: 'continue;' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Hal asked three questions and each needed a different loop tool. When have you picked the right tool for a job only after trying the wrong one?',
    starters: ['I picked the wrong tool when...', 'The right one was...'],
  },
  notes: 'Review of chapter 4 lessons 11-14. Slopes 5+8+9+6 = 28 / 4 = 7.0. Reading in the while condition avoids the classic "continue skips the scanf" infinite loop.',
};

export default lesson;
