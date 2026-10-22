import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Reading: volatility, and why losses hurt more than they look. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Ups, downs and the maths of losing',
  summary: 'Vikram says his trades are "up 30%, down 30%, so I\'m even". Arjun runs the numbers and he isn\'t. Volatility, and the strange maths of recovering from a loss.',
  minutes: 12,
  outcomes: [
    'Explain volatility in plain words',
    'Work out why a loss needs a bigger gain to recover',
    'See why big swings can hurt even when the average looks fine',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Volatility',
      html: '<p><strong>Volatility</strong> is how much, and how fast, something\'s value swings up and down. A fixed deposit barely moves. A single company\'s shares can move 10% in a day. Crypto can move more.</p><p><strong>Why it matters: the maths of losing.</strong> Vikram says: "My trades went up 30%, then down 30%. So I\'m back where I started." Arjun checks:</p><ul><li>Start: ₹1,00,000.</li><li>Up 30%: ₹1,30,000.</li><li>Down 30% of ₹1,30,000 (₹39,000): ₹91,000.</li></ul><p>He\'s <strong>down ₹9,000</strong>, not even. And the order doesn\'t help: down 30% first (₹70,000), then up 30% (₹91,000). Same result.</p><p><strong>Recovering from a loss takes a bigger gain:</strong></p><ul><li>Lose 20% → need +25% to get back.</li><li>Lose 50% → need +100% to get back.</li><li>Lose 90% → need +900% to get back.</li></ul><p>That\'s why big losses are so dangerous, and why people who swing wildly often end up behind even when their "average" looks fine.</p><p><strong>Volatility isn\'t always bad.</strong> For money you won\'t touch for decades, ups and downs along the way matter much less, as long as you don\'t sell in a fall. For money you need soon, volatility can be a disaster.</p>',
    },
    {
      kind: 'check',
      question: '₹1,00,000 falls 50%. What gain does it need to get back to ₹1,00,000?',
      options: ['+50%', '+100%', '+25%'],
      answer: 1,
      explanation: '₹50,000 has to double to reach ₹1,00,000.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A loss needs a bigger gain to recover. Up 30% then down 30% is a loss, not "even". Big swings matter most for money you\'ll need soon.',
    },
  ],
  apply: {
    scenario: 'Vikram\'s "even" trades.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '₹1,00,000 goes up 30%. What\'s it worth?',
        answers: ['130000', '1,30,000', '130,000', '₹1,30,000', '₹130000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Then ₹1,30,000 falls 30%. What\'s it worth now?',
        answers: ['91000', '91,000', '₹91,000', '₹91000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why isn\'t "up 30%, down 30%" even?',
        options: [
          { text: 'Fees', why: 'Even with no fees, it\'s a loss.' },
          { text: 'It is even', why: 'It ends at ₹91,000.' },
          { text: 'The 30% fall is taken from a bigger number, so it removes more rupees' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each loss to the gain needed to recover.',
        pairs: [
          ['Lose 20%', '+25%'],
          ['Lose 50%', '+100%'],
          ['Lose 90%', '+900%'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'My coin fell 60% but it\'ll bounce back 60% easy.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'A 60% bounce only gets you to 64% of where you started. You\'d need it to go up 150%.' },
          { text: 'Yes, you\'ll be even.', why: '0.4 × 1.6 = 0.64.' },
          { text: 'It never bounces.', why: 'It might; the maths is the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Volatility.',
        template: 'Volatility is how much and how fast a value [[1]]. It matters most for money you need [[2]].',
        blanks: [['swings', 'moves'], ['soon']],
        distractors: ['grows', 'later'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Usually low volatility, or high?',
        groups: ['Low', 'High'],
        items: [
          { text: 'Fixed deposit', group: 0 },
          { text: 'One company\'s shares', group: 1 },
          { text: 'Savings account', group: 0 },
          { text: 'Crypto', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Down 30% then up 30% ends below the start.',
          'A 50% loss needs a 100% gain to recover.',
          'A 20% loss needs a 20% gain to recover.',
        ],
        bug: 2,
        fix: 'A 20% loss needs a 25% gain to recover.',
        explanation: '₹80,000 × 1.25 = ₹1,00,000.',
      },
      {
        kind: 'mcq',
        prompt: 'When does volatility matter least?',
        options: [
          { text: 'For next month\'s rent', why: 'That\'s when it matters most.' },
          { text: 'Never', why: 'Time horizon changes how much it matters.' },
          { text: 'For money you won\'t touch for decades, if you don\'t sell in falls' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Start ₹1,00,000. Down 30% first, then up 30%. Final value?',
        answers: ['91000', '91,000', '₹91,000', '₹91000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Have you heard someone say they "broke even" after a big rise and fall? What did the real numbers look like?',
    starters: ['Someone said...', 'The real numbers...'],
  },
  deepen: {
    title: 'Volatility drag',
    summary: 'Because losses need bigger gains to recover, two investments with the same average yearly return can end very differently: the bumpier one usually ends lower. This is sometimes called "volatility drag".',
  },
  notes: 'Arithmetic verified: 1.3 × 0.7 = 0.91; recovery = 1/(1−L) − 1. Kavya: 0.4 × 1.6 = 0.64; need 1/0.4 = 2.5 → +150%.',
};

export default lesson;
