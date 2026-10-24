import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Chat with Tey: weekly money, not monthly. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Paid monthly, spend weekly',
  summary: 'GH₵1,500 lands on the 1st, and the 1st always feels rich. That\'s the trap. Tey shows Kofi the trick that stops week 1 eating week 4: split the flexible money into weeks.',
  minutes: 11,
  outcomes: [
    'Explain why monthly money runs out early',
    'Split flexible spending into weekly amounts',
    'Keep the week\'s money separate from the rest',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Quick question. On the 1st, with GH₵1,500 in your account, how rich do you feel?', replies: ['Very rich.'] },
        { tey: 'Exactly. And that feeling is the trap. A full account makes every small spend feel tiny. Then week 4 pays for week 1.', replies: ['So what do I do?'] },
        { tey: 'Turn the month into weeks. Kofi\'s flexible lines are food staples, food out, transport and fun. Together that\'s GH₵820 a month, which is GH₵205 a week.', replies: ['Why not just remember the monthly total?'] },
        { tey: 'Because a week is short enough to see. "I have GH₵60 left and it\'s Thursday" is a feeling you can act on. "I\'ve spent GH₵900 of GH₵1,500" on the 18th is just a scary number.', replies: ['How do I keep the weeks apart?'] },
        { tey: 'Move only this week\'s GH₵205 to where you spend from: cash, a separate wallet or account, whatever you use day to day. The rest stays where you don\'t tap it. Every Sunday, move the next week\'s amount.', replies: ['What if I run out by Thursday?'] },
        { tey: 'Then Thursday teaches you something cheaply. You eat from the staples, and next week you adjust. Much better than learning it on day 12 with GH₵63.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Monthly money, weekly spending. Each Sunday, move one week\'s flexible money to where you spend from. Leave the rest alone.',
    },
  ],
  apply: {
    scenario: 'Month 2, in weeks.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Flexible money GH₵820 for the month, split into 4 weeks. How much per week?',
        answers: ['205', 'GH₵205', '205 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why does the 1st of the month feel dangerous?',
        options: [
          { text: 'A full account makes small spending feel tiny' },
          { text: 'Banks charge more on the 1st', why: 'Nothing to do with fees. It\'s about how a big balance feels.' },
          { text: 'Shops raise prices', why: 'Prices don\'t change. Our feeling of being rich does.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s Sunday routine.',
        lines: ['Check how last week went', 'Move this week\'s GH₵205 to his spending money', 'Leave the rest untouched', 'Spend only from the week\'s money'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Weekly money or stays put for the month?',
        groups: ['Weekly money', 'Stays put'],
        items: [
          { text: 'Food out', group: 0 },
          { text: 'Savings GH₵200', group: 1 },
          { text: 'Fun GH₵30', group: 0 },
          { text: 'Surprises GH₵150', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'It\'s Thursday and I\'ve spent my GH₵205. Can I just take from next week?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Sure, it all evens out.', why: 'That\'s how week 4 ends up paying for week 1 again.' },
          { text: 'Eat from the staples until Sunday, and next week look at what ran out early.' },
          { text: 'Take a small loan.', why: 'Never for a three-day gap that staples can cover.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The trick.',
        template: '[[1]] money, [[2]] spending.',
        blanks: [['Monthly'], ['weekly']],
        distractors: ['Daily', 'yearly'],
      },
      {
        kind: 'mcq',
        prompt: 'Which thought helps Kofi act in time?',
        options: [
          { text: '"I\'ve spent GH₵900 and it\'s the 18th."', why: 'Too big and too late to feel.' },
          { text: '"Who knows, I\'ll check at the end."', why: 'That\'s month 1.' },
          { text: '"I have GH₵60 left and it\'s Thursday."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the weekly line to its amount (per week).',
        pairs: [
          ['Food staples GH₵240', 'GH₵60'],
          ['Food out GH₵400', 'GH₵100'],
          ['Transport GH₵60', 'GH₵15'],
          ['Fun GH₵120', 'GH₵30'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Yaw\'s "weekly" plan defeats the point?',
        lines: [
          'Every Sunday, decide this week\'s amount.',
          'Keep all GH₵1,500 in the same place I pay from.',
          'Check on Thursday how much is left.',
        ],
        bug: 1,
        fix: 'Move only this week\'s amount to where I pay from.',
        explanation: 'If the whole month sits where you tap, the full balance still makes everything feel cheap.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A worker gets 2,400 a month and plans 1,200 for flexible spending. Per week (4 weeks)?',
        answers: ['300', '300.00'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What would your weekly spending amount be? Where could you keep it separate from the rest?',
    starters: ['My weekly amount would be...', 'I\'d keep it in...'],
  },
  deepen: {
    title: 'The extra days',
    summary: 'Most months are a little over four weeks. Either plan four weeks and cover the extra two or three days from staples, or divide by 4.3 instead of 4. Kofi uses the staples trick: rice and gari carry him to the 1st.',
  },
  notes: 'Weekly flexible (fictional): staples 60 + food out 100 + transport 15 + fun 30 = 205/week; ×4 = 820. No account or wallet product named.',
};

export default lesson;
