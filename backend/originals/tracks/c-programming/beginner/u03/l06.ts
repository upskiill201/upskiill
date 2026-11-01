import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Myth or Fact: = assigns, == compares; if (x = 2) compiles and is always true. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: '= is not ==',
  summary: 'Sol 3, 13:00. The airlock check says "crew all inside" even when Mateus is out on the rover. The code compiles. It runs. It\'s just quietly, completely wrong, because of one missing =.',
  minutes: 11,
  outcomes: [
    'Explain the difference between = and ==',
    'Spot if (x = value) as a bug',
    'Know why the compiler doesn\'t stop it',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'In C, = and == mean the same thing.', isFact: false, explain: 'Myth. = puts a value in a box (assignment). == asks whether two values are equal (comparison).' },
        { text: 'if (crew_inside = 4) compiles without an error.', isFact: true, explain: 'Fact. It\'s legal C: it puts 4 into crew_inside, and the "result" is 4, which counts as true. The if always runs.' },
        { text: 'That line also changes crew_inside.', isFact: true, explain: 'Fact. Whatever was counted before is overwritten with 4. The bug hides the real count AND lies about it.' },
        { text: 'The compiler always catches this mistake.', isFact: false, explain: 'Myth. Some compilers warn if you turn warnings on, but it isn\'t an error. You have to catch it yourself.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The lying airlock',
      code: '#include <stdio.h>\n\nint main(void) {\n    int crew_inside = 3;   // Mateus is out on the rover\n\n    if (crew_inside = 4) {\n        printf("All crew inside. Sealing airlock.\\n");\n    } else {\n        printf("Someone is outside!\\n");\n    }\n    printf("crew_inside is now %d\\n", crew_inside);\n    return 0;\n}\n',
      caption: 'Run it. Three people are inside, but the board says all four, and the count changed too.',
      challenge: 'Change = to == and run it again.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Read == out loud as "is equal to" and = as "becomes". "If crew_inside becomes 4" sounds wrong, and it is.',
    },
  ],
  apply: {
    scenario: 'Sol 3, 13:00. The lying airlock.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the operator to what it does.',
        pairs: [
          ['=', 'Puts a value in a variable'],
          ['==', 'Checks if two values are equal'],
          ['!=', 'Checks if two values are different'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is the bug?',
        lines: ['int rovers_docked = 1;', 'if (rovers_docked = 2) {', '    printf("Both rovers home\\n");', '}'],
        bug: 1,
        fix: 'if (rovers_docked == 2) {',
        explanation: 'A single = assigns 2 and the if always runs. Comparing needs ==.',
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int crew = 3;\nif (crew == 4) {\n    printf("All in\\n");\n} else {\n    printf("Missing one\\n");\n}',
        language: 'c',
        options: [
          { text: 'All in', why: '== compares: 3 is not equal to 4.' },
          { text: 'Missing one' },
          { text: 'Both lines', why: 'Only one branch of an if ... else runs.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the airlock check so it prints Someone is outside! for crew_inside = 3.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int crew_inside = 3;\n    if (crew_inside = 4) {\n        printf("All crew inside\\n");\n    } else {\n        printf("Someone is outside!\\n");\n    }\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int crew_inside = 3;\n    if (crew_inside == 4) {\n        printf("All crew inside\\n");\n    } else {\n        printf("Someone is outside!\\n");\n    }\n    return 0;\n}\n',
        hint: 'Comparing needs two equals signs.',
        checks: [
          { message: 'Print Someone is outside!', outputIncludes: 'Someone is outside!' },
          { message: 'Compare with ==', codeIncludes: 'crew_inside == 4' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Assignment or comparison?',
        groups: ['Assignment (=)', 'Comparison (==)'],
        items: [
          { text: 'crew = 4;', group: 0 },
          { text: 'if (crew == 4)', group: 1 },
          { text: 'int water = 1500;', group: 0 },
          { text: 'if (status == \'G\')', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does if (crew = 4) always run its block?',
        options: [
          { text: 'It stores 4 in crew, and 4 counts as true' },
          { text: 'Because crew really is 4', why: 'It wasn\'t before that line. The line MADE it 4.' },
          { text: 'It doesn\'t; it\'s a compile error', why: 'It compiles. That\'s what makes it dangerous.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete both lines correctly.',
        template: 'int status_code [[1]] 2;\nif (status_code [[2]] 2) {\n    printf("Green\\n");\n}',
        blanks: [['='], ['==']],
        distractors: ['!=', '=>'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'One equals sign nearly sealed Rocha outside. How do we stop it happening again?',
        prompt: 'Ines\'s best answer?',
        options: [
          { text: 'Read every if out loud: "is equal to" means ==. And test with a value that should fail, like 3 crew.' },
          { text: 'Never use = again.', why: 'Assignment is essential. The fix is using each one in its place.' },
          { text: 'Trust the compiler to warn us.', why: 'It doesn\'t always. Testing the failing case catches it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Read out loud: crew == 4. "crew is ___ to 4". One word.',
        answers: ['equal'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Read how many rovers are docked (given: 1). Print Both rovers home if it equals 2, otherwise Rover still out.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int rovers_docked;\n    scanf("%d", &rovers_docked);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int rovers_docked;\n    scanf("%d", &rovers_docked);\n    if (rovers_docked == 2) {\n        printf("Both rovers home\\n");\n    } else {\n        printf("Rover still out\\n");\n    }\n    return 0;\n}\n',
        hint: 'if (rovers_docked == 2)',
        stdin: ['1'],
        checks: [
          { message: 'Print Rover still out', outputIncludes: 'Rover still out' },
          { message: 'Compare with ==', codeIncludes: '== 2' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'The airlock bug compiled, ran and printed something believable. What believable-but-wrong information have you nearly acted on?',
    starters: ['I nearly believed...', 'I caught it because...'],
  },
  deepen: {
    title: 'Yoda conditions',
    summary: 'Some programmers write if (4 == crew) instead. If they slip and type 4 = crew, it\'s a compile error, because you can\'t assign to 4. Search "Yoda conditions" for the debate.',
  },
  notes: 'Assignment expressions have the value of the left operand after assignment (ISO C 6.5.16); any nonzero value is true in a condition (6.8.4.1). gcc -Wall warns "suggest parentheses around assignment used as truth value" (-Wparentheses).',
};

export default lesson;
