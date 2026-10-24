import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 17. Myth or Fact: the conditional operator ?: picks one of two values. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'The ?: shortcut',
  summary: 'Sol 3, 23:00. Before bed, in HABCON\'s code, Ines finds a line with a question mark and a colon in the middle: fans = co2 > 1000 ? 2 : 1;. It\'s a whole if-else in one line.',
  minutes: 10,
  outcomes: [
    'Read condition ? a : b as "if condition then a, otherwise b"',
    'Use ?: to choose a value',
    'Know when an if-else is clearer',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'condition ? a : b gives a when the condition is true, b when it\'s false.', isFact: true, explain: 'Fact. It\'s called the conditional (or ternary) operator: a question, then two answers.' },
        { text: '?: can run several statements, like an if block.', isFact: false, explain: 'Myth. It chooses between two VALUES. For running statements, use if-else.' },
        { text: 'int fans = co2 > 1000 ? 2 : 1; is the same as an if-else that sets fans.', isFact: true, explain: 'Fact. if (co2 > 1000) { fans = 2; } else { fans = 1; } does the same in five lines.' },
        { text: 'Nesting several ?: in one line is a good habit.', isFact: false, explain: 'Myth. a ? b : c ? d : e works, but it\'s hard to read. Lars\'s rule: one ?: per line, or use if.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Lars\'s fan line',
      code: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm = 1150;\n    int fans = co2_ppm > 1000 ? 2 : 1;\n\n    printf("Fans running: %d\\n", fans);\n    printf("Air: %s\\n", co2_ppm > 1000 ? "stuffy" : "fresh");\n    return 0;\n}\n',
      caption: 'Run it. The second printf uses ?: to pick a word (you\'ll meet %s properly in Chapter 7).',
      challenge: 'Change co2_ppm to 600 and run it again.',
    },
  ],
  apply: {
    scenario: 'Sol 3, 23:00. Lars\'s one-line decisions.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int battery = 15;\nint mode = battery < 20 ? 0 : 1;\nprintf("%d\\n", mode);',
        language: 'c',
        options: [
          { text: '0' },
          { text: '1', why: '15 < 20 is true, so the value before the colon is chosen: 0.' },
          { text: '15', why: '?: picks one of the two values after the ?.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of x > 5 ? 10 : 20 to its role.',
        pairs: [
          ['x > 5', 'The question'],
          ['10', 'The answer if true'],
          ['20', 'The answer if false'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Use ?: to set fans to 2 if co2_ppm is over 1000, otherwise 1. Print Fans: and the value. (co2_ppm is given: 1150)',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm;\n    scanf("%d", &co2_ppm);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm;\n    scanf("%d", &co2_ppm);\n    int fans = co2_ppm > 1000 ? 2 : 1;\n    printf("Fans: %d\\n", fans);\n    return 0;\n}\n',
        hint: 'int fans = co2_ppm > 1000 ? 2 : 1;',
        stdin: ['1150'],
        checks: [
          { message: 'Print Fans: 2', outputIncludes: 'Fans: 2' },
          { message: 'Use ?:', codeIncludes: '?' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: '?: or if-else?',
        groups: ['?: fits', 'Use if-else'],
        items: [
          { text: 'Pick 2 fans or 1 fan', group: 0 },
          { text: 'Print three warnings and sound the alarm', group: 1 },
          { text: 'Choose the word "day" or "night"', group: 0 },
          { text: 'Five levels from green to danger', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Pick the larger of a and b.',
        template: 'int biggest = a > b [[1]] a [[2]] b;',
        blanks: [['?'], [':']],
        distractors: [';', '!'],
        language: 'c',
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t compile?',
        lines: ['int fans = co2 > 1000 ? 2 : 1;', 'int mode = battery < 20 ? 0;', 'int lights = night ? 1 : 0;'],
        bug: 1,
        fix: 'int mode = battery < 20 ? 0 : 1;',
        explanation: '?: always needs both answers: the one after ? and the one after :.',
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'Lars uses ?: everywhere. Should you?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'For picking between two values, yes. For anything bigger, an if-else is clearer.' },
          { text: 'Always: it\'s shorter.', why: 'Short isn\'t always clear. Nested ?: is famously hard to read.' },
          { text: 'Never: it\'s outdated.', why: 'It\'s standard C and fine for simple value choices.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'x is 3. What is x > 5 ? 10 : 20?',
        answers: ['20'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which if-else does the same as int fans = co2 > 1000 ? 2 : 1; ?',
        options: [
          { text: 'int fans; if (co2 > 1000) { fans = 2; } else { fans = 1; }' },
          { text: 'int fans; if (co2 > 1000) { fans = 1; } else { fans = 2; }', why: 'The answers are swapped: true should give 2.' },
          { text: 'int fans = 2; if (co2 > 1000) { fans = 1; }', why: 'That gives 1 when CO2 is high: backwards.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Read two battery levels (given: 64 then 31). Use ?: to find the lower one and print Lowest: 31',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int rover1;\n    int rover2;\n    scanf("%d %d", &rover1, &rover2);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int rover1;\n    int rover2;\n    scanf("%d %d", &rover1, &rover2);\n    int lowest = rover1 < rover2 ? rover1 : rover2;\n    printf("Lowest: %d\\n", lowest);\n    return 0;\n}\n',
        hint: 'int lowest = rover1 < rover2 ? rover1 : rover2;',
        stdin: ['64 31'],
        checks: [
          { message: 'Print Lowest: 31', outputIncludes: 'Lowest: 31' },
          { message: 'Use ?:', codeIncludes: '?' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Lars packs a whole decision into one line. When is it better to be short, and when is it better to spell things out?',
    starters: ['Short is better when...', 'Spelling it out is better when...'],
  },
  notes: 'Conditional operator: ISO C 6.5.15. %s is used once here as a preview; strings are taught in Chapter 7.',
};

export default lesson;
