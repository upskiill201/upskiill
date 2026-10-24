import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F5, IMPORTS, MINUTES, PIPE, PIPE_IMPORTS, VAL_SPLIT } from './code';

const BASE = IMPORTS + DATA;
const VAL = IMPORTS + PIPE_IMPORTS + DATA + 'df["long_wait"] = (df["wait_days"] > 14).astype(int)\n' + VAL_SPLIT + MINUTES;

/** Chapter 8 · Lesson 7 — New features from old ones. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'New features from old ones',
  summary: 'A new feature can be built from columns you already have: "Monday?" from the weekday, "long wait?" from wait_days. But a new column only helps if it tells the model something it didn\'t already know.',
  minutes: 12,
  outcomes: [
    'Build new features from existing columns',
    'Test whether a new feature adds anything',
    'Explain why some new features add nothing',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two new features',
      before: {
        label: '"monday": from weekday',
        text: 'Built from a column the model couldn\'t read.\nNew information: the model never saw weekdays.\n409 Monday bookings, 20.5% missed.',
      },
      after: {
        label: '"long_wait": from wait_days',
        text: 'Built from a column the model already uses.\nWait over 14 days: 371 bookings, 28.6% missed.\nBut wait_days already says this.',
      },
      notes: [
        'A strong-looking feature isn\'t automatically useful: long_wait clearly matters, but the model already knew.',
        'On validation, adding long_wait changes minutes lost by exactly 0.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Does long_wait help?',
      caption: 'Validation minutes, with and without it.',
      code: VAL + F5 + '\nfor extra in [[], ["long_wait"]]:\n    cols = feats + extra\n    ' + PIPE.trim() + '\n    model.fit(train[cols], train["no_show"])\n    flags = (model.predict_proba(val[cols])[:, 1] >= 0.2).astype(int)\n    print(cols[-1], minutes(flags, val["no_show"]))\n',
      challenge: 'Why does long_wait add nothing, even though long waits miss more?',
    },
  ],
  apply: {
    scenario: 'New features from old ones.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build long_wait (wait over 14 days) and print how many bookings have one',
        starter: BASE,
        solution: BASE + 'df["long_wait"] = (df["wait_days"] > 14).astype(int)\nprint(df["long_wait"].sum())\n',
        hint: '(df["wait_days"] > 14).astype(int)',
        checks: [{ message: 'Print 371', outputEquals: '371' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does long_wait add nothing to the model?',
        options: [
          { text: 'Long waits don\'t matter', why: '28.6% vs 16.4%: they do.' },
          { text: 'It\'s a leak', why: 'It\'s known when booking.' },
          { text: 'wait_days is already a feature, so long_wait repeats what the model knows' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the no-show rate for long waits, rounded to 3 places',
        starter: BASE + 'df["long_wait"] = (df["wait_days"] > 14).astype(int)\n',
        solution: BASE + 'df["long_wait"] = (df["wait_days"] > 14).astype(int)\nprint(round(df[df["long_wait"] == 1]["no_show"].mean(), 3))\n',
        hint: 'Filter long_wait == 1, then mean of no_show',
        checks: [{ message: 'Print 0.286', outputEquals: '0.286' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'New information, or a repeat?',
        groups: ['New information', 'Repeats a current feature'],
        items: [
          { text: 'Monday (from weekday)', group: 0 },
          { text: 'Rain on the day', group: 0 },
          { text: 'Long wait (from wait_days)', group: 1 },
          { text: 'Distance in metres', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Long waits miss way more. Why isn\'t that in the model?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'It doesn\'t matter.', why: 'It matters; it\'s already counted.' },
          { text: 'It is: through wait_days. The model already pushes risk up with every extra day, so a separate "long wait" column adds nothing new.' },
          { text: 'I\'ll add it twice.', why: 'Repeats don\'t help.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the new feature to where it comes from.',
        pairs: [
          ['monday', 'weekday'],
          ['long_wait', 'wait_days'],
          ['young_adult', 'age_group'],
          ['vaccination', 'visit_type'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Building a feature.',
        language: 'python',
        template: 'df["long_wait"] = (df["wait_days"] [[1]] 14).[[2]](int)',
        blanks: [['>'], ['astype']],
        distractors: ['==', 'sum'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion is wrong?',
        lines: ['Long waits miss 28.6% of the time.', 'wait_days is already a feature.', 'So long_wait will improve the model a lot.'],
        bug: 2,
        fix: 'So long_wait probably adds little; test it.',
        explanation: 'A feature that repeats a current one rarely helps.',
      },
      {
        kind: 'writeCode',
        prompt: 'On validation, print minutes lost with the five features plus long_wait',
        starter: VAL + F5 + 'cols = feats + ["long_wait"]\n' + PIPE + 'model.fit(train[cols], train["no_show"])\n',
        solution: VAL + F5 + 'cols = feats + ["long_wait"]\n' + PIPE + 'model.fit(train[cols], train["no_show"])\nflags = (model.predict_proba(val[cols])[:, 1] >= 0.2).astype(int)\nprint(minutes(flags, val["no_show"]))\n',
        hint: 'Flags at 0.2, then minutes(flags, val["no_show"])',
        checks: [{ message: 'Print 1245', outputEquals: '1245' }],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a new feature worth testing?',
        options: [
          { text: 'It carries information the model doesn\'t have yet, known before the appointment' },
          { text: 'It has a big effect on its own', why: 'long_wait did, and added nothing.' },
          { text: 'It\'s easy to build', why: 'Ease isn\'t usefulness.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a piece of information that sounds new but really repeats something you already know?',
    starters: ['For example...'],
  },
  deepen: {
    title: 'Interactions',
    summary: 'Some new features combine two columns, like "rural and no reminder". They help when a clue matters differently in different groups. Chapter 10\'s forests find many of these by themselves.',
  },
  notes: 'long_wait (wait > 14): 371 bookings, no-show 0.286 vs 0.164. Validation (weeks 1-9 -> 10-11, scaled LR, threshold 0.2): five features 1245; + long_wait 1245.',
};

export default lesson;
