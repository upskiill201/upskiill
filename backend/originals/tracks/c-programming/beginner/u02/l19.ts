import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 19. Walkthrough: the full water budget with constants, int, double, / % and casts. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The water budget',
  summary: 'Sol 2, 23:40. One last program before bed: the water budget Hal will read every morning. Constants for the rules, variables for the readings, and every type in the right place.',
  minutes: 13,
  outcomes: [
    'Plan a calculation as named steps',
    'Combine constants, ints, doubles and a char in one program',
    'Print a lined-up report you can trust',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building the budget',
      steps: [
        {
          title: 'The rules are constants',
          body: 'Crew size and ration don\'t change during the mission. Name them once, at the top.',
          code: '#define CREW 4\nconst int RATION_LITRES = 18;',
          language: 'c',
        },
        {
          title: 'The readings are variables',
          body: 'Tonight\'s tank reading and the reserve Hal keeps untouched for emergencies.',
          code: 'int tank_litres = 1590;\nint reserve_litres = 400;',
          language: 'c',
        },
        {
          title: 'Build the answer in steps',
          body: 'Usable water is the tank minus the reserve. Daily use is crew times ration. Then full sols and the leftover. Brackets aren\'t needed here, but each step gets its own name.',
          code: 'int usable = tank_litres - reserve_litres;\nint daily_use = CREW * RATION_LITRES;\nint full_sols = usable / daily_use;\nint leftover = usable % daily_use;',
          language: 'c',
        },
        {
          title: 'A decimal for the exact picture',
          body: 'Hal also likes the exact figure. Cast before dividing.',
          code: 'double exact_sols = (double)usable / daily_use;',
          language: 'c',
        },
        {
          title: 'A status letter',
          body: 'G if there\'s plenty, A if it\'s getting low. Tonight, Ines sets it by hand; tomorrow the board will decide.',
          code: 'char status = \'G\';',
          language: 'c',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The water budget',
      code: '#include <stdio.h>\n\n#define CREW 4\n\nint main(void) {\n    const int RATION_LITRES = 18;\n    int tank_litres = 1590;\n    int reserve_litres = 400;\n\n    int usable = tank_litres - reserve_litres;\n    int daily_use = CREW * RATION_LITRES;\n    int full_sols = usable / daily_use;\n    int leftover = usable % daily_use;\n    double exact_sols = (double)usable / daily_use;\n    char status = \'G\';\n\n    printf("Usable:    %5d litres\\n", usable);\n    printf("Per sol:   %5d litres\\n", daily_use);\n    printf("Full sols: %5d\\n", full_sols);\n    printf("Leftover:  %5d litres\\n", leftover);\n    printf("Exact:     %5.1f sols\\n", exact_sols);\n    printf("Status:    %c\\n", status);\n    return 0;\n}\n',
      caption: 'Run it and read it the way Hal will.',
      challenge: 'Hal cuts the ration to 15. Change one line: how many full sols now?',
    },
  ],
  apply: {
    scenario: 'Sol 2, 23:40. Hal\'s morning number.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Constant or variable in the budget?',
        groups: ['Constant', 'Variable'],
        items: [
          { text: 'CREW (4)', group: 0 },
          { text: 'RATION_LITRES (18)', group: 0 },
          { text: 'tank_litres (tonight\'s reading)', group: 1 },
          { text: 'usable (worked out from the reading)', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the calculation steps in an order that works.',
        lines: ['int usable = tank_litres - reserve_litres;', 'int full_sols = usable / 72;', 'int leftover = usable - full_sols * 72;', 'printf("%d %d\\n", full_sols, leftover);'],
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'usable is 1190 and daily_use is 72. What does this print?',
        code: 'printf("%d %d\\n", usable / daily_use, usable % daily_use);',
        language: 'c',
        options: [
          { text: '16 38' },
          { text: '16.5 38', why: 'int / int gives a whole number: 16.' },
          { text: '16 0', why: '16 × 72 is 1152, so 38 is left over.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Get the exact number of sols.',
        template: 'double exact_sols = ([[1]])usable / daily_use;',
        blanks: [['double']],
        distractors: ['int', 'char'],
        language: 'c',
      },
      {
        kind: 'findBug',
        prompt: 'The exact figure prints 16.0. Which line is wrong?',
        lines: ['int usable = 1190;', 'int daily_use = 72;', 'double exact_sols = usable / daily_use;', 'printf("%.1f\\n", exact_sols);'],
        bug: 2,
        fix: 'double exact_sols = (double)usable / daily_use;',
        explanation: 'int / int drops the fraction before the value reaches the double. Cast first.',
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'With tank_litres = 1590 and reserve_litres = 400, print Usable: 1190 litres',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int tank_litres = 1590;\n    int reserve_litres = 400;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int tank_litres = 1590;\n    int reserve_litres = 400;\n    int usable = tank_litres - reserve_litres;\n    printf("Usable: %d litres\\n", usable);\n    return 0;\n}\n',
        hint: 'int usable = tank_litres - reserve_litres;',
        checks: [
          { message: 'Print Usable: 1190 litres', outputIncludes: 'Usable: 1190 litres' },
          { message: 'Store it in usable', codeIncludes: 'int usable' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'Why keep a reserve the board ignores?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'It\'s for emergencies. If the budget counted it, we\'d plan to drink our safety margin.' },
          { text: 'The board can\'t count above 1,200.', why: 'An int holds over 2 billion. The reserve is a safety choice.' },
          { text: 'There\'s no reason; I\'ll remove it.', why: 'Hal set the reserve. It stays out of the daily budget on purpose.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'With 1190 usable litres and 72 per sol, how many full sols? (1190 / 72 in C)',
        answers: ['16'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to its type.',
        pairs: [
          ['full_sols', 'int'],
          ['exact_sols', 'double'],
          ['status', 'char'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Write the whole budget and print exactly:\nUsable: 1190 litres\nFull sols: 16\nLeftover: 38 litres\nExact: 16.5 sols\nUse #define CREW 4, const int RATION_LITRES = 18, tank 1590, reserve 400.',
        starter: '#include <stdio.h>\n\n#define CREW 4\n\nint main(void) {\n    const int RATION_LITRES = 18;\n    int tank_litres = 1590;\n    int reserve_litres = 400;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\n#define CREW 4\n\nint main(void) {\n    const int RATION_LITRES = 18;\n    int tank_litres = 1590;\n    int reserve_litres = 400;\n\n    int usable = tank_litres - reserve_litres;\n    int daily_use = CREW * RATION_LITRES;\n    printf("Usable: %d litres\\n", usable);\n    printf("Full sols: %d\\n", usable / daily_use);\n    printf("Leftover: %d litres\\n", usable % daily_use);\n    printf("Exact: %.1f sols\\n", (double)usable / daily_use);\n    return 0;\n}\n',
        hint: 'usable and daily_use first, then /, % and a cast for the four lines.',
        checks: [
          { message: 'Print the four lines exactly', outputEquals: 'Usable: 1190 litres\nFull sols: 16\nLeftover: 38 litres\nExact: 16.5 sols' },
          { message: 'Use the constants', codeIncludes: 'CREW * RATION_LITRES' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Hal trusts this number every morning. What makes you trust a number someone gives you: knowing how it was worked out, or who gave it?',
    starters: ['I trust a number when...', 'I\'d doubt it if...'],
  },
  notes: 'Combines chapter 2. 1190 / 72 = 16 r 38; 1190/72 = 16.527... so %.1f gives 16.5.',
};

export default lesson;
