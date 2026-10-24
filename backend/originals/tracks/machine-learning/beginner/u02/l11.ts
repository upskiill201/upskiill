import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 11 — Missing values: find the blanks, decide what to do, drop them honestly. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Missing values',
  summary: 'Ten bookings in the export have no distance at all. Emmanuel shrugs: "The front desk skipped it." Halima has to decide: guess the distance, or leave those bookings out?',
  minutes: 12,
  outcomes: [
    'Find blanks with isna()',
    'Count blanks per column',
    'Drop rows with a blank in a key column, and say how many',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Blanks are information too',
      html: '<p>pandas shows an empty cell as <strong>NaN</strong> ("not a number"). Models can\'t learn from NaN, so every blank needs a decision.</p><p><strong>Step 1: find them.</strong> <code>df.isna().sum()</code> counts the blanks in every column. In the export, only <code>distance_km</code> has any: <strong>10</strong>.</p><p><strong>Step 2: ask why.</strong> Missing at random (the desk was busy)? Or missing for a reason (only new patients have no address)? If it\'s for a reason, dropping them could hide a pattern.</p><p><strong>Step 3: decide.</strong> Two honest options:</p><ul><li><strong>Drop</strong> the rows: <code>df.dropna(subset=["distance_km"])</code>. Fine when there are few, and they\'re missing by chance. 10 of 2,412 is under 1%.</li><li><strong>Fill</strong> them with a sensible value, such as the clinic\'s typical distance. Better when there are many. Chapter 8 does this properly.</li></ul><p><strong>Step 4: write it down.</strong> "Dropped 10 bookings with no distance." Anyone reading the results should know.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Find the blanks',
      caption: 'The messy export.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments_raw.csv")\nprint(df.isna().sum())\n\nkept = df.dropna(subset=["distance_km"])\nprint(len(df), "->", len(kept))\n',
      challenge: 'Print the clinic of the bookings with a blank distance.',
    },
  ],
  apply: {
    scenario: 'Dealing with blanks.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many blanks the distance_km column has',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\nprint(df["distance_km"].isna().sum())\n',
        hint: 'df["distance_km"].isna().sum()',
        checks: [{ message: 'Print 10', outputEquals: '10' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does NaN mean in a pandas table?',
        options: [
          { text: 'The value is zero', why: 'Zero is a real value. NaN means nothing was recorded.' },
          { text: 'The value is negative', why: 'NaN means missing.' },
          { text: 'The cell is empty' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Drop the rows with a blank distance_km, then print how many rows are left',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\nkept = df.dropna(subset=["distance_km"])\nprint(len(kept))\n',
        hint: 'df.dropna(subset=["distance_km"])',
        checks: [
          { message: 'Print 2402', outputEquals: '2402' },
          { message: 'Use dropna', codeIncludes: 'dropna(' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Drop the blanks, or think harder first?',
        groups: ['Fine to drop', 'Think harder first'],
        items: [
          { text: '10 of 2,412 missing, desk was busy', group: 0 },
          { text: 'Half the rows missing', group: 1 },
          { text: 'Only Gumel\'s distances are missing', group: 1 },
          { text: 'A handful missing at random', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Just put 0 km in the blanks. Done.',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Good idea, 0 it is.', why: '0 is a real distance, not "unknown".' },
          { text: '0 km means "lives next door". That would teach the model something false. Better to drop these 10, or fill with a sensible value.' },
          { text: 'Delete the whole column.', why: 'Distance is useful. Only 10 cells are blank.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it does.',
        pairs: [
          ['df.isna().sum()', 'Blanks per column'],
          ['df.dropna(subset=["distance_km"])', 'Keeps rows that have a distance'],
          ['df["distance_km"].isna()', 'True where the distance is blank'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Halima dropped the blanks, but len(df) is still 2412. Which line?',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv("appointments_raw.csv")', 'df.dropna(subset=["distance_km"])', 'print(len(df))'],
        bug: 2,
        fix: 'df = df.dropna(subset=["distance_km"])',
        explanation: 'dropna returns a new table. Store it back in df, or nothing changes.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Keep only rows with a distance.',
        language: 'python',
        template: 'df = df.[[1]](subset=["[[2]]"])',
        blanks: [['dropna'], ['distance_km']],
        distractors: ['fillna', 'clinic'],
      },
      {
        kind: 'mcq',
        prompt: 'Why write "Dropped 10 bookings with no distance" in the notes?',
        options: [
          { text: 'Because pandas needs it', why: 'pandas doesn\'t care. People reading the results do.' },
          { text: 'To make the notes longer', why: 'It\'s about honesty, not length.' },
          { text: 'So anyone using the results knows what was left out' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many rows are left after dropping the 10 blank distances from 2,412?',
        answers: ['2402', '2,402'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Emmanuel wanted to put 0 in the blanks. Where else have you seen "unknown" quietly turned into a real-looking value?',
    starters: ['I\'ve seen...', 'It caused...'],
  },
  deepen: {
    title: 'Missing for a reason',
    summary: 'Sometimes the blank IS the clue: a patient with no phone number can\'t get an SMS reminder. Chapter 8 shows how to keep that information instead of losing it.',
  },
  notes: 'appointments_raw.csv: 10 blank distance_km (no other column has blanks); dropna(subset=["distance_km"]) leaves 2402 of 2412. pandas isna, dropna.',
};

export default lesson;
