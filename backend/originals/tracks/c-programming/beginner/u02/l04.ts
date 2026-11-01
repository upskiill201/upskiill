import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Card deck: + - * / with ints, storing results in variables. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Whole-number arithmetic',
  summary: 'Sol 2, 10:00. Hal wants three numbers on the board: water used per sol, water left after tonight, and how many full sols that lasts. Ines lets the board do the maths.',
  minutes: 11,
  outcomes: [
    'Add, subtract, multiply and divide ints',
    'Store the result of a calculation in a variable',
    'Build a calculation from other variables',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>C does arithmetic with the usual symbols, except multiply and divide look different from school:</p><ul><li><code>+</code> add, <code>-</code> subtract</li><li><code>*</code> multiply (a star, not ×)</li><li><code>/</code> divide (a slash, not ÷)</li></ul><p>The answer can go straight into a new variable:</p><p><code>int daily_use = crew_count * litres_per_person;</code></p><p>C works out the right side first, then stores the answer on the left.</p>',
    },
    {
      kind: 'text',
      html: '<p>Calculations can use other calculations\' results. That\'s how a program builds an answer step by step, like working on paper:</p><p><code>int water_tonight = water_litres - daily_use;</code><br><code>int sols_left = water_tonight / daily_use;</code></p><p>One catch: dividing two ints gives a <strong>whole number</strong>. 1608 / 72 is 22.33..., and C gives 22. Lesson 6 is all about that.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Hal\'s three numbers',
      code: '#include <stdio.h>\n\nint main(void) {\n    int water_litres = 1680;\n    int crew_count = 4;\n    int litres_per_person = 18;\n\n    int daily_use = crew_count * litres_per_person;\n    int water_tonight = water_litres - daily_use;\n    int sols_left = water_tonight / daily_use;\n\n    printf("Used per sol: %d litres\\n", daily_use);\n    printf("Left tonight: %d litres\\n", water_tonight);\n    printf("Full sols left: %d\\n", sols_left);\n    return 0;\n}\n',
      caption: 'Each line builds on the one before. Run it.',
      challenge: 'Hal cuts the ration to 15 litres per person. Change one number and run it: how many sols now?',
    },
    {
      kind: 'check',
      question: 'Which symbol multiplies in C?',
      options: ['x', '*', '×'],
      answer: 1,
      explanation: 'C uses * for multiply. x would be read as a variable called x.',
    },
  ],
  apply: {
    scenario: 'Sol 2, 10:00. Hal\'s three numbers.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the symbol to what it does.',
        pairs: [
          ['+', 'Add'],
          ['-', 'Subtract'],
          ['*', 'Multiply'],
          ['/', 'Divide'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int crew = 4;\nint per_person = 18;\nprintf("%d\\n", crew * per_person);',
        language: 'c',
        options: [
          { text: '22', why: '* multiplies: 4 times 18.' },
          { text: '72' },
          { text: '418', why: 'C doesn\'t join digits. 4 * 18 is 72.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Store crew_count * litres_per_person in a variable daily_use and print Daily use: 72',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int crew_count = 4;\n    int litres_per_person = 18;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int crew_count = 4;\n    int litres_per_person = 18;\n    int daily_use = crew_count * litres_per_person;\n    printf("Daily use: %d\\n", daily_use);\n    return 0;\n}\n',
        hint: 'int daily_use = crew_count * litres_per_person; then print it.',
        checks: [
          { message: 'Print Daily use: 72', outputIncludes: 'Daily use: 72' },
          { message: 'Store it in daily_use', codeIncludes: 'int daily_use' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Work out the water left after tonight.',
        template: 'int water_tonight = water_litres [[1]] daily_use;',
        blanks: [['-']],
        distractors: ['+', '*', '/'],
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int water = 1608;\nint daily = 72;\nprintf("%d\\n", water / daily);',
        language: 'c',
        options: [
          { text: '22.33', why: 'Two ints divide to a whole number. The .33 is dropped.' },
          { text: '22' },
          { text: '23', why: 'C doesn\'t round up: it drops the fraction.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line is wrong?',
        lines: ['int crew = 4;', 'int ration = 18;', 'int daily = crew x ration;'],
        bug: 2,
        fix: 'int daily = crew * ration;',
        explanation: 'Multiply is * in C. C reads x as a name, and there\'s no variable called x.',
        language: 'c',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the calculation in an order that works (each line needs the one before).',
        lines: ['int crew = 4;', 'int daily = crew * 18;', 'int left = 1680 - daily;', 'printf("%d\\n", left);'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'Why not work it out on paper and type the answer in?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Because the tank and the ration change. The board redoes the maths every time; paper doesn\'t.' },
          { text: 'C can\'t print numbers typed by hand.', why: 'It can. The point is that typed answers go stale.' },
          { text: 'Paper is against mission rules.', why: 'Hal loves paper. The point is the numbers change.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does printf("%d\\n", 100 - 28); print?',
        answers: ['72'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'From water_litres = 1680, crew_count = 4 and litres_per_person = 18, print Left tonight: 1608 and Full sols left: 22, with the board doing all the maths.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int water_litres = 1680;\n    int crew_count = 4;\n    int litres_per_person = 18;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int water_litres = 1680;\n    int crew_count = 4;\n    int litres_per_person = 18;\n    int daily_use = crew_count * litres_per_person;\n    int water_tonight = water_litres - daily_use;\n    int sols_left = water_tonight / daily_use;\n    printf("Left tonight: %d\\n", water_tonight);\n    printf("Full sols left: %d\\n", sols_left);\n    return 0;\n}\n',
        hint: 'daily_use first, then water_tonight = water_litres - daily_use, then sols_left = water_tonight / daily_use.',
        checks: [
          { message: 'Print Left tonight: 1608', outputIncludes: 'Left tonight: 1608' },
          { message: 'Print Full sols left: 22', outputIncludes: 'Full sols left: 22' },
          { message: 'Divide to get the sols', codeIncludes: '/' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Hal\'s question was really three small calculations in a row. What everyday question do you answer in steps like that (a budget, a trip, a recipe for more people)?',
    starters: ['A question I answer in steps is...', 'The steps are...'],
  },
  notes: 'Arithmetic operators: ISO C 6.5.5-6.5.6. Integer division truncates toward zero (6.5.5p6). Story figures are fictional.',
};

export default lesson;
