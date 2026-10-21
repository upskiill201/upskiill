import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Chat with Tey: decoys, bundles and free-delivery thresholds. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Decoys, bundles and "free" delivery',
  summary: 'Three phone plans, and the middle one is there to make you pick the biggest. "Buy 2, get 1 free." "Free delivery over GH₵200." Tey explains three tricks that make you spend more than you meant to.',
  minutes: 11,
  outcomes: [
    'Spot a decoy option',
    'Decide if a bundle is really a deal',
    'Avoid adding things to reach "free delivery"',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'A data shop shows three plans. Small: 5 GB for GH₵50. Medium: 10 GB for GH₵95. Large: 20 GB for GH₵100. Which do most people pick?', replies: ['Large, obviously.'] },
        { tey: 'Exactly. Medium is a decoy. Nobody\'s meant to buy it. It exists to make Large look like a bargain next to it. Researchers call this the decoy effect (Huber, Payne and Puto, 1982).', replies: ['But Large IS good value?'] },
        { tey: 'Per GB, yes. But Kofi uses about 4 GB a month. For him, Small is right. The decoy pulls him into paying double for data he won\'t use. Always start from what you need, not from the menu.', replies: ['What about "buy 2, get 1 free"?'] },
        { tey: 'Good if you\'d have bought three anyway, and will use them. Bad if you came for one. Then "buy 2, get 1 free" is really "pay for two when you needed one".', replies: ['And free delivery?'] },
        { tey: '"Free delivery over GH₵200." Your basket is GH₵160, delivery is GH₵20. So you add a GH₵45 phone case to "save" GH₵20. You just spent GH₵25 more than if you\'d paid for delivery.', replies: ['How do I avoid all three?'] },
        { tey: 'One question each time: "What did I come here for?" Then buy that, the size you\'ll use, and pay the delivery if you have to. The cheapest basket is usually the one you planned.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Decoys, bundles and delivery thresholds all push you past what you came for. Ask: what did I come here for, and how much will I actually use?',
    },
  ],
  apply: {
    scenario: 'Three tricks in one basket.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In the data plans, which option is the decoy?',
        options: [
          { text: 'Medium: 10 GB for GH₵95' },
          { text: 'Small: 5 GB for GH₵50', why: 'Small is a real option, and right for Kofi.' },
          { text: 'Large: 20 GB for GH₵100', why: 'Large is the one the decoy pushes you towards.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Basket GH₵160 + delivery GH₵20. What\'s the total if Kofi just pays delivery?',
        answers: ['180', 'GH₵180', '180 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Instead he adds a GH₵45 case to reach free delivery. What\'s his total now?',
        answers: ['205', 'GH₵205', '205 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each trick to what it does.',
        pairs: [
          ['Decoy option', 'Makes another option look like a bargain'],
          ['Buy 2, get 1 free', 'Pushes you to buy more than you need'],
          ['Free delivery threshold', 'Adds items to "save" on delivery'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I only needed one shirt, but it was buy 2 get 1 free, so I got three!',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Did you need three? If not, you paid for two to get the one you wanted.' },
          { text: 'Great deal!', why: 'Only if he needed three.' },
          { text: 'Shirts are a waste.', why: 'The issue is quantity, not shirts.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The question.',
        template: 'What did I [[1]] here for, and how much will I actually [[2]]?',
        blanks: [['come'], ['use']],
        distractors: ['spend', 'see'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Real deal for Kofi, or a trick?',
        groups: ['Real deal', 'Trick'],
        items: [
          { text: 'A bigger rice bag he shares with Efua and Yaw', group: 0 },
          { text: 'Adding a GH₵45 case to skip GH₵20 delivery', group: 1 },
          { text: '20 GB when he uses 4 GB', group: 1 },
          { text: 'Buy 2 get 1 free on soap he uses weekly', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which choice did the decoy cause?',
        lines: [
          'I use about 4 GB a month.',
          'Small 5 GB is GH₵50.',
          'Large 20 GB is only GH₵5 more than Medium, so I\'ll take Large at GH₵100.',
        ],
        bug: 2,
        fix: 'I\'ll take Small at GH₵50; it covers what I use.',
        explanation: 'Comparing Large with the decoy, not with his needs, doubled his spend.',
      },
      {
        kind: 'mcq',
        prompt: 'When is "buy 2, get 1 free" genuinely good?',
        options: [
          { text: 'When you\'d buy three anyway and will use them' },
          { text: 'Always', why: 'Not if you only needed one.' },
          { text: 'Never', why: 'For things you use regularly, it can be great.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Large plan GH₵100 vs Small GH₵50. How much extra a month does the decoy cost Kofi?',
        answers: ['50', 'GH₵50', '50 cedis'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever added something to reach free delivery, or picked a bigger size because of the menu? What did it really cost?',
    starters: ['I once...', 'It really cost...'],
  },
  deepen: {
    title: 'The subscription decoy',
    summary: 'Behavioural economist Dan Ariely described a magazine offering online-only, print-only, and print-plus-online at the same price as print-only. Almost nobody chose print-only, but its presence pushed many more people to the most expensive option (Predictably Irrational, 2008).',
  },
  notes: 'Huber, J., Payne, J. W., & Puto, C. (1982). Adding asymmetrically dominated alternatives. Journal of Consumer Research, 9(1), 90–98. Ariely (2008), Economist subscription example. Data plan prices illustrative, no provider.',
};

export default lesson;
