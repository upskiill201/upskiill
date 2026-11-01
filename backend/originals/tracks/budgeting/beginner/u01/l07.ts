import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Chat with Tey: the "small small" problem. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The "small small" problem',
  summary: 'No single payment was more than GH₵60. So how did food alone come to GH₵660? Tey walks Kofi through the maths of small, frequent spending.',
  minutes: 11,
  outcomes: [
    'Work out the monthly cost of a daily habit',
    'Explain why small payments add up unnoticed',
    'Tell a leak worth fixing from one that isn\'t',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Kofi\'s biggest single food payment was GH₵35. So how did food come to GH₵660 in twelve days?', replies: ['Lots of small ones?'] },
        { tey: 'Exactly. Breakfast GH₵10, lunch GH₵25, kelewele or noodles at night GH₵12, a drink GH₵8. About GH₵55 a day. Nothing feels big.', replies: ['GH₵55 doesn\'t sound like a lot.'] },
        { tey: 'Per day, no. Now times 30. That\'s GH₵1,650 a month. More than Mum sends. Food alone would empty the account.', replies: ['Wait, really?'] },
        { tey: 'Really. That\'s the "small small" problem: we judge a payment by its size, but a habit by its size times how often. Price × how often = the real cost.', replies: ['So should he never buy kelewele again?'] },
        { tey: 'No! I\'d never ban kelewele. The point is to see the habit\'s real price and choose it on purpose. Some small habits are worth it. Some aren\'t, once you see the monthly number.', replies: ['How do you know which?'] },
        { tey: 'Ask: how often? What does it cost a month? Does it make my life better by that much? A GH₵8 drink he enjoys with friends might pass. GH₵10 data bundles every day when a plan exists probably won\'t.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Price × how often = the real cost. Judge habits by their monthly cost, not by one payment.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s daily habits.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'A GH₵8 drink every day for 30 days costs how much?',
        answers: ['240', 'GH₵240', '240 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why didn\'t Kofi notice GH₵660 going on food?',
        options: [
          { text: 'Each payment was small, so none of them felt big' },
          { text: 'Food prices rose overnight', why: 'Prices didn\'t change. The number of payments did the damage.' },
          { text: 'Yaw ate his food', why: 'Funny, but no. It was Kofi\'s own small daily payments.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]] × how [[2]] = the real cost',
        blanks: [['Price'], ['often']],
        distractors: ['Size', 'big'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each daily habit to its 30-day cost.',
        pairs: [
          ['GH₵5 a day', 'GH₵150'],
          ['GH₵10 a day', 'GH₵300'],
          ['GH₵12 a day', 'GH₵360'],
          ['GH₵25 a day', 'GH₵750'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'OK, so I\'ll stop buying anything small. No kelewele, no drinks, nothing.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Good. Small things are the enemy.', why: 'Banning everything small usually lasts about four days. Then it all comes back.' },
          { text: 'Pick on purpose. Keep the ones that are worth their monthly price, cut the ones that aren\'t.' },
          { text: 'Small things don\'t matter; only big things do.', why: 'His case shows the opposite: small things added up to more than any big thing.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Which habit is most likely worth cutting?',
        options: [
          { text: 'A GH₵8 drink with friends twice a week that he really enjoys', why: 'GH₵64 a month for real enjoyment and friendship might pass the test.' },
          { text: 'Lunch on days he has labs and no time to cook', why: 'A real need on busy days. Better to plan for it than cut it.' },
          { text: 'Buying daily data bundles when a cheaper monthly plan exists' },
        ],
        answer: 2,
        explanation: 'Same data, much more money. No enjoyment lost by switching.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Is each one worth its monthly price? Kofi decides.',
        groups: ['Worth it', 'Not worth it'],
        items: [
          { text: 'Friday drink with the football team (GH₵32/month)', group: 0 },
          { text: 'Daily bundles instead of a plan (about GH₵230/month extra)', group: 1 },
          { text: 'Breakfast every day instead of bread and tea from his room (GH₵300/month)', group: 1 },
          { text: 'One proper dinner out with Efua a month (GH₵50)', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the three questions for any small habit.',
        lines: ['How often do I do it?', 'What does it cost a month?', 'Is it worth that much to me?'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'GH₵55 a day on food bought out. What\'s that over 30 days?',
        answers: ['1650', '1,650', 'GH₵1,650', 'GH₵1650'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'GH₵1,650 a month on food bought out vs GH₵1,580 income. What does that tell Kofi?',
        options: [
          { text: 'He\'s fine as long as he skips some days', why: 'Even skipping a few days leaves almost nothing for data, transport or school.' },
          { text: 'Food bought out at this rate can\'t fit his income, so it has to change' },
          { text: 'He needs to spend more on food', why: 'The opposite: at this rate food alone is more than everything he gets.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Pick one small thing you buy often. Work out its monthly cost. Is it worth that much to you?',
    starters: ['I buy...', 'Per month that\'s...', 'It\'s worth it / not worth it because...'],
  },
  deepen: {
    title: 'The "latte factor" debate',
    summary: 'Some money writers say cutting small treats will make you rich; others say it\'s the big costs (rent, transport, debt) that matter. Both are partly right. Small habits matter when they\'re frequent and big compared with your income, as Kofi\'s food is. Cut those, keep the ones that bring real joy, and don\'t sweat the rare ones.',
  },
  notes: 'Fictional daily food spend: breakfast 10, lunch 25, night food 12, drink 8 = GH₵55/day; 12 days ≈ GH₵660; ×30 = 1,650. Daily bundle 10×30 = 300 vs plan ~70 → ~230 extra (illustrative). "Latte factor" coined by David Bach (The Automatic Millionaire, 2004); critics note big fixed costs often matter more. Presented as a debate, not a rule.',
};

export default lesson;
