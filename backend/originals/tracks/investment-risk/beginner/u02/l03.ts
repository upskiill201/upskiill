import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Reading: inflation risk and the risk of doing nothing. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The risk of doing nothing',
  summary: 'After the plot, the screenshots and the crypto, Arjun is tempted to leave the whole ₹12 lakh in his savings account forever. It feels like the safe choice. Here\'s the risk that choice carries.',
  minutes: 12,
  outcomes: [
    'Explain inflation risk',
    'Estimate how much buying power cash can lose over years',
    'See "doing nothing" as a decision with its own risk',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Doing nothing is a decision',
      html: '<p>After a week of loud ideas, Arjun says to Grace: "Maybe I just leave it in savings. Nothing can go wrong."</p><p>Grace: "Something can. It just goes wrong slowly."</p><p><strong>Inflation risk</strong> is the risk that your money grows slower than prices, so it buys less every year. It\'s quiet: the number on screen goes up while what it buys goes down.</p><p><strong>Arjun\'s example (illustrative numbers):</strong> his savings account pays about 3% a year. Suppose prices rise about 6% a year.</p><ul><li>After 1 year: ₹12 lakh grows to about ₹12.36 lakh, but buys what about ₹11.66 lakh bought a year earlier.</li><li>After 10 years: the account shows about ₹16.1 lakh, but in today\'s prices it buys what about <strong>₹9 lakh</strong> buys now.</li></ul><p>He\'d have lost about a quarter of his buying power, without a single scary day.</p><p><strong>This doesn\'t mean cash is bad.</strong> Cash is exactly right for an emergency fund and money you\'ll need soon. The risk is keeping <em>long-term</em> money in cash for decades.</p><p><strong>Every choice has a risk.</strong> Investing has market risk. Not investing has inflation risk. The aim isn\'t zero risk, which doesn\'t exist. It\'s choosing the right risk for each pot of money.</p>',
    },
    {
      kind: 'check',
      question: 'Cash earns 3%; prices rise 6%. What happens to buying power over time?',
      options: ['It grows', 'It shrinks', 'It stays the same'],
      answer: 1,
      explanation: 'Real return is roughly 3 − 6 = −3% a year.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Doing nothing has a risk: inflation. Cash is right for short-term money. For long-term money, choose the risk, don\'t pretend there isn\'t one.',
    },
  ],
  apply: {
    scenario: 'Leaving it in savings.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Grace mean by "it just goes wrong slowly"?',
        options: [
          { text: 'The bank will slowly fail', why: 'It\'s about inflation.' },
          { text: 'Interest is paid slowly', why: 'It\'s about buying power.' },
          { text: 'Inflation quietly shrinks buying power over years' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Savings 3%, inflation 6%. Real return, roughly, in percent?',
        answers: ['-3', '−3', '-3%', '−3%'],
        placeholder: 'A percent',
      },
      {
        kind: 'sortGroups',
        prompt: 'Right place for cash, or a risky place for cash?',
        groups: ['Right for cash', 'Risky for cash'],
        items: [
          { text: 'Emergency fund', group: 0 },
          { text: 'Retirement money for 30 years', group: 1 },
          { text: 'Rent due next month', group: 0 },
          { text: 'Money for his kids in 20 years', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its main risk.',
        pairs: [
          ['Long-term money in cash', 'Inflation risk'],
          ['Long-term money in shares', 'Market risk'],
          ['All money in one plot', 'Concentration and liquidity risk'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'So there\'s no safe option at all?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'There\'s no risk-free option. There\'s the right risk for each pot of money. That\'s what you\'re working out.' },
          { text: 'No, so just gamble.', why: 'Choosing risk isn\'t gambling.' },
          { text: 'Cash is perfectly safe.', why: 'Not for decades.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The idea.',
        template: 'The aim isn\'t [[1]] risk. It\'s the [[2]] risk for each pot.',
        blanks: [['zero', 'no'], ['right']],
        distractors: ['most', 'loudest'],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought misunderstands inflation risk?',
        lines: [
          'My account shows ₹16 lakh after 10 years.',
          'But prices have risen a lot.',
          'So I can definitely buy more than I could with ₹12 lakh today.',
        ],
        bug: 2,
        fix: 'In today\'s prices, it buys about what ₹9 lakh buys now.',
        explanation: 'The number rose, but buying power fell.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the example, ₹12 lakh of buying power becomes about ₹9 lakh. How much buying power was lost, in lakh?',
        answers: ['3', '3 lakh', 'three', '300000', '3,00,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When is cash exactly the right choice?',
        options: [
          { text: 'For all money, forever', why: 'Long-term cash has inflation risk.' },
          { text: 'Never', why: 'Cash is right for short-term money.' },
          { text: 'For an emergency fund and money needed soon' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Why is inflation risk easy to miss?',
        options: [
          { text: 'Banks hide it', why: 'It\'s just quiet, not hidden.' },
          { text: 'The number on screen keeps going up' },
          { text: 'It doesn\'t exist in India', why: 'Inflation exists everywhere.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Is any of your long-term money sitting in cash? What risk are you choosing by leaving it there?',
    starters: ['I have...', 'The risk I\'m choosing is...'],
  },
  deepen: {
    title: 'Check real inflation',
    summary: 'In India, the official consumer price index (CPI) is published monthly. Your own inflation can differ: rent, school fees and health costs sometimes rise faster than the average.',
  },
  notes: 'Illustrative: 12 × 1.03 = 12.36; 12.36/1.06 ≈ 11.66; 12 × 1.03^10 ≈ 16.13; 16.13/1.06^10 ≈ 9.0. Rates are examples, not forecasts.',
};

export default lesson;
