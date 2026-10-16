import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Story: Zanele's first draft has 14 slides. One headline, three numbers; f-strings for clean output. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'One headline',
  summary: 'Kamau week. Zanele\'s first draft has 14 slides, 31 numbers and a slide titled "Methodology (Part 2)". Brian reads it and says: "If Kamau remembers one sentence, which one?" She cuts it to one headline and three numbers.',
  minutes: 11,
  outcomes: [
    'Lead with the answer, not the method',
    'Pick the three numbers that carry the story',
    'Print tidy sentences with f-strings',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Draft 1 and draft 2',
      before: {
        label: 'Draft 1: 14 slides',
        text: 'Background. Data sources. Cleaning (Parts 1 and 2). Mean vs median. Every groupby we ran. Correlations. Then, on slide 12: "Weekend-hold orders appear to have elevated lateness."',
      },
      after: {
        label: 'Draft 2: one slide to start',
        text: 'Headline: Orders that wait over the weekend cause most of our late deliveries. Three numbers: 88% of them arrive late (other orders: 19%). They\'re 75 of our 135 late deliveries. Fixing them could take us from 1 in 3 late to about 1 in 5.',
      },
      notes: [
        'Answer first. Kamau can ask "how do you know?", and the method is ready as back-up.',
        'Three numbers is about what people remember from one slide. Each one does a job: the size of the gap, the share of the problem, the prize.',
        'Plain words: "wait over the weekend", not "elevated lateness".',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Print the headline numbers',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nrates = df.groupby("weekend")["is_late"].mean()\n\nprint(f"Weekend-hold orders: {rates[True]:.0%} late")\nprint(f"Other orders: {rates[False]:.0%} late")\nprint(f"All orders: {df[\'is_late\'].mean():.0%} late")\n',
      caption: 'Press Run. An f-string (f before the quotes) puts values inside {}. :.0% shows a share as a whole percentage.',
      challenge: 'Add a line: print(f"Late weekend holds: {len(df[df[\'is_late\'] & df[\'weekend\']])} of {df[\'is_late\'].sum()}")',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'brian', text: 'If Kamau remembers one sentence, which one?' },
        { speaker: 'zanele', text: '"Orders that wait over the weekend cause most of our late deliveries."' },
        { speaker: 'brian', text: 'Then that\'s slide one. The other thirteen are for when he asks.' },
      ],
    },
  ],
  apply: {
    scenario: 'Cutting to one headline.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which is the best headline for Kamau?',
        options: [
          { text: 'Weekend-hold orders appear to have elevated lateness', why: 'Vague and stiff. Say what happens.' },
          { text: 'Orders that wait over the weekend cause most of our late deliveries' },
          { text: 'Methodology and data sources', why: 'That\'s back-up, not the answer.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the overall late rate as a whole percentage with an f-string: f"{rate:.0%}".',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nrate = (df["late"] == "yes").mean()\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nrate = (df["late"] == "yes").mean()\nprint(f"{rate:.0%}")\n',
        hint: 'print(f"{rate:.0%}")',
        checks: [
          { message: 'Print 34%', outputIncludes: '34%' },
          { message: 'Use an f-string', codeIncludes: 'f"' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Slide one, or back-up slides?',
        groups: ['Slide one', 'Back-up'],
        items: [
          { text: 'The headline', group: 0 },
          { text: 'How we cleaned the data', group: 1 },
          { text: '88% vs 19%', group: 0 },
          { text: 'Mean vs median of delivery time', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Put a value inside a sentence.',
        template: 'print([[1]]"Late: {rate:.0%}")',
        blanks: [['f']],
        distractors: ['s', 'p'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Print: Weekend-hold orders: 88% late, using an f-string with the weekend rate.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nrates = df.groupby("weekend")["is_late"].mean()\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["weekend"] = ((df["day"] == "Fri") & (df["hour"] >= 14)) | (df["day"] == "Sat")\nrates = df.groupby("weekend")["is_late"].mean()\nprint(f"Weekend-hold orders: {rates[True]:.0%} late")\n',
        hint: 'rates[True] is the weekend-hold rate.',
        checks: [
          { message: 'Print Weekend-hold orders: 88% late', outputIncludes: 'Weekend-hold orders: 88% late' },
          { message: 'Use an f-string', codeIncludes: 'f"' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each headline number to its job.',
        pairs: [
          ['88% vs 19%', 'How big the gap is'],
          ['75 of 135', 'How much of the problem it is'],
          ['1 in 3 to about 1 in 5', 'What fixing it is worth'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'If Kamau remembers one sentence, which one?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: '"Orders that wait over the weekend cause most of our late deliveries."' },
          { text: '"We used pandas."', why: 'He doesn\'t care how. He cares what and what next.' },
          { text: '"It\'s complicated."', why: 'It isn\'t, any more. That\'s the work she did.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t print the value?',
        lines: ['print(f"Late: {rate:.0%}")', 'print("Late: {rate:.0%}")', 'print(f"Rows: {len(df)}")'],
        bug: 1,
        fix: 'print(f"Late: {rate:.0%}")',
        explanation: 'Without the f before the quotes, Python prints the braces as plain text.',
        language: 'python',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'rate = 0.875\nprint(f"{rate:.0%}")',
        language: 'python',
        options: [
          { text: '0.875', why: ':.0% turns a share into a percentage.' },
          { text: '87.5', why: 'The .0 means no decimal places, and % adds the sign.' },
          { text: '88%' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Lead with the answer or the method?',
        answers: ['answer', 'the answer'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Take something you need to explain this week. What\'s the one sentence you\'d want people to remember?',
    starters: ['The one sentence is...', 'The three numbers are...'],
  },
  deepen: {
    title: 'Answer first',
    summary: 'Barbara Minto\'s "pyramid principle" (used at McKinsey) says: start with the answer, then the reasons, then the detail. Try it in your next email.',
  },
  notes: 'deliveries_clean.csv: weekend hold 0.88 (75/85), others 0.19 (60/315), all 0.3375 (prints 34% with :.0%). f-string format spec :.0% (Python docs, Format Specification Mini-Language). Minto, The Pyramid Principle (1987). "About three things" from one slide: a common presentation heuristic, not a hard rule.',
};

export default lesson;
