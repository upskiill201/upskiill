import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 — Checkpoint. Reviews lessons 1–4: confounders, spurious correlations, testing an explanation, trends. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the trucks stay',
  summary: 'Kamau week. Wednesday. Emeka cancels the truck quote. "Six trucks wouldn\'t have moved a single order out of a closed depot on Sunday." He\'s quoting Zanele. Quick check before the what-if.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Separate correlation from causation, and test an explanation', 'Check a trend over time'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 11:00 a.m.',
      beats: [
        { speaker: 'emeka', text: 'Truck quote cancelled. Six trucks wouldn\'t have moved a single order out of a closed depot on Sunday.' },
        { speaker: 'zanele', text: 'That\'s my line.' },
        { speaker: 'emeka', text: 'It\'s a good line.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: cause, chance and trend.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add delay (actual_days minus promised_days) and print the mean delay per day of the week, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["delay"] = df["actual_days"] - df["promised_days"]\nprint(df.groupby("day")["delay"].mean().round(2))\n',
        hint: 'Make delay, then groupby("day")["delay"].mean().round(2).',
        checks: [
          { message: 'Show Saturday\'s mean delay', outputIncludes: 'Sat 1.' },
          { message: 'Make the delay column', expr: '"delay" in df.columns' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Trucks are late more often. Why can\'t this data say whether trucks cause it?',
        options: [
          { text: 'There aren\'t enough trucks', why: '108 is plenty. They\'re just tangled with distance.' },
          { text: 'Trucks are always on time', why: 'They\'re late 57% of the time; the question is why.' },
          { text: 'Every truck trip is a long route, so truck and distance can\'t be separated' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which warning sign is it?',
        groups: ['Confounder', 'Too few points'],
        items: [
          { text: 'Trucks and late deliveries (distance)', group: 0 },
          { text: 'Tea and lateness over five days', group: 1 },
          { text: 'Auma\'s six long trips', group: 1 },
          { text: 'Baraka and lateness (route length)', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Test Friday the way you tested Thursday: print the late rate before and after 2 p.m., rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nfri = df[df["day"] == "Fri"]\nprint(fri.groupby(fri["hour"] >= 14)["is_late"].mean().round(2))\n',
        hint: 'fri = df[df["day"] == "Fri"], then groupby(fri["hour"] >= 14).',
        checks: [
          { message: 'Show True 0.91', outputIncludes: 'True 0.91' },
          { message: 'Show False 0.24', outputIncludes: 'False 0.24' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its example.',
        pairs: [
          ['Confounder', 'Distance behind trucks and lateness'],
          ['Spurious correlation', 'Tea and late deliveries'],
          ['A real test', 'Thursday afternoons should be fine'],
          ['Flat trend', '33%, 35%, 33%, 34%'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Distance bands.',
        template: 'pd.[[1]](df["distance_km"], [0, 60, 250, 500])',
        blanks: [['cut']],
        distractors: ['band', 'split'],
        language: 'python',
      },
      {
        kind: 'findBug',
        prompt: 'Which claim goes too far?',
        lines: ['Weekend-hold orders are about 2 days late on average.', 'Thursday afternoons are no worse than mornings.', 'So the weekend hold explains every late delivery.'],
        bug: 2,
        fix: 'So the weekend hold explains most late deliveries: 75 of 135.',
        explanation: '60 late deliveries were not weekend holds. It\'s the biggest cause, not the only one.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the late rate by distance band (short, medium, long), rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\ndf["band"] = pd.cut(df["distance_km"], [0, 60, 250, 500], labels=["short", "medium", "long"])\nprint(df.groupby("band", observed=True)["is_late"].mean().round(2))\n',
        hint: 'pd.cut into band, then groupby("band", observed=True)["is_late"].mean().',
        checks: [
          { message: 'Show long 0.56', outputIncludes: 'long 0.56' },
          { message: 'Use pd.cut', codeIncludes: 'pd.cut(' },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Truck quote cancelled. What do I tell the depot managers about Baraka and the trucks?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Tell them it was a false alarm: long routes and weekend orders are late, whoever drives and whatever they drive.' },
          { text: 'Say nothing.', why: 'Rumours about Baraka are already out there.' },
          { text: 'Tell them Baraka was the problem after all.', why: 'He wasn\'t: it was the routes.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put this week so far in order.',
        lines: ['Trucks: a confounder', 'Tea: a spurious correlation', 'Try to break the explanation', 'Check the trend'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'import pandas as pd\na = pd.Series([1, 2, 3])\nb = pd.Series([2, 4, 6])\nprint(a.corr(b))',
        language: 'python',
        options: [
          { text: '0.5', why: 'b is exactly double a: a perfect line.' },
          { text: '1.0' },
          { text: '2.0', why: 'Correlations never go above 1.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Correlation isn\'t ___. (one word)',
        answers: ['causation'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Emeka nearly bought six trucks and nearly reported Baraka. What habit would have saved him both times?',
    starters: ['The habit is...', 'Next time he could...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1-4. deliveries_clean.csv: Friday before/after 14: 0.24/0.91; late rate by band short 0.25, medium 0.25, long 0.56; Saturday mean delay above 1 day (weekend hold 1.91).',
};

export default lesson;
