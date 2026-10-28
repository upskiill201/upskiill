import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Checkpoint. Reviews lessons 6–9: accumulators, off-by-one, infinite loops, do ... while. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: The charge log',
  summary: 'Sol 4, 16:00. The rover turns for home. Hal wants the afternoon\'s charge log totalled, checked for off-by-one mistakes, and a menu the watch can use until the rover is back.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Total values with an accumulator', 'Write loops that stop when they should, no earlier and no later'],
  learn: [
    {
      kind: 'story',
      title: 'Sol 4, 16:00. Turning for home',
      beats: [
        { speaker: 'mateus', text: '(radio) Rover turning for home. Thirteen sample bags. Possibly a fossil. Possibly a rock shaped like a fossil.' },
        { speaker: 'hal', text: 'Copy. Moreau, total the energy he\'s used, and make sure that log has every hour in it. Last time it was missing one.' },
        { speaker: 'ines', text: 'Off by one. Not this time.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the charge log.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Read 6 hourly energy readings in kWh (given) and print Used: 4.3 kWh',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    double used_kwh = 0;\n    for (int hour = 1; hour <= 6; hour++) {\n        double kwh;\n        scanf("%lf", &kwh);\n        used_kwh += kwh;\n    }\n    printf("Used: %.1f kWh\\n", used_kwh);\n    return 0;\n}\n',
        hint: 'Total starts at 0 before the loop; += inside.',
        stdin: ['0.8', '0.6', '0.9', '0.7', '0.5', '0.8'],
        checks: [
          { message: 'Print Used: 4.3 kWh', outputIncludes: 'Used: 4.3 kWh' },
          { message: 'Use an accumulator', codeIncludes: '+=' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The log should list hours 1 to 6. It stops at 5. Which line?',
        lines: ['for (int hour = 1; hour < 6; hour++) {', '    printf("Hour %d logged\\n", hour);', '}'],
        bug: 0,
        fix: 'for (int hour = 1; hour <= 6; hour++) {',
        explanation: 'Starting at 1 with < 6 stops at 5. Use <= 6.',
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int total = 0;\nfor (int i = 0; i < 3; i++) {\n    total += 5;\n}\nprintf("%d\\n", total);',
        language: 'c',
        options: [
          { text: '20', why: 'i is 0, 1, 2: three rounds of 5.' },
          { text: '5', why: 'The total keeps growing: it starts outside the loop.' },
          { text: '15' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Ends, or runs forever?',
        groups: ['Ends', 'Forever'],
        items: [
          { text: 'b = 100; while (b > 30) { b -= 9; }', group: 0 },
          { text: 'b = 100; while (b != 30) { b -= 9; }', group: 1 },
          { text: 'i = 0; while (i < 5) { }', group: 1 },
          { text: 'do { n--; } while (n > 0);  with n = 3', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the loop to how many times it runs.',
        pairs: [
          ['for (i = 0; i < 6; i++)', '6'],
          ['for (i = 1; i < 6; i++)', '5'],
          ['for (i = 0; i <= 6; i++)', '7'],
          ['do { } while (0);', '1'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A menu that shows at least once and repeats until 0.',
        template: '[[1]] {\n    scanf("%d", &choice);\n} while (choice [[2]] 0);',
        blanks: [['do'], ['!=']],
        distractors: ['for', '=='],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'Your total says 0.8 kWh. He\'s been out six hours.',
        prompt: 'What should Ines suspect?',
        options: [
          { text: 'The rover is very efficient.', why: '0.8 is exactly the last reading: classic reset bug.' },
          { text: 'The total is being reset inside the loop, so only the last reading counts.' },
          { text: 'The loop ran too many times.', why: 'Too many rounds would make the total bigger, not smaller.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A do ... while has the condition (1 > 2). How many times does its body run?',
        answers: ['1', 'once', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which condition is safest for "stop once the battery is at 30 or below"?',
        options: [
          { text: 'while (battery != 30)', why: 'If the battery jumps past 30, this never ends.' },
          { text: 'while (battery > 30)' },
          { text: 'while (battery == 30)', why: 'That only runs while the battery is exactly 30.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'The watch menu (given choices: 1, 1, 0): 1 prints Rover: on the way home, 0 quits. Count how many times the watch asked about the rover and print Rover checks: 2 after the loop.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n    int checks = 0;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n    int checks = 0;\n    do {\n        scanf("%d", &choice);\n        if (choice == 1) {\n            printf("Rover: on the way home\\n");\n            checks++;\n        }\n    } while (choice != 0);\n    printf("Rover checks: %d\\n", checks);\n    return 0;\n}\n',
        hint: 'A do ... while with a counter that goes up only for choice 1.',
        stdin: ['1', '1', '0'],
        checks: [
          { message: 'Print Rover checks: 2', outputIncludes: 'Rover checks: 2' },
          { message: 'Use do ... while', codeIncludes: '} while (' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which loop bug do you think you\'re most likely to make: forgetting to start the total at 0, being off by one, or a loop that never ends?',
    starters: ['I\'m most likely to...', 'I\'ll catch it by...'],
  },
  notes: 'Review of chapter 4 lessons 6-9. 0.8+0.6+0.9+0.7+0.5+0.8 = 4.3.',
};

export default lesson;
