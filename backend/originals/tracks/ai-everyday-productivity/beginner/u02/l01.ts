import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story with a choice: the neighbourhood answer. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The neighbourhood answer',
  summary: 'Twelve flat listings land in Lucía\'s inbox. She asks AI what rent to expect, and it answers in one confident sentence. The listings say something very different. Who should she believe?',
  minutes: 12,
  outcomes: [
    'Treat an AI research answer as a starting map, not the destination',
    'Check numbers against current, real sources',
    'Notice when a confident answer and reality disagree',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 7:15 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Twelve listings overnight. Lucía\'s limit is MX$15,000 a month, within 30 minutes of the office in Colonia Juárez.' },
        { speaker: 'narrator', text: 'She asks an AI tool: "How much is a one-bedroom in Roma Norte?" It replies instantly: "A one-bedroom in Roma Norte typically costs around MX$11,000 per month."' },
        { speaker: 'lucia', text: 'Eleven thousand? Then why does every listing say eighteen?' },
        { speaker: 'tomas', text: '(at the next desk) The AI says eleven. The landlords are robbing you. Tell them.' },
        { speaker: 'tey', text: 'One confident sentence, no source, no date. Twelve real listings from this week. What should Lucía do?' },
      ],
      choice: {
        prompt: 'What should Lucía do?',
        options: [
          { text: 'Trust the AI and offer landlords MX$11,000.', outcome: 'Three landlords don\'t reply. One laughs. The figure might be years old, or simply invented. Fluent isn\'t current.' },
          { text: 'Ignore AI for the flat hunt completely.', outcome: 'She loses a useful assistant. AI can still help her compare, summarise and prepare questions. It just isn\'t her source for prices.' },
          { text: 'Treat it as a rough starting point and check real listings from this month.', outcome: 'Yes. She checks current listings: one-bedrooms in Roma Norte are mostly MX$16,000 and up. So she asks AI a better question: "Which neighbourhoods near Colonia Juárez might be cheaper, and what should I check?"', best: true },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'For anything that changes (prices, opening hours, rules, dates), AI is a starting map. The real listing, the official site or the person you ask is the destination.',
    },
  ],
  apply: {
    scenario: 'Rents, sources and confident sentences.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why might the AI\'s MX$11,000 be wrong?',
        options: [
          { text: 'It might be based on old information, or made up, and it gave no source or date' },
          { text: 'AI can\'t do maths', why: 'The problem is the source, not the arithmetic.' },
          { text: 'Landlords lie', why: 'The listings are real and current.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Check a current source, or fine to take from AI as a start?',
        groups: ['Check a current source', 'Fine as a start'],
        items: [
          { text: 'This month\'s rent prices', group: 0 },
          { text: 'What to look for at a viewing', group: 1 },
          { text: 'The Metrobús timetable', group: 0 },
          { text: 'Questions to ask a landlord', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'The AI says eleven thousand. Just tell them they\'re overcharging.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'The listings are this week\'s. The AI gave no date and no source. I\'ll trust the listings for prices.' },
          { text: 'You\'re right, I\'ll tell them.', why: 'She\'d be negotiating with a number nobody can check.' },
          { text: 'AI is always wrong.', why: 'It\'s useful; it just isn\'t a price source.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'For things that change, AI is a starting [[1]], not the [[2]].',
        blanks: [['map', 'point'], ['destination']],
        distractors: ['source', 'answer'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which question uses AI well for the flat hunt?',
        options: [
          { text: 'What exactly is the rent at Calle Durango 210?', why: 'Only the listing or landlord knows that.' },
          { text: 'Tell me the cheapest flat in Mexico City right now.', why: 'It can\'t see current listings reliably.' },
          { text: 'Which neighbourhoods near Colonia Juárez might be cheaper than Roma Norte, and what should I check in each?' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the best place to answer it.',
        pairs: [
          ['Current rent for a flat', 'The listing or landlord'],
          ['How noisy the street is at night', 'A visit at night'],
          ['What questions to ask at a viewing', 'An AI tool'],
          ['Commute time at 8 a.m.', 'A map app or a test trip'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s Lucía\'s monthly rent limit, in pesos? (A number.)',
        answers: ['15000', '15,000', 'MX$15,000', 'MX$15000', '15 000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which of Lucía\'s research notes is the risky one?',
        lines: [
          'Rent in Roma Norte: MX$11,000 (AI, no source).',
          'Rent in Roma Norte: mostly MX$16,000+ (12 listings, this week).',
          'Ask AI: cheaper areas near Colonia Juárez?',
        ],
        bug: 0,
        fix: 'Cross it out, or mark it "unchecked".',
        explanation: 'A number with no source and no date shouldn\'t drive a decision.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s better research.',
        lines: ['Ask AI for a rough picture', 'Spot numbers that matter', 'Check them in current listings', 'Ask AI a better follow-up', 'Decide using the checked numbers'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Rule I learned the hard way: if a number goes into a decision, I check it. Did you?',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'No, the AI sounded sure.', why: 'That\'s exactly the trap.' },
          { text: 'I didn\'t need to.', why: 'The rent decides her whole month.' },
          { text: 'Yes. The AI said eleven, the listings say sixteen and up. I\'m going with the listings.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a number you rely on (a price, a fee, a time) that might have changed since you last checked? Where would you check it today?',
    starters: ['The number is...', 'I\'d check it at...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask an AI tool for the price of something you buy often (a bus fare, a coffee, a phone plan). Then check the real current price. How close was it? Did it tell you where the number came from?',
  },
  notes: 'Rents are fictional and illustrative; Roma Norte is generally among the pricier central neighbourhoods. No listing sites named. Lesson point: AI outputs about changing facts can be outdated or fabricated.',
};

export default lesson;
