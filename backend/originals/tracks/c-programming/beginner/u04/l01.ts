import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story opener: the rover traverse; repeating work with a first while loop. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Watching the battery',
  summary: 'Sol 4, 08:00. Mateus drives the rover 14 km to a canyon for rock samples. Someone has to check its battery every minute, all day. Ines is not copying printf 600 times.',
  minutes: 11,
  outcomes: [
    'Explain why programs repeat work with loops',
    'Read the shape of a while loop',
    'Run a short loop and predict how many times it runs',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sol 4, 08:00',
      beats: [
        { speaker: 'narrator', text: 'The electric rover waits outside the airlock. Mateus, suited up, has packed sample bags, a rock hammer and three bags of crisps.' },
        { speaker: 'mateus', text: 'Fourteen kilometres out, fourteen back. The battery\'s good for about forty.' },
        { speaker: 'hal', text: '"About" is a word I don\'t like. Moreau, I want the battery checked every minute he\'s out.' },
        { speaker: 'ines', text: 'That\'s six hundred checks.' },
        { speaker: 'tomoko', text: 'Six hundred printf lines. I\'ll make tea.' },
      ],
      choice: {
        prompt: 'How should Ines check the battery 600 times?',
        options: [
          { text: 'Write the check once, and tell the board to repeat it while the rover is out.', outcome: 'That\'s a loop: one block of code, repeated as long as a condition stays true.', best: true },
          { text: 'Copy the check 600 times.', outcome: 'And if the drive takes 601 minutes? Or the check needs fixing? 600 copies, 600 fixes.' },
          { text: 'Check it by hand every hour instead.', outcome: 'Hal asked for every minute. A loop makes that easy.' },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>A <strong>loop</strong> repeats a block of code. The simplest is <code>while</code>: "while this condition is true, keep doing the block".</p><p><code>int minute = 1;<br>while (minute &lt;= 3) {<br>&nbsp;&nbsp;&nbsp;&nbsp;printf("Minute %d: check battery\\n", minute);<br>&nbsp;&nbsp;&nbsp;&nbsp;minute++;<br>}</code></p><p>It looks like an if, and it starts like one: check the condition, run the block. The difference: at the end of the block, it goes back and checks <strong>again</strong>. It stops the first time the condition is false.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Three minutes of checks',
      code: '#include <stdio.h>\n\nint main(void) {\n    int minute = 1;\n\n    while (minute <= 3) {\n        printf("Minute %d: check battery\\n", minute);\n        minute++;\n    }\n    printf("Checks done\\n");\n    return 0;\n}\n',
      caption: 'One printf in the code, three lines in the output. Run it.',
      challenge: 'Change the 3 to 10. Then to 600, if you\'re curious.',
    },
  ],
  apply: {
    scenario: 'Sol 4, 08:00. The traverse begins.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a loop do?',
        options: [
          { text: 'Runs a block once if a condition is true', why: 'That\'s an if. A loop goes back and runs it again.' },
          { text: 'Repeats a block of code' },
          { text: 'Stops the program', why: 'A loop repeats; it doesn\'t stop the program.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines does this print?',
        code: 'int n = 1;\nwhile (n <= 4) {\n    printf("Check\\n");\n    n++;\n}',
        language: 'c',
        options: [
          { text: '3', why: 'n is 1, 2, 3 and 4 inside the loop: four checks.' },
          { text: '4' },
          { text: '5', why: 'When n reaches 5 the condition is false, so the block doesn\'t run.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the loop to its job.',
        pairs: [
          ['int minute = 1;', 'The starting value'],
          ['while (minute <= 3)', 'Keep going while this is true'],
          ['minute++;', 'Moves towards the end'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Use a while loop to print Check 1, Check 2, Check 3, Check 4, Check 5 (one per line).',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int n = 1;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int n = 1;\n    while (n <= 5) {\n        printf("Check %d\\n", n);\n        n++;\n    }\n    return 0;\n}\n',
        hint: 'while (n <= 5) { printf("Check %d\\n", n); n++; }',
        checks: [
          { message: 'Print Check 1 to Check 5', outputEquals: 'Check 1\nCheck 2\nCheck 3\nCheck 4\nCheck 5' },
          { message: 'Use while', codeIncludes: 'while (' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'if or while?',
        groups: ['if: once or not at all', 'while: repeat'],
        items: [
          { text: 'Sound the alarm if CO2 is high', group: 0 },
          { text: 'Check the battery every minute of the drive', group: 1 },
          { text: 'Print "Ration mode" when water is low', group: 0 },
          { text: 'Print each of 48 plant labels', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Repeat the check while the minute is at most 10.',
        template: '[[1]] (minute <= 10) {\n    printf("Minute %d\\n", minute);\n    minute[[2]];\n}',
        blanks: [['while'], ['++']],
        distractors: ['if', '--'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'And if Rocha\'s drive takes longer than planned?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Then the checks stop at 600.', why: 'Only if the condition says so. A loop can run while the rover is out, however long.' },
          { text: 'Loops can only run 600 times.', why: 'There\'s no such limit.' },
          { text: 'The loop keeps going as long as its condition is true. I change one number, not 600 lines.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'This should print 3 checks but the loop never stops. Which line is missing something?',
        lines: ['int n = 1;', 'while (n <= 3) {', '    printf("Check %d\\n", n);', '}'],
        bug: 2,
        fix: '    printf("Check %d\\n", n);\n    n++;',
        explanation: 'Nothing changes n, so n <= 3 stays true forever. The loop needs a step towards the end.',
        language: 'c',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which C keyword means "keep repeating while this is true"?',
        answers: ['while'],
        placeholder: 'A keyword',
      },
      {
        kind: 'writeCode',
        prompt: 'Print Minute 1: battery check up to Minute 4: battery check, then Rover checks done.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int minute = 1;\n    while (minute <= 4) {\n        printf("Minute %d: battery check\\n", minute);\n        minute++;\n    }\n    printf("Rover checks done\\n");\n    return 0;\n}\n',
        hint: 'Start minute at 1, loop while minute <= 4, and print the last line after the loop.',
        checks: [
          { message: 'Print four checks then the done line', outputEquals: 'Minute 1: battery check\nMinute 2: battery check\nMinute 3: battery check\nMinute 4: battery check\nRover checks done' },
          { message: 'Use a loop', codeIncludes: 'while' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What do you do over and over until something changes (stir until it boils, refresh until it loads)? What\'s your "condition" for stopping?',
    starters: ['I keep... until...', 'My stopping condition is...'],
  },
  notes: 'while statement: ISO C 6.8.5.1. Rover figures (14 km, ~40 km range) are fictional.',
};

export default lesson;
