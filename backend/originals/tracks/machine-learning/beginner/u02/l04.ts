import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4 — Looking at the data: head, shape, dtypes and describe before anything else. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Looking at the data',
  summary: 'Miracle\'s rule: "Look before you learn." Before any model, Halima takes a first look at the table: the first rows, its size, and what kind of values each column holds. One column is already wrong.',
  minutes: 11,
  outcomes: [
    'Look at the first rows with head()',
    'Get the size with shape',
    'Check column types with dtypes, and spot a column stored as text',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'df.head() shows the first 5 rows.',
          isFact: true,
          explain: 'Fact. df.head(3) shows 3. It\'s the quickest way to see what the table looks like.',
        },
        {
          text: 'df.shape tells you rows and columns: (2412, 14).',
          isFact: true,
          explain: 'Fact. No brackets after shape: it\'s a value, not a command. 2,412 rows, 14 columns.',
        },
        {
          text: 'If a column looks like numbers, pandas always stores it as numbers.',
          isFact: false,
          explain: 'Myth. If even one cell says "12 km", the whole column is stored as text (dtype "object"). You can\'t do maths on it until it\'s fixed.',
        },
        {
          text: 'df.describe() gives the mean, smallest and largest value of the number columns.',
          isFact: true,
          explain: 'Fact. It\'s a fast way to spot impossible values, like a 400-day wait.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'First look',
      caption: 'Look at the dtypes. Which column should be numbers but isn\'t?',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments_raw.csv")\nprint(df.shape)\nprint(df.head(3))\nprint(df.dtypes)\n',
      challenge: 'Add print(df.describe()). What is the biggest wait_days?',
    },
  ],
  apply: {
    scenario: 'Looking before learning.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Load appointments_raw.csv and print its shape',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\nprint(df.shape)\n',
        hint: 'print(df.shape) (no brackets after shape)',
        checks: [{ message: 'Print (2412, 14)', outputEquals: '(2412, 14)' }],
      },
      {
        kind: 'mcq',
        prompt: 'df.shape is (2412, 14). What do the numbers mean?',
        options: [
          { text: '2,412 rows and 14 columns' },
          { text: '2,412 columns and 14 rows', why: 'Rows come first.' },
          { text: '2,412 patients and 14 clinics', why: 'There are 8 clinics. 14 is the number of columns.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the dtype of the distance_km column in the raw file',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\nprint(df["distance_km"].dtype)\n',
        hint: 'print(df["distance_km"].dtype)',
        checks: [{ message: 'Print object', outputEquals: 'object' }],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the biggest wait_days in the raw file with .max()',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\nprint(df["wait_days"].max())\n',
        hint: 'print(df["wait_days"].max())',
        checks: [{ message: 'Print 400', outputEquals: '400' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the command to what it shows.',
        pairs: [
          ['df.head()', 'The first 5 rows'],
          ['df.shape', 'Rows and columns'],
          ['df.dtypes', 'Each column\'s type'],
          ['df.describe()', 'Mean, min and max of number columns'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'The biggest wait is 400 days. Is that real?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, trust the data.', why: 'Data can be wrong. 400 days is impossible for this booking system.' },
          { text: 'Over a year waiting for one appointment? Almost certainly a typo. Note it: we\'ll deal with it when we clean.' },
          { text: 'Delete the whole file.', why: 'One bad value needs fixing, not the whole file thrown away.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'This crashes with a TypeError. Which line?',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv("appointments_raw.csv")', 'print(df.shape())'],
        bug: 2,
        fix: 'print(df.shape)',
        explanation: 'shape is a value, not a command: no brackets.',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the raw file: stored as numbers, or as text?',
        groups: ['Numbers (int64)', 'Text (object)'],
        items: [
          { text: 'wait_days', group: 0 },
          { text: 'clinic', group: 1 },
          { text: 'distance_km (because of "12 km")', group: 1 },
          { text: 'no_show', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The first 3 rows.',
        language: 'python',
        template: 'print(df.[[1]]([[2]]))',
        blanks: [['head'], ['3']],
        distractors: ['top', 'first'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'pandas\' dtype name for a column stored as text. (one word)',
        answers: ['object'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: '"Look before you learn." What would have gone wrong if Halima had trained a model without noticing the 400-day wait?',
    starters: ['The model would...', 'Looking first...'],
  },
  deepen: {
    title: 'info()',
    summary: 'df.info() shows every column, its type and how many cells are filled in. It\'s the fastest way to spot blanks: you\'ll use it in lesson 11.',
  },
  notes: 'pandas head, shape, dtypes, describe. appointments_raw.csv: shape (2412, 14); distance_km dtype object (6 "N km" texts); wait_days max 400 (planted typo on appointment A11667).',
};

export default lesson;
