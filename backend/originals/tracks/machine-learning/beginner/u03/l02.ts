import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2 — Distance between two patients: the straight-line distance on two features. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Distance between two patients',
  summary: '"Similar" needs a number. Miracle draws two dots on a grid: wait days across, distance from home up. The closer the dots, the more similar the patients. Measuring that gap is school maths you already know.',
  minutes: 12,
  outcomes: [
    'Picture patients as points on a grid',
    'Work out the straight-line distance between two patients',
    'Write it in Python with ** 0.5',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From two patients to one number',
      steps: [
        { title: '1. Two features, two directions', body: 'Tolu: waited 21 days, lives 9 km away. Amina: 3 days, 2 km. Each patient is a point.' },
        { title: '2. The gaps', body: 'Wait gap: 21 - 3 = 18. Distance gap: 9 - 2 = 7.', code: 'gap_wait = 21 - 3   # 18\ngap_km = 9 - 2      # 7', language: 'python' },
        { title: '3. Square, add, square root', body: 'The straight line between them (Pythagoras): square each gap, add, take the square root. ** 2 squares; ** 0.5 is the square root.', code: 'd = (gap_wait ** 2 + gap_km ** 2) ** 0.5\nprint(round(d, 2))   # 19.31', language: 'python' },
        { title: '4. Read it', body: '19.31 is big: Tolu and Amina are very different patients. Kunle and Ireti come out at 2.24: very similar.' },
        { title: '5. Why squares?', body: 'Squaring makes every gap positive, and a big gap in one feature counts for a lot. More features? Add more squared gaps before the square root.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'How far apart?',
      caption: 'Change the patients\' numbers.',
      code: 'tolu_wait, tolu_km = 21, 9\namina_wait, amina_km = 3, 2\n\nd = ((tolu_wait - amina_wait) ** 2 + (tolu_km - amina_km) ** 2) ** 0.5\nprint(round(d, 2))\n',
      challenge: 'Work out the distance between Kunle (19 days, 4 km) and Ireti (18, 6).',
    },
  ],
  apply: {
    scenario: 'Measuring "similar".',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the distance between Kunle (19 days, 4 km) and Ireti (18 days, 6 km), rounded to 2 places',
        starter: 'kunle_wait, kunle_km = 19, 4\nireti_wait, ireti_km = 18, 6\n',
        solution: 'kunle_wait, kunle_km = 19, 4\nireti_wait, ireti_km = 18, 6\nd = ((kunle_wait - ireti_wait) ** 2 + (kunle_km - ireti_km) ** 2) ** 0.5\nprint(round(d, 2))\n',
        hint: '((19 - 18) ** 2 + (4 - 6) ** 2) ** 0.5',
        checks: [
          { message: 'Print 2.24', outputEquals: '2.24' },
          { message: 'Use ** 0.5', codeIncludes: '** 0.5' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print((3 ** 2 + 4 ** 2) ** 0.5)',
        language: 'python',
        options: [
          { text: '7', why: 'It isn\'t 3 + 4. Square, add (25), then square root.' },
          { text: '25', why: 'That\'s before the square root.' },
          { text: '5.0' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Two distances: Kunle to Ireti 2.24, Kunle to Amina 16.12. Who is more similar to Kunle?',
        options: [
          { text: 'Amina', why: 'A bigger distance means LESS similar.' },
          { text: 'Ireti' },
          { text: 'Neither', why: 'The smaller distance is the more similar patient.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the distance between Rita (6 days, 16 km) and Obi (9 days, 14 km), rounded to 2 places',
        starter: 'rita_wait, rita_km = 6, 16\nobi_wait, obi_km = 9, 14\n',
        solution: 'rita_wait, rita_km = 6, 16\nobi_wait, obi_km = 9, 14\nd = ((rita_wait - obi_wait) ** 2 + (rita_km - obi_km) ** 2) ** 0.5\nprint(round(d, 2))\n',
        hint: 'Square both gaps, add, then ** 0.5',
        checks: [{ message: 'Print 3.61', outputEquals: '3.61' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps for the distance.',
        lines: ['Find the gap in each feature', 'Square each gap', 'Add the squares', 'Take the square root'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Python to the maths.',
        pairs: [
          ['x ** 2', 'x squared'],
          ['x ** 0.5', 'Square root of x'],
          ['abs(x)', 'x without a minus sign'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This gives the wrong distance. Which line?',
        language: 'python',
        lines: ['gap_wait = 21 - 3', 'gap_km = 9 - 2', 'd = (gap_wait + gap_km) ** 0.5', 'print(d)'],
        bug: 2,
        fix: 'd = (gap_wait ** 2 + gap_km ** 2) ** 0.5',
        explanation: 'Square each gap before adding them.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The distance formula.',
        language: 'python',
        template: 'd = (gap_wait ** [[1]] + gap_km ** 2) ** [[2]]',
        blanks: [['2'], ['0.5']],
        distractors: ['3', '0.2'],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'Does the order matter? Tolu to Amina, or Amina to Tolu?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'No. The gaps are squared, so 21 - 3 and 3 - 21 give the same 324. The distance is the same both ways.' },
          { text: 'Yes, always start with the older patient.', why: 'Squaring removes the sign, so order doesn\'t matter.' },
          { text: 'Only for the first feature.', why: 'For every feature, the squared gap is the same either way.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is (6 ** 2 + 8 ** 2) ** 0.5?',
        answers: ['10', '10.0'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Squared gaps mean one big difference counts a lot. Is that how you judge if two people are "similar"? What would you weigh more heavily?',
    starters: ['I\'d weigh...', 'One big difference...'],
  },
  deepen: {
    title: 'Euclidean distance',
    summary: 'This straight-line distance is called Euclidean distance, after the Greek mathematician Euclid. It works the same way with 3, 4 or 50 features.',
  },
  notes: 'Euclidean distance. Tolu (21, 9) to Amina (3, 2): sqrt(18^2 + 7^2) = sqrt(373) = 19.31. Kunle (19, 4) to Ireti (18, 6): sqrt(1 + 4) = 2.24. Kunle to Amina: sqrt(256 + 4) = 16.12. Rita (6, 16) to Obi (9, 14): sqrt(9 + 4) = 3.61.',
};

export default lesson;
