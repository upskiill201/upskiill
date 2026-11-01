import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Chat with Tey: combining conditions with && (and) and || (or). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'And, or: && and ||',
  summary: 'Sol 3, 15:45. Hal\'s airlock rule has two parts: the pressure must be right AND the suit check must pass. The fire rule has two as well: smoke OR heat. One if, two conditions.',
  minutes: 11,
  outcomes: [
    'Combine two conditions with && (and) and || (or)',
    'Write a range check like 1000 <= x && x <= 2000',
    'Predict when && and || are true',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Hal\'s airlock rule: open only if the pressure is between 95 and 105 kPa AND the suit check passed. How would you write that?', replies: ['Two ifs, one inside the other?'] },
        { tey: 'You could. But C has a shorter way: && means "and". Both sides must be true.', replies: ['Show me'] },
        { tey: 'if (suit_ok == 1 && pressure_kpa >= 95) ... and you can keep adding: && pressure_kpa <= 105. That\'s a range check: the value must be inside both limits.', replies: ['And "or"?'] },
        { tey: '|| means "or": at least one side must be true. Fire alarm: if (smoke == 1 || temp_c > 60). Smoke alone sounds it. Heat alone sounds it. Both, too.', replies: ['Which one is more careful?'] },
        { tey: '&& is strict: everything must pass. || is generous: anything is enough. Safety doors use &&. Alarms use ||. Pick by asking: should ONE problem be enough?' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Airlock and fire',
      code: '#include <stdio.h>\n\nint main(void) {\n    int pressure_kpa = 101;\n    int suit_ok = 1;\n    int smoke = 0;\n    int temp_c = 64;\n\n    if (suit_ok == 1 && pressure_kpa >= 95 && pressure_kpa <= 105) {\n        printf("Airlock: OK to open\\n");\n    }\n    if (smoke == 1 || temp_c > 60) {\n        printf("FIRE ALARM\\n");\n    }\n    return 0;\n}\n',
      caption: 'Run it. Which parts of each condition are true?',
      challenge: 'Set suit_ok to 0. Then set temp_c to 25. What changes each time?',
    },
  ],
  apply: {
    scenario: 'Sol 3, 15:45. Two-part rules.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the operator to its meaning.',
        pairs: [
          ['&&', 'Both must be true'],
          ['||', 'At least one must be true'],
          ['==', 'Is equal to'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'With a = 1 and b = 0, is each true or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'a == 1 && b == 1', group: 1 },
          { text: 'a == 1 || b == 1', group: 0 },
          { text: 'a == 1 && b == 0', group: 0 },
          { text: 'a == 0 || b == 1', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which checks that pressure is between 95 and 105, including both?',
        options: [
          { text: 'pressure >= 95 || pressure <= 105', why: '|| is true for almost any number: 200 is >= 95.' },
          { text: 'pressure >= 95 && pressure <= 105' },
          { text: '95 <= pressure <= 105', why: 'C doesn\'t chain comparisons like maths. Use && between two comparisons.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Read the pressure (given: 101). Print OK to open if it\'s from 95 to 105 inclusive, otherwise DO NOT OPEN.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int pressure_kpa;\n    scanf("%d", &pressure_kpa);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int pressure_kpa;\n    scanf("%d", &pressure_kpa);\n    if (pressure_kpa >= 95 && pressure_kpa <= 105) {\n        printf("OK to open\\n");\n    } else {\n        printf("DO NOT OPEN\\n");\n    }\n    return 0;\n}\n',
        hint: 'if (pressure_kpa >= 95 && pressure_kpa <= 105)',
        stdin: ['101'],
        checks: [
          { message: 'Print OK to open for 101', outputIncludes: 'OK to open' },
          { message: 'Use &&', codeIncludes: '&&' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int smoke = 0;\nint temp_c = 25;\nif (smoke == 1 || temp_c > 60) {\n    printf("FIRE\\n");\n} else {\n    printf("Clear\\n");\n}',
        language: 'c',
        options: [
          { text: 'FIRE', why: 'Neither side is true: no smoke, and 25 isn\'t over 60.' },
          { text: 'Clear' },
          { text: 'FIRE and Clear', why: 'Only one branch runs.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The airlock opens even when the suit check fails. Which line is wrong?',
        lines: ['int suit_ok = 0;', 'int pressure_kpa = 100;', 'if (suit_ok == 1 || pressure_kpa >= 95) {', '    printf("Open\\n");', '}'],
        bug: 2,
        fix: 'if (suit_ok == 1 && pressure_kpa >= 95) {',
        explanation: '|| lets the pressure alone open the door. A safety door needs && so BOTH checks must pass.',
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'Sound the alarm on smoke or heat; open only if both checks pass.',
        template: 'if (smoke == 1 [[1]] temp_c > 60) { alarm(); }\nif (suit_ok == 1 [[2]] pressure_ok == 1) { open(); }',
        blanks: [['||'], ['&&']],
        distractors: ['&', '|'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'Should the CO2 alarm use && or || for "CO2 high, or the fans have stopped"?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: '||. Either problem alone should wake us. && would wait for both to go wrong.' },
          { text: '&&, to avoid false alarms.', why: 'Then a stopped fan alone would never sound the alarm.' },
          { text: 'It doesn\'t matter.', why: 'It matters a lot: && waits for both, || reacts to either.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is a == 1 && b == 1 true or false when a is 1 and b is 0?',
        answers: ['false'],
        placeholder: 'true / false',
      },
      {
        kind: 'writeCode',
        prompt: 'Read smoke (0 or 1) and the temperature (given: 0 then 72). Print FIRE ALARM if there\'s smoke or it\'s over 60, otherwise All clear.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int smoke;\n    int temp_c;\n    scanf("%d", &smoke);\n    scanf("%d", &temp_c);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int smoke;\n    int temp_c;\n    scanf("%d", &smoke);\n    scanf("%d", &temp_c);\n    if (smoke == 1 || temp_c > 60) {\n        printf("FIRE ALARM\\n");\n    } else {\n        printf("All clear\\n");\n    }\n    return 0;\n}\n',
        hint: 'if (smoke == 1 || temp_c > 60)',
        stdin: ['0', '72'],
        checks: [
          { message: 'Print FIRE ALARM (72 is over 60)', outputIncludes: 'FIRE ALARM' },
          { message: 'Use ||', codeIncludes: '||' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a rule that needs everything to pass (&&), like boarding a plane, and one where any single thing is enough (||), like calling a doctor. What are your examples?',
    starters: ['An && rule I know is...', 'An || rule is...'],
  },
  notes: 'Logical AND/OR (ISO C 6.5.13-6.5.14) with short-circuit evaluation. 95 <= x <= 105 parses as (95 <= x) <= 105, which is always true. Pressure figures (~101 kPa sea-level atmosphere) used loosely; station rules fictional. alarm() and open() in a fillBlank are illustrative function names.',
};

export default lesson;
