import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Unit Challenge. Friday: 393 clean rows, Felix's paper sheets, and which file to use from now on. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: 393 clean rows',
  summary: '4 weeks to Kamau. Friday. Zanele runs the whole cleaning script: 408 rows in, 393 out. Then Felix arrives with a box of paper sheets, and the seven rows she removed turn out to have real answers.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Clean a messy dataset from raw to ready, in code', 'Check your cleaning against another source'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 3:00 p.m.',
      beats: [
        { speaker: 'felix', text: '(dropping a box on her desk) The Nairobi depot\'s paper sheets. D1289 took 1 day, not 99. And the six blanks are all in here too.' },
        { speaker: 'zanele', text: 'So that\'s what your tidy file was. You fixed those seven from the paper, and removed the duplicates.' },
        { speaker: 'felix', text: 'And the spellings. I just never wrote any of it down.' },
        { speaker: 'zanele', text: 'Now it is written down. My 393 rows and your 400 agree: about 34% late either way. From Monday we use your file, because now I can prove every change in it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: raw to clean.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'From scratch: load deliveries.csv into raw, then clean it into df (duplicates, blanks, cities, distances, the 99). Print len(df).',
        starter: 'import pandas as pd\n\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\ndf["city"] = df["city"].str.strip().str.title()\ndf["distance_km"] = df["distance_km"].str.replace(" km", "").astype("int64")\ndf = df[df["actual_days"] < 20]\nprint(len(df))\n',
        hint: 'Five cleaning lines: drop_duplicates, dropna, city strip/title, distance replace/astype, filter < 20.',
        checks: [
          { message: 'Print 393', outputEquals: '393' },
          { message: 'Keep raw untouched', expr: 'len(raw) == 408' },
          { message: 'Fix the cities', expr: 'df["city"].nunique() == 10' },
          { message: 'Make distances numbers', expr: 'df["distance_km"].dtype.kind == "i"' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mess to the fix.',
        pairs: [
          ['Saved twice', 'drop_duplicates()'],
          ['No arrival recorded', 'dropna(subset=...)'],
          ['"NAIROBI", "Nairobi "', '.str.strip().str.title()'],
          ['"161 km"', '.str.replace(" km", "")'],
          ['99 days for 19 km', 'df[df["actual_days"] < 20]'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Zanele\'s 393 rows and Felix\'s 400 both give about 34% late. What does that tell her?',
        options: [
          { text: 'Cleaning was a waste of time', why: 'Now she knows the tidy file is trustworthy, and why.' },
          { text: 'Felix\'s fixes didn\'t bend the answer, and she can explain every one of them' },
          { text: 'Both are wrong', why: 'Two careful routes agreeing is good evidence.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Using the cleaned df, print the share of late deliveries with value_counts(normalize=True), rounded to 2 places.',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\ndf = df[df["actual_days"] < 20]\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\ndf = df[df["actual_days"] < 20]\nprint(df["late"].value_counts(normalize=True).round(2))\n',
        hint: 'print(df["late"].value_counts(normalize=True).round(2))',
        checks: [
          { message: 'Show yes 0.34', outputIncludes: 'yes 0.34' },
          { message: 'Use normalize=True', codeIncludes: 'normalize=True' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line has a mistake?',
        lines: [
          'df = raw.drop_duplicates()',
          'df = df.dropna(subset=["actual_days"])',
          'df["distance_km"] = df["distance_km"].astype("int64")',
          'df = df[df["actual_days"] < 20]',
        ],
        bug: 2,
        fix: 'df["distance_km"] = df["distance_km"].str.replace(" km", "").astype("int64")',
        explanation: 'The " km" has to come out before the column can become numbers.',
        language: 'python',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which problem did each health-check tool reveal?',
        groups: ['isna().sum()', 'dtypes', 'nunique()'],
        items: [
          { text: '6 blanks in actual_days', group: 0 },
          { text: 'distance_km is object', group: 1 },
          { text: '29 cities, not 10', group: 2 },
          { text: '6 blanks in late', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'So all that cleaning, and you\'re using my file anyway?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Sorry, I wasted a week.', why: 'She didn\'t: she can now defend the data to Kamau.' },
          { text: 'No, mine is better.', why: 'Felix\'s has 7 real values from paper that hers had to remove.' },
          { text: 'Yes, but now I can prove every change in it, and next month the script does it for us.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the week in order.',
        lines: ['Notice 408, not 400', 'Run the health check', 'Remove duplicates', 'Handle blanks', 'Fix text and types', 'Remove the impossible value', 'Check against another source'],
      },
      {
        kind: 'writeCode',
        prompt: 'Compare the two files: print the late count of deliveries_clean.csv with value_counts().',
        starter: 'import pandas as pd\n\n',
        solution: 'import pandas as pd\n\nclean = pd.read_csv("deliveries_clean.csv")\nprint(clean["late"].value_counts())\n',
        hint: 'Load deliveries_clean.csv into clean, then value_counts() on late.',
        checks: [
          { message: 'Show yes 135', outputIncludes: 'yes 135' },
          { message: 'Load deliveries_clean.csv', codeIncludes: 'deliveries_clean.csv' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule behind it all.',
        template: 'Never write on the [[1]]. Clean a [[2]], and log every change.',
        blanks: [['original', 'raw'], ['copy']],
        distractors: ['chart', 'answer'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("NAIROBI ".strip().title())',
        language: 'python',
        options: [
          { text: 'Nairobi' },
          { text: 'NAIROBI', why: 'title() makes it Nairobi.' },
          { text: '"Nairobi "', why: 'strip() removed the space.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many rows were left after Zanele\'s cleaning?',
        answers: ['393'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Felix knew how he\'d tidied the file but never wrote it down. What do you know how to do that nobody else could repeat if you left?',
    starters: ['Only I know how to...', 'I could write it down by...'],
  },
  deepen: {
    title: 'Next week: what\'s normal?',
    summary: 'Emeka has already sent a message: "Average delivery time is 2.7 days, I worked it out." Which file do you think he used?',
  },
  notes: 'Unit Challenge for Chapter 2. Full pipeline on deliveries.csv: 393 rows, 134 late (0.341, prints yes 0.34 at 2 dp). deliveries_clean.csv: 400 rows, 135 late (0.3375). Felix\'s tidy file = duplicates removed, cities fixed, distances fixed, 6 blanks and D1289 filled from paper (D1289 = 1 day). Teaser: raw-file mean actual_days 2.70 (Ch3 l01).',
};

export default lesson;
