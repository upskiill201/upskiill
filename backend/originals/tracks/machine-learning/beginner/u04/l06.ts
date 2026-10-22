import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { SETUP } from './code';

/** Chapter 4 · Lesson 6 — Chidi's 97.5%: the leaky feature. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Chidi\'s 97.5%',
  summary: 'Chidi adds one more column to the predictor and the score leaps from 82.5% to 97.5%. Folake wants to tell the board tonight. Miracle asks one question: when is that column filled in?',
  minutes: 13,
  outcomes: [
    'Reproduce a score that is too good to be true',
    'Ask when each column becomes known',
    'Decide what to do with a suspicious jump',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The jump',
      beats: [
        { speaker: 'chidi', text: 'I added confirmed_on_day to the features. 97.5% right on week 12. Top 20: 19 really missed. Board tonight?' },
        { speaker: 'folake', text: 'Finally a number I can say out loud.' },
        { speaker: 'miracle', text: 'Before anyone says anything out loud: when does the clinic fill in confirmed_on_day?' },
        { speaker: 'emmanuel', text: '(scrolling the export notes) "Set by reception on the day: 1 if the patient checked in or phoned to confirm."' },
        { speaker: 'halima', text: 'So it\'s written after the patient turns up. We\'d only know it once it\'s too late to call them.' },
        { speaker: 'tey', text: 'A jump this big is a question, not a celebration. What should the team do?' },
      ],
      choice: {
        prompt: 'What should the team do with the 97.5%?',
        options: [
          { text: 'Drop confirmed_on_day, re-run, and report the honest score, 82.5%.', outcome: 'Yes. The column only exists after the answer is known. The real predictor is the one without it.', best: true },
          { text: 'Report 97.5% now and fix it later.', outcome: 'The board would plan around a model that can\'t work on the evening before. That\'s worse than a lower number.' },
          { text: 'Keep the column but don\'t mention it.', outcome: 'The model would still fail the moment it runs on tomorrow\'s bookings, when that column is blank.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Chidi\'s jump',
      caption: 'Same predictor, one extra column.',
      code: SETUP + '\nfor cols in [feats, feats + ["confirmed_on_day"]]:\n    t = test.assign(risk=knn_risk(train, test, cols))\n    right = ((t["risk"] > 0.5).astype(int) == t["no_show"]).mean()\n    print(len(cols), "features:", right)\n',
      challenge: 'Try ["confirmed_on_day"] on its own. How much of the jump is that one column?',
    },
  ],
  apply: {
    scenario: 'A score too good to be true.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Add confirmed_on_day to the features and print the share of week 12 the predictor gets right',
        starter: SETUP + 'leaky = feats + ["confirmed_on_day"]\nt = test.assign(risk=knn_risk(train, test, leaky))\n',
        solution: SETUP + 'leaky = feats + ["confirmed_on_day"]\nt = test.assign(risk=knn_risk(train, test, leaky))\nprint(((t["risk"] > 0.5).astype(int) == t["no_show"]).mean())\n',
        hint: '((t["risk"] > 0.5).astype(int) == t["no_show"]).mean()',
        checks: [{ message: 'Print 0.975', outputEquals: '0.975' }],
      },
      {
        kind: 'mcq',
        prompt: 'What question did Miracle ask about the new column?',
        options: [
          { text: 'How many rows does it have?', why: 'Size wasn\'t the issue. Timing was.' },
          { text: 'Is it a number?', why: 'It is. That\'s not the problem.' },
          { text: 'When does it get filled in?' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'With the leaky features, print how many of the top 20 week-12 bookings really missed',
        starter: SETUP + 'leaky = feats + ["confirmed_on_day"]\nt = test.assign(risk=knn_risk(train, test, leaky))\n',
        solution: SETUP + 'leaky = feats + ["confirmed_on_day"]\nt = test.assign(risk=knn_risk(train, test, leaky))\nprint(t.nlargest(20, "risk")["no_show"].sum())\n',
        hint: 't.nlargest(20, "risk")["no_show"].sum()',
        checks: [{ message: 'Print 19', outputEquals: '19' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Known the evening before the appointment, or only after?',
        groups: ['Known before', 'Only after'],
        items: [
          { text: 'wait_days', group: 0 },
          { text: 'confirmed_on_day', group: 1 },
          { text: 'previous_no_shows', group: 0 },
          { text: 'no_show', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: '97.5% is so much better. Can\'t we keep it?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, keep it.', why: 'It would fail every time it\'s actually used.' },
          { text: 'It\'s only that good because the column is written after the patient arrives. The evening before, when Bisi calls, it\'s blank.' },
          { text: 'Let\'s average it with the honest one.', why: 'Half a leak is still a leak.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the predictor to its week-12 results.',
        pairs: [
          ['Honest (4 features)', '82.5% right, 12 of top 20'],
          ['With confirmed_on_day', '97.5% right, 19 of top 20'],
          ['"Everyone comes"', '81.5% right'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The habit.',
        template: 'A big jump in score is a [[1]], not a [[2]].',
        blanks: [['question'], ['celebration']],
        distractors: ['proof', 'bug'],
      },
      {
        kind: 'findBug',
        prompt: 'Chidi\'s feature list. Which feature isn\'t known when Bisi makes her calls?',
        language: 'python',
        lines: ['feats = ["wait_days", "distance_km"]', 'feats += ["previous_no_shows", "sms_reminder"]', 'feats += ["confirmed_on_day"]'],
        bug: 2,
        fix: 'Delete the line: leave confirmed_on_day out',
        explanation: 'confirmed_on_day is filled in on the day, after the patient comes or doesn\'t.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Without the leak the predictor gets 82.5%. With it, 97.5%. How many points did the leak add?',
        answers: ['15', '15%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When is a leaky model\'s score discovered to be fake, if nobody checks?',
        options: [
          { text: 'Never', why: 'It shows up the first real evening.' },
          { text: 'During training', why: 'Training looks great. That\'s why it fools people.' },
          { text: 'When it runs on real bookings and the column is blank' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever seen a result that looked too good, and later found out why? What gave it away?',
    starters: ['The result was...', 'It gave itself away when...'],
  },
  deepen: {
    title: 'Why leaks are so common',
    summary: 'Data exports are built for record keeping, not prediction. They mix columns known in advance with columns filled in later, and nothing in the file says which is which. Someone has to ask.',
  },
  notes: 'Week 12, k = 15: 4 features accuracy 0.825, top 20 12; + confirmed_on_day accuracy 0.975, top 20 19, flags 40 (risk > 0.5) and catches 36 of 37; confirmed_on_day alone accuracy 0.975, top 20 18. Export note wording is fictional.',
};

export default lesson;
