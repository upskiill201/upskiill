import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Myth or Fact: where C came from and where it runs today. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Meet C',
  summary: 'Sol 1, 07:00. Over powdered coffee, Mateus says C is "a dead language from the age of floppy disks". Ines checks. It runs in his phone, his car and the rover he drives.',
  minutes: 10,
  outcomes: [
    'Say where C came from and why it was made',
    'Name places C still runs today',
    'Explain why C programs are fast',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'C is a dead language nobody uses any more.', isFact: false, explain: 'Myth. The Linux kernel, most of Windows and macOS underneath, SQLite, and the Python interpreter are written mostly in C. So is the code in countless washing machines, cars and routers.' },
        { text: 'C was created at Bell Labs in the early 1970s.', isFact: true, explain: 'Fact. Dennis Ritchie developed it there between 1969 and 1973, to write the Unix operating system.' },
        { text: 'It\'s called C because it came after a language called B.', isFact: true, explain: 'Fact. B was written by Ken Thompson; Ritchie\'s next language added types and became C.' },
        { text: 'Computers can read C directly, line by line.', isFact: false, explain: 'Myth. A compiler first translates C into machine code, the numbers the processor actually runs. That\'s one reason C is fast: the translating is done before the program starts.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>C is <strong>small</strong>: only a few dozen keywords. It is <strong>close to the hardware</strong>: you can say exactly how much memory a value takes and where it lives. And it is <strong>compiled</strong>: translated to machine code before it runs, so there is nothing slowing it down while it runs.</p><p>That\'s why HABCON was written in C in 1998, and why the backup board runs it today: a tiny board with very little memory can still run C.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Ask the board what it runs',
      code: '#include <stdio.h>\n\nint main(void) {\n    printf("Language: C\\n");\n    printf("Born: Bell Labs, 1972\\n");\n    return 0;\n}\n',
      caption: 'Two printf lines print two lines, in order. Run it.',
      challenge: 'Add a third printf line that prints: Runs on: the backup board',
    },
  ],
  apply: {
    scenario: 'Sol 1, breakfast. Settling the argument with Mateus.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Who created C?',
        options: [
          { text: 'Ada Lovelace, in the 1840s', why: 'Ada Lovelace wrote the first published algorithm for a machine, a century before C.' },
          { text: 'Dennis Ritchie, at Bell Labs', },
          { text: 'A team at a phone company in 2005', why: 'Bell Labs was a phone company\'s research lab, but C is from the early 1970s.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'C was made to write the Unix operating system', group: 0 },
          { text: 'C is only used for old programs', group: 1 },
          { text: 'C code is compiled before it runs', group: 0 },
          { text: 'The processor reads C directly', group: 1 },
          { text: 'C came after a language called B', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print two lines: first Language: C, then Status: online',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("Language: C\\n");\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Language: C\\n");\n    printf("Status: online\\n");\n    return 0;\n}\n',
        hint: 'Copy the first printf line and change the words: printf("Status: online\\n");',
        checks: [
          { message: 'Print Language: C', outputIncludes: 'Language: C' },
          { message: 'Then print Status: online on its own line', outputEquals: 'Language: C\nStatus: online' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the place to what C does there.',
        pairs: [
          ['Linux', 'An operating system kernel written in C'],
          ['A washing machine', 'Runs a small C program on a chip'],
          ['SQLite', 'A database written in C'],
          ['Python', 'Its main interpreter is written in C'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why are C programs usually fast?',
        options: [
          { text: 'They are translated to machine code before they run' },
          { text: 'C programs are always short', why: 'Some C programs are millions of lines long and still fast.' },
          { text: 'C skips the processor', why: 'Nothing skips the processor. C just gives it machine code with nothing in between.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'OK, but why does a 1998 board run C and not something modern?',
        prompt: 'Ines\'s best answer?',
        options: [
          { text: 'Because nobody updated it.', why: 'Partly true, but the real reason is what the board is: tiny and short on memory.' },
          { text: 'Because C is small and compiled, so it fits on a tiny board with very little memory.' },
          { text: 'Because C is the only language that exists for boards.', why: 'Other languages exist for small boards, but C is by far the most common.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Fill in the history.',
        template: 'C was created by Dennis [[1]] at Bell Labs to write the [[2]] operating system.',
        blanks: [['Ritchie'], ['Unix']],
        distractors: ['Windows', 'Lovelace'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'C is named after the language that came just before it. What letter was that language?',
        answers: ['B'],
        placeholder: 'One letter',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the sentence that is wrong.',
        lines: [
          'C was developed at Bell Labs in the early 1970s.',
          'A compiler turns C into machine code.',
          'C programs run slowly because they are read line by line.',
          'C still runs in cars, routers and phones.',
        ],
        bug: 2,
        fix: 'C programs are fast because they are compiled to machine code before they run.',
        explanation: 'Being read line by line while running is how some other languages work. C is compiled first.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print three lines: Red Mesa, then Sol 1, then Board: backup',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Red Mesa\\n");\n    printf("Sol 1\\n");\n    printf("Board: backup\\n");\n    return 0;\n}\n',
        hint: 'One printf per line, each ending in \\n, in the right order.',
        checks: [
          { message: 'Print the three lines in order', outputEquals: 'Red Mesa\nSol 1\nBoard: backup' },
          { message: 'Use printf', codeIncludes: 'printf(' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Before today, what did you think "old" programming languages were like? What surprised you about C?',
    starters: ['I thought...', 'What surprised me was...'],
  },
  deepen: {
    title: 'In Ritchie\'s own words',
    summary: 'Dennis Ritchie\'s short paper "The Development of the C Language" (1993) tells how B became C and why. It\'s free to read on the Bell Labs archive pages and very readable.',
  },
  notes: 'Ritchie, "The Development of the C Language" (HOPL-II, 1993): C developed 1969-1973 at Bell Labs, successor to Ken Thompson\'s B, used to rewrite the Unix kernel. Linux kernel is mostly C (kernel.org docs); SQLite is written in C (sqlite.org); CPython is written in C (python.org devguide). Windows and macOS kernels are largely C (with C++ and assembly) — phrased as "most of ... underneath". Ada Lovelace notes on the Analytical Engine, 1843.',
};

export default lesson;
