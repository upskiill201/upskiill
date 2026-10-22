import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Chat with Tey: invoice fraud at Kinwell. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The supplier\'s new bank details',
  summary: 'Callum forwards Grace an email from Kinwell\'s design agency: "We\'ve changed banks. Please pay this month\'s £14,800 invoice to our new account." It looks exactly like their usual emails. Tey explains invoice fraud.',
  minutes: 12,
  outcomes: [
    'Explain invoice and business email fraud',
    'Verify changed bank details safely',
    'Spot "CEO" urgent-payment requests',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'This is called invoice or mandate fraud. Criminals pretend to be a supplier and ask for payments to go to a new account. Sometimes they\'ve hacked the supplier\'s real email, so it really does come from their address.', replies: ['So how do we know?'] },
        { tey: 'Never trust changed bank details from an email alone, even a genuine-looking one. Phone the supplier on a number you already have, from your own records or contract, not from the email. Ask them to confirm the change.', replies: ['What else is suspicious here?'] },
        { tey: 'Timing and pressure. "Pay today to avoid late fees." A slightly different email address, like one letter changed. Or a reply-to address that\'s different from the sender.', replies: ['What about emails from our CEO?'] },
        { tey: 'A common version: "It\'s the CEO. I\'m in a meeting, can\'t talk. Pay this urgently and keep it confidential." Urgency, authority, secrecy. Same check: call them on their known number.', replies: ['Should Kinwell have a rule?'] },
        { tey: 'Yes. Many companies require a phone check on a known number for any bank detail change, and two people to approve large payments. It feels slow. That\'s the point.', replies: ['And at home?'] },
        { tey: 'Same idea: builders, solicitors or landlords "changing bank details" by email are a classic route to losing a house deposit. Always phone a number you already trust before paying.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Never pay new bank details from an email alone. Phone a number you already have to confirm. Two people for big payments. Same rule at home for builders and solicitors.',
    },
  ],
  apply: {
    scenario: 'The agency\'s "new account".',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the safe check.',
        lines: ['Don\'t pay yet', 'Find the supplier\'s number in your own records', 'Phone and ask about the change', 'Pay only if they confirm'],
      },
      {
        kind: 'mcq',
        prompt: 'Why isn\'t "it came from their real email address" enough?',
        options: [
          { text: 'Their email may have been hacked' },
          { text: 'It is enough', why: 'Accounts get hacked.' },
          { text: 'Emails are always fake', why: 'Most are real; changes need a phone check.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Invoice fraud sign, or normal?',
        groups: ['Fraud sign', 'Normal'],
        items: [
          { text: '"We\'ve changed banks, pay the new account"', group: 0 },
          { text: 'An invoice to the usual account', group: 1 },
          { text: 'A reply-to address that differs from the sender', group: 0 },
          { text: '"Pay today and keep it confidential"', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'Callum says phoning feels like we don\'t trust our agency.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Then just pay.', why: 'That\'s how £14,800 disappears.' },
          { text: 'Email them to check.', why: 'The email may be compromised.' },
          { text: 'It protects them too. If their email\'s been hacked, they\'ll be glad we called.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Never pay new bank details from an [[1]] alone. Phone a number you already [[2]].',
        blanks: [['email'], ['have', 'trust']],
        distractors: ['invoice', 'received'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fraud to its mask.',
        pairs: [
          ['Invoice fraud', 'A supplier'],
          ['CEO fraud', 'The boss'],
          ['House deposit fraud', 'A solicitor'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which check doesn\'t really check?',
        lines: [
          'Call the number in our contract.',
          'Ask a second person to approve.',
          'Reply to the email asking "is this really you?"',
        ],
        bug: 2,
        fix: 'Use a channel the criminal can\'t control.',
        explanation: 'If the email is hacked, the reply goes to the criminal.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much was the agency\'s invoice, in pounds?',
        answers: ['14800', '14,800', '£14,800', '£14800'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why have two people approve large payments?',
        options: [
          { text: 'To slow work down for no reason', why: 'The slowness protects.' },
          { text: 'One person under pressure is easier to trick than two' },
          { text: 'It\'s the law for everyone', why: 'It\'s a good practice.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'When Grace phones the agency, what do they say?',
        options: [
          { text: 'They haven\'t changed banks, and their email was hacked last week' },
          { text: 'Yes, pay the new account', why: 'It was fraud.' },
          { text: 'They don\'t answer', why: 'They confirmed it was fraud.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Does your workplace, or your household, have a rule for changed bank details?',
    starters: ['We do / don\'t...', 'A rule could be...'],
  },
  deepen: {
    title: 'Confirmation of Payee',
    summary: 'UK banks run a "Confirmation of Payee" check that tells you whether the account name matches the name you entered. A mismatch warning is a reason to stop and phone. It doesn\'t catch everything, especially if the criminal opens an account in a similar name.',
  },
  notes: 'Invoice/mandate fraud and CEO fraud: UK Finance categories. Confirmation of Payee: UK banking service. Callum narrated; Priya per CAST. The L10 story resolves that the agency\'s email was hacked.',
};

export default lesson;
