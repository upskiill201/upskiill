import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, IMPORTS, PIPE8, PIPE_IMPORTS, SPLIT } from './code';

/** Chapter 8 · Lesson 15 — Checkpoint 3: pipelines, leaks, too many features. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: safe preparation',
  summary: 'Pipelines, fitting on training rows only, too many features and features to leave out. Check you can prepare data without fooling yourself.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Build and fit a pipeline safely', 'Reject leaks, IDs and memorising'],
  learn: [
    {
      kind: 'story',
      title: 'The review',
      beats: [
        { speaker: 'miracle', text: 'Before v0.8, I review the preparation. Three questions: does anything learn from week 12? Is anything memorised? Is anything a leak?' },
        { speaker: 'halima', text: 'It\'s all in one pipeline, fitted on training weeks. No IDs. No confirmed_on_day.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: safe preparation.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit v0.8\'s pipeline on the training weeks with the four original features and print the imputer\'s fill value for distance_km',
        starter: IMPORTS + PIPE_IMPORTS + DATA + SPLIT + 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\n' + PIPE8 + 'model.fit(train[feats], train["no_show"])\n',
        solution: IMPORTS + PIPE_IMPORTS + DATA + SPLIT + 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\n' + PIPE8 + 'model.fit(train[feats], train["no_show"])\nprint(model.named_steps["simpleimputer"].statistics_[1])\n',
        hint: 'statistics_[1] is distance_km, the second feature',
        checks: [{ message: 'Print 10.0', outputEquals: '10.0' }],
      },
      {
        kind: 'mcq',
        prompt: 'What guarantees the scaler never learns from week 12?',
        options: [
          { text: 'It\'s inside a pipeline that\'s only fitted on the training rows' },
          { text: 'Scalers can\'t see test data', why: 'They see whatever you fit them on.' },
          { text: 'Rounding', why: 'It\'s about what it\'s fitted on.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many training rows there are in weeks 1 to 11',
        starter: IMPORTS + DATA + SPLIT,
        solution: IMPORTS + DATA + SPLIT + 'print(len(train))\n',
        hint: 'len(train)',
        checks: [{ message: 'Print 2200', outputEquals: '2200' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep or leave out?',
        groups: ['Keep', 'Leave out'],
        items: [
          { text: 'rain (forecast)', group: 0 },
          { text: 'sms_reminder', group: 0 },
          { text: 'confirmed_on_day', group: 1 },
          { text: 'appointment_id', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'I scaled everything first, then split. Same result, right?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Exactly the same.', why: 'The averages differ (10.69 vs 10.73).' },
          { text: 'Scaling is optional.', why: 'The point is where it learns.' },
          { text: 'Nearly the same here, but week 12 helped set the average. Put the scaler in the pipeline and fit on training weeks: same effort, no leak.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to its fix.',
        pairs: [
          ['Scaler fitted on all weeks', 'Fit inside a pipeline on training'],
          ['Blank distances', 'SimpleImputer, median'],
          ['1,800 ID columns', 'Drop the ID'],
          ['Leak column', 'Leave it out, write down why'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Safe fitting.',
        template: 'Every step learns from the [[1]] rows, then is applied to [[2]] and test.',
        blanks: [['training'], ['validation']],
        distractors: ['test', 'all'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line memorises?',
        language: 'python',
        lines: ['feats = ["wait_days", "rain", "monday"]', 'cats = ["appointment_id"]', 'model.fit(train[feats], train["no_show"])'],
        bug: 1,
        fix: 'cats = []',
        explanation: 'One-hot IDs can only be memorised.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Training accuracy with one-hot IDs was 100%. What was validation, roughly? (a percentage)',
        answers: ['80.5', '80.5%', '80', '80%', '81'],
        placeholder: 'A percentage',
      },
      {
        kind: 'mcq',
        prompt: 'Review, lesson 4: why scale before comparing coefficients?',
        options: [
          { text: 'To make the model faster', why: 'It\'s about fair comparison.' },
          { text: 'So every feature is measured in the same units: spreads from average' },
          { text: 'To remove leaks', why: 'Scaling can even cause one, if fitted wrongly.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which of Miracle\'s three review questions would you add to your own work?',
    starters: ['I\'d ask...'],
  },
  notes: 'Checkpoint for Chapter 8 lessons 11-14. Imputer median distance 10.0 (weeks 1-11). 2,200 training rows.',
};

export default lesson;
