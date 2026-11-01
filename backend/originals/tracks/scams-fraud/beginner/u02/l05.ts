import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Femi\'s report',
  summary: 'Femi reports the platform and tells his bank. He\'s lost £500, not £900, and he\'s posted a warning on his own Instagram. Check what you know about fee walls, fake platforms, romance scams and recruitment schemes.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Spot investment and money-making scams', 'Explain why they fail most people'],
  learn: [
    {
      kind: 'story',
      title: 'The warning post',
      beats: [
        { speaker: 'femi', text: 'I posted about it. Forty people messaged me. Six of them follow the same "mentor".' },
        { speaker: 'grace', text: 'That post might be worth more than the £500.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: too good to be true.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Scam sign, or normal?',
        groups: ['Scam sign', 'Normal'],
        items: [
          { text: 'A fee to release your withdrawal', group: 0 },
          { text: 'Fees taken from your balance and disclosed', group: 1 },
          { text: 'Paid for recruiting friends', group: 0 },
          { text: 'An online partner pushing crypto', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the fake platform playbook, first four stages.',
        lines: ['Lifestyle bait', 'Friendly chat', 'Small start', 'Fake gains'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each scam to its hook.',
        pairs: [
          ['Fake trading platform', 'A friendly "mentor"'],
          ['Romance-investment', 'Months of affection'],
          ['Gifting circle', '"Put in £100, get £800"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should you do if a platform wants a fee before you can withdraw?',
        options: [
          { text: 'Stop paying, tell your bank, report it' },
          { text: 'Pay the fee quickly', why: 'There\'ll be another.' },
          { text: 'Upgrade your account', why: 'Same trap.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'A "recovery expert" just messaged me. He can get my £500 back for £150.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Worth a try.', why: 'You\'d just lose £150 more.' },
          { text: 'Negotiate him down.', why: 'Don\'t engage at all.' },
          { text: 'That\'s the recovery scam. Real help comes from your bank and the police, and they don\'t charge you.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Romance scams.',
        template: 'Online-only, fast feelings, no [[1]] calls, then talk of [[2]].',
        blanks: [['video'], ['investments', 'crypto', 'money']],
        distractors: ['phone', 'holidays'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Each person must recruit two. How many people are on level 5? (Level 1 = 1.)',
        answers: ['16', 'sixteen'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Fake platforms can show fake profits.',
          'Pyramid schemes always fail most people.',
          'If you were allowed one small withdrawal, the platform is genuine.',
        ],
        bug: 2,
        fix: 'Small early withdrawals are bait.',
        explanation: 'They build trust for bigger deposits.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: what are the four ingredients?',
        options: [
          { text: 'Speed, money, links, apps', why: 'Urgency, authority, emotion, secrecy.' },
          { text: 'Urgency, authority, emotion, secrecy' },
          { text: 'Fees, taxes, refunds, loans', why: 'Urgency, authority, emotion, secrecy.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: how do you check a message claiming to be someone you know?',
        options: [
          { text: 'Contact them through a channel you already have' },
          { text: 'Reply to the message', why: 'That\'s their channel.' },
          { text: 'Check the profile photo', why: 'Photos are easy to copy.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Would you post publicly if you\'d been scammed? What might stop you, and what might help others?',
    starters: ['I would / wouldn\'t because...', 'It might help others by...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1–4 with Chapter 1 review. 2^4 = 16.',
};

export default lesson;
