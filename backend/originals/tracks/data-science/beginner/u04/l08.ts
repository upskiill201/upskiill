import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Story: a depot chart with a cut-off axis. Truncated axes, cherry-picking, checking a chart's claim in code. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The chart that lied',
  summary: '2 weeks to Kamau. A chart from another team lands in the project channel. The Nairobi bar towers over the others: "Nairobi: the problem depot." Every number on it is true. The picture is still a lie. Zanele checks it in code.',
  minutes: 11,
  outcomes: [
    'Spot a truncated axis and cherry-picked groups',
    'Check a chart\'s claim by computing the real ratio',
    'Rewrite a misleading headline honestly',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The chart in the channel',
      text: 'Title: Nairobi, the problem depot. Bars: Nairobi 37%, Mombasa 30%. The axis starts at 28%, so the Nairobi bar looks about five times as tall. Kisumu was left off. Source: March deliveries.',
      hotspots: [
        { phrase: 'the problem depot', note: 'The title tells you what to conclude before you look. Honest titles describe: "Late rate by depot, March".' },
        { phrase: 'The axis starts at 28%', note: 'A truncated axis. From 28%, Nairobi\'s bar is 9 points tall and Mombasa\'s is 2: it looks almost five times bigger, when the real ratio is 1.26.' },
        { phrase: 'looks about five times as tall', note: 'Bar length should match the number. From zero, 37 and 30 look close, because they are.' },
        { phrase: 'Kisumu was left off', note: 'Cherry-picking: Kisumu (31%) would show Nairobi is only a little above both.' },
        { phrase: 'Source: March deliveries', note: 'Good: a source. A chart can cite a real source and still mislead.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Check the chart\'s claim',
      code: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nrates = df.groupby("depot")["is_late"].mean()\nprint(rates.round(2))\nprint("Nairobi / Mombasa:", round(rates["Nairobi"] / rates["Mombasa"], 2))\n',
      caption: 'Press Run. rates["Nairobi"] picks one value from a groupby result by its label.',
      challenge: 'How much bigger is Nairobi than Kisumu?',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'Every number on it is true. And it makes Nairobi look five times worse when it\'s 1.26 times. That\'s worse than a wrong number, because people believe it.' },
        { speaker: 'remi', text: 'Do we call it out?' },
        { speaker: 'zanele', text: 'We reply with the honest version. Same numbers, axis from zero, all three depots.' },
      ],
    },
  ],
  apply: {
    scenario: 'The misleading depot chart.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The axis starts at 28%. What does that do?',
        options: [
          { text: 'Makes the chart more accurate', why: 'It distorts the bar lengths.' },
          { text: 'Makes small differences look huge' },
          { text: 'Nothing, the numbers are the same', why: 'The numbers are, but the picture isn\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many times bigger Nairobi\'s late rate is than Mombasa\'s, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nrates = df.groupby("depot")["is_late"].mean()\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nrates = df.groupby("depot")["is_late"].mean()\nprint(round(rates["Nairobi"] / rates["Mombasa"], 2))\n',
        hint: 'round(rates["Nairobi"] / rates["Mombasa"], 2)',
        checks: [
          { message: 'Print 1.26', outputIncludes: '1.26' },
          { message: 'Pick values by label', codeIncludes: 'rates["Nairobi"]' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the trick to its fix.',
        pairs: [
          ['Axis starts at 28%', 'Start bars at zero'],
          ['Kisumu left off', 'Show every group'],
          ['Title says "problem depot"', 'Describe, don\'t conclude'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Pick Nairobi\'s rate by its label.',
        template: 'rates[[[1]]]',
        blanks: [['"Nairobi"', "'Nairobi'"]],
        distractors: ['Nairobi', '0'],
        language: 'python',
      },
      {
        kind: 'writeCode',
        prompt: 'Now Nairobi compared with Kisumu: print the ratio, rounded to 2.',
        starter: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nrates = df.groupby("depot")["is_late"].mean()\n',
        solution: 'import pandas as pd\n\ndf = pd.read_csv("deliveries_clean.csv")\ndf["is_late"] = df["late"] == "yes"\nrates = df.groupby("depot")["is_late"].mean()\nprint(round(rates["Nairobi"] / rates["Kisumu"], 2))\n',
        hint: 'Swap "Mombasa" for "Kisumu".',
        checks: [{ message: 'Print 1.21', outputIncludes: '1.21' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Misleading trick, or fine?',
        groups: ['Misleading', 'Fine'],
        items: [
          { text: 'Leaving off groups that don\'t fit', group: 0 },
          { text: 'Citing the data source', group: 1 },
          { text: 'Cutting the axis to exaggerate a gap', group: 0 },
          { text: 'Labelling the axis "late rate (%)"', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which headline is misleading?',
        lines: ['Late rate by depot, March 2026.', 'Nairobi: the problem depot.', 'Nairobi 37%, Mombasa 30%, Kisumu 31%.'],
        bug: 1,
        fix: 'Nairobi\'s late rate is a little above the other two.',
        explanation: 'The title decides for the reader, and overstates a 1.26x gap.',
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'The chart\'s technically true. Do we really need to reply?',
        prompt: 'Zanele\'s best reply?',
        options: [
          { text: 'Yes, kindly: here\'s the same data from zero with all three depots. The Nairobi team deserves a fair picture.' },
          { text: 'No, leave it.', why: 'People will repeat it in Kamau\'s meeting.' },
          { text: 'Yes: tell everyone it was dishonest.', why: 'It may have been a mistake. Fix the picture, not the person.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Nairobi 37%, Mombasa 30%. With an axis from zero, how do the bars look?',
        options: [
          { text: 'Nairobi\'s is five times taller', why: 'That\'s the truncated version.' },
          { text: 'Identical', why: '37 is a bit more than 30.' },
          { text: 'Fairly similar, Nairobi a bit taller' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Showing only the groups that support your point is called cherry-___. (one word)',
        answers: ['picking', 'cherry-picking', 'cherrypicking'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever seen a chart that made a difference look bigger (or smaller) than it was? What gave it away?',
    starters: ['The chart made it look...', 'What gave it away was...'],
  },
  deepen: {
    title: 'How to Lie with Statistics',
    summary: 'Darrell Huff\'s 1954 book is short, funny and still the best guide to chart tricks. Read the chapter on "the gee-whiz graph".',
  },
  notes: 'deliveries_clean.csv late rate by depot: Nairobi 0.374, Mombasa 0.298, Kisumu 0.310. Ratios: Nairobi/Mombasa 1.26, Nairobi/Kisumu 1.21. From a 28% baseline: Nairobi bar 9.4 points, Mombasa 1.8 (about 5x). The "gee-whiz graph": Huff, How to Lie with Statistics (1954), ch. 5.',
};

export default lesson;
