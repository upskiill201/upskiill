import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Step-by-step: goals you can reach. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'A goal you can actually reach',
  summary: '"Save for a laptop" isn\'t a goal yet. It\'s a wish. Kofi turns it into a goal with an amount, a date and a weekly number he can check every Sunday.',
  minutes: 11,
  outcomes: [
    'Turn a wish into a goal with an amount and a date',
    'Work out the weekly target for any goal',
    'Check whether a goal is realistic',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From wish to goal',
      steps: [
        { title: '1. Name it exactly', body: 'Not "a laptop". "A used laptop that meets the department\'s spec for the programming module." The more exact, the easier to price.' },
        { title: '2. Price it honestly', body: 'Check at least three sellers. Kofi: GH₵3,400, GH₵3,500, GH₵3,650. He plans on GH₵3,500: the middle, not the cheapest hope.' },
        { title: '3. Set the date', body: 'When do you need it? Kofi: the first day of next semester, 16 weeks away.' },
        { title: '4. Subtract what you have', body: 'What\'s already set aside for this goal? Kofi\'s answer comes in lesson 7, after Miracle\'s advice. For now: about GH₵490.' },
        { title: '5. Divide by the weeks', body: '(Goal − what you have) ÷ weeks = weekly target. (3,500 − 490) ÷ 16 = about GH₵188 a week.' },
        { title: '6. Compare with what you save now', body: 'Kofi saves about GH₵55 a week. Target: GH₵188. The gap is about GH₵133 a week. Now he knows exactly what he\'s solving.' },
      ],
    },
    {
      kind: 'check',
      question: 'Goal GH₵1,000, already saved GH₵200, 10 weeks. What\'s the weekly target?',
      options: ['GH₵80', 'GH₵100', 'GH₵120'],
      answer: 0,
      explanation: '(1,000 − 200) ÷ 10 = 80.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '(Goal − what you have) ÷ weeks = weekly target. Then compare it with what you save now. The gap is your real problem.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s laptop goal.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps from wish to goal.',
        lines: ['Name it exactly', 'Price it honestly', 'Set the date', 'Subtract what you have', 'Divide by the weeks', 'Compare with what you save now'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Wish or goal?',
        groups: ['Wish', 'Goal'],
        items: [
          { text: '"Save for a laptop"', group: 0 },
          { text: '"GH₵3,500 by the first day of next semester"', group: 1 },
          { text: '"Have more money someday"', group: 0 },
          { text: '"GH₵300 emergency fund in 6 weeks"', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Goal GH₵3,500, already have GH₵490. How much is still needed?',
        answers: ['3010', '3,010', 'GH₵3,010', 'GH₵3010'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'GH₵3,010 over 16 weeks is about how much a week?',
        options: [
          { text: 'About GH₵188' },
          { text: 'About GH₵300', why: 'That would be about GH₵4,800.' },
          { text: 'About GH₵55', why: 'That\'s what he saves now, not what he needs.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'I\'ll plan on GH₵3,400, the cheapest shop. Less to save!',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Plan on the middle price, GH₵3,500. If you find it cheaper later, that\'s a bonus, not a shortfall.' },
          { text: 'Great idea, aim low.', why: 'If that shop sells out, he\'s short on day one.' },
          { text: 'Plan on GH₵5,000 to be safe.', why: 'Too high makes the goal feel impossible.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The weekly target.',
        template: '(Goal − what you [[1]]) ÷ [[2]] = weekly target.',
        blanks: [['have'], ['weeks']],
        distractors: ['owe', 'friends'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Target GH₵188 a week, saving GH₵55 now. How big is the weekly gap?',
        answers: ['133', 'GH₵133', '133 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which step of this goal is missing?',
        lines: [
          'A used laptop that meets the spec.',
          'About GH₵3,500.',
          'Sometime soon.',
          'I have GH₵490.',
        ],
        bug: 2,
        fix: 'By the first day of next semester, in 16 weeks.',
        explanation: 'Without a date there\'s no weekly target, and "soon" never arrives.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the goal to its weekly target.',
        pairs: [
          ['GH₵600 in 12 weeks', 'GH₵50 a week'],
          ['GH₵400 in 8 weeks', 'GH₵50 a week, too'],
          ['GH₵900 in 10 weeks', 'GH₵90 a week'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why compare the target with what you save now?',
        options: [
          { text: 'It shows the exact gap you need to close, so you know what to solve' },
          { text: 'To feel bad about it', why: 'The point is to see the problem clearly, not to feel bad.' },
          { text: 'It doesn\'t matter', why: 'Without it, the goal is just a hope.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Turn your own wish into a goal: exact thing, honest price, date, what you have, weekly target. What\'s your gap?',
    starters: ['My goal is...', 'By...', 'Weekly target:...', 'I save now:...'],
  },
  deepen: {
    title: 'SMART goals',
    summary: 'You may have seen goals called SMART: specific, measurable, achievable, relevant and time-bound. Kofi\'s six steps do the same job in plain words: exact, priced, dated, and checked against what\'s possible.',
  },
  notes: 'Fictional prices: 3,400 / 3,500 / 3,650. (3,500 − 490)/16 = 188.1. Weekly gap 188 − 55 = 133. SMART: Doran (1981), Management Review.',
};

export default lesson;
