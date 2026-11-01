import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { VAL_BASE, VAL_MINUTES } from './code';

/** Chapter 10 · Lesson 17 — Common forest mistakes. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common forest mistakes',
  summary: 'Forgetting random_state, growing every tree to the end, trusting one split, reading importance as cause. Five beliefs about forests, tested.',
  minutes: 12,
  outcomes: [
    'Avoid the common forest mistakes',
    'Keep forest results repeatable',
    'Judge forests by the same rules as everything else',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Forests can\'t overfit, so depth doesn\'t matter.',
          isFact: false,
          explain: 'Myth. An unlimited forest loses 1,450 minutes on weeks 10 and 11; depth 5 loses 1,260. Averaging softens overfitting; it doesn\'t remove it.',
        },
        {
          text: 'Without random_state, the same code can give different results each run.',
          isFact: true,
          explain: 'Fact. The draws and feature choices are random. Fix random_state so others can check your numbers.',
        },
        {
          text: 'A forest that wins on one split is the better model.',
          isFact: false,
          explain: 'Myth. A 50-tree forest beat v0.8 on weeks 10 and 11 (1,205 vs 1,225). Across 11 weeks, no forest beats v0.9.',
        },
        {
          text: 'Forests don\'t need scaling.',
          isFact: true,
          explain: 'Fact. Trees split on one feature at a time, so units don\'t matter. (Logistic regression does need it for fair weights.)',
        },
        {
          text: 'Feature importance tells you what to change.',
          isFact: false,
          explain: 'Myth. It tells you what helps the model guess. What to change needs a fair test.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Scaling doesn\'t matter to trees',
      caption: 'The same forest, raw and scaled features.',
      code: VAL_BASE + 'scaled = make_pipeline(StandardScaler(), RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42))\nraw = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)\nfor name, model in [("raw", raw), ("scaled", scaled)]:\n    model.fit(train[feats], train["no_show"])\n    flags = (model.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\n    print(name, minutes(flags, val["no_show"]))\n',
      challenge: 'Why are the two numbers the same?',
    },
  ],
  apply: {
    scenario: 'Common forest mistakes.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit the standard forest inside a pipeline with StandardScaler and print its validation minutes lost',
        starter: VAL_BASE + 'model = make_pipeline(StandardScaler(), RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42))\n',
        solution: VAL_BASE + 'model = make_pipeline(StandardScaler(), RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42))\nmodel.fit(train[feats], train["no_show"])\n' + VAL_MINUTES('model'),
        hint: 'Fit, flag val at 0.2, minutes',
        checks: [{ message: 'Print 1260', outputEquals: '1260' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Forests can\'t overfit', group: 0 },
          { text: 'Fix random_state', group: 1 },
          { text: 'One split decides', group: 0 },
          { text: 'Trees don\'t need scaling', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why doesn\'t scaling change a forest?',
        options: [
          { text: 'Forests scale automatically', why: 'They just don\'t need it.' },
          { text: 'It does change it', why: 'Same 1,260 both ways.' },
          { text: 'Each split compares one feature with a cut-off, so units don\'t matter' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Fit an unlimited forest (100 trees, random_state=42) and print its training accuracy on weeks 1 to 9, rounded to 3 places',
        starter: VAL_BASE + 'wild = RandomForestClassifier(n_estimators=100, random_state=42).fit(train[feats], train["no_show"])\n',
        solution: VAL_BASE + 'wild = RandomForestClassifier(n_estimators=100, random_state=42).fit(train[feats], train["no_show"])\nprint(round(wild.score(train[feats], train["no_show"]), 3))\n',
        hint: 'wild.score(train[feats], train["no_show"])',
        checks: [{ message: 'Print 0.969', outputEquals: '0.969' }],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'My forest got a different score from yours with the same code!',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Did you set random_state? Without it, every run draws different bookings and features. Use 42 and we\'ll match.' },
          { text: 'Forests are broken.', why: 'They\'re random unless you fix the seed.' },
          { text: 'Run it until it matches.', why: 'Fix the seed instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its fix.',
        pairs: [
          ['No random_state', 'Set random_state=42'],
          ['Unlimited depth', 'Limit depth or leaf size'],
          ['Judged on one split', 'Cross-validate over 11 weeks'],
          ['Importance read as cause', 'Test causes fairly'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A repeatable forest.',
        language: 'python',
        template: 'RandomForestClassifier(n_estimators=100, max_depth=5, [[1]]=[[2]])',
        blanks: [['random_state'], ['42']],
        distractors: ['seed', 'None'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes results impossible to repeat?',
        language: 'python',
        lines: ['forest = RandomForestClassifier(n_estimators=100, max_depth=5)', 'forest.fit(train[feats], train["no_show"])', 'print(forest.score(val[feats], val["no_show"]))'],
        bug: 0,
        fix: 'forest = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)',
        explanation: 'No random_state, no repeatable forest.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'On weeks 10 and 11, how many minutes did the unlimited forest lose?',
        answers: ['1450', '1,450'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which rule applies to forests exactly as to every model?',
        options: [
          { text: 'Scale first', why: 'Forests don\'t need it.' },
          { text: 'Bigger is better', why: 'Not on this data.' },
          { text: 'Choose with cross-validation; open the test week once' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which forest mistake do you think you\'d make first?',
    starters: ['Probably...'],
  },
  deepen: {
    title: 'Reproducibility',
    summary: 'Being able to rerun an analysis and get the same numbers is called reproducibility. Fixed seeds, saved data versions and saved pipelines make it possible.',
  },
  notes: 'Weeks 1-9 -> 10-11: RF(100, depth 5) 1260 raw and scaled; unlimited RF train 0.969, val minutes 1450; RF 50 trees 1205 vs v0.8 1225 on this split only.',
};

export default lesson;
