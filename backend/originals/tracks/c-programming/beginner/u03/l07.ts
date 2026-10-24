import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Tap to explore: an else-if chain with three levels; order matters. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'else if: green, amber, red',
  summary: 'Sol 3, 14:30. ALARM or OK is too blunt. Tomoko wants three levels: green under 1,000, amber up to 2,000, red above. Three outcomes need a chain.',
  minutes: 12,
  outcomes: [
    'Choose between several outcomes with else if',
    'Put the conditions in an order that works',
    'Explain why only the first true branch runs',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Tomoko\'s three levels',
      text: 'if (co2_ppm < 1000) {\n    printf("GREEN\\n");\n} else if (co2_ppm <= 2000) {\n    printf("AMBER: open a vent\\n");\n} else {\n    printf("RED: alarm\\n");\n}',
      hotspots: [
        { phrase: 'if (co2_ppm < 1000)', note: 'Checked first. Under 1,000: GREEN, and C skips the rest of the chain.' },
        { phrase: 'else if (co2_ppm <= 2000)', note: 'Only checked if the first condition was false. So here we already know the reading is at least 1,000: this means 1,000 to 2,000.' },
        { phrase: '} else {', note: 'Everything left over: above 2,000. No condition needed.' },
        { phrase: 'printf("RED: alarm\\n");', note: 'Exactly one of the three printf lines runs, every time: the first one whose condition is true.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Three levels',
      code: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm;\n    printf("CO2? ");\n    scanf("%d", &co2_ppm);\n\n    if (co2_ppm < 1000) {\n        printf("GREEN\\n");\n    } else if (co2_ppm <= 2000) {\n        printf("AMBER: open a vent\\n");\n    } else {\n        printf("RED: alarm\\n");\n    }\n    return 0;\n}\n',
      caption: 'This run reads 1150: amber. Run it.',
      challenge: 'Add a fourth level: above 5000 prints DANGER: evacuate. Where in the chain must it go?',
      stdin: ['1150'],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Order matters. Check the biggest threshold first if you use >, or the smallest first if you use <. Put "> 1000" before "> 5000" and the 5000 branch can never run.',
    },
  ],
  apply: {
    scenario: 'Sol 3, 14:30. Green, amber, red.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In an if / else if / else chain, how many branches run?',
        options: [
          { text: 'Every branch whose condition is true', why: 'Only the FIRST true branch runs; the rest are skipped.' },
          { text: 'Exactly one: the first whose condition is true (or the else)' },
          { text: 'All of them, in order', why: 'A chain picks one path.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'With Tomoko\'s chain (<1000 green, <=2000 amber, else red), what prints?',
        groups: ['GREEN', 'AMBER', 'RED'],
        items: [
          { text: '450', group: 0 },
          { text: '1000', group: 1 },
          { text: '2000', group: 1 },
          { text: '2001', group: 2 },
          { text: '999', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Read the battery level (given: 45). Print FULL if it\'s 90 or more, OK if it\'s 30 or more, otherwise LOW.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int battery;\n    scanf("%d", &battery);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int battery;\n    scanf("%d", &battery);\n    if (battery >= 90) {\n        printf("FULL\\n");\n    } else if (battery >= 30) {\n        printf("OK\\n");\n    } else {\n        printf("LOW\\n");\n    }\n    return 0;\n}\n',
        hint: 'Biggest threshold first: >= 90, then >= 30, then else.',
        stdin: ['45'],
        checks: [
          { message: 'Print OK for 45', outputIncludes: 'OK' },
          { message: 'Use else if', codeIncludes: 'else if' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'DANGER never prints, even at 6000 ppm. Which line is in the wrong place?',
        lines: ['if (co2_ppm > 2000) {', '    printf("RED\\n");', '} else if (co2_ppm > 5000) {', '    printf("DANGER\\n");', '}'],
        bug: 2,
        fix: 'Check > 5000 first, then > 2000.',
        explanation: '6000 is already > 2000, so the first branch runs and the chain stops. The bigger threshold must come first.',
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The reading is 3000. What prints?',
        code: 'if (co2_ppm > 1000) {\n    printf("A\\n");\n} else if (co2_ppm > 2000) {\n    printf("B\\n");\n} else {\n    printf("C\\n");\n}',
        language: 'c',
        options: [
          { text: 'A' },
          { text: 'B', why: '3000 > 1000 is true first, so A runs and the chain stops.' },
          { text: 'A and B', why: 'Only the first true branch runs.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Build the chain so 6000 prints DANGER and 3000 prints RED.',
        lines: ['if (co2_ppm > 5000) {', '    printf("DANGER\\n");', '} else if (co2_ppm > 2000) {', '    printf("RED\\n");', '}'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'Why does the amber line only say <= 2000? Shouldn\'t it say "at least 1000 and at most 2000"?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'It only runs if the first check failed, so we already know it\'s at least 1000.' },
          { text: 'C ignores the lower limit.', why: 'C doesn\'t ignore it: the chain\'s order handles it.' },
          { text: 'You\'re right, it\'s a bug.', why: 'It works: else if only runs when the earlier conditions were false.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the chain.',
        template: 'if (water < 800) {\n    printf("Critical\\n");\n} [[1]] (water < 1200) {\n    printf("Ration\\n");\n} [[2]] {\n    printf("Normal\\n");\n}',
        blanks: [['else if'], ['else']],
        distractors: ['elif', 'if'],
        language: 'c',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Tomoko\'s chain, which level does a reading of exactly 1000 get?',
        answers: ['amber'],
        placeholder: 'green / amber / red',
      },
      {
        kind: 'writeCode',
        prompt: 'Read the CO2 level (given: 5200). Print DANGER: evacuate above 5000, RED: alarm above 2000, AMBER from 1000, otherwise GREEN.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm;\n    scanf("%d", &co2_ppm);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm;\n    scanf("%d", &co2_ppm);\n    if (co2_ppm > 5000) {\n        printf("DANGER: evacuate\\n");\n    } else if (co2_ppm > 2000) {\n        printf("RED: alarm\\n");\n    } else if (co2_ppm >= 1000) {\n        printf("AMBER\\n");\n    } else {\n        printf("GREEN\\n");\n    }\n    return 0;\n}\n',
        hint: 'Biggest first: > 5000, then > 2000, then >= 1000, then else.',
        stdin: ['5200'],
        checks: [
          { message: 'Print DANGER: evacuate for 5200', outputIncludes: 'DANGER: evacuate' },
          { message: 'Don\'t also print RED', outputEquals: '5200\nDANGER: evacuate' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Traffic lights, phone batteries, weather warnings: lots of things use three or four levels. Pick one and write its levels as an else-if chain in words.',
    starters: ['The thing I picked is...', 'Its levels are...'],
  },
  notes: 'else if is an if statement in the else branch (ISO C 6.8.4.1). CO2 bands are fictional station rules.',
};

export default lesson;
