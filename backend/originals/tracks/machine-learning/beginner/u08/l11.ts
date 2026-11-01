import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { DATA, F6, IMPORTS, MINUTES, MONDAY, PIPE8, PIPE_IMPORTS, RAW, VAL_SPLIT } from './code';

const VAL = IMPORTS + PIPE_IMPORTS + DATA + MONDAY + VAL_SPLIT + MINUTES + F6;

/** Chapter 8 · Lesson 11 — Pipelines: steps in order. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Pipelines: steps in order',
  summary: 'Fill the gaps, scale, then predict, in that order, every single week. A pipeline glues the steps together so none is forgotten or done in the wrong order. Six steps to build one.',
  minutes: 12,
  outcomes: [
    'Build a pipeline with make_pipeline',
    'Fit and predict with a whole pipeline in one call',
    'Look inside a fitted pipeline',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building v0.8\'s pipeline',
      steps: [
        { title: '1. List the steps', body: 'Fill blank distances with the training median. Scale every feature. Then logistic regression.' },
        { title: '2. Glue them', body: 'make_pipeline takes the steps in order and returns one object that behaves like a model.', code: 'model = make_pipeline(SimpleImputer(strategy="median"), StandardScaler(), LogisticRegression())', language: 'python' },
        { title: '3. Fit once', body: 'model.fit(train[feats], ...) fits the imputer, then the scaler, then the regression, each on the training rows, in order.' },
        { title: '4. Predict once', body: 'model.predict_proba(new[feats]) fills, scales and predicts, using what each step learned from training.' },
        { title: '5. Feed it the messy file', body: 'Without the imputer, LogisticRegression refuses blanks: "Input X contains NaN". With it, Emmanuel\'s raw export just works.' },
        { title: '6. Look inside', body: 'model.named_steps lists the steps; model[-1] is the regression with its coefficients.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'With and without the imputer',
      caption: 'The raw export has blank distances.',
      code: IMPORTS + PIPE_IMPORTS + RAW + MONDAY.replace(/df/g, 'raw') + F6 + 'train = raw[raw["week"] <= 11]\n\ntry:\n    LogisticRegression().fit(train[feats], train["no_show"])\nexcept ValueError as error:\n    print("Without:", str(error)[:30])\n' + PIPE8 + 'model.fit(train[feats], train["no_show"])\nprint("With the pipeline: fitted", list(model.named_steps))\n',
      challenge: 'Print model.named_steps["simpleimputer"].statistics_. What are the six fill values?',
    },
  ],
  apply: {
    scenario: 'Pipelines.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build v0.8\'s pipeline and print the names of its steps as a list',
        starter: IMPORTS + PIPE_IMPORTS + PIPE8,
        solution: IMPORTS + PIPE_IMPORTS + PIPE8 + 'print(list(model.named_steps))\n',
        hint: 'list(model.named_steps)',
        checks: [{ message: 'Print the three step names', outputEquals: "['simpleimputer', 'standardscaler', 'logisticregression']" }],
      },
      {
        kind: 'mcq',
        prompt: 'What does model.fit do for a pipeline?',
        options: [
          { text: 'Fits each step in order on the training rows, passing the result to the next' },
          { text: 'Only fits the last step', why: 'Every step learns something.' },
          { text: 'Fits on all the data', why: 'Only on what you pass in.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'On validation, fit the pipeline with six features and print minutes lost at 0.2',
        starter: VAL + PIPE8,
        solution: VAL + PIPE8 + 'model.fit(train[feats], train["no_show"])\nflags = (model.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\nprint(minutes(flags, val["no_show"]))\n',
        hint: 'Same as before: the pipeline acts like one model',
        checks: [{ message: 'Print 1225', outputEquals: '1225' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Order in v0.8\'s pipeline: early or late?',
        groups: ['Early', 'Late'],
        items: [
          { text: 'Fill blanks', group: 0 },
          { text: 'Scale', group: 0 },
          { text: 'Logistic regression', group: 1 },
          { text: 'Predict chances', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Why not just do each step by hand? It\'s three lines.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Pipelines are faster.', why: 'It\'s about getting it right every time.' },
          { text: 'Every week, forever, in the right order, learning from the right rows. A pipeline makes that impossible to get wrong.' },
          { text: 'scikit-learn requires them.', why: 'It doesn\'t; they just prevent mistakes.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to its job.',
        pairs: [
          ['simpleimputer', 'Fills blank distances'],
          ['standardscaler', 'Puts features on one ruler'],
          ['logisticregression', 'Gives the chances'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'v0.8\'s pipeline.',
        language: 'python',
        template: 'model = make_pipeline([[1]](strategy="median"), StandardScaler(), [[2]]())',
        blanks: [['SimpleImputer'], ['LogisticRegression']],
        distractors: ['OneHotEncoder', 'DummyClassifier'],
      },
      {
        kind: 'findBug',
        prompt: 'Which pipeline has the steps in the wrong order?',
        language: 'python',
        lines: ['make_pipeline(SimpleImputer(), StandardScaler(), LogisticRegression())', 'make_pipeline(StandardScaler(), LogisticRegression())', 'make_pipeline(LogisticRegression(), StandardScaler())'],
        bug: 2,
        fix: 'make_pipeline(StandardScaler(), LogisticRegression())',
        explanation: 'The model must be the last step.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a pipeline, what does model[-1] give you?',
        answers: ['the logistic regression', 'logistic regression', 'the last step', 'the model', 'LogisticRegression'],
        placeholder: 'A step',
      },
      {
        kind: 'mcq',
        prompt: 'LogisticRegression on its own meets a blank distance. What happens?',
        options: [
          { text: 'It treats it as 0', why: 'It raises an error.' },
          { text: 'It skips the row', why: 'It raises an error.' },
          { text: 'It refuses: "Input X contains NaN"' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What routine of yours only works if the steps happen in the right order?',
    starters: ['My routine...'],
  },
  deepen: {
    title: 'ColumnTransformer',
    summary: 'When different columns need different steps (scale the numbers, one-hot the words), ColumnTransformer sends each group of columns through its own steps, inside the same pipeline.',
  },
  notes: 'v0.8 pipeline steps: simpleimputer, standardscaler, logisticregression. Validation (weeks 1-9 -> 10-11) six features at 0.2: 1225 minutes. Plain LogisticRegression on raw blanks raises ValueError "Input X contains NaN".',
};

export default lesson;
