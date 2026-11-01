import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { FOREST, TEST_BASE } from './code';

const FIT = TEST_BASE + FOREST + 'forest.fit(train[feats], train["no_show"])\n';

/** Chapter 10 · Lesson 6 — Feature importance. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Feature importance',
  summary: 'A forest can say how much each clue helped its trees split the bookings. Folake loves it: finally, a chart. Tey explains what the numbers mean, and what they don\'t.',
  minutes: 12,
  outcomes: [
    'Read feature_importances_ from a forest',
    'Explain what importance measures',
    'Compare it with logistic regression\'s coefficients',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'After fitting, forest.feature_importances_ gives one number per feature. They add up to 1.', replies: ['What do they measure?'] },
        { tey: 'How much each feature helped the trees separate missers from comers, added up over every split in every tree.', replies: ['And for our forest?'] },
        { tey: 'Past misses 0.32, distance 0.28, wait 0.23, reminder 0.13, Monday 0.02, rain 0.02.', replies: ['So past misses matters most?'] },
        { tey: 'Both models agree on that: it\'s also logistic regression\'s biggest coefficient. That agreement is worth more than either chart alone.', replies: ['And the reminder? It looked big in v0.9.'] },
        { tey: 'Good catch. In v0.9 the reminder is the second-strongest clue. Here it\'s fourth. A yes/no feature offers only one possible split, while distance offers dozens. This kind of importance tends to favour features with many values.', replies: ['So which is right?'] },
        { tey: 'Neither tells you what causes a no-show. Both tell you what helps this model guess. Lesson 7 is about exactly that difference.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The importance chart, in numbers',
      caption: 'Sorted, biggest first.',
      code: FIT + '\nimportance = pd.Series(forest.feature_importances_, index=feats).sort_values(ascending=False)\nprint(importance.round(3))\nprint("Total:", round(importance.sum(), 3))\n',
      challenge: 'Compare the order with v0.9\'s coefficients from Chapter 9.',
    },
  ],
  apply: {
    scenario: 'Feature importance.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the forest\'s importance for previous_no_shows, rounded to 2 places',
        starter: FIT + 'importance = pd.Series(forest.feature_importances_, index=feats)\n',
        solution: FIT + 'importance = pd.Series(forest.feature_importances_, index=feats)\nprint(round(importance["previous_no_shows"], 2))\n',
        hint: 'importance["previous_no_shows"]',
        checks: [{ message: 'Print 0.32', outputEquals: '0.32' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does a forest\'s feature importance measure?',
        options: [
          { text: 'How much each feature causes no-shows', why: 'It measures usefulness to the model, not cause.' },
          { text: 'How much each feature helped the trees split the bookings' },
          { text: 'The coefficient of each feature', why: 'Forests don\'t have coefficients.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the name of the most important feature',
        starter: FIT + 'importance = pd.Series(forest.feature_importances_, index=feats)\n',
        solution: FIT + 'importance = pd.Series(forest.feature_importances_, index=feats)\nprint(importance.idxmax())\n',
        hint: 'importance.idxmax()',
        checks: [{ message: 'Print previous_no_shows', outputEquals: 'previous_no_shows' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Forest importance: top three or bottom three?',
        groups: ['Top three', 'Bottom three'],
        items: [
          { text: 'previous_no_shows', group: 0 },
          { text: 'distance_km', group: 0 },
          { text: 'rain', group: 1 },
          { text: 'monday', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Distance is 0.28 and the reminder only 0.13. Should we stop sending reminders?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, they don\'t matter.', why: 'Importance isn\'t effect.' },
          { text: 'Send more reminders to far patients only.', why: 'The chart can\'t tell us that.' },
          { text: 'No. Importance says what helps the model guess, not what works. Yes/no features look smaller in this kind of chart. v0.9 says the reminder is the second-strongest clue.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the feature to its forest importance.',
        pairs: [
          ['previous_no_shows', '0.32'],
          ['distance_km', '0.28'],
          ['wait_days', '0.23'],
          ['sms_reminder', '0.13'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Reading importance.',
        language: 'python',
        template: 'importance = pd.Series(forest.[[1]], index=feats)\nprint(importance.[[2]](ascending=False))',
        blanks: [['feature_importances_'], ['sort_values']],
        distractors: ['coef_', 'sort_index'],
      },
      {
        kind: 'findBug',
        prompt: 'Which reading of the chart is wrong?',
        lines: ['Past misses helped the trees most.', 'The importances add up to 1.', 'Distance causes 28% of no-shows.'],
        bug: 2,
        fix: 'Distance gave 28% of the trees\' splitting help.',
        explanation: 'Importance is about the model, not causes.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do all the importances add up to?',
        answers: ['1', '1.0', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is the agreement on past misses useful?',
        options: [
          { text: 'It proves past misses cause no-shows', why: 'Agreement isn\'t cause.' },
          { text: 'Two different models agreeing makes the finding more trustworthy' },
          { text: 'It means the models are the same', why: 'They\'re very different.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'If you ranked what "helps you guess" your friend\'s mood, what would be top? Would it cause the mood?',
    starters: ['Top would be...'],
  },
  deepen: {
    title: 'Permutation importance',
    summary: 'Another way: shuffle one feature\'s column and see how much the score drops. It works for any model and is less biased towards many-valued features. scikit-learn has permutation_importance.',
  },
  notes: 'RF(100, depth 5, rs 42) on weeks 1-11 feature_importances_: wait 0.23, distance 0.275, previous 0.32, sms 0.131, rain 0.02, monday 0.024. v0.9 scaled coefs: previous 0.607, sms -0.472, wait 0.372, distance 0.341, rain 0.176, monday 0.113.',
};

export default lesson;
