import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Story: a delivery that took 99 days. describe(), spotting impossible values, a first filter. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The 99-day delivery',
  summary: '4 weeks to Kamau. describe() shows the slowest delivery in March took 99 days. A 19 km trip to a Nairobi supermarket, promised in 1 day. Either someone walked very slowly, or someone\'s finger slipped.',
  minutes: 12,
  outcomes: [
    'Get a quick summary of a number column with describe()',
    'Find rows that break a rule with a filter: df[df["col"] > n]',
    'Decide what to do with an impossible value, and log it',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><code>describe()</code> gives a number column\'s summary in one go: how many values, the mean, the smallest, the biggest and a few in between. Its <strong>max</strong> line is the fastest way to spot a value that can\'t be right. In the raw file, the max of <code>actual_days</code> is <strong>99</strong>. The next slowest is 6.</p>',
    },
    {
      kind: 'text',
      html: '<p>To see that row, <strong>filter</strong>: <code>df[df["actual_days"] > 20]</code> keeps only the rows where the rule is true. It\'s delivery <strong>D1289</strong>: 19 km, promised in 1 day. 99 is almost certainly a typing slip. You can\'t know the real value, so the honest options are: find the true value, or remove the row and say so.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Find the impossible delivery',
      code: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\nprint(df["actual_days"].describe())\nprint(df[df["actual_days"] > 20][["delivery_id", "distance_km", "promised_days", "actual_days"]])\n',
      caption: 'Press Run. max is 99. The filter shows the one row behind it. Double square brackets pick several columns.',
      challenge: 'Change > 20 to > 5. How many deliveries took more than 5 days?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'Felix, D1289. Nineteen kilometres, 99 days. Can you check the driver\'s paper sheet?' },
        { speaker: 'felix', text: 'The paper sheets are in a box at the Nairobi depot. I can get them by Friday. Maybe.' },
        { speaker: 'zanele', text: 'Then for now I remove it. Log line 4: "D1289: 99 days, impossible for 19 km; removed until the paper sheet is checked."' },
      ],
    },
  ],
  apply: {
    scenario: 'The 99-day delivery.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'After dropping duplicates and blanks, print the max of actual_days.',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\nprint(df["actual_days"].max())\n',
        hint: 'print(df["actual_days"].max())',
        checks: [
          { message: 'Print 99', outputIncludes: '99' },
          { message: 'Use max()', codeIncludes: 'max()' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A 19 km delivery, promised in 1 day, "took 99 days". What\'s most likely?',
        options: [
          { text: 'It really took 99 days', why: 'Possible, but for 19 km a typing slip is far more likely.' },
          { text: 'pandas misread it', why: 'pandas read exactly what was typed.' },
          { text: 'A typing slip' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Keep only rows where actual_days is over 20.',
        template: 'df[df["actual_days"] [[1]] 20]',
        blanks: [['>']],
        distractors: ['<', '='],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the rows where actual_days is more than 20, using a filter.',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\nprint(df[df["actual_days"] > 20])\n',
        hint: 'print(df[df["actual_days"] > 20])',
        checks: [
          { message: 'Show delivery D1289', outputIncludes: 'D1289' },
          { message: 'Use a filter with >', codeIncludes: '> 20' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Possible, or almost certainly a mistake?',
        groups: ['Possible', 'Mistake'],
        items: [
          { text: 'A 488 km trip taking 5 days', group: 0 },
          { text: 'A 19 km trip taking 99 days', group: 1 },
          { text: 'A 15 km trip taking 1 day', group: 0 },
          { text: 'A delivery taking -2 days', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Why not just change it to 1? It was promised in 1 day.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Good idea, done.', why: 'That\'s inventing data, just a more believable kind.' },
          { text: 'Let\'s keep the 99.', why: 'One impossible value would distort every average.' },
          { text: 'Because I\'d be guessing. It might have been 2 or 3. Until Felix checks the paper sheet, I remove it and say so.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Keep only rows with actual_days under 20, and print len(df).',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\ndf = df[df["actual_days"] < 20]\nprint(len(df))\n',
        hint: 'df = df[df["actual_days"] < 20]',
        checks: [
          { message: 'Print 393', outputEquals: '393' },
          { message: 'Filter with < 20', codeIncludes: '< 20' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which log line is not good enough?',
        lines: ['Removed 8 duplicate rows (system saved twice).', 'Dropped 6 rows with no arrival recorded.', 'Fixed a weird number.'],
        bug: 2,
        fix: 'D1289: 99 days for 19 km, impossible; removed until the paper sheet is checked.',
        explanation: 'Nobody could check "a weird number". Say which row, what was wrong and what you did.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the describe() line to its meaning.',
        pairs: [
          ['count', 'How many values'],
          ['mean', 'The average'],
          ['min', 'The smallest'],
          ['max', 'The biggest'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which delivery ID had the 99-day typo?',
        answers: ['D1289', 'd1289'],
        placeholder: 'Delivery ID',
      },
    ],
  },
  reflect: {
    prompt: 'Remi suggested changing 99 to 1, a believable guess. Why can believable guesses be more dangerous than obvious mistakes?',
    starters: ['A believable guess...', 'Nobody would notice...'],
  },
  deepen: {
    title: 'Look at the max',
    summary: 'Whenever you get a column of numbers, check the min and max first. Impossible values hide there.',
  },
  notes: 'deliveries.csv: D1289 (Nairobi depot, Nairobi city, 19 km, promised 1) has actual_days 99 (the clean file has 1). After drop_duplicates and dropna: max 99, next 6; filtering actual_days < 20 leaves 393 rows. Boolean filtering: pandas docs, Indexing and selecting data.',
};

export default lesson;
