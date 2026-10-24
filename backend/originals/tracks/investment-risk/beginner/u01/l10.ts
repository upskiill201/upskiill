import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: what risk means. Cliffhanger: the WhatsApp screenshots. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Joel\'s bonus',
  summary: 'Joel\'s share of the contract was ₹3 lakh, and his neighbour has a scheme. Use everything from Chapter 1 to help him. Then the WhatsApp group sends Arjun a stream of screenshots: people "earning" every month.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Explain risk to someone else', 'Score an idea on the three questions'],
  learn: [
    {
      kind: 'story',
      title: 'The screenshots',
      beats: [
        { speaker: 'joel', text: 'My neighbour\'s scheme pays 3% a month. He\'s been paid every month for a year. Should I put my ₹3 lakh in?' },
        { speaker: 'arjun', text: 'Same group that added me? Let\'s use the sticky note.' },
        { speaker: 'narrator', text: 'That night, the group posts twenty screenshots. Payouts. Smiling faces. "Only 5 slots left this month!"' },
        { speaker: 'arjun', text: 'They\'re very good at showing me the money. They never show me where it comes from.' },
        { speaker: 'tey', text: 'That\'s Chapter 1: pausing, the risk ladder, volatility, the three questions, and why there\'s no free return. Next: the kinds of risk, including the ones nobody mentions. First, Joel.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: Joel, 26, Kochi. ₹3,00,000 from the contract. ₹40,000 savings. Monthly costs ₹30,000. Offer: his neighbour\'s scheme, "3% a month guaranteed", 1-year lock-in.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s Joel\'s best first step?',
        options: [
          { text: 'Put it all in before the slots run out', why: 'That\'s urgency doing the deciding.' },
          { text: 'Pause, park the money safely, and ask the three questions' },
          { text: 'Put in half', why: 'Half of a possible scam is still a possible loss.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Red flag, or normal?',
        groups: ['Red flag', 'Normal'],
        items: [
          { text: '"Guaranteed 3% a month"', group: 0 },
          { text: 'Returns that vary year to year', group: 1 },
          { text: '"Only 5 slots left"', group: 0 },
          { text: 'A clear explanation of fees', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'If the scheme collapses and takes all ₹3,00,000, how many rupees of it does Joel have left?',
        answers: ['0', 'zero', '₹0', 'none'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'But he\'s been paid every month for a year!',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Schemes that pay old members with new members\' money pay perfectly, right up until they stop. Ask where the 3% comes from.' },
          { text: 'Then it\'s safe.', why: 'Steady early payouts are how Ponzi schemes recruit.' },
          { text: 'He\'s lying.', why: 'He may be paid; the source is the question.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Score the scheme on the three questions.',
        pairs: [
          ['How far could it fall?', '"Can\'t", which is a red flag'],
          ['Could it go to zero?', 'Unknown'],
          ['How fast can he get out?', 'Locked for a year'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'What Arjun noticed.',
        template: 'They show you the [[1]], never where it comes [[2]].',
        blanks: [['money', 'payouts'], ['from']],
        distractors: ['risk', 'back'],
      },
      {
        kind: 'findBug',
        prompt: 'Joel\'s draft plan. Which line is the trap?',
        lines: [
          'Keep ₹40,000 savings for emergencies.',
          'Park the ₹3 lakh safely while I learn.',
          'Join this month so I don\'t lose my slot.',
        ],
        bug: 2,
        fix: 'No deadline should rush me.',
        explanation: '"Limited slots" is pressure, not opportunity.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Joel\'s savings are ₹40,000; costs are ₹30,000 a month. How many months do they cover? (Round to one decimal.)',
        answers: ['1.3', '1.33', '1.3 months'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'For Joel, which risk matters before any investing?',
        options: [
          { text: 'Missing the scheme', why: 'That\'s FOMO talking.' },
          { text: 'Not having enough safe money for emergencies' },
          { text: 'Inflation on ₹40,000 this month', why: 'Emergencies matter more right now.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Joel\'s plan.',
        lines: ['Pause', 'Park the money safely', 'Ask the three questions', 'Ask where the returns come from', 'Decide after learning'],
      },
      {
        kind: 'mcq',
        prompt: 'What does "Only 5 slots left" try to do?',
        options: [
          { text: 'Help you plan', why: 'It\'s pressure.' },
          { text: 'Show it\'s popular, so it\'s safe', why: 'Popular isn\'t safe.' },
          { text: 'Create urgency so you skip your checks' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If a friend asked you about a "guaranteed" scheme, what would you say in one sentence?',
    starters: ['I\'d say...'],
  },
  notes: 'Chapter 1 challenge. Joel per CAST. 40,000/30,000 ≈ 1.33. Cliffhanger: WhatsApp screenshots → Ch2 kinds of risk (fraud risk included).',
};

export default lesson;
