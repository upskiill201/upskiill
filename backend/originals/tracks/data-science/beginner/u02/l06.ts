import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Story: 29 spellings of 10 cities. nunique(), str.strip(), str.title(). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Nairobi, NAIROBI, nairobi',
  summary: '4 weeks to Kamau. Zanele counts the cities and pandas says there are 29. Kenya\'s delivery routes have 10. Some depots type in capitals, some in lower case, and some leave a sneaky space at the end.',
  minutes: 11,
  outcomes: [
    'Count different values with nunique()',
    'Remove stray spaces with str.strip()',
    'Make capitals consistent with str.title()',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'What pandas sees',
      text: 'To a person, these are all the same city: Nairobi, NAIROBI, nairobi and "Nairobi " with a space at the end. To pandas, they are four different values, so value_counts() splits Nairobi into four rows and every count is wrong.',
      hotspots: [
        { phrase: 'NAIROBI', note: 'Capitals: one depot types with caps lock on. str.title() turns it into Nairobi.' },
        { phrase: 'nairobi', note: 'Lower case. str.title() fixes this too: first letter capital, the rest small.' },
        { phrase: 'with a space at the end', note: 'The sneakiest one: it prints exactly like "Nairobi". str.strip() removes spaces from both ends.' },
        { phrase: 'four different values', note: 'Computers compare text exactly, letter by letter, including spaces and capitals.' },
      ],
    },
    {
      kind: 'tryIt',
      title: '29 cities become 10',
      code: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\nprint(df["city"].nunique())\n\ndf["city"] = df["city"].str.strip().str.title()\nprint(df["city"].nunique())\nprint(df["city"].value_counts())\n',
      caption: 'Press Run. nunique() counts different values: 29 before, 10 after.',
      challenge: 'Try only .str.title() without .str.strip(). How many cities are left? (The spaces still split them.)',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '.str lets you use text tools on every value in a column at once. You can chain them: .str.strip().str.title() does both, left to right.',
    },
  ],
  apply: {
    scenario: 'Fixing city names.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'After dropping duplicates, print how many different city values there are with nunique().',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\nprint(df["city"].nunique())\n',
        hint: 'print(df["city"].nunique())',
        checks: [
          { message: 'Print 29', outputEquals: '29' },
          { message: 'Use nunique()', codeIncludes: 'nunique()' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does pandas think "Nairobi" and "Nairobi " are different?',
        options: [
          { text: 'It\'s a bug in pandas', why: 'It\'s doing exactly what it should.' },
          { text: 'One is a number', why: 'Both are text.' },
          { text: 'It compares text exactly, including the space' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the text tool to what it does.',
        pairs: [
          ['.str.strip()', 'Removes spaces at both ends'],
          ['.str.title()', 'Capital first letter, rest small'],
          ['.str.upper()', 'ALL CAPITALS'],
          ['.str.lower()', 'all small letters'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the city column with .str.strip().str.title(), then print nunique() again.',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf["city"] = df["city"].str.strip().str.title()\nprint(df["city"].nunique())\n',
        hint: 'df["city"] = df["city"].str.strip().str.title()',
        checks: [
          { message: 'Print 10', outputEquals: '10' },
          { message: 'Use str.strip()', codeIncludes: 'strip()' },
          { message: 'Use str.title()', codeIncludes: 'title()' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'What does .str.strip().str.title() turn it into?',
        groups: ['Nairobi', 'Kisumu'],
        items: [
          { text: 'NAIROBI', group: 0 },
          { text: 'kisumu', group: 1 },
          { text: '"Nairobi "', group: 0 },
          { text: 'KISUMU', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Clean the city names.',
        template: 'df["city"] = df["city"].str.[[1]]().str.[[2]]()',
        blanks: [['strip'], ['title']],
        distractors: ['trim', 'capital'],
        language: 'python',
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t fix "Nairobi " (with a space)?',
        lines: ['df["city"] = df["city"].str.title()', 'df["city"] = df["city"].str.strip().str.title()', 'df["city"] = df["city"].str.strip()'],
        bug: 0,
        explanation: 'title() changes capitals but leaves the space. Only strip() removes it.',
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: '(unmuting) Some of the depot staff type with caps lock on. Always have. Is that bad?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Not a problem now, I fix it in one line. A drop-down list in the system would stop it happening at all.' },
          { text: 'Very bad. Tell them to stop.', why: 'It\'s easy to fix in code. A gentle note for the future is fine.' },
          { text: 'I hadn\'t noticed.', why: 'She has: it\'s why there are 29 cities.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: count the different drivers.',
        tiles: ['df["driver"]', '.nunique()'],
        distractors: ['.unique_count()', '.len()'],
        language: 'python',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many different city values were there before cleaning (after removing duplicates)?',
        answers: ['29'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Where have you seen the same thing written different ways (names, phone numbers, dates)? What problems did it cause?',
    starters: ['I\'ve seen...', 'It caused...'],
  },
  deepen: {
    title: 'Fix it at the source',
    summary: 'Cleaning in code fixes this file. A drop-down list in the entry system fixes every future file. Where could a drop-down save you cleaning?',
  },
  notes: 'deliveries.csv (after drop_duplicates): city has 29 distinct values; .str.strip().str.title() leaves 10. Only title(): 17; only strip(): 22. Variants made by __teyro_make_messy every 13th row from index 3 (lower, upper, trailing space). pandas str accessor (pandas docs, Working with text data).',
};

export default lesson;
