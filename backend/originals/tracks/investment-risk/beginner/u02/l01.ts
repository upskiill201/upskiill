import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story with a choice: the plot near Mysuru. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The plot',
  summary: 'Arjun\'s uncle drives him to see "the plot": ₹10 lakh, a great price, but the seller wants a token advance today. Standing in the red soil, Arjun realises one idea can hide several kinds of risk at once.',
  minutes: 12,
  outcomes: [
    'See that one investment can carry several risks',
    'Name liquidity, concentration and fraud risk in a real decision',
    'Make checks before paying anything',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Red soil',
      beats: [
        { speaker: 'narrator', text: 'Forty minutes outside Mysuru. A field, a few coconut trees, and a man with a folder of papers.' },
        { speaker: 'narrator', text: 'The seller: "₹10 lakh. Very cheap. Two other buyers coming tomorrow. ₹50,000 token today and it\'s yours." His uncle nods hard.' },
        { speaker: 'arjun', text: '(to himself) ₹10 lakh out of ₹12. In one thing. That I can\'t sell quickly. On papers I can\'t read.' },
        { speaker: 'grace', text: 'On WhatsApp: "Ask yourself what could go wrong. Not the price. Everything else."' },
        { speaker: 'tey', text: 'One plot, several risks: putting most of his money in one place, not being able to sell fast, and not knowing if the papers are real. What should he do?' },
      ],
      choice: {
        prompt: 'What should Arjun do?',
        options: [
          { text: 'Pay the ₹50,000 token today before the other buyers come.', outcome: '"Other buyers tomorrow" is pressure. If the title turns out to be disputed, the token may be gone and the problem is his.' },
          { text: 'Pay nothing today. Have an independent lawyer check the title, think about putting most of his money in one place he can\'t sell quickly, and decide later.', outcome: 'Yes. He thanks the seller and his uncle, takes photos of the papers, and pays nothing. If it\'s a real opportunity, it will survive a week of checks.', best: true },
          { text: 'Tell his uncle land is always a bad idea and walk off.', outcome: 'Land isn\'t always bad, and his uncle means well. The problem isn\'t land; it\'s the unchecked papers, the rush, and the size of the bet.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One investment can hide several risks: concentration (too much in one place), liquidity (hard to sell), and fraud (is it real?). Check all of them before paying anything.',
    },
  ],
  apply: {
    scenario: 'The plot near Mysuru.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each worry to the kind of risk.',
        pairs: [
          ['₹10 lakh of ₹12 in one plot', 'Concentration risk'],
          ['Could take years to sell', 'Liquidity risk'],
          ['Papers might not be genuine', 'Fraud risk'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What share of Arjun\'s windfall is the plot?',
        options: [
          { text: 'About 50%', why: '10 ÷ 12 ≈ 0.83.' },
          { text: 'About 83%' },
          { text: 'About 10%', why: 'It\'s ₹10 lakh of ₹12 lakh.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Check before paying, or pressure?',
        groups: ['Check', 'Pressure'],
        items: [
          { text: 'Independent lawyer checks the title', group: 0 },
          { text: '"Two other buyers tomorrow"', group: 1 },
          { text: 'Photos of the papers', group: 0 },
          { text: '"Token today or lose it"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'My uncle says checking the title is an insult to the seller.',
        prompt: 'What does Grace say?',
        options: [
          { text: 'Then don\'t check.', why: 'Skipping checks is how title fraud works.' },
          { text: 'Insult him back.', why: 'Stay polite; just check.' },
          { text: 'An honest seller expects checks. Only a dishonest one is insulted by them.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'If it\'s a real opportunity, it will survive a week of [[1]].',
        blanks: [['checks']],
        distractors: ['excitement', 'silence'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Arjun buys the plot, how much of the ₹12 lakh is left for everything else? (In lakh.)',
        answers: ['2', '2 lakh', 'two', '200000', '2,00,000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which step would skip a key check?',
        lines: [
          'Photograph the papers.',
          'Ask an independent lawyer to check the title.',
          'Use the seller\'s own lawyer to save time.',
        ],
        bug: 2,
        fix: 'Use a lawyer who works only for me.',
        explanation: 'The seller\'s lawyer works for the seller.',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Arjun pay nothing today?',
        options: [
          { text: 'A token is hard to get back if the title is disputed' },
          { text: 'He had no money', why: 'He has ₹12 lakh.' },
          { text: 'He dislikes land', why: 'He dislikes unchecked risk.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What was wrong with walking off saying "land is always bad"?',
        options: [
          { text: 'Nothing', why: 'Land isn\'t always bad.' },
          { text: 'He should have bought it', why: 'Not without checks.' },
          { text: 'The problem was the checks, the rush and the size, not land itself' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what Arjun does at the plot.',
        lines: ['Thank the seller and his uncle', 'Photograph the papers', 'Pay nothing', 'Arrange an independent title check'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a big purchase someone you know made in a hurry. Which risks did they skip checking?',
    starters: ['They bought...', 'They skipped...'],
  },
  deepen: {
    title: 'Title checks',
    summary: 'In many places, land fraud includes selling plots with disputed ownership, selling the same plot twice, or forged papers. An independent title search before any payment is standard advice from property lawyers.',
  },
  notes: 'Cast: Arjun, Grace; seller and uncle narrated. 10/12 ≈ 83%. No properties or firms named.',
};

export default lesson;
