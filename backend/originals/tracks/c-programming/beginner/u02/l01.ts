import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story opener: the tank gauge died with HABCON. What a variable is; the first int. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'A box called a variable',
  summary: 'Sol 2, 07:00. The water gauge was part of HABCON. Tomoko climbs the tank with a dipstick: 1,680 litres. That number will change every hour, and the board needs somewhere to keep it.',
  minutes: 11,
  outcomes: [
    'Say what a variable is',
    'Create an int variable and print it with %d',
    'Change one value and see every line that uses it update',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sol 2, 07:00',
      beats: [
        { speaker: 'narrator', text: 'Hal reads the new banner with his coffee. Then he asks the question nobody can answer.' },
        { speaker: 'hal', text: 'How much water do we have?' },
        { speaker: 'ines', text: 'The tank gauge was HABCON. It\'s gone.' },
        { speaker: 'narrator', text: 'Tomoko climbs the ladder on the side of the tank with a marked pole, and calls down a number.' },
        { speaker: 'tomoko', text: '1,680 litres. Four of us, eighteen litres each per sol. Ask me again tonight and it\'ll be less.' },
        { speaker: 'mateus', text: 'So we type 1680 into every printf, and change them all every time we drink?' },
      ],
      choice: {
        prompt: 'The water number appears in five places on the status board. What should Ines do?',
        options: [
          { text: 'Keep the number in one named place, and have every line read it from there.', outcome: 'That named place is a variable. Change it once, and every line that uses it is right again.', best: true },
          { text: 'Retype 1680 in all five places every time it changes.', outcome: 'Miss one, and the board shows two different water levels. On a station, that\'s how mistakes start.' },
          { text: 'Stop showing water on the board.', outcome: 'Water is the one number the crew most needs.' },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>A <strong>variable</strong> is a named box in the computer\'s memory that holds a value. You make one by giving its <strong>type</strong> and its <strong>name</strong>, and usually a starting value:</p><p><code>int water = 1680;</code></p><p><code>int</code> means the box holds a whole number (an <strong>int</strong>eger). <code>water</code> is its name. From now on, writing <code>water</code> means "whatever is in that box". To print it, give it to <code>%d</code>:</p><p><code>printf("Water: %d litres\\n", water);</code></p>',
    },
    {
      kind: 'tryIt',
      title: 'One number, many lines',
      code: '#include <stdio.h>\n\nint main(void) {\n    int water = 1680;\n\n    printf("Water: %d litres\\n", water);\n    printf("Water left today: %d\\n", water);\n    printf("Tank check: %d litres\\n", water);\n    return 0;\n}\n',
      caption: 'Three lines read the same variable. Run it.',
      challenge: 'Tonight the tank reads 1610. Change only the first line and run it again: all three update.',
    },
  ],
  apply: {
    scenario: 'Sol 2, 07:00. The water count.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a variable?',
        options: [
          { text: 'A named place in memory that holds a value' },
          { text: 'A number that can never change', why: 'Variables can change: that\'s what "variable" means.' },
          { text: 'Another word for printf', why: 'printf prints. A variable stores.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of int water = 1680; to its meaning.',
        pairs: [
          ['int', 'The type: a whole number'],
          ['water', 'The name of the box'],
          ['1680', 'The value inside'],
          [';', 'The end of the statement'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make an int variable called crew holding 4, and print Crew: 4 using it.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    printf("Crew: %d\\n", crew);\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int crew = 4;\n    printf("Crew: %d\\n", crew);\n    return 0;\n}\n',
        hint: 'Add int crew = 4; above the printf.',
        checks: [
          { message: 'Print Crew: 4', outputIncludes: 'Crew: 4' },
          { message: 'Make an int called crew', codeIncludes: 'int crew' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int water = 1680;\nprintf("%d litres\\n", water);',
        language: 'c',
        options: [
          { text: 'water litres', why: 'The variable\'s name isn\'t printed. Its value is.' },
          { text: '1680 litres' },
          { text: '%d litres', why: '%d is filled with the value of water.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Create the variable and print it.',
        template: '[[1]] power = 62;\nprintf("Power: [[2]]%%\\n", power);',
        blanks: [['int'], ['%d']],
        distractors: ['number', '%p'],
        language: 'c',
      },
      {
        kind: 'findBug',
        prompt: 'Which line stops this compiling?',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("Water: %d\\n", water);', '    int water = 1680;', '    return 0;', '}'],
        bug: 2,
        fix: 'Move int water = 1680; above the printf.',
        explanation: 'C reads top to bottom. On line 3, water hasn\'t been created yet, so C says it\'s undeclared.',
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'Why not just write 1680 in the printf? It\'s shorter.',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Because tomorrow it\'s a different number. With a variable, I change one line, not five.' },
          { text: 'printf can\'t print numbers without a variable.', why: 'It can: printf("%d", 1680) works. The variable is about changing it safely.' },
          { text: 'Variables make the program faster.', why: 'Speed isn\'t the point here. One place to change is.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which type do you use for a whole number like 1680? (three letters)',
        answers: ['int'],
        placeholder: 'A type',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that makes a variable called rovers holding 2.',
        tiles: ['int', 'rovers', '=', '2', ';'],
        distractors: ['Int', '=='],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Make a variable water = 1680, then print two lines from it: Water: 1680 litres and Tank: 1680',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int water = 1680;\n    printf("Water: %d litres\\n", water);\n    printf("Tank: %d\\n", water);\n    return 0;\n}\n',
        hint: 'int water = 1680; then two printf lines, each with %d and water after the comma.',
        checks: [
          { message: 'Print Water: 1680 litres', outputIncludes: 'Water: 1680 litres' },
          { message: 'Print Tank: 1680', outputIncludes: 'Tank: 1680' },
          { message: 'Use the variable, not the number, in printf', codeIncludes: ', water);' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What number in your life changes all the time and lives in several places at once (a bank balance, a step count, a phone battery)? Where does the "real" value live?',
    starters: ['A number that keeps changing is...', 'The real value lives...'],
  },
  deepen: {
    title: 'Why "variable"?',
    summary: 'In maths, a variable is a letter that stands for a number. In C it\'s more concrete: a real piece of memory, with a real size, holding a real value right now.',
  },
  notes: 'int: signed integer type (ISO C 6.2.5). Declaration with initializer: 6.7.9. Water figures are fictional story values.',
};

export default lesson;
