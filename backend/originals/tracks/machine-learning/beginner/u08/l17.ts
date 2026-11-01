import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, IMPORTS, PIPE_IMPORTS, RAW, SPLIT } from './code';

/** Chapter 8 · Lesson 17 — Common feature bugs. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common feature bugs',
  summary: 'Encoding a small batch and getting fewer columns. A clinic name with a stray space. Columns passed in a different order. Three cards on the feature bugs that run without errors.',
  minutes: 12,
  outcomes: [
    'Spot one-hot column mismatches',
    'Catch messy text before encoding',
    'Keep feature order consistent',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: the shrinking one-hot.</strong> pd.get_dummies only makes columns for values it sees. Encode the first 5 bookings of week 12 and you get 4 clinic columns, not 8. The model trained on 8 columns now gets 4 in a different order. Fix: use OneHotEncoder inside the pipeline, fitted on training, with <code>handle_unknown="ignore"</code> for brand-new values.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: messy text.</strong> In the raw export, "Kano City", "kano city" and "Kano City " are three different values to an encoder. One clinic becomes three columns, each with fewer rows. Fix: clean text first (strip spaces, fix case), as in Chapter 2.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: the shuffled columns.</strong> A model learns "the third number is past misses". Pass the columns in a different order and it reads distance as past misses, with no error. Fix: always select columns by name with the same <code>feats</code> list for fit and predict.</p>',
    },
    {
      kind: 'check',
      question: 'You get-dummies 5 bookings and see 4 clinic columns. What went wrong?',
      options: ['pandas lost 4 clinics', 'Only 4 clinics appear in those 5 rows', 'Clinics can\'t be encoded'],
      answer: 1,
      explanation: 'get_dummies only sees the values in front of it.',
    },
    {
      kind: 'tryIt',
      title: 'Three Kano Cities',
      caption: 'How messy text multiplies categories.',
      code: IMPORTS + RAW + '\nprint("Clinic values, raw:", raw["clinic"].nunique())\nclean = raw["clinic"].str.strip().str.title()\nprint("After cleaning:", clean.nunique())\n',
      challenge: 'Print raw["clinic"].unique() to see the messy versions.',
    },
  ],
  apply: {
    scenario: 'Common feature bugs.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'One-hot encode the clinic of the first 5 week-12 bookings and print how many columns you get',
        starter: IMPORTS + DATA + SPLIT + 'small = test.head(5)\n',
        solution: IMPORTS + DATA + SPLIT + 'small = test.head(5)\nprint(pd.get_dummies(small["clinic"]).shape[1])\n',
        hint: 'pd.get_dummies(small["clinic"]).shape[1]',
        checks: [{ message: 'Print 4', outputEquals: '4' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the shrinking one-hot dangerous?',
        options: [
          { text: 'It\'s slow', why: 'Speed isn\'t the problem.' },
          { text: 'It deletes rows', why: 'It changes columns.' },
          { text: 'The model expects the training columns; a different set silently misreads the data' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many different clinic values the raw export has before cleaning',
        starter: IMPORTS + RAW,
        solution: IMPORTS + RAW + 'print(raw["clinic"].nunique())\n',
        hint: 'raw["clinic"].nunique()',
        checks: [{ message: 'Print 21', outputEquals: '21' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Bug or fix?',
        groups: ['Bug', 'Fix'],
        items: [
          { text: 'get_dummies on each new batch', group: 0 },
          { text: 'OneHotEncoder fitted on training', group: 1 },
          { text: '"Kano City " with a space', group: 0 },
          { text: 'Same feats list for fit and predict', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'A brand-new clinic opens next month. Will the encoder crash?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'With handle_unknown="ignore", it gives the new clinic all zeros instead of crashing. The model treats it like an average clinic until we retrain.' },
          { text: 'Yes, always.', why: 'handle_unknown="ignore" prevents it.' },
          { text: 'It will guess a clinic.', why: 'It sets all clinic columns to 0.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the bug to its fix.',
        pairs: [
          ['Fewer one-hot columns in a batch', 'OneHotEncoder in the pipeline'],
          ['"kano city" vs "Kano City"', 'Strip and fix case first'],
          ['Columns in a different order', 'Select by the same feats list'],
          ['New category next month', 'handle_unknown="ignore"'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Cleaning text.',
        language: 'python',
        template: 'raw["clinic"] = raw["clinic"].str.[[1]]().str.[[2]]()',
        blanks: [['strip'], ['title']],
        distractors: ['split', 'sum'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line feeds the model columns in the wrong order?',
        language: 'python',
        lines: ['feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]', 'model.fit(train[feats], train["no_show"])', 'p = model.predict_proba(test[["distance_km", "wait_days", "previous_no_shows", "sms_reminder"]])'],
        bug: 2,
        fix: 'p = model.predict_proba(test[feats])',
        explanation: 'Use the same feats list for predicting.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many clinic columns should there be after cleaning?',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What do these three bugs have in common?',
        options: [
          { text: 'They crash the code', why: 'That would be easier to catch.' },
          { text: 'They only affect trees', why: 'They affect any model.' },
          { text: 'They run without errors and quietly give wrong predictions' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Where in your own spreadsheets could "the same thing typed three ways" cause trouble?',
    starters: ['In my...'],
  },
  deepen: {
    title: 'Data validation',
    summary: 'Professional pipelines often start with checks: expected columns, allowed values, ranges. If next week\'s file has a surprise, it stops loudly instead of predicting quietly.',
  },
  notes: 'Week 12 first 5 bookings: clinics Ikeja, Lekki, Gumel, Surulere, Lekki -> 4 one-hot columns. Raw export clinic names include lower/upper/trailing-space variants; cleaned back to 8.',
};

export default lesson;
