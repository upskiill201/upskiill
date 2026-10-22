import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Tap to explore: the scam file v4. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The scam file v4',
  summary: 'A new section, written partly by Jayden: "Scams aimed at us". Four cases, two countries, and a new kind of risk: being turned into part of the crime. Tap through version 4.',
  minutes: 11,
  outcomes: [
    'Compare scams aimed at young people',
    'Spot when a victim can become a suspect',
    'Add these cases to your own file',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Grace\'s scam file v4',
      text: 'SECTION: SCAMS AIMED AT US (co-written by Jayden). CASE 8: "Easy £500". Channel: DM. Ask: pass £3,000 through his account. Danger: becomes a mule. Outcome: refused, reported. Tyler did it: account frozen. CASE 9: Ella\'s task "job". Channel: WhatsApp. Ask: top-ups to unlock pay. Outcome: £400 lost, stopped before the £600 "final task". CASE 10: gig tickets. Channel: social media. Ask: £140 by bank transfer. Outcome: walked away; bought nothing. CASE 11: Aunty Bimpe, Lagos. Channel: fake SMS plus call. Ask: "return" ₦85,000. Outcome: lost. Now checks her real balance. NEW RULE: never let money pass through, never sell or lend an account, never pay strangers by transfer.',
      hotspots: [
        { phrase: 'co-written by Jayden', note: 'The best warnings come from people the audience trusts.' },
        { phrase: 'Danger: becomes a mule', note: 'The first case where the target risks being treated as a criminal.' },
        { phrase: 'Tyler did it: account frozen', note: 'The consequence that made it real for Jayden\'s friends.' },
        { phrase: 'stopped before the £600 "final task"', note: 'Ella lost £400, not £1,000. Stopping early limits loss.' },
        { phrase: 'walked away; bought nothing', note: 'Bank-transfer-only was enough to say no.' },
        { phrase: 'Now checks her real balance', note: 'One habit that defeats the fake-alert scam anywhere.' },
        { phrase: 'never let money pass through', note: 'The rule Jayden posted in his group chat.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Scams aimed at young people can turn the target into part of the crime. Never let money pass through your account, never sell or lend it, never pay strangers by transfer.',
    },
  ],
  apply: {
    scenario: 'Reading file v4.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each case to its channel.',
        pairs: [
          ['Case 8: easy £500', 'DM'],
          ['Case 9: Ella\'s job', 'WhatsApp'],
          ['Case 10: gig tickets', 'Social media'],
          ['Case 11: Aunty Bimpe', 'Fake SMS plus call'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What new danger appears in case 8?',
        options: [
          { text: 'The target can be treated as a criminal' },
          { text: 'Losing a small fee', why: 'Much bigger: becoming a mule.' },
          { text: 'None', why: 'Muling is a crime.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Lost money, or lost nothing?',
        groups: ['Lost money', 'Lost nothing'],
        items: [
          { text: 'Ella', group: 0 },
          { text: 'Jayden (case 8)', group: 1 },
          { text: 'Aunty Bimpe', group: 0 },
          { text: 'Jayden (case 10)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Can we put my rule at the top of the section?',
        prompt: 'Grace\'s reply?',
        options: [
          { text: 'No, it\'s my file.', why: 'He co-wrote it.' },
          { text: 'Rules don\'t matter.', why: 'They\'re the point of the file.' },
          { text: 'Top of the section, in capitals. It\'s the most important line in it.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Jayden\'s rule.',
        template: 'Never let money pass [[1]], never sell or [[2]] an account.',
        blanks: [['through'], ['lend']],
        distractors: ['around', 'close'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many cases are in the file now?',
        answers: ['11', 'eleven'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v4 is wrong?',
        lines: [
          'Case 9: £400 lost.',
          'Case 10: walked away.',
          'Case 11: sent money back, and the bank refunded her instantly.',
        ],
        bug: 2,
        fix: 'Case 11: lost; now checks her real balance.',
        explanation: 'There was no real credit and no automatic refund.',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Ella lose £400 and not £1,000?',
        options: [
          { text: 'The scammers refunded her', why: 'She stopped early.' },
          { text: 'She stopped before paying the £600 "final task"' },
          { text: 'She never paid anything', why: 'She paid £400.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the scam file versions.',
        lines: ['v1: "Hi Mum"', 'v2: investment scams', 'v3: impersonation', 'v4: scams aimed at us'],
      },
      {
        kind: 'mcq',
        prompt: 'Which habit defeats the fake-credit scam?',
        options: [
          { text: 'Checking your real balance yourself' },
          { text: 'Trusting SMS alerts', why: 'They can be faked.' },
          { text: 'Calling the sender back', why: 'Check your own balance.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Add a section to your own file: scams aimed at young people you know. What\'s your rule?',
    starters: ['Case:...', 'My rule:...'],
  },
  deepen: {
    title: 'Stopping early',
    summary: 'In almost every scam, losses grow with each new payment. Stopping as soon as something feels wrong, even after losing some money, is often what saves the most.',
  },
  notes: 'Scam file v4 (fictional).',
};

export default lesson;
