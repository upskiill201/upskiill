import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint. Reviews lessons 1–4: while, the three parts of a loop, counters, for. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: The countdown',
  summary: 'Sol 4, 11:00. Radio check with the rover every 30 minutes, and the board should count down to each one. Hal also wants the km markers printed for the log. All loops, no notes.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write while and for loops from scratch', 'Predict exactly how many times a loop runs'],
  learn: [
    {
      kind: 'story',
      title: 'Sol 4, 11:00. Radio check',
      beats: [
        { speaker: 'mateus', text: '(radio) Rover to Red Mesa. Kilometre six. Battery fifty-eight. Lots of very nice rocks.' },
        { speaker: 'hal', text: 'Copy, rover. Moreau, I want a countdown to every radio call, and the km markers in the log.' },
        { speaker: 'ines', text: 'A countdown is a loop going down. Markers are a loop going up in twos.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: radio checks and markers.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines does this print?',
        code: 'for (int i = 1; i <= 5; i++) {\n    printf("Call %d\\n", i);\n}',
        language: 'c',
        options: [
          { text: '4', why: '<= 5 includes 5: calls 1 to 5.' },
          { text: '5' },
          { text: '6', why: 'It stops when i becomes 6, without printing.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Countdown to the radio call: print 3, 2, 1 (one per line) then Calling rover.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    for (int n = 3; n >= 1; n--) {\n        printf("%d\\n", n);\n    }\n    printf("Calling rover\\n");\n    return 0;\n}\n',
        hint: 'for (int n = 3; n >= 1; n--)',
        checks: [
          { message: 'Print 3, 2, 1 and Calling rover', outputEquals: '3\n2\n1\nCalling rover' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the loop to its output.',
        pairs: [
          ['for (int i = 0; i < 3; i++)', '0 1 2'],
          ['for (int i = 3; i > 0; i--)', '3 2 1'],
          ['for (int i = 0; i <= 6; i += 3)', '0 3 6'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This loop never ends. Which line?',
        lines: ['int battery = 58;', 'while (battery > 30) {', '    printf("%d\\n", battery);', '}'],
        bug: 2,
        fix: '    printf("%d\\n", battery);\n    battery -= 7;',
        explanation: 'Nothing in the body changes battery, so battery > 30 stays true forever. Add the step.',
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'for or while?',
        groups: ['for: a known count', 'while: until something happens'],
        items: [
          { text: 'Print 48 plant labels', group: 0 },
          { text: 'Drive until the battery hits the margin', group: 1 },
          { text: 'Count down from 10', group: 0 },
          { text: 'Keep reading readings until -1 is typed', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Print the km markers 2, 4, 6, 8.',
        template: 'for (int km = 2; km <= 8; km [[1]] 2) {\n    printf("km %d\\n", [[2]]);\n}',
        blanks: [['+='], ['km']],
        distractors: ['=', 'i'],
        language: 'c',
      },
      {
        kind: 'mcq',
        prompt: 'In for (A; B; C), which part runs only once?',
        options: [
          { text: 'B, the condition', why: 'B is checked before every repeat.' },
          { text: 'A, the start' },
          { text: 'C, the step', why: 'C runs after every repeat.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: '(radio) Battery fifty-eight, seven per km, thirty margin. How far can I go?',
        prompt: 'What should Ines\'s program do?',
        options: [
          { text: 'Divide 58 by 7.', why: 'That ignores the 30% margin he needs to come back.' },
          { text: 'Loop forever until he radios.', why: 'The loop needs a condition that ends it: the battery margin.' },
          { text: 'Loop: while battery - 7 >= 30, add a km and take 7. Then report the km count.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'for (int i = 10; i > 0; i -= 2) prints 10, 8, 6, ... What is the last number?',
        answers: ['2'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Read the rover\'s battery (given: 58). With 7% per km and a 30% margin, use a while loop to work out how many more km it can go. Print More km: 4',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int battery;\n    int km = 0;\n    scanf("%d", &battery);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int battery;\n    int km = 0;\n    scanf("%d", &battery);\n    while (battery - 7 >= 30) {\n        km++;\n        battery -= 7;\n    }\n    printf("More km: %d\\n", km);\n    return 0;\n}\n',
        hint: 'while (battery - 7 >= 30) { km++; battery -= 7; }',
        stdin: ['58'],
        checks: [
          { message: 'Print More km: 4', outputIncludes: 'More km: 4' },
          { message: 'Use while', codeIncludes: 'while (' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'You\'ve now written loops that count and loops that wait for something. Which kind feels more natural to you?',
    starters: ['The more natural kind is...', 'The other kind still feels...'],
  },
  notes: 'Review of chapter 4 lessons 1-4. 58 -> 51, 44, 37, 30: four km keep >= 30.',
};

export default lesson;
