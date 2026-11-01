import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 12. Walkthrough: order of statements, blank lines, puts, building a longer screen. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Many lines, one program',
  summary: 'Sol 1, 21:30. Before bed, Hal wants a night-watch screen: a title, a blank line, then four checks in a fixed order. Order matters on a checklist, and in C.',
  minutes: 11,
  outcomes: [
    'Predict the output of a program with many statements',
    'Print a blank line',
    'Use puts for simple lines',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building the night-watch screen',
      steps: [
        {
          title: 'Top to bottom, one at a time',
          body: 'main runs its statements in the order they\'re written. The output appears in the same order. Swap two lines and the output swaps too.',
          code: 'printf("1. Airlock\\n");\nprintf("2. Fans\\n");',
          language: 'c',
        },
        {
          title: 'A blank line',
          body: 'A printf with only \\n prints an empty line. Good for separating a title from a list.',
          code: 'printf("NIGHT WATCH\\n");\nprintf("\\n");\nprintf("1. Airlock\\n");',
          language: 'c',
        },
        {
          title: 'puts: print a line, new line included',
          body: 'puts("text"); prints the text and adds the \\n for you. Simpler than printf when you only print plain text.',
          code: 'puts("NIGHT WATCH");\nputs("1. Airlock");',
          language: 'c',
        },
        {
          title: 'Don\'t mix them up',
          body: 'printf("Hi\\n") and puts("Hi") print the same thing. But puts("Hi\\n") prints Hi and then TWO new lines: its own and yours.',
          code: 'puts("Hi\\n"); // Hi, then an empty line',
          language: 'c',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The night-watch screen',
      code: '#include <stdio.h>\n\nint main(void) {\n    puts("NIGHT WATCH");\n    printf("\\n");\n    puts("1. Airlock sealed");\n    puts("2. Fans on");\n    puts("3. Heater on");\n    puts("4. Radio on channel 3");\n    return 0;\n}\n',
      caption: 'Run it. Then read the code and the output side by side, line by line.',
      challenge: 'Hal wants Fans checked last. Move that line to the end and renumber it.',
    },
  ],
  apply: {
    scenario: 'Sol 1, 21:30. The night watch.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In what order do main\'s statements run?',
        options: [
          { text: 'Top to bottom, as written' },
          { text: 'All at the same time', why: 'One at a time, in order. That\'s why the output keeps the order.' },
          { text: 'printf lines first, then puts lines', why: 'C doesn\'t sort them. They run in the order you wrote them.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Hal\'s checklist must print in this order: Airlock, Fans, Heater. Put the statements in order.',
        lines: ['puts("NIGHT WATCH");', 'puts("1. Airlock");', 'puts("2. Fans");', 'puts("3. Heater");'],
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines does this print, counting the empty one?',
        code: 'puts("A");\nprintf("\\n");\nputs("B");',
        language: 'c',
        options: [
          { text: 'Two', why: 'printf("\\n") prints a line too: an empty one.' },
          { text: 'Three' },
          { text: 'Four', why: 'puts adds one new line per call, and printf("\\n") adds one. Three lines.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print NIGHT WATCH, then an empty line, then Fans on',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    puts("NIGHT WATCH");\n    printf("\\n");\n    puts("Fans on");\n    return 0;\n}\n',
        hint: 'puts("NIGHT WATCH"); then printf("\\n"); then puts("Fans on");',
        checks: [
          { message: 'Print the title, an empty line, then Fans on', outputEquals: 'NIGHT WATCH\n\nFans on' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it prints.',
        pairs: [
          ['puts("Hi");', 'Hi, then a new line'],
          ['printf("Hi");', 'Hi, and no new line'],
          ['printf("\\n");', 'An empty line'],
          ['puts("Hi\\n");', 'Hi, then two new lines'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The screen should show the title, then the items. Which line is in the wrong place?',
        lines: ['puts("1. Airlock");', 'puts("NIGHT WATCH");', 'puts("2. Fans");'],
        bug: 0,
        fix: 'Move puts("1. Airlock"); below the title.',
        explanation: 'C prints in the order you wrote. The title has to come first in the code too.',
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'Why not just one giant printf with every line in it?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'You could, but one line per statement is easier to read, reorder and switch off.' },
          { text: 'printf can only print one line.', why: 'It can print many, using \\n. It\'s a readability choice.' },
          { text: 'Giant printfs run slower.', why: 'Speed isn\'t the reason here. Readability is.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that prints Heater on and moves to a new line, without writing \\n.',
        tiles: ['puts', '(', '"Heater on"', ')', ';'],
        distractors: ['printf', '"Heater on\\n"'],
        language: 'c',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which function prints a line and adds the new line by itself?',
        answers: ['puts', 'puts()'],
        placeholder: 'A function name',
      },
      {
        kind: 'writeCode',
        prompt: 'Write the full night-watch screen exactly as shown: NIGHT WATCH, an empty line, then 1. Airlock, 2. Fans, 3. Heater',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    puts("NIGHT WATCH");\n    printf("\\n");\n    puts("1. Airlock");\n    puts("2. Fans");\n    puts("3. Heater");\n    return 0;\n}\n',
        hint: 'One statement per line, in the same order as the screen.',
        checks: [
          { message: 'Print the screen exactly', outputEquals: 'NIGHT WATCH\n\n1. Airlock\n2. Fans\n3. Heater' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Hal trusts checklists because they run in the same order every time. What do you do in a fixed order every day, and what happens if you swap two steps?',
    starters: ['Every day I...', 'If I swapped two steps...'],
  },
  notes: 'puts writes the string followed by a newline (ISO C 7.21.7.9). Statements in a block execute in sequence.',
};

export default lesson;
