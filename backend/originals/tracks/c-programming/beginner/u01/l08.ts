import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Reading lesson: how to read a compiler error, and the three you'll meet most. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Reading compiler errors',
  summary: 'Sol 1, 15:30. In HABCON\'s old printouts, Ines finds a note in Lars\'s handwriting: "The compiler is not your enemy. It is the only one who reads every line." She starts reading its messages properly.',
  minutes: 12,
  outcomes: [
    'Find the line an error points at, and look just above it too',
    'Fix the first error first',
    'Recognise three common messages: missing ;, undeclared name, string not closed',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'How to read what the compiler says',
      html: '<p>A compile error is the compiler telling you, very precisely, where it got confused. Every message has two parts worth reading: <strong>the line number</strong> and <strong>the words</strong>.</p><h3>1. Go to the line</h3><p>The runner marks the line in red. Look at it, and also at the line just above it: a mistake on one line often only confuses the compiler on the next.</p><h3>2. Read the words, literally</h3><p>The message usually says exactly what it expected. <code>\';\' expected</code> means a semicolon is missing. <code>\'prinf\' undeclared</code> means C has never heard of something called <em>prinf</em>: a typo. <code>String not closed</code> means a double quote was opened and never closed.</p><h3>3. Fix the first one, then run again</h3><p>One mistake can cause several messages. Fix the <strong>first</strong> error only, then run again. Often the rest disappear by themselves.</p><p>Tey\'s explanation appears above the compiler\'s own words. Read both: on a real computer, you\'ll only have the compiler\'s.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Read this one',
      code: '#include <stdio.h>\n\nint main(void) {\n    prinf("Oxygen: OK\\n");\n    return 0;\n}\n',
      caption: 'Run it. Read the line number and the words. What is C saying it doesn\'t know?',
      challenge: 'Fix the typo and run it again.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'Sol 1, 15:30. Learning to read the compiler.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The compiler shows five errors. Which do you fix first?',
        options: [
          { text: 'The last one', why: 'Later errors are often caused by the first. Fix from the top.' },
          { text: 'The first one, then run again' },
          { text: 'All five at once, before running', why: 'Some of them may vanish when the first is fixed. Fix one, run, repeat.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each message to what\'s wrong.',
        pairs: [
          ['\';\' expected', 'A semicolon is missing'],
          ['\'prinf\' undeclared', 'A name C doesn\'t know: a typo'],
          ['String not closed', 'A double quote is missing'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Run this, read the error, and fix it so it prints Oxygen: OK',
        starter: '#include <stdio.h>\n\nint main(void) {\n    prinf("Oxygen: OK\\n");\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Oxygen: OK\\n");\n    return 0;\n}\n',
        hint: 'The error says prinf is undeclared. What is the real name of the print function?',
        checks: [
          { message: 'Print Oxygen: OK', outputIncludes: 'Oxygen: OK' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The error says line 6: \';\' expected. Line 6 looks perfect. Where else should you look?',
        options: [
          { text: 'Line 5, just above it' },
          { text: 'Line 1', why: 'Start close to the error. A missing ; on the line before is far more likely.' },
          { text: 'Nowhere: the compiler is wrong', why: 'The compiler is very rarely wrong. It noticed the problem one line late.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'The compiler says: String not closed. Which line?',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("Water: 380 litres\\n");', '    printf("Power: 62%\\n);', '    return 0;', '}'],
        bug: 3,
        fix: '    printf("Power: 62%\\n");',
        explanation: 'The text after printf( opens with " but the closing " is missing before the ).',
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good habit or bad habit when you meet an error?',
        groups: ['Good habit', 'Bad habit'],
        items: [
          { text: 'Read the line number first', group: 0 },
          { text: 'Change random lines until it works', group: 1 },
          { text: 'Fix the first error, then run again', group: 0 },
          { text: 'Ignore the words and only read the line number', group: 1 },
          { text: 'Check the line above the one it points at', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'It says eleven errors. I give up, the code is cursed.',
        prompt: 'Ines\'s best advice?',
        options: [
          { text: 'Delete it and start again.', why: 'Often a single typo causes all eleven. Starting over throws away good code.' },
          { text: 'Fix only the first error and run it again. One typo often causes all the rest.' },
          { text: 'Fix the easiest-looking one.', why: 'The easiest-looking one might be a side effect. The first is usually the cause.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The compiler says \'Printf\' undeclared. C cares about capitals. Type the correct spelling.',
        answers: ['printf'],
        placeholder: 'The function name',
      },
      {
        kind: 'mcq',
        prompt: 'What does "undeclared" mean in a compiler message?',
        options: [
          { text: 'C has never been told about that name', },
          { text: 'The line is too long', why: 'Line length has nothing to do with it.' },
          { text: 'The program ran out of memory', why: 'That would happen while running. Undeclared is a compile error about a name.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'This has two different errors. Fix them one at a time until it prints both lines.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("Water: 380 litres\\n")\n    printf("Power: 62 percent\\n);\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Water: 380 litres\\n");\n    printf("Power: 62 percent\\n");\n    return 0;\n}\n',
        hint: 'Run it after each fix. One line is missing a ;, the other is missing a closing ".',
        checks: [
          { message: 'Print both lines', outputEquals: 'Water: 380 litres\nPower: 62 percent' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'How do you usually feel when you see an error message: annoyed, worried, curious? What would help you treat it as a clue instead?',
    starters: ['Error messages make me feel...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Real compilers say more',
    summary: 'gcc and clang print the file, line and column, the message, and a caret ^ under the exact spot. clang is known for especially friendly messages, often with a "did you mean" suggestion.',
  },
  notes: 'Error texts quoted are this runner\'s (xcc) messages: "\';\' expected", "\'name\' undeclared", "String not closed". gcc/clang message format (file:line:col, caret, fix-it hints) from their documentation. Lars\'s quote is fictional.',
};

export default lesson;
