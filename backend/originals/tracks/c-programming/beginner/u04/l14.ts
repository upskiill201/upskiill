import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 14. Card deck: reading an unknown number of values: a sentinel, or until scanf fails. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Read until done',
  summary: 'Sol 4, 19:15. Mateus will radio in his sample weights tonight, but he doesn\'t know how many there are. "I\'ll say minus one when I\'m done." The loop doesn\'t know when to stop until the data tells it.',
  minutes: 12,
  outcomes: [
    'Stop a loop at a special "end" value, called a sentinel',
    'Read until the input runs out, with while (scanf(...) == 1)',
    'Count and total values when you don\'t know how many there are',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>When you don\'t know how many values are coming, agree on a special value that means "that\'s all". It\'s called a <strong>sentinel</strong>. Mateus\'s is -1, because no sample weighs minus one kilo.</p><p><code>scanf("%lf", &amp;kg);<br>while (kg != -1) {<br>&nbsp;&nbsp;&nbsp;&nbsp;total += kg;<br>&nbsp;&nbsp;&nbsp;&nbsp;scanf("%lf", &amp;kg);<br>}</code></p><p>Read once before the loop, then read again at the END of the body. That way the -1 is checked before it\'s ever added.</p>',
    },
    {
      kind: 'text',
      html: '<p>Another way: keep reading <strong>until the input runs out</strong>. scanf returns 1 while it successfully reads a value, so:</p><p><code>while (scanf("%lf", &amp;kg) == 1) {<br>&nbsp;&nbsp;&nbsp;&nbsp;total += kg;<br>}</code></p><p>This reads, checks and loops in one line. It stops at the end of the input, or at anything that isn\'t a number.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Samples until minus one',
      code: '#include <stdio.h>\n\nint main(void) {\n    double kg;\n    double total = 0;\n    int count = 0;\n\n    scanf("%lf", &kg);\n    while (kg != -1) {\n        total += kg;\n        count++;\n        scanf("%lf", &kg);\n    }\n    printf("%d samples, %.1f kg\\n", count, total);\n    return 0;\n}\n',
      caption: 'The input ends with -1. Run it.',
      challenge: 'Rewrite it with while (scanf("%lf", &kg) == 1) and no sentinel. You\'ll need to remove the -1 check.',
      stdin: ['3.2', '4.5', '2.8', '-1'],
    },
    {
      kind: 'check',
      question: 'Why read once BEFORE a sentinel loop?',
      options: ['To skip the first value', 'So the first value can be checked before it\'s used', 'scanf needs warming up'],
      answer: 1,
      explanation: 'The loop condition checks the value. It needs a value to check before the first round.',
    },
  ],
  apply: {
    scenario: 'Sol 4, 19:15. Samples by radio.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a sentinel value?',
        options: [
          { text: 'A special value that means "no more data"' },
          { text: 'The first value read', why: 'A sentinel marks the end, not the start.' },
          { text: 'The biggest value', why: 'It\'s chosen to be impossible as real data, often -1 or 0.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The input is 5 7 -1 9. What prints?',
        code: 'int n;\nint total = 0;\nscanf("%d", &n);\nwhile (n != -1) {\n    total += n;\n    scanf("%d", &n);\n}\nprintf("%d\\n", total);',
        language: 'c',
        options: [
          { text: '21', why: 'The loop stops at -1, so 9 is never read.' },
          { text: '12' },
          { text: '11', why: '-1 isn\'t added: the loop checks it first.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Read whole-number readings until -1 (given: 21 22 23 -1). Print Count: 3 and Total: 66',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int reading;\n    int total = 0;\n    int count = 0;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int reading;\n    int total = 0;\n    int count = 0;\n    scanf("%d", &reading);\n    while (reading != -1) {\n        total += reading;\n        count++;\n        scanf("%d", &reading);\n    }\n    printf("Count: %d\\n", count);\n    printf("Total: %d\\n", total);\n    return 0;\n}\n',
        hint: 'Read once, loop while != -1, and read again at the end of the body.',
        stdin: ['21 22 23 -1'],
        checks: [
          { message: 'Print Count: 3', outputIncludes: 'Count: 3' },
          { message: 'Print Total: 66', outputIncludes: 'Total: 66' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The total is one less than it should be: the -1 gets added. Which line is out of order?',
        lines: ['scanf("%d", &n);', 'while (n != -1) {', '    scanf("%d", &n);', '    total += n;', '}'],
        bug: 2,
        fix: 'Move scanf to the end of the body, after total += n.',
        explanation: 'Reading first in the body means the -1 is added before the condition can check it.',
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good sentinel or bad sentinel?',
        groups: ['Good: can\'t be real data', 'Bad: could be real data'],
        items: [
          { text: '-1 for a sample weight', group: 0 },
          { text: '0 for a temperature in °C', group: 1 },
          { text: '-999 for a battery percentage', group: 0 },
          { text: '20 for a battery percentage', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Read until the input runs out.',
        template: 'while (scanf("%d", &n) [[1]] [[2]]) {\n    total += n;\n}',
        blanks: [['=='], ['1']],
        distractors: ['!=', '0'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: '(radio) What if a sample really weighs zero? Can zero be the "done" signal?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Yes, zero is always the best sentinel.', why: 'Only if zero can never be real data.' },
          { text: 'Sentinels must be 99.', why: 'Any impossible value works. For weights, a negative number is safest.' },
          { text: 'Zero is a bad sentinel if it could be real. -1 can\'t be a weight, so it\'s safe.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do we call the special end value, like -1? (one word)',
        answers: ['sentinel'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the sentinel loop in order.',
        lines: ['scanf("%d", &n);', 'while (n != -1) {', '    total += n;', '    scanf("%d", &n);', '}'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Read sample weights until the input runs out (given: 3.2 4.5 2.8 5.1). Use while (scanf(...) == 1). Print 4 samples, 15.6 kg',
        starter: '#include <stdio.h>\n\nint main(void) {\n    double kg;\n    double total = 0;\n    int count = 0;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    double kg;\n    double total = 0;\n    int count = 0;\n    while (scanf("%lf", &kg) == 1) {\n        total += kg;\n        count++;\n    }\n    printf("%d samples, %.1f kg\\n", count, total);\n    return 0;\n}\n',
        hint: 'while (scanf("%lf", &kg) == 1) { total += kg; count++; }',
        stdin: ['3.2 4.5 2.8 5.1'],
        checks: [
          { message: 'Print 4 samples, 15.6 kg', outputIncludes: '4 samples, 15.6 kg' },
          { message: 'Loop on scanf', codeIncludes: 'while (scanf(' },
        ],
      },
    ],
  },
  reflect: {
    prompt: '"Over and out" on a radio is a sentinel. What signals do people use to say "that\'s all" (a full stop, "bye", a closing door)?',
    starters: ['A "that\'s all" signal I use is...', 'Without it...'],
  },
  notes: 'Sentinel-controlled loops; scanf returns the number of items assigned (ISO C 7.21.6.2p16), EOF at end of input.',
};

export default lesson;
