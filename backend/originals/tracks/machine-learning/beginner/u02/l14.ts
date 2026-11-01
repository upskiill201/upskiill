import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 14 — Rates, not counts: Yaba has the most no-shows; Gumel has the worst rate. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Rates, not counts',
  summary: 'Folake reads a report: "Yaba has the most no-shows: 77." She wants Yaba\'s manager in her office. Halima asks Tey one question first: most no-shows out of how many bookings?',
  minutes: 11,
  outcomes: [
    'Tell a count from a rate',
    'Compare groups of different sizes fairly',
    'Use .sum() for counts and .mean() for rates',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Yaba had 77 no-shows. Gumel had 50. So Yaba is worse?', replies: ['Looks like it'] },
        { tey: 'Now the bookings: Yaba had 363, Gumel only 134. Yaba is the busiest clinic, so of course it has the most of everything: the most visits AND the most no-shows.', replies: ['So how do I compare them?'] },
        { tey: 'Divide by the size of each group. Yaba: 77 ÷ 363 = 21.2%. Gumel: 50 ÷ 134 = 37.3%. Gumel\'s rate is much worse. Counts tell you how big; rates tell you how often.', replies: ['In pandas?'] },
        { tey: 'groupby then .sum() gives counts. groupby then .mean() on a 0/1 column gives rates. When groups differ in size, compare the rates.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Counts vs rates',
      caption: 'The same data, two different stories.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments.csv")\nprint(df.groupby("clinic")["no_show"].sum())\nprint(df.groupby("clinic")["no_show"].mean().round(3))\n',
      challenge: 'Sort the rates with .sort_values(ascending=False).',
    },
  ],
  apply: {
    scenario: 'Comparing fairly.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the number of no-shows at each clinic (counts)',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(df.groupby("clinic")["no_show"].sum())\n',
        hint: 'groupby("clinic")["no_show"].sum()',
        checks: [
          { message: 'Show Yaba 77', outputIncludes: 'Yaba 77' },
          { message: 'Show Gumel 50', outputIncludes: 'Gumel 50' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Yaba: 77 no-shows from 363 bookings. Gumel: 50 from 134. Which has the higher no-show rate?',
        options: [
          { text: 'Yaba', why: 'Yaba has the higher COUNT. 77 ÷ 363 is 21%; 50 ÷ 134 is 37%.' },
          { text: 'They\'re the same', why: '21% vs 37%.' },
          { text: 'Gumel' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Gumel\'s no-show rate, rounded to 3 places',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\ngumel = df[df["clinic"] == "Gumel"]\nprint(round(gumel["no_show"].mean(), 3))\n',
        hint: 'Filter Gumel, then round(gumel["no_show"].mean(), 3)',
        checks: [{ message: 'Print 0.373', outputEquals: '0.373' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'A count, or a rate?',
        groups: ['Count', 'Rate'],
        items: [
          { text: '77 no-shows', group: 0 },
          { text: '21.2% of bookings', group: 1 },
          { text: 'groupby(...).sum()', group: 0 },
          { text: 'groupby(...).mean() on 0/1', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Yaba has the most no-shows. Call their manager in.',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes, Yaba is the worst.', why: 'Most no-shows, but also most bookings. The rate is near average.' },
          { text: 'Yaba is also the busiest clinic. Its RATE is 21%, close to average. Gumel\'s is 37%: that\'s where help is needed.' },
          { text: 'All clinics are the same.', why: 'Rates range from 15% to 37%.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the clinic numbers.',
        pairs: [
          ['Yaba no-shows', '77'],
          ['Yaba bookings', '363'],
          ['Gumel no-shows', '50'],
          ['Gumel bookings', '134'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which sentence in the report is misleading?',
        lines: [
          'Yaba had 77 no-shows from 363 bookings.',
          'Gumel had 50 no-shows from 134 bookings.',
          'So Yaba has the worst no-show problem.',
          'Gumel\'s rate (37%) is double the average.',
        ],
        bug: 2,
        fix: 'Gumel has the worst no-show rate; Yaba has the most bookings.',
        explanation: 'Comparing counts between groups of different sizes misleads. Compare rates.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Counts, then rates.',
        language: 'python',
        template: 'counts = df.groupby("clinic")["no_show"].[[1]]()\nrates = df.groupby("clinic")["no_show"].[[2]]()',
        blanks: [['sum'], ['mean']],
        distractors: ['count', 'max'],
      },
      {
        kind: 'mcq',
        prompt: 'When is comparing counts fair?',
        options: [
          { text: 'Always', why: 'Bigger groups have bigger counts of everything.' },
          { text: 'Never', why: 'With equal-sized groups, counts and rates tell the same story.' },
          { text: 'When the groups are the same size' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Yaba\'s no-show rate as a percentage with 1 decimal (77 ÷ 363).',
        answers: ['21.2%', '21.2'],
        placeholder: 'A percentage',
      },
    ],
  },
  reflect: {
    prompt: '"Most" is often a count dressed up as a rate. Where have you heard "the most..." when the fair comparison was "how often"?',
    starters: ['I heard "the most..."', 'The fair version would be...'],
  },
  deepen: {
    title: 'Small groups wobble',
    summary: 'Gumel has only 134 bookings, so its rate is less certain than Yaba\'s. One rainy week could move it a lot. Big differences in small groups are worth a second look.',
  },
  notes: 'appointments.csv: no-shows Yaba 77/363 = 21.2%, Gumel 50/134 = 37.3%; clinic rates range from 15.3% (Ikeja) to 37.3% (Gumel); average 18.3%.',
};

export default lesson;
