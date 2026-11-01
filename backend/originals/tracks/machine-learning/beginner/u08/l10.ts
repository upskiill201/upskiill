import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F5, IMPORTS, MINUTES, PIPE, PIPE_IMPORTS, RAW, VAL_SPLIT } from './code';

const BASE = IMPORTS + DATA;

/** Chapter 8 · Lesson 10 — Checkpoint 2: gaps, new features, time, rain. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: new ingredients',
  summary: 'Filling gaps, building features from old columns, time features and the rain test. Check you can add a feature the honest way.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Fill gaps and build features', 'Test a feature against the agreed rule'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>The rule so far.</strong> A new feature must (1) be known before the appointment, (2) carry information the model doesn\'t already have, (3) come from a reason, not a search, and (4) save at least 20 minutes on the validation weeks. Rain passed. long_wait, week and hour didn\'t.</p>',
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: new ingredients.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'In the raw export, print the median of distance_km over the training weeks (blanks are skipped automatically)',
        starter: IMPORTS + RAW + 'train = raw[raw["week"] <= 11]\n',
        solution: IMPORTS + RAW + 'train = raw[raw["week"] <= 11]\nprint(train["distance_km"].median())\n',
        hint: 'train["distance_km"].median()',
        checks: [{ message: 'Print 10.0', outputEquals: '10.0' }],
      },
      {
        kind: 'mcq',
        prompt: 'Which feature fails "known before the appointment"?',
        options: [
          { text: 'rain (from the forecast)', why: 'Known the evening before.' },
          { text: 'monday', why: 'Known when booking.' },
          { text: 'confirmed_on_day' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate on dry days, rounded to 3 places',
        starter: BASE,
        solution: BASE + 'print(round(df[df["rain"] == 0]["no_show"].mean(), 3))\n',
        hint: 'Filter rain == 0',
        checks: [{ message: 'Print 0.172', outputEquals: '0.172' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Passed the rule, or not?',
        groups: ['Passed', 'Didn\'t pass'],
        items: [
          { text: 'rain', group: 0 },
          { text: 'long_wait', group: 1 },
          { text: 'week', group: 1 },
          { text: 'hour', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'On validation, print the minutes lost by the five-feature scaled model',
        starter: IMPORTS + PIPE_IMPORTS + DATA + VAL_SPLIT + MINUTES + F5 + PIPE,
        solution: IMPORTS + PIPE_IMPORTS + DATA + VAL_SPLIT + MINUTES + F5 + PIPE + 'model.fit(train[feats], train["no_show"])\nflags = (model.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\nprint(minutes(flags, val["no_show"]))\n',
        hint: 'Fit, flag at 0.2, minutes',
        checks: [{ message: 'Print 1245', outputEquals: '1245' }],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Next week\'s export will have blanks again. Do I need to clean it by hand?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, delete them every week.', why: 'Those patients still need predictions.' },
          { text: 'Not the blanks: the imputer fills them with the training median. Lesson 11 puts all the steps in one pipeline so nothing is forgotten.' },
          { text: 'Fill them with 0.', why: 'That says "next door".' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the feature to what happened.',
        pairs: [
          ['rain', 'Saved 20 validation minutes'],
          ['long_wait', 'Repeated wait_days: saved 0'],
          ['week', 'Never repeats: made it worse'],
          ['Saturday', 'Found by searching: not tested'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Filling gaps.',
        language: 'python',
        template: 'imputer = SimpleImputer(strategy="median").fit([[1]][["distance_km"]])\nfilled = imputer.[[2]](raw[["distance_km"]])',
        blanks: [['train'], ['transform']],
        distractors: ['test', 'predict'],
      },
      {
        kind: 'findBug',
        prompt: 'Which feature plan breaks the rule?',
        lines: ['Bisi suspects Mondays; test monday.', 'Halima suspects rain; test rain.', 'Try all 22 one-hot columns; keep whichever win.'],
        bug: 2,
        fix: 'Test ideas with a reason, one at a time.',
        explanation: 'Keeping whatever wins a search is data dredging.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did rain save on validation?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which part of Halima\'s rule would be hardest to stick to under pressure?',
    starters: ['The hardest part...'],
  },
  notes: 'Checkpoint for Chapter 8 lessons 6-9. Raw training median distance 10.0. Dry-day no-show 0.172. Validation five features 1245.',
};

export default lesson;
