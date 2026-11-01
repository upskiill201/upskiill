import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Reading: emergency fund before long-term investing. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The fund that protects the future',
  summary: 'Why does Folake insist on a big emergency fund before any long-term investing? Because the worst time to sell an investment is in an emergency, and emergencies love bad timing.',
  minutes: 12,
  outcomes: [
    'Explain why the emergency fund protects long-term money',
    'Size an emergency fund for your situation',
    'Know where to keep it',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Bad timing',
      html: '<p>Long-term investments go up and down. Over many years, the hope is they grow. But in any single year, they might be down.</p><p>Now imagine: a year when investments have fallen 20%. The same month, you lose your job, or a parent needs surgery. If you have no emergency fund, you have to sell your investments, at the bottom, and lock in the loss. Money meant to grow for 30 years is gone in a week.</p><p><strong>This happens a lot</strong>, because emergencies and market falls often come together. Recessions bring job losses <em>and</em> falling prices.</p><p><strong>The emergency fund\'s real job</strong> isn\'t just paying for the clinic or the bus home. It\'s protecting your long-term money from ever having to be sold at a bad time.</p><p><strong>How big?</strong> Three to six months of must-have costs for most working people. More if your income is irregular, if others depend on you, or if your job is less secure. Folake keeps six months; Miracle starts with three, aiming for six.</p><p><strong>Where?</strong> Somewhere safe and reachable within a day or two: a separate savings account, not invested in anything that can fall. Earning a little interest is nice; safety is the point.</p>',
    },
    {
      kind: 'check',
      question: 'What\'s the emergency fund\'s most important job for a long-term saver?',
      options: ['Earning the most interest', 'Paying for holidays', 'Protecting investments from being sold at a bad time'],
      answer: 2,
      explanation: 'It keeps emergencies from forcing you to sell long-term money at the bottom.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Emergencies and market falls often come together. An emergency fund of 3–6 months, safe and reachable, means your long-term money never has to be sold at a bad time.',
    },
  ],
  apply: {
    scenario: 'Bad timing.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why do emergencies and market falls often come together?',
        options: [
          { text: 'They never do', why: 'They often coincide.' },
          { text: 'Recessions can bring job losses and falling prices at the same time' },
          { text: 'Banks plan it', why: 'It\'s about how economies work.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Investments worth ₦1,000,000 fall 20%. What are they worth now?',
        answers: ['800000', '800,000', '₦800,000', '₦800000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Bigger emergency fund, or standard?',
        groups: ['Bigger (6 months or more)', 'Standard (3 months)'],
        items: [
          { text: 'Freelancer with irregular income', group: 0 },
          { text: 'Single, stable salaried job, no dependants', group: 1 },
          { text: 'Main earner with children', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each feature to the right place for an emergency fund.',
        pairs: [
          ['Safe', 'Not invested in anything that can fall'],
          ['Reachable', 'Within a day or two'],
          ['Separate', 'Not mixed with spending money'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Isn\'t six months of costs sitting in a savings account wasted?',
        prompt: 'Folake\'s best reply?',
        options: [
          { text: 'It\'s insurance for everything else. In 2020 I needed it, and my investments stayed untouched while they recovered.' },
          { text: 'Yes, invest it all.', why: 'Then a bad month could force a sale at a loss.' },
          { text: 'Keep it in cash under the bed.', why: 'Safe and reachable, but not under a bed: theft, fire.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Emergency fund size.',
        template: 'Three to [[1]] months of [[2]] costs.',
        blanks: [['six', '6'], ['must-have', 'essential']],
        distractors: ['twelve', 'holiday'],
      },
      {
        kind: 'findBug',
        prompt: 'Which emergency fund set-up defeats the point?',
        lines: [
          'Three months of costs in a separate savings account.',
          'Reachable within a day.',
          'Kept in the same long-term investments, so it can grow too.',
        ],
        bug: 2,
        fix: 'Kept safe, not invested in things that can fall.',
        explanation: 'If the emergency fund falls with the market, it can\'t protect anything.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Folake\'s must-haves are ₦700,000 a month. Six months is how much?',
        answers: ['4200000', '4,200,000', '₦4,200,000', '₦4200000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What happens if you sell investments at the bottom?',
        options: [
          { text: 'Nothing; you can buy back later at the same price', why: 'Prices may have risen by then.' },
          { text: 'You lock in the loss and miss any recovery' },
          { text: 'You make a profit', why: 'Selling at the bottom locks in a loss.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order why the emergency fund comes first.',
        lines: ['Investments can fall in any year', 'Emergencies often come at the same time', 'Without a fund, you\'d have to sell', 'Selling at the bottom locks in losses', 'So build the fund first'],
      },
    ],
  },
  reflect: {
    prompt: 'How many months of must-have costs could you cover today without selling anything or borrowing?',
    starters: ['I could cover about... months', 'My target is...'],
  },
  deepen: {
    title: 'Sequence matters',
    summary: 'The order in which good and bad years arrive can matter a lot for anyone selling investments, especially near retirement. Having safe money to draw from in bad years, instead of selling, is one of the main ways people protect themselves.',
  },
  notes: 'Emergency fund sizing (3–6 months) common guidance. Folake 2020 (COVID) anecdote fictional. Sequence-of-returns risk mentioned generally.',
};

export default lesson;
