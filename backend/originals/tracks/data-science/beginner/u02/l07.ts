import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Story: "161 km" turns a number column into text. str.replace(), astype("int64"). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '161 km',
  summary: '4 weeks to Kamau. Zanele asks for the average distance and pandas refuses. Five deliveries have "km" typed after the number, so the whole column is text. The fix: take out the " km", then tell pandas it\'s a number.',
  minutes: 11,
  outcomes: [
    'Find text hiding in a number column',
    'Remove it with str.replace()',
    'Change a column\'s type with astype()',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Before and after',
      before: {
        label: 'Text column (object)',
        text: 'Values like "15", "488" and "161 km". To pandas these are words. Ask for the mean and it fails with an error. Worse, max() quietly gives you the "biggest" word.',
      },
      after: {
        label: 'Number column (int64)',
        text: 'Values like 15, 488 and 161. Now mean(), max() and every comparison work: the longest trip is 495 km, the average is 164.6 km.',
      },
      notes: [
        'Step 1: .str.replace(" km", "") swaps every " km" for nothing.',
        'Step 2: .astype("int64") tells pandas the column holds whole numbers.',
        'If astype() fails, it tells you the value it couldn\'t convert. That\'s a gift: it points straight at the next problem.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Find and fix the "km"',
      code: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\nprint(df[df["distance_km"].str.contains("km")]["distance_km"])\n\ndf["distance_km"] = df["distance_km"].str.replace(" km", "").astype("int64")\nprint(df["distance_km"].dtype)\nprint(df["distance_km"].max())\n',
      caption: 'Press Run. First the five values with "km" in them, then the fixed column: int64, longest trip 495.',
      challenge: 'Remove .str.replace(" km", "") and run it. Read the error: which value couldn\'t be converted?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'felix', text: 'Someone at one of the depots types "km" after the distance. Helpful, technically.' },
        { speaker: 'zanele', text: 'Technically helpful, practically sabotage. Fixed. Log line 3: "5 distances had \' km\' typed in; removed it and made the column numbers."' },
      ],
    },
  ],
  apply: {
    scenario: 'Fixing the distance column.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is distance_km stored as text (object)?',
        options: [
          { text: 'pandas always reads numbers as text', why: 'It read hour as int64 just fine.' },
          { text: 'Five values have " km" typed after the number, so the column can\'t be numbers' },
          { text: 'Distances are too big', why: 'pandas handles huge numbers.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Remove " km" from distance_km, make it int64, and print the column\'s dtype.',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf["distance_km"] = df["distance_km"].str.replace(" km", "").astype("int64")\nprint(df["distance_km"].dtype)\n',
        hint: 'df["distance_km"] = df["distance_km"].str.replace(" km", "").astype("int64")',
        checks: [
          { message: 'Print int64', outputIncludes: 'int64' },
          { message: 'Use str.replace', codeIncludes: 'replace(' },
          { message: 'Use astype', codeIncludes: 'astype(' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the fix in order.',
        lines: ['Check the dtype: object', 'Find the values with "km"', 'Remove " km" with str.replace()', 'Convert with astype("int64")', 'Check the dtype again'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Take out the " km".',
        template: 'df["distance_km"].str.[[1]](" km", "")',
        blanks: [['replace']],
        distractors: ['remove', 'strip'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'After fixing the column, print the average distance with mean(), rounded to 1 decimal place.',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf["distance_km"] = df["distance_km"].str.replace(" km", "").astype("int64")\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf["distance_km"] = df["distance_km"].str.replace(" km", "").astype("int64")\nprint(round(df["distance_km"].mean(), 1))\n',
        hint: 'print(round(df["distance_km"].mean(), 1))',
        checks: [
          { message: 'Print 164.6', outputIncludes: '164.6' },
          { message: 'Use mean()', codeIncludes: 'mean()' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Text value or number value?',
        groups: ['Text', 'Number'],
        items: [
          { text: '"161 km"', group: 0 },
          { text: '161', group: 1 },
          { text: '"488"', group: 0 },
          { text: '488', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Someone types "km" after the distance. Helpful, technically?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'It\'s fixed in code now. If the system only accepted numbers in that box, it would never happen again.' },
          { text: 'Very helpful, keep doing it.', why: 'It turns the column into text every time.' },
          { text: 'Find out who and tell their boss.', why: 'Blame doesn\'t fix the system.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line fails?',
        lines: ['df = raw.drop_duplicates()', 'df["distance_km"] = df["distance_km"].astype("int64")', 'print(df["distance_km"].max())'],
        bug: 1,
        fix: 'df["distance_km"] = df["distance_km"].str.replace(" km", "").astype("int64")',
        explanation: '"161 km" can\'t become a number. Remove the " km" first.',
        language: 'python',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to its result.',
        pairs: [
          ['"161 km".replace(" km", "")', '"161"'],
          ['int("161")', '161'],
          ['raw["distance_km"].dtype', 'object'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which pandas method changes a column\'s type?',
        answers: ['astype', 'astype()', '.astype()'],
        placeholder: 'Method name',
      },
    ],
  },
  reflect: {
    prompt: 'The person typing "km" was trying to help. How could a form or system make the right thing the easy thing?',
    starters: ['The form could...', 'People would then...'],
  },
  deepen: {
    title: 'Read the error',
    summary: 'In the Try it card, do the challenge and read the full error. Errors that name the bad value are your friends.',
  },
  notes: 'deliveries.csv: 5 distances with " km" (D1010 161 km, D1078 319 km, D1151 310 km, D1234 487 km, D1319 19 km). After drop_duplicates and the fix: int64, max 495, mean 164.6 (400 rows). astype("int64") is used rather than astype(int) because Pyodide is 32-bit, where int means int32.',
};

export default lesson;
