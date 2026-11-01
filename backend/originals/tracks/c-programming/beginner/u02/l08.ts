import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Tap to explore: int and double in one calculation; 2.0 and (double) casts. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Mixing int and double',
  summary: 'Sol 2, 15:30. Tomoko wants the average water per person: 70 litres for 4 people. The board says 17. It should be 17.5. Both variables are ints, and that\'s the problem.',
  minutes: 12,
  outcomes: [
    'Predict the type of a calculation that mixes int and double',
    'Get a decimal answer from two ints with a cast',
    'Explain why (double)(a / b) is too late',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Tomoko\'s average, fixed',
      text: 'int litres_used = 70;\nint crew = 4;\n\nint wrong = litres_used / crew;\ndouble right = (double)litres_used / crew;\ndouble also_right = litres_used / 4.0;\ndouble too_late = (double)(litres_used / crew);',
      hotspots: [
        { phrase: 'int wrong = litres_used / crew;', note: 'int / int gives an int: 70 / 4 is 17, the .5 is chopped before anything is stored.' },
        { phrase: '(double)litres_used', note: 'A cast: "treat this value as a double, just here". The variable itself stays an int.' },
        { phrase: 'double right = (double)litres_used / crew;', note: 'double / int gives a double. If either side is a double, C does decimal division: 17.5.' },
        { phrase: 'litres_used / 4.0', note: '4.0 is a double, because of the decimal point. So this is decimal division too: 17.5.' },
        { phrase: 'double too_late = (double)(litres_used / crew);', note: 'The brackets go first: 70 / 4 is already 17 before the cast. Casting 17 gives 17.0. Cast BEFORE dividing.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'All four, side by side',
      code: '#include <stdio.h>\n\nint main(void) {\n    int litres_used = 70;\n    int crew = 4;\n\n    printf("int / int:        %d\\n", litres_used / crew);\n    printf("cast first:       %.1f\\n", (double)litres_used / crew);\n    printf("divide by 4.0:    %.1f\\n", litres_used / 4.0);\n    printf("cast too late:    %.1f\\n", (double)(litres_used / crew));\n    return 0;\n}\n',
      caption: 'Run it and compare the four answers.',
      challenge: 'Try 10 / 4, both as ints and with a cast. What does each give?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The rule: if either side of / is a double, the answer is a double. If both are ints, the answer is an int. Put (double) on one of them before dividing.',
    },
  ],
  apply: {
    scenario: 'Sol 2, 15:30. Tomoko\'s average.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does 70 / 4 give 17 in C?',
        options: [
          { text: 'Both are ints, so C does whole-number division' },
          { text: 'C always rounds down', why: 'It\'s not rounding: int division drops the fraction. With a double it would give 17.5.' },
          { text: 'printf can\'t show .5', why: 'printf with %f can. The .5 was gone before printf saw it.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each calculation to its answer.',
        pairs: [
          ['7 / 2', '3'],
          ['7 / 2.0', '3.5'],
          ['(double)7 / 2', '3.5 as well'],
          ['(double)(7 / 2)', '3.0'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the average so it prints Average: 17.5 litres',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int litres_used = 70;\n    int crew = 4;\n    double average = litres_used / crew;\n    printf("Average: %.1f litres\\n", average);\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int litres_used = 70;\n    int crew = 4;\n    double average = (double)litres_used / crew;\n    printf("Average: %.1f litres\\n", average);\n    return 0;\n}\n',
        hint: 'Storing the result in a double isn\'t enough: cast before dividing. (double)litres_used / crew',
        checks: [
          { message: 'Print Average: 17.5 litres', outputIncludes: 'Average: 17.5 litres' },
          { message: 'Use a cast', codeIncludes: '(double)' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int a = 9;\nint b = 2;\ndouble r = a / b;\nprintf("%.1f\\n", r);',
        language: 'c',
        options: [
          { text: '4.5', why: 'a / b is int division, giving 4, before it\'s stored in r.' },
          { text: '4.0' },
          { text: '4', why: '%.1f always shows one decimal.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Is the answer an int or a double?',
        groups: ['int', 'double'],
        items: [
          { text: '70 / 4', group: 0 },
          { text: '70 / 4.0', group: 1 },
          { text: '70.0 / 4', group: 1 },
          { text: '70 % 4', group: 0 },
          { text: '(double)70 / 4', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The percentage comes out 0. Which line is the bug?',
        lines: ['int healthy = 45;', 'int plants = 48;', 'double percent = healthy / plants * 100;', 'printf("%.1f%%\\n", percent);'],
        bug: 2,
        fix: 'double percent = (double)healthy / plants * 100;',
        explanation: '45 / 48 is int division: 0. Then 0 * 100 is 0. Cast first to get 93.75.',
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'Make this decimal division.',
        template: 'double average = ([[1]])litres_used / crew;',
        blanks: [['double']],
        distractors: ['int', 'decimal'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'I wrote double average = 70 / 4; and still got 17.0. I said double!',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'The division happens first, with two ints. By the time it\'s stored in a double, the .5 is gone. Write 70 / 4.0.' },
          { text: 'double doesn\'t work with division.', why: 'It does: you need a double inside the division, not just to store it.' },
          { text: 'Use %d to print it.', why: 'The value is already 17.0. The fix is in the division.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does printf("%.2f\\n", 10 / 4.0); print?',
        answers: ['2.50'],
        placeholder: 'A number with 2 decimals',
      },
      {
        kind: 'writeCode',
        prompt: '45 of Tomoko\'s 48 plants are healthy. Print Healthy: 93.8% (one decimal), worked out by the board.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int healthy = 45;\n    int plants = 48;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int healthy = 45;\n    int plants = 48;\n    double percent = (double)healthy / plants * 100;\n    printf("Healthy: %.1f%%\\n", percent);\n    return 0;\n}\n',
        hint: '(double)healthy / plants * 100, printed with %.1f%%',
        checks: [
          { message: 'Print Healthy: 93.8%', outputIncludes: 'Healthy: 93.8%' },
          { message: 'Cast before dividing', codeIncludes: '(double)' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'The .5 vanished silently, with no error. Where else can a small rounding or chopping quietly change an answer (prices, grades, recipes)?',
    starters: ['A place rounding matters is...', 'It could go wrong when...'],
  },
  notes: 'Usual arithmetic conversions (ISO C 6.3.1.8): if either operand is double, the other is converted. Cast operator: 6.5.4. 45/48*100 = 93.75 exactly; %.1f of 93.75 (exact tie) rounds half-even to 93.8.',
};

export default lesson;
