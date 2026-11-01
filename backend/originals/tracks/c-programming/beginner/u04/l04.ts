import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Before / After: a counting while loop rewritten as a for loop. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'for loops',
  summary: 'Sol 4, 10:20. Lars\'s code has no counting while loops at all. Every count is a for loop: start, condition and step on one line. Ines rewrites hers and finds them easier to check.',
  minutes: 11,
  outcomes: [
    'Write a counting loop with for',
    'Read the three parts of a for line',
    'Use the standard for (int i = 0; i < n; i++) pattern',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Same loop, two shapes',
      before: {
        label: 'while: the parts are spread out',
        text: 'int minute = 1;\nwhile (minute <= 5) {\n    printf("Minute %d\\n", minute);\n    minute++;\n}',
      },
      after: {
        label: 'for: all three parts on one line',
        text: 'for (int minute = 1; minute <= 5; minute++) {\n    printf("Minute %d\\n", minute);\n}',
      },
      notes: [
        'A for line has three parts separated by semicolons: start; condition; step.',
        'The start runs once. The condition is checked before every repeat. The step runs at the end of every repeat. Exactly like the while version.',
        'With everything on one line, you can check at a glance where a loop starts, stops and how it moves.',
        'The counter declared in the for line (int minute) only exists inside the loop.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'The C way to count',
      code: '#include <stdio.h>\n\nint main(void) {\n    for (int i = 0; i < 5; i++) {\n        printf("Check %d\\n", i);\n    }\n\n    for (int km = 2; km <= 14; km += 2) {\n        printf("Checkpoint km %d\\n", km);\n    }\n    return 0;\n}\n',
      caption: 'The first loop is the most common line in all of C: start at 0, stop before 5. Run it.',
      challenge: 'Change the first loop to count down from 4 to 0.',
    },
  ],
  apply: {
    scenario: 'Sol 4, 10:20. Lars\'s for loops.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'for (int i = 0; i < 5; i++): match each part.',
        pairs: [
          ['int i = 0', 'Start: runs once'],
          ['i < 5', 'Condition: checked before each repeat'],
          ['i++', 'Step: runs after each repeat'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'for (int i = 0; i < 3; i++) {\n    printf("%d ", i);\n}',
        language: 'c',
        options: [
          { text: '1 2 3', why: 'It starts at 0 and stops before 3.' },
          { text: '0 1 2' },
          { text: '0 1 2 3', why: 'i < 3 is false when i is 3, so 3 isn\'t printed.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Use a for loop to print Minute 1 to Minute 5.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    for (int minute = 1; minute <= 5; minute++) {\n        printf("Minute %d\\n", minute);\n    }\n    return 0;\n}\n',
        hint: 'for (int minute = 1; minute <= 5; minute++)',
        checks: [
          { message: 'Print Minute 1 to Minute 5', outputEquals: 'Minute 1\nMinute 2\nMinute 3\nMinute 4\nMinute 5' },
          { message: 'Use for', codeIncludes: 'for (' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t compile?',
        lines: ['for (int i = 0, i < 5, i++) {', '    printf("%d\\n", i);', '}'],
        bug: 0,
        fix: 'for (int i = 0; i < 5; i++) {',
        explanation: 'The three parts of a for line are separated by semicolons, not commas.',
        language: 'c',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a for line that counts 0, 1, 2, 3.',
        tiles: ['for', '(', 'int i = 0;', 'i < 4;', 'i++', ')'],
        distractors: ['i <= 4;', 'i--'],
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'How many times does each loop run?',
        groups: ['3 times', '4 times'],
        items: [
          { text: 'for (int i = 0; i < 3; i++)', group: 0 },
          { text: 'for (int i = 0; i < 4; i++)', group: 1 },
          { text: 'for (int i = 1; i <= 3; i++)', group: 0 },
          { text: 'for (int i = 1; i <= 4; i++)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'for or while? Which is better?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'for, always.', why: 'Loops "until something happens" read more naturally as while.' },
          { text: 'while, always.', why: 'Counting loops are clearer as for: all three parts on one line.' },
          { text: 'for when you\'re counting a known number of times; while when you loop until something happens, like the battery running low.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Count from 10 down to 1.',
        template: 'for (int n = 10; n [[1]] 1; n[[2]]) {\n    printf("%d\\n", n);\n}',
        blanks: [['>='], ['--']],
        distractors: ['<=', '++'],
        language: 'c',
      },
      {
        kind: 'typeAnswer',
        prompt: 'for (int i = 0; i < 10; i++) runs the body how many times?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Use a for loop to print each checkpoint from km 2 to km 14 in steps of 2, as Checkpoint km 2 and so on.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    for (int km = 2; km <= 14; km += 2) {\n        printf("Checkpoint km %d\\n", km);\n    }\n    return 0;\n}\n',
        hint: 'for (int km = 2; km <= 14; km += 2)',
        checks: [
          { message: 'Print the seven checkpoints', outputEquals: 'Checkpoint km 2\nCheckpoint km 4\nCheckpoint km 6\nCheckpoint km 8\nCheckpoint km 10\nCheckpoint km 12\nCheckpoint km 14' },
          { message: 'Use for with += 2', codeIncludes: 'km += 2)' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Lars puts start, stop and step on one line so they\'re easy to check. Where do you like having all the key facts in one place (a ticket, a recipe card)?',
    starters: ['I like it on...', 'It helps because...'],
  },
  notes: 'for statement: ISO C 6.8.5.3; declarations in the first clause since C99, scoped to the loop.',
};

export default lesson;
