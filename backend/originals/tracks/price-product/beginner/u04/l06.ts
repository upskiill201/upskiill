import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Before/After: testing a new price on one hostel first. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Test it on one hostel first',
  summary: 'Instead of switching everyone, David suggests a test: the new price card in one hostel, the old price in a similar one, for two weekends. Then compare not bookings, but margin.',
  minutes: 12,
  outcomes: [
    'Run a fair price test between two groups',
    'Compare results by margin, not just orders',
    'Decide from the test before switching everyone',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Switch everyone vs test first',
      before: {
        label: 'Switch everyone at once',
        text: 'New prices for all hostels on Saturday.\nIf bookings drop, was it the price? The weather? Exams?\nNo way to tell.\nIf it goes wrong, every customer saw it.',
      },
      after: {
        label: 'Test on one hostel',
        text: 'Hostel A (about 100 students): new card, Standard 1,800.\nHostel B (similar, about 100 students): old 1,500.\nTwo weekends, same weather, same exams.\nResult: A booked 14 bags, B booked 17.\nMargin: A 14 × 675 = 9,450. B 17 × 375 = 6,375.\nFewer bags, more money.',
      },
      notes: [
        'Compare similar groups at the same time, so the price is the main difference.',
        'Judge by margin (what you keep), not just bookings.',
        'Tell the test hostel the price clearly; never charge two people different prices for the same thing in secret.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Fewer orders at a higher price can still mean more money. Always compare margins.',
    },
  ],
  apply: {
    scenario: 'Hostel A vs Hostel B.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Hostel A booked 14 bags at 675 margin. What was the margin, in FCFA?',
        answers: ['9450', '9,450'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Hostel B booked 17 bags at 375 margin. What was the margin, in FCFA?',
        answers: ['6375', '6,375'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which hostel earned more for Clinton?',
        options: [
          { text: 'Hostel B: it had more bookings', why: 'More bookings, less money.' },
          { text: 'They were equal', why: 'A earned about 3,000 more.' },
          { text: 'Hostel A (new price): 9,450 vs 6,375' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes the test fair, or spoils it?',
        groups: ['Fair', 'Spoils it'],
        items: [
          { text: 'Two similar hostels, same weekends', group: 0 },
          { text: 'New price in exam week, old price in a quiet week', group: 1 },
          { text: 'Comparing margin, not just bookings', group: 0 },
          { text: 'A hill hostel against a gate hostel', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Hostel A booked fewer bags. So the new price failed?',
        prompt: "David's best reply?",
        options: [
          { text: 'Yes, fewer bags means it failed.', why: 'Margin is what matters.' },
          { text: 'It earned 3,075 FCFA more with 3 fewer bags, which is also less cycling. That\'s a win.' },
          { text: 'Tests never mean anything.', why: 'This one is clear.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the hostel to its result.',
        pairs: [
          ['Hostel A, new price', '14 bags, 9,450 margin'],
          ['Hostel B, old price', '17 bags, 6,375 margin'],
          ['The difference', 'About 3,075 more at the new price'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Judging a price test.',
        template: 'Compare similar groups at the same [[1]], and judge by [[2]].',
        blanks: [['time'], ['margin']],
        distractors: ['place', 'likes'],
      },
      {
        kind: 'mcq',
        prompt: 'Why compare two hostels at the same time instead of one hostel before and after?',
        options: [
          { text: 'So weather, exams and holidays affect both the same way' },
          { text: 'It\'s cheaper', why: 'It\'s about a fair comparison.' },
          { text: 'There\'s no reason', why: 'Timing changes demand.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this test plan is unfair to customers?',
        lines: [
          'Hostel A: new price card, posted clearly.',
          'Hostel B: old price, posted clearly.',
          'Charge some students in Hostel A more, without telling them.',
          'Compare margins after two weekends.',
        ],
        bug: 2,
        fix: 'Everyone in a hostel sees and pays the same posted price.',
        explanation: 'Secretly charging people different prices is unfair and damages trust.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a fair price test.',
        lines: ['Choose two similar groups', 'Post a clear price for each', 'Run both at the same time', 'Compare margins', 'Decide whether to switch everyone'],
      },
    ],
  },
  reflect: {
    prompt: 'How could you test a new price on a small group of your customers first? What would you compare?',
    starters: ['I could test it on...', 'I\'d compare...'],
  },
  deepen: {
    title: 'A/B tests',
    summary: 'Testing two versions on similar groups at the same time is called an A/B test. Online businesses do it constantly; small businesses can do it with two hostels, two days or two markets.',
  },
  notes: 'Fictional test: Hostel A (new card, Standard 1,800) 14 bags × 675 = 9,450; Hostel B (old 1,500) 17 bags × 375 = 6,375; difference 3,075.',
};

export default lesson;
