import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LOAD, SETUP } from './code';

/** Chapter 4 · Lesson 10 — Checkpoint 2: Chidi's jump, leakage, the column round, splitting by time. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the leak',
  summary: 'Folake has heard the word "leak" three times this week and wants to know if she should worry. Check you can find a leak, explain it, and choose a split that matches real life.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Find and explain a data leak', 'Choose between a random split and a split by time'],
  learn: [
    {
      kind: 'story',
      title: 'Folake\'s question',
      beats: [
        { speaker: 'folake', text: 'Is a leak like a data breach? Should I call legal?' },
        { speaker: 'halima', text: 'No. It\'s the model accidentally seeing the answer. It makes scores look better than they are. We found ours.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: the leak.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Score the honest predictor (no confirmed_on_day) on week 12: print how many of the top 20 missed',
        starter: SETUP,
        solution: SETUP + 't = test.assign(risk=knn_risk(train, test, feats))\nprint(t.nlargest(20, "risk")["no_show"].sum())\n',
        hint: 't = test.assign(risk=knn_risk(train, test, feats)), then nlargest(20, "risk")',
        checks: [{ message: 'Print 12', outputEquals: '12' }],
      },
      {
        kind: 'mcq',
        prompt: 'Chidi\'s score jumped from 82.5% to 97.5% after adding one column. What should you ask first?',
        options: [
          { text: 'Can we add two more columns?', why: 'First find out why one column did so much.' },
          { text: 'When is that column filled in?' },
          { text: 'Which slide should it go on?', why: 'Check it before celebrating it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Leak or real pattern?',
        groups: ['Leak', 'Real pattern'],
        items: [
          { text: 'confirmed_on_day: 89% vs 0.4% no-shows', group: 0 },
          { text: 'sms_reminder: 26% vs 12% no-shows', group: 1 },
          { text: 'no_show used as a feature', group: 0 },
          { text: 'previous_no_shows: more past misses, more misses', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate for each value of sms_reminder, as a rounded table: round the groupby result to 3 places',
        starter: LOAD,
        solution: LOAD + 'print(df.groupby("sms_reminder")["no_show"].mean().round(3).tolist())\n',
        hint: 'df.groupby("sms_reminder")["no_show"].mean().round(3).tolist()',
        checks: [{ message: 'Print [0.262, 0.124]', outputEquals: '[0.262, 0.124]' }],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So is the honest model useless? 82.5% is barely above guessing.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Its accuracy is close to guessing, but its call list isn\'t: 12 of the top 20 missed, against about 4 if Bisi called at random.' },
          { text: 'Yes, scrap it.', why: 'Its call list is three times better than random.' },
          { text: 'Let\'s put the leak back.', why: 'The leak can\'t work the evening before.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the column to when it\'s known.',
        pairs: [
          ['wait_days', 'When the booking is made'],
          ['rain (actual)', 'On the day'],
          ['confirmed_on_day', 'After the patient comes or not'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Splitting.',
        template: 'Bookings have dates, so split by [[1]]: learn from weeks 1 to 11, test on week [[2]].',
        blanks: [['time'], ['12']],
        distractors: ['random', '1'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line builds a leaky predictor?',
        language: 'python',
        lines: ['feats = ["wait_days", "sms_reminder"]', 'feats += ["confirmed_on_day"]', 't = test.assign(risk=knn_risk(train, test, feats))'],
        bug: 1,
        fix: 'Delete it: leave confirmed_on_day out',
        explanation: 'It\'s filled in after the appointment, so it isn\'t there when Bisi calls.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Bisi phoned 20 random week-12 bookings, how many no-shows would she reach on average? (20 x 37 / 200, one decimal place.)',
        answers: ['3.7'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Review, lesson 4: Chidi chose k by trying five values on week 12. What\'s that called?',
        options: [
          { text: 'Tuning fairly', why: 'Tuning is fine, but not on the test set.' },
          { text: 'Peeking at the test set' },
          { text: 'Leakage from the future', why: 'Close cousin, but this one is peeking.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Halima\'s leak check.',
        lines: ['Notice a score that looks too good', 'Find the column that caused the jump', 'Ask when that column is filled in', 'Drop it and report the honest score'],
      },
    ],
  },
  reflect: {
    prompt: 'Explain data leakage to Folake in two sentences, with no jargon.',
    starters: ['A leak is when...', 'We found ours by...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 6-9. Honest v0.3 week 12: top 20 12; random 20 expected 3.7. sms_reminder no-show rates [0.262, 0.124].',
};

export default lesson;
