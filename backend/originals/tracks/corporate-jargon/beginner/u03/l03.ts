import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Tap to explore: an email full of email acronyms — RE, FWD, CC, BCC, FYI, NB, TL;DR. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Email letters: RE, FWD, CC, BCC, NB, TL;DR',
  summary: 'Remi opens an email chain so long it has "RE: RE: FWD: RE:" in the subject. Every line has letters he half-knows. Tap them, one at a time.',
  minutes: 12,
  outcomes: [
    'Decode the email acronyms: RE, FWD, CC, BCC, FYI, NB, TL;DR',
    'Know when to use CC and when to use BCC',
    'Read a long email chain in the right order',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'An email in Remi\'s inbox, Monday 9:40',
      text: 'Subject: RE: RE: FWD: Courier test update. From: Wanjiku. To: Remi. CC: Brian, Emeka. BCC: (hidden). TL;DR: refund approved, KSh 186,000 back by Friday. FYI, Swift Freight agreed on Thursday. NB: they want the invoice numbers by Wednesday.',
      hotspots: [
        { phrase: 'RE:', note: 'Added when someone replies. In email, "Re:" is generally read as "regarding" or "in reply to". Each RE: is another reply in the chain.' },
        { phrase: 'FWD:', note: 'Forwarded: someone sent this email on to a new person. Here, the chain started somewhere else and was forwarded to Wanjiku.' },
        { phrase: 'CC:', note: 'Carbon copy (from the days of carbon paper). People who should SEE the email but aren\'t the main person it\'s for. Everyone can see who\'s CC\'d.' },
        { phrase: 'BCC:', note: 'Blind carbon copy. These people get the email, but nobody else can see they did. Useful for big mailing lists; risky if used to secretly copy someone in.' },
        { phrase: 'TL;DR', note: '"Too long; didn\'t read." Started as internet slang. At work, it\'s used as a label for a one-line summary at the top. Fine with colleagues, too casual for a client or the CEO.' },
        { phrase: 'FYI', note: 'For your information: no action needed.' },
        { phrase: 'NB', note: 'Nota bene, Latin for "note well". It means: pay attention to this bit.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'zanele', text: 'Quick question. If I BCC Brian on my email to Emeka, Emeka won\'t know Brian is reading it?' },
        { speaker: 'remi', text: 'Technically yes. But if Brian hits Reply All...' },
        { speaker: 'zanele', text: '...Emeka finds out Brian was secretly reading it. Oh no. Okay. CC it is.' },
        { speaker: 'tey', text: "Good instinct, Zanele. BCC is for protecting people's email addresses on a big list, not for secret audiences. If someone should see it, CC them openly." },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Reading a long chain? The newest message is at the top. Scroll to the bottom to read it in order, like a conversation.',
    },
  ],
  apply: {
    scenario: 'Monday, 9:40. A long email chain.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the email letters.',
        pairs: [
          ['CC', 'Copy: everyone can see you\'re included'],
          ['BCC', 'Hidden copy: others can\'t see you\'re included'],
          ['FWD', 'Sent on to someone new'],
          ['NB', 'Pay attention to this'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The subject says "RE: RE: RE: Courier test". What does that tell Remi?',
        options: [
          { text: 'It\'s very urgent', why: 'It means replies, not urgency.' },
          { text: 'There have been several replies in this chain' },
          { text: 'It\'s been forwarded three times', why: 'That would be FWD.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'CC or BCC?',
        groups: ['Use CC', 'Use BCC'],
        items: [
          { text: 'Brian should see your update to Emeka', group: 0 },
          { text: 'An event invite to 200 clients who don\'t know each other', group: 1 },
          { text: 'Keeping Finance informed on a supplier email', group: 0 },
          { text: 'A newsletter to the whole mailing list', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Should I put TL;DR at the top of my email to Mr Kamau?',
        prompt: 'What does Remi say?',
        options: [
          { text: 'Yes, he\'ll love it.', why: 'Mr Kamau is the CEO. TL;DR is a bit casual for him.' },
          { text: 'Never write a summary.', why: 'A summary at the top is great. Just name it differently.' },
          { text: 'Put a one-line summary at the top, but call it "Summary" instead. TL;DR is a bit casual for the CEO.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'FYI stands for "for your ..." (one word)',
        answers: ['information'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Wanjiku writes "NB: invoice numbers by Wednesday." What should Remi notice?',
        options: [
          { text: 'This bit is important, and has a deadline' },
          { text: 'It\'s optional', why: 'NB means "note well": pay attention.' },
          { text: 'NB means "no budget"', why: 'Nota bene: note well.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s email plan. Which line could backfire?',
        lines: [
          'To: Emeka. CC: Remi.',
          'BCC: Brian, so Emeka doesn\'t know he\'s watching.',
          'Summary at the top: test results attached.',
        ],
        bug: 1,
        fix: 'CC: Brian, openly.',
        explanation: 'If Brian replies to all, Emeka discovers the secret audience. If Brian should see it, CC him.',
      },
      {
        kind: 'mcq',
        prompt: 'Where should Remi start reading a long email chain to follow it in order?',
        options: [
          { text: 'At the top', why: 'That\'s the newest message, the end of the conversation.' },
          { text: 'In the middle', why: 'Start at the beginning: the bottom.' },
          { text: 'At the bottom: the oldest message' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['ETA', 'When it will arrive or be ready'],
          ['As discussed', 'Introduces what was agreed'],
          ['Follow-up', 'The email after a meeting'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a professional summary line for the CEO.',
        tiles: ['Summary:', 'refund', 'approved,', 'money', 'back', 'by', 'Friday.'],
        distractors: ['TL;DR', 'BCC'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at your own inbox. Find one email with CC, BCC, RE: or FWD: in it. Was it used well?',
    starters: ['I found...', 'It was used well because... / Better would be...'],
  },
  deepen: {
    title: 'The CC habit',
    summary: 'Before you send your next email, ask: who must ACT (To), who should KNOW (CC), and is anyone hidden who shouldn\'t be (BCC)? Ten seconds, fewer surprises.',
  },
  notes: 'CC/BCC (carbon copy / blind carbon copy; Cambridge). "Re:" — RFC 5322 notes "Re:" (from Latin "res", "in the matter of"); commonly read as "reply". FWD/FW (forwarded). NB (nota bene). TL;DR (internet slang, Merriam-Webster). FYI.',
};

export default lesson;
