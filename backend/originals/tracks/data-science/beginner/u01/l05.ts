import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint. Reviews lessons 1–4: print, maths, variables, lists, read_csv. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: 400 rows',
  summary: '5 weeks to Kamau. Wednesday. Zanele shows Remi her first program: it loads the file, counts the rows and checks Kamau\'s number. Remi reads it twice. "I can actually follow this." Quick check before the columns.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use print, variables and lists without notes', 'Load a CSV with pandas and check its size'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 4:10 p.m.',
      beats: [
        { speaker: 'zanele', text: 'Three days ago I didn\'t know what print meant. Now I have a program. It\'s basically a paradigm shift.' },
        { speaker: 'remi', text: 'That one\'s actually right. Can I see?' },
        { speaker: 'narrator', text: 'Six lines. It loads the file, prints (400, 13), divides 135 by 400 and prints 0.3375. Remi reads it twice and says, "I can actually follow this."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Zanele\'s first program.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'late = 135\ntotal = 400\nprint(total - late)',
        language: 'python',
        options: [
          { text: 'total - late', why: 'No quotes: Python does the maths.' },
          { text: '135', why: 'That\'s late on its own.' },
          { text: '265' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Load deliveries_clean.csv and print how many rows it has with len(df).',
        starter: 'import pandas as pd\n\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(len(df))\n',
        hint: 'len() counts rows in a DataFrame, just like items in a list.',
        checks: [
          { message: 'Print 400', outputIncludes: '400' },
          { message: 'Use len()', codeIncludes: 'len(' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line will fail?',
        lines: ['import pandas as pd', 'df = pd.read_csv("deliveries_clean.csv")', 'print(df.Head())'],
        bug: 2,
        fix: 'print(df.head())',
        explanation: 'Case matters: head, not Head.',
        language: 'python',
      },
      {
        kind: 'fillBlank',
        prompt: 'Store the late count, then print it.',
        template: 'late [[1]] 135\n[[2]](late)',
        blanks: [['='], ['print']],
        distractors: ['==', 'show'],
        language: 'python',
      },
      {
        kind: 'sortGroups',
        prompt: 'String, number or list?',
        groups: ['String', 'Number', 'List'],
        items: [
          { text: '"deliveries_clean.csv"', group: 0 },
          { text: '0.3375', group: 1 },
          { text: '["Mon", "Tue", "Wed"]', group: 2 },
          { text: '13', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the late percentage, rounded to a whole number: round(late / total * 100).',
        starter: 'late = 135\ntotal = 400\n',
        solution: 'late = 135\ntotal = 400\nprint(round(late / total * 100))\n',
        hint: 'print(round(late / total * 100))',
        checks: [
          { message: 'Print 34', outputIncludes: '34' },
          { message: 'Use round()', codeIncludes: 'round(' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to its result.',
        pairs: [
          ['df.shape', '(400, 13)'],
          ['len(["Mon", "Tue"])', '2'],
          ['135 / 400', '0.3375'],
          ['round(33.75)', '34'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should come before opening any data?',
        options: [
          { text: 'A clear question' },
          { text: 'A chart', why: 'Charts come much later.' },
          { text: 'A theory about who to blame', why: 'That\'s how Emeka started.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the program in order.',
        lines: ['import pandas as pd', 'df = pd.read_csv("deliveries_clean.csv")', 'print(df.shape)'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Make a list of the six days in the data ("Mon" to "Sat") called days, and print the first one.',
        starter: 'days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]\n',
        solution: 'days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]\nprint(days[0])\n',
        hint: 'The first item is at position 0.',
        checks: [
          { message: 'Print Mon', outputIncludes: 'Mon' },
          { message: 'Pick it with [0]', codeIncludes: '[0]' },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that loads the file.',
        tiles: ['df', '=', 'pd.read_csv(', '"deliveries_clean.csv"', ')'],
        distractors: ['pd.open('],
        language: 'python',
      },
      {
        kind: 'typeAnswer',
        prompt: 'drivers = ["Auma", "Juma", "Baraka"]. What does drivers[-1] give?',
        answers: ['Baraka', '"Baraka"'],
        placeholder: 'A name',
      },
    ],
  },
  reflect: {
    prompt: 'Which part of this week felt hardest: the code, or deciding the question? Why?',
    starters: ['The hardest part was...', 'It clicked when...'],
  },
  notes: 'Checkpoint for lessons 1-4. Figures from deliveries_clean.csv (400 rows, 13 columns, 135 late).',
};

export default lesson;
