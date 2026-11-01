import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Before/After: Femi's aunt and the "wrong transfer". */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The "wrong transfer"',
  summary: 'Femi\'s aunt in Lagos gets a text: "₦85,000 credited", then a call from a stranger: "I sent it to you by mistake, please send it back." She does. There was never any money. Before and after: what happened, and what she\'ll do next time.',
  minutes: 11,
  outcomes: [
    'Recognise fake-credit and "reversal" scams',
    'Check your real balance before acting',
    'Know that this scam works in any country',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Aunty Bimpe: last time and next time',
      before: {
        label: 'What happened',
        text: 'SMS: "Credit alert: ₦85,000 from O. ADEYEMI"\nA call minutes later: a polite, panicked man, "Ma, I sent school fees to your number by mistake!"\nShe felt sorry for him and sent ₦85,000 back\nThe SMS was fake, sent from an ordinary number\nHer real balance never went up\nLoss: ₦85,000',
      },
      after: {
        label: 'What she\'ll do next time',
        text: 'Ignore the SMS; open her banking app or dial her bank\'s official code to check the real balance\nIf no money arrived: it\'s a scam, block the number\nIf money really arrived: don\'t send it back herself\nTell her bank and let the bank reverse it through official channels\nNever send "refunds" to a caller\nTell her friends at church',
      },
      notes: [
        'Fake credit alerts are easy to make. Only your real balance, checked yourself, counts.',
        'Even if money really did arrive, the safe route is your bank, not the caller. Some scammers send real stolen money and then ask you to "return" it to a different account, making you a mule.',
        'The same trick appears with mobile money, bank transfers and payment apps everywhere.',
        'The emotion here is kindness: wanting to help someone who made a mistake.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Never trust a credit alert or a caller. Check your real balance yourself. If money genuinely arrived by mistake, let your bank handle returning it.',
    },
  ],
  apply: {
    scenario: 'The "wrong transfer".',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was wrong with the credit alert?',
        options: [
          { text: 'The amount was wrong', why: 'There was no money at all.' },
          { text: 'It was a fake SMS; no money ever arrived' },
          { text: 'Nothing', why: 'It was fake.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Last time or next time?',
        groups: ['Last time', 'Next time'],
        items: [
          { text: 'Trusted the SMS', group: 0 },
          { text: 'Checks the real balance in her app', group: 1 },
          { text: 'Sent money back to the caller', group: 0 },
          { text: 'Lets her bank handle any real mistake', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'My aunt feels so stupid. She was just being kind.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'She should have known.', why: 'Blame keeps victims silent.' },
          { text: 'Kindness is the problem.', why: 'The scammer is the problem.' },
          { text: 'She was being kind, and they used that. It\'s their crime, not her failing. Her warning will save her friends.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Only your real [[1]], checked [[2]], counts.',
        blanks: [['balance'], ['yourself']],
        distractors: ['alert', 'later'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step of the scam to its trick.',
        pairs: [
          ['Fake credit SMS', 'Creates a false belief'],
          ['Panicked caller', 'Uses kindness and urgency'],
          ['"Send it back"', 'Takes real money'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'If money really does arrive by mistake, which step is risky?',
        lines: [
          'Check the real balance.',
          'Tell the bank.',
          'Send it back to the account the caller gives.',
        ],
        bug: 2,
        fix: 'Let the bank reverse it officially.',
        explanation: 'The caller\'s account could be part of a laundering chain.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many naira did Aunty Bimpe lose?',
        answers: ['85000', '85,000', '₦85,000', '₦85000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why might a scammer send real money and then ask for it back to a different account?',
        options: [
          { text: 'To be honest', why: 'It\'s laundering.' },
          { text: 'To use you as a mule, moving stolen money' },
          { text: 'By accident', why: 'It\'s deliberate.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Aunty Bimpe\'s new routine.',
        lines: ['Ignore the SMS', 'Check the real balance herself', 'If no money: block the number', 'If real money: tell the bank'],
      },
      {
        kind: 'mcq',
        prompt: 'Which emotion did this scam mainly use?',
        options: [
          { text: 'Greed', why: 'She wanted to help.' },
          { text: 'Boredom', why: 'Kindness.' },
          { text: 'Kindness' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Is there someone in your family, here or abroad, who should hear about the "wrong transfer" trick?',
    starters: ['I\'ll tell...'],
  },
  deepen: {
    title: 'Fake alerts everywhere',
    summary: 'Fake credit alert scams are widely reported in Nigeria, Ghana, Kenya and elsewhere with mobile money and bank SMS alerts. Banks and mobile money providers regularly warn customers to confirm balances in the app or with official codes.',
  },
  notes: 'Fake credit alert / reversal scams: widely reported (e.g. Nigerian and Ghanaian banks\' customer warnings). Aunty Bimpe narrated (Femi\'s aunt). No banks or providers named.',
};

export default lesson;
