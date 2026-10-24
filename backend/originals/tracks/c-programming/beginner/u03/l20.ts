import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 20 — Unit Challenge. Everything in Chapter 3: an alarm that only sounds on three high readings. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: The alarm that cried wolf',
  summary: 'Sol 3, 23:55. Ines builds what HABCON did and the old alarm didn\'t: wait for three high readings in a row before waking anyone. One spike from someone breathing on the sensor, and the crew sleeps on.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Read and check several inputs safely',
    'Combine conditions to tell a spike from a real problem',
    'Choose between levels with a chain, tested at the edges',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sol 3, 23:55',
      beats: [
        { speaker: 'narrator', text: 'The sensor by the bunks is right where Mateus sleeps. Every time he turns over and breathes on it, the reading jumps.' },
        { speaker: 'hal', text: 'HABCON waited for three high readings in a row, one a minute. A real problem stays high. A sneeze doesn\'t.' },
        { speaker: 'tomoko', text: 'And if all three are high but one is over 5,000? That\'s not "open a vent". That\'s "get out".' },
        { speaker: 'ines', text: 'Three readings. All high: alarm. Any one over 5,000: danger, no waiting. Otherwise, let them sleep.' },
        { speaker: 'mateus', text: 'Please let us sleep.' },
      ],
      choice: {
        prompt: 'Three readings: 2400, 900, 2300. What should the panel do?',
        options: [
          { text: 'Stay quiet: they weren\'t ALL high. The 900 means the first was a spike.', outcome: 'Right. && across all three readings is what separates a spike from a real problem.', best: true },
          { text: 'Sound the alarm: two of three were high.', outcome: 'That\'s how false alarms happen. HABCON\'s rule was all three.' },
          { text: 'Average them and decide.', outcome: 'The average, 1867, hides that one reading was low. The rule is "three in a row".' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'Unit Challenge: the alarm that cried wolf.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which condition is true only when all three readings are over 2000?',
        options: [
          { text: 'r1 > 2000 || r2 > 2000 || r3 > 2000', why: '|| is true if just one is high. That\'s the old cry-wolf alarm.' },
          { text: 'r1 > 2000 && r2 > 2000 && r3 > 2000' },
          { text: '(r1 + r2 + r3) > 2000', why: 'The sum is over 2000 for almost any three readings.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Rule: alarm only if all three are over 2000. Alarm or quiet?',
        groups: ['Alarm', 'Quiet'],
        items: [
          { text: '2400, 2300, 2100', group: 0 },
          { text: '2400, 900, 2300', group: 1 },
          { text: '2000, 2500, 2500', group: 1 },
          { text: '2001, 2001, 2001', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Read three readings (given: 2400 900 2300). Print ALARM if all three are over 2000, otherwise Spike ignored.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int r1, r2, r3;\n    scanf("%d %d %d", &r1, &r2, &r3);\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int r1, r2, r3;\n    scanf("%d %d %d", &r1, &r2, &r3);\n    if (r1 > 2000 && r2 > 2000 && r3 > 2000) {\n        printf("ALARM\\n");\n    } else {\n        printf("Spike ignored\\n");\n    }\n    return 0;\n}\n',
        hint: 'Join the three comparisons with &&.',
        stdin: ['2400 900 2300'],
        checks: [
          { message: 'Print Spike ignored', outputIncludes: 'Spike ignored' },
          { message: 'Use &&', codeIncludes: '&&' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The alarm still cries wolf on a single spike. Which line?',
        lines: ['scanf("%d %d %d", &r1, &r2, &r3);', 'if (r1 > 2000 || r2 > 2000 || r3 > 2000) {', '    printf("ALARM\\n");', '}'],
        bug: 1,
        fix: 'if (r1 > 2000 && r2 > 2000 && r3 > 2000) {',
        explanation: '|| fires when any one reading is high. "Three in a row" needs &&.',
        language: 'c',
      },
      {
        kind: 'mcq',
        prompt: 'Tomoko\'s danger rule: any single reading over 5000 means DANGER, straight away. Which operator?',
        options: [
          { text: '&&', why: 'Waiting for all three would waste two minutes in real danger.' },
          { text: '||' },
          { text: '!', why: '! flips a condition; it doesn\'t combine three.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to the operator it needs.',
        pairs: [
          ['All three high', '&&'],
          ['Any one over 5000', '||'],
          ['The fans are NOT on', '!'],
          ['Exactly 3 values read', '== 3'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'Why does DANGER get checked before the normal alarm?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Only the first true branch runs. If ALARM came first, a DANGER reading could stop at ALARM.' },
          { text: 'C checks || before &&.', why: 'Order in the chain is up to us, and that\'s why it matters.' },
          { text: 'It doesn\'t matter.', why: 'It matters: the most serious check must come first.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the safe read.',
        template: 'if ([[1]]("%d %d %d", &r1, &r2, &r3) [[2]] 3) {\n    printf("Bad input\\n");\n    return 1;\n}',
        blanks: [['scanf'], ['!=']],
        distractors: ['printf', '=='],
        language: 'c',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Readings 2100, 2100, 6000. With DANGER checked first, what does the panel print? (one word)',
        answers: ['danger'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the chain: danger first, then alarm, then quiet.',
        lines: ['if (r1 > 5000 || r2 > 5000 || r3 > 5000) {', '    printf("DANGER\\n");', '} else if (r1 > 2000 && r2 > 2000 && r3 > 2000) {', '    printf("ALARM\\n");', '} else {', '    printf("Quiet\\n");', '}'],
        language: 'c',
      },
      {
        kind: 'writeCode',
        prompt: 'The full panel. Read three readings safely (given: 2100 2300 2050). Print Bad input if scanf doesn\'t read 3; DANGER: get out if any is over 5000; ALARM: open the vents if all three are over 2000; otherwise Quiet: spike ignored.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int r1, r2, r3;\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int r1, r2, r3;\n    if (scanf("%d %d %d", &r1, &r2, &r3) != 3) {\n        printf("Bad input\\n");\n        return 1;\n    }\n    if (r1 > 5000 || r2 > 5000 || r3 > 5000) {\n        printf("DANGER: get out\\n");\n    } else if (r1 > 2000 && r2 > 2000 && r3 > 2000) {\n        printf("ALARM: open the vents\\n");\n    } else {\n        printf("Quiet: spike ignored\\n");\n    }\n    return 0;\n}\n',
        hint: 'Safe read, then || for danger, && for the alarm, else quiet.',
        stdin: ['2100 2300 2050'],
        checks: [
          { message: 'Print ALARM: open the vents', outputIncludes: 'ALARM: open the vents' },
          { message: 'Use || for danger', codeIncludes: '> 5000 ||' },
          { message: 'Read safely', codeIncludes: '!= 3' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Same panel, Tomoko\'s edge test: the readings are 2000 2500 2500 (given). Make sure it prints Quiet: spike ignored, because 2000 is not OVER 2000.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    int r1, r2, r3;\n    if (scanf("%d %d %d", &r1, &r2, &r3) != 3) {\n        printf("Bad input\\n");\n        return 1;\n    }\n    if (r1 > 5000 || r2 > 5000 || r3 > 5000) {\n        printf("DANGER: get out\\n");\n    } else if (r1 >= 2000 && r2 >= 2000 && r3 >= 2000) {\n        printf("ALARM: open the vents\\n");\n    } else {\n        printf("Quiet: spike ignored\\n");\n    }\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int r1, r2, r3;\n    if (scanf("%d %d %d", &r1, &r2, &r3) != 3) {\n        printf("Bad input\\n");\n        return 1;\n    }\n    if (r1 > 5000 || r2 > 5000 || r3 > 5000) {\n        printf("DANGER: get out\\n");\n    } else if (r1 > 2000 && r2 > 2000 && r3 > 2000) {\n        printf("ALARM: open the vents\\n");\n    } else {\n        printf("Quiet: spike ignored\\n");\n    }\n    return 0;\n}\n',
        hint: 'Someone used >= in the alarm line. The rule says OVER 2000.',
        stdin: ['2000 2500 2500'],
        checks: [
          { message: 'Print Quiet: spike ignored for the edge case', outputIncludes: 'Quiet: spike ignored' },
          { message: 'Use > 2000, not >=', codeIncludes: 'r1 > 2000' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'The old alarm reacted to every spike, so the crew stopped trusting it. When has a warning lost your trust by going off too often?',
    starters: ['A warning I stopped trusting was...', 'It would have helped if...'],
  },
  deepen: {
    title: 'Alarm fatigue',
    summary: 'Hospitals call it "alarm fatigue": when monitors sound too often, staff start to tune them out. Designing alarms that only fire when it matters is a real engineering field.',
  },
  notes: 'Unit Challenge for Chapter 3 (lessons 1-19). Alarm fatigue: recognised patient-safety issue (e.g. The Joint Commission Sentinel Event Alert 50, 2013). Station rules are fictional.',
};

export default lesson;
