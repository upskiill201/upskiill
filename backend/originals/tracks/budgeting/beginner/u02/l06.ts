import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Card deck: what instant loans really cost. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'What GH₵500 in 5 minutes really costs',
  summary: 'Kofi didn\'t tap the ad. But what if he had? Tey opens the small print and works out what "easy money" really costs, in cedis and in next month.',
  minutes: 12,
  outcomes: [
    'Work out the total cost of a short loan',
    'Turn a fee into a percentage you can compare',
    'Spot the traps: rollovers, late fees and contact access',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Let\'s read the small print of an ad like Kofi\'s. The numbers here are made up, but they\'re typical of short, fast loans in many countries.</p><p><strong>Borrow GH₵500. Repay GH₵600 in 30 days.</strong></p><p>The cost of borrowing is GH₵100. That\'s <strong>20% for one month</strong>.</p>',
    },
    {
      kind: 'text',
      html: '<p>20% sounds small next to the word "easy". But compare it fairly. If you kept borrowing like that all year, 20% a month adds up to about <strong>240% a year</strong> before any extra fees. A typical bank savings account pays a few percent a year. The loan costs many times more.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Trap 1: the rollover.</strong> On the 1st, Kofi repays GH₵600 out of GH₵1,500. Now he has GH₵900 for a month that needs about GH₵1,500. Short again by day 12, he borrows again. That loop is how small loans become long debts.</p><p><strong>Trap 2: late fees.</strong> Miss the date and extra charges are added, often daily.</p><p><strong>Trap 3: your contacts.</strong> Some apps ask for access to your contacts and photos. Some lenders have used it to message friends and family about a debt. Never give a loan app more access than it truly needs.</p>',
    },
    {
      kind: 'check',
      question: 'Borrow GH₵500, repay GH₵600. What is the cost of borrowing?',
      options: ['GH₵100', 'GH₵600', 'GH₵500'],
      answer: 0,
      explanation: 'Cost = what you repay − what you got. 600 − 500 = 100.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Before any loan: total to repay, by when, and what happens if you\'re late. If an ad won\'t show you all three clearly, walk away.',
    },
  ],
  apply: {
    scenario: 'Reading the small print.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Borrow GH₵300, repay GH₵360. What is the cost of borrowing?',
        answers: ['60', 'GH₵60', '60 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'GH₵60 on a GH₵300 loan for one month is what percent?',
        options: [
          { text: '6%', why: '60 ÷ 300 = 0.2, which is 20%.' },
          { text: '20%' },
          { text: '60%', why: '60 is the amount in cedis, not the percent.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the trap to what it does.',
        pairs: [
          ['Rollover', 'Borrow again to cover the gap'],
          ['Late fee', 'Extra charges after the due date'],
          ['Contact access', 'Debt messages to friends and family'],
          ['"No questions"', 'Hides the real cost'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi repays GH₵600 out of his GH₵1,500 on the 1st. How much is left for the month?',
        options: [
          { text: 'GH₵1,400', why: 'He repays 600, not 100.' },
          { text: 'GH₵1,100', why: '1,500 − 600 = 900.' },
          { text: 'GH₵900' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the rollover trap.',
        lines: ['Short of money', 'Take a fast loan', 'Repay it from next month\'s money', 'Short again, sooner', 'Borrow again, bigger'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Three questions before any loan.',
        template: 'Total to [[1]], by [[2]], and what happens if you\'re [[3]].',
        blanks: [['repay'], ['when'], ['late']],
        distractors: ['spend', 'happy'],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I use those apps all the time. Small fee, no wahala.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Do you know what you\'ve paid in fees this year? Let\'s add it up.' },
          { text: 'Nice, send me the link.', why: 'Kofi just did the maths. "Small fee" was 20% a month.' },
          { text: 'You\'re stupid for using them.', why: 'Insults close the conversation. Questions open it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Green light or red flag in a loan offer?',
        groups: ['Green light', 'Red flag'],
        items: [
          { text: 'Total repayment shown before you agree', group: 0 },
          { text: 'Asks for access to all your contacts', group: 1 },
          { text: 'Clear due date and late-fee rules', group: 0 },
          { text: '"Money in 5 minutes, no questions"', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is the dangerous assumption?',
        lines: [
          'The loan costs GH₵100 for a month.',
          'I\'ll repay it from next month\'s allowance.',
          'Next month I\'ll naturally spend less.',
        ],
        bug: 2,
        fix: 'Next month I\'ll have GH₵900, so I need a plan for far less than usual.',
        explanation: 'Nothing changes "naturally". Less money plus the same habits means borrowing again.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A loan costs 20% a month. Roughly what is that for 12 months, ignoring extra fees? (Write a percent.)',
        answers: ['240', '240%', '240 percent'],
        placeholder: 'A percent',
      },
    ],
  },
  reflect: {
    prompt: 'Have you, or someone you know, used fast loans? What did it really cost, in money and in stress?',
    starters: ['I know someone who...', 'It cost...'],
  },
  deepen: {
    title: 'If you already owe a fast lender',
    summary: 'You\'re not alone, and it\'s fixable. List every loan with its total, due date and fees. Pay the most expensive first, stop new borrowing, and talk to the lender early if you can\'t pay: many will set a plan. If a lender harasses you or your contacts, keep records and report it to your country\'s financial regulator or consumer body.',
  },
  notes: 'Illustrative numbers only (20% for 30 days is in the range reported for short-term digital loans in several markets, but varies widely by lender and country). Simple annualisation 20% × 12 = 240% (compounded would be higher, ~792%); kept simple and labelled "about". Contact-harvesting practices by some digital lenders have been documented by regulators (e.g. Kenya\'s data protection actions, Nigeria FCCPC actions); stated generally. No lender named (playbook §9).',
};

export default lesson;
