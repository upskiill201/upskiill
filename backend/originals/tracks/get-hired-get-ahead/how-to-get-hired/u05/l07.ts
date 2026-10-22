import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 7 — can a graduate negotiate? What's negotiable. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Can a graduate negotiate?',
  summary: 'Clinton\'s mum is horrified: "You\'ll lose the job! Just say thank you!" His uncle says, "Always ask for double." Tey explains what\'s actually reasonable for a graduate, and what\'s worth asking for.',
  minutes: 11,
  outcomes: ['Decide whether to negotiate an offer', 'Know what is often negotiable', 'Understand the risks honestly'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Can graduates negotiate? Often, yes: politely, once, with a reason. Many employers expect some candidates to ask. Do you think a polite question usually loses the offer?',
          replies: ['I\'m scared it will', 'Probably not'],
        },
        {
          tey: 'A calm, reasonable request rarely loses an offer. What can go wrong is a demand, an ultimatum, or a lie. Some graduate roles, like big schemes, have fixed pay for everyone; then the answer is simply no, and that\'s fine.',
          replies: ['What can I ask for?'],
        },
        {
          tey: 'Salary, if your research supports it. But also: an earlier salary review, a start date, a training budget, remote days, equipment. If pay is fixed, these are often easier to move.',
          replies: ['How much should I ask for?'],
        },
        {
          tey: 'Something your research supports, with a reason. Clinton\'s target, 330,000, is inside his range and tied to his proof: offline sync experience their team needs. Not double. Not a number that "felt right".',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ask politely, once, with a reason. Pay is one option; review dates, training and start dates are others.',
    },
  ],
  apply: {
    scenario: 'Clinton decides whether to negotiate.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What usually puts an offer at risk?',
        options: [
          { text: 'A polite, reasoned question', why: 'That rarely loses an offer.' },
          { text: 'A demand, an ultimatum or a lie' },
          { text: 'Saying thank you', why: 'Gratitude is always fine.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Often negotiable, or usually fixed?',
        groups: ['Often negotiable', 'Usually fixed'],
        items: [
          { text: 'Start date', group: 0 },
          { text: 'Earlier salary review', group: 0 },
          { text: 'Pay on a big graduate scheme with set bands', group: 1 },
          { text: 'Training budget', group: 0 },
          { text: 'The law on minimum notice', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply to his mum.',
        from: 'clinton',
        message: 'Mum says, "Don\'t ask anything, you\'ll lose it!" What do I tell her?',
        options: [
          { text: '"I\'ll ask for double like Uncle said."', why: 'Grounded in research, not double.' },
          { text: '"You\'re right, I\'ll ask nothing."', why: 'A polite ask is reasonable.' },
          { text: '"I\'ll ask once, politely, with a reason. If they say no, I\'ll still be happy to accept."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that turns an ask into a risk.',
        lines: ['Thank you, I\'m excited about the role.', 'Pay me 500,000 or I walk.', 'Would an earlier review be possible?'],
        bug: 1,
        explanation: 'An ultimatum, far outside his research.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each ask to its reason.',
        pairs: [
          ['330,000', 'Inside his range, plus offline sync experience'],
          ['Review after probation', 'Show his value sooner'],
          ['Training budget', 'Learn their payments stack faster'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'If pay is fixed for all graduates, what then?',
        options: [
          { text: 'Ask about other things, like a review date or training, or simply accept' },
          { text: 'Demand anyway', why: 'Respect the fixed band; try other parts.' },
          { text: 'Reject the offer', why: 'Fixed pay is normal on some schemes.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'Ask politely, [[1]], with a [[2]].',
        blanks: [['once'], ['reason']],
        distractors: ['daily', 'threat', 'lie'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many times should Clinton make his ask? (a number)',
        answers: ['1', 'one', 'once'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Grounded ask, or not?',
        groups: ['Grounded', 'Not grounded'],
        items: [
          { text: 'A number inside his researched range', group: 0 },
          { text: 'Double, because Uncle said so', group: 1 },
          { text: 'A review after probation', group: 0 },
          { text: 'A number that "felt right"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Do some employers expect candidates to ask?',
        options: [
          { text: 'No, never', why: 'Many expect it.' },
          { text: 'Only for CEOs', why: 'Graduates can ask too.' },
          { text: 'Yes, many do, though norms vary by country and company' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What do the people around you believe about negotiating? How does that compare with what you\'ve just learned?',
    starters: ['People around me say...', 'Now I think...'],
  },
  deepen: {
    title: 'Check locally',
    summary: 'Ask someone in your field: "Do graduates usually negotiate here, and on what?" Norms vary a lot between countries and companies.',
  },
  notes: 'Kept qualitative; negotiation norms vary by country, industry and company (fixed graduate bands are common at large employers).',
};

export default lesson;
