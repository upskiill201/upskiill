import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Before / After: int can't hold 21.5; double can. %f and %.2f. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Decimals with double',
  summary: 'Sol 2, 14:20. The GreenHab thermometer reads 21.5 °C. Ines stores it in an int and the board says 21. Tomoko\'s tomatoes care about that half degree.',
  minutes: 11,
  outcomes: [
    'Store decimal numbers in a double',
    'Print them with %f and choose the decimals with %.1f or %.2f',
    'Pick int or double for a value',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The GreenHab temperature',
      before: {
        label: 'int: the half degree vanishes',
        text: 'int temp_c = 21.5;\nprintf("GreenHab: %d C\\n", temp_c);\n\n// GreenHab: 21 C',
      },
      after: {
        label: 'double: the half degree stays',
        text: 'double temp_c = 21.5;\nprintf("GreenHab: %.1f C\\n", temp_c);\n\n// GreenHab: 21.5 C',
      },
      notes: [
        'An int holds whole numbers only. Put 21.5 in one and C quietly chops it to 21.',
        'A double holds numbers with a decimal point: 21.5, 3.75, 0.02. Use it for measurements.',
        'Print a double with %f, not %d. %f shows six decimals: 21.500000.',
        '%.1f means "one decimal place", %.2f two. C rounds to the place you ask for.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Use %d for int and %f for double. Mixing them up doesn\'t give an error: it prints nonsense. If a number looks wildly wrong, check the % first.',
    },
    {
      kind: 'tryIt',
      title: 'Measurements',
      code: '#include <stdio.h>\n\nint main(void) {\n    double greenhab_temp_c = 21.5;\n    double solar_kwh = 3.75;\n\n    printf("GreenHab: %f C\\n", greenhab_temp_c);\n    printf("GreenHab: %.1f C\\n", greenhab_temp_c);\n    printf("Solar today: %.2f kWh\\n", solar_kwh);\n    printf("Solar, rounded: %.1f kWh\\n", solar_kwh);\n    return 0;\n}\n',
      caption: 'Run it. Compare %f, %.1f and %.2f.',
      challenge: 'Print the solar number with no decimals at all, using %.0f.',
    },
  ],
  apply: {
    scenario: 'Sol 2, 14:20. Tomoko\'s half degree.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which type should hold 21.5 °C?',
        options: [
          { text: 'int', why: 'An int would chop it to 21.' },
          { text: 'double' },
          { text: 'Either; C converts it', why: 'C converts it to 21 in an int: the half degree is lost.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'int or double?',
        groups: ['int', 'double'],
        items: [
          { text: 'Number of crew', group: 0 },
          { text: 'Temperature in °C', group: 1 },
          { text: 'Number of tomato plants', group: 0 },
          { text: 'Solar energy in kWh', group: 1 },
          { text: 'Sol number', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'double kwh = 3.75;\nprintf("%.1f\\n", kwh);',
        language: 'c',
        options: [
          { text: '3.7', why: '%.1f rounds to one decimal, and 3.75 is exactly halfway: it rounds to the even digit, 8.' },
          { text: '3.8' },
          { text: '3.75', why: '%.1f shows only one decimal.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Store 21.5 in a double called greenhab_temp_c and print GreenHab: 21.5 C',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int greenhab_temp_c = 21.5;\n    printf("GreenHab: %d C\\n", greenhab_temp_c);\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    double greenhab_temp_c = 21.5;\n    printf("GreenHab: %.1f C\\n", greenhab_temp_c);\n    return 0;\n}\n',
        hint: 'Change int to double, and %d to %.1f.',
        checks: [
          { message: 'Print GreenHab: 21.5 C', outputIncludes: 'GreenHab: 21.5 C' },
          { message: 'Use a double', codeIncludes: 'double greenhab_temp_c' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'double x = 3.14159; Match the format to what it prints.',
        pairs: [
          ['%f', '3.141590'],
          ['%.2f', '3.14'],
          ['%.0f', '3'],
          ['%.3f', '3.142'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The board prints a crazy temperature. Which line?',
        lines: ['double temp_c = 21.5;', 'printf("Temp: %d C\\n", temp_c);'],
        bug: 1,
        fix: 'printf("Temp: %.1f C\\n", temp_c);',
        explanation: 'temp_c is a double, so it needs %f (or %.1f). %d expects an int and prints nonsense.',
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'Store the battery voltage and print it with two decimals.',
        template: '[[1]] volts = 12.65;\nprintf("Battery: [[2]] V\\n", volts);',
        blanks: [['double'], ['%.2f']],
        distractors: ['int', '%d'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'Why not use double for everything? Then nothing gets chopped.',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Counts are whole things: 4 crew, 48 plants. int says that clearly, and int maths is exact.' },
          { text: 'double can\'t hold whole numbers.', why: 'It can (4.0). But for counts, int is clearer and exact.' },
          { text: 'There\'s no reason; use double everywhere.', why: 'You\'d get 48.000000 plants and tiny rounding surprises. Use each type for its job.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which printf placeholder prints a double with exactly two decimal places?',
        answers: ['%.2f', '.2f', '2f'],
        placeholder: 'Starts with %',
      },
      {
        kind: 'writeCode',
        prompt: 'Make doubles solar_kwh = 3.75 and battery_v = 12.65. Print Solar: 3.75 kWh and Battery: 12.7 V (one decimal for the battery).',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    double solar_kwh = 3.75;\n    double battery_v = 12.65;\n    printf("Solar: %.2f kWh\\n", solar_kwh);\n    printf("Battery: %.1f V\\n", battery_v);\n    return 0;\n}\n',
        hint: '%.2f for the solar line, %.1f for the battery line.',
        checks: [
          { message: 'Print Solar: 3.75 kWh', outputIncludes: 'Solar: 3.75 kWh' },
          { message: 'Print Battery: 12.7 V', outputIncludes: 'Battery: 12.7 V' },
          { message: 'Use double', codeIncludes: 'double' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of three numbers from your day. Which would be an int (counted) and which a double (measured)?',
    starters: ['Counted:...', 'Measured:...'],
  },
  deepen: {
    title: 'float, double\'s little sibling',
    summary: 'C also has float: a decimal type with half the memory and about 7 digits of precision instead of about 15. Small boards sometimes use it to save memory. This course uses double.',
  },
  notes: 'double/float: ISO C 6.2.5; %f default precision 6 and rounding: 7.21.6.1. 12.65 as double is 12.6500000000000003552713678801 so %.1f gives 12.7 (verified with this runner, which matches glibc). 3.75 is exact, a true tie, so %.1f rounds half to even giving 3.8 (glibc behaviour). Typical precision: float ~7, double ~15-16 significant digits (IEEE 754 binary32/64).',
};

export default lesson;
