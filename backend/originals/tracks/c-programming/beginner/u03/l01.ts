import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story opener: the 3 a.m. CO2 alarm. A program that decides: the first if. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The CO2 alarm',
  summary: 'Sol 3, 03:12. The carbon dioxide alarm screams the whole crew awake. The air is fine. HABCON used to decide when to sound it; now nothing decides at all, and Ines\'s board just prints numbers.',
  minutes: 11,
  outcomes: [
    'Explain why a program needs to make decisions',
    'Run code only when a condition is true, with if',
    'Read the shape of an if statement',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sol 3, 03:12',
      beats: [
        { speaker: 'narrator', text: 'A siren. Four people in sleeping bags sit up at once. The CO2 panel by the bunks flashes red.' },
        { speaker: 'mateus', text: 'Are we suffocating? Is this sim or real?' },
        { speaker: 'tomoko', text: 'The meter says 1,150 parts per million. Stuffy, not dangerous. Open a vent.' },
        { speaker: 'hal', text: 'The old alarm went off at anything over a thousand. HABCON used to wait for three high readings in a row before it made noise. Now nobody\'s deciding anything.' },
        { speaker: 'ines', text: 'My board only prints the number. It doesn\'t know what the number means.' },
      ],
      choice: {
        prompt: 'What does the alarm program need that Ines\'s board doesn\'t have yet?',
        options: [
          { text: 'A way to check the reading and only sound the alarm when it\'s really high.', outcome: 'A decision. That\'s what if does: run some code only when a condition is true.', best: true },
          { text: 'A louder siren.', outcome: 'Louder isn\'t smarter. The problem is WHEN it goes off.' },
          { text: 'Print the reading more often.', outcome: 'More numbers on a screen at 3 a.m. still need a person to decide.' },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>So far every program ran every line, top to bottom. Real programs <strong>decide</strong>. In C, <code>if</code> runs a block of code only when a <strong>condition</strong> is true:</p><p><code>if (co2_ppm &gt; 2000) {<br>&nbsp;&nbsp;&nbsp;&nbsp;printf("ALARM\\n");<br>}</code></p><p>The condition goes in round brackets. The code to run goes in braces. If the condition is false, C skips the whole block and carries on after the closing brace.</p>',
    },
    {
      kind: 'tryIt',
      title: 'An alarm that thinks',
      code: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm = 1150;\n\n    printf("CO2: %d ppm\\n", co2_ppm);\n    if (co2_ppm > 2000) {\n        printf("ALARM: open the vents!\\n");\n    }\n    printf("Check done\\n");\n    return 0;\n}\n',
      caption: 'At 1,150 ppm, the alarm line is skipped. Run it.',
      challenge: 'Change co2_ppm to 2400 and run it again. Now the alarm line runs.',
    },
  ],
  apply: {
    scenario: 'Sol 3, 03:12. A smarter alarm.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does an if statement do?',
        options: [
          { text: 'Runs its block only when its condition is true' },
          { text: 'Repeats its block', why: 'Repeating is a loop (Chapter 4). if runs its block once, or not at all.' },
          { text: 'Always runs its block, then checks', why: 'It checks first. If the condition is false, the block is skipped.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'int co2_ppm = 900;\nif (co2_ppm > 2000) {\n    printf("ALARM\\n");\n}\nprintf("Done\\n");',
        language: 'c',
        options: [
          { text: 'ALARM, then Done', why: '900 is not greater than 2000, so the ALARM line is skipped.' },
          { text: 'Done' },
          { text: 'Nothing', why: 'Done is outside the if, so it always runs.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the if to its job.',
        pairs: [
          ['if', 'Starts the decision'],
          ['(co2_ppm > 2000)', 'The condition'],
          ['{ ... }', 'Runs only when it\'s true'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'co2_ppm is 2400. Add an if so the program prints ALARM only when co2_ppm is greater than 2000.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm = 2400;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm = 2400;\n    if (co2_ppm > 2000) {\n        printf("ALARM\\n");\n    }\n    return 0;\n}\n',
        hint: 'if (co2_ppm > 2000) { printf("ALARM\\n"); }',
        checks: [
          { message: 'Print ALARM', outputIncludes: 'ALARM' },
          { message: 'Use if', codeIncludes: 'if (' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the decision.',
        template: '[[1]] (co2_ppm > 2000) [[2]]\n    printf("ALARM\\n");\n}',
        blanks: [['if'], ['{']],
        distractors: ['when', '('],
        language: 'c',
      },
      {
        kind: 'findBug',
        prompt: 'Which line stops this compiling?',
        lines: ['int co2_ppm = 2400;', 'if co2_ppm > 2000 {', '    printf("ALARM\\n");', '}'],
        bug: 1,
        fix: 'if (co2_ppm > 2000) {',
        explanation: 'The condition must be inside round brackets.',
        language: 'c',
      },
      {
        kind: 'sortGroups',
        prompt: 'With co2_ppm = 2400, does the alarm line run?',
        groups: ['Runs', 'Skipped'],
        items: [
          { text: 'if (co2_ppm > 2000)', group: 0 },
          { text: 'if (co2_ppm > 3000)', group: 1 },
          { text: 'if (co2_ppm > 1000)', group: 0 },
          { text: 'if (co2_ppm > 2400)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'hal',
        message: 'So your board can decide whether to wake us up?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Yes: with if, the alarm only runs when the reading crosses the limit we choose.' },
          { text: 'No, programs can only print.', why: 'With if, programs choose what to do.' },
          { text: 'Only if you press a button.', why: 'The program checks the reading itself.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which C keyword starts a decision?',
        answers: ['if'],
        placeholder: 'A keyword',
      },
      {
        kind: 'writeCode',
        prompt: 'Print CO2: 2400 ppm. Then, only if it\'s over 2000, print Open the vents. Always finish with Check done.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm = 2400;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int co2_ppm = 2400;\n    printf("CO2: %d ppm\\n", co2_ppm);\n    if (co2_ppm > 2000) {\n        printf("Open the vents\\n");\n    }\n    printf("Check done\\n");\n    return 0;\n}\n',
        hint: 'Check done goes after the closing brace, so it always runs.',
        checks: [
          { message: 'Print the three lines in order', outputEquals: 'CO2: 2400 ppm\nOpen the vents\nCheck done' },
          { message: 'Use if', codeIncludes: 'if (' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a device that decides something for you (a thermostat, a phone that dims its screen). What condition do you think it checks?',
    starters: ['My ... decides to...', 'Its condition is probably...'],
  },
  deepen: {
    title: 'How much CO2 is too much?',
    summary: 'Outdoor air is around 420 ppm. Many indoor guidelines aim to stay under about 1,000 ppm for comfort; workplace safety limits are around 5,000 ppm over a working day. Look up your country\'s guidance.',
  },
  notes: 'Outdoor CO2 ~420 ppm (NOAA Global Monitoring Lab, 2023-24 annual means ~420). Indoor comfort guidance often ~1,000 ppm (e.g. ASHRAE-derived rule of thumb); OSHA PEL 5,000 ppm 8-h TWA (US OSHA). The station\'s thresholds (1,000 old alarm, 2,000 new) are fictional design choices. if statement: ISO C 6.8.4.1.',
};

export default lesson;
