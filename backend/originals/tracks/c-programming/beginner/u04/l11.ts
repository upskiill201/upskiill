import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 11. Walkthrough: break leaves a loop early, e.g. at the first reading over a limit. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'break: stop early',
  summary: 'Sol 4, 17:00. The rover logged its battery temperature every minute. Hal only wants one thing: the first minute it went over 45 °C. No point reading the rest once it\'s found.',
  minutes: 11,
  outcomes: [
    'Leave a loop early with break',
    'Find the first value that matches a condition',
    'Know what happens after break: the loop ends, the program carries on',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Finding the first hot minute',
      steps: [
        {
          title: 'Loop over the readings',
          body: 'Ten readings, one a minute. A for loop reads them in order.',
          code: 'for (int minute = 1; minute <= 10; minute++) {\n    scanf("%d", &temp_c);',
          language: 'c',
        },
        {
          title: 'Check each one',
          body: 'Is this the first reading over 45?',
          code: '    if (temp_c > 45) {\n        printf("First over 45 at minute %d\\n", minute);',
          language: 'c',
        },
        {
          title: 'break: stop right here',
          body: 'break jumps straight out of the loop: no more readings, no more checks. C carries on with whatever comes after the loop\'s closing brace.',
          code: '        break;\n    }\n}',
          language: 'c',
        },
        {
          title: 'Only the first',
          body: 'Without break, every hot minute after it would print too. break makes "the first one" mean exactly one.',
          code: '// minutes 6, 7 and 8 were also hot,\n// but only minute 6 is reported',
          language: 'c',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The first hot minute',
      code: '#include <stdio.h>\n\nint main(void) {\n    int temp_c;\n\n    for (int minute = 1; minute <= 10; minute++) {\n        scanf("%d", &temp_c);\n        if (temp_c > 45) {\n            printf("First over 45 at minute %d (%d C)\\n", minute, temp_c);\n            break;\n        }\n    }\n    printf("Search done\\n");\n    return 0;\n}\n',
      caption: 'Ten readings are given as input. Run it.',
      challenge: 'Remove the break. How many lines print now?',
      stdin: ['38 40 41 43 44 47 49 46 42 39'],
    },
  ],
  apply: {
    scenario: 'Sol 4, 17:00. The hot battery.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does break do inside a loop?',
        options: [
          { text: 'Leaves the loop straight away' },
          { text: 'Ends the whole program', why: 'Only the loop ends. The program carries on after it.' },
          { text: 'Skips to the next round', why: 'That\'s continue, next lesson.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'for (int i = 1; i <= 5; i++) {\n    if (i == 3) {\n        break;\n    }\n    printf("%d ", i);\n}\nprintf("end");',
        language: 'c',
        options: [
          { text: '1 2 3 end', why: 'break happens before printing 3.' },
          { text: '1 2 end' },
          { text: '1 2 4 5 end', why: 'break stops the loop; it doesn\'t skip one round.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Read up to 8 battery levels (given). Print the first one below 20 as Low at reading 5: 18 and stop the loop.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int level;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int level;\n    for (int i = 1; i <= 8; i++) {\n        scanf("%d", &level);\n        if (level < 20) {\n            printf("Low at reading %d: %d\\n", i, level);\n            break;\n        }\n    }\n    return 0;\n}\n',
        hint: 'Inside the loop: read, then if (level < 20) { printf...; break; }',
        stdin: ['60 51 42 31 18 12 9 5'],
        checks: [
          { message: 'Print Low at reading 5: 18', outputIncludes: 'Low at reading 5: 18' },
          { message: 'Only report the first', outputEquals: '60 51 42 31 18 12 9 5\nLow at reading 5: 18' },
          { message: 'Use break', codeIncludes: 'break;' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'It should only report the FIRST hot minute, but reports three. What\'s missing after the printf?',
        lines: ['for (int m = 1; m <= 10; m++) {', '    scanf("%d", &t);', '    if (t > 45) {', '        printf("Hot at %d\\n", m);', '    }', '}'],
        bug: 3,
        fix: '        printf("Hot at %d\\n", m);\n        break;',
        explanation: 'Without break the loop keeps going and reports every hot minute.',
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does each job need break?',
        groups: ['Stop at the first match: break', 'Look at every value: no break'],
        items: [
          { text: 'The first minute over 45 °C', group: 0 },
          { text: 'The total energy used', group: 1 },
          { text: 'Whether ANY sample is over 5 kg', group: 0 },
          { text: 'How many samples there are', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Stop at the first reading over the limit.',
        template: 'if (reading > limit) {\n    printf("Found it\\n");\n    [[1]];\n}',
        blanks: [['break']],
        distractors: ['continue', 'return', 'stop'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'If none of the readings are hot, what does your program print?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'It crashes.', why: 'The loop simply runs all ten rounds without breaking.' },
          { text: 'It prints the last reading.', why: 'Only readings over 45 are printed, and none are.' },
          { text: 'Just "Search done". The if never runs, the loop finishes normally, and it carries on.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which keyword leaves a loop immediately?',
        answers: ['break'],
        placeholder: 'A keyword',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what you write to what happens.',
        pairs: [
          ['break', 'The loop ends now'],
          ['The loop\'s condition becomes false', 'The loop ends normally'],
          ['return 0;', 'main ends: the whole program stops'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Read 10 temperatures (given). Print the minute of the first one over 45, as Hot at minute 6. If none is over 45, print No overheating.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int temp_c;\n    int hot_minute = 0;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int temp_c;\n    int hot_minute = 0;\n    for (int minute = 1; minute <= 10; minute++) {\n        scanf("%d", &temp_c);\n        if (temp_c > 45) {\n            hot_minute = minute;\n            break;\n        }\n    }\n    if (hot_minute > 0) {\n        printf("Hot at minute %d\\n", hot_minute);\n    } else {\n        printf("No overheating\\n");\n    }\n    return 0;\n}\n',
        hint: 'Remember the minute in hot_minute, break, and decide after the loop.',
        stdin: ['38 40 41 43 44 47 49 46 42 39'],
        checks: [
          { message: 'Print Hot at minute 6', outputIncludes: 'Hot at minute 6' },
          { message: 'Use break', codeIncludes: 'break;' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'When you look for your keys, you stop as soon as you find them. What else do you search for where the first match is all you need?',
    starters: ['I stop searching when...', 'Another example is...'],
  },
  notes: 'break statement: ISO C 6.8.6.3 (terminates the innermost enclosing loop or switch). Readings fictional.',
};

export default lesson;
