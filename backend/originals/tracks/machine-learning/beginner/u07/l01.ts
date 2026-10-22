import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { BASE, PRED } from './code';

/** Chapter 7 · Lesson 1 — The accuracy trap. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The accuracy trap',
  summary: 'v0.6 is 82% accurate. A "model" that says everyone comes is 81.5% accurate, and catches nobody. Folake wants to know what the team has been measuring. This chapter answers her.',
  minutes: 12,
  outcomes: [
    'Explain why accuracy can mislead when one answer is rare',
    'Compare a model with "everyone comes"',
    'Say what accuracy hides',
  ],
  learn: [
    {
      kind: 'story',
      title: 'What have we been measuring?',
      beats: [
        { speaker: 'folake', text: 'Ours: 82%. Everyone-comes: 81.5%. Half a point for weeks of work?' },
        { speaker: 'halima', text: 'Of 200 bookings in week 12, 163 came and 37 missed. Saying "everyone comes" is right 163 times without thinking.' },
        { speaker: 'miracle', text: 'When one answer is rare, accuracy is mostly a measure of how rare it is. It barely sees the thing we care about.' },
        { speaker: 'chidi', text: 'So our model is basically "everyone comes" with extra steps?' },
        { speaker: 'tey', text: 'Not at all: Bisi\'s list reached 12 no-shows in 20 calls. "Everyone comes" reaches zero. Accuracy just can\'t see the difference. What should Halima do?' },
      ],
      choice: {
        prompt: 'How should Halima answer Folake?',
        options: [
          { text: 'Count the four kinds of right and wrong, and measure how many no-shows the model actually catches.', outcome: 'Yes. That\'s exactly this chapter: confusion matrices, precision and recall.', best: true },
          { text: 'Train a bigger model to push accuracy to 90%.', outcome: 'The measure is the problem, not the model. A bigger number on the wrong measure helps nobody.' },
          { text: 'Report 82% anyway: it\'s true.', outcome: 'True and misleading. The board would think the model is far better than "doing nothing" when accuracy can\'t tell.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Two accuracies',
      caption: 'v0.6 against "everyone comes" on week 12.',
      code: PRED + '\nprint("v0.6 accuracy:", (pred == y).mean())\nprint("Everyone comes:", (y == 0).mean())\nprint("No-shows v0.6 flags correctly:", ((pred == 1) & (y == 1)).sum())\nprint("No-shows everyone-comes flags:", 0)\n',
      challenge: 'What would accuracy be if 99 in 100 patients came?',
    },
  ],
  apply: {
    scenario: 'The accuracy trap.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the accuracy of "everyone comes" on week 12, rounded to 3 places',
        starter: BASE,
        solution: BASE + 'print(round((y == 0).mean(), 3))\n',
        hint: '(y == 0).mean()',
        checks: [{ message: 'Print 0.815', outputEquals: '0.815' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "everyone comes" score 81.5%?',
        options: [
          { text: 'Because it\'s a clever model', why: 'It never thinks at all.' },
          { text: 'Because 81.5% of week-12 patients really came' },
          { text: 'Because of a bug', why: 'It\'s exactly what accuracy measures.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many week-12 no-shows v0.6 correctly predicts at the default threshold',
        starter: PRED,
        solution: PRED + 'print(((pred == 1) & (y == 1)).sum())\n',
        hint: '((pred == 1) & (y == 1)).sum()',
        checks: [{ message: 'Print 6', outputEquals: '6' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is accuracy a good measure here?',
        groups: ['Accuracy works', 'Accuracy misleads'],
        items: [
          { text: 'Half the patients miss', group: 0 },
          { text: '1 in 5 patients miss', group: 1 },
          { text: 'Fraud in 1 of 1,000 payments', group: 1 },
          { text: 'Coin flip: heads or tails', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'So is 82% good or bad?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Good: anything above 80% is good.', why: 'Doing nothing is above 80% here.' },
          { text: 'Bad: we should scrap it.', why: 'It catches no-shows that doing nothing misses.' },
          { text: 'On its own it tells us almost nothing: doing nothing scores 81.5%. The useful question is how many no-shows it catches, and how many calls that takes.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to week 12.',
        pairs: [
          ['200', 'Bookings'],
          ['163', 'Came'],
          ['37', 'Missed'],
          ['0.815', 'Accuracy of "everyone comes"'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The trap in one line.',
        template: 'When one answer is [[1]], a model that never predicts it can still score high [[2]].',
        blanks: [['rare'], ['accuracy']],
        distractors: ['common', 'recall'],
      },
      {
        kind: 'findBug',
        prompt: 'Which claim falls into the trap?',
        lines: ['Week 12 had 37 no-shows out of 200.', '"Everyone comes" catches none of them.', 'Our model is 82% accurate, so it\'s far better than doing nothing.'],
        bug: 2,
        fix: 'Our model catches no-shows that doing nothing can\'t, but accuracy barely shows it.',
        explanation: '82% vs 81.5% says nothing about how many no-shows are caught.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many week-12 no-shows does "everyone comes" catch?',
        answers: ['0', 'zero', 'none'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'A fraud model is 99.9% accurate when 1 in 1,000 payments is fraud. What do you ask first?',
        options: [
          { text: 'How many of the frauds does it actually catch?' },
          { text: 'Can it reach 100%?', why: 'Accuracy is the wrong lens.' },
          { text: 'Nothing: 99.9% is excellent', why: '"Never fraud" scores 99.9% too.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a number that sounds impressive but might hide the real story. What would you ask about it?',
    starters: ['The number...', 'I\'d ask...'],
  },
  deepen: {
    title: 'Imbalanced data',
    summary: 'When one class is much rarer than the other, the data is called imbalanced. Fraud, disease screening and no-shows are all imbalanced. In these problems, accuracy is almost never the right headline.',
  },
  notes: 'Week 12: 200 bookings, 37 no-shows, 163 came. Everyone-comes accuracy 0.815; v0.6 accuracy 0.82, true positives at 0.5: 6.',
};

export default lesson;
