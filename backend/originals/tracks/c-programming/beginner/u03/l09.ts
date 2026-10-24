import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Reading lesson: true and false in C are numbers; !, and bool from stdbool.h. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Not, true and false',
  summary: 'Sol 3, 17:00. In HABCON\'s code, Ines finds if (!fans_on). No comparison at all, just a name and an exclamation mark. Lars\'s margin note: "In C, truth is a number."',
  minutes: 11,
  outcomes: [
    'Explain that C treats 0 as false and any other number as true',
    'Flip a condition with !',
    'Use bool, true and false from stdbool.h',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'In C, truth is a number',
      html: '<p>For most of its history, C had no special true/false type. Instead, a condition is just a number:</p><ul><li><strong>0</strong> means false</li><li><strong>anything else</strong> means true (1, 42, -7...)</li></ul><p>Comparisons give back numbers too: <code>5 &gt; 3</code> is <strong>1</strong>, <code>5 &lt; 3</code> is <strong>0</strong>. Try <code>printf("%d\\n", 5 &gt; 3);</code> and you\'ll see a 1.</p><h3>Flipping with !</h3><p><code>!</code> means "not". It turns true into false and false into true: <code>!1</code> is 0 and <code>!0</code> is 1. So <code>if (!fans_on)</code> reads "if the fans are not on".</p><h3>bool, the modern way</h3><p>Since 1999, C has <code>bool</code>. Include <code>&lt;stdbool.h&gt;</code> and you can write <code>bool fans_on = true;</code>. Underneath it\'s still 0 and 1, but your code says what you mean.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Truth as a number',
      code: '#include <stdio.h>\n#include <stdbool.h>\n\nint main(void) {\n    bool fans_on = false;\n\n    printf("5 > 3 is %d\\n", 5 > 3);\n    printf("5 < 3 is %d\\n", 5 < 3);\n    printf("fans_on is %d\\n", fans_on);\n\n    if (!fans_on) {\n        printf("Warning: fans are off\\n");\n    }\n    return 0;\n}\n',
      caption: 'Run it. Comparisons print 1 or 0.',
      challenge: 'Set fans_on to true. Does the warning still print?',
    },
  ],
  apply: {
    scenario: 'Sol 3, 17:00. Lars\'s "truth is a number".',
    items: [
      {
        kind: 'mcq',
        prompt: 'In a C condition, which value counts as false?',
        options: [
          { text: '0' },
          { text: '-1', why: 'Any number that isn\'t 0 counts as true, even negative ones.' },
          { text: 'Any negative number', why: 'Only 0 is false.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false in an if?',
        groups: ['True', 'False'],
        items: [
          { text: '1', group: 0 },
          { text: '0', group: 1 },
          { text: '42', group: 0 },
          { text: '!1', group: 1 },
          { text: '!0', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("%d %d\\n", 10 > 2, 10 == 2);',
        language: 'c',
        options: [
          { text: 'true false', why: 'C prints comparisons as numbers: 1 for true, 0 for false.' },
          { text: '1 0' },
          { text: '10 2', why: 'It prints the result of each comparison, not the numbers compared.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'With bool fans_on = false; print Fans are off using if (!fans_on).',
        starter: '#include <stdio.h>\n#include <stdbool.h>\n\nint main(void) {\n    bool fans_on = false;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n#include <stdbool.h>\n\nint main(void) {\n    bool fans_on = false;\n    if (!fans_on) {\n        printf("Fans are off\\n");\n    }\n    return 0;\n}\n',
        hint: 'if (!fans_on) { printf("Fans are off\\n"); }',
        checks: [
          { message: 'Print Fans are off', outputIncludes: 'Fans are off' },
          { message: 'Use !', codeIncludes: '!fans_on' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each expression to its value.',
        pairs: [
          ['!0', '1'],
          ['!1', '0'],
          ['3 > 1', '1 as well'],
          ['3 < 1', '0 as well'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'bool won\'t compile here. Which line is missing?',
        lines: ['#include <stdio.h>', 'int main(void) {', '    bool suit_ok = true;', '    return 0;', '}'],
        bug: 0,
        fix: '#include <stdio.h>\n#include <stdbool.h>',
        explanation: 'bool, true and false come from stdbool.h. Without it, C doesn\'t know them.',
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'Warn when the suit check has NOT passed.',
        template: '[[1]] suit_ok = false;\nif ([[2]]suit_ok) {\n    printf("Suit check failed\\n");\n}',
        blanks: [['bool'], ['!']],
        distractors: ['int', '~'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'So if (water) is true whenever there\'s any water at all?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Yes: any number but 0 is true. But if (water > 0) says what you mean more clearly.' },
          { text: 'No, only if water is exactly 1.', why: 'Any non-zero value counts as true.' },
          { text: 'It won\'t compile.', why: 'It compiles: an int can be a condition.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which header gives you bool, true and false? (no .h needed)',
        answers: ['stdbool', 'stdbool.h'],
        placeholder: 'Header name',
      },
      {
        kind: 'writeCode',
        prompt: 'Make bool door_sealed = true; and bool suit_ok = false;. Print Do not go out if the door is sealed and the suit is NOT ok.',
        starter: '#include <stdio.h>\n#include <stdbool.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n#include <stdbool.h>\n\nint main(void) {\n    bool door_sealed = true;\n    bool suit_ok = false;\n    if (door_sealed && !suit_ok) {\n        printf("Do not go out\\n");\n    }\n    return 0;\n}\n',
        hint: 'if (door_sealed && !suit_ok)',
        checks: [
          { message: 'Print Do not go out', outputIncludes: 'Do not go out' },
          { message: 'Use ! on suit_ok', codeIncludes: '!suit_ok' },
          { message: 'Use bool', codeIncludes: 'bool' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Lars wrote if (!fans_on) instead of if (fans_on == 0). Which do you find easier to read, and why?',
    starters: ['I find ... easier because...', 'For other people, I\'d write...'],
  },
  notes: 'Scalar conditions compare unequal to 0 (ISO C 6.8.4.1); relational/equality/logical operators yield int 0 or 1 (6.5.8-6.5.14); ! (6.5.3.3). bool/true/false via stdbool.h since C99 (7.18); C23 makes them keywords.',
};

export default lesson;
