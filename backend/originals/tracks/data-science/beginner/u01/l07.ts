import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Story: counting late deliveries for real. value_counts(). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Count, don\'t guess',
  summary: '5 weeks to Kamau. Kamau\'s 135 came from a report. Zanele wants to count it herself, straight from the rows. One method, value_counts(), counts every value in a column. It\'s the most-used line in data science.',
  minutes: 11,
  outcomes: [
    'Count how often each value appears with value_counts()',
    'Check a reported number against the raw rows',
    'Spot which value is most common',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'To count late deliveries, you have to go through the rows one by one.',
          isFact: false,
          explain: 'Myth. df["late"].value_counts() counts every value in the column at once: no 265, yes 135.',
        },
        {
          text: 'value_counts() puts the most common value first.',
          isFact: true,
          explain: 'Fact. It sorts from most to least common, so the top line is the answer to "what happens most?".',
        },
        {
          text: 'If a report says 135, you don\'t need to count it again.',
          isFact: false,
          explain: 'Myth. Reports get copied, rounded and mistyped. Counting from the rows takes one line, and now you know.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Count late deliveries',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["late"].value_counts())\nprint(df["day"].value_counts())\n',
      caption: 'Press Run. The first count matches Kamau\'s report: 135 late. The second counts deliveries per day.',
      challenge: 'Count the vehicle column. Which vehicle is used most?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'yes 135. It matches Kamau. And Wednesday is the busiest day, 84 deliveries.' },
        { speaker: 'remi', text: 'So now we know the number\'s real. That\'s worth saying in the presentation.' },
      ],
    },
  ],
  apply: {
    scenario: 'Counting from the rows.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Count how many deliveries came from each depot.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["depot"].value_counts())\n',
        hint: 'print(df["depot"].value_counts())',
        checks: [
          { message: 'Show Nairobi 198', outputIncludes: 'Nairobi 198' },
          { message: 'Use value_counts()', codeIncludes: 'value_counts(' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'df["late"].value_counts() prints no 265, yes 135. Which line comes first?',
        options: [
          { text: 'no 265' },
          { text: 'yes 135', why: 'value_counts() puts the most common first.' },
          { text: 'They\'re in alphabetical order', why: 'They\'re in order of size.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Count each driver\'s deliveries.',
        template: 'df["driver"].[[1]]()',
        blanks: [['value_counts']],
        distractors: ['count_values', 'sum'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Which vehicle is used most? Print the value_counts() of the vehicle column.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(df["vehicle"].value_counts())\n',
        hint: 'Same as the depot one, with "vehicle".',
        checks: [
          { message: 'Show Van 213', outputIncludes: 'Van 213' },
          { message: 'Count the vehicle column', codeIncludes: 'vehicle' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'From the counts: match the value to how many deliveries.',
        pairs: [
          ['Nairobi depot', '198'],
          ['Mombasa depot', '131'],
          ['Kisumu depot', '71'],
          ['Wednesday', '84'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Baraka has 73 deliveries. That\'s the joint most. See? He\'s everywhere.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'True, so he must be the problem.', why: 'Doing lots of deliveries isn\'t a sign of doing them badly.' },
          { text: 'Wanjiru has 73 too. Doing the most deliveries doesn\'t tell us who\'s late. That\'s a different count.' },
          { text: 'That\'s not many.', why: 'It\'s joint top. The point is that this count doesn\'t answer the question.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line has a mistake?',
        lines: ['import pandas as pd', 'df = pd.read_csv("deliveries_clean.csv")', 'print(df["late"].value_counts)'],
        bug: 2,
        fix: 'print(df["late"].value_counts())',
        explanation: 'Without the brackets, Python shows the method itself instead of running it. Add ().',
        language: 'python',
      },
      {
        kind: 'sortGroups',
        prompt: 'Can value_counts() answer it directly?',
        groups: ['Yes', 'Not on its own'],
        items: [
          { text: 'How many deliveries per depot?', group: 0 },
          { text: 'Which driver is late most often?', group: 1 },
          { text: 'How many were late?', group: 0 },
          { text: 'Why were they late?', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which day had the most deliveries? (three letters, as in the data)',
        answers: ['Wed', 'Wednesday'],
        placeholder: 'Day',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: count the cities.',
        tiles: ['df["city"]', '.value_counts()'],
        distractors: ['.count_values()', '.len()'],
        language: 'python',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one number you hear repeated at work, school or in the news that nobody seems to have counted themselves?',
    starters: ['People often say...', 'To check it I\'d need...'],
  },
  deepen: {
    title: 'Count everything',
    summary: 'In the Try it card, run value_counts() on every column that has words in it: day, depot, city, driver, vehicle, customer. What surprises you?',
  },
  notes: 'Counts from deliveries_clean.csv: late no 265 / yes 135; depots Nairobi 198, Mombasa 131, Kisumu 71; Wed 84 (busiest); vehicles Van 213, Truck 108, Motorbike 79; drivers Baraka 73, Wanjiru 73. value_counts sorts descending by default (pandas docs, Series.value_counts).',
};

export default lesson;
