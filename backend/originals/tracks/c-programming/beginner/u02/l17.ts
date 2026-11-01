import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 17. Chat with Tey: precedence of * / % over + -, left to right, brackets. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Order of operations',
  summary: 'Sol 2, 23:00. Ines averages the morning and evening temperatures: 18 + 24 / 2. The board says 30. The GreenHab was never 30 degrees.',
  minutes: 10,
  outcomes: [
    'Predict the order C works out a calculation',
    'Use brackets to make C do what you mean',
    'Spot the classic average bug',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: '18 + 24 / 2 gave 30. What do you think C did first?', replies: ['18 + 24?', 'The division?'] },
        { tey: 'The division. Just like school maths: *, / and % happen before + and -. So C did 24 / 2 = 12, then 18 + 12 = 30.', replies: ['So how do I get the average?'] },
        { tey: 'Brackets. Anything inside ( ) is worked out first: (18 + 24) / 2 is 42 / 2, which is 21. Exactly what you meant.', replies: ['What about two of the same kind?'] },
        { tey: 'Same level, left to right. 20 - 5 - 3 is (20 - 5) - 3 = 12, not 20 - (5 - 3).', replies: ['Should I just add brackets everywhere?'] },
        { tey: 'Wherever it helps a human read it. Brackets that match what C would do anyway cost nothing, and they stop the next person guessing.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The average, two ways',
      code: '#include <stdio.h>\n\nint main(void) {\n    int morning_c = 18;\n    int evening_c = 24;\n\n    printf("Without brackets: %d\\n", morning_c + evening_c / 2);\n    printf("With brackets:    %d\\n", (morning_c + evening_c) / 2);\n    return 0;\n}\n',
      caption: 'Run it and compare the two lines.',
      challenge: 'Add a noon reading of 21 and average all three with brackets.',
    },
  ],
  apply: {
    scenario: 'Sol 2, 23:00. The 30-degree mistake.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In 18 + 24 / 2, what does C work out first?',
        options: [
          { text: '18 + 24', why: 'Division comes before addition unless brackets say otherwise.' },
          { text: '24 / 2' },
          { text: 'It goes strictly left to right', why: 'Left to right only applies between operators of the same level.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each expression to its value.',
        pairs: [
          ['2 + 3 * 4', '14'],
          ['(2 + 3) * 4', '20'],
          ['20 - 5 - 3', '12'],
          ['10 / 2 * 5', '25'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the average so it prints Average: 21',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int morning_c = 18;\n    int evening_c = 24;\n    printf("Average: %d\\n", morning_c + evening_c / 2);\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int morning_c = 18;\n    int evening_c = 24;\n    printf("Average: %d\\n", (morning_c + evening_c) / 2);\n    return 0;\n}\n',
        hint: 'Put brackets round the addition.',
        checks: [
          { message: 'Print Average: 21', outputIncludes: 'Average: 21' },
          { message: 'Use brackets', codeIncludes: '(morning_c + evening_c)' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("%d\\n", 100 - 20 % 6);',
        language: 'c',
        options: [
          { text: '2', why: '% happens before -, so it\'s 100 - (20 % 6).' },
          { text: '98' },
          { text: '80', why: '20 % 6 is 2, not 20.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which happens first in each expression?',
        groups: ['The * or /', 'The + or -'],
        items: [
          { text: 'a + b * c', group: 0 },
          { text: '(a + b) * c', group: 1 },
          { text: 'a - b / c', group: 0 },
          { text: '(a - b) / c', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Water per person per sol should be (water - reserve) divided by crew. Which line is wrong?',
        lines: ['int water = 1610;', 'int reserve = 400;', 'int crew = 4;', 'int each = water - reserve / crew;'],
        bug: 3,
        fix: 'int each = (water - reserve) / crew;',
        explanation: 'Without brackets C does reserve / crew first. Brackets make the subtraction happen first.',
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'Average three readings correctly.',
        template: 'int average = [[1]]a + b + c[[2]] / 3;',
        blanks: [['('], [')']],
        distractors: ['[', '{'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'So the GreenHab wasn\'t really 30 degrees?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'No: the board divided before adding. With brackets it\'s 21, which matches your thermometer.' },
          { text: 'It was, briefly.', why: 'Nothing heated up. The calculation was in the wrong order.' },
          { text: 'C can\'t average numbers.', why: 'It can, with brackets in the right place.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does (6 + 4) * 3 give?',
        answers: ['30'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Average three readings 18, 21 and 24 (morning, noon, evening) and print Average: 21. Use brackets.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int morning_c = 18;\n    int noon_c = 21;\n    int evening_c = 24;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int morning_c = 18;\n    int noon_c = 21;\n    int evening_c = 24;\n    printf("Average: %d\\n", (morning_c + noon_c + evening_c) / 3);\n    return 0;\n}\n',
        hint: '(morning_c + noon_c + evening_c) / 3',
        checks: [
          { message: 'Print Average: 21', outputIncludes: 'Average: 21' },
          { message: 'Add all three inside brackets', codeIncludes: '(morning_c + noon_c + evening_c)' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'The board did exactly what Ines wrote, not what she meant. When has something you said been taken more literally than you meant?',
    starters: ['Once, I said...', 'What I meant was...'],
  },
  notes: 'Operator precedence and left-to-right associativity of multiplicative and additive operators: ISO C 6.5.5-6.5.6 (grammar).',
};

export default lesson;
