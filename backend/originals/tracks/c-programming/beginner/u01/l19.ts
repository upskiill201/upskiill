import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 19. Walkthrough: building the full status board from everything in the chapter. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The status board',
  summary: 'Sol 1, 23:40. Before she sleeps, Ines builds the screen the crew will see every hour from tomorrow until the new board arrives: a title, a lined-up table, sums done by the board, and comments for whoever comes next.',
  minutes: 13,
  outcomes: [
    'Plan a program before writing it',
    'Combine printf, %d, \\t, %% and comments in one program',
    'Check the output line by line against the plan',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building the status board',
      steps: [
        {
          title: 'Plan the screen first',
          body: 'Ines writes the screen on paper before any code: a title, an empty line, then one line per system with a tab before the value.',
          code: '// STATUS SOL 2\n//\n// Crew:   4\n// Water:  380 litres\n// Power:  62%',
          language: 'c',
        },
        {
          title: 'Title and empty line',
          body: 'Title first, then printf("\\n") for the gap. Use %d for the sol, so it\'s one change tomorrow.',
          code: 'printf("STATUS SOL %d\\n", 2);\nprintf("\\n");',
          language: 'c',
        },
        {
          title: 'Lined-up rows',
          body: '\\t after each label lines the values up in a column. The water line lets the board do the subtraction: 400 litres yesterday, 20 used.',
          code: 'printf("Crew:\\t%d\\n", 4);\nprintf("Water:\\t%d litres\\n", 400 - 20);',
          language: 'c',
        },
        {
          title: 'The percent sign',
          body: 'A number, then a real percent sign: %d for the number, %% for the sign.',
          code: 'printf("Power:\\t%d%%\\n", 62);',
          language: 'c',
        },
        {
          title: 'Comment the why',
          body: 'One comment at the top saying what this is and who reads it. Then run it and compare with the plan, line by line.',
          code: '/* Hourly status board, read by the whole crew.\n   Replace when the new board arrives on Sol 10. */',
          language: 'c',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The whole board',
      code: '/* Hourly status board, read by the whole crew. */\n#include <stdio.h>\n\nint main(void) {\n    printf("STATUS SOL %d\\n", 2);\n    printf("\\n");\n    printf("Crew:\\t%d\\n", 4);\n    printf("Water:\\t%d litres\\n", 400 - 20);\n    printf("Power:\\t%d%%\\n", 62);\n    return 0;\n}\n',
      caption: 'Run it and compare with Ines\'s plan.',
      challenge: 'Add a row for Oxygen at 97% between Water and Power.',
    },
  ],
  apply: {
    scenario: 'Sol 1, 23:40. The status board.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does Ines plan the screen on paper first?',
        options: [
          { text: 'So she knows exactly what the output should be, and can check the program against it' },
          { text: 'Because C needs a plan to compile', why: 'C doesn\'t see the plan. It\'s for Ines, to check the output.' },
          { text: 'To avoid writing comments', why: 'The plan can even become the comments.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("Power: %d%%\\n", 62);',
        language: 'c',
        options: [
          { text: 'Power: 62%' },
          { text: 'Power: 62%%', why: '%% prints a single percent sign.' },
          { text: 'Power: %d%', why: 'The %d is filled with 62.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the board\'s lines in the planned order.',
        lines: ['printf("STATUS SOL %d\\n", 2);', 'printf("\\n");', 'printf("Crew:\\t%d\\n", 4);', 'printf("Water:\\t%d litres\\n", 380);', 'printf("Power:\\t%d%%\\n", 62);'],
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the water row so the board subtracts.',
        template: 'printf("Water:[[1]]%d litres\\n", 400 [[2]] 20);',
        blanks: [['\\t'], ['-']],
        distractors: ['/t', '+'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the title line STATUS SOL 2 (with %d) and then an empty line.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("STATUS SOL %d\\n", 2);\n    printf("\\n");\n    return 0;\n}\n',
        hint: 'printf("STATUS SOL %d\\n", 2); then printf("\\n");',
        checks: [
          { message: 'Print STATUS SOL 2', outputIncludes: 'STATUS SOL 2' },
          { message: 'Use %d for the sol', codeIncludes: 'SOL %d' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The Power row prints garbage. Which line is wrong?',
        lines: ['printf("Crew:\\t%d\\n", 4);', 'printf("Power:\\t%d%\\n", 62);', 'printf("Water:\\t%d litres\\n", 380);'],
        bug: 1,
        fix: 'printf("Power:\\t%d%%\\n", 62);',
        explanation: 'A single % is read as the start of another placeholder. A real percent sign needs %%.',
        language: 'c',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the board to the tool that makes it.',
        pairs: [
          ['The gap under the title', 'printf("\\n")'],
          ['Values lined up in a column', '\\t'],
          ['The water sum', '400 - 20 after the comma'],
          ['The % after 62', '%%'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'Tomorrow the water will be different. Do we rewrite the board?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Only the numbers after the commas change. The layout stays the same.' },
          { text: 'Yes, every line.', why: 'Only the values change. The text and layout stay.' },
          { text: 'No, it updates itself.', why: 'Not yet: someone still types the new numbers. Next chapter, variables help with that.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print two lined-up rows: Crew:<tab>4 and Water:<tab>380 litres, where 380 is worked out as 400 - 20.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Crew:\\t%d\\n", 4);\n    printf("Water:\\t%d litres\\n", 400 - 20);\n    return 0;\n}\n',
        hint: 'Use \\t after each label, %d for each number, and 400 - 20 after the comma.',
        checks: [
          { message: 'Print the Crew row with a tab', outputIncludes: 'Crew:\t4' },
          { message: 'Print the Water row', outputIncludes: 'Water:\t380 litres' },
          { message: 'Let the board subtract', codeIncludes: '400 - 20' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write the whole board: a /* */ comment, STATUS SOL 2, an empty line, then Crew, Water (400 - 20), Oxygen 97% and Power 62%, each label followed by a tab.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '/* Hourly status board, read by the whole crew. */\n#include <stdio.h>\n\nint main(void) {\n    printf("STATUS SOL %d\\n", 2);\n    printf("\\n");\n    printf("Crew:\\t%d\\n", 4);\n    printf("Water:\\t%d litres\\n", 400 - 20);\n    printf("Oxygen:\\t%d%%\\n", 97);\n    printf("Power:\\t%d%%\\n", 62);\n    return 0;\n}\n',
        hint: 'Follow the plan from the walkthrough and add the Oxygen row with %d%%.',
        checks: [
          { message: 'Print the board exactly', outputEquals: 'STATUS SOL 2\n\nCrew:\t4\nWater:\t380 litres\nOxygen:\t97%\nPower:\t62%' },
          { message: 'Add a /* */ comment', codeIncludes: '/*' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Planning the output first made the program easier to check. What else do you sketch before you start: a trip, a meal, a message?',
    starters: ['I sketch...', 'It helps because...'],
  },
  notes: 'Combines lessons 1-18. Readings are fictional station values.',
};

export default lesson;
