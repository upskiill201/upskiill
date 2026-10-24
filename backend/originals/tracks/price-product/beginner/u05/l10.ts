import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Unit Challenge: the price card that pays (course finale). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the price card that pays',
  summary: 'The final challenge. From 1,500 and "busy and broke" to a card that pays Clinton, his washers and his time. Everything from the course, and one new problem David can\'t stop thinking about.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use everything from the course together', 'Explain, defend and review a price with numbers'],
  learn: [
    {
      kind: 'reading',
      title: 'Where Clinton started, and where he is',
      html: '<p><strong>August:</strong> one price, 1,500 a bag. Clinton thought he kept 500. He really kept 375, before his time. Busy and broke.</p><p><strong>Now:</strong> a cost per bag he knows (1,125), a floor he won\'t go below, three options for three kinds of student, a monthly plan, a hill fee tied to a real cost, a fair deal with two washers, and a card with no surprises.</p><p><strong>November:</strong> about 60,000 FCFA margin for 52 hours, almost double September, with 9 of 10 regulars kept.</p>',
    },
    {
      kind: 'story',
      title: 'Profitable, and broke?',
      beats: [
        { speaker: 'clinton', text: 'Sixty thousand in November. I should feel rich.' },
        { speaker: 'david', text: 'Then why did you borrow 5,000 from me on the 20th to pay Auntie Bih?' },
        { speaker: 'clinton', text: 'Because Plan money comes on the 1st, students pay on Sunday, and Bih wants paying on Saturday.' },
        { speaker: 'tey', text: 'You\'ve priced it well. Next: profit, revenue and cash flow. Why a profitable business can still run out of money.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge: the price card that pays.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'In August, Clinton charged 1,500 with a real cost of 1,125. What did he really keep per bag, in FCFA?',
        answers: ['375'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What is a price floor?',
        options: [
          { text: 'The price competitors charge', why: 'That\'s a reference, not your floor.' },
          { text: 'The lowest price you can charge and still cover costs and your time' },
          { text: 'The highest price customers accept', why: 'That\'s the ceiling.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of pricing is this?',
        groups: ['Cost', 'Value', 'Communication'],
        items: [
          { text: 'Running costs spread over 80 bags', group: 0 },
          { text: 'Express for students in a rush', group: 1 },
          { text: 'Totals shown before payment', group: 2 },
          { text: 'Mama Rose\'s 1,000 a bag', group: 0 },
          { text: 'Saturday free of hand-washing', group: 1 },
          { text: 'Two weeks\' notice of a rise', group: 2 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Standard 1,800, Mama Rose bag cost 1,125. Margin per bag, in FCFA?',
        answers: ['675'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'A new hostel group says: "We\'ll give you 30 bags a week if you do them at 1,200."',
        prompt: "David's best reply?",
        options: [
          { text: '1,200 is barely above cost: 75 a bag for a lot of work. Offer the Saturday Plan at 1,600 a bag, or Saver at 1,400, and let them choose.' },
          { text: 'Take it, 30 bags is huge.', why: 'Lots of bags at almost no margin is busy and broke again.' },
          { text: 'Refuse to talk to them.', why: 'They\'re a big chance; offer what works.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the course chapter to what Clinton learned.',
        pairs: [
          ['Busy and broke', 'Know your real cost'],
          ['What it\'s worth', 'Price the value, not just the cost'],
          ['Three options', 'Let customers choose'],
          ['The price rise', 'Test, give notice, be fair'],
          ['Say it, defend it, review it', 'Explain and check your prices'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The whole course in one sentence.',
        template: 'Know your [[1]], price the [[2]], and say it [[3]].',
        blanks: [['cost', 'costs'], ['value'], ['clearly']],
        distractors: ['logo', 'quietly'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Clinton have to borrow 5,000 in a profitable month?',
        options: [
          { text: 'His prices were too low', why: 'The prices now earn well; the timing is the problem.' },
          { text: 'Money came in later than he had to pay it out' },
          { text: 'He lost customers', why: 'He kept 9 of 10 regulars.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s pricing summary is wrong?',
        lines: [
          'Know the cost of one bag, including running costs.',
          'Never go below the floor.',
          'Give a discount to anyone who says "too expensive".',
          'Review prices every three months.',
        ],
        bug: 2,
        fix: 'Ask "compared with what?" and offer the option that fits.',
        explanation: 'Discount last, if ever.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pricing method from this course.',
        lines: ['Work out your real cost', 'Set a floor', 'Find what it\'s worth to customers', 'Offer clear options', 'Test, then announce', 'Review regularly'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own price card, using everything from this course. Then: is there a week when money goes out before it comes in?',
    starters: ['My price card...', 'Money goes out before it comes in when...'],
  },
  deepen: {
    title: 'Next: Profit, Revenue and Cash Flow',
    summary: 'Clinton\'s prices now earn well, but he still ran short on the 20th. The next course is about why profit and cash are not the same, and how to plan so the money is there when you need it.',
  },
  notes: 'Course finale (fictional): August 1,500 with cost 1,125 (375 margin). November ~60,000 margin, 52 h, 9 of 10 regulars. Hostel group offer at 1,200 earns 75/bag. Hook into course 3: profitable but borrowed 5,000 on the 20th because Plan money arrives on the 1st, students pay Sunday, Bih is paid Saturday.',
};

export default lesson;
