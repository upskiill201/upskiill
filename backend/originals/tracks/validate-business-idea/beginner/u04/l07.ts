import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Chat with Tey: doing it by hand. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Doing it by hand',
  summary: 'Saturday: twelve bags, one bicycle, one hill, one rainstorm. Clinton learns more in one day of doing the job than in a month of planning it. Tey goes through what the weekend taught him.',
  minutes: 12,
  outcomes: [
    'Learn from running a service by hand',
    'Spot problems you\'d never find on paper',
    'See what the service really earns per order',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Doing it by hand shows you things no plan does. Clinton\'s first surprise: three hostel gates stay locked until 9 a.m. His 7 a.m. pickup plan was useless.', replies: ['What else went wrong?'] },
        { tey: 'Two students\' bags looked the same and nearly got swapped. Now every bag gets a name tag. And on Sunday it poured, so one bag came back on Monday, a day late.', replies: ['Did Mama Rose cope?'] },
        { tey: 'Easily: twelve bags were done by 6 p.m. She said she could handle about 25 on a Saturday. That\'s a limit worth knowing.', replies: ['And the money?'] },
        { tey: 'Each bag: 1,500 FCFA in, 1,000 FCFA to Mama Rose. Clinton keeps 500 a bag: 6,000 FCFA for a whole weekend of cycling up hills. Customers were happy. Whether the price is right is a question for later. For now, the key test is: did they pay?' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Doing it by hand is how you find the problems that would have been built into your app.',
    },
  ],
  apply: {
    scenario: 'What the weekend taught.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Each bag earns 1,500 FCFA and Mama Rose gets 1,000. How much does Clinton keep per bag?',
        answers: ['500'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Clinton keeps 500 FCFA on each of 12 bags. How much for the weekend?',
        options: [
          { text: '6,000 FCFA' },
          { text: '18,000 FCFA', why: 'That\'s total money in, before paying Mama Rose.' },
          { text: '12,000 FCFA', why: 'That\'s what Mama Rose gets.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Found by doing it by hand, or could be found on paper?',
        groups: ['Only by doing', 'On paper'],
        items: [
          { text: 'Hostel gates locked until 9 a.m.', group: 0 },
          { text: 'Two bags that looked the same', group: 0 },
          { text: 'Price minus Mama Rose\'s share', group: 1 },
          { text: 'Rain delaying a return', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the fix.',
        pairs: [
          ['Gates locked till 9', 'Start pickups at 9'],
          ['Bags look the same', 'Name tags on every bag'],
          ['Rain on Sunday', 'Tell customers about rain delays'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: '6,000 FCFA for a whole weekend of cycling? That feels terrible.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'That\'s a pricing question, and an important one. But this weekend asked "will they pay?", and 12 did. Note it and test the price next.' },
          { text: 'Then quit now.', why: 'The demand question passed; the price can change.' },
          { text: 'Don\'t think about money.', why: 'Money matters; just one question at a time.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Mama Rose\'s limit.',
        template: 'She can handle about [[1]] bags on a [[2]].',
        blanks: [['25'], ['Saturday']],
        distractors: ['100', 'Monday'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is Mama Rose\'s 25-bag limit important to know now?',
        options: [
          { text: 'It caps how much WashDay can grow on Saturdays unless something changes' },
          { text: 'It isn\'t important', why: 'Capacity limits growth.' },
          { text: 'It means she\'s lazy', why: 'It\'s a real limit of one stand.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the original plan did the weekend prove wrong?',
        lines: [
          'Payment on Mobile Money before pickup.',
          'Mama Rose washes on Saturday.',
          'Pickups start at 7 a.m. at every hostel.',
          'Return bags on Sunday evening.',
        ],
        bug: 2,
        fix: 'Pickups start at 9 a.m., when the gates open.',
        explanation: 'Three gates stay locked until 9.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Saturday as it should run now.',
        lines: ['Tag every bag with a name', 'Collect from 9 a.m.', 'Deliver to Mama Rose', 'Collect the clean bags at 6 p.m.', 'Return them on Sunday'],
      },
      {
        kind: 'sortGroups',
        prompt: 'A question for now, or for later (pricing)?',
        groups: ['Now', 'Later'],
        items: [
          { text: 'Will students pay at all?', group: 0 },
          { text: 'Is 500 FCFA a bag enough for Clinton?', group: 1 },
          { text: 'Can bags come back on time?', group: 0 },
          { text: 'Should long-distance pickups cost more?', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you ran your idea by hand for one weekend, what do you think would go wrong that you can\'t see now?',
    starters: ['I think...', 'I\'d only find out by...'],
  },
  deepen: {
    title: 'Coming in course 2',
    summary: 'Clinton keeps 500 FCFA a bag, and loses money on far-away hostels. That\'s exactly where How to Price a Product or Service picks up.',
  },
  notes: 'Fictional weekend 1 details: three hostel gates locked until 9 a.m.; name tags added after a near mix-up; one bag returned Monday due to rain; Mama Rose capacity ~25 bags per Saturday; per bag 1,500 in, 1,000 to Mama Rose, 500 kept; 12 bags = 6,000 FCFA kept.',
};

export default lesson;
