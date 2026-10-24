import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: investment scams. Cliffhanger: "the bank's fraud team". */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Priya\'s brother',
  summary: 'Priya\'s brother has been offered a "guaranteed 2% a week" crypto bot by a woman he met on a language-learning app. Use everything from Chapter 2. Then, on Friday evening, Grace\'s phone rings. The screen shows her bank\'s real number.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Take apart an investment scam for someone else', 'Combine romance and fake-platform signs'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 6:15 p.m.',
      beats: [
        { speaker: 'priya', text: 'My brother Rohan met someone on a language app. Now she\'s showing him a crypto bot, 2% a week, guaranteed. He\'s put in £1,200.' },
        { speaker: 'grace', text: 'Pull up a chair. I\'ve got a file for this.' },
        { speaker: 'narrator', text: 'That evening, Grace is cooking when her phone rings. The screen shows her bank\'s name and its real number.' },
        { speaker: 'narrator', text: '"Mrs Grace? This is the fraud team. We\'ve seen two suspicious payments from your account in the last hour. We need to secure your money right now."' },
        { speaker: 'tey', text: 'That\'s Chapter 2: fee walls, fake platforms, romance-investment, recruitment schemes, fake celebrity ads and registers. Next: who\'s really calling. First, Rohan.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: Rohan, 34, Leicester. Met "Lin" on a language app two months ago. She never video calls. She\'s introduced a crypto bot: "2% a week, guaranteed". He\'s put in £1,200; the dashboard shows £1,900. Lin says to add £5,000 before "the next upgrade".',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each sign to the scam type.',
        pairs: [
          ['Met online, never video calls', 'Romance-investment'],
          ['Dashboard showing profits', 'Fake platform'],
          ['"Guaranteed 2% a week"', 'Too good to be true'],
          ['"Add £5,000 before the upgrade"', 'Push for more'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the most important thing for Rohan to do first?',
        options: [
          { text: 'Add the £5,000 to protect his gains', why: 'That\'s the push for more.' },
          { text: 'Send no more money' },
          { text: 'Ask Lin if it\'s a scam', why: 'She\'s part of it.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '2% a week for a year (52 weeks), ignoring compounding, adds up to what percent?',
        answers: ['104', '104%'],
        placeholder: 'A percent',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps Rohan, or helps the scam?',
        groups: ['Helps Rohan', 'Helps the scam'],
        items: [
          { text: 'Telling his bank today', group: 0 },
          { text: 'Keeping it secret from Priya', group: 1 },
          { text: 'Checking the bot on the FCA warning list', group: 0 },
          { text: 'Trying to withdraw by paying a fee', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'He says Lin really cares about him. How do I tell him?',
        prompt: 'Grace\'s best advice?',
        options: [
          { text: 'Tell him he\'s an idiot.', why: 'Shame pushes people toward the scammer.' },
          { text: 'Don\'t say anything.', why: 'Gentle questions can help.' },
          { text: 'Gently. Ask if they\'ve ever video called, and ask him to try a withdrawal with no fees. Let the answers speak.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The pattern.',
        template: 'Big promise, small start, money that only flows [[1]] [[2]].',
        blanks: [['one'], ['way']],
        distractors: ['both', 'back'],
      },
      {
        kind: 'findBug',
        prompt: 'Rohan\'s plan. Which step is a trap?',
        lines: [
          'Stop sending money.',
          'Tell my bank and report it.',
          'Pay the "upgrade fee" to unlock my £1,900 first.',
        ],
        bug: 2,
        fix: 'Never pay to withdraw.',
        explanation: 'The £1,900 is a fake number; the fee is more loss.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Rohan\'s next steps.',
        lines: ['Send nothing more', 'Call his bank', 'Report it', 'Keep all messages', 'Stop contact with "Lin"'],
      },
      {
        kind: 'mcq',
        prompt: 'The "bank" calls Grace from the bank\'s real number. Does that prove it\'s the bank?',
        options: [
          { text: 'Yes, completely', why: 'Caller ID can be faked.' },
          { text: 'No: numbers can be spoofed' },
          { text: 'Only if they know her name', why: 'Names are easy to find.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Rohan put in £1,200. If he adds £5,000, how much would he have put in?',
        answers: ['6200', '6,200', '£6,200', '£6200'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What should Grace do with the "fraud team" call?',
        options: [
          { text: 'Do what they say to secure her money', why: 'That\'s how safe-account scams work.' },
          { text: 'Give them a code to prove who she is', why: 'Never share codes.' },
          { text: 'Hang up and call the number on her card from another phone' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If someone you love was in Rohan\'s position, what would your first gentle question be?',
    starters: ['I\'d ask...'],
  },
  notes: 'Chapter 2 challenge. Priya per CAST; Rohan and "Lin" narrated. 2% × 52 = 104%. Cliffhanger: spoofed bank fraud-team call → Ch3 phishing and impersonation.',
};

export default lesson;
