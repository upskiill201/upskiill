import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F6, IMPORTS, MONDAY, PIPE8, PIPE_IMPORTS, SPLIT } from './code';

const FIT = IMPORTS + PIPE_IMPORTS + DATA + MONDAY + SPLIT + F6 + PIPE8 + 'model.fit(train[feats], train["no_show"])\n';

/** Chapter 8 · Lesson 18 — Reading a pipeline. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reading a pipeline',
  summary: 'A fitted pipeline keeps everything it learned: fill values, averages, weights. Miracle asks Halima to read v0.8 back to her before it ships. Tap through what each part says.',
  minutes: 12,
  outcomes: [
    'Read what each fitted step learned',
    'Pull coefficients out of a pipeline',
    'Explain v0.8 in plain words',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'v0.8, fitted on weeks 1 to 11',
      text: 'The imputer would fill a blank distance with 10 km. The scaler learned an average wait of 7.42 days. In the regression, past misses has the largest weight, 0.63, the reminder pulls risk down at −0.49, rain adds 0.18 and Monday adds 0.12.',
      hotspots: [
        { phrase: 'fill a blank distance with 10 km', note: 'named_steps["simpleimputer"].statistics_ holds one fill value per feature: the training medians.' },
        { phrase: 'average wait of 7.42 days', note: 'named_steps["standardscaler"].mean_: what counts as "0" after scaling.' },
        { phrase: 'past misses has the largest weight, 0.63', note: 'Scaled coefficients compare fairly: past misses is still the strongest clue.' },
        { phrase: 'the reminder pulls risk down at −0.49', note: 'Negative: a reminder text makes a no-show less likely.' },
        { phrase: 'rain adds 0.18 and Monday adds 0.12', note: 'The two new ingredients. Small, as their 20-minute gains suggested.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Reading v0.8',
      caption: 'Everything the pipeline learned.',
      code: FIT + '\nprint("Fill values:", model.named_steps["simpleimputer"].statistics_)\nprint("Averages:", model.named_steps["standardscaler"].mean_.round(2))\nfor name, c in zip(feats, model[-1].coef_[0]):\n    print(name, round(c, 2))\n',
      challenge: 'Which feature pushes risk down?',
    },
  ],
  apply: {
    scenario: 'Reading a pipeline.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print v0.8\'s coefficient for rain, rounded to 2 places',
        starter: FIT,
        solution: FIT + 'print(round(model[-1].coef_[0][4], 2))\n',
        hint: 'rain is the fifth feature: index 4',
        checks: [{ message: 'Print 0.18', outputEquals: '0.18' }],
      },
      {
        kind: 'mcq',
        prompt: 'Where are the imputer\'s fill values stored?',
        options: [
          { text: 'model.coef_', why: 'That\'s on the regression step, model[-1].' },
          { text: 'model.named_steps["simpleimputer"].statistics_' },
          { text: 'Nowhere: it forgets', why: 'Fitted steps keep what they learned.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the number of features the scaler was fitted on',
        starter: FIT,
        solution: FIT + 'print(model.named_steps["standardscaler"].n_features_in_)\n',
        hint: 'n_features_in_',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Pushes risk up or down?',
        groups: ['Up', 'Down'],
        items: [
          { text: 'previous_no_shows', group: 0 },
          { text: 'rain', group: 0 },
          { text: 'monday', group: 0 },
          { text: 'sms_reminder', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Read v0.8 back to me in one sentence.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Fill blank distances with 10 km, scale, then score: past misses push risk up most, a reminder pulls it down, rain and Mondays add a little.' },
          { text: 'It\'s a pipeline.', why: 'Say what it learned.' },
          { text: 'It\'s 76% accurate.', why: 'That\'s not what it does.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the feature to its v0.8 weight.',
        pairs: [
          ['previous_no_shows', '0.63'],
          ['sms_reminder', '−0.49'],
          ['rain', '0.18'],
          ['monday', '0.12'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Reaching inside.',
        language: 'python',
        template: 'scaler = model.[[1]]["standardscaler"]\nweights = model[[[2]]].coef_[0]',
        blanks: [['named_steps'], ['-1']],
        distractors: ['steps_', '0'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line reads the pipeline wrongly?',
        language: 'python',
        lines: ['print(model.named_steps["simpleimputer"].statistics_)', 'print(model[-1].coef_[0])', 'print(model.coef_)'],
        bug: 2,
        fix: 'print(model[-1].coef_)',
        explanation: 'The pipeline itself has no coef_; the regression step does.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What fill value would v0.8 use for a blank distance (in km)?',
        answers: ['10', '10.0', '10 km'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why read a pipeline back before shipping it?',
        options: [
          { text: 'To make it faster', why: 'It\'s a check, not a speed-up.' },
          { text: 'To check every step learned something sensible, and that you can explain it' },
          { text: 'scikit-learn requires it', why: 'It\'s a good habit.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Could you explain v0.8 to Bisi in two sentences? Try it.',
    starters: ['v0.8...'],
  },
  deepen: {
    title: 'Saving a pipeline',
    summary: 'A fitted pipeline can be saved to a file (with joblib) and loaded next week, so the clinic uses exactly what was tested. Retraining is then a deliberate decision, not an accident.',
  },
  notes: 'v0.8 pipeline fitted on weeks 1-11, six features: imputer medians [5.0, 10.0, 0.0, 1.0, 0.0, 0.0]; scaled coefs wait 0.385, distance 0.35, previous 0.626, sms -0.49, rain 0.184, monday 0.119.',
};

export default lesson;
