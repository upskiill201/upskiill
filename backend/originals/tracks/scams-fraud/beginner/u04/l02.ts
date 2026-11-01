import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Step-by-step: how muling works, and what happens after. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What happened to Tyler',
  summary: 'Three weeks later Tyler\'s bank account is frozen, and he can\'t get his student loan paid in. Step by step, how money muling works, and what it leads to.',
  minutes: 11,
  outcomes: [
    'Explain how mule accounts are used',
    'Know the real consequences',
    'Know what to do if you\'re already involved',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The mule chain',
      steps: [
        { title: '1. A victim is scammed', body: 'Someone like Maureen or Rohan sends money to what they think is a real account.' },
        { title: '2. The money lands in a mule account', body: 'Tyler\'s account. Criminals use real people\'s accounts so the money looks ordinary and is harder to trace.' },
        { title: '3. It\'s moved on fast', body: 'Tyler sends most of it on, often to several accounts or into crypto. He keeps a cut.' },
        { title: '4. The victim reports it', body: 'Their bank traces the payment, and the first account it lands in is Tyler\'s.' },
        { title: '5. Tyler\'s bank acts', body: 'Account frozen, then closed. A record can be added to a fraud prevention database for years, making it hard to open accounts, get phone contracts or borrow.' },
        { title: '6. Possible prosecution', body: 'Money laundering is a serious crime. "I didn\'t know" may not protect you, especially if the signs were obvious.' },
        { title: 'If you\'re already involved', body: 'Stop immediately. Don\'t move any more money. Tell your bank and the police. Being honest and early is the best thing you can do.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Mule money comes from victims, and the trail leads straight to the mule. Consequences can last years. If you\'re involved, stop and tell your bank and the police.',
    },
  ],
  apply: {
    scenario: 'The mule chain.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the chain.',
        lines: ['A victim is scammed', 'Money lands in the mule account', 'It\'s moved on fast', 'The victim reports it', 'The mule\'s bank acts'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do criminals use real people\'s accounts?',
        options: [
          { text: 'To help the account holders', why: 'To hide themselves.' },
          { text: 'So money looks ordinary and is harder to trace to them' },
          { text: 'Because it\'s legal', why: 'It isn\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'What can happen to a mule?',
        groups: ['Can happen', 'Won\'t happen'],
        items: [
          { text: 'Account closed', group: 0 },
          { text: 'Hard to get a phone contract later', group: 0 },
          { text: 'The criminals take the blame', group: 1 },
          { text: 'Prosecution for money laundering', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Tyler\'s panicking. He still has £600 of their money. What should he do?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Don\'t move it. Tell his bank and the police today, honestly. That\'s his best chance.' },
          { text: 'Send it on quickly so they leave him alone.', why: 'That\'s more laundering.' },
          { text: 'Spend it.', why: 'It\'s a victim\'s money.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'If you\'re involved.',
        template: 'Stop [[1]]. Don\'t move any more money. Tell your [[2]] and the police.',
        blanks: [['immediately'], ['bank']],
        distractors: ['later', 'friends'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to who it hurts.',
        pairs: [
          ['The scam', 'The victim'],
          ['The frozen account', 'The mule'],
          ['The laundering', 'Everyone, by helping crime'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief about muling is wrong?',
        lines: [
          'The money is usually from scam victims.',
          'Records can last for years.',
          'If I didn\'t know, nothing can happen to me.',
        ],
        bug: 2,
        fix: '"I didn\'t know" may not protect you.',
        explanation: 'Especially when the signs were obvious.',
      },
      {
        kind: 'mcq',
        prompt: 'Whose account does the victim\'s bank trace first?',
        options: [
          { text: 'The criminal boss\'s', why: 'Usually hidden behind mules.' },
          { text: 'The mule\'s' },
          { text: 'Nobody\'s', why: 'The mule account is first.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tyler still has how many pounds of "their" money?',
        answers: ['600', '£600'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best thing someone already involved can do?',
        options: [
          { text: 'Keep going to avoid trouble', why: 'It gets worse.' },
          { text: 'Close the account and hide', why: 'Honesty and reporting help most.' },
          { text: 'Stop and be honest with their bank and the police, early' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If a friend told you they\'d done this, what would you say to them?',
    starters: ['I\'d say...'],
  },
  deepen: {
    title: 'Fraud markers',
    summary: 'In the UK, banks can record misuse of accounts on a shared fraud prevention database. A marker can stay for years and make it difficult to open bank accounts, get credit or phone contracts.',
  },
  notes: 'Cifas markers (up to 6 years), money laundering under Proceeds of Crime Act 2002; stated generally. Tyler narrated.',
};

export default lesson;
