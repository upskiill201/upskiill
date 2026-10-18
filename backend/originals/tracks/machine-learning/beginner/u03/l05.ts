import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: the neighbour idea, distance, search, prediction. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: one neighbour',
  summary: 'Halima can measure how similar two patients are, find the closest one, and copy their answer. It gets just one of the four new patients right. Quick check before asking more neighbours.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Work out distances and find the nearest without notes', 'Predict from one neighbour'],
  learn: [
    {
      kind: 'story',
      title: '1 out of 4',
      beats: [
        { speaker: 'narrator', text: 'One neighbour each: Kunle wrong, Rita wrong, Sade right, Yemi wrong. One out of four.' },
        { speaker: 'miracle', text: 'Worse than your sticky note. Don\'t worry: one neighbour is the weakest version. Watch what happens with three.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: nearest neighbour.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the distance between Sade (22 days, 3 km) and Ireti (18 days, 6 km), rounded to 2 places',
        starter: 'sade_wait, sade_km = 22, 3\nireti_wait, ireti_km = 18, 6\n',
        solution: 'sade_wait, sade_km = 22, 3\nireti_wait, ireti_km = 18, 6\nd = ((sade_wait - ireti_wait) ** 2 + (sade_km - ireti_km) ** 2) ** 0.5\nprint(round(d, 2))\n',
        hint: 'Gaps 4 and 3: square, add, square root',
        checks: [{ message: 'Print 5.0', outputEquals: '5.0' }],
      },
      {
        kind: 'mcq',
        prompt: 'Distances from Yemi: Kelechi 4.47, Hauwa 5.1, Musa 6.71. Who is the nearest neighbour?',
        options: [
          { text: 'Kelechi' },
          { text: 'Musa', why: 'Musa is the farthest of the three.' },
          { text: 'Hauwa', why: 'Kelechi is closer (4.47 < 5.1).' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Find Yemi\'s nearest neighbour (11 days, 7 km) and print the prediction from their answer',
        starter: 'notebook = [\n    ["Amina", 3, 2, 0], ["Tolu", 21, 9, 1], ["Musa", 5, 4, 0], ["Chioma", 30, 12, 1],\n    ["Bello", 2, 3, 0], ["Ireti", 18, 6, 0], ["Sani", 25, 15, 1], ["Kelechi", 7, 5, 0],\n    ["Hauwa", 16, 8, 1], ["Dapo", 4, 1, 0], ["Zainab", 20, 10, 0], ["Obi", 9, 14, 1],\n]\nbest_d = 1000\nbest = None\n',
        solution: 'notebook = [\n    ["Amina", 3, 2, 0], ["Tolu", 21, 9, 1], ["Musa", 5, 4, 0], ["Chioma", 30, 12, 1],\n    ["Bello", 2, 3, 0], ["Ireti", 18, 6, 0], ["Sani", 25, 15, 1], ["Kelechi", 7, 5, 0],\n    ["Hauwa", 16, 8, 1], ["Dapo", 4, 1, 0], ["Zainab", 20, 10, 0], ["Obi", 9, 14, 1],\n]\nbest_d = 1000\nbest = None\nfor p in notebook:\n    d = ((p[1] - 11) ** 2 + (p[2] - 7) ** 2) ** 0.5\n    if d < best_d:\n        best_d = d\n        best = p\nif best[3] == 1:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
        hint: 'Keep the whole patient (best = p), then check best[3]',
        checks: [
          { message: 'Print Likely to come', outputEquals: 'Likely to come' },
          { message: 'Find Kelechi', expr: 'best[0] == "Kelechi"' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its meaning.',
        pairs: [
          ['p[0]', 'Name'],
          ['p[1]', 'Wait in days'],
          ['p[2]', 'Distance in km'],
          ['p[3]', 'Missed (1) or came (0)'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks the distance?',
        language: 'python',
        lines: ['gap_wait = 22 - 18', 'gap_km = 3 - 6', 'd = (gap_wait ** 2 + gap_km ** 2) ** 2', 'print(d)'],
        bug: 2,
        fix: 'd = (gap_wait ** 2 + gap_km ** 2) ** 0.5',
        explanation: 'The last step is the square root: ** 0.5.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Nearest-neighbour fact or myth?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'It stores the examples and compares later', group: 0 },
          { text: 'The nearest neighbour is always right', group: 1 },
          { text: 'A smaller distance means more similar', group: 0 },
          { text: 'It needs hand-written rules', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: '1 out of 4? Your sticky note got 3. Why bother?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'One neighbour is the weakest version. With several neighbours and more features, it can catch patterns my note can\'t.' },
          { text: 'You\'re right, give up.', why: 'This is the first step, not the last.' },
          { text: 'Four patients prove it\'s better.', why: 'Four patients prove nothing either way.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The search loop.',
        language: 'python',
        template: '[[1]] p in notebook:\n    d = ((p[1] - 11) ** 2 + (p[2] - 7) ** 2) ** [[2]]',
        blanks: [['for'], ['0.5']],
        distractors: ['if', '2'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(round(((21 - 3) ** 2 + (9 - 2) ** 2) ** 0.5, 2))',
        language: 'python',
        options: [
          { text: '19.31' },
          { text: '25', why: '18 + 7 isn\'t how distance works.' },
          { text: '373', why: 'That\'s before the square root.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps of a 1-neighbour prediction.',
        lines: ['Work out the distance to every past patient', 'Find the smallest distance', 'Look up that patient\'s answer', 'Use it as the prediction'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of the 4 new patients did the 1-neighbour predictor get right?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'The first version of the predictor did worse than the sticky note. Is that a reason to stop, or normal for a first try? Why?',
    starters: ['I think it\'s...', 'Because first tries...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4. Sade (22, 3) to Ireti (18, 6): 5.0. Yemi nearest Kelechi (came). 1-NN: 1 of 4 right.',
};

export default lesson;
