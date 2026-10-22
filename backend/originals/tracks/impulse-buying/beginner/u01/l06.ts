import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Before/After: a planned buy vs an impulse buy. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Planned vs impulse: the same boots',
  summary: 'Kofi really does need new boots for next season. Here are two ways to buy the same pair: the 2:14 a.m. way, and the planned way. Same boots. Very different result.',
  minutes: 11,
  outcomes: [
    'Turn a want into a planned purchase',
    'Check fit, returns and price before buying',
    'See what planning protects',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The same boots, bought two ways',
      before: {
        label: 'The 2:14 a.m. way',
        text: 'Upset and tired after the final\nSees an ad with a countdown\nBuys in 40 seconds\nDoesn\'t check size, seller or returns\nPays GH₵480 from spending money\nWrong size, no returns: loses GH₵180',
      },
      after: {
        label: 'The planned way',
        text: 'Adds "new boots before next season" to his list\nWaits a week; still wants them\nTries his size at a shop in Adum\nChecks three prices: GH₵420, GH₵450, GH₵520\nSaves GH₵30 a week from the fun line for 3 months\nBuys the right size at GH₵420, with returns allowed',
      },
      notes: [
        'Same need, same kind of boots. The only difference is the process.',
        'Waiting a week tests whether the want is real.',
        'Trying the size and checking returns removes the biggest risks.',
        'Three prices show what a fair price really is. The "was GH₵1,600" was never real.',
        'Paying from a planned line means no regret and no hole in the budget.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Turn wants into plans: list it, wait, check it fits, compare three prices, check returns, then pay from a planned line.',
    },
  ],
  apply: {
    scenario: 'Buying boots, properly.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the planned way.',
        lines: ['Add it to the list', 'Wait a week', 'Try the size', 'Compare three prices', 'Check returns', 'Pay from a planned line'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Planned boots cost GH₵420. Impulse boots cost GH₵480 and didn\'t fit. How much more did the impulse way cost, before reselling?',
        answers: ['60', 'GH₵60', '60 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: '2:14 a.m. way or planned way?',
        groups: ['2:14 a.m.', 'Planned'],
        items: [
          { text: 'Buying in 40 seconds', group: 0 },
          { text: 'Trying the size first', group: 1 },
          { text: 'Not checking returns', group: 0 },
          { text: 'Comparing three prices', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The ad said "was GH₵1,600". Three shops sold the same boots for GH₵420 to GH₵520. What does that tell Kofi?',
        options: [
          { text: 'The "was" price was there to make GH₵480 feel cheap' },
          { text: 'The shops are losing money', why: 'GH₵420 to GH₵520 is just the normal price.' },
          { text: 'GH₵480 was an amazing deal', why: 'It was close to normal, and the wrong size.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Waiting a week feels like I\'ll miss the deal.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'True, never wait.', why: 'That\'s how the 2:14 a.m. boots happened.' },
          { text: 'Wait a year.', why: 'A week is usually enough to test the want.' },
          { text: 'Deals come back all the time. A week tells you if you really want it. If it\'s gone, a fair price at another shop is fine.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Before buying.',
        template: 'Check it [[1]], compare three [[2]], check [[3]].',
        blanks: [['fits'], ['prices'], ['returns']],
        distractors: ['shines', 'friends'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Yaw\'s "planned" purchase is still an impulse?',
        lines: [
          'Added sneakers to my list.',
          'Waited a week; still want them.',
          'Bought the first pair I saw because the timer said 2 minutes.',
        ],
        bug: 2,
        fix: 'Compared three prices and checked returns before buying.',
        explanation: 'A countdown at the last step still turned it into an impulse.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Saving GH₵30 a week for 14 weeks. How much?',
        answers: ['420', 'GH₵420', '420 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to the risk it removes.',
        pairs: [
          ['Wait a week', 'Buying something you don\'t really want'],
          ['Try the size', 'Wrong fit'],
          ['Compare three prices', 'Paying a fake "deal" price'],
          ['Check returns', 'Being stuck with a mistake'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What changed between the two ways?',
        options: [
          { text: 'Kofi\'s income', why: 'Same income.' },
          { text: 'Only the process; the need and the boots were the same' },
          { text: 'The boots', why: 'Same kind of boots.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Pick something you want right now. Write it as a planned purchase: list, wait, fit, three prices, returns, which line pays.',
    starters: ['I want...', 'I\'ll wait until...', 'Paid from...'],
  },
  deepen: {
    title: 'Online returns',
    summary: 'Many countries give shoppers some rights to return online purchases within a set period, but rules vary, and sale items or overseas sellers may be excluded. Read the seller\'s policy before you buy, not after.',
  },
  notes: 'Fictional prices (Adum shops GH₵420/450/520). Consumer return rights vary by jurisdiction; stated generally.',
};

export default lesson;
