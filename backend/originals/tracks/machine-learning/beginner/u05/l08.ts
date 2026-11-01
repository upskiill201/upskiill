import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LOAD, SK, SPLIT } from './code';

/** Chapter 5 · Lesson 8 — Meet scikit-learn: the download, then three lines. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Meet scikit-learn',
  summary: 'Miracle: "Enough pencils." scikit-learn is the toolkit real data scientists use, and it finds the best line in three lines of code. The first time, your phone downloads it, so Halima moves to the office Wi-Fi.',
  minutes: 13,
  outcomes: [
    'Import scikit-learn and create a model',
    'Fit a line to the training weeks',
    'Read the slope and intercept scikit-learn found',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The download',
      beats: [
        { speaker: 'miracle', text: 'Time for the real tools. scikit-learn: used in universities, banks, hospitals. It finds the best line exactly, and the same three steps work for every model in this course.' },
        { speaker: 'halima', text: 'My phone says "Get the machine learning tools: about 70 MB, Wi-Fi is best".' },
        { speaker: 'emmanuel', text: 'Office Wi-Fi. Don\'t burn your data bundle.' },
        { speaker: 'narrator', text: 'It downloads once. After that, the browser keeps it, and the next lessons start much faster.' },
        { speaker: 'tey', text: 'Three steps: import the model, fit it to the training data, read what it learned. Halima has the tools. What should she do first?' },
      ],
      choice: {
        prompt: 'What should Halima do first with scikit-learn?',
        options: [
          { text: 'Fit a line on the training weeks and compare its slope with her pencil line.', outcome: 'Yes. Starting with something you already understand makes the new tool trustworthy. scikit-learn finds a slope of 0.724: her 0.7 was close.', best: true },
          { text: 'Fit it on all 52 weeks for the most data.', outcome: 'Then there\'s nothing left to test on. Chapter 4\'s rules don\'t change because the tool is new.' },
          { text: 'Try every model scikit-learn has.', outcome: 'One step at a time. The same fit-and-predict pattern works for all of them, so learn it on a line first.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The first lesson that uses scikit-learn downloads about 70 MB, once. Wi-Fi is best. After that your browser usually keeps it.',
    },
    {
      kind: 'tryIt',
      title: 'Three lines',
      caption: 'Import, fit, read.',
      code: LOAD + SPLIT + SK + '\nmodel = LinearRegression()\nmodel.fit(train[["open_hours"]], train["bookings"])\nprint("Slope:", round(model.coef_[0], 3))\nprint("Intercept:", round(model.intercept_, 3))\n',
      challenge: 'How close is scikit-learn\'s slope to Halima\'s 0.7?',
    },
  ],
  apply: {
    scenario: 'Meet scikit-learn.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit a LinearRegression on open_hours for the training weeks and print its slope, rounded to 3 places',
        starter: LOAD + SPLIT + SK + 'model = LinearRegression()\n',
        solution: LOAD + SPLIT + SK + 'model = LinearRegression()\nmodel.fit(train[["open_hours"]], train["bookings"])\nprint(round(model.coef_[0], 3))\n',
        hint: 'model.fit(train[["open_hours"]], train["bookings"]), then model.coef_[0]',
        checks: [{ message: 'Print 0.724', outputEquals: '0.724' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the three steps.',
        lines: ['from sklearn.linear_model import LinearRegression', 'model = LinearRegression()', 'model.fit(train[["open_hours"]], train["bookings"])'],
      },
      {
        kind: 'mcq',
        prompt: 'What does fit do?',
        options: [
          { text: 'Draws a chart', why: 'It finds the numbers. No chart.' },
          { text: 'Tests the model', why: 'Testing comes after, on other weeks.' },
          { text: 'Finds the line with the smallest error on the data you give it' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the intercept scikit-learn found, rounded to 3 places',
        starter: LOAD + SPLIT + SK + 'model = LinearRegression()\nmodel.fit(train[["open_hours"]], train["bookings"])\n',
        solution: LOAD + SPLIT + SK + 'model = LinearRegression()\nmodel.fit(train[["open_hours"]], train["bookings"])\nprint(round(model.intercept_, 3))\n',
        hint: 'model.intercept_',
        checks: [{ message: 'Print -3.984', outputEquals: '-3.984' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the pencil line to scikit-learn\'s.',
        pairs: [
          ['Halima\'s slope', '0.7'],
          ['scikit-learn\'s slope', '0.724'],
          ['Halima\'s intercept', '-3'],
          ['scikit-learn\'s intercept', '-3.984'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Is 70 MB going to eat my data every lesson?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, every lesson.', why: 'It\'s a one-time download that the browser usually keeps.' },
          { text: 'It downloads once. Your browser usually keeps it, so the next lessons start fast. Just do the first one on Wi-Fi.' },
          { text: 'It\'s free, so it doesn\'t matter.', why: 'It\'s free, but mobile data isn\'t. Use Wi-Fi.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Reading the model.',
        language: 'python',
        template: 'print(model.[[1]][0])\nprint(model.[[2]])',
        blanks: [['coef_'], ['intercept_']],
        distractors: ['slope', 'start'],
      },
      {
        kind: 'findBug',
        prompt: 'scikit-learn wants a table of features, not one column. Which line breaks?',
        language: 'python',
        lines: ['model = LinearRegression()', 'model.fit(train["open_hours"], train["bookings"])', 'print(model.coef_)'],
        bug: 1,
        fix: 'model.fit(train[["open_hours"]], train["bookings"])',
        explanation: 'Double brackets [["open_hours"]] give a table with one column. Single brackets give a plain column, which fit refuses.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many MB does the first scikit-learn lesson download?',
        answers: ['70', '70 MB', '70mb'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which data should fit see?',
        options: [
          { text: 'All 52 weeks', why: 'Then nothing is left for an honest test.' },
          { text: 'The test weeks', why: 'Those are for scoring once, at the end.' },
          { text: 'The training weeks only' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Halima\'s pencil slope was 0.7; scikit-learn\'s was 0.724. How does it feel to see a computer confirm your own reasoning?',
    starters: ['It feels...', 'It means...'],
  },
  deepen: {
    title: 'scikit-learn',
    summary: 'scikit-learn is free, open-source and has been developed since 2007 by a large community. Its models share one pattern: create, fit, predict. Learn it once and every model in the next chapters feels familiar.',
  },
  notes: 'LinearRegression on open_hours, train weeks 1-40: coef 0.724, intercept -3.984. Download size measured for Pyodide 0.26.4: scikit-learn ~21 MB + scipy ~45 MB + openblas ~6 MB, about 72 MB (lessons say "about 70 MB"). First stable scikit-learn release 2010; project began 2007.',
};

export default lesson;
