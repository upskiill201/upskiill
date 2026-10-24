import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Before / After: two opposite ifs vs one if ... else. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'if and else',
  summary: 'Sol 3, 10:15. Ines\'s alarm prints ALARM or OK using two separate ifs. Tomoko changes one number and the board prints both. One decision, two outcomes: that\'s what else is for.',
  minutes: 11,
  outcomes: [
    'Choose between exactly two paths with if ... else',
    'Explain why else needs no condition',
    'Replace two opposite ifs with one if ... else',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ifs, or one decision',
      before: {
        label: 'Two separate ifs',
        text: 'if (co2_ppm > 2000) {\n    printf("ALARM\\n");\n}\nif (co2_ppm < 2000) {\n    printf("OK\\n");\n}\n// At exactly 2000: prints nothing at all',
      },
      after: {
        label: 'One if ... else',
        text: 'if (co2_ppm > 2000) {\n    printf("ALARM\\n");\n} else {\n    printf("OK\\n");\n}\n// Every reading gets exactly one answer',
      },
      notes: [
        'With two separate ifs, it\'s easy to leave a gap (exactly 2000 matches neither) or an overlap (both run).',
        'else means "otherwise". It runs when the if\'s condition is false. Exactly one of the two blocks runs, every time.',
        'else has no condition of its own: it\'s simply everything the if didn\'t catch.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'ALARM or OK',
      code: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm;\n    printf("CO2 (ppm)? ");\n    scanf("%d", &co2_ppm);\n\n    if (co2_ppm > 2000) {\n        printf("ALARM: open the vents\\n");\n    } else {\n        printf("OK\\n");\n    }\n    return 0;\n}\n',
      caption: 'This run reads 2000. Exactly one line prints. Run it.',
      challenge: 'Change > to >= and run it again: now a reading of exactly 2000 sounds the alarm.',
      stdin: ['2000'],
    },
  ],
  apply: {
    scenario: 'Sol 3, 10:15. One decision, two outcomes.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When does the else block run?',
        options: [
          { text: 'When the if\'s condition is false' },
          { text: 'Always, after the if block', why: 'Only one of the two blocks runs, never both.' },
          { text: 'When its own condition is true', why: 'else has no condition: it runs whenever the if doesn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int water = 1300;\nif (water < 1200) {\n    printf("Ration\\n");\n} else {\n    printf("Normal\\n");\n}',
        language: 'c',
        options: [
          { text: 'Ration', why: '1300 is not below 1200, so the else runs.' },
          { text: 'Ration, then Normal', why: 'Only one block of an if ... else ever runs.' },
          { text: 'Normal' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Read the water level (given: 1150). Print Ration mode if it\'s below 1200, otherwise Normal mode.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int water_litres;\n    scanf("%d", &water_litres);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int water_litres;\n    scanf("%d", &water_litres);\n    if (water_litres < 1200) {\n        printf("Ration mode\\n");\n    } else {\n        printf("Normal mode\\n");\n    }\n    return 0;\n}\n',
        hint: 'if (water_litres < 1200) { ... } else { ... }',
        stdin: ['1150'],
        checks: [
          { message: 'Print Ration mode', outputIncludes: 'Ration mode' },
          { message: 'Use else', codeIncludes: 'else' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t compile?',
        lines: ['if (co2_ppm > 2000) {', '    printf("ALARM\\n");', '} else (co2_ppm <= 2000) {', '    printf("OK\\n");', '}'],
        bug: 2,
        fix: '} else {',
        explanation: 'else takes no condition. It already means "every other case".',
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'if (battery < 20) prints Charge, else prints Ready. Which prints?',
        groups: ['Charge', 'Ready'],
        items: [
          { text: 'battery = 5', group: 0 },
          { text: 'battery = 20', group: 1 },
          { text: 'battery = 19', group: 0 },
          { text: 'battery = 100', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Build the if ... else in order.',
        lines: ['if (co2_ppm > 2000) {', '    printf("ALARM\\n");', '} else {', '    printf("OK\\n");', '}'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'At exactly 2,000 your old version printed nothing. Will the new one?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'It prints OK. With else, every reading gets exactly one answer: no gaps.' },
          { text: 'Still nothing.', why: 'else catches everything the if didn\'t, including exactly 2,000.' },
          { text: 'Both ALARM and OK.', why: 'Only one block of an if ... else runs.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the decision.',
        template: 'if (propane_kg <= 10) {\n    printf("Order propane\\n");\n} [[1]] {\n    printf("Propane OK\\n");\n}',
        blanks: [['else']],
        distractors: ['otherwise', 'if'],
        language: 'c',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In an if ... else, how many of the two blocks run each time?',
        answers: ['1', 'one', 'exactly one'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Read the CO2 level (given: 2350). Print ALARM: open the vents if it\'s over 2000, otherwise OK. Then always print Logged.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm;\n    printf("CO2? ");\n    scanf("%d", &co2_ppm);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm;\n    printf("CO2? ");\n    scanf("%d", &co2_ppm);\n    if (co2_ppm > 2000) {\n        printf("ALARM: open the vents\\n");\n    } else {\n        printf("OK\\n");\n    }\n    printf("Logged\\n");\n    return 0;\n}\n',
        hint: 'Logged goes after the else block\'s closing brace.',
        stdin: ['2350'],
        checks: [
          { message: 'Print the right lines in order', outputEquals: 'CO2? 2350\nALARM: open the vents\nLogged' },
          { message: 'Use else', codeIncludes: 'else' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Some choices have exactly two outcomes: open or closed, go or stay. What two-way decision do you make every day, and what\'s your "condition"?',
    starters: ['Every day I decide...', 'My condition is...'],
  },
  notes: 'if ... else: ISO C 6.8.4.1. Exactly one branch executes.',
};

export default lesson;
