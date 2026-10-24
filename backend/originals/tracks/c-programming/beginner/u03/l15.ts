import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 15 — Checkpoint. Reviews lessons 11–14: braces, switch, break, %lf and " %c". */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: The crew menu',
  summary: 'Sol 3, 22:15. The console menu goes live for the night watch. Tomoko tests it with gloves on, Mateus tests it by pressing everything, and Hal tests it by reading the code.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Build a working switch menu with default', 'Read ints, doubles and chars correctly'],
  learn: [
    {
      kind: 'story',
      title: 'Sol 3, 22:15',
      beats: [
        { speaker: 'tomoko', text: 'I pressed 2 and got power AND carbon dioxide.' },
        { speaker: 'mateus', text: 'I pressed 9 and it said nothing at all. Rude.' },
        { speaker: 'hal', text: 'And there\'s an if in here with no braces. Fix all three before the night watch.' },
        { speaker: 'ines', text: 'A missing break, a missing default, missing braces. On it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the night-watch menu.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Tomoko pressed 2 and got two lines. What\'s the likely cause?',
        options: [
          { text: 'case 2 is missing its break' },
          { text: 'There\'s no default', why: 'default only runs when no case matches. Two lines means fall-through.' },
          { text: 'scanf read 2 twice', why: 'scanf read once. The switch fell through into case 3.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix all three problems: add the missing break, add a default that prints Unknown option, and put braces on the if. The input is 2.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n    scanf("%d", &choice);\n    if (choice > 3)\n        printf("Options are 1 to 3\\n");\n    switch (choice) {\n        case 1:\n            printf("Water: 1574 litres\\n");\n            break;\n        case 2:\n            printf("Power: 62%%\\n");\n        case 3:\n            printf("CO2: 1150 ppm\\n");\n            break;\n    }\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n    scanf("%d", &choice);\n    if (choice > 3) {\n        printf("Options are 1 to 3\\n");\n    }\n    switch (choice) {\n        case 1:\n            printf("Water: 1574 litres\\n");\n            break;\n        case 2:\n            printf("Power: 62%%\\n");\n            break;\n        case 3:\n            printf("CO2: 1150 ppm\\n");\n            break;\n        default:\n            printf("Unknown option\\n");\n            break;\n    }\n    return 0;\n}\n',
        hint: 'break after the Power line, a default at the end, and { } round the if\'s printf.',
        stdin: ['2'],
        checks: [
          { message: 'Print only the power line for 2', outputEquals: '2\nPower: 62%' },
          { message: 'Add a default', codeIncludes: 'default:' },
          { message: 'Use braces on the if', codeIncludes: '3) {' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each bug to its fix.',
        pairs: [
          ['One option prints two answers', 'Add break'],
          ['Option 9 prints nothing', 'Add default'],
          ['A line runs outside the if', 'Add braces'],
          ['A double reads as nonsense', 'Use %lf'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print when x is 5?',
        code: 'if (x > 10)\n    printf("Big\\n");\n    printf("Checked\\n");',
        language: 'c',
        options: [
          { text: 'Nothing', why: 'Checked is not inside the if: without braces only Big is.' },
          { text: 'Checked' },
          { text: 'Big and Checked', why: '5 isn\'t over 10, so Big is skipped.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Read a letter after a number, safely.',
        template: 'scanf("%d", &sol);\nscanf(" [[1]]", &status);  // note the space before it',
        blanks: [['%c']],
        distractors: ['%d', '%s', '%lf'],
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool fits each job?',
        groups: ['switch', 'if / else if'],
        items: [
          { text: 'Menu options 1 to 5', group: 0 },
          { text: 'Battery under 20 or under 50', group: 1 },
          { text: 'Status letters G, A, R', group: 0 },
          { text: 'Pressure between 95 and 105', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t compile?',
        lines: ['switch (choice) {', '    case 1:', '        printf("Water\\n");', '        break;', '    case choice > 3:', '        printf("Too big\\n");', '}'],
        bug: 4,
        fix: '    default:',
        explanation: 'case needs an exact constant value. Use default for "anything else".',
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'I pressed 9. Now it says "Unknown option". Much more polite.',
        prompt: 'What did default just do?',
        options: [
          { text: 'It caught a value no case expected, so the watch still gets a useful answer.' },
          { text: 'It turned 9 into 1.', why: 'default doesn\'t change the value; it handles it.' },
          { text: 'It stopped the program.', why: 'It printed a message; the program carries on normally.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word ends a case so it doesn\'t fall into the next one?',
        answers: ['break'],
        placeholder: 'A keyword',
      },
      {
        kind: 'writeCode',
        prompt: 'Read a menu choice and a temperature (given: 1 then 24.5). For choice 1 print GreenHab: 24.5 C; for any other choice print Unknown option. Use switch.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n    double temp_c;\n    scanf("%d", &choice);\n    scanf("%lf", &temp_c);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n    double temp_c;\n    scanf("%d", &choice);\n    scanf("%lf", &temp_c);\n    switch (choice) {\n        case 1:\n            printf("GreenHab: %.1f C\\n", temp_c);\n            break;\n        default:\n            printf("Unknown option\\n");\n            break;\n    }\n    return 0;\n}\n',
        hint: 'switch (choice) { case 1: ... break; default: ... }',
        stdin: ['1', '24.5'],
        checks: [
          { message: 'Print GreenHab: 24.5 C', outputIncludes: 'GreenHab: 24.5 C' },
          { message: 'Use switch', codeIncludes: 'switch' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Three people tested the menu three different ways and found three different bugs. How could you test your own work in more than one way?',
    starters: ['I usually test by...', 'A different way would be...'],
  },
  notes: 'Review of chapter 3 lessons 11-14.',
};

export default lesson;
