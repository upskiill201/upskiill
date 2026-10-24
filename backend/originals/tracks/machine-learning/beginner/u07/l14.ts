import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { VAL } from './code';

const PER_WEEK = VAL + 'v = val.assign(p=pv)\n';

/** Chapter 7 · Lesson 14 — Choosing the metric before the model. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Choosing the metric before the model',
  summary: 'Chidi has found a measure where the depth-8 tree wins. Miracle asks one question: "Did you choose that measure before or after you saw the scores?" Tey explains why the order matters.',
  minutes: 12,
  outcomes: [
    'Explain why metrics are chosen before comparing models',
    'Write down metrics that match how the model will be used',
    'Measure one per week on validation',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Chidi tried six measures until the tree won one. What\'s wrong with that?', replies: ['It sounds like peeking.'] },
        { tey: 'It is. Try enough measures and one will favour any model by luck. The measure has to be chosen first, from how the model will be used.', replies: ['So how will it be used?'] },
        { tey: 'Two ways. Bisi calls 20 people a week from a central list. And each clinic\'s receptionist calls the bookings flagged above a threshold.', replies: ['So two measures?'] },
        { tey: 'Yes, written down today: (1) no-shows reached by the top 20 each week; (2) minutes lost from the clinic flag, at 20 per missed no-show and 5 per call.', replies: ['And then compare?'] },
        { tey: 'Then compare on validation. On the top-20 measure, logistic regression reaches 12 in week 10 and 12 in week 11. The depth-8 tree reaches 14 and 13. Recorded honestly, both.', replies: ['So the tree wins?'] },
        { tey: 'On that measure, yes, by a little. Miracle\'s rule from Chapter 6 still applies: managers must understand it. The metric tells you the score; the rule tells you the decision.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Top 20, week by week',
      caption: 'The agreed measure, on the validation weeks.',
      code: PER_WEEK + '\nfor week, g in v.groupby("week"):\n    print("Week", week, "top 20 reach", g.nlargest(20, "p")["no_show"].sum(), "no-shows")\n',
      challenge: 'How many no-shows did each validation week have?',
    },
  ],
  apply: {
    scenario: 'Choosing the metric first.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many no-shows logistic regression\'s top 20 reaches in week 10',
        starter: PER_WEEK + 'w10 = v[v["week"] == 10]\n',
        solution: PER_WEEK + 'w10 = v[v["week"] == 10]\nprint(w10.nlargest(20, "p")["no_show"].sum())\n',
        hint: 'w10.nlargest(20, "p")["no_show"].sum()',
        checks: [{ message: 'Print 12', outputEquals: '12' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why choose the metric before comparing models?',
        options: [
          { text: 'Metrics are slow to compute', why: 'It\'s about honesty, not speed.' },
          { text: 'Try enough metrics after the fact and one will favour any model by luck' },
          { text: 'scikit-learn needs it first', why: 'It\'s a team habit.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many no-shows week 11 had in total',
        starter: PER_WEEK,
        solution: PER_WEEK + 'print(v[v["week"] == 11]["no_show"].sum())\n',
        hint: 'Filter week 11, then sum no_show',
        checks: [{ message: 'Print 39', outputEquals: '39' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good metric to agree first, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'No-shows reached by 20 calls a week', group: 0 },
          { text: 'Minutes lost, at agreed costs', group: 0 },
          { text: 'Whichever makes our favourite win', group: 1 },
          { text: 'Accuracy, because it\'s highest', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'I found a measure where the tree wins by 10%. Can we use that one?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Sure.', why: 'That\'s choosing the measure after the fact.' },
          { text: 'Use both and average.', why: 'Still chosen after looking.' },
          { text: 'Did you pick it before or after seeing the scores? We use the two we wrote down today, and the decision rule we agreed in Chapter 6.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the use to its agreed measure.',
        pairs: [
          ['Bisi\'s central list', 'No-shows reached by the top 20'],
          ['The clinic flag', 'Minutes lost'],
          ['The board slide', 'Both, next to a baseline'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The order.',
        template: 'Choose the [[1]], then compare the [[2]], then test once.',
        blanks: [['metric'], ['models']],
        distractors: ['winner', 'weeks'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step is the problem?',
        lines: ['We listed six measures.', 'We scored both models on all six.', 'We reported the one where our model won.'],
        bug: 2,
        fix: 'We agreed one measure first and reported it, win or lose.',
        explanation: 'Reporting only the winning measure is cherry-picking.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'On validation, how many no-shows does the depth-8 tree\'s top 20 reach in week 10?',
        answers: ['14'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why do the two agreed measures fit Afiya\'s clinics?',
        options: [
          { text: 'They match how the model is used: a 20-call list and a per-clinic flag' },
          { text: 'They\'re the highest numbers', why: 'They\'re chosen for meaning, not size.' },
          { text: 'They\'re scikit-learn defaults', why: 'They come from the clinics.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever seen someone pick the statistic that made them look best? How could you tell?',
    starters: ['I saw...', 'I could tell because...'],
  },
  deepen: {
    title: 'The garden of forking paths',
    summary: 'Researchers use this phrase for the many small choices (which measure, which subgroup, which weeks) that can make a result look stronger than it is. Agreeing them in advance closes the paths.',
  },
  notes: 'Weeks 1-9 -> validation, top 20 per week: LR week 10 -> 12, week 11 -> 12; tree depth 8: 14, 13; depth 4: 13, 12. Validation no-shows: week 10 47, week 11 39 (86 total).',
};

export default lesson;
