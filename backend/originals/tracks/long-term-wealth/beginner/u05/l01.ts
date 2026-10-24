import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story with a choice: the red screen. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The red screen',
  summary: 'Miracle\'s long-term pot is down 15% in a month. Emmanuel says sell before it gets worse. Bisi says stop investing. Folake has seen this many times. What does Miracle do?',
  minutes: 12,
  outcomes: [
    'Respond calmly to a fall in long-term investments',
    'Tell a temporary fall from a real loss',
    'Use the emergency fund as a shield',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Down 15%',
      beats: [
        { speaker: 'narrator', text: 'Saturday morning. Miracle has checked her long-term pot four times before breakfast. Down 15%.' },
        { speaker: 'emmanuel', text: 'Sell! Get out before it goes to zero.' },
        { speaker: 'bisi', text: 'Stop putting money in until it recovers. Why buy something that\'s falling?' },
        { speaker: 'folake', text: 'I\'ve watched mine fall like this four or five times in twenty years. The worst thing I ever did was sell once, in a panic. It recovered without me.' },
        { speaker: 'tey', text: 'A fall only becomes a real loss when you sell. Miracle won\'t need this money for 30 years. What should she do?' },
      ],
      choice: {
        prompt: 'What should Miracle do?',
        options: [
          { text: 'Sell everything and move it to cash until things "feel safer".', outcome: 'That locks in the 15% loss. And "safer" usually feels true only after prices have recovered, so people often buy back higher. Selling in a panic is how temporary falls become permanent losses.' },
          { text: 'Pause her monthly investing until prices recover.', outcome: 'Understandable, but it means she stops buying while prices are low. Regular monthly investing is designed for exactly this moment.' },
          { text: 'Do nothing hasty: check the emergency fund is safe, keep the monthly amounts going, stop checking daily, and look again at her quarterly review.', outcome: 'Yes. Her emergency fund means she never has to sell. Her time horizon is 30 years. Her monthly amount now buys more at lower prices. And she deletes the app from her home screen.', best: true },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'General principles, not advice. Long-term investments can fall, and some never recover, which is why spreading money out matters. But for a spread-out, long-term plan, panic selling is one of the most common ways people lose money.',
    },
  ],
  apply: {
    scenario: 'The red screen.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When does a fall become a real loss?',
        options: [
          { text: 'The moment the price drops', why: 'It\'s a paper loss until you sell.' },
          { text: 'When you sell at the lower price' },
          { text: 'Never', why: 'Selling low makes it real.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm or panic?',
        groups: ['Calm', 'Panic'],
        items: [
          { text: 'Keep the monthly amount going', group: 0 },
          { text: 'Sell everything this morning', group: 1 },
          { text: 'Check the emergency fund is untouched', group: 0 },
          { text: 'Check the app ten times a day', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'What if it goes to zero?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Then I\'ll sell now.', why: 'Panic selling locks in losses.' },
          { text: 'It can\'t fall.', why: 'It just did; falls are normal.' },
          { text: 'That\'s why I\'m spread across many things, not one company. And I won\'t need it for 30 years.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A ₦100,000 monthly amount buys units at ₦1,000 each. After a fall, units cost ₦850. About how many units does ₦100,000 buy now? (Round down.)',
        answers: ['117', 'one hundred and seventeen'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'The shield.',
        template: 'Her [[1]] fund means she never has to [[2]] in a fall.',
        blanks: [['emergency'], ['sell']],
        distractors: ['pension', 'buy'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to their advice.',
        pairs: [
          ['Emmanuel', 'Sell before it gets worse'],
          ['Bisi', 'Stop investing until it recovers'],
          ['Folake', 'Stay the course; I sold once and regretted it'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Miracle\'s plan will make her more anxious?',
        lines: [
          'Keep the monthly transfer.',
          'Look again at the quarterly review.',
          'Turn on alerts for every price move.',
        ],
        bug: 2,
        fix: 'Turn alerts off; check quarterly.',
        explanation: 'Constant alerts feed panic, not good decisions.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does spreading money out matter even more in a fall?',
        options: [
          { text: 'One company can fail completely; a wide spread is far less likely to' },
          { text: 'It stops all falls', why: 'Spread-out plans still fall; they rarely go to zero.' },
          { text: 'It doesn\'t', why: 'It limits the damage from any one failure.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What did Folake regret most?',
        options: [
          { text: 'Investing at all', why: 'Her investing worked; selling didn\'t.' },
          { text: 'Not checking more often', why: 'Checking more makes panic worse.' },
          { text: 'Selling once, in a panic, before prices recovered' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what Miracle does on the red-screen morning.',
        lines: ['Breathe; check the emergency fund', 'Remember her 30-year horizon', 'Keep the monthly amount going', 'Move the app off her home screen'],
      },
    ],
  },
  reflect: {
    prompt: 'How do you usually react when something you own loses value? What would help you stay calm?',
    starters: ['I usually...', 'It would help to...'],
  },
  deepen: {
    title: 'Falls are part of the deal',
    summary: 'Over long periods, broad share markets in many countries have had several big falls and, so far, have grown overall. That\'s history, not a promise. It\'s why long-term money needs a long time horizon, a wide spread and an emergency fund beside it.',
  },
  notes: 'General principles only (playbook §9). 100,000/850 ≈ 117.6. Historical-market statement deliberately hedged ("so far", "not a promise").',
};

export default lesson;
