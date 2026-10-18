import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 2 — Indexes start at 0: get one member by position, from the front or the back. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Indexes start at 0',
  summary: 'The payout order is the order of the list: Ada first, then Tunde, then Bisi. To find who collects in a given month, Ada picks one item out by its position, the same way she picked letters from a name.',
  minutes: 11,
  outcomes: [
    'Get one item with list[index]',
    'Know that the first item is [0]',
    'Use [-1] for the last item',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Positions in the member list',
      steps: [
        {
          title: '1. The same rule as strings',
          body: 'Each item has a position, starting at 0. members[0] is the first member.',
          code: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]\nprint(members[0])  # Ada',
          language: 'python',
        },
        {
          title: '2. Any position',
          body: 'members[2] is the third member: Bisi.',
          code: 'print(members[2])  # Bisi',
          language: 'python',
        },
        {
          title: '3. From the end',
          body: 'members[-1] is the last member, members[-2] the one before. Handy when you don\'t know how long the list is.',
          code: 'print(members[-1])  # Kemi',
          language: 'python',
        },
        {
          title: '4. Use it in a sentence',
          body: 'An item works anywhere a value does, including inside an f-string.',
          code: 'print(f"First to collect: {members[0]}")',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Who collects?',
      caption: 'The payout order is the list order.',
      code: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf",\n           "Ifeoma", "Segun", "Amaka", "Dayo", "Tobi", "Chika"]\n\nprint(f"Month 1: {members[0]}")\nprint(f"Month 3: {members[2]}")\nprint(f"Last: {members[-1]}")\n',
      challenge: 'Who collects in month 6? (Careful: month 6 is position 5.)',
    },
  ],
  apply: {
    scenario: 'Who collects in each month?',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde", "Bisi"]\nprint(members[1])',
        language: 'python',
        options: [
          { text: 'Tunde' },
          { text: 'Ada', why: 'Ada is at 0. [1] is the second member.' },
          { text: 'Bisi', why: 'That\'s [2].' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the first member in the list',
        starter: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]\nprint(members[0])\n',
        hint: 'members[0]',
        checks: [
          { message: 'Print Ada', outputEquals: 'Ada' },
          { message: 'Use [0]', codeIncludes: '[0]' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]. Match the code to the member.',
        pairs: [
          ['members[0]', 'Ada'],
          ['members[1]', 'Tunde'],
          ['members[-1]', 'Kemi'],
          ['members[-2]', 'Bisi'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the last member with [-1]',
        starter: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi"]\nprint(members[-1])\n',
        hint: 'members[-1]',
        checks: [
          { message: 'Print Ngozi', outputEquals: 'Ngozi' },
          { message: 'Use [-1]', codeIncludes: '[-1]' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who collects in month 4, if month 1 is members[0]?',
        options: [
          { text: 'members[3]' },
          { text: 'members[4]', why: 'Month 4 is position 3, because positions start at 0.' },
          { text: 'members[-4]', why: 'That counts from the end.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Month 3: Bisi using the list and an f-string',
        starter: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]\nprint(f"Month 3: {members[2]}")\n',
        hint: 'Month 3 is members[2].',
        checks: [{ message: 'Print Month 3: Bisi', outputEquals: 'Month 3: Bisi' }],
      },
      {
        kind: 'fillBlank',
        prompt: 'The member who collects in month 1.',
        language: 'python',
        template: 'first = members[[[1]]]',
        blanks: [['0']],
        distractors: ['1', '-0'],
      },
      {
        kind: 'sortGroups',
        prompt: 'members has 4 items. Works, or IndexError?',
        groups: ['Works', 'IndexError'],
        items: [
          { text: 'members[3]', group: 0 },
          { text: 'members[4]', group: 1 },
          { text: 'members[-4]', group: 0 },
          { text: 'members[-5]', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Month 1 is [0], month 2 is [1]... I keep getting it off by one.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Everyone does at first. Write it down once: position = month - 1. Then use members[month - 1].' },
          { text: 'Start your list with an empty item.', why: 'That breaks len() and every count.' },
          { text: 'Python is wrong.', why: 'It\'s a convention, and a consistent one.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'members = ["Ada", "Tunde", "Bisi"]. What does print(members[-1]) show?',
        answers: ['Bisi'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Positions starting at 0 felt strange with letters. Does it feel more or less natural with a list of people? Why?',
    starters: ['With people it feels...', 'Because...'],
  },
  deepen: {
    title: 'month - 1',
    summary: 'members[month - 1] turns a human month number into a list position. You\'ll use it for "whose turn is it?" in lesson 16.',
  },
  notes: 'List indexing and negative indices (Python tutorial §3.1.3). Same rules as string indexing.',
};

export default lesson;
