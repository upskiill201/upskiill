import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

const BANDS =
  'import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\n' +
  'cw = pd.read_csv("clinic_weeks.csv")\n' +
  'cw = cw.assign(band=pd.cut(cw["bookings"], [-1, 24, 34, 100], labels=["quiet", "normal", "busy"]).astype(str))\n' +
  'feats = ["open_hours", "nurses", "holiday", "rain_days"]\n' +
  'train = cw[cw["week"] <= 40]\ntest = cw[cw["week"] > 40]\n';

/** Chapter 6 · Lesson 14 — More than two classes: quiet, normal or busy weeks. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'More than two classes',
  summary: 'Folake\'s staffing team doesn\'t need an exact number; they need "quiet", "normal" or "busy". Three classes instead of two. Three cards on how the same classifiers handle it.',
  minutes: 11,
  outcomes: [
    'Turn a number into classes',
    'Train a classifier with three classes',
    'Read predict_proba with more than two columns',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: numbers into bands.</strong> In clinic_weeks.csv, call a week <em>quiet</em> up to 24 bookings, <em>normal</em> 25 to 34, <em>busy</em> 35 or more. pandas does it with <code>pd.cut</code>. Last year: 116 quiet weeks, 220 normal, 80 busy.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: same classifier, three classes.</strong> LogisticRegression and DecisionTreeClassifier handle any number of classes. fit and predict don\'t change; the labels can even be words. On weeks 41 to 52, logistic regression gets <strong>77.1%</strong> right. The baseline, always guessing "normal", gets 64.6%.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: three columns.</strong> predict_proba now gives three chances per week, one per class, in the order of <code>model.classes_</code>, which sorts alphabetically: busy, normal, quiet. Always check classes_ before reading a column.</p>',
    },
    {
      kind: 'check',
      question: 'With classes busy, normal and quiet, how many columns does predict_proba return?',
      options: ['2', '3', '1'],
      answer: 1,
      explanation: 'One chance per class.',
    },
    {
      kind: 'tryIt',
      title: 'Quiet, normal or busy',
      caption: 'Three classes from clinic_weeks.csv.',
      code: BANDS + '\nmodel = LogisticRegression(max_iter=1000)\nmodel.fit(train[feats], train["band"])\nprint("Classes:", model.classes_)\nprint("Accuracy:", round(model.score(test[feats], test["band"]), 3))\nweek = pd.DataFrame({"open_hours": [50], "nurses": [4], "holiday": [0], "rain_days": [1]})\nprint("Yaba next week:", model.predict(week)[0])\n',
      challenge: 'Make Yaba\'s week a holiday. Does the band change?',
    },
  ],
  apply: {
    scenario: 'Three classes.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Train LogisticRegression(max_iter=1000) on the bands and print its accuracy on weeks 41 to 52, rounded to 3 places',
        starter: BANDS + 'model = LogisticRegression(max_iter=1000)\n',
        solution: BANDS + 'model = LogisticRegression(max_iter=1000)\nmodel.fit(train[feats], train["band"])\nprint(round(model.score(test[feats], test["band"]), 3))\n',
        hint: 'model.fit(train[feats], train["band"]), then score on test',
        checks: [{ message: 'Print 0.771', outputEquals: '0.771' }],
      },
      {
        kind: 'mcq',
        prompt: 'What changes in the code when there are three classes?',
        options: [
          { text: 'Almost nothing: the same fit and predict, with a three-way label' },
          { text: 'You need a new library', why: 'The same classifiers handle many classes.' },
          { text: 'You must train three models by hand', why: 'scikit-learn handles it.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the classes the model learned, as a list',
        starter: BANDS + 'model = LogisticRegression(max_iter=1000)\nmodel.fit(train[feats], train["band"])\n',
        solution: BANDS + 'model = LogisticRegression(max_iter=1000)\nmodel.fit(train[feats], train["band"])\nprint(model.classes_.tolist())\n',
        hint: 'model.classes_.tolist()',
        checks: [{ message: 'Print [\'busy\', \'normal\', \'quiet\']', outputEquals: "['busy', 'normal', 'quiet']" }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which band? (quiet up to 24, normal 25 to 34, busy 35+)',
        groups: ['Quiet', 'Normal or busy'],
        items: [
          { text: '18 bookings', group: 0 },
          { text: '30 bookings', group: 1 },
          { text: '24 bookings', group: 0 },
          { text: '40 bookings', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the band to last year\'s count of weeks.',
        pairs: [
          ['Quiet', '116 weeks'],
          ['Normal', '220 weeks'],
          ['Busy', '80 weeks'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Why bands instead of the number? You had MAE 2.76.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Bands are more accurate.', why: 'They answer a simpler question, not a more accurate one.' },
          { text: 'Staffing decisions come in steps: quiet, normal, busy. A band answers the question they actually ask. The number is still there if they want it.' },
          { text: 'Numbers are banned now.', why: 'Both are useful.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Making bands.',
        language: 'python',
        template: 'pd.[[1]](cw["bookings"], [-1, 24, 34, 100], [[2]]=["quiet", "normal", "busy"])',
        blanks: [['cut'], ['labels']],
        distractors: ['sort', 'names'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line misreads predict_proba?',
        language: 'python',
        lines: ['print(model.classes_)  # busy, normal, quiet', 'probs = model.predict_proba(week)', 'quiet_chance = probs[0, 0]'],
        bug: 2,
        fix: 'quiet_chance = probs[0, 2]',
        explanation: 'Columns follow classes_: busy, normal, quiet. Quiet is column 2.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Always guessing "normal" gets 64.6% of test weeks right. The model gets 77.1%. How many points better?',
        answers: ['12.5'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does the model predict for Yaba next week (50 hours, 4 nurses, no holiday, 1 rainy day)?',
        options: [
          { text: 'Quiet', why: 'Yaba with long hours is usually busy.' },
          { text: 'It can\'t predict words', why: 'Classifiers can predict text labels.' },
          { text: 'Busy' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What number in your life would be more useful as bands, like "low, medium, high"?',
    starters: ['The number is...', 'My bands would be...'],
  },
  deepen: {
    title: 'Multiclass under the hood',
    summary: 'Logistic regression handles several classes by giving each class its own score, then turning the scores into chances that add up to 1. Trees just put a different majority class in each leaf.',
  },
  notes: 'clinic_weeks bands (<=24 quiet, 25-34 normal, >=35 busy): 116/220/80. Train weeks 1-40, test 41-52: LogisticRegression(max_iter=1000) accuracy 0.771; depth-3 tree 0.729; "normal" baseline 0.646 on test. classes_ [busy, normal, quiet]. Yaba plan (50 h, 4 nurses, no holiday, 1 rain) -> busy.',
};

export default lesson;
