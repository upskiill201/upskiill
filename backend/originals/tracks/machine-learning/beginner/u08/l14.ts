import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F5, IMPORTS, MINUTES, PIPE, PIPE_IMPORTS, VAL_SPLIT } from './code';

const VAL = IMPORTS + PIPE_IMPORTS + DATA + VAL_SPLIT + MINUTES + F5;

/** Chapter 8 · Lesson 14 — Features you shouldn't use. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Features you shouldn\'t use',
  summary: 'Some columns would make the model look brilliant and be useless, or worse, unfair. Five beliefs about which features to leave out, and the leak that cuts validation minutes by more than half.',
  minutes: 12,
  outcomes: [
    'Spot leaks, IDs and features that never repeat',
    'Explain why a feature can be accurate and still wrong to use',
    'Check every feature against "known before, fair to use"',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'If a feature improves the score a lot, keep it.',
          isFact: false,
          explain: 'Myth. confirmed_on_day cuts validation minutes from 1,245 to 480. It\'s filled in at the desk on the day: it\'s nearly the answer. In real use you won\'t have it when Bisi calls.',
        },
        {
          text: 'A feature is safe if it\'s known before the call is made.',
          isFact: true,
          explain: 'Fact, and it\'s the first test. Wait, distance, past misses, reminder, forecast rain and weekday all pass.',
        },
        {
          text: 'ID numbers are useful because they\'re unique.',
          isFact: false,
          explain: 'Myth. Unique is the problem: they can only be memorised. Lesson 13 showed 100% training, no gain on validation.',
        },
        {
          text: 'Some features are legal and predictive, but still need a fairness check.',
          isFact: true,
          explain: 'Fact. Age group, for example. Using it could mean young adults get more calls, or fewer reminders. Chapter 12 checks groups like this properly.',
        },
        {
          text: 'Leaving out a predictive feature is always a mistake.',
          isFact: false,
          explain: 'Myth. Leaving out a leak, an ID or an unfair feature is a decision, not a mistake. Write down why.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The leak, measured',
      caption: 'Validation minutes with and without confirmed_on_day.',
      code: VAL + '\nfor extra in [[], ["confirmed_on_day"]]:\n    cols = feats + extra\n    ' + PIPE.trim() + '\n    model.fit(train[cols], train["no_show"])\n    flags = (model.predict_proba(val[cols])[:, 1] >= 0.2).astype(int)\n    print(extra, minutes(flags, val["no_show"]))\n',
      challenge: 'Why would this "improvement" vanish on the first real Monday?',
    },
  ],
  apply: {
    scenario: 'Features you shouldn\'t use.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'On validation, print minutes lost with the five features plus confirmed_on_day',
        starter: VAL + 'cols = feats + ["confirmed_on_day"]\n' + PIPE,
        solution: VAL + 'cols = feats + ["confirmed_on_day"]\n' + PIPE + 'model.fit(train[cols], train["no_show"])\nflags = (model.predict_proba(val[cols])[:, 1] >= 0.2).astype(int)\nprint(minutes(flags, val["no_show"]))\n',
        hint: 'Fit, flag at 0.2, minutes',
        checks: [{ message: 'Print 480', outputEquals: '480' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Big improvement means keep it', group: 0 },
          { text: 'Known before the call is the first test', group: 1 },
          { text: 'Unique IDs are useful', group: 0 },
          { text: 'Some features need a fairness check', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is confirmed_on_day off limits?',
        options: [
          { text: 'It\'s text', why: 'It\'s 0 or 1.' },
          { text: 'It\'s unfair', why: 'The problem is timing: it\'s a leak.' },
          { text: 'It\'s filled in on the day, after Bisi\'s calls: in real use it doesn\'t exist yet' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how often confirmed_on_day equals 1 minus no_show, rounded to 3 places (how close it is to the answer)',
        starter: IMPORTS + DATA,
        solution: IMPORTS + DATA + 'print(round((df["confirmed_on_day"] == 1 - df["no_show"]).mean(), 3))\n',
        hint: '(df["confirmed_on_day"] == 1 - df["no_show"]).mean()',
        checks: [{ message: 'Print 0.974', outputEquals: '0.974' }],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Age group predicts no-shows. Why not use it?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Age is illegal.', why: 'It\'s about fairness and evidence, not a blanket ban.' },
          { text: 'It didn\'t earn its place on validation, and even if it had, using age to decide who gets help needs a fairness check first. Chapter 12.' },
          { text: 'Let\'s add it now.', why: 'It made validation worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the column to why it\'s out.',
        pairs: [
          ['confirmed_on_day', 'A leak: filled in on the day'],
          ['appointment_id', 'Unique: can only be memorised'],
          ['week', 'Never repeats'],
          ['age_group', 'Needs a fairness check'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The two questions.',
        template: 'Is it known [[1]] the call? Is it [[2]] to use?',
        blanks: [['before'], ['fair']],
        distractors: ['after', 'cheap'],
      },
      {
        kind: 'findBug',
        prompt: 'Which feature list includes a leak?',
        lines: ['wait_days, distance_km, previous_no_shows', 'sms_reminder, rain, monday', 'previous_no_shows, confirmed_on_day'],
        bug: 2,
        fix: 'previous_no_shows, sms_reminder',
        explanation: 'confirmed_on_day is filled in after the calls.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Chapter 4, how many of the leaky model\'s top 20 really missed?',
        answers: ['19'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What should you do when you leave out a predictive feature?',
        options: [
          { text: 'Hide that it exists', why: 'Transparency matters.' },
          { text: 'Add it back quietly later', why: 'Decisions should be visible.' },
          { text: 'Write down why, so the decision can be checked later' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a decision about people (jobs, loans, school places). Which information would be predictive but unfair to use?',
    starters: ['For example...'],
  },
  deepen: {
    title: 'Proxies',
    summary: 'Removing a sensitive column isn\'t always enough: another column can stand in for it, like a postcode for income. Chapter 12 shows how to check outcomes by group instead.',
  },
  notes: 'Validation (scaled LR, 0.2): five features 1245; + confirmed_on_day 480. confirmed_on_day == 1 - no_show for 97.4% of rows.',
};

export default lesson;
