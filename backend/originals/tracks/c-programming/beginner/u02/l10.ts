import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Checkpoint. Reviews lessons 6–9: / and %, double, mixing types, char. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: The water log',
  summary: 'Sol 2, 18:00. Before the email window, Hal wants the water log: full sols left, litres left over, the average per person, and a status letter. Every type you\'ve met today, in one program.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Choose int, double or char for each value', 'Use /, % and casts to get the right answer'],
  learn: [
    {
      kind: 'story',
      title: 'Sol 2, 18:00',
      beats: [
        { speaker: 'hal', text: 'Lars will ask for numbers, and I want them right. Full sols of water, the leftover, the average use per head. And a status letter.' },
        { speaker: 'tomoko', text: 'We used 70 litres today. The tank reads 1,610.' },
        { speaker: 'ines', text: 'Then the average is 17.5. Not 17.' },
        { speaker: 'mateus', text: 'She\'s become a decimal person.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the water log.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which type for each value?',
        groups: ['int', 'double', 'char'],
        items: [
          { text: 'Litres in the tank, counted in whole litres', group: 0 },
          { text: 'Average litres per person', group: 1 },
          { text: 'Status code G, A or R', group: 2 },
          { text: 'Full sols left', group: 0 },
          { text: 'Water temperature in °C', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int water = 1610;\nint daily = 72;\nprintf("%d sols, %d left\\n", water / daily, water % daily);',
        language: 'c',
        options: [
          { text: '22 sols, 26 left' },
          { text: '22.36 sols, 26 left', why: 'int / int gives a whole number.' },
          { text: '22 sols, 0 left', why: '% gives the remainder: 1610 - 22 × 72 = 26.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the average so it prints Average: 17.5 litres per person',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int used_today = 70;\n    int crew = 4;\n    double average = used_today / crew;\n    printf("Average: %.1f litres per person\\n", average);\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int used_today = 70;\n    int crew = 4;\n    double average = (double)used_today / crew;\n    printf("Average: %.1f litres per person\\n", average);\n    return 0;\n}\n',
        hint: 'Cast before you divide.',
        checks: [
          { message: 'Print Average: 17.5 litres per person', outputIncludes: 'Average: 17.5 litres per person' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the placeholder to the type it prints.',
        pairs: [
          ['%d', 'int'],
          ['%.1f', 'double, one decimal'],
          ['%c', 'char'],
          ['%%', 'A percent sign'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The board prints a strange status. Which line?',
        lines: ['char status = \'A\';', 'double average = 17.5;', 'printf("Status %d, average %.1f\\n", status, average);'],
        bug: 2,
        fix: 'printf("Status %c, average %.1f\\n", status, average);',
        explanation: 'status is a char. %d prints its number (65); %c prints the letter A.',
        language: 'c',
      },
      {
        kind: 'mcq',
        prompt: 'Which gives 17.5?',
        options: [
          { text: '70 / 4', why: 'Two ints: 17.' },
          { text: '(double)(70 / 4)', why: 'The division happens first, as ints: 17.0.' },
          { text: '70 / 4.0' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the status line.',
        template: '[[1]] status = \'G\';\nprintf("Status: [[2]]\\n", status);',
        blanks: [['char'], ['%c']],
        distractors: ['int', '%s'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'Board says 22 full sols. Mateus says we have 22.4. Which do I tell Lars?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: '22 full sols, plus 26 litres. The fraction isn\'t a sol of water; it\'s a leftover.' },
          { text: '22.4: it\'s more accurate.', why: 'A sol of water is all or nothing for planning. Full sols plus leftover is clearer.' },
          { text: '23, to be safe.', why: 'Rounding up promises water that isn\'t there.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does 75 % 10 give?',
        answers: ['5'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'The full water log: water = 1610, daily = 72, used_today = 70, crew = 4, status = \'G\'. Print exactly:\nFull sols: 22\nLeft over: 26 litres\nAverage: 17.5 litres\nStatus: G',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int water = 1610;\n    int daily = 72;\n    int used_today = 70;\n    int crew = 4;\n    char status = \'G\';\n\n    printf("Full sols: %d\\n", water / daily);\n    printf("Left over: %d litres\\n", water % daily);\n    printf("Average: %.1f litres\\n", (double)used_today / crew);\n    printf("Status: %c\\n", status);\n    return 0;\n}\n',
        hint: 'Five variables, then / for full sols, % for the leftover, a cast for the average, %c for the status.',
        checks: [
          { message: 'Print the four lines exactly', outputEquals: 'Full sols: 22\nLeft over: 26 litres\nAverage: 17.5 litres\nStatus: G' },
          { message: 'Use % for the leftover', codeIncludes: 'water % daily' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of today\'s types (int, double, char) do you think you\'ll use most, and why?',
    starters: ['I\'ll use ... most because...', 'The one I find trickiest is...'],
  },
  notes: 'Review of chapter 2 lessons 6-9. 1610 / 72 = 22 r 26.',
};

export default lesson;
