import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the sticky note',
  summary: 'Kavya sees the sticky note and laughs. Then she tries the three questions on her own crypto and stops laughing. Check what you know about pausing, the risk ladder, volatility and the three questions.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain risk, return and volatility', 'Use the three questions'],
  learn: [
    {
      kind: 'story',
      title: 'Kavya tries it',
      beats: [
        { speaker: 'kavya', text: 'How far could it fall? ...A lot. Zero? ...Maybe. Get it out fast? Yes, but at whatever price it is that day.' },
        { speaker: 'arjun', text: 'So not "never", just "know what you\'re holding".' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: what risk means.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the best first step with a big windfall?',
        options: [
          { text: 'Invest it all this week', why: 'Rushing is the risk.' },
          { text: 'Lend it to whoever asks first', why: 'That\'s not a plan.' },
          { text: 'Park it safely and learn before deciding' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order from lowest risk to highest.',
        lines: ['Savings account', 'Government bond', 'Wide spread of shares', 'One small company'],
      },
      {
        kind: 'typeAnswer',
        prompt: '₹2,00,000 falls 50%. What gain, in percent, does it need to recover?',
        answers: ['100', '100%'],
        placeholder: 'A percent',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its meaning.',
        pairs: [
          ['Volatility', 'How much values swing'],
          ['Expected return', 'Rough long-run average, not a promise'],
          ['Liquidity', 'How fast you can get cash out'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'My friend says his fund went up 25% then down 25%, so he\'s even.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'He\'s down about 6%. 1.25 times 0.75 is 0.9375.' },
          { text: 'Yes, even.', why: 'A loss after a gain removes more rupees.' },
          { text: 'He\'s up.', why: 'He\'s down.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good risk question, or not a risk question?',
        groups: ['Risk question', 'Not a risk question'],
        items: [
          { text: 'How far could it fall?', group: 0 },
          { text: 'How rich will I get?', group: 1 },
          { text: 'Could it go to zero?', group: 0 },
          { text: 'Who else bought it?', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The ladder.',
        template: 'Higher possible [[1]] come with bigger possible [[2]].',
        blanks: [['returns', 'gains'], ['losses']],
        distractors: ['fees', 'friends'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Cash can lose buying power to inflation.',
          'A wide spread of companies rarely goes to zero.',
          'High returns with no risk are common if you know where to look.',
        ],
        bug: 2,
        fix: 'High returns always come with risk.',
        explanation: '"High return, no risk" is the classic sign of a scam.',
      },
      {
        kind: 'typeAnswer',
        prompt: '₹1,00,000 falls 20%. What\'s it worth?',
        answers: ['80000', '80,000', '₹80,000', '₹80000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What did Kavya learn about her crypto?',
        options: [
          { text: 'It\'s risk-free', why: 'She found the opposite.' },
          { text: 'It can\'t be sold', why: 'It can, at that day\'s price.' },
          { text: 'It could fall a lot, maybe to zero, and sells at whatever the price is that day' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What would you write on your own sticky note?',
    starters: ['My questions:...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1–4. 1.25 × 0.75 = 0.9375.',
};

export default lesson;
