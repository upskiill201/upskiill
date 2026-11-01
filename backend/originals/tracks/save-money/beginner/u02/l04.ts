import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Before/After: small things vs big things. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Small cuts vs big cuts',
  summary: 'Yaw\'s plan: cut every small thing. Efua\'s plan: look at the biggest lines first. Same goal, very different results. Which one finds more money with less misery?',
  minutes: 11,
  outcomes: [
    'Find your biggest spending lines',
    'Compare the effect of small cuts and big cuts',
    'Choose cuts that save most for the least pain',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to find GH₵250 a month',
      before: {
        label: 'Cut every small thing',
        text: 'No sweets: saves GH₵10\nNo Friday kelewele: saves GH₵48\nNo birthday gifts: saves GH₵30\nNo match tickets: saves GH₵40\nNo drinks with the team: saves GH₵32\nTotal: GH₵160 a month, and a miserable month',
      },
      after: {
        label: 'Look at the big lines first',
        text: 'Food out (GH₵440): pack lunch on two lab days a week, saves GH₵60\nStaples: one shared market trip a week instead of daily hall-shop buys, saves GH₵50\nSubscriptions and fees: saves GH₵110\nWater and drinks: filter bottle, saves GH₵40\nTotal: GH₵260 a month, and Friday kelewele stays',
      },
      notes: [
        'For most people the biggest lines are housing, transport and food. For Kofi, food is the biggest he controls.',
        'A 15% cut in a big line often beats a 100% cut in five small ones.',
        'Small cuts to joys feel huge. Big-line changes like packing lunch barely feel like anything after a week.',
        'Small cuts still help when they\'re leaks (the unused app). Keep the small joys that matter.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Start with your three biggest lines. Ask what a 10 to 15% cut would look like there before touching the small joys.',
    },
  ],
  apply: {
    scenario: 'Big lines first.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Efua\'s cuts: 60 + 50 + 110 + 40. Total per month?',
        answers: ['260', 'GH₵260', '260 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which approach saved more, and felt less painful?',
        options: [
          { text: 'Cutting every small thing', why: 'GH₵160, with every joy gone.' },
          { text: 'Looking at the big lines first' },
          { text: 'They were the same', why: 'GH₵260 vs GH₵160.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Big line or small line, for most people?',
        groups: ['Big line', 'Small line'],
        items: [
          { text: 'Rent or housing', group: 0 },
          { text: 'Sweets', group: 1 },
          { text: 'Food', group: 0 },
          { text: 'Transport', group: 0 },
          { text: 'A weekly snack', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A 15% cut on a GH₵400 food line saves how much?',
        answers: ['60', 'GH₵60', '60 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I\'ll cut sweets, drinks, gifts, tickets, everything small. That\'s serious saving!',
        prompt: 'Efua\'s best reply?',
        options: [
          { text: 'What are your three biggest lines? Start there. You might keep your match tickets and still save more.' },
          { text: 'Perfect plan.', why: 'Lots of pain for less money.' },
          { text: 'Don\'t bother.', why: 'He can save, just smarter.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'A [[1]] cut in a big line often beats a [[2]] cut in small ones.',
        blanks: [['small', '15%'], ['total', '100%']],
        distractors: ['zero', 'secret'],
      },
      {
        kind: 'findBug',
        prompt: 'Which cut costs Kofi something he values for very little money?',
        lines: [
          'Pack lunch on two lab days.',
          'Shared weekly market trip.',
          'Stop Friday drinks with the football team (GH₵32 a month).',
          'Filter bottle instead of sachets.',
        ],
        bug: 2,
        fix: 'Keep Friday drinks: real value, small cost.',
        explanation: 'GH₵32 a month buys friendship and fun. Big-line changes already found the money.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each big line to a gentle big-line cut.',
        pairs: [
          ['Food out', 'Pack lunch twice a week'],
          ['Transport', 'Walk short trips, share rides'],
          ['Housing', 'Share a room or move further out'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When are small cuts still worth making?',
        options: [
          { text: 'When they\'re leaks with no value, like an unused app' },
          { text: 'Always, everything small must go', why: 'Small joys often protect the whole plan.' },
          { text: 'Never', why: 'Leaks are small and still worth plugging.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the smart cutting approach.',
        lines: ['List your three biggest lines', 'Find a 10–15% cut in each', 'Plug small leaks', 'Keep the small joys that matter'],
      },
    ],
  },
  reflect: {
    prompt: 'What are your three biggest spending lines? What would a 10% cut look like in the biggest one?',
    starters: ['My biggest lines:...', 'A 10% cut would be...'],
  },
  deepen: {
    title: 'Housing and transport',
    summary: 'For working people, housing and transport are often the biggest lines by far. A cheaper room, a flatmate, or living closer to work can save more in a month than a year of skipped snacks. They\'re harder changes, so plan them, rather than reacting.',
  },
  notes: 'Fictional comparisons. Small cuts: 10 + 48 (kelewele 12 × 4) + 30 + 40 + 32 = 160. Big lines: 60 + 50 + 110 (subscriptions 80 + fees ~30) + 40 = 260. Remaining leak savings (haircut 25, toiletries 15) bring Ch2 total to ~300/month.',
};

export default lesson;
