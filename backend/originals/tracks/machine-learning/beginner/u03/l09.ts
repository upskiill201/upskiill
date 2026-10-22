import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9 — When units fight: a reminder (0 or 1) is invisible next to days and km. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'When units fight',
  summary: 'Halima adds the reminder to the distance: 1 for a reminder, 0 for none. Nothing changes. Not one prediction. Tey shows her why: next to gaps of 10 or 20 days, a gap of 1 barely counts.',
  minutes: 12,
  outcomes: [
    'See how a feature with small numbers gets drowned out',
    'Give a feature more weight by multiplying it',
    'Know that distance depends on the units you use',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The invisible reminder',
      steps: [
        { title: '1. Add a third feature', body: 'Reminder: 1 = yes, 0 = no. Add its squared gap to the distance.', code: 'd = (gap_wait ** 2 + gap_km ** 2 + gap_rem ** 2) ** 0.5', language: 'python' },
        { title: '2. Yemi and Musa', body: 'Yemi: 11 days, 7 km, no reminder. Musa: 5 days, 4 km, reminder. Gaps: 6, 3 and 1.', code: 'print(round((6 ** 2 + 3 ** 2 + 1 ** 2) ** 0.5, 2))   # 6.78', language: 'python' },
        { title: '3. Barely moved', body: 'Without the reminder, they were 6.71 apart. With it, 6.78. A reminder gap of 1 is tiny next to 36 from the wait.' },
        { title: '4. Give it weight', body: 'Halima\'s judgement: a reminder matters about as much as 10 days of waiting. Multiply its gap by 10.', code: 'print(round((6 ** 2 + 3 ** 2 + (10 * 1) ** 2) ** 0.5, 2))   # 12.04', language: 'python' },
        { title: '5. The result', body: 'Now patients with a different reminder status are much further apart. With k = 3, Yemi\'s neighbours become Kelechi, Hauwa and Obi: 2 of 3 missed, so "likely to miss". Yemi missed. 4 of 4 right.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Weigh the reminder',
      caption: 'Try weights of 1, 10 and 30.',
      code: 'weight = 10\n# Yemi: 11 days, 7 km, no reminder (0). Musa: 5 days, 4 km, reminder (1).\nd = ((11 - 5) ** 2 + (7 - 4) ** 2 + (weight * (0 - 1)) ** 2) ** 0.5\nprint(round(d, 2))\n',
      challenge: 'What weight makes the reminder count as much as 20 days?',
    },
  ],
  apply: {
    scenario: 'Making every feature count.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the distance between Yemi and Musa with the reminder weighted by 10, rounded to 2 places',
        starter: 'gap_wait = 11 - 5\ngap_km = 7 - 4\ngap_rem = 0 - 1\nweight = 10\n',
        solution: 'gap_wait = 11 - 5\ngap_km = 7 - 4\ngap_rem = 0 - 1\nweight = 10\nd = (gap_wait ** 2 + gap_km ** 2 + (weight * gap_rem) ** 2) ** 0.5\nprint(round(d, 2))\n',
        hint: '(weight * gap_rem) ** 2 for the third part',
        checks: [{ message: 'Print 12.04', outputEquals: '12.04' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why did adding the reminder as 0 or 1 change nothing?',
        options: [
          { text: 'Reminders don\'t matter', why: 'They matter a lot (26% vs 12% no-shows). The distance just couldn\'t see it.' },
          { text: 'Python ignores 0s and 1s', why: 'It uses them; they\'re just small.' },
          { text: 'A gap of at most 1 is tiny next to gaps of many days or km' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Same patients, without any weight (weight = 1). Print the distance rounded to 2 places',
        starter: 'gap_wait = 11 - 5\ngap_km = 7 - 4\ngap_rem = 0 - 1\nweight = 1\n',
        solution: 'gap_wait = 11 - 5\ngap_km = 7 - 4\ngap_rem = 0 - 1\nweight = 1\nd = (gap_wait ** 2 + gap_km ** 2 + (weight * gap_rem) ** 2) ** 0.5\nprint(round(d, 2))\n',
        hint: 'Same formula, weight = 1',
        checks: [{ message: 'Print 6.78', outputEquals: '6.78' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Yemi to Musa. Match the version to the distance.',
        pairs: [
          ['Wait and km only', '6.71'],
          ['Plus reminder, weight 1', '6.78'],
          ['Plus reminder, weight 10', '12.04'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'In the full table, which features have big numbers and which have small?',
        groups: ['Big range (dozens)', 'Small range (0 to 4)'],
        items: [
          { text: 'wait_days (0 to 45)', group: 0 },
          { text: 'distance_km (1 to 60)', group: 0 },
          { text: 'previous_no_shows (0 to 4)', group: 1 },
          { text: 'sms_reminder (0 or 1)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'Choosing 10 felt like guessing. Is there a fairer way?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'No, always guess.', why: 'Scaling gives every feature a fair start.' },
          { text: 'Yes: scaling. Squash every feature into the same range, 0 to 1, so none drowns the others. That\'s lesson 11.' },
          { text: 'Delete the reminder feature.', why: 'It\'s one of the strongest clues. Make it count instead.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'A weighted reminder.',
        language: 'python',
        template: 'd = (gap_wait ** 2 + gap_km ** 2 + ([[1]] * gap_rem) ** [[2]]) ** 0.5',
        blanks: [['weight', '10'], ['2']],
        distractors: ['gap_km', '0.5'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Chidi\'s plan would drown the past no-shows?',
        lines: [
          'Use wait_days, distance_km and previous_no_shows.',
          'Leave them in their own units: days, km and counts.',
          'Find the nearest neighbours.',
          'Let them vote.',
        ],
        bug: 1,
        fix: 'Scale every feature to the same range first.',
        explanation: 'previous_no_shows runs 0 to 4; distance runs up to 60. Unscaled, distance drowns it.',
      },
      {
        kind: 'mcq',
        prompt: 'What changed when the reminder got a weight of 10?',
        options: [
          { text: 'Patients with a different reminder status moved far apart, so Yemi\'s neighbours changed' },
          { text: 'Nothing', why: 'Yemi\'s neighbours changed, and so did the prediction.' },
          { text: 'Every patient became the same', why: 'It separated patients by reminder status.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'With the weighted reminder and k = 3, how many of the 4 new patients are right?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Halima decided a reminder is "worth 10 days". Her nurse judgement went straight into the maths. Is that a strength or a risk?',
    starters: ['It\'s a strength because...', 'It\'s a risk because...'],
  },
  deepen: {
    title: 'Units matter',
    summary: 'Measure distance in metres instead of km and it becomes 1,000 times bigger, swamping everything else. With distance-based models, the units you pick change the answer. Scaling fixes that.',
  },
  notes: 'Yemi (11, 7, rem 0) vs Musa (5, 4, rem 1): 2 features sqrt(45) = 6.71; + reminder sqrt(46) = 6.78; weight 10 sqrt(145) = 12.04. Notebook reminders: Amina, Musa, Ireti, Dapo, Zainab = 1; others 0; Kunle 0, Rita 1, Sade 1, Yemi 0. Weighted (x10) 3-NN: 4/4; Yemi neighbours Kelechi, Hauwa, Obi.',
};

export default lesson;
