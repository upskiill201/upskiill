import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LOAD } from './code';

/** Chapter 4 · Lesson 7 — Data leakage, explained. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Data leakage',
  summary: 'Leakage is when a model gets information during training that it won\'t have when it\'s really used. It\'s the most common way beginners, and some experts, fool themselves. Here\'s how it happens, and how to catch it.',
  minutes: 12,
  outcomes: [
    'Define data leakage in plain words',
    'Name the common ways it sneaks in',
    'Check a column for a suspiciously perfect link to the answer',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'When the answer leaks in',
      html: '<p><strong>Data leakage</strong> happens when a model learns from information it won\'t have at the moment it\'s used. It scores brilliantly in testing, then fails in real life.</p><p>Chidi\'s column is the classic kind: <strong>a column filled in after the answer is known</strong>. confirmed_on_day is written by reception once the patient has turned up or not. Of the bookings where it\'s 0, 88.7% were no-shows. Where it\'s 1, just 0.4%. It doesn\'t predict the answer; it nearly <em>is</em> the answer.</p><p>Other ways leakage sneaks in:</p><ul><li><strong>The answer itself as a feature.</strong> Put no_show in the feature list by mistake and the predictor gets 100%.</li><li><strong>Test bookings in the training set.</strong> Chidi\'s 50 out of 50 in Chapter 3.</li><li><strong>Rulers made from all the data.</strong> Scaling with the test set\'s min and max lets a little of it in.</li><li><strong>The same booking twice.</strong> Duplicates that land on both sides of a split (lesson 11).</li><li><strong>The future teaching the past.</strong> Random splits that let week 12 help predict week 3 (lesson 9).</li></ul><p><strong>How to catch it:</strong></p><ul><li>For every column, ask: <em>would I know this the evening before the appointment?</em></li><li>Be suspicious of any jump that looks too good.</li><li>Check each column\'s no-show rate. If one value means "almost always missed" and the other "almost never", find out why.</li></ul>',
    },
    {
      kind: 'check',
      question: 'Which is data leakage?',
      options: ['Training with a column that\'s filled in after the appointment', 'Training on weeks 1 to 11', 'Using four features instead of three'],
      answer: 0,
      explanation: 'The model learns from something it won\'t have when it\'s used.',
    },
    {
      kind: 'tryIt',
      title: 'Too perfect',
      caption: 'The no-show rate for each value of the column.',
      code: LOAD + '\nprint(df.groupby("confirmed_on_day")["no_show"].mean())\nprint()\nprint(df.groupby("sms_reminder")["no_show"].mean())\n',
      challenge: 'Compare the two. Which gap is a real pattern, and which is too perfect?',
    },
  ],
  apply: {
    scenario: 'Catching leaks.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate when confirmed_on_day is 0, rounded to 3 places',
        starter: LOAD + 'rates = df.groupby("confirmed_on_day")["no_show"].mean()\n',
        solution: LOAD + 'rates = df.groupby("confirmed_on_day")["no_show"].mean()\nprint(round(rates[0], 3))\n',
        hint: 'print(round(rates[0], 3))',
        checks: [{ message: 'Print 0.887', outputEquals: '0.887' }],
      },
      {
        kind: 'mcq',
        prompt: 'In plain words, what is data leakage?',
        options: [
          { text: 'Data getting lost', why: 'It\'s the opposite: extra information getting in.' },
          { text: 'A slow model', why: 'Speed has nothing to do with it.' },
          { text: 'The model learns from information it won\'t have when it\'s really used' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Leak, or fine?',
        groups: ['Leak', 'Fine'],
        items: [
          { text: 'no_show in the feature list', group: 0 },
          { text: 'sms_reminder as a feature', group: 1 },
          { text: 'Scaling with test data included', group: 0 },
          { text: 'Learning from weeks 1 to 11', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Now print the no-show rate when confirmed_on_day is 1, rounded to 3 places',
        starter: LOAD + 'rates = df.groupby("confirmed_on_day")["no_show"].mean()\n',
        solution: LOAD + 'rates = df.groupby("confirmed_on_day")["no_show"].mean()\nprint(round(rates[1], 3))\n',
        hint: 'rates[1]',
        checks: [{ message: 'Print 0.004', outputEquals: '0.004' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'sms_reminder also changes the no-show rate. Is that a leak too?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, drop every column that changes the rate.', why: 'Then the model has nothing to learn from.' },
          { text: 'No: we know about the reminder before the appointment, and the gap is a real pattern (26% vs 12%). confirmed_on_day is 89% vs 0.4%, and written afterwards.' },
          { text: 'Only if it\'s a number.', why: 'Timing decides, not type.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the leak to an example.',
        pairs: [
          ['Column from after', 'confirmed_on_day'],
          ['The answer itself', 'no_show in the features'],
          ['Test in training', 'Chidi\'s 50 out of 50'],
          ['Shared ruler', 'Scaling with all the data'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The question for every column.',
        template: 'Would I know this the [[1]] before the [[2]]?',
        blanks: [['evening'], ['appointment']],
        distractors: ['week', 'export'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line gives the predictor the answer?',
        language: 'python',
        lines: ['feats = ["wait_days", "distance_km", "no_show"]', 'train = df[df["week"] <= 11]', 'test = df[df["week"] == 12]'],
        bug: 0,
        fix: 'feats = ["wait_days", "distance_km"]',
        explanation: 'no_show is the answer. As a feature, it makes the score 100% and meaningless.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'With no_show itself as a feature, what share of week 12 would the predictor get right? (A percent.)',
        answers: ['100', '100%'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'What usually gives a leak away first?',
        options: [
          { text: 'A score that jumps much higher than expected' },
          { text: 'An error message', why: 'Leaks run without errors. That\'s what makes them sneaky.' },
          { text: 'A slow run', why: 'Leaks don\'t slow anything down.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Pick a prediction you know about (exam results, football scores, weather). What information would be a leak there?',
    starters: ['The prediction is...', 'A leak would be...'],
  },
  deepen: {
    title: 'Leakage in the wild',
    summary: 'Leakage is a well-known cause of models that look strong in research and disappoint in practice, including some health models. Checking when each column becomes known is one of the cheapest and most valuable checks in machine learning.',
  },
  notes: 'appointments.csv (2,400 rows): no-show rate confirmed_on_day 0 = 0.887 (487 rows), 1 = 0.004 (1,913 rows); sms_reminder 0 = 0.262, 1 = 0.124. With no_show as a feature, week 12 accuracy 1.0, top 20 20. confirmed_on_day matches the label 97.4%.',
};

export default lesson;
