import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Story: Mrs Achieng's rule about originals. A reproducible cleaning script with a log in comments. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Never touch the original',
  summary: '4 weeks to Kamau. Mrs Achieng has kept the CEO\'s files for 25 years. Her one rule: "Never write on the original." Zanele turns her cleaning into one script that anyone can re-run, with the log written right inside it.',
  minutes: 12,
  outcomes: [
    'Put every cleaning step in one script, in order',
    'Write the cleaning log as comments in the code',
    'Know why data people spend so much time cleaning',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Cleaning is the job',
      html: "<p>Surveys of data scientists keep finding the same thing: a big share of the work, often put at around 40 to 45%, is loading and cleaning data, not the clever analysis (Anaconda's State of Data Science, 2020). The exact figure varies, but every analyst recognises it.</p><p>So good analysts make cleaning <strong>reproducible</strong>: one script, from the raw file to the clean table, every step in order. A <code>#</code> starts a <strong>comment</strong>, a note Python ignores, so the cleaning log can live right next to the code it describes.</p><p>Why it matters: next month, Felix sends April. Zanele presses Run. And when Kamau asks \"how do you know?\", the answer is a page anyone can read.</p>",
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'achieng', text: 'Twenty-five years, one rule. Never write on the original. Make a copy, write on that, and say what you changed.' },
        { speaker: 'zanele', text: 'That\'s exactly what raw and df are. You invented data science, Mrs Achieng.' },
        { speaker: 'achieng', text: 'I invented filing. It\'s older.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The whole cleaning script',
      code: 'import pandas as pd\n\n# Raw export from Felix, never changed: 408 rows\nraw = pd.read_csv("deliveries.csv")\n\n# 1. 8 duplicate rows (system saved twice)\ndf = raw.drop_duplicates()\n# 2. 6 rows with no arrival recorded: dropped\ndf = df.dropna(subset=["actual_days"])\n# 3. City names: strip spaces, consistent capitals\ndf["city"] = df["city"].str.strip().str.title()\n# 4. 5 distances had " km" typed in\ndf["distance_km"] = df["distance_km"].str.replace(" km", "").astype("int64")\n# 5. D1289: 99 days for 19 km, impossible: removed\ndf = df[df["actual_days"] < 20]\n\nprint(len(raw), "->", len(df))\n',
      caption: 'Press Run: 408 -> 393. Every line starting with # is a note for humans. Python skips it.',
      challenge: 'Add print(df["city"].nunique()) at the end. Is it 10?',
    },
  ],
  apply: {
    scenario: 'One script, raw to clean.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a line starting with # do in Python?',
        options: [
          { text: 'It deletes the line', why: 'It stays there, for humans.' },
          { text: 'It\'s a comment: Python ignores it' },
          { text: 'It prints a heading', why: 'Nothing is printed.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Write a comment saying what the next line does, then drop duplicates into df and print len(df).',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\n# Remove 8 duplicate rows\ndf = raw.drop_duplicates()\nprint(len(df))\n',
        hint: 'A comment starts with #. Then df = raw.drop_duplicates().',
        checks: [
          { message: 'Print 400', outputEquals: '400' },
          { message: 'Add a comment with #', codeIncludes: '#' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the cleaning script in order.',
        lines: [
          'raw = pd.read_csv("deliveries.csv")',
          'df = raw.drop_duplicates()',
          'df = df.dropna(subset=["actual_days"])',
          'df["city"] = df["city"].str.strip().str.title()',
          'df = df[df["actual_days"] < 20]',
        ],
        language: 'python',
      },
      {
        kind: 'sortGroups',
        prompt: 'Reproducible, or not?',
        groups: ['Reproducible', 'Not reproducible'],
        items: [
          { text: 'One script, raw file to clean table', group: 0 },
          { text: 'Fixing cells by hand in the raw file', group: 1 },
          { text: 'Comments saying what each step does', group: 0 },
          { text: 'Remembering what you did last time', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Run the whole cleaning: duplicates, blanks, cities, distances, the 99. Print len(df) at the end.',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\n# add the other four steps here\n\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\ndf["city"] = df["city"].str.strip().str.title()\ndf["distance_km"] = df["distance_km"].str.replace(" km", "").astype("int64")\ndf = df[df["actual_days"] < 20]\nprint(len(df))\n',
        hint: 'Copy the steps from the Try it card in order, then print(len(df)).',
        checks: [
          { message: 'Print 393', outputEquals: '393' },
          { message: 'Fix the cities', expr: 'df["city"].nunique() == 10' },
          { message: 'Make distances numbers', expr: 'df["distance_km"].dtype.kind == "i"' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'achieng',
        message: 'Never write on the original. Make a copy, write on that, and say what you changed.',
        prompt: 'How does Zanele\'s script follow the rule?',
        options: [
          { text: 'raw is never changed, df is the copy, and the comments say what changed.' },
          { text: 'It doesn\'t: it changes the CSV file.', why: 'It never writes to deliveries.csv.' },
          { text: 'It prints the result.', why: 'Printing isn\'t the point. The copy and the log are.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks Mrs Achieng\'s rule?',
        lines: ['raw = pd.read_csv("deliveries.csv")', 'df = raw.drop_duplicates()', 'raw["city"] = raw["city"].str.title()'],
        bug: 2,
        fix: 'df["city"] = df["city"].str.title()',
        explanation: 'That writes on the original (raw). Clean the copy.',
        language: 'python',
      },
      {
        kind: 'fillBlank',
        prompt: 'Turn the log line into a comment.',
        template: '[[1]] 5 distances had " km" typed in',
        blanks: [['#']],
        distractors: ['//', '--'],
        language: 'python',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each log line to its code.',
        pairs: [
          ['8 rows saved twice', 'drop_duplicates()'],
          ['6 with no arrival', 'dropna(subset=["actual_days"])'],
          ['29 city spellings', '.str.strip().str.title()'],
          ['" km" typed in', '.str.replace(" km", "")'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A script anyone can re-run and get the same result is called... (one word, starts with r)',
        answers: ['reproducible'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s something you do repeatedly that would be easier if the steps were written down once, in order?',
    starters: ['Every time I...', 'If I wrote it down...'],
  },
  deepen: {
    title: 'Your own recipe',
    summary: 'Pick a task you do every week. Write its steps as a numbered list, like comments in a script. Could someone else follow it?',
  },
  notes: 'Anaconda, State of Data Science 2020: respondents reported about 45% of time on data preparation (loading 19% + cleansing 26%). Hedged in the lesson ("often put at around 40 to 45%", "varies"). Full pipeline on deliveries.csv: 408 -> 393 rows, 10 cities, distance_km int64. Mrs Achieng (CEO\'s assistant for 25 years) from Corporate Jargon.',
};

export default lesson;
