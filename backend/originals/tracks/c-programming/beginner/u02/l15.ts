import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 15 — Checkpoint. Reviews lessons 11–14: += ++, const and #define, widths, sizeof. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Tomoko\'s seed count',
  summary: 'Sol 2, 22:15. Tomoko plants seed trays every evening and wants a neat log: trays planted, seeds per tray as a constant, and a tidy table she can read without her glasses.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Update counts with += and ++', 'Use named constants and lined-up output'],
  learn: [
    {
      kind: 'story',
      title: 'Sol 2, 22:15. The GreenHab',
      beats: [
        { speaker: 'tomoko', text: 'Twelve seeds per tray, always. I planted 3 trays this morning, 2 more tonight, and one I forgot to count.' },
        { speaker: 'ines', text: 'Seeds per tray is a constant. The trays go up as you plant.' },
        { speaker: 'tomoko', text: 'And line the numbers up. My eyes are tired.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the seed log.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int trays = 3;\ntrays += 2;\ntrays++;\nprintf("%d\\n", trays);',
        language: 'c',
        options: [
          { text: '5', why: 'trays += 2 gives 5, then ++ gives 6.' },
          { text: '6' },
          { text: '3', why: 'Both lines change trays.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Start with trays = 3. Add 2 with +=, add one more with ++. With const int SEEDS_PER_TRAY = 12; print Seeds: 72',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int trays = 3;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    const int SEEDS_PER_TRAY = 12;\n    int trays = 3;\n    trays += 2;\n    trays++;\n    printf("Seeds: %d\\n", trays * SEEDS_PER_TRAY);\n    return 0;\n}\n',
        hint: 'trays += 2; trays++; then multiply by SEEDS_PER_TRAY.',
        checks: [
          { message: 'Print Seeds: 72', outputIncludes: 'Seeds: 72' },
          { message: 'Use the constant', codeIncludes: 'const int SEEDS_PER_TRAY' },
          { message: 'Use ++', codeIncludes: 'trays++' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it does.',
        pairs: [
          ['#define TRAYS 6', 'Swaps TRAYS for 6 before compiling'],
          ['const int TRAYS = 6;', 'A variable that can\'t change'],
          ['trays++;', 'Adds one'],
          ['printf("%5d", 6);', 'Prints 6 in a width of 5'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t compile?',
        lines: ['const int SEEDS_PER_TRAY = 12;', 'int trays = 5;', 'SEEDS_PER_TRAY = 10;', 'trays++;'],
        bug: 2,
        fix: 'Delete the line, or change the 12 where the constant is declared.',
        explanation: 'SEEDS_PER_TRAY is const: C won\'t let the program change it.',
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("[%-4d][%04d]\\n", 12, 12);',
        language: 'c',
        options: [
          { text: '[12  ][0012]' },
          { text: '[  12][0012]', why: 'The minus pads on the right: the number is on the left.' },
          { text: '[12][12]', why: 'Both have a width of 4.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Constant or variable?',
        groups: ['Constant', 'Variable'],
        items: [
          { text: 'Seeds per tray (always 12)', group: 0 },
          { text: 'Trays planted so far', group: 1 },
          { text: 'Days in the mission (10)', group: 0 },
          { text: 'Seeds that sprouted', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Line the count up 4 wide and ask what an int costs.',
        template: 'printf("Trays: [[1]]\\n", trays);\nprintf("An int is %zu bytes\\n", [[2]](int));',
        blanks: [['%4d'], ['sizeof']],
        distractors: ['%-d', 'size'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'If I start using 16 seeds per tray next mission, what changes in the program?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'One line: the value of SEEDS_PER_TRAY at the top. Every calculation follows.' },
          { text: 'Every line that multiplies by 12.', why: 'That\'s why it\'s a named constant: there\'s only one 12.' },
          { text: 'Nothing, constants can never change.', why: 'The program can\'t change it while running; Ines can edit the code.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'int sprouts = 40; sprouts -= 15; sprouts--; What is sprouts now?',
        answers: ['24'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Print Tomoko\'s table exactly, numbers 4 wide on the right:\nTrays    6\nSeeds   72',
        starter: '#include <stdio.h>\n\n#define SEEDS_PER_TRAY 12\n\nint main(void) {\n    int trays = 6;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\n#define SEEDS_PER_TRAY 12\n\nint main(void) {\n    int trays = 6;\n    printf("Trays %4d\\n", trays);\n    printf("Seeds %4d\\n", trays * SEEDS_PER_TRAY);\n    return 0;\n}\n',
        hint: 'printf("Trays %4d\\n", trays); and printf("Seeds %4d\\n", trays * SEEDS_PER_TRAY);',
        checks: [
          { message: 'Print the table exactly', outputEquals: 'Trays    6\nSeeds   72' },
          { message: 'Use the #define', codeIncludes: 'trays * SEEDS_PER_TRAY' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Tomoko keeps one number fixed (seeds per tray) and counts the rest. What fixed rules and changing counts are in your week?',
    starters: ['A fixed rule in my week is...', 'A count that changes is...'],
  },
  notes: 'Review of chapter 2 lessons 11-14.',
};

export default lesson;
