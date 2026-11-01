import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Story: Mrs Achieng's unwritten rule, the last Friday truck at 2 p.m. Two conditions with & and |. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The 2 p.m. truck',
  summary: '2 weeks to Kamau. Zanele asks Mrs Achieng why Saturdays might be slow. "Oh, that\'s easy. The depots don\'t dispatch on Sundays, and the last truck on Friday leaves at 2 p.m. Everyone knows that." Zanele didn\'t. Time to test it with two conditions at once.',
  minutes: 12,
  outcomes: [
    'Combine two conditions with & (and)',
    'Combine alternatives with | (or)',
    'Use brackets around each condition',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Mrs Achieng\'s rule makes a prediction you can test: Friday orders placed before 2 p.m. should mostly be on time, and Friday orders after 2 p.m. should mostly be late.', replies: ['How do I filter for both?'] },
        { tey: 'Use & for "and": (df["day"] == "Fri") & (df["hour"] >= 14). Both must be true. Each condition needs its own brackets, or Python gets confused about the order.', replies: ['And "or"?'] },
        { tey: 'Use | for "or": (df["day"] == "Sat") | (df["day"] == "Sun"). Either can be true.', replies: ['What did the test show?'] },
        { tey: 'Run it and see. Friday before 2 p.m.: 24% late. Friday from 2 p.m.: 91% late. Same day, same drivers, same depots. One rule nobody wrote down.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Test the 2 p.m. rule',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n\nfri_early = df[(df["day"] == "Fri") & (df["hour"] < 14)]\nfri_late = df[(df["day"] == "Fri") & (df["hour"] >= 14)]\nprint("before 2 p.m.", len(fri_early), round(fri_early["is_late"].mean(), 2))\nprint("from 2 p.m.", len(fri_late), round(fri_late["is_late"].mean(), 2))\n',
      caption: 'Press Run. 45 morning orders, 24% late. 23 afternoon orders, 91% late.',
      challenge: 'Try the same split on Thursday. Does 2 p.m. matter on a Thursday?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'achieng', text: 'Everyone knows about the 2 p.m. truck.' },
        { speaker: 'zanele', text: 'Mrs Achieng, the customers don\'t. We promise Friday afternoon orders the same days as Monday morning ones.' },
        { speaker: 'achieng', text: '(after a pause) Well. That would explain a great deal.' },
      ],
    },
  ],
  apply: {
    scenario: 'Testing Mrs Achieng\'s rule.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make fri_late: Friday orders placed from hour 14. Print how many there are.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nfri_late = df[(df["day"] == "Fri") & (df["hour"] >= 14)]\nprint(len(fri_late))\n',
        hint: 'df[(df["day"] == "Fri") & (df["hour"] >= 14)]',
        checks: [
          { message: 'Print 23', outputEquals: '23' },
          { message: 'Use & to combine', codeIncludes: '&' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Friday before 2 p.m.: 24% late. From 2 p.m.: 91% late. What does that suggest?',
        options: [
          { text: 'Orders that miss the 2 p.m. truck wait for Monday, so they arrive late' },
          { text: 'Afternoon drivers are worse', why: 'Same drivers work both. The truck timing changes.' },
          { text: 'Fridays are unlucky', why: 'Friday mornings are fine: 24%.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Friday AND from 2 p.m.',
        template: '(df["day"] == "Fri") [[1]] (df["hour"] >= 14)',
        blanks: [['&']],
        distractors: ['and', '|'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'What share of those Friday-afternoon orders were late? Make is_late, filter, and print the mean rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nfri_late = df[(df["day"] == "Fri") & (df["hour"] >= 14)]\nprint(round(fri_late["is_late"].mean(), 2))\n',
        hint: 'Filter as before, then round(fri_late["is_late"].mean(), 2).',
        checks: [
          { message: 'Print 0.91', outputIncludes: '0.91' },
          { message: 'Use &', codeIncludes: '&' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the symbol to its meaning.',
        pairs: [
          ['&', 'And: both must be true'],
          ['|', 'Or: either can be true'],
          ['!=', 'Not equal'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line errors?',
        lines: [
          'early = df[(df["day"] == "Fri") & (df["hour"] < 14)]',
          'late = df[df["day"] == "Fri" & df["hour"] >= 14]',
          'print(len(early), len(late))',
        ],
        bug: 1,
        fix: 'late = df[(df["day"] == "Fri") & (df["hour"] >= 14)]',
        explanation: 'Without brackets around each condition, Python tries to do "Fri" & df["hour"] first and fails.',
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'achieng',
        message: 'Everyone knows about the 2 p.m. truck.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Why didn\'t anyone tell me?', why: 'Unwritten rules are unwritten. Thank her for this one.' },
          { text: 'That can\'t be it.', why: 'The data says it very much can.' },
          { text: 'Thank you, that might be the whole answer. Everyone here knows, but the customers don\'t, and the data shows what that costs.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Count orders that are Friday OR Saturday with |.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nprint(len(df[(df["day"] == "Fri") | (df["day"] == "Sat")]))\n',
        hint: 'df[(df["day"] == "Fri") | (df["day"] == "Sat")]',
        checks: [
          { message: 'Print 130', outputEquals: '130' },
          { message: 'Use |', codeIncludes: '|' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it pass (df["day"] == "Fri") & (df["hour"] >= 14)?',
        groups: ['Passes', 'Doesn\'t pass'],
        items: [
          { text: 'Friday, hour 15', group: 0 },
          { text: 'Friday, hour 10', group: 1 },
          { text: 'Thursday, hour 16', group: 1 },
          { text: 'Friday, hour 14', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What time does the last Friday truck leave? (24-hour hour)',
        answers: ['14', '2', '2pm', '2 pm', '14:00', '2 p.m.'],
        placeholder: 'Hour',
      },
    ],
  },
  reflect: {
    prompt: 'Mrs Achieng knew the rule; the data proved what it cost. What unwritten rule at your work or school might explain a problem nobody\'s connected to it?',
    starters: ['Everyone knows that...', 'It might explain...'],
  },
  deepen: {
    title: 'Ask the people who know',
    summary: 'Data shows the pattern; people often know the reason. Before your next analysis, ask someone on the ground: "Why do you think this happens?"',
  },
  notes: 'deliveries_clean.csv Friday: before hour 14, 45 orders, 11 late (0.24); from hour 14, 23 orders, 21 late (0.91). Fri or Sat: 130 orders. The 2 p.m. Friday cut-off and no Sunday dispatch are the fictional Synergix rules built into teyro_datasets.py (weekend hold: +2 days with probability 0.85). Mrs Achieng from Corporate Jargon.',
};

export default lesson;
