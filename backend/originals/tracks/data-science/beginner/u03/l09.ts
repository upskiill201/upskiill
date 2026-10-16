import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Story: Auma is "83% late" on long routes, from 6 trips. Small groups swing; always show the count. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Six trips',
  summary: '3 weeks to Kamau. Zanele looks only at long routes (over 250 km) and finds the worst driver isn\'t Baraka. It\'s Auma: 83% late. From six trips. Juma looks brilliant at 25%, from four. Small groups make big, wobbly numbers.',
  minutes: 12,
  outcomes: [
    'Explain why small groups give extreme rates',
    'Always show the count next to a rate',
    'Filter to a subset and group it',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The law of small numbers',
      html: "<p>Flip a coin 4 times and getting 3 or 4 heads (75% or more) is common. Flip it 400 times and 75% heads would be astonishing. <strong>The smaller the group, the more its rate swings</strong>, just by luck.</p><p>The statistician Howard Wainer called the formula behind this \"the most dangerous equation\", because ignoring it has cost real money. In the US, the counties with the <em>lowest</em> kidney cancer rates were mostly small, rural ones. So were the counties with the <em>highest</em> rates. Nothing about rural life caused both: small populations just swing to the extremes. Psychologists Amos Tversky and Daniel Kahneman showed in 1971 that even trained scientists expect small samples to behave like big ones.</p><p>The fix is simple: <strong>never show a rate without its count</strong>. \"83% late (5 of 6 trips)\" reads very differently from \"83% late\".</p>",
    },
    {
      kind: 'tryIt',
      title: 'Long routes only',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nlong = df[df["distance_km"] > 250]\nprint(long.groupby("driver")["is_late"].agg(["mean", "count"]).round(2))\n',
      caption: 'Press Run. Look at the count column before believing the mean column.',
      challenge: 'Group the long routes by depot. Are the counts big enough to trust?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'emeka', text: 'Auma? Auma\'s brilliant. She\'s done six long trips in her life.' },
        { speaker: 'zanele', text: 'Exactly. Five of six late could be bad luck, one bad week. I\'m not putting a percentage on a slide without the count next to it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Long routes, small groups.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Auma: 83% late on long routes. Baraka: 60%. What\'s the honest reading?',
        options: [
          { text: 'Auma is the worst long-route driver', why: 'From 6 trips, that rate could easily be luck.' },
          { text: 'Auma\'s rate comes from 6 trips, so it tells us very little. Baraka\'s comes from 73' },
          { text: 'Long routes don\'t matter', why: 'They might matter a lot. The point is sample size.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make long = rows where distance_km is over 250. Print how many there are.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\nlong = df[df["distance_km"] > 250]\nprint(len(long))\n',
        hint: 'long = df[df["distance_km"] > 250], then print(len(long)).',
        checks: [
          { message: 'Print 108', outputEquals: '108' },
          { message: 'Make the long table', expr: 'len(long) == 108' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Trust the rate, or need more data?',
        groups: ['Fairly solid', 'Too few to trust'],
        items: [
          { text: 'Baraka, long routes: 73 trips', group: 0 },
          { text: 'Auma, long routes: 6 trips', group: 1 },
          { text: 'All deliveries: 400', group: 0 },
          { text: 'Juma, long routes: 4 trips', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'On the long routes, print each driver\'s late rate AND count with agg(["mean", "count"]), rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nlong = df[df["distance_km"] > 250]\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nlong = df[df["distance_km"] > 250]\nprint(long.groupby("driver")["is_late"].agg(["mean", "count"]).round(2))\n',
        hint: 'long.groupby("driver")["is_late"].agg(["mean", "count"]).round(2)',
        checks: [
          { message: 'Show Auma: 0.83 from 6 trips', outputIncludes: 'Auma 0.83 6' },
          { message: 'Include the count', codeIncludes: '"count"' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Show the rate with its count.',
        template: 'long.groupby("driver")["is_late"].agg(["mean", "[[1]]"])',
        blanks: [['count']],
        distractors: ['sum', 'max'],
        language: 'python',
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Can I put "Auma: 83% late on long routes" on the slide? It\'s dramatic.',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Only with "(5 of 6 trips)" next to it, and honestly, six trips isn\'t enough to say anything about her.' },
          { text: 'Yes, drama gets attention.', why: 'And it could wrongly damage Auma\'s reputation.' },
          { text: 'No, delete Auma from the data.', why: 'Her trips are real. Just report them honestly.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which slide line is misleading?',
        lines: ['Baraka: 60% late (44 of 73 trips).', 'Juma: 25% late on long routes.', 'All deliveries: 34% late (135 of 400).'],
        bug: 1,
        fix: 'Juma: 1 of 4 long trips late, too few to judge.',
        explanation: 'A rate from 4 trips, shown with no count, looks far more certain than it is.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the source to the idea.',
        pairs: [
          ['Howard Wainer', '"The most dangerous equation"'],
          ['Tversky and Kahneman', 'Scientists trust small samples too much'],
          ['Kidney cancer by county', 'Small places at both extremes'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A driver has made 2 deliveries, both late. What\'s their late rate?',
        code: 'import pandas as pd\nprint(pd.Series([True, True]).mean())',
        language: 'python',
        options: [
          { text: '2', why: 'That\'s the count.' },
          { text: '1.0, which sounds terrible and means almost nothing' },
          { text: '0.5', why: 'Both were late, so all of them.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Never show a rate without its ___. (one word)',
        answers: ['count', 'counts', 'total'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'A restaurant with two 5-star reviews, or one with 900 reviews averaging 4.6: which would you trust? Why?',
    starters: ['I\'d trust...', 'Two reviews could be...'],
  },
  deepen: {
    title: 'The most dangerous equation',
    summary: 'Read Howard Wainer\'s short article "The Most Dangerous Equation" (American Scientist, 2007). The school-size example will change how you read league tables.',
  },
  notes: 'deliveries_clean.csv long routes (distance_km > 250): 108 trips. Late rate by driver: Baraka 0.603 (73), Wanjiru 0.462 (13), Kiprop 0.571 (7), Auma 0.833 (6), Mwangi 0.2 (5), Juma 0.25 (4). Wainer, H. (2007), "The Most Dangerous Equation", American Scientist 95(3): de Moivre\'s equation; kidney cancer counties example (also in Kahneman, Thinking, Fast and Slow, 2011). Tversky & Kahneman (1971), "Belief in the law of small numbers", Psychological Bulletin 76(2).',
};

export default lesson;
