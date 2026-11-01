import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 18. Tap to explore: uninitialised variables hold garbage; always give a starting value. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'The value you forgot to set',
  summary: 'Sol 2, 23:20. Mateus\'s rover log adds up distances into a total he never set to zero. On his laptop it said 0 yesterday. Tonight on another machine it says 21,947,215 km.',
  minutes: 11,
  outcomes: [
    'Explain why a declared-but-unset variable holds garbage',
    'Always initialise totals and counters',
    'Spot uninitialised variables in code',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Mateus\'s rover log',
      text: 'int total_km;\nint leg1_km = 12;\nint leg2_km = 9;\n\ntotal_km += leg1_km;\ntotal_km += leg2_km;\nprintf("Total: %d km\\n", total_km);',
      hotspots: [
        { phrase: 'int total_km;', note: 'Declared, but never given a value. C doesn\'t clear the box: it holds whatever bits were last left in that memory. Programmers call this "garbage".' },
        { phrase: 'total_km += leg1_km;', note: '+= adds to the current value. If the current value is garbage, the result is garbage plus 12.' },
        { phrase: 'printf("Total: %d km\\n", total_km);', note: 'Might print 21, might print 21947215. It can even differ between runs or machines. That\'s what makes this bug so nasty.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Reading a variable before giving it a value is undefined behaviour in C. This runner often shows 0, which hides the bug. A real board may not. Always initialise: int total_km = 0;',
    },
    {
      kind: 'tryIt',
      title: 'Start from zero',
      code: '#include <stdio.h>\n\nint main(void) {\n    int total_km = 0;\n    int leg1_km = 12;\n    int leg2_km = 9;\n\n    total_km += leg1_km;\n    total_km += leg2_km;\n    printf("Total: %d km\\n", total_km);\n    return 0;\n}\n',
      caption: 'The fixed version: total_km starts at 0. Run it.',
      challenge: 'Add a third leg of 7 km and add it to the total.',
    },
  ],
  apply: {
    scenario: 'Sol 2, 23:20. The 21-million-kilometre rover.',
    items: [
      {
        kind: 'mcq',
        prompt: 'int count; is declared but never set. What is in count?',
        options: [
          { text: 'Always 0', why: 'C doesn\'t promise 0 for a variable like this. It could be anything.' },
          { text: 'Whatever was left in that memory: garbage' },
          { text: 'It doesn\'t exist yet', why: 'The box exists; it just hasn\'t been given a value.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line causes the garbage total?',
        lines: ['int total_km;', 'int leg_km = 12;', 'total_km += leg_km;', 'printf("%d\\n", total_km);'],
        bug: 0,
        fix: 'int total_km = 0;',
        explanation: 'The total starts with no value. += then adds to garbage.',
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the log so it prints Total: 21 km on every machine.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int total_km;\n    total_km += 12;\n    total_km += 9;\n    printf("Total: %d km\\n", total_km);\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int total_km = 0;\n    total_km += 12;\n    total_km += 9;\n    printf("Total: %d km\\n", total_km);\n    return 0;\n}\n',
        hint: 'Give total_km a starting value of 0.',
        checks: [
          { message: 'Print Total: 21 km', outputIncludes: 'Total: 21 km' },
          { message: 'Start the total at 0', codeIncludes: 'int total_km = 0;' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe, or reads garbage?',
        groups: ['Safe', 'Reads garbage'],
        items: [
          { text: 'int n = 0; n++;', group: 0 },
          { text: 'int n; n++;', group: 1 },
          { text: 'int n; n = 5; n++;', group: 0 },
          { text: 'int sum; sum += 3;', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is this bug so hard to find?',
        options: [
          { text: 'It can print the right answer on one machine and garbage on another' },
          { text: 'The compiler hides it', why: 'The compiler may warn, but it\'s the changing output that makes it sneaky.' },
          { text: 'It only happens with doubles', why: 'Any type can be left unset.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it does.',
        pairs: [
          ['int total;', 'Box with no starting value'],
          ['int total = 0;', 'Box starting at zero'],
          ['total = 0;', 'Sets an existing box to zero'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'It said 0 on my laptop yesterday. So it\'s fine there, right?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'It was lucky, not fine. The next run, or the next machine, can give garbage. Set it to 0.' },
          { text: 'Yes, laptops always clear memory.', why: 'C makes no such promise. Yesterday was luck.' },
          { text: 'Only the board has this problem.', why: 'Any C program, on any machine, can read garbage from an unset variable.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do programmers call the leftover value in an unset variable? (one word)',
        answers: ['garbage', 'junk', 'rubbish'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Give every counter a safe start.',
        template: 'int sprouted = [[1]];\nsprouted += 4;\nprintf("%d\\n", sprouted);  // must print 4',
        blanks: [['0']],
        distractors: ['1', 'NULL'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Count the GreenHab readings: start a counter at 0, add 1 three times with ++, and print Readings: 3',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int readings = 0;\n    readings++;\n    readings++;\n    readings++;\n    printf("Readings: %d\\n", readings);\n    return 0;\n}\n',
        hint: 'int readings = 0; then readings++; three times.',
        checks: [
          { message: 'Print Readings: 3', outputIncludes: 'Readings: 3' },
          { message: 'Start at 0', codeIncludes: '= 0;' },
          { message: 'Use ++', codeIncludes: '++' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Mateus trusted a result because it looked right once. When have you trusted something because it worked one time?',
    starters: ['I trusted...', 'Now I\'d check by...'],
  },
  deepen: {
    title: 'Let the compiler warn you',
    summary: 'gcc and clang can warn about variables used before they\'re set: compile with -Wall. Professional C programmers turn on warnings for every build.',
  },
  notes: 'Indeterminate value of uninitialised automatic objects; using it is undefined behaviour in practice (ISO C 6.7.9p10, J.2). This runner\'s locals often start at 0 (WebAssembly zero-initialises locals), which can hide the bug. gcc -Wall enables -Wuninitialized/-Wmaybe-uninitialized.',
};

export default lesson;
