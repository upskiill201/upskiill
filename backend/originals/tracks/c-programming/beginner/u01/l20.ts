import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 20 — Unit Challenge. Everything in Chapter 1: Lars's test program and Ines's first report. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: First email to Lars',
  summary: 'Sol 1, 23:50. Lars\'s email had an attachment Ines hasn\'t opened yet: a broken HABCON program, "fix it before you ask me anything". Then she writes her first report, to send in tomorrow\'s email window.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Fix a program with several kinds of compile error',
    'Write a complete, tidy, commented program from scratch',
    'Print text, numbers and special characters exactly as planned',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sol 1, 23:50. The attachment',
      beats: [
        { speaker: 'narrator', text: 'Ten minutes to midnight. Ines finally opens the attachment on Lars\'s email from Tromsø, Norway.' },
        { speaker: 'lars', text: 'Hal says you are an electrician. Good. Electricians check everything twice. Attached: HABCON\'s old boot screen. I broke it in four places. Fix it, then send me your report. Then we talk.' },
        { speaker: 'ines', text: 'He broke it on purpose?' },
        { speaker: 'hal', text: 'That\'s Lars. He did the same to me in 1998. Took me a week.' },
        { speaker: 'tomoko', text: 'The email window opens at 19:00 tomorrow. You have time. Barely.' },
      ],
      choice: {
        prompt: 'Four errors, and she\'s exhausted. How does Ines attack it?',
        options: [
          { text: 'Run it, fix the first error the compiler shows, run again. Repeat.', outcome: 'The calm way, and the fast way. Each run shows the next real problem.', best: true },
          { text: 'Read all forty lines and guess where the four errors are.', outcome: 'Possible, but slow. The compiler already knows where they are.' },
          { text: 'Rewrite it from memory.', outcome: 'She\'d lose Lars\'s good code and make new mistakes. Fixing is faster.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'Unit Challenge: Lars\'s test, then the first report.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Lars\'s program shows four errors. Which do you fix first?',
        options: [
          { text: 'The last one, at the bottom', why: 'Later errors are often caused by earlier ones.' },
          { text: 'The first one, then run again' },
          { text: 'The one with the shortest message', why: 'Message length tells you nothing. Start at the top.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Lars\'s broken boot screen. Fix all four errors so it prints the boot screen.',
        starter: '#include <stdio.h>;\n\nint main(void) {\n    Printf("HABCON v1.0\\n");\n    printf("Station: Red Mesa\\n")\n    printf("Booted on sol %d\\n, 2);\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("HABCON v1.0\\n");\n    printf("Station: Red Mesa\\n");\n    printf("Booted on sol %d\\n", 2);\n    return 0;\n}\n',
        hint: 'One at a time: a ; after #include, a capital letter, a missing ;, and a string that isn\'t closed before the comma.',
        checks: [
          { message: 'Print the boot screen', outputEquals: 'HABCON v1.0\nStation: Red Mesa\nBooted on sol 2' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each error message to its fix.',
        pairs: [
          ['\';\' expected', 'Add a semicolon to the line above'],
          ['\'Printf\' undeclared', 'Use lowercase printf'],
          ['String not closed', 'Add the closing double quote'],
          ['No main() function', 'Name the function main, lowercase'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("Crew %d\\tSol %d\\n", 4, 2);\n// printf("DEBUG\\n");\nputs("End");',
        language: 'c',
        options: [
          { text: 'Crew 4<tab>Sol 2, then End' },
          { text: 'Crew 2<tab>Sol 4, then End', why: 'Values fill the placeholders left to right: 4 first.' },
          { text: 'Crew 4<tab>Sol 2, then DEBUG, then End', why: 'The DEBUG line is commented out.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Compile error, or compiles?',
        groups: ['Compile error', 'Compiles'],
        items: [
          { text: 'printf("Hi\\n")   (no semicolon)', group: 0 },
          { text: 'printf("Oxgyen\\n");', group: 1 },
          { text: 'printf("Hi\\n);', group: 0 },
          { text: '// Printf("Hi\\n");', group: 1 },
          { text: 'puts("62%%");', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The output should be Power: 62%. Which line is the bug?',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("Power: %d%\\n", 62);', '    return 0;', '}'],
        bug: 2,
        fix: '    printf("Power: %d%%\\n", 62);',
        explanation: 'A real percent sign in printf needs %%.',
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ines\'s report line.',
        template: 'printf("Water used today:[[1]][[2]] litres\\n", 400 - 380);',
        blanks: [['\\t'], ['%d']],
        distractors: ['%', '\\n'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'lars',
        message: 'Sol 2 email. You fixed it before midnight. Acceptable. What was the hardest one?',
        prompt: 'Ines\'s best reply?',
        options: [
          { text: 'The ; after #include. The message said something extra after the header name, and I didn\'t believe it at first.' },
          { text: 'None of them, it was easy.', why: 'Lars asked an honest question. "Easy" tells him nothing.' },
          { text: 'I don\'t remember, I changed lines until it worked.', why: 'She didn\'t: she fixed one error at a time. Lars wants to know what she learned.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ines\'s report program in order.',
        lines: ['/* Report to Mission Support, sol 2 */', '#include <stdio.h>', 'int main(void) {', '    puts("REPORT: RED MESA");', '    printf("Sol %d\\n", 2);', '    return 0;', '}'],
        language: 'c',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A program ends with return 1;. To the script that ran it, does that mean success or failure?',
        answers: ['failure', 'fail', 'failed'],
        placeholder: 'success / failure',
      },
      {
        kind: 'mcq',
        prompt: 'Lars asks: why does main end with return 0?',
        options: [
          { text: 'To print a zero at the end', why: 'Exit codes aren\'t printed.' },
          { text: 'To tell whatever started the program that it finished fine' },
          { text: 'Because C programs must count to zero', why: 'Not a rule. 0 is the "all good" exit code.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Ines\'s first report, exactly as planned:\nREPORT: RED MESA\nSol 2\n\nCrew:\t4\nWater:\t380 litres\nPower:\t62%\nStatus: "holding"\nLet the board work out the water as 400 - 20, and add a /* */ comment at the top.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '/* First report to Mission Support, by Ines */\n#include <stdio.h>\n\nint main(void) {\n    puts("REPORT: RED MESA");\n    printf("Sol %d\\n", 2);\n    printf("\\n");\n    printf("Crew:\\t%d\\n", 4);\n    printf("Water:\\t%d litres\\n", 400 - 20);\n    printf("Power:\\t%d%%\\n", 62);\n    printf("Status: \\"holding\\"\\n");\n    return 0;\n}\n',
        hint: 'Plan each line: \\t after the labels, %d for numbers, %% for the percent sign, \\" for the quotes.',
        checks: [
          { message: 'Print the report exactly', outputEquals: 'REPORT: RED MESA\nSol 2\n\nCrew:\t4\nWater:\t380 litres\nPower:\t62%\nStatus: "holding"' },
          { message: 'Let the board work out 400 - 20', codeIncludes: '400 - 20' },
          { message: 'Add a /* */ comment', codeIncludes: '/*' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'One chapter ago, Ines had never written code. What can you do now that you couldn\'t at the start of this chapter?',
    starters: ['Now I can...', 'The thing I\'m proudest of is...'],
  },
  deepen: {
    title: 'Lars\'s challenge, harder',
    summary: 'Break your own report program in three different ways (a missing ;, a capital letter, an unclosed quote), then read the errors one at a time. Breaking code on purpose is how you learn its error messages.',
  },
  notes: 'Unit Challenge for Chapter 1; covers lessons 1-19. Lars\'s exercise and timings are fictional.',
};

export default lesson;
