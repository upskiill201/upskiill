import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Card deck: the rule of 72. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The rule of 72',
  summary: 'A trick Folake does in her head: how long until money doubles? Divide 72 by the growth rate. Three cards, and suddenly long-term numbers make sense.',
  minutes: 10,
  outcomes: [
    'Use the rule of 72 to estimate doubling time',
    'Use it for debt as well as savings',
    'Compare growth rates quickly',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>The rule of 72:</strong> to estimate how many years it takes money to double, divide 72 by the yearly growth rate.</p><ul><li>At 6% a year: 72 ÷ 6 = about <strong>12 years</strong>.</li><li>At 8%: 72 ÷ 8 = about <strong>9 years</strong>.</li><li>At 12%: 72 ÷ 12 = about <strong>6 years</strong>.</li></ul><p>It\'s an approximation, but a good one for everyday rates.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>It works for real returns too.</strong> If long-term money grows 5% a year after inflation, its buying power doubles in about 72 ÷ 5 ≈ 14 years. From 25 to 60 is 35 years: about two and a half doublings.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>And for debt.</strong> A debt growing at 24% a year doubles in about 72 ÷ 24 = <strong>3 years</strong>. A loan app charging 20% a <em>month</em> doubles in under 4 months. That\'s why expensive debt comes before investing.</p>',
    },
    {
      kind: 'check',
      question: 'Money grows at 9% a year. About how long to double?',
      options: ['About 8 years', 'About 4 years', 'About 20 years'],
      answer: 0,
      explanation: '72 ÷ 9 = 8.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '72 ÷ rate = years to double. Use it for savings, for real returns, and as a warning for debt.',
    },
  ],
  apply: {
    scenario: 'Doubling in your head.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'At 6% a year, about how many years to double?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each rate to its doubling time.',
        pairs: [
          ['4%', '18 years'],
          ['8%', '9 years'],
          ['12%', '6 years'],
          ['24%', '3 years'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A debt grows at 36% a year. About how long until it doubles?',
        options: [
          { text: 'About 2 years' },
          { text: 'About 36 years', why: '72 ÷ 36 = 2.' },
          { text: 'It never doubles', why: 'It doubles fast.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]] ÷ rate = years to [[2]].',
        blanks: [['72'], ['double']],
        distractors: ['100', 'triple'],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'My loan app charges 20% a month. That\'s not so bad.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: '72 ÷ 20 is under 4. Your debt doubles in under four months. Clear it before anything else.' },
          { text: 'Not bad at all.', why: 'It doubles in months.' },
          { text: 'Borrow more.', why: 'Never.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Real return 5% a year. About how many years for buying power to double? (Round to the nearest year.)',
        answers: ['14', 'fourteen', '14.4'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Doubles in under 5 years, or over 10?',
        groups: ['Under 5 years', 'Over 10 years'],
        items: [
          { text: 'Debt at 24% a year', group: 0 },
          { text: 'Savings at 5% a year', group: 1 },
          { text: 'Loan app at 20% a month', group: 0 },
          { text: 'Real return of 4% a year', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which calculation is wrong?',
        lines: [
          '72 ÷ 6 = 12 years.',
          '72 ÷ 9 = 8 years.',
          '72 ÷ 3 = 36 years.',
        ],
        bug: 2,
        fix: '72 ÷ 3 = 24 years.',
        explanation: '72 ÷ 3 is 24, not 36.',
      },
      {
        kind: 'mcq',
        prompt: 'From 25 to 60 at a 5% real return, about how many doublings?',
        options: [
          { text: 'About two and a half' },
          { text: 'About seven', why: '35 ÷ 14 ≈ 2.5.' },
          { text: 'Less than one', why: 'About 2.5 doublings.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order these from fastest doubling to slowest.',
        lines: ['Loan app at 20% a month', 'Debt at 24% a year', 'Growth at 8% a year', 'Growth at 4% a year'],
      },
    ],
  },
  reflect: {
    prompt: 'Use the rule of 72 on something you have: a savings rate, or a debt. How long until it doubles?',
    starters: ['My rate is...', '72 ÷ ... = ...'],
  },
  deepen: {
    title: 'Why 72?',
    summary: '72 is close to the exact maths for doubling, and it divides neatly by many numbers (2, 3, 4, 6, 8, 9, 12). For very high rates it\'s less accurate, but still a quick warning.',
  },
  notes: 'Rule of 72 (approximation of ln 2 ≈ 0.693 with adjustment). 72/5 = 14.4. Loan app 20%/month: 72/20 = 3.6 months.',
};

export default lesson;
