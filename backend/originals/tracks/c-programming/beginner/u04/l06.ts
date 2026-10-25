import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Tap to explore: the accumulator pattern: a total that grows inside a loop. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Adding it all up',
  summary: 'Sol 4, 12:15. Mateus radios in the weight of every rock sample as he bags it. Tomoko wants the total before he leaves the canyon: the rover can carry 25 kg. Ines needs a number that grows inside a loop.',
  minutes: 12,
  outcomes: [
    'Add values up with an accumulator: total += value inside a loop',
    'Start the total at 0, outside the loop',
    'Read a fixed number of values and total them',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Totalling the samples',
      text: 'double total_kg = 0;\n\nfor (int i = 1; i <= 5; i++) {\n    double sample_kg;\n    scanf("%lf", &sample_kg);\n    total_kg += sample_kg;\n}\n\nprintf("Total: %.1f kg\\n", total_kg);',
      hotspots: [
        { phrase: 'double total_kg = 0;', note: 'The accumulator. It starts at 0, BEFORE the loop. Start it inside the loop and it would reset every time.' },
        { phrase: 'for (int i = 1; i <= 5; i++) {', note: 'Five samples, so the loop runs five times.' },
        { phrase: 'scanf("%lf", &sample_kg);', note: 'Each time round, read one more sample weight.' },
        { phrase: 'total_kg += sample_kg;', note: 'The heart of the pattern: add this value to everything so far. After five rounds, total_kg holds the sum of all five.' },
        { phrase: 'printf("Total: %.1f kg\\n", total_kg);', note: 'After the loop, not inside: print the finished total once.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Five rock samples',
      code: '#include <stdio.h>\n\nint main(void) {\n    double total_kg = 0;\n\n    for (int i = 1; i <= 5; i++) {\n        double sample_kg;\n        scanf("%lf", &sample_kg);\n        total_kg += sample_kg;\n    }\n    printf("Total: %.1f kg\\n", total_kg);\n    return 0;\n}\n',
      caption: 'The five weights are given as input. Run it.',
      challenge: 'Also print the average weight: total_kg / 5.',
      stdin: ['3.2', '4.5', '2.8', '5.1', '3.9'],
    },
  ],
  apply: {
    scenario: 'Sol 4, 12:15. The sample weights.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where should total = 0 go?',
        options: [
          { text: 'Before the loop' },
          { text: 'Inside the loop', why: 'Then it resets to 0 every time round, and only the last value counts.' },
          { text: 'After the loop', why: 'Too late: the loop has already added to garbage.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int total = 0;\nfor (int i = 1; i <= 4; i++) {\n    total += i;\n}\nprintf("%d\\n", total);',
        language: 'c',
        options: [
          { text: '4', why: 'It adds 1 + 2 + 3 + 4.' },
          { text: '10' },
          { text: '1234', why: 'C adds the numbers; it doesn\'t join digits.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Read 4 sample weights (given: 3.2 4.5 2.8 5.1) and print Total: 15.6 kg',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    double total_kg = 0;\n    for (int i = 0; i < 4; i++) {\n        double sample_kg;\n        scanf("%lf", &sample_kg);\n        total_kg += sample_kg;\n    }\n    printf("Total: %.1f kg\\n", total_kg);\n    return 0;\n}\n',
        hint: 'total_kg = 0 before the loop; inside, scanf then total_kg += sample_kg.',
        stdin: ['3.2', '4.5', '2.8', '5.1'],
        checks: [
          { message: 'Print Total: 15.6 kg', outputIncludes: 'Total: 15.6 kg' },
          { message: 'Use +=', codeIncludes: '+=' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The total is always just the last sample. Which line is in the wrong place?',
        lines: ['for (int i = 0; i < 5; i++) {', '    double total_kg = 0;', '    double sample_kg;', '    scanf("%lf", &sample_kg);', '    total_kg += sample_kg;', '}'],
        bug: 1,
        fix: 'Move double total_kg = 0; above the for line.',
        explanation: 'Inside the loop, the total is reset to 0 every time round, so it only ever holds one sample.',
        language: 'c',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the accumulator program in order.',
        lines: ['int total = 0;', 'for (int i = 1; i <= 3; i++) {', '    total += i * 10;', '}', 'printf("%d\\n", total);'],
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'Total the litres used over 7 sols.',
        template: 'int total_litres = [[1]];\nfor (int sol = 1; sol <= 7; sol++) {\n    total_litres [[2]] 72;\n}',
        blanks: [['0'], ['+=']],
        distractors: ['1', '='],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'Can the same loop also count how many samples there were?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'No, one loop can only total one thing.', why: 'A loop body can update as many variables as you like.' },
          { text: 'Only with a second loop.', why: 'One loop can keep a total and a count at the same time.' },
          { text: 'Yes: a second accumulator, count = 0 before the loop and count++ inside.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'An accumulator adds 5 each time for 6 rounds, starting at 0. What does it end at?',
        answers: ['30'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its job in the pattern.',
        pairs: [
          ['total = 0', 'Start the total empty'],
          ['total += value', 'Add this value to the rest'],
          ['printf after the loop', 'Report the finished total'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Read 5 sample weights (given). Print Total: 19.5 kg, then Over the limit if the total is over 25, otherwise Within the limit.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    double total_kg = 0;\n    for (int i = 0; i < 5; i++) {\n        double sample_kg;\n        scanf("%lf", &sample_kg);\n        total_kg += sample_kg;\n    }\n    printf("Total: %.1f kg\\n", total_kg);\n    if (total_kg > 25) {\n        printf("Over the limit\\n");\n    } else {\n        printf("Within the limit\\n");\n    }\n    return 0;\n}\n',
        hint: 'Total in the loop, decide after it.',
        stdin: ['3.2', '4.5', '2.8', '5.1', '3.9'],
        checks: [
          { message: 'Print Total: 19.5 kg', outputIncludes: 'Total: 19.5 kg' },
          { message: 'Print Within the limit', outputIncludes: 'Within the limit' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Accumulators are everywhere: a step counter, a shopping total, a savings jar. Which running total in your life would you most like a program to keep?',
    starters: ['I\'d like to track...', 'I\'d check it...'],
  },
  notes: 'Accumulator pattern. 3.2+4.5+2.8+5.1 = 15.6; +3.9 = 19.5. Rover payload limit fictional.',
};

export default lesson;
