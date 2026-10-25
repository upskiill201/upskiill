import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Card deck: counter loops: counting up, down, and in steps. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Counting with a loop',
  summary: 'Sol 4, 09:30. Tomoko needs labels for 48 plants, Hal wants a countdown to the next radio call, and Mateus reports every 2 km. Three jobs, one pattern: the counter loop.',
  minutes: 11,
  outcomes: [
    'Count up from a start to an end with a loop',
    'Count down, and count in steps bigger than one',
    'Use the counter inside the loop body',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>The most common loop in C counts. A <strong>counter</strong> variable starts somewhere, the condition says where it stops, and the step moves it:</p><p><code>int plant = 1;<br>while (plant &lt;= 48) {<br>&nbsp;&nbsp;&nbsp;&nbsp;printf("Plant %02d\\n", plant);<br>&nbsp;&nbsp;&nbsp;&nbsp;plant++;<br>}</code></p><p>The counter is a normal variable: you can print it, calculate with it, and decide with it inside the loop.</p>',
    },
    {
      kind: 'text',
      html: '<p>Change the start, the condition or the step, and the same pattern counts differently:</p><ul><li><strong>Down:</strong> start at 10, loop while <code>n &gt;= 1</code>, step <code>n--</code></li><li><strong>In twos:</strong> start at 2, loop while <code>km &lt;= 14</code>, step <code>km += 2</code></li></ul>',
    },
    {
      kind: 'tryIt',
      title: 'Countdown to the radio call',
      code: '#include <stdio.h>\n\nint main(void) {\n    int n = 5;\n\n    while (n >= 1) {\n        printf("%d...\\n", n);\n        n--;\n    }\n    printf("Red Mesa to rover, come in.\\n");\n    return 0;\n}\n',
      caption: 'A counter going down. Run it.',
      challenge: 'Make it count down from 10 in twos: 10, 8, 6, 4, 2.',
    },
    {
      kind: 'check',
      question: 'Which step counts in twos?',
      options: ['n++', 'n += 2', 'n * 2'],
      answer: 1,
      explanation: 'n += 2 adds 2 each time. n * 2 alone calculates a value but doesn\'t change n.',
    },
  ],
  apply: {
    scenario: 'Sol 4, 09:30. Labels, countdowns and checkpoints.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int km = 2;\nwhile (km <= 8) {\n    printf("%d ", km);\n    km += 2;\n}',
        language: 'c',
        options: [
          { text: '2 4 6', why: 'km <= 8 includes 8.' },
          { text: '2 4 6 8' },
          { text: '2 3 4 5 6 7 8', why: 'The step is += 2, not ++.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print plant labels Plant 1 to Plant 6, one per line, with a counter loop.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int plant = 1;\n    while (plant <= 6) {\n        printf("Plant %d\\n", plant);\n        plant++;\n    }\n    return 0;\n}\n',
        hint: 'Start plant at 1, loop while plant <= 6, plant++.',
        checks: [
          { message: 'Print Plant 1 to Plant 6', outputEquals: 'Plant 1\nPlant 2\nPlant 3\nPlant 4\nPlant 5\nPlant 6' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the loop to what it counts.',
        pairs: [
          ['start 1, while <= 5, ++', '1 2 3 4 5'],
          ['start 5, while >= 1, --', '5 4 3 2 1'],
          ['start 0, while <= 10, += 5', '0 5 10'],
          ['start 2, while < 8, += 2', '2 4 6'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Count down from 3.',
        template: 'int n = 3;\nwhile (n [[1]] 1) {\n    printf("%d\\n", n);\n    n[[2]];\n}',
        blanks: [['>='], ['--']],
        distractors: ['<=', '++'],
        language: 'c',
      },
      {
        kind: 'findBug',
        prompt: 'This should print 1 to 5 but prints nothing. Which line?',
        lines: ['int n = 1;', 'while (n >= 5) {', '    printf("%d\\n", n);', '    n++;', '}'],
        bug: 1,
        fix: 'while (n <= 5) {',
        explanation: '1 >= 5 is false from the start, so the body never runs. Counting up needs <=.',
        language: 'c',
      },
      {
        kind: 'mcq',
        prompt: 'Mateus reports at km 2, 4, 6, 8, 10, 12 and 14. Which loop?',
        options: [
          { text: 'km = 2; while (km <= 14) { ...; km += 2; }' },
          { text: 'km = 0; while (km < 14) { ...; km++; }', why: 'That counts every km from 0 to 13.' },
          { text: 'km = 2; while (km < 14) { ...; km += 2; }', why: '< 14 stops before the report at km 14.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'Can the counter be used inside the loop? I want "Plant 07 of 48".',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'No, the counter is hidden inside the loop.', why: 'It\'s an ordinary variable you can print and use.' },
          { text: 'Yes: it\'s a normal variable. printf("Plant %02d of 48\\n", plant);' },
          { text: 'Only after the loop ends.', why: 'You can use it in the body every time round.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A loop starts n at 10 and does n -= 3 while n > 0. What is the last number it prints? (10, 7, 4, ...)',
        answers: ['1'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Print Mateus\'s checkpoints: km 2, km 4, ... km 14, one per line.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int km = 2;\n    while (km <= 14) {\n        printf("km %d\\n", km);\n        km += 2;\n    }\n    return 0;\n}\n',
        hint: 'Start at 2, loop while km <= 14, step km += 2.',
        checks: [
          { message: 'Print km 2 to km 14 in twos', outputEquals: 'km 2\nkm 4\nkm 6\nkm 8\nkm 10\nkm 12\nkm 14' },
          { message: 'Step by 2', codeIncludes: '+= 2' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Countdown: print 5..., 4..., 3..., 2..., 1..., then Go.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int n = 5;\n    while (n >= 1) {\n        printf("%d...\\n", n);\n        n--;\n    }\n    printf("Go\\n");\n    return 0;\n}\n',
        hint: 'Start at 5, while n >= 1, n--. Go goes after the loop.',
        checks: [
          { message: 'Print the countdown and Go', outputEquals: '5...\n4...\n3...\n2...\n1...\nGo' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Counting up, counting down, counting in twos. Which everyday count would you hand to a loop (steps, reps at the gym, days to a holiday)?',
    starters: ['I\'d loop over...', 'It would count from ... to ...'],
  },
  notes: 'Counter loop pattern. 10, 7, 4, 1 then -2 fails n > 0, so the last printed is 1.',
};

export default lesson;
