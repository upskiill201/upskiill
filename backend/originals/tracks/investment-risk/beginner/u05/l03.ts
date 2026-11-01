import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Reading: the trading numbers (SEBI studies). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Vikram\'s confession',
  summary: 'Vikram finally tells Arjun the truth about options. The ₹2 lakh month was real. So were the other months. Then Arjun finds the regulator\'s own numbers on people like Vikram.',
  minutes: 12,
  outcomes: [
    'Know what regulators found about individual derivatives traders',
    'See why one good month says nothing',
    'Separate trading from long-term investing',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'What the numbers say',
      html: '<p>Vikram, at last: "The ₹2 lakh month was real. But over two years I\'m down about ₹3.2 lakh. I kept trying to win it back."</p><p>Arjun looks up what India\'s market regulator, SEBI, found when it studied individual traders in futures and options (F&amp;O), the kind of trading Vikram does:</p><ul><li>In a study of the 2021–22 financial year, SEBI found that about <strong>89%</strong> of individual F&amp;O traders lost money.</li><li>In a later study covering 2021–22 to 2023–24, SEBI found that about <strong>93%</strong> of over a crore individual traders lost money, with combined losses of more than ₹1.8 lakh crore over the three years.</li></ul><p><strong>What that means:</strong> trading derivatives, especially with leverage, is not like long-term investing. In long-term investing, a spread of businesses can grow over time. In short-term derivatives trading, for every winner there\'s a loser, and costs and taxes come out of everyone. Most individuals end up on the losing side.</p><p><strong>Why people stay in:</strong> one good month is vivid and shareable. The losing months are quiet. And trying to "win it back" makes losses bigger.</p><p>This isn\'t a judgement of Vikram. It\'s why "my cousin made ₹2 lakh last month" was never evidence.</p>',
    },
    {
      kind: 'check',
      question: 'Roughly what share of individual F&O traders did SEBI find lost money over 2021–22 to 2023–24?',
      options: ['About 50%', 'About 93%', 'About 10%'],
      answer: 1,
      explanation: 'SEBI\'s 2024 study found about 93% lost money over the three years.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The regulator\'s own studies found around 9 in 10 individual derivatives traders lost money. One good month is a story, not a track record.',
    },
  ],
  apply: {
    scenario: 'The trading numbers.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did SEBI\'s study of 2021–22 find?',
        options: [
          { text: 'Most traders made money', why: 'Most lost.' },
          { text: 'Nothing about losses', why: 'It measured losses.' },
          { text: 'About 89% of individual F&O traders lost money' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Vikram made ₹2 lakh in one month but is down ₹3.2 lakh overall. How much did he lose in the other months combined, in lakh?',
        answers: ['5.2', '5.2 lakh', '520000', '5,20,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Long-term investing, or short-term trading?',
        groups: ['Long-term investing', 'Short-term trading'],
        items: [
          { text: 'A spread of businesses held for decades', group: 0 },
          { text: 'Options that expire this week', group: 1 },
          { text: 'Monthly amounts into a broad fund', group: 0 },
          { text: 'Leveraged bets to "win it back"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Vikram feels terrible.',
        prompt: 'What does Grace suggest?',
        options: [
          { text: 'Tell him he\'s in very large company, and that stopping now is a win. Then help him make a calm plan.' },
          { text: 'Tell him he deserves it.', why: 'Unkind and unhelpful.' },
          { text: 'Tell him to trade more to win it back.', why: 'That\'s how losses grow.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The key idea.',
        template: 'One good [[1]] is a story, not a track [[2]].',
        blanks: [['month'], ['record']],
        distractors: ['year', 'secret'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each statement to its meaning.',
        pairs: [
          ['"For every winner there\'s a loser"', 'Derivatives trading is zero-sum before costs'],
          ['"Costs come out of everyone"', 'After costs, most lose'],
          ['"Win it back"', 'How losses grow'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion is wrong?',
        lines: [
          'About 9 in 10 individual F&O traders lost money.',
          'One good month is easy to share.',
          'So if I\'m careful, I\'ll be in the winning 10%.',
        ],
        bug: 2,
        fix: 'Almost everyone thinks they\'ll be in the 10%.',
        explanation: 'Overconfidence is exactly why the numbers look like this.',
      },
      {
        kind: 'mcq',
        prompt: 'How is long-term investing different from derivatives trading?',
        options: [
          { text: 'They\'re the same', why: 'Very different.' },
          { text: 'Trading is safer', why: 'The studies suggest otherwise.' },
          { text: 'A spread of businesses can grow over time; short-term trading is mostly winners and losers swapping money' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If 93 in 100 traders lose money, how many in 100 don\'t?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did the ₹2 lakh month make Vikram keep trading?',
        options: [
          { text: 'It proved he was skilled', why: 'One month proves nothing.' },
          { text: 'Good months are vivid; losing months are quiet' },
          { text: 'He was forced to', why: 'The memory of the win kept him in.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Have you seen someone share a big win online? What didn\'t they share?',
    starters: ['They shared...', 'They probably didn\'t share...'],
  },
  deepen: {
    title: 'Read the regulator, not the reel',
    summary: 'Regulators publish studies, warnings and investor education material, free. Before following a trading influencer, read what the regulator says about the same activity.',
  },
  notes: 'SEBI study (Jan 2023): 89% of individual F&O traders lost money in FY22, average loss ~₹1.1 lakh. SEBI study (Sept 2024): 93% of 1.13 crore individual traders lost money FY22–FY24; aggregate losses > ₹1.8 lakh crore. Vikram narrated; 2 + 5.2 loss... (2 − 5.2 = −3.2).',
};

export default lesson;
