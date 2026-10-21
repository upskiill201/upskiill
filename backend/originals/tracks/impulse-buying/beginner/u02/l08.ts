import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Before/After: a stressed buy vs a calm choice. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Stressed buy vs calm choice',
  summary: 'The night before the anatomy test, Kofi wants GH₵300 headphones "to focus". The same want, handled two ways: the stressed way and the calm way.',
  minutes: 11,
  outcomes: [
    'Notice when stress is making the decision',
    'Use a calm routine before deciding',
    'Come back to a want later, with a clear head',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Headphones, the night before a test',
      before: {
        label: 'The stressed way',
        text: '11:30 p.m., anatomy test tomorrow\n"I can\'t focus, I need noise-cancelling headphones"\nBuys GH₵300 headphones in two minutes\nDelivery: in three days, after the test\nStill can\'t focus; scrolls reviews instead of revising\nTest goes badly; GH₵300 gone',
      },
      after: {
        label: 'The calm way',
        text: '11:30 p.m., anatomy test tomorrow\nHALT + BS: stressed, tired\nTen minutes of flashcards, then sleep\nNext evening, after the test: still want headphones?\nYes, a bit. Adds them to the list; compares prices\nBuys a GH₵120 pair in three weeks, from the fun line',
      },
      notes: [
        'Stress makes a purchase feel like a solution to a problem it can\'t solve: the headphones would arrive after the test.',
        'The calm way still takes the want seriously; it just moves the decision to a calmer time.',
        'The real need that night was sleep and ten minutes of revision.',
        'Decided calmly, the want shrank: a GH₵120 pair, not GH₵300.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Stressed? Deal with the stress first. Decide about the purchase later, when you\'re calm. If the want is real, it will still be there.',
    },
  ],
  apply: {
    scenario: 'The night before the test.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why couldn\'t the GH₵300 headphones help with the test?',
        options: [
          { text: 'They\'d arrive after the test' },
          { text: 'Headphones never help focus', why: 'They might, sometimes. The timing made them useless here.' },
          { text: 'They were broken', why: 'They were fine; timing was the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Stressed way: GH₵300. Calm way: GH₵120. How much saved?',
        answers: ['180', 'GH₵180', '180 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the calm way.',
        lines: ['Notice the urge', 'Run HALT + BS', 'Meet the real need', 'Sleep', 'Decide later, calmly', 'Plan the purchase if still wanted'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Stressed way or calm way?',
        groups: ['Stressed', 'Calm'],
        items: [
          { text: 'Buying in two minutes at 11:30 p.m.', group: 0 },
          { text: 'Ten minutes of flashcards, then sleep', group: 1 },
          { text: 'Scrolling reviews instead of revising', group: 0 },
          { text: 'Comparing prices the next week', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'But I really do want better headphones, not just because of stress.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Then they\'ll still be there after the test. Add them to the list and decide calmly.' },
          { text: 'Then buy them now.', why: 'Now is the stressed moment.' },
          { text: 'Then you can never have them.', why: 'A real want can be planned for.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Deal with the [[1]] first. Decide about the purchase when you\'re [[2]].',
        blanks: [['stress'], ['calm']],
        distractors: ['price', 'tired'],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought is stress talking?',
        lines: [
          'I\'m stressed about anatomy.',
          'I\'ll do ten minutes of flashcards.',
          'If I buy these headphones right now, I\'ll be able to focus.',
        ],
        bug: 2,
        fix: 'Ten minutes of flashcards, then sleep. Headphones can wait.',
        explanation: 'A purchase that can\'t arrive in time can\'t fix tonight\'s focus.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the stressed belief to the calm fact.',
        pairs: [
          ['"I need it now"', 'It arrives after the test'],
          ['"It\'ll fix my focus"', 'Sleep and revision fix focus'],
          ['"I must have the best one"', 'A GH₵120 pair does the job'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How did the want change when Kofi decided calmly?',
        options: [
          { text: 'It shrank: a cheaper pair, bought later, from the fun line' },
          { text: 'It grew', why: 'Calm decisions tend to be smaller.' },
          { text: 'It vanished completely', why: 'He still wanted some, just less.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The GH₵120 pair comes from a GH₵30-a-week fun line. How many weeks?',
        answers: ['4', 'four', '4 weeks'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a purchase you made while stressed. Would you have made it a week later, calm?',
    starters: ['I bought... while stressed', 'A week later I would have...'],
  },
  deepen: {
    title: 'Stress and decisions',
    summary: 'Stress tends to push people towards fast, habitual choices and short-term rewards. That\'s useful when a lion is chasing you, and costly when a sale is. A short pause, a few slow breaths or a walk can bring the thinking part of the brain back online.',
  },
  notes: 'Stress shifts decisions toward habit and immediate reward: e.g. Schwabe & Wolf (2009); Porcelli & Delgado (2009). Stated qualitatively. Fictional prices: headphones 300 vs 120.',
};

export default lesson;
