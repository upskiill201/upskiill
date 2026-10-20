import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: who comes back?',
  summary: 'Regulars matter most, early customers can be found for free, coming back shows value, and every test ends in persevere, pivot or stop. Quick check before the hardest kind of decision.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Read customer return numbers without notes', 'Match evidence to a decision'],
  learn: [
    {
      kind: 'story',
      title: 'Two-thirds',
      beats: [
        { speaker: 'narrator', text: 'David circles one number in the notebook: 8 of 12 came back.' },
        { speaker: 'david', text: 'That\'s the number that says this is real. Now, do you still want that app?' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: who comes back?',
    items: [
      {
        kind: 'typeAnswer',
        prompt: '20 customers tried a service and 5 came back. What percentage came back?',
        answers: ['25', '25%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which is the strongest evidence of value?',
        options: [
          { text: 'Customers paying a second and third time' },
          { text: 'Many first-time sign-ups', why: 'First orders can be curiosity.' },
          { text: 'Likes on the post', why: 'The weakest evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Persevere, pivot or stop?',
        groups: ['Persevere', 'Pivot', 'Stop'],
        items: [
          { text: 'WashDay after three weekends', group: 0 },
          { text: 'CampusEats to WashDay', group: 1 },
          { text: 'Three fair tests, no buyers, no new lead', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its lesson.',
        pairs: [
          ['Ten regulars', 'Best evidence'],
          ['One name per customer', 'Free referrals'],
          ['8 of 12', 'They come back'],
          ['Stop rule', 'Written early'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Two people left because they went home. Should that worry me?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'Not much: you can\'t act on holidays. Focus on the late bag and the price, the reasons you can fix.' },
          { text: 'Yes, panic.', why: 'Some reasons are outside his control.' },
          { text: 'Follow them home.', why: 'Not practical or needed.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Curiosity and value.',
        template: 'First orders show [[1]]; second orders show [[2]].',
        blanks: [['curiosity'], ['value']],
        distractors: ['profit', 'likes'],
      },
      {
        kind: 'findBug',
        prompt: 'Which customer-finding idea costs the most for the least learning right now?',
        lines: [
          'Ask each regular for one name.',
          'Stand at the washing areas on Saturday.',
          'Pay for a billboard in town.',
          'Give caretakers a free bag for sharing the post.',
        ],
        bug: 2,
        fix: 'Keep using free channels until capacity is fixed.',
        explanation: 'A billboard is expensive, and he can\'t serve many more yet.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the weeks of Clinton\'s journey.',
        lines: ['CampusEats tested and killed', 'Interviews find laundry', 'Weekend tests pass', 'Two-thirds come back', 'Decision: persevere with fixes'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask happy customers for names instead of buying ads now?',
        options: [
          { text: 'It\'s free, trusted, and he\'s near his capacity limit anyway' },
          { text: 'Ads are illegal', why: 'They\'re just premature here.' },
          { text: 'Customers like being asked for money', why: 'He asks for names, not money.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Regular or one-time customer?',
        groups: ['Regular', 'One-time'],
        items: [
          { text: 'Brenda, three weekends', group: 0 },
          { text: 'Tried once, never replied', group: 1 },
          { text: 'Esther, two weekends', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For your idea, what would "coming back" look like, and how soon would you know?',
    starters: ['Coming back would mean...', 'I\'d know after...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1-4. 5 of 20 = 25%.',
};

export default lesson;
