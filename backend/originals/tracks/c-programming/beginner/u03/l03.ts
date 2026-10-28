import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Card deck: the six comparison operators inside if. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'if and comparisons',
  summary: 'Sol 3, 09:00. Hal lists the warnings he wants: water below 1,200, propane at or under 10 kg, a rover battery that isn\'t at 100. Each one is a comparison, and C has six of them.',
  minutes: 11,
  outcomes: [
    'Use the six comparison operators: < > <= >= == !=',
    'Write a condition that matches a rule in words',
    'Predict which ifs run for a given value',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>A condition compares two values. C has six ways to compare:</p><ul><li><code>&lt;</code> less than, <code>&gt;</code> greater than</li><li><code>&lt;=</code> less than or equal, <code>&gt;=</code> greater than or equal</li><li><code>==</code> equal to (two equals signs)</li><li><code>!=</code> not equal to</li></ul><p>Each comparison is either <strong>true</strong> or <strong>false</strong>. The if runs its block only when it\'s true.</p>',
    },
    {
      kind: 'text',
      html: '<p>Turn Hal\'s words into conditions, one by one:</p><ul><li>"water below 1,200" → <code>water_litres &lt; 1200</code></li><li>"propane at or under 10" → <code>propane_kg &lt;= 10</code></li><li>"battery isn\'t at 100" → <code>battery_percent != 100</code></li></ul><p>The words "at or" are the clue for <code>&lt;=</code> and <code>&gt;=</code>. Get them wrong and the warning fires one step too early or too late.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Hal\'s warnings',
      code: '#include <stdio.h>\n\nint main(void) {\n    int water_litres = 1180;\n    int propane_kg = 10;\n    int battery_percent = 100;\n\n    if (water_litres < 1200) {\n        printf("Warning: water below 1200\\n");\n    }\n    if (propane_kg <= 10) {\n        printf("Warning: propane low\\n");\n    }\n    if (battery_percent != 100) {\n        printf("Note: rover battery not full\\n");\n    }\n    return 0;\n}\n',
      caption: 'Predict which warnings print, then run it.',
      challenge: 'Change propane_kg to 11 and battery_percent to 84. Which warnings print now?',
    },
    {
      kind: 'check',
      question: 'Which means "greater than or equal to"?',
      options: ['=>', '>=', '>>'],
      answer: 1,
      explanation: 'The angle comes first: >=. Same for <=.',
    },
  ],
  apply: {
    scenario: 'Sol 3, 09:00. Hal\'s warning list.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the operator to its meaning.',
        pairs: [
          ['<', 'Less than'],
          ['>=', 'Greater than or equal'],
          ['==', 'Equal to'],
          ['!=', 'Not equal to'],
          ['<=', 'Less than or equal'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Hal: "warn when propane is AT OR UNDER 10 kg". Which condition?',
        options: [
          { text: 'propane_kg < 10', why: 'That misses exactly 10. "At or under" needs <=.' },
          { text: 'propane_kg <= 10' },
          { text: 'propane_kg == 10', why: 'That only catches exactly 10, not 9 or 8.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'With water_litres = 1200, is each condition true or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'water_litres < 1200', group: 1 },
          { text: 'water_litres <= 1200', group: 0 },
          { text: 'water_litres == 1200', group: 0 },
          { text: 'water_litres != 1200', group: 1 },
          { text: 'water_litres > 1000', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Read the propane level (given: 9). If it\'s 10 or less, print Propane low',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int propane_kg;\n    printf("Propane (kg)? ");\n    scanf("%d", &propane_kg);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int propane_kg;\n    printf("Propane (kg)? ");\n    scanf("%d", &propane_kg);\n    if (propane_kg <= 10) {\n        printf("Propane low\\n");\n    }\n    return 0;\n}\n',
        hint: 'if (propane_kg <= 10) { ... }',
        stdin: ['9'],
        checks: [
          { message: 'Print Propane low', outputIncludes: 'Propane low' },
          { message: 'Use <=', codeIncludes: '<= 10' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int crew = 4;\nif (crew != 4) {\n    printf("Someone is outside\\n");\n}\nprintf("Headcount done\\n");',
        language: 'c',
        options: [
          { text: 'Someone is outside, then Headcount done', why: 'crew is 4, so crew != 4 is false.' },
          { text: 'Headcount done' },
          { text: 'Nothing', why: 'The last printf is outside the if, so it always runs.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Warn when the battery is below 20.',
        template: 'if (battery_percent [[1]] 20) {\n    printf("Charge the rover\\n");\n}',
        blanks: [['<']],
        distractors: ['>', '<=', '=<'],
        language: 'c',
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t compile?',
        lines: ['if (water_litres =< 1200) {', '    printf("Low\\n");', '}'],
        bug: 0,
        fix: 'if (water_litres <= 1200) {',
        explanation: 'C only knows <= (angle first). =< isn\'t an operator.',
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'I said "below 1,200". You wrote <= 1200. Is that the same?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'No: <= also warns at exactly 1,200. "Below" is <. I\'ll fix it.' },
          { text: 'Yes, they\'re the same.', why: 'They differ at exactly 1,200.' },
          { text: 'It doesn\'t matter for one litre.', why: 'Rules should match the words exactly, or the alarm cries wolf.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'propane_kg is 10. Is propane_kg < 10 true or false?',
        answers: ['false'],
        placeholder: 'true / false',
      },
      {
        kind: 'writeCode',
        prompt: 'Read the water level (given: 1180). Print Water: 1180, then Warning: water below 1200 only if it is below 1200.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int water_litres;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int water_litres;\n    scanf("%d", &water_litres);\n    printf("Water: %d\\n", water_litres);\n    if (water_litres < 1200) {\n        printf("Warning: water below 1200\\n");\n    }\n    return 0;\n}\n',
        hint: 'scanf first, then printf, then if (water_litres < 1200).',
        stdin: ['1180'],
        checks: [
          { message: 'Print Water: 1180', outputIncludes: 'Water: 1180' },
          { message: 'Print the warning', outputIncludes: 'Warning: water below 1200' },
          { message: 'Use <', codeIncludes: '< 1200' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Rules written in words ("under 18", "at least 3", "no more than 10") hide a < or a <=. Find one rule from your life and write it as a C condition.',
    starters: ['The rule is...', 'As a condition: ...'],
  },
  notes: 'Relational (<, >, <=, >=) and equality (==, !=) operators yield int 1 or 0 (ISO C 6.5.8-6.5.9). Station thresholds are fictional.',
};

export default lesson;
