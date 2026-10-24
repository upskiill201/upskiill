import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Myth or Fact: young-people scam myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'What Jayden\'s friends believe',
  summary: '"Young people don\'t get scammed, we grew up online." "If it\'s on a big app it\'s safe." "Moving money for someone isn\'t a crime if you didn\'t steal it." Five beliefs from the group chat, tested.',
  minutes: 10,
  outcomes: [
    'Correct beliefs that put young people at risk',
    'Understand that moving criminal money is a crime',
    'Spot social proof tricks',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Young people rarely get scammed because they grew up online.',
          isFact: false,
          explain: 'Myth. Young adults are frequently hit by shopping, ticket, job, crypto and muling scams. Being comfortable online can mean being quicker to click.',
        },
        {
          text: 'Moving money for someone isn\'t a crime if you didn\'t steal it yourself.',
          isFact: false,
          explain: 'Myth. Letting criminal money pass through your account is money laundering, even if someone else stole it.',
        },
        {
          text: 'Screenshots of other people\'s "earnings" are easy to fake.',
          isFact: true,
          explain: 'Fact. Payout screenshots, group chats full of happy "workers" and fake reviews are standard scam props.',
        },
        {
          text: 'Selling your bank account details or card to someone "just to use for a bit" is harmless.',
          isFact: false,
          explain: 'Myth. Criminals use bought accounts to launder money. The account is in your name, so the consequences are yours.',
        },
        {
          text: 'Paying by card usually gives more protection than paying a stranger by bank transfer.',
          isFact: true,
          explain: 'Fact. Cards often offer chargebacks and, for credit cards in the UK, extra legal protection. Bank transfers to strangers are hard to get back.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'The group chat',
      beats: [
        { speaker: 'jayden', text: 'Someone asked if they could just sell their bank card for £200 instead. I said that\'s the same thing, just lazier.' },
        { speaker: 'grace', text: 'That\'s going straight in the file.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Everyone gets targeted. Moving criminal money is a crime. Screenshots are props. Never sell or lend your account. Pay by card, not transfer, with strangers.',
    },
  ],
  apply: {
    scenario: 'Group-chat myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Young people rarely get scammed', group: 0 },
          { text: 'Screenshots are easy to fake', group: 1 },
          { text: 'Moving money isn\'t a crime if you didn\'t steal it', group: 0 },
          { text: 'Cards usually give more protection', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is selling your bank card "for a bit" dangerous?',
        options: [
          { text: 'You might lose the card', why: 'The danger is crime in your name.' },
          { text: 'Criminals launder money through it, in your name' },
          { text: 'It isn\'t', why: 'It\'s muling by another route.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'My mate says we\'re digital natives, we can\'t get scammed.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'He\'s right.', why: 'Young people are frequently targeted.' },
          { text: 'Only old people get scammed.', why: 'Everyone does.' },
          { text: 'Being fast online can make you quicker to click. That\'s what scammers count on.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The law.',
        template: 'Letting criminal money pass through your account is money [[1]], even if someone [[2]] stole it.',
        blanks: [['laundering'], ['else']],
        distractors: ['saving', 'never'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"We grew up online"', 'Quicker to click'],
          ['"I didn\'t steal it"', 'Still laundering'],
          ['"Look at their earnings"', 'Screenshots are props'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief will get someone into trouble?',
        lines: [
          'Pay strangers by card, not transfer.',
          'Don\'t trust payout screenshots.',
          'Lending my account for a weekend is fine if I get it back.',
        ],
        bug: 2,
        fix: 'Never lend or sell your account.',
        explanation: 'Anything done through it is in your name.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Someone offered £200 for a bank card. Jayden said it\'s "the same thing" as what? (Two words.)',
        answers: ['money muling', 'muling', 'being a mule', 'a mule', 'money mule'],
        placeholder: 'Two words',
      },
      {
        kind: 'mcq',
        prompt: 'Which payment is hardest to get back from a fake seller?',
        options: [
          { text: 'A credit card payment', why: 'Usually more protected.' },
          { text: 'A bank transfer to a stranger' },
          { text: 'A protected checkout', why: 'Usually protected.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a reality check on an easy-money post.',
        lines: ['Ignore the screenshots', 'Ask: does money pass through my account?', 'If yes, it\'s muling', 'Block and report'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do scams use group chats full of "happy workers"?',
        options: [
          { text: 'To be friendly', why: 'It\'s social proof.' },
          { text: 'They\'re real', why: 'Often fake accounts.' },
          { text: 'Social proof: it feels safe if everyone else is doing it' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths have you heard young people say? How would you answer it?',
    starters: ['I\'ve heard...', 'I\'d answer...'],
  },
  deepen: {
    title: 'Account selling',
    summary: 'Fraud prevention groups in the UK have reported that some young people are offered cash to "sell" their bank account details or cards outright. It\'s treated the same way as muling.',
  },
  notes: 'Cifas reporting on account selling and young mules. Jayden per CAST.',
};

export default lesson;
