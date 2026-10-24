import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint. Reviews lessons 1–4: variables, assigning, names, int arithmetic. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: The morning count',
  summary: 'Sol 2, 11:30. Tomoko\'s noon count is due: water, plants, and the propane for the heater. Ines writes the counting program herself, from a blank screen.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Create, change and print int variables without notes', 'Calculate with variables and well-chosen names'],
  learn: [
    {
      kind: 'story',
      title: 'Sol 2, 11:30',
      beats: [
        { speaker: 'tomoko', text: 'Noon count. Water 1,652. Propane: two tanks, 20 kilograms each, and we burn 3 kilograms a sol.' },
        { speaker: 'ines', text: 'Variables for each, good names, the board does the sums.' },
        { speaker: 'mateus', text: 'Call them a, b and c. Faster.' },
        { speaker: 'ines', text: 'Lars would fly here from Norway just to delete them.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the noon count.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does int propane_kg = 40; do?',
        options: [
          { text: 'Creates a whole-number variable called propane_kg holding 40' },
          { text: 'Checks if propane_kg is 40', why: 'A single = stores a value. Checking needs ==.' },
          { text: 'Prints 40', why: 'Nothing prints until printf.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good variable name, legal but poor, or illegal?',
        groups: ['Good', 'Legal but poor', 'Illegal'],
        items: [
          { text: 'propane_kg', group: 0 },
          { text: 'p', group: 1 },
          { text: '2tanks', group: 2 },
          { text: 'water_litres', group: 0 },
          { text: 'propane kg', group: 2 },
          { text: 'xx', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int water = 1680;\nwater = 1652;\nint noon = water;\nwater = 1610;\nprintf("%d %d\\n", noon, water);',
        language: 'c',
        options: [
          { text: '1652 1610' },
          { text: '1610 1610', why: 'noon copied 1652 before water changed.' },
          { text: '1680 1610', why: 'water was already 1652 when noon copied it.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Two propane tanks of 20 kg each. Make tanks = 2 and kg_per_tank = 20, store their product in propane_kg, and print Propane: 40 kg',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int tanks = 2;\n    int kg_per_tank = 20;\n    int propane_kg = tanks * kg_per_tank;\n    printf("Propane: %d kg\\n", propane_kg);\n    return 0;\n}\n',
        hint: 'int propane_kg = tanks * kg_per_tank;',
        checks: [
          { message: 'Print Propane: 40 kg', outputIncludes: 'Propane: 40 kg' },
          { message: 'Store it in propane_kg', codeIncludes: 'int propane_kg' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t compile?',
        lines: ['int propane_kg = 40;', 'propane_kg = 37;', 'int propane_kg = 34;', 'printf("%d\\n", propane_kg);'],
        bug: 2,
        fix: 'propane_kg = 34;',
        explanation: 'propane_kg already exists. To change it, leave out int.',
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'How many full sols of propane are left?',
        template: 'int sols_of_propane = propane_kg [[1]] kg_per_sol;\nprintf("[[2]] sols\\n", sols_of_propane);',
        blanks: [['/'], ['%d']],
        distractors: ['*', '%s'],
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: '40 kg of propane, 3 kg a sol. What does this print?',
        code: 'int propane_kg = 40;\nint kg_per_sol = 3;\nprintf("%d\\n", propane_kg / kg_per_sol);',
        language: 'c',
        options: [
          { text: '13.33', why: 'Two ints divide to a whole number.' },
          { text: '14', why: 'C drops the fraction; it doesn\'t round up.' },
          { text: '13' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'Fine, no a, b, c. But why kg in the name? It\'s obviously kilograms.',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Obvious to you today. Put the unit in the name and nobody ever mixes kilograms with pounds.' },
          { text: 'C needs the unit to calculate.', why: 'C doesn\'t know about units at all. The name is for people.' },
          { text: 'It isn\'t needed, you\'re right.', why: 'Unit mix-ups have broken real spacecraft. Names with units prevent them.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'water is 1652. After water = water - 42; what does water hold?',
        answers: ['1610'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'The full noon count: water_litres = 1652, propane_kg = 40, kg_per_sol = 3. Print Water: 1652 litres, then Propane: 40 kg, then Propane sols: 13 (worked out by the board).',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int water_litres = 1652;\n    int propane_kg = 40;\n    int kg_per_sol = 3;\n    printf("Water: %d litres\\n", water_litres);\n    printf("Propane: %d kg\\n", propane_kg);\n    printf("Propane sols: %d\\n", propane_kg / kg_per_sol);\n    return 0;\n}\n',
        hint: 'Three variables, three printf lines, and propane_kg / kg_per_sol for the last one.',
        checks: [
          { message: 'Print the three lines', outputEquals: 'Water: 1652 litres\nPropane: 40 kg\nPropane sols: 13' },
          { message: 'Let the board divide', codeIncludes: 'propane_kg / kg_per_sol' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which felt more natural today: creating variables, or doing maths with them? What would you practise again?',
    starters: ['More natural was...', 'I\'d practise...'],
  },
  notes: 'Review of chapter 2 lessons 1-4. The unit-name remark alludes to NASA\'s Mars Climate Orbiter (1999), lost to a pound-force/newton mix-up (NASA MCO Mishap Investigation Board report).',
};

export default lesson;
