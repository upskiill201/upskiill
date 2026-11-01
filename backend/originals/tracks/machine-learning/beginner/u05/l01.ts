import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LOAD } from './code';

/** Chapter 5 · Lesson 1 — Predicting a number: Folake's weekly question. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Predicting a number',
  summary: 'Folake doesn\'t want "will this patient miss?" today. She wants "how many patients will Yaba get next week?" That\'s a different kind of prediction: the answer is a number, not a yes or no. Emmanuel finds last year\'s weekly totals.',
  minutes: 12,
  outcomes: [
    'Tell a number prediction (regression) from a yes/no one (classification)',
    'Load last year\'s weekly bookings',
    'Pick a sensible first guess to beat',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Folake\'s question',
      beats: [
        { speaker: 'folake', text: 'The board wants staffing plans. How many patients will each clinic get next week? Yaba first.' },
        { speaker: 'emmanuel', text: 'I\'ve got last year: every clinic, every week, how many bookings, how many hours it opened, how many nurses, holidays, rainy days. clinic_weeks.csv, 416 rows.' },
        { speaker: 'halima', text: 'So the answer isn\'t "miss" or "come". It\'s 28, or 35, or 19.' },
        { speaker: 'miracle', text: 'Predicting a number is called regression. Same rules as Chapter 4: learn from the past, test on weeks the model never saw.' },
        { speaker: 'tey', text: 'Before any clever model, you need something to beat. What should the team\'s very first guess be?' },
      ],
      choice: {
        prompt: 'What should the team\'s first guess be?',
        options: [
          { text: 'Last year\'s average week: about 28 bookings. Then try to beat it.', outcome: 'Yes. The average is the simplest honest guess. Every model this chapter has to do better than it, or it isn\'t worth having.', best: true },
          { text: 'Whatever Yaba got this week.', outcome: 'It\'s a guess, but one week is noisy. Holidays and rain swing it. The average is steadier, and it\'s the standard baseline.' },
          { text: 'Skip guessing and build the best model straight away.', outcome: 'Without a baseline, you can\'t tell whether the model is any good. "Compared to what?" applies here too.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Last year, week by week',
      caption: 'Weekly bookings for 8 clinics, 52 weeks. Made-up practice data.',
      code: LOAD + '\nprint(cw.shape)\nprint(cw.head())\nprint("Average week:", round(cw["bookings"].mean(), 1), "bookings")\n',
      challenge: 'Which clinic is busiest on average? Try cw.groupby("clinic")["bookings"].mean().',
    },
  ],
  apply: {
    scenario: 'Predicting a number.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Load clinic_weeks.csv and print its shape',
        starter: 'import pandas as pd\n',
        solution: LOAD + 'print(cw.shape)\n',
        hint: 'cw = pd.read_csv("clinic_weeks.csv"), then cw.shape',
        checks: [{ message: 'Print (416, 7)', outputEquals: '(416, 7)' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'A number to predict, or a yes/no?',
        groups: ['Number (regression)', 'Yes/no (classification)'],
        items: [
          { text: 'How many bookings next week?', group: 0 },
          { text: 'Will this patient miss?', group: 1 },
          { text: 'How many minutes will the wait be?', group: 0 },
          { text: 'Will it rain tomorrow?', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the average weekly bookings across the whole file, rounded to 1 place',
        starter: LOAD,
        solution: LOAD + 'print(round(cw["bookings"].mean(), 1))\n',
        hint: 'round(cw["bookings"].mean(), 1)',
        checks: [{ message: 'Print 27.9', outputEquals: '27.9' }],
      },
      {
        kind: 'mcq',
        prompt: 'What is regression?',
        options: [
          { text: 'Going backwards', why: 'In everyday English, yes. In machine learning it means predicting a number.' },
          { text: 'Predicting a number' },
          { text: 'Predicting yes or no', why: 'That\'s classification.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the column to what it records.',
        pairs: [
          ['open_hours', 'Hours the clinic opened that week'],
          ['nurses', 'Nurses on duty'],
          ['holiday', '1 in a public-holiday week'],
          ['bookings', 'The number to predict'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Just tell me 28 for every clinic, every week. Done.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Sure, 28 everywhere.', why: 'It\'s a starting point, not an answer.' },
          { text: 'Averages are always wrong.', why: 'They\'re a fair baseline: the thing to beat.' },
          { text: '28 is our baseline. But Gumel averages about 16 and Yaba about 32, so one number will be badly wrong for some clinics. We can do better.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two kinds.',
        template: 'Predicting a number is [[1]]. Predicting yes or no is [[2]].',
        blanks: [['regression'], ['classification']],
        distractors: ['clustering', 'cleaning'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line reads the wrong file for Folake\'s question?',
        language: 'python',
        lines: ['import pandas as pd', 'cw = pd.read_csv("appointments.csv")', 'print(cw["bookings"].mean())'],
        bug: 1,
        fix: 'cw = pd.read_csv("clinic_weeks.csv")',
        explanation: 'appointments.csv has one row per booking and no weekly totals. The totals are in clinic_weeks.csv.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'clinic_weeks.csv has 8 clinics and 52 weeks. How many rows is that?',
        answers: ['416'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why start with a baseline before any model?',
        options: [
          { text: 'So you know whether the model is actually better than a simple guess' },
          { text: 'Baselines are more accurate', why: 'They\'re simple. That\'s why they\'re the bar to clear.' },
          { text: 'It\'s required by pandas', why: 'It\'s a habit, not a rule of any library.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What numbers do you predict in your own life, like time to get somewhere or money left at month end? What\'s your "average" guess?',
    starters: ['I predict...', 'My average guess is...'],
  },
  deepen: {
    title: 'Why "regression"?',
    summary: 'The name comes from Francis Galton in the 1880s, who noticed that very tall parents tended to have children closer to average height: a "regression towards the mean". The word stuck for predicting numbers.',
  },
  notes: 'clinic_weeks.csv (seed 52): 416 rows (8 clinics x 52 weeks), 7 columns, mean bookings 27.9 (min 2, max 44). Clinic means: Yaba 32.3, Surulere 31.8, Ikeja 31.8, Kano City 30.0, Wuse 27.9, Lekki 27.2, Ibadan North 26.7, Gumel 15.6. Galton\'s "regression towards mediocrity" (1886) is the historical origin of the term.',
};

export default lesson;
