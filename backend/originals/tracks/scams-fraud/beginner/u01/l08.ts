import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Myth or Fact: first scam myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'What the office believes',
  summary: 'Grace tells the story at lunch. Within five minutes the table has five confident opinions about scams. Tested, one by one.',
  minutes: 10,
  outcomes: [
    'Correct common beliefs about who and how scams target',
    'Know that caller ID and names prove nothing',
    'Understand that refunds aren\'t automatic',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Scammers mostly target elderly people.',
          isFact: false,
          explain: 'Myth. Older people are targeted, but so is everyone. Young adults are often hit by shopping, job and investment scams; people of every age by impersonation.',
        },
        {
          text: 'If a call shows your bank\'s real number, it must be your bank.',
          isFact: false,
          explain: 'Myth. Numbers can be faked ("spoofed"). Hang up and call the number on your card.',
        },
        {
          text: 'Your bank will never ask you to move money to a "safe account".',
          isFact: true,
          explain: 'Fact. There\'s no such thing. Anyone asking you to move money to keep it safe is a scammer.',
        },
        {
          text: 'If you\'re tricked into sending money, the bank will always refund you instantly.',
          isFact: false,
          explain: 'Myth. In the UK, rules since October 2024 mean banks generally must reimburse victims of these scams up to a limit, but there are conditions and exceptions. Reporting fast matters. In many other countries protection is much weaker.',
        },
        {
          text: 'Admitting you nearly fell for a scam helps other people.',
          isFact: true,
          explain: 'Fact. Scams thrive on silence and shame. Every honest story makes the next person more likely to pause.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Lunch',
      beats: [
        { speaker: 'femi', text: 'Mate, I\'d never fall for that. I\'m too online.' },
        { speaker: 'grace', text: 'That\'s what I\'d have said yesterday. Let\'s see what lands in your inbox this month.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Everyone is a target. Caller ID can be faked. There is no "safe account". Refunds aren\'t automatic. Telling your story protects others.',
    },
  ],
  apply: {
    scenario: 'Lunch-table myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Scammers only target the elderly', group: 0 },
          { text: 'Banks never ask you to move money to a "safe account"', group: 1 },
          { text: 'Caller ID proves who\'s calling', group: 0 },
          { text: 'Sharing your story helps others', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is "spoofing"?',
        options: [
          { text: 'A type of refund', why: 'It\'s faking a number.' },
          { text: 'Faking the number a call or text appears to come from' },
          { text: 'A joke', why: 'It\'s a scam technique.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'I\'m too online to fall for anything.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'True, you\'re safe.', why: 'Overconfidence helps scammers.' },
          { text: 'You\'re definitely going to be scammed.', why: 'Not helpful; just keep checking.' },
          { text: 'Being online means you see more scams, not fewer. Feeling safe is exactly when people stop checking.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The safe-account rule.',
        template: 'There is no such thing as a "[[1]] account". Anyone asking you to [[2]] money there is a scammer.',
        blanks: [['safe'], ['move', 'transfer']],
        distractors: ['savings', 'hide'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Only the elderly"', 'Everyone is targeted'],
          ['"It showed the bank\'s number"', 'Numbers can be faked'],
          ['"The bank always refunds"', 'Conditions apply; report fast'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief will make Femi more vulnerable?',
        lines: [
          'I\'ll call back on numbers I trust.',
          'I\'ll pause on anything urgent.',
          'Scams are always obvious, so I don\'t need to check.',
        ],
        bug: 2,
        fix: 'Many scams look professional; always check.',
        explanation: 'Confidence that you\'d "know" is what scammers exploit.',
      },
      {
        kind: 'mcq',
        prompt: 'In the UK since October 2024, what generally applies to victims tricked into sending money?',
        options: [
          { text: 'No protection at all', why: 'There\'s a reimbursement scheme.' },
          { text: 'Banks generally must reimburse up to a limit, with conditions and exceptions' },
          { text: 'Instant, unconditional refunds', why: 'There are conditions.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In what year did the UK\'s reimbursement rules for these scams start? (A year.)',
        answers: ['2024'],
        placeholder: 'A year',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what to do if a "bank" call asks you to move money.',
        lines: ['Hang up', 'Wait a few minutes or use another phone', 'Call the number on your card', 'Report the call'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do scams thrive on shame?',
        options: [
          { text: 'Shame makes refunds bigger', why: 'It keeps people silent.' },
          { text: 'They don\'t', why: 'Silence helps scammers.' },
          { text: 'Ashamed victims stay quiet, so others aren\'t warned' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths did you believe? What changed your mind?',
    starters: ['I believed...', 'Now I think...'],
  },
  deepen: {
    title: 'The UK reimbursement rules',
    summary: 'The Payment Systems Regulator introduced mandatory reimbursement for authorised push payment (APP) scams from 7 October 2024, with a maximum per claim and exceptions such as gross negligence. Rules can change, so check the current position with your bank.',
  },
  notes: 'PSR APP fraud mandatory reimbursement from 7 Oct 2024, cap £85,000 per claim (stated generally). Spoofing: Ofcom/UK Finance guidance. Femi per CAST.',
};

export default lesson;
