import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Story: the Nairobi depot manager is upset. Counts vs rates; agg(["sum", "count", "mean"]). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Most late isn\'t worst',
  summary: '3 weeks to Kamau. A draft slide leaks: "Nairobi depot: 74 late deliveries, more than Mombasa and Kisumu combined!" The Nairobi depot manager calls Emeka, furious. Nairobi also does almost as many deliveries as the other two put together.',
  minutes: 11,
  outcomes: [
    'Tell a count from a rate',
    'Show both at once with agg()',
    'Spot when a big count just means a big group',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The leaked slide, and the fair one',
      before: {
        label: 'Count only',
        text: 'Nairobi: 74 late. Mombasa: 39. Kisumu: 22. "Nairobi is the problem depot."',
      },
      after: {
        label: 'Count and rate',
        text: 'Nairobi: 74 late of 198 (37%). Mombasa: 39 of 131 (30%). Kisumu: 22 of 71 (31%). Nairobi is a little worse, not dramatically. It\'s mostly just bigger.',
      },
      notes: [
        'A count grows with the size of the group. A rate (late divided by total) lets you compare groups of different sizes fairly.',
        'agg(["sum", "count", "mean"]) shows late count, total and rate side by side in one table.',
        'Always ask: "out of how many?"',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Count, total and rate together',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df.groupby("depot")["is_late"].agg(["sum", "count", "mean"]).round(2))\n',
      caption: 'Press Run. sum = late, count = all deliveries, mean = late rate.',
      challenge: 'Group by day instead. Which day has the most deliveries, and which has the highest rate?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'emeka', text: 'The Nairobi manager says, and I quote, "Who made this slide? Tell them we do half the company\'s deliveries."' },
        { speaker: 'zanele', text: 'He\'s right. I made it, it was a draft, and it was unfair. The rate is 37%. I\'ll send him the fixed one.' },
      ],
    },
  ],
  apply: {
    scenario: 'Counts vs rates.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Nairobi has 74 late deliveries, Kisumu 22. Why can\'t you say Nairobi is three times worse?',
        options: [
          { text: 'Nairobi does almost three times as many deliveries' },
          { text: 'The counts are wrong', why: 'The counts are right. They just aren\'t comparable.' },
          { text: 'Kisumu is smaller, so it doesn\'t matter', why: 'It matters: you need rates to compare.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print late count, total and late rate per depot with agg(["sum", "count", "mean"]).',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df.groupby("depot")["is_late"].agg(["sum", "count", "mean"]))\n',
        hint: 'df.groupby("depot")["is_late"].agg(["sum", "count", "mean"])',
        checks: [
          { message: 'Show Nairobi\'s 74 late of 198', outputIncludes: 'Nairobi 74 198' },
          { message: 'Use agg()', codeIncludes: 'agg(' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Count or rate?',
        groups: ['Count', 'Rate'],
        items: [
          { text: '74 late deliveries', group: 0 },
          { text: '37% late', group: 1 },
          { text: '54 late on Saturdays', group: 0 },
          { text: '87% of Saturday deliveries late', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Show count and rate together.',
        template: 'df.groupby("depot")["is_late"].[[1]](["sum", "count", "mean"])',
        blanks: [['agg']],
        distractors: ['all', 'sum'],
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'The Nairobi manager is furious about the slide. What do I tell him?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Tell him numbers don\'t lie.', why: 'These numbers misled. That\'s the problem.' },
          { text: 'Tell him it was Felix.', why: 'Zanele made it. Owning it builds trust.' },
          { text: 'Tell him he\'s right: the draft compared counts, which was unfair. Here\'s the fair one: 37%, a little above the others.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Group by day with agg(["sum", "count", "mean"]), rounded to 2. Find Saturday\'s row.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nprint(df.groupby("day")["is_late"].agg(["sum", "count", "mean"]).round(2))\n',
        hint: 'Same as the depot one, with "day", and .round(2) at the end.',
        checks: [
          { message: 'Show Saturday: 54 late of 62, rate 0.87', outputIncludes: 'Sat 54 62 0.87' },
          { message: 'Group by day', codeIncludes: 'groupby("day")' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which headline is unfair?',
        lines: ['Saturday: 87% of deliveries late.', 'Wednesday has the most deliveries: 84.', 'Nairobi has the most late deliveries, so it\'s the worst depot.'],
        bug: 2,
        fix: 'Nairobi\'s late rate is 37%, a little above Mombasa (30%) and Kisumu (31%).',
        explanation: 'The most late deliveries can just mean the most deliveries.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the agg() column to what it shows.',
        pairs: [
          ['sum', 'Late deliveries'],
          ['count', 'All deliveries'],
          ['mean', 'Late rate'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Wednesday has 13 late deliveries out of 84. Saturday has 54 out of 62. Which is worse?',
        options: [
          { text: 'Wednesday, it\'s busier', why: 'Busier, but only 15% late.' },
          { text: 'They\'re the same', why: '15% vs 87% is not the same.' },
          { text: 'Saturday, by a lot: 87% vs 15%' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The question to always ask about a count: "Out of how ___?"',
        answers: ['many'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a headline that gave a big count ("10,000 cases!") without a total. What would the rate have told you?',
    starters: ['The headline said...', 'Out of how many...'],
  },
  deepen: {
    title: 'Out of how many?',
    summary: 'For one day, every time you hear a count in the news, ask "out of how many?" How often is the total missing?',
  },
  notes: 'deliveries_clean.csv by depot: Nairobi 74/198 (0.374), Mombasa 39/131 (0.298), Kisumu 22/71 (0.310); Mombasa + Kisumu late = 61 < 74; their deliveries = 202 vs Nairobi 198 (Emeka\'s "half the company\'s deliveries" is 49.5%). By day: Sat 54/62 (0.87), Wed 13/84 (0.15).',
};

export default lesson;
