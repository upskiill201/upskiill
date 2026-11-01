import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 19. Walkthrough: the full alarm panel: checked input, levels, combined rules, a menu. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The alarm panel',
  summary: 'Sol 3, 23:40. Ines assembles everything from today into one panel: read the readings safely, grade the CO2, combine the fire rule, and print one clear verdict for the night watch.',
  minutes: 13,
  outcomes: [
    'Combine checked input, else-if levels and && / || rules in one program',
    'Decide the order of checks so the most serious wins',
    'Print one clear verdict',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building the panel',
      steps: [
        {
          title: 'Read safely',
          body: 'Three readings in one scanf. If it doesn\'t return 3, stop: no verdict is better than a wrong one.',
          code: 'int co2_ppm, smoke, temp_c;\nif (scanf("%d %d %d", &co2_ppm, &smoke, &temp_c) != 3) {\n    printf("Bad input\\n");\n    return 1;\n}',
          language: 'c',
        },
        {
          title: 'Most serious first',
          body: 'Fire beats everything, so it\'s checked first. Then the CO2 levels, highest first.',
          code: 'if (smoke == 1 || temp_c > 60) {\n    printf("FIRE: evacuate\\n");\n} else if (co2_ppm > 2000) {\n    printf("RED: alarm\\n");\n}',
          language: 'c',
        },
        {
          title: 'The quieter levels',
          body: 'Amber from 1000, otherwise green. Exactly one verdict, every time.',
          code: '} else if (co2_ppm >= 1000) {\n    printf("AMBER: open a vent\\n");\n} else {\n    printf("GREEN\\n");\n}',
          language: 'c',
        },
        {
          title: 'Test the edges',
          body: 'Tomoko\'s tests: 999 / 1000 for amber, 2000 / 2001 for red, and smoke with a low CO2 to prove fire wins.',
          code: '// 999 0 20  -> GREEN\n// 1000 0 20 -> AMBER\n// 2001 0 20 -> RED\n// 450 1 20  -> FIRE',
          language: 'c',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The alarm panel',
      code: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm, smoke, temp_c;\n    if (scanf("%d %d %d", &co2_ppm, &smoke, &temp_c) != 3) {\n        printf("Bad input\\n");\n        return 1;\n    }\n\n    if (smoke == 1 || temp_c > 60) {\n        printf("FIRE: evacuate\\n");\n    } else if (co2_ppm > 2000) {\n        printf("RED: alarm\\n");\n    } else if (co2_ppm >= 1000) {\n        printf("AMBER: open a vent\\n");\n    } else {\n        printf("GREEN\\n");\n    }\n    return 0;\n}\n',
      caption: 'This run reads 450 ppm, smoke 1, 20 °C. Run it.',
      challenge: 'Move the fire check to the end of the chain. Does the verdict change? Why?',
      stdin: ['450 1 20'],
    },
  ],
  apply: {
    scenario: 'Sol 3, 23:40. The night-watch panel.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is the fire check first in the chain?',
        options: [
          { text: 'It\'s the most serious, and only the first true branch runs' },
          { text: 'C requires || conditions first', why: 'No such rule. Order is a design choice.' },
          { text: 'Alphabetical order', why: 'Order follows how serious each problem is.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Using the panel\'s chain, what\'s the verdict? (co2, smoke, temp)',
        groups: ['FIRE', 'RED', 'AMBER or GREEN'],
        items: [
          { text: '450, 1, 20', group: 0 },
          { text: '2500, 0, 20', group: 1 },
          { text: '2500, 0, 75', group: 0 },
          { text: '1000, 0, 20', group: 2 },
          { text: '999, 0, 20', group: 2 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the chain in order, most serious first.',
        lines: ['if (smoke == 1 || temp_c > 60) {', '    printf("FIRE\\n");', '} else if (co2_ppm > 2000) {', '    printf("RED\\n");', '} else {', '    printf("OK\\n");', '}'],
        language: 'c',
      },
      {
        kind: 'findBug',
        prompt: 'With smoke = 1 and CO2 = 2500, the panel says RED, not FIRE. Which line is out of place?',
        lines: ['if (co2_ppm > 2000) {', '    printf("RED\\n");', '} else if (smoke == 1) {', '    printf("FIRE\\n");', '}'],
        bug: 0,
        fix: 'Check smoke == 1 first, then co2_ppm > 2000.',
        explanation: 'The first true branch wins. Put the most serious check first.',
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Read three numbers safely (given: 1150 0 22). If scanf doesn\'t return 3, print Bad input. Otherwise print Read OK.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm, smoke, temp_c;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm, smoke, temp_c;\n    if (scanf("%d %d %d", &co2_ppm, &smoke, &temp_c) != 3) {\n        printf("Bad input\\n");\n        return 1;\n    }\n    printf("Read OK\\n");\n    return 0;\n}\n',
        hint: 'if (scanf(...) != 3) { ... }',
        stdin: ['1150 0 22'],
        checks: [
          { message: 'Print Read OK', outputIncludes: 'Read OK' },
          { message: 'Check for 3 values', codeIncludes: '!= 3' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the panel to the tool it uses.',
        pairs: [
          ['Reading safely', 'scanf(...) != 3'],
          ['Smoke or heat', '||'],
          ['Four levels', 'else if chain'],
          ['Edge tests', '999, 1000, 2000, 2001'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'One verdict at a time? What if there\'s a fire AND high CO2?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Then it says FIRE: the most serious problem. Evacuating fixes the CO2 too.' },
          { text: 'It prints both.', why: 'An else-if chain gives exactly one verdict.' },
          { text: 'It crashes.', why: 'It runs the first true branch: FIRE.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the panel, what verdict does CO2 1000, no smoke, 20 °C get?',
        answers: ['amber', 'amber: open a vent'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the fire rule.',
        template: 'if (smoke [[1]] 1 [[2]] temp_c > 60) {\n    printf("FIRE\\n");\n}',
        blanks: [['=='], ['||']],
        distractors: ['=', '&&'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Write the whole panel. Read co2_ppm, smoke and temp_c (given: 2001 0 20). FIRE: evacuate on smoke or over 60 °C, RED: alarm over 2000 ppm, AMBER: open a vent from 1000, otherwise GREEN. Bad input if scanf doesn\'t read 3.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm, smoke, temp_c;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm, smoke, temp_c;\n    if (scanf("%d %d %d", &co2_ppm, &smoke, &temp_c) != 3) {\n        printf("Bad input\\n");\n        return 1;\n    }\n    if (smoke == 1 || temp_c > 60) {\n        printf("FIRE: evacuate\\n");\n    } else if (co2_ppm > 2000) {\n        printf("RED: alarm\\n");\n    } else if (co2_ppm >= 1000) {\n        printf("AMBER: open a vent\\n");\n    } else {\n        printf("GREEN\\n");\n    }\n    return 0;\n}\n',
        hint: 'Safe read first, then fire, red, amber, green.',
        stdin: ['2001 0 20'],
        checks: [
          { message: 'Print RED: alarm for 2001', outputIncludes: 'RED: alarm' },
          { message: 'Check the fire rule with ||', codeIncludes: '||' },
          { message: 'Read safely', codeIncludes: '!= 3' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'The panel picks the single most serious problem. When you have several problems at once, how do you decide which to handle first?',
    starters: ['I decide by...', 'The most serious usually...'],
  },
  notes: 'Combines chapter 3. Declaring several variables in one line (int a, b, c;) is standard C (ISO C 6.7).',
};

export default lesson;
