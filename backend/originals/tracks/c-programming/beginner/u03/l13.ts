import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 13. Tap to explore: fall-through without break, and sharing code between cases on purpose. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'break and fall-through',
  summary: 'Sol 3, 20:45. Mateus presses 1 for water and the board prints the water, the power AND the CO2. One missing word. But Lars\'s code leaves out break on purpose in one place. Why?',
  minutes: 11,
  outcomes: [
    'Explain fall-through: without break, C runs into the next case',
    'Fix a switch with a missing break',
    'Share one block between several cases on purpose',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lars\'s status switch',
      text: 'switch (status) {\n    case \'g\':\n    case \'G\':\n        printf("GREEN\\n");\n        break;\n    case \'A\':\n        printf("AMBER\\n");\n    case \'R\':\n        printf("RED\\n");\n        break;\n}',
      hotspots: [
        { phrase: 'case \'g\':\n    case \'G\':', note: 'Two cases, one block: on purpose. A small g has nothing to run, so it "falls through" into case \'G\'. Both print GREEN.' },
        { phrase: 'printf("GREEN\\n");\n        break;', note: 'break jumps out of the switch. Nothing below it runs.' },
        { phrase: 'case \'A\':\n        printf("AMBER\\n");', note: 'A bug: no break. After AMBER, C falls straight into case \'R\' and also prints RED.' },
        { phrase: 'case \'R\':', note: 'A case label is only a starting point. Once C is running inside the switch, it doesn\'t stop at the next label: only break stops it.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Amber falls into red',
      code: '#include <stdio.h>\n\nint main(void) {\n    char status = \'A\';\n\n    switch (status) {\n        case \'g\':\n        case \'G\':\n            printf("GREEN\\n");\n            break;\n        case \'A\':\n            printf("AMBER\\n");\n        case \'R\':\n            printf("RED\\n");\n            break;\n    }\n    return 0;\n}\n',
      caption: 'Run it. Status A prints two lines.',
      challenge: 'Add the missing break after AMBER. Then try status = \'g\'.',
    },
  ],
  apply: {
    scenario: 'Sol 3, 20:45. The menu that says everything.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What happens when a case has no break?',
        options: [
          { text: 'C carries on into the next case\'s code' },
          { text: 'The switch ends anyway', why: 'Only break (or the closing brace) ends it.' },
          { text: 'Compile error', why: 'It compiles. Missing break is legal, which is why it\'s a common bug.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'choice is 1. What prints?',
        code: 'switch (choice) {\n    case 1:\n        printf("Water\\n");\n    case 2:\n        printf("Power\\n");\n        break;\n    case 3:\n        printf("CO2\\n");\n        break;\n}',
        language: 'c',
        options: [
          { text: 'Water', why: 'No break after Water, so it falls into case 2.' },
          { text: 'Water, then Power' },
          { text: 'Water, Power and CO2', why: 'The break after Power stops it there.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the menu so choice 1 prints only Water: 1574 litres.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int choice = 1;\n    switch (choice) {\n        case 1:\n            printf("Water: 1574 litres\\n");\n        case 2:\n            printf("Power: 62%%\\n");\n            break;\n    }\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int choice = 1;\n    switch (choice) {\n        case 1:\n            printf("Water: 1574 litres\\n");\n            break;\n        case 2:\n            printf("Power: 62%%\\n");\n            break;\n    }\n    return 0;\n}\n',
        hint: 'Add break; after the water line.',
        checks: [
          { message: 'Print only the water line', outputEquals: 'Water: 1574 litres' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Status \'A\' prints AMBER and RED. Which line is missing something after it?',
        lines: ['case \'A\':', '    printf("AMBER\\n");', 'case \'R\':', '    printf("RED\\n");', '    break;'],
        bug: 1,
        fix: '    printf("AMBER\\n");\n    break;',
        explanation: 'Without break after AMBER, C falls into case \'R\'.',
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'Fall-through: bug or deliberate?',
        groups: ['Deliberate', 'Bug'],
        items: [
          { text: 'case \'y\': case \'Y\': with one shared block', group: 0 },
          { text: 'Menu option 1 also prints option 2\'s text', group: 1 },
          { text: 'case 6: case 7: printf("Weekend\\n");', group: 0 },
          { text: 'AMBER also prints RED', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Build a switch where G prints GREEN and nothing falls through.',
        lines: ['switch (status) {', '    case \'G\':', '        printf("GREEN\\n");', '        break;', '}'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'lars',
        message: 'When I leave out break on purpose, I write a comment: /* fall through */. Why?',
        prompt: 'Ines\'s best guess?',
        options: [
          { text: 'So the next reader knows it\'s deliberate, not the bug they\'d otherwise "fix".' },
          { text: 'Because C needs the comment to fall through.', why: 'C ignores comments. The comment is for people.' },
          { text: 'To make the program faster.', why: 'Comments don\'t change the program at all.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'status is \'g\'. What prints?',
        code: 'switch (status) {\n    case \'g\':\n    case \'G\':\n        printf("GREEN\\n");\n        break;\n    case \'A\':\n        printf("AMBER\\n");\n        break;\n}',
        language: 'c',
        options: [
          { text: 'Nothing: case \'g\' has no code', why: 'It has no code of its own, so it falls through into case \'G\'.' },
          { text: 'GREEN, then AMBER', why: 'The break after GREEN stops it.' },
          { text: 'GREEN' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is it called when a case without break runs into the next case? (two words, or one with a hyphen)',
        answers: ['fall through', 'fallthrough', 'fall-through', 'falling through'],
        placeholder: 'Two words',
      },
      {
        kind: 'writeCode',
        prompt: 'Read a status letter (given: g). Print GREEN for g or G, AMBER for A, RED for R, otherwise UNKNOWN. Use switch with a shared case for g and G.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    char status;\n    scanf(" %c", &status);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    char status;\n    scanf(" %c", &status);\n    switch (status) {\n        case \'g\':\n        case \'G\':\n            printf("GREEN\\n");\n            break;\n        case \'A\':\n            printf("AMBER\\n");\n            break;\n        case \'R\':\n            printf("RED\\n");\n            break;\n        default:\n            printf("UNKNOWN\\n");\n            break;\n    }\n    return 0;\n}\n',
        hint: 'case \'g\': with nothing after it, then case \'G\': with the printf and break.',
        stdin: ['g'],
        checks: [
          { message: 'Print GREEN for g', outputIncludes: 'GREEN' },
          { message: 'Have a case for small g', codeIncludes: 'case \'g\':' },
          { message: 'Don\'t fall into AMBER', outputEquals: 'g\nGREEN' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Fall-through is a feature that is almost always a bug. Can you think of a rule in daily life that is useful once in a while but usually causes trouble?',
    starters: ['A rule like that is...', 'It\'s useful when...'],
  },
  notes: 'Fall-through between case labels: ISO C 6.8.4.2 (labels do not alter flow). C23 adds [[fallthrough]] attribute; gcc -Wimplicit-fallthrough recognises /* fall through */ comments. scanf(" %c") is introduced fully in lesson 14; here it is in the starter.',
};

export default lesson;
