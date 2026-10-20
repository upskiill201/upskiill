import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Before/After: sign-ups vs payments. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Sign-ups vs payments',
  summary: 'Friday night, the post goes up. By Saturday morning, 41 students have replied "interested!" Clinton is celebrating. Then he counts the Mobile Money payments: 12.',
  minutes: 11,
  outcomes: [
    'Tell interest from payment',
    'Work out how many interested people actually paid',
    'Count the number that matters',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The same weekend, two numbers',
      before: {
        label: 'Counting interest',
        text: '41 replies: "interested!", "me!", "how does it work?"\nFeels like a hit.\nBut replying costs nothing.\nIf Clinton planned on 41 bags, he\'d have hired help for 29 that never came.',
      },
      after: {
        label: 'Counting payments',
        text: '12 students paid 1,500 FCFA on Mobile Money.\nThat\'s about 29% of the people who said they were interested.\nEach of the 12 gave up real money.\nThis is the number the pass mark was written for.',
      },
      notes: [
        'Interest is a signal; payment is evidence.',
        'The gap between them is normal. Many people who are "interested" never pay.',
        'Plan with the payments, and use the interested list for follow-ups.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Count what people pay, not what they say.',
    },
  ],
  apply: {
    scenario: 'Saturday morning.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '41 said "interested" and 12 paid. How many interested people didn\'t pay?',
        answers: ['29'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'About what share of interested students paid?',
        options: [
          { text: 'About 29%' },
          { text: 'About 71%', why: 'That\'s the share who didn\'t pay.' },
          { text: 'About 12%', why: '12 of 41 is about 29%.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Interest or evidence?',
        groups: ['Interest', 'Evidence'],
        items: [
          { text: '"Interested!"', group: 0 },
          { text: '1,500 FCFA received on Mobile Money', group: 1 },
          { text: '"How does it work?"', group: 0 },
          { text: 'A bag waiting at the hostel door at 9 a.m.', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: '41 interested! Should I tell Mama Rose to expect 41 bags?',
        prompt: "David's best reply?",
        options: [
          { text: 'Tell her 12: that\'s who paid. Message the other 29 to say there\'s space next weekend.' },
          { text: 'Yes, 41.', why: 'She\'d clear space for 29 bags that won\'t come.' },
          { text: 'Tell her zero, to be safe.', why: '12 are paid and coming.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to what it means.',
        pairs: [
          ['41', 'Said they were interested'],
          ['12', 'Paid real money'],
          ['29', 'Interested but didn\'t pay'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Count what people [[1]], not what they [[2]].',
        blanks: [['pay'], ['say']],
        distractors: ['like', 'want'],
      },
      {
        kind: 'mcq',
        prompt: 'What should Clinton do with the 29 who were interested but didn\'t pay?',
        options: [
          { text: 'Follow up: offer next weekend, and ask what stopped them' },
          { text: 'Count them as customers', why: 'They haven\'t paid.' },
          { text: 'Ignore them', why: 'They\'re warm leads, and their reasons are useful.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s weekend report counts the wrong thing?',
        lines: [
          'Post reached about 300 students.',
          '41 replied "interested".',
          'Result: 41 customers this weekend.',
          '12 paid on Mobile Money.',
        ],
        bug: 2,
        fix: 'Result: 12 paying customers this weekend.',
        explanation: 'Interest isn\'t a customer; payment is.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the funnel, from most people to fewest.',
        lines: ['Saw the post (about 300)', 'Said "interested" (41)', 'Paid (12)'],
      },
      {
        kind: 'typeAnswer',
        prompt: '12 paid 1,500 FCFA each. How much came in, in FCFA?',
        answers: ['18000', '18,000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'In your own test, what will count as "interest" and what will count as "payment"? How will you follow up with the interested ones?',
    starters: ['Interest is...', 'Payment is...'],
  },
  deepen: {
    title: 'Funnels',
    summary: 'A funnel shows how many people drop off at each step: saw it, showed interest, paid, came back. Every business has one. Chapter 5 adds the last step: did they come back?',
  },
  notes: 'Fictional weekend 1: ~300 reached; 41 "interested" replies; 12 paid 1,500 FCFA (18,000 FCFA); 12/41 ≈ 29%.',
};

export default lesson;
