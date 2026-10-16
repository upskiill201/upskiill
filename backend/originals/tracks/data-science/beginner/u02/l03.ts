import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Story: the eight deliveries saved twice. duplicated(), drop_duplicates(). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Saved twice',
  summary: '4 weeks to Kamau. Eight deliveries were saved twice by a system hiccup. In a spreadsheet you\'d sort and squint. In pandas, one line finds them, and one more removes them, leaving the raw file untouched.',
  minutes: 11,
  outcomes: [
    'Count duplicate rows with duplicated().sum()',
    'Remove them with drop_duplicates()',
    'Clean a copy, never the raw data',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'A duplicate is a row that\'s exactly the same as an earlier one, every column. raw.duplicated() marks each row True if it\'s a repeat.', replies: ['And to count them?'] },
        { tey: 'Add .sum(): True counts as 1, False as 0. raw.duplicated().sum() gives 8, the extra eight rows.', replies: ['How do I get rid of them?'] },
        { tey: 'df = raw.drop_duplicates(). It keeps the first copy of each row and makes a new table. raw stays exactly as it was: 408 rows of evidence.', replies: ['Why keep raw at all?'] },
        { tey: 'So you can always check your work, and show it. If someone asks "how did 408 become 400?", the answer is one line of code.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Find and remove the duplicates',
      code: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\nprint(raw.duplicated().sum())\n\ndf = raw.drop_duplicates()\nprint(len(raw), len(df))\n',
      caption: 'Press Run. 8 duplicates. raw still has 408 rows; df has 400.',
      challenge: 'Print raw[raw.duplicated()]["delivery_id"] to see which deliveries were saved twice.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Each delivery has its own delivery_id, so you can also check for repeated IDs: raw["delivery_id"].duplicated().sum(). Here it\'s 8 too.',
    },
  ],
  apply: {
    scenario: 'Removing the double saves.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Count the duplicate rows in raw.',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\nprint(raw.duplicated().sum())\n',
        hint: 'print(raw.duplicated().sum())',
        checks: [
          { message: 'Print 8', outputEquals: '8' },
          { message: 'Use duplicated()', codeIncludes: 'duplicated()' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What counts as a duplicate row in pandas, by default?',
        options: [
          { text: 'Any two deliveries on the same day', why: 'Many different deliveries share a day.' },
          { text: 'Two deliveries by the same driver', why: 'Drivers do many deliveries.' },
          { text: 'A row identical to an earlier one in every column' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make df by dropping duplicates from raw, then print len(df).',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\nprint(len(df))\n',
        hint: 'df = raw.drop_duplicates(), then print(len(df)).',
        checks: [
          { message: 'Print 400', outputEquals: '400' },
          { message: 'Keep raw untouched', expr: 'len(raw) == 408' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Remove the repeats into a new table.',
        template: 'df = raw.[[1]]()',
        blanks: [['drop_duplicates']],
        distractors: ['duplicated', 'remove_duplicates'],
        language: 'python',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which variable has how many rows?',
        groups: ['408 rows', '400 rows'],
        items: [
          { text: 'raw', group: 0 },
          { text: 'raw.drop_duplicates()', group: 1 },
          { text: 'pd.read_csv("deliveries.csv")', group: 0 },
          { text: 'pd.read_csv("deliveries_clean.csv")', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line loses the evidence?',
        lines: ['raw = pd.read_csv("deliveries.csv")', 'raw = raw.drop_duplicates()', 'print(len(raw))'],
        bug: 1,
        fix: 'df = raw.drop_duplicates()',
        explanation: 'Saving the result back into raw overwrites the original. Put the cleaned table in a new variable.',
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Could two different deliveries look exactly the same? Then you\'d delete a real one.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Impossible.', why: 'It can happen in some data. Here the delivery_id settles it.' },
          { text: 'Then I\'ll keep the duplicates.', why: 'They\'d count 8 deliveries twice.' },
          { text: 'Good question. Every delivery has its own ID, and the repeats have the same ID too, so they really are double saves.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Count repeated delivery IDs: raw["delivery_id"].duplicated().sum().',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\nprint(raw["delivery_id"].duplicated().sum())\n',
        hint: 'Pick the delivery_id column first, then .duplicated().sum().',
        checks: [
          { message: 'Print 8', outputEquals: '8' },
          { message: 'Check the delivery_id column', codeIncludes: 'delivery_id' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(True + True + False)',
        language: 'python',
        options: [
          { text: 'True', why: 'In maths, True is 1 and False is 0.' },
          { text: '2' },
          { text: 'An error', why: 'Python happily adds True and False.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: count the duplicates.',
        tiles: ['raw', '.duplicated()', '.sum()'],
        distractors: ['.drop()'],
        language: 'python',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever counted something twice by accident (money, people, items)? How did you find out?',
    starters: ['I once counted...', 'I noticed because...'],
  },
  deepen: {
    title: 'Which ones?',
    summary: 'In the Try it card, print raw[raw.duplicated()] to see the 8 repeated rows. Do they have anything in common?',
  },
  notes: 'deliveries.csv: 8 duplicate rows (D1091, D1026, D1144, D1249, D1297, D1189, D1347, D1371), also 8 repeated delivery_ids. drop_duplicates keeps the first occurrence by default (pandas docs). Booleans sum as integers in Python and pandas.',
};

export default lesson;
