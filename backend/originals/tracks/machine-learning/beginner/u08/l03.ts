import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, IMPORTS } from './code';

const BASE = IMPORTS + DATA;

/** Chapter 8 · Lesson 3 — One-hot encoding. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'One-hot encoding',
  summary: 'One yes/no column for every value of a category: that\'s one-hot encoding. pandas does it in one line. Tap through what comes out, and why four categories become 22 columns.',
  minutes: 11,
  outcomes: [
    'One-hot encode a category with pandas',
    'Read one-hot columns',
    'Count how many columns encoding creates',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'visit_type, one-hot',
      text: 'pd.get_dummies turns visit_type into four columns: Antenatal, Check-up, Follow-up and Vaccination. Each row has a single 1, in the column of its visit type, and 0 everywhere else. Do the same to clinic, weekday and age group and the four category columns become 22.',
      hotspots: [
        { phrase: 'pd.get_dummies', note: 'pandas\' one-line one-hot encoder. scikit-learn\'s version is OneHotEncoder, used in pipelines.' },
        { phrase: 'four columns', note: 'One per value. No order, no fake distances.' },
        { phrase: 'a single 1', note: 'That\'s why it\'s called "one-hot": exactly one column is "on".' },
        { phrase: 'become 22', note: '8 clinics + 6 weekdays + 4 visit types + 4 age groups. Every new column is another thing the model must learn from the same 2,200 training rows.' },
      ],
    },
    {
      kind: 'check',
      question: 'A Follow-up booking, one-hot encoded. Which column is 1?',
      options: ['All four', 'Follow-up', 'None'],
      answer: 1,
      explanation: 'Exactly one column is on.',
    },
    {
      kind: 'tryIt',
      title: 'get_dummies',
      caption: 'One category in, four columns out.',
      code: BASE + '\nhot = pd.get_dummies(df["visit_type"]).astype(int)\nprint(df["visit_type"].head(3).tolist())\nprint(hot.head(3))\nprint("Columns:", hot.shape[1])\n',
      challenge: 'Try df[["visit_type", "weekday"]] instead.',
    },
  ],
  apply: {
    scenario: 'One-hot encoding.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'One-hot encode weekday and print how many columns it makes',
        starter: BASE,
        solution: BASE + 'hot = pd.get_dummies(df["weekday"])\nprint(hot.shape[1])\n',
        hint: 'pd.get_dummies(df["weekday"]).shape[1]',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is it called one-hot?',
        options: [
          { text: 'It runs fast', why: 'It\'s about the 1.' },
          { text: 'It uses one column', why: 'It makes one column per value.' },
          { text: 'In each row, exactly one of the new columns is 1 ("on")' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'One-hot encode the four category columns together and print the number of columns',
        starter: BASE + 'cats = df[["visit_type", "age_group", "weekday", "clinic"]]\n',
        solution: BASE + 'cats = df[["visit_type", "age_group", "weekday", "clinic"]]\nprint(pd.get_dummies(cats).shape[1])\n',
        hint: 'pd.get_dummies(cats).shape[1]',
        checks: [{ message: 'Print 22', outputEquals: '22' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Follow-up booking: 1 or 0?',
        groups: ['1', '0'],
        items: [
          { text: 'visit_type_Follow-up', group: 0 },
          { text: 'visit_type_Antenatal', group: 1 },
          { text: 'visit_type_Vaccination', group: 1 },
          { text: 'visit_type_Check-up', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'If I one-hot encode appointment_id, how many columns is that?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'One.', why: 'One per value, and every ID is different.' },
          { text: '2,400: one per booking. Each would describe exactly one patient, so the model would just memorise. Lesson 13 shows what happens.' },
          { text: 'Four.', why: 'That\'s visit_type.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the category to its number of one-hot columns.',
        pairs: [
          ['visit_type', '4'],
          ['weekday', '6'],
          ['clinic', '8'],
          ['All four categories', '22'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'One-hot in pandas.',
        language: 'python',
        template: 'hot = pd.[[1]](df["visit_type"])\nprint(hot.[[2]])',
        blanks: [['get_dummies'], ['shape']],
        distractors: ['cut', 'size_of'],
      },
      {
        kind: 'findBug',
        prompt: 'Which row can\'t be a one-hot row for visit_type?',
        lines: ['Antenatal 1, Check-up 0, Follow-up 0, Vaccination 0', 'Antenatal 0, Check-up 0, Follow-up 1, Vaccination 0', 'Antenatal 1, Check-up 0, Follow-up 1, Vaccination 0'],
        bug: 2,
        fix: 'Antenatal 1, Check-up 0, Follow-up 0, Vaccination 0',
        explanation: 'A booking has one visit type, so only one column can be 1.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many clinics are there (one-hot columns for clinic)?',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the cost of one-hot encoding many categories?',
        options: [
          { text: 'It deletes rows', why: 'It adds columns.' },
          { text: 'None at all', why: 'More columns need more data.' },
          { text: 'Lots of columns for the model to learn from the same rows' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Describe your favourite colour as a one-hot row. How many columns would you need?',
    starters: ['My row would be...'],
  },
  deepen: {
    title: 'Dropping one column',
    summary: 'Some people drop one one-hot column per category (drop_first=True), because the last can be worked out from the rest. For logistic regression in scikit-learn, it rarely matters in practice.',
  },
  notes: 'One-hot: visit_type 4, weekday 6, clinic 8, age_group 4; all four together 22 columns.',
};

export default lesson;
