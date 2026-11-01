import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LR_FIT } from './code';

/** Chapter 6 · Lesson 2 — Probabilities, not just yes/no. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Probabilities, not just yes/no',
  summary: 'A flat "will miss" or "will come" throws information away. The classifier actually knows more: it gives every booking a probability of being missed. Step by step, how to get those numbers out.',
  minutes: 12,
  outcomes: [
    'Get a probability for each booking with predict_proba',
    'Pick the right column of its output',
    'Explain why probabilities are more useful than labels',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From labels to chances',
      steps: [
        { title: '1. predict gives a label', body: 'For each booking: 0 (come) or 1 (miss). The first week-12 booking gets 0.', code: 'model.predict(test[feats])', language: 'python' },
        { title: '2. predict_proba gives chances', body: 'Two numbers per booking: the chance of each class. For the first booking: 0.906 come, 0.094 miss.', code: 'model.predict_proba(test[feats])', language: 'python' },
        { title: '3. Which column is which?', body: 'The columns follow model.classes_, which is [0, 1]. So column 1 is the chance of a no-show.', code: 'model.classes_  # [0, 1]', language: 'python' },
        { title: '4. Keep the miss column', body: '[:, 1] means "every row, column 1".', code: 'p = model.predict_proba(test[feats])[:, 1]', language: 'python' },
        { title: '5. Labels come from chances', body: 'predict just checks: is the chance of missing at least 0.5? That\'s why it flagged only 11: few bookings are that risky.' },
        { title: '6. Why chances are better', body: 'A 0.45 and a 0.05 both become "come", but they\'re very different patients. Probabilities let Bisi call the riskiest first, even below 50%.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Chances for every booking',
      caption: 'predict vs predict_proba.',
      code: LR_FIT + '\nprint("Labels:", model.predict(test[feats])[:5])\nprint("Classes:", model.classes_)\nprint("Chances:")\nprint(model.predict_proba(test[feats])[:5].round(3))\n',
      challenge: 'Which of the first five bookings is riskiest?',
    },
  ],
  apply: {
    scenario: 'Probabilities.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the first week-12 booking\'s chance of being missed, rounded to 3 places',
        starter: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\n',
        solution: LR_FIT + 'p = model.predict_proba(test[feats])[:, 1]\nprint(round(p[0], 3))\n',
        hint: 'round(p[0], 3)',
        checks: [{ message: 'Print 0.094', outputEquals: '0.094' }],
      },
      {
        kind: 'mcq',
        prompt: 'predict_proba gives two columns. Which one is the chance of a no-show?',
        options: [
          { text: 'Column 0', why: 'Column 0 is class 0: the chance of coming.' },
          { text: 'Whichever is bigger', why: 'The order follows classes_, not size.' },
          { text: 'Column 1, because model.classes_ is [0, 1]' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the shape of predict_proba\'s output for week 12',
        starter: LR_FIT,
        solution: LR_FIT + 'print(model.predict_proba(test[feats]).shape)\n',
        hint: 'model.predict_proba(test[feats]).shape',
        checks: [{ message: 'Print (200, 2)', outputEquals: '(200, 2)' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it gives.',
        pairs: [
          ['model.predict(...)', 'A label: 0 or 1'],
          ['model.predict_proba(...)', 'Two chances per booking'],
          ['model.classes_', 'The order of the columns'],
          ['[:, 1]', 'The chance of a no-show'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Label or probability?',
        groups: ['Label', 'Probability'],
        items: [
          { text: '1', group: 0 },
          { text: '0.094', group: 1 },
          { text: '"will come"', group: 0 },
          { text: '0.45', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Two patients both say "will come". Can I tell which one to worry about?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'No, they\'re the same.', why: 'The labels match; the chances don\'t.' },
          { text: 'Yes: look at their chances. One might be 0.45 and the other 0.05. Same label, very different risk.' },
          { text: 'Call them both, always.', why: 'With limited calls, chances tell you who first.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The miss chances.',
        language: 'python',
        template: 'p = model.[[1]](test[feats])[:, [[2]]]',
        blanks: [['predict_proba'], ['1']],
        distractors: ['predict', '0'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line takes the chance of coming instead of missing?',
        language: 'python',
        lines: ['probs = model.predict_proba(test[feats])', 'p = probs[:, 0]', 'print(p[:5])'],
        bug: 1,
        fix: 'p = probs[:, 1]',
        explanation: 'Column 0 is class 0 (came). Column 1 is the no-show chance.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The first booking has a 0.094 chance of being missed. What\'s its chance of coming?',
        answers: ['0.906'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'predict says "miss" when the chance is at least...',
        options: [
          { text: '0.5' },
          { text: '0.1', why: 'Then it would flag far more bookings.' },
          { text: '0.9', why: 'It uses 0.5 by default.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where would you rather have a chance than a yes/no: a weather forecast, a medical test, something else?',
    starters: ['I\'d rather have a chance for...', 'Because...'],
  },
  deepen: {
    title: 'Are the chances trustworthy?',
    summary: 'Ideally, of all bookings given 0.3, about 30% are missed. That\'s called calibration. Logistic regression is usually fairly well calibrated; some models aren\'t. Chapter 7 checks it.',
  },
  notes: 'LogisticRegression, 4 features, weeks 1-11 -> week 12. First week-12 booking (A12201: wait 14, 10 km, 0 previous, sms 1): proba [0.906, 0.094], label 0. classes_ [0, 1]. Output shape (200, 2). Mean no-show chance on week 12: 0.192.',
};

export default lesson;
