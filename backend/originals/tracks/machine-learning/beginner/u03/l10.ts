import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: several neighbours, voting, choosing k, weights. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the vote',
  summary: 'Three neighbours, a vote, and a reminder that finally counts: 4 out of 4 on the new patients. Halima knows it\'s only four patients. Quick check before she tries it on the real data.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Sort, slice and vote without notes', 'Explain how k and weights change predictions'],
  learn: [
    {
      kind: 'story',
      title: 'Four out of four',
      beats: [
        { speaker: 'narrator', text: 'k = 3, reminder weighted by 10: Kunle, Rita, Sade and Yemi all predicted correctly.' },
        { speaker: 'miracle', text: 'Four out of four on four patients. Lovely, and it proves almost nothing. Time for 2,400 bookings.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: the neighbours vote.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'The 5 nearest answers are [1, 0, 1, 1, 0]. Print the prediction with a majority vote',
        starter: 'nearest = [1, 0, 1, 1, 0]\nk = 5\n',
        solution: 'nearest = [1, 0, 1, 1, 0]\nk = 5\nif sum(nearest) > k / 2:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
        hint: 'if sum(nearest) > k / 2:',
        checks: [{ message: 'Print Likely to miss', outputEquals: 'Likely to miss' }],
      },
      {
        kind: 'mcq',
        prompt: 'After dists.sort(), where are the nearest patients?',
        options: [
          { text: 'At the start: dists[:k]' },
          { text: 'At the end: dists[-k:]', why: 'The end holds the farthest.' },
          { text: 'In the middle', why: 'Sorting puts the smallest distances first.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Build and sort dists for Yemi (11 days, 7 km), then print the name of the nearest patient',
        starter: 'notebook = [\n    ["Amina", 3, 2, 0], ["Tolu", 21, 9, 1], ["Musa", 5, 4, 0], ["Chioma", 30, 12, 1],\n    ["Bello", 2, 3, 0], ["Ireti", 18, 6, 0], ["Sani", 25, 15, 1], ["Kelechi", 7, 5, 0],\n    ["Hauwa", 16, 8, 1], ["Dapo", 4, 1, 0], ["Zainab", 20, 10, 0], ["Obi", 9, 14, 1],\n]\ndists = []\n',
        solution: 'notebook = [\n    ["Amina", 3, 2, 0], ["Tolu", 21, 9, 1], ["Musa", 5, 4, 0], ["Chioma", 30, 12, 1],\n    ["Bello", 2, 3, 0], ["Ireti", 18, 6, 0], ["Sani", 25, 15, 1], ["Kelechi", 7, 5, 0],\n    ["Hauwa", 16, 8, 1], ["Dapo", 4, 1, 0], ["Zainab", 20, 10, 0], ["Obi", 9, 14, 1],\n]\ndists = []\nfor p in notebook:\n    d = ((p[1] - 11) ** 2 + (p[2] - 7) ** 2) ** 0.5\n    dists.append([d, p[0], p[3]])\ndists.sort()\nprint(dists[0][1])\n',
        hint: 'Loop, append [d, p[0], p[3]], sort, then dists[0][1]',
        checks: [{ message: 'Print Kelechi', outputEquals: 'Kelechi' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the setting to its score on the 4 new patients.',
        pairs: [
          ['k = 1', '1 of 4'],
          ['k = 3', '3 of 4'],
          ['k = 3, reminder x10', '4 of 4'],
          ['k = 12', '2 of 4'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'k = 3. Miss or come?',
        groups: ['Likely to miss', 'Likely to come'],
        items: [
          { text: '[1, 1, 0]', group: 0 },
          { text: '[0, 0, 1]', group: 1 },
          { text: '[1, 0, 1]', group: 0 },
          { text: '[0, 0, 0]', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The reminder still makes no difference. Which line?',
        language: 'python',
        lines: ['weight = 10', 'gap_rem = 0 - 1', 'd = (gap_wait ** 2 + gap_km ** 2 + gap_rem ** 2) ** 0.5'],
        bug: 2,
        fix: 'd = (gap_wait ** 2 + gap_km ** 2 + (weight * gap_rem) ** 2) ** 0.5',
        explanation: 'The weight was set but never used.',
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: '4 out of 4! Tell the board it\'s 100%.',
        prompt: "Halima's best reply?",
        options: [
          { text: 'It\'s 4 patients. One more could change everything. Next I test on hundreds of real bookings it hasn\'t seen.' },
          { text: 'Yes, 100%.', why: 'Four patients is far too few to claim anything.' },
          { text: 'Never mention it.', why: 'Mention it honestly: a promising start on 4 patients.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Take the nearest three.',
        language: 'python',
        template: 'for n in dists[[[1]]]:\n    votes = votes + n[[[2]]]',
        blanks: [[':3'], ['2']],
        distractors: ['-3:', '0'],
      },
      {
        kind: 'mcq',
        prompt: 'Why might the best k be bigger with 2,400 bookings than with 12?',
        options: [
          { text: 'With more patients, even the 15th nearest can still be very similar' },
          { text: 'k must always equal the number of patients', why: 'Then everyone gets the majority answer.' },
          { text: 'It can\'t be', why: 'More data usually supports a bigger k.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the k-NN steps.',
        lines: ['Work out every distance', 'Sort from nearest to farthest', 'Take the nearest k', 'Count how many missed', 'Predict miss if more than half did'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Why pick an odd k? One word: so the vote can\'t...',
        answers: ['tie'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Miracle calls 4 out of 4 "lovely, and it proves almost nothing". How many examples would YOU want before trusting a result?',
    starters: ['I\'d want at least...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 6-9. Yemi nearest (2 features): Kelechi 4.47. Notebook scores: k=1 1/4, k=3 3/4, weighted 4/4, k=12 2/4.',
};

export default lesson;
