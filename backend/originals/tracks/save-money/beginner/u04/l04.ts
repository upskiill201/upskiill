import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Before/After: borrowing in an emergency. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'If you have to borrow',
  summary: 'Kofi had a fund. His hallmate Kwame didn\'t, and got the same fever the same week. Two ways Kwame could have found GH₵280: a 5-minute loan, or a calmer route. Side by side.',
  minutes: 11,
  outcomes: [
    'Compare ways to borrow in an emergency',
    'Ask for help from family or school the right way',
    'Know the questions to ask before any loan',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Kwame\'s GH₵280',
      before: {
        label: 'The 5-minute loan',
        text: 'Taps the ad at 7 a.m. from the clinic queue\nGets GH₵300 in minutes\nRepays GH₵360 in 30 days\nGives the app access to his contacts\nMisses the date by a week: late fees, and messages to his contacts',
      },
      after: {
        label: 'The calmer route',
        text: 'Asks the clinic if the bill can be paid in two parts: yes\nCalls his older sister: GH₵200, to repay GH₵50 a month, no fee\nAsks the school\'s student support office: a small hardship grant for medical costs\nWrites down who he owes and when\nStarts a GH₵20-a-week emergency fund once he\'s well',
      },
      notes: [
        'Many clinics, landlords and schools will agree a payment plan if you ask early and honestly.',
        'Family or trusted friends can be the cheapest lenders. Agree the amount and repayment dates clearly, and stick to them.',
        'Schools and workplaces sometimes have hardship funds. Few people ask.',
        'If a loan is the only option, ask: total to repay, by when, what if I\'m late, and what access the app wants.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'In an emergency without a fund: ask the person you owe for time, ask family, ask your school or work. A fast loan is the last option, not the first.',
    },
  ],
  apply: {
    scenario: 'Kwame\'s choices.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Borrow GH₵300, repay GH₵360. What\'s the cost?',
        answers: ['60', 'GH₵60', '60 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the calmer route.',
        lines: ['Ask the clinic about paying in parts', 'Ask family for a clear, fee-free loan', 'Ask the school\'s support office', 'Write down who you owe and when', 'Start an emergency fund once well'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Calmer route or riskier route?',
        groups: ['Calmer', 'Riskier'],
        items: [
          { text: 'Asking the clinic for a payment plan', group: 0 },
          { text: 'Giving an app access to all your contacts', group: 1 },
          { text: 'A family loan with clear dates', group: 0 },
          { text: 'Tapping an ad from the clinic queue', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Kwame says asking his sister is embarrassing. The app is easier.',
        prompt: 'Efua\'s best reply?',
        options: [
          { text: 'He\'s right, family is complicated.', why: 'Sometimes. But a clear, honest ask usually goes better than people fear.' },
          { text: 'Easier for five minutes. Then GH₵60 in fees and messages to his contacts if he\'s late. His sister would rather be asked.' },
          { text: 'He should just suffer.', why: 'He needs treatment. There are better ways to pay.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Before any loan, ask...',
        template: 'Total to [[1]], by [[2]], what if I\'m [[3]], and what [[4]] does it want?',
        blanks: [['repay'], ['when'], ['late'], ['access']],
        distractors: ['spend', 'early'],
      },
      {
        kind: 'mcq',
        prompt: 'Why write down who you owe and when?',
        options: [
          { text: 'So nothing is forgotten, and trust is kept' },
          { text: 'To show off', why: 'It\'s about keeping promises.' },
          { text: 'Lenders require it', why: 'It\'s for you.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the option to its main advantage.',
        pairs: [
          ['Payment plan with the clinic', 'No new debt elsewhere'],
          ['Family loan', 'Usually no fees'],
          ['School hardship fund', 'May not need repaying'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Kwame\'s family loan could damage the relationship?',
        lines: [
          'GH₵200 from his sister.',
          'Repay GH₵50 a month.',
          'No dates agreed: "I\'ll pay when I can."',
        ],
        bug: 2,
        fix: 'Repay GH₵50 on the 5th of each month for 4 months.',
        explanation: 'Vague family loans cause most of the hurt. Clear dates protect both of you.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the lesson for Kwame after he recovers?',
        options: [
          { text: 'Never get ill', why: 'Not in anyone\'s control.' },
          { text: 'Start a small emergency fund, even GH₵20 a week' },
          { text: 'Keep the loan app for next time', why: 'Better to need it never.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kwame saves GH₵20 a week. How long to reach GH₵300? (Weeks.)',
        answers: ['15', 'fifteen', '15 weeks'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'If you had an emergency and no fund, who could you ask first? What would you say?',
    starters: ['I\'d ask...', 'I\'d say...'],
  },
  deepen: {
    title: 'Hardship funds exist',
    summary: 'Many universities, colleges and employers have small hardship or emergency grants for medical bills, travel for family emergencies or lost income. They\'re often under-used. Ask your student support, welfare or HR office what\'s available, before you need it.',
  },
  notes: 'Kwame: course-only hallmate (narrated, no speaker id). Loan example same 20%/month as Budgeting Ch2 L6. Payment-plan and hardship-fund advice general; availability varies.',
};

export default lesson;
