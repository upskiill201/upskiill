import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 12. Walkthrough: a numbered menu with switch, case, break and default. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'switch for menus',
  summary: 'Sol 3, 20:00. Hal wants a menu on the console: press 1 for water, 2 for power, 3 for CO2. Ines starts an if-else chain, then finds a tidier tool in Lars\'s old code: switch.',
  minutes: 12,
  outcomes: [
    'Pick one of many exact values with switch and case',
    'End each case with break',
    'Handle anything unexpected with default',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The console menu',
      steps: [
        {
          title: 'Read the choice',
          body: 'The menu is a list of numbered options. Read the number the person types.',
          code: 'int choice;\nprintf("1 Water  2 Power  3 CO2\\nChoice? ");\nscanf("%d", &choice);',
          language: 'c',
        },
        {
          title: 'switch on it',
          body: 'switch looks at one value and jumps to the case that matches it exactly.',
          code: 'switch (choice) {\n    ...\n}',
          language: 'c',
        },
        {
          title: 'One case per option',
          body: 'Each case names one exact value, then a colon, then what to do. break ends the case: without it, C carries on into the next one (next lesson).',
          code: 'case 1:\n    printf("Water: 1574 litres\\n");\n    break;\ncase 2:\n    printf("Power: 62%%\\n");\n    break;',
          language: 'c',
        },
        {
          title: 'default for everything else',
          body: 'default runs when no case matches: a typo, a 7, a 0. Always include one.',
          code: 'default:\n    printf("Unknown option\\n");\n    break;',
          language: 'c',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The console menu',
      code: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n    printf("1 Water  2 Power  3 CO2\\nChoice? ");\n    scanf("%d", &choice);\n\n    switch (choice) {\n        case 1:\n            printf("Water: 1574 litres\\n");\n            break;\n        case 2:\n            printf("Power: 62%%\\n");\n            break;\n        case 3:\n            printf("CO2: 1150 ppm\\n");\n            break;\n        default:\n            printf("Unknown option\\n");\n            break;\n    }\n    return 0;\n}\n',
      caption: 'This run chooses 2. Run it.',
      challenge: 'Add case 4 that prints Propane: 34 kg.',
      stdin: ['2'],
    },
  ],
  apply: {
    scenario: 'Sol 3, 20:00. Hal\'s menu.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When is switch a good fit?',
        options: [
          { text: 'Choosing between exact values, like menu numbers' },
          { text: 'Checking ranges, like "under 1000"', why: 'case needs one exact value. Ranges are a job for if / else if.' },
          { text: 'Repeating something many times', why: 'That\'s a loop.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the keyword to its job.',
        pairs: [
          ['switch', 'Looks at one value'],
          ['case 2:', 'Runs when the value is 2'],
          ['break', 'Ends the case'],
          ['default', 'Runs when nothing matches'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The choice is 3. What prints?',
        code: 'switch (choice) {\n    case 1: printf("Water\\n"); break;\n    case 3: printf("CO2\\n"); break;\n    default: printf("Unknown\\n"); break;\n}',
        language: 'c',
        options: [
          { text: 'CO2' },
          { text: 'Unknown', why: 'There IS a case 3, so default doesn\'t run.' },
          { text: 'Water, then CO2', why: 'C jumps straight to the matching case.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Read a choice (given: 1). Use switch: case 1 prints Water: 1574 litres, case 2 prints Power: 62%, default prints Unknown option.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n    scanf("%d", &choice);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n    scanf("%d", &choice);\n    switch (choice) {\n        case 1:\n            printf("Water: 1574 litres\\n");\n            break;\n        case 2:\n            printf("Power: 62%%\\n");\n            break;\n        default:\n            printf("Unknown option\\n");\n            break;\n    }\n    return 0;\n}\n',
        hint: 'switch (choice) { case 1: ... break; case 2: ... break; default: ... }',
        stdin: ['1'],
        checks: [
          { message: 'Print Water: 1574 litres', outputIncludes: 'Water: 1574 litres' },
          { message: 'Use switch', codeIncludes: 'switch (choice)' },
          { message: 'Have a default', codeIncludes: 'default:' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t compile?',
        lines: ['switch (choice) {', '    case 1:', '        printf("Water\\n");', '        break;', '    case > 2:', '        printf("Other\\n");', '        break;', '}'],
        bug: 4,
        fix: '    default:',
        explanation: 'case needs one exact value, not a comparison. For "anything else", use default.',
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the menu.',
        template: '[[1]] (choice) {\n    [[2]] 1:\n        printf("Water\\n");\n        break;\n    [[3]]:\n        printf("Unknown\\n");\n        break;\n}',
        blanks: [['switch'], ['case'], ['default']],
        distractors: ['if', 'else'],
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'switch or if / else if?',
        groups: ['switch fits', 'Use if / else if'],
        items: [
          { text: 'Menu option 1, 2, 3 or 4', group: 0 },
          { text: 'CO2 under 1000, under 2000, or more', group: 1 },
          { text: 'Status code G, A or R', group: 0 },
          { text: 'Temperature between 18 and 26', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'Why bother with default? Nobody\'s going to press 7.',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Someone will, at 3 a.m., with gloves on. default makes the board say something useful instead of nothing.' },
          { text: 'switch won\'t compile without it.', why: 'It compiles without default; it just stays silent for unexpected values.' },
          { text: 'You\'re right, delete it.', why: 'Unexpected input always happens eventually. Handle it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which keyword in a switch handles values with no matching case?',
        answers: ['default'],
        placeholder: 'A keyword',
      },
      {
        kind: 'writeCode',
        prompt: 'Read a choice (given: 7). Menu: 1 Water: 1574 litres, 2 Power: 62%, 3 CO2: 1150 ppm, anything else Unknown option.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n    printf("Choice? ");\n    scanf("%d", &choice);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n    printf("Choice? ");\n    scanf("%d", &choice);\n    switch (choice) {\n        case 1:\n            printf("Water: 1574 litres\\n");\n            break;\n        case 2:\n            printf("Power: 62%%\\n");\n            break;\n        case 3:\n            printf("CO2: 1150 ppm\\n");\n            break;\n        default:\n            printf("Unknown option\\n");\n            break;\n    }\n    return 0;\n}\n',
        hint: 'Three cases, each ending with break, then default.',
        stdin: ['7'],
        checks: [
          { message: 'Print Unknown option for 7', outputEquals: 'Choice? 7\nUnknown option' },
          { message: 'Have a case 3', codeIncludes: 'case 3:' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Phone menus ("press 1 for...") are switch statements. Think of one that annoyed you. What did its default case do, or fail to do?',
    starters: ['The menu that annoyed me was...', 'Its default should have...'],
  },
  notes: 'switch/case/default and break: ISO C 6.8.4.2, 6.8.6.3. case labels must be integer constant expressions.',
};

export default lesson;
