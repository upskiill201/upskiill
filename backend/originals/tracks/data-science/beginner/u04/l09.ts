import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Story: the hidden third factor. Simpson's paradox (Berkeley 1973); groupby on two columns. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The hidden third factor',
  summary: '2 weeks to Kamau. Brian tells Zanele about a famous university that looked like it was biased against women, until someone split the numbers one level further. It\'s the same trap as Baraka. And it has a name.',
  minutes: 12,
  outcomes: [
    'Explain Simpson\'s paradox with a real example',
    'Group by two columns at once',
    'Look for a hidden factor before trusting a comparison',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Berkeley, 1973',
      html: "<p>In autumn 1973, the University of California, Berkeley admitted about 44% of men who applied to graduate school, but only about 35% of women. It looked like clear bias.</p><p>Then statisticians split the numbers by <strong>department</strong> (Bickel and colleagues, published in <em>Science</em> in 1975). In most departments, women were admitted at about the same rate as men, or higher. The difference came from <em>where</em> people applied: more women applied to departments that turned away most applicants of any gender, and more men applied to departments that accepted most of them.</p><p>That's <strong>Simpson's paradox</strong>: a pattern in the whole group can shrink, vanish or even reverse inside its parts, because of a hidden third factor. For Berkeley the factor was department. For Baraka, it was route length. Whenever two groups differ, ask: <em>what else is different about them?</em></p>",
    },
    {
      kind: 'tryIt',
      title: 'Depot and weekend, together',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\n\nprint(df.groupby("depot")["is_late"].mean().round(2))\nprint(df.groupby(["depot", "weekend"])["is_late"].mean().round(2))\n',
      caption: 'Press Run. weekend is True for orders that miss the Friday 2 p.m. truck or arrive on Saturday. Grouping by two columns splits each depot in two.',
      challenge: 'Group by ["driver", "weekend"] instead. Does the weekend effect show up for every driver?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'Look at Kisumu. Overall: 31%, middle of the pack. On weekdays: 11%, the best depot. Weekend orders: 94%, the worst. The overall number hid both.' },
        { speaker: 'brian', text: 'One layer down, the whole story changes. Always go one layer down.' },
      ],
    },
  ],
  apply: {
    scenario: 'Looking one layer down.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What explained Berkeley\'s gap between men and women?',
        options: [
          { text: 'Women were weaker applicants', why: 'Nothing in the study suggests that.' },
          { text: 'A typing error', why: 'The numbers were real; the hidden factor was department.' },
          { text: 'Women more often applied to departments that rejected most applicants' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the weekend column: Friday from hour 14, or Saturday. Print how many orders are True.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nprint(df["weekend"].sum())\n',
        hint: '((Friday) & (hour >= 14)) | (Saturday), then .sum().',
        checks: [
          { message: 'Print 85', outputEquals: '85' },
          { message: 'Make the weekend column', expr: 'df["weekend"].sum() == 85' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Group by depot and by the weekend column.',
        template: 'df.groupby(["depot", "[[1]]"])["is_late"].mean()',
        blanks: [['weekend']],
        distractors: ['day', 'hour'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the late rate by depot AND weekend, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nprint(df.groupby(["depot", "weekend"])["is_late"].mean().round(2))\n',
        hint: 'groupby(["depot", "weekend"])',
        checks: [
          { message: 'Show Kisumu\'s weekday rate, 0.11', outputIncludes: '0.11' },
          { message: 'Show Kisumu\'s weekend rate, 0.94', outputIncludes: '0.94' },
          { message: 'Group by two columns', codeIncludes: '["depot", "weekend"]' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Hidden factor, or the thing being compared?',
        groups: ['Hidden factor', 'Being compared'],
        items: [
          { text: 'Berkeley: department', group: 0 },
          { text: 'Berkeley: men vs women', group: 1 },
          { text: 'Synergix: route length', group: 0 },
          { text: 'Synergix: Baraka vs other drivers', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'One layer down, the whole story changes. What\'s your next layer?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'There isn\'t one, I\'m done.', why: 'Always check whether the pattern holds in every slice.' },
          { text: 'Check the weekend effect in every depot and for every driver. If it holds everywhere, it\'s not hiding anything.' },
          { text: 'Go back to Baraka.', why: 'That layer\'s done: it was route length.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line errors?',
        lines: [
          'df["is_late"] = df["late"] == "yes"',
          'df["weekend"] = (df["day"] == "Fri") & (df["hour"] >= 14) | (df["day"] == "Sat")',
          'print(df.groupby("depot", "weekend")["is_late"].mean())',
        ],
        bug: 2,
        fix: 'print(df.groupby(["depot", "weekend"])["is_late"].mean())',
        explanation: 'Two columns go in a list, inside square brackets: ["depot", "weekend"].',
        language: 'python',
      },
      {
        kind: 'matchPairs',
        prompt: 'Kisumu, one layer down. Match the slice to its late rate.',
        pairs: [
          ['Kisumu overall', '31%'],
          ['Kisumu weekdays', '11%'],
          ['Kisumu weekend orders', '94%'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Does it hold for every driver? Group by ["driver", "weekend"] and print the late rates, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nprint(df.groupby(["driver", "weekend"])["is_late"].mean().round(2))\n',
        hint: 'groupby(["driver", "weekend"])',
        checks: [
          { message: 'Show Juma\'s weekday rate', outputIncludes: 'Juma False' },
          { message: 'Group by driver and weekend', codeIncludes: '["driver", "weekend"]' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A pattern that reverses inside the parts is called ___\'s paradox.',
        answers: ['Simpson', 'Simpsons', "Simpson's", 'simpson'],
        placeholder: 'A name',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a comparison where a hidden third factor might be at work (two schools\' results, two shops\' sales). What could it be?',
    starters: ['The comparison is...', 'The hidden factor might be...'],
  },
  deepen: {
    title: 'The Berkeley paper',
    summary: 'Read the abstract of Bickel, Hammel and O\'Connell, "Sex Bias in Graduate Admissions: Data from Berkeley", Science (1975). It\'s two paragraphs and a classic.',
  },
  notes: 'Bickel, P. J., Hammel, E. A., & O\'Connell, J. W. (1975). Sex Bias in Graduate Admissions: Data from Berkeley. Science 187(4175), 398-404. Fall 1973: ~44% of men and ~35% of women admitted overall; by department, a small but significant bias in favour of women. deliveries_clean.csv: 85 weekend-hold orders; late by depot x weekend: Kisumu 0.11/0.94, Mombasa 0.13/0.87, Nairobi 0.26/0.87; Kisumu overall 0.31.',
};

export default lesson;
