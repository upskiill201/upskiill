import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7 — k neighbours and a vote: sort the distances, take the nearest k, count the misses. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'k neighbours and a vote',
  summary: 'Tey shows Halima how to ask several neighbours at once: work out every distance, sort them, take the nearest few, and let them vote. Kunle\'s three nearest get it right.',
  minutes: 12,
  outcomes: [
    'Build a list of [distance, name, answer] and sort it',
    'Take the nearest k with a slice',
    'Turn the vote into a prediction',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Instead of keeping only the best, keep them all. For every notebook patient, add [d, name, missed] to a list called dists.', replies: ['Then what?'] },
        { tey: 'dists.sort(). Python sorts lists of lists by their first item, which is the distance. Now the nearest patient is first.', replies: ['And the nearest 3?'] },
        { tey: 'A slice: dists[:3]. For Kunle: Ireti (2.24, came), Hauwa (5.0, missed), Tolu (5.39, missed).', replies: ['How do they vote?'] },
        { tey: 'Add up their answers: 0 + 1 + 1 = 2 misses out of 3. More than half missed, so predict "likely to miss". Kunle missed. Right this time.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Three neighbours vote',
      caption: 'Change k to 1, 3 or 5.',
      code: 'notebook = [\n    ["Amina", 3, 2, 0], ["Tolu", 21, 9, 1], ["Musa", 5, 4, 0], ["Chioma", 30, 12, 1],\n    ["Bello", 2, 3, 0], ["Ireti", 18, 6, 0], ["Sani", 25, 15, 1], ["Kelechi", 7, 5, 0],\n    ["Hauwa", 16, 8, 1], ["Dapo", 4, 1, 0], ["Zainab", 20, 10, 0], ["Obi", 9, 14, 1],\n]\nnew_wait, new_km = 19, 4\nk = 3\n\ndists = []\nfor p in notebook:\n    d = ((p[1] - new_wait) ** 2 + (p[2] - new_km) ** 2) ** 0.5\n    dists.append([d, p[0], p[3]])\ndists.sort()\n\nvotes = 0\nfor n in dists[:k]:\n    print(n[1], round(n[0], 2), n[2])\n    votes = votes + n[2]\n\nif votes > k / 2:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
      challenge: 'Try Yemi: 11 days, 7 km. What do the 3 neighbours say?',
    },
  ],
  apply: {
    scenario: 'Letting the neighbours vote.',
    items: [
      {
        kind: 'mcq',
        prompt: 'dists is a list of [distance, name, missed]. What does dists.sort() sort by?',
        options: [
          { text: 'The distance, because it comes first' },
          { text: 'The name', why: 'Lists are sorted by their first item: the distance.' },
          { text: 'Whether they missed', why: 'That\'s the last item.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Kunle\'s 3 nearest answers are given. Add up the votes and print the prediction',
        starter: 'nearest3 = [0, 1, 1]   # Ireti came, Hauwa and Tolu missed\nk = 3\n',
        solution: 'nearest3 = [0, 1, 1]   # Ireti came, Hauwa and Tolu missed\nk = 3\nvotes = sum(nearest3)\nif votes > k / 2:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
        hint: 'votes = sum(nearest3), then if votes > k / 2:',
        checks: [
          { message: 'Print Likely to miss', outputEquals: 'Likely to miss' },
          { message: 'Count the votes', expr: 'votes == 2' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Build dists for Kunle (19 days, 4 km), sort it, and print the name of the 3rd nearest patient',
        starter: 'notebook = [\n    ["Amina", 3, 2, 0], ["Tolu", 21, 9, 1], ["Musa", 5, 4, 0], ["Chioma", 30, 12, 1],\n    ["Bello", 2, 3, 0], ["Ireti", 18, 6, 0], ["Sani", 25, 15, 1], ["Kelechi", 7, 5, 0],\n    ["Hauwa", 16, 8, 1], ["Dapo", 4, 1, 0], ["Zainab", 20, 10, 0], ["Obi", 9, 14, 1],\n]\ndists = []\nfor p in notebook:\n    d = ((p[1] - 19) ** 2 + (p[2] - 4) ** 2) ** 0.5\n    dists.append([d, p[0], p[3]])\n',
        solution: 'notebook = [\n    ["Amina", 3, 2, 0], ["Tolu", 21, 9, 1], ["Musa", 5, 4, 0], ["Chioma", 30, 12, 1],\n    ["Bello", 2, 3, 0], ["Ireti", 18, 6, 0], ["Sani", 25, 15, 1], ["Kelechi", 7, 5, 0],\n    ["Hauwa", 16, 8, 1], ["Dapo", 4, 1, 0], ["Zainab", 20, 10, 0], ["Obi", 9, 14, 1],\n]\ndists = []\nfor p in notebook:\n    d = ((p[1] - 19) ** 2 + (p[2] - 4) ** 2) ** 0.5\n    dists.append([d, p[0], p[3]])\ndists.sort()\nprint(dists[2][1])\n',
        hint: 'dists.sort(), then dists[2] is the 3rd nearest and [1] is its name',
        checks: [{ message: 'Print Tolu', outputEquals: 'Tolu' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it does.',
        pairs: [
          ['dists.append([d, p[0], p[3]])', 'Remembers one patient\'s distance'],
          ['dists.sort()', 'Puts the nearest first'],
          ['dists[:3]', 'The nearest three'],
          ['votes > k / 2', 'More than half missed'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'k = 3. What does the vote predict?',
        groups: ['Likely to miss', 'Likely to come'],
        items: [
          { text: 'Answers [0, 1, 1]', group: 0 },
          { text: 'Answers [1, 0, 0]', group: 1 },
          { text: 'Answers [1, 1, 1]', group: 0 },
          { text: 'Answers [0, 0, 1]', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This takes the 3 FARTHEST patients. Which line?',
        language: 'python',
        lines: ['dists.sort()', 'votes = 0', 'for n in dists[-3:]:', '    votes = votes + n[2]'],
        bug: 2,
        fix: 'for n in dists[:3]:',
        explanation: 'After sorting, the nearest are at the start. [-3:] is the end: the farthest.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The nearest k.',
        language: 'python',
        template: 'dists.[[1]]()\nfor n in dists[[[2]]]:\n    votes = votes + n[2]',
        blanks: [['sort'], [':k', ':3']],
        distractors: ['reverse', '-k:'],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'With k = 3, what if the vote is a tie?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'With an odd k and two answers, a tie can\'t happen: 3 votes split 2 to 1 or 3 to 0. That\'s why people pick odd k.' },
          { text: 'Ties happen all the time with 3.', why: 'Three votes between two answers can\'t tie.' },
          { text: 'Ties mean the patient doesn\'t exist.', why: 'Ties only happen with even k. Odd k avoids them.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'votes = sum([1, 0, 1, 1, 0])\nk = 5\nprint(votes > k / 2)',
        language: 'python',
        options: [
          { text: 'True' },
          { text: 'False', why: '3 > 2.5 is True.' },
          { text: '3', why: 'It prints the comparison: True or False.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kunle\'s 3 nearest answers are [0, 1, 1]. How many missed?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'The neighbours vote and the majority wins. Is a majority vote always fair? When might the minority be right?',
    starters: ['A majority is fair when...', 'The minority could be right if...'],
  },
  deepen: {
    title: 'Weighted votes',
    summary: 'Some versions give closer neighbours a bigger vote. Ireti at 2.24 would count more than Tolu at 5.39. It\'s a small tweak libraries offer as an option.',
  },
  notes: 'Kunle 3-NN (2 features): Ireti 2.24 (0), Hauwa 5.0 (1), Tolu 5.39 (1): 2 of 3 missed -> "miss" (correct). Lists sort lexicographically by first element.',
};

export default lesson;
