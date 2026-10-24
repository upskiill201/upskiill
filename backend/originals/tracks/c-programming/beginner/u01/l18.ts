import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 18. Myth or Fact: capitals, spelling and the typos C rejects. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Typos C won\'t forgive',
  summary: 'Sol 1, 23:30. Ines types Printf with a capital P out of habit. Her phone would have fixed it. C won\'t. Which mistakes does C let slide, and which does it never?',
  minutes: 10,
  outcomes: [
    'Explain that C is case-sensitive',
    'Spot capital-letter and spelling typos in names',
    'Know which mistakes compile and which don\'t',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'printf and Printf are the same to C.', isFact: false, explain: 'Myth. C is case-sensitive: a capital letter makes a different name. Printf is a name C has never heard of.' },
        { text: 'A typo inside printf\'s quotes still compiles.', isFact: true, explain: 'Fact. Text in quotes is just text. printf("Oxgyen OK") compiles and prints the typo. C only checks the code around it.' },
        { text: 'Writing Main instead of main is fine.', isFact: false, explain: 'Myth. The program must have a function called exactly main, all lowercase, or there\'s nowhere to start.' },
        { text: 'C will guess what you meant if a name is close.', isFact: false, explain: 'Myth. C never guesses. It tells you the name is undeclared and stops. Some compilers suggest a fix, but they never apply it for you.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Capital trouble',
      code: '#include <stdio.h>\n\nint main(void) {\n    Printf("Oxygen OK\\n");\n    return 0;\n}\n',
      caption: 'Run it and read the error. Only one letter is wrong.',
      challenge: 'Fix the capital and run it again.',
      expectError: true,
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Everything C knows about is written in lowercase: printf, puts, main, int, return, include. Capitals in those names are always a typo.',
    },
  ],
  apply: {
    scenario: 'Sol 1, 23:30. Hunting typos.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "C is case-sensitive" mean?',
        options: [
          { text: 'Capital and small letters count as different letters' },
          { text: 'C only accepts capital letters', why: 'The opposite: C\'s own names are all lowercase.' },
          { text: 'C ignores capitals', why: 'It does the opposite. printf and Printf are two different names.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Compiles, or compile error?',
        groups: ['Compiles', 'Compile error'],
        items: [
          { text: 'printf("Oxgyen OK\\n");', group: 0 },
          { text: 'Printf("Oxygen OK\\n");', group: 1 },
          { text: 'PRINTF("Oxygen OK\\n");', group: 1 },
          { text: 'printf("OXYGEN OK\\n");', group: 0 },
          { text: 'Return 0;', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Two capital-letter typos. Fix them so the program prints Oxygen OK.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    Printf("Oxygen OK\\n");\n    Return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Oxygen OK\\n");\n    return 0;\n}\n',
        hint: 'C\'s own names are all lowercase: printf and return.',
        checks: [
          { message: 'Print Oxygen OK', outputIncludes: 'Oxygen OK' },
          { message: 'Use lowercase return', codeIncludes: 'return 0;' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This compiles, but the crew will laugh at the screen. Which line has the typo?',
        lines: ['puts("Hab: OK");', 'puts("GreenHab: OK");', 'puts("Oxgyen: OK");', 'puts("Water: OK");'],
        bug: 2,
        fix: 'puts("Oxygen: OK");',
        explanation: 'Typos inside quotes compile fine. The compiler never checks your spelling of words, only of code.',
        language: 'c',
      },
      {
        kind: 'mcq',
        prompt: 'A program has int Main(void) instead of int main(void). What happens?',
        options: [
          { text: 'It runs normally', why: 'C looks for main exactly. Main is a different name.' },
          { text: 'It fails to build: there\'s no main for the program to start from' },
          { text: 'It runs, but prints in capitals', why: 'Capitals in a name don\'t change the output; they change which name it is.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the typo to what happens.',
        pairs: [
          ['Printf(...)', '\'Printf\' undeclared'],
          ['int Main(void)', 'No main() function'],
          ['puts("Oxgyen")', 'Compiles and prints the typo'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'My phone fixes my typos. Why can\'t C?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'A guess that\'s wrong would run silently. On a station, an error you can see is safer than a fix you can\'t.' },
          { text: 'C is too old to fix typos.', why: 'Age isn\'t the reason. Not guessing is deliberate.' },
          { text: 'It can, if you ask nicely.', why: 'C never rewrites your code. You fix it yourself.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Type the correct spelling of the function that starts every C program.',
        answers: ['main'],
        placeholder: 'All lowercase',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the first line of main, with every name spelled right.',
        tiles: ['int', 'main', '(', 'void', ')', '{'],
        distractors: ['Int', 'Main', 'VOID'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Three typos: one capital in a function name, one misspelled header, one capital in main. Fix them all so it prints Water OK.',
        starter: '#include <stdoi.h>\n\nint Main(void) {\n    Puts("Water OK");\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    puts("Water OK");\n    return 0;\n}\n',
        hint: 'Fix the first error, run, then the next: stdio.h, main, puts.',
        checks: [
          { message: 'Print Water OK', outputIncludes: 'Water OK' },
          { message: 'Name the function main', codeIncludes: 'int main(' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'C refuses to guess what you meant. When is it better for a tool (or a person) to stop and ask instead of guessing?',
    starters: ['It\'s better to stop and ask when...', 'A guess went wrong for me when...'],
  },
  notes: 'C identifiers are case-sensitive (ISO C 6.4.2). Program entry point must be named main (5.1.2.2.1). clang/gcc may print "did you mean" suggestions but never apply them automatically.',
};

export default lesson;
