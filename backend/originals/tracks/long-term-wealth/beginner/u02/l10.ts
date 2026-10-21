import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: pay future Emmanuel first. Cliffhanger: the shrinking naira. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: pay future Emmanuel first',
  summary: 'Emmanuel, the funniest person at Afiya, saves nothing and owes a loan app. He asks Miracle to "do the thing you did". Build his plan with everything from Chapter 2. Then Miracle reads a news headline about prices, and does a sum that worries her.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a pay-yourself-first plan for someone else', 'Use pensions, the order of saving and raises together'],
  learn: [
    {
      kind: 'story',
      title: 'The headline',
      beats: [
        { speaker: 'emmanuel', text: 'Okay. I have ₦0 saved, ₦90,000 on a loan app, and a chin chin habit. Do the thing you did.' },
        { speaker: 'miracle', text: 'First question: what does your payslip say about your pension?' },
        { speaker: 'narrator', text: 'That evening, Miracle reads a headline: prices in Nigeria rose sharply again this year.' },
        { speaker: 'narrator', text: 'She checks her long-term pot. It sits in the same basic account as her emergency fund, paying a few percent a year. Prices are rising several times faster than that.' },
        { speaker: 'miracle', text: 'So my ₦390,000 is growing... and shrinking at the same time?' },
        { speaker: 'tey', text: 'That\'s Chapter 2: check your pension, the order of saving, automatic beats by hand, a share of every raise, and the emergency fund that protects everything. But saving isn\'t the same as growing. Chapter 3: make time work for you. First, Emmanuel.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: Emmanuel, 28, take-home ₦420,000. Pension 8% + 10% (unchecked). Savings ₦0. Loan app ₦90,000 at a high rate. Must-haves ₦280,000 a month.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Emmanuel\'s plan.',
        lines: ['Check his pension statement', 'Build a small starter emergency fund', 'Clear the loan app debt', 'Build the fund to three months', 'Start long-term saving, automatically'],
      },
      {
        kind: 'mcq',
        prompt: 'Why clear the loan app before long-term saving?',
        options: [
          { text: 'Its high rate costs more than long-term saving is likely to earn' },
          { text: 'Loan apps are illegal', why: 'Many are legal; they\'re just expensive.' },
          { text: 'It doesn\'t matter', why: 'High-interest debt eats savings growth.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Emmanuel\'s must-haves are ₦280,000 a month. Three months of emergency fund?',
        answers: ['840000', '840,000', '₦840,000', '₦840000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Emmanuel\'s money: safe and reachable, or long-term?',
        groups: ['Safe and reachable', 'Long-term'],
        items: [
          { text: 'Emergency fund', group: 0 },
          { text: 'Pension', group: 1 },
          { text: 'Money for next month\'s rent', group: 0 },
          { text: 'Retirement pot', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Can\'t I just start investing now? Emergency funds are boring.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Boring is the point. Without one, your first emergency means selling investments or another loan app. Starter fund first, then the loan, then investing.' },
          { text: 'Sure, invest everything.', why: 'Out of order; one emergency would undo it.' },
          { text: 'Never invest.', why: 'He should, after the basics.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Emmanuel puts ₦45,000 a month toward the ₦90,000 loan. How many months to clear it (ignoring interest)?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Chapter 2 idea to Emmanuel\'s plan.',
        pairs: [
          ['Check your pension', 'His unchecked 8% + 10%'],
          ['Order of saving', 'Fund, debt, then long-term'],
          ['Automatic', 'Transfers on payday'],
          ['A share of every raise', 'Half of his next raise saved'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Emmanuel\'s rule.',
        template: 'Pay future [[1]] first, [[2]] on payday.',
        blanks: [['Emmanuel', 'me', 'you'], ['automatically']],
        distractors: ['Miracle', 'sometimes'],
      },
      {
        kind: 'findBug',
        prompt: 'Emmanuel\'s draft. Which line breaks the plan?',
        lines: [
          'Check pension statement this week.',
          'Starter emergency fund: ₦100,000.',
          'Take another loan to start investing faster.',
          'Automatic transfer on payday.',
        ],
        bug: 2,
        fix: 'Clear the existing loan; never borrow to invest.',
        explanation: 'Borrowing at high rates to invest is a fast way to lose money.',
      },
      {
        kind: 'mcq',
        prompt: 'Emmanuel gets a ₦60,000 raise next year. What should he decide now?',
        options: [
          { text: 'That half, ₦30,000, goes to long-term saving the week it lands' },
          { text: 'Nothing; see how he feels', why: 'That\'s how raises disappear.' },
          { text: 'Spend it all on chin chin', why: 'Tempting. No.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Miracle\'s long-term pot earns a few percent while prices rise much faster. What\'s happening to its buying power?',
        options: [
          { text: 'It\'s shrinking, even though the number grows' },
          { text: 'It\'s growing fast', why: 'The number grows; what it buys shrinks.' },
          { text: 'Nothing changes', why: 'Inflation changes what money buys.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fine to keep in a basic savings account, or needs a long-term plan?',
        groups: ['Fine in basic savings', 'Needs a long-term plan'],
        items: [
          { text: 'Emergency fund', group: 0 },
          { text: 'Money for retirement in 35 years', group: 1 },
          { text: 'Next month\'s bills', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where are your long-term savings kept right now? Are they growing faster or slower than prices?',
    starters: ['My long-term savings are in...', 'They\'re probably growing...'],
  },
  notes: 'Chapter 2 challenge. Emmanuel per CAST (Afiya; chin chin). Numbers fictional. Inflation in Nigeria high in recent years; stated qualitatively ("several times faster" than basic savings rates). Cliffhanger into Ch3 (compounding, inflation, real returns).',
};

export default lesson;
