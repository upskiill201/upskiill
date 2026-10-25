import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 18. Reading lesson: trace tables: following variables round by round on paper. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Tracing a loop by hand',
  summary: 'Sol 4, 22:30. Lars\'s email: "Before you run a loop, run it in your head. Pencil, paper, one row per round." Ines tries his trace table on the battery loop, and finds a bug without pressing Run.',
  minutes: 12,
  outcomes: [
    'Build a trace table: one column per variable, one row per round',
    'Predict a loop\'s output before running it',
    'Use tracing to find off-by-one and update-order bugs',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Lars\'s trace table',
      html: '<p>A <strong>trace table</strong> is a grid on paper. One column for each variable, plus one for the condition and one for what\'s printed. Each round of the loop is a new row.</p><p>Take this loop:</p><pre>int total = 0;\nfor (int i = 1; i &lt;= 3; i++) {\n    total += i * 2;\n}\nprintf("%d\\n", total);</pre><table><tr><th>i</th><th>i &lt;= 3?</th><th>total after the body</th></tr><tr><td>1</td><td>yes</td><td>2</td></tr><tr><td>2</td><td>yes</td><td>6</td></tr><tr><td>3</td><td>yes</td><td>12</td></tr><tr><td>4</td><td>no: stop</td><td>12</td></tr></table><p>Prints <strong>12</strong>. The last row is the one people forget: the condition is checked one more time, it\'s false, and the loop ends.</p><h3>Why bother?</h3><p>Tracing forces you to think like the computer: one step at a time, exactly what\'s written. It\'s how you find bugs in code you can\'t run yet, and how you check the edges: the first row and the last row tell you if a loop is off by one.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Check your trace',
      code: '#include <stdio.h>\n\nint main(void) {\n    int battery = 50;\n    int km = 0;\n\n    while (battery > 30) {\n        km++;\n        battery -= 8;\n        printf("km %d, battery %d\\n", km, battery);\n    }\n    return 0;\n}\n',
      caption: 'Before you run it, trace it on paper: km and battery for each round. Then run it and compare.',
      challenge: 'Trace it again with battery -= 5. How many rounds now?',
    },
  ],
  apply: {
    scenario: 'Sol 4, 22:30. Pencil and paper.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In a trace table, what is one row?',
        options: [
          { text: 'One variable', why: 'Variables are columns. Rows are rounds.' },
          { text: 'One line of code', why: 'A row records the values after one whole round.' },
          { text: 'One round of the loop' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Trace it: what does this print?',
        code: 'int total = 0;\nfor (int i = 1; i <= 3; i++) {\n    total += i * 2;\n}\nprintf("%d\\n", total);',
        language: 'c',
        options: [
          { text: '6', why: 'That\'s after round 2. Round 3 adds 6 more.' },
          { text: '12' },
          { text: '18', why: 'i * 2 for i = 1, 2, 3 is 2 + 4 + 6.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Trace: battery starts at 50, loop while > 30, battery -= 8. Which values does battery take after each round?',
        groups: ['It takes this value', 'It never takes this value'],
        items: [
          { text: '42', group: 0 },
          { text: '34', group: 0 },
          { text: '26', group: 0 },
          { text: '18', group: 1 },
          { text: '30', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Battery starts at 50 and the loop runs while battery > 30, taking 8 each round. How many rounds run?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Trace it with readings 5, 7, 9: the total comes out 12, not 21. Which line is in the wrong place?',
        lines: ['int total = 0, n;', 'for (int i = 0; i < 3; i++) {', '    total += n;', '    scanf("%d", &n);', '}'],
        bug: 2,
        fix: 'Swap the two lines in the body: scanf first, then total += n.',
        explanation: 'The trace shows round 1 adds n before anything was read (garbage or 0), and the last reading (9) is never added.',
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Trace first, then write it: start at total = 1, and 4 times do total *= 3. Print Total: 81',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int total = 1;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int total = 1;\n    for (int i = 0; i < 4; i++) {\n        total *= 3;\n    }\n    printf("Total: %d\\n", total);\n    return 0;\n}\n',
        hint: 'Trace: 3, 9, 27, 81. A for loop with 4 rounds.',
        checks: [
          { message: 'Print Total: 81', outputIncludes: 'Total: 81' },
          { message: 'Use *=', codeIncludes: '*= 3' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lars',
        message: 'You ran it and it worked. Why trace it as well?',
        prompt: 'Ines\'s best reply?',
        options: [
          { text: 'There\'s no reason, running is enough.', why: 'A run proves one case. A trace explains every step.' },
          { text: 'Because running only proves it works for this input. Tracing shows me WHY, and what happens at the edges.' },
          { text: 'Because the board might be broken.', why: 'Tracing checks your thinking, not the hardware.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'for (int i = 0; i < 3; i++) printf("%d", i * i);  Match each round to what it prints.',
        pairs: [
          ['i = 0', '0'],
          ['i = 1', '1'],
          ['i = 2', '4'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the trace: total starts at 10, and each round does total -= 3, for 3 rounds.',
        template: 'After round 1: [[1]]\nAfter round 2: [[2]]\nAfter round 3: 1',
        blanks: [['7'], ['4']],
        distractors: ['13', '6'],
      },
      {
        kind: 'writeCode',
        prompt: 'Trace it on paper, then write it: km starts at 0 and battery at 50. While battery > 30: km++, battery -= 8. After the loop, print Stopped at km 3 with 26%',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int battery = 50;\n    int km = 0;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int battery = 50;\n    int km = 0;\n    while (battery > 30) {\n        km++;\n        battery -= 8;\n    }\n    printf("Stopped at km %d with %d%%\\n", km, battery);\n    return 0;\n}\n',
        hint: 'Trace: 42, 34, 26. Three rounds.',
        checks: [
          { message: 'Print Stopped at km 3 with 26%', outputIncludes: 'Stopped at km 3 with 26%' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Lars traces code with a pencil before running it. What do you check on paper (or in your head) before acting: a route, a budget, a recipe?',
    starters: ['I check ... first', 'It once saved me from...'],
  },
  deepen: {
    title: 'The debugger: an automatic trace',
    summary: 'Tools like gdb (and the debuggers in most code editors) let you pause a C program and step through it one line at a time, watching the variables change: a trace table the computer fills in.',
  },
  notes: 'Trace tables are a standard teaching technique for program comprehension. gdb: GNU debugger.',
};

export default lesson;
