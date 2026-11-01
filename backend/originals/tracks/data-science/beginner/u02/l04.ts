import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Story: six deliveries with no arrival recorded. dropna(subset=...), why not fillna(0). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The six blanks',
  summary: '4 weeks to Kamau. Six deliveries have no arrival recorded: no actual_days, no late. Remi suggests "just put 0". Zanele works out what that would quietly do to the answer, and makes a better choice.',
  minutes: 12,
  outcomes: [
    'Remove rows with a blank in one column with dropna(subset=...)',
    'Explain why filling blanks with 0 can bend the answer',
    'Write down every cleaning decision',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Filling blanks with 0 is a safe, neutral fix.',
          isFact: false,
          explain: 'Myth. 0 is a value. Six deliveries would suddenly "arrive in 0 days", faster than any real one, and drag the average down.',
        },
        {
          text: 'Removing rows with blanks is always fine.',
          isFact: false,
          explain: 'Myth. If the blanks share something (say, they\'re all from one depot), dropping them hides that depot. Here the six are spread across two depots, five drivers and five different days, so dropping them is reasonable. Check, then decide.',
        },
        {
          text: 'Whatever you do with blanks, write it down.',
          isFact: true,
          explain: 'Fact. "Dropped 6 rows with no arrival recorded" lets anyone check your choice, and redo it differently if they disagree.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Drop the blanks',
      code: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\nprint(df[df["actual_days"].isna()])\n\ndf = df.dropna(subset=["actual_days"])\nprint(len(df))\n',
      caption: 'Press Run. First the six blank rows, then the count after dropping them: 394.',
      challenge: 'Swap the dropna line for df = df.fillna(0) and print df["actual_days"].min(). What\'s the fastest "delivery" now?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'remi', text: 'Can\'t we just put 0 in the blanks?' },
        { speaker: 'zanele', text: 'Then six deliveries arrive in zero days. Teleportation. Kamau would love it.' },
        { speaker: 'zanele', text: 'They\'re spread across depots, drivers and days. Nothing in common. So I\'ll drop them, and write it down: "6 rows, no arrival recorded, dropped. Asked Felix for the paper sheets."' },
      ],
    },
  ],
  apply: {
    scenario: 'What to do with six blanks.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is filling the blank actual_days with 0 a bad idea?',
        options: [
          { text: 'It invents six impossibly fast deliveries and pulls the average down' },
          { text: 'pandas doesn\'t allow 0', why: 'It allows it, which is the danger.' },
          { text: 'It deletes the rows', why: 'It keeps them, with a made-up value.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Drop duplicates, then drop rows where actual_days is blank. Print len(df).',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\ndf = df.dropna(subset=["actual_days"])\nprint(len(df))\n',
        hint: 'df = df.dropna(subset=["actual_days"])',
        checks: [
          { message: 'Print 394', outputEquals: '394' },
          { message: 'Use dropna', codeIncludes: 'dropna(' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Drop rows with no arrival recorded.',
        template: 'df = df.[[1]](subset=["[[2]]"])',
        blanks: [['dropna'], ['actual_days']],
        distractors: ['fillna', 'driver'],
        language: 'python',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good handling of blanks, or risky?',
        groups: ['Good', 'Risky'],
        items: [
          { text: 'Check what the blank rows have in common', group: 0 },
          { text: 'Fill every blank with 0', group: 1 },
          { text: 'Write down how many you dropped and why', group: 0 },
          { text: 'Delete them without looking', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'After dropping duplicates, check the blanks: print df["actual_days"].isna().sum().',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\ndf = raw.drop_duplicates()\nprint(df["actual_days"].isna().sum())\n',
        hint: 'print(df["actual_days"].isna().sum())',
        checks: [
          { message: 'Print 6', outputEquals: '6' },
          { message: 'Use isna()', codeIncludes: 'isna()' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Can\'t we just put 0 in the blanks?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Sure, it\'s quicker.', why: 'Quick, and wrong: six zero-day deliveries.' },
          { text: 'Then six deliveries arrive in zero days. I\'d rather drop them and say so.' },
          { text: 'Let\'s put 99 instead.', why: 'Any made-up number bends the answer.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes up data?',
        lines: ['df = raw.drop_duplicates()', 'df = df.fillna(0)', 'print(df["actual_days"].mean())'],
        bug: 1,
        fix: 'df = df.dropna(subset=["actual_days"])',
        explanation: 'fillna(0) writes a fake 0 into every blank, so the average is computed on invented deliveries.',
        language: 'python',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the blank-handling steps in order.',
        lines: ['Count the blanks', 'Look at the blank rows', 'Decide: drop or fill', 'Do it in code', 'Write down what you did'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the method to what it does.',
        pairs: [
          ['isna()', 'Marks blanks as True'],
          ['dropna()', 'Removes rows with blanks'],
          ['fillna(0)', 'Writes 0 into blanks'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'After removing duplicates and blanks, how many rows are left?',
        answers: ['394'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'When information is missing (a form not filled in, a score not recorded), what do people usually assume? When is that assumption dangerous?',
    starters: ['People usually assume...', 'It\'s dangerous when...'],
  },
  deepen: {
    title: 'Missing on purpose?',
    summary: 'Data experts ask whether data is "missing at random" or missing for a reason. Think of an example where the blanks themselves would be the story.',
  },
  notes: 'deliveries.csv blanks: D1018, D1059, D1122, D1204, D1267, D1342 (actual_days and late), Mombasa (4) and Nairobi (2) depots, five drivers, Mon/Tue/Wed/Thu/Fri. After drop_duplicates (400) then dropna(subset=["actual_days"]): 394 rows. Missing-data mechanisms (missing completely at random etc.): Rubin (1976), Biometrika 63(3).',
};

export default lesson;
