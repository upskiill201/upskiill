import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story with a choice: after the collapse. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The morning after',
  summary: 'Joel\'s aunt has lost ₹3 lakh. She\'s ashamed and wants to tell no one. Then a message arrives: a "recovery agent" can get her money back, for a fee. What should she do?',
  minutes: 12,
  outcomes: [
    'Know the first steps after an investment fraud',
    'Spot recovery scams that target victims',
    'Support someone who\'s been scammed without blame',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Kochi, 7 a.m.',
      beats: [
        { speaker: 'joel', text: 'My aunt hasn\'t slept. She says she\'s stupid and wants to tell nobody, not even my uncle.' },
        { speaker: 'narrator', text: 'Then, on her phone: "We are a recovery agency. We can get your ₹3 lakh back from the scheme. Fee: ₹25,000 in advance."' },
        { speaker: 'grace', text: 'That second message is often the same people, or people like them. Victims get targeted twice.' },
        { speaker: 'tey', text: 'The first hours after a fraud matter. What should Joel\'s aunt do?' },
      ],
      choice: {
        prompt: 'What should she do?',
        options: [
          { text: 'Pay the recovery agency; ₹25,000 is worth it to get ₹3 lakh back.', outcome: 'Recovery scams target people who\'ve just been defrauded. Paying an advance fee usually means losing even more. Real police and banks don\'t charge victims upfront fees.' },
          { text: 'Report it straight away to the official cyber-fraud helpline and portal, tell her bank, keep every message and payment record, and ignore any "recovery" offers.', outcome: 'Yes. In India, the national cyber-fraud helpline is 1930, and complaints can also be filed on the official cybercrime portal. Fast reporting sometimes lets accounts be frozen. And she should hear, clearly: "This was a crime done to you. You\'re not stupid."', best: true },
          { text: 'Say nothing, out of shame, and hope it goes away.', outcome: 'Silence helps the scammers: no report, no chance of frozen accounts, and other people keep joining. Shame is exactly what fraudsters count on.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'After a fraud: report fast through official channels, tell your bank, keep all evidence, and ignore "recovery" offers that want a fee. It\'s a crime done to you, not a failing of yours.',
    },
  ],
  apply: {
    scenario: 'The morning after.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the first steps after an investment fraud.',
        lines: ['Stop sending any more money', 'Report to the official cyber-fraud helpline', 'Tell the bank', 'Keep every message and receipt', 'Ignore "recovery" offers'],
      },
      {
        kind: 'mcq',
        prompt: 'What is a recovery scam?',
        options: [
          { text: 'A police service', why: 'Police don\'t charge victims upfront.' },
          { text: 'A fake offer to get lost money back for an upfront fee' },
          { text: 'A bank refund', why: 'Banks don\'t ask for advance fees to refund.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In India, what is the national cyber-fraud helpline number?',
        answers: ['1930'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'My aunt keeps saying she\'s stupid.',
        prompt: 'What could Joel say to her?',
        options: [
          { text: 'You should have known.', why: 'Blame makes people hide, which helps the scammers.' },
          { text: 'Let\'s not talk about it.', why: 'Silence helps the scammers.' },
          { text: 'You\'re not stupid. These people do this for a living, and they fooled thousands. Let\'s report it together.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps her, or helps the scammers?',
        groups: ['Helps her', 'Helps the scammers'],
        items: [
          { text: 'Reporting quickly', group: 0 },
          { text: 'Paying a recovery fee', group: 1 },
          { text: 'Keeping all evidence', group: 0 },
          { text: 'Staying silent out of shame', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s warning.',
        template: 'Victims often get [[1]] twice, by "recovery" offers wanting a [[2]].',
        blanks: [['targeted', 'scammed'], ['fee']],
        distractors: ['paid', 'refund'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to why it matters.',
        pairs: [
          ['Report fast', 'Accounts can sometimes be frozen'],
          ['Tell the bank', 'It may be able to act on transfers'],
          ['Keep evidence', 'Police need the trail'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step would make things worse?',
        lines: [
          'Call the official helpline.',
          'File a complaint on the official portal.',
          'Send the recovery agency her bank details so they can "trace" the money.',
        ],
        bug: 2,
        fix: 'Never give bank details to anyone who contacts you offering recovery.',
        explanation: 'That hands more access to likely scammers.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does fast reporting matter?',
        options: [
          { text: 'Money can sometimes be frozen before it\'s moved on' },
          { text: 'It doesn\'t', why: 'Speed can help freeze funds.' },
          { text: 'To get a guaranteed refund', why: 'Recovery isn\'t guaranteed; speed improves the chance.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What are fraudsters counting on when victims feel ashamed?',
        options: [
          { text: 'An apology', why: 'They count on silence.' },
          { text: 'Nothing', why: 'Shame keeps victims quiet.' },
          { text: 'Silence: no reports, no warnings to others' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If someone close to you was scammed, what would you say first?',
    starters: ['I\'d say...'],
  },
  deepen: {
    title: 'Reporting outside India',
    summary: 'Most countries have an official route: in the UK, Action Fraud (and 159 to reach your bank); in Nigeria, the EFCC; in Ghana, the Cyber Security Authority. Find yours before you need it. The Scams course goes deeper.',
  },
  notes: 'India: 1930 National Cyber Crime Helpline; cybercrime.gov.in (I4C). UK: Action Fraud, 159. Recovery-scam warnings: standard regulator guidance. Aunt narrated.',
};

export default lesson;
