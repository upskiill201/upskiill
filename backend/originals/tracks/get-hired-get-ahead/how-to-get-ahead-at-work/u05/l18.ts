import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 18 — Clinton reads an intern applicant's CV from the hiring side. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'The other side of the desk',
  summary: 'Aïcha asks Clinton to help hire a product intern. The first CV on his screen is from a final-year student in Buea. Its first line says: "I don\'t have much experience yet, but..." Clinton laughs out loud. Tap each line, as he does.',
  minutes: 11,
  outcomes: ['Read a CV from the hiring side', 'Spot hidden transferable skills', 'See how far you\'ve come'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of the CV',
      text: 'Final-year Economics student, University of Buea.\nI don\'t have much experience yet, but I\'m hardworking and passionate.\nTreasurer, Economics Students\' Association (120 members).\nRun my family\'s market stall on Saturdays.\nCreated a WhatsApp group where 30 traders share prices.',
      hotspots: [
        { phrase: 'Final-year Economics student, University of Buea.', note: 'Same university, same stage Clinton was at, two years ago.' },
        { phrase: 'I don\'t have much experience yet, but I\'m hardworking and passionate.', note: 'The exact sentence Clinton said at the careers fair. On this side of the desk, he sees how much it hides.' },
        { phrase: 'Treasurer, Economics Students\' Association (120 members).', note: 'Trust with money and 120 people. That\'s experience. It deserves a result, like "balanced the budget for two years".' },
        { phrase: 'Run my family\'s market stall on Saturdays.', note: 'Customers, prices, stock: the same kind of skill as Clinton\'s phone stall. Real product instincts, probably.' },
        { phrase: 'Created a WhatsApp group where 30 traders share prices.', note: 'She built something people rely on, and got 30 people to use it. That\'s a product, and she doesn\'t realise it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '"I don\'t have experience" often hides a lot of experience. Look for trust, people, money and things people rely on.',
    },
  ],
  apply: {
    scenario: 'Clinton reads the intern CV.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Real experience, or filler?',
        groups: ['Real experience', 'Filler'],
        items: [
          { text: 'Treasurer for 120 members', group: 0 },
          { text: 'Hardworking and passionate', group: 1 },
          { text: 'A WhatsApp group 30 traders use', group: 0 },
          { text: 'Running the family market stall', group: 0 },
          { text: 'I don\'t have much experience yet', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Clinton laugh at the first line?',
        options: [
          { text: 'It\'s funny on purpose', why: 'It\'s his own old line.' },
          { text: 'It\'s exactly what he said at his own careers fair' },
          { text: 'He\'s being unkind', why: 'He recognises himself.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each CV line to the skill it shows.',
        pairs: [
          ['Treasurer', 'Trust with money'],
          ['Market stall', 'Customers and pricing'],
          ['Traders\' WhatsApp group', 'Building something people use'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s note to Aïcha.',
        from: 'clinton',
        message: 'What do I tell Aïcha about this candidate?',
        options: [
          { text: '"Reject: no experience."', why: 'She has lots, hidden.' },
          { text: '"She said passionate, so yes."', why: 'Look at the evidence, not adjectives.' },
          { text: '"Interview her. She built a price-sharing group 30 traders use, and runs a stall. She has product instincts; her CV just hides them."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that hurts her CV most.',
        lines: ['Treasurer, 120 members.', 'I don\'t have much experience yet, but I\'m hardworking.', 'WhatsApp group for 30 traders.'],
        bug: 1,
        explanation: 'It undersells everything below it.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the hiring-side reading in order.',
        lines: ['Skip the adjectives', 'Find trust, people and money', 'Find things people rely on', 'Decide whether to interview'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What would make her treasurer line stronger?',
        options: [
          { text: 'A result, like "balanced the budget for two years"' },
          { text: 'More adjectives', why: 'A result.' },
          { text: 'Removing it', why: 'Add a result.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Look for [[1]], people, money and things people [[2]] on.',
        blanks: [['trust'], ['rely']],
        distractors: ['adjectives', 'frown', 'passion'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many traders use her WhatsApp group? (a number)',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'What a hiring manager notices first, or skips?',
        groups: ['Notices', 'Skips'],
        items: [
          { text: 'Numbers and results', group: 0 },
          { text: 'Generic adjectives', group: 1 },
          { text: 'Things people rely on', group: 0 },
          { text: 'Apologies for no experience', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Read your own CV as Clinton reads this one. What are you underselling?',
    starters: ['I\'m underselling...', 'I\'d rewrite it as...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Remove any "I don\'t have much experience" line from your CV or profile. Replace it with one result.',
  },
  notes: 'Full-circle callback to How to Get Noticed, Ch1 (the careers fair).',
};

export default lesson;
