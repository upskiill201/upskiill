import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 11. Walkthrough: x = x + 1, +=, -=, *=, ++ and --. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Changing a value',
  summary: 'Sol 2, 19:30. Every time someone fills a bottle, the water count drops by one litre. Every time a tomato ripens, Tomoko\'s count goes up by one. C has shortcuts for exactly that.',
  minutes: 11,
  outcomes: [
    'Update a variable using its own value: water = water - 2',
    'Use the shortcuts +=, -=, *= and /=',
    'Add or take one with ++ and --',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The water count, through the evening',
      steps: [
        {
          title: 'Use the old value to make the new one',
          body: 'The right side is worked out first, with the current value. Then the result goes back into the same box.',
          code: 'int water = 1610;\nwater = water - 2;   // a kettle: now 1608',
          language: 'c',
        },
        {
          title: 'The shortcut: -=',
          body: 'water -= 2 means exactly water = water - 2. There are matching shortcuts for the other operators: +=, *=, /=.',
          code: 'water -= 2;          // another kettle: 1606\nripe_tomatoes += 3;  // three more ripe',
          language: 'c',
        },
        {
          title: 'One more, one less: ++ and --',
          body: 'Adding or taking exactly 1 is so common it has its own operators. ++ adds one, -- takes one.',
          code: 'ripe_tomatoes++;     // one more ripe\nwater--;             // one litre bottle',
          language: 'c',
        },
        {
          title: 'Doubling and halving',
          body: '*= and /= change a value by multiplying or dividing it.',
          code: 'int solar_panels = 6;\nsolar_panels *= 2;   // 12 panels',
          language: 'c',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'An evening of water',
      code: '#include <stdio.h>\n\nint main(void) {\n    int water = 1610;\n    int ripe_tomatoes = 5;\n\n    water = water - 2;\n    water -= 2;\n    water--;\n    ripe_tomatoes++;\n    ripe_tomatoes += 3;\n\n    printf("Water: %d litres\\n", water);\n    printf("Ripe tomatoes: %d\\n", ripe_tomatoes);\n    return 0;\n}\n',
      caption: 'Predict both numbers before you run it.',
      challenge: 'Mateus fills a 5-litre jug. Add one line using -= and run it again.',
    },
  ],
  apply: {
    scenario: 'Sol 2, 19:30. Keeping counts up to date.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does water -= 2; do?',
        options: [
          { text: 'Sets water to -2', why: 'It takes 2 away from water\'s current value.' },
          { text: 'Takes 2 away from water' },
          { text: 'Checks if water is 2 less', why: 'It changes water; it doesn\'t check anything.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each shortcut to its long form.',
        pairs: [
          ['x += 3;', 'x = x + 3;'],
          ['x -= 3;', 'x = x - 3;'],
          ['x *= 3;', 'x = x * 3;'],
          ['x++;', 'x = x + 1;'],
          ['x--;', 'x = x - 1;'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int tomatoes = 5;\ntomatoes++;\ntomatoes += 2;\nprintf("%d\\n", tomatoes);',
        language: 'c',
        options: [
          { text: '7', why: '5, then ++ makes 6, then += 2 makes 8.' },
          { text: '8' },
          { text: '52', why: 'C adds numbers; it doesn\'t join digits.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Start with water = 1610. Take 2 with -=, then 1 with --. Print Water: 1607',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int water = 1610;\n\n    printf("Water: %d\\n", water);\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int water = 1610;\n    water -= 2;\n    water--;\n    printf("Water: %d\\n", water);\n    return 0;\n}\n',
        hint: 'water -= 2; then water--;',
        checks: [
          { message: 'Print Water: 1607', outputIncludes: 'Water: 1607' },
          { message: 'Use -=', codeIncludes: '-= 2' },
          { message: 'Use --', codeIncludes: 'water--' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Double the panels, then add one more.',
        template: 'int panels = 6;\npanels [[1]] 2;\npanels[[2]];',
        blanks: [['*='], ['++']],
        distractors: ['+=', '--'],
        language: 'c',
      },
      {
        kind: 'findBug',
        prompt: 'The water count should go down by 2, but it becomes -2. Which line?',
        lines: ['int water = 1610;', 'water = -2;', 'printf("%d\\n", water);'],
        bug: 1,
        fix: 'water -= 2;',
        explanation: 'water = -2 puts -2 in the box. water -= 2 takes 2 away from what\'s there.',
        language: 'c',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the lines in order so it prints 37 (doubling first, then taking 3).',
        lines: ['int water = 20;', 'water *= 2;', 'water -= 3;', 'printf("%d\\n", water);'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'water = water - 1 looks like bad maths. How can water equal itself minus one?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'In C, = isn\'t "equals". It means: work out the right side, then put it in the box on the left.' },
          { text: 'It\'s a trick; it doesn\'t really change anything.', why: 'It does change water: by one less.' },
          { text: 'It only works with ++.', why: 'Any value can go on the right, including water - 1.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'int count = 10; count *= 3; What is count now?',
        answers: ['30'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Tomoko starts the evening with ripe = 5. Two ripen (+=), then one more (++), then she picks 4 for dinner (-=). Print Ripe: 4',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int ripe = 5;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int ripe = 5;\n    ripe += 2;\n    ripe++;\n    ripe -= 4;\n    printf("Ripe: %d\\n", ripe);\n    return 0;\n}\n',
        hint: 'ripe += 2; ripe++; ripe -= 4; then print it.',
        checks: [
          { message: 'Print Ripe: 4', outputIncludes: 'Ripe: 4' },
          { message: 'Use ++', codeIncludes: 'ripe++' },
          { message: 'Use -=', codeIncludes: 'ripe -= 4' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What do you count up or down through the day (steps, cups of coffee, money spent)? Which shortcut would you use for it?',
    starters: ['I count...', 'I\'d use...'],
  },
  deepen: {
    title: 'Where does the name C++ come from?',
    summary: 'C++ is C with more features added. The name is a programmer\'s joke: ++ means "one more than C".',
  },
  notes: 'Compound assignment (ISO C 6.5.16.2) and postfix/prefix increment and decrement (6.5.2.4, 6.5.3.1). C++ name origin: Bjarne Stroustrup\'s FAQ.',
};

export default lesson;
