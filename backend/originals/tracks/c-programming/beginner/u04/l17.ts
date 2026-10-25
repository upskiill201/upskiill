import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 17. Myth or Fact: counting the values that match a condition; percentages from counts. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Counting what matches',
  summary: 'Sol 4, 21:45. How many of today\'s minutes was the CO2 over 1,000? How many samples are over 4 kg? Hal\'s questions all start with "how many". A counter with an if inside the loop answers them all.',
  minutes: 11,
  outcomes: [
    'Count only the values that match a condition',
    'Keep several counters in one loop',
    'Turn a count into a percentage',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'To count matches, put count++ inside an if inside the loop.', isFact: true, explain: 'Fact. The loop visits every value; the if lets only the matching ones bump the counter.' },
        { text: 'You need a separate loop for each thing you count.', isFact: false, explain: 'Myth. One loop can update several counters: high, low and normal readings all in one pass.' },
        { text: 'count_high / count_total * 100 gives the right percentage with ints.', isFact: false, explain: 'Myth. With ints, 3 / 10 is 0, so the result is 0%. Cast first: (double)count_high / count_total * 100.' },
        { text: 'A counter must start at 0 before the loop.', isFact: true, explain: 'Fact. Like any accumulator. Start it inside the loop and it resets every round.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Stuffy minutes',
      code: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm;\n    int high = 0;\n    int total = 0;\n\n    while (scanf("%d", &co2_ppm) == 1) {\n        total++;\n        if (co2_ppm > 1000) {\n            high++;\n        }\n    }\n    printf("%d of %d readings over 1000\\n", high, total);\n    printf("That is %.0f%%\\n", (double)high / total * 100);\n    return 0;\n}\n',
      caption: 'Ten readings are given. Run it.',
      challenge: 'Add a third counter for readings under 600.',
      stdin: ['820 950 1040 1120 990 870 1210 1030 760 940'],
    },
  ],
  apply: {
    scenario: 'Sol 4, 21:45. Hal\'s "how many" questions.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where does count++ go to count only readings over 1000?',
        options: [
          { text: 'Just inside the loop', why: 'Then it counts every reading, not just the high ones.' },
          { text: 'Inside an if (reading > 1000) inside the loop' },
          { text: 'After the loop', why: 'After the loop it would run once, not once per match.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The readings are 5 12 8 15 3. What prints?',
        code: 'int n, big = 0;\nwhile (scanf("%d", &n) == 1) {\n    if (n >= 10) big++;\n}\nprintf("%d\\n", big);',
        language: 'c',
        options: [
          { text: '2' },
          { text: '3', why: 'Only 12 and 15 are 10 or more.' },
          { text: '27', why: 'It counts matches; it doesn\'t add them.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Read sample weights until the input ends (given). Count how many are over 4.0 kg. Print Heavy samples: 3',
        starter: '#include <stdio.h>\n\nint main(void) {\n    double kg;\n    int heavy = 0;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    double kg;\n    int heavy = 0;\n    while (scanf("%lf", &kg) == 1) {\n        if (kg > 4.0) {\n            heavy++;\n        }\n    }\n    printf("Heavy samples: %d\\n", heavy);\n    return 0;\n}\n',
        hint: 'while (scanf(...) == 1) { if (kg > 4.0) heavy++; }',
        stdin: ['3.2 4.5 2.8 5.1 3.9 4.4'],
        checks: [
          { message: 'Print Heavy samples: 3', outputIncludes: 'Heavy samples: 3' },
          { message: 'Count with ++', codeIncludes: 'heavy++' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The percentage always prints 0%. Which line?',
        lines: ['int high = 3;', 'int total = 10;', 'int percent = high / total * 100;', 'printf("%d%%\\n", percent);'],
        bug: 2,
        fix: 'double percent = (double)high / total * 100;',
        explanation: '3 / 10 with ints is 0, and 0 * 100 is 0. Cast to double before dividing.',
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'Readings: 820 950 1040 1120 990. Which count does each go into?',
        groups: ['Over 1000', '1000 or under'],
        items: [
          { text: '820', group: 1 },
          { text: '1040', group: 0 },
          { text: '1120', group: 0 },
          { text: '990', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Count readings in the amber band, 1000 to 2000.',
        template: 'if (co2 >= 1000 [[1]] co2 <= 2000) {\n    amber[[2]];\n}',
        blanks: [['&&'], ['++']],
        distractors: ['||', '--'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'I want how many readings were green, amber and red. Three loops?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Yes, one loop per colour.', why: 'One pass can sort every reading into the right counter.' },
          { text: 'One loop with three counters and an else-if chain: each reading bumps exactly one counter.' },
          { text: 'We can only count one thing at a time.', why: 'A loop body can update as many counters as you like.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '4 of 16 readings were high. What percentage is that? (number only)',
        answers: ['25'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the pattern.',
        pairs: [
          ['How many readings in total?', 'count++ on every round'],
          ['How many over 1000?', 'count++ inside an if'],
          ['What fraction were high?', '(double)high / total'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Read CO2 readings until the input ends (given). Count green (under 1000), amber (1000 to 2000) and red (over 2000). Print Green 5, Amber 4, Red 1',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int co2;\n    int green = 0, amber = 0, red = 0;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int co2;\n    int green = 0, amber = 0, red = 0;\n    while (scanf("%d", &co2) == 1) {\n        if (co2 > 2000) {\n            red++;\n        } else if (co2 >= 1000) {\n            amber++;\n        } else {\n            green++;\n        }\n    }\n    printf("Green %d, Amber %d, Red %d\\n", green, amber, red);\n    return 0;\n}\n',
        hint: 'An else-if chain inside the loop; each branch bumps one counter.',
        stdin: ['820 950 1040 1120 990 870 2210 1030 760 1940'],
        checks: [
          { message: 'Print Green 5, Amber 4, Red 1', outputIncludes: 'Green 5, Amber 4, Red 1' },
        ],
      },
    ],
  },
  reflect: {
    prompt: '"How many" questions are everywhere: how many days I exercised, how many emails I answered. Which count would tell you something useful about your week?',
    starters: ['I\'d count...', 'It would tell me...'],
  },
  notes: 'Counting pattern. Second dataset: 820 950 990 870 760 green (5); 1040 1120 1030 1940 amber (4); 2210 red (1). First dataset: 4 of 10 over 1000 = 40%.',
};

export default lesson;
