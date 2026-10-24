import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE } from './code';

const DUMMY = BASE + 'from sklearn.dummy import DummyClassifier\n';

/** Chapter 7 · Lesson 2 — Baselines first, with DummyClassifier. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Baselines first',
  summary: 'Before you praise a model, measure "doing nothing" the same way. scikit-learn even has a model for it: DummyClassifier. Six steps to a baseline you can\'t fool yourself with.',
  minutes: 11,
  outcomes: [
    'Build a baseline classifier with DummyClassifier',
    'Score a model and its baseline the same way',
    'Explain what a baseline is for',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A baseline in six steps',
      steps: [
        { title: '1. Ask what "doing nothing" means', body: 'Here: predict the most common answer, "came", for everyone.' },
        { title: '2. Build it', body: 'DummyClassifier with strategy "most_frequent" learns only which answer is most common in training.', code: 'dummy = DummyClassifier(strategy="most_frequent")', language: 'python' },
        { title: '3. Fit it like any model', body: 'It needs the same fit call, even though it ignores the features.', code: 'dummy.fit(train[feats], train["no_show"])', language: 'python' },
        { title: '4. Score it the same way', body: 'Week 12, same answers: 0.815.' },
        { title: '5. Put them side by side', body: 'v0.6 0.82, baseline 0.815. On accuracy, a tiny gap. That tells you accuracy is the wrong measure, not that the model is useless.' },
        { title: '6. Keep it forever', body: 'Every report from now on shows the baseline next to the model, on every measure.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The dummy',
      caption: 'A model that never looks at the features.',
      code: DUMMY + '\ndummy = DummyClassifier(strategy="most_frequent")\ndummy.fit(train[feats], train["no_show"])\nprint("Dummy accuracy:", dummy.score(test[feats], y))\nprint("v0.6 accuracy:", model.score(test[feats], y))\nprint("No-shows the dummy flags:", dummy.predict(test[feats]).sum())\n',
      challenge: 'Try strategy="stratified": it guesses at random in the right proportions.',
    },
  ],
  apply: {
    scenario: 'Baselines first.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit DummyClassifier(strategy="most_frequent") and print its accuracy on week 12',
        starter: DUMMY + 'dummy = DummyClassifier(strategy="most_frequent")\n',
        solution: DUMMY + 'dummy = DummyClassifier(strategy="most_frequent")\ndummy.fit(train[feats], train["no_show"])\nprint(dummy.score(test[feats], y))\n',
        hint: 'dummy.fit(...), then dummy.score(test[feats], y)',
        checks: [{ message: 'Print 0.815', outputEquals: '0.815' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does DummyClassifier(strategy="most_frequent") predict?',
        options: [
          { text: 'A random answer', why: 'That\'s "uniform" or "stratified".' },
          { text: 'The best guess from the features', why: 'It ignores the features.' },
          { text: 'The most common answer in training, for every booking' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many week-12 bookings the dummy predicts as no-shows',
        starter: DUMMY + 'dummy = DummyClassifier(strategy="most_frequent").fit(train[feats], train["no_show"])\n',
        solution: DUMMY + 'dummy = DummyClassifier(strategy="most_frequent").fit(train[feats], train["no_show"])\nprint(dummy.predict(test[feats]).sum())\n',
        hint: 'dummy.predict(test[feats]).sum()',
        checks: [{ message: 'Print 0', outputEquals: '0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good baseline habit, or not?',
        groups: ['Good habit', 'Bad habit'],
        items: [
          { text: 'Same test week as the model', group: 0 },
          { text: 'Shown on every measure', group: 0 },
          { text: 'Scored on its training data', group: 1 },
          { text: 'Left out because it looks too good', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Why bother with a model that ignores the data?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'We don\'t need it.', why: 'It just exposed the accuracy trap.' },
          { text: 'Because it shows what "no skill" scores. If our model can\'t clearly beat it on the measure we care about, we haven\'t built anything useful.' },
          { text: 'To ship it if ours fails.', why: 'It catches nobody.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the strategy to what it does.',
        pairs: [
          ['most_frequent', 'Always the commonest answer'],
          ['stratified', 'Random, in the training proportions'],
          ['uniform', 'Random, 50-50'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The baseline.',
        language: 'python',
        template: 'from sklearn.[[1]] import DummyClassifier\ndummy = DummyClassifier(strategy="[[2]]")',
        blanks: [['dummy'], ['most_frequent']],
        distractors: ['tree', 'best'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line makes the comparison unfair?',
        language: 'python',
        lines: ['dummy.fit(train[feats], train["no_show"])', 'print(model.score(test[feats], y))', 'print(dummy.score(train[feats], train["no_show"]))'],
        bug: 2,
        fix: 'print(dummy.score(test[feats], y))',
        explanation: 'Score both on week 12.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Chapter 5, what was the baseline for weekly bookings? (Hint: always predict the ...)',
        answers: ['average', 'mean', 'the average'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'v0.6 beats the dummy by half a point on accuracy. What does that tell you?',
        options: [
          { text: 'Accuracy isn\'t the right measure for this problem' },
          { text: 'v0.6 is useless', why: 'It catches no-shows the dummy can\'t.' },
          { text: 'The dummy is nearly as good', why: 'It catches nobody.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the "do nothing" baseline in something you\'re trying to improve: your fitness, savings, or study?',
    starters: ['If I did nothing...', 'So my baseline is...'],
  },
  deepen: {
    title: 'Stronger baselines',
    summary: 'A baseline can also be a simple rule, like Halima\'s sticky note from Chapter 1. Beating "everyone comes" is the minimum; beating the nurse\'s rule of thumb is the real test.',
  },
  notes: 'DummyClassifier(most_frequent) fit on weeks 1-11: week 12 accuracy 0.815, predicts 0 no-shows. v0.6 accuracy 0.82.',
};

export default lesson;
