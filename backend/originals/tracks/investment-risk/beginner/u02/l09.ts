import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: the risk map v2. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Arjun\'s risk map v2: five kinds',
  summary: 'Arjun adds five new columns to his map: market, inflation, liquidity, concentration and fraud. Some ideas look very different now. Tap through version 2.',
  minutes: 11,
  outcomes: [
    'Score ideas on five kinds of risk',
    'See which ideas carry several risks at once',
    'Add the five kinds to your own map',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Arjun\'s risk map v2',
      text: 'FIVE KINDS: market / inflation / liquidity / concentration / fraud. Savings account: none / HIGH over decades / none / none / very low. Wide spread of shares: HIGH in bad years / low over decades / low / low / low if regulated. The plot: medium / low / HIGH / HIGH / HIGH, title disputed: CROSSED OUT. Kavya\'s crypto: very high / unclear / low / HIGH if one coin / medium. Vikram\'s options: very high, plus leverage / n/a / low / high / low if regulated. WhatsApp 3% a month: "none" / n/a / locked / everything in one scheme / not on SEBI\'s list: CROSSED OUT. NEW NOTE: every option has a risk. Doing nothing is an option.',
      hotspots: [
        { phrase: 'HIGH over decades', note: 'Cash\'s risk is inflation, slow but real over long periods.' },
        { phrase: 'low if regulated', note: 'Fraud risk falls a lot with a provider on the regulator\'s list.' },
        { phrase: 'title disputed: CROSSED OUT', note: 'The lawyer\'s call. Three brothers, years of court.' },
        { phrase: 'HIGH if one coin', note: 'Concentration: one coin is one basket.' },
        { phrase: 'plus leverage', note: 'Borrowed exposure makes losses bigger. Chapter 5 has the numbers on traders.' },
        { phrase: 'not on SEBI\'s list: CROSSED OUT', note: 'Arjun searched the official list himself. Nothing.' },
        { phrase: 'Doing nothing is an option', note: 'And it has its own risk: inflation.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Score every idea on all five kinds of risk. An idea that\'s high on several at once deserves the most caution, or a line through it.',
    },
  ],
  apply: {
    scenario: 'Reading map v2.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to its biggest risk on the map.',
        pairs: [
          ['Savings account', 'Inflation over decades'],
          ['The plot', 'Liquidity, concentration and fraud'],
          ['WhatsApp scheme', 'Fraud'],
          ['Wide spread of shares', 'Market falls in bad years'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the WhatsApp scheme crossed out?',
        options: [
          { text: 'The return is too low', why: 'It claims a very high return.' },
          { text: 'Arjun dislikes WhatsApp', why: 'It failed the fraud check.' },
          { text: 'It isn\'t on the regulator\'s list, and it claims no risk' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Still on the map, or crossed out?',
        groups: ['Still on', 'Crossed out'],
        items: [
          { text: 'Savings account', group: 0 },
          { text: 'The plot', group: 1 },
          { text: 'Wide spread of shares', group: 0 },
          { text: 'WhatsApp 3% a month', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Which idea is now the riskiest still on your map?',
        prompt: 'Arjun\'s best answer?',
        options: [
          { text: 'Vikram\'s options: very high market risk, plus leverage.' },
          { text: 'The savings account.', why: 'Its risk is slow inflation.' },
          { text: 'None of them have risk.', why: 'Every option has a risk.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The new note.',
        template: 'Every option has a [[1]]. Doing [[2]] is an option.',
        blanks: [['risk'], ['nothing']],
        distractors: ['profit', 'everything'],
      },
      {
        kind: 'findBug',
        prompt: 'Which row on a copy of v2 is scored wrongly?',
        lines: [
          'Savings account: inflation HIGH over decades.',
          'The plot: liquidity HIGH.',
          'Wide spread of shares: market risk none.',
        ],
        bug: 2,
        fix: 'Wide spread of shares: market risk HIGH in bad years.',
        explanation: 'Spreading reduces concentration, not market risk.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many kinds of risk does map v2 score? (A number.)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What changes an idea\'s fraud risk from high to low?',
        options: [
          { text: 'A celebrity endorsement', why: 'Easy to fake.' },
          { text: 'Payout screenshots', why: 'Easy to fake.' },
          { text: 'A provider on the official regulator\'s list' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Which idea is high on several kinds of risk at once?',
        options: [
          { text: 'The savings account', why: 'Mainly inflation.' },
          { text: 'The plot' },
          { text: 'None', why: 'The plot was high on three.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Arjun built v2.',
        lines: ['Start from the ideas on v1', 'Add the five risk columns', 'Score each idea', 'Cross out the ones that fail'],
      },
    ],
  },
  reflect: {
    prompt: 'Score one idea you\'ve considered on all five kinds of risk. Which is highest?',
    starters: ['Market:... Inflation:... Liquidity:... Concentration:... Fraud:...', 'The highest is...'],
  },
  deepen: {
    title: 'Risk is a bundle',
    summary: 'Most investments carry a bundle of risks, not one. Naming each one stops a single selling point (a high return, a famous name) from hiding the rest.',
  },
  notes: 'Map v2 (fictional). Scores are qualitative and illustrative.',
};

export default lesson;
