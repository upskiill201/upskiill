import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Before/After: a handshake vs a written contract. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Put it in writing',
  summary: 'Everyone shakes hands on the call. Joel wants to start coding tonight. Arjun knows a hard negotiation needs a harder document: a statement of work both sides sign.',
  minutes: 12,
  outcomes: [
    'Turn a verbal deal into a clear written one',
    'Know what a statement of work includes',
    'Avoid starting work before it\'s signed',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'A handshake vs a statement of work',
      before: {
        label: 'Handshake',
        text: '"Great, £42,000, phase one plus support, let\'s go!"\nWhat exactly is in phase one?\nWhen is each payment due?\nWhat counts as "support"?\nIn week nine, everyone remembers it differently.',
      },
      after: {
        label: 'Statement of work',
        text: 'Scope: app, points, scan in shop, welcome reward. Not included: gift cards, referrals, staff dashboard.\nTimeline: 12 weeks from signing.\nPrice: £42,000, including 3 months\' launch support (bug fixes, up to 10 hours a month of help).\nPayment: 40% at signing, 30% at the midpoint demo, 30% at launch, 30-day invoices.\nChanges: £450 a day, approved by email first.\nReview: phase two discussed after launch.',
      },
      notes: [
        'Write what\'s included, what\'s not, and what each word means ("support" = bug fixes plus 10 hours a month).',
        'Don\'t start work until it\'s signed and the first payment is in.',
        'After a tough negotiation, clear terms protect the relationship as much as the money.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'After a hard deal, write it down in detail: scope, not-included, timeline, price, payment, changes, review. Start when it\'s signed.',
    },
  ],
  apply: {
    scenario: 'The statement of work.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Clear term or vague?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: '"Support: bug fixes plus up to 10 hours a month"', group: 0 },
          { text: '"We\'ll help out after launch"', group: 1 },
          { text: '"Payment: 40% at signing"', group: 0 },
          { text: '"Payment when convenient"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When should Arjun\'s team start work?',
        options: [
          { text: 'When the statement of work is signed and the first payment is in' },
          { text: 'Tonight, after the handshake', why: 'Nothing is signed yet.' },
          { text: 'When they feel like it', why: 'Start on agreed terms.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '40% of £42,000 at signing. How much, in pounds?',
        answers: ['16800', '16,800', '£16,800'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the section to its content.',
        pairs: [
          ['Scope', 'App, points, scan, welcome reward'],
          ['Not included', 'Gift cards, referrals, dashboard'],
          ['Changes', '£450 a day, approved first'],
          ['Review', 'Phase two after launch'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'We all shook hands. Isn\'t a contract a bit unfriendly?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'It\'s the friendliest thing we can do. In week nine, nobody will argue about what "support" meant.' },
          { text: 'Yes, skip it.', why: 'Vague deals cause fights later.' },
          { text: 'Make it 80 pages of legal text.', why: 'Clear and short is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Defining words.',
        template: 'Write what\'s [[1]], what\'s not, and what each [[2]] means.',
        blanks: [['included'], ['word', 'term']],
        distractors: ['secret', 'emoji'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Up to how many hours a month of help does support include?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the draft statement of work is a problem?',
        lines: [
          'Scope: app, points, scan, welcome reward.',
          'Timeline: 12 weeks from signing.',
          'Extras: anything small, at no charge.',
          'Payment: 40/30/30, 30-day invoices.',
        ],
        bug: 2,
        fix: 'Changes: £450 a day, approved by email first.',
        explanation: '"Anything small, at no charge" is scope creep in writing.',
      },
      {
        kind: 'mcq',
        prompt: 'Why do clear terms matter even more after a hard negotiation?',
        options: [
          { text: 'Trust is still fragile, and vague terms create the next fight' },
          { text: 'They don\'t', why: 'Hard rounds leave less goodwill for misunderstandings.' },
          { text: 'To punish the other side', why: 'They protect both sides.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the statement of work sections.',
        lines: ['Scope', 'Not included', 'Timeline', 'Price', 'Payment', 'Changes', 'Review'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a short statement of work for something you do for others, even a small job: scope, not included, timeline, price, payment.',
    starters: ['Scope:...', 'Not included:...'],
  },
  deepen: {
    title: 'Get legal help for big deals',
    summary: 'For large contracts, a lawyer should check the final document. The statement of work is the business part: what you\'ll deliver, when, and for how much.',
  },
  notes: 'Statement of work: standard project-contract practice. Fictional terms: £42,000 incl. 3 months\' support (bug fixes + 10 h/month), 40/30/30, 30-day invoices, £450/day changes. 40% of £42,000 = £16,800. Not legal advice.',
};

export default lesson;
