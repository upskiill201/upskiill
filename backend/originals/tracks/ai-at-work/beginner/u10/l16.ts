import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 16 — AI in regulated jobs. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'AI in regulated jobs',
  summary: 'Ada works in fintech, a regulated industry. So does anyone in banking, health, law or insurance. The same AI habit can be fine in one job and risky in another.',
  minutes: 12,
  outcomes: [
    'Know why regulated jobs need extra care with AI',
    'Spot tasks where rules apply',
    'Keep a human check on regulated decisions',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Same task, two industries',
      before: {
        label: 'A design agency',
        text: 'An AI drafts a newsletter for a client. A designer checks the tone and sends it. If a line is clumsy, it\'s embarrassing but harmless.',
      },
      after: {
        label: 'Ada\'s fintech',
        text: 'An AI drafts a message telling shops about new fees and refund rules. Financial regulators expect communications to customers to be clear, accurate and fair. A wrong fee or a misleading promise could breach rules, so the message goes through compliance before it\'s sent.',
      },
      notes: [
        'Regulated industries have rules about what you tell customers and how you handle their data.',
        'AI can draft; a qualified person must check anything the rules cover.',
        'Decisions about customers (loans, claims, diagnoses) need human judgement and often an explanation.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'In finance, health, law and insurance: AI drafts, a qualified person checks. Customer messages and decisions about people go through the right review.',
    },
  ],
  apply: {
    scenario: 'Ada uses AI in a regulated job.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Regulated industry, or not usually?',
        groups: ['Regulated', 'Not usually'],
        items: [
          { text: 'Banking and payments', group: 0 },
          { text: 'A t-shirt design shop', group: 1 },
          { text: 'Health care', group: 0 },
          { text: 'Insurance', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Ada\'s fee message go through compliance?',
        options: [
          { text: 'Rules require customer communications to be clear, accurate and fair' },
          { text: 'Compliance likes reading', why: 'It\'s about regulation.' },
          { text: 'AI wrote it', why: 'It would need checking even if a human wrote it.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which AI use is appropriate in Ada\'s job?',
        options: [
          { text: 'Let AI decide which shops get a loan.', why: 'Decisions about people need human judgement.' },
          { text: 'Ask AI to draft a plain-English fee notice, then send it to compliance for review.' },
          { text: 'Send AI-written fee messages straight to customers.', why: 'Needs review.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Could your AI just decide which shops qualify for the new credit feature?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'It can help analyse data, but decisions like that need a person to decide and explain them, under our lending rules.' },
          { text: 'Sure, faster that way.', why: 'Decisions about people need a human.' },
          { text: 'AI can\'t do anything with numbers.', why: 'It can assist.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'AI [[1]]; a qualified person [[2]].',
        blanks: [['drafts'], ['checks']],
        distractors: ['decides', 'sleeps'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the industry to a rule-covered task.',
        pairs: [
          ['Payments', 'Telling customers about fees'],
          ['Health', 'Anything about a patient'],
          ['Law', 'Advice to a client'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Ada\'s plan is risky?',
        lines: [
          'AI drafts the fee notice',
          'Ada checks every number',
          'Send it to all 50 shops straight away',
          'Keep a copy for records',
        ],
        bug: 2,
        fix: 'Send it to compliance first.',
        explanation: 'Regulated customer messages need review.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s rule.',
        tiles: ['Compliance', 'reviews', 'customer', 'messages'],
        distractors: ['skips'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs a qualified human check, or fine with a normal check?',
        groups: ['Qualified check', 'Normal check'],
        items: [
          { text: 'A notice about refund rules', group: 0 },
          { text: 'An internal team lunch poll', group: 1 },
          { text: 'A decision to decline a shop\'s credit', group: 0 },
          { text: 'A meeting agenda', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which team reviews Ada\'s customer fee messages? (one word)',
        answers: ['compliance', 'Compliance'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a regulated customer message.',
        lines: ['AI drafts it', 'Ada checks facts and figures', 'Compliance reviews', 'Send and keep a record'],
      },
      {
        kind: 'mcq',
        prompt: 'Why do decisions about people need human judgement?',
        options: [
          { text: 'They affect people\'s lives, and rules often require a reason a person can explain' },
          { text: 'AI is always biased', why: 'It can be; humans must be accountable.' },
          { text: 'They don\'t', why: 'They do.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is your industry regulated? Which of your AI tasks would need a qualified person to check?',
    starters: ['My industry:', 'Tasks that need a check:'],
  },
  deepen: { title: 'Try it today', summary: 'Find out who reviews customer communications in your organisation, and when.' },
  notes: 'Financial regulators (e.g. the Central Bank of Nigeria, Bank of Ghana) set consumer-protection rules for communications. General guidance, not compliance advice.',
};

export default lesson;
