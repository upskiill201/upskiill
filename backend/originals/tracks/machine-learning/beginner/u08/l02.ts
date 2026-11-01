import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, IMPORTS } from './code';

const BASE = IMPORTS + DATA;

/** Chapter 8 · Lesson 2 — Turning categories into numbers. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Turning categories into numbers',
  summary: 'Logistic regression only reads numbers. "Vaccination", "18-34" and "Mon" are words. Six steps to turn a category into numbers the model can use, and a trap to avoid.',
  minutes: 11,
  outcomes: [
    'Explain why models need numbers',
    'Turn one category into a yes/no column',
    'Avoid giving categories fake numbers',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Words into numbers',
      steps: [
        { title: '1. Spot the categories', body: 'Columns of words with a few fixed values: clinic, weekday, visit_type, age_group.' },
        { title: '2. Why the model can\'t read them', body: 'Logistic regression multiplies each feature by a number. You can\'t multiply "Vaccination".' },
        { title: '3. The trap: numbering them', body: 'Antenatal = 1, Check-up = 2, Follow-up = 3, Vaccination = 4 tells the model a vaccination is "four times" an antenatal visit. That order is made up.' },
        { title: '4. A yes/no column', body: 'Ask one question per value instead: "is it a vaccination?" 1 for yes, 0 for no.', code: 'df["vaccination"] = (df["visit_type"] == "Vaccination").astype(int)', language: 'python' },
        { title: '5. Check it', body: '405 of 2,400 bookings are vaccinations. The new column should add up to 405.' },
        { title: '6. One column per value', body: 'Doing this for every value is called one-hot encoding: next lesson.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A yes/no column',
      caption: 'From a word to a number.',
      code: BASE + '\ndf["vaccination"] = (df["visit_type"] == "Vaccination").astype(int)\nprint(df[["visit_type", "vaccination"]].head())\nprint("Vaccinations:", df["vaccination"].sum())\nprint(df.groupby("vaccination")["no_show"].mean().round(3))\n',
      challenge: 'Bisi says vaccinations hardly ever miss. Does the last line agree?',
    },
  ],
  apply: {
    scenario: 'Turning categories into numbers.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make a yes/no column for Monday appointments and print how many there are',
        starter: BASE,
        solution: BASE + 'df["monday"] = (df["weekday"] == "Mon").astype(int)\nprint(df["monday"].sum())\n',
        hint: '(df["weekday"] == "Mon").astype(int)',
        checks: [{ message: 'Print 409', outputEquals: '409' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why not code visit types as 1, 2, 3, 4?',
        options: [
          { text: 'Numbers are too big', why: 'Size isn\'t the problem; meaning is.' },
          { text: 'It\'s fine', why: 'The model would treat 4 as "more" than 1.' },
          { text: 'It invents an order and distances between types that don\'t exist' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate for vaccinations, rounded to 3 places',
        starter: BASE + 'vacc = df[df["visit_type"] == "Vaccination"]\n',
        solution: BASE + 'vacc = df[df["visit_type"] == "Vaccination"]\nprint(round(vacc["no_show"].mean(), 3))\n',
        hint: 'vacc["no_show"].mean()',
        checks: [{ message: 'Print 0.183', outputEquals: '0.183' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Category or number?',
        groups: ['Category (words)', 'Already a number'],
        items: [
          { text: 'visit_type', group: 0 },
          { text: 'weekday', group: 0 },
          { text: 'wait_days', group: 1 },
          { text: 'distance_km', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Vaccinations hardly ever miss. Everyone knows that.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'You\'re right, I\'ll add it.', why: 'Check the data first.' },
          { text: 'I checked: 18.3% of vaccinations miss, same as everyone else. Here, the data doesn\'t back that one up.' },
          { text: 'Nurses are always wrong.', why: 'Some hunches hold up; this one doesn\'t, here.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the column to its yes/no version.',
        pairs: [
          ['weekday', 'monday'],
          ['visit_type', 'vaccination'],
          ['age_group', 'young_adult (18-34)'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A yes/no column.',
        language: 'python',
        template: 'df["monday"] = (df["weekday"] [[1]] "Mon").[[2]](int)',
        blanks: [['=='], ['astype']],
        distractors: ['=', 'round'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gives categories fake numbers?',
        language: 'python',
        lines: ['df["vaccination"] = (df["visit_type"] == "Vaccination").astype(int)', 'df["visit_code"] = df["visit_type"].map({"Antenatal": 1, "Check-up": 2, "Follow-up": 3, "Vaccination": 4})', 'print(df["vaccination"].sum())'],
        bug: 1,
        fix: 'Use one yes/no column per visit type instead.',
        explanation: '1 to 4 invents an order the visit types don\'t have.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many vaccination bookings are there in appointments.csv?',
        answers: ['405'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Is age_group (0-17, 18-34, 35-59, 60+) different from visit_type?',
        options: [
          { text: 'Yes: age groups do have an order, but the gaps between them still aren\'t equal, so yes/no columns are safest' },
          { text: 'No, it\'s just words', why: 'It has a natural order.' },
          { text: 'It\'s already a number', why: 'It\'s text like "18-34".' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What category in your life gets wrongly treated like a number (like shirt sizes or star ratings)?',
    starters: ['For example...'],
  },
  deepen: {
    title: 'Ordinal categories',
    summary: 'Categories with a real order, like small/medium/large, are called ordinal. Sometimes numbering them is fine. When in doubt, yes/no columns make fewer assumptions.',
  },
  notes: 'appointments.csv: 405 vaccinations (no-show 0.183, same as others 0.183); 409 Monday bookings.',
};

export default lesson;
