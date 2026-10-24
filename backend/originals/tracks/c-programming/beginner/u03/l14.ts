import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 14. Card deck: scanf with %lf for doubles, " %c" for chars, and several values at once. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Reading decimals and letters',
  summary: 'Sol 3, 21:30. The GreenHab thermometer reads 21.5, and the watch types status letters. scanf("%d") can\'t handle either. Ines learns scanf\'s other codes, and one strange little space.',
  minutes: 12,
  outcomes: [
    'Read a double with %lf',
    'Read one character with " %c"',
    'Read several values in one scanf',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>scanf uses codes like printf, with one surprise:</p><ul><li><code>%d</code> reads an int</li><li><code>%lf</code> reads a <strong>double</strong> (l for "long float"). Not %f: in scanf, %f is for a smaller type, float.</li><li><code>%c</code> reads one character</li></ul><p><code>double temp_c;<br>scanf("%lf", &amp;temp_c);</code></p>',
    },
    {
      kind: 'text',
      html: '<p><strong>The strange space.</strong> When you press Enter after a number, that Enter is a character too, and it\'s still waiting. A plain <code>%c</code> would read it instead of your letter. A space before it, <code>" %c"</code>, tells scanf to skip any spaces and Enters first.</p><p><strong>Several at once.</strong> One scanf can read several values, separated by spaces or new lines: <code>scanf("%d %lf", &amp;sol, &amp;temp_c);</code></p>',
    },
    {
      kind: 'tryIt',
      title: 'The GreenHab log',
      code: '#include <stdio.h>\n\nint main(void) {\n    double temp_c;\n    char status;\n\n    printf("Temperature? ");\n    scanf("%lf", &temp_c);\n    printf("Status letter? ");\n    scanf(" %c", &status);\n\n    printf("Logged %.1f C, status %c\\n", temp_c, status);\n    return 0;\n}\n',
      caption: 'This run is given 21.5 and A. Run it.',
      challenge: 'Remove the space in " %c" and run it again. What does status become?',
      stdin: ['21.5', 'A'],
    },
    {
      kind: 'check',
      question: 'Which reads a double in scanf?',
      options: ['%d', '%lf', '%c'],
      answer: 1,
      explanation: '%lf reads a double. %d is for ints, %c for one character.',
    },
  ],
  apply: {
    scenario: 'Sol 3, 21:30. Decimals and letters from the watch.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the scanf code to the type it reads.',
        pairs: [
          ['%d', 'int'],
          ['%lf', 'double'],
          [' %c', 'char, skipping spaces first'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Read a temperature (given: 21.5) into a double and print GreenHab: 21.5 C',
        starter: '#include <stdio.h>\n\nint main(void) {\n    double temp_c;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    double temp_c;\n    scanf("%lf", &temp_c);\n    printf("GreenHab: %.1f C\\n", temp_c);\n    return 0;\n}\n',
        hint: 'scanf("%lf", &temp_c); then printf with %.1f.',
        stdin: ['21.5'],
        checks: [
          { message: 'Print GreenHab: 21.5 C', outputIncludes: 'GreenHab: 21.5 C' },
          { message: 'Read with %lf', codeIncludes: '%lf' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why the space in scanf(" %c", &status)?',
        options: [
          { text: 'To skip the Enter left over from the previous input' },
          { text: 'To read a space character', why: 'The opposite: it skips spaces and Enters before reading.' },
          { text: 'It\'s a typo; it does nothing', why: 'It matters: without it, %c can read the leftover Enter.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'The temperature always reads as nonsense. Which line?',
        lines: ['double temp_c;', 'scanf("%d", &temp_c);', 'printf("%.1f\\n", temp_c);'],
        bug: 1,
        fix: 'scanf("%lf", &temp_c);',
        explanation: '%d reads an int, but temp_c is a double. Use %lf.',
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'Read the sol number and the temperature in one scanf.',
        template: 'scanf("[[1]] [[2]]", &sol, &temp_c);',
        blanks: [['%d'], ['%lf']],
        distractors: ['%f', '%c'],
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The input is 3 then 22.4. What prints?',
        code: 'int sol;\ndouble temp_c;\nscanf("%d %lf", &sol, &temp_c);\nprintf("Sol %d: %.1f\\n", sol, temp_c);',
        language: 'c',
        options: [
          { text: 'Sol 3: 22.4' },
          { text: 'Sol 22: 3.0', why: 'Values are read in order: the first into sol, the second into temp_c.' },
          { text: 'Sol 3: 22', why: '%lf keeps the decimal, and %.1f prints it.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'In printf you use %f for a double. Why %lf in scanf?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'In scanf, %f means the smaller float type. A double needs %lf, or the value is read wrong.' },
          { text: 'They\'re the same; either works.', why: 'In scanf they\'re different: %f writes a float, not a double.' },
          { text: 'printf is wrong.', why: 'printf\'s %f is fine for doubles. scanf just needs %lf.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'scanf("%lf", ...) reads which type? (one word)',
        answers: ['double'],
        placeholder: 'A type',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which scanf code for each input?',
        groups: ['%d', '%lf', ' %c'],
        items: [
          { text: 'Crew count: 4', group: 0 },
          { text: 'Temperature: 21.5', group: 1 },
          { text: 'Status: G', group: 2 },
          { text: 'Voltage: 12.65', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Read a temperature and a status letter (given: 27.0 then R). If the status is R or the temperature is over 26, print Cool the GreenHab, otherwise GreenHab OK.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    double temp_c;\n    char status;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    double temp_c;\n    char status;\n    scanf("%lf", &temp_c);\n    scanf(" %c", &status);\n    if (status == \'R\' || temp_c > 26) {\n        printf("Cool the GreenHab\\n");\n    } else {\n        printf("GreenHab OK\\n");\n    }\n    return 0;\n}\n',
        hint: 'scanf("%lf", ...) then scanf(" %c", ...), then if with ||.',
        stdin: ['27.0', 'R'],
        checks: [
          { message: 'Print Cool the GreenHab', outputIncludes: 'Cool the GreenHab' },
          { message: 'Read the letter with " %c"', codeIncludes: '" %c"' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'The leftover Enter is an invisible character that causes visible bugs. What invisible thing has tripped you up (a hidden space in a password, a silent setting)?',
    starters: ['An invisible thing that tripped me up was...', 'I found it by...'],
  },
  notes: 'scanf conversions: %lf stores to double*, %f to float*, %c reads one char without skipping whitespace; a whitespace directive skips whitespace (ISO C 7.21.6.2). printf %f takes double (floats are promoted).',
};

export default lesson;
