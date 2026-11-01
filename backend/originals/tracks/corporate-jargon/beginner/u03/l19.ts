import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 19. Chat with Tey: the acronym speed round — Tey fires, the learner answers, before the Unit Challenge. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The acronym speed round',
  summary: 'Friday, 1:45 p.m. Brian is back in the office, and Remi has a feeling the KPI deck brief is coming. Tey runs a lightning round to warm him up.',
  minutes: 11,
  outcomes: [
    'Recall the chapter\'s most important acronyms quickly',
    'Sort acronyms by family: time, email, money, people, documents, projects',
    'Feel ready for an acronym-heavy brief',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Lightning round. No notes. I say the letters, you say what they mean. Ready? EOD.",
          replies: ['End of day', 'Every other day'],
        },
        {
          tey: "End of day. Easy start. Next: SOW. Careful, there's a pig in this one.",
          replies: ['Statement of work', 'A female pig'],
        },
        {
          tey: "Statement of work. The pig was a trap. KPI?",
          replies: ['Key performance indicator', 'Key project idea'],
        },
        {
          tey: "Key performance indicator. Now a tricky one. In meeting minutes: AI.",
          replies: ['Artificial intelligence', 'Action item'],
        },
        {
          tey: "Action item, in minutes. Context wins. Money one: P&L.",
          replies: ['Profit and loss', 'Plans and logistics'],
        },
        {
          tey: "Profit and loss. Last one, the scariest: you're about to share customer data with another company. Which three letters do you check for first?",
          replies: ['NDA', 'SOP', 'MVP'],
        },
        {
          tey: "NDA. Always. That's the round. Now group them in your head: TIME (EOD, EOW, ETA, OOO), EMAIL (CC, BCC, FYI, NB), MONEY (P&L, ROI, KPI), PEOPLE (CEO, CFO, HR), DOCUMENTS (NDA, SOW, RFP), PROJECTS (PoC, MVP, scope). Families are easier to remember than lists.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Six families: time, email, money, people, documents, projects. When you meet a new acronym, ask which family it belongs to.',
    },
  ],
  apply: {
    scenario: 'Friday, 1:45 p.m. Warm-up before the brief.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Sort into families.',
        groups: ['Time', 'Money', 'Documents'],
        items: [
          { text: 'EOW', group: 0 },
          { text: 'ROI', group: 1 },
          { text: 'NDA', group: 2 },
          { text: 'ETA', group: 0 },
          { text: 'P&L', group: 1 },
          { text: 'SOW', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Speed round 1.',
        pairs: [
          ['OOO', 'Out of office'],
          ['CFO', 'Chief financial officer'],
          ['RFP', 'Request for proposal'],
          ['MVP', 'Minimum viable product'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '"Pls BCC the client list on the newsletter." Why BCC?',
        options: [
          { text: 'So it arrives faster', why: 'Speed isn\'t affected.' },
          { text: 'So it looks more important', why: 'Nobody can even see BCC.' },
          { text: 'So clients can\'t see each other\'s email addresses' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'TBD = to be ... (one word)',
        answers: ['decided', 'determined'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Speed round 2.',
        pairs: [
          ['YoY', 'Compared with last year'],
          ['CRM', 'Customer relationship management'],
          ['SLA', 'Service level agreement'],
          ['NB', 'Note well'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Speed round! What\'s "churn"? Not an acronym, but GO.',
        prompt: 'Remi answers.',
        options: [
          { text: 'Making butter.', why: 'Technically also true. Not at Synergix.' },
          { text: 'New leads.', why: 'The opposite end of the pipeline.' },
          { text: 'Customers who stop buying from you.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s speed-round answers. Which one is wrong?',
        lines: [
          'ETA: estimated time of arrival.',
          'MoU: memorandum of understanding.',
          'FY: final year.',
        ],
        bug: 2,
        fix: 'FY: financial (or fiscal) year.',
        explanation: 'FY is the company\'s accounting year.',
      },
      {
        kind: 'mcq',
        prompt: 'You\'re writing to someone outside your company for the first time. What do you do with acronyms?',
        options: [
          { text: 'Use as many as possible to sound expert', why: 'Remi tried that with Kestrel.' },
          { text: 'Spell them out, or cut them' },
          { text: 'Invent new ones', why: 'Never in shared writing.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Final sort.',
        groups: ['People', 'Projects', 'Email'],
        items: [
          { text: 'HR', group: 0 },
          { text: 'PoC', group: 1 },
          { text: 'CC', group: 2 },
          { text: 'VP', group: 0 },
          { text: 'Scope', group: 1 },
          { text: 'FWD', group: 2 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the safest question for any unknown acronym.',
        tiles: ['Quick', 'check:', 'what', 'does', 'that', 'stand', 'for', 'here?'],
        distractors: ['LGTM'],
      },
    ],
  },
  reflect: {
    prompt: 'Which acronym from this chapter will you use most in your own life? And which one do you still mix up?',
    starters: ['I\'ll use ... the most.', 'I still mix up...'],
  },
  deepen: {
    title: 'Teach three to someone',
    summary: 'Explain three acronyms from this chapter to a friend or family member, in plain words. Teaching is the fastest way to remember.',
  },
  notes: 'Review lesson for the chapter. Acronym families are a teaching device.',
};

export default lesson;
