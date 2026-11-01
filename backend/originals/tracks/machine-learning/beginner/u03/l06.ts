import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6 — One neighbour is fragile: Rita and Obi, and why asking three is safer. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'One neighbour is fragile',
  summary: 'Rita\'s nearest neighbour is Obi, the one patient in the notebook who missed for an unusual reason. So the predictor said Rita would miss. She came. Halima looks at Rita\'s next two neighbours and sees a different story.',
  minutes: 11,
  outcomes: [
    'Explain why one neighbour can mislead',
    'Compare one neighbour with three',
    'Count right predictions with a loop',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Rita: one neighbour vs three',
      before: {
        label: 'Ask 1 neighbour',
        text: 'Nearest: Obi (3.61 away), missed.\nPrediction: "likely to miss".\nRita came. Wrong.\nObi was the notebook\'s odd one out: a short wait, but he lives far away.',
      },
      after: {
        label: 'Ask 3 neighbours',
        text: 'Obi (3.61): missed.\nKelechi (11.05): came.\nMusa (12.04): came.\n1 of 3 missed, so "likely to come".\nRita came. Right.',
      },
      notes: [
        'One neighbour copies whatever that one patient did, odd reasons and all.',
        'Several neighbours vote, so one unusual patient gets outvoted.',
        'The idea is the same as asking three friends for directions instead of one.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Count the right ones',
      caption: 'Predictions (1 = miss) against what really happened, for Kunle, Rita, Sade and Yemi.',
      code: 'predicted = [0, 1, 0, 0]   # one neighbour each\nactual = [1, 0, 0, 1]\n\nright = 0\nfor i in range(4):\n    if predicted[i] == actual[i]:\n        right = right + 1\nprint(right, "of 4")\n',
      challenge: 'With three neighbours the predictions are [1, 0, 0, 0]. How many are right?',
    },
  ],
  apply: {
    scenario: 'One neighbour, or more?',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the one-neighbour predictor get Rita wrong?',
        options: [
          { text: 'The distance formula failed', why: 'Obi really was her most similar patient. He just wasn\'t typical.' },
          { text: 'Her single nearest neighbour, Obi, was unusual' },
          { text: 'Rita has no neighbours', why: 'She has twelve; the nearest happened to be the odd one.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Count how many three-neighbour predictions are right, and print the count',
        starter: 'predicted = [1, 0, 0, 0]\nactual = [1, 0, 0, 1]\nright = 0\n',
        solution: 'predicted = [1, 0, 0, 0]\nactual = [1, 0, 0, 1]\nright = 0\nfor i in range(4):\n    if predicted[i] == actual[i]:\n        right = right + 1\nprint(right)\n',
        hint: 'for i in range(4): compare predicted[i] with actual[i]',
        checks: [
          { message: 'Print 3', outputEquals: '3' },
          { message: 'Count in a loop', expr: 'right == 3' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Rita\'s 3 nearest neighbours: who missed and who came?',
        groups: ['Missed', 'Came'],
        items: [
          { text: 'Obi', group: 0 },
          { text: 'Kelechi', group: 1 },
          { text: 'Musa', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number of neighbours to the score on the 4 new patients.',
        pairs: [
          ['1 neighbour', '1 of 4'],
          ['3 neighbours', '3 of 4'],
          ['The sticky note (v0.1)', '3 of 4, too'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'right = 0\nfor i in range(3):\n    right = right + 1\nprint(right)',
        language: 'python',
        options: [
          { text: '2', why: 'range(3) is 0, 1, 2: three times round the loop.' },
          { text: '0', why: 'right grows every time round.' },
          { text: '3' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'If 3 is better than 1, isn\'t 12 better than 3?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Not necessarily. With all 12, everyone gets the same answer: whatever most of the notebook did. Lesson 8.' },
          { text: 'Yes, always ask everyone.', why: 'Then the prediction never changes from patient to patient.' },
          { text: 'No, 1 is always best.', why: 'One neighbour failed for Rita.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Count the matches.',
        language: 'python',
        template: 'for i in [[1]](4):\n    if predicted[i] [[2]] actual[i]:\n        right = right + 1',
        blanks: [['range'], ['==']],
        distractors: ['len', '='],
      },
      {
        kind: 'findBug',
        prompt: 'This prints 1 however many predictions are right. Which line?',
        language: 'python',
        lines: ['right = 0', 'for i in range(4):', '    if predicted[i] == actual[i]:', '        right = 0 + 1', 'print(right)'],
        bug: 3,
        fix: '        right = right + 1',
        explanation: 'right = 0 + 1 sets it to 1 every time. It should add to the running count.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is asking 3 neighbours like asking 3 friends for directions?',
        options: [
          { text: 'Friends always agree', why: 'They don\'t, which is why you take the majority.' },
          { text: 'It\'s three times faster', why: 'It\'s slower, but safer.' },
          { text: 'One person can be wrong; the majority is usually safer' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'With 3 neighbours, how many of the 4 new patients are predicted right?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Obi was the odd one out who misled the predictor. Is there an "Obi" in your experience: one memorable case that shaped what you expect of everyone?',
    starters: ['One case that stuck with me...', 'It made me expect...'],
  },
  deepen: {
    title: 'Noise',
    summary: 'Unusual examples like Obi are called noise: real, but not typical. Asking more neighbours smooths noise out. Asking too many smooths out the real patterns too.',
  },
  notes: 'Rita (6, 16) nearest: Obi 3.61 (missed), Kelechi 11.05 (came), Musa 12.04 (came). 1-NN predictions [0,1,0,0] vs actual [1,0,0,1]: 1 right. 3-NN [1,0,0,0]: 3 right.',
};

export default lesson;
