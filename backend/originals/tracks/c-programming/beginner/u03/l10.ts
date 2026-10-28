import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Checkpoint. Reviews lessons 6–9: == vs =, else if, && and ||, ! and bool. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: The airlock check',
  summary: 'Sol 3, 18:15. Mateus is due back from the rover run. Before the inner airlock door opens, the board must check: pressure in range, suit check passed, crew count right. One mistake and the door lies.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Combine conditions with &&, || and !', 'Write else-if chains in a working order'],
  learn: [
    {
      kind: 'story',
      title: 'Sol 3, 18:15. The airlock',
      beats: [
        { speaker: 'narrator', text: 'Through the airlock window, Mateus waves a gloved hand. Dust everywhere.' },
        { speaker: 'hal', text: 'Pressure between 95 and 105. Suit check passed. Then the door opens. Not before.' },
        { speaker: 'mateus', text: '(over the radio) My nose itches. Hurry.' },
        { speaker: 'ines', text: 'Checking every condition, Rocha. That\'s the whole point.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: bringing Mateus in.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The door should open only when the pressure is in range AND the suit check passed. Which operator joins them?',
        options: [
          { text: '||', why: '|| would open the door if just one passed.' },
          { text: '&&' },
          { text: '==', why: '== compares two values; it doesn\'t join two conditions.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The door says "open" even when suit_ok is 0. Which line?',
        lines: ['int suit_ok = 0;', 'if (suit_ok = 1) {', '    printf("Suit OK\\n");', '}'],
        bug: 1,
        fix: 'if (suit_ok == 1) {',
        explanation: 'One = assigns 1 and the if always runs. Comparing needs ==.',
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'pressure = 100, suit_ok = 0. True or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'pressure >= 95 && pressure <= 105', group: 0 },
          { text: 'pressure >= 95 && suit_ok == 1', group: 1 },
          { text: 'suit_ok == 1 || pressure == 100', group: 0 },
          { text: '!suit_ok', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Read the pressure and the suit check (given: 100 then 1). Print OPEN INNER DOOR only if the pressure is 95 to 105 and the suit check is 1; otherwise STAY IN AIRLOCK.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int pressure_kpa;\n    int suit_ok;\n    scanf("%d", &pressure_kpa);\n    scanf("%d", &suit_ok);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int pressure_kpa;\n    int suit_ok;\n    scanf("%d", &pressure_kpa);\n    scanf("%d", &suit_ok);\n    if (pressure_kpa >= 95 && pressure_kpa <= 105 && suit_ok == 1) {\n        printf("OPEN INNER DOOR\\n");\n    } else {\n        printf("STAY IN AIRLOCK\\n");\n    }\n    return 0;\n}\n',
        hint: 'Three conditions joined with &&.',
        stdin: ['100', '1'],
        checks: [
          { message: 'Print OPEN INNER DOOR', outputIncludes: 'OPEN INNER DOOR' },
          { message: 'Use &&', codeIncludes: '&&' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The reading is 108. What prints?',
        code: 'if (p < 95) {\n    printf("LOW\\n");\n} else if (p > 105) {\n    printf("HIGH\\n");\n} else {\n    printf("OK\\n");\n}',
        language: 'c',
        options: [
          { text: 'LOW', why: '108 isn\'t below 95.' },
          { text: 'HIGH' },
          { text: 'OK', why: 'The else only runs if both checks above were false.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to the code.',
        pairs: [
          ['Both must pass', 'a && b'],
          ['Either is enough', 'a || b'],
          ['Not a', '!a'],
          ['a is equal to 4', 'a == 4'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the check.',
        template: '#include <[[1]]>\nbool suit_ok = true;\nif (suit_ok [[2]] pressure_ok) {\n    printf("Open\\n");\n}',
        blanks: [['stdbool.h'], ['&&']],
        distractors: ['||', 'bool.h'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: '(radio) Pressure\'s 104 and my suit\'s fine. Why is the door still shut?',
        prompt: 'What should Ines check first?',
        options: [
          { text: 'Whether the suit check variable is really 1, and whether the condition uses == not =.' },
          { text: 'Nothing: 104 is out of range.', why: '104 is inside 95 to 105.' },
          { text: 'Open it by hand and ignore the board.', why: 'Hal\'s rule: we don\'t break sim. Find the bug.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does printf("%d", !0); print?',
        answers: ['1'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Read the pressure (given: 92). Print LOW below 95, HIGH above 105, otherwise OK.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int p;\n    scanf("%d", &p);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int p;\n    scanf("%d", &p);\n    if (p < 95) {\n        printf("LOW\\n");\n    } else if (p > 105) {\n        printf("HIGH\\n");\n    } else {\n        printf("OK\\n");\n    }\n    return 0;\n}\n',
        hint: 'if ... else if ... else.',
        stdin: ['92'],
        checks: [
          { message: 'Print LOW for 92', outputIncludes: 'LOW' },
          { message: 'Use else if', codeIncludes: 'else if' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'A door that checks three things before opening is slower but safer. Where do you accept a slower, safer check in your own life?',
    starters: ['I accept a slower check when...', 'It\'s worth it because...'],
  },
  notes: 'Review of chapter 3 lessons 6-9.',
};

export default lesson;
