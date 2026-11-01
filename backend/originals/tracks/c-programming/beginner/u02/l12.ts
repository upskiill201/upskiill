import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 12. Before / After: magic numbers vs const and #define. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Constants that never change',
  summary: 'Sol 2, 20:15. The ration, 18 litres per person, appears in six places in Ines\'s code. When Hal cuts it to 16, she changes five. The sixth is a bug waiting for tomorrow.',
  minutes: 11,
  outcomes: [
    'Replace "magic numbers" with named constants',
    'Make a constant with const, and with #define',
    'Explain why C refuses to change a const',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The ration, before and after',
      before: {
        label: 'Magic numbers',
        text: 'int daily_use = 4 * 18;\nint weekly = 4 * 18 * 7;\nprintf("Ration: %d litres\\n", 18);',
      },
      after: {
        label: 'Named constants',
        text: '#define CREW 4\nconst int RATION_LITRES = 18;\n\nint daily_use = CREW * RATION_LITRES;\nint weekly = CREW * RATION_LITRES * 7;\nprintf("Ration: %d litres\\n", RATION_LITRES);',
      },
      notes: [
        'A number with no name in the code is called a magic number. Six months later, nobody knows what 18 meant.',
        'const int RATION_LITRES = 18; is a variable C won\'t let you change. Change the 18 once, at the top, and every use follows.',
        '#define CREW 4 tells the preprocessor to replace CREW with 4 everywhere before compiling. No type, no =, no semicolon.',
        'Constants are traditionally written in CAPITALS, so you can tell them from ordinary variables at a glance.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Cut the ration once',
      code: '#include <stdio.h>\n\n#define CREW 4\n\nint main(void) {\n    const int RATION_LITRES = 18;\n\n    printf("Ration: %d litres each\\n", RATION_LITRES);\n    printf("Daily use: %d litres\\n", CREW * RATION_LITRES);\n    printf("Weekly use: %d litres\\n", CREW * RATION_LITRES * 7);\n    return 0;\n}\n',
      caption: 'Run it. Then change the ration in ONE place.',
      challenge: 'Set RATION_LITRES to 16 and run it: all three lines update. Then add the line RATION_LITRES = 20; inside main and see what C says.',
    },
  ],
  apply: {
    scenario: 'Sol 2, 20:15. The ration cut.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a "magic number" in code?',
        options: [
          { text: 'A number with no name, whose meaning you have to guess' },
          { text: 'A number that changes by itself', why: 'Magic numbers don\'t change; they just aren\'t explained.' },
          { text: 'A very large number', why: 'Size doesn\'t matter. 18 is magic if nothing says it\'s the ration.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'const int RATION_LITRES = 18; Later: RATION_LITRES = 16; What happens?',
        options: [
          { text: 'It becomes 16', why: 'const means C refuses to let it change after it\'s set.' },
          { text: 'Compile error: you can\'t change a const' },
          { text: 'It becomes 34', why: '= doesn\'t add. And here it isn\'t allowed at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Replace the magic 18 with const int RATION_LITRES = 18; and use it in both lines.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("Ration: %d litres\\n", 18);\n    printf("Daily use: %d litres\\n", 4 * 18);\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    const int RATION_LITRES = 18;\n    printf("Ration: %d litres\\n", RATION_LITRES);\n    printf("Daily use: %d litres\\n", 4 * RATION_LITRES);\n    return 0;\n}\n',
        hint: 'Declare the const at the top of main, then use its name instead of 18.',
        checks: [
          { message: 'Print Ration: 18 litres', outputIncludes: 'Ration: 18 litres' },
          { message: 'Print Daily use: 72 litres', outputIncludes: 'Daily use: 72 litres' },
          { message: 'Declare the const', codeIncludes: 'const int RATION_LITRES' },
          { message: 'Use it in the sum', codeIncludes: '4 * RATION_LITRES' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which #define line is wrong?',
        lines: ['#define CREW 4', '#define ROVERS = 2;', '#define DAYS 10'],
        bug: 1,
        fix: '#define ROVERS 2',
        explanation: '#define is a straight text swap: no =, no semicolon. This one would paste "= 2;" wherever ROVERS appears.',
        language: 'c',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it is.',
        pairs: [
          ['#define CREW 4', 'Text swap before compiling'],
          ['const int CREW = 4;', 'A variable that can\'t change'],
          ['int crew = 4;', 'An ordinary variable'],
          ['4 * 18', 'Magic numbers'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Make both constants.',
        template: '[[1]] DAYS 10\n\nint main(void) {\n    [[2]] int RATION_LITRES = 18;',
        blanks: [['#define'], ['const']],
        distractors: ['#include', 'static'],
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'Constant or variable? What should each value be?',
        groups: ['Constant', 'Variable'],
        items: [
          { text: 'Litres per person per sol (set by Hal)', group: 0 },
          { text: 'Water in the tank right now', group: 1 },
          { text: 'Mission length: 10 sols', group: 0 },
          { text: 'Ripe tomatoes today', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'I may cut the ration again tomorrow. How long will that take you?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'One line. It\'s a named constant at the top; everything else uses the name.' },
          { text: 'Ten minutes, I\'ll search for every 18.', why: 'That\'s how the sixth one got missed. A named constant avoids the search.' },
          { text: 'It can\'t change, it\'s a const.', why: 'const stops the PROGRAM changing it while running. Ines can still edit the code.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'By tradition, constants like RATION_LITRES are written in what kind of letters?',
        answers: ['capitals', 'capital letters', 'uppercase', 'upper case', 'caps'],
        placeholder: 'One or two words',
      },
      {
        kind: 'writeCode',
        prompt: 'Use #define MISSION_SOLS 10 and const int RATION_LITRES = 16; to print Mission water per person: 160 litres',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\n#define MISSION_SOLS 10\n\nint main(void) {\n    const int RATION_LITRES = 16;\n    printf("Mission water per person: %d litres\\n", MISSION_SOLS * RATION_LITRES);\n    return 0;\n}\n',
        hint: '#define goes above main, with no = or ;. Then multiply MISSION_SOLS * RATION_LITRES.',
        checks: [
          { message: 'Print Mission water per person: 160 litres', outputIncludes: 'Mission water per person: 160 litres' },
          { message: 'Use #define', codeIncludes: '#define MISSION_SOLS 10' },
          { message: 'Use const', codeIncludes: 'const int RATION_LITRES' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a rule that\'s written in many places (a price, a deadline, a password policy). What goes wrong when it changes and one copy is missed?',
    starters: ['A rule written in many places is...', 'When it changed...'],
  },
  notes: 'const qualifier: ISO C 6.7.3 (assignment to const object is a constraint violation, 6.5.16). Object-like macros: 6.10.3. Capital-letter constants: common convention (K&R).',
};

export default lesson;
