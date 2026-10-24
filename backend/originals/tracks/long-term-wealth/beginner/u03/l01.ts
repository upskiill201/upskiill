import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story with a choice: growing and shrinking. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Growing and shrinking',
  summary: 'Miracle\'s long-term pot sits in a basic savings account while prices rise much faster. Emmanuel\'s cousin has a "sure thing" stock tip. Folake has a different idea. What does Miracle do with money she won\'t need for 30 years?',
  minutes: 12,
  outcomes: [
    'See why long-term money usually needs to grow faster than prices',
    'Tell a plan from a tip',
    'Choose a sensible first step towards long-term investing',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Three options',
      beats: [
        { speaker: 'narrator', text: 'Miracle\'s long-term pot: ₦390,000, in a basic account paying a few percent a year. Prices are rising much faster.' },
        { speaker: 'emmanuel', text: 'My cousin says put it all in one company\'s shares. He doubled his money in three months. Sure thing.' },
        { speaker: 'folake', text: 'Or leave it where it is, safe and slowly shrinking. Or learn how long-term investing actually works, and make a plan you understand.' },
        { speaker: 'miracle', text: 'Option one sounds exciting. Option two sounds safe. Option three sounds like homework.' },
        { speaker: 'tey', text: 'Money you won\'t need for decades usually needs to grow faster than prices, or it loses buying power. But growth comes with risk. Which option is right for Miracle?' },
      ],
      choice: {
        prompt: 'What should Miracle do with her long-term pot?',
        options: [
          { text: 'All of it into the cousin\'s one company.', outcome: 'One company can double, or halve, or disappear. Putting all long-term money in one place is a bet, not a plan. And "he doubled it in three months" is the kind of story that makes people take risks they don\'t understand.' },
          { text: 'Leave it in the basic account forever: safe is best.', outcome: 'Safe from falling, but not from rising prices. Over 30 years, money that grows slower than prices can lose much of its buying power. Safe for emergencies; risky for the long term.' },
          { text: 'Learn the basics first, then put long-term money into a spread-out, long-term plan she understands, and keep adding monthly.', outcome: 'Yes. She keeps the emergency fund safe, learns how compounding, inflation and spreading risk work, and starts slowly. "Homework" is the cheapest protection there is.', best: true },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'This course teaches general principles, not what to buy. Before investing, learn the basics (the course How to Understand Investment Risk helps), and consider an independent, qualified adviser.',
    },
  ],
  apply: {
    scenario: 'Three options.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Plan or tip?',
        groups: ['Plan', 'Tip'],
        items: [
          { text: '"Put it all in one company, he doubled it in three months"', group: 1 },
          { text: 'Spread out, long-term, adding monthly', group: 0 },
          { text: '"This coin will 10x by Christmas"', group: 1 },
          { text: 'Understand it before investing', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a basic savings account risky for 30-year money?',
        options: [
          { text: 'It could disappear', why: 'The risk is inflation, not disappearing.' },
          { text: 'If it grows slower than prices, it loses buying power over decades' },
          { text: 'It isn\'t risky at all', why: 'Inflation is a real long-term risk.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each option to its main risk.',
        pairs: [
          ['All in one company', 'One bad result wipes it out'],
          ['Basic savings forever', 'Losing buying power to inflation'],
          ['Spread-out long-term plan', 'Ups and downs along the way'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'But my cousin doubled his money!',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Then I\'ll put it all in.', why: 'One story isn\'t evidence.' },
          { text: 'Your cousin is lying.', why: 'He might not be; it\'s still a bet.' },
          { text: 'Good for him. For every story like that, there are others who lost. I want a plan I understand, not a bet.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Long-term money.',
        template: 'Long-term money usually needs to grow faster than [[1]], or it loses [[2]] power.',
        blanks: [['prices', 'inflation'], ['buying']],
        distractors: ['salary', 'selling'],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan mixes up emergency money and long-term money?',
        lines: [
          'Emergency fund: safe, reachable account.',
          'Long-term pot: spread-out, long-term plan.',
          'Emergency fund: into the same long-term plan, to grow faster.',
        ],
        bug: 2,
        fix: 'Emergency fund stays safe and reachable.',
        explanation: 'Emergency money must not fall when you need it.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "homework" the cheapest protection?',
        options: [
          { text: 'It guarantees profits', why: 'Nothing guarantees profits.' },
          { text: 'Understanding what you invest in helps you avoid scams, bad bets and panic' },
          { text: 'It\'s required', why: 'It\'s wise, not required.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If prices rise 20% in a year, ₦390,000 buys what about how much bought a year earlier? (Round to the nearest thousand: 390,000 ÷ 1.2)',
        answers: ['325000', '325,000', '₦325,000', '₦325000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Miracle\'s approach.',
        lines: ['Keep the emergency fund safe', 'Learn the basics', 'Make a spread-out, long-term plan', 'Start small and add monthly'],
      },
      {
        kind: 'mcq',
        prompt: 'What does this course NOT do?',
        options: [
          { text: 'Explain compounding', why: 'It does.' },
          { text: 'Explain inflation', why: 'It does.' },
          { text: 'Tell you exactly what to invest in' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever been tempted by a "sure thing" money tip? What made it tempting?',
    starters: ['The tip was...', 'It was tempting because...'],
  },
  deepen: {
    title: 'Survivorship bias',
    summary: 'We hear from the people whose bets paid off; the ones who lost rarely post about it. That makes risky bets look safer than they are. When you hear "he doubled his money", ask: how many people tried the same and lost?',
  },
  notes: 'General principles only; no products (playbook §9). Survivorship bias: standard concept. 390,000/1.2 = 325,000 (illustrative inflation).',
};

export default lesson;
