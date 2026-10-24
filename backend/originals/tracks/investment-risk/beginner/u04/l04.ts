import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Card deck: fees, the certain risk. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The risk you can actually control',
  summary: 'Arjun can\'t control markets. He can control fees. Three cards on why a percent or two a year matters enormously over twenty years.',
  minutes: 10,
  outcomes: [
    'See how fees compound over decades',
    'Compare two fee levels on the same pot',
    'Find and question fees before investing',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: fees are certain.</strong> Returns go up and down. Fees come out every year, good or bad. That makes them one of the few parts of investing you can control.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: they compound too.</strong> Arjun\'s ₹4.4 lakh, 20 years, an example 8% a year before fees:</p><ul><li>No fees: about <strong>₹20.5 lakh</strong>.</li><li>0.5% a year in fees (7.5% after): about <strong>₹18.7 lakh</strong>.</li><li>2% a year in fees (6% after): about <strong>₹14.1 lakh</strong>.</li></ul><p>The 2% option costs him about ₹4.6 lakh more than the 0.5% one: more than his whole starting pot.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: find them all.</strong> Ask for every fee: yearly management fees, entry or exit charges, advice fees, trading costs. Ask "how much in total, in rupees, each year?" High fees aren\'t always wrong, but they must earn their keep, and most don\'t over the long run.</p>',
    },
    {
      kind: 'check',
      question: 'On ₹4.4 lakh over 20 years, about how much more does the 2% fee option cost than the 0.5% option?',
      options: ['About ₹4.6 lakh', 'About ₹4,600', 'Nothing'],
      answer: 0,
      explanation: '₹18.7 lakh − ₹14.1 lakh ≈ ₹4.6 lakh.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Fees are certain and they compound. Ask for every fee in rupees per year. A small difference becomes lakhs over decades.',
    },
  ],
  apply: {
    scenario: 'Fees on ₹4.4 lakh.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each fee level to the 20-year result (example 8% before fees).',
        pairs: [
          ['No fees', 'About ₹20.5 lakh'],
          ['0.5% a year', 'About ₹18.7 lakh'],
          ['2% a year', 'About ₹14.1 lakh'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why are fees "the risk you can control"?',
        options: [
          { text: 'They\'re always zero', why: 'They\'re rarely zero.' },
          { text: 'You choose them, and they come out every year regardless of returns' },
          { text: 'Markets set them', why: 'Providers set them; you choose.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '₹18.7 lakh − ₹14.1 lakh. Difference, in lakh?',
        answers: ['4.6', '4.6 lakh', '460000', '4,60,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'A fee, or not a fee?',
        groups: ['A fee', 'Not a fee'],
        items: [
          { text: 'Yearly management charge', group: 0 },
          { text: 'Exit charge', group: 0 },
          { text: 'A market fall', group: 1 },
          { text: 'Advice fee', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: '2% sounds tiny.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'It is tiny.', why: 'Over decades it\'s huge.' },
          { text: 'Fees don\'t compound.', why: 'They compound against you.' },
          { text: 'Every year for 20 years, compounding. On my pot it costs more than the pot itself.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The question to ask.',
        template: '"How much in [[1]], in [[2]], each year?"',
        blanks: [['total'], ['rupees']],
        distractors: ['percent', 'theory'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step lets fees hide?',
        lines: [
          'Ask for the yearly management fee.',
          'Ask about entry and exit charges.',
          'Accept "the fees are small" without numbers.',
        ],
        bug: 2,
        fix: 'Ask for every fee in rupees per year.',
        explanation: '"Small" isn\'t a number.',
      },
      {
        kind: 'mcq',
        prompt: 'Can high fees ever be worth it?',
        options: [
          { text: 'Always', why: 'Most high-fee options don\'t beat low-fee ones over time.' },
          { text: 'Sometimes, but they must earn their keep, and most don\'t over the long run' },
          { text: 'Never, under any circumstances', why: 'Some advice is worth paying for.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Arjun\'s fee check.',
        lines: ['List every fee', 'Convert to rupees per year', 'Compare options side by side', 'Choose the one that earns its fees'],
      },
      {
        kind: 'typeAnswer',
        prompt: '₹4,40,000 with a 2% yearly fee. Roughly how much is the first year\'s fee?',
        answers: ['8800', '8,800', '₹8,800', '₹8800'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Do you know the total yearly fees on any savings or investment you have?',
    starters: ['I know / don\'t know...', 'I could find out by...'],
  },
  deepen: {
    title: 'Expense ratio',
    summary: 'Funds usually publish a yearly "expense ratio" or total expense ratio (TER): the share of your money taken each year to run the fund. It\'s a good first number to compare, but check other charges too.',
  },
  notes: '4.4 × 1.08^20 ≈ 20.51; × 1.075^20 ≈ 18.69; × 1.06^20 ≈ 14.11. Example rates only. TER: SEBI requires disclosure (general).',
};

export default lesson;
