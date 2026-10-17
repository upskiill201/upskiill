import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4: strings as sequences, len(), indexing, slicing. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: reading the references',
  summary: 'Ada can now pull the month and the name out of every bank reference. The names still come in shouting or whispering, but at least she can read them. Quick check before cleaning them up.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Count, index and slice strings without notes', 'Explain why similar-looking strings don\'t match'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, the references',
      beats: [
        { speaker: 'narrator', text: 'Ada runs her slicing code over March\'s references. Month: 03, every time. Names: "TUNDE", "bisi", "Kemi ".' },
        { speaker: 'ada', text: 'I can read them. Now I have to make them agree with each other.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: strings.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the length of the name, then its first letter, on two lines',
        starter: 'name = "Amaka"\n',
        solution: 'name = "Amaka"\nprint(len(name))\nprint(name[0])\n',
        hint: 'len(name), then name[0].',
        checks: [{ message: 'Print 5 then A', outputEquals: '5\nA' }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("Segun"[-1])',
        language: 'python',
        options: [
          { text: 'n' },
          { text: 'S', why: 'That\'s [0].' },
          { text: 'u', why: 'That\'s [-2].' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'True or False?',
        groups: ['True', 'False'],
        items: [
          { text: '"Kemi" == "Kemi"', group: 0 },
          { text: '"Kemi" == "Kemi "', group: 1 },
          { text: 'len("Kemi") == 4', group: 0 },
          { text: '"Kemi"[0] == "k"', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the year from the reference: 2026',
        starter: 'ref = "AJO-2026-04-KEMI"\n',
        solution: 'ref = "AJO-2026-04-KEMI"\nprint(ref[4:8])\n',
        hint: 'ref[4:8]',
        checks: [{ message: 'Print 2026', outputEquals: '2026' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'name = "Dayo". Match the code to the result.',
        pairs: [
          ['name[0]', 'D'],
          ['name[1:3]', 'ay'],
          ['len(name)', '4'],
          ['name[-1]', 'o'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is an IndexError?',
        language: 'python',
        lines: ['name = "Bisi"', 'print(name[3])', 'print(name[4])', 'print(name[0:10])'],
        bug: 2,
        fix: 'print(name[-1])',
        explanation: '"Bisi" has positions 0 to 3. A single index of 4 is out of range; the slice 0:10 is fine.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(len("Ada ") == len("Ada"))',
        language: 'python',
        options: [
          { text: 'True', why: '4 vs 3: the space counts.' },
          { text: 'False' },
          { text: '4', why: '== gives True or False.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The last four characters.',
        language: 'python',
        template: 'name = ref[[[1]]:]',
        blanks: [['-4']],
        distractors: ['4', '-5'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the initials of the two members: AT',
        starter: 'first = "Ada"\nsecond = "Tunde"\n',
        solution: 'first = "Ada"\nsecond = "Tunde"\nprint(first[0] + second[0])\n',
        hint: 'first[0] + second[0]',
        checks: [{ message: 'Print AT', outputEquals: 'AT' }],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Quick: why doesn\'t "Kemi " match "Kemi"?',
        prompt: "Ada's answer?",
        options: [
          { text: 'Python is case-sensitive.', why: 'True in general, but here both are spelt Kemi.' },
          { text: 'They do match.', why: '== says False.' },
          { text: 'The first has a trailing space, so it\'s 5 characters, not 4. len() shows it.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps to read a bank reference.',
        language: 'python',
        lines: ['ref = "AJO-2026-03-TUNDE"', 'year = ref[4:8]', 'month = ref[9:11]', 'name = ref[12:]', 'print(name, month, year)'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("Ngozi"[:2]) show?',
        answers: ['Ng'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Which of this week\'s ideas would be most useful in a spreadsheet you use, if your spreadsheet could do it?',
    starters: ['In my spreadsheet I\'d...', 'It would save...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1-4. "AJO-2026-04-KEMI"[4:8] = "2026"; "AJO-2026-03-TUNDE"[12:] = "TUNDE"; "Ngozi"[:2] = "Ng".',
};

export default lesson;
