import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Chat with Tey: recovering, money and feelings. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'After a scam',
  summary: 'Maureen calls Grace after hearing about her session. She\'s never told anyone the full story. Tey helps Grace think about what recovery really looks like, money and feelings both.',
  minutes: 12,
  outcomes: [
    'Know what financial recovery may be possible',
    'Understand the emotional impact of scams',
    'Support someone through recovery',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Recovery has two parts: the money and the person. Shall we start with the money?', replies: ['Yes. Can Maureen get anything back?'] },
        { tey: 'Sometimes. In the UK, since October 2024, banks generally have to reimburse victims of authorised push payment scams, up to a limit, if reported within the time allowed, with some exceptions. Older cases, and crypto sent to platforms, can be harder. The first step is always: tell the bank and report it.', replies: ['What if the bank says no?'] },
        { tey: 'You can complain to the bank, and if that doesn\'t resolve it, take it to the Financial Ombudsman Service, which is free. Never pay a "recovery" company that contacts you; that\'s the recovery scam.', replies: ['And the person?'] },
        { tey: 'Scams can cause shame, anxiety, sleeplessness and loss of trust, sometimes more than the money. Many victims blame themselves. Free support services exist, including charities that help victims of crime.', replies: ['How do I help Maureen?'] },
        { tey: 'Listen without judging. Remind her it was a crime done to her by professionals. Help with practical steps: the bank, the report, the complaint. And keep checking in. Victims are often targeted again.', replies: ['She feels stupid.'] },
        { tey: 'Then tell her what the file shows: a nurse, a teacher, a developer, a teenager, a grandmother. Clever, kind people, every one. The scammers were the ones who did wrong.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Money: tell the bank, report, complain if needed, then the free ombudsman; never pay "recovery" firms. Person: listen, don\'t judge, help with steps, keep checking in.',
    },
  ],
  apply: {
    scenario: 'After a scam.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the money-recovery route.',
        lines: ['Tell the bank', 'Report it', 'Complain to the bank if refused', 'Go to the Financial Ombudsman Service'],
      },
      {
        kind: 'mcq',
        prompt: 'What does the Financial Ombudsman Service cost to use?',
        options: [
          { text: 'Nothing; it\'s free' },
          { text: 'A percentage of what you get back', why: 'It\'s free for consumers.' },
          { text: '£500 upfront', why: 'It\'s free.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps Maureen, or hurts?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'Listening without judging', group: 0 },
          { text: '"How could you be so silly?"', group: 1 },
          { text: 'Helping her call the bank', group: 0 },
          { text: 'Suggesting a paid recovery firm', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Maureen says she\'s too ashamed to tell her daughter.',
        prompt: 'What could Grace say to Maureen?',
        options: [
          { text: 'You must tell her today.', why: 'Support, not pressure.' },
          { text: 'Keep it secret forever.', why: 'Secrecy isolates her.' },
          { text: 'You don\'t have to do it alone. Would it help if I sat with you when you tell her?' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Supporting a victim.',
        template: 'Listen without [[1]], help with steps, and keep [[2]] in.',
        blanks: [['judging'], ['checking']],
        distractors: ['stopping', 'logging'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to who handles it.',
        pairs: [
          ['First report of lost money', 'Your bank'],
          ['Unresolved complaint', 'Financial Ombudsman Service'],
          ['Emotional support', 'Friends, family and victim support charities'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step would hurt Maureen\'s recovery?',
        lines: [
          'Report the loss to her bank.',
          'Make a complaint if they refuse.',
          'Pay a firm that cold-called promising to recover £38,000 for a fee.',
        ],
        bug: 2,
        fix: 'Never pay recovery firms that contact you.',
        explanation: 'That\'s the recovery scam.',
      },
      {
        kind: 'mcq',
        prompt: 'What can scams cause besides money loss?',
        options: [
          { text: 'Nothing else', why: 'The emotional impact can be big.' },
          { text: 'Shame, anxiety, sleeplessness and loss of trust' },
          { text: 'Only anger at banks', why: 'Many feelings.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In what year did the UK\'s mandatory reimbursement rules for these scams begin?',
        answers: ['2024'],
        placeholder: 'A year',
      },
      {
        kind: 'mcq',
        prompt: 'Why keep checking in on a victim?',
        options: [
          { text: 'They\'re often targeted again, and recovery takes time' },
          { text: 'To remind them of their mistake', why: 'To support them.' },
          { text: 'No need', why: 'Ongoing support helps.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'If someone told you they\'d been scammed, what would your first sentence be?',
    starters: ['I\'d say...'],
  },
  deepen: {
    title: 'Victim support',
    summary: 'In the UK, the charity Victim Support offers free, confidential help to people affected by crime, including fraud. Many countries have similar services.',
  },
  notes: 'PSR APP reimbursement (7 Oct 2024), Financial Ombudsman Service (free), Victim Support (UK charity, a support service, not a product). Maureen narrated.',
};

export default lesson;
