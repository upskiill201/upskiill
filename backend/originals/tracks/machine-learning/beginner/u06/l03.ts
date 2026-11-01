import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LR_FIT } from './code';

/** Chapter 6 · Lesson 3 — Logistic regression, in plain words. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Logistic regression',
  summary: 'How does logistic regression turn four clues into a chance between 0 and 1? A score, then a squeeze. And its coefficients say something Halima already knew from the ward: reminders help, past misses predict future ones.',
  minutes: 12,
  outcomes: [
    'Explain logistic regression as a score turned into a chance',
    'Read the sign of each coefficient',
    'Connect the coefficients to what nurses already know',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'A score, then a squeeze',
      html: '<p><strong>Step 1: a score.</strong> Like the line in Chapter 5, logistic regression adds up each feature times a number, plus a starting point. For Afiya\'s bookings it learned:</p><ul><li>wait_days: <strong>+0.050</strong> per day waited</li><li>distance_km: <strong>+0.043</strong> per km</li><li>previous_no_shows: <strong>+0.607</strong> per past miss</li><li>sms_reminder: <strong>-0.985</strong> with a reminder</li><li>starting point: <strong>-2.407</strong></li></ul><p><strong>Step 2: the squeeze.</strong> The score can be any number. An S-shaped curve squeezes it to between 0 and 1. A very negative score becomes a chance near 0; a very positive one, near 1; a score of 0 becomes exactly 0.5.</p><p><strong>Reading it:</strong> a <em>positive</em> coefficient pushes the chance of a no-show up; a <em>negative</em> one pushes it down. So: longer waits, longer trips and past misses raise the risk; a reminder lowers it, a lot.</p><p>Halima reads the list twice. "That\'s the ward. Patients who missed before miss again. A text the day before works." The model learned from 2,200 bookings what she learned from years of shifts. That\'s reassuring, not surprising.</p><p><strong>Careful:</strong> the sizes aren\'t directly comparable, because the units differ: one day, one km, one past miss. Chapter 8 puts them on the same ruler.</p>',
    },
    {
      kind: 'check',
      question: 'sms_reminder has a coefficient of -0.985. What does that mean?',
      options: ['A reminder raises it', 'A reminder lowers the chance of a no-show', '98.5% of reminders work'],
      answer: 1,
      explanation: 'Negative pushes the chance down.',
    },
    {
      kind: 'tryIt',
      title: 'What it learned',
      caption: 'One number per feature, plus a starting point.',
      code: LR_FIT + '\nfor name, c in zip(feats, model.coef_[0]):\n    print(name, round(c, 3))\nprint("start", round(model.intercept_[0], 3))\n',
      challenge: 'Which feature pushes the chance of a no-show up the most per unit?',
    },
  ],
  apply: {
    scenario: 'Logistic regression.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print each feature with its coefficient, rounded to 3 places',
        starter: LR_FIT + 'for name, c in zip(feats, model.coef_[0]):\n',
        solution: LR_FIT + 'for name, c in zip(feats, model.coef_[0]):\n    print(name, round(c, 3))\n',
        hint: 'print(name, round(c, 3))',
        checks: [{ message: 'Print the four coefficients', outputEquals: 'wait_days 0.05\ndistance_km 0.043\nprevious_no_shows 0.607\nsms_reminder -0.985' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Raises or lowers the chance of a no-show?',
        groups: ['Raises', 'Lowers'],
        items: [
          { text: 'A longer wait', group: 0 },
          { text: 'An SMS reminder', group: 1 },
          { text: 'More past no-shows', group: 0 },
          { text: 'Living further away', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the S-shaped "squeeze" do?',
        options: [
          { text: 'Removes features', why: 'It only changes the scale of the score.' },
          { text: 'Splits the data', why: 'It turns a score into a probability.' },
          { text: 'Turns any score into a chance between 0 and 1' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the starting point (intercept), rounded to 3 places',
        starter: LR_FIT,
        solution: LR_FIT + 'print(round(model.intercept_[0], 3))\n',
        hint: 'model.intercept_[0]',
        checks: [{ message: 'Print -2.407', outputEquals: '-2.407' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the feature to its coefficient.',
        pairs: [
          ['wait_days', '+0.050'],
          ['distance_km', '+0.043'],
          ['previous_no_shows', '+0.607'],
          ['sms_reminder', '-0.985'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'previous_no_shows is 0.607 and wait_days only 0.05. So past misses matter 12 times more?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, exactly 12 times.', why: 'Different units make raw sizes misleading.' },
          { text: 'Not directly: one past miss and one day of waiting are different units. 20 extra days add as much score as about 1.6 past misses. Chapter 8 compares them fairly.' },
          { text: 'Waiting doesn\'t matter.', why: 'It does: a long wait adds up.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Reading signs.',
        template: 'A [[1]] coefficient pushes the no-show chance up; a [[2]] one pushes it down.',
        blanks: [['positive'], ['negative']],
        distractors: ['large', 'small'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement misreads the model?',
        lines: ['Reminders lower the risk.', 'Past no-shows raise the risk.', 'A score of 0 means a 0% chance of missing.'],
        bug: 2,
        fix: 'A score of 0 means a 50% chance.',
        explanation: 'The squeeze turns a score of 0 into exactly 0.5.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'After the squeeze, what chance does a score of exactly 0 become? (A decimal.)',
        answers: ['0.5', '.5', '50%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why was Halima reassured, not surprised, by the coefficients?',
        options: [
          { text: 'They\'re all positive', why: 'The reminder is negative. They match the ward.' },
          { text: 'She didn\'t read them', why: 'She read them twice.' },
          { text: 'They match what nurses already know about why patients miss' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Does any coefficient surprise you, or match something you\'ve seen yourself about why people miss appointments?',
    starters: ['I\'m not surprised that...', 'I\'d have guessed...'],
  },
  deepen: {
    title: 'Odds',
    summary: 'Technically, each coefficient changes the log of the odds of a no-show. You don\'t need that to use the model; signs and comparisons on the same scale are enough for most decisions.',
  },
  notes: 'LogisticRegression (lbfgs, C=1), weeks 1-11: coef wait_days 0.050, distance_km 0.043, previous_no_shows 0.607, sms_reminder -0.985; intercept -2.407. 20 days x 0.05 = 1.0 = about 1.6 x 0.607.',
};

export default lesson;
