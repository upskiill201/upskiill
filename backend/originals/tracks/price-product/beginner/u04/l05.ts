import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: rises and deals',
  summary: 'Rising costs force rising prices, discounts come out of the margin, good deals pay for themselves, and price rises need notice, reasons and care for regulars. Quick check before the test.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Do discount maths without notes', 'Plan a fair price rise'],
  learn: [
    {
      kind: 'story',
      title: 'Message drafted',
      beats: [
        { speaker: 'narrator', text: 'The price-rise message sits in Clinton\'s drafts: notice, reasons, thanks, and the new photo.' },
        { speaker: 'david', text: 'Don\'t send it yet. First we test the new prices on one hostel.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: rises and deals.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'A product sells for 2,000 with a 1,500 cost. A 10% discount leaves what margin, in FCFA?',
        answers: ['300'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'With that discount, how many times more sales are needed to earn the same (500 ÷ 300)?',
        options: [
          { text: 'About 1.67 times' },
          { text: '1.1 times', why: '500 ÷ 300 ≈ 1.67.' },
          { text: '3 times', why: 'Divide the old margin by the new one.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['Auntie Bih\'s 1,100', 'Costs rise, price follows'],
          ['10% off 1,800', '180 off the margin'],
          ['Bring a friend', 'A deal that pays back'],
          ['Two weeks\' notice', 'A fair rise'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good deal or bad deal?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Plan at 1,600 for four bags', group: 0 },
          { text: '20% off for anyone who asks', group: 1 },
          { text: 'Referral: 300 off each', group: 0 },
          { text: 'Express below its cost in exam week', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'What do I tell friends who still want 20% off?',
        prompt: "David's best reply?",
        options: [
          { text: 'Same deal as everyone: Saver if money\'s tight, or the Plan for a real saving. Fair to all, and it still earns.' },
          { text: 'Give them 50% off.', why: 'That\'s below cost.' },
          { text: 'Stop being friends.', why: 'Offer the fair options instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Discounts.',
        template: 'A discount comes out of your [[1]], so thin margins need big [[2]] increases.',
        blanks: [['margin'], ['sales']],
        distractors: ['costs', 'price'],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of this price-rise plan is missing?',
        lines: [
          'Notice: two weeks.',
          'Reasons: two washers, no bag turned away.',
          'Something better: collection photos.',
          'Regulars: same new price as everyone, starting tomorrow.',
        ],
        bug: 3,
        fix: 'Regulars: keep 1,600 until month end, or join the Plan.',
        explanation: 'Thanking regulars is one of the four parts.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A Bih bag at 1,800 (cost 1,225). What is the margin, in FCFA?',
        answers: ['575'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order these deals from most to least costly to Clinton per new customer.',
        lines: ['Free first bag (1,125)', 'Bring a friend (600)', 'Half-price first bag (225)'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the price have to rise once Auntie Bih joined?',
        options: [
          { text: 'Her bags cost more, and at 1,500 they barely paid' },
          { text: 'She demanded it', why: 'She set her price; Clinton set his.' },
          { text: 'It didn\'t have to', why: 'At 1,500, a Bih bag leaves only 275.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which deal or discount do you offer now? Does it pay for itself?',
    starters: ['I offer...', 'It pays back by...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1-4. 2,000/1,500: margin 500, 10% → 300, ×1.67.',
};

export default lesson;
