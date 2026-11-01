import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 16. Chat with Tey: tracking the highest and lowest values as a loop goes. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Highest and lowest',
  summary: 'Sol 4, 21:00. Tomoko wants the day\'s hottest and coldest GreenHab readings. The board saw every one, but kept none. Ines learns to remember the best so far, as the readings go by.',
  minutes: 11,
  outcomes: [
    'Track the highest (or lowest) value seen so far in a loop',
    'Start "best so far" from the first value, not from 0',
    'Remember where the highest value was, too',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Readings arrive one at a time and you can\'t go back. How would you find the highest?', replies: ['Remember the biggest so far?'] },
        { tey: 'Exactly. Keep a variable called highest. For every new reading: if it beats highest, it becomes the new highest. When the loop ends, highest is the answer.', replies: ['What do I start highest at?'] },
        { tey: 'The tempting answer is 0. But if every reading is negative, like a cold night outside, 0 would win and it was never even a reading.', replies: ['So what then?'] },
        { tey: 'Start from the first reading itself. Read it before the loop, set highest = lowest = first, then loop over the rest. Now the answer is always a real reading.', replies: ['And if I want WHEN it happened?'] },
        { tey: 'Keep a second variable, like highest_hour, and update it in the same if. Whenever highest changes, so does its hour.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Hottest and coldest',
      code: '#include <stdio.h>\n\nint main(void) {\n    int temp_c;\n    scanf("%d", &temp_c);\n    int highest = temp_c;\n    int lowest = temp_c;\n\n    for (int hour = 2; hour <= 6; hour++) {\n        scanf("%d", &temp_c);\n        if (temp_c > highest) {\n            highest = temp_c;\n        }\n        if (temp_c < lowest) {\n            lowest = temp_c;\n        }\n    }\n    printf("Highest: %d C\\n", highest);\n    printf("Lowest: %d C\\n", lowest);\n    return 0;\n}\n',
      caption: 'Six hourly readings are given. Run it.',
      challenge: 'Add a variable highest_hour that remembers which hour was hottest.',
      stdin: ['19 21 24 26 23 20'],
    },
  ],
  apply: {
    scenario: 'Sol 4, 21:00. The hottest hour.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is starting highest at 0 risky?',
        options: [
          { text: 'If every reading is negative, 0 wins, though it was never a reading' },
          { text: 'C doesn\'t allow 0', why: '0 is a fine value; it\'s just a wrong starting guess here.' },
          { text: 'It makes the loop slower', why: 'Speed isn\'t the issue; correctness is.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The readings are 4 9 2 7. What prints?',
        code: 'scanf("%d", &x);\nint best = x;\nfor (int i = 0; i < 3; i++) {\n    scanf("%d", &x);\n    if (x > best) {\n        best = x;\n    }\n}\nprintf("%d\\n", best);',
        language: 'c',
        options: [
          { text: '7', why: '7 is the last value, but 9 was bigger.' },
          { text: '9' },
          { text: '4', why: 'best is updated when 9 arrives.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Read 6 readings (given). Print Highest: 26 C using a "best so far" variable that starts at the first reading.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int temp_c;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int temp_c;\n    scanf("%d", &temp_c);\n    int highest = temp_c;\n    for (int i = 2; i <= 6; i++) {\n        scanf("%d", &temp_c);\n        if (temp_c > highest) {\n            highest = temp_c;\n        }\n    }\n    printf("Highest: %d C\\n", highest);\n    return 0;\n}\n',
        hint: 'Read the first one before the loop, then loop over the other 5.',
        stdin: ['19 21 24 26 23 20'],
        checks: [
          { message: 'Print Highest: 26 C', outputIncludes: 'Highest: 26 C' },
          { message: 'Compare with >', codeIncludes: '> highest' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The GreenHab readings are all between 19 and 26, but the board says the lowest is 0. Which line?',
        lines: ['int lowest = 0;', 'for (int i = 0; i < 6; i++) {', '    scanf("%d", &t);', '    if (t < lowest) {', '        lowest = t;', '    }', '}'],
        bug: 0,
        fix: 'Read the first value and start lowest from it.',
        explanation: 'No reading is below 0, so lowest never changes from its start value. Start from a real reading instead.',
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'Readings: 19 21 24 26 23 20. After each reading, does "highest" change?',
        groups: ['Changes', 'Stays the same'],
        items: [
          { text: '21', group: 0 },
          { text: '24', group: 0 },
          { text: '26', group: 0 },
          { text: '23', group: 1 },
          { text: '20', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Track the lowest reading.',
        template: 'if (temp_c [[1]] lowest) {\n    lowest [[2]] temp_c;\n}',
        blanks: [['<'], ['=']],
        distractors: ['>', '=='],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'Can I get the hottest hour, not just the temperature?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'No, the loop forgets the hour.', why: 'Save it at the moment the new highest is found.' },
          { text: 'Only with a second loop.', why: 'One loop can track both the value and its hour.' },
          { text: 'Yes: a second variable, hottest_hour, set in the same if that updates highest.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Readings 5, -3, 8, -7, 2. What is the lowest?',
        answers: ['-7', 'minus 7', 'negative 7'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its role.',
        pairs: [
          ['int highest = first;', 'Start from a real reading'],
          ['if (t > highest)', 'Is this a new record?'],
          ['highest = t;', 'Remember the new record'],
          ['highest_hour = hour;', 'Remember when it happened'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Read 6 hourly readings (given; hour 1 to 6). Print Hottest: 26 C at hour 4.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int temp_c;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int temp_c;\n    scanf("%d", &temp_c);\n    int highest = temp_c;\n    int highest_hour = 1;\n    for (int hour = 2; hour <= 6; hour++) {\n        scanf("%d", &temp_c);\n        if (temp_c > highest) {\n            highest = temp_c;\n            highest_hour = hour;\n        }\n    }\n    printf("Hottest: %d C at hour %d\\n", highest, highest_hour);\n    return 0;\n}\n',
        hint: 'Start highest_hour at 1 (the first reading), and update it with highest.',
        stdin: ['19 21 24 26 23 20'],
        checks: [
          { message: 'Print Hottest: 26 C at hour 4', outputIncludes: 'Hottest: 26 C at hour 4' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Keeping "the best so far" is how you\'d find your fastest run or cheapest price. What record do you keep in your head, and how do you update it?',
    starters: ['A record I keep is...', 'I update it when...'],
  },
  notes: 'Running maximum/minimum pattern. Readings fictional.',
};

export default lesson;
