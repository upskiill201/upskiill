import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Chat with Tey: integer division drops the fraction; % gives the remainder. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Integer division and the remainder',
  summary: 'Sol 2, 13:00. The board says 22 sols of water. Mateus says 1,652 divided by 72 is 22.94: "We\'re losing almost a whole sol!" Where did the rest go?',
  minutes: 11,
  outcomes: [
    'Predict what / gives for two ints',
    'Use % to get the remainder',
    'Split a total into whole parts and what\'s left over',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Mateus is right about the maths. 1652 / 72 is 22.94... So why does the board say 22?', replies: ['Rounding?', 'A bug?'] },
        { tey: 'Neither. When you divide one int by another, C gives an int back. It can\'t hold .94, so it simply drops it. Not rounding: chopping.', replies: ['So 22.94 becomes 22?'] },
        { tey: 'Yes. And 7 / 2 is 3, and 1 / 4 is 0. Whole-number division. Sometimes that\'s exactly what you want: Hal only cares about full sols of water.', replies: ['And the leftover?'] },
        { tey: 'That\'s the % operator, called modulo, or just "remainder". 1652 % 72 is 68: after 22 full sols, 68 litres are left over.', replies: ['What else is % good for?'] },
        { tey: 'Splitting things up. 135 minutes is 135 / 60 = 2 hours and 135 % 60 = 15 minutes. And any number % 2 is 0 if it\'s even, 1 if it\'s odd.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Full sols, and the leftover',
      code: '#include <stdio.h>\n\nint main(void) {\n    int water_litres = 1652;\n    int daily_use = 72;\n\n    printf("Full sols: %d\\n", water_litres / daily_use);\n    printf("Left over: %d litres\\n", water_litres % daily_use);\n\n    int minutes = 135;\n    printf("%d h %d min\\n", minutes / 60, minutes % 60);\n    return 0;\n}\n',
      caption: 'Run it. / gives the whole part, % gives what\'s left.',
      challenge: 'Change minutes to 200. Before you run it, predict the hours and minutes.',
    },
  ],
  apply: {
    scenario: 'Sol 2, 13:00. Where did .94 go?',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does printf("%d\\n", 7 / 2); print?',
        options: [
          { text: '3.5', why: 'Two ints divide to an int. The .5 is dropped.' },
          { text: '4', why: 'C doesn\'t round. It drops the fraction.' },
          { text: '3' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What does printf("%d\\n", 7 % 2); print?',
        options: [
          { text: '1' },
          { text: '3', why: 'That\'s 7 / 2. % gives the remainder: 7 = 2 × 3 + 1.' },
          { text: '3.5', why: '% gives the remainder, a whole number.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each calculation to its answer.',
        pairs: [
          ['17 / 5', '3'],
          ['17 % 5', '2'],
          ['1 / 4', '0'],
          ['20 % 4', '0 left over'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: '50 litres of drinking water split equally between 4 crew. Print Each: 12 and Left: 2 using / and %.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int litres = 50;\n    int crew = 4;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int litres = 50;\n    int crew = 4;\n    printf("Each: %d\\n", litres / crew);\n    printf("Left: %d\\n", litres % crew);\n    return 0;\n}\n',
        hint: 'litres / crew for each share, litres % crew for what\'s left.',
        checks: [
          { message: 'Print Each: 12', outputIncludes: 'Each: 12' },
          { message: 'Print Left: 2', outputIncludes: 'Left: 2' },
          { message: 'Use %', codeIncludes: 'litres % crew' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Even or odd? (n % 2 is 0 for even, 1 for odd)',
        groups: ['n % 2 is 0', 'n % 2 is 1'],
        items: [
          { text: '48', group: 0 },
          { text: '31', group: 1 },
          { text: '1652', group: 0 },
          { text: '7', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Turn 200 minutes into hours and minutes.',
        template: 'printf("%d h %d min\\n", minutes [[1]] 60, minutes [[2]] 60);',
        blanks: [['/'], ['%']],
        distractors: ['*', '-'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'So the board is lying? It says 22 when it\'s nearly 23!',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'It\'s honest: 22 FULL sols. The other 68 litres won\'t last a whole sol. That\'s exactly what Hal asked.' },
          { text: 'Yes, it\'s a bug in C.', why: 'It\'s defined behaviour: int / int drops the fraction.' },
          { text: 'We should always round up.', why: 'Rounding up promises a 23rd sol of water that isn\'t there.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does 1652 % 72 give? (1652 = 72 × 22 + ?)',
        answers: ['68'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Tomoko wants to know if her plant count is even. Which line is wrong?',
        lines: ['int plants = 48;', 'int remainder = plants / 2;', 'printf("Remainder: %d\\n", remainder);'],
        bug: 1,
        fix: 'int remainder = plants % 2;',
        explanation: 'plants / 2 is half the plants (24). The remainder needs %.',
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'The rover drove for 437 minutes. Print Drive time: 7 h 17 min using / and % with 60.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int minutes = 437;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int minutes = 437;\n    printf("Drive time: %d h %d min\\n", minutes / 60, minutes % 60);\n    return 0;\n}\n',
        hint: 'printf("Drive time: %d h %d min\\n", minutes / 60, minutes % 60);',
        checks: [
          { message: 'Print Drive time: 7 h 17 min', outputIncludes: 'Drive time: 7 h 17 min' },
          { message: 'Use % 60', codeIncludes: '% 60' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where do you split something into whole parts and a leftover in real life (pizza slices, money for change, minutes into hours)?',
    starters: ['I split...', 'The leftover is...'],
  },
  deepen: {
    title: 'Negative numbers',
    summary: 'In C, -7 / 2 is -3 (it chops towards zero) and -7 % 2 is -1. Some other languages give -4 and 1. Worth knowing before you divide negative numbers.',
  },
  notes: 'Integer division truncates toward zero and a == (a/b)*b + a%b (ISO C 6.5.5p6, since C99).',
};

export default lesson;
