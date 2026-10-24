import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Card deck: free trials, referral rewards and slow-week deals. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Trials, referrals and slow weeks',
  summary: 'Not all deals are bad. David sorts three kinds of deal Clinton could use, and works out what each costs against what it brings back.',
  minutes: 12,
  outcomes: [
    'Cost a free trial, a referral reward and a slow-week deal',
    'Compare a deal\'s cost with what a regular is worth',
    'Design deals that pay for themselves',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>What a regular is worth.</strong> A typical regular books about 8 Standard bags a semester. At 675 margin each, that\'s about <strong>5,400 FCFA</strong> of margin. A deal that turns a new student into a regular can be worth a lot.</p><p><strong>1. A free first bag.</strong> Costs Clinton the full 1,125 FCFA. Generous, but it attracts people who only want the free one. Expensive way to find regulars.</p><p><strong>2. Half price first bag (900 FCFA).</strong> Costs 225 below cost. Cheaper than free, and people still pay something, so they\'re more serious.</p><p><strong>3. Bring a friend.</strong> When a regular brings a new customer, each gets 300 off their next bag. Cost: 600 for a new customer who already trusts WashDay, because a friend recommended it. If even one in nine referred friends becomes a regular, it pays back (9 × 600 = 5,400).</p><p><strong>4. Slow-week Saver.</strong> In dry weeks, demand drops. A Saver at 1,200 still earns 75 a bag and keeps Mama Rose and Bih busy.</p><p>A good deal has a reason, a limit, and a cost you\'ve worked out.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Compare every deal\'s cost with what it brings back. Reward the behaviour you want: coming back, bringing friends, filling slow weeks.',
    },
  ],
  apply: {
    scenario: 'Which deals pay?',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'A regular books 8 Standard bags a semester at 675 margin. What are they worth, in FCFA?',
        answers: ['5400', '5,400'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does a free first bag cost Clinton?',
        options: [
          { text: 'The full cost: 1,125 FCFA' },
          { text: 'Nothing', why: 'He still pays Mama Rose and the rest.' },
          { text: '675 FCFA', why: 'That\'s the margin he gives up on a paid bag; a free bag costs the whole 1,125.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the deal to its cost to Clinton.',
        pairs: [
          ['Free first bag', '1,125'],
          ['Half-price first bag (900)', '225 below cost'],
          ['Bring a friend (300 + 300)', '600 per new customer'],
          ['Slow-week Saver at 1,200', 'Still earns 75'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A deal with a reason, or just a giveaway?',
        groups: ['Has a reason', 'Just a giveaway'],
        items: [
          { text: 'Bring a friend, both save 300', group: 0 },
          { text: 'Everyone 20% off this month', group: 1 },
          { text: 'Cheaper Saver in dry weeks', group: 0 },
          { text: 'Free bags for anyone who asks', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Free first bags would bring in tons of new customers!',
        prompt: "David's best reply?",
        options: [
          { text: 'Yes, free is always best.', why: 'Free attracts bargain hunters.' },
          { text: 'Never do any deals.', why: 'Some deals pay for themselves.' },
          { text: 'And many who only wanted the free one. Each costs 1,125. Bring-a-friend costs 600 and brings people who already trust you.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'A good deal has...',
        template: 'A [[1]], a [[2]], and a cost you\'ve worked out.',
        blanks: [['reason'], ['limit']],
        distractors: ['logo', 'secret'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A Saver at 1,200 with a 1,125 cost. What margin is left, in FCFA?',
        answers: ['75'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Bring-a-friend costs 600. How many referred friends can Clinton pay for with one regular\'s 5,400?',
        options: [
          { text: '5', why: '5,400 ÷ 600 = 9.' },
          { text: '9' },
          { text: '600', why: 'Divide 5,400 by 600.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s deals list loses money with no reason?',
        lines: [
          'Bring a friend: both 300 off next bag.',
          'Dry-week Saver: 1,200.',
          'Exam week: Express at 1,000 for everyone.',
          'Plan: 1,600 a bag for four bags a month.',
        ],
        bug: 2,
        fix: 'Keep Express at its price; exam weeks are when it\'s most valued.',
        explanation: '1,000 is far below Express\'s 1,425 cost, at its busiest time.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order these first-bag deals from most costly to least.',
        lines: ['Free first bag (costs 1,125)', 'Half-price first bag (225 below cost)', 'Bring a friend (300 off each, from a paid bag)'],
      },
    ],
  },
  reflect: {
    prompt: 'What is a regular customer worth to you over a few months? Which deal could bring you more of them for less?',
    starters: ['A regular is worth...', 'A deal that pays could be...'],
  },
  deepen: {
    title: 'Customer lifetime value',
    summary: 'What a customer is worth over all their purchases is called customer lifetime value. Comparing it with what it costs to win a customer is one of the most useful sums in business.',
  },
  notes: 'Fictional: regular ≈ 8 Standard bags/semester × 675 = 5,400 FCFA margin; free bag costs 1,125; half price 900 (225 below cost); referral 300 + 300 = 600; dry-week Saver 1,200 (margin 75). Customer lifetime value is a standard marketing metric.',
};

export default lesson;
