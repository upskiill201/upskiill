import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F5, IMPORTS, MINUTES, PIPE, PIPE_IMPORTS, VAL_SPLIT } from './code';

const BASE = IMPORTS + DATA;
const VAL = IMPORTS + PIPE_IMPORTS + DATA + VAL_SPLIT + MINUTES + F5;

/** Chapter 8 · Lesson 8 — Dates and times as features. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Dates and times as features',
  summary: 'Weekday, hour and week number are all in the spreadsheet. Which can help predict next week, and which can\'t? Five beliefs about time features, tested.',
  minutes: 12,
  outcomes: [
    'Choose time features that repeat in the future',
    'Avoid features that never come back, like the week number',
    'Spot patterns found by searching',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'The week number is a good feature: it\'s in every row.',
          isFact: false,
          explain: 'Myth. Week 13 has never happened. The model can only learn about weeks it has seen, so "week" can\'t help predict a new one. On validation it makes minutes lost worse: 1,335 against 1,245.',
        },
        {
          text: 'Weekday can be a feature, because weekdays repeat.',
          isFact: true,
          explain: 'Fact. Next Monday is still a Monday. Bisi said Mondays were bad before anyone looked: 20.5% of Monday bookings missed.',
        },
        {
          text: 'If Saturday has the highest no-show rate, add a Saturday flag.',
          isFact: false,
          explain: 'Myth, as a habit. Search all six weekdays for the most extreme one and you\'ll always find one, by luck or not. A hunch written down before looking is stronger evidence than the winner of a search.',
        },
        {
          text: 'Hour of the day is worth testing.',
          isFact: true,
          explain: 'Fact: it repeats and it\'s known in advance. Here it doesn\'t help: validation minutes go from 1,245 to 1,260.',
        },
        {
          text: 'Raw dates (like 2026-03-14) work well as numbers.',
          isFact: false,
          explain: 'Myth. A date as a number is like the week number: it only grows. Pull out the parts that repeat: weekday, month, holiday.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Time features on validation',
      caption: 'Minutes lost when each one is added to the five features.',
      code: VAL + 'df["monday"] = (df["weekday"] == "Mon").astype(int)\ntrain = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\n\nfor extra in [[], ["week"], ["hour"], ["monday"]]:\n    cols = feats + extra\n    ' + PIPE.trim() + '\n    model.fit(train[cols], train["no_show"])\n    flags = (model.predict_proba(val[cols])[:, 1] >= 0.2).astype(int)\n    print(extra, minutes(flags, val["no_show"]))\n',
      challenge: 'Which time feature earns its place?',
    },
  ],
  apply: {
    scenario: 'Dates and times as features.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate for each weekday, rounded to 3 places',
        starter: BASE,
        solution: BASE + 'print(df.groupby("weekday")["no_show"].mean().round(3))\n',
        hint: 'df.groupby("weekday")["no_show"].mean().round(3)',
        checks: [{ message: 'Show Monday at 0.205', outputIncludes: '0.205' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Week number predicts next week', group: 0 },
          { text: 'Weekdays repeat', group: 1 },
          { text: 'Search for the worst day, then add it', group: 0 },
          { text: 'Hour is worth testing', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t the week number help predict week 13?',
        options: [
          { text: 'Week numbers are text', why: 'They\'re numbers; they just never repeat.' },
          { text: 'The model has never seen week 13, so it has nothing to learn from' },
          { text: 'It\'s a leak', why: 'It\'s not the answer; it just doesn\'t repeat.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'On validation, print minutes lost with the five features plus week',
        starter: VAL + 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\ncols = feats + ["week"]\n' + PIPE + 'model.fit(train[cols], train["no_show"])\n',
        solution: VAL + 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\ncols = feats + ["week"]\n' + PIPE + 'model.fit(train[cols], train["no_show"])\nflags = (model.predict_proba(val[cols])[:, 1] >= 0.2).astype(int)\nprint(minutes(flags, val["no_show"]))\n',
        hint: 'Flags at 0.2, then minutes',
        checks: [{ message: 'Print 1335', outputEquals: '1335' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Saturday is 22.1%, even worse than Monday. Let\'s add Saturday!',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Add every day that looks bad.', why: 'That\'s data dredging.' },
          { text: 'Weekdays can\'t matter.', why: 'They can; the question is how we found it.' },
          { text: 'You found Saturday by searching six days for the worst. One will always look worst. Bisi\'s Monday hunch came first; that\'s the one we test.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the time feature to its verdict.',
        pairs: [
          ['week', 'Never repeats: don\'t use'],
          ['hour', 'Tested: no help here'],
          ['monday', 'Hunch first, then tested'],
          ['Raw date', 'Pull out parts that repeat'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Good time features...',
        template: 'Good time features [[1]] in the future and are known [[2]] the appointment.',
        blanks: [['repeat'], ['before']],
        distractors: ['grow', 'after'],
      },
      {
        kind: 'findBug',
        prompt: 'Which feature can\'t help next month?',
        lines: ['weekday', 'hour', 'appointment week number'],
        bug: 2,
        fix: 'Use something that repeats, like month or a holiday flag.',
        explanation: 'Next month\'s weeks have never been seen.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which weekday did Bisi say was bad, before anyone looked?',
        answers: ['Monday', 'Mon', 'monday'],
        placeholder: 'A day',
      },
      {
        kind: 'mcq',
        prompt: 'Why is a hunch written down before looking stronger evidence?',
        options: [
          { text: 'Nurses are always right', why: 'Vaccinations proved otherwise.' },
          { text: 'It wasn\'t picked because it happened to look good in this data' },
          { text: 'It\'s shorter', why: 'It\'s about how it was found.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever noticed a "pattern" (a lucky shirt, an unlucky day) that might just be chance? How would you test it?',
    starters: ['I noticed...', 'I\'d test it by...'],
  },
  deepen: {
    title: 'Data dredging',
    summary: 'Searching through many possible patterns and reporting the strongest is called data dredging, or p-hacking in research. The fix is the same as for metrics: decide what to test before you look.',
  },
  notes: 'Weekday no-show rates (all 12 weeks): Fri 0.153, Mon 0.205, Sat 0.221, Thu 0.188, Tue 0.165, Wed 0.165. Validation minutes from five features (1245): + week 1335, + hour 1260, + monday 1225, + saturday 1210 (found by searching; not used).',
};

export default lesson;
