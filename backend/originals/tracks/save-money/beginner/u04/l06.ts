import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Chat with Tey: lending to friends. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Yaw needs GH₵400',
  summary: 'Week 11. Yaw, quietly: "Chale, can you lend me GH₵400? Just till Friday." Kofi has GH₵1,400 in the laptop jar. Tey walks through the hardest money question between friends.',
  minutes: 12,
  outcomes: [
    'Decide whether, and how much, to lend a friend',
    'Lend only what you could afford to lose',
    'Say no, or give less, without ending a friendship',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Yaw needs GH₵400 "till Friday". He won\'t say what for. He still owed Kofi GH₵100 from month 1 until last month. What\'s Kofi\'s first question?', replies: ['What\'s it for?'] },
        { tey: 'Good. It\'s fair to ask. Yaw: "A payment I\'m behind on." Kofi doesn\'t push. Second question, to himself: could I afford to lose this money completely?', replies: ['Why "lose"?'] },
        { tey: 'Because "till Friday" often becomes next month, or never, even between good friends. The safest rule: only lend what you could treat as a gift if it never came back.', replies: ['The jar has GH₵1,400...'] },
        { tey: 'The jar isn\'t spare money. It\'s a laptop with a deadline. The emergency fund is half-refilled and isn\'t for other people\'s emergencies. So the honest answer is: not GH₵400.', replies: ['So just say no?'] },
        { tey: 'Or say yes to something smaller from flexible money. Kofi has GH₵40 of rolled-over fun. "I can\'t do GH₵400, my money\'s all spoken for. I can give you GH₵40, no need to pay it back. And can we look at what\'s going on together?"', replies: ['Will Yaw be angry?'] },
        { tey: 'Maybe, for a day. But the offer to look at it together might matter more than the money. Something is clearly wrong, and Yaw hasn\'t said what. Keep that in mind.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Lend only what you could afford to lose. Goal savings and emergency funds aren\'t spare money. Offering help that isn\'t money can be worth more.',
    },
  ],
  apply: {
    scenario: 'Yaw\'s request.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the safest rule for lending to friends?',
        options: [
          { text: 'Only lend what you could afford to lose' },
          { text: 'Lend whatever they ask; they\'re friends', why: 'That\'s how friendships and savings both get hurt.' },
          { text: 'Never help anyone', why: 'Helping is good. Lending beyond your means isn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Spare money, or not spare?',
        groups: ['Could be spare', 'Not spare'],
        items: [
          { text: 'Rolled-over fun money', group: 0 },
          { text: 'The laptop jar', group: 1 },
          { text: 'The half-refilled emergency fund', group: 1 },
          { text: 'A family line in the budget', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Chale, GH₵400, just till Friday. You have it in your laptop jar.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'I can\'t do GH₵400, it\'s all spoken for. I can give you GH₵40, no need to pay back. And I\'m here if you want to talk about what\'s going on.' },
          { text: 'Sure, take it from the jar.', why: 'The jar is a laptop with a deadline.' },
          { text: 'No. Figure it out yourself.', why: 'Cold, and misses that something is wrong.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Only lend what you could treat as a [[1]] if it never came [[2]].',
        blanks: [['gift'], ['back']],
        distractors: ['loan', 'early'],
      },
      {
        kind: 'mcq',
        prompt: 'Why offer GH₵40 as a gift instead of a loan?',
        options: [
          { text: 'A small gift has no repayment to sour the friendship' },
          { text: 'Gifts are always better than loans', why: 'Not always, but small gifts avoid awkward debts.' },
          { text: 'To make Yaw feel bad', why: 'The opposite: it\'s kind and clear.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to a good response.',
        pairs: [
          ['Big amount from goal savings', 'A kind, clear no'],
          ['Small amount from spare money', 'A gift, if you want'],
          ['Friend won\'t say what\'s wrong', 'Offer to help look at it'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of this lending plan is riskiest?',
        lines: [
          'Ask what it\'s for.',
          'Check what you could afford to lose.',
          'Lend from the emergency fund because it\'s "for emergencies".',
        ],
        bug: 2,
        fix: 'The emergency fund is for your own emergencies.',
        explanation: 'Lending it out leaves you with nothing when your own week 9 comes.',
      },
      {
        kind: 'mcq',
        prompt: 'If you DO lend a larger amount to a friend, what helps most?',
        options: [
          { text: 'Agreeing the amount and a repayment date clearly, in writing' },
          { text: 'Never mentioning it again', why: 'Unclear loans cause most of the hurt.' },
          { text: 'Adding interest', why: 'Between friends, clarity matters more than interest.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Kofi lent GH₵400 from the GH₵1,400 jar and never got it back, how much would be left?',
        answers: ['1000', '1,000', 'GH₵1,000', 'GH₵1000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s thinking.',
        lines: ['Ask what it\'s for', 'Check what he could afford to lose', 'Offer what fits from spare money', 'Offer help that isn\'t money'],
      },
    ],
  },
  reflect: {
    prompt: 'Has lending money ever changed a friendship for you? What rule would you use next time?',
    starters: ['Once,...', 'My rule next time:...'],
  },
  deepen: {
    title: 'When a friend keeps asking',
    summary: 'Repeated urgent requests can be a sign of a bigger problem: debt, gambling, or someone pressuring them. Money alone rarely fixes it. Listening, and pointing them to free help, often does more.',
  },
  notes: 'Week 11 jar ≈ 1,260 + 3 × 55 ≈ 1,425 → "GH₵1,400". Yaw\'s hidden "payment I\'m behind on" foreshadows his pay-later debt (Course 3 Ch4). Kofi gives GH₵40 from rolled-over fun (budget, not the jar).',
};

export default lesson;
