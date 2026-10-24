import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 20 — Unit Challenge. Everything in Chapter 2: the full resource report for Lars. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: How many sols are left?',
  summary: 'Sol 2, 23:55. Lars\'s question for tomorrow\'s email: "Water, propane, power. How many sols does each give you? Show me the program, not the answer." Ines writes it before midnight.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Choose the right type for every value in a real report',
    'Calculate with /, %, casts and constants without mistakes',
    'Print a clean, lined-up report that answers the question',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sol 2, 23:55',
      beats: [
        { speaker: 'narrator', text: 'Lars\'s second email is two lines long.' },
        { speaker: 'lars', text: 'Water, propane, power. How many full sols does each give you? Show me the program, not the answer. A program I can check. An answer I can only believe.' },
        { speaker: 'ines', text: 'Water: 1,590 litres, 400 in reserve, 72 a sol. Propane: 37 kilograms, 3 a sol. Battery: 62 percent of a 10 kilowatt-hour bank, 4.5 used a sol.' },
        { speaker: 'tomoko', text: 'Power is a decimal. The rest are counts.' },
        { speaker: 'hal', text: 'And whatever runs out first, that\'s our real mission length. Put it at the bottom.' },
      ],
      choice: {
        prompt: 'Lars wants a program he can check. What should the program look like?',
        options: [
          { text: 'Named constants for the rules, named variables for the readings, one named step per calculation.', outcome: 'Exactly what Lars means. Anyone can read each line and check it.', best: true },
          { text: 'One printf with the final numbers typed in.', outcome: 'That\'s an answer, not a program. Lars can\'t check how she got it.' },
          { text: 'One very long calculation in a single line.', outcome: 'It might be right, but nobody can check it at a glance. Name the steps.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'Unit Challenge: the resource report for Lars.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which type for each value?',
        groups: ['int', 'double', 'char'],
        items: [
          { text: 'Propane in whole kilograms: 37', group: 0 },
          { text: 'Battery bank: 10.0 kWh', group: 1 },
          { text: 'Status code: A', group: 2 },
          { text: 'Water reserve: 400 litres', group: 0 },
          { text: 'Power used per sol: 4.5 kWh', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int propane_kg = 37;\nint kg_per_sol = 3;\nprintf("%d sols, %d kg left\\n", propane_kg / kg_per_sol, propane_kg % kg_per_sol);',
        language: 'c',
        options: [
          { text: '12 sols, 1 kg left' },
          { text: '12.3 sols, 1 kg left', why: 'int / int is a whole number.' },
          { text: '13 sols, 0 kg left', why: 'C doesn\'t round up: 37 / 3 is 12, remainder 1.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Water first. Usable water is 1590 - 400. With #define CREW 4 and const int RATION_LITRES = 18, print Water: 16 full sols',
        starter: '#include <stdio.h>\n\n#define CREW 4\n\nint main(void) {\n    const int RATION_LITRES = 18;\n    int tank_litres = 1590;\n    int reserve_litres = 400;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\n#define CREW 4\n\nint main(void) {\n    const int RATION_LITRES = 18;\n    int tank_litres = 1590;\n    int reserve_litres = 400;\n    int usable = tank_litres - reserve_litres;\n    int water_sols = usable / (CREW * RATION_LITRES);\n    printf("Water: %d full sols\\n", water_sols);\n    return 0;\n}\n',
        hint: 'usable / (CREW * RATION_LITRES): the brackets matter.',
        checks: [
          { message: 'Print Water: 16 full sols', outputIncludes: 'Water: 16 full sols' },
          { message: 'Use the constants', codeIncludes: 'CREW * RATION_LITRES' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The power estimate prints 1.0 sols. Which line is the bug?',
        lines: ['double bank_kwh = 10.0;', 'int charge_percent = 62;', 'double stored_kwh = bank_kwh * (charge_percent / 100);', 'printf("%.1f\\n", stored_kwh / 4.5);'],
        bug: 2,
        fix: 'double stored_kwh = bank_kwh * charge_percent / 100.0;',
        explanation: 'charge_percent / 100 is int division: 62 / 100 is 0. Divide by 100.0, or multiply first.',
        language: 'c',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its fix.',
        pairs: [
          ['Average of ints comes out whole', 'Cast to double before dividing'],
          ['A + B / 2 is too big', 'Brackets: (A + B) / 2'],
          ['Total is garbage', 'Initialise it to 0'],
          ['Ration typed in six places', 'One named constant'],
          ['21.5 prints as 21', 'Use double, not int'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Print the battery with one decimal, 6 wide.',
        template: 'printf("Stored: [[1]] kWh\\n", stored_kwh);',
        blanks: [['%6.1f']],
        distractors: ['%6d', '%.6f', '%c'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'lars',
        message: 'Your propane says 12 sols. Your water says 16. What is your mission length?',
        prompt: 'Ines\'s best reply?',
        options: [
          { text: '12 sols, unless we get more propane. The first thing to run out sets the limit.' },
          { text: '16, because water matters most.', why: 'Without heat, the crew can\'t stay either. The smallest number wins.' },
          { text: '14, the average.', why: 'Averages don\'t help when one supply runs out first.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which line counts readings safely?',
        options: [
          { text: 'int readings; readings++;', why: 'readings starts with garbage.' },
          { text: 'int readings = 0; readings++;' },
          { text: 'int readings++;', why: 'That\'s not valid C. Declare it with a value first.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A 10 kWh battery at 62% stores how many kWh? (type the number)',
        answers: ['6.2', '6.20'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the power calculation in order.',
        lines: ['double bank_kwh = 10.0;', 'double stored_kwh = bank_kwh * 62 / 100.0;', 'double power_sols = stored_kwh / 4.5;', 'printf("Power: %.1f sols\\n", power_sols);'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Power: a 10.0 kWh bank at 62%, using 4.5 kWh a sol. Print Power: 1.4 sols (one decimal).',
        starter: '#include <stdio.h>\n\nint main(void) {\n    double bank_kwh = 10.0;\n    int charge_percent = 62;\n    double kwh_per_sol = 4.5;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    double bank_kwh = 10.0;\n    int charge_percent = 62;\n    double kwh_per_sol = 4.5;\n    double stored_kwh = bank_kwh * charge_percent / 100.0;\n    printf("Power: %.1f sols\\n", stored_kwh / kwh_per_sol);\n    return 0;\n}\n',
        hint: 'stored_kwh = bank_kwh * charge_percent / 100.0; then divide by kwh_per_sol.',
        checks: [
          { message: 'Print Power: 1.4 sols', outputIncludes: 'Power: 1.4 sols' },
          { message: 'Avoid int division by 100', codeIncludes: '100.0' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The full report for Lars, exactly:\nWater:   16 sols\nPropane: 12 sols\nPower:   1.4 sols\nStatus:  A\n(water 1590 - 400 at 72 a sol, propane 37 kg at 3 a sol, power as before, status \'A\').',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int usable_litres = 1590 - 400;\n    int litres_per_sol = 72;\n    int propane_kg = 37;\n    int kg_per_sol = 3;\n    double stored_kwh = 10.0 * 62 / 100.0;\n    double kwh_per_sol = 4.5;\n    char status = \'A\';\n\n    printf("Water:   %d sols\\n", usable_litres / litres_per_sol);\n    printf("Propane: %d sols\\n", propane_kg / kg_per_sol);\n    printf("Power:   %.1f sols\\n", stored_kwh / kwh_per_sol);\n    printf("Status:  %c\\n", status);\n    return 0;\n}\n',
        hint: 'Name each reading, then one printf per line: %d for the ints, %.1f for power, %c for the status.',
        checks: [
          { message: 'Print the report exactly', outputEquals: 'Water:   16 sols\nPropane: 12 sols\nPower:   1.4 sols\nStatus:  A' },
          { message: 'Use a char for the status', codeIncludes: 'char' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Lars wants the program, not the answer, so he can check it. When have you trusted a method more than a result?',
    starters: ['I trusted the method when...', 'Showing my working helps because...'],
  },
  deepen: {
    title: 'The smallest number wins',
    summary: 'Engineers call the first thing to run out the "limiting factor". Try listing your own: phone battery, money, time this week. Which runs out first?',
  },
  notes: 'Unit Challenge for Chapter 2, covering lessons 1-19. 1190/72 = 16; 37/3 = 12 r 1; 10*62/100.0 = 6.2; 6.2/4.5 = 1.377... so %.1f gives 1.4. Station figures are fictional.',
};

export default lesson;
