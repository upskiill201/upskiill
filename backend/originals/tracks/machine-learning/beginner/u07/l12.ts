import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { PRED, PROBS } from './code';

/** Chapter 7 · Lesson 12 — One number? F1, honestly. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'One number? F1, honestly',
  summary: 'Chidi wants one number for the leaderboard. F1 combines precision and recall into one. A short reading on what it\'s good for, and what it quietly assumes.',
  minutes: 11,
  outcomes: [
    'Explain what F1 combines',
    'Calculate F1 with f1_score',
    'Say when F1 is and isn\'t the right summary',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The F1 score',
      html: '<p>Chidi\'s complaint is fair: two numbers are hard to rank. <strong>F1</strong> squeezes precision and recall into one, using the <em>harmonic mean</em>:</p><p><code>F1 = 2 × precision × recall ÷ (precision + recall)</code></p><p>The harmonic mean punishes imbalance. Chidi\'s "flag only the surest booking" has precision 1.0 but recall 0.027: its F1 is just 0.05. A normal average would say 0.51, which flatters it badly.</p><p>On week 12, v0.6\'s F1 is <strong>0.25</strong> at 0.5, <strong>0.54</strong> at 0.3 and <strong>0.52</strong> at 0.2. On the validation weeks, F1 is highest at 0.2, the same threshold Halima\'s minutes picked.</p><p><strong>The catch:</strong> F1 treats a wasted call and an empty chair as if they mattered about equally. For Bisi they don\'t: one costs 5 minutes, the other 20. Here F1 and minutes happen to agree. If they disagreed, the minutes would win, because they describe the clinic.</p><p><strong>Use F1</strong> to compare models quickly when you don\'t know the costs. <strong>Use costs</strong> when you do.</p>',
    },
    {
      kind: 'check',
      question: 'Precision 1.0, recall 0.027. Why is F1 so low?',
      options: ['F1 ignores precision', 'It\'s a rounding error', 'The harmonic mean is dragged down by the smaller number'],
      answer: 2,
      explanation: 'F1 is only high when both are reasonably high.',
    },
    {
      kind: 'tryIt',
      title: 'F1 at three thresholds',
      caption: 'Week 12.',
      code: PROBS + '\nfor th in [0.2, 0.3, 0.5]:\n    f = (p >= th).astype(int)\n    print(th, "F1", round(f1_score(y, f), 3))\n',
      challenge: 'Calculate F1 at 0.5 by hand from precision 0.545 and recall 0.162.',
    },
  ],
  apply: {
    scenario: 'F1, honestly.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print v0.6\'s F1 on week 12 at the default threshold, rounded to 2 places',
        starter: PRED,
        solution: PRED + 'print(round(f1_score(y, pred), 2))\n',
        hint: 'f1_score(y, pred)',
        checks: [{ message: 'Print 0.25', outputEquals: '0.25' }],
      },
      {
        kind: 'mcq',
        prompt: 'What does F1 combine?',
        options: [
          { text: 'Precision and recall' },
          { text: 'Accuracy and precision', why: 'Accuracy isn\'t in it.' },
          { text: 'True negatives and false negatives', why: 'It never uses true negatives.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the F1 at a threshold of 0.3 on week 12, rounded to 3 places',
        starter: PROBS + 'f = (p >= 0.3).astype(int)\n',
        solution: PROBS + 'f = (p >= 0.3).astype(int)\nprint(round(f1_score(y, f), 3))\n',
        hint: 'f1_score(y, f)',
        checks: [{ message: 'Print 0.543', outputEquals: '0.543' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'F1 or a cost number?',
        groups: ['F1 is fine', 'Use costs'],
        items: [
          { text: 'Quick model comparison, costs unknown', group: 0 },
          { text: 'A leaderboard of many models', group: 0 },
          { text: 'An empty chair costs 4× a call', group: 1 },
          { text: 'Choosing the clinic\'s threshold', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'F1 is one number. Let\'s use it for everything!',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, everything.', why: 'It ignores the clinic\'s real costs.' },
          { text: 'F1 is useless.', why: 'It\'s fine when costs are unknown.' },
          { text: 'It\'s handy, but it treats both mistakes as similar. We know an empty chair costs four times a call, so for the clinic\'s threshold we use minutes.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the threshold to its week-12 F1.',
        pairs: [
          ['0.2', '0.52'],
          ['0.3', '0.54'],
          ['0.5', '0.25'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The formula.',
        template: 'F1 = 2 × precision × recall ÷ (precision [[1]] recall), the [[2]] mean.',
        blanks: [['+'], ['harmonic']],
        distractors: ['×', 'normal'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement about F1 is wrong?',
        lines: ['F1 is high only when precision and recall are both high.', 'F1 uses the harmonic mean.', 'F1 accounts for each mistake\'s real cost.'],
        bug: 2,
        fix: 'F1 ignores the real costs of each mistake.',
        explanation: 'For costs, build a cost number like minutes lost.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Precision 1.0 and recall 0.0: what is the F1?',
        answers: ['0', '0.0', 'zero'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'F1 and minutes both pick 0.2 on validation. If they disagreed, which should win for the clinic?',
        options: [
          { text: 'F1: it\'s the standard', why: 'Standard isn\'t the same as right for this clinic.' },
          { text: 'Minutes: they describe what the clinic actually loses' },
          { text: 'Accuracy', why: 'That\'s the trap.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Is there a single number you use to judge something complicated (a job, a phone, a city)? What does it miss?',
    starters: ['I use...', 'It misses...'],
  },
  deepen: {
    title: 'F-beta',
    summary: 'F-beta lets you weight recall more than precision (beta above 1) or less (beta below 1). F2, for example, cares about recall twice as much. It\'s a halfway house between F1 and real costs.',
  },
  notes: 'Week 12 F1: 0.5 -> 0.25; 0.3 -> 0.543; 0.2 -> 0.52. Validation F1 best at 0.2 (0.513). Top-1 list: P 1.0, R 1/37 = 0.027, F1 0.053.',
};

export default lesson;
