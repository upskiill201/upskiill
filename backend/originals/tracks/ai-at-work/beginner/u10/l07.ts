import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 7 — confidential documents. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Confidential documents',
  summary: 'Ada needs help understanding the bank contract, which is marked confidential. She can still get AI\'s help, without pasting the contract.',
  minutes: 12,
  outcomes: [
    'Recognise confidential documents',
    'Get AI help without sharing the document',
    'Use approved tools when you need the full text',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to get help with the contract',
      before: {
        label: 'Risky',
        text: 'Ada pastes the whole 20-page confidential bank contract into a free AI tool: "Summarise this and tell me if the bank must pay for outages."',
      },
      after: {
        label: 'Safe',
        text: 'Ada asks, with no contract text: "In payment partner contracts, what do liability clauses for outages usually say? What terms should I look for?" Then she reads the clause herself, and for the full summary uses the company-approved AI tool, or asks the legal team.',
      },
      notes: [
        'General questions get useful help without sharing anything confidential.',
        'Ada reads the actual clause; she knows what to look for now.',
        'If full-text analysis is needed, use an approved tool or legal.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask general questions instead of pasting confidential text. Need the full document analysed? Use an approved tool, or ask the expert.',
    },
  ],
  apply: {
    scenario: 'Ada needs help with the confidential bank contract.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Confidential, or not?',
        groups: ['Confidential', 'Not confidential'],
        items: [
          { text: 'The signed bank contract', group: 0 },
          { text: 'A public news story about the bank', group: 1 },
          { text: 'Next year\'s pricing plan', group: 0 },
          { text: 'The bank\'s public website', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets help without sharing the contract?',
        options: [
          { text: 'Here\'s the contract. Summarise it.', why: 'Shares confidential text.' },
          { text: 'In payment partner contracts, what do outage liability clauses usually say, and what words should I look for?' },
          { text: 'Here\'s page 7 only.', why: 'Still confidential text.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Ada needs the full contract summarised. What should she do?',
        options: [
          { text: 'Paste it into a free tool', why: 'Unapproved.' },
          { text: 'Use the company-approved AI tool, or ask the legal team' },
          { text: 'Guess', why: 'Use the right channel.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can you send me the bank contract so I can ask my AI about it?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Sure, here it is.', why: 'Confidential.' },
          { text: 'Ask the bank yourself.', why: 'Offer what she can share.' },
          { text: 'It\'s confidential between us and the bank, so I can\'t share it. I can tell you what the outage clause says.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Ask [[1]] questions instead of pasting [[2]] text.',
        blanks: [['general'], ['confidential']],
        distractors: ['secret', 'public'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in Ada\'s plan is risky?',
        lines: [
          'Ask AI what outage clauses usually say',
          'Read the clause herself',
          'Paste the pricing appendix into a free tool for a second opinion',
          'Ask legal if still unsure',
        ],
        bug: 2,
        fix: 'Ask legal or use the approved tool.',
        explanation: 'The appendix is confidential too.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the need to the safe route.',
        pairs: [
          ['Understand typical clauses', 'General AI question'],
          ['Full contract summary', 'Approved tool'],
          ['Legal interpretation', 'Legal team'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s general question.',
        tiles: ['What', 'words', 'should', 'I', 'look', 'for?'],
        distractors: ['paste'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many pages is the bank contract?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Signs a document is confidential?',
        groups: ['Sign of confidential', 'Not a sign'],
        items: [
          { text: 'Marked "Confidential"', group: 0 },
          { text: 'Signed by both companies', group: 0 },
          { text: 'Published on a public site', group: 1 },
          { text: 'Contains unreleased prices', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s approach.',
        lines: ['Notice it\'s confidential', 'Ask AI a general question', 'Read the clause herself', 'Use approved tool or legal if needed'],
      },
      {
        kind: 'mcq',
        prompt: 'Is pasting "just one page" of a confidential document OK?',
        options: [
          { text: 'No; any confidential text counts' },
          { text: 'Yes, one page is fine', why: 'Still confidential.' },
          { text: 'Yes, if it\'s short', why: 'Length doesn\'t matter.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What confidential documents do you work with? What general question could you ask AI instead?',
    starters: ['The document:', 'My general question:'],
  },
  deepen: { title: 'Try it today', summary: 'Find out which AI tool, if any, your company approves for confidential documents.' },
  notes: 'General guidance; not legal advice.',
};

export default lesson;
