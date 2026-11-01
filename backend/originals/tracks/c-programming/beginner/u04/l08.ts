import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Chat with Tey: infinite loops, how to spot them, and a safety limit. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Loops that never end',
  summary: 'Sol 4, 14:00. The board freezes. No output, no response, fans humming. Ines\'s new loop is waiting for the battery to reach exactly 30, and the battery drops 9 at a time: 37, then 28. It never hits 30.',
  minutes: 11,
  outcomes: [
    'Explain what an infinite loop is and why it freezes a program',
    'Find the three usual causes: no step, a step the wrong way, a condition that\'s never false',
    'Prefer < and > to == in loop conditions',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'The board froze. If a loop\'s condition never becomes false, what happens?', replies: ['It keeps going?', 'It crashes?'] },
        { tey: 'It keeps going, forever. That\'s an infinite loop. The program isn\'t broken; it\'s doing exactly what you said, again and again, and never reaches the next line.', replies: ['So why did mine never stop?'] },
        { tey: 'You wrote while (battery != 30). The battery goes 100, 91, 82 ... 37, then 28. It jumped right past 30, and 28 != 30 is still true. So is every number after.', replies: ['How do I avoid that?'] },
        { tey: 'Use < or > instead of == or != in loop conditions: while (battery > 30) stops the moment it passes 30, whether it lands on it or not.', replies: ['Any other causes?'] },
        { tey: 'Two classics: forgetting the step (nothing changes), and stepping the wrong way (battery += 7 when you meant -=). When a program freezes, check those three first. In these lessons the runner stops any program after a few seconds.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A loop with a safety limit',
      code: '#include <stdio.h>\n\nint main(void) {\n    int battery = 100;\n    int rounds = 0;\n\n    while (battery != 30 && rounds < 20) {\n        battery -= 9;\n        rounds++;\n    }\n    printf("Stopped after %d rounds at %d%%\\n", rounds, battery);\n    return 0;\n}\n',
      caption: 'Without the rounds < 20 guard, this would never stop: 100 minus 9s never lands on 30. Run it.',
      challenge: 'Change the condition to battery > 30 and remove the guard. Does it stop on its own now?',
    },
  ],
  apply: {
    scenario: 'Sol 4, 14:00. The frozen board.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is an infinite loop?',
        options: [
          { text: 'A loop that runs very many times', why: 'A loop that runs a million times still ends. Infinite means never.' },
          { text: 'A loop whose condition never becomes false' },
          { text: 'A loop with a compile error', why: 'It compiles fine; it just never stops.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Ends, or runs forever?',
        groups: ['Ends', 'Runs forever'],
        items: [
          { text: 'n = 0; while (n < 5) { n++; }', group: 0 },
          { text: 'n = 0; while (n < 5) { printf("x"); }', group: 1 },
          { text: 'n = 10; while (n > 0) { n++; }', group: 1 },
          { text: 'n = 10; while (n > 0) { n -= 3; }', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The board freezes. Which line causes it?',
        lines: ['int battery = 100;', 'while (battery != 30) {', '    battery -= 9;', '}'],
        bug: 1,
        fix: 'while (battery > 30) {',
        explanation: '100 minus 9s goes 91, 82 ... 37, 28: it never equals 30, so != 30 is true forever. > 30 stops as soon as it passes.',
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the loop so it stops: the battery drops by 9 each round, and the loop should end once it\'s no longer above 30. Print Battery: 28',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int battery = 100;\n    int rounds = 0;\n    while (battery != 30 && rounds < 100) {\n        battery -= 9;\n        rounds++;\n    }\n    printf("Battery: %d\\n", battery);\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int battery = 100;\n    while (battery > 30) {\n        battery -= 9;\n    }\n    printf("Battery: %d\\n", battery);\n    return 0;\n}\n',
        hint: 'Use > 30 instead of != 30. Then the safety counter isn\'t needed.',
        checks: [
          { message: 'Print Battery: 28', outputIncludes: 'Battery: 28' },
          { message: 'Use > 30', codeIncludes: '> 30' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the cause to its fix.',
        pairs: [
          ['No step in the body', 'Add the step, like n++'],
          ['Step goes the wrong way', 'Flip += to -='],
          ['Condition uses != and jumps past', 'Use < or > instead'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A program shows no output and doesn\'t finish. What should you suspect first?',
        options: [
          { text: 'A missing semicolon', why: 'That stops it compiling, with a message. A silent freeze is a loop.' },
          { text: 'A typo in printf', why: 'That would show the typo or a compile error, not a freeze.' },
          { text: 'An infinite loop' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: '(radio) Your board says I\'ve driven 4,000 km. I\'ve driven 9.',
        prompt: 'What\'s Ines\'s best first guess?',
        options: [
          { text: 'The rover is faster than we thought.', why: '4,000 km on one battery is impossible. It\'s the code.' },
          { text: 'A loop that should have stopped kept counting: check its condition and its step.' },
          { text: 'printf is broken.', why: 'printf is fine; the number it was given is wrong.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make this stop as soon as the level is 30 or below.',
        template: 'while (level [[1]] 30) {\n    level [[2]] 9;\n}',
        blanks: [['>'], ['-=']],
        distractors: ['!=', '+='],
        language: 'c',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A loop that never stops is called an ___ loop. One word.',
        answers: ['infinite', 'endless'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Starting at 100 and taking 9 each round, count the rounds until the battery is 30 or below. Print Rounds: 8',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int battery = 100;\n    int rounds = 0;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int battery = 100;\n    int rounds = 0;\n    while (battery > 30) {\n        battery -= 9;\n        rounds++;\n    }\n    printf("Rounds: %d\\n", rounds);\n    return 0;\n}\n',
        hint: 'while (battery > 30) { battery -= 9; rounds++; }',
        checks: [
          { message: 'Print Rounds: 8', outputIncludes: 'Rounds: 8' },
          { message: 'Use a safe condition', codeIncludes: '> 30' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'An infinite loop is a habit with no exit: always "one more episode", "one more scroll". What\'s your own loop that needs a better stopping condition?',
    starters: ['My never-ending loop is...', 'A better stopping condition would be...'],
  },
  notes: '100 - 9k: 91, 82, 73, 64, 55, 46, 37, 28 (8 rounds), never 30. The runner stops programs after a time limit (5 s in the browser).',
};

export default lesson;
