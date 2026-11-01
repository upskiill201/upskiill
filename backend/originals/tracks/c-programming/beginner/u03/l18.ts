import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 18. Reading lesson: boundary values, off-by-one at thresholds, testing just below / at / just above. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Edges of a range',
  summary: 'Sol 3, 23:20. Tomoko\'s testing method: never test the middle. Test the edges. 999, 1000 and 1001 tell you more about an alarm than a thousand random readings.',
  minutes: 11,
  outcomes: [
    'Test a condition just below, exactly at, and just above its limit',
    'Fix off-by-one mistakes in thresholds',
    'Turn a written rule into exact boundary tests',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Tomoko\'s three tests',
      html: '<p>Most bugs in conditions sit right on the <strong>edge</strong>: the exact limit where the answer is supposed to change. Was it <code>&lt;</code> or <code>&lt;=</code>? Was the rule "over 2,000" or "2,000 and over"?</p><p>Tomoko tests every threshold with three values:</p><ul><li><strong>just below</strong> the limit (1999)</li><li><strong>exactly at</strong> the limit (2000)</li><li><strong>just above</strong> it (2001)</li></ul><p>Write down what the rule says should happen for each, <em>before</em> running anything. Then run all three. If any answer differs, the condition is off by one.</p><h3>A range has two edges</h3><p>"Pressure from 95 to 105" has six interesting tests: 94, 95, 96 and 104, 105, 106. Anything in the middle, like 100, proves very little.</p><p>This habit has a name in software testing: <strong>boundary value testing</strong>. It\'s one of the cheapest ways to find real bugs.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Three tests in one run',
      code: '#include <stdio.h>\n\nint main(void) {\n    int reading;\n\n    for (int i = 0; i < 3; i++) {\n        scanf("%d", &reading);\n        if (reading > 2000) {\n            printf("%d -> ALARM\\n", reading);\n        } else {\n            printf("%d -> OK\\n", reading);\n        }\n    }\n    return 0;\n}\n',
      caption: 'This runs the same check on 1999, 2000 and 2001 (the for line repeats it three times; loops are next sol). Run it.',
      challenge: 'Change > to >= and run it. Which of the three answers changes?',
      stdin: ['1999', '2000', '2001'],
    },
  ],
  apply: {
    scenario: 'Sol 3, 23:20. Testing the edges.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Rule: alarm when the reading is over 2000. Which three readings test it best?',
        options: [
          { text: '500, 1500, 3000', why: 'None of these is near the limit, so an off-by-one bug would slip through.' },
          { text: '1999, 2000, 2001' },
          { text: '2000, 2000, 2000', why: 'Three identical tests only check one case.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Rule: ALARM when over 2000. What should each reading give?',
        groups: ['ALARM', 'OK'],
        items: [
          { text: '1999', group: 1 },
          { text: '2000', group: 1 },
          { text: '2001', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Rule: "ration mode at 1200 litres or less". Testing 1200 gives Normal. Which line is wrong?',
        lines: ['if (water < 1200) {', '    printf("Ration mode\\n");', '} else {', '    printf("Normal\\n");', '}'],
        bug: 0,
        fix: 'if (water <= 1200) {',
        explanation: '"1200 or less" includes 1200 itself. < leaves it out: the edge test caught it.',
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Rule: "charge the rover when the battery is 20% or less". Read the battery (given: 20) and print Charge or Drive.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int battery;\n    scanf("%d", &battery);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int battery;\n    scanf("%d", &battery);\n    if (battery <= 20) {\n        printf("Charge\\n");\n    } else {\n        printf("Drive\\n");\n    }\n    return 0;\n}\n',
        hint: '"20 or less" is <= 20. The given input is exactly the edge.',
        stdin: ['20'],
        checks: [
          { message: 'Print Charge at exactly 20', outputIncludes: 'Charge' },
          { message: 'Use <= 20', codeIncludes: '<= 20' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to the condition.',
        pairs: [
          ['Over 2000', '> 2000'],
          ['2000 or more', '>= 2000'],
          ['Under 20', '< 20'],
          ['20 or less', '<= 20'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Pressure must be from 95 to 105. Which set of tests covers both edges?',
        options: [
          { text: '94, 95, 105, 106' },
          { text: '100 only', why: 'The middle of a range tells you nothing about its edges.' },
          { text: '95, 105', why: 'Better, but you also need just outside: 94 and 106.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'I tested the alarm with 5,000 and it worked. Done?',
        prompt: 'Tomoko\'s answer?',
        options: [
          { text: 'Not done. 5,000 is far from the edge. Test 1,999, 2,000 and 2,001.' },
          { text: 'Yes, 5,000 is a big number.', why: 'Big numbers pass even when the edge is wrong.' },
          { text: 'Test 10,000 too.', why: 'Another far-away value. The edges are where it breaks.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is this kind of testing called: "___ value testing"?',
        answers: ['boundary', 'edge'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Rule: "fans on at 1000 ppm and above". Complete the condition.',
        template: 'if (co2_ppm [[1]] 1000) {\n    fans_on = 1;\n}',
        blanks: [['>=']],
        distractors: ['>', '<=', '=='],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Rule: pressure is OK from 95 to 105 inclusive. Read three readings (given: 94, 95, 105) and print OK or OUT for each, one per line.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int a;\n    int b;\n    int c;\n    scanf("%d %d %d", &a, &b, &c);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int a;\n    int b;\n    int c;\n    scanf("%d %d %d", &a, &b, &c);\n    printf("%s\\n", a >= 95 && a <= 105 ? "OK" : "OUT");\n    printf("%s\\n", b >= 95 && b <= 105 ? "OK" : "OUT");\n    printf("%s\\n", c >= 95 && c <= 105 ? "OK" : "OUT");\n    return 0;\n}\n',
        hint: 'Check each with >= 95 && <= 105. An if-else per reading works too.',
        stdin: ['94', '95', '105'],
        checks: [
          { message: 'Print OUT, OK, OK', outputIncludes: 'OUT\nOK\nOK' },
          { message: 'Use >= 95', codeIncludes: '>= 95' },
          { message: 'Use <= 105', codeIncludes: '<= 105' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Edges are where rules get argued about: "under 18", "by Friday", "up to 2 bags". Pick one rule from your life and list its just-below, at, and just-above cases.',
    starters: ['The rule is...', 'Just below / at / just above:...'],
  },
  notes: 'Boundary value analysis is a standard black-box testing technique (e.g. ISTQB Foundation syllabus). The for loop in the Try it card is previewed; loops are Chapter 4. The final solution uses %s with ?: as previewed in lesson 17.',
};

export default lesson;
