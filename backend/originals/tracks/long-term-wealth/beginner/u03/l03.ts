import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Reading: inflation and real returns. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The quiet thief: inflation',
  summary: 'Miracle\'s dad remembers when a loaf of bread in Buea cost a fraction of today\'s price. Inflation quietly shrinks money over time. Here\'s how to think about "real" growth, the only kind that matters for the long term.',
  minutes: 12,
  outcomes: [
    'Explain inflation and real returns',
    'Work out whether savings are really growing',
    'See why inflation matters most for long-term money',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Real growth',
      html: '<p><strong>Inflation</strong> is prices rising over time. When prices rise, each naira or franc buys less.</p><p>On a Sunday call, Dad laughs: "When I started teaching, my whole month\'s salary would buy what one week of groceries costs now." That\'s 35 years of inflation.</p><p><strong>The real return</strong> is how much your money grows <em>after</em> inflation. Roughly:</p><p><strong>real return ≈ growth rate − inflation rate</strong></p><ul><li>Savings paying 5% while prices rise 2%: real return about +3%. Your money buys more each year.</li><li>Savings paying 5% while prices rise 20%: real return about −15%. The number goes up; what it buys goes down.</li></ul><p><strong>Why it matters most for the long term:</strong> for money you\'ll spend next month, inflation barely matters. For money you won\'t touch for 30 years, it decides everything. A small negative real return, repeated for decades, can quietly eat most of your savings.</p><p><strong>What people do about it:</strong> keep only short-term and emergency money in cash, and give long-term money a chance to grow faster than prices, usually through long-term, spread-out investments, accepting ups and downs along the way. Inflation varies a lot between countries and years, so check what it is where you live.</p>',
    },
    {
      kind: 'check',
      question: 'Savings pay 4%; prices rise 15%. What\'s the real return, roughly?',
      options: ['About −11%', 'About +4%', 'About +19%'],
      answer: 0,
      explanation: '4 − 15 = −11. The number grows; buying power shrinks.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Real return ≈ growth − inflation. Short-term money can sit in cash. Long-term money needs a real return above zero, or inflation slowly takes it.',
    },
  ],
  apply: {
    scenario: 'The quiet thief.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a "real return"?',
        options: [
          { text: 'The headline interest rate', why: 'That\'s before inflation.' },
          { text: 'Growth after inflation' },
          { text: 'Money you can touch', why: 'It\'s growth after inflation.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Growth 8%, inflation 3%. Real return, roughly, in percent?',
        answers: ['5', '5%', '+5', '+5%'],
        placeholder: 'A percent',
      },
      {
        kind: 'sortGroups',
        prompt: 'Real return positive or negative?',
        groups: ['Positive', 'Negative'],
        items: [
          { text: 'Grows 10%, prices rise 4%', group: 0 },
          { text: 'Grows 5%, prices rise 20%', group: 1 },
          { text: 'Grows 3%, prices rise 1%', group: 0 },
          { text: 'Grows 0%, prices rise 6%', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each kind of money to how much inflation matters.',
        pairs: [
          ['Next month\'s rent', 'Barely matters'],
          ['Emergency fund', 'Matters a little'],
          ['Retirement in 30 years', 'Decides everything'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'So should I put my emergency fund in investments too, to beat inflation?',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'Yes, all of it.', why: 'Then it might be down when you need it.' },
          { text: 'Inflation doesn\'t matter.', why: 'It matters for long-term money.' },
          { text: 'No. Emergency money needs to be safe and reachable more than it needs to beat inflation. It\'s long-term money that needs growth.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The formula.',
        template: 'Real return ≈ [[1]] − [[2]].',
        blanks: [['growth'], ['inflation']],
        distractors: ['salary', 'fees'],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought misunderstands inflation?',
        lines: [
          'My savings grew from ₦390,000 to ₦405,000.',
          'Prices rose 20% this year.',
          'So I\'m definitely richer than last year.',
        ],
        bug: 2,
        fix: 'In buying power, I\'m poorer than last year.',
        explanation: '₦405,000 buys less than ₦390,000 bought a year ago if prices rose 20%.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is inflation most dangerous for 30-year money?',
        options: [
          { text: 'It isn\'t', why: 'Time multiplies its effect.' },
          { text: 'A negative real return repeated for decades eats much of the value' },
          { text: 'Banks charge more', why: 'It\'s about buying power.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Savings pay 5%; prices rise 20%. Real return, roughly, in percent?',
        answers: ['-15', '−15', '-15%', '−15%'],
        placeholder: 'A percent',
      },
      {
        kind: 'orderLines',
        prompt: 'Order where to keep each kind of money.',
        lines: ['Next month\'s bills: current account', 'Emergency fund: safe savings', 'Long-term money: growth over decades'],
      },
    ],
  },
  reflect: {
    prompt: 'Roughly what is inflation where you live? Is your long-term money growing faster than that?',
    starters: ['Inflation is about...', 'My long-term money...'],
  },
  deepen: {
    title: 'Look up your country\'s inflation',
    summary: 'National statistics offices and central banks publish inflation figures, usually monthly. Checking it once or twice a year tells you whether your savings are really growing.',
  },
  notes: 'Real return approximation (Fisher). Examples illustrative; inflation varies by country and year (Nigeria and Ghana have had high inflation recently; Cameroon lower, CFA franc pegged). Dad\'s anecdote fictional.',
};

export default lesson;
