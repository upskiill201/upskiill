import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Myth or Fact: retail therapy. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Retail therapy: does it work?',
  summary: 'Yaw swears by it: "Bad day? Buy something. Instantly better." Is he wrong? Surprisingly, not completely. Five claims about shopping and mood, tested.',
  minutes: 10,
  outcomes: [
    'Explain what research says about shopping and mood',
    'See why "it works a bit" makes it a habit',
    'Find mood-lifters that cost less',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Shopping can genuinely lift your mood in the short term.',
          isFact: true,
          explain: 'Fact. Studies have found that shopping can reduce sadness for a while, partly because choosing feels like taking back some control (Rick, Pereira and Burson, 2014).',
        },
        {
          text: 'Most "retail therapy" purchases are later regretted.',
          isFact: false,
          explain: 'Myth, as a blanket rule. In one study, many shoppers didn\'t regret small mood-lifting purchases (Atalay and Meloy, 2011). The problem comes when they\'re big, frequent or unaffordable.',
        },
        {
          text: 'Because it works a little, shopping can become the go-to fix for bad feelings.',
          isFact: true,
          explain: 'Fact. Anything that makes you feel better quickly can turn into a habit. That\'s how GH₵12 on a bad day becomes GH₵480 at 2 a.m.',
        },
        {
          text: 'Shopping fixes the cause of a bad day.',
          isFact: false,
          explain: 'Myth. New boots don\'t un-miss a penalty. The feeling lifts briefly; the cause is still there tomorrow.',
        },
        {
          text: 'Cheaper activities, like a walk, music or a call, can lift mood too.',
          isFact: true,
          explain: 'Fact. Physical activity, music and social contact are reliably linked to better mood, and cost little or nothing.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Yaw\'s defence',
      beats: [
        { speaker: 'yaw', text: 'See? Retail therapy works. Science says.' },
        { speaker: 'kofi', text: 'Science says a bit, for a while, if it\'s small. You bought six things on Tuesday.' },
        { speaker: 'yaw', text: '...Tuesday was a very bad day.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Retail therapy can help a little, briefly, if it\'s small and affordable. It doesn\'t fix the cause, and it easily becomes a habit. Cheaper mood-lifters work too.',
    },
  ],
  apply: {
    scenario: 'Does retail therapy work?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Shopping can lift mood briefly', group: 1 },
          { text: 'Shopping fixes the cause of a bad day', group: 0 },
          { text: 'It can become a habit because it works a little', group: 1 },
          { text: 'Every mood purchase is regretted', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why might shopping make people feel better for a while?',
        options: [
          { text: 'Making choices can bring back a feeling of control' },
          { text: 'The products are magic', why: 'It\'s about the act of choosing.' },
          { text: 'It doesn\'t at all', why: 'Research found a short-term lift.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each bad feeling to a cheaper mood-lifter.',
        pairs: [
          ['Sad after a match', 'A walk and a call home'],
          ['Stressed', 'Music and ten minutes of revision'],
          ['Lonely', 'Dinner in the hall kitchen'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Science says retail therapy works. So I\'m fine.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Science is wrong.', why: 'The research is real. The dose is the issue.' },
          { text: 'Yes, keep going.', why: 'Big and frequent is where it turns harmful.' },
          { text: 'It says small, occasional, affordable buys help a bit. Six things on Tuesday is the habit version.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'When it\'s okay.',
        template: 'Small, [[1]], and [[2]].',
        blanks: [['occasional', 'rare'], ['affordable']],
        distractors: ['daily', 'borrowed'],
      },
      {
        kind: 'findBug',
        prompt: 'Which use of retail therapy has become a problem?',
        lines: [
          'A GH₵12 kelewele after a hard exam, from the fun line.',
          'A new book after a bad week, planned for.',
          'Something every night this week, on "pay later".',
        ],
        bug: 2,
        fix: 'A cheaper mood-lifter most nights; a planned treat once a week.',
        explanation: 'Every night, on credit, is the habit version.',
      },
      {
        kind: 'mcq',
        prompt: 'What happens to the cause of the bad feeling after shopping?',
        options: [
          { text: 'It\'s fixed', why: 'Boots don\'t fix a missed penalty.' },
          { text: 'It\'s still there' },
          { text: 'It gets smaller', why: 'The feeling lifts briefly; the cause doesn\'t change.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Yaw bought six things on Tuesday at about GH₵50 each. Roughly how much?',
        answers: ['300', 'GH₵300', '300 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the retail therapy habit loop.',
        lines: ['Bad feeling', 'Buy something', 'Brief lift', 'Feeling returns', 'Buy again, bigger'],
      },
      {
        kind: 'mcq',
        prompt: 'Which statement is fairest?',
        options: [
          { text: 'Small treats can help; big or frequent ones become a costly habit' },
          { text: 'Retail therapy is always fine', why: 'Not when it\'s big or frequent.' },
          { text: 'Retail therapy never helps', why: 'Research found some short-term benefit.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What do you buy to feel better? What\'s a cheaper mood-lifter that works for you?',
    starters: ['When I feel bad, I buy...', 'A cheaper thing that works:...'],
  },
  deepen: {
    title: 'Read the studies',
    summary: 'Atalay and Meloy (2011), "Retail therapy: A strategic effort to improve mood", Psychology & Marketing. Rick, Pereira and Burson (2014), "The benefits of retail therapy: Making purchase decisions reduces residual sadness", Journal of Consumer Psychology.',
  },
  notes: 'Atalay, A. S., & Meloy, M. G. (2011). Psychology & Marketing, 28(6), 638–659. Rick, S. I., Pereira, B., & Burson, K. A. (2014). JCP, 24(3), 373–380. Mood benefits of activity/music/social contact: broad literature; stated generally.',
};

export default lesson;
