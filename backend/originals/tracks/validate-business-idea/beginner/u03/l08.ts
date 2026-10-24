import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Myth or Fact: why would anyone switch? */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Why would anyone switch?',
  summary: 'WashDay would be faster than Mama Rose and easier than a bucket. Clinton thinks that\'s enough. David isn\'t so sure: "Better isn\'t a reason. A reason is a reason." Fact or myth?',
  minutes: 11,
  outcomes: [
    'Know what makes people switch from what they do today',
    'Avoid the "cheaper is the only way" trap',
    'Write the one reason a customer would switch to you',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'If your product is better, people will switch automatically.',
          isFact: false,
          explain: 'Myth. Switching takes effort and feels risky. People stay with "good enough" unless the gain is clearly bigger than the hassle.',
        },
        {
          text: 'People switch when today\'s pain is bigger than the effort and risk of changing.',
          isFact: true,
          explain: 'Fact. For Brenda: three days and carrying a basket up a hill, every two weeks. That\'s a lot of pain to beat with one WhatsApp message.',
        },
        {
          text: 'The only way to win is to be the cheapest.',
          isFact: false,
          explain: 'Myth. Hand-washing is free. WashDay can\'t beat free; it has to win on what people care about: their Saturday, and not carrying baskets uphill.',
        },
        {
          text: 'Making it easy to try (small, safe, cheap first order) helps people switch.',
          isFact: true,
          explain: 'Fact. Lowering the risk of the first try matters. One bag, pay on return, is easier than signing up for a month.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Finish this sentence for your customer: "I switched because..." If you can\'t, you don\'t have a reason yet.',
    },
  ],
  apply: {
    scenario: 'Reasons to switch.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why would Brenda switch from Mama Rose to WashDay?',
        options: [
          { text: 'Because WashDay has a nicer name', why: 'Names don\'t solve her two complaints.' },
          { text: 'No carrying baskets uphill, and clothes back sooner' },
          { text: 'Because it\'s new', why: 'New isn\'t a reason to change.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps people switch, or makes it harder?',
        groups: ['Helps', 'Makes it harder'],
        items: [
          { text: 'Try one bag, pay when it comes back', group: 0 },
          { text: 'Pay a month up front before trying', group: 1 },
          { text: 'Pickup from your room', group: 0 },
          { text: 'Download an app and create an account first', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I\'ll just be cheaper than Mama Rose. Then everyone switches.',
        prompt: "David's best reply?",
        options: [
          { text: 'Hand-washing is free, so you can\'t win on price. Win on their Saturday and the hill; that\'s what they complain about.' },
          { text: 'Yes, cheapest always wins.', why: 'Free already exists.' },
          { text: 'Charge more than her to look premium.', why: 'Price should follow value; first find the reason to switch.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the customer to their reason to switch.',
        pairs: [
          ['Brenda', 'No carrying, faster return'],
          ['Ama', 'Get her Saturday back'],
          ['Esther', 'Stop buying extra clothes'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'When people switch.',
        template: 'When today\'s [[1]] is bigger than the [[2]] of changing.',
        blanks: [['pain'], ['effort', 'risk']],
        distractors: ['price', 'logo'],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t WashDay win by being cheapest?',
        options: [
          { text: 'Cheap is illegal', why: 'It\'s about the competition, not rules.' },
          { text: 'Its biggest competitor, hand-washing, is free' },
          { text: 'Mama Rose is free', why: 'She charges about 2,400 FCFA a basket.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s "why switch" list isn\'t a real reason?',
        lines: [
          'Pickup from your hostel room.',
          'Clothes back in one day, not three.',
          'It\'s a new startup.',
          'Your Saturday is yours again.',
        ],
        bug: 2,
        fix: 'Delete it: being new doesn\'t help the customer.',
        explanation: 'Reasons must be about the customer\'s pain, not the company.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the easiest first try, from least to most commitment.',
        lines: ['One bag, pay when it comes back', 'Pay before pickup', 'Weekly plan for a month', 'Semester subscription'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does hand-washing cost in money?',
        answers: ['0', 'nothing', 'free', 'zero'],
        placeholder: 'A number or word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Reason to switch, or just a feature?',
        groups: ['Reason', 'Just a feature'],
        items: [
          { text: 'Get your Saturday back', group: 0 },
          { text: 'Branded laundry bags', group: 1 },
          { text: 'No carrying baskets uphill', group: 0 },
          { text: 'A WhatsApp number', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Finish the sentence for your customer: "I switched to [your idea] because..." Is the reason about their pain?',
    starters: ['"I switched because..."', 'Their old way cost them...'],
  },
  deepen: {
    title: 'Switching costs',
    summary: 'Economists call the effort, risk and money of changing "switching costs". Lower them (free first try, nothing to install, pay after) and more people try you.',
  },
  notes: 'Switching costs and inertia ("status quo bias": Samuelson & Zeckhauser, 1988). Customer reasons come from the fictional Chapter 2 notes.',
};

export default lesson;
