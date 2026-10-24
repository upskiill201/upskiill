import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Myth or Fact: the rules for variable names, and names people can read. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Naming things well',
  summary: 'Sol 2, 09:00. In an old HABCON file, Ines finds variables called x, x2, xx and temp2b. Lars\'s comment beside them: "Never again." She decides how her variables will be named.',
  minutes: 10,
  outcomes: [
    'Know which names C allows and which it rejects',
    'Choose names that say what a value is, with units',
    'Write multi-word names in snake_case',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'A variable name can contain a space, like water left.', isFact: false, explain: 'Myth. Names are one word: letters, digits and underscores. Write water_left instead.' },
        { text: 'A name can\'t start with a digit: 2rovers is not allowed.', isFact: true, explain: 'Fact. Digits are fine after the first character (rover2), never as the first.' },
        { text: 'You can call a variable int or return.', isFact: false, explain: 'Myth. Those are keywords: words C already uses. They can\'t be names.' },
        { text: 'Water and water are two different variables.', isFact: true, explain: 'Fact. C is case-sensitive, for names you make too. Pick one style and stick to it.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>Legal isn\'t the same as good. <code>x = 1680</code> compiles, but six hours later nobody knows what x was. A good name says <strong>what</strong> the value is, and its <strong>unit</strong> if it has one: <code>water_litres</code>, <code>power_percent</code>, <code>temp_c</code>.</p><p>C programmers usually join words with underscores, all lowercase: <strong>snake_case</strong>. That\'s the style in this course.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Names that explain themselves',
      code: '#include <stdio.h>\n\nint main(void) {\n    int water_litres = 1680;\n    int crew_count = 4;\n    int litres_per_person = 18;\n\n    printf("Water: %d litres\\n", water_litres);\n    printf("Daily use: %d litres\\n", crew_count * litres_per_person);\n    return 0;\n}\n',
      caption: 'You can read crew_count * litres_per_person out loud and know what it means. Run it.',
      challenge: 'Add a variable rover_count holding 2 and print Rovers: 2 with it.',
    },
  ],
  apply: {
    scenario: 'Sol 2, 09:00. Lars\'s "never again".',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Allowed as a C variable name?',
        groups: ['Allowed', 'Not allowed'],
        items: [
          { text: 'water_litres', group: 0 },
          { text: '2rovers', group: 1 },
          { text: 'rover2', group: 0 },
          { text: 'water left', group: 1 },
          { text: 'return', group: 1 },
          { text: 'temp_c', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the best name for the battery charge, in percent?',
        options: [
          { text: 'b', why: 'Legal, but nobody will know what b is tomorrow.' },
          { text: 'battery_percent' },
          { text: 'Battery Percent', why: 'Names can\'t contain spaces.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t compile?',
        lines: ['int crew_count = 4;', 'int 1st_sol = 1;', 'int rover2 = 31;'],
        bug: 1,
        fix: 'int first_sol = 1;',
        explanation: 'A name can\'t start with a digit. first_sol or sol_1 works.',
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Rename x to water_litres everywhere, so the program still prints Water: 1680 litres.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int x = 1680;\n    printf("Water: %d litres\\n", x);\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int water_litres = 1680;\n    printf("Water: %d litres\\n", water_litres);\n    return 0;\n}\n',
        hint: 'Change x in both places: where it\'s declared and where it\'s printed.',
        checks: [
          { message: 'Print Water: 1680 litres', outputIncludes: 'Water: 1680 litres' },
          { message: 'Name it water_litres', codeIncludes: 'int water_litres' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A program has int Water = 5; and later prints water. What happens?',
        options: [
          { text: 'It prints 5', why: 'Water and water are different names to C.' },
          { text: 'Compile error: water is undeclared' },
          { text: 'It prints 0', why: 'It never gets to run: water doesn\'t exist.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the bad name to a better one.',
        pairs: [
          ['x', 'water_litres'],
          ['t', 'temp_c'],
          ['n', 'crew_count'],
          ['p', 'power_percent'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'Short names are faster to type. Why is Lars so upset about x?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Code is read far more than it\'s typed. water_litres explains itself; x needs a detective.' },
          { text: 'Short names run slower.', why: 'Names don\'t change speed at all. They change how easy the code is to read.' },
          { text: 'x isn\'t allowed in C.', why: 'It\'s allowed. It\'s just a bad name for water.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do we call the style water_litres, lowercase words joined by underscores? (two words)',
        answers: ['snake case', 'snake_case', 'snakecase'],
        placeholder: 'Two words',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a declaration for the GreenHab temperature, 24 degrees, with a good name.',
        tiles: ['int', 'greenhab_temp_c', '=', '24', ';'],
        distractors: ['GreenHab temp', 't'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'Make two well-named int variables, crew_count = 4 and litres_per_person = 18, and print Daily use: 72 litres by multiplying them (* means multiply).',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int crew_count = 4;\n    int litres_per_person = 18;\n    printf("Daily use: %d litres\\n", crew_count * litres_per_person);\n    return 0;\n}\n',
        hint: 'printf("Daily use: %d litres\\n", crew_count * litres_per_person);',
        checks: [
          { message: 'Print Daily use: 72 litres', outputIncludes: 'Daily use: 72 litres' },
          { message: 'Multiply the variables', codeIncludes: 'crew_count * litres_per_person' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a folder, a file or a contact in your phone with a terrible name. What would you rename it to so future-you knows exactly what it is?',
    starters: ['The worst-named thing I have is...', 'I\'d rename it...'],
  },
  deepen: {
    title: 'The full keyword list',
    summary: 'C has a few dozen keywords (int, return, if, while, for, char, double, struct...). None of them can be a name. Search for "C keywords" and see how many you already know.',
  },
  notes: 'Identifier rules: ISO C 6.4.2 (letters, digits, underscore; not starting with a digit). Keywords: 6.4.1 (C11 has 44). snake_case is common in C codebases (e.g. Linux kernel style).',
};

export default lesson;
