import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Story: Kamau won't read a table. Honest bar charts; drawing text bars with a for loop. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Draw it',
  summary: '2 weeks to Kamau. Mrs Achieng warns Zanele: "Mr Kamau doesn\'t read tables. He looks at one picture and decides." So Zanele learns what makes a chart honest, and draws her first one, out of # signs.',
  minutes: 12,
  outcomes: [
    'Know the rules of an honest bar chart',
    'Repeat a line of code for every group with a for loop',
    'Draw a text bar chart with "#" * n',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>A <strong>bar chart</strong> compares groups: one bar per day, its length showing the late rate. Three rules keep it honest: <strong>bars start at zero</strong> (so a bar twice as long means twice as much), <strong>label everything</strong> (what\'s measured, and in what units), and <strong>show every group</strong>, not just the ones that make your point.</p>',
    },
    {
      kind: 'text',
      html: '<p>Our runner shows text, not pictures, so we\'ll draw bars with characters. In Python, <code>"#" * 5</code> is <code>#####</code>. A <code>for</code> loop repeats indented lines for every item: <code>for day, rate in rates.items():</code> goes through each day and its rate. Multiply the rate by 20 and every # is 5 percentage points.</p>',
    },
    {
      kind: 'tryIt',
      title: 'A bar chart made of #',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nrates = df.groupby("day")["is_late"].mean()\n\nprint("Late rate by day (each # = 5%)")\nfor day, rate in rates.items():\n    print(day, "#" * round(rate * 20))\n',
      caption: 'Press Run. The four spaces before print matter: they put it inside the loop.',
      challenge: 'Draw the same chart for depot instead of day.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When you make real charts later (Excel, Google Sheets, Python\'s matplotlib), the same three rules apply: start at zero, label it, show every group.',
    },
  ],
  apply: {
    scenario: 'One picture for Kamau.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("#" * 4)',
        language: 'python',
        options: [
          { text: '#4', why: 'Multiplying text repeats it.' },
          { text: 'An error', why: 'Text times a whole number is allowed.' },
          { text: '####' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Sat followed by 17 # signs, using "#" * 17.',
        starter: 'print("Sat")\n',
        solution: 'print("Sat", "#" * 17)\n',
        hint: 'print("Sat", "#" * 17)',
        checks: [
          { message: 'Print Sat and 17 #', outputIncludes: 'Sat #################' },
          { message: 'Use * to repeat', codeIncludes: '* 17' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest chart, or misleading?',
        groups: ['Honest', 'Misleading'],
        items: [
          { text: 'Bars start at zero', group: 0 },
          { text: 'Axis starts at 28% to make a gap look huge', group: 1 },
          { text: 'Every day shown', group: 0 },
          { text: 'Only the worst two days shown', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Go through every day and its rate.',
        template: '[[1]] day, rate in rates.items():',
        blanks: [['for']],
        distractors: ['each', 'loop'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Draw the late rate by day as # bars (rate * 20, rounded).',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nrates = df.groupby("day")["is_late"].mean()\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nrates = df.groupby("day")["is_late"].mean()\nfor day, rate in rates.items():\n    print(day, "#" * round(rate * 20))\n',
        hint: 'for day, rate in rates.items(): then, indented, print(day, "#" * round(rate * 20)).',
        checks: [
          { message: 'Saturday\'s bar: 17 #', outputIncludes: 'Sat #################' },
          { message: 'Thursday\'s bar: 3 #', outputIncludes: 'Thu ###' },
          { message: 'Use a for loop', codeIncludes: 'for ' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is wrong?',
        lines: ['for day, rate in rates.items():', 'print(day, "#" * round(rate * 20))'],
        bug: 1,
        fix: '    print(day, "#" * round(rate * 20))',
        explanation: 'The line inside a loop must be indented (4 spaces), or Python gives an IndentationError.',
        language: 'python',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the chart rule to why it matters.',
        pairs: [
          ['Start at zero', 'Bar lengths compare fairly'],
          ['Label everything', 'Nobody guesses what\'s measured'],
          ['Show every group', 'No cherry-picking'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'achieng',
        message: 'Mr Kamau doesn\'t read tables. He looks at one picture and decides.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Then the picture has to be honest: one bar per day, starting at zero, labelled. Saturday will speak for itself.' },
          { text: 'Then I\'ll make the gap look as big as possible.', why: 'He\'ll decide on a distorted picture.' },
          { text: 'I\'ll make him read the table.', why: 'Meet your audience where they are.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Draw the late rate by depot the same way.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nrates = df.groupby("depot")["is_late"].mean()\nfor depot, rate in rates.items():\n    print(depot, "#" * round(rate * 20))\n',
        hint: 'Group by depot, then the same loop.',
        checks: [
          { message: 'Nairobi\'s bar: 7 #', outputIncludes: 'Nairobi #######' },
          { message: 'Use a for loop', codeIncludes: 'for ' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'An honest bar chart\'s bars start at which number?',
        answers: ['0', 'zero'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a chart you\'ve seen recently (news, work, social media). Did it follow the three rules?',
    starters: ['The chart showed...', 'It broke the rule...'],
  },
  deepen: {
    title: 'Real charts',
    summary: 'In a spreadsheet, make a bar chart of the six day rates: Mon 19%, Tue 27%, Wed 15%, Thu 14%, Fri 47%, Sat 87%. Check the axis starts at zero.',
  },
  notes: 'Text bars, rate x 20 rounded: Fri 9, Mon 4, Sat 17, Thu 3, Tue 5, Wed 3; depots Kisumu 6, Mombasa 6, Nairobi 7 (0.374 x 20 = 7.47). Bar chart rules: Cleveland & McGill (1984), "Graphical Perception", JASA 79(387) (length judged accurately only from a common baseline); Huff, How to Lie with Statistics (1954).',
};

export default lesson;
