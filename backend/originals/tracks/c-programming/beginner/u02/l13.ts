import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 13. Card deck: field widths in printf: %5d, %-5d, %05d, %8.2f. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Lining up the numbers',
  summary: 'Sol 2, 21:00. The tank table looks ragged: 1610 next to 72 next to 5. Tabs aren\'t enough when numbers have different lengths. printf can pad every number to the same width.',
  minutes: 11,
  outcomes: [
    'Give a number a minimum width with %5d',
    'Line numbers up on the left with %-5d, or pad with zeros with %05d',
    'Combine a width and decimals: %8.2f',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Put a number between <code>%</code> and <code>d</code> and printf uses <strong>at least that many characters</strong>, padding with spaces on the left. Numbers end up lined up on their right edge, like in a spreadsheet:</p><p><code>printf("[%5d]\\n", 72);</code> prints <strong>[&nbsp;&nbsp;&nbsp;72]</strong></p><p>A minus sign pads on the right instead, lining numbers up on the left: <code>%-5d</code> gives <strong>[72&nbsp;&nbsp;&nbsp;]</strong>. A zero pads with zeros: <code>%05d</code> gives <strong>[00072]</strong>, handy for codes like sol numbers.</p>',
    },
    {
      kind: 'text',
      html: '<p>Doubles take a width <em>and</em> decimals: <code>%8.2f</code> means "8 characters wide in total, 2 after the point". The point and the digits all count towards the 8.</p><p><code>printf("[%8.2f]\\n", 3.75);</code> prints <strong>[&nbsp;&nbsp;&nbsp;&nbsp;3.75]</strong></p><p>A width is a <strong>minimum</strong>: a number that needs more room just takes it. Nothing is ever cut off.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The tank table',
      code: '#include <stdio.h>\n\nint main(void) {\n    printf("Tank       Litres\\n");\n    printf("Main     %8d\\n", 1610);\n    printf("Kettle   %8d\\n", 2);\n    printf("Reserve  %8d\\n", 400);\n    printf("Sol code: %03d\\n", 2);\n    printf("Solar:   %8.2f\\n", 3.75);\n    return 0;\n}\n',
      caption: 'Run it: every number is pushed to the same right edge.',
      challenge: 'Change %8d to %-8d on one line and see how it moves.',
    },
    {
      kind: 'check',
      question: 'What does printf("[%4d]", 7); print?',
      options: ['[7]', '[   7]', '[0007]'],
      answer: 1,
      explanation: 'Width 4, padded with spaces on the left: three spaces, then 7.',
    },
  ],
  apply: {
    scenario: 'Sol 2, 21:00. Tidying the tank table.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each format, given the number 42, to what it prints.',
        pairs: [
          ['[%5d]', '[   42]'],
          ['[%-5d]', '[42   ]'],
          ['[%05d]', '[00042]'],
          ['[%d]', '[42]'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the 5 in %5d mean?',
        options: [
          { text: 'Print the number 5 times', why: 'It\'s a width, not a count.' },
          { text: 'Use at least 5 characters, padding with spaces' },
          { text: 'Cut the number to 5 digits', why: 'A width never cuts a number; bigger numbers take more room.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the sol number 2 as three digits with zeros: Sol 002',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int sol = 2;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int sol = 2;\n    printf("Sol %03d\\n", sol);\n    return 0;\n}\n',
        hint: '%03d: width 3, padded with zeros.',
        checks: [
          { message: 'Print Sol 002', outputIncludes: 'Sol 002' },
          { message: 'Use %03d', codeIncludes: '%03d' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("[%6.1f]\\n", 21.5);',
        language: 'c',
        options: [
          { text: '[21.5]', why: 'Width 6 pads it to 6 characters.' },
          { text: '[  21.5]' },
          { text: '[21.500000]', why: '.1 means one decimal.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Line the litres up on the right, 6 wide.',
        template: 'printf("Main  %6d\\n", 1610);\nprintf("Spare [[1]]\\n", 40);',
        blanks: [['%6d']],
        distractors: ['%-6d', '%d'],
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'Where does the padding go?',
        groups: ['Spaces on the left', 'Spaces on the right', 'Zeros on the left'],
        items: [
          { text: '%5d', group: 0 },
          { text: '%-5d', group: 1 },
          { text: '%05d', group: 2 },
          { text: '%8.2f', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The numbers should line up on the right, but one row is ragged. Which line?',
        lines: ['printf("Main    %6d\\n", 1610);', 'printf("Kettle  %d\\n", 2);', 'printf("Reserve %6d\\n", 400);'],
        bug: 1,
        fix: 'printf("Kettle  %6d\\n", 2);',
        explanation: 'Without a width, 2 takes one character and sits on the left. Give every row the same %6d.',
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'What if the number is wider than the width? Does it get chopped?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'No: the width is a minimum. A bigger number just takes more room.' },
          { text: 'Yes, the extra digits are dropped.', why: 'printf never cuts a number short. The width is only a minimum.' },
          { text: 'It becomes an error.', why: 'No error; it just prints wider.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In %8.2f, how many digits come after the decimal point?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Print two lined-up rows, numbers 6 wide on the right:\nMain   1610\nSpare    40\n(the labels are "Main " and "Spare", each followed by %6d)',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Main %6d\\n", 1610);\n    printf("Spare%6d\\n", 40);\n    return 0;\n}\n',
        hint: 'printf("Main %6d\\n", 1610); and printf("Spare%6d\\n", 40);',
        checks: [
          { message: 'Print the two rows lined up', outputEquals: 'Main   1610\nSpare    40' },
          { message: 'Use %6d', codeIncludes: '%6d' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where have you seen numbers lined up neatly (receipts, timetables, scoreboards)? Why does lining them up make them easier to read?',
    starters: ['I\'ve seen it on...', 'It helps because...'],
  },
  notes: 'Field width, flags (-, 0) and precision: ISO C 7.21.6.1. Width is a minimum and never truncates numeric conversions.',
};

export default lesson;
