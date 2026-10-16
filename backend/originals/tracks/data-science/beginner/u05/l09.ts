import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Story: the rehearsal. Florence Nightingale's persuasive chart; the final summary script. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The rehearsal',
  summary: 'Kamau week. Thursday night. Mrs Achieng lets Zanele and Remi rehearse in the empty boardroom. Before they start, she tells them about a nurse who changed an army with one chart. Then Zanele writes the script that prints every number she\'ll say.',
  minutes: 12,
  outcomes: [
    'Know how a clear chart has changed real decisions',
    'Build one script that prints every number in the talk',
    'Rehearse answers to the hardest questions',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Florence Nightingale\'s chart',
      html: "<p>In the Crimean War (1853 to 1856), Florence Nightingale found that far more British soldiers were dying of diseases caught in dirty, crowded hospitals than of their battle wounds. Tables of numbers hadn't moved anyone. So in 1858 she drew her \"rose\" diagrams: wedges for each month, coloured by cause of death, with preventable disease towering over everything else.</p><p>The charts helped her persuade the government to back sanitary reforms in army hospitals. She was later the first woman elected a Fellow of the Royal Statistical Society.</p><p>Her lesson for Zanele: the point of the analysis is a <strong>decision</strong>. One clear picture of the biggest cause, shown to the person who can act, can matter more than a hundred tables.</p>",
    },
    {
      kind: 'tryIt',
      title: 'The talk, in one script',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\n\nrates = df.groupby("weekend")["is_late"].mean()\nboth = len(df[df["is_late"] & df["weekend"]])\nothers = df[~df["weekend"]]\nnew_rate = (others["is_late"].sum() + df["weekend"].sum() * rates[False]) / len(df)\n\nprint(f"Late now: {df[\'is_late\'].mean():.0%}")\nprint(f"Weekend-hold orders late: {rates[True]:.0%}, others {rates[False]:.0%}")\nprint(f"Weekend holds are {both} of {df[\'is_late\'].sum()} late deliveries")\nprint(f"If fixed: about {new_rate:.0%}")\n',
      caption: 'Press Run. Every number Zanele will say, from one script. Next month, Felix sends April and she presses Run.',
      challenge: 'Add a line for the Friday 2 p.m. test: the late rate before and after 2 p.m. on Fridays.',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'achieng', text: 'Mr Kamau will ask three things. Is it true? Is it getting worse? What do you want from me?' },
        { speaker: 'zanele', text: 'True: tested three ways. Worse: no, steady at a third. What we want: a Saturday dispatch pilot at Nairobi for one month.' },
        { speaker: 'achieng', text: 'Then you\'ll be out in twelve minutes. He likes that.' },
      ],
    },
  ],
  apply: {
    scenario: 'The night before.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What made Nightingale\'s chart persuasive?',
        options: [
          { text: 'It showed the biggest, preventable cause clearly to people who could act' },
          { text: 'It used lots of colours', why: 'The colours served one point: disease was the biggest killer.' },
          { text: 'It had more numbers than the tables', why: 'Fewer numbers, one clear picture.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print: Late now: 34%, using an f-string with the overall late rate.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nrate = df["is_late"].mean()\nprint(f"Late now: {rate:.0%}")\n',
        hint: 'rate = df["is_late"].mean(), then print(f"Late now: {rate:.0%}").',
        checks: [
          { message: 'Print Late now: 34%', outputIncludes: 'Late now: 34%' },
          { message: 'Use an f-string', codeIncludes: 'f"' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Kamau\'s question to Zanele\'s answer.',
        pairs: [
          ['Is it true?', 'Tested three ways'],
          ['Is it getting worse?', 'No: steady at a third'],
          ['What do you want from me?', 'A one-month Saturday pilot'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print: Weekend holds are 75 of 135 late deliveries, computing both numbers in code.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nboth = len(df[df["is_late"] & df["weekend"]])\ntotal = df["is_late"].sum()\nprint(f"Weekend holds are {both} of {total} late deliveries")\n',
        hint: 'both = len(df[df["is_late"] & df["weekend"]]); total = df["is_late"].sum().',
        checks: [
          { message: 'Print Weekend holds are 75 of 135 late deliveries', outputIncludes: 'Weekend holds are 75 of 135 late deliveries' },
          { message: 'Compute the numbers in code', codeIncludes: '{both}' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Say it in the talk, or keep it as back-up?',
        groups: ['In the talk', 'Back-up'],
        items: [
          { text: 'The headline and three numbers', group: 0 },
          { text: 'How the 99-day typo was handled', group: 1 },
          { text: 'The ask: a Saturday pilot', group: 0 },
          { text: 'Tukey\'s fences', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The point of the analysis.',
        template: 'The point of an analysis is a [[1]].',
        blanks: [['decision']],
        distractors: ['chart', 'table'],
      },
      {
        kind: 'chatReply',
        from: 'achieng',
        message: 'What do you want from him? Say it in one sentence.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'We\'d like you to think about the weekends.', why: 'Too vague to say yes to.' },
          { text: 'Approve a one-month Saturday dispatch pilot at Nairobi, and we\'ll measure exactly what it changes.' },
          { text: 'Fire the depot managers.', why: 'The data blames a rule, not people.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line errors?',
        lines: ['rates = df.groupby("weekend")["is_late"].mean()', 'print(f"Weekend: {rates[True]:.0%}")', 'print(f"Others: {rates[False]:.0%")'],
        bug: 2,
        fix: 'print(f"Others: {rates[False]:.0%}")',
        explanation: 'Every { in an f-string needs a closing }.',
        language: 'python',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the talk in order.',
        lines: ['The headline', 'Three numbers', 'How we know: the tests', 'What we don\'t know', 'The ask'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which war did Florence Nightingale\'s charts come out of?',
        answers: ['Crimean', 'Crimean War', 'the Crimean War', 'crimean war'],
        placeholder: 'War',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a decision at your work or school that one clear chart could change? What would the chart show?',
    starters: ['The decision is...', 'The chart would show...'],
  },
  deepen: {
    title: 'Nightingale\'s rose',
    summary: 'Look up Florence Nightingale\'s 1858 "Diagram of the causes of mortality in the army in the East". What does the blue area show?',
  },
  notes: 'Nightingale, F. (1858), Notes on Matters Affecting the Health, Efficiency, and Hospital Administration of the British Army; polar-area "rose" diagrams of deaths by cause, Crimean War 1854-56 (war 1853-56). First woman elected Fellow of the Royal Statistical Society (1858). deliveries_clean.csv: late 0.34; weekend 0.88 vs 0.19; 75 of 135; what-if 0.19.',
};

export default lesson;
