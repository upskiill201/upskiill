import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Walkthrough: the three parts of a while loop, traced step by step. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'while loops',
  summary: 'Sol 4, 08:40. The rover starts at 100% charge and uses 7% per kilometre. Ines writes a loop that drives it, kilometre by kilometre, until the battery says stop.',
  minutes: 12,
  outcomes: [
    'Name the three parts every while loop needs: start, condition, step',
    'Loop on a condition that isn\'t just a counter',
    'Trace a while loop step by step',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Driving on the battery',
      steps: [
        {
          title: 'The start',
          body: 'Set things up before the loop: the battery is full, no distance driven yet.',
          code: 'int battery = 100;\nint km = 0;',
          language: 'c',
        },
        {
          title: 'The condition',
          body: 'Keep driving while there\'s enough charge for another kilometre plus a 30% safety margin. It\'s checked before every repeat.',
          code: 'while (battery - 7 >= 30) {',
          language: 'c',
        },
        {
          title: 'The body, and the step',
          body: 'Drive one kilometre. The step is the line that moves things towards the end: the battery goes down. Without it, the condition never changes.',
          code: '    km++;\n    battery -= 7;\n    printf("km %d: %d%%\\n", km, battery);\n}',
          language: 'c',
        },
        {
          title: 'After the loop',
          body: 'The first time the condition is false, C skips the body and carries on after the closing brace.',
          code: 'printf("Turn back at km %d\\n", km);',
          language: 'c',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Kilometre by kilometre',
      code: '#include <stdio.h>\n\nint main(void) {\n    int battery = 100;\n    int km = 0;\n\n    while (battery - 7 >= 30) {\n        km++;\n        battery -= 7;\n        printf("km %d: %d%%\\n", km, battery);\n    }\n    printf("Turn back at km %d\\n", km);\n    return 0;\n}\n',
      caption: 'Run it and count the kilometres before the margin says stop.',
      challenge: 'The canyon road is bumpy: 9% per km. Change both 7s. Where does Mateus turn back now?',
    },
  ],
  apply: {
    scenario: 'Sol 4, 08:40. Driving on the battery.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of a while loop to its job.',
        pairs: [
          ['Start', 'Set up before the loop'],
          ['Condition', 'Checked before every repeat'],
          ['Step', 'Moves towards the end'],
          ['Body', 'The work done each time'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When is a while loop\'s condition checked?',
        options: [
          { text: 'Before every run of the body, including the first' },
          { text: 'Only once, at the start', why: 'It\'s checked again before every repeat.' },
          { text: 'After the loop ends', why: 'After it\'s false, the loop is over. It\'s checked before each repeat.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many times does the body run?',
        code: 'int battery = 20;\nwhile (battery >= 30) {\n    battery -= 7;\n}',
        language: 'c',
        options: [
          { text: 'Once', why: 'The condition is checked first: 20 >= 30 is false, so the body never runs.' },
          { text: 'Zero times' },
          { text: 'Forever', why: 'It never starts, so it can\'t run forever.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Start the battery at 100. While it\'s above 50, take away 15 and print the new level. Expected: 85, 70, 55, 40 on separate lines.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int battery = 100;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int battery = 100;\n    while (battery > 50) {\n        battery -= 15;\n        printf("%d\\n", battery);\n    }\n    return 0;\n}\n',
        hint: 'while (battery > 50) { battery -= 15; printf(...); }',
        checks: [
          { message: 'Print 85, 70, 55, 40', outputEquals: '85\n70\n55\n40' },
          { message: 'Use while', codeIncludes: 'while (' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the loop together.',
        lines: ['int km = 0;', 'while (km < 3) {', '    km++;', '    printf("km %d\\n", km);', '}'],
        language: 'c',
      },
      {
        kind: 'findBug',
        prompt: 'The loop runs forever. Which line is wrong?',
        lines: ['int battery = 100;', 'while (battery > 30) {', '    battery += 7;', '    printf("%d\\n", battery);', '}'],
        bug: 2,
        fix: '    battery -= 7;',
        explanation: 'The step goes the wrong way: the battery goes UP, so it never drops to 30.',
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'Count the kilometres while the battery is at least 30.',
        template: 'while (battery [[1]] 30) {\n    km[[2]];\n    battery -= 7;\n}',
        blanks: [['>='], ['++']],
        distractors: ['<', '--'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'Why stop at 30%? There\'s still charge left!',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'C can\'t count below 30.', why: 'It can. 30 is Hal\'s safety rule, written as the condition.' },
          { text: 'It\'s random.', why: 'It\'s deliberate: the loop stops while there\'s still enough to return.' },
          { text: 'You have to drive back. The margin is the condition that brings you home.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The part of a loop that moves it towards the end (like battery -= 7) is called the ___. One word.',
        answers: ['step', 'update', 'increment', 'decrement'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Battery 100, 7% per km, margin 30% (keep going while battery - 7 >= 30). Print only the last line: Turn back at km 10',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int battery = 100;\n    int km = 0;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int battery = 100;\n    int km = 0;\n    while (battery - 7 >= 30) {\n        km++;\n        battery -= 7;\n    }\n    printf("Turn back at km %d\\n", km);\n    return 0;\n}\n',
        hint: 'Loop without printing inside; print once after the loop.',
        checks: [
          { message: 'Print Turn back at km 10', outputEquals: 'Turn back at km 10' },
          { message: 'Use the safety margin', codeIncludes: '>= 30' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Mateus\'s loop stops while there\'s still charge, to get home. Where do you keep a safety margin (phone battery, money, time before a train)?',
    starters: ['I keep a margin for...', 'Without it...'],
  },
  notes: 'Rover consumption is fictional. 100 - 7*10 = 30, so after km 10 the next km would leave 23 < 30: loop stops at km 10.',
};

export default lesson;
