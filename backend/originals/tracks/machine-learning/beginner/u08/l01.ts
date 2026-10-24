import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F4, IMPORTS, SPLIT } from './code';

const BASE = IMPORTS + DATA + SPLIT;
const TOP20 = 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\nprint(t.nlargest(20, "p")["no_show"].sum())\n';

/** Chapter 8 · Lesson 1 — Features matter more than models. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Features matter more than models',
  summary: 'Bisi says the model ignores half the spreadsheet. Before adding anything, Halima checks how much the features already matter: one clue reaches 8 no-shows in 20 calls, four clues reach 12. Same model each time.',
  minutes: 12,
  outcomes: [
    'Explain what a feature is and why it matters',
    'Compare one feature with four in the same model',
    'Plan how to test a new feature honestly',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Half the spreadsheet',
      beats: [
        { speaker: 'bisi', text: 'Visit type, age group, weekday, hour, rain. You\'re using four columns out of fourteen.' },
        { speaker: 'halima', text: 'Fair. First, let me see how much the columns we use matter. Same model, logistic regression, different clues.' },
        { speaker: 'narrator', text: 'With only wait_days, Bisi\'s top 20 reaches 8 no-shows. With all four clues, 12.' },
        { speaker: 'miracle', text: 'Same model, 50% more no-shows reached. That\'s why people say features matter more than models.' },
        { speaker: 'chidi', text: 'So add all fourteen columns. Done by lunch.' },
        { speaker: 'tey', text: 'Some of those columns are words, one is a leak, and one is just an ID. How should Halima add new features?' },
      ],
      choice: {
        prompt: 'How should Halima add Bisi\'s columns?',
        options: [
          { text: 'One idea at a time, turned into numbers properly, kept only if it helps on validation and makes sense on the clinic floor.', outcome: 'Yes. That\'s this chapter: encoding, scaling, filling gaps, pipelines, and a rule for which features earn their place.', best: true },
          { text: 'All fourteen at once, and see what happens on week 12.', outcome: 'You\'d include a leak and an ID, and you\'d be choosing on the test week. Two Chapter 4 mistakes at once.' },
          { text: 'None: four is enough.', outcome: 'Maybe, but Bisi knows things the data might confirm. Test them before deciding.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'One clue vs four',
      caption: 'Same model, same week 12, different features.',
      code: BASE + '\nfor feats in [["wait_days"], ["sms_reminder"], ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]]:\n    model = LogisticRegression().fit(train[feats], train["no_show"])\n    t = test.assign(p=model.predict_proba(test[feats])[:, 1])\n    print(feats, "top 20 reach", t.nlargest(20, "p")["no_show"].sum())\n',
      challenge: 'Try ["previous_no_shows"] alone.',
    },
  ],
  apply: {
    scenario: 'Features matter more than models.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Train on wait_days alone and print how many of week 12\'s top 20 really missed',
        starter: BASE + 'feats = ["wait_days"]\nmodel = LogisticRegression().fit(train[feats], train["no_show"])\n',
        solution: BASE + 'feats = ["wait_days"]\nmodel = LogisticRegression().fit(train[feats], train["no_show"])\n' + TOP20,
        hint: 'Rank week 12 by predict_proba column 1, then nlargest(20)',
        checks: [{ message: 'Print 8', outputEquals: '8' }],
      },
      {
        kind: 'mcq',
        prompt: 'What changed between 8 and 12 no-shows reached?',
        options: [
          { text: 'The model', why: 'Logistic regression both times.' },
          { text: 'Only the features: the model stayed the same' },
          { text: 'The test week', why: 'Week 12 both times.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Now train on the four features and print the top-20 count',
        starter: BASE + F4 + 'model = LogisticRegression().fit(train[feats], train["no_show"])\n',
        solution: BASE + F4 + 'model = LogisticRegression().fit(train[feats], train["no_show"])\n' + TOP20,
        hint: 'Same ranking code',
        checks: [{ message: 'Print 12', outputEquals: '12' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Could it be a feature (known when the booking is made)?',
        groups: ['Possible feature', 'Not a feature'],
        items: [
          { text: 'Visit type', group: 0 },
          { text: 'Weekday of the appointment', group: 0 },
          { text: 'Confirmed on the day', group: 1 },
          { text: 'Appointment ID', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Can\'t we just add all fourteen columns?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, more is always better.', why: 'Leaks and IDs make it worse.' },
          { text: 'No, never add features.', why: 'Good features are the biggest win.' },
          { text: 'Some are words the model can\'t read, one is a leak, one is an ID. We add ideas one at a time and keep only the ones that help on validation.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the features to week 12\'s top 20.',
        pairs: [
          ['wait_days only', '8'],
          ['Four features', '12'],
          ['Four + the leak (Chapter 4)', '19, but useless in real life'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The saying.',
        template: 'Better [[1]] often matter more than a better [[2]].',
        blanks: [['features'], ['model']],
        distractors: ['computers', 'week'],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan breaks the rules?',
        lines: ['Pick one new idea.', 'Test it on weeks 10 and 11.', 'Keep it if week 12 looks better.'],
        bug: 2,
        fix: 'Keep it if validation looks better and it makes sense.',
        explanation: 'Week 12 is opened once, at the end.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many columns does appointments.csv have?',
        answers: ['14', 'fourteen'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What is a feature?',
        options: [
          { text: 'A clue, known before the appointment, that the model uses to predict' },
          { text: 'Any column in the file', why: 'Some columns are leaks or IDs.' },
          { text: 'The answer we predict', why: 'That\'s the label.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'If you predicted whether a friend will be late, what clues would you use?',
    starters: ['I\'d look at...'],
  },
  deepen: {
    title: 'Feature engineering',
    summary: 'Turning raw data into useful clues is called feature engineering. In many real projects it takes more time than choosing the model, and makes more difference.',
  },
  notes: 'Week 12 top 20 with LogisticRegression: wait_days only 8, sms only 6, four features 12 (leak 19 in Ch4). appointments.csv has 14 columns.',
};

export default lesson;
