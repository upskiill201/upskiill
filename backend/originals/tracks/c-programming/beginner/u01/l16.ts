import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 16. Chat with Tey: return 0, exit codes, and return ending main early. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'return 0 and exit codes',
  summary: 'Sol 1, 23:05. Lars\'s note in the HABCON printout: "Startup script checks the exit code. Not 0 = do not open the airlock." What is an exit code, and who reads it?',
  minutes: 10,
  outcomes: [
    'Explain what return 0 tells the system',
    'Use a non-zero exit code to report a problem',
    'Know that nothing after return runs',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Every program you\'ve written ends with return 0;. Ever wondered who that 0 is for?', replies: ['Not really', 'The screen?'] },
        { tey: 'Not the screen: it\'s never printed. It goes to whatever started your program. On the station, that\'s HABCON\'s startup script.', replies: ['And 0 means?'] },
        { tey: '0 means "everything went fine". Any other number means "something went wrong". That number is the exit code.', replies: ['Why would a program want to fail?'] },
        { tey: 'To warn whoever\'s next. Lars\'s airlock check returns 1 if the pressure is wrong, and the script refuses to open the door. A quiet number, doing a loud job.', replies: ['What if I write code after return?'] },
        { tey: 'It never runs. return ends main right there. Lines after it are dead code: C won\'t even complain, it just skips them.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A check that fails',
      code: '#include <stdio.h>\n\nint main(void) {\n    printf("Airlock pressure: LOW\\n");\n    return 1;\n    printf("Opening airlock\\n");\n}\n',
      caption: 'Run it. The runner shows the exit code because it isn\'t 0. And "Opening airlock" never prints.',
      challenge: 'Change LOW to OK and return 1 to return 0. What changes in the output?',
    },
  ],
  apply: {
    scenario: 'Sol 1, 23:05. Lars\'s airlock check.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does return 0; at the end of main mean?',
        options: [
          { text: 'Print the number 0', why: 'Exit codes aren\'t printed. They go to whatever started the program.' },
          { text: 'The program finished and everything went fine' },
          { text: 'Start the program again', why: 'return ends main. Nothing restarts.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("A\\n");\nreturn 0;\nprintf("B\\n");',
        language: 'c',
        options: [
          { text: 'A' },
          { text: 'A and B', why: 'return ends main straight away. The B line never runs.' },
          { text: 'Nothing', why: 'A is printed before return runs.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'What would each exit code tell the startup script?',
        groups: ['All went fine', 'Something went wrong'],
        items: [
          { text: 'return 0;', group: 0 },
          { text: 'return 1;', group: 1 },
          { text: 'return 2;', group: 1 },
          { text: 'return 7;', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The pressure is low. Print Airlock pressure: LOW and end with exit code 1.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("Airlock pressure: OK\\n");\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Airlock pressure: LOW\\n");\n    return 1;\n}\n',
        hint: 'Change the text, and change return 0; to return 1;',
        checks: [
          { message: 'Print Airlock pressure: LOW', outputIncludes: 'Airlock pressure: LOW' },
          { message: 'Return 1', codeIncludes: 'return 1;' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Opening airlock never prints. Which line stops it?',
        lines: ['int main(void) {', '    printf("Pressure OK\\n");', '    return 0;', '    printf("Opening airlock\\n");', '}'],
        bug: 2,
        fix: 'Move return 0; below the Opening airlock line.',
        explanation: 'return ends main. Anything after it is never reached.',
        language: 'c',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the term to its meaning.',
        pairs: [
          ['Exit code', 'The number a program ends with'],
          ['0', 'Success'],
          ['Not 0', 'Something went wrong'],
          ['Dead code', 'Lines after return that never run'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'So the script opens the airlock if your program says 0?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Yes. So my check must only return 0 when the pressure really is OK.' },
          { text: 'No, exit codes are ignored.', why: 'Lars\'s script reads it. That\'s the whole point.' },
          { text: 'Only if the program prints OK.', why: 'The script reads the exit code, not the printed words.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which exit code means success?',
        answers: ['0', 'zero'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Report a failure.',
        template: 'printf("Fan 2: FAULT\\n");\n[[1]] [[2]];',
        blanks: [['return'], ['1']],
        distractors: ['print', '0'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Print Check passed, then Opening airlock, and end with exit code 0. Make sure both lines print.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("Check passed\\n");\n    return 0;\n    printf("Opening airlock\\n");\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Check passed\\n");\n    printf("Opening airlock\\n");\n    return 0;\n}\n',
        hint: 'return must come last, after every line you want to run.',
        checks: [
          { message: 'Print both lines', outputEquals: 'Check passed\nOpening airlock' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'An exit code is a tiny signal: OK or not OK. What small signals do you rely on every day (a green light, a tick, a battery icon)?',
    starters: ['A signal I rely on is...', 'If it lied to me...'],
  },
  deepen: {
    title: 'See an exit code yourself',
    summary: 'On Linux or macOS, run a program, then type echo $? to see its exit code. On Windows, echo %ERRORLEVEL% does the same.',
  },
  notes: 'Returning from main with 0 (or EXIT_SUCCESS) signals success; other values are implementation-defined failure statuses (ISO C 7.22.4.4 / 5.1.2.2.3). echo $? (POSIX shells), %ERRORLEVEL% (cmd.exe).',
};

export default lesson;
