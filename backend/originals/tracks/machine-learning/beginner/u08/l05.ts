import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F4, IMPORTS, PIPE, PIPE_IMPORTS, SPLIT } from './code';

const BASE = IMPORTS + DATA;

/** Chapter 8 · Lesson 5 — Checkpoint 1: features, categories, one-hot, scaling. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: words and rulers',
  summary: 'Features that matter, categories as numbers, one-hot columns and scaling. Check you can prepare columns the model can actually use.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Encode categories correctly', 'Scale numbers and read scaled weights'],
  learn: [
    {
      kind: 'compare',
      title: 'Two kinds of column',
      before: {
        label: 'Categories (words)',
        text: 'visit_type, weekday, clinic, age_group\nNeed: yes/no or one-hot columns\nNever: fake numbers like 1, 2, 3, 4',
      },
      after: {
        label: 'Numbers',
        text: 'wait_days, distance_km, previous_no_shows\nNeed: scaling, to compare fairly\nStandardScaler: average 0, spread 1',
      },
      notes: ['Words need encoding before the model can read them; numbers need scaling before their weights can be compared.'],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: words and rulers.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'One-hot encode age_group and print the column names as a list',
        starter: BASE,
        solution: BASE + 'print(pd.get_dummies(df["age_group"]).columns.tolist())\n',
        hint: 'pd.get_dummies(df["age_group"]).columns.tolist()',
        checks: [{ message: 'Print the four age groups', outputEquals: "['0-17', '18-34', '35-59', '60+']" }],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the right way to give the model visit_type?',
        options: [
          { text: 'Antenatal 1 to Vaccination 4', why: 'That invents an order.' },
          { text: 'One yes/no column per visit type' },
          { text: 'As text', why: 'The model only reads numbers.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate for 18-34 year olds, rounded to 3 places',
        starter: BASE + 'young = df[df["age_group"] == "18-34"]\n',
        solution: BASE + 'young = df[df["age_group"] == "18-34"]\nprint(round(young["no_show"].mean(), 3))\n',
        hint: 'young["no_show"].mean()',
        checks: [{ message: 'Print 0.213', outputEquals: '0.213' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs encoding or scaling?',
        groups: ['Encoding', 'Scaling'],
        items: [
          { text: 'clinic', group: 0 },
          { text: 'age_group', group: 0 },
          { text: 'wait_days', group: 1 },
          { text: 'distance_km', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Train the scaled pipeline and print the sms_reminder coefficient, rounded to 2 places',
        starter: IMPORTS + PIPE_IMPORTS + DATA + F4 + SPLIT + PIPE + 'model.fit(train[feats], train["no_show"])\n',
        solution: IMPORTS + PIPE_IMPORTS + DATA + F4 + SPLIT + PIPE + 'model.fit(train[feats], train["no_show"])\nprint(round(model[-1].coef_[0][3], 2))\n',
        hint: 'sms_reminder is the fourth feature: index 3',
        checks: [{ message: 'Print -0.49', outputEquals: '-0.49' }],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Can I add the 22 one-hot columns straight into the model?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, more columns is always better.', why: 'More columns need more data.' },
          { text: 'No, one-hot is banned.', why: 'It\'s the right encoding.' },
          { text: 'You can, but each column must earn its place on validation. We test ideas one at a time, starting with the ones that make sense on the floor.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to its job.',
        pairs: [
          ['pd.get_dummies', 'One-hot columns'],
          ['StandardScaler', 'Average 0, spread 1'],
          ['== "Mon"', 'One yes/no column'],
          ['make_pipeline', 'Steps in order'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Two preparations.',
        template: 'Categories get [[1]] encoded; numbers get [[2]].',
        blanks: [['one-hot'], ['scaled']],
        distractors: ['deleted', 'rounded'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step is wrong?',
        lines: ['Weekday becomes six yes/no columns.', 'wait_days is scaled to average 0.', 'Clinic is coded 1 to 8 by alphabetical order.'],
        bug: 2,
        fix: 'Clinic becomes eight yes/no columns.',
        explanation: 'Alphabetical order means nothing to no-shows.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'After scaling, which of the four features has the biggest weight?',
        answers: ['previous_no_shows', 'previous no-shows', 'past misses', 'previous no shows'],
        placeholder: 'A feature',
      },
    ],
  },
  reflect: {
    prompt: 'Which was harder to get your head round: one-hot encoding or scaling?',
    starters: ['I found...'],
  },
  notes: 'Checkpoint for Chapter 8 lessons 1-4. age_group one-hot columns [0-17, 18-34, 35-59, 60+]; 18-34 no-show 0.213. Scaled sms coef -0.49.',
};

export default lesson;
