import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Reading lesson: char, single quotes, %c, and characters as numbers (ASCII). */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Characters with char',
  summary: 'Sol 2, 16:40. Lars\'s old status codes are single letters: G for green, A for amber, R for red. The board needs a type for one letter, and it turns out a letter is secretly a number.',
  minutes: 11,
  outcomes: [
    'Store one character in a char, in single quotes',
    'Print it with %c',
    'Explain that every character is stored as a number',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'One letter, one byte',
      html: '<p>A <code>char</code> holds <strong>one character</strong>: a letter, a digit, a symbol or a space. Write it in <strong>single quotes</strong>:</p><p><code>char status = \'G\';</code></p><p>Print it with <code>%c</code> (c for character):</p><p><code>printf("Status: %c\\n", status);</code> prints <strong>Status: G</strong></p><h3>Single quotes, double quotes</h3><p>Single quotes hold exactly one character: <code>\'G\'</code>. Double quotes hold text, any length: <code>"Green"</code>. They\'re different things in C. <code>char s = "G";</code> is a mistake.</p><h3>A secret: characters are numbers</h3><p>Inside the computer, every character is stored as a small number. The table most computers use is called <strong>ASCII</strong>: <code>\'A\'</code> is 65, <code>\'B\'</code> is 66, <code>\'a\'</code> is 97, <code>\'0\'</code> (the digit) is 48.</p><p>So <code>printf("%d", \'A\')</code> prints 65, and <code>\'A\' + 1</code> is <code>\'B\'</code>. Lars used this to step through status codes.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Status codes',
      code: '#include <stdio.h>\n\nint main(void) {\n    char status = \'G\';\n\n    printf("Status: %c\\n", status);\n    printf("Stored as: %d\\n", status);\n    printf("Next letter: %c\\n", status + 1);\n    return 0;\n}\n',
      caption: 'Run it: the same char printed as a character and as a number.',
      challenge: 'Change status to \'R\'. What number is R stored as?',
    },
  ],
  apply: {
    scenario: 'Sol 2, 16:40. Lars\'s status codes.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which line stores the letter A in a char?',
        options: [
          { text: 'char grade = "A";', why: 'Double quotes make text, not a single char.' },
          { text: 'char grade = \'A\';' },
          { text: 'char grade = A;', why: 'Without quotes, C looks for a variable called A.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'char code = \'R\';\nprintf("Code %c\\n", code);',
        language: 'c',
        options: [
          { text: 'Code R' },
          { text: 'Code 82', why: '%c prints the character. %d would print the number 82.' },
          { text: 'Code code', why: 'The value of the variable is printed, not its name.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make a char called status holding A (for amber) and print Status: A',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    char status = \'A\';\n    printf("Status: %c\\n", status);\n    return 0;\n}\n',
        hint: 'char status = \'A\'; then printf with %c.',
        checks: [
          { message: 'Print Status: A', outputIncludes: 'Status: A' },
          { message: 'Use a char', codeIncludes: 'char status' },
          { message: 'Print it with %c', codeIncludes: '%c' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the character to the number it\'s stored as.',
        pairs: [
          ['\'A\'', '65'],
          ['\'B\'', '66'],
          ['\'z\'', '122'],
          ['\'0\'', '48'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A single char, or text?',
        groups: ['One char', 'Text'],
        items: [
          { text: '\'G\'', group: 0 },
          { text: '"Green"', group: 1 },
          { text: '\'7\'', group: 0 },
          { text: '"G"', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is wrong?',
        lines: ['char status = \'G\';', 'char mode = "N";', 'printf("%c %c\\n", status, \'X\');'],
        bug: 1,
        fix: 'char mode = \'N\';',
        explanation: 'A char needs single quotes. "N" is text (a string), not one character.',
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("%c\\n", \'G\' + 1);',
        language: 'c',
        options: [
          { text: 'G1', why: 'Characters are numbers: G is 71, plus 1 is 72, which is H.' },
          { text: 'H' },
          { text: '72', why: 'It is 72 underneath, but %c prints it as a character.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'Why is a letter a number? That\'s weird.',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Computers only store numbers. A table like ASCII says which number means which character.' },
          { text: 'Only in C. Other languages store real letters.', why: 'Every computer stores characters as numbers underneath.' },
          { text: 'It\'s a bug Lars never fixed.', why: 'It\'s how all computers work, not a bug.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the name of the table that says \'A\' is 65? (five letters)',
        answers: ['ascii'],
        placeholder: 'Five letters',
      },
      {
        kind: 'writeCode',
        prompt: 'Lars\'s board steps through codes. Start with char level = \'A\'; and print Level A, then Level B, then Level C using level, level + 1 and level + 2.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    char level = \'A\';\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    char level = \'A\';\n    printf("Level %c\\n", level);\n    printf("Level %c\\n", level + 1);\n    printf("Level %c\\n", level + 2);\n    return 0;\n}\n',
        hint: 'printf("Level %c\\n", level + 1); and so on.',
        checks: [
          { message: 'Print Level A, B and C', outputEquals: 'Level A\nLevel B\nLevel C' },
          { message: 'Use level + 1', codeIncludes: 'level + 1' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Every letter you type is secretly a number. What other things in your life are "really" numbers underneath (colours, music, photos)?',
    starters: ['Underneath, ... is really a number', 'That surprised me because...'],
  },
  deepen: {
    title: 'Beyond ASCII',
    summary: 'ASCII has 128 characters: English letters, digits and symbols. Accents, Japanese, emoji and every other script use Unicode, usually stored as UTF-8, where one character can take several chars.',
  },
  notes: 'char: ISO C 6.2.5; %c: 7.21.6.1. ASCII codes: A=65, a=97, 0=48, G=71, R=82 (ANSI X3.4-1986). ASCII has 128 code points. C does not mandate ASCII, but virtually all systems use an ASCII-compatible set.',
};

export default lesson;
