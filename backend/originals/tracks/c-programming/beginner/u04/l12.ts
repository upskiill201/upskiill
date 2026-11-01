import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 12. Before / After: skipping bad readings with continue instead of a big nested if. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'continue: skip one',
  summary: 'Sol 4, 17:45. The rover\'s thermometer glitches: now and then it sends -999, which means "no reading". Tomoko\'s average is ruined by them. Skip the glitches, keep the rest.',
  minutes: 11,
  outcomes: [
    'Skip the rest of one round with continue',
    'Filter out bad values inside a loop',
    'Choose between continue and break',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Skipping the glitches',
      before: {
        label: 'Everything inside an if',
        text: 'for (int i = 0; i < 6; i++) {\n    scanf("%d", &temp_c);\n    if (temp_c != -999) {\n        total += temp_c;\n        count++;\n    }\n}',
      },
      after: {
        label: 'continue skips the bad one',
        text: 'for (int i = 0; i < 6; i++) {\n    scanf("%d", &temp_c);\n    if (temp_c == -999) {\n        continue;\n    }\n    total += temp_c;\n    count++;\n}',
      },
      notes: [
        'continue jumps to the end of THIS round. The loop carries on with the next one (in a for loop, the step still runs).',
        'break would stop the whole loop. continue only skips one value.',
        'The "after" version puts the bad case first and gets it out of the way. The real work stays at the left margin, easy to read.',
        'Both versions are correct. continue shines when there are several reasons to skip.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Average without the glitches',
      code: '#include <stdio.h>\n\nint main(void) {\n    int temp_c;\n    int total = 0;\n    int count = 0;\n\n    for (int i = 0; i < 6; i++) {\n        scanf("%d", &temp_c);\n        if (temp_c == -999) {\n            continue;\n        }\n        total += temp_c;\n        count++;\n    }\n    printf("Good readings: %d\\n", count);\n    printf("Average: %.1f C\\n", (double)total / count);\n    return 0;\n}\n',
      caption: 'Two of the six readings are -999 glitches. Run it.',
      challenge: 'Remove the continue (and its if). What happens to the average?',
      stdin: ['21 22 -999 23 -999 24'],
    },
  ],
  apply: {
    scenario: 'Sol 4, 17:45. Glitchy readings.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does continue do?',
        options: [
          { text: 'Ends the loop', why: 'That\'s break. continue only skips one round.' },
          { text: 'Skips the rest of this round and starts the next one' },
          { text: 'Repeats the same round', why: 'It moves on to the next round, not the same one again.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'for (int i = 1; i <= 5; i++) {\n    if (i == 3) {\n        continue;\n    }\n    printf("%d ", i);\n}',
        language: 'c',
        options: [
          { text: '1 2', why: 'continue skips 3 but the loop carries on to 4 and 5.' },
          { text: '1 2 4 5' },
          { text: '1 2 3 4 5', why: 'Round 3 is skipped before the printf.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Read 6 readings (given). Skip any -999 with continue. Print Good readings: 4 and Total: 90',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int temp_c;\n    int total = 0;\n    int count = 0;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int temp_c;\n    int total = 0;\n    int count = 0;\n    for (int i = 0; i < 6; i++) {\n        scanf("%d", &temp_c);\n        if (temp_c == -999) {\n            continue;\n        }\n        total += temp_c;\n        count++;\n    }\n    printf("Good readings: %d\\n", count);\n    printf("Total: %d\\n", total);\n    return 0;\n}\n',
        hint: 'if (temp_c == -999) { continue; } then the total and count.',
        stdin: ['21 22 -999 23 -999 24'],
        checks: [
          { message: 'Print Good readings: 4', outputIncludes: 'Good readings: 4' },
          { message: 'Print Total: 90', outputIncludes: 'Total: 90' },
          { message: 'Use continue', codeIncludes: 'continue;' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'break or continue?',
        groups: ['break', 'continue'],
        items: [
          { text: 'Ignore a glitchy reading and keep going', group: 1 },
          { text: 'Stop at the first reading over the limit', group: 0 },
          { text: 'Skip plants that are already labelled', group: 1 },
          { text: 'Quit the menu when 0 is typed', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The average includes the -999 glitches. Which line is the problem?',
        lines: ['scanf("%d", &temp_c);', 'if (temp_c == -999) {', '    printf("Glitch\\n");', '}', 'total += temp_c;'],
        bug: 2,
        fix: '    continue;',
        explanation: 'Printing a message doesn\'t skip anything: the glitch still gets added. continue jumps past the total.',
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'Skip negative readings, stop at the first one over 100.',
        template: 'if (r < 0) {\n    [[1]];\n}\nif (r > 100) {\n    [[2]];\n}',
        blanks: [['continue'], ['break']],
        distractors: ['return', 'skip'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'If I divide the total by 6, is that the average?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Yes, there were 6 readings.', why: 'Two were glitches you skipped. The average must use the 4 you kept.' },
          { text: 'Divide by 5 to be safe.', why: 'Divide by exactly how many you kept: count.' },
          { text: 'No: only 4 readings were real. Divide by count, the number of readings you kept.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which keyword skips to the next round of a loop?',
        answers: ['continue'],
        placeholder: 'A keyword',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the keyword to its effect.',
        pairs: [
          ['continue', 'Skip to the next round'],
          ['break', 'Leave the loop'],
          ['return', 'Leave the whole function'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Read 6 readings (given). Skip -999 glitches. Print Average: 22.5 C (one decimal) using only the good ones.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int temp_c;\n    int total = 0;\n    int count = 0;\n    for (int i = 0; i < 6; i++) {\n        scanf("%d", &temp_c);\n        if (temp_c == -999) {\n            continue;\n        }\n        total += temp_c;\n        count++;\n    }\n    printf("Average: %.1f C\\n", (double)total / count);\n    return 0;\n}\n',
        hint: 'total and count with continue, then (double)total / count.',
        stdin: ['21 22 -999 23 -999 24'],
        checks: [
          { message: 'Print Average: 22.5 C', outputIncludes: 'Average: 22.5 C' },
          { message: 'Use continue', codeIncludes: 'continue;' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Tomoko throws away the glitches so they don\'t ruin the average. What "glitches" do you ignore when you judge how a day or week went?',
    starters: ['I ignore...', 'Counting it would...'],
  },
  notes: 'continue statement: ISO C 6.8.6.2 (in a for loop, the third clause still executes). -999 as a missing-data marker is a common convention in sensor data.',
};

export default lesson;
