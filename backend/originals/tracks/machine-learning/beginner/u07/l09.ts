import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { PROBS, VAL } from './code';

/** Chapter 7 · Lesson 9 — Moving the threshold, the honest way. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Moving the threshold',
  summary: 'A threshold is a setting, like k or depth. That means it\'s chosen on validation weeks, never on week 12. Six steps to move it properly.',
  minutes: 12,
  outcomes: [
    'Apply your own threshold to predicted chances',
    'Choose a threshold on validation, not the test week',
    'Report precision and recall at the chosen threshold',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Six steps',
      steps: [
        { title: '1. Get chances, not answers', body: 'predict uses 0.5. To choose your own threshold, start from predict_proba\'s column 1.', code: 'p = model.predict_proba(X)[:, 1]', language: 'python' },
        { title: '2. Apply a threshold', body: 'Compare each chance with the threshold to get 1s and 0s.', code: 'flags = (p >= 0.3).astype(int)', language: 'python' },
        { title: '3. Remember: it\'s a setting', body: 'Like k in Chapter 4 and depth in Chapter 6. Choosing it on week 12 would be peeking.' },
        { title: '4. Use the validation weeks', body: 'Train on weeks 1 to 9, get chances for weeks 10 and 11, and try thresholds there. At 0.3 on validation: precision 0.53, recall 0.36.' },
        { title: '5. Decide with an agreed rule', body: 'Which point is best depends on costs. Lesson 11 turns that into a number.' },
        { title: '6. Test once', body: 'Retrain on weeks 1 to 11, apply the chosen threshold to week 12, report both numbers.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Thresholds on validation',
      caption: 'Weeks 10 and 11 only. Week 12 stays closed.',
      code: VAL + '\nfor th in [0.2, 0.25, 0.3, 0.4, 0.5]:\n    f = (pv >= th).astype(int)\n    print(th, "flags", f.sum(), "precision", round(precision_score(yv, f), 2), "recall", round(recall_score(yv, f), 2))\n',
      challenge: 'Which threshold would you pick, and why?',
    },
  ],
  apply: {
    scenario: 'Moving the threshold.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'On the validation weeks, print the recall at a threshold of 0.3, rounded to 2 places',
        starter: VAL + 'f = (pv >= 0.3).astype(int)\n',
        solution: VAL + 'f = (pv >= 0.3).astype(int)\nprint(round(recall_score(yv, f), 2))\n',
        hint: 'recall_score(yv, f)',
        checks: [{ message: 'Print 0.36', outputEquals: '0.36' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why choose the threshold on validation, not week 12?',
        options: [
          { text: 'Week 12 is too small', why: 'Size isn\'t the reason; peeking is.' },
          { text: 'Thresholds don\'t matter on test data', why: 'They do; that\'s why we keep the test clean.' },
          { text: 'It\'s a setting: choosing it on week 12 makes the test score too hopeful' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'On validation, print how many bookings a threshold of 0.2 flags',
        starter: VAL,
        solution: VAL + 'print((pv >= 0.2).sum())\n',
        hint: '(pv >= 0.2).sum()',
        checks: [{ message: 'Print 109', outputEquals: '109' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Settings (choose on validation) or not?',
        groups: ['A setting', 'Not a setting'],
        items: [
          { text: 'k in k-nearest', group: 0 },
          { text: 'Tree depth', group: 0 },
          { text: 'The threshold', group: 0 },
          { text: 'Week 12\'s answers', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'I tried 20 thresholds on week 12 and 0.3 was best. Done?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'You chose a setting on the test week, so its score is too hopeful. Redo it on weeks 10 and 11, then test the chosen one once.' },
          { text: 'Done.', why: 'That\'s peeking.' },
          { text: 'Try 40 more.', why: 'More peeking makes it worse.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the validation threshold to its recall.',
        pairs: [
          ['0.2', '0.58'],
          ['0.25', '0.47'],
          ['0.3', '0.36'],
          ['0.5', '0.16'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Your own threshold.',
        language: 'python',
        template: 'p = model.[[1]](X)[:, 1]\nflags = (p >= 0.3).[[2]](int)',
        blanks: [['predict_proba'], ['astype']],
        distractors: ['predict', 'round'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line peeks?',
        language: 'python',
        lines: ['pv = model.predict_proba(val[feats])[:, 1]', 'pt = model.predict_proba(test[feats])[:, 1]', 'best = max([0.2, 0.3, 0.4], key=lambda th: recall_score(y, pt >= th))'],
        bug: 2,
        fix: 'best = max([0.2, 0.3, 0.4], key=lambda th: recall_score(yv, pv >= th))',
        explanation: 'The choice uses the test week\'s answers. Choose with validation.',
      },
      {
        kind: 'writeCode',
        prompt: 'Week 12, once: print v0.6\'s recall at a threshold of 0.3, rounded to 3 places',
        starter: PROBS,
        solution: PROBS + 'print(round(recall_score(y, (p >= 0.3).astype(int)), 3))\n',
        hint: 'recall_score(y, (p >= 0.3).astype(int))',
        checks: [{ message: 'Print 0.595', outputEquals: '0.595' }],
      },
      {
        kind: 'mcq',
        prompt: 'Recall at 0.3: 0.36 on validation, 0.595 on week 12. Why so different?',
        options: [
          { text: 'A bug', why: 'Both are honest; weeks just differ.' },
          { text: 'Week 12 was used for training', why: 'It wasn\'t.' },
          { text: 'Different weeks, different patients: small samples wobble' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What other "setting" in your life do you only adjust after trying it out somewhere safe first?',
    starters: ['I try...', 'Before...'],
  },
  deepen: {
    title: 'Thresholds in scikit-learn',
    summary: 'Newer versions of scikit-learn include tools to tune a decision threshold with cross-validation. Under the hood, it\'s the same idea as this lesson: try thresholds away from the test data.',
  },
  notes: 'Weeks 1-9 -> validation 10-11 (400 bookings, 86 no-shows): flags/P/R at 0.2 109/0.459/0.581; 0.25 76/0.526/0.465; 0.3 58/0.534/0.36; 0.4 36/0.639/0.267; 0.5 20/0.7/0.163. Week 12 at 0.3: recall 0.595.',
};

export default lesson;
