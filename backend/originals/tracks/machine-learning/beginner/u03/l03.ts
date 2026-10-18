import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3 — Finding the nearest one: loop over the notebook, keep the closest. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Finding the nearest one',
  summary: 'One distance is easy. Now Halima needs Kunle\'s distance to all twelve notebook patients, and the smallest one. That\'s a loop.',
  minutes: 12,
  outcomes: [
    'Store the notebook patients as a list of lists',
    'Loop over them and work out each distance',
    'Keep track of the nearest one',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The search',
      text: 'Each patient is a small list: ["Ireti", 18, 6, 0] means name, wait, km and missed (1) or came (0). The loop works out Kunle\'s distance to each patient. If d < best_d, this patient is the closest so far, so remember them. After the loop, best_name is Kunle\'s nearest neighbour: Ireti.',
      hotspots: [
        { phrase: '["Ireti", 18, 6, 0]', note: 'p[0] is the name, p[1] the wait, p[2] the km, p[3] the answer (1 = missed).' },
        { phrase: 'The loop works out Kunle\'s distance to each patient', note: 'for p in notebook: then the same formula as lesson 2, with p[1] and p[2].' },
        { phrase: 'If d < best_d, this patient is the closest so far', note: 'Start best_d at a huge number (1000) so the first patient always wins, then keep replacing it with anything closer.' },
        { phrase: 'Ireti', note: 'Distance 2.24: 18 days and 6 km, almost the same as Kunle\'s 19 days and 4 km.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Kunle\'s nearest neighbour',
      caption: 'Change the new patient\'s numbers and run it again.',
      code: 'notebook = [\n    ["Amina", 3, 2, 0], ["Tolu", 21, 9, 1], ["Musa", 5, 4, 0], ["Chioma", 30, 12, 1],\n    ["Bello", 2, 3, 0], ["Ireti", 18, 6, 0], ["Sani", 25, 15, 1], ["Kelechi", 7, 5, 0],\n    ["Hauwa", 16, 8, 1], ["Dapo", 4, 1, 0], ["Zainab", 20, 10, 0], ["Obi", 9, 14, 1],\n]\nnew_wait, new_km = 19, 4\n\nbest_name = ""\nbest_d = 1000\nfor p in notebook:\n    d = ((p[1] - new_wait) ** 2 + (p[2] - new_km) ** 2) ** 0.5\n    if d < best_d:\n        best_d = d\n        best_name = p[0]\n\nprint(best_name, round(best_d, 2))\n',
      challenge: 'Find Rita\'s nearest neighbour: 6 days, 16 km.',
    },
  ],
  apply: {
    scenario: 'Searching the notebook.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In ["Ireti", 18, 6, 0], what is p[3]?',
        options: [
          { text: '0: Ireti came' },
          { text: '6: her distance', why: 'That\'s p[2]. Positions start at 0.' },
          { text: '"Ireti"', why: 'That\'s p[0].' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Finish the loop so it prints the name of Kunle\'s nearest neighbour',
        starter: 'notebook = [\n    ["Amina", 3, 2, 0], ["Tolu", 21, 9, 1], ["Musa", 5, 4, 0], ["Chioma", 30, 12, 1],\n    ["Bello", 2, 3, 0], ["Ireti", 18, 6, 0], ["Sani", 25, 15, 1], ["Kelechi", 7, 5, 0],\n    ["Hauwa", 16, 8, 1], ["Dapo", 4, 1, 0], ["Zainab", 20, 10, 0], ["Obi", 9, 14, 1],\n]\nbest_name = ""\nbest_d = 1000\nfor p in notebook:\n    d = ((p[1] - 19) ** 2 + (p[2] - 4) ** 2) ** 0.5\n    # if d is smaller than best_d, remember d and the name\n',
        solution: 'notebook = [\n    ["Amina", 3, 2, 0], ["Tolu", 21, 9, 1], ["Musa", 5, 4, 0], ["Chioma", 30, 12, 1],\n    ["Bello", 2, 3, 0], ["Ireti", 18, 6, 0], ["Sani", 25, 15, 1], ["Kelechi", 7, 5, 0],\n    ["Hauwa", 16, 8, 1], ["Dapo", 4, 1, 0], ["Zainab", 20, 10, 0], ["Obi", 9, 14, 1],\n]\nbest_name = ""\nbest_d = 1000\nfor p in notebook:\n    d = ((p[1] - 19) ** 2 + (p[2] - 4) ** 2) ** 0.5\n    if d < best_d:\n        best_d = d\n        best_name = p[0]\nprint(best_name)\n',
        hint: 'if d < best_d: then best_d = d and best_name = p[0]. Print after the loop.',
        checks: [
          { message: 'Print Ireti', outputEquals: 'Ireti' },
          { message: 'Keep the smallest distance', expr: 'round(best_d, 2) == 2.24' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Same search for Rita (6 days, 16 km). Print her nearest neighbour\'s name',
        starter: 'notebook = [\n    ["Amina", 3, 2, 0], ["Tolu", 21, 9, 1], ["Musa", 5, 4, 0], ["Chioma", 30, 12, 1],\n    ["Bello", 2, 3, 0], ["Ireti", 18, 6, 0], ["Sani", 25, 15, 1], ["Kelechi", 7, 5, 0],\n    ["Hauwa", 16, 8, 1], ["Dapo", 4, 1, 0], ["Zainab", 20, 10, 0], ["Obi", 9, 14, 1],\n]\nbest_name = ""\nbest_d = 1000\n',
        solution: 'notebook = [\n    ["Amina", 3, 2, 0], ["Tolu", 21, 9, 1], ["Musa", 5, 4, 0], ["Chioma", 30, 12, 1],\n    ["Bello", 2, 3, 0], ["Ireti", 18, 6, 0], ["Sani", 25, 15, 1], ["Kelechi", 7, 5, 0],\n    ["Hauwa", 16, 8, 1], ["Dapo", 4, 1, 0], ["Zainab", 20, 10, 0], ["Obi", 9, 14, 1],\n]\nbest_name = ""\nbest_d = 1000\nfor p in notebook:\n    d = ((p[1] - 6) ** 2 + (p[2] - 16) ** 2) ** 0.5\n    if d < best_d:\n        best_d = d\n        best_name = p[0]\nprint(best_name)\n',
        hint: 'The same loop, with 6 and 16 in the formula',
        checks: [{ message: 'Print Obi', outputEquals: 'Obi' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the search.',
        language: 'python',
        lines: ['best_d = 1000', 'for p in notebook:', '    d = ((p[1] - 19) ** 2 + (p[2] - 4) ** 2) ** 0.5', '    if d < best_d:', '        best_d = d', '        best_name = p[0]'],
      },
      {
        kind: 'mcq',
        prompt: 'Why start best_d at 1000?',
        options: [
          { text: 'So the first real distance is smaller and replaces it' },
          { text: 'Because the nearest patient is 1000 km away', why: 'It\'s just a starting value bigger than any real distance.' },
          { text: 'Python needs it to be 1000', why: 'Any number bigger than every real distance works.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'This always prints the LAST patient, Obi. Which line?',
        language: 'python',
        lines: ['for p in notebook:', '    d = ((p[1] - 19) ** 2 + (p[2] - 4) ** 2) ** 0.5', '    if d > best_d:', '        best_d = d', '        best_name = p[0]'],
        bug: 2,
        fix: '    if d < best_d:',
        explanation: 'With >, it keeps the FARTHEST patient so far. Nearest means smaller.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the new patient to their nearest notebook neighbour.',
        pairs: [
          ['Kunle (19 days, 4 km)', 'Ireti'],
          ['Rita (6 days, 16 km)', 'Obi'],
          ['Yemi (11 days, 7 km)', 'Kelechi'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Remember the closest so far.',
        language: 'python',
        template: 'if d [[1]] best_d:\n    best_d = d\n    best_name = p[[[2]]]',
        blanks: [['<'], ['0']],
        distractors: ['>', '3'],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Twelve patients is fine. Will this work with 2,400?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, same loop, just more distances to check. It gets slower, and lesson 14 shows how to speed it up.' },
          { text: 'No, loops only work up to 12.', why: 'Loops work for any length of list.' },
          { text: 'It becomes instant.', why: 'More patients means more distances to work out.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who is Kunle\'s nearest neighbour in the notebook?',
        answers: ['Ireti'],
        placeholder: 'A name',
      },
    ],
  },
  reflect: {
    prompt: 'The loop keeps "the best so far" and replaces it when something better turns up. Where do you do that in real life (prices, routes, queues)?',
    starters: ['I keep the best... so far', 'I replace it when...'],
  },
  deepen: {
    title: 'Sorting instead',
    summary: 'Another way: work out every distance, put them in a list, and sort it. The first item is the nearest. Sorting makes it easy to take the nearest 3 or 5, which you\'ll need soon.',
  },
  notes: 'Notebook patients as [name, wait, km, missed]. Nearest (2 features, unscaled): Kunle -> Ireti (2.24), Rita -> Obi (3.61), Sade -> Ireti (5.0), Yemi -> Kelechi (4.47).',
};

export default lesson;
