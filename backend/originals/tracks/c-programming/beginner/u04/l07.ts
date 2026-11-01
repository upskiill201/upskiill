import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Myth or Fact: off-by-one errors: < vs <=, starting at 0 or 1, fenceposts. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Off by one',
  summary: 'Sol 4, 13:10. The log shows 13 radio calls for a 14 km drive. The battery table is missing its last row. Two bugs, the same cause: a loop that ran one time too few.',
  minutes: 11,
  outcomes: [
    'Spot loops that run one time too many or too few',
    'Choose < or <= to match where you start counting',
    'Count fence posts and gaps correctly',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'for (int i = 0; i < 5; i++) runs 5 times.', isFact: true, explain: 'Fact. i is 0, 1, 2, 3, 4: five values. Start at 0 with <, or start at 1 with <=. Both give 5.' },
        { text: 'for (int i = 1; i < 5; i++) also runs 5 times.', isFact: false, explain: 'Myth. 1, 2, 3, 4: only four. Starting at 1 needs <= 5 to reach five.' },
        { text: 'A 14 km drive with a post every km needs 14 posts.', isFact: false, explain: 'Myth. Posts at 0, 1, 2 ... 14 make 15 posts for 14 gaps. Programmers call this the fencepost problem.' },
        { text: 'Off-by-one errors are among the most common bugs in all of programming.', isFact: true, explain: 'Fact. Loops, ranges and counting from 0 trip up beginners and experts alike. The cure is checking the first and last value of every loop.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Check every loop at its edges: what is the counter the FIRST time the body runs, and the LAST time? Write both down. If either is wrong, the loop is off by one.',
    },
    {
      kind: 'tryIt',
      title: 'Posts and gaps',
      code: '#include <stdio.h>\n\nint main(void) {\n    int posts = 0;\n    for (int km = 0; km <= 14; km++) {\n        posts++;\n    }\n    printf("Marker posts: %d\\n", posts);\n\n    int gaps = 0;\n    for (int km = 0; km < 14; km++) {\n        gaps++;\n    }\n    printf("Gaps between them: %d\\n", gaps);\n    return 0;\n}\n',
      caption: 'Same road, two counts. Run it and see why both are right.',
      challenge: 'Change the first loop to < 14. Which marker goes missing?',
    },
  ],
  apply: {
    scenario: 'Sol 4, 13:10. The missing radio call.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'How many times does each run?',
        groups: ['4 times', '5 times'],
        items: [
          { text: 'for (int i = 0; i < 5; i++)', group: 1 },
          { text: 'for (int i = 1; i < 5; i++)', group: 0 },
          { text: 'for (int i = 1; i <= 5; i++)', group: 1 },
          { text: 'for (int i = 0; i < 4; i++)', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'There should be 14 radio calls, numbered 1 to 14. The log shows 13. Which line?',
        lines: ['for (int call = 1; call < 14; call++) {', '    printf("Radio call %d\\n", call);', '}'],
        bug: 0,
        fix: 'for (int call = 1; call <= 14; call++) {',
        explanation: 'Starting at 1 with < 14 stops at 13. Starting at 1 needs <= 14.',
        language: 'c',
      },
      {
        kind: 'mcq',
        prompt: 'A loop should print km 1 to km 10. Its first value is right (1) but its last is 9. What\'s wrong?',
        options: [
          { text: 'The start: it should be 0', why: 'The first value is already right.' },
          { text: 'The condition: it should be <= 10, not < 10' },
          { text: 'The step: it should be += 2', why: 'Then it would skip numbers.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the loop so it prints Call 1 to Call 4 (four lines).',
        starter: '#include <stdio.h>\n\nint main(void) {\n    for (int call = 1; call < 4; call++) {\n        printf("Call %d\\n", call);\n    }\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    for (int call = 1; call <= 4; call++) {\n        printf("Call %d\\n", call);\n    }\n    return 0;\n}\n',
        hint: 'Check the last value: it must be 4.',
        checks: [
          { message: 'Print Call 1 to Call 4', outputEquals: 'Call 1\nCall 2\nCall 3\nCall 4' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A fence along a 10 m path has a post every metre, including both ends. How many posts?',
        options: [
          { text: '10', why: 'That counts the gaps. Posts at 0 to 10 make 11.' },
          { text: '11' },
          { text: '9', why: 'Both ends have posts: 0 and 10.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the loop to its first and last value.',
        pairs: [
          ['i = 0; i < 3', 'First 0, last 2'],
          ['i = 1; i <= 3', 'First 1, last 3'],
          ['i = 3; i > 0; i--', 'First 3, last 1'],
          ['i = 0; i <= 3', 'First 0, last 3'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'How do I check a loop isn\'t off by one, without running it?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Write down the counter\'s first and last value in the body. If both are what you expect, it\'s right.' },
          { text: 'Count the lines of code.', why: 'Line count says nothing about how many times a loop runs.' },
          { text: 'Always start at 0.', why: 'Starting at 0 is common, but you still have to check the end.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'for (int i = 0; i <= 10; i++) runs how many times?',
        answers: ['11', 'eleven'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Print exactly 5 lines, starting the counter at 0.',
        template: 'for (int i = [[1]]; i [[2]] 5; i++) {\n    printf("Line\\n");\n}',
        blanks: [['0'], ['<']],
        distractors: ['1', '<='],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'The road has a marker post every km from km 0 to km 14, including both ends. Count them with a loop and print Posts: 15',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int posts = 0;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int posts = 0;\n    for (int km = 0; km <= 14; km++) {\n        posts++;\n    }\n    printf("Posts: %d\\n", posts);\n    return 0;\n}\n',
        hint: 'Start at 0, include 14: km <= 14.',
        checks: [
          { message: 'Print Posts: 15', outputIncludes: 'Posts: 15' },
          { message: 'Count with a loop', codeIncludes: 'for (' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Days in a hotel stay vs nights, floors in a building vs stairs between them: where have you been caught out by counting posts instead of gaps?',
    starters: ['I got caught out by...', 'Now I\'d count...'],
  },
  notes: 'Off-by-one and fencepost errors: widely documented (e.g. the "fencepost error" entry in The Jargon File).',
};

export default lesson;
