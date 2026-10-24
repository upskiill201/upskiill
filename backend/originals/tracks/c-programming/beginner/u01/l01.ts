import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story opener: HABCON dies. What a program is; the first printf. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The board goes dark',
  summary: 'Sol 1, 05:12. A power surge kills HABCON, the station controller. The backup board boots to a blinking cursor, and it only runs C. Ines has never written a line of code.',
  minutes: 11,
  outcomes: [
    'Say what a program and a programming language are',
    'Run your first C program',
    'Change the words a program prints with printf',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sol 1, 05:12',
      beats: [
        { speaker: 'narrator', text: 'Red Mesa Research Station, Utah. A round, two-storey Hab in red desert. Four crew, ten sols of pretending they live on Mars.' },
        { speaker: 'narrator', text: 'The generator coughs. Every screen in the Hab goes black. The fans stop. In the silence, a single green cursor blinks on a small grey board by the airlock.' },
        { speaker: 'hal', text: 'HABCON\'s gone. That\'s the controller. Alarms, water count, the GreenHab lights. All of it.' },
        { speaker: 'mateus', text: 'So we call it off? Go home early?' },
        { speaker: 'hal', text: 'We don\'t break sim. The new board ships on Sol 10. The backup board runs whatever we write for it.' },
        { speaker: 'narrator', text: 'Taped to the backup board is a yellowed sticky note: "Backup runs C. Ask Lars. 1998."' },
        { speaker: 'ines', text: 'I wired every circuit in this building. I have never written a program in my life.' },
      ],
      choice: {
        prompt: 'Ines has a blinking cursor and ten sols. What should she do first?',
        options: [
          { text: 'Make the board print one line, to prove it listens to her.', outcome: 'Exactly where every programmer starts. One small program that works beats a big plan that doesn\'t.', best: true },
          { text: 'Rewrite the whole controller tonight.', outcome: 'HABCON took Lars a year. A program that big starts with one line that works.' },
          { text: 'Wait for the new board on Sol 10.', outcome: 'Ten sols with no alarms and no water count. The mission wouldn\'t last three.' },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>A <strong>program</strong> is a list of instructions a computer follows, exactly, in order. A <strong>programming language</strong> is how you write those instructions down.</p><p>The backup board speaks <strong>C</strong>: a language from 1972 that still runs inside cars, washing machines, satellites and most of the world\'s operating systems. Small, fast, close to the hardware. Perfect for a board by an airlock.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Wake the board',
      code: '#include <stdio.h>\n\nint main(void) {\n    printf("Backup board online\\n");\n    return 0;\n}\n',
      caption: 'This is a complete C program. Press Run: a compiler turns it into something the computer can run, then runs it. printf prints the words between the quotes.',
      challenge: 'Change the words between the quotes to "Hello, Red Mesa" and run it again. Keep the quotes and the \\n.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'printf("...") prints the text between the double quotes. The \\n at the end means "new line", like pressing Enter. You\'ll meet every other line of this program in the next few lessons.',
    },
  ],
  apply: {
    scenario: 'Sol 1, 05:30. Ines and the blinking cursor.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a program?',
        options: [
          { text: 'A list of instructions a computer follows, exactly, in order' },
          { text: 'Anything you see on a screen', why: 'A screen shows what a program did. The program is the instructions behind it.' },
          { text: 'The board itself', why: 'The board is the hardware. The program is what you tell it to do.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the board print: Ines online',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("\\n");\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Ines online\\n");\n    return 0;\n}\n',
        hint: 'Type the words inside the quotes, before the \\n: printf("Ines online\\n");',
        checks: [
          { message: 'Print Ines online', outputIncludes: 'Ines online' },
          { message: 'Use printf', codeIncludes: 'printf(' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each word to what it means.',
        pairs: [
          ['Program', 'Instructions the computer follows'],
          ['C', 'A programming language from 1972'],
          ['printf', 'Prints text on the screen'],
          ['Compiler', 'Turns your C into something the computer can run'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the line so it prints the words.',
        template: '[[1]]("Hello, Red Mesa\\n");',
        blanks: [['printf']],
        distractors: ['print', 'say'],
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this line print?',
        code: 'printf("Sol 1\\n");',
        language: 'c',
        options: [
          { text: 'printf("Sol 1")', why: 'printf itself isn\'t printed: only the text between the quotes is.' },
          { text: '"Sol 1"', why: 'The quotes mark where the text starts and ends. They aren\'t printed.' },
          { text: 'Sol 1' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Mateus tried it. Which line breaks the program?',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("Rover check\\n);', '    return 0;', '}'],
        bug: 2,
        fix: '    printf("Rover check\\n");',
        explanation: 'The text opens with " but never closes. Every string of text needs a double quote at both ends.',
        language: 'c',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that prints Hab online.',
        tiles: ['printf', '(', '"Hab online\\n"', ')', ';'],
        distractors: ['print', '"Hab online'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'You sure about this, Moreau? You\'re an electrician, not a programmer.',
        prompt: 'Ines\'s best reply?',
        options: [
          { text: 'You\'re right. Let\'s call it off.', why: 'Hal said it himself: we don\'t break sim. And one line already worked.' },
          { text: 'I\'ll just copy code off the internet until something works.', why: 'Code she doesn\'t understand is a wire she can\'t trace. On a station, that\'s how alarms fail.' },
          { text: 'Every program starts with one line. Mine just printed. I\'ll learn the rest one line at a time.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the program in order.',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("Crew of 4\\n");', '    return 0;', '}'],
        language: 'c',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which C function prints text on the screen?',
        answers: ['printf', 'printf()'],
        placeholder: 'A function name',
      },
      {
        kind: 'writeCode',
        prompt: 'From the start: write the whole program, and make it print Red Mesa Station.',
        starter: '#include <stdio.h>\n\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Red Mesa Station\\n");\n    return 0;\n}\n',
        hint: 'You need int main(void) { ... }, a printf line inside it, and return 0; before the closing }.',
        checks: [
          { message: 'Print Red Mesa Station', outputIncludes: 'Red Mesa Station' },
          { message: 'Write a main function', codeIncludes: 'main' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a machine you used today: a microwave, a car, a lift, a phone. What instructions do you think its program follows?',
    starters: ['The machine I thought of is...', 'Its program probably says...'],
  },
  deepen: {
    title: 'C is everywhere',
    summary: 'Look up which language the Linux kernel, the SQLite database and the Python interpreter are written in. All three are mostly C.',
  },
  notes: 'C dates: developed by Dennis Ritchie at Bell Labs 1969-73 (Ritchie, "The Development of the C Language", HOPL-II 1993); "1972" is the usual short date for the language. C in embedded devices, kernels (Linux), SQLite (written in C), CPython (written in C): all public facts from the projects\' own docs. Red Mesa, HABCON and the crew are fictional (docs/originals/c-outline.md).',
};

export default lesson;
