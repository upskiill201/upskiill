import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Before/After: steady path vs bumpy path. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Two paths to the same place',
  summary: 'Two made-up investments, each starting with ₹1,00,000. One climbs steadily. One leaps and crashes. After five years they end in almost the same place. Which would you actually have stuck with?',
  minutes: 11,
  outcomes: [
    'See how the path matters, not just the ending',
    'Judge how much volatility you could really live with',
    'Understand why people sell at the bottom',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Five years, ₹1,00,000, two paths (example numbers)',
      before: {
        label: 'The steady path',
        text: 'Year 1: +6% → ₹1,06,000\nYear 2: +6% → ₹1,12,360\nYear 3: +6% → ₹1,19,102\nYear 4: +6% → ₹1,26,248\nYear 5: +6% → ₹1,33,823\nWorst moment: never below the start',
      },
      after: {
        label: 'The bumpy path',
        text: 'Year 1: +35% → ₹1,35,000\nYear 2: −30% → ₹94,500\nYear 3: +25% → ₹1,18,125\nYear 4: −10% → ₹1,06,313\nYear 5: +26% → ₹1,33,954\nWorst moment: below the start, after a 30% fall',
      },
      notes: [
        'Both end at about ₹1,34,000. On paper, they\'re the same.',
        'In real life, many people on the bumpy path sell in year 2, after the 30% fall, and never see the recovery.',
        'The question isn\'t "which ends higher?" It\'s "which could I actually stay in?"',
        'Some bumpy investments do end much higher over decades. You only get that if you can sit through the bumps.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The path matters. An investment only works for you if you can stay in it through the bad years. Be honest about how much falling you could watch.',
    },
  ],
  apply: {
    scenario: 'Two paths.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Both paths end at about ₹1,34,000. What\'s the big difference?',
        options: [
          { text: 'The steady one ends much higher', why: 'They end about the same.' },
          { text: 'The bumpy path drops below the start, which makes many people sell' },
          { text: 'No difference', why: 'The path is very different.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Bumpy path, year 2: ₹1,35,000 falls 30%. Value?',
        answers: ['94500', '94,500', '₹94,500', '₹94500'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Steady path or bumpy path?',
        groups: ['Steady', 'Bumpy'],
        items: [
          { text: 'Never below the start', group: 0 },
          { text: 'A 30% fall in year 2', group: 1 },
          { text: '+6% every year', group: 0 },
          { text: '+35% in year 1', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'I\'d never sell in year 2. I\'m not scared.',
        prompt: 'Arjun\'s honest reply?',
        options: [
          { text: 'Everyone says that in year 1. Watching real lakhs disappear feels different. Test yourself with a small amount first.' },
          { text: 'Then put everything in.', why: 'Confidence before a fall is easy.' },
          { text: 'You\'re lying.', why: 'Unkind; the point is honesty about feelings.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The key question.',
        template: 'Not "which ends [[1]]?" but "which could I actually [[2]] in?"',
        blanks: [['higher'], ['stay']],
        distractors: ['faster', 'sell'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each bumpy year to its value.',
        pairs: [
          ['Year 1', '₹1,35,000'],
          ['Year 2', '₹94,500'],
          ['Year 3', '₹1,18,125'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought leads to selling at the bottom?',
        lines: [
          'I knew this could fall 30%.',
          'I don\'t need this money for ten years.',
          'It\'s down 30%, I\'ll get out before it\'s zero.',
        ],
        bug: 2,
        fix: 'It\'s down, as I expected. I\'ll stick to my plan.',
        explanation: 'Selling after a fall turns a temporary drop into a real loss.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s a sensible way to test how much volatility you can handle?',
        options: [
          { text: 'Put everything in and see', why: 'An expensive test.' },
          { text: 'Start small and notice how you feel when it drops' },
          { text: 'Ask a friend how they feel', why: 'Your feelings are what matter.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Steady path, year 1: ₹1,00,000 grows 6%. Value?',
        answers: ['106000', '1,06,000', '106,000', '₹1,06,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When can a bumpy investment be worth it?',
        options: [
          { text: 'When you need the money next year', why: 'Then a fall could hit at the worst time.' },
          { text: 'Never', why: 'Over decades, some bumpy investments end much higher.' },
          { text: 'When you can leave it for many years and sit through the falls' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If ₹1,00,000 of yours fell to ₹70,000, what would you honestly feel, and do?',
    starters: ['I\'d feel...', 'I\'d probably...'],
  },
  deepen: {
    title: 'Max drawdown',
    summary: 'Professionals call the biggest fall from a peak to a low the "maximum drawdown". Looking at an investment\'s past drawdowns (not a promise about the future) helps you ask: could I have sat through that?',
  },
  notes: 'Example numbers: 1.06^5 = 1.33823; bumpy 1.35 × 0.7 × 1.25 × 0.9 × 1.26 = 1.33954. Illustrative only.',
};

export default lesson;
