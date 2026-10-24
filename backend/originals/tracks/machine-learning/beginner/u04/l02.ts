import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { SETUP } from './code';

/** Chapter 4 · Lesson 2 — Train and test sets: the same predictor, scored two ways. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Train and test sets',
  summary: 'The same predictor can look brilliant or ordinary depending on what you test it on. Score one neighbour on training bookings: 99%. On week 12: 73%. Only one of those numbers is true.',
  minutes: 12,
  outcomes: [
    'Name the training set and the test set, and what each is for',
    'Score a predictor on both and explain the gap',
    'Know which score to report',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Two piles of bookings',
      steps: [
        { title: '1. The training set', body: 'The bookings the predictor learns from. For v0.3, weeks 1 to 11: 2,200 bookings. The predictor is allowed to see everything in them, answers included.' },
        { title: '2. The test set', body: 'Bookings kept locked away and used only to score the predictor. Week 12: 200 bookings. They play the part of tomorrow.', code: 'train = df[df["week"] <= 11]\ntest = df[df["week"] == 12]', language: 'python' },
        { title: '3. Wrap the predictor', body: 'Chapter 3\'s v0.3 becomes one function: give it a training set, a test set, the features and k, and it returns a risk for every test booking.', code: 'risks = knn_risk(train, test, feats, k=15)', language: 'python' },
        { title: '4. Score it on training bookings', body: 'With one neighbour, scored on the first 200 training bookings: 99% right. Every booking finds itself, at distance 0.' },
        { title: '5. Score it on the test set', body: 'The same one-neighbour predictor on week 12: 73% right. "Everyone comes" scores 81.5%. So it\'s actually worse than guessing.' },
        { title: '6. Report the test score', body: 'The training score measures memory. The test score measures prediction. Only the test score goes in a report.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'One predictor, two scores',
      caption: 'k = 1, scored on training bookings, then on week 12.',
      code: SETUP + '\nseen = train.head(200)\nr = knn_risk(train, seen, feats, k=1)\nseen = seen.assign(risk=r)\nprint("On training bookings:", ((seen["risk"] > 0.5).astype(int) == seen["no_show"]).mean())\n\nr = knn_risk(train, test, feats, k=1)\nnew = test.assign(risk=r)\nprint("On week 12:", ((new["risk"] > 0.5).astype(int) == new["no_show"]).mean())\n',
      challenge: 'Change k to 15 in both places. Which score moves more?',
    },
  ],
  apply: {
    scenario: 'Training score or test score?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Score k = 1 on the first 200 training bookings: print the share it gets right',
        starter: SETUP + 'seen = train.head(200)\nseen = seen.assign(risk=knn_risk(train, seen, feats, k=1))\n',
        solution: SETUP + 'seen = train.head(200)\nseen = seen.assign(risk=knn_risk(train, seen, feats, k=1))\nprint(((seen["risk"] > 0.5).astype(int) == seen["no_show"]).mean())\n',
        hint: '((seen["risk"] > 0.5).astype(int) == seen["no_show"]).mean()',
        checks: [{ message: 'Print 0.99', outputEquals: '0.99' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why is k = 1 almost perfect on training bookings?',
        options: [
          { text: 'One neighbour is the best setting', why: 'On week 12 it scores 73%, below guessing.' },
          { text: 'The training weeks are easy', why: 'It\'s looking up its own answer.' },
          { text: 'Each booking\'s nearest neighbour is itself, so it copies its own answer' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Now score the same k = 1 predictor on week 12 and print the share it gets right',
        starter: SETUP + 'new = test.assign(risk=knn_risk(train, test, feats, k=1))\n',
        solution: SETUP + 'new = test.assign(risk=knn_risk(train, test, feats, k=1))\nprint(((new["risk"] > 0.5).astype(int) == new["no_show"]).mean())\n',
        hint: 'The same line as before, with new instead of seen',
        checks: [{ message: 'Print 0.73', outputEquals: '0.73' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each set to its job.',
        pairs: [
          ['Training set', 'What the predictor learns from'],
          ['Test set', 'Locked away, used only to score'],
          ['Week 12', 'Plays the part of tomorrow'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which score is this?',
        groups: ['Training score', 'Test score'],
        items: [
          { text: '99% on bookings it learned from', group: 0 },
          { text: '73% on week 12', group: 1 },
          { text: 'Measures memory', group: 0 },
          { text: 'Goes in the report', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: '99%! Can I tell the board?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, 99% is the number.', why: 'It\'s a memory score. The board needs the test score.' },
          { text: 'That\'s the score on bookings it already knew. On new bookings this version gets 73%, worse than guessing "everyone comes".' },
          { text: 'Tell them 86%, halfway.', why: 'Averaging a fake score with a real one doesn\'t make an honest score.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'The [[1]] score measures memory. The [[2]] score measures prediction.',
        blanks: [['training'], ['test']],
        distractors: ['final', 'best'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line scores the predictor on the wrong bookings?',
        language: 'python',
        lines: ['risks = knn_risk(train, train, feats, k=15)', 'train = train.assign(risk=risks)', 'print((train["risk"] > 0.5).mean())'],
        bug: 0,
        fix: 'risks = knn_risk(train, test, feats, k=15)',
        explanation: 'It scores the training bookings, so every booking is among its own neighbours.',
      },
      {
        kind: 'typeAnswer',
        prompt: '"Everyone comes" scores 81.5% on week 12. k = 1 scores 73%. By how many percentage points is k = 1 worse? (A number.)',
        answers: ['8.5', '8.5%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which score should go in the report?',
        options: [
          { text: 'The test score, on week 12' },
          { text: 'The training score: it\'s higher', why: 'Higher, and meaningless for new bookings.' },
          { text: 'Whichever looks better that day', why: 'Then nobody can trust any number you report.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where outside machine learning do people quote a "training score", like practice results, instead of the real result?',
    starters: ['For example...', 'The real result would be...'],
  },
  deepen: {
    title: 'The test set is a promise',
    summary: 'Keeping a test set locked away is a promise to yourself: this number will be honest. Every time you peek at it, the promise gets weaker. Lesson 4 shows how.',
  },
  notes: 'k=1, 4 features, min-max scaled with training min/max. First 200 training rows: accuracy 0.99 (top 20 by risk all missed). Week 12: accuracy 0.73; "everyone comes" 0.815. Vote: risk > 0.5.',
};

export default lesson;
