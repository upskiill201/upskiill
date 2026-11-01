import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Walkthrough: declaring, assigning, reassigning and copying variables. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Declare, then assign',
  summary: 'Sol 2, 08:10. The morning tank reading is 1,680; by lunch it\'s 1,652. Same box, new value. Ines learns the difference between making a variable and changing it.',
  minutes: 11,
  outcomes: [
    'Declare a variable, then give it a value later',
    'Change a variable\'s value with =',
    'Copy one variable into another',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'One box, through the day',
      steps: [
        {
          title: 'Declare: make the box',
          body: 'A declaration creates the variable: its type and its name. Do it once.',
          code: 'int water;',
          language: 'c',
        },
        {
          title: 'Assign: put a value in',
          body: '= means "put the value on the right into the box on the left". It\'s not "equals" like in maths: it\'s an instruction.',
          code: 'water = 1680;',
          language: 'c',
        },
        {
          title: 'Declare and assign together',
          body: 'Most of the time you do both in one line. This is called initialising.',
          code: 'int water = 1680;',
          language: 'c',
        },
        {
          title: 'Reassign: new value, same box',
          body: 'Later, assign again without int. The old value is gone; the box now holds the new one.',
          code: 'water = 1652; // lunch reading',
          language: 'c',
        },
        {
          title: 'Copy one box into another',
          body: 'The right side can be another variable. Its value is copied; the two boxes stay separate.',
          code: 'int morning = water;\nwater = 1610; // morning still holds 1652',
          language: 'c',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Through the day',
      code: '#include <stdio.h>\n\nint main(void) {\n    int water = 1680;\n    printf("07:00 %d litres\\n", water);\n\n    water = 1652;\n    printf("12:00 %d litres\\n", water);\n\n    int lunch = water;\n    water = 1610;\n    printf("19:00 %d litres (lunch was %d)\\n", water, lunch);\n    return 0;\n}\n',
      caption: 'Run it and follow the box through the day.',
      challenge: 'Add a 22:00 reading of 1590 at the end and print it.',
    },
  ],
  apply: {
    scenario: 'Sol 2, 08:10. Readings through the day.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In C, what does water = 1652; do?',
        options: [
          { text: 'Checks whether water equals 1652', why: 'That would be ==. A single = puts a value in.' },
          { text: 'Puts 1652 into the variable water' },
          { text: 'Creates a new variable', why: 'There\'s no type in front, so it changes an existing one.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int water = 1680;\nwater = 1652;\nprintf("%d\\n", water);',
        language: 'c',
        options: [
          { text: '1680', why: 'The second line replaced 1680. A variable holds one value at a time.' },
          { text: '1652' },
          { text: '1680 1652', why: 'Only the current value is stored.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Declaration, or assignment only?',
        groups: ['Creates a variable', 'Changes an existing one'],
        items: [
          { text: 'int crew = 4;', group: 0 },
          { text: 'crew = 3;', group: 1 },
          { text: 'int power;', group: 0 },
          { text: 'power = 62;', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Declare int power; on its own line, then assign it 62 on the next line, then print Power: 62',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int power;\n    power = 62;\n    printf("Power: %d\\n", power);\n    return 0;\n}\n',
        hint: 'int power; then power = 62; then printf("Power: %d\\n", power);',
        checks: [
          { message: 'Declare it on its own', codeIncludes: 'int power;' },
          { message: 'Assign 62', codeIncludes: 'power = 62;' },
          { message: 'Print Power: 62', outputIncludes: 'Power: 62' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t compile?',
        lines: ['int water = 1680;', 'water = 1652;', 'int water = 1610;'],
        bug: 2,
        fix: 'water = 1610;',
        explanation: 'water already exists. Writing int again tries to create a second variable with the same name. To change it, leave out the int.',
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int a = 10;\nint b = a;\na = 20;\nprintf("%d %d\\n", a, b);',
        language: 'c',
        options: [
          { text: '20 20', why: 'b got a copy of 10. Changing a later doesn\'t touch b.' },
          { text: '10 20', why: 'a is 20 now; b still holds the 10 it copied.' },
          { text: '20 10' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Save the lunch reading before the water changes again.',
        template: 'int water = 1652;\n[[1]] lunch = [[2]];\nwater = 1610;',
        blanks: [['int'], ['water']],
        distractors: ['1610', 'lunch'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'If I copy water into lunch, and water changes, does lunch change too?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Yes, they\'re linked now.', why: '= copies the value. The two boxes are separate.' },
          { text: 'No. lunch got a copy of the value at that moment. They\'re two separate boxes.' },
          { text: 'Only if you print it.', why: 'Printing doesn\'t change anything.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Declaring a variable and giving it a value in the same line is called what? (starts with "init")',
        answers: ['initialising', 'initializing', 'initialization', 'initialisation'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Start with water = 1680. Save it in a variable called morning. Then set water to 1610. Print: Morning 1680, now 1610',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int water = 1680;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int water = 1680;\n    int morning = water;\n    water = 1610;\n    printf("Morning %d, now %d\\n", morning, water);\n    return 0;\n}\n',
        hint: 'int morning = water; must come before water = 1610;',
        checks: [
          { message: 'Print Morning 1680, now 1610', outputIncludes: 'Morning 1680, now 1610' },
          { message: 'Copy water into morning', codeIncludes: 'morning = water;' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'A variable keeps only its latest value. What do you keep only the latest version of (a phone number, a note, a score)? When have you wished you\'d saved the old one?',
    starters: ['I only keep the latest...', 'I wish I\'d saved...'],
  },
  notes: 'Assignment operator (ISO C 6.5.16): stores the right operand\'s value into the left object. Redeclaration of an identifier in the same scope is a constraint violation.',
};

export default lesson;
