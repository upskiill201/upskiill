import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { TEST_BASE, V9 } from './code';

const FIT = TEST_BASE + V9 + 'v9.fit(train[feats], train["no_show"])\nweights = pd.Series(v9[-1].coef_[0], index=feats)\n';

/** Chapter 10 · Lesson 16 — What drives no-shows? */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'What drives no-shows?',
  summary: 'Folake wants one chart for the clinic managers: what makes a no-show more likely. Halima builds it from v0.9, checks it against the forest, and words it carefully. A story about a chart that tells the truth.',
  minutes: 12,
  outcomes: [
    'Build a ranked "drivers" chart from a model',
    'Cross-check it with a second model',
    'Word it as prediction, not cause',
  ],
  learn: [
    {
      kind: 'story',
      title: 'One chart',
      beats: [
        { speaker: 'folake', text: 'Managers ask me the same thing every week: "What makes patients miss?" One chart, please.' },
        { speaker: 'halima', text: 'From v0.9\'s scaled coefficients, biggest effect first: past misses push risk up most (0.61). A reminder pulls it down (−0.47). Then wait (0.37), distance (0.34), rain (0.18) and Monday (0.11).' },
        { speaker: 'miracle', text: 'Does the forest agree?' },
        { speaker: 'halima', text: 'On the top: past misses is first in both. The forest ranks the reminder lower, but we saw why: yes/no clues get less credit in that kind of chart.' },
        { speaker: 'folake', text: 'Title: "Why patients miss".' },
        { speaker: 'halima', text: 'Can we say "What predicts a missed appointment"? We haven\'t tested causes. The reminder line is the one worth testing properly.' },
        { speaker: 'tey', text: 'A good drivers chart ranks the clues, shows which way each pushes, says which models agree, and never claims more than prediction.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The drivers, ranked',
      caption: 'v0.9\'s scaled coefficients, biggest effect first.',
      code: FIT + '\norder = weights.abs().sort_values(ascending=False).index\nfor name in order:\n    direction = "raises risk" if weights[name] > 0 else "lowers risk"\n    print(name, round(weights[name], 2), direction)\n',
      challenge: 'Why rank by the size (abs) rather than the raw value?',
    },
  ],
  apply: {
    scenario: 'What drives no-shows?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print v0.9\'s features ranked by the size of their coefficient, biggest first, as a list',
        starter: FIT,
        solution: FIT + 'print(weights.abs().sort_values(ascending=False).index.tolist())\n',
        hint: 'weights.abs().sort_values(ascending=False).index.tolist()',
        checks: [{ message: 'Print the ranked list', outputEquals: "['previous_no_shows', 'sms_reminder', 'wait_days', 'distance_km', 'rain', 'monday']" }],
      },
      {
        kind: 'mcq',
        prompt: 'Why rank by the size of the coefficient?',
        options: [
          { text: 'Negative numbers don\'t count', why: 'They count; they push risk down.' },
          { text: 'A big negative (the reminder) matters as much as a big positive; the sign just says which way' },
          { text: 'To hide the reminder', why: 'It ranks second.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print v0.9\'s coefficient for sms_reminder, rounded to 2 places',
        starter: FIT,
        solution: FIT + 'print(round(weights["sms_reminder"], 2))\n',
        hint: 'weights["sms_reminder"]',
        checks: [{ message: 'Print -0.47', outputEquals: '-0.47' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Raises or lowers predicted risk?',
        groups: ['Raises risk', 'Lowers risk'],
        items: [
          { text: 'More past misses', group: 0 },
          { text: 'Longer wait', group: 0 },
          { text: 'Rain', group: 0 },
          { text: 'A reminder text', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Why can\'t I call it "Why patients miss"?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'You can.', why: 'It would claim causes.' },
          { text: 'Because the chart is wrong.', why: 'The chart is right; the title would overclaim.' },
          { text: 'Because it shows what predicts a miss, not what causes one. "What predicts a missed appointment" is true; "why" needs a fair test.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the clue to its v0.9 weight.',
        pairs: [
          ['Past misses', '0.61'],
          ['Reminder', '−0.47'],
          ['Wait', '0.37'],
          ['Monday', '0.11'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The chart\'s title.',
        template: 'What [[1]] a missed appointment (v0.9, checked against a [[2]])',
        blanks: [['predicts'], ['forest']],
        distractors: ['causes', 'guess'],
      },
      {
        kind: 'findBug',
        prompt: 'Which chart note overclaims?',
        lines: ['Past misses is the strongest predictor in both models.', 'A reminder is linked to lower risk.', 'Sending reminders will cut no-shows by 47%.'],
        bug: 2,
        fix: 'Whether reminders cut no-shows needs a fair test.',
        explanation: '−0.47 is a scaled weight, not a percentage, and not a proven effect.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which clue is the strongest predictor in both models?',
        answers: ['previous_no_shows', 'past misses', 'previous no-shows', 'previous no shows'],
        placeholder: 'A feature',
      },
      {
        kind: 'mcq',
        prompt: 'Which line on the chart is most worth testing properly?',
        options: [
          { text: 'Monday', why: 'Clinics can\'t move Monday.' },
          { text: 'The reminder: the clinic controls it, so a fair test could change practice' },
          { text: 'Past misses', why: 'Clinics can\'t change patients\' histories.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which line on the chart would you act on first if you ran a clinic? How would you test it?',
    starters: ['I\'d act on...', 'I\'d test it by...'],
  },
  deepen: {
    title: 'Actionable vs fixed features',
    summary: 'Some drivers can\'t be changed (past misses, Monday). Some can (reminders, wait times). The most useful charts point managers to the actionable ones, and suggest testing them.',
  },
  notes: 'v0.9 (C = 0.1) fitted on weeks 1-11, scaled coefficients: previous 0.607, sms -0.472, wait 0.372, distance 0.341, rain 0.176, monday 0.113. RF importance agrees on previous_no_shows first.',
};

export default lesson;
