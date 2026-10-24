import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story with a choice: the boots at 2:14 a.m. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '2:14 a.m.',
  summary: 'The inter-hall final, lost on penalties. Kofi can\'t sleep. At 2:14 a.m., a flash sale: boots, 70% off, three left, four minutes to go. He taps. Four days later, the box arrives. Wrong size. No returns.',
  minutes: 12,
  outcomes: [
    'See how an impulse buy happens, moment by moment',
    'Decide what to do after a purchase you regret',
    'Know the question this course answers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Penalties',
      beats: [
        { speaker: 'narrator', text: 'Saturday night. The inter-hall final. Kofi\'s hall loses 4–3 on penalties. He took the fourth one. He hit the post.' },
        { speaker: 'narrator', text: 'Back in Room 214, 2:14 a.m. He can\'t sleep. He\'s scrolling. His laptop is paid for, his beat money came in on Friday, and his account has more in it than it has ever had.' },
        { speaker: 'narrator', text: 'An ad. The exact boots the winning captain wears. "FLASH SALE. 70% OFF. Was GH₵1,600, now GH₵480. Only 3 left. Ends in 04:59."' },
        { speaker: 'narrator', text: '04:58. 04:57. His thumb is already on "Buy now".' },
        { speaker: 'narrator', text: '2:15 a.m. "Order confirmed!" For about four minutes, he feels great.' },
        { speaker: 'narrator', text: 'Four days later, the box. Size 43. He\'s a 44. The seller\'s page, in small grey text: "Sale items cannot be returned."' },
        { speaker: 'yaw', text: 'Chale. GH₵480. At 2 a.m. You?' },
        { speaker: 'tey', text: 'Here\'s the question for this whole course: why did Kofi buy those boots? Not "because they were cheap". Something else was going on at 2:14. First, what does he do now?' },
      ],
      choice: {
        prompt: 'The boots don\'t fit and can\'t be returned. What should Kofi do?',
        options: [
          { text: 'Keep them in the box "in case my feet change".', outcome: 'Feet don\'t shrink. The boots would sit there as a GH₵480 reminder, and the money stays lost.' },
          { text: 'Sell them to someone they fit, accept the loss, and work out why it happened.', outcome: 'Yes. Kojo on the third floor is a 43 and offers GH₵300. Kofi takes it. GH₵180 lost, but recovered what he could, and he starts the most useful habit of the course: writing down every urge.', best: true },
          { text: 'Buy the right size too, so at least he has boots.', outcome: 'That doubles the problem: another GH₵480, decided while still upset.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Bring your own spending to this course: the last thing you bought and regretted. Every lesson helps you understand why, and choose differently next time.',
    },
  ],
  apply: {
    scenario: '2:14 a.m.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Kofi paid GH₵480 and sold the boots for GH₵300. How much did he lose?',
        answers: ['180', 'GH₵180', '180 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what happened.',
        lines: ['Hall loses the final on penalties', 'Kofi can\'t sleep and scrolls', 'A flash-sale ad with a countdown', 'He taps "Buy now"', 'Wrong size, no returns'],
      },
      {
        kind: 'sortGroups',
        prompt: 'What was really going on at 2:14 a.m.?',
        groups: ['Part of the story', 'Not part of it'],
        items: [
          { text: 'He felt terrible about the penalty', group: 0 },
          { text: 'He was tired', group: 0 },
          { text: 'A countdown timer was running', group: 0 },
          { text: 'He had planned to buy boots for weeks', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the ad say "Was GH₵1,600"?',
        options: [
          { text: 'To make GH₵480 feel like a bargain' },
          { text: 'Because the boots were definitely worth GH₵1,600', why: 'Nobody checked. "Was" prices are often there to make the sale price look small.' },
          { text: 'For no reason', why: 'Everything on a sales page is there for a reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'GH₵480. At 2 a.m. You? Mr Laptop Jar?',
        prompt: 'Kofi\'s most honest reply?',
        options: [
          { text: 'It was a bargain!', why: 'GH₵480 for boots that don\'t fit isn\'t a bargain.' },
          { text: 'I know. I was upset about the penalty and tired, and the timer got me. I want to understand why.' },
          { text: 'Mind your business.', why: 'Defensive. Honesty is where change starts.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The question of the course.',
        template: 'Not "were they [[1]]?" but "why did I [[2]] them?"',
        blanks: [['cheap'], ['buy']],
        distractors: ['nice', 'need'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each detail of the ad to what it was doing.',
        pairs: [
          ['"Ends in 04:59"', 'No time to think'],
          ['"Only 3 left"', 'Fear of missing out'],
          ['"Was GH₵1,600"', 'Makes the price feel small'],
          ['The captain\'s boots', 'Who he wanted to be'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which of Kofi\'s thoughts after the purchase is the trap?',
        lines: [
          'I lost GH₵180.',
          'I want to know why I did it.',
          'I\'ll buy the right size too, to make it worth it.',
        ],
        bug: 2,
        fix: 'Sell these, accept the loss, and pause before any new buy.',
        explanation: 'Trying to "make it worth it" with another purchase, still upset, is how one impulse becomes two.',
      },
      {
        kind: 'mcq',
        prompt: 'How long did the good feeling last after "Order confirmed"?',
        options: [
          { text: 'Four days', why: 'The good feeling was gone long before the box came.' },
          { text: 'Forever', why: 'Regret arrived with the box.' },
          { text: 'About four minutes' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At GH₵37.50 an hour from beats, how many hours is GH₵180? (Round to the nearest hour.)',
        answers: ['5', 'five', '5 hours', '4.8'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the last thing you bought and regretted? Where were you, what time was it, and how were you feeling?',
    starters: ['I bought...', 'It was... and I was feeling...'],
  },
  deepen: {
    title: 'Check returns before you buy',
    summary: 'Many sale items, especially from online sellers, can\'t be returned. Before buying anything on impulse, find the returns policy. If it says "no returns", treat the purchase as final, and give it the extra thought that deserves.',
  },
  notes: 'Course 3 running numbers in tracks/impulse-buying.ts. Fictional ad: "was GH₵1,600, now GH₵480". Sold to Kojo (a hallmate, narrated, no speaker id) for GH₵300. Kofi\'s beat rate GH₵37.50/hour (Course 2).',
};

export default lesson;
