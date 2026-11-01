import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Reading lesson: do ... while runs the body at least once; a repeating menu. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'do ... while',
  summary: 'Sol 4, 15:10. The console menu works once, then the program ends. The night watch wants it to keep coming back until they choose 0 to quit. And the menu must show at least once.',
  minutes: 11,
  outcomes: [
    'Write a do ... while loop',
    'Explain why its body always runs at least once',
    'Build a menu that repeats until the user quits',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Check at the bottom',
      html: '<p>A <code>while</code> loop checks its condition <strong>first</strong>. If it\'s false from the start, the body never runs.</p><p>A <code>do ... while</code> loop checks <strong>at the end</strong>. The body always runs at least once, then repeats while the condition is true:</p><p><code>do {<br>&nbsp;&nbsp;&nbsp;&nbsp;// show the menu, read a choice<br>} while (choice != 0);</code></p><p>Note the semicolon after the condition: a do ... while is one of the few places in C where a <code>)</code> is followed by <code>;</code>.</p><h3>Perfect for menus</h3><p>A menu must appear before anyone can choose to quit. That\'s exactly "at least once, then again until they say stop". It\'s the same for "ask until the answer is valid": you have to ask once before you can check.</p>',
    },
    {
      kind: 'tryIt',
      title: 'A menu that comes back',
      code: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n\n    do {\n        printf("1 Water  2 Power  0 Quit\\nChoice? ");\n        scanf("%d", &choice);\n        if (choice == 1) {\n            printf("Water: 1574 litres\\n");\n        } else if (choice == 2) {\n            printf("Power: 62%%\\n");\n        }\n    } while (choice != 0);\n\n    printf("Console closed\\n");\n    return 0;\n}\n',
      caption: 'This run chooses 1, then 2, then 0. Run it and follow the menu round.',
      challenge: 'Add option 3 for CO2: 1150 ppm.',
      stdin: ['1', '2', '0'],
    },
  ],
  apply: {
    scenario: 'Sol 4, 15:10. The menu that comes back.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How is do ... while different from while?',
        options: [
          { text: 'It can\'t repeat', why: 'It repeats while the condition is true, like while.' },
          { text: 'It doesn\'t need a condition', why: 'It needs one, at the end: while (...);' },
          { text: 'It checks the condition at the end, so the body runs at least once' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many times does "Menu" print?',
        code: 'int n = 5;\ndo {\n    printf("Menu\\n");\n} while (n < 3);',
        language: 'c',
        options: [
          { text: '0', why: 'A do ... while body always runs once before checking.' },
          { text: '1' },
          { text: 'Forever', why: 'After the first run, 5 < 3 is false, so it stops.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t compile?',
        lines: ['do {', '    scanf("%d", &choice);', '} while (choice != 0)', 'printf("Bye\\n");'],
        bug: 2,
        fix: '} while (choice != 0);',
        explanation: 'A do ... while ends with a semicolon after the condition.',
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Keep reading values with do ... while until a 0 is read (given: 1150, 980, 0). After each read, print Got and the value, including the final 0.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int reading;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int reading;\n    do {\n        scanf("%d", &reading);\n        printf("Got %d\\n", reading);\n    } while (reading != 0);\n    return 0;\n}\n',
        hint: 'do { scanf...; printf...; } while (reading != 0);',
        stdin: ['1150', '980', '0'],
        checks: [
          { message: 'Print Got for every value, ending with Got 0', outputIncludes: 'Got 1150' },
          { message: 'Stop at 0', outputIncludes: 'Got 0' },
          { message: 'Use do ... while', codeIncludes: '} while (' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'while or do ... while?',
        groups: ['while', 'do ... while'],
        items: [
          { text: 'Show a menu, repeat until Quit', group: 1 },
          { text: 'Drive while the battery is above the margin', group: 0 },
          { text: 'Ask for a PIN until it\'s 4 digits', group: 1 },
          { text: 'Count down from 10', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Build the menu loop.',
        lines: ['do {', '    printf("Choice? ");', '    scanf("%d", &choice);', '} while (choice != 0);', 'printf("Closed\\n");'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'Why not a normal while for the menu?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'A while checks first, but there\'s no choice yet to check. do ... while shows the menu once, then checks.' },
          { text: 'while can\'t read input.', why: 'It can. The issue is checking a choice that hasn\'t been made yet.' },
          { text: 'do ... while is faster.', why: 'Speed isn\'t the point; the order of checking is.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At minimum, how many times does a do ... while body run?',
        answers: ['1', 'once', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the loop.',
        template: '[[1]] {\n    scanf("%d", &choice);\n} [[2]] (choice != 0);',
        blanks: [['do'], ['while']],
        distractors: ['for', 'if'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'A repeating menu (given choices: 1, 3, 0). 1 prints Water: 1574 litres, 2 prints Power: 62%, 0 quits, anything else prints Unknown option. After the loop print Console closed.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int choice;\n    do {\n        printf("Choice? ");\n        scanf("%d", &choice);\n        if (choice == 1) {\n            printf("Water: 1574 litres\\n");\n        } else if (choice == 2) {\n            printf("Power: 62%%\\n");\n        } else if (choice != 0) {\n            printf("Unknown option\\n");\n        }\n    } while (choice != 0);\n    printf("Console closed\\n");\n    return 0;\n}\n',
        hint: 'Inside the loop: read, then if / else if. Don\'t print Unknown for 0.',
        stdin: ['1', '3', '0'],
        checks: [
          { message: 'Answer 1, then 3, then quit', outputEquals: 'Choice? 1\nWater: 1574 litres\nChoice? 3\nUnknown option\nChoice? 0\nConsole closed' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Some things you always do once before deciding whether to repeat: taste the soup, try the jacket on. What\'s a do ... while in your day?',
    starters: ['I always ... once, then...', 'I repeat it while...'],
  },
  notes: 'do statement: ISO C 6.8.5.2 (controlling expression evaluated after each execution of the body).',
};

export default lesson;
