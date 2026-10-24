import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Chat with Tey: no reward without risk. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Why there\'s no free return',
  summary: 'Arjun asks Tey the question he\'s been circling: "Is there anything that gives high returns without risk?" The honest answer, and why it protects you.',
  minutes: 12,
  outcomes: [
    'Explain why higher returns require risk',
    'Use that idea to spot impossible promises',
    'Know what "risk-free" really means',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Short answer: no. Long answer: let\'s see why. Why do you think anyone would pay you more for your money?', replies: ['Because they need it?'] },
        { tey: 'Partly. But mostly because you\'re taking a chance. A bank pays a little because it\'s very likely to pay you back. A new company pays more because it might not. The extra is payment for the chance of losing.', replies: ['So higher return means higher risk?'] },
        { tey: 'Usually, yes. Economists call that extra the risk premium. If something offered high returns with no risk, everyone would rush in, the price would rise, and the return would fall back down.', replies: ['Then how do some schemes offer 3% a month, safe?'] },
        { tey: 'Either the risk is hidden, or it\'s a scam paying old investors with new investors\' money. 3% a month is about 42% a year. Nothing safe pays that.', replies: ['What does "risk-free" actually mean?'] },
        { tey: 'Usually: very unlikely to lose rupees, like a government bond or an insured deposit, up to its limits. Even then there\'s inflation risk. "Risk-free" means low risk of losing money, not no risk at all.', replies: ['So what do I do with this?'] },
        { tey: 'Use it as a filter. Whenever someone offers high returns, ask: where\'s the risk? If they say "there isn\'t any", you\'ve learnt everything you need.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Higher returns are payment for risk. Anything promising high returns with no risk is hiding the risk, or is a scam.',
    },
  ],
  apply: {
    scenario: 'The risk premium.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does a new company pay more interest than a bank?',
        options: [
          { text: 'It\'s richer', why: 'It pays more because it\'s riskier.' },
          { text: 'It\'s more likely to fail to pay back, so it must pay more to attract lenders' },
          { text: 'It\'s generous', why: 'It\'s paying for risk.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Roughly, 3% a month is about what percent a year, with compounding? (Tey\'s number.)',
        answers: ['42', '42%', '43', '43%'],
        placeholder: 'A percent',
      },
      {
        kind: 'sortGroups',
        prompt: 'Believable or impossible?',
        groups: ['Believable', 'Impossible'],
        items: [
          { text: 'Modest return, low risk', group: 0 },
          { text: 'High return, no risk', group: 1 },
          { text: 'Higher return, higher risk', group: 0 },
          { text: '3% a month, guaranteed safe', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'My neighbour\'s scheme has paid 3% a month for a year. So it\'s real?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Yes, a year proves it.', why: 'Ponzi schemes pay reliably at first.' },
          { text: 'Put your savings in.', why: 'Classic trap.' },
          { text: 'Schemes that pay old investors with new money often pay perfectly until the day they stop. A year of payments proves nothing.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The idea.',
        template: 'The extra return for taking risk is called the risk [[1]].',
        blanks: [['premium']],
        distractors: ['bonus', 'fee'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each phrase to what it really means.',
        pairs: [
          ['"Risk-free"', 'Low risk of losing rupees, not no risk'],
          ['"Guaranteed high returns"', 'Hidden risk, or a scam'],
          ['"Expected return"', 'A rough average, not a promise'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the WhatsApp group\'s pitch is impossible?',
        lines: [
          'We invest in many businesses.',
          'Returns vary month to month.',
          '3% every month, zero risk.',
        ],
        bug: 2,
        fix: 'No real investment pays high returns with zero risk.',
        explanation: 'High return and no risk can\'t exist together for long.',
      },
      {
        kind: 'mcq',
        prompt: 'If a truly risk-free high return existed, what would happen?',
        options: [
          { text: 'Everyone would rush in until the return fell' },
          { text: 'It would stay secret forever', why: 'Markets find free money fast.' },
          { text: 'Nothing', why: 'Demand would push the return down.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s filter.',
        lines: ['Hear a high-return offer', 'Ask: where\'s the risk?', 'Listen to the answer', 'If "none", walk away'],
      },
      {
        kind: 'mcq',
        prompt: 'Even a "risk-free" government bond has which risk?',
        options: [
          { text: 'It will certainly go to zero', why: 'Very unlikely; the risk is inflation.' },
          { text: 'None', why: 'Inflation can still eat its value.' },
          { text: 'Inflation risk' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of an offer you\'ve seen that promised high returns. Where was the hidden risk?',
    starters: ['The offer was...', 'The hidden risk was...'],
  },
  deepen: {
    title: 'Deposit insurance',
    summary: 'Many countries insure bank deposits up to a limit if a bank fails. In India, DICGC insures deposits up to ₹5 lakh per depositor per bank. Check the rules where you live, and remember the limit.',
  },
  notes: '1.03^12 ≈ 1.426 (≈42.6%). DICGC limit ₹5 lakh per depositor per bank since 2020 (regulator, not a product). Ponzi framing standard.',
};

export default lesson;
