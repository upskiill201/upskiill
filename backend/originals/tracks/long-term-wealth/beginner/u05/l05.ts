import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the quarterly review',
  summary: 'Review day. The long-term pot has recovered some of its fall. Miracle didn\'t sell, kept investing, and wrote her page. Check what you know about falls, bad-year plans, insurance and family.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Respond calmly to a fall', 'Protect and share wealth sustainably'],
  learn: [
    {
      kind: 'story',
      title: 'Review day',
      beats: [
        { speaker: 'miracle', text: 'Still down a bit from the top. But I bought more at the low prices, and I slept fine.' },
        { speaker: 'folake', text: 'That last part is the real return.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the long game.',
    items: [
      {
        kind: 'mcq',
        prompt: 'A spread-out, long-term pot falls 20%. Its owner needs it in 25 years. What\'s the calm response?',
        options: [
          { text: 'Keep investing monthly and review on schedule' },
          { text: 'Sell all of it', why: 'That locks in the loss.' },
          { text: 'Borrow to buy more', why: 'Debt adds pressure.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Insure it, or emergency fund?',
        groups: ['Insure it', 'Emergency fund'],
        items: [
          { text: 'A major operation', group: 0 },
          { text: 'A lost phone charger', group: 1 },
          { text: 'A shop\'s whole stock', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tool to its job.',
        pairs: [
          ['"When it falls" page', 'Stops panic decisions'],
          ['Emergency fund', 'Means you never have to sell'],
          ['Insurance', 'Covers rare, huge costs'],
          ['Family pot', 'Makes giving sustainable'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'My brother wants to borrow ₦500,000. I have ₦600,000 in my emergency fund.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Lend it all.', why: 'Her fund would be nearly gone.' },
          { text: 'Ignore him.', why: 'A warm limit is better.' },
          { text: 'Don\'t empty your emergency fund. Offer what fits your family budget, as a gift, and say what else you can do.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Falls.',
        template: 'A fall only becomes a real [[1]] when you [[2]].',
        blanks: [['loss'], ['sell']],
        distractors: ['gain', 'save'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'An excess of ₦30,000 on a ₦400,000 bill. If fully covered, what does the insurer pay?',
        answers: ['370000', '370,000', '₦370,000', '₦370000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line doesn\'t belong on a "When it falls" page?',
        lines: [
          'Keep the monthly transfers going.',
          'Review quarterly.',
          'Sell if the group chat says so.',
        ],
        bug: 2,
        fix: 'Talk to Folake or an adviser, not the group chat.',
        explanation: 'Group chat panic isn\'t a plan.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 4: what does "half of every raise" protect against?',
        options: [
          { text: 'Inflation', why: 'It protects the gap from creep.' },
          { text: 'Lifestyle creep' },
          { text: 'Market falls', why: 'It\'s about spending.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 4: take-home ₦1,000,000, saves ₦250,000. Savings rate, in percent?',
        answers: ['25', '25%'],
        placeholder: 'A percent',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 3: what makes compounding powerful?',
        options: [
          { text: 'Time: growth on growth over many years' },
          { text: 'Checking it daily', why: 'Checking doesn\'t grow it.' },
          { text: 'A guaranteed rate', why: 'Rates aren\'t guaranteed; time is the key.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four tools (the page, the fund, insurance, the family pot) do you most need to set up?',
    starters: ['I most need...', 'Because...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1–4 with Chapter 3 and 4 review.',
};

export default lesson;
