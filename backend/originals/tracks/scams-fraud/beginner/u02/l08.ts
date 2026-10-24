import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Myth or Fact: investment-scam myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Investment-scam myths',
  summary: '"I\'d spot a fake website." "If it\'s on a big social platform, someone has checked it." "Crypto is protected like a bank account." Five beliefs that keep investment scams in business.',
  minutes: 10,
  outcomes: [
    'Correct beliefs that make investment scams easier',
    'Know where protection does and doesn\'t exist',
    'Treat social media money advice with care',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Fake investment websites always look cheap and badly made.',
          isFact: false,
          explain: 'Myth. Many have polished designs, live chat, apps, fake reviews and dashboards. Looks prove nothing; the register does.',
        },
        {
          text: 'If an ad appears on a big social platform, it must have been checked.',
          isFact: false,
          explain: 'Myth. Scam ads regularly get through. Platforms remove many after reports, but not before people are caught.',
        },
        {
          text: 'Most crypto investments are not covered by the same protections as regulated investments or bank deposits.',
          isFact: true,
          explain: 'Fact. If a crypto platform fails or vanishes, there\'s usually no compensation scheme to fall back on.',
        },
        {
          text: 'A friend who made money from a scheme is proof it works.',
          isFact: false,
          explain: 'Myth. Early members of Ponzi and pyramid schemes are often paid with later members\' money. Your friend\'s win may be someone else\'s loss, and yours could be next.',
        },
        {
          text: 'Being contacted out of the blue about an investment is a warning sign.',
          isFact: true,
          explain: 'Fact. Unexpected calls, messages or DMs about investments are a common start to scams. Genuine firms rarely cold-call you with "opportunities".',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Femi\'s DMs',
      beats: [
        { speaker: 'femi', text: 'Since my warning post, I\'ve had nine new "mentors" DM me. Nine.' },
        { speaker: 'grace', text: 'Case file says: out of the blue equals warning sign. Block, block, block.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Polished doesn\'t mean real. Platform ads aren\'t checked for you. Most crypto isn\'t protected. A friend\'s win isn\'t proof. Out-of-the-blue offers are a warning.',
    },
  ],
  apply: {
    scenario: 'Investment-scam myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Scam sites always look cheap', group: 0 },
          { text: 'Most crypto lacks bank-style protection', group: 1 },
          { text: 'Big platforms check every ad', group: 0 },
          { text: 'Cold contact about investments is a warning', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why isn\'t a friend\'s win proof a scheme works?',
        options: [
          { text: 'Friends always lie', why: 'They may have been paid; the source is the issue.' },
          { text: 'Early members are often paid with later members\' money' },
          { text: 'It is proof', why: 'Ponzi schemes pay early members.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'This new mentor has 200,000 followers. That can\'t be fake.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Then he\'s legit.', why: 'Follower counts prove nothing.' },
          { text: 'Follow him and see.', why: 'That\'s how it starts.' },
          { text: 'Followers can be bought, and lots of real people get fooled. Big numbers aren\'t a register.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]] doesn\'t mean real. The [[2]] does.',
        blanks: [['Polished', 'polished'], ['register']],
        distractors: ['Cheap', 'comments'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"It looks professional"', 'Scams can look perfect'],
          ['"It\'s on a big platform"', 'Scam ads get through'],
          ['"My friend made money"', 'Early payouts are bait'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought is the myth?',
        lines: [
          'Most crypto isn\'t covered by compensation schemes.',
          'Unexpected investment DMs are a warning.',
          'Lots of followers means he must be genuine.',
        ],
        bug: 2,
        fix: 'Follower counts can be bought and prove nothing.',
        explanation: 'Only the regulator\'s register can confirm a firm.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many new "mentors" messaged Femi after his post?',
        answers: ['9', 'nine'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What usually happens if an unregulated crypto platform vanishes?',
        options: [
          { text: 'The government repays everyone', why: 'Usually not.' },
          { text: 'There\'s usually no compensation scheme to help' },
          { text: 'The bank refunds automatically', why: 'Not guaranteed at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what to do with an unexpected investment DM.',
        lines: ['Don\'t reply', 'Block', 'Report to the platform', 'Add it to your scam file'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Femi get more scam DMs after posting?',
        options: [
          { text: 'Coincidence', why: 'Victims are often re-targeted.' },
          { text: 'His post was illegal', why: 'It was helpful; scammers re-target.' },
          { text: 'Scammers target people who\'ve shown interest or been scammed before' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths might someone you know believe? How could you share the truth kindly?',
    starters: ['They might believe...', 'I could share...'],
  },
  deepen: {
    title: 'Sucker lists',
    summary: 'Scammers share and sell lists of people who have responded to scams before. That\'s why victims are often targeted again, including by fake "recovery" services.',
  },
  notes: 'FCA warnings on cold calls, crypto protection, social media ads. Femi per CAST.',
};

export default lesson;
