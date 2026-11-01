import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { V9, VAL_BASE, VAL_MINUTES } from './code';

/** Chapter 10 · Lesson 13 — When a simple model wins. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'When a simple model wins',
  summary: 'Forests, boosting, even a team vote of forest and logistic regression: nothing beats v0.9 across 11 weeks. A short reading on why that happens, and why it\'s good news.',
  minutes: 11,
  outcomes: [
    'Explain when simple models beat complex ones',
    'Read the full comparison honestly',
    'See a "no" as a useful result',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Six numbers vs 2,504 leaves',
      html: '<p>Across all 11 learning weeks, minutes lost: <strong>v0.9 6,340</strong>. A soft vote of v0.9 and a forest: 6,435. Boosting: 6,470. The best forest: 6,505. The best tree: 6,615.</p><p><strong>Why the simple model wins here.</strong> Complex models shine when the truth is complicated: when clues interact ("distance only matters if there\'s no bus route") or when patterns have sharp corners. Afiya\'s data looks different. Each clue seems to nudge the risk a little up or down, roughly independently. That\'s exactly the shape logistic regression assumes.</p><p><strong>Small data helps simple models too.</strong> With 2,200 bookings and 402 no-shows, complex models have little room to find subtle patterns before they start learning noise.</p><p><strong>Why it\'s good news.</strong> The best model is also the smallest, fastest and easiest to explain to Mrs Okonkwo. You don\'t often get all four.</p><p><strong>What it doesn\'t mean.</strong> It doesn\'t mean forests are bad. With more data, more clues or messier patterns, they might win. That\'s why the comparison is re-run when things change.</p>',
    },
    {
      kind: 'check',
      question: 'Why does logistic regression suit this data?',
      options: ['It\'s the newest method', 'Each clue seems to nudge risk up or down on its own', 'It uses more trees'],
      answer: 1,
      explanation: 'That\'s the shape logistic regression assumes.',
    },
    {
      kind: 'tryIt',
      title: 'v0.9 on the quick split',
      caption: 'Same weeks as every forest in this chapter.',
      code: VAL_BASE + V9 + 'v9.fit(train[feats], train["no_show"])\nflags = (v9.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\nprint("v0.9:", minutes(flags, val["no_show"]))\n',
      challenge: 'Which forest beat it on this split? Does that change the 11-week verdict?',
    },
  ],
  apply: {
    scenario: 'When a simple model wins.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fit v0.9 on weeks 1 to 9 and print its validation minutes lost',
        starter: VAL_BASE + V9,
        solution: VAL_BASE + V9 + 'v9.fit(train[feats], train["no_show"])\n' + VAL_MINUTES('v9'),
        hint: 'v9.fit(...), then flag val at 0.2',
        checks: [{ message: 'Print 1220', outputEquals: '1220' }],
      },
      {
        kind: 'mcq',
        prompt: 'When do complex models tend to beat simple ones?',
        options: [
          { text: 'When there\'s lots of data and the pattern really is complicated' },
          { text: 'Always', why: 'Not on this data.' },
          { text: 'Never', why: 'On complicated data, they often do.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many no-shows there are in weeks 1 to 11',
        starter: VAL_BASE + 'learning = df[df["week"] <= 11]\n',
        solution: VAL_BASE + 'learning = df[df["week"] <= 11]\nprint(learning["no_show"].sum())\n',
        hint: 'learning["no_show"].sum()',
        checks: [{ message: 'Print 402', outputEquals: '402' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Favours a simple model, or a complex one?',
        groups: ['Favours simple', 'Favours complex'],
        items: [
          { text: 'Each clue nudges risk on its own', group: 0 },
          { text: 'A few thousand rows', group: 0 },
          { text: 'Clues that interact a lot', group: 1 },
          { text: 'Millions of rows', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'So I wasted a chapter on forests?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes.', why: 'A tested "no" is valuable.' },
          { text: 'No: now we know v0.9 holds up against the strongest alternatives. That\'s worth knowing, and you\'ll re-run it when the data grows.' },
          { text: 'Forests secretly won.', why: 'They didn\'t, honestly.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the model to its 11-week minutes.',
        pairs: [
          ['v0.9', '6,340'],
          ['v0.9 + forest vote', '6,435'],
          ['Boosting', '6,470'],
          ['Best forest', '6,505'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The lucky combination.',
        template: 'The best model here is also the [[1]], fastest and easiest to [[2]].',
        blanks: [['smallest'], ['explain']],
        distractors: ['biggest', 'hide'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion overreaches?',
        lines: ['v0.9 wins on 11 weeks of this data.', 'Forests might win with more or messier data.', 'Forests are worse than logistic regression in general.'],
        bug: 2,
        fix: 'On this data, logistic regression wins.',
        explanation: 'The result is about this data, not all data.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Across 11 weeks, how many minutes does the soft vote lose?',
        answers: ['6435', '6,435'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What should trigger re-running the comparison?',
        options: [
          { text: 'A new month, always', why: 'Only if something meaningful changed.' },
          { text: 'Never', why: 'Data changes.' },
          { text: 'Much more data, new clues or a change in the clinics' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Where has the simplest tool turned out to be the best one for you?',
    starters: ['For example...'],
  },
  deepen: {
    title: 'No free lunch',
    summary: 'A famous result in machine learning, the "no free lunch" theorem, says no method is best on every problem. Which model wins depends on the data. That\'s why you test.',
  },
  notes: 'Leave-one-week-out minutes: v0.9 6340; soft VotingClassifier(v0.9 + RF depth 3) 6435; HGB 6470; RF depth 3 6505; tree depth 5 6615. Split 1-9 -> 10-11: v0.9 1220 (RF 50 trees 1205). Weeks 1-11: 2,200 bookings, 402 no-shows.',
};

export default lesson;
