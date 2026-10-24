import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Walkthrough: summarise a long document. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Fourteen pages',
  summary: 'Flat 5\'s landlord sends a 14-page lease and wants it signed by Friday. Lucía has two evenings. Walk through how she uses AI to find what matters, and then reads those parts herself.',
  minutes: 13,
  outcomes: [
    'Summarise a long document with AI, safely',
    'Pull out every fee, deadline and penalty with its clause number',
    'Read the important parts yourself before you sign',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A 14-page lease in one evening',
      steps: [
        { title: '1. Remove the private details', body: 'Before pasting, Lucía deletes her name, the landlord\'s name, ID numbers and the bank account. The AI doesn\'t need them to read the rules.' },
        { title: '2. Ask for a plain summary', body: '"Summarise this lease for a tenant in 10 bullet points, in plain Spanish." Now she knows the shape of it.' },
        { title: '3. Ask for the money and the dates', body: '"List every fee, deadline and penalty, with the clause number for each." Out come: a two-month deposit (clause 6), a MX$3,000 "maintenance fee" (clause 14), and a guarantor requirement (clause 9).' },
        { title: '4. Read those clauses herself', body: 'She opens clause 14. The fee is charged every year, not once. The summary had missed that. This is why she reads the parts that cost money.' },
        { title: '5. Turn it into questions', body: '"What should I ask the landlord about clauses 6, 9 and 14?" She gets a list to send before Friday.' },
        { title: '6. Know the limits', body: 'AI helps her understand. It isn\'t a lawyer. For a big or unusual contract, a lawyer or a tenants\' advice service is worth it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'A summary can miss the one detail that costs you. Ask for clause numbers, then read every clause about money, dates and penalties yourself.',
    },
  ],
  apply: {
    scenario: 'The 14-page lease.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s steps in order.',
        lines: ['Remove private details', 'Ask for a plain summary', 'Ask for fees, dates and penalties with clause numbers', 'Read those clauses herself', 'Turn them into questions for the landlord'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask for clause numbers?',
        options: [
          { text: 'So she can find and read the exact clause herself' },
          { text: 'Because the AI likes numbers', why: 'It\'s for her, to check.' },
          { text: 'To make the summary longer', why: 'It\'s about checking, not length.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the AI\'s summary turned out to be misleading?',
        lines: [
          'Deposit: two months\' rent (clause 6).',
          'Maintenance fee: MX$3,000, one time (clause 14).',
          'A guarantor is required (clause 9).',
        ],
        bug: 1,
        fix: 'MX$3,000 every year.',
        explanation: 'Reading clause 14 herself showed the fee repeats yearly. The summary missed it.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Remove before pasting, or fine to keep?',
        groups: ['Remove', 'Keep'],
        items: [
          { text: 'Lucía\'s ID number', group: 0 },
          { text: 'The rules about pets', group: 1 },
          { text: 'The landlord\'s bank account', group: 0 },
          { text: 'The notice period', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'I never read contracts. I ask AI "is this OK?" and sign.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'Same, it\'s faster.', why: 'Clause 14 would have cost her MX$3,000 a year.' },
          { text: 'AI can\'t read contracts.', why: 'It can help a lot; it just can\'t be the final check.' },
          { text: 'The summary missed a yearly fee in mine. Use AI to find the money parts, then read them yourself.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Lucía\'s money prompt.',
        template: 'List every fee, [[1]] and penalty, with the [[2]] number for each.',
        blanks: [['deadline', 'date'], ['clause']],
        distractors: ['joke', 'page'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the clause to what it says.',
        pairs: [
          ['Clause 6', 'Two-month deposit'],
          ['Clause 9', 'A guarantor is required'],
          ['Clause 14', 'MX$3,000 fee, every year'],
          ['Step 6', 'AI isn\'t a lawyer'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When should Lucía get a lawyer or a tenants\' advice service?',
        options: [
          { text: 'Never, AI is enough', why: 'AI helps her understand; it isn\'t legal advice.' },
          { text: 'For every shopping receipt', why: 'Keep it for big or unusual contracts.' },
          { text: 'When the contract is big, unusual, or something doesn\'t add up' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much is the yearly maintenance fee, in pesos? (A number.)',
        answers: ['3000', '3,000', 'MX$3,000', 'MX$3000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt gets the most useful questions for the landlord?',
        options: [
          { text: 'Is this lease good?', why: 'Too vague to act on.' },
          { text: 'What should I ask the landlord about clauses 6, 9 and 14? Keep each question short and polite.' },
          { text: 'Make the landlord change everything.', why: 'Not a question, and not realistic.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a long document you\'ve signed or agreed to without reading (a phone contract, terms of service, a lease)? What would you ask AI to pull out of it?',
    starters: ['I signed...', 'I\'d ask it to pull out...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Take a long document you\'re allowed to share (a public terms page, a manual, a school policy). Ask an AI tool for every fee, date and rule with its section number. Then read two of those sections yourself. Did the summary get them right?',
  },
  notes: 'In Mexico City, rental contracts commonly require a guarantor (aval/fiador) or a rental legal policy (póliza jurídica); deposits vary. Lease details are fictional. Not legal advice; lesson points to lawyers/tenant advice for big contracts.',
};

export default lesson;
