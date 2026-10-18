import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8 — Counting with value_counts: how many of each, and what share. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Counting with value_counts',
  summary: 'Folake wants a quick picture: which clinics are busiest, and how many people actually miss? One command counts every value in a column.',
  minutes: 10,
  outcomes: [
    'Count each value in a column with value_counts()',
    'Turn counts into shares with normalize=True',
    'Check how common no-shows really are',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><code>df["clinic"].value_counts()</code> counts how many rows have each clinic, biggest first:</p><pre><code>Yaba            363\nIkeja           353\nSurulere        348\n...\nGumel           134</code></pre><p>On the label column it answers the most important question of the project:</p><pre><code>df["no_show"].value_counts()\n0    1961\n1     439</code></pre><p><strong>439 of 2,400 bookings were missed.</strong> Add <code>normalize=True</code> to get shares instead of counts: <code>0.817</code> came, <code>0.183</code> missed. That\'s the "about 1 in 5" Folake talks about. It also means a lazy guess of "everyone comes" would be right about 82% of the time. Remember that number.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Count it',
      caption: 'Counts, then shares.',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments.csv")\nprint(df["clinic"].value_counts())\nprint(df["no_show"].value_counts())\nprint(df["no_show"].value_counts(normalize=True).round(3))\n',
      challenge: 'Which weekday has the most bookings?',
    },
  ],
  apply: {
    scenario: 'How many of each?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many bookings were missed: the sum of the no_show column',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(df["no_show"].sum())\n',
        hint: 'no_show is 1 for a miss, so .sum() counts the misses',
        checks: [{ message: 'Print 439', outputEquals: '439' }],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the counts of each clinic with value_counts()',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(df["clinic"].value_counts())\n',
        hint: 'print(df["clinic"].value_counts())',
        checks: [
          { message: 'Show Yaba 363', outputIncludes: 'Yaba 363' },
          { message: 'Show Gumel 134', outputIncludes: 'Gumel 134' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'df["no_show"].value_counts(normalize=True) shows 0.817 and 0.183. What does 0.183 mean?',
        options: [
          { text: 'About 18% of bookings were missed' },
          { text: '183 bookings were missed', why: 'normalize=True gives shares, not counts.' },
          { text: 'The model is 18% accurate', why: 'There\'s no model yet. It\'s the share of misses.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the share of each no_show value, rounded to 3 places',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(df["no_show"].value_counts(normalize=True).round(3))\n',
        hint: 'value_counts(normalize=True).round(3)',
        checks: [
          { message: 'Show 0.817', outputIncludes: '0.817' },
          { message: 'Show 0.183', outputIncludes: '0.183' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to the result.',
        pairs: [
          ['df["no_show"].sum()', '439'],
          ['len(df)', '2400'],
          ['df["clinic"].value_counts().index[0]', 'Yaba'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So 82% of patients come. Good news?',
        prompt: "Halima's best reply?",
        options: [
          { text: 'Good for patients. For the model it\'s a warning: guessing "everyone comes" is already 82% right, so 82% is the score to beat.' },
          { text: 'It means the model will be 82% accurate.', why: 'It means a lazy guess already is.' },
          { text: 'It means no-shows don\'t matter.', why: '439 empty chairs in 12 weeks matter.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Shares, not counts.',
        language: 'python',
        template: 'df["no_show"].value_counts([[1]]=True)',
        blanks: [['normalize']],
        distractors: ['share', 'percent'],
      },
      {
        kind: 'findBug',
        prompt: 'This crashes with an AttributeError. Which line?',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv("appointments.csv")', 'print(df.value_counts("clinic").count_values())'],
        bug: 2,
        fix: 'print(df["clinic"].value_counts())',
        explanation: 'Pick the column, then call value_counts() on it.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "everyone comes" worth remembering?',
        options: [
          { text: 'It\'s the lazy guess any model must beat: about 82% here' },
          { text: 'It\'s Afiya\'s policy', why: 'It\'s a yardstick, not a policy.' },
          { text: 'It\'s always the best model', why: 'It catches zero no-shows.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many bookings in appointments.csv were missed?',
        answers: ['439'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: '"Everyone comes" is right 82% of the time and helps nobody. Can you think of another "always say the same thing" guess that sounds accurate but is useless?',
    starters: ['For example...', 'It sounds accurate because...'],
  },
  deepen: {
    title: 'Imbalanced data',
    summary: 'When one answer is much more common than the other (82% vs 18%), data people call it imbalanced. It\'s why accuracy alone can fool you. Chapter 7 is all about this.',
  },
  notes: 'appointments.csv: no_show 0: 1961, 1: 439; shares 0.817 / 0.183. Clinic counts: Yaba 363, Ikeja 353, Surulere 348, Kano City 309, Ibadan North 308, Wuse 294, Lekki 291, Gumel 134. Weekday Fri 419 most.',
};

export default lesson;
