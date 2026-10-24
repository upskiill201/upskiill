import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint. Reviews lessons 1–4: if, scanf, comparisons, else. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: The first alarm',
  summary: 'Sol 3, 11:30. Hal\'s test: the watch types a reading, and the board must say ALARM or OK, and never both. If it passes, tonight\'s watch gets to sleep.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Read a number and decide with if ... else', 'Turn a rule in words into the right comparison'],
  learn: [
    {
      kind: 'story',
      title: 'Sol 3, 11:30',
      beats: [
        { speaker: 'hal', text: 'Here\'s the rule. Over 2,000 parts per million: ALARM. Anything else: OK. I\'ll type readings, you don\'t touch the keyboard.' },
        { speaker: 'mateus', text: 'Type 2,000 exactly. That\'s where it breaks.' },
        { speaker: 'ines', text: 'Then let\'s find out whether it breaks.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Hal\'s alarm test.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Hal\'s rule: ALARM when the reading is OVER 2000. Which condition?',
        options: [
          { text: 'co2_ppm >= 2000', why: '>= also fires at exactly 2000. "Over" means >.' },
          { text: 'co2_ppm > 2000' },
          { text: 'co2_ppm == 2000', why: 'That only catches exactly 2000.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Read the reading.',
        template: 'int co2_ppm;\n[[1]]("%d", [[2]]co2_ppm);',
        blanks: [['scanf'], ['&']],
        distractors: ['printf', '*'],
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The input is 2000. What does this print?',
        code: 'scanf("%d", &co2_ppm);\nif (co2_ppm > 2000) {\n    printf("ALARM\\n");\n} else {\n    printf("OK\\n");\n}',
        language: 'c',
        options: [
          { text: 'ALARM', why: '2000 is not greater than 2000, so the else runs.' },
          { text: 'OK' },
          { text: 'Nothing', why: 'With else, one of the two always runs.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Hal types 2000. Write the alarm: read the reading, print ALARM if it\'s over 2000, otherwise OK.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm;\n    printf("CO2? ");\n    scanf("%d", &co2_ppm);\n    if (co2_ppm > 2000) {\n        printf("ALARM\\n");\n    } else {\n        printf("OK\\n");\n    }\n    return 0;\n}\n',
        hint: 'int, scanf with &, then if (co2_ppm > 2000) ... else ...',
        stdin: ['2000'],
        checks: [
          { message: 'Print OK for 2000', outputIncludes: 'OK' },
          { message: 'Use if and else', codeIncludes: 'else' },
          { message: 'Read it with scanf', codeIncludes: 'scanf(' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'With the rule "ALARM if over 2000", what prints?',
        groups: ['ALARM', 'OK'],
        items: [
          { text: '2001', group: 0 },
          { text: '2000', group: 1 },
          { text: '450', group: 1 },
          { text: '5000', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is the bug?',
        lines: ['int co2_ppm;', 'scanf("%d", co2_ppm);', 'if (co2_ppm > 2000) {', '    printf("ALARM\\n");', '}'],
        bug: 1,
        fix: 'scanf("%d", &co2_ppm);',
        explanation: 'scanf needs & to know where to put the number.',
        language: 'c',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the words to the condition.',
        pairs: [
          ['Below 1200', 'x < 1200'],
          ['At least 20', 'x >= 20'],
          ['Exactly 4', 'x == 4'],
          ['Anything but 100', 'x != 100'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'OK, it didn\'t break at 2,000. You owe me nothing. I owe Tomoko five dollars. Again.',
        prompt: 'Ines\'s best reply?',
        options: [
          { text: 'Testing the exact edge was a great idea. That\'s where alarms usually fail.' },
          { text: 'Edges don\'t matter.', why: 'Edges are exactly where off-by-one bugs live. Mateus was right to test it.' },
          { text: 'You should have bet on 1,999.', why: 'The edge is 2,000 itself. 1,999 is safely OK.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In if (x > 5) { ... } else { ... }, x is 5. Which block runs: the if block or the else block?',
        answers: ['else', 'the else block', 'else block'],
        placeholder: 'if / else',
      },
      {
        kind: 'writeCode',
        prompt: 'Read the propane level (given: 12). Print Propane: 12 kg, then Order more if it\'s 10 or less, otherwise Propane OK.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int propane_kg;\n    scanf("%d", &propane_kg);\n    printf("Propane: %d kg\\n", propane_kg);\n    if (propane_kg <= 10) {\n        printf("Order more\\n");\n    } else {\n        printf("Propane OK\\n");\n    }\n    return 0;\n}\n',
        hint: '"10 or less" is <= 10.',
        stdin: ['12'],
        checks: [
          { message: 'Print Propane: 12 kg', outputIncludes: 'Propane: 12 kg' },
          { message: 'Print Propane OK', outputIncludes: 'Propane OK' },
          { message: 'Use <= 10', codeIncludes: '<= 10' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Mateus tested the exact edge, 2,000. Where else in life do the edges matter most (a deadline at midnight, an age limit, a speed limit)?',
    starters: ['An edge that matters is...', 'It matters because...'],
  },
  notes: 'Review of chapter 3 lessons 1-4.',
};

export default lesson;
