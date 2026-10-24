import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 16. Chat with Tey: scanf returns how many values it read; check it. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Did scanf work?',
  summary: 'Sol 3, 22:40. Half asleep, Mateus types "ok" instead of a number. The board logs a CO2 reading of 0 and stays silent. Ines discovers that scanf has been reporting back all along, and nobody was listening.',
  minutes: 11,
  outcomes: [
    'Use scanf\'s return value: how many values it read',
    'Refuse bad input instead of using a garbage number',
    'Explain why a failed scanf leaves the variable unchanged',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Mateus typed "ok" where a number should go. What do you think scanf did with it?', replies: ['Turned it into 0?', 'Crashed?'] },
        { tey: 'Neither. It looked at "o", saw it isn\'t a digit, and gave up. It put nothing in the variable, so co2_ppm kept whatever it held before.', replies: ['Then how would I know?'] },
        { tey: 'scanf returns a number: how many values it successfully read. scanf("%d", &co2_ppm) gives back 1 if it worked, 0 if the input wasn\'t a number.', replies: ['So I check it with if?'] },
        { tey: 'Exactly. if (scanf("%d", &co2_ppm) != 1) means "if I didn\'t get a number". Then say so, and don\'t use the value.', replies: ['And for two values?'] },
        { tey: 'scanf("%d %lf", &sol, &temp_c) should return 2. Anything less, something went wrong. Never trust input you haven\'t checked: not on a station, not anywhere.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Typing "ok"',
      code: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm = 0;\n    printf("CO2 reading? ");\n\n    if (scanf("%d", &co2_ppm) != 1) {\n        printf("That is not a number. Reading not logged.\\n");\n        return 1;\n    }\n    printf("Logged %d ppm\\n", co2_ppm);\n    return 0;\n}\n',
      caption: 'This run is given the input ok. Run it.',
      challenge: 'Remove the if and just call scanf. What gets logged now?',
      stdin: ['ok'],
    },
  ],
  apply: {
    scenario: 'Sol 3, 22:40. Half-asleep input.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does scanf("%d", &x) return when the input is 42?',
        options: [
          { text: '42', why: 'The 42 goes into x. scanf returns how many values it read: 1.' },
          { text: '1' },
          { text: '0', why: '0 means nothing was read. Here one value was.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'The input is "ok". What does scanf("%d", &x) return?',
        options: [
          { text: '0' },
          { text: '1', why: '"ok" isn\'t a number, so nothing was read.' },
          { text: 'An error message', why: 'It returns a number: 0 values read.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Read the CO2 (given: ok). If scanf didn\'t read a number, print Bad input and return 1. Otherwise print Logged and the value.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm = 0;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm = 0;\n    if (scanf("%d", &co2_ppm) != 1) {\n        printf("Bad input\\n");\n        return 1;\n    }\n    printf("Logged %d\\n", co2_ppm);\n    return 0;\n}\n',
        hint: 'if (scanf("%d", &co2_ppm) != 1) { ... }',
        stdin: ['ok'],
        checks: [
          { message: 'Print Bad input', outputIncludes: 'Bad input' },
          { message: 'Check scanf\'s return value', codeIncludes: '!= 1' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'scanf("%d", &x): what does it return for each input?',
        groups: ['Returns 1', 'Returns 0'],
        items: [
          { text: '1150', group: 0 },
          { text: 'ok', group: 1 },
          { text: '-3', group: 0 },
          { text: 'abc', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Two values should be read. Check that both were.',
        template: 'if (scanf("%d %lf", &sol, &temp_c) [[1]] [[2]]) {\n    printf("Bad input\\n");\n}',
        blanks: [['!='], ['2']],
        distractors: ['==', '1'],
        language: 'c',
      },
      {
        kind: 'findBug',
        prompt: 'The board logs garbage when someone types a word. Which line should be checked?',
        lines: ['int co2_ppm;', 'scanf("%d", &co2_ppm);', 'printf("Logged %d\\n", co2_ppm);'],
        bug: 1,
        fix: 'if (scanf("%d", &co2_ppm) != 1) { printf("Bad input\\n"); return 1; }',
        explanation: 'If scanf fails, co2_ppm was never set, and the next line logs garbage. Check what scanf returns.',
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'Why not just set co2_ppm = 0 first and log whatever comes out?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Then a typo logs "0 ppm", which looks real. Better to say the input was bad and log nothing.' },
          { text: 'That works perfectly.', why: 'A fake 0 in the log is a lie that looks like data.' },
          { text: '0 isn\'t allowed in C.', why: '0 is fine; the problem is pretending it was a reading.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The input is "abc". What prints?',
        code: 'int n = 7;\nint got = scanf("%d", &n);\nprintf("%d %d\\n", got, n);',
        language: 'c',
        options: [
          { text: '0 7' },
          { text: '1 0', why: 'Nothing was read: got is 0, and n keeps its 7.' },
          { text: '0 0', why: 'A failed scanf doesn\'t change n.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'scanf("%d %d", &a, &b) reads both numbers. What does it return?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Read the sol and temperature together (given: 3 and 22.4). If both were read, print Sol 3: 22.4 C; otherwise print Bad input.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int sol;\n    double temp_c;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int sol;\n    double temp_c;\n    if (scanf("%d %lf", &sol, &temp_c) == 2) {\n        printf("Sol %d: %.1f C\\n", sol, temp_c);\n    } else {\n        printf("Bad input\\n");\n    }\n    return 0;\n}\n',
        hint: 'if (scanf("%d %lf", &sol, &temp_c) == 2)',
        stdin: ['3 22.4'],
        checks: [
          { message: 'Print Sol 3: 22.4 C', outputIncludes: 'Sol 3: 22.4 C' },
          { message: 'Check for 2 values', codeIncludes: '== 2' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'scanf was reporting failure all along; the program just never listened. Where in life do you get warnings that are easy to ignore?',
    starters: ['A warning I tend to ignore is...', 'Listening to it would...'],
  },
  notes: 'scanf returns the number of input items assigned, or EOF on input failure before the first conversion (ISO C 7.21.6.2p16). On a matching failure the object is not modified.',
};

export default lesson;
