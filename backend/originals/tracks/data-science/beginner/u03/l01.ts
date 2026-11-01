import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: Emeka's "2.7 days" average came from the raw file. mean() vs median(). */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The average that lied',
  summary: '3 weeks to Kamau. Emeka has already told the depot managers: "Average delivery time is 2.7 days." He worked it out from the raw export, with the duplicates and the 99-day typo still in it. One impossible delivery moved the whole average.',
  minutes: 11,
  outcomes: [
    'Work out an average with mean() and the middle value with median()',
    'See how one extreme value drags the mean',
    'Choose the median when values are lopsided',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 9:30 a.m., on a video call',
      beats: [
        { speaker: 'emeka', text: 'I did my own numbers over the weekend. Average delivery time: 2.7 days. I\'ve told all the depot managers.' },
        { speaker: 'zanele', text: 'From the raw export? With D1289 in it?' },
        { speaker: 'emeka', text: 'What\'s D1289?' },
        { speaker: 'zanele', text: 'The delivery that took 99 days. It didn\'t, but your average thinks it did.' },
      ],
      choice: {
        prompt: 'How should Zanele show Emeka the problem?',
        options: [
          {
            text: 'Run the mean and the median on both files, side by side.',
            outcome: 'Raw file: mean 2.70, median 2. Clean file: mean 2.465, median 2. The median didn\'t move. The mean did. Emeka goes quiet, then unmutes: "Ah."',
            best: true,
          },
          {
            text: 'Tell him his number is wrong.',
            outcome: 'He asks how she knows. She has to show him anyway, and now he\'s defensive.',
          },
          {
            text: 'Let it go: 2.7 is close to 2.5.',
            outcome: 'The depot managers are now planning around a number that isn\'t true.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>The <strong>mean</strong> adds everything up and divides by how many there are. The <strong>median</strong> lines every value up in order and takes the one in the middle. One huge value (like 99) pulls the mean towards it, but the middle of the line barely moves. That\'s why house prices and salaries are usually reported as medians.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Mean vs median, both files',
      code: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\nclean = pd.read_csv("deliveries_clean.csv")\n\nprint("raw mean", round(raw["actual_days"].mean(), 2))\nprint("raw median", raw["actual_days"].median())\nprint("clean mean", clean["actual_days"].mean())\nprint("clean median", clean["actual_days"].median())\n',
      caption: 'Press Run. The mean jumps from 2.465 to 2.7 because of a few bad rows. The median stays at 2.',
      challenge: 'Print raw["actual_days"].max() to see the culprit.',
    },
  ],
  apply: {
    scenario: 'Emeka\'s 2.7 days.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the mean of actual_days in deliveries_clean.csv.',
        starter: 'import pandas as pd\n\nclean = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\nclean = pd.read_csv("deliveries_clean.csv")\nprint(clean["actual_days"].mean())\n',
        hint: 'print(clean["actual_days"].mean())',
        checks: [
          { message: 'Print 2.465', outputIncludes: '2.465' },
          { message: 'Use mean()', codeIncludes: 'mean()' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Emeka get 2.7 days?',
        options: [
          { text: 'Deliveries got slower over the weekend', why: 'It\'s the same March data.' },
          { text: 'The raw file still had the 99-day typo and duplicates in it' },
          { text: 'He used the median', why: 'The median is 2 in both files.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the word to how it\'s worked out.',
        pairs: [
          ['Mean', 'Add up, divide by how many'],
          ['Median', 'The middle value, in order'],
          ['Maximum', 'The biggest value'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the median of actual_days in the raw file, deliveries.csv.',
        starter: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\n',
        solution: 'import pandas as pd\n\nraw = pd.read_csv("deliveries.csv")\nprint(raw["actual_days"].median())\n',
        hint: 'print(raw["actual_days"].median())',
        checks: [
          { message: 'Print 2.0', outputIncludes: '2.0' },
          { message: 'Use median()', codeIncludes: 'median()' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Five deliveries took 1, 2, 2, 3 and 99 days. What\'s the median?',
        code: 'import pandas as pd\nprint(pd.Series([1, 2, 2, 3, 99]).median())',
        language: 'python',
        options: [
          { text: '21.4', why: 'That\'s the mean: 107 / 5.' },
          { text: '99', why: 'That\'s the biggest, not the middle.' },
          { text: '2.0' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Mean or median: which would you report?',
        groups: ['Mean is fine', 'Use the median'],
        items: [
          { text: 'Salaries in a company where the CEO earns 100 times more', group: 1 },
          { text: 'Heights of students in a class', group: 0 },
          { text: 'House prices with a few mansions', group: 1 },
          { text: 'Scores on a fair test, no extremes', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Ah. So my 2.7 is wrong. I\'ve told everyone. What do I say?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Easy fix: "Correction, the typical delivery takes 2 days (median). My first number included a typo." People trust you more for correcting.' },
          { text: 'Say nothing, it\'s close enough.', why: 'People are planning around it.' },
          { text: 'Blame Felix.', why: 'Correct the number, not the person.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The middle value of a column.',
        template: 'df["actual_days"].[[1]]()',
        blanks: [['median']],
        distractors: ['middle', 'mean'],
        language: 'python',
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence is wrong?',
        lines: ['The mean adds up all values and divides by how many.', 'One huge value can pull the mean a long way.', 'One huge value moves the median just as much as the mean.'],
        bug: 2,
        fix: 'One huge value barely moves the median.',
        explanation: 'The median only cares about the middle position, not how big the biggest value is.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the clean file, what\'s the median delivery time in days?',
        answers: ['2', '2.0', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Where have you heard an "average" that might be pulled up or down by a few extreme cases (pay, prices, waiting times)?',
    starters: ['I heard the average...', 'The median might be...'],
  },
  deepen: {
    title: 'Median income',
    summary: 'Look up how your country reports income: mean or median? Statistics offices usually prefer the median for exactly this reason.',
  },
  notes: 'deliveries.csv actual_days: mean 2.701 (402 non-blank values, incl. 8 duplicates and the 99), median 2.0. deliveries_clean.csv: mean 2.465, median 2.0. Median is standard for skewed distributions such as household income (e.g. the US Census Bureau headlines median household income).',
};

export default lesson;
