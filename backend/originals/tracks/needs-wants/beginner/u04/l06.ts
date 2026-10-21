import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Chat with Tey: would I buy it again? */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Would I buy it again?',
  summary: 'Ada looks around her room: a tablet she hasn\'t charged in months, her old phone, a ring light, three handbags. Tey has one question for each: "Knowing what you know now, would you buy it again?"',
  minutes: 11,
  outcomes: [
    'Use "would I buy it again?" on past purchases',
    'Turn unused things into cash or space',
    'Learn from past choices without regret spirals',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'One question for everything Ada owns: knowing what you know now, would you buy it again? Let\'s start with the tablet.', replies: ['She hasn\'t touched it in months.'] },
        { tey: 'So: no. It\'s worth about ₦30,000 to someone who\'d use it. Sitting in a drawer, it\'s worth ₦0 to Ada and losing value every month.', replies: ['And the old phone?'] },
        { tey: 'Would she buy the old phone again? Actually, yes; it was fine. But she doesn\'t need two. Sold, it\'s about ₦60,000. Together that\'s ₦90,000 for the Mexico fund.', replies: ['What about the ring light?'] },
        { tey: 'She uses it for every client video call. Would she buy it again? Absolutely. Keep. Same for her drawing tablet and the art supplies.', replies: ['And the handbags?'] },
        { tey: 'Two she uses, one she doesn\'t. Would she buy the third again? No. Ngozi knows someone who\'ll buy it. The point isn\'t to feel bad about the past. It\'s to learn: "I don\'t really use tablets" is useful next time.', replies: ['Does this stop her buying things?'] },
        { tey: 'It makes her better at buying. Next time she\'s tempted by a tablet, she\'ll remember this one in the drawer. That\'s a lesson that cost ₦0 to learn the second time.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '"Knowing what I know now, would I buy it again?" No: sell it or pass it on, and remember why. Yes: keep it, and enjoy it.',
    },
  ],
  apply: {
    scenario: 'Ada\'s room.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Would Ada buy it again?',
        groups: ['Yes: keep', 'No: sell or pass on'],
        items: [
          { text: 'Ring light used on every client call', group: 0 },
          { text: 'Tablet not charged in months', group: 1 },
          { text: 'Drawing tablet', group: 0 },
          { text: 'Third handbag she never uses', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Old phone ₦60,000 + tablet ₦30,000. How much for the Mexico fund?',
        answers: ['90000', '90,000', '₦90,000', '₦90000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why sell unused things sooner rather than later?',
        options: [
          { text: 'They lose value every month they sit unused' },
          { text: 'Shops require it', why: 'It\'s about value.' },
          { text: 'They gain value', why: 'Most electronics lose value fast.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Looking at all this makes me feel like I\'ve wasted so much.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'You\'re learning: "I don\'t use tablets" is worth knowing. Sell what you can, keep what you love, and buy better next time.' },
          { text: 'You have.', why: 'Guilt doesn\'t help.' },
          { text: 'Buy something to cheer up.', why: 'That\'s the habit we\'re breaking.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The question.',
        template: 'Knowing what I know [[1]], would I buy it [[2]]?',
        blanks: [['now'], ['again']],
        distractors: ['then', 'cheaper'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each item to the lesson it teaches Ada.',
        pairs: [
          ['Unused tablet', '"I don\'t really use tablets"'],
          ['Third handbag', '"Two bags are enough for me"'],
          ['Ring light', '"Tools for work are worth it"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which response to an unused item wastes the most value?',
        lines: [
          'Sell the tablet this week.',
          'Give the handbag to Ngozi\'s contact.',
          'Keep the old phone "as a backup" for three more years.',
        ],
        bug: 2,
        fix: 'Sell the old phone now; she\'s never needed a backup.',
        explanation: 'Every year in a drawer, it\'s worth less.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the real benefit of "would I buy it again?"',
        options: [
          { text: 'It makes you better at buying next time' },
          { text: 'It makes you feel bad', why: 'It\'s about learning, not guilt.' },
          { text: 'It stops all spending', why: 'It improves spending.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s fund saves ₦125,000 a month. How much of a month does ₦90,000 from selling cover? (Answer in naira.)',
        answers: ['90000', '90,000', '₦90,000', '₦90000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the "buy it again" clear-out.',
        lines: ['Look at each thing you own', 'Ask: would I buy it again?', 'Keep the yeses', 'Sell or pass on the nos', 'Write down what you learned'],
      },
    ],
  },
  reflect: {
    prompt: 'Look around your room. What would you not buy again? What could you sell or pass on this week?',
    starters: ['I wouldn\'t buy... again', 'I could sell...'],
  },
  deepen: {
    title: 'The endowment effect',
    summary: 'People tend to value things more just because they own them (psychologists call it the endowment effect). That\'s why selling feels harder than it should. The "would I buy it again?" question cuts through it.',
  },
  notes: 'Endowment effect: Kahneman, Knetsch & Thaler (1990). Ada sells old phone (~60,000) and tablet (~30,000) = 90,000 one-off (running numbers).',
};

export default lesson;
