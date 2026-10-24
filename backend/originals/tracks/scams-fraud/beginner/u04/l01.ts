import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story with a choice: easy £500. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Easy £500',
  summary: '"Just let some money go through your account for a day. You keep £500." Jayden\'s 17, saving for a car, and it sounds like nobody gets hurt. What should he do?',
  minutes: 12,
  outcomes: [
    'Recognise money-mule recruitment',
    'Understand why "nobody gets hurt" is false',
    'Say no and get help',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The DM',
      beats: [
        { speaker: 'narrator', text: 'The message: "Easy £500 bro. Someone sends £3,000 to your account, you send £2,500 on to my mate, keep the rest. 10 mins. Tyler\'s done it twice."' },
        { speaker: 'jayden', text: 'It\'s not stealing. It\'s their money. I\'m just... moving it.' },
        { speaker: 'grace', text: 'Love, whose money do you think the £3,000 is?' },
        { speaker: 'tey', text: 'Money that needs to "pass through" a stranger\'s account is almost always stolen, often from scam victims like the ones in Grace\'s file. What should Jayden do?' },
      ],
      choice: {
        prompt: 'What should Jayden do?',
        options: [
          { text: 'Do it just once; £500 is a lot and it\'s only ten minutes.', outcome: 'Once is enough. He\'d be a "money mule": moving criminal money. His account could be closed, he could get a fraud marker that makes banking and borrowing hard for years, and he could be prosecuted.' },
          { text: 'Say no, block the person, keep the messages, and tell his mum and the bank or police, so they can stop it reaching others.', outcome: 'Yes. Saying no protects him; reporting protects others, maybe even Tyler. Jayden screenshots the DM and blocks.', best: true },
          { text: 'Ask the person to promise it\'s legal first.', outcome: 'Of course they\'ll promise. Real jobs never need to pass money through your personal account.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'If someone wants to move money through your account, even "just once", it\'s money laundering. The money is usually stolen, and you can be treated as a criminal.',
    },
  ],
  apply: {
    scenario: 'The DM.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a money mule?',
        options: [
          { text: 'A delivery driver', why: 'It\'s about moving stolen money.' },
          { text: 'Someone who lets criminal money move through their account' },
          { text: 'A type of savings account', why: 'It\'s laundering.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '£3,000 in, £2,500 out. How much would Jayden "keep"?',
        answers: ['500', '£500'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Consequence of muling, or not?',
        groups: ['Consequence', 'Not a consequence'],
        items: [
          { text: 'Bank account closed', group: 0 },
          { text: 'A fraud marker for years', group: 0 },
          { text: 'A guaranteed £500 forever', group: 1 },
          { text: 'Possible prosecution', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'But Tyler\'s done it twice and he\'s fine.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Then you\'ll be fine too.', why: 'Banks investigate mule accounts.' },
          { text: 'Tyler\'s a criminal mastermind.', why: 'He\'s likely being used too.' },
          { text: 'He\'s fine until the bank notices. They often do, and then it\'s his name on the account, not theirs.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The warning.',
        template: 'Money that needs to "pass [[1]]" a stranger\'s account is almost always [[2]].',
        blanks: [['through'], ['stolen']],
        distractors: ['around', 'clean'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line of the DM to its trick.',
        pairs: [
          ['"Easy £500"', 'Tempting reward'],
          ['"10 mins"', 'Makes it feel small'],
          ['"Tyler\'s done it twice"', 'Social proof'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which response leaves Jayden exposed?',
        lines: [
          'Screenshot the DM.',
          'Block the sender.',
          'Delete everything and tell nobody.',
        ],
        bug: 2,
        fix: 'Keep the evidence and tell his mum and the bank or police.',
        explanation: 'Evidence and reporting protect him and others.',
      },
      {
        kind: 'mcq',
        prompt: 'Where does mule money often come from?',
        options: [
          { text: 'Scam victims, like the people in Grace\'s file' },
          { text: 'Lottery wins', why: 'Usually stolen money.' },
          { text: 'Banks', why: 'From victims.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Do real jobs ever need to pass money through your personal account?',
        options: [
          { text: 'Yes, often', why: 'Never for real jobs.' },
          { text: 'Only in finance jobs', why: 'Never through your personal account.' },
          { text: 'No' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what Jayden does.',
        lines: ['Say no', 'Screenshot the DM', 'Block the sender', 'Tell his mum', 'Report it'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you or anyone you know seen "easy money" offers like this on social media?',
    starters: ['I\'ve seen...', 'It said...'],
  },
  deepen: {
    title: 'Who gets recruited',
    summary: 'UK banks and fraud prevention groups have found that many money mules are young, often students or school leavers, recruited through social media, friends or fake job adverts.',
  },
  notes: 'Money mule recruitment: Cifas / UK Finance research on young mules. Jayden per CAST; Tyler narrated.',
};

export default lesson;
