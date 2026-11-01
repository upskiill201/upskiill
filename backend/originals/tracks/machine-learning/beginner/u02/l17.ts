import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 17 — Common pandas bugs: the five mistakes everyone makes. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common pandas bugs',
  summary: 'Chidi decides to "help" and writes his own cleaning script. It runs, sort of. Miracle finds five bugs, every one of them a classic. Halima makes a list so she never makes them herself.',
  minutes: 12,
  outcomes: [
    'Spot the five most common pandas mistakes',
    'Fix each one',
    'Know which ones crash and which ones stay silent',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Chidi\'s script, and the fixes',
      before: {
        label: 'Chidi\'s version',
        text: 'df.drop_duplicates()\nlong = df[df["wait_days"] > 14 and df["sms_reminder"] == 0]\nyaba = df[df["clinic"] = "Yaba"]\nrate = df.groupby("clinic")["no_show"].sum()\nprint(df["Clinic"])',
      },
      after: {
        label: 'Fixed',
        text: 'df = df.drop_duplicates()\nlong = df[(df["wait_days"] > 14) & (df["sms_reminder"] == 0)]\nyaba = df[df["clinic"] == "Yaba"]\nrate = df.groupby("clinic")["no_show"].mean()\nprint(df["clinic"])',
      },
      notes: [
        'Bug 1 (silent): not storing the result. drop_duplicates() returns a new table; df is unchanged.',
        'Bug 2 (crash): "and" instead of &, and no brackets around each condition.',
        'Bug 3 (crash): = instead of == in a comparison.',
        'Bug 4 (silent): .sum() when you meant a rate (.mean()).',
        'Bug 5 (crash): wrong capital in a column name. "Clinic" isn\'t "clinic": KeyError.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The silent bugs are the dangerous ones: the code runs, the numbers look fine, and they\'re wrong.',
    },
  ],
  apply: {
    scenario: 'Bug hunt.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fix Chidi\'s filter so it runs and prints 151',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nlong = df[df["wait_days"] > 14 and df["sms_reminder"] = 0]\nprint(len(long))\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nlong = df[(df["wait_days"] > 14) & (df["sms_reminder"] == 0)]\nprint(len(long))\n',
        hint: 'Brackets around each condition, & between them, == to compare',
        checks: [{ message: 'Print 151', outputEquals: '151' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does the bug crash, or stay silent?',
        groups: ['Crashes', 'Silent'],
        items: [
          { text: 'df["Clinic"] (wrong capital)', group: 0 },
          { text: 'df.drop_duplicates() not stored', group: 1 },
          { text: '.sum() instead of .mean() for a rate', group: 1 },
          { text: 'df[df["clinic"] = "Yaba"]', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This prints 2412, not 2400. Which line?',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv("appointments_raw.csv")', 'df.drop_duplicates()', 'print(len(df))'],
        bug: 2,
        fix: 'df = df.drop_duplicates()',
        explanation: 'The result wasn\'t stored, so df still has the duplicates.',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the bug so it prints the number of rows after dropping duplicates: 2400',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf.drop_duplicates()\nprint(len(df))\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments_raw.csv")\ndf = df.drop_duplicates()\nprint(len(df))\n',
        hint: 'Store it: df = df.drop_duplicates()',
        checks: [{ message: 'Print 2400', outputEquals: '2400' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the bug to its fix.',
        pairs: [
          ['and between conditions', '& with brackets'],
          ['= in a comparison', '=='],
          ['df["Clinic"]', 'df["clinic"]'],
          ['.sum() for a rate', '.mean()'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why are silent bugs worse than crashes?',
        options: [
          { text: 'They\'re slower', why: 'Speed isn\'t the problem. Wrong answers are.' },
          { text: 'The numbers look fine, so nobody checks them' },
          { text: 'They aren\'t', why: 'A crash gets fixed straight away. A silent bug reaches the board.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'This crashes with a KeyError. Which line?',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv("appointments.csv")', 'print(df["No_show"].mean())'],
        bug: 2,
        fix: 'print(df["no_show"].mean())',
        explanation: 'Column names must match exactly, capitals included.',
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'My script ran without errors, so it\'s correct.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, no errors means correct.', why: 'Two of the five bugs were silent.' },
          { text: 'Scripts are never correct.', why: 'They can be, once checked.' },
          { text: 'Running isn\'t the same as right. Your drop_duplicates did nothing and your "rates" are counts. Check the numbers against what you expect.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Fix the comparison.',
        language: 'python',
        template: 'yaba = df[df["clinic"] [[1]] "Yaba"]',
        blanks: [['==']],
        distractors: ['=', ':='],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which error do you get for a wrong column name like df["Clinic"]? (one word)',
        answers: ['KeyError'],
        placeholder: 'Error name',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five bugs do you think you\'d make most? What check would catch it?',
    starters: ['I\'d probably...', 'I\'d check...'],
  },
  deepen: {
    title: 'Check against what you expect',
    summary: 'Before running a step, guess the answer: "about 2,400 rows", "a rate between 0 and 1". If the result is far off, there\'s probably a bug. It\'s the cheapest test there is.',
  },
  notes: 'Classic pandas mistakes: unassigned results of non-inplace methods, and/& with boolean Series (ValueError), = vs ==, sum vs mean, KeyError on column names.',
};

export default lesson;
