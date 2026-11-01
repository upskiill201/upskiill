import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9 — Group averages with groupby: the no-show rate for each group. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Group averages with groupby',
  summary: 'Bisi has always believed reminders help. Halima can finally check: split the bookings into "got a reminder" and "didn\'t", and compare the no-show rate of each group.',
  minutes: 12,
  outcomes: [
    'Split a table into groups with groupby',
    'Get the no-show rate of each group with mean()',
    'Read the result as a percentage',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'One line, one comparison',
      steps: [
        { title: '1. The trick: the mean of 0s and 1s', body: 'no_show is 1 for a miss and 0 for a visit. The mean of that column IS the no-show rate.', code: 'print(df["no_show"].mean())   # 0.1829...', language: 'python' },
        { title: '2. Split into groups', body: 'groupby("sms_reminder") makes one group per value: 0 (no reminder) and 1 (reminder).', code: 'groups = df.groupby("sms_reminder")', language: 'python' },
        { title: '3. Average each group', body: 'Pick the label column and take its mean, per group.', code: 'print(df.groupby("sms_reminder")["no_show"].mean().round(3))\n# 0    0.262\n# 1    0.124', language: 'python' },
        { title: '4. Read it', body: 'No reminder: 26.2% missed. Reminder: 12.4%. People who got a reminder missed about half as often.' },
        { title: '5. Any column works', body: 'Swap in "clinic", "weekday" or "rain" to compare other groups.', code: 'print(df.groupby("clinic")["no_show"].mean().round(3))', language: 'python' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Does it help?',
      caption: 'Try "rain" and "previous_no_shows" too.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments.csv")\nprint(df.groupby("sms_reminder")["no_show"].mean().round(3))\n',
      challenge: 'Which clinic has the highest no-show rate?',
    },
  ],
  apply: {
    scenario: 'Comparing groups.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate for each value of sms_reminder, rounded to 3 places',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(df.groupby("sms_reminder")["no_show"].mean().round(3))\n',
        hint: 'df.groupby("sms_reminder")["no_show"].mean().round(3)',
        checks: [
          { message: 'Show 0.262 for no reminder', outputIncludes: '0.262' },
          { message: 'Show 0.124 for a reminder', outputIncludes: '0.124' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the mean of no_show the no-show rate?',
        options: [
          { text: 'pandas has a special rule for no_show', why: 'It works for any 0/1 column.' },
          { text: 'It isn\'t; you need a different command', why: 'The mean of 0s and 1s is exactly the share of 1s.' },
          { text: 'It\'s 1 for a miss and 0 otherwise, so the mean is misses ÷ bookings' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate on rainy (1) and dry (0) days, rounded to 3 places',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(df.groupby("rain")["no_show"].mean().round(3))\n',
        hint: 'groupby("rain")',
        checks: [
          { message: 'Show 0.172 for dry days', outputIncludes: '0.172' },
          { message: 'Show 0.215 for rainy days', outputIncludes: '0.215' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the group to its no-show rate.',
        pairs: [
          ['No reminder', '26.2%'],
          ['Reminder', '12.4%'],
          ['Rainy day', '21.5%'],
          ['Everyone', '18.3%'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the overall no-show rate as a percentage with 1 decimal, like "18.3%"',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(f"{df[\'no_show\'].mean():.1%}")\n',
        hint: 'f"{df[\'no_show\'].mean():.1%}"',
        checks: [{ message: 'Print 18.3%', outputEquals: '18.3%' }],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'So reminders work! Can we tell the board they cut no-shows in half?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Yes: proven.', why: 'A difference between groups isn\'t proof that one causes the other.' },
          { text: 'They go WITH half the no-shows. Maybe the clinics that send reminders are different in other ways too. It\'s a strong hint, not proof.' },
          { text: 'No, the numbers mean nothing.', why: 'They\'re a real, useful pattern.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The no-show rate for each clinic.',
        language: 'python',
        template: 'df.[[1]]("clinic")["no_show"].[[2]]()',
        blanks: [['groupby'], ['mean']],
        distractors: ['sort', 'sum'],
      },
      {
        kind: 'findBug',
        prompt: 'Halima wanted rates, but got big numbers like 59 and 77. Which line?',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv("appointments.csv")', 'print(df.groupby("clinic")["no_show"].sum())'],
        bug: 2,
        fix: 'print(df.groupby("clinic")["no_show"].mean())',
        explanation: '.sum() counts the misses; .mean() gives the rate. Lesson 14 shows why rates are fairer.',
      },
      {
        kind: 'sortGroups',
        prompt: 'More no-shows, or fewer?',
        groups: ['Higher rate', 'Lower rate'],
        items: [
          { text: 'No reminder (vs reminder)', group: 0 },
          { text: 'Reminder (vs none)', group: 1 },
          { text: 'Rainy day (vs dry)', group: 0 },
          { text: 'Dry day (vs rainy)', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'No-show rate WITHOUT a reminder, as a percentage with 1 decimal.',
        answers: ['26.2%', '26.2'],
        placeholder: 'A percentage',
      },
    ],
  },
  reflect: {
    prompt: 'Bisi was right about reminders, at least in the data. What belief from your work or life would you love to check with a groupby?',
    starters: ['I believe that...', 'I\'d group by...'],
  },
  deepen: {
    title: 'Several numbers at once',
    summary: 'df.groupby("clinic")["no_show"].agg(["count", "mean"]) shows the number of bookings and the rate side by side. That\'s useful when a group is small, like Gumel.',
  },
  notes: 'appointments.csv: no_show mean 0.18292 -> 18.3%; by sms_reminder 0: 0.262, 1: 0.124; by rain 0: 0.172, 1: 0.215. Made-up practice data with planted patterns.',
};

export default lesson;
