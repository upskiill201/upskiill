import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 11. Before / After: if without braces covers one statement only; always use braces. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Braces, always',
  summary: 'Sol 3, 19:05. Lars\'s email: "I see if without braces in your code. Stop. In 2014 that habit broke a security check on millions of iPhones and Macs." Ines looks up what he means.',
  minutes: 11,
  outcomes: [
    'Explain that an if without braces controls only the next statement',
    'Spot indentation that lies about what\'s inside an if',
    'Always write braces, even for one line',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'What the indentation says, and what C does',
      before: {
        label: 'No braces: the indent lies',
        text: 'if (co2_ppm > 2000)\n    printf("ALARM\\n");\n    printf("Fans on full\\n");\n\n// At 450 ppm this still prints\n// "Fans on full"',
      },
      after: {
        label: 'Braces: what you see is what runs',
        text: 'if (co2_ppm > 2000) {\n    printf("ALARM\\n");\n    printf("Fans on full\\n");\n}\n\n// At 450 ppm: nothing printed',
      },
      notes: [
        'Without braces, an if controls exactly ONE statement: the next one. The second printf is not inside the if, whatever the indentation suggests.',
        'C ignores indentation completely. People don\'t. That gap is where this bug hides.',
        'With braces, everything between { and } belongs to the if. Add a line later and it\'s still inside.',
        'In 2014, Apple\'s "goto fail" bug was a duplicated line after an if with no braces. It made a security check always succeed on iPhones and Macs until it was patched.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'The lying indent',
      code: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm = 450;\n\n    if (co2_ppm > 2000)\n        printf("ALARM\\n");\n        printf("Fans on full\\n");\n\n    return 0;\n}\n',
      caption: 'The air is fine, but run it.',
      challenge: 'Add braces round both printf lines and run it again.',
    },
  ],
  apply: {
    scenario: 'Sol 3, 19:05. Lars\'s braces rule.',
    items: [
      {
        kind: 'mcq',
        prompt: 'An if has no braces. How many statements does it control?',
        options: [
          { text: 'All the indented lines below it', why: 'C ignores indentation. Without braces, only the next statement belongs to the if.' },
          { text: 'Exactly one: the next statement' },
          { text: 'None', why: 'It controls one: the very next statement.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'water is 1500. What does this print?',
        code: 'if (water < 1200)\n    printf("Ration mode\\n");\n    printf("Shorter showers\\n");\nprintf("Done\\n");',
        language: 'c',
        options: [
          { text: 'Done', why: 'Shorter showers isn\'t inside the if, so it runs too.' },
          { text: 'Shorter showers, then Done' },
          { text: 'All three lines', why: 'Ration mode IS inside the if, and 1500 isn\'t below 1200.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add braces so neither line prints when co2_ppm is 450.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm = 450;\n    if (co2_ppm > 2000)\n        printf("ALARM\\n");\n        printf("Fans on full\\n");\n    printf("Check done\\n");\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm = 450;\n    if (co2_ppm > 2000) {\n        printf("ALARM\\n");\n        printf("Fans on full\\n");\n    }\n    printf("Check done\\n");\n    return 0;\n}\n',
        hint: 'Put { after the condition and } after the second printf.',
        checks: [
          { message: 'Print only Check done', outputEquals: 'Check done' },
          { message: 'Use braces', codeIncludes: '2000) {' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line runs even when the battery is fine?',
        lines: ['if (battery < 20)', '    printf("Battery low\\n");', '    printf("Return to base\\n");', 'printf("Drive on\\n");'],
        bug: 2,
        fix: 'Wrap both indented lines in { }.',
        explanation: 'Without braces, only "Battery low" is inside the if. "Return to base" always runs, however it\'s indented.',
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'Inside the if, or not? (no braces in this code)',
        groups: ['Inside the if', 'Always runs'],
        items: [
          { text: 'The first statement after if (...)', group: 0 },
          { text: 'A second indented statement', group: 1 },
          { text: 'A statement after the indented ones', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does C use to decide what\'s inside an if?',
        options: [
          { text: 'The indentation', why: 'C ignores indentation entirely.' },
          { text: 'The braces, or the single next statement if there are none' },
          { text: 'The blank lines', why: 'Blank lines don\'t matter to C either.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lars',
        message: 'Even for one line. Always braces. Why do I insist?',
        prompt: 'Ines\'s best reply?',
        options: [
          { text: 'Because someone will add a second line later, indent it, and think it\'s inside. With braces, it is.' },
          { text: 'Because one-line ifs don\'t compile.', why: 'They compile fine. The danger is the next line someone adds.' },
          { text: 'Because braces make it faster.', why: 'Speed is identical. It\'s about safety when code changes.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Make both lines belong to the if.',
        template: 'if (smoke == 1) [[1]]\n    printf("FIRE\\n");\n    printf("Evacuate\\n");\n[[2]]',
        blanks: [['{'], ['}']],
        distractors: ['(', ')'],
        language: 'c',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Does C pay attention to indentation? (yes / no)',
        answers: ['no'],
        placeholder: 'yes / no',
      },
      {
        kind: 'writeCode',
        prompt: 'Read the battery (given: 15). If it\'s below 20, print both Battery low and Return to base. Always print Rover check done at the end.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int battery;\n    scanf("%d", &battery);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int battery;\n    scanf("%d", &battery);\n    if (battery < 20) {\n        printf("Battery low\\n");\n        printf("Return to base\\n");\n    }\n    printf("Rover check done\\n");\n    return 0;\n}\n',
        hint: 'Both warnings go inside { }; the last line goes after }.',
        stdin: ['15'],
        checks: [
          { message: 'Print all three lines', outputEquals: '15\nBattery low\nReturn to base\nRover check done' },
          { message: 'Use braces', codeIncludes: '20) {' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Lars\'s rule costs two characters and prevents a whole class of bugs. What tiny habit of yours prevents a big problem?',
    starters: ['My tiny habit is...', 'It prevents...'],
  },
  deepen: {
    title: 'The "goto fail" bug',
    summary: 'Search for "goto fail Apple 2014". The bug was two identical lines in a row after an if with no braces. It\'s one of the most studied bugs in programming history.',
  },
  notes: 'An if statement controls a single statement unless it is a compound statement (ISO C 6.8.4.1, 6.8.2). Apple "goto fail": CVE-2014-1266, SecureTransport in iOS 7.0.x / OS X 10.9.x, fixed Feb 2014 (iOS 7.0.6, OS X 10.9.2); duplicated "goto fail;" line skipped signature verification. iOS 7 ran on hundreds of millions of devices, so "millions" is conservative.',
};

export default lesson;
