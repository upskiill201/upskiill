import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: time and goals. Cliffhanger: Vikram's one stock. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Joel\'s three goals',
  summary: 'Joel has a wedding in 18 months, a plan to help his parents rebuild their house in about 8 years, and retirement one day. Use everything from Chapter 3 to sort his pots. Then Vikram sends a screenshot: his whole long-term savings in one tech stock, up 60% this year.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build pots and dates for someone else', 'Choose risk from each date'],
  learn: [
    {
      kind: 'story',
      title: 'The screenshot',
      beats: [
        { speaker: 'joel', text: 'Wedding in 18 months. My parents\' house in Kochi in about 8 years. And retirement, someday. I have ₹3 lakh.' },
        { speaker: 'arjun', text: 'Goal, date, amount, risk. Let\'s fill the table.' },
        { speaker: 'narrator', text: 'Later, Vikram: a screenshot of one stock, a tech company, up 60%. "All my long-term money. You\'re still in savings?"' },
        { speaker: 'arjun', text: 'My long-term pot can take risk. But all of it in one company? There must be a better way to spread it.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: pots by date, goals tables, tolerance and capacity, the emergency fund, deadlines and gliding toward safety. Next: how to spread risk, and why one hot stock is a bet. First, Joel.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: Joel, 26. ₹3,00,000 from the contract plus ₹40,000 savings. Costs ₹30,000 a month. Contract work is steady for now. Goals: wedding in 18 months (₹1,50,000), parents\' house in about 8 years, retirement.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Joel\'s total money: ₹3,00,000 + ₹40,000?',
        answers: ['340000', '3,40,000', '340,000', '₹3,40,000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A four-month emergency fund at ₹30,000 a month. How much?',
        answers: ['120000', '1,20,000', '120,000', '₹1,20,000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each of Joel\'s pots to its risk.',
        pairs: [
          ['Emergency fund', 'Safe and reachable'],
          ['Wedding in 18 months', 'Safe'],
          ['Parents\' house in 8 years', 'Some growth, getting safer'],
          ['Retirement', 'Can take more ups and downs'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'After the emergency fund (₹1,20,000) and wedding (₹1,50,000), how much is left for the longer pots?',
        options: [
          { text: '₹1,90,000', why: '3,40,000 − 1,20,000 − 1,50,000 = 70,000.' },
          { text: '₹70,000' },
          { text: '₹3,40,000', why: 'Subtract the first two pots.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe from the start, or glide toward safety?',
        groups: ['Safe from the start', 'Glide toward safety'],
        items: [
          { text: 'Wedding in 18 months', group: 0 },
          { text: 'Parents\' house in 8 years', group: 1 },
          { text: 'Emergency fund', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Could I put the wedding money in shares for a year and move it out after?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'A fall in the next year could leave you short right before the wedding. 18 months is too short.' },
          { text: 'Sure, one year is fine.', why: 'Too little time to recover.' },
          { text: 'Put it in Vikram\'s stock.', why: 'One stock, short deadline: double risk.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Joel\'s risk level.',
        template: 'Joel\'s tolerance is [[1]], so even with steady work he should use the [[2]] of tolerance and capacity.',
        blanks: [['low'], ['lower']],
        distractors: ['high', 'higher'],
      },
      {
        kind: 'findBug',
        prompt: 'Joel\'s draft table. Which row is wrong?',
        lines: [
          'Emergency fund: ₹1,20,000, safe.',
          'Wedding: ₹1,50,000, safe.',
          'Parents\' house: 8 years, all safe forever, never growing.',
        ],
        bug: 2,
        fix: 'Parents\' house: some growth now, getting safer as the date nears.',
        explanation: 'Eight years allows some growth, then a glide to safety.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Joel\'s steps.',
        lines: ['Build the emergency fund', 'Set aside the wedding money', 'Plan the 8-year pot\'s glide', 'Start the retirement pot'],
      },
      {
        kind: 'mcq',
        prompt: 'Vikram has all his long-term money in one stock. Which kind of risk is that?',
        options: [
          { text: 'Liquidity risk', why: 'Shares can usually be sold; the issue is one basket.' },
          { text: 'Concentration risk' },
          { text: 'No risk, it\'s up 60%', why: 'Up this year says nothing about next.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What question does Chapter 3 leave Arjun with?',
        options: [
          { text: 'Which stock went up most?', why: 'He wants to spread, not chase.' },
          { text: 'Should I spend the long-term pot?', why: 'He wants to invest it sensibly.' },
          { text: 'How do I spread the risk in my long-term pot?' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of your own goals is closest? Is its money safe enough for that date?',
    starters: ['My closest goal is...', 'Its money is...'],
  },
  notes: 'Chapter 3 challenge. Joel per CAST. 3,40,000 − 1,20,000 − 1,50,000 = 70,000. Cliffhanger: Vikram\'s one stock up 60% → Ch4 diversification.',
};

export default lesson;
