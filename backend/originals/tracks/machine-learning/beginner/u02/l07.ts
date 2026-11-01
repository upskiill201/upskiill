import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7 — Filtering: keep only the rows that match a condition. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Filtering',
  summary: 'Halima\'s sticky-note rule was about patients who waited over 14 days with no reminder. How many are there in the real data? Tey shows her how to keep only the rows she wants.',
  minutes: 12,
  outcomes: [
    'Filter rows with df[condition]',
    'Combine two conditions with &',
    'Count the rows that match',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'df["wait_days"] > 14 asks the question for every row at once. You get a column of True and False, one per booking.', replies: ['How do I keep the True ones?'] },
        { tey: 'Put the question inside df[ ]: long = df[df["wait_days"] > 14]. That\'s a new, smaller table with only the long waits. len(long) is 371.', replies: ['And two conditions?'] },
        { tey: 'Join them with &, and put each one in its own brackets:\ndf[(df["wait_days"] > 14) & (df["sms_reminder"] == 0)]\nThat\'s Halima\'s rule: 151 bookings.', replies: ['Why & and not "and"?'] },
        { tey: 'Plain Python "and" works on one True or False. & works on a whole column at a time. For pandas filters, always & (and | for "or").' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The rule, in the real data',
      caption: 'How many bookings match Halima\'s sticky note?',
      code: 'import pandas as pd\n\ndf = pd.read_csv("appointments.csv")\nlong = df[df["wait_days"] > 14]\nprint(len(long))\n\nrule = df[(df["wait_days"] > 14) & (df["sms_reminder"] == 0)]\nprint(len(rule))\n',
      challenge: 'How many bookings are at Gumel?',
    },
  ],
  apply: {
    scenario: 'Keeping only some rows.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Count the bookings with a wait longer than 14 days',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nlong = df[df["wait_days"] > 14]\nprint(len(long))\n',
        hint: 'long = df[df["wait_days"] > 14], then print(len(long))',
        checks: [{ message: 'Print 371', outputEquals: '371' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does df["wait_days"] > 14 give you on its own?',
        options: [
          { text: 'The rows with long waits', why: 'Not yet: you put it inside df[ ] to keep those rows.' },
          { text: 'A column of True and False, one per row' },
          { text: 'One True or False', why: 'It checks every row at once.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Count the bookings at the Gumel clinic',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nprint(len(df[df["clinic"] == "Gumel"]))\n',
        hint: 'df[df["clinic"] == "Gumel"] (two equals signs)',
        checks: [{ message: 'Print 134', outputEquals: '134' }],
      },
      {
        kind: 'writeCode',
        prompt: 'Count the bookings matching Halima\'s rule: wait over 14 AND no reminder (sms_reminder == 0)',
        starter: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n',
        solution: 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\nrule = df[(df["wait_days"] > 14) & (df["sms_reminder"] == 0)]\nprint(len(rule))\n',
        hint: 'Each condition in its own brackets, joined with &',
        checks: [
          { message: 'Print 151', outputEquals: '151' },
          { message: 'Use &', codeIncludes: '&' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This crashes with a ValueError. Which line?',
        language: 'python',
        lines: ['import pandas as pd', 'df = pd.read_csv("appointments.csv")', 'rule = df[(df["wait_days"] > 14) and (df["sms_reminder"] == 0)]'],
        bug: 2,
        fix: 'rule = df[(df["wait_days"] > 14) & (df["sms_reminder"] == 0)]',
        explanation: 'pandas filters need &, not "and".',
      },
      {
        kind: 'fillBlank',
        prompt: 'Bookings at Yaba.',
        language: 'python',
        template: 'yaba = df[df["clinic"] [[1]] "Yaba"]',
        blanks: [['==']],
        distractors: ['=', 'is'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the filter to its count.',
        pairs: [
          ['df["wait_days"] > 14', '371 rows'],
          ['df["clinic"] == "Gumel"', '134 rows'],
          ['wait over 14 & no reminder', '151 rows'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Right for a pandas filter, or wrong?',
        groups: ['Right', 'Wrong'],
        items: [
          { text: '(a > 1) & (b == 0)', group: 0 },
          { text: 'a > 1 and b == 0', group: 1 },
          { text: 'df["clinic"] == "Yaba"', group: 0 },
          { text: 'df["clinic"] = "Yaba"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: '151 bookings match my rule. Is that a lot?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'It proves the rule works.', why: 'Matching the rule says nothing about whether they missed.' },
          { text: 'It\'s too few, give up.', why: 'The count alone tells us little. We need the no-show rate.' },
          { text: 'About 6% of 2,400. The useful question is how many of those 151 actually missed. That\'s grouping and rates: coming up.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'pandas filters join conditions with &. What is the & symbol called? (one word)',
        answers: ['ampersand'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Filtering is asking "show me only the ones that..." What filter would Bisi find most useful for her evening calls?',
    starters: ['Bisi would want...', 'The filter would be...'],
  },
  deepen: {
    title: 'Or: the | symbol',
    summary: 'df[(df["rain"] == 1) | (df["wait_days"] > 30)] keeps rows where EITHER is true. | means "or" in pandas filters.',
  },
  notes: 'appointments.csv: wait_days > 14: 371 rows; Gumel: 134; wait > 14 and sms_reminder == 0: 151 (151/2400 = 6.3%). pandas boolean indexing with & and |.',
};

export default lesson;
